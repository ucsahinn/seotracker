---
title: Help
description: The setup status card, quick actions, common problems and the diagnostics package you send when you report a problem.
screen: Yardım
route: /support
updated: 2026-10-22
---

The app's interface comes in English and Turkish. This guide uses the English names; to switch, go to **Settings → Appearance → Language**.

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

**Your setup status**. The card checks four things: **Sign-in and access**, **Google sign-in**, **PageSpeed key** and **Database**. At the top it says "Everything looks good." or "N şey dikkat istiyor." (N things need attention.). Below that you see the version line ("Sürüm X, güncel." (Version X, up to date.) or "yeni sürüm Y var" (new version Y available)) and the time of the last check. Next to a row with a problem, a button appears that takes you to the right setting: **Open Settings** or **Enter key**. **Copy summary** puts the card's text on the clipboard.

**Projects**. The status of each project's Search Console and Analytics connection. The **Open connections** button takes you to the project settings.

**Common problems**. Five collapsible items: the page does not open, the port number is in use, the assistant cannot connect (401), the PageSpeed limit, and no query data. Each gives what to do and a link to the matching setting.

**Google and system limits**. With **Show limits** you see the current state of Google's daily limits.

**Bottom list.** Shortcuts to the log files and to the health address (`/api/health`). In the Windows package, logs open with **Open logs** in the taskbar menu. In Docker, use the command given by **Copy command**.

## How to use it

1. If something does not work, open this screen first and read the warning on the card.
2. Press the button next to the warning. It takes you to the right setting. Make the change, come back and click **Durumu yeniden kontrol et**.
3. If the card says "Her şey yolunda." but the problem continues, check the **Sık sorunlar** items.
4. If it is still not solved, click **Tanılama paketi indir** and attach the file to the issue on GitHub. In the Windows package, **Sorunu bildir (GitHub)** (Report a problem (GitHub)) in the taskbar menu does the same in one click.

## Frequently asked questions

**Why is the "Google girişi" row yellow?** No Google access key has been entered yet. The row stays yellow until Google is connected. Follow the guide for connecting to Google.

**The "Giriş ve erişim" row says "parolasız tek kullanıcı" (single user, no password).** This is expected. The app opens only from your own computer. To open it to the outside, put your own password-protected sign-in in front of it.

**What is in the diagnostics package?** The version, setup checks, table counts and phase and error summaries for the latest 25 audits. PageSpeed errors are summarized without page URLs. Secrets and passwords are excluded; project names, domains and Google property IDs may be included. Review the files before sending them.

## Limits

The screen checks only the setup itself. To find a problem on your site, use Site denetimi (Site audit). To see a problem on Google's side, use the Dizin durumu (Index status) screen.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
