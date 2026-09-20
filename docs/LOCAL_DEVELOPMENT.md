# Local Development

## Prerequisites

- Node.js 20+
- [Corepack](https://nodejs.org/api/corepack.html) (bundled through Node.js 24; install it separately on Node.js 25+)

## Local Development Workflow

```sh
# Activates the exact pnpm version declared in package.json.
corepack enable
pnpm install --frozen-lockfile

# Run once per fresh local DB
pnpm run db:migrate:local
```

Verify that `pnpm --version` reports the version declared by the
`packageManager` field in `package.json`. An older global pnpm may reject
the repository's lockfile as incompatible.

Create `.env.local`:

```sh
echo AUTH_MODE=local_noauth > .env.local
```

`AUTH_MODE=local_noauth` is **required**, not optional. Unset, `getAuthMode`
falls back to `cloudflare_access` on purpose, and with no `TEAM_DOMAIN` /
`POLICY_AUD` every request then fails with a configuration error. Docker does
not hit this because `compose.yaml` sets the variable itself.

Two more, both genuinely optional:

- `PAGESPEED_API_KEY` for the speed phase of an audit. Everything else works
  without it. See [`PAGESPEED_API_KEY.md`](./PAGESPEED_API_KEY.md).
- `PORT` if 3001 is taken.

> `.env.example` is still the upstream file and describes DataForSEO, hosted
> auth and Postgres, none of which exist here. Do not copy it; the list above
> is what this fork reads.

The Google OAuth client is not an environment variable: enter it in the app
under **Ayarlar → Google bağlantısı**. See
[`SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md`](./SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md).

Run locally:

```sh
# Option 1
pnpm run dev

# Option 2 (Recommended)
# This log file makes it easier for your coding agent to debug.
mkdir .logs
touch .logs/dev-server.log

# This command uses portless, which is great for worktrees. It also pipes logs to that fixed file, which is helpful for agent debugging output.
pnpm dev:agents
```

`pnpm dev:agents` runs through [portless](https://github.com/vercel-labs/portless) at `http://seotracker.localhost:1355` by default.

When using a git worktree, [portless](https://github.com/vercel-labs/portless) prefixes the branch name, for example `http://feature-name.seotracker.localhost:1355`.

## BadSEO

The audit test site (`badseo/`) is a separate pnpm project with its own
lockfile. The root install does not install its dependencies:

```sh
pnpm --dir badseo install --frozen-lockfile
pnpm --dir badseo run dev
# Validate BadSEO changes
pnpm --dir badseo run build
```

Run its audit harness from another terminal while the dev server is running,
pointing at whatever port Vite reported:

```sh
pnpm --dir badseo run audit http://127.0.0.1:8787
```

The harness crawls every fixture and asserts the exact set of issues each page
is engineered to produce, so it is the end-to-end check for anything that
touches the crawler, the page analyzer or the issue registry. Expect it to
take a few minutes: two fixtures answer 429 on purpose, and the crawler backs
off globally when they do.

Use the root formatter for BadSEO:

```sh
# From the repository root
pnpm exec prettier --write "badseo/**/*.{ts,tsx,json,jsonc,md}"
```

See [BadSEO's README](../badseo/README.md) for fixture and audit instructions.

## Database Commands

Generate migration:

```sh
pnpm run db:generate
```

Migrate local DB:

```sh
pnpm run db:migrate:local
```

## Database backend

D1 (SQLite) is the only backend. The Postgres option was removed with the
rest of the multi-tenant surface, so there is no second dialect to keep in
sync.

## Auth Modes

There are two, and only two (`src/lib/auth-mode.ts`):

- `AUTH_MODE=local_noauth`: trusted local mode, no auth check, injects
  `admin@localhost`. This is what Docker uses and what local development
  needs.
- `AUTH_MODE=cloudflare_access` (the fail-closed default when unset):
  validates Cloudflare Access JWTs (`cf-access-jwt-assertion`) using
  `TEAM_DOMAIN` + `POLICY_AUD`. It exists for operators who put the container
  behind Cloudflare Access; without both variables it refuses every request
  rather than letting anyone in.

A set-but-unrecognized value logs an error and falls back to
`cloudflare_access`. `AUTH_MODE=hosted` used to exist upstream and does not
here.
