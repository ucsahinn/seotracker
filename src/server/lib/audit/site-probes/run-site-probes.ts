/**
 * Everything the audit learns about the site as a whole, in one pass that
 * cannot fail: each probe resolves on its own and leaves its facts null when
 * it could not measure them.
 */
import { lookupCertificate } from "./certificate";
import { lookupDns } from "./dns";
import {
  probeFavicon,
  probeHostVariant,
  probeHttpsRedirect,
  probeNotFound,
  probeStartPage,
  probeWellKnownFile,
} from "./http-probes";
import {
  isPlatformHost,
  lookupDomain,
  registrableDomain,
  unknownDomain,
} from "./rdap";
import { readRobotsFacts } from "./robots-facts";
import { probeFetch, type ProbeContext } from "./site-fetch";
import type { SiteFacts, SitemapFacts, StartPageFacts } from "./types";

/*
 * One slow first byte is often a cold cache or the probe batch itself (ten
 * requests at once, several to this server). A second sample, taken after
 * the batch, and the faster of the two is what slow-ttfb judges.
 */
async function bestTtfb(
  start: StartPageFacts,
  startUrl: string,
  context: ProbeContext,
): Promise<number | null> {
  if (start.ttfbMs === null) return null;
  const again = await probeFetch(startUrl, context);
  await again?.response.body?.cancel();
  return again ? Math.min(start.ttfbMs, again.ttfbMs) : start.ttfbMs;
}

export async function runSiteProbes(input: {
  origin: string;
  startUrl: string;
  /** robots.txt as discovery fetched it (the checkpointed copy). */
  robots: { status: number | null; text: string | null };
  sitemap: SitemapFacts;
  now?: Date;
}): Promise<SiteFacts> {
  const { origin, startUrl } = input;
  const now = input.now ?? new Date();
  const host = new URL(origin).hostname.toLowerCase();
  const domain = registrableDomain(host);
  /*
   * A site on a platform's shared suffix (mysite.pages.dev) registered
   * nothing and controls no mail records of its own: registration, SPF and
   * DMARC stay unmeasured rather than read off the platform or reported
   * missing on a name the owner cannot change.
   */
  const ownsDomain = domain !== null && !isPlatformHost(host);
  const context: ProbeContext = { originHost: host, checkedHosts: new Set() };

  const [
    startPage,
    httpsRedirect,
    hostVariant,
    notFound,
    llmsTxt,
    securityTxt,
    adsTxt,
    dns,
    domainFacts,
    certificate,
  ] = await Promise.all([
    probeStartPage(startUrl, context),
    probeHttpsRedirect(host, context),
    // A bare IP or a single-label host has no www sibling.
    domain ? probeHostVariant(origin, context) : Promise.resolve(null),
    probeNotFound(origin, crypto.randomUUID().slice(0, 12), context),
    probeWellKnownFile([`${origin}/llms.txt`], context),
    probeWellKnownFile(
      [`${origin}/.well-known/security.txt`, `${origin}/security.txt`],
      context,
    ),
    probeWellKnownFile([`${origin}/ads.txt`], context),
    ownsDomain
      ? lookupDns(host, domain)
      : Promise.resolve({ resolved: false, records: [] }),
    ownsDomain ? lookupDomain(domain) : Promise.resolve(unknownDomain(domain)),
    origin.startsWith("https://")
      ? lookupCertificate(host, now)
      : Promise.resolve({ issuer: null, notBefore: null, notAfter: null }),
  ]);

  const favicon = await probeFavicon(
    origin,
    startPage.html,
    startPage.facts.finalUrl ?? startUrl,
    context,
  );
  // Alone, so nothing else of ours is queued at the server while it runs.
  const ttfbMs = await bestTtfb(startPage.facts, startUrl, context);

  return {
    checkedAt: now.toISOString(),
    start: { ...startPage.facts, ttfbMs },
    httpsRedirect,
    hostVariant,
    notFound,
    favicon,
    robots: readRobotsFacts(origin, input.robots),
    sitemap: input.sitemap,
    llmsTxt,
    securityTxt,
    adsTxt,
    dns,
    domain: domainFacts,
    certificate,
  };
}
