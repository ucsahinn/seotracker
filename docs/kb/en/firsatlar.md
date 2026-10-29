---
title: Opportunities
description: Which page to work on first: pages Google already shows, ranked by an upper bound on extra clicks from your Search Console data, with suggested work.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

Opportunities ranks the pages Google already shows for your site by how many extra clicks they could bring. The calculation uses your own Search Console data and your site's own click-through rates. Each page gets a suggested kind of work and an upper bound on the gain; it is not a forecast or a guarantee.

## How to use Opportunities

Start with **Look here first**. It opens the page with the highest estimable additional-click upper bound and suggests work to investigate. It does not measure how easy or fast the work will be.

## Dates and scope

Choose 7, 28 or 90 days. Search Console uses complete days on Google's Pacific calendar. If Google supplies no completeness boundary, the app labels its reporting-lag assumption. Actual start and end dates remain visible. Analytics reads the same calendar dates in its property's timezone, which may cover a different interval of time.

The **upper bound scaled to 30 days** normalizes the selected window. It is not a calendar-month forecast, a guarantee or search volume. It covers only fetched, identifiable queries with sufficient evidence. Hidden-query share is unknown, and row limits are disclosed. The dashboard query estimate uses a different model: do not add the two. The current-click comparison uses all clicks on the candidate pages, including brand clicks.

## Worklist and filters

Work and conversion filters combine with AND. The server filters all candidate pages before showing the first 25, 50 or 100 matches. Global totals do not change with filters or row limits. A page may appear in several work categories; their page counts are not additive. Period, row limit and filters stay in the URL.

Desktop has a sortable table; phones have wrapping page rows and a Details action. Details show impressions, position, target position band and the allocated contribution for each query. The top ten queries are shown with a separate remainder. Allocated queries plus the remainder reconcile with the page's displayed bound. The CTR gap uses only comparable non-brand queries and the same supported impressions on both sides, in percentage points.

## Unknown evidence and Analytics

Unestimable scope does not mean no opportunity. Missing query matches, low impressions and missing target rates are counted separately from measured zero. No returned page rows does not prove there were no impressions.

Analytics adds observed organic sessions, key events and the share of sessions with a key event. It never projects future event counts from additional clicks. Restricted metrics stay unknown. Source limits and timezones are disclosed. URL variants may share one Analytics cohort; do not sum its sessions across rows. For quota errors, wait and refresh; for permission errors, check connection settings. A failed refresh preserves previous evidence with its original dates and a warning.

“Inspect Analytics address group” in a row or its detail opens organic landing pages with the source dates and normalized address group. When the address or dates cannot be matched, an explanation replaces the link. The group is filtered before pagination within the same source of up to 1,000 rows used by Opportunities. Analytics discloses source or quality limits that prevent verification of the complete group. Refetched measurements may change; matching date labels can cover different time spans in the GA4 property timezone and Search Console Pacific calendar.

## Export and follow-up

CSV and Sheets exports include the displayed filtered rows, observed dates, normalized upper-bound unit, model, property, brand source, source limits and Analytics cohort. Sheets writes happen only when you select the export action.

Open in Search performance preserves the source start/end dates and opens the exact URL's detail panel. Unreadable periods are explained instead of substituting other dates. Record your change, then compare measured clicks, CTR and position for equivalent periods. A shrinking estimate alone does not prove success. Low rank or a low estimate does not justify deleting content; consider merging only after confirming overlapping intent.

Thin data does not mean zero potential gain. Missing usable non-brand queries may result from hidden queries, brand exclusions or data limits. The longest period never suggests extending it again. Open Search performance to review queries with impressions. Calculation details expand under Data coverage and calculation.

Pages with impressions and unknown gain also appear: estimated pages first by gain, then unknown pages by impressions. Unknown gain is not zero; totals sum only computed gains. Details list observed non-brand queries by impressions and mark pages with only brand queries. Suggestions use position alone (1–5 review title/snippet, 6–10 content, 11–20 internal links/content, 21+ search intent); they do not prove low CTR or future gain. Work filters match these suggestions; conversion filters use observed Analytics signals. CSV and Sheets leave unknown gain blank and include status, reason, brand marker and observed queries.

When gain is unknown, inspect the page and observed queries first; consider title or content changes only after confirming a mismatch. When all gains are unknown, work categories show candidate counts without gain bars. The conversion summary separates matched pages from pages with unknown conversion status; missing Analytics coverage does not mean zero conversions. A conversion filter button appears only when confirmed records exist. Source and period are labelled facts; calculations remain in the closed disclosure. Missing Analytics data is explained in page details rather than repeated on every row.
