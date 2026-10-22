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
; Windows 10 1809 / Server 2019: older builds cannot run workerd.
MinVersion=10.0.17763

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
tr.VcRedist=Windows bileşeni kuruluyor (Microsoft Visual C++ çalışma zamanı)
en.VcRedist=Installing a Windows component (Microsoft Visual C++ runtime)
tr.VcRedistSkipped=Microsoft Visual C++ çalışma zamanı kurulamadı (yönetici izni verilmedi ya da kurulum başarısız oldu). seowatcher bu bileşen olmadan açılmaz. Uygulama ilk açılışta size tekrar kurmayı önerecek.
en.VcRedistSkipped=The Microsoft Visual C++ runtime could not be installed (administrator permission was not given or the install failed). seowatcher does not start without it. The app will offer to install it again on first launch.

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
; A silent run is an update started by the running app (Updater in
; SeoWatcher.cs) or by an administrator script: bring the app back up.
Filename: "{app}\seowatcher.exe"; Parameters: "--silent"; Flags: nowait skipifnotsilent

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

// workerd.exe (the Workers runtime inside the app) links the Visual C++
// 2015-2022 runtime dynamically. A clean Windows has none and an old one
// crashes it with an access violation, so the bundled VC_redist.x64.exe is
// run when the registry shows nothing newer than 14.40. It needs elevation,
// so it goes through ShellExec with the runas verb: one UAC prompt. A refused
// prompt does not fail the install; the launcher offers the same package
// again on first start.
const
  VcRuntimeKey = 'SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64';

function VcRedistNeeded(): Boolean;
var
  Major, Minor: Cardinal;
begin
  Result := True;
  if RegQueryDWordValue(HKLM64, VcRuntimeKey, 'Major', Major) and
     RegQueryDWordValue(HKLM64, VcRuntimeKey, 'Minor', Minor) then
    Result := (Major < 14) or ((Major = 14) and (Minor < 40));
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  Exe: String;
  Code: Integer;
  Ok: Boolean;
begin
  if CurStep <> ssPostInstall then Exit;
  if not VcRedistNeeded() then Exit;
  Exe := ExpandConstant('{app}\redist\VC_redist.x64.exe');
  if not FileExists(Exe) then Exit;
  WizardForm.StatusLabel.Caption := CustomMessage('VcRedist');
  Ok := ShellExec('runas', Exe, '/install /quiet /norestart', '', SW_SHOW, ewWaitUntilTerminated, Code);
  // 0 done, 3010 done but reboot wanted, 1638 a newer version is already there.
  if (not Ok) or ((Code <> 0) and (Code <> 3010) and (Code <> 1638)) then
    MsgBox(CustomMessage('VcRedistSkipped'), mbInformation, MB_OK);
end;
