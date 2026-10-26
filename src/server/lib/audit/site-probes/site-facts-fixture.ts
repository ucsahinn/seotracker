import type { SiteFacts } from "./types";

/** Every probe failed: nothing is known. */
export function unknownFacts(): SiteFacts {
  return {
    checkedAt: "2026-10-26T00:00:00.000Z",
    start: {
      finalUrl: null,
      status: null,
      redirectHops: null,
      ttfbMs: null,
      totalMs: null,
      htmlBytes: null,
      contentType: null,
      contentEncoding: null,
      cacheControl: null,
      server: null,
      xPoweredBy: null,
      hsts: null,
      cspPresent: null,
      cspFrameAncestors: null,
      xContentTypeOptions: null,
      xFrameOptions: null,
      referrerPolicy: null,
      permissionsPolicy: null,
      headers: [],
    },
    httpsRedirect: {
      status: null,
      finalUrl: null,
      hops: null,
      redirectsToHttps: null,
    },
    hostVariant: null,
    notFound: {
      probeUrl: "https://example.com/x",
      status: null,
      redirectedHome: null,
      bodyBytes: null,
    },
    favicon: { declared: null, url: null, status: null, found: null },
    robots: {
      status: null,
      bytes: null,
      hasSitemapLine: null,
      disallowAll: null,
      access: [],
    },
    sitemap: {
      url: null,
      urlCount: null,
      onHostUrlCount: null,
      listedInRobots: null,
    },
    llmsTxt: { status: null, found: null },
    securityTxt: { status: null, found: null },
    adsTxt: { status: null, found: null },
    dns: { resolved: false, records: [] },
    domain: {
      domain: null,
      registeredAt: null,
      expiresAt: null,
      registrar: null,
    },
    certificate: { issuer: null, notBefore: null, notAfter: null },
  };
}
