# Windows Store package (MSIX) beside the installer

## Status

Accepted. Built and packed by `packaging/windows/build.ps1`; not yet submitted to the Store, and the packaged code paths have not run on a machine (see "Not verified yet").

## What it does

- The Windows package ships through two channels built from the same staged files: the Microsoft Store (`seowatcher-<version>.msix`, primary) and the Inno Setup installer (`seowatcher-setup-<version>.exe`, secondary, for machines where the Store is switched off).
- The Store signs the package it publishes. That is the reason for the channel: on 2026-11-10 ESET removed the installed, unsigned `seowatcher.exe` as `@Object.Suspicious` on reputation alone, and there is no budget for a code-signing certificate.
- The launcher is compiled deterministically, so one version is one file hash no matter how often it is rebuilt, and its version resource is fully filled.
- In the Store package the launcher does not update or repair itself, keeps "start with Windows" as a Windows startup task, and keeps its data in the package's own folder. The app shows that folder wherever it names the token or the logs, and says that the Store installs updates.

## How it works

**One executable.** `seowatcher.exe` is the same file in both channels. `StorePackage.cs` asks Windows whether the process has package identity (`GetCurrentPackageFamilyName`) and holds everything that differs. Windows Runtime types are touched only inside its private methods, so an unpackaged start never loads them.

**Data folder.** A packaged process that creates files under `%LOCALAPPDATA%` gets them redirected into a private copy that no other program finds by that path. An agent reads `mcp-token` from outside the package, so the data root moves to `%LOCALAPPDATA%\Packages\<family name>\LocalCache\seowatcher`, a real location both sides see. On the first packaged start, an existing `%LOCALAPPDATA%\seowatcher` from the installer is copied over (keys first, the database under its final name last, the old folder untouched); the launcher mutex guarantees the old install is not running during the copy. If the copy fails the launcher does not start the server, which would create an empty database and end the retries; it asks whether to retry, start empty, or quit.

Windows deletes the package's data when the Store app is uninstalled, unlike the installer, which leaves `%LOCALAPPDATA%\seowatcher` in place. A reinstall on a machine that still has the installer's folder adopts that older data again.

**Telling the app.** The launcher writes `WINDOWS_STORE_DATA_DIR` into `server.env`, spelled with `%LOCALAPPDATA%` so it carries no user name. `installKind` stays `windows`: the Store build is the Windows package, and adding a third kind would have touched some thirty call sites that have nothing to say about the difference. The server validates the value against one shape and exposes it as `storeDataDir` on `/api/health`, the agent connection and the update status. `withWindowsDataDir` (`src/shared/windowsDataDir.ts`) rewrites the installer's folder into the Store's in every prompt and command, in the three spellings they use, so that text exists once.

**Startup.** The manifest declares a `windows.startupTask`, off by default. The tray item and Ayarlar → Windows read and change it through `Windows.ApplicationModel.StartupTask`. A startup task passes no arguments, so the launcher asks for the activation kind instead of reading `--silent`. When the user switched the task off in Windows Settings, or policy fixes it, Windows refuses changes from the app: the toggle is shown locked with where to change it.

**Updates.** In the package the update timer never starts and the tray hides Güncelle, Güncellemeleri kendiliğinden kur and Kurulumu onar. Ayarlar → Windows hides the auto-update switch and the update card says the Store installs new versions.

**Build.** Step 7 of `build.ps1` fills `msix/AppxManifest.xml` and runs `makeappx pack` with a mapping file straight from the stage, so no second copy of the executables is made. `redist\VC_redist.x64.exe` is left out: a package cannot run an elevated installer, and the engine already carries the three runtime DLLs beside `workerd.exe`. The identity (`-MsixIdentityName`, `-MsixPublisher`, `-MsixPublisherDisplayName`) comes from Partner Center; the defaults are placeholders that build a package for inspection only. The package is not signed locally.

**Compiler.** `launcher/compiler.ps1` finds the Roslyn `csc.exe` of Visual Studio Build Tools and is shared by the build and `scripts/test-windows-settings.ps1`. The compiler inside Windows (.NET Framework `csc`, C# 5) has no `/deterministic`. The launcher still targets .NET Framework 4.x, so users need nothing new.

## Alternatives considered

- **Buy a certificate, or Azure Trusted Signing.** No budget; Trusted Signing is not open to individuals in Turkey.
- **SignPath Foundation (free for open source).** Kept, not replaced: the workflow step is in place and waits for the application (`docs/CODE_SIGNING.md`). It signs the installer channel. It does not remove the first-download SmartScreen prompt the way a Store install does.
- **A third `installKind` ("store").** Every screen and prompt that branches on Windows versus Docker would need a third arm that repeats the second.
- **Keep the data in `%LOCALAPPDATA%\seowatcher` with `unvirtualizedResources`.** A second restricted capability to justify to the Store, ignored on Windows 10 before 2004, where the data would silently move anyway.
- **A separate launcher build for the Store.** Two executables, two hashes to earn reputation for, and conditional compilation in a file that is tested as one.
- **Run-key autostart in the package.** A package's HKCU writes go to a private hive Windows never reads at sign-in.
- **Stay on the .NET Framework compiler.** No deterministic output; the hash changed on every build, which is what reputation checks flag.

## Not verified yet

Nothing below can run without an installed package, which needs Developer Mode or a Store submission:

- that a write to `Packages\<family name>\LocalCache\seowatcher` lands there and not in the redirected copy;
- the startup task (read, enable, disable, the locked states) and the sign-in activation kind;
- adoption of an installer's data, including the failure dialog;
- that an antivirus which judges the unpacked `seowatcher.exe` on reputation accepts it because the package is Store-signed (the executable inside is not signed itself);
- that the Store grants `runFullTrust` to a package that carries `node.exe` and `workerd.exe`.

## Not in scope

- Submitting to the Store, the listing, and user-facing guides for the Store install: they follow the first accepted submission.
- A `winget` entry for the Store package; `packaging/winget` keeps pointing at the installer.
