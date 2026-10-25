# seowatcher announcement service

An independent Cloudflare Worker and D1 database hold live announcements for
all seowatcher installs. The application only reads the published feed; it
does not receive or store the administrator token.

## Endpoints

- `GET /health`: service health.
- `GET /api/announcements`: public Turkish, English, German, French, Italian
  and Portuguese announcements. Drafts,
  scheduled notices and expired notices are omitted. The endpoint uses ETags
  and permits public cross-origin reads.
- `GET /admin`: the private writing and publishing screen. The page asks for
  the administrator token and keeps it in memory for that tab only.
- `GET /api/admin/announcements`, `POST /api/admin/announcements`, and
  `PATCH /api/admin/announcements/:id`: token-protected draft and publication
  operations.

The administrator token must contain at least 32 characters. Never put it in
the application build, a tracked file, a URL, or a browser's saved password
store. It is provisioned as the Worker secret named `ADMIN_TOKEN`.

## Provisioning

The checked-in D1 ID is a local-only placeholder. Before deployment, create a
dedicated D1 database, replace the ID in `wrangler.jsonc` with the ID Cloudflare
returns, then apply `migrations/` to both the local and remote database. Set
`ADMIN_TOKEN` with `wrangler secret put ADMIN_TOKEN`, then deploy this Worker.

The configured Worker URL is
`https://seowatcher-announcements.vitalikai07.workers.dev` while the site's DNS
zone remains outside Cloudflare. The app's default feed URL is
`https://seowatcher-announcements.vitalikai07.workers.dev/api/announcements`;
builds can override it with `VITE_ANNOUNCEMENTS_FEED_URL`. If DNS is later
moved to the same Cloudflare account, the Worker can also use
`announcements.seowatcher.io`. Verify `/health`, public feed CORS, admin
authentication, scheduled publication, expiry and archive behavior before
announcing the feature.

## Local development

From the repository root, run `pnpm exec wrangler dev --config
announcement-service/wrangler.jsonc`. Put a random local-only `ADMIN_TOKEN` in
`announcement-service/.dev.vars` (that filename is ignored by Git). Initialize
the local D1 database with `pnpm exec wrangler d1 migrations apply
seowatcher-announcements --local --config announcement-service/wrangler.jsonc`.

The application and service use separate databases. The service must be
deployed once before customer installations can receive live updates. No user
or project identifiers are sent to this service.
