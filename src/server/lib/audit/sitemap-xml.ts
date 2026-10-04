/** Readers for a parsed sitemap XML document. */
export function getSitemapLocations(input: unknown): string[] {
  if (!input) return [];
  const entries = Array.isArray(input) ? input : [input];
  return entries
    .map((entry) => {
      if (isRecord(entry)) {
        const loc = entry["loc"];
        return typeof loc === "string" ? loc : null;
      }
      return null;
    })
    .filter((loc): loc is string => typeof loc === "string");
}

/**
 * What the `<lastmod>` values in one `<urlset>` add up to.
 *
 * Counts rather than the dates themselves, because this travels in Workflow
 * step state, which has a ~1MiB ceiling that a per-URL date list on a large
 * site would eat. Google says it uses lastmod only when a site's dates are
 * consistently accurate, so the two questions worth carrying are "are there
 * any" and "are any of them impossible".
 */
export function readLastmodStats(input: unknown): {
  urls: number;
  withLastmod: number;
  future: number;
  futureSample: string | null;
} {
  const entries = Array.isArray(input) ? input : input ? [input] : [];
  // A minute of slack: a sitemap regenerated during the crawl is not a lie.
  const horizon = Date.now() + 60_000;
  let withLastmod = 0;
  let future = 0;
  let futureSample: string | null = null;

  for (const entry of entries) {
    if (!isRecord(entry)) continue;
    const raw = entry["lastmod"];
    // The XML parser hands back a Date-looking string, or a number for a
    // bare year. Either way only a parseable instant is a claim.
    const text = typeof raw === "string" ? raw.trim() : null;
    if (!text) continue;
    const parsed = Date.parse(text);
    if (Number.isNaN(parsed)) continue;
    withLastmod += 1;
    if (parsed > horizon) {
      future += 1;
      futureSample ??= text;
    }
  }

  return { urls: entries.length, withLastmod, future, futureSample };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

export function getParsedSitemapSections(parsed: unknown): {
  sitemap: unknown;
  url: unknown;
} {
  if (!parsed || typeof parsed !== "object") {
    return { sitemap: undefined, url: undefined };
  }

  const root = parsed as {
    sitemapindex?: { sitemap?: unknown };
    urlset?: { url?: unknown };
  };

  return {
    sitemap: root.sitemapindex?.sitemap,
    url: root.urlset?.url,
  };
}
