---
title: Reports and templates
description: The reports you download from an audit or have your assistant write are a single HTML file. It opens on a phone, can be printed and can be shared.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

This guide covers getting reports, sharing them and repeating them with a template.

The **Reports** screen keeps every report made for this project in one list. A report comes from one of two sources. The **Download report** button on the **Site audit** screen makes the app's own report. Your AI assistant can research a topic and save its findings as a report. Each report is a single HTML file with no scripts (code that runs on the page), external resources or embedded fonts, so it opens on a phone, can be printed as a PDF and can be sent by email. The app has no editor for writing a report by hand: the app or the assistant writes it.

## What is on the screen

**Top bar.** The **Yeni rapor iste** (Request a new report) button copies a ready-made request to the clipboard, which you paste into your assistant.

**Filters.** All, Last 7 days, Written with a template, Written with a skill. There is also a search box.

**Table.** It has the **Report**, **Type**, **Created** and **Size** columns. **Type** tells you where the report came from. For example, "Site audit report" is made by the app itself. For reports written with a template, the template's name appears.

**Report page.** The report opens in its own isolated frame. Buttons: **Download as HTML**, copy link and print. The link works only on this installation, with no access from outside.

**Report templates.** You reach them from the menu or from the Raporlar screen. A template is a saved recipe that tells your assistant how to write the report: who will read it, which sections it will have, which language it will be written in. Fields:

- **Name**: at most 80 characters, unique in the project.
- **Description**: at most 200 characters. One sentence that says when to use it.
- **Instructions**: at most 3,000 characters.

A project can have at most 10 templates. Deleting a template does not delete the reports made from it.

## How to use it

1. For your first report, click **Download report** on the Site audit screen. The report downloads to your computer and also appears in this list. It starts with the section "N things to do this week".
2. If you work with an assistant, click **Yeni rapor iste**. Paste the copied text into Claude Code, Codex or Cursor. The assistant asks which report you want, reads the data and saves the report here.
3. If you want the same report every month, write a template. In the instruction, write the reader ("the person who runs the site, does not know SEO"), the sections, the order and the tone. If you ask for the template by name, the assistant applies it.
4. To share, click **HTML olarak indir** and send the file. The recipient opens the file in a browser. A copied link works only on the same computer.
5. Keep old reports: in the next conversation, the assistant reads the previous report's summary and compares.

## How the numbers are calculated

The audit report is laid out for A4 print and contains these sections: contents, "N things to do this week", problems, speed measurement, Google index status and sitemap. The index status section uses only saved answers and does not ask new questions.

The lists are limited: 50 addresses per problem, 300 pages, 50 speed rows, 3,000 addresses in the appendix. If the file goes over 400 KB, the lists are shortened.

A report can be at most 500,000 bytes (under 80 KB is recommended). The title is at most 120 characters and is unique in the project. The summary is at most 2,500 characters. A second report with the same title is not accepted. A project can have at most 10,000 reports, and the installation has 5 GB of space in total.

For security, when a report is saved, files that contain a script, an iframe (a box that embeds one page inside another), a form, an external style, an event handler (like onclick), a javascript: link or an automatic redirect are rejected. When a report is opened, it is also shown in a sealed frame with no network access, so a report cannot send anything out without you knowing.

## Frequently asked questions

**Who wrote the report?** The **Type** column tells you. "Site audit report" comes from the app; all others come from the assistant. The report page also shows who saved it.

**Can I edit the report?** Not in the app. Tell the assistant "change this section", and the assistant updates the report.

**I sent the link, and the other person cannot open it.** The link works only on this computer. Send the file with **HTML olarak indir**.

**What should I watch for when writing a template?** A template is a format recipe, not a source of information. Write the sections, the tone and who it is written for. Do not write numbers or claims. The assistant takes the numbers from the data every time.

## Limits

Reports are never published online; you share them by sending the file. A report is only as accurate as the data its writer read. The "How this report was prepared" section at the end of assistant reports lists which tool supplied which information. Trace a number you doubt from there.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
