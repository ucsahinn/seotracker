---
title: Search performance
description: See which searches you appear in on Google and how many people click. By query, page, country and device, up to 16 months back.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-22
---

On this screen you see which searches you appear in on Google and how many people click. The data comes straight from Google Search Console. The app does not estimate any number.

The filters you choose are written to the address bar. You can share the view as a link or bookmark it.

## What is on the screen

**Filters.** **Dönem** (Period): Son 7 gün, Son 28 gün (default), Son 3 ay (last 7 days, last 28 days, last 3 months). **Arama türü** (Search type): Web, Görsel (Image), Video, Haber (News). **Cihaz** (Device): Tüm cihazlar (All devices), Mobil (Mobile), Bilgisayar (Computer), Tablet. The **Ülke** (Country) list has the countries Google reported in that period. The **Mülkü değiştir** (Change property) link goes to the project settings.

**Four total cards.** **Tıklama** (Clicks), **Gösterim** (Impressions), **Tıklama oranı** (Click rate) (what percent of impressions were clicked) and **Ortalama sıra** (Average position). In average position, a small number is good, and 1 is the top position. Each card shows the change compared with the previous period.

**Daily change chart.** The totals spread over days. You switch between the four measures with the buttons above it.

**Cihazlar, Ülkeler, Arama görünümü** (Devices, Countries, Search appearance). Three small cards. In countries, the first six are shown. Search appearance lists the rich result types. A rich result is a result that appears in search with extra information such as a product or a video. The first five are shown, and the rest are collected under "Diğer görünümler" (Other appearances).

**Four tabs.**

- **Sıra 5-20 (N)** (Position 5-20): the most shown queries that appear on Google between position 5 and 20.
- **Sorgular** (Queries): a table by search.
- **Sayfalar** (Pages): a table by page.
- **Sayfa çakışmaları** (Page overlaps): cases where more than one of your pages compete in the same search.

**Quick filters.** **İlk 10'da** (In the top 10), **Hiç tıklanmayan** (Never clicked), **Tıklama oranı düşük** (Low click rate), **Tıklama alanlar** (With clicks), **Sıra 5-10** (Position 5-10), **Sıra 11-20** (Position 11-20). Low click rate means this: on the first page, at least 100 impressions, rate under 2%.

**Row menu.** The three dots at the right of each row: **Sayfayı yeni sekmede aç** (Open page in new tab), **Adresi kopyala** (Copy address), **Kelimeyi kopyala** (Copy word), **Kelime olarak kaydet** (Save as word). What you save goes to the Kayıtlı kelimeler (Saved words) screen.

**Export.** **E-Tablolar'a aktar** (Export to Sheets) and **CSV indir** (Download CSV). It takes the visible table, with the filters. The overlaps tab has no export.

## How to use it

1. Start with **Son 28 gün**. If there is a big drop, choose **Son 3 ay**. In the chart, see which day the drop started.
2. Open the **Sıra 5-20** tab. Google already shows you, but nobody clicks. Open the page for the first three most shown queries. Fix the title and the first paragraph for that search.
3. In the **Sorgular** tab, press the **Tıklama oranı düşük** button. Your position is good, but nobody clicks. The problem is most likely in the title and description.
4. To see which searches a page appears in, say **Arama performansında ara** (Search in Search performance) in the **Sayfalar** tab.
5. Mark the queries you want to follow with **Kelime olarak kaydet**.

## How the numbers are calculated

Google gives data three days late. So the range ends three days before today, not on today. The previous period has the same length and comes right before this range. The change in clicks and impressions is shown as a percentage, and the change in click rate is shown in points.

The total cards are the real site totals. The tables count every page that appears in the same search separately. If you add up the page table, you get a number larger than the card. This is not an error.

Google gives at most 1,000 rows at a time. If there is a note under the table saying "bu liste tam değil" (this list is not complete), the list was cut. The Position 5-20 list has at most 100 rows.

The overlap analysis looks at 28 days. It examines only searches with at least 100 impressions. For a page to take part, it needs at least 10 impressions and a 20% share. The page Google shows the most is counted as the "preferred" one.

## Frequently asked questions

**Why are the last three days empty?** Google has not given those days yet. Look again in a few days.

**The table total does not match the card.** This is normal. The card is the site total.

**My position is different when I search on Google.** The position here is the average for the period. It does not reflect a single search.

**The query I searched for is not in the list.** Google hides queries that are searched very rarely. On small sites there may be no query rows at all.

**If there is an overlap, should I merge the pages?** Most of the time, no. First decide which page you want to answer. Then point the internal links to that page.

## Limits

The Discover and Google News types are not there. Search volume and competitor positions are not there either. The data does not go further back than 16 months. For older data, look at the archive on the Sıralama takibi (Ranking tracking) screen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchFilters.tsx; TotalsCards.tsx; SearchTrendChart.tsx; CountryBreakdown.tsx; QuickFilterBar.tsx; quickFilters.ts; tabBuckets.ts; TabSummaries.tsx; SearchPerformanceColumns.tsx; CannibalizationTable.tsx; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/searchPerformanceReport.ts; src/server/features/gsc/cannibalization.ts; src/server/features/gsc/services/CannibalizationService.ts; src/shared/dataFreshness.ts -->
