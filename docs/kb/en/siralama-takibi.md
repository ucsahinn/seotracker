---
title: Ranking tracking
description: See the average Google position of your searches day by day. The data is stored on this computer, so you can look further back than Google's 16-month limit.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

This screen shows how your searches rise and fall over time. Google Search Console keeps only 16 months of history and does not show a search's position day by day.

The app pulls this data day by day and stores it on this computer. The archive grows each time you open the screen. Over time, you can look back further than Google allows.

## What is on the screen

**Time range.** 30 days, 90 days (default), 6 months, 16 months and Entire archive. The range ends three days before today.

**Archive status line.** It shows how many days and rows the archive holds. Each time you open the screen, it fills the missing days from Google. "N days added on this visit." means new days have arrived. "The remaining days will be filled in the next time you open this page." means the fill continues on your next visit.

The **Search queries** box narrows the list.

**Change filters.** **Risers** and **Fallers** show queries that moved at least half a position. There are also **Now in the top 10** and **Dropped out of the top 10**. Quick filters: **High impressions** (at least 100 impressions) and **No clicks**.

**Position distribution.** Bars show how many of your searches fall in the 1-3, 4-10, 11-20 and 21+ bands.

**Risers and fallers.** Two short lists: "Biggest risers" and "Biggest fallers".

**Table.** Columns: **Query**, **Avg. position**, **Change**, **Impressions**, **Clicks**, **Day**. The **Day** column shows on how many days the search appeared in the selected range. A search that appears on only 3 of 90 days is rarely searched. The change cell says "Up 2.4" or "Down 1.1". Row menu: **Copy keyword**, **Add to saved keywords**, **Search in Search performance**.

**Query history.** When you click a row, the day-by-day position line of that search opens. The **Open in Search performance** link opens the same search on the other screen.

**Empty states.** If the archive is empty, it says "Which keywords people search for you with isn't visible yet" and the **Open Search performance** button appears. The list is limited to the 100 most shown searches. If there are more, a note under the list says so.

## How to use it

1. When you open the screen for the first time, wait for "eklendi" (added) to appear in the archive line.
2. The first fill goes back up to 480 days and can take a few visits.
3. If you are looking for a drop, press the **Fallers** button. Then narrow the list to the important ones with **High impressions**.
4. Click the search at the top. In the history chart, find the day the drop started.
5. Save the searches you want to follow with **Add to saved keywords**.
6. Once a month, read the "Biggest risers" and "Biggest fallers" lists. That is enough for the general picture.

## How the numbers are calculated

The archive stores only data that Google has finalized. Each time you open the screen, the last three days are pulled again, because Google can still correct them; the corrected figures replace the old ones.

Clicks and impressions are totals. **Avg. position** gives more weight to days with many impressions. **Day** is the number of days that have data.

The change is the previous period's average position minus this period's, so a positive number means a rise. The previous period has the same length and ends right before this one.

The list loads the 100 most shown searches and splits them into pages of 25, 50 or 100.

## Frequently asked questions

**Why is it different from the figure in Search Console?** The archive keeps only finalized days, so it ends three days before today. If you chose a range that includes today in Search Console, the numbers do not match.

**The search is in the list, but its position history is empty.** That search may have appeared on few days. Check the **Day** column.

**Why is the archive stuck on the same day?** The app does not pull data in the background. Open the screen and wait for the "eklendi" note.

**Can I see my competitor's position?** No. Search Console gives only your own site.

**What does position 1.0 mean?** You appeared first in every impression during the period. If you had dropped to position 3 for one day, the average would have gone above 1.

## Limits

The archive contains only the days this installation has seen. If you have just installed the app, the first opening goes back at most 480 days. Rare searches that Google hides do not enter the archive either. If the archive is deleted (for example, by removing the Docker volume or the data folder), the history is gone. Backing it up is up to you.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
