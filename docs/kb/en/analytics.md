---
title: Analytics
description: See what visitors from search do next. Google Analytics 4 reports, key events and whether your measurement is working properly.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

This screen shows what visitors do after they arrive on your site. Search Console covers what happens on Google; Analytics covers what visitors do on your site.

Seven tabs show reports from your Google Analytics 4 account, filtered by default to visitors who came from search (organic search). The eighth tab checks the measurement itself: whether the counter works and whether a key event is defined.

## What is on the screen

**Tabs.** **Giriş sayfaları** (Landing pages), **Sayfa performansı** (Page performance), **Trafik kaynakları** (Traffic sources), **Anahtar olaylar** (Key events), **E-ticaret** (E-commerce), **Site içi arama** (Site search), **Kitle dağılımı** (Audience breakdown) and **Ölçüm durumu** (Measurement status). Each tab has a one-line question under it. A landing page is the first page a visitor enters on your site. A key event is an action you count as important.

**Controls.** **Dönem** (Period): Son 7 gün, Son 28 gün, Son 3 ay (last 7 days, last 28 days, last 3 months). **Kanal** (Channel): Organik arama (Organic search) (default) or Tüm trafik (All traffic). **Satır** (Rows): 50, 100, 200. In the audience tab you choose **Cihaz** (Device), **Ülke** (Country), **Yeni / geri dönen** (New / returning). In the traffic tab you choose **Kanal grubu** (Channel group), **Kaynak / ortam** (Source / medium), **Kampanya** (Campaign). Your choices are kept in the page address.

**Organic sessions panel.** It sits above the table in the landing pages tab. A session is one complete visit. The panel has a line chart of daily sessions and the **Oturum** (Sessions) and **Etkileşim oranı** (Engagement rate) cards. If revenue is measured, **Organik gelir** (Organic revenue) appears too. Each card shows the change from the previous period.

**Table.** Columns change with the report. Examples: **Alan adı** (Domain name), **Giriş sayfası** (Landing page), **Sayfa** (Page), **Olay** (Event), **Kanal** (Channel), **Cihaz** (Device), **Ülke** (Country), **Ürün** (Product), **Arama terimi** (Search term). Measures: **Oturum** (Sessions), **Aktif kullanıcı** (Active users), **Etkileşim oranı** (Engagement rate), **Anahtar olay** (Key event), **Gelir** (Revenue), **Görüntülenme** (Views). If no key event is defined, this column always shows 0.

**Line under the table.** It tells you how many rows are shown. If Google sampled the data, "örneklenmiş" (sampled) is added. If it hid rows for privacy, "eşik altı satırlar gizlendi" (rows below the threshold were hidden) is added.

**Quick filters.** **Sadece organik** (Organic only), **Etkileşimi düşük** (Low engagement) (below 50%), **Dönüşümü olan** (With conversions), **Geliri olan** (With revenue), **Etkileşim süresi düşük** (Low engagement time), **Trafiği yüksek, dönüşümü düşük** (High traffic, low conversions).

**Summary cards.** The key events, e-commerce and site search tabs have their own summary cards.

**Measurement status tab.** Four cards: **Web veri akışı** (Web data stream), **Anahtar olay** (Key event), **Özel boyut** (Custom dimension), **Bulgu** (Finding). The findings can be: "Web veri akışı yok" (No web data stream), "Gelişmiş ölçüm kapalı" (Enhanced measurement is off), "Site içi arama ölçülmüyor" (Site search is not measured), "Anahtar olay tanımlı değil" (No key event is defined), "Envanter eksik olabilir" (The inventory may be incomplete). Each of the seven enhanced measurement options is listed: Kaydırma (Scrolls), Dış bağlantı (Outbound clicks), Site içi arama (Site search), Video, Dosya indirme (File downloads), Form, Sayfa geçişleri (Page changes). If there is no problem, it says "Ölçüm kurulumunda eksik bulunamadı." (No gaps were found in the measurement setup.)

**Empty states.** The screen says "Bu dönemde veri yok" (No data in this period) with two shortcuts: **Tüm trafiğe bak** (Look at all traffic), **Ölçüm durumunu kontrol et** (Check measurement status). If Analytics is not connected, it says "Google Analytics bağlı değil" (Google Analytics is not connected).

## How to use it

1. Look at the **Ölçüm durumu** tab first. If it says "Anahtar olay tanımlı değil", the conversion columns stay at zero until you define a key event in Analytics.
2. In the **Giriş sayfaları** tab, look at the **Alan adı** column. If you see localhost or 127.0.0.1, a test site on your own computer is sending data. Those rows are not real visits, and the app does not filter them out.
3. If traffic has dropped, open the **Trafik kaynakları** tab with **Kanal grubu**. If only search dropped, the cause is in search. If every channel dropped, look for a problem with the measurement or the site.
4. The **Trafiği yüksek, dönüşümü düşük** button lists pages where Google sends visitors but the page does not keep them. The to-do list for these pages is on the **Fırsatlar** (Opportunities) screen.

## How the numbers are calculated

The range ends yesterday in the account's time zone. Analytics data arrives one day late. If "Organik arama" is chosen, only visits from Google or another search engine are counted.

Each report requests at most 200 rows. Measurement status reads the Analytics settings and does not spend from the report quota. If the report quota runs out, you see the error "Google Analytics reporting quota is exhausted." (the Analytics report allowance is used up). Quotas are tracked in the limits section in **Ayarlar** (Settings).

## Frequently asked questions

**Why is the session count different from the clicks in Search Console?** They count different things. Search Console counts clicks on Google; Analytics counts sessions that start on your site. A visitor who does not give cookie consent never reaches Analytics.

**Why does the row count stop at 200?** Each request asks for at most 200 rows. Shorten the period or change the breakdown.

**Why did the quota run out?** A standard account gets 200,000 tokens (quota units) a day and 40,000 an hour. Each report spends a few tokens. Pressing **Yenile** (Refresh) repeatedly uses up the quota.

## Limits

This screen cannot show what Analytics does not measure: visits without cookie consent, key events that are not defined and enhanced measurement that is turned off. It does not filter out localhost traffic. Analytics and Search Console use different time zones, so day-by-day comparisons can be off by one day.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
