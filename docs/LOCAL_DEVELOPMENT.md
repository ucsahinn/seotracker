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

Configure `.env.local`. Nothing in it is required; create it only for one of
these:

1. `AUTH_MODE=local_noauth` for normal local development.
2. `PAGESPEED_API_KEY` for the speed phase of an audit. Everything else works
   without it. See [`PAGESPEED_API_KEY.md`](./PAGESPEED_API_KEY.md).
3. `PORT` if 3001 is taken.

> `.env.example` is still the upstream file and describes DataForSEO, hosted
> auth and Postgres, none of which exist here. Ignore it; the list above is
> what this fork reads.

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

## Website and BadSEO

The marketing website (`web/`) and audit test site (`badseo/`) are separate
pnpm projects with their own lockfiles. The root install does not install their
dependencies. From the repository root, install the project you plan to work on:

```sh
# Marketing website
pnpm --dir web install --frozen-lockfile
pnpm --dir web run dev
# Validate website changes
pnpm --dir web run types:check
pnpm --dir web run build

# Audit test site (keep the root dependencies installed for its audit harness)
pnpm --dir badseo install --frozen-lockfile
pnpm --dir badseo run dev
# Validate BadSEO changes
pnpm --dir badseo run build
```

Run BadSEO's audit harness from another terminal while its dev server is running:

```sh
pnpm --dir badseo run audit http://localhost:8787
```

Use the root formatter for BadSEO; the website has its own formatter:

```sh
# From the repository root
pnpm exec prettier --write "badseo/**/*.{ts,tsx,json,jsonc,md}"
pnpm --dir web run format:write
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

## Postgres backend (optional)

D1 (SQLite) is the only backend. The Postgres option was removed with the
rest of the multi-tenant surface, so there is no second dialect to keep in
sync.

## Auth Modes

- `AUTH_MODE=cloudflare_access` (default): validates Cloudflare Access JWTs (`cf-access-jwt-assertion`) using `TEAM_DOMAIN` + `POLICY_AUD`.
- `AUTH_MODE=local_noauth`: local trusted mode, no auth check, injects `admin@localhost`.
- `AUTH_MODE=hosted`: Better Auth-backed email/password mode. Requires Better Auth schema generation plus `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.

Dev scripts do not set `AUTH_MODE`, so you can test another mode by changing it in `.env.local`.

For Cloudflare deployments, ensure Cloudflare Access is enabled on your Worker route/domain and provide `TEAM_DOMAIN` + `POLICY_AUD` in environment variables.
