/**
 * Data access layer for site audit tables.
 * Provider-aware (D1 or Postgres) via the `@/db` handle. Covers audits,
 * audit_pages, audit_issues, and stored Lighthouse results. Link edges live
 * in the per-audit scratchpad Durable Object, not here.
 */
import { and, asc, count, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  audits,
  auditIssues,
  auditLighthouseResults,
  auditPages,
  projects,
} from "@/db/schema";
import { getIssueCountsByAudit } from "./auditSummaryQueries";
import { AuditCrawlRepository } from "./AuditCrawlRepository";
import type { AuditConfig } from "@/server/lib/audit/types";
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
        // Same guard as failAudit: a finished audit never changes state
        // again, so one the reconciler already failed does not flip to
        // completed with its error columns still set.
        eq(audits.status, "running"),
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

/*
 * Page columns the results screen, CSV export and report read. The heavy
 * `imagesJson`, `headingOrderJson` and `hreflangTagsJson` blobs stay out:
 * on a 10k-page audit they were tens of MB through D1 and the query cache.
 */
const slimPageColumns = {
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
};

async function getPagesForAudit(auditId: string) {
  return db
    .select(slimPageColumns)
    .from(auditPages)
    .where(eq(auditPages.auditId, auditId));
}

/**
 * One filtered, URL-ordered slice of an audit's pages plus the count of every
 * match, for callers that show a bounded list (MCP get_audit_pages). The filter
 * and LIMIT run in SQL so a 10k-page audit never crosses D1 to be filtered in
 * JS. `instr` keeps the substring match case-sensitive, as `String.includes`
 * was; LIKE would not.
 */
async function searchPagesForAudit(
  auditId: string,
  filters: {
    fetchClass?: PageFetchClass;
    statusCode?: number;
    urlContains?: string;
    limit: number;
  },
) {
  const where = and(
    eq(auditPages.auditId, auditId),
    filters.fetchClass
      ? eq(auditPages.fetchClass, filters.fetchClass)
      : undefined,
    filters.statusCode !== undefined
      ? eq(auditPages.statusCode, filters.statusCode)
      : undefined,
    filters.urlContains
      ? sql`instr(${auditPages.url}, ${filters.urlContains}) > 0`
      : undefined,
  );
  const [pages, [totalRow]] = await Promise.all([
    db
      .select(slimPageColumns)
      .from(auditPages)
      .where(where)
      .orderBy(asc(auditPages.url), asc(auditPages.id))
      .limit(filters.limit),
    db.select({ value: count() }).from(auditPages).where(where),
  ]);
  return { pages, total: totalRow?.value ?? 0 };
}

/** URLs for a handful of page ids (one Lighthouse wave); ids are few, so one IN list stays under D1's bound-parameter limit. */
async function getPageUrlsByIds(auditId: string, ids: string[]) {
  if (ids.length === 0) return [];
  return db
    .select({ id: auditPages.id, url: auditPages.url })
    .from(auditPages)
    .where(and(eq(auditPages.auditId, auditId), inArray(auditPages.id, ids)));
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

// Only audits still running count, for both the concurrency and the capacity
// guards: the limits describe what the machine carries at once. Counting
// finished audits made the capacity ceiling a lifetime quota that only
// deleting history could clear. Org-scoped like the project rows it joins.
async function getAuditUsageForOrganization(organizationId: string) {
  const rows = await db
    .select({
      pagesTotal: audits.pagesTotal,
      lighthouseTotal: audits.lighthouseTotal,
    })
    .from(audits)
    .innerJoin(projects, eq(audits.projectId, projects.id))
    .where(
      and(
        eq(projects.organizationId, organizationId),
        eq(audits.status, "running"),
      ),
    );

  return {
    capacityUnits: rows.reduce(
      (total, row) => total + row.pagesTotal + row.lighthouseTotal,
      0,
    ),
    runningCount: rows.length,
  };
}

async function getAuditResultsForProject(auditId: string, projectId: string) {
  const audit = await getAuditForProject(auditId, projectId);
  if (!audit) {
    return { audit: null, pages: [], lighthouse: [], issues: [] };
  }

  const [pages, lighthouse, issues] = await Promise.all([
    db
      .select({
        ...slimPageColumns,
        h1Count: auditPages.h1Count,
        imagesTotal: auditPages.imagesTotal,
        imagesMissingAlt: auditPages.imagesMissingAlt,
      })
      .from(auditPages)
      .where(eq(auditPages.auditId, auditId)),
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
  ...AuditCrawlRepository,
  getAuditForProject,
  getLatestAuditForProject,
  getIssuesForAudit,
  getPagesForAudit,
  searchPagesForAudit,
  getPageUrlsByIds,
  countPagesByFetchClass,
  hasPagesForAudit,
  getAuditsByProject,
  getIssueCountsByAudit,
  getAuditUsageForOrganization,
  getAuditResultsForProject,
  deleteAuditForProject,
} as const;
