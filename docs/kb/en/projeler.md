---
title: Projects
description: Projects helps you choose a site and complete its missing connections. Each project keeps its own Google properties, audits and reports.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

Projects helps you choose a site and complete its missing connections. Each project keeps its own Google properties, audits and reports.

## Read the screen

With multiple projects, search by name or domain and sort by either. **Last opened** is the project remembered by this browser, not an SEO status. Continue with **Add site**, **Connect Search Console**, or **Open dashboard**, according to the known configuration. **Project info** opens notes; **Settings** opens configuration.

**Search archive** means locally stored Web search data for all devices and countries. The dates are visible. The window ends on the newest stored day, which may be old. With missing days, clicks are the subtotal of observed days only. A missing day is a gap, not zero. A change is shown only when both periods are complete. Equal totals say “Unchanged”; changes from zero include explicit previous and current counts. Archive details show the last stored day and available read timestamp. Legacy records do not identify the evidence used to establish finality.

The audit belongs to the selected site's own host. The last completed snapshot and a newer failed or running attempt are distinct. A stored connection does not prove a successful Google read. Unavailable sources are neither disconnected nor measured zero: use **Retry**. Refresh reads identities and local facts together; it does not call Google or start an audit.

## Create and manage

Choose **New project**, enter a name, optional domain, country and language. Creating it collects no data. Choose Google properties in **Settings → Connections**. General settings change identity and market. One project has one Search Console and one Analytics property.

Archiving preserves data. **Archived → Restore** brings the project back. The last remaining project cannot be archived. Search clicks differ from GA4 sessions and query-archive totals. Projects with different dates are not added together.

When the previous period has fewer than 20 clicks, the badge shows the click difference instead of a percentage. For example, 1 to 5 is +4 clicks; with small counts, that change alone is not strong evidence of growth.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
