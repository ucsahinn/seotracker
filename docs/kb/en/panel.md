---
title: Dashboard
description: The first screen you see when you open a project. The search numbers for the last 28 days, the latest audit summary and your to-do items in one place.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

This is the first screen of a project. It shows the current state of your site and what to do next.

The search numbers come from Google Search Console. The visitor numbers come from Google Analytics. The audit summary comes from the app's own site crawler. The **Refresh** button at the top refreshes all of them. **Start audit** takes you to the audit screen.

## What is on the screen

**Four number cards.** **Clicks**, **Impressions**, **CTR** and **Average position**. All four cover the last 28 days, and each card has an arrow comparing it with the previous 28 days. For average position a lower number is better, and 1 is the top position, so a falling number is good news and the arrow color reflects that. If Search Console is not connected, the card says "Connect Search Console".

**Next steps**. Up to three tasks the app suggests, in this order of priority:

- Search Console is not connected: **Connect Search Console** (button **Connect**).
- There is no audit: **Run your first audit** (button **Start**). If the last audit failed, it reads **Run the audit again**; while one is running, **Audit in progress** (button **View progress**).
- There are critical issues: "N critical issues" (button **View**).
- Search Console is connected: **Review opportunities** (button **Open**).
- The latest audit is older than seven days: **Refresh the audit** (button **Start**).
- There are warnings: "N warnings" (button **View**).

When a task is done, it leaves the list.

**New in the last audit** and **Fixed**. This compares the last two audits and shows which issues appeared, on how many pages, and which were fixed. If nothing was fixed, it says "No fixed issues.".

**Click trend**. A line chart of daily clicks for the last 28 days. With fewer than four days of data, no line is drawn. The **Open queries** link opens the **Search performance** screen.

**Queries in positions 5-20**. The top four searches that appear between positions 5 and 20 on Google. With a little work, these can reach the first page or the top positions. **View all** opens the full list.

**Site audit** card. It shows how many pages were crawled, the three most common issues and the five pages with the most issues. While an audit is running, the card refreshes every five seconds. The question mark icon explains the three severity levels:

- Critical: directly harms your visibility in search.
- Warning: wears down rankings over time but is not urgent.
- Info: small opportunities to improve.

**Organic traffic** card. It appears when Google Analytics is connected. For visitors who came from search, it shows **Sessions**, **Active users**, **Engagement rate** and **Key events**. If the site measures sales, **Organic revenue** and **Transactions** are added too.

## How to use it

1. Open it once a week and check the arrows on the four cards.
2. Do the first task in the **Next steps** box. If the box is empty, nothing is urgent.
3. If the latest audit is older than seven days, click **Start audit**.
4. Review the titles and descriptions of the pages on the **Queries in positions 5-20** card; the easiest gains are usually here.

## How the numbers are calculated

The four cards come from a single Search Console report. Google delivers data three days late, so the 28-day range ends three days before today. The previous period is the 28 days right before this range. If the previous period is zero, no arrow is shown.

Average position gives more weight to searches with many impressions. These four numbers are the real site totals. Adding up the table rows on the **Search performance** screen gives a larger number, because Google counts each page that appears for the same search separately.

## Frequently asked questions

**Why is there no data for today?** Google has not delivered the last three days yet. This is not a fault.

**Average position went up. Is that good?** No. Going from 3 to 7 is a drop, which is why the arrow turns red.

**Does the audit card show what Google sees?** No. It shows what the app's own crawl found. Which pages Google has indexed is on the **Index status** tab on the audit screen.

**There is no Organik trafik card.** Google Analytics is not connected in the project settings. Connecting it is optional.

## Limits

The Dashboard does not show search volume, backlinks (links to you from other sites) or competitor positions. This data is not in the app. Search Console hides queries that are searched very rarely. For details, open the matching screen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
