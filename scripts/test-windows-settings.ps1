$ErrorActionPreference = "Stop"
$repoRoot = Split-Path $PSScriptRoot -Parent
$compiler = Get-ChildItem 'C:\Windows\Microsoft.NET\Framework64\v4*\csc.exe' | Select-Object -First 1
if (-not $compiler) { throw 'The Windows .NET Framework compiler is required for native bridge tests.' }
$testDir = Join-Path ([System.IO.Path]::GetTempPath()) ("seowatcher-settings-tests-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $testDir | Out-Null
$bridgeSource = Join-Path $repoRoot 'packaging\windows\launcher\WindowsSettingsBridge.cs'
$testSource = Join-Path $repoRoot 'packaging\windows\launcher\WindowsSettingsBridge.Tests.cs'
$testExe = Join-Path $testDir 'bridge-tests.exe'
& $compiler.FullName /nologo /target:exe "/out:$testExe" $bridgeSource $testSource
if ($LASTEXITCODE -ne 0) { throw 'Native bridge test compilation failed.' }
& $testExe
if ($LASTEXITCODE -ne 0) { throw 'Native bridge tests failed.' }
# Compile the actual launcher integration too, without building or packaging the app.
$launcherSource = Join-Path $repoRoot 'packaging\windows\launcher\SeoWatcher.cs'
$testLibrary = Join-Path $testDir 'launcher-validation.dll'
& $compiler.FullName /nologo /target:library /r:System.Windows.Forms.dll /r:System.Drawing.dll "/out:$testLibrary" $launcherSource $bridgeSource
if ($LASTEXITCODE -ne 0) { throw 'Launcher integration compilation failed.' }
Write-Host 'Launcher integration compilation passed.'
$pnpmCommand = (Get-Command pnpm.cmd -ErrorAction Stop).Source
& $pnpmCommand exec tsx (Join-Path $PSScriptRoot 'probe-windows-settings.ts') $testExe
if ($LASTEXITCODE -ne 0) { throw 'TypeScript/native bridge consumer probe failed.' }
Remove-Item -LiteralPath $testExe, $testLibrary
