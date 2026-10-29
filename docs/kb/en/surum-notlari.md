---
title: Release notes
description: seowatcher 0.8.7 Alpha (October 29, 2026): a new site audit with 202 rules, six interface languages, notifications and more accurate Google data.
updated: 2026-10-29
---

The latest release is **0.8.7 Alpha**, October 29, 2026. Your data is kept when you update.

For the first move from 2.x to 0.x.x Alpha, run the new installer manually; the old updater does not recognize the lower number as newer.

## 0.8.7 Alpha — 2026-10-29

This entry brings together features and fixes from 0.5.0 to 0.8.7: site audits, the dashboard, notifications and six languages, with more accurate data and clearer screens.

### ✨ Highlights

- **Rebuilt site audit:** Checks your site page by page and as a whole against 202 rules.
- **Honest results:** Anything it cannot measure is not counted as "passed", and the screen says so when data is missing.
- **Ordered to-dos:** Problems on the pages that bring the most visitors from Google come first.
- **Six languages:** Use the app in Turkish, English, German, French, Italian or Portuguese.
- **News:** Announcements and notifications tell you about new versions and important changes.

### 🔎 Site audit

- **Security checks:** Your site's security settings and the expiry dates of its SSL certificate and domain are checked.
- **Email records:** The records that stop others from sending email in your name are checked.
- **AI crawlers:** See whether your site is open to AI crawlers such as GPTBot and ClaudeBot.
- **Speed findings:** With speed measurement on, the issues slowing your site down are listed with their estimated savings.
- **Previews:** See in advance how a page will look on Google, in shared posts and on a phone.
- **Score history:** See what improved between audits and download the updated report.

### 📊 Dashboard and reports

- **Next steps:** The dashboard has a short task list and a readiness score to help you finish your setup. The score is not an SEO result.
- **Ready-made reports:** Your AI assistant prepares an improvement report from your audit, search and Analytics data.
- **Audit progress:** While an audit runs you see the time spent and the progress, and a short summary at the end.
- **Report types:** Search reports and site audit reports are shown separately; older reports with no known type are clearly marked.
- **Report dates:** Search reports keep your selected dates and explain missing data and measurements that may change later.
- **Audit sources:** Audit reports say which traffic and speed measurements were actually used.
- **Complete Google data:** Every row Google makes available is fetched, with the time it was fetched. The ranking archive keeps filling while the page is open, and days that are not final are marked as incomplete.

### 🔔 Notifications and announcements

- **Notification center:** Audit results, new versions and Google connection problems gather in one place.
- **Notification sound:** Turn sounds for important alerts on or off in Settings.
- **Windows notifications:** Updates, announcements and finished or failed audits also appear as Windows notifications. You can turn them off in the tray icon's menu.
- **Announcements:** News from the seowatcher team appears on the app's Announcements screen.

### 🪟 Windows

- **Settings:** Choose in Settings whether the app starts with Windows and updates itself.
- **Startup progress:** A window shows the percentage while the app gets ready and while an update downloads.
- **Clear guidance:** The guide and Help explain the differences between the Windows package and Docker.

### 🌍 Languages

- **Language choice:** Pick your language under Settings → Appearance; numbers and dates follow it.
- **Guide:** The user guide, audit rules and release notes are available in six languages.
- **Privacy:** On seowatcher.io, measurement runs only if you accept it.
- **Reviewed translations:** Screen text and guides in all six languages were updated to match the revised screens.
- **Translation fixes:** Mistranslated column and category names on the French, German, Italian and Portuguese screens were corrected; the Analytics role is now named "Viewer", as in Google.

### 🎨 Appearance and help

- **Light theme:** A warmer gray background, lighter cards and a stronger orange accent improve contrast.
- **Cards and numbers:** Summary cards are simpler, and changing numbers respect your reduced-motion preference.
- **Help and notes:** Help and release notes make it easier to find the information you need.
- **Data colors:** Clicks are blue, impressions violet, CTR teal, position ochre, sessions green and conversions rose. Cards and charts use the same colors in both themes.
- **Calmer screens:** Source, period and freshness appear together with short labels, and longer explanations open on request. Shorter names and clearer buttons make actions easier to find.
- **On phones:** Lists show as readable rows instead of tables, and query names and labels are no longer cut off.
- **One look:** Buttons, expandable sections, notification pop-ups and cards look the same on every screen; single-page lists no longer show page buttons.

### 🗂️ Projects and saved searches

- **Saved keywords:** Positions are calculated for your saved list, spelling variants no longer overwrite each other, and unknown positions are clearly marked.
- **Project summary:** Missing archive days no longer count as lost traffic; the audit summary only shows your project's site.
- **Project context:** When edits conflict, you keep your draft and can compare it with the latest text.

### 🛠️ Fixes

- **More accurate audits:** Errors found on real sites were fixed; comparisons use each audit’s own pages, and an audit record is kept if startup fails. Failure messages in the audit history fit the screen, and its counts state that they include both page and site-wide findings.
- **Menus and keyboard:** Screens, reports and country lists fit on phones; menus stay on screen, keyboard focus stays in the open window, and Esc closes only the top list while keeping your text; screen readers announce selections, and Analytics shows channel names in your language. On phones, the update time, report type and labels on every Rank tracking row are visible.
- **Everyday fixes:** The diagnostics bundle in Help describes problems better and leaves out your page addresses. 25 issues found with real data were fixed across the dashboard, Search performance, Rank tracking, Saved keywords, Analytics, Reports, Site audit, Settings, connections and Help. Every screen was reviewed twice more with real data, including the bottom of each page. Dashboard audit counts say what they count, and issue names appear in full. An empty saved-keyword list says so immediately. Rank tracking describes positions as averages for the selected period, Help uses the name Project context, and page controls read Previous page and Next page. The dashboard's sessions chart has the correct label. Singular and plural wording was corrected in English, German, French, Italian and Portuguese. Your AI assistant can again find pages competing for the same query.
- **More accurate numbers:** Missing measurements are not counted as zero, and limited Analytics data is not presented as a firm conclusion. Rankings use matching dates, priority tasks and estimate limits are explained, and filtering no longer changes estimated monthly gains. Opportunities explains the queries Google hides and no longer suggests widening to 90 days when 90 days is already selected. On sites with few visitors, missing data is kept apart from a real zero, and Opportunities still lists pages with their measured figures. Analytics explains an unknown measurement once, and empty tables hide the page buttons. When a suggestion is based on average position alone and no gain can be calculated, the gain is shown as unknown.
- **Connection status:** A selected property is no longer shown as verified access, and old results are not treated as current after an account change. Unresponsive Google requests time out, temporary errors suggest trying again, and disabled APIs say what to enable.
- **Saved data:** Adding or removing tags always completes in full, tags in use cannot be deleted, historical data stays tied to the right property, and queued tasks run in the right order.
- **Windows startup:** Working files are stored in your user folder, repaired assistant connections survive a restart, and the startup check no longer hangs. A Windows settings link that could not work is hidden. Notifications that arrived while you were away appear when you return to the app.

### 🔒 Security

- **Up-to-date components:** Known vulnerabilities in the app's dependencies were fixed.
- **Secret keys:** The Google service account file can be saved without its contents appearing on screen.
- **Assistant setup:** Setup instructions never ask you to print your token or paste it into a chat.

## 0.4.3 Alpha — 2026-10-23

One-click installation arrived for Windows, and the seowatcher.io website and user guide went live.

### ✨ Highlights

- **One-click install:** Install on Windows with a single file, without Docker or a terminal.
- **Updates itself:** The app downloads, verifies and installs new versions.
- **Website and guide:** seowatcher.io and the user guide are live in six languages.

### 🪟 Windows

- **Easy install:** Run the file; it prepares everything needed and opens the browser. Uninstalling does not delete your data.
- **Taskbar:** Manage the app from its taskbar icon.
- **Updating:** The Update option shows progress; if you like, updates install by themselves.
- **Recovers itself:** If the app closes unexpectedly it restarts, and log files no longer grow without limit.
- **Repair and report:** Repair installation fixes startup problems, and Report a problem opens a pre-filled issue with your personal details removed.

### 🧭 First setup

- **Start from scratch:** On Agent setup, Fresh install is at the top and needs only one copy button.
- **Google connection:** Settings explains it in three short steps.
- **Clear feedback:** Saving, deleting and connecting tell you what happened; deleting asks first.

### 🌐 Website and guide

- **seowatcher.io:** The app's website is live in six languages.
- **User guide:** A 20-page guide you can read in six languages.
- **Troubleshooting:** Each problem is described by symptom, cause and fix.

### 🎨 Look and feel

- **Simpler screens:** The menu, settings and first-setup screens were simplified.
- **Natural wording:** More than two hundred screen texts were rewritten.
- **Dark theme:** Dark is the default theme; light and dark both match the website.

### 🛠️ Fixes

- **Google connection:** A wrong "access key missing" warning that appeared only with a service-account connection is gone.
- **Analytics:** Device, channel and country names are shown in your language; revenue shows its currency; change percentages look the same everywhere.
- **Phone layout:** The Site audit and Opportunities screens no longer overflow on a phone.

## 0.2.1 Alpha — 2026-10-04

The first release of seowatcher: it gathers your Google data, site audit and speed tests in one app on your own computer.

### ✨ Highlights

- **Data in one place:** Search Console, Analytics, the site audit and speed tests in one app.
- **Site audit:** See your site's problems, the pages they affect and the audit history.
- **Reports:** Download and print the audit report.

### 📈 Search performance

- **Search tracking:** Follow your performance on Google and the rankings of your saved keywords.
- **Opportunities:** Lists the improvements most likely to lift your rankings.
- **Clear limits:** Your remaining daily Google quota and speed tests are shown on screen.

### 🤖 AI assistant

- **Easy setup:** Paste the setup prompt into your AI assistant and it checks the rest.
- **No secrets in chat:** It never asks you to paste passwords into the chat.
- **Codex support:** Codex has its own one-command guide.

### 🎨 Look and accessibility

- **Light and dark theme:** Pick the theme that suits your eyes.
- **Accessibility:** Works with a keyboard and a screen reader.
- **Live progress:** Audit progress shows an estimate of the time left; no animation plays if reduced motion is on.

### 🛠️ Fixes

- **Stuck audits:** An audit that stopped partway no longer blocks a new one.
- **More accurate results:** Page depth, sitemap coverage and orphan pages are calculated more accurately; http, https and www differences now show up.
- **Google account:** When the account or property changes, an old project's data no longer gets mixed in.
- **Connection time:** You are no longer asked to reconnect after about an hour.

### 🔒 Security

- **Safe reports:** Downloaded reports are protected against content from maliciously crafted pages.

## Version numbers

seowatcher uses 0.x Alpha numbers until 1.0. A new feature you can notice raises the middle number (0.7.1 → 0.8.0); a fix-only release raises the last number (0.8.0 → 0.8.2). A new entry is added only for a milestone users will notice; small fixes go into the current entry, which takes the newest number. The releases from 0.0.0 to 0.4.3 were first published with v2.x tags; the matching table is at the top of [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md).

The full history is in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) on GitHub.
