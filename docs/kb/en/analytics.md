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

**Tabs.** **Landing pages**, **Pages and screens**, **Traffic acquisition**, **Key events**, **Ecommerce**, **Site search**, **Audience** and **Measurement health**. Each tab has a one-line question under it. A landing page is the first page a visitor enters on your site. A key event is an action you count as important.

**Controls.** **Period**: Last 7 days, Last 28 days, Last 3 months. **Channel**: Organic Search (default) or All traffic. **Rows**: 50, 100, 200. In the audience tab you choose **Device**, **Country**, **New / returning**. In the traffic tab you choose **Channel group**, **Source / medium**, **Campaign**. Your choices are kept in the page address.

**Organic sessions panel.** It sits above the table in the landing pages tab. A session is one complete visit. The panel has a line chart of daily sessions and the **Sessions** and **Engagement rate** cards. If revenue is measured, **Organic revenue** appears too. Each card shows the change from the previous period.

**Table.** Columns change with the report. Examples: **Domain**, **Landing page**, **Page**, **Event name**, **Channel**, **Device**, **Country**, **Item**, **Search term**. Measures: **Sessions**, **Active users**, **Engagement rate**, **Key events**, **Revenue**, **Views**. If no key event is defined, this column always shows 0.

**Line under the table.** It tells you how many rows are shown. If Google sampled the data, "sampled" is added. If it hid rows for privacy, "rows below thresholds hidden" is added.

**Quick filters.** **Organic only**, **Low engagement** (below 50%), **Converting**, **Earning revenue**, **Low engagement time**, **High traffic, low conversion**.

**Summary cards.** The key events, e-commerce and site search tabs have their own summary cards.

**Measurement status tab.** Four cards: **Web data streams**, **Key events**, **Custom dimensions**, **Findings**. The findings can be: "No web data stream", "Enhanced measurement off", "Site search is not measured", "No key events set up", "The inventory may be incomplete". Each of the seven enhanced measurement options is listed: Scrolls, Outbound clicks, Site search, Video, File downloads, Form, Page changes. If there is no problem, it says that no gaps were found in the measurement setup.

**Empty states.** The screen says "No data in this period" with two shortcuts: **View all traffic**, **Check measurement health**. If Analytics is not connected, it says "Google Analytics is not connected".

## How to use it

1. Look at the **Measurement health** tab first. If it says "No key events set up", the conversion columns stay at zero until you define a key event in Analytics.
2. In the **Landing pages** tab, look at the **Domain** column. If you see localhost or 127.0.0.1, a test site on your own computer is sending data. Those rows are not real visits, and the app does not filter them out.
3. If traffic has dropped, open the **Traffic acquisition** tab with **Channel group**. If only search dropped, the cause is in search. If every channel dropped, look for a problem with the measurement or the site.
4. The **High traffic, low conversion** button lists pages where Google sends visitors but the page does not keep them. The to-do list for these pages is on the **Opportunities** screen.

## How the numbers are calculated

The range ends yesterday in the account's time zone. Analytics data arrives one day late. If "Organik arama" is chosen, only visits from Google or another search engine are counted.

Each report requests at most 200 rows. Measurement status reads the Analytics settings and does not spend from the report quota. If the report quota runs out, you see the error "Google Analytics reporting quota is exhausted." (the Analytics report allowance is used up). Quotas are tracked in the limits section in **Settings**.

## Frequently asked questions

**Why is the session count different from the clicks in Search Console?** They count different things. Search Console counts clicks on Google; Analytics counts sessions that start on your site. A visitor who does not give cookie consent never reaches Analytics.

**Why does the row count stop at 200?** Each request asks for at most 200 rows. Shorten the period or change the breakdown.

**Why did the quota run out?** A standard account gets 200,000 tokens (quota units) a day and 40,000 an hour. Each report spends a few tokens. Pressing **Refresh** repeatedly uses up the quota.

## Limits

This screen cannot show what Analytics does not measure: visits without cookie consent, key events that are not defined and enhanced measurement that is turned off. It does not filter out localhost traffic. Analytics and Search Console use different time zones, so day-by-day comparisons can be off by one day.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
