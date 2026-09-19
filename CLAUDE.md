# Agent guidance

## What this is

seotracker is a single-user, self-hosted SEO tool. It runs in Docker on the
operator's own machine, authenticates nobody, and reads only free data: Google
Search Console, Google Analytics 4, its own site crawler, and Google PageSpeed
Insights.

It is a fork of every-app/open-seo with every paid-data and multi-tenant surface
removed. When you are tempted to reach for keyword volumes, backlink counts,
competitor rankings or third-party SERP positions: that data is not here and is
not coming back. Build on what Search Console already knows.

## Engineering principles

- Prefer simple, readable, flat code with minimal indirection.
- Search for existing implementations and installed libraries before creating new helpers or abstractions.
- Abstract when it prevents meaningful drift and makes the result simpler to maintain. Avoid speculative or one-use abstraction layers.
- Keep product data normalized and relationships explicit. Do not encode relational data in JSON or text merely to avoid joins.
- For new application-backed backend functionality, default to: TanStack server function -> service -> repository.
- The database is SQLite through D1. There is no second dialect to keep in sync.
- Use idiomatic TypeScript. Use Zod to validate untrusted data and narrow runtime values at trust boundaries.
- Prefer established project helpers and libraries over hand-rolled implementations.
- Prefer idiomatic TanStack Query, Router, and Form patterns for server state, routing, and submitted forms.
- Specs under `specs/` are design records: what a feature does, how it works, the alternatives considered and why they lost.

## Interface

The whole visual language lives in `src/client/styles/app.css`. Seventy-one
files use daisyUI class names, so the theme tokens and the component overrides
at the bottom of that file restyle every screen at once. Change them there
before you change a component.

- **Surfaces** carry a trace of chroma. No pure black, no pure white.
- **Separation is a hairline** (`var(--hairline)`), never a mid-grey 1px box.
  Depth comes from `var(--shadow-raise)`, tinted toward the surface.
- **One radius scale**: `rounded-box` for panels, `rounded-field` for controls,
  `rounded-full` for pills. Mixing them on one screen is a bug.
- **One accent**, reserved for links, focus rings and active state. The primary
  button is near-black, because a blue one competes with the amber and red
  severity chips beside it.
- **Two page widths**, chosen by what the screen holds, not by which file it
  is in: `max-w-(--container-page)` for tables, charts and dashboards;
  `max-w-3xl` for forms and prose. `PageShell` in
  `src/client/components/PageShell.tsx` applies both.
- **Numbers are tabular** everywhere (set on `body`), so columns do not wobble
  as values change.
- Every visible number, date and time goes through `src/client/lib/format.ts`,
  which is pinned to `tr-TR`. Do not call `toLocaleString` at a call site and
  do not add a second formatting module.
- Empty, loading and error states are part of the screen, not an afterthought.
  Reach for `EmptyState` and for skeletons shaped like the content that is
  coming, not a spinner.

The UI is Turkish. MCP tool descriptions and code comments stay English: agents
read the former, and the latter are for whoever edits the file. `<html lang="tr">`
is load-bearing - CSS `text-transform: uppercase` follows it, and without it
"Bilgi" uppercases to "BILGI".

## Testing

- Don't add tests just for the sake of it. A test exists to enforce core behavior or a hard-to-spot edge case that could actually occur.
- Keep tests as simple as possible, and always review them looking for simplifications.
- Test behavior at the public entry point. Assert argument forwarding to a mocked collaborator only when that mapping is the contract.
- Statically import the module under test. `vi.mock` is hoisted, so per-test `await import()` and `vi.resetModules()` are banned unless module-level state must reset — comment why.
- Never re-declare a production class in a test. Import the real one; if the module is too heavy to import, move the class to a leaf module first (see `ga4Errors.ts`, `gscErrors.ts`).
- `beforeEach` sets default mock return values only. Vitest's `clearMocks` already resets call state.
- Fixtures contain only the fields the test asserts on or the types require. Shared shapes get a factory with overrides (see `ga4-test-fixtures.ts`, `tool-test-support.ts`); a fixture longer than its test's assertions is a smell.
- One test per invariant. Don't re-test Zod or a library.
- Don't mock ORM builder chains. Test repositories through services or real SQL evaluation.

## Before you finish

`pnpm run ci:check` runs formatting, dead-code detection, type checking and lint.
`pnpm test` runs the suite. Both must be green.

## Log papercuts

When small, non-blocking repository friction occurs — a retried tool call, a
confusing setup step, a flaky command, a misleading error — append it to
`.agents/PAPERCUTS.md` in the moment and continue the current task. Real bugs and
tracked work are not papercuts, and sensitive data must never be logged.
