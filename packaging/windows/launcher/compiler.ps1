# How the launcher is compiled, shared by packaging\windows\build.ps1 and
# scripts\test-windows-settings.ps1 so the package and its tests cannot drift.

# The Roslyn compiler of Visual Studio or its Build Tools. The compiler that
# ships inside Windows (.NET Framework csc) has no /deterministic, and an
# unsigned launcher whose hash changes on every build is what antivirus
# reputation checks flag.
function Get-LauncherCompiler {
  $vswhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
  if (Test-Path $vswhere) {
    $csc = & $vswhere -latest -products * -find "MSBuild\Current\Bin\Roslyn\csc.exe" | Select-Object -First 1
    if ($csc -and (Test-Path $csc)) { return $csc }
  }
  throw "Roslyn csc.exe not found. Install Visual Studio Build Tools (winget install Microsoft.VisualStudio.2022.BuildTools)."
}

function Get-LauncherSources {
  @("SeoWatcher.cs", "StartupProgress.cs", "WindowsSettingsBridge.cs", "StorePackage.cs") |
    ForEach-Object { Join-Path $PSScriptRoot $_ }
}

# StorePackage.cs calls the Windows Runtime (startup task, activation kind);
# its metadata ships with every Windows 10 and later.
function Get-LauncherReferences {
  $metadata = Join-Path $env:SystemRoot "System32\WinMetadata"
  @(
    "/r:System.Windows.Forms.dll", "/r:System.Drawing.dll",
    "/r:$metadata\Windows.ApplicationModel.winmd", "/r:$metadata\Windows.Foundation.winmd"
  )
}
