/**
 * Reads behind the audit's overview: the start page's own tags, the tags and
 * schema types found across the crawl, and the issue rows of earlier audits
 * for the score history. Beside AuditRepository, like auditSummaryQueries,
 * to keep that file under its line ceiling.
 */
import {
  and,
  asc,
  countDistinct,
  eq,
  inArray,
  isNotNull,
  sql,
} from "drizzle-orm";
import { db } from "@/db";
import {
  auditIssues,
  auditLighthouseResults,
  auditPageAnalyticsIds,
  auditPageSchemaTypes,
  auditPages,
} from "@/db/schema";
import { normalizeUrl } from "@/server/lib/audit/url-utils";

const startPageColumns = {
  id: auditPages.id,
  url: auditPages.url,
  title: auditPages.title,
  metaDescription: auditPages.metaDescription,
  canonicalUrl: auditPages.canonicalUrl,
  htmlLang: auditPages.htmlLang,
  ogTitle: auditPages.ogTitle,
  ogDescription: auditPages.ogDescription,
  ogImage: auditPages.ogImage,
  twitterCard: auditPages.twitterCard,
  wordCount: auditPages.wordCount,
  textRatio: auditPages.textRatio,
  domNodeCount: auditPages.domNodeCount,
  imagesTotal: auditPages.imagesTotal,
};

/*
 * Shallowest first, and a page with no depth (seeded from the sitemap, never
 * reached by a link) last: SQLite sorts NULL before any number, so a plain
 * ascending depth put an orphan sitemap page ahead of the home page.
 */
const byDepth = [
  sql`${auditPages.crawlDepth} is null`,
  asc(auditPages.crawlDepth),
  asc(auditPages.url),
];

/**
 * The start page as crawled: the row at the start address, or where its
 * redirect landed. When neither answered 200, the shallowest 200 page
 * stands in, which is where a redirect off the start address usually ends.
 */
export async function getStartPageDetails(auditId: string, startUrl: string) {
  const startAddresses = [
    ...new Set([startUrl, normalizeUrl(startUrl) ?? startUrl]),
  ];
  const startRows = await db
    .select({ redirectUrl: auditPages.redirectUrl })
    .from(auditPages)
    .where(
      and(
        eq(auditPages.auditId, auditId),
        inArray(auditPages.url, startAddresses),
      ),
    )
    .limit(1);
  const redirectUrl = startRows.length > 0 ? startRows[0].redirectUrl : null;
  const wanted = redirectUrl
    ? [...startAddresses, redirectUrl]
    : startAddresses;
  const starts = await db
    .select(startPageColumns)
    .from(auditPages)
    .where(
      and(
        eq(auditPages.auditId, auditId),
        eq(auditPages.statusCode, 200),
        inArray(auditPages.url, wanted),
      ),
    )
    .limit(1);
  if (starts.length > 0) return starts[0];
  const shallowest = await db
    .select(startPageColumns)
    .from(auditPages)
    .where(and(eq(auditPages.auditId, auditId), eq(auditPages.statusCode, 200)))
    .orderBy(...byDepth)
    .limit(1);
  return shallowest.length > 0 ? shallowest[0] : null;
}

/**
 * Every mobile Lighthouse run of an audit with its page, shallowest first:
 * the stored payload key when the run succeeded, the error when it did not.
 */
export async function getMobileRuns(auditId: string) {
  return db
    .select({
      pageId: auditLighthouseResults.pageId,
      url: auditPages.url,
      r2Key: auditLighthouseResults.r2Key,
      errorMessage: auditLighthouseResults.errorMessage,
    })
    .from(auditLighthouseResults)
    .innerJoin(auditPages, eq(auditPages.id, auditLighthouseResults.pageId))
    .where(
      and(
        eq(auditLighthouseResults.auditId, auditId),
        eq(auditLighthouseResults.strategy, "mobile"),
      ),
    )
    .orderBy(...byDepth);
}

/** Each analytics tag id the crawl found, with how many pages carry it. */
export async function getAnalyticsTagCounts(auditId: string) {
  return db
    .select({
      tagId: auditPageAnalyticsIds.tagId,
      pages: countDistinct(auditPageAnalyticsIds.pageId),
    })
    .from(auditPageAnalyticsIds)
    .where(eq(auditPageAnalyticsIds.auditId, auditId))
    .groupBy(auditPageAnalyticsIds.tagId);
}

/** Each schema.org type declared in JSON-LD, with how many pages declare it. */
export async function getSchemaTypeCounts(auditId: string) {
  return db
    .select({
      schemaType: auditPageSchemaTypes.schemaType,
      pages: countDistinct(auditPageSchemaTypes.pageId),
    })
    .from(auditPageSchemaTypes)
    .where(eq(auditPageSchemaTypes.auditId, auditId))
    .groupBy(auditPageSchemaTypes.schemaType);
}

/**
 * Per audit and issue type: distinct pages, and whether any row is about the
 * whole site (no page). Grouped in SQL because link-level checks write one
 * row per occurrence, and five audits of those is a lot of rows to ship.
 */
export async function getIssueTypeSummaries(auditIds: string[]) {
  if (auditIds.length === 0) return [];
  return db
    .select({
      auditId: auditIssues.auditId,
      issueType: auditIssues.issueType,
      severity: auditIssues.severity,
      pages: countDistinct(auditIssues.pageId),
      siteRows: sql<number>`sum(case when ${auditIssues.pageId} is null then 1 else 0 end)`,
    })
    .from(auditIssues)
    .where(inArray(auditIssues.auditId, auditIds))
    .groupBy(auditIssues.auditId, auditIssues.issueType, auditIssues.severity);
}

/** The audits, among `auditIds`, with at least one scored PageSpeed run. */
export async function getAuditIdsWithLighthouseScores(auditIds: string[]) {
  if (auditIds.length === 0) return new Set<string>();
  const rows = await db
    .selectDistinct({ auditId: auditLighthouseResults.auditId })
    .from(auditLighthouseResults)
    .where(
      and(
        inArray(auditLighthouseResults.auditId, auditIds),
        isNotNull(auditLighthouseResults.performanceScore),
      ),
    );
  return new Set(rows.map((row) => row.auditId));
}
