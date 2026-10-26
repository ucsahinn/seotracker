/**
 * What the site-level probes learned about the audited site.
 *
 * Every field is nullable and null means "not measured" (the probe did not
 * run, the request failed, the third-party lookup timed out). A check reads
 * a fact only when it is known; missing data is never a finding.
 *
 * This crosses a Workflow step boundary, so lists are capped where they are
 * built and the whole object stays a few kilobytes.
 */

/** Robots user agents whose access to "/" is recorded. */
export const ROBOTS_CHECKED_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
] as const;

export type RobotsCheckedBot = (typeof ROBOTS_CHECKED_BOTS)[number];

/** The search engines; every other checked bot is an AI crawler. */
export const SEARCH_ENGINE_BOTS: readonly RobotsCheckedBot[] = [
  "Googlebot",
  "Bingbot",
];

export const DNS_RECORD_TYPES = [
  "A",
  "AAAA",
  "NS",
  "MX",
  "CAA",
  "SPF",
  "DMARC",
] as const;

export type DnsRecordType = (typeof DNS_RECORD_TYPES)[number];

export type DnsRecord = { type: DnsRecordType; value: string };

export type StartPageFacts = {
  finalUrl: string | null;
  status: number | null;
  redirectHops: number | null;
  ttfbMs: number | null;
  totalMs: number | null;
  /** Decoded body bytes read, capped at the probe's read limit. */
  htmlBytes: number | null;
  contentType: string | null;
  contentEncoding: string | null;
  cacheControl: string | null;
  server: string | null;
  xPoweredBy: string | null;
  hsts: string | null;
  cspPresent: boolean | null;
  /** CSP carries a frame-ancestors directive. */
  cspFrameAncestors: boolean | null;
  xContentTypeOptions: string | null;
  xFrameOptions: string | null;
  referrerPolicy: string | null;
  permissionsPolicy: string | null;
  /** Response headers as served, capped in count and length. */
  headers: { name: string; value: string }[];
};

export type HttpsRedirectFacts = {
  /** Status of the first answer to http://host/. */
  status: number | null;
  /** Where the redirect chain from http:// ended. */
  finalUrl: string | null;
  hops: number | null;
  /** True when the chain ends on https. Null when http:// did not answer. */
  redirectsToHttps: boolean | null;
};

export type HostVariantFacts = {
  canonicalHost: string;
  alternateHost: string;
  /** First answer from the alternate host; null when it did not answer. */
  alternateStatus: number | null;
  /** True when the alternate host 3xx-redirects onto the canonical host. */
  alternateRedirectsToCanonical: boolean | null;
};

export type NotFoundFacts = {
  probeUrl: string;
  status: number | null;
  redirectedHome: boolean | null;
  bodyBytes: number | null;
};

export type FaviconFacts = {
  /** The page declares an icon with <link rel="icon">. */
  declared: boolean | null;
  url: string | null;
  /** Status of the icon URL; null when not fetched or off-site. */
  status: number | null;
  /** A non-HTML 200 came back; null when not fetched. */
  found: boolean | null;
};

export type RobotsFacts = {
  status: number | null;
  bytes: number | null;
  hasSitemapLine: boolean | null;
  /** Googlebot may not fetch "/". */
  disallowAll: boolean | null;
  /**
   * `User-agent: *` Disallow rules that Googlebot's own group lets through:
   * pages Google may crawl and this crawler (which keeps to `*`) did not.
   * Null when the file was not read. Not stored; absent when read back.
   */
  googlebotOnlyRules?: string[] | null;
  /** One entry per checked bot, known only when the file was read. */
  access: { bot: RobotsCheckedBot; blocked: boolean }[];
};

export type SitemapFacts = {
  url: string | null;
  /** Distinct addresses the sitemaps list, on any host. */
  urlCount: number | null;
  /** Of those, the ones on the audited site; null on older audits. */
  onHostUrlCount: number | null;
  listedInRobots: boolean | null;
};

/** A well-known text file: found only with a 200 that is not an HTML page. */
export type WellKnownFile = { status: number | null; found: boolean | null };

export type DnsFacts = {
  /** False when any lookup failed; absence checks need every lookup. */
  resolved: boolean;
  records: DnsRecord[];
};

export type DomainFacts = {
  domain: string | null;
  registeredAt: string | null;
  expiresAt: string | null;
  registrar: string | null;
};

export type CertificateFacts = {
  issuer: string | null;
  notBefore: string | null;
  notAfter: string | null;
};

export type SiteFacts = {
  checkedAt: string;
  start: StartPageFacts;
  httpsRedirect: HttpsRedirectFacts;
  hostVariant: HostVariantFacts | null;
  notFound: NotFoundFacts;
  favicon: FaviconFacts;
  robots: RobotsFacts;
  sitemap: SitemapFacts;
  llmsTxt: WellKnownFile;
  securityTxt: WellKnownFile;
  adsTxt: WellKnownFile;
  dns: DnsFacts;
  domain: DomainFacts;
  certificate: CertificateFacts;
  /**
   * The recorded checks (`shared/audit-issues/recorded-checks.ts`) this
   * audit measured, found or not. Written by later steps than the probes and
   * attached when the facts are read back; absent while probing and on
   * audits that predate it, which makes every recorded check unknown.
   */
  measuredChecks?: string[];
};
