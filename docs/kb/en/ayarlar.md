---
title: Settings
description: Browser, installation and project scopes; Google credentials, local counters and version checks.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Settings holds the choices that apply to this browser (appearance and language) and to the whole installation (Google credentials, PageSpeed key, limits and updates). A project's name, domain and Google properties live in **Project settings**. This page explains the scope of each setting and where to change it.

## Scope and controls

Appearance is stored in this browser. Choose a language and select **Apply language**; arrow navigation alone does not reload the page. Project market language is a separate setting.

Google credentials apply to all projects in this installation. A service account takes priority. Stored credentials and a selected property do not prove data access. A failed refresh keeps the last configuration visible with a retry action. Select the service account JSON file or use the masked paste field, then save. The private key is never displayed.

Manage project name, domain and property in Project settings. Changing the domain preserves the Google binding and history. Country and language are saved-keyword defaults; choose the country filter separately in Search performance.

## Windows, speed and limits

Windows preferences come from the tray application. Docker shows an informational state without toggles. An unavailable launcher means unknown, not off. Retry reads confirmed values; administrator locks explain why editing is unavailable.

Without a PageSpeed key, the application attempts at most 50 pages per audit. Google can stop requests earlier; a key does not guarantee success. The key test makes one mobile request for example.com, outside the audit measurement counter. It shows a test date; changing the key removes the previous result.

Choose the project in Limits. URL Inspection counts this application's property attempts over a rolling 24 hours. PageSpeed counts audits started in the last 24 hours. GA4 remaining tokens belong to the last response timestamp; the standard-property ceiling is an assumption. Old or missing evidence is unknown. Audit pages come from the latest completed audit for the project domain. Reports and templates count the project's full inventory.

## Updates

In-app version checking contacts GitHub at most every six hours. The Windows tray can check daily independently; Windows settings control automatic installation. Last successful check dates qualify cached version information. Wait and retry for rate/access restrictions; use Help diagnostics for a missing source. An unreadable preference cannot be changed.

## Windows notifications

Right-click the seowatcher tray icon and use **Windows bildirimleri** (Windows notifications, on by default). While the launcher runs, completed/failed audits from all projects and new announcements appear as Windows balloons within about 90 seconds, even with the browser closed or in the background. Click to open the relevant page; several events form one summary. First use skips old events; restarting does not replay seen events. Events received while muted are not replayed later. New-version notifications follow the existing update setting. Windows Focus/Do not disturb can hide notifications. No notifications appear when the launcher is closed. This feature is unavailable in Docker.
