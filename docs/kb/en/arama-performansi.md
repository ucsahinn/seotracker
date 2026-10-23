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

**Filters.** **Dönem** (Period): Son 7 gün, Son 28 gün (default), Son 3 ay (last 7 days, last 28 days, last 3 months). **Arama türü** (Search type): Web, Görsel (Image), Video, Haber (News). **Cihaz** (Device): Tüm cihazlar (All devices), Mobil (Mobile), Bilgisayar (Computer), Tablet. The **Ülke** (Country) list contains the countries Google reported in that period. The **Mülkü değiştir** (Change property) link opens the project settings.

**Four total cards.** **Tıklama** (Clicks), **Gösterim** (Impressions), **Tıklama oranı** (Click rate; the percentage of impressions that were clicked) and **Ortalama sıra** (Average position). For average position, a lower number is better, and 1 is the top position. Each card shows the change from the previous period.

**Daily change chart.** The totals broken down by day. The buttons above it switch between the four measures.

**Cihazlar, Ülkeler, Arama görünümü** (Devices, Countries, Search appearance). Three small cards. Countries shows the top six. Search appearance lists rich result types; a rich result is a search result with extra information, such as a product or a video. It shows the top five and groups the rest under "Diğer görünümler" (Other appearances).

**Four tabs.**

- **Sıra 5-20 (N)** (Position 5-20): queries that appear on Google between position 5 and 20, most shown first.
- **Sorgular** (Queries): a table by search.
- **Sayfalar** (Pages): a table by page.
- **Sayfa çakışmaları** (Page overlaps): searches in which more than one of your pages compete.

**Quick filters.** **İlk 10'da** (In the top 10), **Hiç tıklanmayan** (Never clicked), **Tıklama oranı düşük** (Low click rate), **Tıklama alanlar** (With clicks), **Sıra 5-10** (Position 5-10), **Sıra 11-20** (Position 11-20). Low click rate means a query on the first page of results with at least 100 impressions and a click rate under 2%.

**Row menu.** The three dots at the right of each row: **Sayfayı yeni sekmede aç** (Open page in new tab), **Adresi kopyala** (Copy address), **Kelimeyi kopyala** (Copy keyword), **Kelime olarak kaydet** (Save as keyword). Saved keywords go to the **Kayıtlı kelimeler** (Saved keywords) screen.

**Export.** **E-Tablolar'a aktar** (Export to Sheets) and **CSV indir** (Download CSV). Both export the visible table with your filters applied. The overlaps tab has no export.

## How to use it

1. Start with **Son 28 gün**. If there is a big drop, switch to **Son 3 ay** and check the chart for the day the drop started.
2. Open the **Sıra 5-20** tab. These are queries where Google already shows you but few people click. Open the page for each of the three most shown queries and improve its title and first paragraph for that search.
3. In the **Sorgular** tab, press the **Tıklama oranı düşük** button. Your position is good but few people click, so the cause is most likely the title and description.
4. To see which searches a page appears in, use **Arama performansında ara** (Search in Search performance) in the **Sayfalar** tab.
5. Save the queries you want to follow with **Kelime olarak kaydet**.

## How the numbers are calculated

Google delivers data three days late, so the range ends three days before today. The previous period has the same length and ends where this range begins. Changes in clicks and impressions are shown as a percentage, and the change in click rate in percentage points.

The total cards show the real site totals. The tables count each page that appears for the same search separately, so adding up the page table gives a number larger than the card. This is not an error.

Google returns at most 1,000 rows at a time. If a note under the table says "bu liste tam değil" (this list is not complete), the list was cut off. The Position 5-20 list has at most 100 rows.

The overlap analysis looks at 28 days. It examines only searches with at least 100 impressions. A page takes part only if it has at least 10 impressions and a 20% share. The page Google shows most is counted as the "preferred" one.

## Frequently asked questions

**Why are the last three days empty?** Google has not delivered those days yet. Check again in a few days.

**The table total does not match the card.** This is expected. The card shows the site total.

**My position is different when I search on Google.** The position here is an average for the period, not the result of a single search.

**The query I searched for is not in the list.** Google hides queries that are searched very rarely, and small sites may have no query rows at all.

**If there is an overlap, should I merge the pages?** Usually not. First decide which page should answer the search, then point your internal links to it.

## Limits

This screen has no Discover or Google News data, no search volume and no competitor positions. The data goes back at most 16 months. For older data, see the archive on the Sıralama takibi (Ranking tracking) screen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchFilters.tsx; TotalsCards.tsx; SearchTrendChart.tsx; CountryBreakdown.tsx; QuickFilterBar.tsx; quickFilters.ts; tabBuckets.ts; TabSummaries.tsx; SearchPerformanceColumns.tsx; CannibalizationTable.tsx; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/searchPerformanceReport.ts; src/server/features/gsc/cannibalization.ts; src/server/features/gsc/services/CannibalizationService.ts; src/shared/dataFreshness.ts -->
