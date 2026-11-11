$ErrorActionPreference = "Stop"
$repoRoot = Split-Path $PSScriptRoot -Parent
$launcherDir = Join-Path $repoRoot 'packaging\windows\launcher'
. (Join-Path $launcherDir 'compiler.ps1')
$compiler = Get-LauncherCompiler
$launcherSources = Get-LauncherSources
$launcherReferences = Get-LauncherReferences
$testDir = Join-Path ([System.IO.Path]::GetTempPath()) ("seowatcher-settings-tests-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $testDir | Out-Null
$bridgeSource = Join-Path $launcherDir 'WindowsSettingsBridge.cs'
$testSource = Join-Path $launcherDir 'WindowsSettingsBridge.Tests.cs'
$testExe = Join-Path $testDir 'bridge-tests.exe'
& $compiler /nologo /target:exe "/out:$testExe" $bridgeSource $testSource
if ($LASTEXITCODE -ne 0) { throw 'Native bridge test compilation failed.' }
& $testExe
if ($LASTEXITCODE -ne 0) { throw 'Native bridge tests failed.' }
$updatePolicyTests = Join-Path $launcherDir 'UpdateVersionPolicy.Tests.cs'
$updatePolicyExe = Join-Path $testDir 'update-version-policy-tests.exe'
& $compiler /nologo /target:exe /main:SeoWatcher.UpdateVersionPolicyTests "/out:$updatePolicyExe" @launcherReferences @launcherSources $updatePolicyTests
if ($LASTEXITCODE -ne 0) { throw 'Update version policy test compilation failed.' }
& $updatePolicyExe
if ($LASTEXITCODE -ne 0) { throw 'Update version policy tests failed.' }
$runtimeSafetyTests = Join-Path $launcherDir 'RuntimeSafety.Tests.cs'
$runtimeSafetyExe = Join-Path $testDir 'runtime-safety-tests.exe'
& $compiler /nologo /target:exe /main:SeoWatcher.RuntimeSafetyTests "/out:$runtimeSafetyExe" @launcherReferences @launcherSources $runtimeSafetyTests
if ($LASTEXITCODE -ne 0) { throw 'Runtime safety test compilation failed.' }
& $runtimeSafetyExe
if ($LASTEXITCODE -ne 0) { throw 'Runtime safety tests failed.' }
$progressSource = Join-Path $launcherDir 'StartupProgress.cs'
$progressTests = Join-Path $launcherDir 'StartupProgress.Tests.cs'
$progressExe = Join-Path $testDir 'startup-progress-tests.exe'
& $compiler /nologo /target:exe /r:System.Windows.Forms.dll /r:System.Drawing.dll "/out:$progressExe" $progressSource $progressTests
if ($LASTEXITCODE -ne 0) { throw 'Startup progress policy test compilation failed.' }
& $progressExe
if ($LASTEXITCODE -ne 0) { throw 'Startup progress policy tests failed.' }
# Compile the actual launcher integration too, without building or packaging the app.
$testLibrary = Join-Path $testDir 'launcher-validation.dll'
& $compiler /nologo /target:library "/out:$testLibrary" @launcherReferences @launcherSources
if ($LASTEXITCODE -ne 0) { throw 'Launcher integration compilation failed.' }
Write-Host 'Launcher integration compilation passed.'
$notificationTests = Join-Path $launcherDir 'EventNotifications.Tests.cs'
$notificationExe = Join-Path $testDir 'event-notifications-tests.exe'
& $compiler /nologo /target:exe /main:SeoWatcher.EventNotificationsTests "/out:$notificationExe" @launcherReferences @launcherSources $notificationTests
if ($LASTEXITCODE -ne 0) { throw 'Event notification test compilation failed.' }
& $notificationExe
if ($LASTEXITCODE -ne 0) { throw 'Event notification tests failed.' }
Remove-Item -LiteralPath $notificationExe
$pnpmCommand = (Get-Command pnpm.cmd -ErrorAction Stop).Source
& $pnpmCommand exec tsx (Join-Path $PSScriptRoot 'probe-windows-settings.ts') $testExe
if ($LASTEXITCODE -ne 0) { throw 'TypeScript/native bridge consumer probe failed.' }
Remove-Item -LiteralPath $testExe, $testLibrary, $updatePolicyExe, $runtimeSafetyExe, $progressExe
