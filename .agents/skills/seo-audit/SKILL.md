---
name: seo-audit
description: "Audit a website and deliver a one-page, plain-language SEO report anyone can act on, centered on a single do-this-week action."
---

# seotracker SEO Audit

## Goal

Audit a domain and produce a one-page HTML report that anyone, including a complete SEO beginner, can read once and act on. The whole report exists to support ONE action the owner can take this week; everything else is supporting detail.

Use this when asked for an SEO audit or review of a domain, especially when the output is a shareable report for a non-expert.

## Required inputs

- Domain to audit
- `projectId` (use `list_projects`; if no project matches the domain, create one with `create_project`)

## Project context

The project-context tools are shared with the app and other agents.

1. Call `get_project_context` first and ground the report in it — what the business does decides which findings matter and what the one thing should be.
2. This skill needs `business_overview`. If it is empty, run a minimal inline setup: infer what the business does from the site and confirm it with the user in one question, write it back with `update_project_context`, then continue the audit. Never front-load the full interview; suggest `seo-project-setup` at the end for the rest.
3. Check the research log before you start. If the same audit ran within the last 30 days, say so and offer to read that report instead of crawling the site again.
4. On finish, write back what is durable — a corrected `business_overview`, the pages the report singles out via `addKeyPages` — and append a research log entry: `{ appendResearchLog: { summary: "Site audit: <domain>. Verdict: <conclusion>" } }`.

## Deliver as a report

Deliver through the `seo-report` skill, saving with `skill: "seo-audit"`. If that skill is not available, say so and stop before writing HTML.

## seotracker MCP tools

- `whoami`: confirm the connection before anything else. If seotracker is not connected, stop and ask the user to connect it.
- `list_projects` / `create_project`: resolve the `projectId`.
- `run_site_audit`: start the crawl (default page budget). Leave Lighthouse off (its default) — it adds several minutes and this report doesn't need it; pass `runLighthouse: true` only when the user asks for performance/Core Web Vitals depth. Then check `get_audit_status` (the crawl takes a minute or two — wait between checks rather than polling in a loop) and read `get_audit_issues`. Use `get_audit_pages` when per-page evidence helps.
- `get_search_console_performance`: the site's own clicks, impressions, CTR, and average position, by query or by page. This is what the site actually earns in Google and it is usually the deciding data for the "one thing". It only answers when Search Console is connected on the project's Integrations page; when it is not, say so in the report rather than guessing at demand.
- `get_search_opportunities`: pages already ranking in positions 4-20, joined with GA4 organic landing-page outcomes and scored by demand, business value, and how close the page is. The fastest way to name a page worth improving on a site that already has some traffic. Needs Search Console, and GA4 for the business-value half.
- `inspect_urls`: Google's URL Inspection for up to 10 URLs per call — whether Google has indexed the page, why not, when it last crawled it, and which canonical Google chose. The crawl only shows whether a page *could* be indexed; this shows what Google actually did. Quota is 2,000 URLs per property per day, so use it on the pages the report names.
- `get_google_analytics_organic_landing_pages` / `get_google_analytics_organic_overview`: what organic visitors did after they arrived. Use when the question is whether the traffic a page gets is worth anything.
- `get_cannibalization`: queries where two of the site's own pages compete for the same result. Search Console cannot show this — it reports a query's position without naming the page that earned it, so a split looks healthy there. Three things decide whether the call is worth making and how to read it. **The noise floor is 100 impressions per query in the window**, so on a small site `last_28_days` will almost always come back clean; use `last_3_months` or `last_6_months` there or the call tells you nothing. **Check `truncated`** — Google sorts by clicks descending and cuts the tail, which is exactly where this lives, so a truncated answer means "not fully checked", not "nothing found", and the report must say which. And **the fix is usually not a merge**: what actually happens is that Google picked a page you did not intend, so the action is to decide which page you meant and point internal links at it. Merging two pages that answer different questions makes things worse. Only recommend a merge after fetching both pages and confirming they genuinely answer the same question.
- `get_ranking_history`: the local archive, which outlives Google's 16-month window. Use it to answer *when* something changed rather than *what* it is now — a query that fell from 4 to 11 in one week is a different story from one that has always been at 11, and the report should say which. **Expect it to be empty on an agent-only install**: nothing schedules the archive, it fills only when someone opens the Rankings page in the app. When it is, say so once, tell the operator to open that page, and fall back to `get_search_console_performance` with `dimensions: ["date"]`, which always works inside Google's 16 months. Do not report "no change" from an empty archive.

Keep the run tight: one crawl, one or two Search Console reads, and `inspect_urls` only on the pages the report will actually mention.

## Workflow

1. `whoami`, then resolve the `projectId`.
2. `run_site_audit` for the domain (Lighthouse stays off unless the user asked for performance depth). While it crawls, pull `get_search_console_performance` for the last 3 months — once by query and once by page — and `get_search_opportunities` when GA4 is connected too.
3. When the crawl finishes, read `get_audit_issues`. Also call `get_cannibalization` once, with a window wide enough to clear the 100-impression floor — `last_3_months` unless the site is large. It is one Search Console call and it finds a class of problem the crawl cannot see.
4. If the audit comes back broken or nearly empty (certificate errors, 5xx, one page crawled): investigate before writing. Check the certificate and redirect variants yourself, and search the web for the business. A dead domain often has a live successor site, which flips the whole recommendation to "redirect the old domain".
5. Verify every finding you plan to report against the live page HTML by fetching pages yourself. When a finding is about indexing — a page that should rank and does not appear in Search Console at all, a canonical you suspect Google overrode, a `noindex` you want confirmed — run `inspect_urls` on those URLs and report Google's own verdict rather than inferring it from the crawl.
6. Decide the one thing. Derive it from the data, never from generic advice. Common patterns:
   - Pages Google has not indexed, or indexed under a canonical the owner did not choose: fix the specific cause `inspect_urls` names.
   - Real impressions, no clicks: rewrite the title and description of the one page with the most impressions and the worst CTR.
   - A page stuck at position 5 to 10 on a query that matters: improve that page, not the whole site.
   - Dead domain, live successor site: permanent redirect via hosting support, with the exact sentence to send them.
   - Blocked or noindexed pages: remove the block.
   It must be doable this week by a non-technical person, with copy-paste-ready mechanics included.
7. When the site is healthy, propose a starting focus area from the site's own Search Console queries: take the queries with real impressions sitting in positions 4 to 20, pick one theme, and name 3 to 5 of them with the page that should own each. Near-ranking queries are demand Google has already measured for this exact site, so prefer them over guesses about the market. Skip this step entirely when the site is down, and say plainly that there is no demand data yet when Search Console is not connected or the property is new.
8. Review before delivering: run an adversarial pass with a second agent or model if your environment has one, otherwise do a fresh self-review. Give the reviewer the verified facts and have it attack four things: claims beyond the facts, unglossed jargon, anything overwhelming for a beginner, and dramatic language. The reviewer may also flag true facts it was not given; check those against your evidence instead of "fixing" them.
9. Write and save the report through the `seo-report` skill (see Output format).

## Output format

`h1`: the domain. Then one or two opening sentences: the overall state and the one thing.

If a report template applies (see `seo-report`), its sections and tone replace this list.

Sections in this order:

1. **Verdict** — three to five bullets, one line each: the state of the site, the numbers that matter (pages crawled and indexable, clicks and impressions over the period, how many of the named pages Google has actually indexed), and the biggest gap. No prose. **Name the crawl budget against the site's apparent size.** `run_site_audit` defaults to 50 pages; "50 of roughly 900 pages crawled" and "50 pages crawled" say very different things, and only the first is honest on a large site. Raise `maxPages` instead when the site warrants it.
2. **Top priority** — one finding, with copy-paste-ready mechanics.
3. **Small fixes** — one finding each, 5 to 10 max, ordered by impact. Each shows the exact evidence: a quoted tag, a number, or a URL.
4. **Where to focus first** (healthy sites only) — one sentence, then a table of 3 to 5 near-ranking queries with impressions and average position and the page that should own each, plus a bar chart when the impression counts are worth comparing. Omit the whole section when the site is down or Search Console is not connected.
5. **What's working now** — a short list.
6. **What to do next** — an ordered list, the one thing first.
7. **How this report was made** — opens with the skill link line from `seo-report`, pointing at `https://github.com/ucsahinn/seotracker/tree/main/.agents/skills/seo-audit` ("seotracker SEO Audit skill"), then what the tools reported and what you verified by hand.

Use a note for anything you could not verify or where the site's goal makes a standard recommendation the wrong call.

## Guardrails

- Tone: calm and plain. No exclamation points, no drama words, no em dashes, no "Not X. Y." contrasts, no filler. Severity words only where literally true (a down site is critical; a long title is not).
- Gloss every term of art in plain English on first use: canonical, meta description, alt text, crawler, 301, structured data, indexed.
- Skip nitpicks that do not matter for the specific site. A beginner report with twenty findings has failed.
- Missing Search Console data means "not connected" or "no recorded impressions", not a penalty; say which one and move on rather than dramatizing it.
- Only claim a page is or is not indexed when `inspect_urls` said so. A page missing from the crawl or from Search Console is weaker evidence, and the report should say which of the two it is leaning on.
- Favor queries the site can win now: real impressions, position 4 to 20, clear intent. Do not list head terms where the site has never been seen.
- Separate what the tools reported from what you verified yourself, and note both in the method footer.
