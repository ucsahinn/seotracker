---
title: Help
description: The setup status card, quick actions, common problems and the diagnostics package you send when you report a problem.
screen: Yardım
route: /support
updated: 2026-10-22
---

The app's interface is in Turkish. This guide gives every button and screen name in Turkish with its English meaning in brackets.

This is the first place to look when something goes wrong. The screen checks your setup, tells you what is missing and takes you to the right setting.

## What is on the screen

**Hızlı işlemler** (Quick actions). The buttons at the top:

- **Durumu yeniden kontrol et** (Check status again): refreshes the card below.
- **Tanılama paketi indir** (Download diagnostics package): downloads the file you send when you report a problem. It contains no secret values.
- **Belgeleri aç** (Open docs): opens the docs on GitHub.
- **Sürüm notları** (Release notes): goes to the release notes in Ayarlar (Settings).
- **Kurulum istemini kopyala** (Copy setup prompt): copies the setup text you paste into your AI assistant (called an "agent" in the app).
- **Ajan kurulumu** (Agent setup): goes to the assistant connection screen.

**Kurulumunuzun durumu** (Your setup status). The card checks four things: **Giriş ve erişim** (Sign-in and access), **Google girişi** (Google sign-in), **PageSpeed anahtarı** (PageSpeed key) and **Veritabanı** (Database). At the top it says "Her şey yolunda." (Everything is fine.) or "N şey dikkat istiyor." (N things need attention.). Below that you see the version line ("Sürüm X, güncel." (Version X, up to date.) or "yeni sürüm Y var" (new version Y available)) and the time of the last check. Next to a row with a problem, a button appears that takes you to the right setting: **Ayarları aç** (Open settings) or **Anahtar gir** (Enter key). **Özeti kopyala** (Copy summary) puts the card's text on the clipboard.

**Projeler** (Projects). The status of each project's Search Console and Analytics connection. The **Bağlantıları aç** (Open connections) button takes you to the project settings.

**Sık sorunlar** (Common problems). Five collapsible headings: the page does not open, the port number is in use, the assistant cannot connect (401), the PageSpeed limit, and no query data. Each one has what to do and a link to the matching setting.

**Google ve sistem sınırları** (Google and system limits). With **Sınırları göster** (Show limits) you see the current state of Google's daily limits.

**Bottom list.** Shortcuts to the log files and to the health address (`/api/health`). In the Windows package, logs open with **Günlükleri aç** (Open logs) in the taskbar menu. In Docker, use the command given by **Komutu kopyala** (Copy command).

## How to use it

1. If something does not work, open this screen first and read the warning on the card.
2. Press the button next to the warning. It takes you to the right setting. Make the change, come back and click **Durumu yeniden kontrol et**.
3. If the card says "Her şey yolunda." but the problem continues, look at the **Sık sorunlar** headings.
4. If it is still not solved, click **Tanılama paketi indir** and attach the file to the issue on GitHub. In the Windows package, **Sorunu bildir (GitHub)** (Report a problem (GitHub)) in the taskbar menu does the same in one click.

## Frequently asked questions

**Why is the "Google girişi" row yellow?** No Google access key has been entered yet. The row stays yellow until Google is connected. Follow the guide for connecting to Google.

**The "Giriş ve erişim" row says "parolasız tek kullanıcı" (single user, no password).** This is normal. The app opens only from your own computer. If you want to open it to the outside, you need to put your own password-protected sign-in in front of it.

**What is in the diagnostics package?** The version, the setup checks, table counts and a summary of the latest audits. It has no Google keys, passwords or personal data.

## Limits

The screen checks only the setup itself. To find a problem on your site, use Site denetimi (Site audit). To see a problem on Google's side, use the Dizin durumu (Index status) screen.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
