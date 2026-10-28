---
title: Release notes
description: seowatcher 0.8.3 Alpha — complete Google data, visible fetch times, vivid metric colours and 25 fixes found with real data.
updated: 2026-10-28
---

The latest release is **0.8.3 Alpha**, October 28, 2026. Your data is kept when you update.

For the first move from 2.x to 0.x.x Alpha, run the new installer manually; the old updater does not recognize the lower number as newer.

## 0.8.3 Alpha — 2026-10-28

This entry brings together features and fixes from 0.5.0 to 0.8.3: site audits, the dashboard, notifications and six languages, with more accurate data and clearer screens.

### ✨ Highlights

- **Brand-new site audit:** Looks at your site page by page and as a whole, with 202 rules.
- **Honest results:** Anything it cannot measure is not counted as "passed", and the screen says so when data is missing.
- **Ordered to-dos:** Problems on the pages that bring the most visitors from Google come first.
- **Six languages:** Use the app in Turkish, English, German, French, Italian or Portuguese.
- **News:** Announcements and notifications keep you up to date on new versions and important news.

### 🔎 Site audit

- **Security checks:** Your site's security settings and the expiry dates of its SSL certificate and domain are checked.
- **Email records:** The records that stop others from sending email in your name are checked.
- **AI bots:** See whether your site is open to AI bots such as ChatGPT and Claude.
- **Speed findings:** With speed testing on, the problems slowing your site down are listed with their estimated gain.
- **Previews:** See in advance how a page will look on Google, in shared posts and on a phone.
- **Score history:** Follow what improved between audits and download the refreshed report.

### 📊 Dashboard and reports

- **Next steps:** The dashboard has a short task list and a readiness score to help you finish your setup. The score is not an SEO result.
- **Ready-made reports:** Your AI assistant prepares an improvement report from your audit, search and Analytics data.
- **Audit progress:** While an audit runs you see the time spent and the progress, and a short summary at the end.
- **Report types:** Search reports and site audit reports are shown separately; older reports with no known type are clearly marked.
- **Report dates:** Search reports keep your selected dates and explain missing data and measurements that may change later.
- **Audit sources:** Audit reports say which traffic and speed measurements were actually used.
- **Complete Google data:** All rows Google makes available are fetched, and you can see when they were fetched. The ranking archive advances while the page is open, and unfinished days are marked as incomplete.

### 🔔 Notifications and announcements

- **Notification center:** Audit results, new versions and Google connection problems gather in one place.
- **Notification sound:** Turn sounds for important alerts on or off in Settings.
- **Windows notifications:** Updates and announcements also show up in the Windows notification area.
- **Announcements:** Fresh news appears on the app's Announcements screen.

### 🪟 Windows

- **Settings:** Choose in Settings whether the app starts with Windows and updates itself.
- **Startup progress:** A window shows the percentage while the app gets ready and while an update downloads.
- **Clear guidance:** The guide and Help explain the differences between the Windows package and Docker.

### 🌍 Languages

- **Language choice:** Pick your language under Settings → Appearance → Language; numbers and dates follow it.
- **Guide:** The user guide, audit rules and release notes are available in six languages.
- **Privacy:** On seowatcher.io, measurement runs only if you accept it.
- **Reviewed translations:** Screen text and guides in all six languages were updated to match the revised screens.

### 🎨 Appearance and help

- **Light theme:** A darker background, lighter cards and stronger orange accents make reading easier.
- **Cards and numbers:** Summary cards are simpler, and changing numbers respect your reduced-motion preference.
- **Help and notes:** Help and release notes make it easier to find the information you need.
- **Data colours:** Clicks are blue, impressions violet, click rate teal, position ochre, sessions green and conversions rose. Cards and charts use the same, more vivid colours in both themes.

### 🗂️ Projects and saved searches

- **Saved searches:** Rankings are calculated for your saved list; spelling variants no longer overwrite measurements, and unknown rankings are clearly marked.
- **Project summary:** Missing archive days no longer count as lost traffic; the audit summary only shows your project's site.
- **Project info:** When edits conflict, you can keep your draft and compare it with the latest text.

### 🛠️ Fixes

- **More accurate audits:** Errors found on real sites were fixed; comparisons use each audit’s own pages, and an audit record is kept if startup fails.
- **Menus and keyboard:** Screens, reports and country lists fit on phones; menus stay on screen, keyboard focus stays in the open window, and Esc closes only the top list while keeping your text; screen readers announce selections, and Analytics shows channel names in your language.
- **Everyday fixes:** The diagnostics package in Help describes the problem better and leaves out your page addresses. 25 issues found with real data were fixed across the dashboard, search performance, rankings, saved keywords, Analytics, reports, site audit, settings, connections, Help and English plurals.
- **More accurate numbers:** Missing measurements are not counted as zero, and limited Analytics data is not presented as a firm conclusion; rankings use matching dates, priority tasks and estimate limits are explained, and filtering does not change estimated monthly gains. Opportunities explains searches Google hides and no longer suggests widening to 90 days when 90 days is already selected. Even on sites with few visitors, missing data is distinguished from a real zero.
- **Connection status:** Selecting a property is separate from verified access, and old results are not treated as current after an account change; unresponsive Google connections stop waiting, temporary errors suggest trying again, and disabled services explain what to enable.
- **Saved data:** Adding or removing labels completes in full, labels in use cannot be deleted, historical data stays tied to the right property, and waiting tasks are handled in the right order.
- **Windows startup:** Working files are saved in your user folder; repaired assistant connections survive a restart, and the startup check no longer hangs.

### 🔒 Security

- **Up-to-date components:** Security holes in the components the app uses were closed.
- **Secret keys:** Save your Google connection file without showing its contents on screen.
- **Assistant setup:** Setup instructions do not ask you to print your access key on screen or paste it into a chat.

## 0.4.3 Alpha — 2026-10-23

One-click installation arrived for Windows, and the seowatcher.io website and user guide went live.

### ✨ Highlights

- **One-click install:** Install on Windows with a single file, without Docker or a terminal.
- **Updates itself:** The app downloads, checks and installs the new version.
- **Website and guide:** seowatcher.io and the user guide are live in six languages.

### 🪟 Windows

- **Easy install:** Run the file; it prepares everything needed and opens the browser. Uninstalling does not delete your data.
- **Taskbar:** Manage the app from its taskbar icon.
- **Updating:** The Update option shows progress; if you like, updates install by themselves.
- **Recovers itself:** If the app closes unexpectedly it restarts, and log files do not keep growing.
- **Repair and report:** Repair setup in Help fixes startup problems; Report a problem opens a ready record with your personal details hidden.

### 🧭 First setup

- **Start from scratch:** In assistant setup, Setup from scratch is at the top; one copy button is enough.
- **Google connection:** Explained in three short steps in Settings.
- **Clear feedback:** Saving, deleting and connecting tell you what happened; deleting asks first.

### 🌐 Website and guide

- **seowatcher.io:** The app's website is live in six languages.
- **User guide:** A 20-page guide you can read in six languages.
- **Troubleshooting:** Pages are written with Symptom, Cause and Fix boxes.

### 🎨 Look and feel

- **Simpler screens:** The menu, settings and first-setup screens were simplified.
- **Natural wording:** More than two hundred screen texts were rewritten.
- **Dark theme:** Dark is the default theme; light and dark both match the website.

### 🛠️ Fixes

- **Google connection:** A wrong "access key missing" warning that appeared only with a service-account connection is gone.
- **Analytics:** Device, channel and country names are shown in your language; revenue shows its currency; change percentages look the same everywhere.
- **Phone overflow:** The site audit and Opportunities screens no longer overflow on a phone.

## 0.2.1 Alpha — 2026-10-04

The first release of seowatcher: it gathers your Google data, site audit and speed tests in one app on your own computer.

### ✨ Highlights

- **Data in one place:** Search Console, Analytics, the site audit and speed tests meet in one app.
- **Site audit:** See your site's problems, the pages they affect and the audit history.
- **Reports:** Download and print the audit report.

### 📈 Search performance

- **Search tracking:** Follow your performance on Google and the rankings of your saved keywords.
- **Opportunities:** Improvements that could lift your rankings are listed.
- **Clear limits:** Your daily Google allowance and the speed tests you have left are shown on screen.

### 🤖 AI assistant

- **Easy setup:** Paste the setup prompt to your AI assistant and it checks the rest.
- **No secrets needed:** It never asks you to paste passwords into the chat.
- **Codex support:** Codex has its own one-command guide.

### 🎨 Look and accessibility

- **Light and dark theme:** Pick the theme that suits your eyes.
- **Accessibility:** Works comfortably with a keyboard and a screen reader.
- **Live progress:** Audit progress shows an estimate of the time left; no animation plays if reduced motion is on.

### 🛠️ Fixes

- **Stuck audits:** An audit that stopped halfway no longer blocks you from starting a new one.
- **More accurate results:** Page depth, sitemap coverage and orphan pages are calculated more accurately; http, https and www differences now show up.
- **Google account:** When the account or property changes, an old project's data no longer gets mixed in.
- **Connection time:** The problem of being asked to reconnect after about an hour is fixed.

### 🔒 Security

- **Safe reports:** A downloaded report is protected against maliciously crafted pages.

## Version numbers

seowatcher uses 0.x Alpha numbers until 1.0. A new feature you can notice raises the middle number (0.7.1 → 0.8.0); a fix-only release raises the last number (0.8.0 → 0.8.2). A new entry is added only for a milestone users will notice; small fixes go into the current entry, which takes the newest number. The releases from 0.0.0 to 0.4.3 were first published with v2.x tags; the matching table is at the top of [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md).

The full history is in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) on GitHub.
