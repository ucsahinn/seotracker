# Papercuts

Small, non-blocking friction in the repository itself — the kind that will
waste the next contributor's time too. Log it in the moment; review and fix
entries in a separate, user-requested cleanup pass.

This is not a completed-work log, a bug tracker, or a place for the agent's own
sandbox/shell/network hiccups. Never include secrets, credentials, personal
data, or sensitive paths.

## Open

- [x] `2026-09-26T11:20:00Z` — `claude` — The badseo harness reports 8/49 failing as `NOT CRAWLED`, and **measured on a clean tree it is 8/49 there too** — not a regression, and not a product fault. The fixture site deliberately serves two endlessly-429 pages; `crawl-throttle.ts` accumulates `cooldownMs` and stops for good once it passes `MAX_COOLDOWN_MS` (30 min), which is the same number as the harness's own `CRAWL_BUDGET_MS`. Production handles the stop honestly (`rateLimited: throttle.stopped` becomes the `crawl-rate-limited` issue), so the operator is told. Two separate things to weigh in a pass of their own: the harness budget should not equal the circuit-breaker ceiling, and `recovered()` clears `consecutiveRateLimits` but never relieves `cooldownMs`, so a site that rate-limited once and then behaved for hours still carries the whole debt. **Resolved 2026-09-26:** a served page now repays one first-delay of accumulated cooldown, which is the distinction the guard was missing — thirty minutes of waiting across two thousand good pages is a slow origin worth finishing, thirty across three is one refusing to serve. The existing cumulative-stop test is unchanged, and two new tests pin both halves: one bad URL among hundreds no longer stops the crawl, and an origin that refuses far more than it serves still does. **A residual first-run flake remains, cause not pinned down.** One real cause _was_ found and fixed separately (the fixture worker's rate-limit counter was module state that outlived a run; there is now a `/fixture-reset` the harness calls first). That fix turned an alternating pass/fail into consistent passes on runs 2 and 3. What is left: on a freshly started dev server the first run still fails perhaps half the time. Measured across four restarts — `8/55, pass, pass` in one batch and a clean pass in the next, with the same warm-up request before each. So it is a timing race, not compile-on-demand as first assumed. **Practical rule until someone chases it: run the harness twice and compare the second run against a clean tree before treating a failure as a regression.**

- [ ] `2026-09-03T00:00:00Z` — `claude` — `pnpm ci:check` does not run `pnpm build`, so a route file that pulls `cloudflare:workers` into the client bundle passes every check and still breaks the build (hit on the dynamic-reports branch). Add a build step to `ci:check`, or document that `pnpm build` must be run separately before opening a PR.

- `2026-09-05T23:52:53Z` — `codex` — After `pnpm build` ran alongside an active Vite dev server, browser navigation failed and server functions returned undefined. The server logged `Cannot read properties of undefined (reading 'map')` in `runInRunnerObject` / `loadEntries`. Restarting Vite restored the same dashboard without code changes. Stop and restart the dev server around production builds before browser QA; consider documenting or isolating the shared build/runtime state.

## Deferred

## Resolved

- [x] `2026-09-20T15:00:00Z` — `claude` — Three papercuts named surfaces this fork had already deleted: the web-content review skill and its `src/server/features/sam/` fact sheet, and two entries about `web/`, the marketing site. None was actionable any more. Removed 2026-09-20 rather than left as instructions pointing at directories that do not exist.

- [x] `2026-09-20T13:10:00Z` — `claude` — `analyzeHtml` fused `<h1>One<h1>Two</h1>` into a single heading, so `h1Count` read 1 where a browser and Google see 2 and `multiple-h1` never fired. The cheerio reference shared the tolerance, so the parity suite could not see it. Resolved 2026-09-20: a heading start tag now closes any open heading, as the `<a>` handling already did, and the reference drops descendant headings before reading text, so both sides reproduce the browser's split.

- [x] `2026-09-20T11:30:00Z` — `claude` — A fresh `pnpm --dir badseo install --frozen-lockfile` printed `ERR_PNPM_IGNORED_BUILDS`, skipped the esbuild, sharp and workerd install scripts, and wrote an unanswered `allowBuilds:` block into the tracked `badseo/pnpm-workspace.yaml`, so setting up the audit harness both warned and dirtied the working tree. Resolved 2026-09-20: the three are committed as `false`, verified by running `pnpm --dir badseo run dev`, `pnpm --dir badseo run build` and the audit harness with no install scripts. Revisit only if a future dependency genuinely needs its postinstall.

- [x] `2026-09-17T18:50:14Z` — `codex` — Fumadocs MDX 11 compiles `.md?raw` imports into components, so shared prompt imports pass type checking but crash docs rendering with `trim is not a function`. Resolved 2026-09-17: the web Vite config leaves `?raw` imports to Vite; browser-check shared Markdown prompts when changing this integration.

- [x] `2026-08-20T20:36:32Z` — `codex` — The preview Access check immediately classified a workers.dev 404 as public. Resolved 2026-09-05: 404s use the existing bounded retry loop; exhaustion fails without claiming the preview is protected or public.
- [x] `2026-08-18T03:06:44Z` — `claude` — MCP clients can reject results using cached output schemas after hot reload. Resolved 2026-09-05: `verify-local-mcp` now instructs clients to refresh tool discovery or reconnect after schema edits, before another provider call.
- [x] `2026-08-05T20:59:09Z` — `codex` — `pnpm seed:rank-tracking` failed in Node on the provider-aware schema's `cloudflare:workers` import. Resolved 2026-09-05: the script imports SQLite tables directly, matching `seed-projects.ts`.
- [x] `2026-07-19T04:06:52Z` — `codex` — Website builds require a package-local install even when root dependencies exist. Resolved 2026-09-05: `docs/LOCAL_DEVELOPMENT.md` documents the website install, dev, and validation commands.
- [x] `2026-07-10T21:28:46Z` — `codex` — BadSEO builds require a package-local install even when root typechecking works. Resolved 2026-09-05: local-development docs and `badseo/README.md` explain both dependency installs.
- [x] `2026-07-10T21:32:10Z` — `codex` — BadSEO has no package-local Prettier. Resolved 2026-09-05: its README and local-development docs give the root formatter command.
- [x] `2026-09-05T00:44:38Z` — `codex` — The older, undated BadSEO note described wrong-origin sitemap URLs under direct `wrangler dev` and a broken `pnpm --filter badseo audit` command. Resolved 2026-09-05 through documentation: use the existing Vite dev server and package audit script; the README states the expected sitemap origin and the harness usage comment now matches. Direct Wrangler behavior was not reverified or changed.
- [x] `2026-09-19T17:45:00Z` — `claude` — `compose.yaml` defaulted to a registry image nobody publishes for this fork (`ghcr.io/ucsahinn/seotracker:latest`), so a first `docker compose up` died with `registry: denied`. Resolved the same day: the service now carries a `build:` stanza and defaults to the local tag `seotracker:local`, verified by building and running the container. The lesson generalizes — renaming a fork also has to retarget whatever the upstream publish pipeline used to supply.
- [x] `2026-09-19T18:05:00Z` — `claude` — Every app page logs one console error: `GET /api/auth/get-session 404`. Better Auth exists here only to encrypt and refresh Google tokens and deliberately serves no `/api/auth` route (see `src/lib/auth.ts`), but a client-side probe still calls it. Harmless — the user is resolved server-side from `AUTH_MODE` — just noise in devtools. Pre-existing, not investigated. **Fixed 2026-09-23 (53e7874):** it was not only noise — the sidebar read the operator's email from that call, so the account menu was unreachable dead code. Served from `getCurrentUser` instead; `src/lib/auth-client.ts` deleted.

- `pnpm` rewrites `badseo/pnpm-workspace.yaml` with CRLF on Windows (`core.autocrlf=true`), so `prettier --check` in `ci:check` fails on a file git reports as unmodified. `prettier --write` on that one file clears it; the content never changed.

- `src/server/features/projects/services/projects.test.ts` intermittently times out under full-suite parallelism (`listProjectsEnsuringOne`, ~5s vs ~470ms in isolation) and passes on its own. Not investigated; it makes a green run non-deterministic, so compare the file and test counts rather than trusting the exit code.

- RESOLVED: the `projects.test.ts` flake was `vi.resetModules()` + per-test `await import()`, the pattern CLAUDE.md bans. `projects.ts` holds no module-level state, so the reset bought nothing and cost determinism. Static import now; three consecutive full runs and a shuffled run are green.

- GitHub suspends `push` and `pull_request` workflow triggers on a **forked** repository until the owner clicks "I understand my workflows, go ahead and enable them" in the Actions tab. Verified here: `actions/permissions` reports `enabled: true`, `PUT .../workflows/<id>/enable` returns success, and pushes to `main` still produce zero runs — only `workflow_dispatch` fires. That is why `ci.yml` has a manual trigger. One click in the web UI lifts it permanently.

- RESOLVED: the badseo harness's intermittent `NOT CRAWLED` block. Guessed
  three times -- a page cap, a cold start, a regression from this session's
  own changes -- and it was none of them. Measured by making the harness
  print why it stopped: `4 consecutive 429s tripped the retry breaker`. The
  fixture site serves two pages that answer 429 to everything on purpose; a
  throttle is shared across an origin, and `crawl-throttle` stops a crawl
  after MAX*RETRIES consecutive 429s with no success between them, so at
  `CONCURRENCY = 10` whether a success interleaves was a scheduling race.
  Runs alternated between ~46 and ~57 pages with nothing changed. The guard
  was behaving correctly -- the fixture site was provoking it, and a previous
  pass had neutralised the \_other* breaker (`maxCooldownMs`) for exactly this
  reason and missed this one. Fixed by giving those two URLs a throttle each
  and leaving the rest of the site on production settings, so one page built
  to refuse no longer decides whether the other fifty-odd fixtures get
  checked. Four consecutive runs: 57 pages, crawl completed, 56/56. The
  harness also prints its stop reason now instead of a bare "TRUNCATED".

- `pnpm run dev:agents` and `dev:agents:force` are POSIX-only: `mkdir -p` and
  `tee` do not exist in `cmd.exe`, which is what pnpm runs scripts through on
  Windows, and `mkdir -p .logs` there creates a directory literally named
  `-p`. Run `vite dev` directly, or the script from Git Bash. Not fixed
  because changing it means adding a cross-platform shim for a convenience
  wrapper; noted so the next person on Windows does not debug it twice.

- `.claude/skills/` is a set of symlinks into `.agents/skills/`, and Windows
  checks out symlinks as plain text files unless `core.symlinks=true` (git's
  default on Windows is false). Two of the nine -- `seo-check-in` and
  `seo-triage` -- had been committed that way: mode `100644`, contents the
  literal string `../../.agents/skills/<name>`, so those two skills did not
  resolve while the other seven did. Fixed with
  `git update-index --cacheinfo 120000,<blob>,<path>`, which writes the
  symlink mode without needing the filesystem to support one. Worth knowing
  before adding a tenth: check `git ls-files -s .claude/skills` and expect
  `120000` on every row.

## badseo harness `slow-response` is wall-clock flaky under load

Running `pnpm --dir badseo run audit` while a `docker compose up --build` is
running on the same machine produced two spurious failures — "Noindex (robots
meta)" and "hreflang with an invalid region code", both `extra: slow-response`.
A second run with the machine idle passed 60/60.

`slow-response` compares a real response time against a fixed threshold, so
the fixture server losing the CPU to a container build is enough to trip it on
whichever fixtures happen to be crawled during the spike. Nothing to fix in the
rule — it is measuring what it says it measures — but a harness failure that
names only `slow-response` is worth re-running before believing.
