# Release notes

Features, fixes and other changes, newest release first.

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

### Features

- **Windows installation:** The Windows installer includes missing components, so the app opens on a clean computer too.
- **Windows updates:** Download new releases from Update in the taskbar menu. You can also choose automatic installation.
- **Help · Diagnostics:** Repair installation can resolve startup problems. Personal information is masked in diagnostic reports when you report an issue.
- **App appearance:** Menus, settings and first-run screens are simpler. Light and dark themes now match across the app and website.
- **User guide:** The user guide is available in six languages.

### Fixes

- **Site audit · Opportunities:** Removed horizontal overflow on phones from Site audit and Opportunities.
- **Google connections:** Fixed an incorrect Google connection warning when the app uses only a service account.
- **Analytics:** Improved how device, channel and country names and currencies appear in Analytics.
- **Website · downloads:** Fixed incorrect download links and blank screens for unrecognized addresses.

## [0.3.0] Alpha — 2026-10-21

### Features

- **Windows installation:** Install the Windows app with one installer, without Docker or a terminal.
- **Website:** Find downloads, product information and the user guide on seowatcher.io.

### Fixes

- **Site audit:** Fixed numbers overflowing the issue summary card in Site audit.

## [0.2.1] Alpha — 2026-10-04

### Fixes

- **Settings · Google:** Fixed a problem that asked you to reconnect Google about an hour after setting up the connection in Settings.
- **Site audit:** Kept earlier successful results when an audit stops partway through or retries.
- **Site audit:** Improved calculations for page depth, sitemap coverage and orphan pages.
- **Projects · Google:** Prevented data from the previous project mixing with the new one after changing Google accounts or properties.
- **Saved keywords · CSV:** Fixed the order of saved keywords and CSV files with Turkish characters opening in Excel.
- **Forms · refresh:** Kept text in open forms when a background refresh fails. Errors now explain the next useful step more clearly.

### Security

- **Reports · crawling:** Strengthened security checks for downloaded reports and scanned site addresses.

## [0.2.0] Alpha — 2026-10-03

### Features

- **Agent setup:** The setup prompt on the Agent setup screen checks a first installation and Google connection step by step.

### Fixes

- **Analytics:** Fixed the Analytics quota indicator, report dimensions and comparisons in audit history.
- **Settings:** Settings now explains which Google connection is being used.
- **Agent setup:** Corrected agent connection instructions for Windows and Git Bash.

## [0.1.0] Alpha — 2026-10-02

### Features

- **Agent setup:** Added separate connection instructions for Codex.
- **Google connections:** Google and system limits now appear on the relevant screens. Counters with unknown data are marked clearly.
- **Main screens:** Added a Refresh button and last-updated time to the main screens.
- **Help:** Brought diagnostic information, common issues and quick actions together on the Help screen.

### Fixes

- **Site audit:** An interrupted audit no longer blocks a new audit indefinitely.
- **Projects:** Filters and results from the previous project no longer remain visible when you switch projects.
- **Saved keywords:** Fixed Turkish keyword search, exports and remaining-time estimates.
- **Delete · disconnect:** Delete and disconnect Google actions now ask for confirmation.
