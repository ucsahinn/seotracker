---
title: Ranking tracking
description: See the average Google position of your searches, which ones are rising or falling and how the position groups change. The data is stored on this computer, so you can look further back than Google's 16-month limit.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

This screen shows how your searches rise and fall over time, and which moves matter most. Google Search Console keeps only 16 months of history and does not show a search's position day by day.

The app pulls this data day by day and stores it on this computer. The archive grows each time you open the screen. Over time, you can look back further than Google allows.

## What is on the screen

**Time range.** The options are 30 days, 90 days (default), 6 months, 16 months and Entire archive. The range you pick is kept in the address bar. The range ends three days before today. A line at the top says which dates are shown.

**Archive status line.** It says which dates the archive covers. Each time you open the screen, it fills in missing days from Google. If it says "1 day added on this visit", new days have gone into the archive. If it says "The remaining days will be filled in the next time you open this page", the work continues on the next visit.

**Risers and fallers.** Two short lists: **Biggest risers** and **Biggest fallers**. Each row shows the search, the old and new position like "6.2 → 4.1", the impressions and how many places it moved. The lists are not ordered by movement alone. The movement is multiplied by impressions. A heavily searched query that rose two places comes before a rarely searched one that rose four. Click a row and that search's history opens below the table. Searches with no data in the previous period do not enter these lists. If no comparison is possible at all, a note in place of the section says why.

**Position distribution.** Four bars show how many of your searches sit in the 1-3, 4-10, 11-20 and 21+ groups, by average position. Beside each bar are the number of searches and their share. The number at the far right is how many searches entered or left that group since the previous period, shown with an arrow and a sign. In the first three groups an increase is good news. In the 21+ group an increase is bad news. Press a bar and the table narrows to that group. Press again to remove the filter.

**Search box and filters.** The **Search queries** box narrows the list. Below it are two groups of filters.

- **Change filters**: **Risers** and **Fallers** show searches that moved at least half a position against the previous period. **Now in the top 10** and **Dropped out of the top 10** are here too.
- **Quick filters**: **High impressions** and **No clicks**. High impressions is the most-shown quarter of the list. There is no fixed number, because a fixed number would select every row on a short range.

A filter that does not really narrow the list is not shown. A button that would select no row, or every row, says nothing.

**Table.** The columns are **Query**, **Average position**, **Change**, **Impressions**, **Clicks** and sometimes **Day**. Click a heading to sort. It starts sorted by impressions. The **Average position** cell has a small line on its left. The line shows the position week by week across the range. If the line goes up, the position is getting better. On a small screen the line is hidden. A position on the first page is written in green, on the second page in yellow. Colour never carries the information alone, because the number is always written. The **Change** cell says "up 2.4 places", "down 1.1 places" or "No change". For a search with no data in the previous period, it says "No data in the previous period". The **Day** column appears only when some searches were missing on some days. A search that shows up on just 3 of 90 days is a rarely searched one. The row menu has three options: **Copy keyword**, **Add to saved keywords**, **Search in Search performance**. The table is split into pages of 25, 50 or 100.

**Query history.** Click a row and that search's day-by-day position line opens. On the line, up is a better position. Hover over it to read that day's position, clicks and impressions. The **Open in Search performance** link shows the same search on the other screen.

**Empty states.** If Search Console is not connected, a **Connect Search Console** button appears. If the archive is empty, it says "Which keywords people search for you with isn't visible yet" and an **Open Search performance** button appears. The list is limited to the 100 most-shown searches. If there are more, a note below says so.

## How to use it

1. When you open the screen for the first time, wait for the archive line to say "added".
2. The first fill goes back up to 480 days. It can take a few visits.
3. Look at **Risers and fallers**. The top faller is the move that hurts your traffic most.
4. Look at the **Position distribution** bars. If the 21+ group has a red increase beside it, searches are sliding past page two.
5. If you are looking for a drop, press the **Fallers** filter. Then use **High impressions** to drop the unimportant ones.
6. Click the top search. On the history chart, read the day the drop started.
7. Mark the searches you want to follow with **Add to saved keywords**.

## How the numbers are calculated

The archive is filled only with data that Google has finalised. On every visit, the last three days are fetched again, because Google may correct those days later. That way corrected days are written into the archive again. Opening the screen spends Search Console quota. So if the screen is opened again within 15 minutes of the last fill, it reuses the same result.

Clicks and impressions are totals. In **Average position**, days with more impressions weigh more. **Day** is the number of days that have data.

We find the change like this: we subtract this period's position from the previous period's average position. If the result is positive, you rose. The previous period has the same length and ends right before this one. The comparison is made only for searches that have data in both periods. A search that moves less than half a position is not counted as "rising" or "falling".

The list of risers and fallers is ordered by the position difference multiplied by impressions. Each list has at most five rows.

Position groups are cut on the rounded position. 3.4 counts as "around third" and 3.5 as "around fourth". That is why a search at 3.4 sits in the 1-3 group and one at 3.5 sits in the 4-10 group.

The list fetches the 100 most-shown searches.

## Frequently asked

**Why is it different from the number in Search Console?** The archive keeps only finalised days and goes back to three days ago. If you picked a range in Search Console that includes today, the numbers will not match.

**The search is in the list but its position history is empty.** The search may have appeared on few days. You can tell from the **Day** column.

**Why does it say "Change can't be shown"?** The archive has no records for these searches in the previous period. Pick a shorter range or wait for the archive to fill.

**Why is the archive stuck on the same day?** The app does not pull data in the background. Open the screen and wait for the "added" note.

**Can I see my competitor's position?** No. Search Console only gives data about your own site.

**What does position 1.0 mean?** It means you came first in every impression during the period. If you had dropped to 3rd one day, the average would be above 1.

## Limits

The archive holds only the days this installation has seen. If you just installed, the first visit can go back at most 480 days. Rare searches that Google hides do not enter the archive either. If the archive is deleted, the history goes. Deleting the Docker data store or the data folder is an example. Making backups is up to you.

<!-- Sources: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; PositionSparkline.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; positionBands.ts; rankingMoves.ts; src/shared/positionBands.ts; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
