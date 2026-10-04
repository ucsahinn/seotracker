/**
 * URL normalization and utility functions for the site audit crawler.
 */

/**
 * Normalize a URL for deduplication:
 * - Resolve relative URLs against a base
 * - Strip fragments (#...)
 * - Sort query parameters
 * - Lowercase the hostname
 * - Preserve trailing slashes. A trailing slash is the canonical form on most
 *   CMS platforms (WordPress etc.), which 301-redirect the non-slash version to
 *   it. Stripping it here would rewrite the canonical URL into its own redirect
 *   source, so the crawler would follow /path -> /path/ and strip back to /path
 *   forever — a 508 loop. Keeping /path and /path/ distinct lets the redirect
 *   resolve normally.
 */
export function normalizeUrl(url: string, base?: string): string | null {
  try {
    const parsed = new URL(url, base);

    // Only crawl HTTP(S)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    // Strip fragment
    parsed.hash = "";

    // Sort query params for consistent dedup
    parsed.searchParams.sort();

    // Lowercase hostname
    parsed.hostname = parsed.hostname.toLowerCase();

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Whether two URLs are the same URL, for canonical comparisons.
 *
 * Deliberately conservative: only differences that cannot change which page is
 * meant are ignored (fragment, hostname case, default port, query-parameter
 * order). http vs https, www vs apex and a trailing slash all stay different,
 * because each can serve a different page and a canonical tag that points at
 * the "other" form is a real disagreement worth reporting. Equivalence that a
 * site only sometimes has must be derived from observed site behaviour, not
 * assumed here. See `canonicalUrlKey` for the looser crawl-boundary key.
 */
function strictUrlKey(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.searchParams.sort();
    return parsed.toString();
  } catch {
    return url;
  }
}

export function sameCanonicalTarget(a: string, b: string): boolean {
  return strictUrlKey(a) === strictUrlKey(b);
}

/**
 * A loose key for "is this effectively the same page" inside one crawl,
 * surviving the redirect patterns a site uses to reach its canonical form
 * (http -> https, www <-> apex): forces https, drops a leading "www.",
 * lowercases the hostname, sorts query params and strips the fragment.
 * Trailing slashes are kept.
 *
 * Crawl-boundary use only (picking the homepage for the Lighthouse sample,
 * matching crawled pages to hreflang targets). Never use it to decide whether
 * two canonical URLs agree; that is `sameCanonicalTarget`.
 */
export function canonicalUrlKey(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.protocol = "https:";
    parsed.hostname = parsed.hostname.toLowerCase().replace(/^www\./, "");
    parsed.hash = "";
    parsed.searchParams.sort();
    return parsed.toString();
  } catch {
    return url.toLowerCase();
  }
}

function getEffectivePort(parsed: URL): string {
  if (parsed.port) return parsed.port;
  return parsed.protocol === "https:" ? "443" : "80";
}

function areEquivalentHostnames(a: string, b: string): boolean {
  const hostA = a.toLowerCase();
  const hostB = b.toLowerCase();
  if (hostA === hostB) return true;
  return hostA === `www.${hostB}` || hostB === `www.${hostA}`;
}

/**
 * Check if a URL belongs to the same crawl boundary as the crawl target.
 *
 * Rules:
 * - Hostname must match exactly.
 * - Same protocol/port is always allowed.
 * - http -> https upgrade on default ports is allowed.
 */
export function isSameOrigin(url: string, origin: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const parsedOrigin = new URL(origin);

    if (!areEquivalentHostnames(parsedUrl.hostname, parsedOrigin.hostname)) {
      return false;
    }

    const originProtocol = parsedOrigin.protocol.toLowerCase();
    const urlProtocol = parsedUrl.protocol.toLowerCase();

    const originPort = getEffectivePort(parsedOrigin);
    const urlPort = getEffectivePort(parsedUrl);

    if (originProtocol === urlProtocol) {
      return originPort === urlPort;
    }

    const isHttpToHttpsUpgrade =
      originProtocol === "http:" &&
      urlProtocol === "https:" &&
      originPort === "80" &&
      urlPort === "443";

    return isHttpToHttpsUpgrade;
  } catch {
    return false;
  }
}

/**
 * Detect a URL template pattern by replacing path segments that look like
 * dynamic values (IDs, slugs, dates) with `:param`.
 *
 * Examples:
 *   /blog/my-great-post      → /blog/:slug
 *   /products/12345           → /products/:id
 *   /users/john-doe/settings  → /users/:slug/settings
 */
export function detectUrlTemplate(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  const normalized = segments.map((segment) => {
    // Pure numeric IDs
    if (/^\d+$/.test(segment)) return ":id";
    // UUIDs
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        segment,
      )
    )
      return ":uuid";
    // Date-like segments (2024-01-15)
    if (/^\d{4}-\d{2}-\d{2}$/.test(segment)) return ":date";
    // Slug-like: contains hyphens and is more than 2 segments (to avoid short
    // path parts like "my-account" that are likely fixed routes)
    if (segment.includes("-") && segment.split("-").length > 2) return ":slug";

    return segment;
  });

  return "/" + normalized.join("/");
}

/**
 * Extract the origin (protocol + hostname + port) from a URL string.
 */
export function getOrigin(url: string): string {
  return new URL(url).origin;
}
