/**
 * Data access layer for site audit tables.
 * Provider-aware (D1 or Postgres) via the `@/db` handle. Covers audits,
 * audit_pages, audit_issues, and stored Lighthouse results. Link edges live
 * in the per-audit scratchpad Durable Object, not here.
 */
import { and, count, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import {
  audits,
  auditIssues,
  auditLighthouseResults,
  auditPages,
  projects,
} from "@/db/schema";
import { executeInBatches } from "@/db/runBatch";
import { AUDIT_ISSUE_TYPES } from "@/shared/audit-issues";
import { deterministicAuditRowId } from "@/server/lib/audit/ids";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import type { AuditConfig, CrawledPageResult } from "@/server/lib/audit/types";
import type { PageFetchClass } from "@/shared/audit-fetch-class";

async function createAudit(data: {
  id: string;
  projectId: string;
  startedByUserId: string;
  startUrl: string;
  workflowInstanceId: string;
  config: AuditConfig;
  pagesTotal: number;
  lighthouseTotal: number;
}) {
  await db.insert(audits).values({
    id: data.id,
    projectId: data.projectId,
    startedByUserId: data.startedByUserId,
    startUrl: data.startUrl,
    workflowInstanceId: data.workflowInstanceId,
    config: JSON.stringify(data.config),
    status: "running",
    pagesTotal: data.pagesTotal,
    lighthouseTotal: data.lighthouseTotal,
    currentPhase: "discovery",
  });
}

async function updateAuditProgress(
  auditId: string,
  workflowInstanceId: string,
  data: {
    pagesCrawled?: number;
    pagesTotal?: number;
    lighthouseTotal?: number;
    lighthouseCompleted?: number;
    lighthouseFailed?: number;
    currentPhase?: string;
  },
) {
  await db
    .update(audits)
    .set(data)
    .where(
      and(
        eq(audits.id, auditId),
        eq(audits.workflowInstanceId, workflowInstanceId),
      ),
    );
}

async function completeAudit(
  auditId: string,
  workflowInstanceId: string,
  data: {
    pagesCrawled: number;
    pagesTotal: number;
  },
) {
  await db
    .update(audits)
    .set({
      status: "completed",
      completedAt: new Date().toISOString(),
      currentPhase: "completed",
      ...data,
    })
    .where(
      and(
        eq(audits.id, auditId),
        eq(audits.workflowInstanceId, workflowInstanceId),
      ),
    );
}

async function failAudit(
  auditId: string,
  workflowInstanceId: string,
  errorInfo?: {
    errorCode: string;
    errorDetail: string;
    failedPhase: string | null;
  },
) {
  // Only a running audit can transition to failed: the getStatus reconciler
  // races the workflow's own finalize, and without this guard it could flip
  // a just-completed audit to failed.
  await db
    .update(audits)
    .set({
      status: "failed",
      completedAt: new Date().toISOString(),
      currentPhase: "failed",
      ...(errorInfo && {
        errorCode: errorInfo.errorCode,
        errorDetail: errorInfo.errorDetail,
        failedPhase: errorInfo.failedPhase,
      }),
    })
    .where(
      and(
        eq(audits.id, auditId),
        eq(audits.workflowInstanceId, workflowInstanceId),
        eq(audits.status, "running"),
      ),
    );
}

async function getAuditForWorkflow(
  auditId: string,
  workflowInstanceId: string,
) {
  return db.query.audits.findFirst({
    where: and(
      eq(audits.id, auditId),
      eq(audits.workflowInstanceId, workflowInstanceId),
    ),
  });
}

/**
 * Persist one crawled sub-batch (pages + per-page issues). Called inside the
 * crawl-chunk Workflow step so results land in the app DB incrementally
 * instead of accumulating in memory until finalize. Link edges go to the
 * audit's scratchpad DO, not here.
 *
 * Idempotent on step retry: callers assign deterministic page ids
 * (deterministicAuditRowId) and issue ids are derived from stable content.
 * Page rows upsert (a retried fetch may legitimately differ — last attempt
 * wins); issues are insert-or-ignore.
 */
async function insertCrawledBatch(
  auditId: string,
  pages: CrawledPageResult[],
  issues: DetectedIssue[],
) {
  await executeInBatches(pages, (tx, page) => {
    const dataColumns = {
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
    return tx
      .insert(auditPages)
      .values({ id: page.id, auditId, ...dataColumns })
      .onConflictDoUpdate({ target: auditPages.id, set: dataColumns });
  });

  await insertIssues(auditId, issues);
}

async function insertIssues(auditId: string, issues: DetectedIssue[]) {
  const issueRows = await Promise.all(
    issues.map(async (issue) => ({
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
    })),
  );
  await executeInBatches(issueRows, (tx, row) =>
    tx.insert(auditIssues).values(row).onConflictDoNothing(),
  );
}

async function getAuditForProject(auditId: string, projectId: string) {
  return db.query.audits.findFirst({
    where: and(eq(audits.id, auditId), eq(audits.projectId, projectId)),
  });
}

async function getLatestAuditForProject(projectId: string) {
  return db.query.audits.findFirst({
    where: eq(audits.projectId, projectId),
    orderBy: desc(audits.startedAt),
  });
}

async function getIssuesForAudit(
  auditId: string,
  filters: { severity?: "critical" | "warning" | "info"; issueType?: string },
) {
  return db.query.auditIssues.findMany({
    where: and(
      eq(auditIssues.auditId, auditId),
      filters.severity ? eq(auditIssues.severity, filters.severity) : undefined,
      filters.issueType
        ? eq(auditIssues.issueType, filters.issueType)
        : undefined,
    ),
  });
}

/**
 * Write the click depths the frontier worked out after the rows were saved.
 *
 * Only where the row has none: a depth already on the row came from the
 * lease and is the one the crawl actually used, and the frontier's repair
 * only ever lowers a value, so overwriting would rewrite history for no
 * gain.
 */
async function backfillCrawlDepths(
  auditId: string,
  depths: Array<{ url: string; depth: number }>,
) {
  await executeInBatches(depths, (tx, { url, depth }) =>
    tx
      .update(auditPages)
      .set({ crawlDepth: depth })
      .where(
        and(
          eq(auditPages.auditId, auditId),
          eq(auditPages.url, url),
          isNull(auditPages.crawlDepth),
        ),
      ),
  );
}

async function getPagesForAudit(auditId: string) {
  return db
    .select({
      id: auditPages.id,
      url: auditPages.url,
      statusCode: auditPages.statusCode,
      fetchClass: auditPages.fetchClass,
      redirectUrl: auditPages.redirectUrl,
      title: auditPages.title,
      metaDescription: auditPages.metaDescription,
      wordCount: auditPages.wordCount,
      isIndexable: auditPages.isIndexable,
      crawlDepth: auditPages.crawlDepth,
      inSitemap: auditPages.inSitemap,
      internalLinkCount: auditPages.internalLinkCount,
      externalLinkCount: auditPages.externalLinkCount,
      responseTimeMs: auditPages.responseTimeMs,
    })
    .from(auditPages)
    .where(eq(auditPages.auditId, auditId));
}

async function countPagesByFetchClass(
  auditId: string,
  fetchClass: PageFetchClass,
): Promise<number> {
  const rows = await db
    .select({ pages: count() })
    .from(auditPages)
    .where(
      and(
        eq(auditPages.auditId, auditId),
        eq(auditPages.fetchClass, fetchClass),
      ),
    );
  return rows[0]?.pages ?? 0;
}

async function hasPagesForAudit(auditId: string): Promise<boolean> {
  const rows = await db
    .select({ id: auditPages.id })
    .from(auditPages)
    .where(eq(auditPages.auditId, auditId))
    .limit(1);
  return rows.length > 0;
}

async function getAuditsByProject(projectId: string) {
  const rows = await db
    .select({ audit: audits })
    .from(audits)
    .where(eq(audits.projectId, projectId))
    .orderBy(desc(audits.startedAt));

  return rows.map(({ audit }) => audit);
}

async function getIssueCountsByAudit(projectId: string) {
  /*
   * One grouped query for the whole history, rather than one per row.
   * `audit_issues_audit_type_idx` leads with `audit_id`, so the join to
   * `audits` for the project filter reads the index rather than the table.
   */
  const rows = await db
    .select({
      auditId: auditIssues.auditId,
      severity: auditIssues.severity,
      total: count(),
    })
    .from(auditIssues)
    .innerJoin(audits, eq(audits.id, auditIssues.auditId))
    .where(eq(audits.projectId, projectId))
    .groupBy(auditIssues.auditId, auditIssues.severity);

  const byAudit = new Map<
    string,
    { critical: number; warning: number; info: number }
  >();
  for (const row of rows) {
    const entry = byAudit.get(row.auditId) ?? {
      critical: 0,
      warning: 0,
      info: 0,
    };
    entry[row.severity] = row.total;
    byAudit.set(row.auditId, entry);
  }
  return byAudit;
}

// Org-scoped: the free-plan quota belongs to the org (the Autumn customer),
// so usage must aggregate across every member — counting per starting user
// would multiply the free ceiling by the member count.
async function getAuditUsageForOrganization(organizationId: string) {
  const rows = await db
    .select({
      status: audits.status,
      pagesTotal: audits.pagesTotal,
      lighthouseTotal: audits.lighthouseTotal,
    })
    .from(audits)
    .innerJoin(projects, eq(audits.projectId, projects.id))
    .where(eq(projects.organizationId, organizationId));

  return {
    capacityUnits: rows.reduce(
      (total, row) => total + row.pagesTotal + row.lighthouseTotal,
      0,
    ),
    runningCount: rows.filter((row) => row.status === "running").length,
  };
}

async function getAuditResultsForProject(auditId: string, projectId: string) {
  const audit = await getAuditForProject(auditId, projectId);
  if (!audit) {
    return { audit: null, pages: [], lighthouse: [], issues: [] };
  }

  const [pages, lighthouse, issues] = await Promise.all([
    db.query.auditPages.findMany({
      where: eq(auditPages.auditId, auditId),
    }),
    db.query.auditLighthouseResults.findMany({
      where: eq(auditLighthouseResults.auditId, auditId),
    }),
    db.query.auditIssues.findMany({
      where: eq(auditIssues.auditId, auditId),
    }),
  ]);

  return { audit, pages, lighthouse, issues };
}

async function deleteAuditForProject(auditId: string, projectId: string) {
  await db
    .delete(audits)
    .where(and(eq(audits.id, auditId), eq(audits.projectId, projectId)));
}

export const AuditRepository = {
  createAudit,
  updateAuditProgress,
  completeAudit,
  failAudit,
  getAuditForWorkflow,
  insertCrawledBatch,
  insertIssues,
  getAuditForProject,
  getLatestAuditForProject,
  getIssuesForAudit,
  getPagesForAudit,
  backfillCrawlDepths,
  countPagesByFetchClass,
  hasPagesForAudit,
  getAuditsByProject,
  getIssueCountsByAudit,
  getAuditUsageForOrganization,
  getAuditResultsForProject,
  deleteAuditForProject,
} as const;
