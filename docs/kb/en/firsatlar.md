---
title: Opportunities
description: Tells you which of your pages to touch this week. It splits pages into four groups, scores them and writes the job to do for each.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-22
---

On this screen you see which of your pages to touch this week.

The app takes every page of yours in Search Console. It matches each one with its counterpart in Google Analytics. It gives each page a score from 0 to 100. This score is not a Google measure. It is the app's estimate of "how worthwhile it is to work on this page". The screen needs both Search Console and Analytics. If one is not connected, a warning and a **Bağlantıları aç** (Open connections) button appear.

## What is on the screen

**Top bar.** **Dönem** (Period) (Son 7 gün, Son 28 gün, Son 90 gün: last 7, 28 and 90 days), **Satır sayısı** (Number of rows) (25, 50, 100) and **Yenile** (Refresh).

**Summary cards.** **Listelenen** (Listed), **Analytics'te karşılığı var** (Has a match in Analytics), **Analytics'te karşılığı yok** (Has no match in Analytics) and **En yüksek puan** (Highest score).

**Four groups.** Every page falls into one of four groups. The group name appears on the row as a label.

| Group                                  | What it means                                                                        | What to do                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **Az tıklanan** (Rarely clicked)       | In the top 20. Click rate is less than half of your other pages at the same position | Rewrite the title and description. The text shown in search does not attract clicks            |
| **Yükselmeye yakın** (Close to rising) | Position 4 to 20                                                                     | Expand the content, add internal links. It can rise a position or two                          |
| **İlk sıralarda** (At the top)         | In the top 3                                                                         | Keep it. Keep the page up to date and make sure it does not break                              |
| **Derinde kalan** (Stuck deep)         | After position 20                                                                    | Think about whether the page really answers that search. The right page may be a different one |

An internal link is a link you give from one page of your site to another.

**Quick filters.** **Analytics'te karşılığı olanlar** (With a match in Analytics), **Analytics'te karşılığı yok**, **En çok gösterim alan 10** (Top 10 by impressions).

**The "Fırsat nerede toplanıyor?" (Where is the opportunity gathering?) card.** Shows the spread of impressions or clicks by group.

**Table.** Columns: **Puan** (Score), **Sayfa** (Page), **Sıra** (Position), **Gösterim** (Impressions), **Tıklama** (Clicks), **Tıklama oranı** (Click rate), **Oturum** (Sessions). A session is a visit to the site. It comes from Analytics.

**Detail panel.** It opens when you click a row. The "Ne yapmalı?" (What to do?) list is here. The three parts of the score are here too: **Talep** (Demand), **İş değeri** (Business value), **Yükselme kolaylığı** (Ease of rising). Each is high, medium or low. Buttons: **Arama performansında aç** (Open in Search performance), **Adresi kopyala** (Copy address), **Sayfayı aç** (Open page).

## How to use it

1. Start with **Son 28 gün**. The top row is the page that says "look at this first".
2. Take the first two pages from the **Az tıklanan** group. They rank well on Google but are not clicked. Fix the title and description. It is half an hour of work.
3. In the **Yükselmeye yakın** group, look at pages with a high score. Add a section, and give two or three internal links from the site.
4. The **Analytics'te karşılığı yok** button separates the pages that Google shows but where Analytics sees no visits. Most often it is an address difference (a trailing slash, www). Sometimes the page really is not clicked.
5. Touch at most three or four pages a week.

## How the numbers are calculated

The range ends as far back as Search Console's three-day delay. Up to 1,000 rows are taken from Search Console and up to 1,000 rows from Analytics. The two lists are matched by domain name and path. A trailing slash on the address does not count. If 1,000 rows are reached, a note appears under the table.

Every page with more than zero impressions is a candidate. The group is chosen by position and by expected click rate. The expected rate is the typical click rate of your pages in the same position range. The bands are 1-3, 3-5, 5-10, 10-20 and 20-50. A band needs at least three pages with 10 impressions each. A page at position 20 or below, with a rate under half of the expected one, becomes "Az tıklanan".

The score is calculated like this: 50% demand, 30% business value, 20% ease of rising. Demand is based on impressions. The better the position, the easier it is counted to rise. Business value is the key event rate in Analytics. A key event is an action you count as important. If no page has one, the engagement rate is used. A page with no match in Analytics gets a middle score for business value. The score only compares your own site's pages with each other.

## Frequently asked questions

**Is a page with a score of 80 twice as important as one with 60?** No. 80 means "look first", 60 means "look later".

**What does "Analytics'te karşılığı yok" mean?** The address format may be different, or the page may never have been clicked.

**Why did the list become empty with 7 days?** In seven days most pages stay under 10 impressions. So the expected rate cannot be calculated. For most sites, 28 days is right.

## Limits

The screen does not use search volume or competitor positions. Demand is only your own impressions. Search Console and Analytics may report in different time zones. Daily matches can shift by one day. The score does not know the quality of the content. The final decision is yours.

<!-- Kaynaklar: src/routes/_project/p/$projectId/opportunities.tsx; src/client/features/opportunities/OpportunitiesPage.tsx; OpportunityStates.tsx; opportunityLogic.ts; OpportunitySummary.tsx; OpportunityColumns.tsx; OpportunitiesTable.tsx; OpportunityDetail.tsx; src/server/features/ga4/services/SearchOpportunityService.ts; src/server/features/ga4/services/opportunityKind.ts -->
