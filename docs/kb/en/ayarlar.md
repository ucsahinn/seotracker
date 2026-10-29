---
title: Settings
description: What each Settings section controls, which choices apply to this browser or the whole install, and where project settings live instead.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

**Settings** holds choices for this browser and for the whole installation. A project's name, domain, market and Google properties are not here; they are in **Project settings** for that project.

| Section                  | Scope                 | What it controls                                   |
| ------------------------ | --------------------- | -------------------------------------------------- |
| Appearance               | This browser          | Theme (System, Light, Dark) and interface language |
| Google, Service account  | Whole installation    | Google credentials for Search Console and GA4      |
| Speed tests              | Whole installation    | PageSpeed Insights API key                         |
| Google and system limits | One project at a time | Quota and storage counters                         |
| About                    | Whole installation    | Installed version, update checks, release notes    |
| Windows                  | This computer         | Tray app preferences (Windows package only)        |

## Appearance and language

Theme and language are stored in this browser. Pick a language and select **Apply language**; moving through the options with the arrow keys does not reload the page. The interface language is separate from a project's market language, which is set in **Project settings**.

## Google credentials

The credentials apply to every project in the installation. If both a service account and an OAuth client are saved, the service account is used. Select the service account's JSON file, or paste it into the masked field, and save; the private key is never displayed again. A saved credential and a selected property do not prove that Google returns data. If a refresh fails, the last known configuration stays on screen with a **Try again** button. Setup steps are in [Connecting to Google](/docs/google-baglantisi/).

Each project's Search Console and GA4 property is chosen in **Project settings → Connections**. Changing a project's domain keeps its Google binding and history. The project's country and language are defaults for saved keywords; the country filter on **Search performance** is chosen separately.

## Speed tests

Without a PageSpeed key the app measures at most 50 pages per audit, and Google may stop earlier. **Test key** sends one mobile request for example.com that does not count toward the audit counter. Details are in [PageSpeed key](/docs/pagespeed-anahtari/).

## Limits

Choose a project to see its counters.

- **URL Inspection**: this app's checks for the project's Search Console property over the last 24 hours. The limit is 2,000 per property per day.
- **PageSpeed**: measurements by audits started in the last 24 hours.
- **GA4 tokens**: the remaining reporting tokens as of the last report response. The standard-property limit is an assumption.
- **Audit pages**: pages in the latest completed audit for the project's domain.
- **Reports and templates**: everything stored for the project.

A counter with old or missing data shows as unknown instead of zero.

## Updates

The app checks GitHub for a new version at most once every six hours and shows the date of the last successful check. **Check now** checks immediately. If GitHub limits or refuses the request, wait and try again; if the release source cannot be found, download the diagnostics bundle from [Help](/docs/yardim/). On Docker, **About** shows the commands that update the container.

## Windows preferences

These options exist only in the Windows package. They are saved in the tray app and are the same settings as in the tray menu:

- **Start with Windows**: starts seowatcher in the background when you sign in. If an administrator enabled it for all users, only an administrator can turn it off.
- **Install updates automatically**: downloads, verifies and installs new versions. When it is off, use **Güncelle** (Update) in the tray menu. In an install for all users, an administrator installs updates.

The tray app also checks for updates once a day on its own. If it cannot be reached, the section shows the preferences as unknown rather than off; select **Try again**. On Docker the section is informational and has no switches. Error messages for this section are listed in [Troubleshooting](/docs/sorun-giderme/).

## Windows notifications

**Windows bildirimleri** (Windows notifications) in the tray menu is on by default. While the tray app runs, finished and failed audits from all projects and new announcements appear as Windows notifications within about 90 seconds, even when the browser is closed. Selecting a notification opens the relevant page, and several events arrive as one summary. Events from before the first start, events already shown and events that arrive while notifications are off are not shown later. New-version notifications follow the update setting. Windows Focus or Do not disturb can hide them. Nothing appears when the tray app is closed, and the feature is not available on Docker.
