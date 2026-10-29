---
title: Install on Windows
description: Install on Windows with a single file. First launch, update, uninstall, backup and changing the port number. No Docker or terminal needed.
kind: nasil-yapilir
updated: 2026-10-23
---

This guide installs the app on your computer and opens it in the browser. The install takes two minutes. It installs only for your own user account and needs no administrator rights, except once if the Visual C++ component is missing.

The app's interface comes in six languages: Turkish, English, German, French, Italian and Portuguese. This guide uses the English names; to switch, go to **Settings → Appearance → Language**. The Windows tray menu is Turkish only, so there the guide gives the Turkish name with its English meaning in brackets.

## What you need

- Windows 10 or 11 (64-bit).
- About 400 MB of free space. The installer file is 86 MB and the installed app is 313 MB.
- A browser such as Edge, Chrome or Firefox.
- You do not need Docker, Node, a terminal (command window) or administrator rights.
- The app's engine needs Microsoft's Visual C++ package. If your computer does not have it, the installer installs it for you and asks for administrator permission once.

## Steps

### First install

1. Download **seowatcher-setup.exe** from the GitHub releases page. The fixed address is: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Double-click the file.
3. If Windows says "Windows protected your PC", click **More info**, then **Run anyway** (on a Turkish Windows: "Daha fazla bilgi", "Yine de çalıştır"). The file is not signed yet, so Windows does not know the publisher. The warning is expected.
4. Optionally, compare the file's SHA-256 hash (the file's fingerprint) with `SHA256SUMS.txt` on the releases page.
5. In the installer wizard, go through the pages in this order:
   1. The welcome page: click **Next**.
   2. The "install for" page: choose **Install for me only**. This is the recommended per-user install, into `%LOCALAPPDATA%\Programs\seowatcher`. **Install for all users** installs into `C:\Program Files\seowatcher` and asks for administrator permission.
   3. The options page: **Start seowatcher when Windows starts** (Turkish: "Windows açılınca seowatcher'ı başlat") and **Create a desktop shortcut** (Turkish: "Masaüstüne kısayol ekle"). The first one is checked by default. Clear it if you do not want the app to start in the background. Click **Next**.
   4. Click **Install** (on a Turkish Windows: **Kur**).
   5. The final page has a **Start seowatcher now** checkbox. Leave it checked and click **Finish** (on a Turkish Windows: **Bitti**). The app opens.
6. Wait. The first launch takes 20-30 seconds. Look for the seowatcher icon in the notification area (system tray) at the right of the taskbar. If the icon is not visible, click the ^ arrow on the taskbar. The icon's text then changes in turn to "Anahtarlar hazırlanıyor" (Preparing keys), "Veritabanı güncelleniyor" (Updating database) and "Sunucu başlatılıyor" (Starting server). When it is ready, your browser opens by itself. When Windows starts it automatically, the browser does not open; a "seowatcher hazır" (seowatcher is ready) balloon appears instead.
7. `http://127.0.0.1:3001` opens in the browser by itself. This is your computer's own address (127.0.0.1) followed by the port number (3001).

The next step is the Google connection guide.

### Taskbar menu

Right-click the icon (if it is not visible, click the ^ arrow on the taskbar). The menu has four sections. At the top are opening the app and the status line, then update and restart, then two settings, and at the bottom the troubleshooting items.

- **seowatcher'ı aç** (Open seowatcher): opens the app in the browser. Double-clicking the icon does the same. If the app is still starting, a "seowatcher açılıyor" (seowatcher is starting) balloon appears, and the browser opens by itself when it is ready.
- Status line: "Çalışıyor: http://127.0.0.1:3001/" (Running: http://127.0.0.1:3001/), "Veritabanı güncelleniyor" (Updating database) or an error text. It cannot be clicked. If the text is long, hold the mouse over it to see all of it.
- **Eksik Windows bileşenini kur** (Install the missing Windows component): shown only if the Visual C++ package is missing. When you click it, it installs the package and restarts the app.
- **Güncelle** (Update): always in the menu. Click it to check GitHub right away; if there is a new version it downloads and installs it, otherwise it says "Güncel" (up to date). While it checks, the item reads "Kontrol ediliyor…" (Checking…), and while it downloads it reads "Güncelleme indiriliyor: X.Y.Z (%45)" (Downloading update: X.Y.Z (45%)); it cannot be clicked then. When a new version has already been found, the item reads "Güncelle: X.Y.Z sürümü hazır" (Update: version X.Y.Z is ready); the version numbers are examples.
- **Yeniden başlat** (Restart): closes the app and opens it again. If something gets stuck, try this first.
- **Windows açılınca başlat** (Start with Windows): if checked, the app starts in the background when the computer starts. If an administrator turned this setting on during an install for all users of the computer, the item is checked and greyed out, and only an administrator can turn it off.
- **Güncellemeleri kendiliğinden kur** (Install updates automatically): if checked, the app installs a new version by itself when it finds one.
- **Kurulumu onar** (Repair installation): clears temporary files, checks that the package is complete and reopens the app. While it repairs, the item reads "Onarılıyor…" (Repairing…).
- **Tanı bilgisini kopyala** (Copy diagnostic info): copies the Windows version, the processor, the Visual C++ version, a test run of the engine, the faulty module from the Windows event log, crash dumps and the last log lines to the clipboard. The information is ready in a few seconds, then a "Kopyalandı" (Copied) balloon appears. This helps when you report a problem.
- **Sorunu bildir (GitHub)** (Report a problem (GitHub)): puts the same information on the clipboard and opens a pre-filled issue on GitHub. Add one sentence about what you did and send it.
- **Günlükleri aç** (Open logs): opens the log folder. It holds `launcher.log`, `server.log` and `migrate.log`.
- **Veri klasörünü aç** (Open data folder): opens the folder with the database and the keys.
- Version number: the installed version. It cannot be clicked.
- **Çıkış** (Exit): closes the app completely. While it is closed, the page in the browser does not work.

If you start the app a second time (from the Start menu or the desktop shortcut), a second copy does not open. The app that is already open opens the page in the browser; if it is not ready yet, it opens the page when it is.

If the server closes by itself while running, the app reopens it and shows a "seowatcher yeniden başlatılıyor" (seowatcher is restarting) balloon. If it closes three times in ten minutes, the app stops reopening it and the status line reads "Sunucu 10 dakikada üç kez kapandı" (The server closed three times in 10 minutes). Then click **Kurulumu onar** (Repair installation).

### Update

The app updates itself. Two minutes after it opens, and once every day, it checks GitHub for the latest version. If there is a new version, it downloads it, compares the file's fingerprint (SHA-256) with the value on the releases page, then installs it silently and reopens. During this the icon text reads "Güncelleme indiriliyor" (Downloading update) and "Güncelleme kuruluyor" (Installing update), and a small installer window shows briefly. When the app reopens, a "seowatcher X.Y.Z sürümüne güncellendi" (seowatcher was updated to version X.Y.Z) balloon appears; click it to open the list of what is new. The **Settings → About** section inside the app also tells you about the new version and points you to **Güncelle** (Update) on the icon.

- If you do not want it to install by itself, clear **Güncellemeleri kendiliğinden kur** (Install updates automatically) in the menu. Then, when a new version comes out, you see a balloon once, and the menu item reads "Güncelle: X.Y.Z sürümü hazır" (Update: version X.Y.Z is ready). Click the balloon or the item to install.
- If there is no internet connection, or GitHub does not answer at that moment, the app tries again an hour later. For automatic attempts, it warns only once per version.
- If the downloaded file's fingerprint does not match, the update is not installed and the installed version keeps running.
- An install for all users of the computer needs administrator permission to update, so the app does not install by itself there. When a new version comes out you see a balloon; when you click it, Windows asks for administrator permission.
- To update by hand, download the new installer from the same address and run it. The wizard closes the running app, replaces the files and starts it again. The **Start seowatcher when Windows starts** (Turkish: "Windows açılınca seowatcher'ı başlat") checkbox in the wizard shows your current setting from the menu.

Your data, your Google connection and your settings stay as they are. An automatic update does not touch the **Windows açılınca başlat** (Start with Windows) setting.

### Company deployment

For IT teams that want to install for all users of a computer, or install silently with a deployment tool (Intune, GPO, PDQ):

- **For all users**: run the installer as administrator and choose the "all users" option in the wizard. The app installs under `C:\Program Files\seowatcher` (the per-user install goes to `%LOCALAPPDATA%\Programs\seowatcher`). Each user's data still stays in their own `%LOCALAPPDATA%\seowatcher` folder.
- **Silent install**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (single user) or `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (administrator, all users). When a silent install finishes, the app opens by itself.
- **Install log**: every install writes to `%LOCALAPPDATA%\seowatcher\logs\setup.log`. You can give another place with `/LOG="path"`.
- **Silent uninstall**: `unins000.exe /VERYSILENT` (in the install folder: `%LOCALAPPDATA%\Programs\seowatcher` for a per-user install, `C:\Program Files\seowatcher` for all users).
- **Verification**: before each version is published, it is installed on a clean Windows machine, opened, left running until the health address responds, and uninstalled. A version is not published until this test passes.

### Repair

If something gets stuck, right-click the icon and click **Kurulumu onar** (Repair installation); if the icon is not visible, click the ^ arrow on the taskbar. The app clears temporary files and checks that the package is complete. When it then opens, it runs the database update again.

If a file has been deleted from the package (for example, an antivirus program quarantined it), the app downloads the installer of the installed version from GitHub, verifies its fingerprint and reinstalls itself. Your data is not touched. If there is no internet connection, it says "Kurulum eksik" (Installation incomplete) and opens the releases page; then download the installer and run it.

### Uninstall

1. In Windows, open **Settings → Apps → Installed apps** and find **seowatcher**.
2. Click **Uninstall**.

The uninstaller removes the program, the Start menu shortcut the "start with Windows" entry (including one you turned on from the menu) and downloaded update files. It does not touch the data folder, and the uninstall window says so too. If you also want to delete your database, your Google connection and your reports, delete the data folder yourself.

### Where is the data and how do I back it up?

Everything is in one folder: `%LOCALAPPDATA%\seowatcher`. Type this into the File Explorer address bar. The **Veri klasörünü aç** (Open data folder) menu item goes there too. It holds:

- `data`: the database (projects, the Search Console archive, audits, reports).
- `instance-secret`: the key that encrypts the Google access keys. If it is lost, you must set up the Google connections again from scratch.
- `mcp-token`: the password your AI assistant uses when it connects to the app.
- `server.env`, `config.json`, `logs`.

To make a backup:

1. Close the app with **Çıkış** (Exit).
2. Copy the whole folder.

To restore, close the app, put the folder back in place and start the app. Moving to another computer works the same way. If you take the `instance-secret` file too, the Google connections keep working.

### Changing the port number

The app uses port 3001. If another program holds it, the app picks the first free number from 3002 to 3010, but only for that one start, and shows a "3001 numarası dolu, 3002 kullanılıyor" (Port 3001 is in use, using 3002) balloon. It does not save this number. When 3001 is free again, the app uses 3001 on the next start, because the redirect addresses at Google contain this number.

To choose a specific port:

1. Close the app.
2. Open the `config.json` file in the data folder with Notepad.
3. Write this in it:

```json
{
  "port": 3005
}
```

4. Save it and start the app. If the file has other lines (such as `autoUpdate`), do not delete them; change only the value of `port`.

When the number changes, also update the two redirect addresses at Google with the new number. These addresses are explained in the Google connection guide.

## Check

- When you hover over the taskbar icon (if it is not visible, click the ^ arrow on the taskbar), it should read "seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/" (seowatcher 0.5.0 Alpha: Running: http://127.0.0.1:3001/). The version number is the one you installed.
- In the browser, the address `http://127.0.0.1:3001/api/health` should show a text that starts with "status":"ok".
- On the **Help** screen, the "Your setup status" card should say "Everything looks good.". Before Google is connected, the "Google sign-in" row asks for attention. This is normal.

## Frequently asked questions

**Why does it open in the browser?** The app runs on your computer like a small server. The browser is its screen.

**What happens when I turn off the computer?** The app closes too. If **Windows açılınca başlat** (Start with Windows) is checked, it starts by itself the next time the computer starts.

**Can I open it from another computer?** No, and this is on purpose. The app listens only on the 127.0.0.1 address. To open it to the internet, you need to put your own authentication in front of it.

**Can I switch from the Docker version?** Yes, but the data does not move by itself. You need to create the projects and connect Google again. The Search Console archive fills up again on the first launch.

**My antivirus gave a warning.** Some antivirus programs warn because the file is unsigned. Download the file only from the GitHub releases page and compare its SHA-256 hash.

## If something goes wrong

- **The icon says "Hata: 3001 ve sonraki 9 adres numarası (port) dolu" (Error: 3001 and the next 9 ports are in use).** Another program holds these numbers. Write another number in the `config.json` file.
- **The icon says "Veritabanı güncellemesi başarısız" (Database update failed).** Click **Günlükleri aç** (Open logs) and check the last lines of `migrate.log`. Usually the disk is full or the folder is read-only.
- **The icon says "Sunucu beklenmedik şekilde kapandı" (The server closed unexpectedly) or "Sunucu 10 dakikada üç kez kapandı" (The server closed three times in 10 minutes).** The last lines of `server.log` give the reason. Try **Yeniden başlat** (Restart), and if that does not help, **Kurulumu onar** (Repair installation). If it still does not help, click **Sorunu bildir (GitHub)** (Report a problem (GitHub)).
- **The icon says "Veritabanı güncellemesi 15 dakikada bitmedi" (The database update did not finish in 15 minutes).** Another program may have locked the database file (a backup or sync program). Stop that program and click **Yeniden başlat** (Restart).
- **The browser did not open.** Double-click the icon or type the address by hand: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->

## Windows notifications

Right-click the seowatcher tray icon and use **Windows bildirimleri** (Windows notifications, on by default). While the launcher runs, completed/failed audits from all projects and new announcements appear as Windows balloons within about 90 seconds, even with the browser closed or in the background. Click to open the relevant page; several events form one summary. First use skips old events; restarting does not replay seen events. Events received while muted are not replayed later. New-version notifications follow the existing update setting. Windows Focus/Do not disturb can hide notifications. No notifications appear when the launcher is closed. This feature is unavailable in Docker.
