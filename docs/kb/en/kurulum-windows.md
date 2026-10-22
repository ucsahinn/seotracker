---
title: Install on Windows
description: Install on Windows with a single file. First launch, update, uninstall, backup and changing the port number. No Docker or terminal needed.
kind: nasil-yapilir
updated: 2026-10-22
---

By the end of this page the app is installed on your computer and open in the browser. The install takes two minutes. It installs only for your own user account and does not ask for an administrator password.

## What you need

- Windows 10 or 11 (64-bit).
- About 350 MB of free space. The installer file is 81 MB and the installed app is 290 MB.
- A browser such as Edge, Chrome or Firefox.
- You do not need Docker, Node, a terminal (command window) or administrator rights.
- The app's engine needs Microsoft's Visual C++ package. If your computer does not have it, the installer installs it for you and asks for administrator permission once.

## Steps

### First install

1. Download **seowatcher-setup.exe** from the GitHub releases page. The fixed address is: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Double-click the file.
3. If Windows says "Windows protected your PC", click **Daha fazla bilgi** (More info), then **Yine de çalıştır** (Run anyway). The file is not signed yet, so Windows does not know the publisher. This warning is normal.
4. If you like, compare the file's SHA-256 hash (the file's fingerprint) with `SHA256SUMS.txt` on the releases page.
5. Look at the two options in the wizard: **Windows açılınca seowatcher'ı başlat** (Start seowatcher when Windows starts) and **Masaüstüne kısayol ekle** (Add a shortcut to the desktop). The first one is ticked by default. Untick it if you do not want the app to start in the background.
6. Click **Kur** (Install), then click **Son** (Finish) on the last screen. The app opens.
7. Wait. The first launch takes 20-30 seconds. The text on the taskbar icon changes in turn to "Anahtarlar hazırlanıyor" (Preparing keys), "Veritabanı güncelleniyor" (Updating database) and "Sunucu başlatılıyor" (Starting server).
8. `http://127.0.0.1:3001` opens in the browser by itself. This is your computer's own address (127.0.0.1) and the port number (port: 3001).

The next step is the Google connection guide.

### Taskbar menu

Right-click the icon. The menu has these items:

- **seowatcher'ı aç** (Open seowatcher): opens the app in the browser. Double-clicking the icon does the same.
- **Yeniden başlat** (Restart): closes the app and opens it again. If something gets stuck, try this first.
- **Günlükleri aç** (Open logs): opens the log folder. It holds `launcher.log`, `server.log` and `migrate.log`.
- **Tanı bilgisini kopyala** (Copy diagnostic info): copies the Windows version, the processor, the Visual C++ version, an engine trial run, the faulty module from the Windows event log, crash dumps and the last log lines to the clipboard.
- **Sorunu bildir (GitHub)** (Report a problem (GitHub)): puts the same information on the clipboard and opens a pre-filled issue on GitHub. Add one sentence about what you did and send it.
- **Eksik Windows bileşenini kur** (Install the missing Windows component): shown only if the Visual C++ package is missing. When you click it, it installs the package and restarts the app.
- **Kurulumu onar** (Repair installation): clears temporary files, checks the package and reopens the app.
- **Güncelle** (Update): shown only if there is a new version.
- **Güncellemeleri kendiliğinden kur** (Install updates automatically): if ticked, the app installs a new version by itself when it finds one.
- **Veri klasörünü aç** (Open data folder): opens the folder with the database and the keys.
- **Windows ile başlat** (Start with Windows): if ticked, the app starts in the background when the computer starts.
- **Çıkış** (Exit): closes the app completely. While it is closed, the page in the browser does not work.

The menu also shows a status line ("Çalışıyor: http://127.0.0.1:3001/" (Running: http://127.0.0.1:3001/) or an error text) and the version number.

If you start the app a second time, no new copy opens. Only the page opens in the browser.

### Update

The app updates itself. Two minutes after it opens, and once every day, it checks GitHub for the latest version. If there is a new version, it downloads it, compares the file's fingerprint (SHA-256) with the value on the releases page, then installs it silently and reopens. During this the icon text reads "Güncelleme indiriliyor" (Downloading update) and "Güncelleme kuruluyor" (Installing update). The **Ayarlar → Hakkında** (Settings → About) section inside the app also announces the new version and sends you to **Güncelle** on the icon.

- If you do not want it to install by itself, untick **Güncellemeleri kendiliğinden kur** in the menu. Then, when a new version comes out, you see a balloon and the **Güncelle** item appears in the menu.
- To update by hand, download the new installer from the same address and run it. The wizard closes the running app, replaces the files and starts it again.

Your data, your Google connection and your settings stay as they are.

### Company deployment

For IT teams that want to install for all users of a computer, or install silently with a deployment tool (Intune, GPO, PDQ):

- **For all users**: run the installer as administrator and choose the "all users" option in the wizard. The app installs under `Program Files\seowatcher`. Each user's data still stays in their own `%LOCALAPPDATA%\seowatcher` folder.
- **Silent install**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (single user) or `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (administrator, all users). When a silent install finishes, the app opens by itself.
- **Install log**: every install writes to `%LOCALAPPDATA%\seowatcher\logs\setup.log`. You can give another place with `/LOG="path"`.
- **Silent uninstall**: `unins000.exe /VERYSILENT` (in the install folder).
- **Verification**: before each version is published, it is installed on a clean Windows machine, opened, waited on until the health address responds, and uninstalled. A version is not published until this test passes.

### Repair

If something gets stuck, right-click the icon and click **Kurulumu onar** (Repair installation). The app clears temporary files, checks that the package is complete, checks the database again and opens. If a file is missing, it tells you and opens the releases page. You only need to run the installer again.

### Uninstall

1. In Windows **Ayarlar → Uygulamalar → Yüklü uygulamalar** (Settings → Apps → Installed apps), find **seowatcher**.
2. Click **Kaldır** (Uninstall).

The uninstaller removes the program, the Start menu shortcut and the "start with Windows" entry. It does not touch the data folder. If you also want to delete your database, your Google connection and your reports, delete the data folder yourself.

### Where is the data and how do I back it up?

Everything is in one folder: `%LOCALAPPDATA%\seowatcher`. Type this into the File Explorer address bar. The **Veri klasörünü aç** (Open data folder) menu item goes there too. It holds:

- `data`: the database (projects, the Search Console archive, audits, reports).
- `instance-secret`: the key that encrypts the Google access keys. If it is lost, you set up the Google connections again from scratch.
- `mcp-token`: the password your AI assistant uses when it connects to the app.
- `server.env`, `config.json`, `logs`.

To make a backup:

1. Close the app with **Çıkış** (Exit).
2. Copy the whole folder.

To restore, close the app, put the folder back in place and start the app. Moving to another computer works the same way. If you take the `instance-secret` file too, the Google connections keep working.

### Changing the port number

The app uses number 3001. If another program holds it, the app picks the first free number from 3002 to 3010. It writes the number it chose to the `config.json` file.

If you want a specific number:

1. Close the app.
2. Open the `config.json` file in the data folder with Notepad.
3. Write this in it:

```json
{
  "port": 3005
}
```

4. Save it and start the app.

When the number changes, also update the two redirect addresses at Google with the new number. These addresses are explained in the Google connection guide.

## Check

- When you hover over the taskbar icon, it should read "seowatcher: Çalışıyor: http://127.0.0.1:3001/" (seowatcher: Running: http://127.0.0.1:3001/).
- In the browser, the address `http://127.0.0.1:3001/api/health` should show a text that starts with "status":"ok".
- On the **Yardım** (Help) screen, the "Kurulumunuzun durumu" (Your setup status) card should say "Her şey yolunda." (Everything is fine.). Before Google is connected, the "Google girişi" (Google sign-in) row asks for attention. This is normal.

## Frequently asked questions

**Why does it open in the browser?** The app runs on your computer like a small server. The browser is its screen.

**What happens when I turn off the computer?** The app closes too. If "Windows ile başlat" (Start with Windows) is ticked, it starts by itself the next time the computer starts.

**Can I open it from another computer?** No, and this is on purpose. The app listens only on the 127.0.0.1 address. To open it to the internet, you need to put your own authentication in front of it.

**Can I switch from the Docker version?** Yes, but the data does not move by itself. You create the projects again and connect Google again. The Search Console archive fills up again on the first launch.

**My antivirus gave a warning.** Because the file is unsigned, some antivirus programs warn. Download the file only from the GitHub releases page and compare its SHA-256 hash.

## If something goes wrong

- **The icon says "Hata: Port 3001 ve sonraki 9 port dolu" (Error: Port 3001 and the next 9 ports are in use).** Another program holds these numbers. Write another number in the `config.json` file.
- **The icon says "Veritabanı güncellemesi başarısız" (Database update failed).** Click **Günlükleri aç** (Open logs) and look at the last lines of `migrate.log`. Most of the time the disk is full or the folder is read-only.
- **The icon says "Sunucu beklenmedik şekilde kapandı" (The server closed unexpectedly).** The last lines of `server.log` give the reason. Try **Yeniden başlat** (Restart). If it does not help, share the log in an issue on GitHub.
- **The browser did not open.** Double-click the icon or type the address by hand: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
