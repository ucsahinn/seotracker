---
title: Site audit
description: The app walks your site page by page, checks it against 95 rules and ranks the problems by importance, each with what to do about it.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-22
---

This screen finds the problems on your site and tells you how to fix them.

The app walks through your site with its own crawler (a program that opens and reads pages one by one). It looks for broken links, missing titles and slow pages. At the end you get a score and a list of problems ranked by importance, each with instructions for fixing it.

## What is on the screen

**The "Start a new audit" card.** It has three fields:

- **Address of the site to crawl**: your project's domain name is filled in for you.
- **Kaç sayfa taransın?** (How many pages to crawl?): at least 10, at most 10,000, 50 by default. If you type a number above 500, the app asks you to confirm.
- **Also measure page speed**: off by default. If you turn it on, every page is measured on a phone and on a computer. Google Lighthouse (Google's page-testing tool) does the measuring.

If you have no PageSpeed key (a free code Google issues for speed measurement), speed measurement is limited to 50 pages. To measure all pages, add a free key in **Settings**.

**Previous audits.** Each audit is listed with its date, status, page count and problem counts. Problem counts are shown per hundred pages, so you can compare a 50-page audit with a 500-page one. **Delete audit** in the row menu deletes everything and cannot be undone.

**Audit details.** If the crawl is incomplete, a yellow warning appears. For example: "The audit could not fully crawl this site.", usually because bot protection blocked it. The results are still shown. **Download report** downloads a single-file HTML report and saves it to the **Reports** screen.

**Site score.** A number from 0 to 100. Under it, the three jobs that would earn the most points are listed as "+N puan" (+N points).

**Two charts.** One shows which problem affects the most pages. The other shows how serious the problems are.

**Four tabs.**

- **Sorunlu sayfalar** (Pages with problems): open a card to see the cause and the **How to fix it** box. Buttons: **URL'leri kopyala** (Copy URLs), **Download CSV**, **Show in the Pages tab**.
- **Pages**: every crawled page. Quick filters: **Blocked from indexing**, **Slow** (longer than 1 second), **Missing alt text**, **Not in sitemap**.
- **Index status**: Google's answer for each page. It is explained in a separate guide.
- **Speed**: visible only when speed measurement is on.

## How to use it

1. In your first audit, leave the page count at 50. Keep speed measurement off. It finishes in a minute or two.
2. Start with the three "+N puan" jobs on the score card. They earn the most points for the least work.
3. In the **Sorunlu sayfalar** tab, finish the critical problems first. A critical problem stops Google from seeing the page.
4. Use **URL'leri kopyala** to copy the list and hand it to your site administrator. The **Nasıl düzeltilir?** box can be passed on as it is.
5. After you fix things, click **Run again with the same settings**. On the dashboard, the "Fixed" card shows what was closed.
6. Once a week, turn speed measurement on for your important pages. Each page takes about ten seconds and uses Google quota.

## How the numbers are calculated

**Score.** Each problem has a weight: critical 40, warning 15, info 3. The more pages a problem affects, the more it takes off the score. The score starts at 100 and never goes below zero. If even one problem exists, the score is at most 99.

Bands: 90 and above is very good, 70 and above is good, 50 and above is average, below that is weak.

**Crawl.** The app does not strain your site: it sends at most two requests at the same time. If the site says "too many requests" (429), it waits. If the total wait goes over 30 minutes, the crawl stops.

**Speed measurement.** On a site with 212 pages, the whole audit took 35 minutes, about 24 of them for speed measurement. If the daily quota runs out, measurement stops and the results up to that point are kept. A problem is reported in these cases:

- The main content appears later than 4 seconds (LCP).
- Content shifts more than 0.25 (CLS).
- The response to a click takes longer than 500 milliseconds (INP).
- The Lighthouse SEO score is below 90.

## Frequently asked questions

**Does the audit show what Google sees?** No. The app's crawler reads the page itself. Google's answer is in the **Dizin durumu** tab.

**The score is 98. Why not 100?** Even one problem keeps the score at 99.

**What does the "Engellendik" (We were blocked) warning mean?** Your site's bot protection has stopped the crawler. In the firewall, allow the name "seotracker-audit".

**Speed measurement stopped halfway.** Usually there is no PageSpeed key, or the daily quota has run out. The quota card in **Ayarlar** gives the reason.

**How many audits can run at the same time?** At most three. Two audits that measure speed slow each other down.

## Limits

The crawler may not see content that JavaScript (code that runs on the page) adds later. One audit crawls at most 10,000 pages. Speed measurement is Google's lab measurement, not real visitor data. The audit changes nothing on your site. You or your assistant make the fixes.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; ProgressCard.tsx; ResultsView.tsx; ResultsTables.tsx; TabIntro.tsx; ScoreCard.tsx; IssueWorkloadChart.tsx; SeverityDonut.tsx; IssueCard.tsx; DownloadReportButton.tsx; export.ts; src/shared/auditScore.ts; src/shared/audit-limits.ts; src/shared/audit-issues/speed.ts; src/server/lib/audit/crawl-window.ts; crawl-throttle.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
