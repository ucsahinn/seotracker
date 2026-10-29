---
title: Site audit
description: Crawl your site, check it against the audit rules and work through the findings by priority, with a score that shows what was measured.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-28
---

The audit crawls your site with seowatcher's own crawler, which opens and reads pages one by one, and checks them against the [audit rules](/docs/denetim-kurallari/). You get a score, the share of checks that could be measured, and a prioritized list of findings with fix instructions. An audit that stopped early gets no score.

## What is on the screen

**Start a new audit** has these fields:

- **Address of the site to crawl**: your project's domain is filled in already.
- **Crawl up to N pages**: at least 10, at most 10,000, default 50. If you enter more than 500, the app asks you to confirm.
- **Also measure page speed**: off by default. When on, every page is measured on mobile and desktop with Google Lighthouse. The card shows the minimum time this adds.
- **Also check outgoing links and image sizes**: after the crawl, checks whether links to other sites work and how large your image files are. At most 300 addresses are requested, and sites that block bots are skipped.

Without a [PageSpeed key](/docs/pagespeed-anahtari/), speed measurement covers at most 50 pages. **Start audit** starts the crawl. The collapsed **Quotas** section below shows the current PageSpeed and URL Inspection quotas.

**Previous audits.** Each audit is listed with its date, address, status, pages crawled and finding counts. **Pages crawled** is the number of addresses actually crawled, including for failed audits, not the page limit you set. The Critical, Warning and Info columns count all stored findings, including site-wide checks; one page can have several findings. Completed audits show the page limit they ran with, or say it was not recorded. **Speed measurement requested** means speed measurement was switched on at launch, not that it finished. Failed audits show the stored reason and next step; an unknown cause is stated as unknown. On a phone, scroll the table sideways for the other columns. If more than one site has been audited in the project, a site picker appears above the list. Density means issues per hundred pages. Trend lines and change arrows appear only when stored evidence confirms the same site, page population, crawl settings and measured checks. Different or unknown scopes are shown as independent counts; change cannot be determined. While several sites are selected, the chart is hidden. **View** on a row opens the audit. The row menu has **Run again with the same settings** and **Delete audit**. Deleting also deletes the audit's pages, problems and speed measurements, and cannot be undone.

**Audit details.** At the top, **Download report** downloads a one-file HTML report and saves it in **Reports**. Below it, yellow warnings appear when needed (see below). Then comes the score card.

**Score card.** It shows these things.

- In the middle, the **Site score** and a rating word beside it: **Excellent**, **Good**, **Average** or **Poor**.
- Below it, a coverage line: "Score based on the 142 checks that were measured. 38 checks could not be measured." The question mark beside it explains how the score is worked out.
- A one-sentence verdict. If the score is held at a limit, it says why.
- **URLs found: N, crawled: M**. How many addresses the crawl found on the site and how many it opened. If the audit stopped at the page limit you chose, a note says "The audit was limited to N pages; the site may have more pages." The score still applies to the pages crawled.
- Lines for heavy categories that could not be measured. For example "Speed not measured: the PageSpeed quota ran out".
- Four counters: **Critical issues**, **Improvements** (warnings and info), **Checks passed** and **Not measured**.
- **Category scores**: Crawling, Content, Indexing, Speed, Security, Accessibility, Social and structured data. The lowest is at the top. If you click a category, the **Checks** tab opens on that category. A category nothing could be measured in says "Not measured". One that was partly measured says "Partial data".
- **Score history**: the scores of the latest audits of the same site. It appears once two audits have a score. Grey bars are partial scores. Audits that got no score are not on the chart, and a line below says how many there are.

**Tabs.**

- **To-do (N)**: the jobs, starting with the one that adds the most points. Each job shows the points you would gain, a "Small task", "Medium task" or "Large task" label and a **How to fix it** box. If Search Console is connected, the order also takes the clicks of the affected pages into account.
- **Checks (N)**: every check, by category. Each shows as passed, failed or not measured. For those not measured, the reason is written.
- **Instant data**: site-level facts beyond individual pages, such as the SSL certificate, domain registration, DNS and a preview of the site.
- **Pages with issues (N)**: groups the problems. Open a card to see the cause, the affected addresses and the **How to fix it** box. You can search the addresses.
- **Pages (N)**: every page that was crawled. Quick filters: **Blocked from indexing**, **Slow** (more than 1 second), **Missing alt text**, **Not in sitemap**.
- **Index status**: Google's answer for each page. It is covered in its own guide. If the audited site does not belong to the project's Search Console property, this tab does not show Google data and the screen explains why.
- **Speed (N)**: appears only if speed measurement was on. If some pages could not be measured, the number is written like "10/12".

The **Export** menu at the top right exports the open tab as **Export to Sheets**, **CSV** or **JSON**. With a filter on, only the visible rows are exported.

## The three states of the score

**Full score.** When most of the checks were measured, it comes with a rating word. Read the score by these ranges: 90 and above is Excellent, 70 and above Good, 50 and above Average, below that Poor.

**Partial score.** If the share of measured checks falls below 70 percent, the score is partial. It is also partial if fewer than half the checks in Crawling, Indexing, Content or Speed were measured. The card reads "Partial score — measurement coverage 62%", gives no rating word and is in a neutral colour. The number reflects only the checks that could be seen. No judgement, good or bad, was made about the rest. The usual reasons are these: the PageSpeed quota ran out, there is no PageSpeed key, speed measurement was off, or no index data could be fetched from Search Console.

**No score given.** In these cases the card says "Incomplete audit — no score given" in place of the score.

- The audit stopped with an error.
- The audit is still running.
- The crawl stopped early because of the site's rate limit. The issue list is incomplete, so a score would only be a guess.
- No page could be crawled. In that case the score card does not appear at all.

The findings are still shown and apply to the pages that were crawled. Run the audit again for a full score.

## When an audit fails

A failed audit states what happened, whether the cause is your site or the app, and what to do. The heading names the phase it stopped in: **URL discovery**, **crawl**, **speed test** or **results preparation**.

| What the screen says                                                                 | Whose side              | What to do                                                                        |
| ------------------------------------------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| A step did not finish in time                                                        | Most likely your site   | Try again in a few minutes. If it happens again, start with fewer pages           |
| The audit did not fit in the memory the app can use                                  | The app                 | Start again with fewer pages                                                      |
| The audit went over the processor time the app allows                                | The app                 | Start again with fewer pages                                                      |
| An error occurred while writing the results to the database                          | The app                 | Check that the disk has free space, restart the app and start the audit again     |
| The result of one step was larger than the app can store                             | The app                 | Start again with fewer pages                                                      |
| The app's internal audit engine reported an error                                    | The app                 | Choose **Yeniden başlat** (Restart) in the tray menu, then start the audit again  |
| The audit was cut off                                                                | The app                 | Make sure the app stays open and start the audit again                            |
| The install key did not reach the part that runs audits (your keys were not deleted) | The app                 | Update or restart the app, then start the audit again                             |
| The audit stopped with an unexpected error                                           | Could not be determined | Start again. If it keeps happening, download the diagnostics bundle from **Help** |

The raw error text is not shown on screen; it is included in the diagnostics bundle on [Help](/docs/yardim/).

## Yellow warnings during the crawl

- **The audit could not fully crawl this site.** The site's bot protection stopped the crawler. The results are still shown. Allow "seotracker-audit" in your firewall, or try one of the desktop crawlers the screen suggests (LibreCrawl, Screaming Frog).
- **N pages could not be fetched (network error).** The connection could not be made even on a retry. These pages were not audited and are not counted as broken. It is often temporary. Run the audit again. If it continues, check that the site opens from this computer.
- **The site rate-limited N pages.** The site said "too many requests". Those pages could not be audited. Start again after the rate limit resets.
- **The crawl stopped early because of the site's rate limit.** The wait that was asked for was longer than the audit may take. The report is incomplete and gets no score.
- **The saved PageSpeed key could not be read, so the speed test ran without a key.** The crawl results are unaffected, but speed was measured only for the first pages. Update or restart the app and start a new audit. If it happens again, save the PageSpeed key again in **Settings**.

## A practical routine

1. For the first audit, leave the page count at 50. Keep speed measurement off. It finishes in a minute or two. With speed measurement off the score can come out partial. That is normal.
2. Read the coverage line on the score card. If it says **Partial score**, the lines below it tell you why.
3. Start with the first three jobs in the **To-do** tab. They give the most points for the least effort.
4. In the **Pages with issues** tab, finish the critical problems first. Critical problems stop Google from seeing the page or visitors from reaching the site.
5. Take the list with **Export** and give it to your site administrator. You can pass the **How to fix it** box on as it is.
6. After fixing, click **Run again with the same settings**. The arrows in the **Previous audits** list and the **Score history** show what was fixed.
7. Turn on speed measurement once a week, for important pages. Each page takes about ten seconds and uses Google quota.

## How the numbers are calculated

**Score.** Each finding takes points off its own category. How much depends on how important the finding is and what share of pages it touches. The weights are: critical 40, warning 15, info 3. The site score is the weighted average of seven categories. Crawling and Indexing weigh the most, Social and structured data the least. A check that could not be measured neither raises nor lowers the score. That is why coverage is shown separately.

**Upper limits.** If there is even one problem, the score is at most 99. If there is a critical problem, it is at most 69. With 5 or more warnings it is at most 89. This way, one page blocked from indexing on a big site is not hidden under a high score. If a limit holds the score, the card says so. The "+N points" beside a job takes the limit into account too. Fixing the only critical problem lifts the whole limit. Fixing one warning while a limit is on adds very little.

**Crawl.** The app does not strain your site. It sends at most two requests at a time. If the site says "too many requests" (429), it waits. If the total wait goes over 30 minutes, the crawl stops and the audit gets no score.

**Speed measurement.** On a site of 212 pages, the whole audit took 35 minutes. About 24 of them were speed measurement. If the daily quota runs out, measuring stops, the results so far stay and the score may be partial. A problem is written in these cases:

- The main content shows later than 4 seconds (LCP).
- The content shifts more than 0.25 (CLS).
- The response to a click takes longer than 500 milliseconds (INP).
- The Lighthouse SEO score is below 90.

## Questions

**Does the audit show what Google sees?** No. The app's crawler reads the page itself. Google's answer is in the **Index status** tab.

**Why is my score stuck at 69?** There is a critical problem. The score cannot go past 69 until you fix it. The card says so.

**Why does it say "Partial score"?** A large share of the checks could not be measured. The coverage line and the lines below it tell you why. Turning on speed measurement or connecting Search Console usually raises coverage.

**Why did speed measurement stop partway?** Usually there is no PageSpeed key, or the daily quota is used up. **Settings → Google and system limits** shows which.

**How many audits run at once?** At most three. Two audits measuring speed slow each other down.

## Limits

The crawler may miss content that JavaScript adds after the page loads. An audit crawls at most 10,000 pages. Speed results are Google's lab measurements, not data from real visitors. The audit changes nothing on your site; you or your assistant make the fixes.

<!-- Sources: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; AuditSiteFilter.tsx; ProgressCard.tsx; src/client/features/audit/results/ResultsView.tsx; ResultsHeader.tsx; ScoreOverview.tsx; ScoreGauge.tsx; WithheldScore.tsx; scoreWords.ts; auditFailureCopy.ts; ChecksView.tsx; TodoView.tsx; IssuesView.tsx; QuickFilters.tsx; ForeignPropertyNotice.tsx; DownloadReportButton.tsx; src/routes/_project/p/$projectId/audit/index.tsx; src/shared/auditStanding.ts; src/shared/auditScore.ts; src/shared/auditCategory.ts; src/shared/audit-limits.ts; src/server/lib/audit/crawl-throttle.ts -->
