---
title: Understanding Analytics data
description: Analytics shows measured visits, engagement and key events from your GA4 property.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

Analytics shows measured visits, engagement and key events from your GA4 property. The report selector offers landing pages, pages, acquisition, key events, ecommerce, site search, audience and measurement health.

## Read the scope first

Unknown measurements are shown as **Could not determine traffic for this period**, with known values preserved. Reported restrictions appear beside the metrics; an unknown cause is stated explicitly. Retry or inspect measurement settings; changing the channel is not suggested as a repair for unreadable data. Background notes are collapsed under **Understanding Analytics data**; scope, dates and warnings remain visible.

Organic search includes search engines beyond Google. All traffic changes both the overview and report. Site search always covers measured search-result events from all traffic and has no channel toggle. All hosts and streams in the property are included. Another site or app can contribute to these totals.

The 7, 28 and 90-day windows end yesterday in the property time zone. Yesterday is an elapsed calendar day, not a guarantee that data is final. Recent days may be reprocessed. Current and previous equal-length dates and the time zone are shown. Links accept paired startDate/endDate values; future end dates are clamped to yesterday with a notice. GA4 and Search Console use different calendars and measures. Matching date labels do not guarantee matching time spans.

## Inspect outcomes and rows

Opportunities links open the same normalized address group and source dates using `pageGroup`. This server filter reads every organic landing-page row from Google, page by page, before the 50/100/200-row screen pagination. Query strings and trailing slashes share a group; different hosts and case-sensitive paths remain separate. A source cap or quality restriction is disclosed as an unverified complete group; an empty result does not prove no traffic. The overview retains its property scope. You can remove the group filter; the URL, Back navigation and exports preserve the group scope.

The overview follows the selected scope: sessions, engagement rate, key events and purchase revenue. Key events are not unique customers. Zero revenue does not prove there is no shop. Unknown currency is named beside the amount. Engagement duration is total time, not the average per user. Daily values distinguish unknown days from zero. Quality restrictions qualify the data and suppress confident comparisons or advice.

Choose 50, 100 or 200 rows per page and use Previous/Next to reach later rows. Filters, sorting, summaries and exports cover the listed page only. Selecting a bar filters the table without changing the summary base. Users can recur across categories: never sum them into unique property users. Equal paths on different hosts and equal item names with different IDs remain distinct. Revenue share charts are withheld for negative or unknown values.

The low-conversion filter is an investigation heuristic over at least four eligible listed pages with at least 30 sessions each. It does not estimate lost sales. No observed key events does not prove missing configuration; check measurement health. Popular internal searches do not prove missing content.

## Share, verify and check quota

Report, channel, dates, breakdown, page size and offset persist in the URL. Exact host/path filtering covers listed rows only and does not combine URL variants. CSV and Sheets export the filtered rows with raw numeric cells. The ga4_scope_json column preserves provider, property, dates, time zone, currency, quality, page and filters.

Measurement health reads Admin settings only. “No gaps found in the settings checked” does not prove the tag sends data; follow the linked collection checks. Partial inventory counts say at least. When enhanced measurement is off, zero child features are effectively on. No account settings are changed.

The collapsed quota section shows a local snapshot from the latest report response, not traffic-period usage. The standard property ceiling is an assumption. Refresh requests the visible reports again and can spend reporting tokens.

When Google truncates data in the requested date range, the Analytics overview and report details show the reason and dates supplied by Google. The report is treated as limited; incomplete coverage is not presented as a reliable period comparison.
