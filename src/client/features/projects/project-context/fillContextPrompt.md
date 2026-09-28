Fill in the shared seotracker context for my project "{{PROJECT}}".

Project ID: {{PROJECT_ID}}
{{SITE}}
{{STATE}}

Use the `seo-project-setup` skill if you have it — it is written for exactly this. If you do not have it, follow this shorter version:

1. `get_project_context` with the project ID above, so you extend what is there instead of overwriting it.
2. Read the site itself. `get_audit_pages` returns the last crawl's titles, descriptions and internal link counts, which is how you find the pages carrying the site. Fetch the pages themselves where the crawl is not enough.
3. Measure before you write a goal: `get_index_coverage` for what Google has decided about these pages, `get_search_console_performance` for what the site earns today.
4. Write with `update_project_context`: the `business_overview`, `current_goal`, `positioning` and `writing_preferences` sections, plus `addCompetitors` and `addKeyPages`. Give every key page a role — `money`, `hub`, `spoke` or `other`.
5. Finish with `appendResearchLog` so the next session knows what you already looked at.

Rules:

- Do not invent. Every claim traces to a page on the site or to a measurement you ran.
- Do not guess the competitor list. If the site has its own comparison or alternatives page, take the list from there and say when it was checked. Otherwise propose a list and ask me before saving it.
- No number you did not measure.
- Write the stored text in Turkish. The app's interface is Turkish and I read these sections there.
- Tell me what you wrote when you are done, and say which parts are inference rather than something the site states.
