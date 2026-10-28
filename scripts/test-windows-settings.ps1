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
$launcherSource = Join-Path $repoRoot 'packaging\windows\launcher\SeoWatcher.cs'
$progressSource = Join-Path $repoRoot 'packaging\windows\launcher\StartupProgress.cs'
$updatePolicyTests = Join-Path $repoRoot 'packaging\windows\launcher\UpdateVersionPolicy.Tests.cs'
$updatePolicyExe = Join-Path $testDir 'update-version-policy-tests.exe'
$updatePolicyArgs = @(
  '/nologo', '/target:exe', '/main:SeoWatcher.UpdateVersionPolicyTests',
  '/r:System.Windows.Forms.dll', '/r:System.Drawing.dll', "/out:$updatePolicyExe",
  $launcherSource, $bridgeSource, $progressSource, $updatePolicyTests
)
& $compiler.FullName @updatePolicyArgs
if ($LASTEXITCODE -ne 0) { throw 'Update version policy test compilation failed.' }
& $updatePolicyExe
if ($LASTEXITCODE -ne 0) { throw 'Update version policy tests failed.' }
$runtimeSafetyTests = Join-Path $repoRoot 'packaging\windows\launcher\RuntimeSafety.Tests.cs'
$runtimeSafetyExe = Join-Path $testDir 'runtime-safety-tests.exe'
$runtimeSafetyArgs = @(
  '/nologo', '/target:exe', '/main:SeoWatcher.RuntimeSafetyTests',
  '/r:System.Windows.Forms.dll', '/r:System.Drawing.dll', "/out:$runtimeSafetyExe",
  $launcherSource, $bridgeSource, $progressSource, $runtimeSafetyTests
)
& $compiler.FullName @runtimeSafetyArgs
if ($LASTEXITCODE -ne 0) { throw 'Runtime safety test compilation failed.' }
& $runtimeSafetyExe
if ($LASTEXITCODE -ne 0) { throw 'Runtime safety tests failed.' }
$progressTests = Join-Path $repoRoot 'packaging\windows\launcher\StartupProgress.Tests.cs'
$progressExe = Join-Path $testDir 'startup-progress-tests.exe'
& $compiler.FullName /nologo /target:exe /r:System.Windows.Forms.dll /r:System.Drawing.dll "/out:$progressExe" $progressSource $progressTests
if ($LASTEXITCODE -ne 0) { throw 'Startup progress policy test compilation failed.' }
& $progressExe
if ($LASTEXITCODE -ne 0) { throw 'Startup progress policy tests failed.' }
# Compile the actual launcher integration too, without building or packaging the app.
$testLibrary = Join-Path $testDir 'launcher-validation.dll'
& $compiler.FullName /nologo /target:library /r:System.Windows.Forms.dll /r:System.Drawing.dll "/out:$testLibrary" $launcherSource $bridgeSource $progressSource
if ($LASTEXITCODE -ne 0) { throw 'Launcher integration compilation failed.' }
Write-Host 'Launcher integration compilation passed.'
$notificationTests = Join-Path $repoRoot 'packaging\windows\launcher\EventNotifications.Tests.cs'
$notificationExe = Join-Path $testDir 'event-notifications-tests.exe'
& $compiler.FullName /nologo /target:exe /main:SeoWatcher.EventNotificationsTests /r:System.Windows.Forms.dll /r:System.Drawing.dll "/out:$notificationExe" $launcherSource $bridgeSource $progressSource $notificationTests
if ($LASTEXITCODE -ne 0) { throw 'Event notification test compilation failed.' }
& $notificationExe
if ($LASTEXITCODE -ne 0) { throw 'Event notification tests failed.' }
Remove-Item -LiteralPath $notificationExe
$pnpmCommand = (Get-Command pnpm.cmd -ErrorAction Stop).Source
& $pnpmCommand exec tsx (Join-Path $PSScriptRoot 'probe-windows-settings.ts') $testExe
if ($LASTEXITCODE -ne 0) { throw 'TypeScript/native bridge consumer probe failed.' }
Remove-Item -LiteralPath $testExe, $testLibrary, $updatePolicyExe, $runtimeSafetyExe, $progressExe
