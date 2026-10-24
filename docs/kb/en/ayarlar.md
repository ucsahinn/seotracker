---
title: Settings
description: Theme, Google access key, PageSpeed key, usage limits, version and update check. The one settings screen for the whole installation.
screen: Ayarlar
route: /settings
updated: 2026-10-24
---

This screen holds the settings that apply to the whole installation: the Google connection, the PageSpeed key, the theme, the language and updates.

**Settings** applies to the whole installation. Project-specific settings (name, domain, Search Console and Analytics property) are on each project's **Project settings** page. The sections are **Appearance**, **Notifications**, **Google**, **Service account**, **Speed tests**, **Limits**, **About** and **Windows**.

## What is on the screen

**Appearance**. For **Theme** there are the options **System**, **Light** and **Dark**. Your choice is stored in this browser. In another browser or on another computer, you choose again.

**Language.** The app's interface comes in Turkish and English. Under **Settings → Appearance → Language**, pick **English** or **Türkçe**; the page reloads in the new language. Until you choose, the app follows your browser's language: Turkish if the browser prefers Turkish, English for any other language. The choice is saved in this browser, like the theme. Only the app's interface changes. Release notes, the answers an AI assistant gets over MCP, and the Windows tray menu stay in Turkish.

**Notifications.** The bell in the sidebar keeps the latest 50 events and shows the unread count. **Mark all as read** preserves the history. Audit results, new versions, Google connection issues, reports and index checks appear here. **Notification sound** plays a short tone for important events; **Preview sound** lets you try it. **Desktop notifications while in the background** asks for browser permission only when enabled. If permission is blocked, enable it in the browser's site permissions. Visual animations follow the system's reduced motion preference; sound has its own setting.

**Windows.** Turn Start with Windows and Install updates automatically on or off here. These are the same saved preferences as in the tray menu. Administrator restrictions are explained beside the option. Controls are disabled in Docker and development installations; older Windows launchers show a package update instruction.

**Google.** The badge is one of three values: **Saved**, **From the setup file** (on a Docker installation, the value was set in the `.env` file) or **Missing**. The section shows the two redirect addresses to add in Google Cloud Console (Google's developer console), each with a copy button. Add both: without the Analytics address, only Search Console connects.

Fields: **Client ID** and **Client secret**. Both come from the access key you create at Google. Buttons: **Save**, **Cancel**, **Change** and **Delete**. **Delete** disconnects the existing connections. The step-by-step setup is in the Google connection guide.

**Service account** (the shorter route). A service account is an account in Google Cloud that belongs to the app instead of a person. Paste the contents of the key file you downloaded from Google Cloud into the **Service account key file (JSON)** field. If one is saved, the account's email address is shown. Add that address in these places:

- Search Console: "Settings → Users and permissions → Add user", permission Full.
- Analytics: "Admin → Access management", permission Viewer.

The badge says **Saved** or **Not used**. A saved service account is preferred over the Google access key. Deleting removes the account from the app but does not revoke the key in Google.

**Speed tests**. The section has an **API key** field and an **Test key** button. The test "Uses 1 measurement", and you can press it once every ten seconds. The badge says **Key saved**, **From the setup file** or **Key missing**. The details are in the PageSpeed key guide.

**Limits**. The "Google and system limits" cards show:

- URL Inspection (Search Console): 2,000 per day.
- PageSpeed Insights.
- GA4 (Google Analytics) daily and hourly quota units: 200,000 and 40,000 by default. Google does not publish the exact figure; it only reports how much is left.
- Audit page limit: 10,000.
- Reports per project: 10,000, templates: 10.
- Largest report: 500,000 bytes.

The status of each card is **Enough left**, **Running low** (after 70 percent), **Almost used up** (after 90 percent) or **Unknown**.

**About**. The **Version** row shows the installed version (for example 0.5.0 Alpha). The **Check for updates** switch is on by default. When it is on, the app asks GitHub for the latest version at most once a day. The **Check now** button then appears too. If there is a new version, a **What's changed** link appears, and for Docker installations a command you can copy: `git pull && docker compose up -d --build`. For the Windows package, it points to **Güncelle** (Update) in the menu of the taskbar icon (the tray menu is Turkish only). If automatic update is on, the new version installs by itself.

**Release notes**. Open the separate page above Notifications in the sidebar. Colored labels show the features, fixes and security changes in each release.

## How to use it

1. On first setup, enter the client ID and the secret key in the **Google** section, then the PageSpeed key in the **Speed tests** section. When both are saved, open the project and pick the property.
2. Once a month, check the **Limits** section. The quota that shows as "Running low" is most often the URL Inspection limit.
3. If the **About** section shows a new version, update; the release notes say what changed. The update check is the only connection from your computer to anywhere other than Google. If you do not want it, turn the switch off.
4. To change the Google access key (for example, after creating a new Cloud project), click **Change** and paste the new values. Existing connections do not work with the new key, so choose **Reconnect** in each project.

## Frequently asked questions

**Why can't I see my secret key on the screen?** The app stores it encrypted and never sends it back to the browser. The screen shows only that it is saved, and the ID.

**What if the value I gave in `.env` on Docker and the one I entered on the screen conflict?** The value entered on the screen wins. If you save a value while the badge says "From the setup file", that value is used from then on.

**What does the update check send?** It sends no data. It reads GitHub's public list of releases. The request is anonymous.

**Service account or Google access key?** A service account needs no consent screen and does not expire, but you must grant that account access by hand in Search Console and Analytics. For a single-person installation either works. If the connection keeps expiring, switch to a service account.

## Limits

**Settings** does not change the port number, the data folder or network settings. Those live in `config.json` in the Windows package and in the `.env` file on Docker. There is no user or password management because the app is single-user. The quota cards are the app's own count, not Google's real counter. URL inspections you run by hand in Search Console do not show up here, but they count against Google's limit.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
