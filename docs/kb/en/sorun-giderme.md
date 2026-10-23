---
title: Troubleshooting
description: The most common problems: symptom, cause and fix. Port in use, the Windows warning, Google errors, quota, a stuck audit, empty charts, assistant 401.
kind: sorun-giderme
updated: 2026-10-22
---

The app's interface is in Turkish. This guide gives every button and screen name in Turkish with its English meaning in brackets.

This page tells you briefly what to do when something does not work. First, look at the "Kurulumunuzun durumu" (Your installation status) card on the **Yardım** (Help) screen in the app. The card checks four things: sign-in and access, Google sign-in, the PageSpeed key, and the database. If it says "N şey dikkat istiyor" (N things need attention), the button next to it takes you to the right setting. The list below goes from the most common problem to the rarest.

## The page does not open

**Symptom:** The browser says "connection refused".

**Cause:** The app is not running.

**Fix:** On Windows, look for the icon in the taskbar. If the icon is not visible, click the ^ arrow on the taskbar. If it is not there, open seowatcher from the Start menu. If the icon says "Hata" (Error), right-click it and choose **Yeniden başlat** (Restart). On Docker, run `docker compose ps`. If the status is not healthy, run `docker compose up -d`.

## The port number is in use

**Symptom:** On Windows, the icon says "3001 ve sonraki 9 adres numarası (port) dolu" (3001 and the next 9 ports are in use). On Docker, you see "Bind for 127.0.0.1:3001 failed".

**Cause:** Another program is using the same port number.

**Fix:** The Windows package normally picks a free number between 3002 and 3010. If they are all in use, write a different number in the `config.json` file in the data folder. On Docker, create a `.env` file with the line `PORT=3002` and run `docker compose up -d --force-recreate seotracker`. When the number changes, update the Google redirect addresses too.

## The icon says "Windows bileşeni eksik"

**Symptom:** The app does not open. The icon says "Windows bileşeni eksik" (Windows component missing), or the log shows "Workers runtime failed to start" and "0xc0000005".

**Cause:** The app's engine needs Microsoft's Visual C++ package (2015-2022, 64-bit). On a clean Windows, this package is missing or out of date.

**Fix:** Click the balloon that appears, or right-click the icon (if the icon is not visible, click the ^ arrow on the taskbar) and choose **Eksik Windows bileşenini kur** (Install the missing Windows component). Windows asks for administrator permission once. When the installation finishes, the app restarts by itself. If you do not have the package, download it from Microsoft's page: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Administrator permission was refused

**Symptom:** The installer asked for permission to install Visual C++, you clicked No, and the app does not start.

**Cause:** The Visual C++ component was not installed.

**Fix:** In the tray menu, choose **Eksik Windows bileşenini kur** (Install the missing Windows component) and allow it this time. If the icon is not visible, click the ^ arrow on the taskbar. Or install the component yourself from `https://aka.ms/vs/17/release/vc_redist.x64.exe`.

## The icon says "Uygulamanın motoru çöktü"

**Symptom:** The app does not open. The log has "Workers runtime failed to start" and "0xc0000005", but the Visual C++ package is installed.

**Cause:** The app's engine (workerd) gets stuck on a system file on this computer. At startup, the app tries the engine on its own. If it says it cannot start on its own either, the problem is on the computer. If it says it works on its own, the problem is in the data folder or the configuration.

**Fix:** First choose **Kurulumu onar** (Repair installation). If that does not help, right-click the icon and choose **Sorunu bildir (GitHub)** (Report the problem, GitHub). The diagnostic information (Windows version, processor, the name of the faulty module, the crash dump) is added to the report automatically, and you only send it. The crash dumps are in the `%LOCALAPPDATA%\seowatcher\logs\dumps` folder. You can attach them to the report if you like.

## Windows says "protected your PC"

**Symptom:** The setup file does not open, and a blue warning screen appears.

**Cause:** The file is not signed. Windows shows this screen for publishers it does not know.

**Fix:** Click the **More info** text on the screen (on a Turkish Windows: "Daha fazla bilgi"). The **Run anyway** button (Turkish: "Yine de çalıştır") appears. If you are worried, compare the file's SHA-256 digest (its fingerprint) with `SHA256SUMS.txt` on the release page.

## Google says "redirect_uri_mismatch"

**Symptom:** When you choose **Bağlan** (Connect), Google shows an error page.

**Cause:** The redirect address in Google Cloud Console is not exactly the same as the one in the app.

**Fix:** In the app, go to **Ayarlar → Google** (Settings → Google) and copy both addresses with the copy buttons. Paste them into the address field of the Google access key (the OAuth client) in Cloud Console. localhost versus 127.0.0.1, http versus https, or a slash at the end all make a difference.

## "Google erişim anahtarı eksik"

**Symptom:** In the project settings, the Bağlantılar (Connections) tab shows a yellow warning saying "Google erişim anahtarı eksik" (Google access key missing).

**Cause:** The client ID and the secret key have not been entered in **Ayarlar → Google**. Or, on Docker, the encryption key is shorter than 32 characters.

**Fix:** Do steps 10 and 11 of the Google connection guide. On Docker, if you set `BETTER_AUTH_SECRET` by hand, make it longer. If you leave it empty, the app creates one itself.

## Google says "access_denied"

**Symptom:** After the permission screen, an "iptal edildi" (cancelled) warning appears.

**Cause:** The Google account you signed in with is not in the test users list on the consent screen.

**Fix:** In Cloud Console, add the account under **OAuth izin ekranı → Test kullanıcıları** (OAuth consent screen → Test users). Then choose **Bağlan** (Connect) again.

## The connection has expired

**Symptom:** The integration card says "Bağlantının süresi doldu" (The connection has expired) and no data comes in.

**Cause:** For apps in "Test" status, Google can drop the permission after seven days. The encryption key may also have changed.

**Fix:** On the card, choose **Yeniden bağlan** (Reconnect). If it keeps happening, move the consent screen to production, or switch to a service account (**Ayarlar → Hizmet hesabı**, Settings → Service account).

## There is no query data and the charts are empty

**Symptom:** The Panel (Dashboard) cards are zero. Arama performansı (Search performance) says "Bu dönem için henüz veri yok" (There is no data for this period yet).

**Cause:** There are three possibilities. The site is new and Google is not giving impressions yet. Or Search Console is three days behind and the selected period is too short. Or the wrong property is selected.

**Fix:** Set the period to **Son 3 ay** (Last 3 months). In the project settings, check that the property is the right site. A domain property covers all subdomains, but a URL-prefix property does not. On a new site, query rows can take weeks to arrive. The page table fills earlier.

## The table total does not match the card

**Symptom:** When you add up the impressions in the page table, the result is larger than the number on the card.

**Cause:** This is not a bug. Google counts each page that appears in the same search separately. The card is the site total.

**Fix:** Read the total from the card. Read the table page by page.

## An audit is stuck on "Sürüyor"

**Symptom:** There has been no progress for half an hour.

**Cause:** The app may have restarted, or the job may have dropped.

**Fix:** Wait. The app checks any audit that has looked "sürüyor" (in progress) for more than 15 minutes. If there are no signs of life, it closes the audit as "Başarısız" (Failed) and writes the reason. Then choose **Aynı ayarlarla yeniden başlat** (Restart with the same settings). Do not start two audits with speed testing at the same time. They slow each other down.

## The audit says "Engellendik"

**Symptom:** A yellow warning appears: "Denetim bu siteyi tamamen tarayamadı." (The audit could not crawl this site fully.) or "N sayfada engellendik." (We were blocked on N pages.)

**Cause:** The site's bot protection (Cloudflare or a firewall) stopped the app's site crawler.

**Fix:** In the firewall, allow the user agent named `seotracker-audit`, or add your computer's network address (IP) to the allow list. If the site is not yours, there is nothing you can do. The results stay limited to the pages that could be crawled.

## Speed testing is incomplete or missing

**Symptom:** The Hız (Speed) tab is empty or has very few rows. The quota card says "Kota doldu" (Quota used up), "Dakikalık sınır" (Per-minute limit) or "Anahtar yok" (No key).

**Cause:** There is no PageSpeed key (at most 50 pages are measured). Or Google's daily allowance has run out.

**Fix:** Get a free key by following the PageSpeed key guide. If the daily allowance has run out, it completes in a new audit tomorrow. If speed testing was off when the audit started, it is not measured afterwards for that audit.

## URL Inspection says "daily limit reached"

**Symptom:** In the Dizin durumu (Index status) tab, the button does not work. It says "Google'ın günlük 2.000 adres sınırına ulaşıldı" (Google's daily limit of 2,000 addresses has been reached).

**Cause:** There is an allowance of 2,000 questions per day per property. The app, your assistant and the checks you make by hand in Search Console all use the same pool.

**Fix:** Continue tomorrow. The app only asks again for answers that have gone stale, so your allowance is not wasted.

## Localhost traffic shows up in Analytics

**Symptom:** In the landing pages table, the Alan adı (Domain) column shows localhost or 127.0.0.1.

**Cause:** A test copy of your site loads the same Analytics tag.

**Fix:** Set the tag to load only on the real domain. Most tools have a "domain check" option. The app does not filter these rows out by itself. Until then, read the table with the Alan adı (Domain) column in view.

## The assistant cannot connect (401)

**Symptom:** Claude Code or Codex says "Unauthorized".

**Cause:** The password is not being sent, or it is wrong.

**Fix:** Copy the password again. On Windows, it is in the `mcp-token` file in the data folder. On Docker, run `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Delete the line-break character at the end of the value. Without a terminal: open the file in Notepad, select the whole line and copy it; do not include a line break. In Claude Code, type `/mcp` and choose **Reconnect**.

## Docker takes very long on first start or is "unhealthy"

**Symptom:** `docker compose ps` still does not say healthy after five minutes.

**Cause:** On first start, the app is built inside the box (the container) and needs about 2 GB of memory. If memory is not enough, the build fails.

**Fix:** Run `docker compose logs --tail 50` and look at the last lines. If there is a memory error, give the containers more memory in the Docker Desktop settings. Then run `docker compose up -d --build`.

## Where are my data and logs?

On Windows, everything is in the `%LOCALAPPDATA%\seowatcher` folder: `data` (the database), `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. **Günlükleri aç** (Open logs) and **Veri klasörünü aç** (Open data folder) in the taskbar menu take you there.

On Docker, the data is in the `seotracker_data` volume (`/app/.wrangler`). You see the logs with the `docker compose logs -f` command.

When you report a problem, press the **Tanılama paketi indir** (Download diagnostics bundle) button on the **Yardım** (Help) screen. The file has the version, the setup checks and the last 25 audits. It has no secrets. Attach the file to the issue on GitHub.

## Launcher messages

These messages appear on the Windows icon or in a dialog. The Windows launcher is the small program that starts the app.

- **"Sunucu 120 saniyede yanıt vermedi"** (The server did not answer within 120 seconds): choose **Yeniden başlat** (Restart). If that fails, choose **Günlükleri aç** (Open logs) and read `server.log`.
- **"Kurulum eksik"** (Installation incomplete): run the installer again.
- **"Güncelleme yapılamadı"** (Update failed): check your connection and retry from **Güncelle** (Update). The installed version keeps running.
- **"Windows bileşeni kurulamadı"** (The Windows component could not be installed): choose **Eksik Windows bileşenini kur** (Install the missing Windows component) from the menu.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
