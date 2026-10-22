; seowatcher Windows installer (Inno Setup 6).
; Built by build.ps1, which passes AppVersion and StageDir:
;   ISCC /DAppVersion=2.3.0 /DStageDir=out\stage /Oout seowatcher.iss
;
; Per-user install (no administrator prompt) into
; %LOCALAPPDATA%\Programs\seowatcher. The app's data lives in
; %LOCALAPPDATA%\seowatcher and is deliberately NOT removed by the uninstaller:
; it holds the database and the key that encrypts the stored Google tokens.

#ifndef AppVersion
  #define AppVersion "0.0.0"
#endif
#ifndef StageDir
  #define StageDir "out\stage"
#endif

[Setup]
AppId={{7D7A2C7E-5B1E-4C8B-9B2E-3F6E2A9C1D41}
AppName=seowatcher
AppVersion={#AppVersion}
AppVerName=seowatcher {#AppVersion}
AppPublisher=seowatcher
AppPublisherURL=https://seowatcher.io
AppSupportURL=https://github.com/ucsahinn/seotracker
AppUpdatesURL=https://github.com/ucsahinn/seotracker/releases
DefaultDirName={localappdata}\Programs\seowatcher
DisableProgramGroupPage=yes
DisableDirPage=yes
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
OutputBaseFilename=seowatcher-setup-{#AppVersion}
SetupIconFile=icon\seowatcher.ico
UninstallDisplayIcon={app}\seowatcher.exe
UninstallDisplayName=seowatcher
Compression=lzma2/ultra64
SolidCompression=yes
LZMAUseSeparateProcess=yes
WizardStyle=modern
ShowLanguageDialog=auto
CloseApplications=no
MinVersion=10.0

[Languages]
Name: "tr"; MessagesFile: "compiler:Languages\Turkish.isl"
Name: "en"; MessagesFile: "compiler:Default.isl"

[CustomMessages]
tr.Autostart=Windows açılınca seowatcher'ı başlat
en.Autostart=Start seowatcher when Windows starts
tr.LaunchNow=seowatcher'ı şimdi başlat
en.LaunchNow=Start seowatcher now
tr.DesktopIcon=Masaüstüne kısayol ekle
en.DesktopIcon=Create a desktop shortcut

[Tasks]
Name: "autostart"; Description: "{cm:Autostart}"
Name: "desktopicon"; Description: "{cm:DesktopIcon}"; Flags: unchecked

[Files]
Source: "{#StageDir}\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs ignoreversion

[Icons]
Name: "{userprograms}\seowatcher"; Filename: "{app}\seowatcher.exe"
Name: "{userdesktop}\seowatcher"; Filename: "{app}\seowatcher.exe"; Tasks: desktopicon

[Registry]
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "seowatcher"; ValueData: """{app}\seowatcher.exe"" --silent"; Flags: uninsdeletevalue; Tasks: autostart

[Run]
Filename: "{app}\seowatcher.exe"; Description: "{cm:LaunchNow}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
; wrangler writes scratch files (.wrangler\tmp) beside the worker config at
; run time; they are not in the install manifest, so remove the whole tree.
; The data directory under {localappdata}\seowatcher is not touched.
Type: filesandordirs; Name: "{app}\app"
Type: filesandordirs; Name: "{app}\node"

[UninstallRun]
; Stops the running instance (and, through its job object, node and workerd)
; before files are removed.
Filename: "{app}\seowatcher.exe"; Parameters: "--quit"; Flags: runhidden waituntilterminated; RunOnceId: "quit"

[Code]
// An upgrade over a running instance: stop it first so the files can be
// replaced; the [Run] entry starts the new version afterwards.
function PrepareToInstall(var NeedsRestart: Boolean): String;
var
  ResultCode: Integer;
  Exe: String;
begin
  Exe := ExpandConstant('{app}\seowatcher.exe');
  if FileExists(Exe) then
    Exec(Exe, '--quit', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  Result := '';
end;
