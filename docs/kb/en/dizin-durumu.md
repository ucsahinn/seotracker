---
title: Index status
description: Ask Google whether each crawled page is indexed, why not, and when Google last crawled it, within the 2,000 daily URL Inspection quota.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

A site audit tells you whether a page loads, not whether Google has added it to its index. The **Index status** tab of a site audit asks Google's URL Inspection API about each crawled page and stores the answer on your computer.

Google allows 2,000 URL inspections per Search Console property per day. The app and your connected assistant share that allowance, so stored answers are reused and a page is checked again only when its answer is out of date.

## What the tab shows

**What has Google done with these pages?** This chart splits the crawled pages into three groups:

- **On Google**: indexed and able to appear in search.
- **Not indexed**: Google knows the page but did not index it.
- **Awaiting an answer**: not checked yet, or Google gave no answer.

**Summary boxes** count the pages checked, indexed, not indexed and awaiting an answer. **Pages where Google chose a different canonical** counts checked pages where Google picked a different URL from the canonical you declared. A separate box shows how many pages in this audit are still unchecked.

**Check status on Google** checks up to 25 pages per run, starting with pages never checked and then the most overdue answers. The button is disabled when Search Console is not connected, when no pages are left to check, or when the audited domain is outside the connected property. When the daily quota runs out, the tab shows "Google's daily limit of 2,000 URLs is used up" with the number of pages still waiting.

**The table** has the columns **Page**, **Status**, **Reason**, **Google-selected canonical** and **Google's last crawl**. Status is **On Google**, **Not checked**, **No answer**, **Check failed** or Google's own coverage status. Common coverage statuses:

- "Discovered - currently not indexed": Google knows the URL but has not crawled it yet.
- "Crawled - currently not indexed": Google crawled the page and chose not to index it.
- "Excluded by 'noindex' tag": the page asks to be kept out of search.
- "Blocked by robots.txt": robots.txt forbids Google from crawling it.
- "Soft 404": the page loads, but Google treats it as missing or empty.
- "URL is unknown to Google": Google has never discovered the URL.

You can download the table as CSV.

## Working through the results

1. After an audit finishes, open the tab. If many pages are **Awaiting an answer**, select **Check status on Google**. Each run covers 25 more pages, so a small site needs only a few runs.
2. Start with **Not indexed**. The **Reason** column usually tells you what to do: remove a robots.txt block, remove an unwanted noindex tag, or wait for "Discovered - currently not indexed".
3. For important pages marked "URL is unknown to Google", add them to your sitemap and submit it in Search Console. For a few of your most important pages, also use **Request indexing** in Search Console's URL Inspection tool.
4. If **Pages where Google chose a different canonical** is not zero, compare the **Google-selected canonical** column with your own. Either correct your canonical or make Google's choice the preferred URL.
5. Check again a few days later. Only out-of-date answers are requested again, so no quota is wasted.

## How the numbers are calculated

- Google says "indexed": the page counts as **On Google**.
- Google gives any other verdict ("not indexed" or undetermined): **Not indexed**.
- No answer yet: **Awaiting an answer**.

An answer goes out of date after 14 days for an indexed page and after 3 days for a page that is not indexed or returned an error. Pages never checked are always eligible. The daily limit counts the app's checks over the last 24 hours. Checks you run by hand in Search Console are not in this counter, but they do use Google's real quota.

A canonical mismatch means Google's chosen URL differs from yours, even by a trailing slash.

Two audit findings come from this tab: "Google hasn't crawled this page in a long time" when Google's last crawl is more than 90 days old, and "Google's answers for some pages are out of date" for stored answers past their age limit.

## Questions

**What does the 2,000 limit apply to?** The Search Console property. Two projects connected to the same property, and your assistant, draw from the same allowance.

**What should I do about "Discovered - currently not indexed"?** Usually nothing. Google can leave new sites' pages waiting for weeks. Links from pages Google crawls often speed it up.

**Does this tab submit pages to Google?** No. It only asks for their status. To get a page indexed, use your sitemap and **Request indexing** in Search Console.

## Limits

The answers are only as complete as what Google returns, and Google sometimes leaves fields empty. The tab checks only pages the audit crawled. At 2,000 checks a day, a 10,000-page site takes five days to cover.

<!-- Sources: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
