---
title: Ranking tracking
description: See the average Google position of your searches, which ones are rising or falling and how the position groups change. The data is stored on this computer, so you can look further back than Google's 16-month limit.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

This screen shows locally archived Search Console Web queries. Average position is not a fixed rank you will see in every search. It varies with location, device and context. Impressions are not search volume.

## Start with the supported movement

The verdict counts queries observed in both periods and movements of at least half a place. Unknown comparisons are counted separately. Open the suggested faller's history first. Investigation priority is absolute position change multiplied by recorded impressions, not estimated lost clicks. Movement lists show three queries initially and up to five when expanded.

## Dates and coverage

Choose 30, 90, 180, 480 or 1825 days. The last option means the last five years of archive, not all history. Month labels are approximate; data details give exact dates on the America/Los_Angeles calendar. The end assumes a three-day lag, without live completeness verification. Imports request Google's final data only.

Complete API responses, application-limited days, failed days and unknown coverage are counted separately. Existing archive days are not retroactively marked complete. Even a completed response excludes Google's hidden and omitted queries. Last observed date differs from scanned-through date. Continue filling may require several runs. Existing history remains readable during sync.

## Distribution and query work

Distribution covers the full observed current population. Positions are rounded: 3.4 belongs to the first group, 3.5 to the second. Bars are relative to the largest group; the percentage is the share of observed queries. Band changes are net changes across the same comparable queries. No comparison is never displayed as zero.

Search and filters cover the archive beyond the former first hundred. Facet counts respect text and other active filters. High impressions includes ties at the upper-quartile threshold. Top 10 includes queries without a previous observation. Dropped out of top 10 requires observations in both periods. Clear all filters with one button. Pages contain 25, 50 or 100 records; summaries do not depend on page size.

Queries observed previously but absent now have a separate list. Absence does not prove a ranking loss or position zero. This list shows the first 25 by impressions and also follows the search text.

## Reading history

Position means are impression-weighted. Change is previous mean minus current mean. Below 0.05 places is neutral; significant-movement filters use 0.5. Detail uses the same period comparison as the table. The first/last recorded-day pair is separate evidence.

Observed days always remain visible: 10 days in a 90-day period is not complete coverage. Daily points use real calendar spacing and gaps break the line. Arrow keys, Home and End inspect dates. Expand daily values for a readable list. Whole missing weeks remain gaps in weekly lines; edge weeks can be partial.

The Search performance link preserves the exact query and archive dates. For periods older than Google's retention, the earliest readable date is explained before navigation. Competitor rankings, paid search volume and traffic forecasts are unavailable.

When no queries were observed in both periods, rises and falls cannot be calculated. The movement card explains this instead of presenting measured zero movement. Expansion is offered only when more than three movements exist.
