---
title: Saved keywords
description: Inspect saved keywords with dated, scoped archive observations.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-27
---

Save important queries from Search performance or Rankings. Saving does not start a new Google tracker: this screen matches your chosen records to observations already stored locally.

## Dates and counts

Choose 30, 90 or 180 days; the default is 90. Exact current and equally long previous dates are shown. Dates use Google's Pacific calendar and an assumed three-day lag, which does not prove archive completeness.

Cards show saved records matching text and tags, observed records, comparable significant movements and unknown rank evidence. Band bars use this same base; selecting one narrows the table. These are records, not all site queries or search volume. Separate saved market records retain their IDs and counts, while archive observations cover all countries and devices.

Position is impression weighted. Matching compacts whitespace and uses Turkish case rules, preserving I/ı versus İ/i. Raw variants are combined by impressions. Missing evidence is never rank zero or a proven loss. Significant movement means at least half a place; a smaller change may still appear in row detail. No comparison differs from unchanged.

## Investigate a record

The table shows the word, average position, change, impressions and tags. On phones, key metrics sit under the word. Open Archive details for the same dates, raw variants, previous mean, observed days and saved market. Creation date and any legacy intent remain in detail; intent is not newly measured. The secondary Search performance link searches containing text over its live last-28-day view, so it is not an exact archive reconciliation.

Every include term must match; none of the exclude terms may match. Each box accepts at most 20 terms. Any selected tag matches, up to 50 selected tags; this is not a limit on tags stored in the project. Tag counts are project-wide assignments. Filters, band, period, sort and page persist in the URL. Clear all also clears an empty active band.

## Repair missing evidence

Disconnected, never imported, partial archive and failed reads have separate explanations. Refresh list only rereads local storage. Use the Rankings archive update action for newer Google observations; connect Search Console first if needed. Google may omit rare queries, so absence from the archive does not prove absence from search.

## Exports and bulk actions

CSV and Sheets use the same filtered population and evidence fields. Existing word, intent, tags and creation columns stay first; appended fields include current/prior position, delta, status, observed days, exact dates, coverage, variants, scope, market, record ID and snapshot. Unknown measurements are blank. If the underlying snapshot changes during export, restart it.

Selection covers this page only. Pending filters or refresh disable actions on stale rows. Removal asks for confirmation; editing a tag does not remove words. Creation time remains the default ordering; position, movement, impressions and word can also be sorted. Inspect declines orders significant paired declines for investigation and does not establish their cause.

**Daily observations.** Request daily history explicitly inside Archive details. It uses the same dates and matching rule, leaves missing days as gaps, supports keyboard date inspection and includes a text list of daily values.

When no saved keywords can be compared, the movement card shows No comparison instead of zero. When all saved keywords were observed, the Position unknown card does not warn about missing observations. Movement and unknown-position card buttons are disabled when they have no matching results.
