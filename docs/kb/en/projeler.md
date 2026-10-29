---
title: Projects
description: Create a project for each site, pick the one to work on, finish its connections and archive or restore projects without losing data.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

A project is one site. It keeps its own Search Console property, GA4 property, audits, reports and notes. The **Projects** screen lists them, shows what each one still needs and takes you to its next step.

## Find and open a project

With several projects, search by name or domain and sort by either. **Last opened** marks the project this browser opened most recently; it says nothing about the site's health. Each card offers the next useful action for that project: **Add site**, **Connect Search Console** or **Open dashboard**. **Project context** opens the project's notes and **Settings** opens its configuration.

## What a project card shows

**Search archive** shows clicks from the locally stored Search Console archive: Web search, all devices and all countries. The dates are on the card. The window ends on the newest stored day, which can be some time ago if the archive has not been updated. If days are missing, the click count covers only the days that were observed; a missing day is a gap, not zero. A change is shown only when both periods are complete. Equal totals read **No change**.

When the previous period has fewer than 20 clicks, the badge shows the difference in clicks instead of a percentage. A rise from 1 to 5 clicks reads +4 clicks; a change that small is not evidence of growth on its own. A rise from zero shows both counts.

The audit summary belongs to the project's own domain. The last completed audit and a newer attempt that is still running or failed are shown separately.

A saved connection does not prove that Google data can be read. If a source cannot be read, the card says so instead of showing it as disconnected or as zero; use **Try again**. Refreshing the screen reads local data only. It does not call Google and does not start an audit.

## Create a project

Choose **New project** and enter a name. Domain, country and language are optional. Creating a project collects no data. Next, open **Project settings → Connections** and choose one Search Console property and one GA4 property for the project. The **Basics** tab changes the name, domain and market.

## Archive and restore

Archiving hides a project and keeps all its data. Restore it from the **Archived** list. You cannot archive your only project.

## Comparing projects

Search Console clicks, GA4 sessions and archive totals measure different things, so do not compare one project's clicks with another project's sessions. Cards can also cover different dates; do not add them together.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
