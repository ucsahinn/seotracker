/**
 * Findings drawn from the site-level facts. Each check reads only facts that
 * were measured: a null (the probe failed, the lookup timed out, the registry
 * publishes no RDAP) is never a finding.
 *
 * Expiry is counted from `checkedAt`, not from the clock, so a replayed
 * finalize step reports what the original run saw.
 */
import type { AuditIssueType } from "@/shared/audit-issues";
import { SEARCH_ENGINE_BOTS, type SiteFacts } from "./types";

type Finding = { issueType: AuditIssueType; details?: Record<string, unknown> };

const DAY_MS = 86_400_000;
const HTML_TOO_LARGE_BYTES = 2 * 1024 * 1024;
const SLOW_TTFB_MS = 800;
/** Below this, compressing saves too little to be worth a line. */
const COMPRESSION_MIN_BYTES = 4 * 1024;
const SSL_WARNING_DAYS = 30;
const SSL_CRITICAL_DAYS = 14;
const DOMAIN_WARNING_DAYS = 30;

const isSuccess = (status: number | null) =>
  status !== null && status >= 200 && status < 300;

function daysUntil(iso: string | null, from: string): number | null {
  if (!iso) return null;
  const until = Date.parse(iso);
  const start = Date.parse(from);
  if (Number.isNaN(until) || Number.isNaN(start)) return null;
  return Math.floor((until - start) / DAY_MS);
}

/**
 * Headers are only read off a page that actually answered: a 4xx or 5xx is
 * an error page (or a firewall), not the site's configuration. Mirrored by
 * `SITE_FACT_NEEDS` in `src/shared/auditBreakdown.ts`.
 */
function startHeadersReadable(facts: SiteFacts): boolean {
  const { status } = facts.start;
  return status !== null && status < 400;
}

/** HSTS only means anything on an https response; on http it is ignored. */
function startServedOverHttps(facts: SiteFacts): boolean {
  return facts.start.finalUrl?.startsWith("https://") ?? false;
}

/*
 * Top-level domains preloaded as HSTS in every major browser, so no
 * request to a name under them ever goes over plain http and the header
 * adds nothing. hono.dev (and every *.pages.dev, *.vercel.app and
 * *.netlify.app site) sends none and was told the first request "may go
 * over http", which it cannot. Each entry checked as `preloaded` on
 * hstspreload.org, 2026-10-26.
 */
const HSTS_PRELOADED_TLDS = new Set([
  "android",
  "app",
  "bank",
  "boo",
  "channel",
  "chrome",
  "dad",
  "day",
  "dev",
  "eat",
  "esq",
  "fly",
  "foo",
  "gle",
  "gmail",
  "google",
  "hangout",
  "ing",
  "insurance",
  "meet",
  "meme",
  "mov",
  "new",
  "nexus",
  "page",
  "phd",
  "prof",
  "rsvp",
  "search",
  "youtube",
  "zip",
]);

function onHstsPreloadedTld(url: string): boolean {
  try {
    const tld = new URL(url).hostname.toLowerCase().split(".").pop() ?? "";
    return HSTS_PRELOADED_TLDS.has(tld);
  } catch {
    return false;
  }
}

function securityHeaderFindings(facts: SiteFacts): Finding[] {
  const { start } = facts;
  if (!startHeadersReadable(facts)) return [];
  const findings: Finding[] = [];
  if (
    startServedOverHttps(facts) &&
    start.hsts === null &&
    !onHstsPreloadedTld(start.finalUrl ?? "")
  )
    findings.push({ issueType: "missing-hsts" });
  if (start.xContentTypeOptions?.trim().toLowerCase() !== "nosniff") {
    findings.push({ issueType: "missing-x-content-type-options" });
  }
  if (start.xFrameOptions === null && start.cspFrameAncestors === false) {
    findings.push({ issueType: "missing-clickjacking-protection" });
  }
  if (start.referrerPolicy === null) {
    findings.push({ issueType: "missing-referrer-policy" });
  }
  return findings;
}

function responseFindings(facts: SiteFacts): Finding[] {
  const { start } = facts;
  const findings: Finding[] = [];
  if (start.htmlBytes !== null && start.htmlBytes > HTML_TOO_LARGE_BYTES) {
    findings.push({
      issueType: "html-too-large",
      details: { bytes: start.htmlBytes },
    });
  }
  if (
    isSuccess(start.status) &&
    start.htmlBytes !== null &&
    start.htmlBytes >= COMPRESSION_MIN_BYTES &&
    start.contentEncoding === null
  ) {
    findings.push({
      issueType: "no-compression",
      details: { bytes: start.htmlBytes },
    });
  }
  if (start.ttfbMs !== null && start.ttfbMs > SLOW_TTFB_MS) {
    findings.push({
      issueType: "slow-ttfb",
      details: { ttfbMs: start.ttfbMs },
    });
  }
  return findings;
}

function hostFindings(facts: SiteFacts): Finding[] {
  const findings: Finding[] = [];
  const { httpsRedirect, hostVariant, notFound, favicon } = facts;
  if (httpsRedirect.redirectsToHttps === false) {
    findings.push({
      issueType: "no-https-redirect",
      details: {
        status: httpsRedirect.status,
        finalUrl: httpsRedirect.finalUrl,
      },
    });
  }
  if (hostVariant && isSuccess(hostVariant.alternateStatus)) {
    findings.push({
      issueType: "www-and-apex-both-serve",
      details: {
        canonicalHost: hostVariant.canonicalHost,
        alternateHost: hostVariant.alternateHost,
      },
    });
  }
  if (notFound.redirectedHome === true) {
    findings.push({
      issueType: "not-found-redirects-home",
      details: { probeUrl: notFound.probeUrl },
    });
  } else if (notFound.redirectedHome === false && isSuccess(notFound.status)) {
    findings.push({
      issueType: "soft-404-on-missing-page",
      details: { probeUrl: notFound.probeUrl, status: notFound.status },
    });
  }
  if (favicon.found === false) {
    findings.push({
      issueType: "missing-favicon",
      details: { url: favicon.url, status: favicon.status },
    });
  }
  return findings;
}

function robotsFindings(facts: SiteFacts): Finding[] {
  const { robots } = facts;
  const findings: Finding[] = [];
  if (robots.disallowAll === true) {
    findings.push({ issueType: "robots-disallow-all" });
  } else {
    // Under a disallow-all every bot is blocked; that finding says it already.
    const blockedAiBots = robots.access
      .filter(
        (entry) => entry.blocked && !SEARCH_ENGINE_BOTS.includes(entry.bot),
      )
      .map((entry) => entry.bot);
    if (blockedAiBots.length > 0) {
      findings.push({
        issueType: "ai-crawlers-blocked",
        details: { bots: blockedAiBots },
      });
    }
  }
  if (robots.status === 200 && robots.hasSitemapLine === false) {
    findings.push({ issueType: "robots-missing-sitemap-line" });
  }
  if (facts.llmsTxt.found === false) {
    findings.push({ issueType: "missing-llms-txt" });
  }
  const googlebotOnly = robots.googlebotOnlyRules ?? [];
  if (googlebotOnly.length > 0) {
    findings.push({
      issueType: "robots-googlebot-only-paths",
      details: {
        count: googlebotOnly.length,
        sample: googlebotOnly.slice(0, 5),
      },
    });
  }
  return findings;
}

function dnsAndExpiryFindings(facts: SiteFacts, https: boolean): Finding[] {
  const findings: Finding[] = [];
  const { dns, domain, certificate, checkedAt } = facts;
  if (dns.resolved) {
    const has = (type: "SPF" | "DMARC") =>
      dns.records.some((record) => record.type === type);
    if (!has("SPF")) {
      findings.push({
        issueType: "missing-spf",
        details: { domain: domain.domain },
      });
    }
    if (!has("DMARC")) {
      findings.push({
        issueType: "missing-dmarc",
        details: { domain: domain.domain },
      });
    }
  }
  const certDays = https ? daysUntil(certificate.notAfter, checkedAt) : null;
  if (certDays !== null && certDays < SSL_WARNING_DAYS) {
    findings.push({
      issueType:
        certDays < SSL_CRITICAL_DAYS
          ? "ssl-expiring-very-soon"
          : "ssl-expiring-soon",
      details: { daysLeft: certDays, notAfter: certificate.notAfter },
    });
  }
  const domainDays = daysUntil(domain.expiresAt, checkedAt);
  if (domainDays !== null && domainDays < DOMAIN_WARNING_DAYS) {
    findings.push({
      issueType: "domain-expiring-soon",
      details: {
        daysLeft: domainDays,
        expiresAt: domain.expiresAt,
        domain: domain.domain,
      },
    });
  }
  return findings;
}

export function siteFactFindings(facts: SiteFacts, origin: string): Finding[] {
  const https = origin.startsWith("https://");
  return [
    ...hostFindings(facts),
    ...securityHeaderFindings(facts),
    ...responseFindings(facts),
    ...robotsFindings(facts),
    ...dnsAndExpiryFindings(facts, https),
  ];
}
