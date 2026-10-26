/**
 * The speed measurement, turned into findings.
 *
 * `audit_lighthouse_results` has been filled by every Lighthouse-enabled
 * audit and read by exactly one tab. A page with a four-second LCP produced
 * no issue, so it was absent from the issue list, the severity rollup, the
 * CSV export and the MCP issue tool — the audit called it clean.
 *
 * Free by construction: this reads rows the Lighthouse phase already wrote,
 * and the compact reports it stored in R2, and calls nothing.
 */
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { auditLighthouseResults, auditPages } from "@/db/schema";
import { AuditSiteFactsRepository } from "@/server/features/audit/repositories/AuditSiteFactsRepository";
import { lighthouseIssuesFor } from "@/server/features/audit/lighthouseIssues";
import {
  lighthouseAuditIssuesFor,
  type LighthousePageReport,
} from "@/server/lib/audit/issues/lighthouse-audit-checks";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import { readStoredLighthousePayload } from "@/server/lib/lighthousePayload";
import { getJsonFromR2 } from "@/server/lib/r2";

/*
 * Mobile only.
 *
 * Every page is measured twice, and reporting both would file the same
 * finding against the same page twice. Google indexes mobile-first and its
 * own thresholds are written for mobile, so that is the run that decides.
 * The desktop row stays on the Performance tab, where the reader is
 * comparing the two on purpose.
 */
const DECIDING_STRATEGY = "mobile" as const;

/** Stored reports read at once; each is a few kilobytes. */
const R2_READ_CONCURRENCY = 8;

type StoredRow = {
  pageId: string;
  pageUrl: string;
  isIndexable: boolean;
  r2Key: string | null;
};

/** One page's stored report, or null when it cannot be read. */
async function readReport(
  row: StoredRow,
): Promise<LighthousePageReport | null> {
  if (!row.r2Key) return null;
  try {
    const { storedPayload } = readStoredLighthousePayload(
      await getJsonFromR2(row.r2Key),
    );
    if (!storedPayload) return null;
    return {
      pageId: row.pageId,
      pageUrl: row.pageUrl,
      isIndexable: row.isIndexable,
      audits: storedPayload.audits ?? null,
      fieldData: storedPayload.fieldData ?? null,
      labLcpMs: storedPayload.metrics.largestContentfulPaint.numericValue,
      labCls: storedPayload.metrics.cumulativeLayoutShift.numericValue,
    };
  } catch (error) {
    // A missing or unreadable report is "not measured" for that page.
    console.warn(`Lighthouse report unreadable for ${row.pageUrl}:`, error);
    return null;
  }
}

async function readReports(rows: StoredRow[]) {
  const reports: LighthousePageReport[] = [];
  for (let i = 0; i < rows.length; i += R2_READ_CONCURRENCY) {
    const batch = await Promise.all(
      rows.slice(i, i + R2_READ_CONCURRENCY).map(readReport),
    );
    for (const report of batch) if (report) reports.push(report);
  }
  return reports;
}

export async function findLighthouseProblems(input: {
  auditId: string;
  startUrl: string;
}): Promise<DetectedIssue[]> {
  const rows = await db
    .select({
      pageId: auditPages.id,
      pageUrl: auditPages.url,
      isIndexable: auditPages.isIndexable,
      lcpMs: auditLighthouseResults.lcpMs,
      cls: auditLighthouseResults.cls,
      inpMs: auditLighthouseResults.inpMs,
      seoScore: auditLighthouseResults.seoScore,
      errorMessage: auditLighthouseResults.errorMessage,
      r2Key: auditLighthouseResults.r2Key,
    })
    .from(auditLighthouseResults)
    .innerJoin(auditPages, eq(auditPages.id, auditLighthouseResults.pageId))
    .where(
      and(
        eq(auditLighthouseResults.auditId, input.auditId),
        eq(auditLighthouseResults.strategy, DECIDING_STRATEGY),
      ),
    );

  // A failed measurement has no report; only stored ones are read.
  const reports = await readReports(
    rows.filter((row) => !row.errorMessage && row.r2Key !== null),
  );
  const fromReports = lighthouseAuditIssuesFor(reports, input.startUrl);
  await AuditSiteFactsRepository.recordMeasuredChecks(
    input.auditId,
    fromReports.measured,
  );

  return [...lighthouseIssuesFor(rows), ...fromReports.issues];
}
