---
title: Dashboard
description: The project's starting screen: Google search totals, the next few tasks worth doing, the latest audit and organic traffic from GA4.
screen: Panel
route: /p/<proje>
updated: 2026-10-28
---

The **Dashboard** summarizes one project on a single screen: search results from Search Console, up to three next tasks, the latest site audit and organic traffic from Google Analytics. Each card states the dates and the source it covers.

**Refresh** reads the dashboard sources, the setup status and the Google configuration again. If one source fails, the dashboard reports a partial refresh and keeps the rest. The time the data was retrieved is shown separately from the latest day the data covers.

## Search summary

The default view is the last 28 complete days of Web search, all devices and all countries, on Google's Pacific calendar. Recent days that Google has not finalized are left out. The source line shows the exact current and previous dates, the latest data day and the excluded days; if Google gives no finality date, the screen says it is assuming one.

- **Clicks**: visits from Google search results.
- **Impressions**: times your site appeared in results.
- **CTR**: clicks divided by impressions.
- **Average position**: weighted by impressions; lower is better, and 1 is the top.

Each tile opens **Search performance** with the same settings. The faded line on the daily click chart is the previous period. A rise from zero shows the absolute count instead of a percentage; a fall to zero shows a normal negative percentage. If the previous period is missing, no change is shown.

When the previous period has too few clicks for a reliable comparison, the summary leads with the actual clicks and impressions. With little data, a percentage alone does not show growth or decline.

## Next tasks

Up to three tasks come from connection problems, audit findings, search opportunities or an outdated audit. A connected source alone does not create a task, and a failed audit read never turns into first-use advice. An empty task list means nothing urgent was found in the data that could be read; it does not certify that every source is healthy.

## Setup

The **Setup checklist** uses the same six signals as [Project context](/docs/proje-bilgisi/) and reports a missing signal separately from an unreadable one. A completed audit of the project's own domain counts as outdated after seven days. **Setup preferences** is an optional, collapsed tour with no score of its own. Steps you put off can be brought back once no active step remains.

## Queries that could move up one position band

This card lists queries with a rounded average position from 4 to 20 and enough impressions. The extra clicks shown assume each query moves up one position band. They are an upper bound, not measured traffic. Queries with and without an estimate are counted across the whole eligible set before the top four are shown; if no estimate is possible, the card does not show zero. The card also states whether brand queries were separated using confirmed names, suggested names or not at all.

An empty card does not mean no query ranks between 4 and 20: the impression threshold scales with the period, and brand queries are excluded. Do not add this estimate to the total on [Opportunities](/docs/firsatlar/), which counts pages over a different period.

## Site audit

The card uses only audits of the project's own domain; a newer audit of a different site is ignored. It shows the last completed audit and, separately, any newer audit that is still running or failed. If the project has no domain, the card links to project settings. Otherwise it names the start URL, date, measured checks and any page limit.

The counts use different units: affected pages, failed check types and severity counts per page and check. One page can fail three checks. Info findings sit outside the critical and warning bar. Health wording applies only to what was measured; a page limit or unmeasured checks mean the result does not cover the whole site.

Changes between audits appear only when both audits share the same start URL, settings and crawled pages and have usable measurements. A check counts as fixed only if it was measured in both audits. **Pages with the most issues** opens the same audit's issues, filtered to the selected URL.

## Organic traffic

Organic sessions, active users, engagement rate and key events come from Google Analytics, with the dates and the property's time zone shown. Sessions are not the same as Google clicks and include other search engines. An unknown or restricted value never means zero traffic; the other readable values stay visible. Privacy thresholds, sampling and access limits are named on the card, unreliable comparisons are withheld, and missing days stay as gaps. If sessions are unknown, check the source warnings in the [Analytics](/docs/analytics/) report, the connection's access and the site's tag.

Revenue and orders stay visible if either period has recorded sales, even when the current period is zero. If neither period has sales data, the note under **Organic revenue** says sales measurement is unverified. An unknown currency is labelled.

## What the dashboard does not include

There is no keyword volume, backlink data or competitor ranking. To compare a figure with Google's own reports, use the same dates and filters there.
