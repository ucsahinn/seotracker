---
title: Dashboard
description: This is the first screen you see when you open a project. The last 28 days of search numbers, the state of the setup, your next tasks and the summary of the latest audit are all here.
screen: Panel
route: /p/<proje>
updated: 2026-10-27
---

This is the first screen of a project. It shows the current state of your site and what to do next.

The search numbers come from Google Search Console. The visitor numbers come from Google Analytics. The audit summary comes from the app's own site crawler. The **Refresh** button at the top refreshes all of them. If the project has at least one audit, a **Start audit** button appears beside it and takes you to the audit screen. Under the title is the project's domain.

## What is on the screen

**Four number cards.** **Clicks**, **Impressions**, **CTR** and **Average position**. All four cover the last 28 days, and each card has an arrow comparing it with the previous 28 days. For average position, a small number is good, because 1 is the top spot. So if the number falls, the news is good and the arrow is coloured to match. If Search Console is not connected, a card says "Shows once connected". If it is connected but there were no impressions in the period, it says "No impressions in this period".

**Next steps.** Beside the heading, a label states the state of the setup: "Setup 4 / 6", or "Setup complete" when everything is done. Six items are counted: Search Console, Analytics, a recent audit, the project definition, the PageSpeed key and the AI agent. The same six items are on the **Project context** screen, so both screens show the same number. A recent audit means an audit of the project's own site that finished in the last seven days. An audit of another site does not count. What is missing is listed in the line "Missing from setup: ..." and the **Complete it** link beside it opens the Project context screen. The setup says nothing about the site itself. It is only a to-do list.

The app suggests at most three tasks. The order is:

- Search Console is not connected: **Connect Search Console** (button **Connect**). If the Google access key has not been entered yet, a warning replaces this line: "Google access key missing" with a button **Enter the Google access key in Settings**.
- There is no audit: **Run your first audit** (button **Start**). The list ends here.
- If the last audit failed: **Run the audit again** (button **Run again**). Below it are the cause, whether the fault is in the site or in the app, and what to do. While an audit is running: **Audit in progress** (button **View progress**).
- There are critical issues: "N critical issues" (button **View**).
- Search Console is connected: **Review opportunities** (button **Open**).
- The latest audit is older than seven days: **Refresh the audit** (button **Start**).
- There are warnings: "N warnings" (button **View**).

When a task is done, it leaves the list. If the list is empty, it says "Nothing urgent. The audit is current and there are no critical issues."

**New in the last audit** and **Fixed**. This card appears only when it has something to say. If the last audit is older than seven days, it says "It has been N days since the last audit" and offers a **Start audit** button. If issues changed between the last two audits, two lists appear. **New in the last audit** shows which issues were newly seen, **Fixed** shows which were closed. If nothing was fixed, it says "No fixed issues." If there is neither, the card does not appear at all.

**Click trend.** A line chart of daily clicks for the last 28 days. It shows the total, the change against the previous period and the peak day. With fewer than four days of data, no line is drawn. The **Open queries** link opens the **Search performance** screen.

**Queries close to the top three.** The searches you have an average position between 4 and 20 for, with enough impressions, are here. It says how many extra clicks they could bring together if each rose one step. That is an upper bound. Each row shows the search's position and the possible gain. Click a row and that search opens on the Search performance screen. **View all** opens the Ranking opportunities tab of the Search performance screen. If no search has enough impressions, the card says so.

**Site audit card.** It shows how many pages were crawled and on what date, the most common issues and the pages with the most issues. While an audit is running, it says "The audit is running; results appear when it finishes." and the card refreshes every five seconds. If the audit could not finish, it says "The last audit could not finish, so there are no results." If no issues were found, it says "No issues found; your site looks healthy." Below the issues, a bar shows the severity levels. The question mark explains the three levels: critical issues can stop a page from appearing in search, warnings wear down rankings over time, and info notes are small improvements. Click the bar or one of the labels under it to go to the issue list. At the bottom is the **Pages with the most issues** list. If there is no audit, this card does not appear, because "Next steps" already suggests the first audit. **Details** opens the pages-with-issues tab of the audit.

**Organic traffic card.** It appears when Google Analytics is connected. For visitors who came from search, it shows **Sessions**, **Active users**, **Engagement rate** and **Key events**. If the site measures sales, **Organic revenue** and **Transactions** are added too. At the top of the card, **Reports** opens the Analytics screen and **Manage** opens the Analytics connection settings. A note at the bottom says Analytics comes 1 day behind and Search Console 3 days behind. That is why this card's days differ from the click tiles above. If Analytics is not connected, an invitation to connect sits in place of the card. If you close it, it does not come back.

If the card cannot read the data, it shows a sentence that gives the cause and the fix, and offers two buttons: **Fix the connection** (opens the Analytics settings) and **Try again**. The main causes are these:

- The connection has expired or was revoked. Connect it again in **Settings**.
- The connected account can no longer reach the property. Give the account or service account at least the Viewer role on the property.
- The property was deleted or moved. Choose it again in **Settings**.
- No Analytics property is connected to this project. Choose one in **Settings**.
- The reporting quota is used up. The quota refreshes hourly and daily, so try again later.
- The Google Analytics Data API is turned off in your Google Cloud project. Turn on "Google Analytics Data API" in Google Cloud Console.
- Google cannot be reached. Check this computer's internet connection.
- Google is not answering for the moment. Try again shortly.

If the card has no organic sessions, it says "No organic search traffic was recorded in this range." Nothing is wrong. There were no visits from search in that period.

**Set up your workspace.** At the very bottom, the setup steps to do sit in a closed box. The steps are: add your site, add your other sites, connect your AI agent, connect Search Console and describe the project. It says "N steps left. All optional". You put a step off with **Skip for now**. Postponed and finished steps are counted below the box, and **Restore** brings them back. When all are done, the box disappears.

## How to use it

1. Open it once a week and check the arrows on the four cards.
2. Do the first task in the **Next steps** box. If the box is empty, nothing is urgent.
3. If the setup label shows something missing, click **Complete it**. Missing items close quickly.
4. If the latest audit is older than seven days, click **Start audit**.
5. Review the titles and descriptions of the pages on the **Queries close to the top three** card; the easiest gains are usually here.
6. If the **New in the last audit** and **Fixed** card appears, give priority to the newly seen issues. You see a week's change at a glance.

## How the numbers are calculated

The four cards come from a single Search Console report. Google delivers data three days late, so the 28-day range ends three days before today. The previous period is the 28 days right before this range. If the previous period is zero, no arrow is shown.

Average position gives more weight to searches with many impressions. These four numbers are the real site totals. Adding up the table rows on the **Search performance** screen gives a larger number, because Google counts each page that appears for the same search separately.

The gain on the **Queries close to the top three** card is an upper bound. It is the extra clicks each search would get if it rose one step. The same calculation is used on the Opportunities screen. Both screens give the same figure.

The setup label is a count, not a percentage or a score. It shows how many of the six items are done.

## Frequently asked questions

**Why is there no data for today?** Google has not delivered the last three days yet. This is not a fault.

**Average position went up. Is that good?** No. Going from 3 to 7 is a drop, which is why the arrow turns red.

**Does the audit card show what Google sees?** No. It shows what the app's own crawl found. Which pages Google has indexed is on the **Index status** tab on the audit screen.

**There is no Organic traffic card.** Google Analytics is not connected in the project settings, or you closed the card. Connecting it is optional.

**Why does setup say 5 / 6 when I thought I did everything?** The "Missing from setup" line says which item is missing. Most often it is a PageSpeed key or an audit from the last seven days.

**The Analytics card shows an error.** The sentence on the card gives the cause. Most often, refreshing the connection in **Settings** is enough.

## Limits

The Dashboard does not show search volume, backlinks (links to you from other sites) or competitor positions. This data is not in the app. Search Console hides queries that are searched very rarely. For details, open the matching screen.

<!-- Sources: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; Ga4ConnectCard.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; DashboardOnboarding.tsx; dashboardSteps.ts; GoogleSetupBanner.tsx; src/client/features/projects/projectSetupQuery.ts; src/shared/projectSetup.ts; src/server/lib/errors.ts; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
