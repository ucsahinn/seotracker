---
title: Search performance
description: See which searches you appear in on Google and how many people click. By query, page, country and device, up to 16 months back.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-22
---

This screen shows which searches your site appears in on Google and how many people click. The data comes straight from Google Search Console; the app estimates nothing.

Your filters are kept in the page address, so you can share the view as a link or bookmark it.

## What is on the screen

**Filters.** **Period**: Last 7 days, Last 28 days (default), Last 3 months. **Search type**: Web, Image, Video, News. **Device**: All devices, Mobile, Desktop, Tablet. The **Country** list contains the countries Google reported in that period. The **Change property** link opens the project settings.

**Four total cards.** **Clicks**, **Impressions**, **CTR** (click-through rate; the percentage of impressions that were clicked) and **Average position**. For average position, a lower number is better, and 1 is the top position. Each card shows the change from the previous period.

**Daily change chart.** The totals broken down by day. The buttons above it switch between the four measures.

**Devices**, **Countries**, **Search appearance**. Three small cards. Countries shows the top six. Search appearance lists rich result types; a rich result is a search result with extra information, such as a product or a video. It shows the top five and groups the rest under "Other appearances".

**Four tabs.**

- **Positions 5-20 (N)**: queries that appear on Google between position 5 and 20, most shown first.
- **Queries**: a table by search.
- **Pages**: a table by page.
- **Cannibalization**: searches in which more than one of your pages compete.

**Quick filters.** **In the top 10**, **No clicks**, **Low CTR**, **Position 5-10**, **Position 11-20**. Low click rate means a query on the first page of results with at least 100 impressions and a click rate under 2%.

**Row menu.** The three dots at the right of each row: **Open page in a new tab**, **Copy URL**, **Copy keyword**, **Save as keyword**. Saved keywords go to the **Saved keywords** screen.

**Export.** **Export to Sheets** and **Download CSV**. Both export the visible table with your filters applied. The overlaps tab has no export.

## How to use it

1. Start with **Last 28 days**. If there is a big drop, switch to **Last 3 months** and check the chart for the day the drop started.
2. Open the **Positions 5-20** tab. These are queries where Google already shows you but few people click. Open the page for each of the three most shown queries and improve its title and first paragraph for that search.
3. In the **Queries** tab, press the **Low CTR** button. Your position is good but few people click, so the cause is most likely the title and description.
4. To see which searches a page appears in, use **Search in Search performance** in the **Sayfalar** tab.
5. Save the queries you want to follow with **Kelime olarak kaydet**.

## How the numbers are calculated

Google delivers data three days late, so the range ends three days before today. The previous period has the same length and ends where this range begins. Changes in clicks and impressions are shown as a percentage, and the change in click rate in percentage points.

The total cards show the real site totals. The tables count each page that appears for the same search separately, so adding up the page table gives a number larger than the card. This is not an error.

Google returns at most 1,000 rows at a time. If a note under the table says that this list is not complete, the list was cut off. The Position 5-20 list has at most 100 rows.

The overlap analysis looks at 28 days. It examines only searches with at least 100 impressions. A page takes part only if it has at least 10 impressions and a 20% share. The page Google shows most is counted as the "preferred" one.

## Frequently asked questions

**Why are the last three days empty?** Google has not delivered those days yet. Check again in a few days.

**The table total does not match the card.** This is expected. The card shows the site total.

**My position is different when I search on Google.** The position here is an average for the period, not the result of a single search.

**The query I searched for is not in the list.** Google hides queries that are searched very rarely, and small sites may have no query rows at all.

**If there is an overlap, should I merge the pages?** Usually not. First decide which page should answer the search, then point your internal links to it.

## Limits

This screen has no Discover or Google News data, no search volume and no competitor positions. The data goes back at most 16 months. For older data, see the archive on the **Rank tracking** screen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchFilters.tsx; TotalsCards.tsx; SearchTrendChart.tsx; CountryBreakdown.tsx; QuickFilterBar.tsx; quickFilters.ts; tabBuckets.ts; TabSummaries.tsx; SearchPerformanceColumns.tsx; CannibalizationTable.tsx; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/searchPerformanceReport.ts; src/server/features/gsc/cannibalization.ts; src/server/features/gsc/services/CannibalizationService.ts; src/shared/dataFreshness.ts -->
