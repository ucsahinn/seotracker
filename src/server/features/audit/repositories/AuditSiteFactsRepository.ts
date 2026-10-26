/**
 * The site-level facts of an audit: one `audit_site_facts` row plus its
 * crawler-access and DNS child rows. Written once by the workflow's probe
 * step (idempotently, since steps retry) and read back for the results
 * screen and the report.
 */
import { eq } from "drizzle-orm";
import { sortBy } from "remeda";
import { db } from "@/db";
import {
  auditMeasuredChecks,
  auditSiteCrawlerAccess,
  auditSiteDnsRecords,
  auditSiteFacts,
} from "@/db/schema";
import { executeInBatches, runBatch } from "@/db/runBatch";
import { jsonCodec } from "@/shared/json";
import {
  DNS_RECORD_TYPES,
  ROBOTS_CHECKED_BOTS,
  type RobotsCheckedBot,
  type SiteFacts,
} from "@/server/lib/audit/site-probes/types";
import { z } from "zod";

function factsRow(auditId: string, facts: SiteFacts) {
  const { start, httpsRedirect, hostVariant, notFound, favicon, robots } =
    facts;
  return {
    auditId,
    checkedAt: facts.checkedAt,
    startFinalUrl: start.finalUrl,
    startStatus: start.status,
    startRedirectHops: start.redirectHops,
    ttfbMs: start.ttfbMs,
    totalMs: start.totalMs,
    htmlBytes: start.htmlBytes,
    contentType: start.contentType,
    contentEncoding: start.contentEncoding,
    cacheControl: start.cacheControl,
    serverHeader: start.server,
    xPoweredBy: start.xPoweredBy,
    hsts: start.hsts,
    cspPresent: start.cspPresent,
    cspFrameAncestors: start.cspFrameAncestors,
    xContentTypeOptions: start.xContentTypeOptions,
    xFrameOptions: start.xFrameOptions,
    referrerPolicy: start.referrerPolicy,
    permissionsPolicy: start.permissionsPolicy,
    responseHeadersJson: JSON.stringify(start.headers),
    httpStatus: httpsRedirect.status,
    httpFinalUrl: httpsRedirect.finalUrl,
    httpRedirectHops: httpsRedirect.hops,
    httpRedirectsToHttps: httpsRedirect.redirectsToHttps,
    canonicalHost: hostVariant?.canonicalHost ?? null,
    alternateHost: hostVariant?.alternateHost ?? null,
    alternateStatus: hostVariant?.alternateStatus ?? null,
    alternateRedirectsToCanonical:
      hostVariant?.alternateRedirectsToCanonical ?? null,
    notFoundUrl: notFound.probeUrl,
    notFoundStatus: notFound.status,
    notFoundRedirectedHome: notFound.redirectedHome,
    notFoundBodyBytes: notFound.bodyBytes,
    faviconDeclared: favicon.declared,
    faviconUrl: favicon.url,
    faviconStatus: favicon.status,
    faviconFound: favicon.found,
    robotsStatus: robots.status,
    robotsBytes: robots.bytes,
    robotsHasSitemapLine: robots.hasSitemapLine,
    robotsDisallowAll: robots.disallowAll,
    sitemapUrl: facts.sitemap.url,
    sitemapUrlCount: facts.sitemap.urlCount,
    sitemapOnHostUrlCount: facts.sitemap.onHostUrlCount,
    sitemapListedInRobots: facts.sitemap.listedInRobots,
    llmsTxtStatus: facts.llmsTxt.status,
    llmsTxtFound: facts.llmsTxt.found,
    securityTxtStatus: facts.securityTxt.status,
    securityTxtFound: facts.securityTxt.found,
    adsTxtStatus: facts.adsTxt.status,
    adsTxtFound: facts.adsTxt.found,
    dnsResolved: facts.dns.resolved,
    registrableDomain: facts.domain.domain,
    domainRegisteredAt: facts.domain.registeredAt,
    domainExpiresAt: facts.domain.expiresAt,
    domainRegistrar: facts.domain.registrar,
    certIssuer: facts.certificate.issuer,
    certNotBefore: facts.certificate.notBefore,
    certNotAfter: facts.certificate.notAfter,
  };
}

/** Replaces whatever an earlier attempt of the same step wrote. */
async function saveSiteFacts(auditId: string, facts: SiteFacts) {
  const row = factsRow(auditId, facts);
  // DNS values are the primary key's last part; duplicates would collide.
  const dnsRows = Array.from(
    new Map(
      facts.dns.records.map((record) => [
        `${record.type} ${record.value}`,
        { auditId, recordType: record.type, value: record.value },
      ]),
    ).values(),
  );
  /*
   * Delete then insert rather than an upsert: an upsert binds every column
   * twice, and with sixty columns that passes D1's 100-variable cap per
   * statement ("too many SQL variables"). One batch keeps it atomic.
   */
  await runBatch((tx) => [
    tx.delete(auditSiteFacts).where(eq(auditSiteFacts.auditId, auditId)),
    tx.insert(auditSiteFacts).values(row),
    tx
      .delete(auditSiteCrawlerAccess)
      .where(eq(auditSiteCrawlerAccess.auditId, auditId)),
    tx
      .delete(auditSiteDnsRecords)
      .where(eq(auditSiteDnsRecords.auditId, auditId)),
    ...facts.robots.access.map((entry) =>
      tx.insert(auditSiteCrawlerAccess).values({ auditId, ...entry }),
    ),
    ...dnsRows.map((dnsRow) => tx.insert(auditSiteDnsRecords).values(dnsRow)),
  ]);
}

const headersCodec = jsonCodec(
  z.array(z.object({ name: z.string(), value: z.string() })),
);

const isCheckedBot = (bot: string): bot is RobotsCheckedBot =>
  (ROBOTS_CHECKED_BOTS as readonly string[]).includes(bot);

/** The audit's site facts, or null for an audit that predates the probes. */
async function getSiteFacts(auditId: string): Promise<SiteFacts | null> {
  const [[row], access, dnsRecords, measured] = await Promise.all([
    db
      .select()
      .from(auditSiteFacts)
      .where(eq(auditSiteFacts.auditId, auditId))
      .limit(1),
    db
      .select()
      .from(auditSiteCrawlerAccess)
      .where(eq(auditSiteCrawlerAccess.auditId, auditId)),
    db
      .select()
      .from(auditSiteDnsRecords)
      .where(eq(auditSiteDnsRecords.auditId, auditId)),
    db
      .select({ checkId: auditMeasuredChecks.checkId })
      .from(auditMeasuredChecks)
      .where(eq(auditMeasuredChecks.auditId, auditId)),
  ]);
  if (!row) return null;

  const headers = headersCodec.safeParse(row.responseHeadersJson ?? "[]");
  const botOrder = (bot: string) =>
    (ROBOTS_CHECKED_BOTS as readonly string[]).indexOf(bot);
  const typeOrder = (type: string) =>
    (DNS_RECORD_TYPES as readonly string[]).indexOf(type);

  return {
    checkedAt: row.checkedAt,
    start: {
      finalUrl: row.startFinalUrl,
      status: row.startStatus,
      redirectHops: row.startRedirectHops,
      ttfbMs: row.ttfbMs,
      totalMs: row.totalMs,
      htmlBytes: row.htmlBytes,
      contentType: row.contentType,
      contentEncoding: row.contentEncoding,
      cacheControl: row.cacheControl,
      server: row.serverHeader,
      xPoweredBy: row.xPoweredBy,
      hsts: row.hsts,
      cspPresent: row.cspPresent,
      cspFrameAncestors: row.cspFrameAncestors,
      xContentTypeOptions: row.xContentTypeOptions,
      xFrameOptions: row.xFrameOptions,
      referrerPolicy: row.referrerPolicy,
      permissionsPolicy: row.permissionsPolicy,
      headers: headers.success ? headers.data : [],
    },
    httpsRedirect: {
      status: row.httpStatus,
      finalUrl: row.httpFinalUrl,
      hops: row.httpRedirectHops,
      redirectsToHttps: row.httpRedirectsToHttps,
    },
    hostVariant:
      row.canonicalHost && row.alternateHost
        ? {
            canonicalHost: row.canonicalHost,
            alternateHost: row.alternateHost,
            alternateStatus: row.alternateStatus,
            alternateRedirectsToCanonical: row.alternateRedirectsToCanonical,
          }
        : null,
    notFound: {
      probeUrl: row.notFoundUrl ?? "",
      status: row.notFoundStatus,
      redirectedHome: row.notFoundRedirectedHome,
      bodyBytes: row.notFoundBodyBytes,
    },
    favicon: {
      declared: row.faviconDeclared,
      url: row.faviconUrl,
      status: row.faviconStatus,
      found: row.faviconFound,
    },
    robots: {
      status: row.robotsStatus,
      bytes: row.robotsBytes,
      hasSitemapLine: row.robotsHasSitemapLine,
      disallowAll: row.robotsDisallowAll,
      access: sortBy(
        access.flatMap((entry) =>
          isCheckedBot(entry.bot)
            ? [{ bot: entry.bot, blocked: entry.blocked }]
            : [],
        ),
        (entry) => botOrder(entry.bot),
      ),
    },
    sitemap: {
      url: row.sitemapUrl,
      urlCount: row.sitemapUrlCount,
      onHostUrlCount: row.sitemapOnHostUrlCount,
      listedInRobots: row.sitemapListedInRobots,
    },
    llmsTxt: { status: row.llmsTxtStatus, found: row.llmsTxtFound },
    securityTxt: { status: row.securityTxtStatus, found: row.securityTxtFound },
    adsTxt: { status: row.adsTxtStatus, found: row.adsTxtFound },
    dns: {
      resolved: row.dnsResolved ?? false,
      records: sortBy(dnsRecords, (record) => typeOrder(record.recordType)).map(
        (record) => ({ type: record.recordType, value: record.value }),
      ),
    },
    domain: {
      domain: row.registrableDomain,
      registeredAt: row.domainRegisteredAt,
      expiresAt: row.domainExpiresAt,
      registrar: row.domainRegistrar,
    },
    certificate: {
      issuer: row.certIssuer,
      notBefore: row.certNotBefore,
      notAfter: row.certNotAfter,
    },
    measuredChecks: sortBy(
      measured.map((entry) => entry.checkId),
      (checkId) => checkId,
    ),
  };
}

/**
 * Record that this audit measured these checks. Idempotent, so a retried
 * step writes the same rows; never removes one, because each step records
 * only its own checks.
 */
async function recordMeasuredChecks(
  auditId: string,
  checkIds: Iterable<string>,
) {
  const rows = [...new Set(checkIds)].map((checkId) => ({ auditId, checkId }));
  if (rows.length === 0) return;
  await executeInBatches(rows, (tx, entry) =>
    tx.insert(auditMeasuredChecks).values(entry).onConflictDoNothing(),
  );
}

export const AuditSiteFactsRepository = {
  saveSiteFacts,
  getSiteFacts,
  recordMeasuredChecks,
} as const;
