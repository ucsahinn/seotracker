---
name: seo-triage
description: "Traffic dropped. Work out whether it is even real, where it happened, and when — before changing anything."
---

# seotracker SEO Triage

## Goal

Something fell. Find out **whether it actually fell, where, and when** — and stop before prescribing a fix.

The most expensive mistake after a drop is acting on the wrong cause. A broken analytics tag and a deindexed section look identical from the dashboard, and the fix for one makes the other worse. This skill is a decision tree that separates them in order, cheapest question first.

Use this when the user says traffic dropped, rankings fell, something broke, or asks what happened.

## Required inputs

- `projectId` (use `list_projects`)
- Roughly when they noticed. "Last week" is enough.

## Project context

1. `get_project_context` — the key pages tell you which losses matter and which are noise.
2. Check the research log: a drop already triaged this month does not need triaging twice.
3. On finish: `{ appendResearchLog: { summary: "Triage <date>: <verdict shape>. <one line>" } }`.

## The decision tree

Follow it in order and **stop at the first answer**. Each step is there because it rules out a cause the next step cannot distinguish.

**1. Is there a drop at all?**
`get_google_analytics_organic_overview` with `trend: "daily"`. Look for the day it changed. A gradual slope and a cliff are different problems.

**2. Did every channel fall on the same day?**
`get_google_analytics_traffic_acquisition`, `breakdown: "channel_group"`, `comparePreviousPeriod: true`.

If direct, referral, paid and organic all fell together on one day, **this is almost certainly a measurement break, not an SEO event**. Confirm with `get_google_analytics_measurement_health`: check the streams, the measurement IDs and enhanced measurement. Report the tracking break and stop. Do not continue down the tree — everything below will report a "drop" that did not happen.

This is the single most valuable step here, and it is the one an audit will never take.

**3. Organic only — visibility or clicks?**
`get_search_console_performance`, `dimensions: ["date"]`, both windows.

- Impressions down → the site is being shown less. A visibility loss.
- Impressions flat, clicks down → it is still being shown and chosen less. A CTR loss, usually a title or a SERP change.

These have different fixes and the report must name which.

**4. Which pages?**
`get_search_console_performance`, `dimensions: ["page"]`, both windows. Compute the losses yourself. Concentrated in a handful of pages is a page problem; spread evenly across the site is a site problem.

**5. When did the ranking move?**
`get_ranking_history` with `query:` for the lost terms. Empty archive → say so once, tell the operator it fills when they open the Rankings page, and fall back to `dimensions: ["date"]` filtered to the query.

**6. Did Google drop the pages?**
`inspect_urls` on at most ten of the lost pages. This is the one place the quota is clearly worth spending: it is the difference between "we rank lower" and "we are not in the index". Report Google's own verdict, not an inference.

**7. Two of your pages competing?**
`get_cannibalization`, `last_3_months`. Only when step 4 showed a page losing while a sibling gained.

**8. On-site cause?**
`run_site_audit` only if steps 5-7 point at the site itself — a `noindex`, a 5xx, a redirect that should not be there. A crawl is the most expensive step and the last one, not the first.

## Output format

`h1`: the domain and "düşüş incelemesi".

Open with **one sentence naming the verdict**, which must be one of exactly five:

- **Ölçüm kopması** — the tag, not the traffic.
- **Düşüş bulunamadı** — the numbers do not show one in the window checked.
- **Görünürlük kaybı** — impressions fell.
- **Tıklama kaybı** — impressions held, clicks fell.
- **Sayfa kaybı** — specific pages lost or left the index.

A closed set is the point. It is what stops the report becoming a speculative essay.

Then:

1. **Ne oldu** — the verdict with the numbers behind it and the date, if the data gives one.
2. **Nasıl bulduk** — the steps that ruled things out, in order. This is what lets the reader disagree with you.
3. **Etkilenen sayfalar** — a table, worst first, with both periods' numbers.
4. **Sırada ne var** — at most three actions, the first one being whatever the verdict implies. When the verdict is "düşüş bulunamadı", the next step is to wait and re-check, and saying so is a real answer.
5. **How this report was made** — the skill link line from `seo-report` pointing at `https://github.com/ucsahinn/seotracker/tree/main/.agents/skills/seo-triage`, and which tools answered.

## Guardrails

- **Do not name a cause you cannot show.** Never "a Google update", never "seasonality", never "a competitor". This install cannot observe any of them. The tree tells you *where* and *when*; anything past that is a guess and reads as authority.
- **Stop at the first answer.** Continuing past a confirmed measurement break produces a report full of drops that did not happen.
- Without GA4 the whole "is it real" gate is unavailable. Say that plainly, work from Search Console clicks, and state in the report that a tracking artefact could not be ruled out.
- A three-day window is not evidence. Search Console lags about three days and revises the most recent ones; compare settled periods and pass `dataState: "final"`.
- Report Google's indexing verdict only from `inspect_urls`. A page missing from a crawl or from Search Console is weaker evidence, and the report must say which of the two it is leaning on.
- Change nothing. This skill diagnoses. If the fix is obvious, name it in "sırada ne var" and let the operator decide.
- Tone: calm and plain. Someone reads this while worried; do not add drama they already have. No exclamation points, no em dashes, no severity words that are not literally true.
