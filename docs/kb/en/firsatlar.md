---
title: Opportunities
description: Tells you which of your pages to touch this week. It splits pages into four groups, scores them and writes the job to do for each.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-22
---

This screen shows which of your pages to work on this week.

The app takes every page of yours from Search Console, matches each with its counterpart in Google Analytics and gives it a score from 0 to 100. The score is not a Google measure; it is the app's estimate of how worthwhile it is to work on the page. The screen needs both Search Console and Analytics. If one is not connected, a warning and a **Open connections** button appear.

## What is on the screen

**Top bar.** **Period** (Last 7 days, Last 28 days, Last 90 days), **Rows** (25, 50, 100) and **Refresh**.

**Summary cards.** **Listed**, **Found in Analytics**, **Not found in Analytics** and **Top score**.

**Four groups.** Every page falls into one of four groups, and the group name appears as a label on its row.

| Group                 | What it means                                                                             | What to do                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Low clicks**        | In the top 20, with a click rate below half that of your other pages at the same position | Rewrite the title and description; the text shown in search does not attract clicks    |
| **Close to climbing** | Position 4 to 20                                                                          | Expand the content and add internal links; it can rise a position or two               |
| **At the top**        | In the top 3                                                                              | Leave it as it is, keep the page up to date and make sure it does not break            |
| **Buried deep**       | After position 20                                                                         | Ask whether the page really answers that search; a different page may be the right one |

An internal link is a link from one page of your site to another.

**Quick filters.** **Found in Analytics**, **Not found in Analytics**, **Top 10 by impressions**.

**The "Where are the opportunities concentrated?" card.** It shows how impressions or clicks are distributed across the groups.

**Table.** Columns: **Score**, **Page**, **Position**, **Impressions**, **Clicks**, **CTR**, **Sessions**. A session is one visit to the site, and the figure comes from Analytics.

**Detail panel.** It opens when you click a row and contains the "What to do" list and the three parts of the score: **Demand**, **Business value**, **Ease of climbing**. Each is rated high, medium or low. Buttons: **Open in Search performance**, **Copy URL**, **Open page**.

## How to use it

1. Start with **Last 28 days**. The top row is the page to look at first.
2. Take the first two pages from the **Low clicks** group. They rank well on Google but are rarely clicked. Fix the title and description; it is about half an hour of work.
3. In the **Close to climbing** group, look at pages with a high score. Add a section and link to the page from two or three other pages of the site.
4. The **Not found in Analytics** button isolates pages that Google shows but for which Analytics records no visits. Most often the cause is an address difference (a trailing slash, www); sometimes the page really is not clicked.
5. Work on at most three or four pages a week.

## How the numbers are calculated

The range ends three days before today because of Search Console's delay. Up to 1,000 rows are taken from Search Console and up to 1,000 rows from Analytics. The two lists are matched by domain name and path. A trailing slash is ignored. If the 1,000-row limit is reached, a note appears under the table.

Every page with more than zero impressions is a candidate. The group depends on position and expected click rate. The expected rate is the typical click rate of your own pages in the same position band. The bands are 1-3, 3-5, 5-10, 10-20 and 20-50, and a band needs at least three pages with 10 impressions each. A page in the top 20 whose rate is under half the expected one becomes "Low clicks".

The score is 50% demand, 30% business value and 20% ease of rising. Demand is based on impressions. The better the position, the easier the page is assumed to rise. Business value is the key event rate in Analytics; a key event is an action you count as important. If no page has one, the engagement rate is used instead. A page with no match in Analytics gets a middle score for business value. The score compares only your own pages with each other.

## Frequently asked questions

**Is a page with a score of 80 twice as important as one with 60?** No. 80 means "look first" and 60 means "look later".

**What does "not found in Analytics" mean?** The address format may differ, or the page may never have been clicked.

**Why did the list become empty with 7 days?** In seven days most pages stay under 10 impressions, so the expected rate cannot be calculated. For most sites 28 days is right.

## Limits

The screen uses no search volume or competitor positions; demand is only your own impressions. Search Console and Analytics may use different time zones, so day-by-day comparisons can be off by one day. The score cannot judge the quality of the content. The final decision is yours.

<!-- Kaynaklar: src/routes/_project/p/$projectId/opportunities.tsx; src/client/features/opportunities/OpportunitiesPage.tsx; OpportunityStates.tsx; opportunityLogic.ts; OpportunitySummary.tsx; OpportunityColumns.tsx; OpportunitiesTable.tsx; OpportunityDetail.tsx; src/server/features/ga4/services/SearchOpportunityService.ts; src/server/features/ga4/services/opportunityKind.ts -->
