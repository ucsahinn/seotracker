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
#define AppGuid "7D7A2C7E-5B1E-4C8B-9B2E-3F6E2A9C1D41"

[Setup]
AppId={{{#AppGuid}}
AppName=seowatcher
AppVersion={#AppVersion}
AppVerName=seowatcher {#AppVersion}
AppPublisher=seowatcher
AppPublisherURL=https://seowatcher.io
AppSupportURL=https://github.com/ucsahinn/seotracker
AppUpdatesURL=https://github.com/ucsahinn/seotracker/releases
; {autopf} is Program Files for an all-users install (administrator, /ALLUSERS)
; and %LOCALAPPDATA%\Programs for the default per-user install.
DefaultDirName={autopf}\seowatcher
DisableProgramGroupPage=yes
DisableDirPage=yes
PrivilegesRequired=lowest
; Lets an administrator choose "all users" in the wizard or pass /ALLUSERS
; from a deployment script (Intune, GPO, PDQ). Per-user stays the default.
PrivilegesRequiredOverridesAllowed=dialog commandline
; Always keep a setup log; it is copied next to the app's own logs at the end.
SetupLogging=yes
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
OutputBaseFilename=seowatcher-setup-{#AppVersion}
; Explorer "Details" and the UAC prompt show these; the file version must be numeric.
VersionInfoVersion={#AppVersion}.0
VersionInfoProductVersion={#AppVersion}
VersionInfoProductName=seowatcher
VersionInfoDescription=seowatcher {#AppVersion} kurulumu
VersionInfoCompany=seowatcher
VersionInfoCopyright=MIT License
SetupIconFile=icon\seowatcher.ico
WizardImageFile=icon\wizard-large.bmp
WizardSmallImageFile=icon\wizard-small.bmp
WizardImageStretch=no
; Inno 6 hides the welcome page by default; ours carries the product panel
; and the two-line explanation, so show it. 120% gives the copy room.
DisableWelcomePage=no
WizardSizePercent=120
ShowTasksTreeLines=no
UninstallDisplayIcon={app}\seowatcher.exe
UninstallDisplayName=seowatcher
Compression=lzma2/ultra64
SolidCompression=yes
LZMAUseSeparateProcess=yes
WizardStyle=modern
ShowLanguageDialog=auto
; PrepareToInstall asks the running launcher to quit first (it stops node
; and workerd itself). Restart Manager is the fallback for a launcher that
; does not answer: it closes whatever still holds the files. The [Run] entries
; start the new version, so Restart Manager does not restart anything.
CloseApplications=force
RestartApplications=no
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
tr.VcRedistSkipped=Microsoft Visual C++ çalışma zamanı kurulamadı (yönetici izni verilmedi ya da kurulum başarısız oldu).%n%nseowatcher gereken dosyaların bir kopyasını yanında taşır, çoğu bilgisayarda bu bileşen olmadan da açılır. Açılmazsa görev çubuğu simgesi bileşeni yeniden kurmayı önerir.
en.VcRedistSkipped=The Microsoft Visual C++ runtime could not be installed (administrator permission was not given or the install failed).%n%nseowatcher carries a copy of the files it needs and starts without it on most computers. If it does not, the taskbar icon offers to install the component again.

[Messages]
; Every wizard page carries the version in its bottom-left corner.
tr.BeveledLabel=seowatcher {#AppVersion}
en.BeveledLabel=seowatcher {#AppVersion}
; The window title is the very top line of every page: it names the version too.
tr.SetupWindowTitle=seowatcher {#AppVersion} - Kurulum yardımcısı
en.SetupWindowTitle=Setup - seowatcher {#AppVersion}
; The default Inno texts are generic; these read like the product.
tr.WelcomeLabel1=seowatcher {#AppVersion} kurulumuna hoş geldiniz
tr.WelcomeLabel2=Sitenizin Google verisini kendi bilgisayarınızda okuyan ücretsiz SEO uygulaması kurulacak.%n%nKurulum yalnızca sizin kullanıcı hesabınıza yapılır, yönetici şifresi istemez (yalnızca bir Windows bileşeni eksikse bir kez izin sorulur) ve iki dakika sürer.
tr.FinishedHeadingLabel=Kurulum tamamlandı
tr.FinishedLabel=seowatcher {#AppVersion} görev çubuğunda çalışır ve tarayıcınızda açılır. Kaldırırsanız verileriniz bilgisayarınızda kalır.%n%nİlk açılış 20-30 saniye sürer. Sonra Google'ı bağlarsınız; uygulama adım adım gösterir.
tr.ClickFinish=Bitirmek için Bitti'ye tıklayın.
tr.ConfirmUninstall=seowatcher kaldırılsın mı?%n%nVerileriniz (veritabanı, Google bağlantısı, raporlar) %%LOCALAPPDATA%%\seowatcher klasöründe kalır; yeniden kurarsanız kaldığınız yerden devam edersiniz.
tr.UninstalledAll=seowatcher kaldırıldı.%n%nVerileriniz %%LOCALAPPDATA%%\seowatcher klasöründe duruyor. Onları da silmek isterseniz bu klasörü kendiniz silin.
en.WelcomeLabel1=Welcome to seowatcher {#AppVersion}
en.WelcomeLabel2=This installs the free SEO app that reads your site's Google data on your own computer.%n%nIt installs for your user account only, needs no administrator password (asked once only if a Windows component is missing) and takes about two minutes.
en.FinishedHeadingLabel=Setup complete
en.FinishedLabel=seowatcher {#AppVersion} runs from the taskbar tray and opens in your browser. Uninstalling keeps your data on this computer.%n%nThe first start takes 20-30 seconds. Then you connect Google; the app walks you through it.
en.ConfirmUninstall=Remove seowatcher?%n%nYour data (database, Google connection, reports) stays in the %%LOCALAPPDATA%%\seowatcher folder; reinstall and you pick up where you left off.
en.UninstalledAll=seowatcher was removed.%n%nYour data is still in the %%LOCALAPPDATA%%\seowatcher folder. Delete that folder yourself if you want it gone too.

[Tasks]
Name: "autostart"; Description: "{cm:Autostart}"
Name: "desktopicon"; Description: "{cm:DesktopIcon}"; Flags: unchecked

[InstallDelete]
; An upgrade replaces the runtime and the built app as a whole: files a newer
; wrangler or build no longer ships must not linger next to the new ones.
; Nothing here is user data (that lives in {localappdata}\seowatcher).
Type: filesandordirs; Name: "{app}\app"
Type: filesandordirs; Name: "{app}\node"

[Files]
Source: "{#StageDir}\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs ignoreversion

[Icons]
Name: "{autoprograms}\seowatcher"; Filename: "{app}\seowatcher.exe"
Name: "{autodesktop}\seowatcher"; Filename: "{app}\seowatcher.exe"; Tasks: desktopicon

; The "autostart" task's Run value is written and removed in [Code]
; (ApplyAutostart, CurUninstallStepChanged): a silent self-update must not
; undo what the user set in the tray menu.

[Run]
Filename: "{app}\seowatcher.exe"; Description: "{cm:LaunchNow}"; Flags: nowait postinstall skipifsilent
; A silent run is an update started by the running app (Updater in
; SeoWatcher.cs) or by an administrator script: bring the app back up.
; runasoriginaluser: an all-users update runs elevated, the tray app must not.
Filename: "{app}\seowatcher.exe"; Parameters: "--silent"; Flags: nowait skipifnotsilent runasoriginaluser

[UninstallDelete]
; wrangler writes scratch files (.wrangler\tmp) beside the worker config at
; run time; they are not in the install manifest, so remove the whole tree.
; The data directory under {localappdata}\seowatcher is not touched.
Type: filesandordirs; Name: "{app}\app"
Type: filesandordirs; Name: "{app}\node"
; Downloaded update installers: not user data.
Type: filesandordirs; Name: "{localappdata}\seowatcher\updates"

[UninstallRun]
; Stops the running instance (and, through its job object, node and workerd)
; before files are removed.
Filename: "{app}\seowatcher.exe"; Parameters: "--quit"; Flags: runhidden waituntilterminated; RunOnceId: "quit"

[Code]
const
  RunKey = 'Software\Microsoft\Windows\CurrentVersion\Run';
  UninstallKey = 'Software\Microsoft\Windows\CurrentVersion\Uninstall\{{#AppGuid}}_is1';
  DumpsKey = 'Software\Microsoft\Windows\Windows Error Reporting\LocalDumps\workerd.exe';
  VcRuntimeKey = 'SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64';

var
  // An earlier seowatcher is installed (in either install mode): this run
  // is an upgrade or a reinstall, not a first install.
  Upgrade: Boolean;
  TasksPageSeen: Boolean;

function AutostartCommand(): String;
begin
  Result := '"' + ExpandConstant('{app}\seowatcher.exe') + '" --silent';
end;

procedure InitializeWizard();
begin
  Upgrade := RegKeyExists(HKCU, UninstallKey) or RegKeyExists(HKLM64, UninstallKey) or RegKeyExists(HKLM32, UninstallKey);
end;

// On an upgrade the "start with Windows" box shows what is set now (the tray
// menu may have changed it since the first install), not what was ticked
// back then.
procedure CurPageChanged(CurPageID: Integer);
begin
  if (CurPageID = wpSelectTasks) and Upgrade and not TasksPageSeen then begin
    TasksPageSeen := True;
    if RegValueExists(HKA, RunKey, 'seowatcher') or RegValueExists(HKCU, RunKey, 'seowatcher') then
      WizardSelectTasks('autostart')
    else
      WizardSelectTasks('!autostart');
  end;
end;

// An upgrade over a running instance: stop it first so the files can be
// replaced; the [Run] entries start the new version afterwards. The launcher
// stops node and workerd before it exits, and --quit waits for that.
function PrepareToInstall(var NeedsRestart: Boolean): String;
var
  ResultCode: Integer;
  Exe: String;
begin
  Exe := ExpandConstant('{app}\seowatcher.exe');
  if FileExists(Exe) then begin
    Exec(Exe, '--quit', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
    Log('seowatcher --quit exit code ' + IntToStr(ResultCode));
  end;
  Result := '';
end;

// "Windows açılınca başlat". A silent upgrade (the tray app updating itself)
// leaves the setting exactly as the user left it in the tray menu. Otherwise
// the task decides, and on an upgrade an unticked box removes the entry.
procedure ApplyAutostart();
begin
  if WizardSilent and Upgrade then Exit;
  if WizardIsTaskSelected('autostart') then
    RegWriteStringValue(HKA, RunKey, 'seowatcher', AutostartCommand())
  else if Upgrade then
    RegDeleteValue(HKA, RunKey, 'seowatcher');
end;

// workerd.exe (the Workers runtime inside the app) links the Visual C++
// 2015-2022 runtime dynamically. A clean Windows has none and an old one
// crashes it with an access violation, so the bundled VC_redist.x64.exe is
// run when the registry shows nothing newer than 14.40. It needs elevation,
// so it goes through ShellExec with the runas verb: one UAC prompt. A refused
// prompt does not fail the install: the engine carries its own copy of the
// DLLs, and the launcher offers the package again if the engine still fails.
function VcRedistNeeded(): Boolean;
var
  Major, Minor: Cardinal;
begin
  Result := True;
  if RegQueryDWordValue(HKLM64, VcRuntimeKey, 'Major', Major) and
     RegQueryDWordValue(HKLM64, VcRuntimeKey, 'Minor', Minor) then
    Result := (Major < 14) or ((Major = 14) and (Minor < 40));
end;

procedure InstallVcRedist();
var
  Exe: String;
  Code: Integer;
  Ok: Boolean;
begin
  if not VcRedistNeeded() then Exit;
  // A silent upgrade is the tray app updating itself: the app already ran on
  // this machine, so no UAC prompt out of nowhere.
  if WizardSilent and Upgrade then begin
    Log('VC++ runtime older than 14.40, not installed during a silent upgrade');
    Exit;
  end;
  Exe := ExpandConstant('{app}\redist\VC_redist.x64.exe');
  if not FileExists(Exe) then Exit;
  WizardForm.StatusLabel.Caption := CustomMessage('VcRedist');
  Ok := ShellExec('runas', Exe, '/install /quiet /norestart', '', SW_SHOW, ewWaitUntilTerminated, Code);
  Log('VC_redist.x64.exe: started ' + IntToStr(Ord(Ok)) + ', exit code ' + IntToStr(Code));
  // 0 done, 3010 done but reboot wanted, 1638 a newer version is already there.
  if (not Ok) or ((Code <> 0) and (Code <> 3010) and (Code <> 1638)) then
    SuppressibleMsgBox(CustomMessage('VcRedistSkipped'), mbInformation, MB_OK, IDOK);
end;

procedure CopySetupLog();
var
  LogDir: String;
begin
  // The app's own logs live under %LOCALAPPDATA%\seowatcher\logs; the setup
  // log goes next to them so "Tanı bilgisini kopyala" and a bug report see it.
  LogDir := ExpandConstant('{localappdata}\seowatcher\logs');
  if ForceDirectories(LogDir) then
    CopyFile(ExpandConstant('{log}'), LogDir + '\setup.log', False);
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then begin
    ApplyAutostart();
    InstallVcRedist();
  end else if CurStep = ssDone then
    CopySetupLog();
end;

// Removes a Run value only if it starts this install's launcher, so another
// copy elsewhere keeps its own.
procedure RemoveAutostart(RootKey: Integer);
var
  Value: String;
begin
  if RegQueryStringValue(RootKey, RunKey, 'seowatcher', Value) and
     (Pos(Lowercase(ExpandConstant('{app}\seowatcher.exe')), Lowercase(Value)) > 0) then
    RegDeleteValue(RootKey, RunKey, 'seowatcher');
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  Folder: String;
begin
  if CurUninstallStep <> usPostUninstall then Exit;
  // The tray menu writes the per-user value even when the installer did not,
  // so it is removed here rather than through an uninsdeletevalue flag.
  RemoveAutostart(HKCU);
  if IsAdminInstallMode then RemoveAutostart(HKA);
  // The crash-dump setting the launcher created for workerd.exe, if it is
  // still the one pointing into seowatcher's log folder.
  if RegQueryStringValue(HKCU, DumpsKey, 'DumpFolder', Folder) and
     (Pos(Lowercase(ExpandConstant('{localappdata}\seowatcher')), Lowercase(Folder)) > 0) then
    RegDeleteKeyIncludingSubkeys(HKCU, DumpsKey);
end;
