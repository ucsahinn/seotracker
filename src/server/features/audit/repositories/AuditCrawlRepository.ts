/**
 * Crawl-time writes of an audit: page rows, their per-page issues, the
 * finalize-time issue insert, and the click-depth repair. Split from
 * `AuditRepository`, which re-exports these on its own object.
 */
import { and, eq, gt, gte, inArray, isNull, notInArray, or } from "drizzle-orm";
import { chunk, groupBy } from "remeda";
import { db } from "@/db";
import { auditIssues, auditPages } from "@/db/schema";
import { executeInBatches, runBatch } from "@/db/runBatch";
import { AUDIT_ISSUE_TYPES } from "@/shared/audit-issues";
import { deterministicAuditRowId } from "@/server/lib/audit/ids";
import {
  DEEP_PAGE_DEPTH,
  type DetectedIssue,
} from "@/server/lib/audit/issues/page-reporters";
import type { CrawledPageResult } from "@/server/lib/audit/types";

/**
 * Pages per atomic commit. Each commit is one `db.batch`: a delete, one upsert
 * per page and one insert per issue, so this keeps the statement count of a
 * batch bounded (a page carries a few dozen issues at most).
 */
const PAGES_PER_COMMIT = 10;

async function issueRow(auditId: string, issue: DetectedIssue) {
  return {
    id: await deterministicAuditRowId(
      auditId,
      issue.pageUrl,
      issue.issueType,
      issue.dedupeKey ?? "",
    ),
    auditId,
    pageId: issue.pageId,
    pageUrl: issue.pageUrl,
    issueType: issue.issueType,
    severity: AUDIT_ISSUE_TYPES[issue.issueType].severity,
    detailsJson: issue.details ? JSON.stringify(issue.details) : null,
  };
}

function pageDataColumns(page: CrawledPageResult) {
  return {
    url: page.url,
    statusCode: page.statusCode,
    redirectUrl: page.redirectUrl,
    title: page.title,
    metaDescription: page.metaDescription,
    canonicalUrl: page.canonicalUrl,
    robotsMeta: page.robotsMeta,
    googlebotMeta: page.googlebotMeta,
    htmlLang: page.htmlLang,
    xRobotsTag: page.xRobotsTag,
    headerCanonicalUrl: page.headerCanonicalUrl,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
    ogImage: page.ogImage,
    h1Count: page.h1Count,
    firstH1: page.firstH1,
    h2Count: page.h2Count,
    h3Count: page.h3Count,
    h4Count: page.h4Count,
    h5Count: page.h5Count,
    h6Count: page.h6Count,
    headingOrderJson: JSON.stringify(page.headingOrder),
    wordCount: page.wordCount,
    contentHash: page.contentHash,
    imagesTotal: page.imagesTotal,
    imagesMissingAlt: page.imagesMissingAlt,
    imagesJson: JSON.stringify(page.images),
    internalLinkCount: page.links.filter((l) => l.isInternal).length,
    externalLinkCount: page.links.filter((l) => !l.isInternal).length,
    hasStructuredData: page.hasStructuredData,
    hreflangTagsJson: JSON.stringify(page.hreflangAlternates),
    isIndexable: page.isIndexable,
    fetchClass: page.fetchClass,
    crawlDepth: page.crawlDepth,
    inSitemap: page.inSitemap,
    responseTimeMs: page.responseTimeMs,
  };
}

/**
 * Persist one crawled sub-batch (pages + per-page issues). Called inside the
 * crawl-chunk Workflow step so results land in the app DB incrementally
 * instead of accumulating in memory until finalize. Link edges go to the
 * audit's scratchpad DO, not here.
 *
 * Idempotent on step retry: callers assign deterministic page ids
 * (deterministicAuditRowId) and issue ids are derived from stable content.
 * A retried fetch may legitimately differ, so a page's earlier issues are
 * replaced, not merged. The delete, the page upsert and the replacement issues
 * of up to PAGES_PER_COMMIT pages commit in ONE batch: a failure between them
 * can no longer leave a page without the issues its previous attempt found.
 */
async function insertCrawledBatch(
  auditId: string,
  pages: CrawledPageResult[],
  issues: DetectedIssue[],
) {
  const issueRows = await Promise.all(
    issues.map((issue) => issueRow(auditId, issue)),
  );
  const issueRowsByPage = groupBy(issueRows, (row) => row.pageId ?? "");

  for (const group of chunk(pages, PAGES_PER_COMMIT)) {
    const pageIds = group.map((page) => page.id);
    await runBatch((tx) => [
      tx
        .delete(auditIssues)
        .where(
          and(
            eq(auditIssues.auditId, auditId),
            inArray(auditIssues.pageId, pageIds),
          ),
        ),
      ...group.map((page) => {
        const dataColumns = pageDataColumns(page);
        return tx
          .insert(auditPages)
          .values({ id: page.id, auditId, ...dataColumns })
          .onConflictDoUpdate({ target: auditPages.id, set: dataColumns });
      }),
      ...pageIds.flatMap((pageId) =>
        (issueRowsByPage[pageId] ?? []).map((row) =>
          tx.insert(auditIssues).values(row).onConflictDoNothing(),
        ),
      ),
    ]);
  }
}

async function insertIssues(auditId: string, issues: DetectedIssue[]) {
  const issueRows = await Promise.all(
    issues.map((issue) => issueRow(auditId, issue)),
  );
  await executeInBatches(issueRows, (tx, row) =>
    tx.insert(auditIssues).values(row).onConflictDoNothing(),
  );
}

/**
 * Write the shortest click depths the finalize step derived from the retained
 * link graph, then bring the `deep-page` findings in line with them.
 *
 * A row's depth is only ever lowered (or filled when null): the depth it
 * carries came from a path the crawl really followed, so it is a valid upper
 * bound, and the graph can only improve on it. `exact` marks depths computed
 * over a complete graph of a completed crawl. Only then is a depth of
 * DEEP_PAGE_DEPTH or more proof that a page is deep, so only then are
 * `deep-page` findings added; with an incomplete graph a missing edge could
 * hide a shorter path, and the repair limits itself to removing findings a
 * lowered depth has disproved.
 */
async function backfillCrawlDepths(
  auditId: string,
  depths: Array<{ url: string; depth: number; exact: boolean }>,
) {
  if (depths.length === 0) return;
  await executeInBatches(depths, (tx, { url, depth }) =>
    tx
      .update(auditPages)
      .set({ crawlDepth: depth })
      .where(
        and(
          eq(auditPages.auditId, auditId),
          eq(auditPages.url, url),
          or(isNull(auditPages.crawlDepth), gt(auditPages.crawlDepth, depth)),
        ),
      ),
  );

  const deepPages = await db
    .select({
      id: auditPages.id,
      url: auditPages.url,
      crawlDepth: auditPages.crawlDepth,
    })
    .from(auditPages)
    .where(
      and(
        eq(auditPages.auditId, auditId),
        gte(auditPages.crawlDepth, DEEP_PAGE_DEPTH),
      ),
    );
  const exact = depths.every((entry) => entry.exact);
  await runBatch((tx) => [
    tx.delete(auditIssues).where(
      and(
        eq(auditIssues.auditId, auditId),
        eq(auditIssues.issueType, "deep-page"),
        // Exact: rebuilt below with current details. Otherwise: keep what the
        // crawl found unless the page is now known to be shallow.
        exact
          ? undefined
          : notInArray(
              auditIssues.pageId,
              tx
                .select({ id: auditPages.id })
                .from(auditPages)
                .where(
                  and(
                    eq(auditPages.auditId, auditId),
                    gte(auditPages.crawlDepth, DEEP_PAGE_DEPTH),
                  ),
                ),
            ),
      ),
    ),
  ]);
  if (!exact) return;
  await insertIssues(
    auditId,
    deepPages.map((page) => ({
      issueType: "deep-page" as const,
      pageId: page.id,
      pageUrl: page.url,
      details: { crawlDepth: page.crawlDepth },
    })),
  );
}

export const AuditCrawlRepository = {
  insertCrawledBatch,
  insertIssues,
  backfillCrawlDepths,
} as const;
