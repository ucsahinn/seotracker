---
title: What is seowatcher?
description: A free, open-source SEO workspace that runs on your own computer and brings Search Console, GA4, a site audit and PageSpeed together.
kind: kavram
updated: 2026-10-29
---

The app runs on your own computer, not in the cloud. On Windows 10 and 11 it installs from a single file; on Mac and Linux it runs in Docker. On GitHub it is called seotracker; it is the same app.

## Quick facts

| Question             | Answer                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Price                | Free. No subscription, no account, no card                                                |
| License              | MIT open source, the full code is on GitHub                                               |
| Platforms            | Windows 10/11 (64-bit) installer; Docker on Mac and Linux                                 |
| Data sources         | Google Search Console, Google Analytics 4, the app's own site crawler, PageSpeed Insights |
| Site audit           | 202 rules                                                                                 |
| AI connection        | Claude Code, Codex, Cursor and other MCP clients; 6 ready-made SEO skills                 |
| Interface languages  | Turkish, English, German, French, Italian, Portuguese                                     |
| Users                | Single user, opened only from your own computer                                           |
| Where the data lives | `%LOCALAPPDATA%\seowatcher` on Windows, the `seotracker_data` volume in Docker            |
| Version              | 0.8.7 Alpha, October 29, 2026                                                             |
| Size                 | Installer 86 MB, installed 313 MB                                                         |
| Based on             | open-seo (every-app)                                                                      |

## What does seowatcher do?

- **Search performance:** clicks, impressions, click-through rate and average position from Search Console, by query, page, country and device. Google provides 16 months of history; while the Search performance or Rank tracking screen is open, the app also copies it into its own archive.
- **Opportunities:** ranks the pages Google already shows by how many extra clicks they could bring at your site's own click-through rates, and suggests the work for each page.
- **Site audit:** crawls your site and checks it against the audit rules: broken links, missing or long titles, slow pages, pages Google does not index. Each finding says how to fix it.
- **Index status:** asks Google's URL Inspection API whether each page is indexed, why not, and when it was last crawled. Google allows 2,000 checks per property per day.
- **Analytics:** shows GA4 visits, engagement and key events next to the search data.
- **Reports:** saves single-file HTML reports you can open on a phone, print or email.
- **AI assistant:** over MCP, your assistant reads the same data, runs audits and writes reports.

## What does seowatcher not do?

- It does not estimate search volume. Impressions come from Google and are not search volume.
- It does not count the sites that link to you (backlinks).
- It does not track competitors' rankings; it reads only the sites you add as projects.
- It is not a hosted cloud service; there are no team accounts or multi-user access.
- There is no separate mobile app or browser extension yet.

## How is it different from Search Console?

Search Console is the source of the search data; seowatcher reads it and builds a worklist on top. In one place you see which page to work on first, what the site audit found and what Analytics measured for the same pages. Because seowatcher keeps its own archive, you can eventually look further back than Google's 16-month window. The figures are Google's, including its roughly three-day reporting delay and the rare queries it hides, which is why the sum of a query table can be lower than the site total.

## How is it different from paid SEO suites?

Paid SEO suites sell estimates of search volume, backlinks and competitor rankings built from their own crawls and purchased data. seowatcher uses only the data Google gives you as the site owner, plus its own crawl. That keeps it free, and it also means it is not a market research tool. It suits you if you want to monitor, fix and report on your own sites in Google.

## Who is it for?

Site owners, content teams and freelance SEOs who want the Search Console and GA4 data of their own or their clients' sites in one place. Each project keeps its own Google properties, audits and reports.

## Frequently asked questions

### Is it really free?

Yes. The app is MIT-licensed, and the Google APIs it uses are free within their usage limits.

### Where is my data stored?

On Windows, the `%LOCALAPPDATA%\seowatcher` folder holds the database, your encrypted Google credentials and the logs; uninstalling the app leaves it in place. On Docker, everything is in the `seotracker_data` volume.

### What does the app connect to?

Google (Search Console, Analytics, PageSpeed), the site you audit, and GitHub for version checks. If you connect an AI assistant, the data the assistant reads can go to that assistant's provider; that connection is optional.

### Does it run on Mac or Linux?

Yes, with Docker. On Windows, the installer is the simpler option.

### Why do I need to create a Google Cloud credential?

Because seowatcher connects to Google directly from your computer, Google needs to know which Cloud project the requests come from. You set it up once per installation.

### Do I need to expose the app to the internet?

No. The app listens only on your own computer. If you want to reach it from elsewhere, put your own authentication in front of it.

## Where to start

1. [Install on Windows](/docs/kurulum-windows/) or [install with Docker](/docs/kurulum-docker/).
2. [Connect to Google](/docs/google-baglantisi/).
3. Optionally, the [PageSpeed key](/docs/pagespeed-anahtari/) and [agent setup](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
