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

[Messages]
; Every wizard page carries the version in its bottom-left corner.
tr.BeveledLabel=seowatcher {#AppVersion}
en.BeveledLabel=seowatcher {#AppVersion}
; The window title is the very top line of every page: it names the version too.
tr.SetupWindowTitle=seowatcher {#AppVersion} - Kurulum yardımcısı
en.SetupWindowTitle=Setup - seowatcher {#AppVersion}
; The default Inno texts are generic; these read like the product.
tr.WelcomeLabel1=seowatcher {#AppVersion} kurulumuna hoş geldiniz
tr.WelcomeLabel2=Sitenizin Google verisini kendi bilgisayarınızda okuyan ücretsiz SEO uygulaması kurulacak.%n%nKurulum yalnızca sizin kullanıcı hesabınıza yapılır, yönetici şifresi istemez ve iki dakika sürer.
tr.FinishedHeadingLabel=Kurulum tamamlandı
tr.FinishedLabel=seowatcher {#AppVersion} görev çubuğunda çalışacak ve tarayıcınızda açılacak.%n%nİlk açılış 20-30 saniye sürer. Sonra Google'ı bağlarsınız; uygulama adım adım gösterir.
tr.ClickFinish=Bitirmek için Bitti'ye tıklayın.
en.WelcomeLabel1=Welcome to seowatcher {#AppVersion}
en.WelcomeLabel2=This installs the free SEO app that reads your site's Google data on your own computer.%n%nIt installs for your user account only, needs no administrator password and takes about two minutes.
en.FinishedHeadingLabel=Setup complete
en.FinishedLabel=seowatcher {#AppVersion} will run from the taskbar tray and open in your browser.%n%nThe first start takes 20-30 seconds. Then you connect Google; the app walks you through it.

[Tasks]
Name: "autostart"; Description: "{cm:Autostart}"
Name: "desktopicon"; Description: "{cm:DesktopIcon}"; Flags: unchecked

[Files]
Source: "{#StageDir}\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs ignoreversion

[Icons]
Name: "{autoprograms}\seowatcher"; Filename: "{app}\seowatcher.exe"
Name: "{autodesktop}\seowatcher"; Filename: "{app}\seowatcher.exe"; Tasks: desktopicon

[Registry]
Root: HKA; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "seowatcher"; ValueData: """{app}\seowatcher.exe"" --silent"; Flags: uninsdeletevalue; Tasks: autostart

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

procedure CopySetupLog();
var
  LogDir: String;
begin
  // The app's own logs live under %LOCALAPPDATA%\seowatcher\logs; the setup
  // log goes next to them so "Tanı bilgisini kopyala" and a bug report see it.
  LogDir := ExpandConstant('{localappdata}\seowatcher\logs');
  if ForceDirectories(LogDir) then
    FileCopy(ExpandConstant('{log}'), LogDir + '\setup.log', False);
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  Exe: String;
  Code: Integer;
  Ok: Boolean;
begin
  if CurStep = ssDone then begin
    CopySetupLog();
    Exit;
  end;
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
