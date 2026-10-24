# Release notes

Features, fixes and other changes, newest release first.

## [0.6.0] Alpha — 2026-10-25

### Features

- Live announcements appear in the app. Prepare and publish bilingual notices from the password-protected admin page.
- The dashboard's Next steps section offers guided tasks and a readiness score based on Google connections, a recent audit, project context and agent setup. It measures setup readiness, not SEO performance or rankings.
- Agent reports now use a coverage checklist for audit and PageSpeed, Search Console, opportunities, ranking history, saved keywords, Analytics, index coverage and sitemaps to produce prioritized improvements.
- The brand link in desktop and mobile navigation opens seowatcher.io.

### Fixes

- Report guidance asks agents to state which data sources are available and to call out missing data.
- The brand area in compact navigation fits without overflow.

### Security

- Cross-origin access is disabled for the admin API; the public feed allows read-only announcement access.

## [0.5.0] Alpha — 2026-10-23

### Features

- Use the interface in Turkish or English. The language you choose under Settings → Appearance → Language also changes how numbers and dates are shown.
- The notification center brings together audit results, new releases, Google connection issues and report updates. Notification sounds and desktop alerts have separate controls.
- Release notes have their own entry in the sidebar, above Notifications. Colored labels show features, fixes and security changes in each release.
- In Settings → Windows, choose whether the app starts with Windows and whether updates install automatically. The app explains when an administrator limits a setting.
- Follow elapsed time and progress during an audit, then review its completion summary. The app also shows progress while preparing a report or checking for updates.
- Open the relevant guide from any screen's title.

### Fixes

- On phones, the country list in the new-project form no longer gets clipped. Escape closes the list first and keeps the form open.
- Long help messages fit in small and compact windows.
- Settings now highlight the selected section correctly. Windows controls have larger touch targets.
- Concurrent index checks use the daily allowance more accurately. Successful results are kept if another check in the group fails.

### Security

- Security fixes were applied to the application's dependencies.

### Before you update

For the first move from version 2.x to the 0.x Alpha series, run the new Windows installer manually. The old updater does not recognize a lower version number as newer. Your data and Google connections are kept.

## [0.4.3] Alpha — 2026-10-22

### Features

- The Windows installer includes missing components, so the app opens on a clean computer too.
- Download new releases from Update in the taskbar menu. You can also choose automatic installation.
- Repair installation can resolve startup problems. Personal information is masked in diagnostic reports when you report an issue.
- Menus, settings and first-run screens are simpler. Light and dark themes now match across the app and website.
- The user guide is available in six languages.

### Fixes

- Removed horizontal overflow on phones from Site audit and Opportunities.
- Fixed an incorrect Google connection warning when the app uses only a service account.
- Improved how device, channel and country names and currencies appear in Analytics.
- Fixed incorrect download links and blank screens for unrecognized addresses.

## [0.3.0] Alpha — 2026-10-21

### Features

- Install the Windows app with one installer, without Docker or a terminal.
- Find downloads, product information and the user guide on seowatcher.io.

### Fixes

- Fixed numbers overflowing the issue summary card in Site audit.

## [0.2.1] Alpha — 2026-10-04

### Fixes

- Fixed a problem that asked you to reconnect Google about an hour after setting up the connection in Settings.
- Kept earlier successful results when an audit stops partway through or retries.
- Improved calculations for page depth, sitemap coverage and orphan pages.
- Prevented data from the previous project mixing with the new one after changing Google accounts or properties.
- Fixed the order of saved keywords and CSV files with Turkish characters opening in Excel.
- Kept text in open forms when a background refresh fails. Errors now explain the next useful step more clearly.

### Security

- Strengthened security checks for downloaded reports and scanned site addresses.

## [0.2.0] Alpha — 2026-10-03

### Features

- The setup prompt on the Agent setup screen checks a first installation and Google connection step by step.

### Fixes

- Fixed the Analytics quota indicator, report dimensions and comparisons in audit history.
- Settings now explains which Google connection is being used.
- Corrected agent connection instructions for Windows and Git Bash.

## [0.1.0] Alpha — 2026-10-02

### Features

- Added separate connection instructions for Codex.
- Google and system limits now appear on the relevant screens. Counters with unknown data are marked clearly.
- Added a Refresh button and last-updated time to the main screens.
- Brought diagnostic information, common issues and quick actions together on the Help screen.

### Fixes

- An interrupted audit no longer blocks a new audit indefinitely.
- Filters and results from the previous project no longer remain visible when you switch projects.
- Fixed Turkish keyword search, exports and remaining-time estimates.
- Delete and disconnect Google actions now ask for confirmation.
