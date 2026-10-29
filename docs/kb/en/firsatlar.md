---
title: Opportunities
description: Which page to work on first. Pages Google already shows, ranked by an upper bound on extra clicks from your own Search Console data.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

**Opportunities** ranks the pages Google already shows for your site by how many extra clicks they could gain. The estimate uses your own Search Console data and your site's own click-through rates. Each page gets a suggested kind of work and an upper bound on the gain. It is not a forecast or a promise.

## Start here

The **Start here** card names the page with the largest estimated gain and the work to investigate first. It says nothing about how easy or quick that work is.

## Period and scope

Choose 7, 28 or 90 days. Search Console data covers complete days on Google's Pacific calendar; if Google does not report which days are final, the screen states the reporting lag it assumes. The exact start and end dates are always shown. Analytics reads the same calendar dates in the property's time zone, which can cover different hours.

Gains are shown per 30 days so that periods of different lengths compare. This is a scaled upper bound, not a calendar-month forecast or search volume. It counts only queries Google returned with enough data to estimate; the share of hidden queries is unknown, and row limits are stated. The current-click comparison uses all clicks on the candidate pages, brand clicks included.

The query estimate on the [Dashboard](/docs/panel/) uses a different model and period. Do not add the two together.

## Four kinds of work

Each page falls into one kind of work, based on its measured queries:

| Kind of work                     | Situation                                                                           | Suggested action                           |
| -------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| **Title and description work**   | On page one, but clicked less than your site's other searches at the same position. | **Rewrite the title and description**      |
| **On page one, positions 4-10**  | Below the top three. Moving up one band clearly raises clicks.                      | **Strengthen the content**                 |
| **On page two, positions 11-20** | Just behind page one; rarely clicked until it reaches page one.                     | **Add internal links, expand the content** |
| **Deep, beyond position 20**     | Has impressions, but a low position.                                                | **Review search intent and page coverage** |

## The worklist

Pages with an estimated gain come first, sorted by gain. Pages with impressions but no possible estimate follow, sorted by impressions. An unknown gain is not zero, and totals include only computed gains.

For a page with an unknown gain, the suggested work is based on position alone:

| Average position | Suggested work             |
| ---------------- | -------------------------- |
| 1–5              | Review title and snippet   |
| 6–10             | Improve content            |
| 11–20            | Internal links and content |
| 21 and below     | Check search intent        |

These suggestions do not prove a low CTR or a future gain. For a page with an unknown gain, look at the page and its observed queries first, and change the title or content only after you find a mismatch.

On a desktop the worklist is a sortable table; on a phone each page is a row with a **Details** action.

## Filters

Work filters follow the suggestions above. Conversion filters, such as **Show converting pages**, use observed Analytics data and appear only when matching pages exist. Work and conversion filters combine: a page must match both. The server filters every candidate page before showing the first 25, 50 or 100. Overall totals do not change with filters or row limits. A page can belong to several kinds of work, so their page counts do not add up. Period, row limit and filters are kept in the URL.

When every gain is unknown, the work categories show page counts without gain bars.

## Page details

**Details** shows each query's impressions, position, target position band and its share of the page's estimate. The top ten queries are listed, followed by the remainder; together they add up to the page's figure. Only non-brand queries are listed, and pages with only brand queries are marked. The CTR gap, in percentage points, compares like with like: comparable non-brand queries on the same impressions.

## Unknown and thin data

**Unestimable scope** counts pages that could not be estimated, broken down by reason: no matching queries, too few impressions or no target rate. These are separate from a measured zero. No page rows from Google does not prove the site had no impressions.

Thin data does not mean zero potential. Usable non-brand queries can be missing because Google hides them, because brand terms exclude them or because of row limits. Open **Search performance** to review the queries that do have impressions. The calculation details are under **Data coverage and calculation**.

## Analytics alongside

When GA4 is connected, each page shows observed organic sessions, key events and the share of sessions with a key event. The app never projects future conversions from extra clicks. Restricted metrics stay unknown, and source limits and time zones are named. URL variants can share one Analytics group, so do not add its sessions across rows. The conversion summary separates pages with a match from pages whose conversion status is unknown; missing Analytics data does not mean zero conversions, and the explanation appears in the page details rather than on every row.

**Inspect Analytics address group** on a row opens **Landing pages** in [Analytics](/docs/analytics/) with the same dates and address group. When the address or dates cannot be matched, an explanation replaces the link. The group is filtered within the same source of up to 1,000 rows that Opportunities uses.

For a quota error, wait and refresh. For a permission error, check the project's connections. A failed refresh keeps the previous data with its original dates and a warning.

## Export and follow-up

**CSV** and **Export to Sheets** export the filtered rows with the observed dates, the 30-day unit, the model, property, brand source, source limits and Analytics group. Unknown gains are blank, and each row carries its status, reason, brand marker and observed queries. Nothing is written to Sheets until you select the export.

**Open in Search performance** opens the page's detail panel for the same dates. If those dates cannot be read, the screen says so instead of switching to other dates.

After you change a page, note the date, then compare measured clicks, CTR and position over equivalent periods. A smaller estimate on its own does not prove success. A low position or a low estimate is no reason to delete content; merge pages only after confirming that they serve the same intent.
