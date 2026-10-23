---
title: Release notes
description: What changed in seowatcher 2.4.1. One-file install on Windows, an app that updates itself, simpler screens and a site in six languages.
updated: 2026-10-23
---

The latest release is **2.4.1**, October 23, 2026. Your data is kept when you update; the Windows package installs new versions on its own.

## Highlights

- **Opens on any computer.** The missing Windows component ships with the installer, so it starts the first time even on a clean machine.
- **Updates itself.** It downloads the new version, verifies it and installs it quietly. **Güncelle** (Update) in the taskbar menu is always one click away.
- **Simpler screens.** Every empty screen shows one next step, and the menus and texts read naturally.
- **A new face.** Black surfaces, an orange accent and the eye logo; the app and the site now look the same.

## Windows

- **Starts on a clean computer.** The installer carries the Microsoft Visual C++ runtime and installs it once, with permission, if it is missing.
- **Update.** Always in the taskbar menu. It installs a new version if there is one and says "Güncel" (Up to date) if not.
- **Repair installation.** Clears temporary files, checks the package and opens the app again.
- **Report a problem.** Opens a pre-filled issue. User names, site names and email addresses are masked.
- **Versioned installer.** The file name and the setup wizard show the version being installed.

## The app

- **Side menu.** The groups are "Arama ve site" (Search and site) and "Ajan" (Agent); Help and Settings sit at the bottom.
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

The full history is in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) on GitHub.
