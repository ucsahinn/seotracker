---
title: Rank tracking
description: Follow average Google positions for your Search Console queries over time, beyond Google's 16-month window, using the local archive.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

**Rank tracking** reads the Search Console Web queries stored in the local archive. Because the archive lives on your computer, it keeps history that Google drops after 16 months.

Average position is not a fixed rank that every searcher sees; it varies with location, device and context. Impressions are not search volume.

## Risers and fallers

The summary compares two periods. It counts the queries observed in both periods that moved by at least half a position, and counts separately the queries that cannot be compared. Start with the history of the suggested faller. Priority is the change in position multiplied by the query's impressions; it is not an estimate of lost clicks.

**Risers and fallers** shows three queries per list, or up to five when expanded. The expand button appears only when there are more than three. If no query was observed in both periods, the card says that movement cannot be calculated instead of showing zero.

## Period and archive coverage

Choose 30, 90, 180, 480 or 1,825 days. The longest option covers the last five years of the archive, not all history. Month labels are approximate; the data details give exact dates on the America/Los_Angeles calendar. The period ends three days before today to allow for Google's reporting lag; the app does not verify completeness live. Imports request only data that Google marks as final.

The coverage details count days with a complete API response, days limited by the app, failed days and days of unknown coverage separately. Days already in the archive are not marked complete after the fact. Even a complete response lacks the queries Google hides for privacy. The last observed date and the date the archive was scanned through are different things.

## How the archive fills

While this screen is open, missing days load by themselves; **Search performance** also updates the archive while it is open. Nothing is fetched while both screens, or the app, are closed.

- After each limited transfer, the app waits 15 seconds before it requests the next chunk.
- Once the archive is current, it checks again every 15 minutes.
- After a connection or quota error, it waits 15 minutes before retrying.
- After an authorization error, you must renew the connection yourself.

**Continue filling archive** resumes the transfer by hand. The first import starts at the beginning of Google's 16-month retention window; days Google no longer serves cannot be recovered. Each run handles at most four time windows, and windows with many rows are split into days and continued in later runs. For one day the app reads up to the 50,000 rows Google serves; a day that still cannot be completed stays incomplete. The existing archive stays readable while it syncs.

## Position distribution

**Position distribution** covers every query observed in the current period. Positions are rounded, so 3.4 falls in the first band and 3.5 in the second. Bars are scaled to the largest band, and the percentage is each band's share of observed queries. Band changes are net changes across queries observed in both periods. A missing comparison is never shown as zero.

## Finding queries

Search and filters cover the entire archive. Filter counts take the search text and other active filters into account.

- **High impressions** includes queries tied at the upper-quartile threshold.
- **Period average in top 10** includes queries with no previous observation.
- **Dropped out of the top 10** requires an observation in both periods.

One button clears all filters. Pages hold 25, 50 or 100 queries; the summaries do not depend on page size.

Queries seen in the previous period but not in the current one have their own list, showing the first 25 by impressions and following the search text. Their absence does not prove a ranking loss or a position of zero.

## Reading a query's history

- Position averages are weighted by impressions.
- Change is the previous average minus the current average, so a positive number is an improvement.
- A change below 0.05 positions is shown as neutral; the significant-movement filters use 0.5.
- The detail uses the same periods as the table. The first and last recorded days are shown as separate evidence.

The number of observed days is always visible: 10 days out of a 90-day period is not full coverage. Daily points are spaced by real calendar dates, and gaps break the line. Whole missing weeks stay as gaps in weekly lines, and the first and last week can be partial. Use the arrow keys, Home and End to step through dates, or expand the daily values as a list.

The **Search performance** link keeps the exact query and dates. If the period is older than Google's 16-month window, the screen tells you the earliest date Google can still return before you leave.

Competitor rankings, search volume and traffic forecasts are not available.
