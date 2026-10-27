---
title: Search performance
description: See how often you show up on Google, how many clicks you get and what to fix first. The numbers come from Search Console. Gain figures are an upper bound.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-27
---

Here you see how often you show up on Google, how many clicks you get and what to fix first.

Clicks, impressions, CTR and position come straight from Search Console. The app does not estimate any of them. Estimates appear only in the "possible gain" figures, and those are always marked as an "upper bound".

The filters you choose are written into the address bar. If you like, share that view as a link or bookmark it.

## Three terms

**Final day.** Search Console keeps counting a day for several days. Totals and comparisons use only days whose count has finished. Days follow the Pacific time Google uses. Days that are still being counted show hatched on the chart and are left out of the totals.

**Hidden query.** Google does not list very rarely searched queries, for privacy. But it adds their clicks to the site total. That is why the query table adds up to less than the site total. The difference is the hidden queries.

**Upper bound.** A gain figure means "at most this much". It is the extra clicks a search would get if it rose one step, at your own site's click-through rates. The real result depends on competitors and on Google, and is usually smaller.

## What is on the screen

**Top bar.** Four things sit at the top right.

- **Refresh**: asks Search Console for fresh data. The app normally reuses an answer from a few minutes ago.
- **Download report**: turns the view on screen into a printable one-file report, saves it and downloads it. The report also sits in the **Reports** screen.
- The export menu: **Queries (CSV)**, **Pages (CSV)**, **Queries close to the top three (CSV)**, **Export queries to Sheets**, **Export pages to Sheets**. Exports follow the filters on screen. If you have a search or a quick filter on the Queries or Pages tab, it carries into the file too.

**Filters.** A one-line bar summarises the chosen filters: "(Web, All devices, All countries, Last 28 days, Against previous period)". Open it to see: **Search type** (Web, Image, Video, News), **Device filter** (All devices, Mobile, Desktop, Tablet), **Country filter** (the countries Google reports for that period), **Date range** (Last 7 days, Last 28 days, Last 3 months) and **Comparison** (Against previous period, Against last year, No comparison).

**Data status.** A strip that says what the numbers rest on. For example "Data is final up to 24 Oct; the last 3 days are still being counted (hatched on the chart)." The same strip shows which days the comparison uses and the name of your Search Console property. Press the property name to go to the project's connection settings. If last year's comparison is chosen and Google no longer gives those days, the strip says so (Google goes back 16 months at most). Open **About the data** to see: the date of the final days, how many days are still being counted and the last data date, the share of clicks from hidden queries, whether the tables were read in full (Google returns a limited number of rows at a time) and whether this view sent new requests to Google or used an answer taken a few minutes ago.

**Summary sentence.** A sentence or two above the tiles says what happened. For example "Clicks rose 6.1% in the last 28 days against the previous period. CTR fell 0.3 points." Then it says how many extra clicks the first three jobs could bring together, marked "(upper bound)". The **To do** link takes you to that tab.

**Four tiles.** **Clicks**, **Impressions**, **CTR** (what percentage of impressions were clicked) and **Average position**. All are totals of the final days. Each tile shows the change against the comparison you chose, and a small line. The change in clicks and impressions is written as a percentage, in CTR as points and in position as places. For average position, a small number is good, and 1 is the top spot. The direction of a change is shown with an arrow as well as colour.

**Over time chart.** It draws the daily values.

- The picker at the top right switches between four measures: clicks, impressions, CTR and average position. On the position chart, up is a better position.
- The **Day**, **Week** and **Month** buttons change the time unit. The comparison line (a dashed line) appears only in the day view.
- The hatched area is days Google is still counting. A hollow dot means an incomplete or not yet final period.
- Numbered markers above the line show three things: ranking updates Google announced ("Google update"), the days site audits finished ("Site audit completed") and your own notes. Under the chart, each number is explained.
- **Add a note** leaves your own note on a date, for example "New page titles went live". A note is at most 280 characters. It helps you remember later why something dropped or rose. Notes outside the chosen period are collected under "Notes outside this period (N)".

**Start with these strip.** Between the chart and the tabs, the first three to-dos sit side by side. Each has its title, its possible gain and a button. **All to-dos (N)** takes you to the To do tab.

**Tabs.** There are seven: **To do (N)**, **Queries (N)**, **Pages (N)**, **Ranking opportunities (N)**, **Changes**, **Overlaps** and **Distribution**. The number in brackets is the count of rows or findings inside the tab. If queries or pages are falling, the Changes tab reads "Changes (N falling)". When you switch tabs, the search box and the quick filter reset.

### To do

The app ranks the jobs it finds in Search Console data by estimated gain. Jobs are grouped by kind, and each group's heading says how many jobs it holds:

- "N queries close to the top three": searches with an average position between 4 and 20 and enough impressions. Brand searches are left out of this list. Strengthen the page for that search.
- "N results get few clicks for their position": searches clicked less than your site's other searches at the same position. Rewrite the title and description.
- "Clicks fell for N queries" and "Clicks fell for N pages": a clear drop against the previous period. If the position fell too, update the content. If the position held, review the title and description.
- "N pages are losing their old strength": pages that fell far below the best of the previous four quarters in the last quarter. Refresh the page.
- "N pages are seen but never clicked". The gain estimate here is cautious: it uses the click-through rate of the position band below the page's own, not its own band. Pages on page two or further back get no estimate.
- "You no longer appear for N queries": searches that got clicks in the previous period and no impressions now.
- "You trail on N device types" and "You trail in N countries".
- "Unusual drops on N days": that day's clicks or impressions were unusually low against the same weekday in earlier weeks.
- "Set your brand name": appears when no brand name is set, so brand searches can be separated. When the app is splitting them with names it suggested from your domain, the job reads "Confirm your brand name" instead. Confirm the suggestions if they are right, or enter your brand's name.

In each group's heading, **Why, and what to do** gives the reason and what to do. A row shows its rank number, the finding, the evidence (for example "Position 8.2 · 640 impressions · 12 clicks"), the possible gain written as "≈ +N clicks" and a confidence label (**Confidence: high**, medium or low). The first four jobs of a group are shown, and **Show all (N)** opens the rest.

You mark a job with **Done**. Marked jobs go under "Marked as done (N)" and come back with **Restore**. The done marks are kept only in this browser. **Details** (or **Open this breakdown**) on a row opens the detail of that search, page, device or country. If there are several jobs for one search or page, the total at the top counts it once.

### Queries and Pages

A table by searches or by pages. The columns are **Query** (or **Page**), **Clicks**, **Click change** (against the comparison), **Impressions**, **CTR** and **Position**. Click a heading to sort. The bar behind a row is its share of the clicks in this table. The box at the top searches among the rows. Beside it, "{shown} / {total} rows" is written.

**Quick filters.** For queries: **In the top 10**, **Position 4-10**, **Position 11-20**, **Low CTR**, **No clicks**. For pages: **In the top 10**, **Clicked**, **Low CTR**, **No clicks**. Low CTR means a row on page one with at least 100 impressions and a click-through below 2 percent.

**Row menu.** In the three dots: **Open page in a new tab**, **Copy URL**, **Copy keyword**, **Save as keyword**. What you save goes to the **Saved keywords** screen. Clicking a row opens the detail panel.

The note under the table gives the base: "read N queries, N clicks. The site total is N clicks; the difference comes from the queries Google hides." If Google's row limit was reached, the least-clicked end is missing from the list and the note says so.

### Ranking opportunities

There are four sections.

- **Queries close to the top three.** Searches with an average position between 4 and 20. Brand searches are not included. It says how many extra clicks they could bring together if each rose one step (from 6-10 to 4-5, from 4-5 to 2-3, from 11-20 to page one). That is an upper bound. The total covers every query in this range, not only the rows listed, and is followed by the dates it covers, for example "Period: Sep 27, 2026 – Oct 24, 2026." When only the largest gains are listed, a note below says "The N with the largest gain are listed." The table shows **Query**, **Target page**, **Position**, **Impressions**, **Clicks** and **Possible gain**. The target page is the page Google shows most for that search. You take the searches you select with **Copy keywords** or **Save as keyword**.
- **Results clicked less than their position suggests.** Searches whose click-through falls below 70 percent of your site's rate for results at the same position. The gain comes without any change in position, only by rewriting the title and description. The table shows the search's rate, the rate **Expected at this position** and the possible gain.
- **Pages that show up but never get clicked.** Pages that got at least 100 impressions (for 28 days) in the period and not one click.
- **Your site's CTR by position.** The yardstick for the gains above. It is the click-through rate of your own results at each position, not other sites'. If a position has too few searches or impressions, it says "Not enough data" and no estimate is made for it. If you defined brand names, these rates are calculated from non-brand searches.

### Changes

It compares the chosen period with the previous one.

- **Biggest changes since the previous period.** Two lists: **Falling (N)** and **Rising (N)**. For a search or page to enter a list, its clicks must move by at least 3 clicks and 20 percent of its previous value. Small moves do not enter. A row shows the previous and new clicks, impressions and position.
- **Newly showing** and **Lost (with their previous-period numbers).** Only searches that got at least 50 impressions (for 28 days) in just one period. If one period's table is incomplete because of the row limit, it cannot be known which search is new or lost, and the screen says so.
- **Pages losing ground.** Pages whose clicks in the last quarter (91 days) fell below 70 percent of the best of the previous four quarters, and are also behind the same quarter last year. This comparison needs more than a year of data. If Search Console did not give data that old, or a filter is on, the screen says so.
- **Long term: monthly clicks.** Search Console goes back 16 months. The app keeps the daily totals longer on this computer. The bars show monthly clicks. A bar with a dashed outline is a month the archive does not hold in full. If the archive is still filling, the screen says "No days in the archive yet" or gives the start date. This section follows the device filter, not the country filter.

### Overlaps

It shows cases where several of your pages appear for the same search. Pages can split each other's clicks. Most of the time it is enough to make one the main page and link to it from the others. The card's heading reads "Pages competing for one query".

- Three tiles: **Queries with competing pages**, **Impressions going to the other pages** and **Query losing the most**. Press the last tile and the list narrows to that query.
- The **Pages competing for the same query** table shows, for each query, its pages, their clicks, impressions and positions. The page Google shows most for that query counts as the "preferred" one. The share of impressions going to the others is written as "outside the share".
- This analysis looks at 28 days. If 7 days is chosen, it is raised to 28 for the analysis and the real date range is written. Only searches with at least 100 impressions are examined. For a page to join the contest, it needs at least 10 impressions and a 20 percent share on that search.
- If the search hits Search Console's row limit, the screen warns that some queries could not be examined.

### Distribution

- **Position distribution.** Shows in groups which positions your searches appear at. If the archive holds at least two weeks, **Queries by week** appears below it. This chart covers Web searches only. With Image, Video or News selected as the search type, it says "The weekly distribution is for Web searches only." in its place. That chart shows the share of the position groups week by week. It comes from the query archive on your computer. It is not shown with a device or country filter, because the archive does not keep those breakdowns.
- **Brand and non-brand searches.** Searches that arrive with your name and searches by people who did not know you are measured separately: **Brand searches** and **Non-brand searches**. For each, the number of queries, clicks, CTR and average position are written. If no brand name is defined, it says "Brand searches are not separated" and an **Add brand name** button appears. If the app suggested brand names from your domain, it says "Not confirmed." The measurement was then made with the suggested names. Press **Confirm suggestions** or use **Edit brand names**. Shares are of the queries read; hidden queries are not included.
- **Devices** and **Countries.** Click a device or country and the whole screen narrows to it.
- **Search appearance.** Which special formats your results show in on Google (rich results, video and so on). A rich result is a result that shows extra information such as a product or video. Google adds up this breakdown by page. If Google reported no special format, the screen says so.
- **Question searches.** Searches shaped as questions and searches of four or more words. They are the clearest source of content ideas.

**Brand names.** You enter brand names with **Edit brand names**. Enter your site's name and the ways people spell it, for example the name and its short form. Searches containing these words count as brand searches. There are **Save** and **Cancel** buttons, and the **Suggestions:** line adds a name in one click. Defining brand names changes not only this screen but also the gain estimate on the **Opportunities** screen, because that estimate leaves brand searches out.

**Detail panel.** Click a search or a page (in a table, in To do, in Ranking opportunities or in Changes) and it opens from the right. At the top it says the date range and "final days". Then come four numbers (Clicks, Impressions, CTR, Average position) and their change against the chosen comparison. Below is the **Daily clicks** line. For a page, a list "This page's queries (N)" appears; for a search, "Pages showing for this query (N)". Each row gives clicks and position. If no search is listed for a page, its clicks may come from queries Google hides. The queries may add up to less than the page's total, because hidden queries are not listed. **Open page** opens the page in a new tab. **Save as keyword** adds the search to **Saved keywords**.

## How to use it

1. First read the summary sentence at the top. It says whether clicks are rising or falling.
2. Look at the **Start with these** strip or the **To do** tab. The first three jobs are the ones that gain the most.
3. If there is a big drop, set the **Date range** to **Last 3 months**. Find the day the drop began on the chart. If a Google update or a change you made falls on that day, it shows in the markers.
4. On the **Ranking opportunities** tab, look at **Queries close to the top three**. Open the page of the three most-shown searches. Adjust the title and first paragraph to that search.
5. On the **Queries** tab, press the **Low CTR** button. Your position is good but nobody clicks. The problem is most likely the title and description.
6. On the **Changes** tab, look at **Falling**. Click the top search and read the day the drop began in the detail panel.
7. If you see pages competing for the same search on the **Overlaps** tab, first decide which page you want to answer. Then point the internal links at that page.
8. After a fix, write its date on the chart with **Add a note**. Two weeks later you see its effect on the chart.
9. When a job is finished, say **Done**. The list gets shorter.
10. At the end of the month, save the view with **Download report**.

## How the numbers are calculated

Google delivers data three days late. The range therefore ends not today but three days before. The last days can also change for a few more days. The app leaves those days out of the totals. The previous period is the period of the same length right before this range. For the last-year comparison, the same days of last year are taken. You see the change in clicks and impressions as a percentage and the change in CTR as points.

The tiles are the real totals of the site. The tables count each page that appears for the same search separately. If you add up the page table, you get a larger number than the tile. That is not an error. If you add up the query table, you get a smaller number than the tile, because hidden queries are not listed.

Google gives at most 1,000 rows at a time. If the row limit was reached, the least-clicked end is missing from the list and the screen says so.

**Possible gain.** The app applies your site's own click-through rate to each search. It takes the rate one step up from the position the search is at, multiplies it by the search's impressions and subtracts the current clicks. Searches with very few impressions do not count (at least 50 impressions for 28 days). For title problems, the yardstick is the search reaching your site's rate at the same position. Brand searches are left out. That is why every gain is an upper bound. The same calculation is used on the **Opportunities** screen.

**Confidence label.** The label beside each job shows how solid the data behind the finding is: high, medium or low.

## Frequently asked

**Why are the last three days hatched on the chart?** Google is still counting those days. They are left out of the totals. They become final in a few days.

**The table total does not match the tile.** That is normal. The tile is the site total. The query table and the page table differ because of hidden queries and because they count several pages separately.

**My position is different when I search on Google.** The position here is the average over the period. It does not reflect a single search.

**The search I look for is not in the list.** Google hides very rarely searched queries. On small sites there may be no query rows at all.

**Why did a job vanish from the To do list?** If you marked it done, it is under "Marked as done". The marks are kept only in this browser. In another browser or on another computer you see it again.

**If pages overlap, should I merge them?** Most of the time, no. First decide which page you want to answer. Then point the internal links at that page. If the pages really answer the same question, merge them.

**Do I have to enter a brand name?** No, but if you do not, people searching for your own name distort the CTR calculation and the opportunities come out incomplete. The screen reminds you with the "Set your brand name" job. When the app is using names it suggested from your domain, the job reads "Confirm your brand name".

## Limits

The Discover and Google News search types are not included. There is no search volume and no competitor position. Data does not go back further than 16 months from Google. For older data, look at the archive on this computer: the long-term chart on the **Changes** tab and the **Rank tracking** screen read from it. The done marks and notes are kept only on this installation.

<!-- Sources: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchPageParts.tsx; SearchFilters.tsx; DataTrustStrip.tsx; SearchVerdict.tsx; KpiTiles.tsx; SearchTrendChart.tsx; TrendParts.tsx; SearchNotes.tsx; LongTermTrend.tsx; TodoTab.tsx; DimensionTab.tsx; DimensionTableParts.tsx; OpportunitiesTab.tsx; StrikingTable.tsx; ChangesTab.tsx; CannibalizationSummary.tsx; CannibalizationTable.tsx; DistributionTab.tsx; PositionDistribution.tsx; DrilldownPanel.tsx; BrandTerms.tsx; SearchReportButton.tsx; src/shared/searchInsights.ts; src/shared/searchTodoCopy.ts; src/shared/searchQuickFilters.ts; src/shared/dataFreshness.ts; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/cannibalization.ts -->
