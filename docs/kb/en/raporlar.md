---
title: Reports and templates
description: Save search and audit reports as standalone HTML files, browse the library, print to PDF and keep templates for your assistant.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

**Reports** is the library of saved HTML reports for the project. A report is a fixed document: opening it does not refresh Google data, and the date it was saved is not the date its data covers.

## Create a report

- **Create search report** opens **Search performance**. Set the period, device, country and search type there, then select **Download report**.
- **Create audit report** opens **Site audit**. Pick an audit there and select **Download report**.
- **Copy report prompt** copies a prompt for Claude Code or Codex. The assistant studies the project and saves its report to this library.

Every report is saved before it downloads. If a download fails, download it again from the library. Saved reports stay readable even if a Google source is later disconnected.

**Templates** are written instructions for your assistant. They do not generate reports by themselves and do not run on a schedule.

## Browse the library

The **Most recently updated report** appears at the top with its saved summary, save time and open and download actions. It is not a current summary of the site. If a report has no summary or no recorded period, the library says so; open the document to see its dates and limits. The app never guesses a report's origin from its title or contents.

Search covers titles and saved summaries. **Last 7 days** shows files saved or updated in the last seven days. The type counts reflect the search and the **Last 7 days** filter. The number of matching reports and the project's total are shown separately.

The library loads 25 reports per page; use **Previous** and **Next** to reach older ones. The default order is last updated, so editing an old report moves it to the top. You can also sort by creation time or title. Search, type, filter, sort order and page are kept in the URL.

Reports made by older versions of the app read **Application report, type not recorded** instead of being counted as audits. The assistant skill or template that produced a report is shown where it was recorded. Size is the stored HTML; a downloaded file can be slightly larger.

## Open, download and print

A report opens in a sandboxed frame with no scripts or network access. Expand the source and save details for its origin, type, size and timestamps. A report keeps the language it was written in; to get another language or current data, create it again from its source screen.

- **Download as HTML** saves a file you can read offline or send to someone.
- **Save as PDF (print)** opens the report in a new tab for printing. If the browser blocks it, allow pop-ups for the app, or use **Open in new tab** and print from there.
- **Full screen** shows the report alone, with exit buttons above and below it.

A link to a report only works on your own installation; send the file instead. If a preview has not opened after 15 seconds, the library offers **Try again** and **Open in new tab**. If the list fails to refresh, the last loaded rows stay with a warning.

## What a search report contains

The cover shows the exact dates, the comparison period, the filters and when the report was generated. Days follow Pacific time; if Google did not report which days are final, the report says the last days were left out based on an assumed lag. The hidden-query share includes queries Google withholds for privacy and rows beyond the row limit. Query and page tables are capped, so their sums are not site totals.

The overlap section states its own period and thresholds, even when it finds nothing; a seven-day report can use a 28-day overlap window. Several pages appearing for one query do not prove lost clicks. Missing long-term or search appearance data is reported as unavailable, not as zero.

A report reads the data again when it is generated. Google can revise past figures, so a report may differ slightly from what the screen showed earlier.

## Regenerating and source identity

A search report is identified by the property, dates and filters; an audit report by its audit ID. Creating the same report again replaces the saved record, even in another language. Assistants cannot overwrite these app reports. If an assistant's report already has the same title, the new save is refused and the existing report is kept.

An audit report names the source site when the audit confirms it, and warns if it belongs to a different site than the project. Older reports are labelled as having an unverified source and date. **Open site audits** opens the audit history; it does not start an audit or create a report. An audit report also records the Search Console period, the source row limit and any stored mobile CrUX data it used.

## Limits

| Item                   | Limit            |
| ---------------------- | ---------------- |
| Template name          | 80 characters    |
| Template description   | 200 characters   |
| Template instructions  | 3,000 characters |
| Templates per project  | 10               |
| Report size            | 500,000 bytes    |
| Report title           | 120 characters   |
| Report summary         | 2,500 characters |
| Reports per project    | 10,000           |
| Storage across install | 5 GB             |

Deleting a template keeps the reports made with it.
