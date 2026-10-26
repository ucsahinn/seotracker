# Release notes

Features, fixes and other changes, newest release first.

## [Yayınlanmamış] — to be released as 0.8.0 Alpha

Changes prepared since 0.7.1 that are not released yet. On release day this heading is replaced with the version number and date.

### Highlights

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
- **Score:** The score is calculated with weights per category.
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
- **Notifications:** Windows and browser system popups are disabled. Announcements use the app's own popup while it is visible and stay in its notification history in the background. Important alerts can play the app's sound.

### Fixes

- **Audit accuracy:** Nine causes of wrong results were fixed after comparing audits with measurements on real sites.
- **Audit · phone:** The audit screen and the downloaded report no longer overflow on a phone.

## [0.7.1] Alpha — 2026-10-26

### Fixes

- **Announcements:** The feed now supplies English fallback text for the additional locale fields expected by version 0.7.0.
- **Help · Diagnostics:** Failed audits now show their stopping phase, a redacted error detail and the most common PageSpeed measurement errors. Page URLs are removed from exported summaries.

## [0.7.0] Alpha — 2026-10-25

### Features

- **Startup:** Server preparation and the actual update-download percentage appear in a visible progress window.
- **Windows notifications:** App updates and live announcements appear in the Windows notification center when enabled. Toggle them under Settings → Notifications.
- **Announcements:** Announcements are authored in Turkish and English. Other interface languages show the English version.

## [0.6.0] Alpha — 2026-10-24

### Features

- **Announcements:** Live announcements appear in the app. Prepare and publish bilingual notices from the password-protected admin page.
- **Dashboard:** The dashboard's Next steps section offers guided tasks and a readiness score based on Google connections, a recent audit, project context and agent setup. It measures setup readiness, not SEO performance or rankings.
- **Agent reports:** Reports use a coverage checklist for audit and PageSpeed, Search Console, opportunities, ranking history, saved keywords, Analytics, index coverage and sitemaps to produce prioritized improvements.
- **Navigation:** The brand link in desktop and mobile navigation opens seowatcher.io.

### Fixes

- **Agent reports:** Report guidance asks agents to state which data sources are available and to call out missing data.
- **Navigation:** The brand area in compact navigation fits without overflow.

### Security

- **Announcements:** Cross-origin access is disabled for the admin API; the public feed allows read-only announcement access.

## [0.5.0] Alpha — 2026-10-23

### Features

- **Language settings:** Use the interface in Turkish or English. The language you choose under Settings → Appearance → Language also changes how numbers and dates are shown.
- **Notifications:** The notification center brings together audit results, new releases, Google connection issues and report updates. Notification sounds and desktop alerts have separate controls.
- **Release notes:** A separate entry sits above Notifications in the sidebar. Colored labels distinguish each release's features, fixes and security changes.
- **Windows settings:** In Settings → Windows, choose whether the app starts with Windows and whether updates install automatically. The app explains when an administrator limits a setting.
- **Site audit:** Follow elapsed time and progress during an audit, then review its completion summary. The app also shows progress while preparing a report or checking for updates.
- **Help:** Open the relevant guide from any screen's title.

### Fixes

- **New project:** On phones, the country list in the new-project form no longer gets clipped. Escape closes the list first and keeps the form open.
- **Help:** Long help messages fit in small and compact windows.
- **Settings:** Settings now highlight the selected section correctly. Windows controls have larger touch targets.
- **Index status:** Concurrent index checks use the daily allowance more accurately. Successful results are kept if another check in the group fails.

### Security

- **Security updates:** Security fixes were applied to the application's dependencies.

### Before you update

For the first move from version 2.x to the 0.x Alpha series, run the new Windows installer manually. The old updater does not recognize a lower version number as newer. Your data and Google connections are kept.

## [0.4.3] Alpha — 2026-10-22

All interim releases since 0.3.0 are combined in this release.

### Features

- **Windows setup:** The installer brings the missing components with it, so the app also opens on a clean computer the first time. The file name and the setup wizard show the installed version; uninstalling does not delete your data.
- **Windows updates:** The Update item in the taskbar menu is always there. It downloads, verifies and installs a new version, and shows the check, the download percentage and the install step. You can let updates install automatically.
- **Windows · Recovers on its own:** If the server stops unexpectedly, the app restarts it. Log files no longer keep growing.
- **Help · Diagnostics:** Repair installation helps fix startup problems. Report a problem opens a prepared issue; user names, site names and emails are masked in the diagnostic report.
- **First setup:** In Agent setup, Set up from scratch comes first, with one card and one copy button for Claude Code, Codex and other assistants. Settings explains the Google connection in three steps.
- **Feedback:** Saving, deleting and connecting tell you what is happening while they wait, when they finish and when they fail. Deleting and disconnecting ask for confirmation first.
- **App look:** Menu, settings and first-setup screens were simplified, and more than two hundred screen texts were rewritten in natural Turkish. Dark is the default theme, and light and dark match the website.
- **Windows and Docker:** Help and agent instructions recognise both setups. They describe the taskbar on Windows and `docker compose` commands on Docker.
- **User guide and website:** seowatcher.io and the 20-page user guide are available in six languages. Troubleshooting pages use Symptom, Cause and Fix boxes.

### Fixes

- **Audit · Opportunities:** Sideways overflow on the site audit and Opportunities screens on a phone is fixed.
- **Google connection:** The wrong "Google access key missing" warning shown when only a service account was connected is fixed. Errors coming from Google now point to the Google connection.
- **Analytics:** Device, channel and country names appear in Turkish, revenue amounts show their currency, and change percentages look the same on every screen.
- **Site · downloads:** The download link points to the right version. An unknown address opens a Page not found screen with a link back to the dashboard instead of a blank page.

## [0.3.0] Alpha — 2026-10-21

### Features

- **Windows setup:** Install on Windows with a single installer, without Docker or a terminal. On first launch the app creates the keys it needs, prepares its database and opens the browser; you manage it from the taskbar icon. Uninstalling does not delete your data.
- **Website:** seowatcher.io gives you download links, product information and the user guide.
- **User guide:** Setup, features, ready-made skills and agent tools were rewritten from scratch, with in-app screenshots.

### Fixes

- **Audit:** Numbers spilling out of the issue summary card in the site audit are fixed.

## [0.2.1] Alpha — 2026-10-04

0.2.0 was folded into this release. It is mostly bug cleanup; your data is kept when you update.

### Features

- **Agent setup:** If you have just downloaded the repository, paste the setup prompt from the Agent setup screen into your agent; it checks Docker, the Google connection, the PageSpeed key, the project and the agent connection in order. It never asks you to paste secrets into the chat. The same prompt is also in the quick actions on the Help screen.

### Fixes

- **Settings · Google:** The Google client entered in Settings is also used when tokens are refreshed; the problem that asked you to reconnect after about an hour is fixed. The Settings screen explains which Google connection is in use.
- **Audit:** Earlier successful results, speed measurements included, are kept when an audit is interrupted or retried.
- **Audit · calculations:** Page depth, sitemap coverage and orphan page detection are calculated more accurately. Addresses that look alike but differ (http and https, www, trailing slash) now count as different in canonical comparisons, which can reveal real mismatches that were hidden before.
- **Projects · Google:** Data from an old project no longer mixes in when the Google account or property is changed. Removing an account deletes only the data of that account's projects.
- **Analytics:** The quota card shows the correct usage ("231 / 200,000"). Report sizes use the same unit everywhere. The audit history columns say they are "per hundred pages".
- **Saved keywords · CSV:** The order of saved keywords and opening CSV files with Turkish characters in Excel are fixed. More than 500 queries can be saved in one go.
- **Forms · errors:** If a background refresh fails, what you typed in an open form is kept. Error messages say what happened and what you can do next.
- **Agent setup:** Connection instructions for Windows and Git Bash and the Codex command are fixed. Tool descriptions now say plainly that saving keywords and writing project info run without asking for approval.

### Security

- **Reports:** A downloaded report always opens with its own protection rules, so a maliciously written page cannot run before the protection.
- **Scanned addresses:** The www and bare domain are verified separately before scanning. A user name and password written into an address are rejected and hidden on screen.
- **Docker:** The encryption key and the MCP password are written safely; an existing key is never overwritten.

## [0.1.0] Alpha — 2026-10-02

### Features

- **Codex support:** Agent setup has separate instructions for Codex; it connects with one command, installs the SEO skills and checks them with a real call.
- **Google and system limits:** Your daily URL inspection allowance, Analytics quota, today's speed test count and report limits are shown on the relevant screens. Only numbers that are really known are shown, each with its source and time.
- **Quick actions:** The main screens have a Refresh button, the last update time and an r shortcut.
- **Live view:** Audit progress shows crawling and speed testing with separate bars and a time-remaining estimate. If reduced motion is on, no animation plays.
- **Help:** Recheck status, the diagnostics bundle, documentation and release notes are now in a single bar. Common problems cover Docker, a busy port, the MCP password, the PageSpeed limit and missing query data.
- **Settings:** Quick jumps between sections, a status badge on every section and a Test key button for the PageSpeed key.

### Fixes

- **Audit:** Interrupted audits no longer block new audits for good, and finished audits no longer fill the capacity. An agent reading a running audit now sees "audit in progress" instead of "no issues".
- **Projects · Google:** Filters and results from the previous project no longer stay on screen when you switch projects. Changing the Search Console property or disconnecting no longer mixes the history of two properties. Opportunities, Rank tracking and Analytics no longer keep old data when the Google connection changes.
- **Saved keywords:** Keyword search with Turkish characters ("çay", "istanbul"), export and the time-remaining estimate are fixed.
- **Settings:** The form is no longer hidden when the Google client comes from an environment variable, and the format of the Google client ID is checked. A failed update check no longer says "up to date".
- **Delete · disconnect:** Deleting and removing the Google connection, including deleting credentials, ask for confirmation.
- **Search box · clipboard:** The search box no longer adds a history entry on every keystroke or drops letters. Copying to the clipboard also works on insecure addresses.
