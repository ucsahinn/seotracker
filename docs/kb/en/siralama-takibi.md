---
title: Ranking tracking
description: See the average Google position of your searches day by day. The data is stored on this computer, so you can look further back than Google's 16-month limit.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

On this screen you see your searches rise and fall over time. Google Search Console limits history to 16 months. It also does not show which position a search fell to on which day.

The app pulls this data day by day and stores it on this computer. The archive grows each time you open the screen. Over time, you go back further than Google shows.

## What is on the screen

**Time range.** 30 gün, 90 gün (default), 6 ay, 16 ay and Arşivin tamamı (30 days, 90 days, 6 months, 16 months and the whole archive). The range is counted from three days before today.

**Archive status line.** It says how many days and how many rows are in the archive. Each time you open it, the screen fills the missing days from Google. If it says "Bu açılışta N gün eklendi." (N days were added this time.), new days have arrived. If it says "Kalan günler sonraki açılışta tamamlanacak." (The remaining days will be completed the next time you open it.), it continues the next time you open it.

The **Sorgu içinde ara** (Search within queries) box narrows the list.

**Change filters.** **Yükselenler** (Risers) and **Düşenler** (Fallers) show those that moved at least half a position. There are also **Şu an ilk 10'da** (In the top 10 now) and **İlk 10'dan çıkanlar** (Dropped out of the top 10). Quick buttons: **Gösterimi yüksek** (High impressions) (at least 100 impressions) and **Hiç tıklanmayan** (Never clicked).

**Position distribution.** Bars that show how many of your searches fall in the 1-3, 4-10, 11-20 and 21+ bands.

**Risers and fallers.** Two short lists: "En çok yükselenler" (Biggest risers) and "En çok düşenler" (Biggest fallers).

**Table.** Columns: **Sorgu** (Query), **Ort. sıra** (Avg. position), **Değişim** (Change), **Gösterim** (Impressions), **Tıklama** (Clicks), **Gün** (Days). The **Gün** column says on how many days the search appeared in the selected range. A search that appears on only 3 days in 90 is rarely searched. The change cell says "Yükseldi 2.4" (Rose 2.4) or "Düştü 1.1" (Fell 1.1). Row menu: **Kelimeyi kopyala** (Copy word), **Kayıtlı kelimelere ekle** (Add to saved words), **Arama performansında ara** (Search in Search performance).

**Query history.** When you click a row, the day-by-day position line of that search opens. The **Arama performansında aç** (Open in Search performance) link shows the same search on the other screen.

**Empty states.** If the archive is empty, it says "Henüz hangi kelimeyle arandığınız bilinmiyor" (It is not yet known which words you are searched with) and the **Arama performansını aç** (Open Search performance) button appears. The list is limited to the 100 most shown searches. If there are more, you see a note under it that says so.

## How to use it

1. When you open the screen for the first time, wait for "eklendi" (added) to appear in the archive line.
2. The first fill goes back up to 480 days. It can take a few openings.
3. If you are looking for a drop, press the **Düşenler** button. Then remove the unimportant ones with **Gösterimi yüksek**.
4. Click the search at the top. In the history chart, read the day the drop started.
5. Mark the searches you want to follow with **Kayıtlı kelimelere ekle**.
6. Once a month, look at the "En çok yükselenler" and "En çok düşenler" lists. This is enough for the general picture.

## How the numbers are calculated

The archive fills only with data that Google has finalized. Each time you open it, the last three days are pulled again, because Google can correct those days afterwards. This way, the days Google corrected later are written again.

Clicks and impressions are totals. **Ort. sıra** counts the days with many impressions more heavily. **Gün** is the number of days that have data.

The change is found like this: this period's position is subtracted from the previous period's average position. A positive number means a rise. The previous period has the same length and ends right before this one.

The list brings the 100 most shown searches. In the browser it is split into pages of 25, 50 or 100.

## Frequently asked questions

**Why is it different from the figure in Search Console?** The archive keeps only finalized days and goes back up to three days. If you chose a range that includes today in Search Console, the numbers do not match.

**The search is in the list, but its position history is empty.** That search may have appeared on few days. Look at the **Gün** column.

**Why is the archive stuck on the same day?** The app does not pull data in the background. Open the screen and wait for the "eklendi" note.

**Can I see my competitor's position?** No. Search Console gives only your own site.

**What does position 1.0 mean?** You appeared first in every impression during the period. If you had dropped to position 3 for one day, the average would have gone above 1.

## Limits

The archive contains only the days this installation has seen. If you have just installed it, on the first opening it can go back at most 480 days. Rare searches that Google hides do not enter the archive either. If the archive is deleted (if the Docker volume or the data folder is removed), the history is gone. Backing it up is up to you.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
