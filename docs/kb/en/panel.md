---
title: Dashboard
description: The first screen you see when you open a project. The search numbers for the last 28 days, the latest audit summary and your to-do items in one place.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

On this screen you see the latest state of your site and learn what to do next. It is the first screen you get when you open a project.

The search numbers come from Google's Search Console tool. The visitor numbers come from Google Analytics. The audit summary comes from the app's own site crawler. The **Yenile** (Refresh) button at the top refreshes all of them. **Denetimi başlat** (Start audit) takes you to the audit screen.

## What is on the screen

**Four number cards.** **Tıklama** (Clicks), **Gösterim** (Impressions), **Tıklama oranı** (Click-through rate) and **Ortalama sıra** (Average position). All show the last 28 days. Each card has an arrow that compares with the previous 28 days. For average position, a small number is good, and 1 is the top position. So a drop is good news, and the arrow is coloured to match. If Search Console is not connected, the card says "Search Console'u bağlayın" (Connect Search Console).

**Sıradaki adımlar** (Next steps). Up to three tasks the app suggests. The suggestions come in this order:

- If Search Console is not connected, **Search Console'u bağla** (Connect Search Console).
- If there is no audit, or the latest audit is older than seven days, **Denetimi başlat**.
- If there is a serious problem, **Kritik sorunları gör** (See critical issues).
- Then **Fırsatları aç** (Open opportunities) and **Uyarıları gör** (See warnings).

When a task is done, the item leaves the list.

**New in the latest audit and Düzelenler (Fixed).** It compares the last two audits. You see which issue appeared on how many pages, and which one dropped. If nothing was fixed, it says "Düzelen sorun yok." (No issues fixed.).

**Tıklama eğilimi** (Click trend). The daily click line for the last 28 days. If there is data for fewer than four days, no line is drawn. The **Sorguları aç** (Open queries) link goes to the Arama performansı (Search performance) screen.

**Sıra 5-20 arası sorgular** (Queries ranking 5-20). The first four searches that show up between positions 5 and 20 on Google. With a little work, these can reach the first page or the top positions. **Tümünü gör** (See all) opens the full list.

**Site denetimi** (Site audit) card. It shows how many pages were crawled, the three most common issues and the five pages with the most issues. While an audit is running, the card refreshes every five seconds. The question mark icon explains the three severity levels:

- Critical: directly breaks your showing up in search.
- Warning: wears down rankings over time, but is not urgent.
- Info: small chances to improve.

**Organik trafik** (Organic traffic) card. It shows up if Google Analytics is connected. For visitors who came from search, it gives **Oturum** (Sessions), **Aktif kullanıcı** (Active users), **Etkileşim oranı** (Engagement rate) and **Anahtar olay** (Key events). If the site measures sales, **Organik gelir** (Organic revenue) and **Sipariş** (Orders) are added too.

## How to use it

1. Open it once a week and look at the arrows on the four cards.
2. Do the first task in the **Sıradaki adımlar** box. If the box is empty, there is nothing urgent.
3. If the latest audit is older than seven days, click **Denetimi başlat**.
4. Review the title and description of the pages on the **Sıra 5-20 arası sorgular** card. The easiest gains are usually here.

## How the numbers are calculated

The four cards come from a single Search Console report. Google gives the data three days late. So the 28-day range ends three days ago, not today. The previous period is the 28 days right before this range. If the previous period is zero, no arrow is shown.

Average position counts searches with many impressions more. These four numbers are the real site totals. If you add up the table rows on the Arama performansı screen, you get more. Google counts every page that shows up in the same search separately.

## Frequently asked questions

**Why is there no data for today?** Google does not give the last three days yet. This is not a gap.

**Average position went up. Is that good?** No. Going from 3 to 7 means dropping. This is why the arrow turns red.

**Does the audit card show what Google sees?** No. It shows what the app's own crawl found. Which pages Google has recorded is on the **Dizin durumu** (Index status) tab on the audit screen.

**There is no Organik trafik card.** Google Analytics is not connected in the project settings. Connecting it is optional.

## Limits

The Dashboard does not show search volume, backlinks (links to you from other sites) or competitor positions. This data is not in the app. Queries that are searched very rarely are hidden in Search Console. For details you go to the matching screen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
