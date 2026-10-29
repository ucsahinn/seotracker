---
title: Troubleshooting
description: Symptom, cause and fix for the problems users hit most: port conflicts, Windows warnings, Google errors, quotas, audits and agent access.
kind: sorun-giderme
updated: 2026-10-27
---

Start with the **App health** card on the [Help](/docs/yardim/) screen. It checks sign-in and access, Google sign-in, the PageSpeed key, the runtime and the database, and links each problem to the setting that fixes it. The sections below run from the most common problem to the rarest. Tray menu items are in Turkish only, so they are given in Turkish with the English meaning in brackets.

## The page does not open

**Symptom:** The browser says "connection refused".

**Cause:** The app is not running.

**Fix (Windows package):** Look for the seowatcher icon in the notification area; click the ^ arrow on the taskbar if it is hidden. If there is no icon, open seowatcher from the Start menu. Hovering over the icon should show "Çalışıyor: http://127.0.0.1:3001/" (Running); if the port number is different, open that address. If it says "Hata" (Error), right-click it and choose **Yeniden başlat** (Restart), or if that does not help, **Kurulumu onar** (Repair installation). **Günlükleri aç** (Open logs) shows the reason in the last lines of `launcher.log` and `server.log`.

**Fix (Docker):** First check that Docker Desktop is running. In the project folder, run `docker compose ps`. If the status is not healthy, run `docker compose up -d`; `docker compose logs --tail 50` shows the reason.

## The port number is in use

**Symptom:** On Windows, a yellow strip appears at the top of every screen in the app: "seowatcher is running on 3002 this time because another program is using 3001 (for example an old Docker copy). Google sign-in is set up for 3001; close that program and restart seowatcher." Connecting to Google gives an error. Or the icon says "3001 ve sonraki 9 adres numarası (port) dolu" (3001 and the next 9 ports are in use). The same sentence is written in the "App health" card on the **Help** screen. On Docker, you see "Bind for 127.0.0.1:3001 failed".

**Cause:** Another program is using the same port number. The most common cause is an old Docker copy you once ran. Docker Desktop can restart it by itself when the computer starts. Google's redirect addresses name 3001, so Google sign-in does not work while the app is open on 3002.

**Fix:** The Windows package normally picks a free number between 3002 and 3010, tells you in a balloon and in the strip above, and uses it only for that one start. First close the program that holds 3001. If it is an old Docker copy, stop the seotracker container in Docker Desktop, or run `docker compose stop` in the project folder. Then choose **Yeniden başlat** (Restart) in the menu. The app returns to 3001 and the strip disappears. Closing the strip only hides it for that tab; it does not fix anything. If they are all in use, write a different number in the `config.json` file in the data folder. On Docker, create a `.env` file with the line `PORT=3002` and run `docker compose up -d --force-recreate seotracker`. When the number changes, update the Google redirect addresses too.

## The icon says "Windows bileşeni eksik"

**Symptom:** The app does not open. The icon says "Windows bileşeni eksik" (Windows component missing), or the log shows "Workers runtime failed to start" and "0xc0000005".

**Cause:** The app's engine needs Microsoft's Visual C++ package (2015-2022, 64-bit). On a clean Windows, this package is missing or out of date.

**Fix:** Click the notification that appears, or right-click the tray icon and choose **Eksik Windows bileşenini kur** (Install the missing Windows component). Windows asks for administrator permission once. When the installation finishes, the app restarts by itself. You can also download the package from Microsoft: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Administrator permission was refused

**Symptom:** The installer asked for permission to install Visual C++, you clicked No. The installer said "Microsoft Visual C++ çalışma zamanı kurulamadı" (The Microsoft Visual C++ runtime could not be installed).

**Cause:** The Visual C++ component was not installed. Because the app carries a copy of the files it needs, it still starts on most computers.

**Fix:** If the app started, you do not need to do anything. If it did not, choose **Eksik Windows bileşenini kur** (Install the missing Windows component) in the tray menu and allow it this time, or install the component yourself from `https://aka.ms/vs/17/release/vc_redist.x64.exe`.

## The icon says "Uygulamanın motoru çöktü"

**Symptom:** The app does not open. The log has "Workers runtime failed to start" and "0xc0000005", but the Visual C++ package is installed.

**Cause:** The app's engine (workerd) gets stuck on a system file on this computer. At startup, the app tests the engine by itself. If that test fails too, the problem is on the computer; if it passes, the problem is in the data folder or the configuration.

**Fix:** First choose **Kurulumu onar** (Repair installation). If that does not help, right-click the icon and choose **Sorunu bildir (GitHub)** (Report the problem, GitHub). The diagnostic information (Windows version, processor, the name of the faulty module, the crash dump) is added to the report automatically, so you only need to send it. The crash dumps are in the `%LOCALAPPDATA%\seowatcher\logs\dumps` folder, and you can attach them to the report too.

## Windows says "protected your PC"

**Symptom:** The setup file does not open, and a blue warning screen appears.

**Cause:** The file is not signed. Windows shows this screen for publishers it does not know.

**Fix:** Click **More info**, then **Run anyway**. To be sure, compare the file's SHA-256 digest (its fingerprint) with `SHA256SUMS.txt` on the release page.

## Google says "redirect_uri_mismatch"

**Symptom:** When you choose **Connect**, Google shows an error page.

**Cause:** The redirect address in Google Cloud Console is not exactly the same as the one in the app.

**Fix:** In the app, open **Settings → Google** and copy both redirect URIs with the copy buttons. Paste them into the OAuth client's **Authorized redirect URIs** in Google Cloud Console. Any difference matters: localhost instead of 127.0.0.1, http instead of https, or a slash at the end.

## "Google access key missing"

**Symptom:** The **Connections** tab in project settings shows a yellow "Google access key missing" warning.

**Cause:** Neither a service account (**Settings → Service account**) nor an OAuth client ID and secret (**Settings → Google**) has been saved. Or the encryption key is damaged, so the saved Google details cannot be opened.

**Fix:** Save a service account or an OAuth client (see [Connecting to Google](/docs/google-baglantisi/)). One of them is enough; if both are saved, the service account is used. The "Google sign-in" row on the **Help** screen says which one is in use.

- **Windows package:** the encryption key is the `instance-secret` file in the data folder, created once by the launcher. If the icon says this file is damaged, restore it from a backup; if Google was never connected, delete the file and choose **Yeniden başlat** (Restart).
- **Docker:** if you set `BETTER_AUTH_SECRET` by hand, it must be at least 32 characters. If you leave it empty, the container creates one itself.

## Google says "access_denied"

**Symptom:** After Google's permission screen, the app says "Google sign-in was canceled".

**Cause:** The Google account you signed in with is not in the test users list on the consent screen.

**Fix:** In Cloud Console, add the account under **OAuth consent screen → Test users**. Then choose **Connect** again.

## The connection has expired

**Symptom:** The integration card says "The connection has expired" and no data comes in.

**Cause:** For apps in "Test" status, Google can expire the permission after seven days. The encryption key may also have changed.

**Fix:** On the card, choose **Reconnect**. If it keeps happening, move the consent screen to production, or switch to a service account (**Settings → Service account**).

## There is no query data and the charts are empty

**Symptom:** The **Dashboard** cards show zero. Search performance says "No data for this period yet".

**Cause:** There are three possible causes: the site is new and Google has not shown it yet; Search Console is three days behind and the selected period is too short; or the wrong property is selected.

**Fix:** Set the period to **Last 3 months**. In the project settings, check that the property is the right site. A domain property covers all subdomains, but a URL-prefix property does not. On a new site, query rows can take weeks to arrive. The page table fills earlier.

## The table total does not match the card

**Symptom:** When you add up the impressions in the page table, the result is larger than the number on the card.

**Cause:** This is not a bug. Google counts each page that appears in the same search separately. The card is the site total.

**Fix:** Read the total from the card. Read the table page by page.

## An audit is stuck on "In progress"

**Symptom:** There has been no progress for half an hour.

**Cause:** The app may have restarted, or the job may have dropped.

**Fix:** Wait. The app checks any audit that has shown "In progress" for more than 15 minutes. If there are no signs of life, it closes the audit as "Failed" and records the reason. Then choose **Run again with the same settings**. Do not start two audits with speed testing at the same time. They slow each other down.

## The audit says "The audit stopped before it could finish"

**Symptom:** The audit screen says "The audit stopped during the crawl phase." or "The audit stopped before it could finish." Instead of the score, it says "Incomplete audit — no score given".

**Cause:** The screen says three things: what happened, whether the fault is in your site or in the app, and what to do. The title says in which phase it stopped: URL discovery, crawl, speed test or results preparation.

**Fix:** Follow the sentence on the screen.

- **A step did not finish in time.** Usually the site is answering very slowly. Try again in a few minutes. If it happens again, start with fewer pages.
- **The audit did not fit in the memory**, **went over the processor time**, or **the result of one step was larger than the app can store.** Very large or complex pages cause this. Start again with fewer pages.
- **An error occurred while writing the results to the database.** The disk may be full or the data file may be locked by another program. Check that the disk has free space, restart the app, then start the audit again.
- **The app's internal audit engine reported an error.** Choose **Yeniden başlat** (Restart) in the tray menu, then start the audit again.
- **The audit was cut off.** The app may have been closed or restarted in the middle of it. Make sure the app stays open and start the audit again.
- **The install key did not reach the part that runs audits.** Your saved Google and PageSpeed keys were not deleted. Update or restart the app, then start the audit again.
- **An unexpected error.** Start the audit again. If it keeps happening, download the diagnostics bundle from the **Help** screen and report the problem.

The raw error text does not reach the screen. It stays in the diagnostics bundle.

## The audit says "Partial score"

**Symptom:** The score has no rating word beside it. A line like "Partial score — measurement coverage 62%" is there.

**Cause:** A large share of the checks could not be measured (the share of measured checks is below 70 percent, or fewer than half the checks in Crawling, Indexing, Content or Speed were measured). The lines under the card give the reasons: the PageSpeed quota ran out, there is no PageSpeed key, speed testing was turned off, or no index data could be fetched from Search Console.

**Fix:** Turn on speed measurement, add a PageSpeed key or connect Search Console, then run the audit again. The score is based on what was measured. No judgement, good or bad, was made about the rest.

## The audit says "Incomplete audit — no score given"

**Symptom:** This sentence sits where the score card would be. The findings are still shown below it.

**Cause:** The audit stopped with an error, is still running, or the crawl stopped early because of the site's rate limit. The issue list is incomplete, so no score was calculated. If no page could be crawled, the score card does not appear at all.

**Fix:** Read the reason in the section above. Run the audit again once the rate limit has reset or the problem is fixed. The findings apply to the pages that were crawled.

## The audit finished but says "the speed test ran without a key"

**Symptom:** The audit completed. A warning says "The saved PageSpeed key could not be read, so the speed test ran without a key." The Speed tab has at most 50 pages.

**Cause:** The part that runs audits did not receive the install key that opens the saved key, so the speed test ran without it. The crawl results were not affected.

**Fix:** Update or restart the app, then start a new audit. If it continues, save the PageSpeed key again in **Settings**.

## The audit says it was blocked

**Symptom:** A yellow warning says "The audit could not fully crawl this site." or "We were blocked on N pages."

**Cause:** The site's bot protection (Cloudflare or a firewall) stopped the app's site crawler.

**Fix:** In the firewall, allow the user agent named `seotracker-audit`, or add your computer's network address (IP) to the allow list. If the site is not yours, you cannot fix this. The results stay limited to the pages that could be crawled.

## Speed testing is incomplete or missing

**Symptom:** The Speed tab is empty or has very few rows. The quota card says "Quota used up", a per-minute limit message or "No key".

**Cause:** There is no PageSpeed key (at most 50 pages are measured). Or Google's daily allowance has run out.

**Fix:** Add a free key; see [PageSpeed key](/docs/pagespeed-anahtari/). If the daily allowance has run out, a new audit tomorrow completes the measurement. If speed testing was off when an audit started, that audit is never measured afterwards.

## URL Inspection says "daily limit reached"

**Symptom:** On the **Index status** tab, **Check status on Google** is disabled and the tab says "Google's daily limit of 2,000 URLs is used up".

**Cause:** Google allows 2,000 questions per day per property. The app, your assistant and the checks you make by hand in Search Console all use the same pool.

**Fix:** The limit counts the last 24 hours, so the allowance frees up gradually within hours; continue then. The app only asks again for answers that have gone stale, so your allowance is not wasted.

## The Analytics card or report shows an error

**Symptom:** The **Organic traffic** card on the **Dashboard**, or the Analytics screen, shows a sentence instead of data, with **Fix the connection** and **Try again** buttons.

**Cause:** The sentence gives the cause and the fix. The main cases are these.

- **The connection has expired or was revoked.** Connect it again in **Settings**.
- **Access to this property was refused (HTTP 403).** Give the connected account or service account at least the Viewer role on the property.
- **The property was not found (HTTP 404).** It may have been deleted or moved. Choose it again in **Settings**.
- **No property is connected to this project.** Choose one in **Settings**.
- **The reporting quota is used up (HTTP 429).** The quota refreshes hourly and daily. Try again later.
- **The Google Analytics Data API is off in the Google Cloud project.** Turn on "Google Analytics Data API" in Google Cloud Console and try again.
- **The report is not compatible with the selected property (HTTP 400).** Check the property or choose another.
- **Google returned an invalid answer or is not answering for the moment.** Try again shortly.
- **Google cannot be reached.** Check this computer's internet connection.

**Fix:** Do the step the sentence names. Most often **Fix the connection** takes you to the right setting.

## A Search Console request shows an error

**Symptom:** Search performance, Opportunities or Rank tracking shows a Search Console error instead of data.

**Cause:** The error sentence names the cause.

- **The request was found invalid (HTTP 400).** This is not a connection problem. The chosen dimension, filter or search type cannot be used on this property. Remove the filters.
- **Access to the property was refused (HTTP 401 or 403).** Check that the account has verified permission on the property, or refresh the connection in **Settings**.
- **The property was not found (HTTP 404).** It may have been removed from Search Console. Choose it again in **Settings**.
- **The request limit is used up (HTTP 429).** Try again in a few minutes.
- **It did not answer in time.** Try again shortly.
- **It is not answering for the moment (another HTTP code).** Try again shortly. If it continues, look at Google's status page.
- **Google cannot be reached.** The sentence gives a detail on the "Reason" line. If it continues, check this computer's internet connection.

**Fix:** Do the step the sentence names. For account and property problems, refreshing the connection in **Settings** is usually enough.

## Localhost traffic shows up in Analytics

**Symptom:** In the landing pages table, the Domain column shows localhost or 127.0.0.1.

**Cause:** A test copy of your site loads the same Analytics tag.

**Fix:** Set the tag to load only on the real domain. Most tools have a "domain check" option. The app does not filter these rows out, so until you fix the tag, read the table with the **Domain** column in view.

## The assistant cannot connect (401)

**Symptom:** Claude Code or Codex says "Unauthorized".

**Cause:** The client is not sending the token, or the token is wrong.

**Fix:** Use **Copy setup command** on the **Agent setup** screen. The command detects your install type and puts the token into your tool's settings without printing it. To set it by hand, read the token again as shown below, and never paste it into a chat or screenshot.

- **Windows package:** the token is in the file `%LOCALAPPDATA%\seowatcher\mcp-token` (menu: **Veri klasörünü aç**, Open data folder). The launcher creates it on first start and hands it to the app at every start. To copy it to the clipboard without printing it, in PowerShell: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`. Clear the clipboard after pasting (Win+V, Clear all). There is no `docker` command on this install.
- **Docker:** the token is inside the container: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. In Git Bash, put `MSYS_NO_PATHCONV=1` in front, or the output comes back empty. Leave out the line break at the end of the value. You can set your own token with `MCP_TOKEN` in `.env`; after changing it, run `docker compose up -d --force-recreate seotracker`.

Then, in Claude Code, type `/mcp` and choose **Reconnect**.

## I changed a setting and the app does not see it

**Symptom:** A new port number, `.env` value or token has not reached the app.

**Cause:** What you enter on the Settings screen (Google, service account, PageSpeed key, language) applies immediately. Settings in files are read only at the next start, and the two installs keep them in different files.

**Fix (Windows package):** There is no `.env` and there are no environment variables. The only file you edit by hand is `config.json` in the data folder: `"port"` and `"autoUpdate"`. After changing it, choose **Yeniden başlat** (Restart) in the menu. Do not edit the `server.env` file next to it; the launcher rewrites it at every start.

**Fix (Docker):** The variables are in the `.env` file in the project folder (list: `docs/ENVIRONMENT.md`). After changing it, recreate the container: `docker compose up -d --force-recreate seotracker`. A plain `docker compose restart seotracker` only restarts it and does not apply a `.env` change.

## Docker takes very long on first start or is "unhealthy"

**Symptom:** `docker compose ps` still does not say healthy after five minutes.

**Cause:** On first start, the app is built inside the container and needs about 2 GB of memory. If memory is not enough, the build fails.

**Fix:** Run `docker compose logs --tail 50` and check the last lines. If there is a memory error, give the containers more memory in the Docker Desktop settings. Then run `docker compose up -d --build`.

## Where are my data and logs?

On Windows, everything is in the `%LOCALAPPDATA%\seowatcher` folder: `data` (the database), `logs\launcher.log`, `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. When a log file grows too large (`server.log` 5 MB, the others 1 MB), the old one stays beside it under a name like `server.old.log` and a new one starts from the beginning. The `logs\wrangler` folder holds the engine's own detailed logs; files older than 30 days are deleted automatically. **Open logs** and **Open data folder** in the taskbar menu take you there.

On Docker, the data is in the `seotracker_data` volume (`/app/.wrangler`). You see the logs with the `docker compose logs -f` command.

When you report a problem, press **Download diagnostics bundle** on the **Help** screen. The package includes phase and error summaries for the last 25 audits; page URLs are removed from PageSpeed error text. It may contain identifying details such as project names and domains, so review it before attaching it to a GitHub issue.

## A Windows setting cannot be saved

**Symptom:** Changing an option in the Windows section of **Settings** gives an error, or the section says Windows preferences are unavailable.

**Cause:** This section talks to the app in the taskbar. The error sentence says which of these it is.

- **The tray app did not answer within 4 seconds.** If the computer just woke from sleep, press **Try again** after a few seconds. If it persists, choose **Çıkış** (Exit) in the tray menu and open the app again.
- **Could not connect to the tray app's settings service.** The tray app may have closed. Open seowatcher again from the Start menu.
- **This preference is locked by an administrator.** Only the computer's administrator can change it.
- **The tray app did not recognise this request.** The server and the tray app may be left over from different sessions. Choose **Çıkış** (Exit) in the tray menu and open the app again.
- **The tray app refused the settings request.** Restart the app from the tray menu. If it persists, update the Windows package.
- **The tray app returned an unrecognised answer.** The app and tray versions may not match. Update the Windows package.

**Fix:** Do the step the sentence names. These options exist only in the Windows package. On Docker, you manage startup behaviour from your operating system.

## Launcher messages

These messages appear on the Windows icon or in a dialog. The Windows launcher is the small program that starts the app.

- **"Sunucu 120 saniyede yanıt vermedi"** (The server did not answer within 120 seconds): choose **Yeniden başlat** (Restart). If that fails, choose **Günlükleri aç** (Open logs) and read `server.log`.
- **"seowatcher yeniden başlatılıyor"** (seowatcher is restarting): the server closed by itself and the app is reopening it. Refresh the open page after a few seconds.
- **"Sunucu 10 dakikada üç kez kapandı"** (The server closed three times in 10 minutes): the app has stopped reopening it. Choose **Kurulumu onar** (Repair installation), and if that does not help, **Sorunu bildir (GitHub)** (Report a problem (GitHub)).
- **"Kurulum eksik"** (Installation incomplete): **Kurulumu onar** (Repair installation) puts the missing files back by downloading the installer. If there is no internet, the releases page opens; download the installer and run it.
- **"3001 numarası dolu, 3002 kullanılıyor"** (Port 3001 is in use, using 3002): another program holds 3001, often an old Docker copy. The same warning also shows as a yellow strip across the app. If you get an error when connecting to Google, close that program and choose **Yeniden başlat** (Restart). See "The port number is in use" above.
- **"Güncelleme denetlenemedi"** (The update could not be checked) or **"Güncelleme yapılamadı"** (Update failed): the balloon gives the reason. If it says "GitHub'a ulaşılamadı" (GitHub could not be reached), check your internet connection. If it says "GitHub şu an çok fazla istek alıyor" (GitHub is getting too many requests right now), try again in an hour. If the fingerprint did not match, download the installer from the releases page. In every case the installed version keeps running.
- **"Güncelleme kurulmadı"** (The update was not installed): the installer window was closed, or administrator permission was not given. Try again from **Güncelle** (Update) in the menu.
- **"Windows bileşeni kurulamadı"** (The Windows component could not be installed): choose **Eksik Windows bileşenini kur** (Install the missing Windows component) from the menu.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
