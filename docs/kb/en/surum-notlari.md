---
title: Release notes
description: seowatcher 0.8.0 Alpha — a rebuilt 201-rule site audit, honest results, a to-do list ranked by traffic and the interface in six languages.
updated: 2026-10-26
---

The latest release is **0.8.0 Alpha**, October 26, 2026. Your data is kept when you update.

For the first move from 2.x to 0.x.x Alpha, run the new installer manually; the old updater does not recognize the lower number as newer.

## 0.8.0 Alpha — 2026-10-26

- **Site audit rebuilt:** 201 rules look at pages and at the site as a whole, including security headers, email and domain records, SSL and domain expiry, AI crawler access and Lighthouse findings.
- **Honest results:** A check that could not be measured is no longer counted as "passed", and a probe that could not run produces no finding. When data is missing, the screen says so.
- **To-do order:** Fixes are ranked by your Search Console traffic, and the score is weighted by category.
- **New screen and report:** Checks and Instant data tabs, search and share previews, score history and a redesigned downloadable report.
- **Interface in six languages:** German, French, Italian and Portuguese (Brazil) were added, so the whole app is available in six languages together with Turkish and English.

### Site audit

- **Site-wide checks:** Security headers (such as HSTS), redirects, the response to a page that does not exist, robots.txt, SPF and DMARC records, and the expiry dates of the SSL certificate and the domain are checked once at the start of the audit. Each produces a single finding.
- **AI crawlers:** The audit checks whether your robots.txt blocks AI crawlers such as GPTBot, ClaudeBot and PerplexityBot, and whether you have an llms.txt file.
- **Lighthouse findings:** With speed testing on, Lighthouse audits are listed as issues, each with its estimated savings.
- **External links and images:** Optionally, the audit checks whether external links open and whether images are larger than they need to be.
- **More rules:** 201 rules in total, with page signals and more than 20 new findings. What each rule means and how to fix it is explained in the Audit rules guide.
- **To-do:** Things to fix are ranked by Search Console traffic. If Search Console is not connected, they are ranked by score impact only.
- **Checks and Instant data:** The Checks tab also lists the checks that passed and the ones that could not be measured. The Instant data tab shows the site information measured during the audit and, when available, Core Web Vitals.
- **Previews:** Google search result, share card (Open Graph) and mobile preview.
- **History and report:** Score history shows how the score changed between audits. The downloadable report was redesigned.

### Other features

- **Interface language:** Pick one of six languages in Settings → Appearance → Language; numbers and dates follow your choice.
- **Setup guidance:** The differences between the Windows package and Docker, such as where settings are kept and which ones apply, are explained plainly in the guide and in Help.
- **Agent tools:** The new `get_audit_summary` tool returns the site score, category scores, the ranked to-do list and the site's instant data in a single call.
- **Guide:** The Audit rules page explains all 201 rules one by one; the guide and the release notes are available in six languages.
- **seowatcher.io · privacy:** On the website, Google Analytics 4 runs only if a measurement ID is set and you choose Accept; nothing is sent to Google before you accept. The privacy page is available in six languages.

### Fixes

- **Audit accuracy:** Nine causes of wrong results were fixed after comparing audits with measurements on real sites.
- **Audit · phone:** The audit screen and the downloaded report no longer overflow on a phone.

## 0.7.1 Alpha — 2026-10-26

- **Announcements:** Live announcements appear on the app's Announcements screen. They are written in Turkish and English; other interface languages show the English version. You can prepare and publish the texts from the password-protected admin screen.
- **Dashboard:** The dashboard's Next steps section offers guided tasks and a readiness score based on Google connections, a recent audit, project context and agent setup. It measures setup readiness, not SEO performance or rankings.
- **Agent reports:** Reports use a coverage checklist for audit and PageSpeed, Search Console, opportunities, ranking history, saved keywords, Analytics, index coverage and sitemaps to produce prioritized improvements.
- **Notifications:** The notification center brings together audit results, new releases, Google connection issues and report updates. Notification sounds and desktop alerts have separate controls.
- **Windows notifications:** App updates and live announcements appear in the Windows notification center when enabled. Toggle them under Settings → Notifications.
- **Startup:** Server preparation and the actual update-download percentage appear in a visible progress window.
- **Windows settings:** In Settings → Windows, choose whether the app starts with Windows and whether updates install automatically. The app explains when an administrator limits a setting.
- **Site audit:** Follow elapsed time and progress during an audit, then review its completion summary. The app also shows progress while preparing a report or checking for updates.
- **New project:** On phones, the country list in the new-project form no longer gets clipped. Escape closes the list first and keeps the form open.
- **Help · Diagnostics:** Failed audits show their stopping phase, a redacted error detail and the most common PageSpeed measurement errors. Page URLs are removed from exported summaries.
- **Security updates:** Security fixes were applied to the application's dependencies.

## 0.4.3 Alpha — 2026-10-23

- **Windows installer:** Install on Windows with a single installer file, no Docker or terminal needed. It brings missing components along, so the app opens on a clean computer the first time, creates the keys it needs, prepares the database and opens the browser. It is managed from the tray icon; uninstalling does not delete your data.
- **Windows updates:** The Update item in the taskbar menu is always there. It downloads, verifies and installs a new version, and shows the check, the download percentage and the install step. You can let updates install automatically.
- **Windows · Recovers on its own:** If the server stops unexpectedly, the app restarts it. Log files no longer keep growing.
- **Help · Diagnostics:** Repair installation helps fix startup problems. Report a problem opens a prepared issue; user names, site names and emails are masked in the diagnostic report.
- **First setup:** In Agent setup, Set up from scratch comes first, with one card and one copy button for Claude Code, Codex and other assistants. Settings explains the Google connection in three steps.
- **Feedback:** Saving, deleting and connecting tell you what is happening while they wait, when they finish and when they fail. Deleting and disconnecting ask for confirmation first.
- **App look:** Menu, settings and first-setup screens were simplified, and more than two hundred screen texts were rewritten in natural Turkish. Dark is the default theme, and light and dark match the website.
- **User guide and website:** seowatcher.io and the 20-page user guide are available in six languages. Troubleshooting pages use Symptom, Cause and Fix boxes.
- **Google connection:** The wrong "Google access key missing" warning shown when only a service account was connected is fixed. Errors coming from Google now point to the Google connection.
- **Analytics:** Device, channel and country names appear in Turkish, revenue amounts show their currency, and change percentages look the same on every screen.
- **Audit · Opportunities:** Sideways overflow on the site audit and Opportunities screens on a phone is fixed.

## 0.2.1 Alpha — 2026-10-04

- **All your data in one app:** Search Console, Analytics, site audit and PageSpeed data come together in one app on your own computer. You can review site issues, affected pages, speed results and audit history.
- **Tracking and reports:** Track search performance and the ranking of saved keywords, and see improvement opportunities. Download and print audit reports and keep them in the same list as your agents' reports. Light and dark themes, keyboard use and screen reader support are included.
- **Agent setup:** If you have just downloaded the repository, paste the setup prompt from the Agent setup screen into your agent; it checks Docker, the Google connection, the PageSpeed key, the project and the agent connection in order. It never asks you to paste secrets into the chat. The same prompt is also in the quick actions on the Help screen.
- **Codex support:** Agent setup has separate instructions for Codex; it connects with one command, installs the SEO skills and checks them with a real call.
- **Google and system limits:** Your daily URL inspection allowance, Analytics quota, today's speed test count and report limits are shown on the relevant screens. Only numbers that are really known are shown, each with its source and time.
- **Live view:** Audit progress shows crawling and speed testing with separate bars and a time-remaining estimate. If reduced motion is on, no animation plays.
- **Audit:** Interrupted audits no longer block new audits for good, and finished audits no longer fill the capacity. An agent reading a running audit now sees "audit in progress" instead of "no issues".
- **Audit · calculations:** Page depth, sitemap coverage and orphan page detection are calculated more accurately. Addresses that look alike but differ (http and https, www, trailing slash) now count as different in canonical comparisons, which can reveal real mismatches that were hidden before.
- **Projects · Google:** Data from an old project no longer mixes in when the Google account or property is changed. Removing an account deletes only the data of that account's projects.
- **Settings · Google:** The Google client entered in Settings is also used when tokens are refreshed; the problem that asked you to reconnect after about an hour is fixed. The Settings screen explains which Google connection is in use.
- **Reports:** A downloaded report always opens with its own protection rules, so a maliciously written page cannot run before the protection.

## Version numbers

seowatcher uses 0.x Alpha numbers until 1.0. A new feature you can notice raises the middle number (0.7.1 → 0.8.0); a fix-only release raises the last number (0.7.0 → 0.7.1). The releases from 0.0.0 to 0.4.3 were first published with v2.x tags; the matching table is at the top of [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md).

The full history is in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) on GitHub.
