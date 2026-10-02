import { count, desc, eq, max, sql, and } from "drizzle-orm";
import { db } from "@/db";
import {
  auditLighthouseResults,
  audits,
  reports,
  reportTemplates,
} from "@/db/schema";
import { inspectionsInLastDay } from "@/server/features/gsc/services/GscIndexCoverageService";
import {
  LIGHTHOUSE_NO_KEY_MARKER,
  LIGHTHOUSE_QUOTA_MARKER,
  LIGHTHOUSE_RATE_LIMIT_MARKER,
} from "@/shared/audit-limits";

/** Reads only: every figure here is already in the database. */

export type PageSpeedUsage = {
  /** Checks that produced a score, in audits started since the cutoff. */
  measured: number;
  quotaEvents: number;
  rateLimitEvents: number;
  noKeyEvents: number;
  /** Start of the newest audit that recorded a quota or rate-limit stop. */
  lastEventAt: string | null;
};

const startsWith = (marker: string) =>
  sql<number>`coalesce(sum(case when ${auditLighthouseResults.errorMessage} like ${`${marker}%`} then 1 else 0 end), 0)`;

/**
 * `audit_lighthouse_results` has no timestamp of its own, so a check counts
 * for the day its audit started. SQLite's `datetime()` reads both stamp
 * shapes the column can hold.
 */
async function pageSpeedUsageSince(
  projectId: string,
  since: Date,
): Promise<PageSpeedUsage> {
  const inWindow = and(
    eq(audits.projectId, projectId),
    sql`datetime(${audits.startedAt}) >= datetime(${since.toISOString()})`,
  );
  const [totals] = await db
    .select({
      measured: sql<number>`coalesce(sum(case when ${auditLighthouseResults.errorMessage} is null then 1 else 0 end), 0)`,
      quota: startsWith(LIGHTHOUSE_QUOTA_MARKER),
      rateLimit: startsWith(LIGHTHOUSE_RATE_LIMIT_MARKER),
      noKey: startsWith(LIGHTHOUSE_NO_KEY_MARKER),
    })
    .from(auditLighthouseResults)
    .innerJoin(audits, eq(audits.id, auditLighthouseResults.auditId))
    .where(inWindow);
  const [last] = await db
    .select({ startedAt: audits.startedAt })
    .from(auditLighthouseResults)
    .innerJoin(audits, eq(audits.id, auditLighthouseResults.auditId))
    .where(
      and(
        inWindow,
        sql`(${auditLighthouseResults.errorMessage} like ${`${LIGHTHOUSE_QUOTA_MARKER}%`} or ${auditLighthouseResults.errorMessage} like ${`${LIGHTHOUSE_RATE_LIMIT_MARKER}%`})`,
      ),
    )
    .orderBy(desc(audits.startedAt))
    .limit(1);
  return {
    measured: Number(totals?.measured ?? 0),
    quotaEvents: Number(totals?.quota ?? 0),
    rateLimitEvents: Number(totals?.rateLimit ?? 0),
    noKeyEvents: Number(totals?.noKey ?? 0),
    lastEventAt: last?.startedAt ?? null,
  };
}

async function latestAuditPages(
  projectId: string,
): Promise<{ pages: number; startedAt: string } | null> {
  const [row] = await db
    .select({ pages: audits.pagesCrawled, startedAt: audits.startedAt })
    .from(audits)
    .where(eq(audits.projectId, projectId))
    .orderBy(desc(audits.startedAt))
    .limit(1);
  return row ?? null;
}

async function reportFigures(projectId: string): Promise<{
  reportCount: number;
  largestReportBytes: number | null;
  templateCount: number;
}> {
  const [reportRow] = await db
    .select({ value: count(), largest: max(reports.sizeBytes) })
    .from(reports)
    .where(eq(reports.projectId, projectId));
  const [templateRow] = await db
    .select({ value: count() })
    .from(reportTemplates)
    .where(eq(reportTemplates.projectId, projectId));
  return {
    reportCount: reportRow?.value ?? 0,
    largestReportBytes: reportRow?.largest ?? null,
    templateCount: templateRow?.value ?? 0,
  };
}

export const QuotaRepository = {
  // The ledger that gates real inspections is the one the meter reads, so the
  // two cannot disagree.
  inspectionsInLastDay,
  pageSpeedUsageSince,
  latestAuditPages,
  reportFigures,
};
