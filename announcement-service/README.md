# seowatcher announcement service

An independent Cloudflare Worker and D1 database hold live announcements for
all seowatcher installs. The application only reads the published feed; it
does not receive or store the administrator token.

## Endpoints

- `GET /health`: service health.
- `GET /api/announcements`: public Turkish/English announcements. Other app
  locales receive English copy. Drafts, scheduled notices and expired notices
  are omitted. Poll totals are public; written answers are never in the feed.
- `POST /api/announcements/:id/responses`: poll or question response. The
  Worker validates the active announcement and option, hashes the participant
  key saved in browser storage, limits duplicate responses for that key in D1,
  and applies an IP rate limit. This is not verified person-level voting; the
  key can be reset or replaced. Treat poll totals as indicative feedback.
- `GET /admin`: the private writing and publishing screen. The page asks for
  the administrator token and keeps it in memory for that tab only.
- `GET /api/admin/announcements`: token-protected, searchable and paginated
  announcement history with status filters.
- `POST /api/admin/announcements`, `PATCH /api/admin/announcements/:id`:
  token-protected draft and publication operations. Published interactive
  announcements and announcements with responses are immutable; clone them to
  create a new draft. Interactive content and options update in one D1 batch.
- `POST /api/admin/announcements/:id/clone`: makes a new draft with a fresh
  publication date and no expiry. It copies the bilingual content and poll
  options, but never copies responses.
- `GET /api/admin/announcements/:id/responses`,
  `DELETE /api/admin/responses/:id`: protected review and deletion of written
  responses. Response history is paginated (50 rows per page by default) so
  older answers remain available instead of being silently truncated.

Written responses are visible to administrators and can contain personal
information despite the warning shown to respondents. There is no automatic
retention expiry; administrators should review and delete responses when they
are no longer needed.

The administrator token must contain at least 32 characters. Never put it in
the application build, a tracked file, a URL, or a browser's saved password
store. It is provisioned as the Worker secret named `ADMIN_TOKEN`.

## Provisioning

The checked-in D1 ID is the database currently bound to the configured live
Worker in its owning Cloudflare account. Keep it when updating that deployment.
For a separate Cloudflare account or environment, create a dedicated D1
database, replace the ID in `wrangler.jsonc` with the ID Cloudflare returns,
then apply `migrations/` to both the local and remote database. Set
`ADMIN_TOKEN` with `wrangler secret put ADMIN_TOKEN`, then deploy this Worker.
The configured response limiter allows 20 requests per 60 seconds per IP and
Cloudflare location. It reduces abuse but is not a strict global cap.

The configured Worker URL is
`https://seowatcher-announcements.vitalikai07.workers.dev` while the site's DNS
zone remains outside Cloudflare. The app's default feed URL is
`https://seowatcher-announcements.vitalikai07.workers.dev/api/announcements`;
builds can override it with `VITE_ANNOUNCEMENTS_FEED_URL`. If DNS is later
moved to the same Cloudflare account, the Worker can also use
`announcements.seowatcher.io`. Verify `/health`, public feed CORS, admin
authentication, scheduled publication, expiry and archive behavior before
announcing the feature. The application refreshes the feed about once a minute
while running and can show app or desktop notifications for new posts; it does
not deliver push while the application is closed.

## Local development

From the repository root, run `pnpm exec wrangler dev --config
announcement-service/wrangler.jsonc`. Put a random local-only `ADMIN_TOKEN` in
`announcement-service/.dev.vars` (that filename is ignored by Git). Initialize
the local D1 database with `pnpm exec wrangler d1 migrations apply
seowatcher-announcements --local --config announcement-service/wrangler.jsonc`.

The application and service use separate databases. The service must be
deployed once before customer installations can receive live updates. No
seotracker account or project identifier is sent; poll/question participation
uses a random browser key stored locally and hashed by the Worker.
