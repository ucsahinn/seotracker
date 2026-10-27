---
title: Settings
description: Theme, Google access key, PageSpeed key, usage limits, version and update check. The one settings screen for the whole installation.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

This screen holds the settings that apply to the whole installation: the Google connection, the PageSpeed key, the theme, the language and updates.

**Settings** applies to the whole installation. Project-specific settings (name, domain, Search Console and Analytics property) are on each project's **Project settings** page. The sections are **Appearance**, **Notifications**, **Google**, **Service account**, **Speed tests**, **Limits**, **About** and **Windows**.

## What is on the screen

**Appearance**. For **Theme** there are the options **System**, **Light** and **Dark**. Your choice is stored in this browser. In another browser or on another computer, you choose again.

**Language.** The app's interface comes in Turkish, English, German, French, Italian and Portuguese. Under **Settings → Appearance → Language**, pick **Türkçe**, **English**, **Deutsch**, **Français**, **Italiano** or **Português**; the page reloads in the new language. Each language is written in its own name, so you can find yours even if you cannot read the current one. Until you choose, the app follows your browser's language. If the browser prefers none of these languages, the app opens in English. If the browser gives no language at all, it opens in Turkish. The choice is saved in this browser, like the theme. Only the app's interface changes. The Windows tray menu stays in Turkish.

**Notifications.** The bell in the sidebar keeps the latest 50 events and shows the unread count. **Mark all as read** preserves the history. Audit results, new versions, Google connection issues, reports and index checks appear here. While the app is open, a new event shows in the app's own small popup. While the tab is in the background, the event is kept only in the bell history. The app does not send Windows or browser notifications, so the same event never appears in two overlapping windows. If you are watching an audit's own screen, that audit's completion popup is not shown separately, because the screen already shows the finish. **Notification sound** plays a short tone for important events; **Preview sound** lets you try it. **Test in-app notification** creates a test notification and its sound. Visual animations follow the system's reduced motion preference; sound has its own setting.

**Windows.** Turn Start with Windows and Install updates automatically on or off here. These are the same saved preferences as in the tray menu. Administrator restrictions are explained beside the option. Controls are disabled in Docker and development installations; older Windows launchers show a package update instruction.

If a preference cannot be saved, the screen says why and what to do. Because this section talks to the app in the taskbar, the errors come from that app:

- **The tray app did not answer within 4 seconds.** If the computer just woke from sleep, press **Try again** after a few seconds. If it persists, choose **Çıkış** (Exit) in the tray menu and open the app again.
- **Could not connect to the tray app's settings service.** The tray app may have closed. Open seowatcher again from the Start menu.
- **This preference is locked by an administrator.** Only the computer's administrator can change it. This is normal if the installation was made for all users.
- **The tray app did not recognise this request.** The server and the tray app may be left over from different sessions. Choose **Çıkış** (Exit) in the tray menu and open the app again.
- **The tray app refused the settings request.** Restart the app from the tray menu. If it persists, update the Windows package.
- **The tray app returned an unrecognised answer.** The app and tray versions may not match. Update the Windows package.

If the section does not open at all and says Windows preferences are unavailable, check that the tray app is running.

**Google.** The badge is one of three values: **Saved**, **From the setup file** (on a Docker installation, the value was set in the `.env` file) or **Missing**. The section shows the two redirect addresses to add in Google Cloud Console (Google's developer console), each with a copy button. Add both: without the Analytics address, only Search Console connects.

Fields: **Client ID** and **Client secret**. Both come from the access key you create at Google. Buttons: **Save**, **Cancel**, **Change** and **Delete**. **Delete** disconnects the existing connections. The step-by-step setup is in the Google connection guide.

**Service account** (the shorter route). A service account is an account in Google Cloud that belongs to the app instead of a person. Paste the contents of the key file you downloaded from Google Cloud into the **Service account key file (JSON)** field. If one is saved, the account's email address is shown. Add that address in these places:

- Search Console: "Settings → Users and permissions → Add user", permission Full.
- Analytics: "Admin → Access management", permission Viewer.

The badge says **Saved** or **Not used**. If no client ID is entered in the **Google** section but a service account is connected, the **Google** section's badge says a neutral **Not used, a service account is connected** instead of a yellow **Missing**. Google then works through the service account. A saved service account is preferred over the Google access key. Deleting removes the account from the app but does not revoke the key in Google.

**Speed tests**. The section has an **API key** field and an **Test key** button. The test "Uses 1 measurement", and you can press it once every ten seconds. The badge says **Key saved**, **From the setup file** or **Key missing**. The details are in the PageSpeed key guide.

**Limits**. The "Google and system limits" cards show:

- URL Inspection (Search Console): 2,000 per day.
- PageSpeed Insights.
- GA4 (Google Analytics) daily and hourly quota units: 200,000 and 40,000 by default. Google does not publish the exact figure; it only reports how much is left.
- Audit page limit: 10,000.
- Reports per project: 10,000, templates: 10.
- Largest report: 500,000 bytes.

The status of each card is **Enough left**, **Running low** (after 70 percent), **Almost used up** (after 90 percent) or **Unknown**.

**About**. The **Version** row shows the installed version (for example 0.8.0 Alpha). The **Check for updates** switch is on by default. When it is on, the app asks GitHub for the latest version every six hours. The **Check now** button then appears too. The tray app of the Windows package does its own check as well, once a day. If there is a new version, a **What's changed** link appears, and for Docker installations a command you can copy: `git pull && docker compose up -d --build`. For the Windows package, it points to **Güncelle** (Update) in the menu of the taskbar icon (the tray menu is Turkish only). If automatic update is on, the new version installs by itself.

The check tells you one of these: a new version was released, "You're on the latest version.", or a problem. If GitHub cannot be reached, the screen says "GitHub couldn't be reached on the last check" and gives the last known version with the date of the last successful check. That means it could not be confirmed whether your version is current. Check your internet connection and try again. If the screen says "Could not reach the release source: the repository was not found or is private (GitHub 404)", the problem is not on your side. Download the diagnostics bundle from the **Help** screen and report it. If the switch is off, the screen says "Update checks are off, so no requests go to GitHub."

**Release notes**. Open the separate page above Notifications in the sidebar. Colored labels show the features, fixes and security changes in each release.

## How to use it

1. On first setup, paste the JSON key in the **Service account** section, or enter the client ID and the secret key in the **Google** section (one is enough); then enter the PageSpeed key in the **Speed tests** section. When both are saved, open the project and pick the property.
2. Once a month, check the **Limits** section. The quota that shows as "Running low" is most often the URL Inspection limit.
3. If the **About** section shows a new version, update; the release notes say what changed. The update check is the only connection from your computer to anywhere other than Google. If you do not want it, turn the switch off.
4. To change the Google access key (for example, after creating a new Cloud project), click **Change** and paste the new values. Existing connections do not work with the new key, so choose **Reconnect** in each project.

## Frequently asked questions

**Why can't I see my secret key on the screen?** The app stores it encrypted and never sends it back to the browser. The screen shows only that it is saved, and the ID.

**What if the value I gave in `.env` on Docker and the one I entered on the screen conflict?** The value entered on the screen wins. If you save a value while the badge says "From the setup file", that value is used from then on.

**What does the update check send?** It sends no data. It reads GitHub's public list of releases. The request is anonymous.

**Service account or Google access key?** A service account needs no consent screen and does not expire, but you must grant that account access by hand in Search Console and Analytics. For a single-person installation either works. If the connection keeps expiring, switch to a service account.

## What differs between the Windows package and Docker

Every setting on this screen works the same way in both installs and is stored in the database. The difference is in the settings outside the screen:

| Topic                      | Windows package                                                                                     | Docker                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Google and PageSpeed keys  | Only from this screen. The badge never says **From the setup file**.                                | From this screen, or with `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `PAGESPEED_API_KEY` in `.env`. The screen wins. |
| Port number                | `"port"` in `%LOCALAPPDATA%\seowatcher\config.json`, then **Yeniden başlat** (Restart) in the menu. | `PORT` in `.env`, then `docker compose up -d --force-recreate seotracker`.                                               |
| Agent password (MCP token) | `%LOCALAPPDATA%\seowatcher\mcp-token`; created by the launcher, cannot be turned off.               | `/app/.wrangler/mcp-token` in the container; change it with `MCP_TOKEN` in `.env`, or turn it off with `off`.            |
| Updates                    | The **Windows** section or the taskbar menu; can install by itself.                                 | The command in **About**: `git pull && docker compose up -d --build`.                                                    |
| **Windows** section        | Available.                                                                                          | Controls disabled.                                                                                                       |

On the Windows package, do not edit the `server.env` file in the data folder: the launcher rewrites it at every start. The full list of Docker variables is in `docs/ENVIRONMENT.md`.

## Limits

**Settings** does not change the port number, the data folder or network settings. Those live in `config.json` in the Windows package and in the `.env` file on Docker. There is no user or password management because the app is single-user. The quota cards are the app's own count, not Google's real counter. URL inspections you run by hand in Search Console do not show up here, but they count against Google's limit.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
