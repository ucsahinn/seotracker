---
name: seo-check-in
description: "Compare this period against the last one and say what changed, whether it matters, and when it happened — saved as a report so the series becomes the site's history."
---

# seotracker SEO Check-in

## Goal

Answer one question: **what changed since last time, and does it matter?**

An audit is a snapshot. This is the second visit — it reads the previous check-in as a baseline, compares two periods, and says what moved, when it moved, and whether the outcome moved with it. Run it monthly.

Use this when asked how the site is doing, whether the work is paying off, what changed this month, or for a recurring report.

## Required inputs

- `projectId` (use `list_projects`)
- Search Console connected. Without it there is nothing to compare; say so and stop.

## What this costs

No crawl, and no URL Inspection quota. That is deliberate: a check-in has to be cheap enough to run every month without thinking about it. If the answer needs a crawl, the honest response is "this needs an audit" — hand off to `seo-audit` rather than half-running one here.

## Project context

1. Call `get_project_context` first. The goal and the key pages decide what counts as "matters": a 10% fall on a page nobody was trying to rank is noise, and the same fall on a money page is the whole report.
2. Read the research log. If a check-in ran in the last two weeks, say so and offer that report instead.
3. On finish, append a log entry: `{ appendResearchLog: { summary: "Check-in <Mon YYYY>: <what moved>. Verdict: <conclusion>" } }`.

## The baseline

`list_reports` and find the previous check-in. Read its **summary**, not its HTML — the summary is what it is for, and pulling the whole page back wastes the context you need for this period's numbers.

No previous check-in means this is the baseline. Say that, print the numbers, save, and stop. Do not invent a comparison.

## seotracker MCP tools

- `get_google_analytics_organic_overview` with `trend: "weekly"` — one call gives the headline movement and the previous period with it. Start here when GA4 is connected: it is the cheapest read that frames everything else.
- `get_search_console_performance` — four calls: current and previous window, each once by `["page"]` and once by `["query"]`. Pass explicit `startDate`/`endDate` rather than a convenience range, so the two windows are exactly the same length, and pass `dataState: "final"` so a half-settled day does not read as a fall.
- `get_ranking_history` — the only tool that answers *when*. Use the summary, then `query:` for at most three terms that moved most. A query that fell in one week is a different story from one that drifted over three months, and the report should say which.
- `get_google_analytics_key_events` with `comparePreviousPeriod: true` — did outcomes move, or only sessions? Traffic that rose while conversions did not is a finding, not a win.
- `get_cannibalization` — only when one page lost position while a sibling gained. Use `last_3_months`; the 100-impression floor makes a 28-day window come back clean on most sites.

## Workflow

1. Resolve the project, read its context and the previous check-in.
2. Fix the two windows. Use the same length for both, ending about three days back for Search Console's lag.
3. `get_google_analytics_organic_overview` for the shape of the period.
4. The four Search Console reads. Compute the deltas yourself from the two windows; do not ask a tool for a comparison it does not offer.
5. Pick what moved: the largest absolute changes among pages and queries, filtered to what the project context says matters. Three to five items, not twenty.
6. For those, `get_ranking_history` with `query:` to date the move. If the archive is empty, say so once, tell the operator the archive fills when they open the Rankings page, and fall back to `get_search_console_performance` with `dimensions: ["date"]`.
7. `get_google_analytics_key_events` to see whether outcomes followed.
8. `get_cannibalization` only if step 5 showed a page losing while a sibling gained.
9. Write and save through `seo-report`, `skill: "seo-check-in"`.

## Output format

`h1`: the domain and the period, e.g. "example.com — Eylül 2026".

Sections in this order:

1. **Verdict** — three to five bullets. Both periods' numbers side by side, the single largest mover, and whether outcomes followed traffic. No prose.
2. **What moved, and when** — one row per item: what it is, both numbers, the change, and the date the archive says it moved. Where the archive is empty, say "tarih bilinmiyor" rather than leaving it blank.
3. **What did not move** — short, and worth including. A page that held its position through a month of work is information, and its absence from the report reads as an oversight.
4. **Outcomes** — sessions against key events. Omit the section entirely when GA4 is not connected rather than filling it with search data wearing an outcome label.
5. **What to do next** — an ordered list, at most three items, each one doable before the next check-in.
6. **How this report was made** — the skill link line from `seo-report` pointing at `https://github.com/ucsahinn/seotracker/tree/main/.agents/skills/seo-check-in`, the two windows as exact dates, and which sources answered.

## Guardrails

- **Never attribute a cause.** No algorithm updates, no seasonality, no competitor activity. This install has no data that could establish any of them, and a confident wrong reason is worse than no reason. "2026-09-14 civarında düştü" is the ceiling.
- Two periods of different lengths are not a comparison. State both windows as dates in the report so the reader can check.
- A percentage on a small number is noise. Below roughly 50 impressions, report the absolute numbers and say the sample is small.
- Traffic up and conversions flat is a finding. Do not report the first without the second when GA4 can answer.
- Missing GA4 means the outcome half is unavailable, not zero. Say which, and do not describe sessions you cannot see.
- Tone: calm and plain. No exclamation points, no drama words, no em dashes, no "Not X. Y." contrasts. Gloss every term of art on first use.
- If nothing moved, say so in one line and keep the report short. A check-in that finds nothing is a good outcome and padding it to look like work is the failure mode.
