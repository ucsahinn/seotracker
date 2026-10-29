---
title: Help
description: Check the installation's health, find fixes for common problems and download the diagnostics bundle to attach when you report an issue.
screen: Yardım
route: /support
updated: 2026-10-27
---

Open **Help** first when something does not work. It checks the installation, says what is missing and links to the setting that fixes it. It checks the setup only: for problems on your site use [Site audit](/docs/site-denetimi/), and for Google's view of your pages use [Index status](/docs/dizin-durumu/).

The interface is available in Turkish, English, German, French, Italian and Portuguese; change it under **Settings → Appearance**. The Windows tray menu is in Turkish only, so this guide gives its items in Turkish with the English meaning in brackets.

## Quick actions

- **Check status again** reruns the checks on the card below.
- **Download diagnostics bundle** downloads a file to attach to a problem report (see below).
- **Open the guide** opens this documentation on seowatcher.io.
- **seowatcher.io** opens the website, where the download page lives.
- **Release notes** opens the release notes screen (`/release-notes`).
- **Agent setup** opens the assistant connection screen.

## App health

The **App health** card checks five things: **Sign-in and access**, **Google sign-in**, **PageSpeed key**, **Runtime** and **Database**. A row that needs attention has a button to the right setting. Make the change, return and select **Check status again**. A row that could not be read is never shown as passing.

A passing card means the installation is set up. It does not mean your site is healthy or that Google data is current. The card shows the version and when it was checked. **Copy summary** copies the result as text.

**Google sign-in** stays yellow until a Google credential is saved; see [Connecting to Google](/docs/google-baglantisi/). **Sign-in and access** reports a single-user install without a password; that is expected, because the app opens only on your own computer. If you expose it to a network, put your own password-protected sign-in in front of it.

## Port warning

If another program, often an old Docker copy, holds port 3001, the Windows package starts on a free port such as 3002 for that session. A yellow bar then appears at the top of every screen: "seowatcher is running on 3002 this time because another program is using 3001 (for example an old Docker copy). Google sign-in is set up for 3001; close that program and restart seowatcher." The **App health** card repeats it.

Google sign-in returns to port 3001, so it fails while the app runs on 3002. Close the program that holds 3001, then choose **Yeniden başlat** (Restart) in the tray menu. The app returns to 3001 and the bar disappears. Closing the bar only hides it in that tab.

## Projects and limits

**Projects** lists each project's Search Console and Analytics connection. **Open connections** goes to that project's settings. **Show limits** under **Google and system limits** shows the current state of Google's quotas.

## Common problems

Six expandable answers cover the most frequent issues, each with the steps and a link to the right setting:

- The page won't open, or the app isn't running
- The port is in use
- My agent can't connect (401)
- Speed measurement stops partway (429)
- No query data, empty charts
- I changed a setting and the app doesn't see it

Longer explanations are in [Troubleshooting](/docs/sorun-giderme/).

At the bottom, shortcuts lead to the log files and the health address (`/api/health`). In the Windows package, **Günlükleri aç** (Open logs) in the tray menu opens the logs; on Docker, **Copy command** gives the log command.

## Report a problem

If the problem remains, select **Download diagnostics bundle** and attach the file to a GitHub issue. In the Windows package, **Sorunu bildir (GitHub)** (Report a problem on GitHub) in the tray menu prepares the issue in one step.

The bundle contains the version, setup checks, table row counts, the connected Google properties, and phase and error summaries for the last 25 audits. PageSpeed errors are included without page URLs. It contains no secrets: no Google tokens or keys, no PageSpeed key, no agent token and no session cookies. It does include project names, domains and Google property IDs, because problems cannot be diagnosed without them. Read the files before you send them.

## Empty or thin search data

On a site with little search traffic, Google hides many queries. The query list can be empty or show fewer clicks than the page totals; that alone does not mean the connection is broken. If data is missing, check the project's connections, the date range and the coverage note on that screen. A passing **App health** card does not validate those reports.
