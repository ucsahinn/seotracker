---
title: Release notes
description: seowatcher 0.5.0 Alpha — Turkish and English UI, a notification center, sounds and clearer task progress.
updated: 2026-10-24
---

The latest release is **0.5.0 Alpha**, October 23, 2026. Your data is kept when you update.

For the first move from 2.x to 0.x.x Alpha, run the new installer manually; the old updater does not recognize the lower number as newer.

## 0.5.0 Alpha

- Use the interface in Turkish or English. Numbers and dates follow your language choice.
- The notification center keeps track of audits, updates, Google connections and reports. Sound and desktop notifications have separate settings.
- Release notes now have their own entry above Notifications in the sidebar. Colored labels show the features and fixes in each release.
- In Settings → Windows, turn startup with Windows and automatic update installation on or off.
- See elapsed audit time and a completion summary, and open the relevant guide beside each page title.
- The country list in the mobile project form and help text in small windows no longer get clipped. Escape closes the country list before closing the form.
- Simultaneous index checks use the daily allowance more accurately. Successful results are kept even if another check fails.

## 0.4.3 Alpha — 2026-10-22

## Highlights

- **Opens on any computer.** The missing Windows component ships with the installer, so it starts the first time even on a clean machine.
- **Updates itself.** It downloads the new version, verifies it and installs it quietly. **Güncelle** (Update) in the taskbar menu is always one click away.
- **Simpler screens.** Every empty screen shows one next step, and the menus and texts read naturally.
- **A new face.** Black surfaces, an orange accent and the eye logo; the app and the site now look the same.
- In Agent setup, "Fresh install" now comes first for first-time users.
- The Update item shows the check, the download percentage and the install step.

## Windows

- **Starts on a clean computer.** The installer carries the Microsoft Visual C++ runtime and installs it once, with permission, if it is missing.
- **Update.** Always in the taskbar menu. It installs a new version if there is one and says "Up to date" if not.
- **Repair installation.** Clears temporary files, checks the package and opens the app again.
- **Report a problem.** Opens a pre-filled issue. User names, site names and email addresses are masked.
- **Versioned installer.** The file name and the setup wizard show the version being installed.

## The app

- **Side menu.** The groups are "Search and site" and "Agent"; Help and Settings sit at the bottom.
- **Agent setup.** One card and one copy button for Claude Code, Codex or any other assistant.
- **Settings.** The Google connection is explained in three steps; the theme is dark by default.
- **Both installs covered.** Help and the agent instructions describe the taskbar on Windows and the `docker compose` commands on Docker.

## Site and guide

- **Six languages.** Turkish, English, German, French, Italian and Portuguese, with a flag menu.
- **Plain writing.** Short sentences, and every technical term is explained the first time it appears.

## Fixes

- The download link on the site pointed at the wrong release tag.
- On Git Bash, the Codex setup command did not strip the line break at the end of the password.
- On one card of the site audit, the numbers spilled out of the card.
- With only a service account connected, the dashboard wrongly said the Google access key was missing.
- On phones, the site audit and Opportunities screens scrolled sideways.

The full history is in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) on GitHub.
