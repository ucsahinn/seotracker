---
title: Help
description: The setup status card, quick actions, common problems and the diagnostics package you send when you report a problem.
screen: Yardım
route: /support
updated: 2026-10-27
---

The app's interface comes in six languages: Turkish, English, German, French, Italian and Portuguese. This guide uses the English names; to switch, go to **Settings → Appearance → Language**.

This is the first place to look when something goes wrong. The screen checks your setup, tells you what is missing and takes you to the right setting.

## What is on the screen

**Quick actions**. The buttons at the top:

- **Check status again**: refreshes the card below.
- **Download diagnostics bundle**: downloads the file you send when you report a problem. It contains no secret values.
- **Open the guide**: opens the guide on seowatcher.io.
- **seowatcher.io**: opens the app's website, where the download page and the guide live.
- **Release notes**: goes to the release notes in Ayarlar (Settings).
- **Copy setup prompt**: copies the setup text you paste into your AI assistant (called an "agent" in the app).
- **Agent setup**: goes to the assistant connection screen.

**App health**. The card looks at this installation itself. A project's setup checklist is on the Dashboard and in Project context, not here. The card checks four things: **Sign-in and access**, **Google sign-in**, **PageSpeed key** and **Database**. At the top it says "Everything looks good." or "N things need attention.". Below that you see the version line ("You're on vX, the latest." or "Version Y is out") and the time of the last check. Next to a row with a problem, a button appears that takes you to the right setting: **Open Settings** or **Enter key**. **Copy summary** puts the card's text on the clipboard.

**Port number warning.** If the Windows package opens on another port because a different program holds 3001 (for example an old Docker copy using 3001), a yellow strip appears at the top of every screen in the app: "seowatcher is running on 3002 this time because another program is using 3001 (for example an old Docker copy). Google sign-in is set up for 3001; close that program and restart seowatcher." The strip is there in case you missed the notification in the taskbar. Google sign-in goes back to address 3001 and fails if you opened the app on 3002. The close button on the right of the strip hides it for this tab. The same sentence is also written in the **App health** card. To fix it, close the program that holds 3001, then choose **Yeniden başlat** (Restart) in the tray menu. The app goes back to 3001 and the strip disappears. If no other program is using it, the app goes back to 3001 on the next start anyway.

**Projects**. The status of each project's Search Console and Analytics connection. The **Open connections** button takes you to the project settings.

**Common problems**. Six collapsible items: the page won't open or the app isn't running, the port is in use, my agent can't connect (401), speed measurement stops partway (429), no query data, and I changed a setting and the app doesn't see it. Each gives what to do and a link to the matching setting.

**Google and system limits**. With **Show limits** you see the current state of Google's daily limits.

**Bottom list.** Shortcuts to the log files and to the health address (`/api/health`). In the Windows package, logs open with **Open logs** in the taskbar menu. In Docker, use the command given by **Copy command**.

## How to use it

1. If something does not work, open this screen first and read the warning on the card.
2. Press the button next to the warning. It takes you to the right setting. Make the change, come back and click **Durumu yeniden kontrol et**.
3. If the card says "Everything looks good." but the problem continues, check the **Common problems** items.
4. If it is still not solved, click **Download diagnostics bundle** and attach the file to the issue on GitHub. In the Windows package, **Sorunu bildir (GitHub)** (Report a problem (GitHub)) in the taskbar menu does the same in one click.

## Frequently asked questions

**Why is the "Google sign-in" row yellow?** No Google access key has been entered yet. The row stays yellow until Google is connected. Follow the guide for connecting to Google.

**The "Sign-in and access" row says it is a single-user setup without a password.** This is expected. The app opens only from your own computer. To open it to the outside, put your own password-protected sign-in in front of it.

**What is in the diagnostics package?** The version, setup checks, table counts and phase and error summaries for the latest 25 audits. PageSpeed errors are summarized without page URLs. Secrets and passwords are excluded; project names, domains and Google property IDs may be included. Review the files before sending them.

## Limits

The screen checks only the setup itself. To find a problem on your site, use Site denetimi (Site audit). To see a problem on Google's side, use the Dizin durumu (Index status) screen.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
