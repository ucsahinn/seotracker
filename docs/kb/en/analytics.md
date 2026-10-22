---
title: Analytics
description: See what visitors from search do next. Google Analytics 4 reports, key events and whether your measurement is working properly.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

On this screen you see what the people who come to your site do next. Search Console tells you what happens on Google. Analytics tells you what the visitor does on your site.

The screen shows seven reports from your Google Analytics 4 account. By default it filters for visitors from search only (organic search). The eighth tab checks the measurement itself: is the counter working, is a key event defined?

## What is on the screen

**Tabs.** **Giriş sayfaları** (Landing pages), **Sayfa performansı** (Page performance), **Trafik kaynakları** (Traffic sources), **Anahtar olaylar** (Key events), **E-ticaret** (E-commerce), **Site içi arama** (Site search), **Kitle dağılımı** (Audience breakdown) and **Ölçüm durumu** (Measurement status). A short question is written under each tab. A landing page is the first page a visitor enters on your site. A key event is an action you count as important.

**Controls.** **Dönem** (Period): Son 7 gün, Son 28 gün, Son 3 ay (last 7 days, last 28 days, last 3 months). **Kanal** (Channel): Organik arama (Organic search) (default) or Tüm trafik (All traffic). **Satır** (Rows): 50, 100, 200. In the audience tab you choose **Cihaz** (Device), **Ülke** (Country), **Yeni / geri dönen** (New / returning). In the traffic tab you choose **Kanal grubu** (Channel group), **Kaynak / ortam** (Source / medium), **Kampanya** (Campaign). Your choices are written to the address bar.

**Organic sessions panel.** In the landing pages tab it sits above the table. A session is one whole visit. The panel has a daily session line, and the **Oturum** (Sessions) and **Etkileşim oranı** (Engagement rate) cards. If revenue is measured, **Organik gelir** (Organic revenue) appears too. All of them show the change compared with the previous period.

**Table.** Columns change with the report. Examples: **Alan adı** (Domain name), **Giriş sayfası** (Landing page), **Sayfa** (Page), **Olay** (Event), **Kanal** (Channel), **Cihaz** (Device), **Ülke** (Country), **Ürün** (Product), **Arama terimi** (Search term). Measures: **Oturum** (Sessions), **Aktif kullanıcı** (Active users), **Etkileşim oranı** (Engagement rate), **Anahtar olay** (Key event), **Gelir** (Revenue), **Görüntülenme** (Views). If no key event is defined, it always shows 0.

**Line under the table.** It says how many rows are shown. If Google sampled the data, "örneklenmiş" (sampled) is added. If it hid rows for privacy, "eşik altı satırlar gizlendi" (rows below the threshold were hidden) is added.

**Quick filters.** **Sadece organik** (Organic only), **Etkileşimi düşük** (Low engagement) (below 50%), **Dönüşümü olan** (With conversions), **Geliri olan** (With revenue), **Etkileşim süresi düşük** (Low engagement time), **Trafiği yüksek, dönüşümü düşük** (High traffic, low conversions).

**Summary cards.** The key events, e-commerce and site search tabs have their own summary cards.

**Measurement status tab.** Four cards: **Web veri akışı** (Web data stream), **Anahtar olay** (Key event), **Özel boyut** (Custom dimension), **Bulgu** (Finding). The findings can be these: "Web veri akışı yok" (No web data stream), "Gelişmiş ölçüm kapalı" (Enhanced measurement is off), "Site içi arama ölçülmüyor" (Site search is not measured), "Anahtar olay tanımlı değil" (No key event is defined), "Envanter eksik olabilir" (The inventory may be incomplete). The seven options of enhanced measurement are shown one by one: Kaydırma (Scrolls), Dış bağlantı (Outbound clicks), Site içi arama (Site search), Video, Dosya indirme (File downloads), Form, Sayfa geçişleri (Page changes). If there is no problem, it says "Ölçüm kurulumunda eksik bulunamadı." (No gaps were found in the measurement setup.)

**Empty states.** It says "Bu dönemde veri yok" (No data in this period) and offers two shortcuts: **Tüm trafiğe bak** (Look at all traffic), **Ölçüm durumunu kontrol et** (Check measurement status). If Analytics is not connected, it says "Google Analytics bağlı değil" (Google Analytics is not connected).

## How to use it

1. Look at the **Ölçüm durumu** tab first. If it says "Anahtar olay tanımlı değil", the conversion columns stay at zero. First define a key event in Analytics.
2. In the **Giriş sayfaları** tab, look at the **Alan adı** column. If you see localhost or 127.0.0.1, a test site on your own computer is sending data. Those rows are not real visits. The app does not filter this out for you.
3. If traffic has dropped, open the **Trafik kaynakları** tab with **Kanal grubu**. If the drop is only in search, the problem is in search. If it dropped in every channel, there is a problem in the measurement or on the site.
4. The **Trafiği yüksek, dönüşümü düşük** button shows this: Google sends visitors, but the page does not keep them. You find the work to do on the Fırsatlar (Opportunities) screen.

## How the numbers are calculated

The range ends yesterday in the account's time zone. Analytics gives data one day late. If "Organik arama" is chosen, only visits from Google or another search engine are counted.

Each report asks for at most 200 rows. Measurement status reads the Analytics settings and does not spend from the report quota. If the report quota runs out, you see the error "Google Analytics reporting quota is exhausted." (the Analytics report allowance is used up). Quotas are tracked in the limits section in **Ayarlar** (Settings).

## Frequently asked questions

**Why is the session count different from the clicks in Search Console?** The two count different things. Search Console counts clicks on Google. Analytics counts sessions that arrive on the site. A visitor who does not give cookie consent never reaches Analytics.

**The row count stays at 200.** At most 200 rows are requested at a time. Shorten the period or change the breakdown.

**Why did the quota run out?** A standard account gets 200,000 tokens (quota units) a day and 40,000 an hour. Each report spends a few tokens. Pressing **Yenile** (Refresh) again and again uses up the quota.

## Limits

What Analytics does not measure, this screen cannot show either. This includes visits without cookie consent, undefined key events and enhanced measurement that is turned off. The screen does not filter out localhost traffic by itself. Analytics and Search Console report in different time zones. Daily matches can shift by one day.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
