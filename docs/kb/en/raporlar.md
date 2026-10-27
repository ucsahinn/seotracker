---
title: Reports and templates
description: Every report you download from an audit or from the Search performance screen, or have your assistant write, is a single HTML file. You open it on a phone, print it or send it by email.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

This guide covers getting reports, sharing them and repeating them with a template.

The **Reports** screen keeps every report made for this project in one list. A report comes from one of three sources. The **Download report** button on the **Site audit** screen makes the audit's report. The **Download report** button on the **Search performance** screen makes a report of the view on screen. Your AI assistant can also research a topic and save its findings as a report. Each report is a single HTML file with no scripts (code that runs on the page), external resources or embedded fonts, so it opens on a phone, can be printed as a PDF and can be sent by email. The app has no editor for writing a report by hand: the app or the assistant writes it.

## What is on the screen

**Top bar.** The **Refresh**, **Copy report prompt** and **Templates** buttons. **Copy report prompt** copies a ready-made request to the clipboard, which you paste into your assistant. If there are no reports yet, this button sits inside the empty-state card.

**Summary tiles.** There are three.

- **Latest report**: how long ago the most recent report was written or updated. The link below it opens the report.
- **In the last 7 days**: the number of reports written or updated in that time.
- **Total**: all reports. Below it you see how many are audit reports, how many were made by a skill and how many from templates.

**Reports by type.** A ring chart splits the reports by type. Click a type and the list narrows to reports of that type. Click again to remove the filter.

**How does it work?** A short explanation that comes closed. It explains the difference between reports written by the agent and the Site audit report.

**Filters.** All, Last 7 days, Written with a template, Written with a skill. Next to them is the **Search reports** box.

**Table.** It has the **Report**, **Type**, **Created** and **Size** columns. Click a heading to sort. **Type** tells you where the report came from. For example, "Site audit report" is made by the app itself. What the assistant writes carries names like "SEO audit", "Period comparison", "Traffic drop review", "SEO report", "Coaching note" or "Project setup". A report whose type is not known says "Unspecified". For reports written with a template, the template's name appears. The list shows the latest 100 reports. If there are more, a note below says so.

**Report page.** The report opens in its own isolated frame. Buttons: **Download as HTML**, **Save as PDF (print)**, **Open in new tab**. The **More actions** menu has **Copy link**. The link works only on this installation, with no access from outside. The page also says who created the report, its type, when it was created and updated and its size.

**Report templates.** You reach them from the **Templates** button. A template is a saved recipe that tells your assistant how to write the report: who will read it, which sections it will have, which language it will be written in. Fields:

- **Name**: at most 80 characters, unique in the project.
- **Description**: at most 200 characters. One sentence that says when to use it.
- **Instructions**: at most 3,000 characters.

A project can have at most 10 templates. Deleting a template does not delete the reports made from it.

## The app's own reports

**Site audit report.** Made by **Download report** in the audit details. If the audit stopped halfway, "(partial)" is added to the report's title. For example "example.com site audit (partial)". The cover of such a report carries the warning "The report may be incomplete." and the reason: the audit stopped with an error, it is still running, or no pages could be crawled. A partial report has no score sections. If the crawl stopped early because of the site's rate limit, the cover says "Incomplete audit, no score given". If few checks were measured, the score is written as "Partial score" together with the measurement coverage. The report's summary states the situation too. That is how an assistant reading the reports list knows a report is incomplete.

**Search performance report.** Made by **Download report** on the Search performance screen. It turns the view you are looking at on screen (period, device, country, search type) into a printable document. The cover gives the final days, the comparison, the filters, the date of the last data and when the report was created. Then come the four totals, the "Data status" box, the **Start with these** jobs, the **Over time** chart (with Google updates and notes marked), opportunities, changes and pages competing for the same query. The numbers are the same as on screen. Taking it again with the same site, date range and filters does not add a new report. It refreshes the app's earlier report. If the report goes over the storage limit, you are asked to pick a shorter period or filter.

Both reports are saved first, then downloaded to your computer. If the download fails for some reason, the report is still in the **Reports** list. Download it from there.

## How to use it

1. For your first report, click **Download report** on the Site audit screen. The report downloads to your computer and also appears in this list. It starts with the section "N things to do this week".
2. To document your search standing, set the period and filters on the Search performance screen, then click **Download report**.
3. If you work with an assistant, click **Copy report prompt**. Paste the copied text into Claude Code, Codex or Cursor. The assistant asks which report you want, reads the data and saves the report here.
4. If you want the same report every month, write a template. In the instruction, write the reader ("the person who runs the site, does not know SEO"), the sections, the order and the tone. If you ask for the template by name, the assistant applies it.
5. To share, click **Download as HTML** and send the file. The recipient opens the file in a browser. A copied link works only on the same computer.
6. Keep old reports: in the next conversation, the assistant reads the previous report's summary and compares.

## How the numbers are calculated

The audit report is laid out for A4 print and contains these sections: contents, "N things to do this week", problems, speed measurement, Google index status and sitemap. The index status section uses only saved answers and does not ask new questions.

The lists are limited: 50 addresses per problem, 300 pages, 50 speed rows, 3,000 addresses in the appendix. If the file goes over 400 KB, the lists are shortened.

A report can be at most 500,000 bytes (under 80 KB is recommended). The title is at most 120 characters and is unique in the project. The summary is at most 2,500 characters. A second report with the same title is not accepted. A project can have at most 10,000 reports, and the installation has 5 GB of space in total.

For security, when a report is saved, files that contain a script, an iframe (a box that embeds one page inside another), a form, an external style, an event handler (like onclick), a javascript: link or an automatic redirect are rejected. When a report is opened, it is also shown in a sealed frame with no network access, so a report cannot send anything out without you knowing.

## Frequently asked questions

**Who wrote the report?** The **Type** column tells you. "Site audit report" comes from the app; all others come from the assistant. The report page also shows who saved it.

**The title says "(partial)", what should I do?** The audit stopped halfway. The report's cover says why. Run the audit again and download the report again.

**Can I edit the report?** Not in the app. Tell the assistant "change this section", and the assistant updates the report.

**I sent the link, and the other person cannot open it.** The link works only on this computer. Send the file with **Download as HTML**.

**What should I watch for when writing a template?** A template is a format recipe, not a source of information. Write the sections, the tone and who it is written for. Do not write numbers or claims. The assistant takes the numbers from the data every time.

## Limits

Reports are never published online; you share them by sending the file. A report is only as accurate as the data its writer read. The "How this report was prepared" section at the end of assistant reports lists which tool supplied which information. Trace a number you doubt from there.

<!-- Sources: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; ReportsSummary.tsx; ReportKindsHelp.tsx; ReportKindChip.tsx; reportStats.ts; reportRequestPrompt.ts; src/client/features/search-performance/SearchReportButton.tsx; src/serverFunctions/searchReport.ts; src/server/features/search/report/buildSearchReportHtml.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts; reportCoverSection.ts -->
