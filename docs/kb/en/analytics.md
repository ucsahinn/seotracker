---
title: Understanding Analytics data
description: Read GA4 sessions, engagement, key events and revenue for your site, check the measurement setup and export the rows you need.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

The **Analytics** screen reads the GA4 property connected to the project. An overview of sessions, engagement rate, key events and purchase revenue sits at the top. Below it, the report selector offers **Landing pages**, **Pages and screens**, **Traffic acquisition**, **Key events**, **Ecommerce**, **Site search**, **Audience** and **Measurement health**. Notes on how to read the numbers are collapsed under **Understanding Analytics data**; the scope, dates and warnings always stay visible.

## Scope: channel, property and dates

**Organic Search** is the default channel. It includes every search engine, not only Google. **All traffic** switches both the overview and the report. **Site search** always covers all traffic and has no channel switch.

The figures cover every host and data stream in the property. If another site or app sends data to the same property, it is included.

**Last 7 days**, **Last 28 days** and **Last 3 months** (90 days) end yesterday in the property's time zone. The screen shows the current dates, the previous period of equal length and the time zone. Yesterday is a completed calendar day, but GA4 may still reprocess recent days. A link can set exact `startDate` and `endDate` values; an end date in the future is moved back to yesterday with a notice.

GA4 and Search Console use different calendars (property time zone versus Pacific time) and different measures. The same date labels can cover different hours.

## Reading the overview

- **Key events** count events, not unique customers.
- **Engagement duration** is total time, not an average per user.
- **Revenue** of zero does not prove the site has no shop. An unknown currency is named next to the amount.
- Daily values separate an unknown day from a day with zero.

When a value cannot be read, the screen says **Could not determine traffic for this period** and keeps the values it could read. Any restriction Google reports, such as sampling or privacy thresholds, appears next to the metrics, and an unknown cause is stated as unknown. Restricted data is not used for confident comparisons or advice. If Google truncated data in the selected range, the overview and the report show the reason and dates Google gave, and the period comparison is withheld.

To fix unreadable data, select **Try again** or open **Measurement health**. Switching the channel does not repair it.

## Working with report rows

Choose 50, 100 or 200 rows per page and use **Previous** and **Next** for later rows. Filters, sorting, summaries and exports apply to the page of rows on screen. Selecting a bar in a chart filters the table without changing the summary.

- A user can appear in several categories, so do not add category user counts together to get unique users.
- The same path on different hosts, and items with the same name but different IDs, stay as separate rows.
- Revenue share charts are hidden when any value is negative or unknown.

The **High traffic, low conversion** filter is a lead for investigation. It needs at least four listed pages with at least 30 sessions each, and it does not estimate lost sales. A page with no key events does not prove a tracking problem, and popular site searches do not prove missing content.

## Address groups from Opportunities

**Inspect Analytics address group** on the [Opportunities](/docs/firsatlar/) screen opens **Landing pages** filtered to one address group, with the dates of the source data. The server reads every organic landing-page row from Google before splitting it into pages, so the whole group is matched. Query strings and trailing slashes fall into the same group; different hosts and paths with different letter case stay separate. If a source limit or data restriction prevents a complete match, the screen says so; an empty result does not prove there was no traffic. The overview keeps its property-wide scope. **Remove address group filter** returns to the full report.

## Links and exports

The report, channel, dates, breakdown, page size and position are kept in the URL, so a link or the Back button restores the same view. The exact host-and-path filter covers the listed rows only and does not merge URL variants.

**CSV** and **Export to Sheets** export the filtered rows with raw numbers. The `ga4_scope_json` column records the provider, property, dates, time zone, currency, data quality, page and filters.

## Measurement health

**Measurement health** reads the property's Admin settings: web data streams, enhanced measurement, key events and custom definitions. It changes nothing in your account. "No gaps found in the settings checked" does not prove that the tag sends data; use the linked collection checks for that. When enhanced measurement is off, none of its automatic events are active. Counts marked "at least" come from an inventory that may be incomplete.

## Quota

The collapsed quota section shows the remaining reporting tokens from the latest report response, not usage over the selected period. The standard-property limit it compares against is an assumption. **Refresh** requests the visible reports again and spends tokens.
