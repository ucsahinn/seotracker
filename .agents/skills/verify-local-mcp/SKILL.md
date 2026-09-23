---
name: verify-local-mcp
description: Verify the seotracker MCP server end-to-end on a local dev server — the scripted smoke check and protocol-level correctness first, then a headless-agent consumer probe that tests tool ergonomics (descriptions, schemas, output size, errors, async flows) without the maintainer manually driving an MCP client. Use after adding or changing MCP tools, or when asked to check that the MCP "works" or "is ergonomic".
metadata:
  internal: true
---

# Verify local MCP

Two layers, in order. The protocol layer proves the server and the upstream Google APIs behave; the consumer layer proves an agent that has never seen the code can use the tools well. They catch different bugs — protocol testing found source quirks (a crawl that finishes with one page because the start URL redirects off-origin, Search Console returning no `position` for the `discover` search type), the consumer probe found ergonomics failures (audit rows overflowing client token budgets, a disconnected integration surfacing as a raw upstream error instead of a connect link). Do both.

## 1. Boot

- `.env.local` needs `AUTH_MODE=local_noauth`. Google Search Console and GA4 tools additionally need the instance's Google OAuth client configured and the integration connected on the project's Integrations page; PageSpeed Insights works without a key but rate-limits to 429 quickly, so set `PAGESPEED_API_KEY` when testing Lighthouse runs. Never print a key or a token.
- Start `pnpm dev:agents` in the background. The server URL is branch-prefixed: `http://<branch-suffix>.seotracker.localhost:1355` (the exact URL is printed on boot; logs tee to `.logs/dev-server.log`).
- With `local_noauth`, `/mcp` needs no token. Vite hot-reloads server code, so fix → re-call without restarting.
- After changing a tool's input or output schema, refresh the client's tool discovery (`tools/list`) or reconnect the MCP client before calling it again. Clients cache validators from the previous tool list and will reject valid results after a long crawl has already run.

## 2. Scripted smoke, then targeted protocol calls

Start with the repo's own end-to-end check, which drives the MCP endpoint the way an agent would (health, app shell, `tools/list`, `create_project`, `run_site_audit`, poll `get_audit_status`, `get_audit_issues`, `list_projects`):

```bash
pnpm run verify:local            # defaults to http://127.0.0.1:3001
pnpm run verify:local http://<branch-suffix>.seotracker.localhost:1355
```

It exits non-zero and names the failing check. Anything it does not cover, drive as raw JSON-RPC against `/mcp` — the layer for asserting exact shapes and forcing edge cases:

```bash
curl -sS http://<url>/mcp \
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
# tools/call: {"method":"tools/call","params":{"name":"<tool>","arguments":{...}}}
```

- Bootstrap: `list_projects`, then `create_project` if empty — most tools need a `projectId`.
- Test the happy path AND at least one edge per changed tool: an empty result (a date window with no data, an obscure query), an invalid identifier, and for the audit the full lifecycle including polling `get_audit_status` to completion with the returned `auditId`.
- Every Google-backed tool has a second happy path worth testing: the **disconnected** one. With no Search Console or GA4 connection, the tool must answer with `ok: false`, a reason, and a connect URL — never a stack trace and never an invented number.
- Respect the real limits: keep `maxPages` at 10-20, leave `runLighthouse` off unless that is what you are testing, and remember `inspect_urls` takes at most 10 URLs per call against a 2,000-URL-per-property-per-day quota — do not burn a real property's daily quota on a smoke test.

## 3. Consumer probe (the ergonomics test)

Spawn a headless Claude subprocess connected as a real MCP client. Write a config:

```json
{
  "mcpServers": {
    "seotracker-local": { "type": "http", "url": "http://<url>/mcp" }
  }
}
```

Then run a NATURAL task — never name the tools; whether the model finds them from descriptions alone is the test:

```bash
claude -p "<natural task a customer would ask>. Keep it small: crawl at most 20 pages, inspect at most 10 URLs.
Deliver two sections: 1. FINDINGS — the task result. 2. MCP FEEDBACK — critique the MCP as a first-time consumer:
were descriptions enough to pick tools without trial and error? confusing schemas, surprising output shapes or sizes,
unclear errors? Did the audit's background/polling flow behave as described? When a data source was not connected,
did the tool tell you how to fix it? List anything that made you hesitate or retry." \
  --mcp-config mcp-local.json --strict-mcp-config \
  --allowedTools "mcp__seotracker-local,mcp__seotracker-local__*" \
  --model sonnet --max-turns 30
```

Use `--model sonnet` as the typical-client proxy — if sonnet navigates it cold, weaker clients likely can too. Read FINDINGS for correctness (did it get real, sensible data?) and MCP FEEDBACK for the rubric below.

Run the probe twice when the change touches a Google-backed tool: once with the integration connected and once without. Both paths are shipped behavior, and the disconnected one is what most new self-hosters hit first.

## 4. Ergonomics rubric — what feedback to act on

- **Tool selection**: the probe should pick the right tool first try. With 30 tools, nine of them Analytics reads, a wrong-tool detour means a description needs a sharper "use this when / not this" sentence.
- **Schemas**: every constraint enforced silently must be in the field's `.describe()` (units, ranges, defaults, what is ignored when). If the probe guessed-and-retried an input, encode the rule server-side (coerce/clamp) or document it — prefer coercing.
- **Output size**: budget roughly a few KB per row. A 10,000-page crawl or a 1,000-row Search Console window must be trimmed or paged to the fields the tool's job needs; point to the per-page tool for the full shape.
- **Errors**: actionable, never a raw upstream field name without a hint at the fix. A quota or rate-limit refusal (PageSpeed 429, URL Inspection daily cap) must say which limit was hit and when to retry, not fail anonymously.
- **Async copy**: descriptions must match typical latency ("runs in the background — poll `get_audit_status`") and the polling path must actually work when driven by the probe, not just by curl.
- **Honesty about what is missing**: no description may imply data this build does not have — search volume, keyword difficulty, backlinks, competitor keyword exports, third-party rank tracking. If the probe went looking for one of those, the copy that sent it there is the bug.

## 5. Iterate and clean up

Fix findings → hot-reload picks them up → re-verify just the changed behavior via curl (cheap) → rerun `pnpm run verify:local` and the full consumer probe once per iteration round (they re-test selection and flow, not just the fix). When done: stop the dev server background task, run the repo's tests and `pnpm run ci:check`, and fold genuine upstream quirks into code comments or tests so the next agent doesn't rediscover them.
