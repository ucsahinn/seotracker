<#
.SYNOPSIS
  Builds the seowatcher Windows package: a self-contained folder (bundled
  Node, wrangler runtime, built worker, tray launcher) and, when Inno Setup is
  available, the one-click installer seowatcher-setup-<version>.exe.

.DESCRIPTION
  Steps, in order:
    1. vite build (skippable) with the self-host env baked in
    2. stage dist\server, dist\client, dist\seotracker_audit and the drizzle
       migrations under out\stage\app
    3. npm ci the runtime (packaging\windows\runtime: wrangler only)
    4. place node.exe (from -NodeExe, or downloaded from nodejs.org and
       verified against SHASUMS256.txt)
    5. compile launcher\SeoWatcher.cs with the .NET Framework csc
    6. ISCC seowatcher.iss -> out\seowatcher-setup-<version>.exe

  Runs on a developer machine or in GitHub Actions (windows-latest).

.PARAMETER Version
  Package version. Defaults to the version in package.json.

.PARAMETER NodeVersion
  Node.js version to bundle when -NodeExe is not given.

.PARAMETER NodeExe
  Path to an existing node.exe (64-bit) to bundle instead of downloading.

.PARAMETER VcRedistExe
  Path to an existing VC_redist.x64.exe to bundle instead of downloading.
  workerd.exe links the Visual C++ 2015-2022 runtime dynamically; a clean
  Windows has none, so the installer carries it and installs it when missing.

.PARAMETER SkipAppBuild
  Reuse the existing dist\ instead of running vite build.

.PARAMETER NoInstaller
  Stop after staging; do not run Inno Setup.
#>
[CmdletBinding()]
param(
  [string]$Version,
  [string]$NodeVersion = "22.23.2",
  [string]$NodeExe,
  [string]$VcRedistExe,
  [switch]$SkipAppBuild,
  [switch]$NoInstaller
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$repo = (Resolve-Path (Join-Path $here "..\..")).Path
$out = Join-Path $here "out"
$stage = Join-Path $out "stage"
$cache = Join-Path $out "cache"

function Step($text) { Write-Host "`n== $text" -ForegroundColor Cyan }

# Runs a command-line tool through cmd.exe with stderr merged into stdout.
# Under $ErrorActionPreference = "Stop", a tool that merely writes a warning
# to stderr (vite does, through the pnpm .ps1 shim) would otherwise abort the
# script; the exit code is what decides success here.
function Invoke-Tool([string]$commandLine) {
  $previous = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    & cmd.exe /d /s /c "$commandLine 2>&1" | ForEach-Object { Write-Host $_ }
    $code = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previous
  }
  if ($code -ne 0) { throw "$commandLine failed (exit $code)" }
}

if (-not $Version) {
  $Version = (Get-Content (Join-Path $repo "package.json") -Raw | ConvertFrom-Json).version
}
$Version = $Version.TrimStart("v")
Write-Host "seowatcher package $Version (repo: $repo)"

# 1. Application build -------------------------------------------------------
if (-not $SkipAppBuild) {
  Step "vite build"
  Push-Location $repo
  try {
    # Same values compose.yaml fixes for a self-host; vite inlines the
    # VITE_-prefixed ones and AUTH_MODE into the client bundle.
    $env:AUTH_MODE = "local_noauth"
    $env:VITE_SHOW_DEVTOOLS = "false"
    Invoke-Tool "pnpm exec vite build"
  } finally { Pop-Location }
}
$distServer = Join-Path $repo "dist\server\wrangler.json"
if (-not (Test-Path $distServer)) { throw "dist\server\wrangler.json not found; run without -SkipAppBuild" }

# 2. Stage ---------------------------------------------------------------------
Step "stage"
if (Test-Path $stage) { Remove-Item -Recurse -Force $stage }
New-Item -ItemType Directory -Force (Join-Path $stage "app\dist") | Out-Null
foreach ($dir in @("server", "client", "seotracker_audit")) {
  Copy-Item -Recurse (Join-Path $repo "dist\$dir") (Join-Path $stage "app\dist\$dir")
}
Copy-Item -Recurse (Join-Path $repo "drizzle") (Join-Path $stage "app\dist\server\drizzle")

# The build writes the absolute path of the machine it ran on into the worker
# config. Wrangler does not need it, and a stranger's path has no place in a
# package.
foreach ($cfg in @("app\dist\server\wrangler.json", "app\dist\seotracker_audit\wrangler.json")) {
  $path = Join-Path $stage $cfg
  $json = Get-Content $path -Raw | ConvertFrom-Json
  foreach ($key in @("configPath", "userConfigPath")) {
    if ($json.PSObject.Properties[$key]) { $json.PSObject.Properties.Remove($key) }
  }
  $json | ConvertTo-Json -Depth 50 -Compress | Set-Content -Encoding UTF8 $path
}

# 3. Runtime (wrangler + miniflare + workerd) ------------------------------------
Step "runtime: npm ci"
$runtime = Join-Path $here "runtime"
Push-Location $runtime
try {
  if (Test-Path (Join-Path $runtime "package-lock.json")) {
    Invoke-Tool "npm ci --omit=dev --no-audit --no-fund --loglevel=error"
  } else {
    Invoke-Tool "npm install --omit=dev --no-audit --no-fund --loglevel=error"
  }
} finally { Pop-Location }
Copy-Item -Recurse (Join-Path $runtime "node_modules") (Join-Path $stage "app\node_modules")
# Only the Windows workerd binary belongs in a Windows package.
Get-ChildItem (Join-Path $stage "app\node_modules\@cloudflare") -Directory |
  Where-Object { $_.Name -like "workerd-*" -and $_.Name -ne "workerd-windows-64" } |
  Remove-Item -Recurse -Force

# 4. Node runtime ---------------------------------------------------------------
Step "node runtime"
New-Item -ItemType Directory -Force (Join-Path $stage "node") | Out-Null
if ($NodeExe) {
  if (-not (Test-Path $NodeExe)) { throw "NodeExe not found: $NodeExe" }
  Copy-Item $NodeExe (Join-Path $stage "node\node.exe")
} else {
  New-Item -ItemType Directory -Force $cache | Out-Null
  $zipName = "node-v$NodeVersion-win-x64.zip"
  $zip = Join-Path $cache $zipName
  $base = "https://nodejs.org/dist/v$NodeVersion"
  if (-not (Test-Path $zip)) {
    Write-Host "downloading $base/$zipName"
    Invoke-WebRequest -Uri "$base/$zipName" -OutFile $zip -UseBasicParsing
  }
  $sums = (Invoke-WebRequest -Uri "$base/SHASUMS256.txt" -UseBasicParsing).Content
  $expected = ($sums -split "`n" | Where-Object { $_ -match [regex]::Escape($zipName) } | Select-Object -First 1)
  if (-not $expected) { throw "SHASUMS256.txt has no entry for $zipName" }
  $expected = ($expected -split "\s+")[0].ToLowerInvariant()
  $actual = (Get-FileHash $zip -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($expected -ne $actual) { throw "node zip checksum mismatch: expected $expected, got $actual" }
  $extract = Join-Path $cache "node-v$NodeVersion"
  if (Test-Path $extract) { Remove-Item -Recurse -Force $extract }
  Expand-Archive $zip $extract
  Copy-Item (Join-Path $extract "node-v$NodeVersion-win-x64\node.exe") (Join-Path $stage "node\node.exe")
  Copy-Item (Join-Path $extract "node-v$NodeVersion-win-x64\LICENSE") (Join-Path $stage "node\LICENSE")
}
$nodeVersionOut = & (Join-Path $stage "node\node.exe") -v
Write-Host "bundled node $nodeVersionOut"

# 4b. Visual C++ runtime -----------------------------------------------------------
# Pinned to one Microsoft download whose URL carries its own SHA-256; bump both
# together. The launcher treats anything older than 14.40 as suspect.
Step "vc redist"
$vcVersion = "14.44.35211.0"
$vcSha = "cc0ff0eb1dc3f5188ae6300faef32bf5beeba4bdd6e8e445a9184072096b713b"
$vcUrl = "https://download.visualstudio.microsoft.com/download/pr/990c720a-46ce-4dc7-87b9-c2eb615d34b9/CC0FF0EB1DC3F5188AE6300FAEF32BF5BEEBA4BDD6E8E445A9184072096B713B/VC_redist.x64.exe"
New-Item -ItemType Directory -Force (Join-Path $stage "redist") | Out-Null
if ($VcRedistExe) {
  if (-not (Test-Path $VcRedistExe)) { throw "VcRedistExe not found: $VcRedistExe" }
  $vcFile = $VcRedistExe
} else {
  New-Item -ItemType Directory -Force $cache | Out-Null
  $vcFile = Join-Path $cache "VC_redist.x64-$vcVersion.exe"
  if (-not (Test-Path $vcFile)) {
    Write-Host "downloading $vcUrl"
    Invoke-WebRequest -Uri $vcUrl -OutFile $vcFile -UseBasicParsing
  }
}
$vcActual = (Get-FileHash $vcFile -Algorithm SHA256).Hash.ToLowerInvariant()
if ($vcActual -ne $vcSha) { throw "VC_redist.x64.exe checksum mismatch: expected $vcSha, got $vcActual" }
Copy-Item $vcFile (Join-Path $stage "redist\VC_redist.x64.exe")
Write-Host "bundled VC_redist.x64.exe $vcVersion"

# 5. Launcher -------------------------------------------------------------------
Step "launcher (csc)"
$csc = Get-ChildItem "C:\Windows\Microsoft.NET\Framework64\v4*\csc.exe" | Select-Object -First 1
if (-not $csc) { throw "csc.exe (.NET Framework 4.x) not found" }
$assemblyInfo = Join-Path $out "AssemblyInfo.cs"
$fileVersion = ($Version -replace "[^0-9.]", "")
if (-not $fileVersion) { $fileVersion = "0.0.0" }
@"
using System.Reflection;
[assembly: AssemblyTitle("seowatcher")]
[assembly: AssemblyProduct("seowatcher")]
[assembly: AssemblyDescription("seowatcher: Search Console, Analytics and site audits on your own computer")]
[assembly: AssemblyCopyright("MIT License")]
[assembly: AssemblyVersion("$fileVersion")]
[assembly: AssemblyFileVersion("$fileVersion")]
[assembly: AssemblyInformationalVersion("$Version")]
"@ | Set-Content -Encoding UTF8 $assemblyInfo
$launcherExe = Join-Path $stage "seowatcher.exe"
$launcherIcon = Join-Path $here "icon\seowatcher.ico"
$launcherManifest = Join-Path $here "launcher\app.manifest"
$launcherSource = Join-Path $here "launcher\SeoWatcher.cs"
$cscArgs = @(
  "/nologo", "/target:winexe", "/optimize+", "/warn:3",
  "/out:$launcherExe",
  "/win32icon:$launcherIcon",
  "/win32manifest:$launcherManifest",
  "/r:System.Windows.Forms.dll", "/r:System.Drawing.dll",
  $launcherSource,
  $assemblyInfo
)
$cscOutput = & $csc.FullName @cscArgs 2>&1
$cscExit = $LASTEXITCODE
if ($cscOutput) { $cscOutput | ForEach-Object { Write-Host $_ } }
if ($cscExit -ne 0) { throw "csc failed (exit $cscExit)" }

Set-Content -Encoding ascii (Join-Path $stage "VERSION") $Version
Copy-Item (Join-Path $repo "LICENSE") (Join-Path $stage "LICENSE")

$stageMb = [math]::Round((Get-ChildItem $stage -Recurse -File | Measure-Object Length -Sum).Sum / 1MB)
Write-Host "staged: $stage ($stageMb MB)"

# 6. Installer -------------------------------------------------------------------
if ($NoInstaller) { Write-Host "skipping installer (-NoInstaller)"; exit 0 }

Step "installer (Inno Setup)"
$iscc = Get-Command ISCC.exe -ErrorAction SilentlyContinue
if ($iscc) { $iscc = $iscc.Source } else {
  $iscc = @(
    "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe",
    "$env:ProgramFiles\Inno Setup 6\ISCC.exe",
    "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe"
  ) | Where-Object { Test-Path $_ } | Select-Object -First 1
}
if (-not $iscc) {
  throw "Inno Setup 6 not found. Install it (winget install JRSoftware.InnoSetup) or rerun with -NoInstaller."
}
$iss = Join-Path $here "seowatcher.iss"
Invoke-Tool "`"$iscc`" /Q `"/DAppVersion=$Version`" `"/DStageDir=$stage`" `"/O$out`" `"$iss`""
$setup = Get-ChildItem $out -Filter "seowatcher-setup-*.exe" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Write-Host ("installer: {0} ({1} MB)" -f $setup.FullName, [math]::Round($setup.Length / 1MB))
