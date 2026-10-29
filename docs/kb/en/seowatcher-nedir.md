---
title: What is seowatcher?
description: seowatcher is a free, open-source SEO app that shows Search Console, GA4, site audit and PageSpeed data in one panel on your own computer.
kind: kavram
updated: 2026-10-29
---

seowatcher is a free, MIT-licensed, open-source SEO app that shows Google Search Console, Google Analytics 4, its own site crawler and PageSpeed Insights in one panel. It runs on your own computer, not in the cloud: a single installer for Windows 10 and 11, and Docker on Mac and Linux. On GitHub it is called seotracker; they are the same app.

## Quick facts

| Question             | Answer                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Price                | Free. No subscription, no account, no card                                                |
| License              | MIT open source, the full code is on GitHub                                               |
| Platforms            | Windows 10/11 (64-bit) installer; Docker on Mac and Linux                                 |
| Data sources         | Google Search Console, Google Analytics 4, the app's own site crawler, PageSpeed Insights |
| Site audit           | 202 rules                                                                                 |
| AI connection        | Assistants such as Claude Code, Codex, Cursor and Gemini CLI over MCP; 6 ready-made tasks |
| Interface languages  | Turkish, English, German, French, Italian, Portuguese                                     |
| Users                | Single user, opened only from your own computer                                           |
| Where the data lives | `%LOCALAPPDATA%\seowatcher` on Windows, the `seotracker_data` volume in Docker            |
| Version              | 0.8.6 Alpha, October 29, 2026                                                             |
| Size                 | Installer 86 MB, installed 313 MB                                                         |
| Based on             | open-seo (every-app)                                                                      |

## What does seowatcher do?

- **Search performance:** clicks, impressions, click-through rate and average position from Search Console, by query, page, country and device. Google provides 16 months of history; the app also builds its own archive.
- **Opportunities:** ranks the pages Google already shows by how many extra clicks they could bring at your site's own click-through rates, and suggests the work for each page.
- **Site audit:** crawls your site against 202 rules: broken links, missing or long titles, slow pages, pages Google does not index. Each finding says what to do.
- **Index status:** reads Google's record for each of your pages (indexed or not, why, when it was last crawled) through URL Inspection. Google limits this to 2,000 URLs per property per day.
- **Analytics:** shows GA4 visits, engagement and key events next to the search data.
- **Reports:** saves single-file HTML reports you can open on a phone, print or email.
- **AI assistant:** over MCP, your assistant reads your numbers, runs the audit and writes the report.

## What does seowatcher not do?

- It does not estimate search volume. Impressions come from Google and are not search volume.
- It does not count the sites that link to you (backlinks).
- It does not track competitors' rankings; it reads only the sites you add as projects.
- It is not a hosted cloud service; there are no team accounts or multi-user access.
- There is no separate mobile app or browser extension yet.

## How is it different from Search Console?

Search Console is the source of the data; seowatcher reads it and builds a worklist on top. Search Console shows you numbers; seowatcher shows in one place which page to look at first, where your site breaks against 202 rules, and what Analytics measured for it. Because it keeps an archive on your computer, over time you can also look further back than Google's 16-month window. The numbers come from the same source, but Google reports with about a three-day delay and hides very rare queries, which is why a page total and the site total can differ.

## How is it different from paid SEO suites?

Paid SEO suites sell estimates of search volume, backlinks and competitor rankings from their own crawls and purchased data. seowatcher does none of that; it uses only the data Google already gives you as the site owner, plus its own crawl. That is why it is free, and also why it is not built for market research. It fits if you want to monitor, fix and report on your own site's presence in Google.

## Who is it for?

Site owners, content teams and freelance SEOs who want the Search Console and GA4 data of their own or their clients' sites in one place. Each project keeps its own Google properties, audits and reports.

## Frequently asked questions

### Is it really free?

Yes. It is an MIT-licensed, open-source project. The Google services it uses stay within their free usage limits.

### Where is my data stored?

On Windows, in the `%LOCALAPPDATA%\seowatcher` folder: the database, your Google access key and the logs. Uninstalling the app does not touch that folder. In Docker, the data lives in the `seotracker_data` volume.

### What does the app connect to?

Google (Search Console, Analytics, PageSpeed), the site you audit, and GitHub for version checks. If you connect an AI assistant, the data the assistant reads can go to that assistant's provider; that connection is optional.

### Does it run on Mac or Linux?

Yes, with Docker. On Windows the single-file installer is easier.

### Why do I need to create a Google Cloud credential?

seowatcher is not a cloud service; it runs on your computer and connects to Google directly. Google wants to know who owns the connecting app. You do this once.

### Do I need to expose the app to the internet?

No. The app opens only from your own computer.

## Where to start

1. [Install on Windows](/docs/kurulum-windows/) or [install with Docker](/docs/kurulum-docker/).
2. [Connect to Google](/docs/google-baglantisi/).
3. Optionally, the [PageSpeed key](/docs/pagespeed-anahtari/) and [agent setup](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
