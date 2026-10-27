---
title: Opportunities
description: Shows how many more clicks a month each of your pages could bring and what work gets them. The number is an upper bound, not a promise.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

This screen shows how many more clicks a month each of your pages could bring, and what to do to get them.

The estimate comes only from your searches in Search Console. If Analytics is connected, each page also gets a label saying whether it brings conversions. The label does not change the estimate. If Search Console is not connected, the screen shows a warning and a **Set up connections** button.

## What is on the screen

**Top bar.** **Period** (Last 7 days, Last 28 days, Last 90 days), **Rows** (25, 50, 100) and **Refresh**. The period and row count you pick are kept in the address bar. If you reload the page or share the link, the same view opens.

**What is this page for?** A short box that explains the screen. It is open the first time. If you close it, your browser remembers.

**Period line.** It says which days the list covers. Search Console data arrives three days late, so the latest days are missing. Estimates are scaled to 30 days. Whether you pick 7 days or 90, read the numbers as "per month".

**Four tiles.**

- **At most this many extra clicks / month (upper bound).** The total gain of the listed pages. Below it you see how many clicks these pages get a month today and what share of that the gain is.
- **Start here.** The page that could gain the most. Press the tile to open that page's detail panel.
- **Pages that convert.** The number of pages that bring key events according to Analytics. A key event is an action you count as important, such as a form submission. Press the tile and the table narrows to these pages. If Analytics is not connected, it says "Shows once Analytics is connected".
- **Pages with nothing to gain.** The number of pages that already rank well and get a normal share of clicks, or that got very few impressions. These pages are not in the list.

**Where is the gain?** Shows the four kinds of work next to the extra clicks a month each could bring. The cheapest work is at the top. Press a row and the table narrows to pages that gain from that work. Press it again to remove the filter.

| Kind of work                     | What it means                                                                                                                  | What to do                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| **Title and description work**   | On page one, but clicked less than your site's other searches at the same position. Clicks rise without any change in position | Rewrite the title and description      |
| **On page one, positions 4-10**  | Below the top three. One step up raises clicks noticeably                                                                      | Strengthen the content                 |
| **On page two, positions 11-20** | Right behind page one. Almost nobody clicks until you reach page one                                                           | Add internal links, expand the content |
| **Deep, beyond position 20**     | There is demand but the page is far behind                                                                                     | Merge or let go                        |

An internal link is a link you place on one page of your site that points to another.

**Quick filters.** **Converting** and **Traffic, no conversions**. They appear only when they really narrow the list. They do not appear if Analytics is not connected. You can combine them with a kind-of-work row. The two work together as "and".

**Table.** The columns are these.

- **Estimated extra clicks.** Extra clicks that could arrive per month. The bar below is scaled to the largest gain in the list.
- **Page.** The address and, below it, the main kind of work.
- **Position, Impressions, Clicks.** The page's values in the period you picked.
- **CTR.** Below it, the difference between the page's non-brand click-through and your site's rate at the same position, in percentage points. A down arrow means it is below your site, an up arrow means above.
- **Sessions.** Organic visits in Analytics. Below it you see "converts", "no conversions" or "little traffic". If a page has fewer than 30 sessions, its conversion rate is not trusted, so it says "little traffic". If no match is found you see a dash.

From the menu above the table you take the list as **Export to Sheets** or **CSV**. If a filter is on, only the visible rows go. The table sorts by any column. It starts sorted by gain.

**Detail panel.** It opens when you click a row. At the top it states the gain and the reason: average position, impressions, clicks. If the gain would be more than the whole page could reach, the panel says so and pulls the number down to that limit. For a page that converts in Analytics, it also says roughly how many key events a month the gain would bring at today's conversion rate. That is an estimate.

Below it are three facts: **Demand** (impressions a month), **Value (Analytics)** and **Distance** (current position and target). Then comes the **Which searches?** table. For each search it shows the position, the click-through, the target rate the estimate assumes and the monthly gain. A page's average position is the average of many searches, so "move up" is not enough. This table tells you which search to win. At the bottom is the **What to do?** heading with a list of three items.

Buttons: **Open in Search performance**, **Copy URL**, **Open page**.

## How to use it

1. Start with **Last 28 days**. The top tile and the first row of the table tell you which page to look at first.
2. Look at **Where is the gain?**. Title and description work is the cheapest, because clicks rise without any change in position. Press that row and take the first two pages in the table.
3. Open the detail panel. Put the search with the biggest gain in **Which searches?** clearly into the title and description.
4. Then move to pages in positions 4-10. Add a section and link to them from related pages.
5. For pages on the **Deep** row, decide first. If you have another page on the same topic, merge them. If the gain is small, let the page go.
6. If Analytics is connected, start with the **Converting** filter. The same increase in clicks is worth more there.
7. Come back in two weeks. If the estimated gain of a page you touched has shrunk, the work paid off.

## How the numbers are calculated

The number is an upper bound, not a promise. The app finds it like this.

Every search a page appears for is handled separately. Click-through rates are measured from your own site, not from other sites.

- **A page-one search that gets few clicks.** If the click-through of the search is below 70 percent of your site's rate for searches at the same position, the gain is reaching that rate. The position does not change. This is title and description work.
- **Every other search moves up only one step.** A search at positions 4-5 reaches the rate of 2-3, a search at 6-10 reaches the rate of 4-5, a page-two search reaches the rate of page one (positions 6-10), and a search further back reaches the rate of page two. Searches in the top three are not counted.
- **Page limit.** The page's searches are grouped by position band. For each group, the app works out the extra clicks the group would get if its searches rose one step together: the group's impressions times your click-through rate one band up, minus the clicks it already gets. A group in the top three is measured at its own band's rate. The page's total cannot be more than these group figures added up. This stops many small gains from adding up to an unrealistic figure. The page's single average position is not used: a page at #2 for its main search and #15 for the rest averages near the top, and that average would wipe out the real upside of the lower searches.

Searches with very few impressions are not counted. This limit scales with the length of the period. If there are not enough searches to measure your site's click-through by position, no estimate is possible. The screen tells you so. Moving the period to 90 days is often enough.

**Brand searches are left out.** People who search for your brand find you anyway. Their high click-through would make the other searches look unfairly low. Brand terms are in one of three states. If you confirmed them, the confirmed terms are used. If you did not, terms guessed from your domain name are used and the screen says so. If there are no terms at all, brand searches take part in the comparison. You confirm the terms on the **Search performance** screen.

**Analytics only adds a label.** It does not change the estimate. A page's conversions are looked at only if it got at least 30 organic sessions. With fewer, the rate is noise. Pages are matched by domain and path. A slash at the end of the address does not count.

If more pages have a gain than the row count you picked, the table shows those with the biggest gain and a note appears below it. The total at the top always covers all of them.

## Frequently asked

**Why did I not get "+120 clicks"?** That is an upper bound. It is the most you could get if the position rose one step. The real result depends on competitors and on Google.

**Why is the list empty or "Not enough data to estimate yet"?** There are not enough searches to measure your site's click-through by position. Choose **Last 90 days**. If you just connected Search Console, Google needs a few days to fill in the data.

**What does "No page has anything to gain in this period" mean?** Your pages either already rank well and get a normal share of clicks, or got too few impressions for an estimate.

**What if it says "Not found in Analytics"?** The address format may differ, or the page has had no visits. The estimate is not affected.

## Limits

The screen does not use search volume or competitor positions. You only have your own impressions. The estimate does not know how good the content is. Search Console and Analytics may count days in different time zones. The final decision is yours.

<!-- Sources: src/routes/_project/p/$projectId/opportunities.tsx; src/client/features/opportunities/OpportunitiesPage.tsx; OpportunityStates.tsx; OpportunityMethod.tsx; OpportunityWorkBars.tsx; OpportunityQuickFilters.tsx; OpportunityColumns.tsx; OpportunitiesTable.tsx; OpportunityDetail.tsx; opportunityLogic.ts; src/shared/pageOpportunities.ts; src/shared/searchInsights.ts; src/server/features/ga4/services/SearchOpportunityService.ts -->
