/**
 * Checks first run by the site audit overhaul (migration 0065), which is
 * also when every audit started storing a site facts row. An audit without
 * that row predates them and never ran these checks, so for it they are
 * unknown, never passed, and never compared with a newer audit as if they
 * had been fixed or newly broken.
 *
 * A check added later needs its own marker, not a place in this list: the
 * checks added with migration 0067 record their measurement per audit
 * (`recorded-checks.ts`).
 */
export const CHECKS_SINCE_SITE_FACTS: ReadonlySet<string> = new Set([
  // Site probes.
  "ai-crawlers-blocked",
  "domain-expiring-soon",
  "html-too-large",
  "missing-clickjacking-protection",
  "missing-dmarc",
  "missing-favicon",
  "missing-hsts",
  "missing-llms-txt",
  "missing-referrer-policy",
  "missing-spf",
  "missing-x-content-type-options",
  "no-compression",
  "no-https-redirect",
  "not-found-redirects-home",
  "robots-disallow-all",
  "robots-missing-sitemap-line",
  "slow-ttfb",
  "soft-404-on-missing-page",
  "ssl-expiring-soon",
  "ssl-expiring-very-soon",
  "www-and-apex-both-serve",
  // Per-page signals and the checks across them.
  "analytics-id-mismatch",
  "analytics-tag-missing",
  "blank-target-without-noopener",
  "dom-too-deep",
  "dom-too-large",
  "duplicate-ids",
  "form-input-without-label",
  "images-legacy-format",
  "images-not-lazy",
  "javascript-href-links",
  "low-text-ratio",
  "meta-keywords-present",
  "near-duplicate-content",
  "og-incomplete",
  "structured-data-recommended-props-missing",
  "structured-data-required-props-missing",
  "title-equals-h1",
  "title-pixel-too-wide",
  "twitter-card-missing",
  "viewport-zoom-disabled",
]);
