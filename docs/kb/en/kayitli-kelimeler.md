---
title: Saved keywords
description: Follow the queries you care about with dated Search Console observations from the local archive, and see which ones moved.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-27
---

**Saved keywords** is your shortlist of queries. You add them from **Search performance** or **Rank tracking** with **Save as keyword**. Saving does not start a separate tracker at Google: the screen matches your list against Search Console observations already stored in the local archive, which **Rank tracking** fills.

## Period and dates

Choose 30, 90 or 180 days; the default is 90. The screen shows the exact dates of the current period and of the previous period of equal length. Dates follow Google's Pacific calendar and assume a three-day reporting lag. That assumption does not prove the archive is complete for those dates.

## Summary cards

The cards count the saved keywords that match your text and tag filters: how many were observed, how many moved significantly between the two periods, and how many have no position data (**Position unknown**). The band bars use the same set; select a band to narrow the table. These counts cover your saved keywords only, not every query of the site, and they are not search volume.

When no keyword can be compared, the movement card says **No comparison** instead of zero. When every saved keyword was observed, the **Position unknown** card shows no warning. A card's button is disabled when it has no matching keywords.

## How keywords are matched and measured

- Matching ignores extra spaces and follows Turkish case rules, so `I`/`ı` and `İ`/`i` are treated as different letters.
- All raw query variants that match a keyword are combined, weighted by impressions.
- Position is the impression-weighted average.
- A significant movement is a change of at least half a position. Smaller changes are visible in the row's details.
- A keyword without observations is never shown as position zero or as a proven loss. "No comparison" is different from "No change".

Keywords saved for a specific market keep their own record and counts, but archive observations always cover all countries and devices.

## The table

The table shows the keyword, average position, change, impressions and tags. On a phone the key figures sit under the keyword. You can sort by date added (the default), position, change, impressions or keyword. **Review declines** sorts the significant declines first so you can investigate them; it does not explain their cause.

**Archive details** on a row shows the same dates, the matched raw variants, the previous average, the number of observed days and the saved market. The date the keyword was added and any intent recorded by older versions also appear there; intent is not measured again. **Show daily archive observations** loads the daily history for the same dates on request. Missing days stay as gaps, the dates can be inspected with the keyboard, and a text list of the values is included.

The **Search performance** link on a row searches for the keyword text in that screen's live last-28-day view. It is a quick look, not an exact match of the archive figures.

## Filters, selection and bulk actions

- Include terms must all match; exclude terms must all be absent. Each box takes up to 20 terms.
- Selecting several tags shows keywords that have any of them, up to 50 selected tags. Tag counts are project-wide.
- Filters, band, period, sort order and page are stored in the URL. **Clear all** also clears an active band that has no results.

A selection covers the current page only. While a filter or refresh is pending, actions on the old rows are disabled. Removing keywords asks for confirmation. Editing or deleting a tag never deletes keywords.

## Exports

**Download CSV** and **Export to Sheets** export the filtered keywords. The keyword, intent, tags and date added come first. The remaining columns are current and previous position, change, status, observed days, exact dates, coverage, variants, scope, market, record ID and snapshot. Unknown values are left blank. If the data changes during an export, start the export again.

## When data is missing

The screen explains each case separately: Search Console not connected, archive never imported, archive incomplete for the period, or a failed read. **Refresh list** only re-reads the local database. To fetch newer data from Google, update the archive on **Rank tracking**, after connecting Search Console if needed. Google omits rare queries, so a keyword missing from the archive may still appear in search.
