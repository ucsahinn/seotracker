/**
 * Whether a Search Console property covers the site an audit crawled.
 *
 * A project holds one Search Console property but the audit form takes any
 * address, so the two can be about different sites. When they are, every
 * answer Google gives on the audit screen — index coverage, sitemaps — is
 * about the property, not about the pages on screen. Nothing said so, and a
 * coverage table full of "Google does not know this URL" reads as a finding
 * about the crawled site rather than as the wrong question being asked.
 *
 * Properties come in two shapes, stored verbatim from `sites.list`:
 * `sc-domain:example.com` covers the domain and every subdomain, while
 * `https://www.example.com/` covers that host alone.
 */
export function gscPropertyCoversHost(
  siteUrl: string | null | undefined,
  host: string | null | undefined,
): boolean {
  if (!siteUrl || !host) return false;
  const target = normalizeHost(host);
  if (!target) return false;

  const domainProperty = readDomainProperty(siteUrl);
  if (domainProperty) {
    return target === domainProperty || target.endsWith(`.${domainProperty}`);
  }

  const prefixHost = readPrefixHost(siteUrl);
  return prefixHost !== null && prefixHost === target;
}

/** The property's own host, for naming it in a warning. */
export function gscPropertyHost(
  siteUrl: string | null | undefined,
): string | null {
  if (!siteUrl) return null;
  return readDomainProperty(siteUrl) ?? readPrefixHost(siteUrl);
}

function readDomainProperty(siteUrl: string): string | null {
  if (!siteUrl.startsWith("sc-domain:")) return null;
  return normalizeHost(siteUrl.slice("sc-domain:".length));
}

function readPrefixHost(siteUrl: string): string | null {
  try {
    return normalizeHost(new URL(siteUrl).hostname);
  } catch {
    return null;
  }
}

/*
 * `www.` is dropped on both sides on purpose. A URL-prefix property is
 * genuinely per-host, so `https://example.com/` and `https://www.example.com/`
 * are two properties in Google's eyes — but treating them as different sites
 * here would warn the operator that their own site is someone else's, which
 * is the louder wrong answer.
 */
function normalizeHost(value: string): string | null {
  const host = value.trim().toLowerCase().replace(/\.$/, "");
  if (!host) return null;
  return host.startsWith("www.") ? host.slice(4) : host;
}
