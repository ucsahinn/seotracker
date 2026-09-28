/**
 * The speed measurement, turned into findings.
 *
 * `audit_lighthouse_results` has been filled by every Lighthouse-enabled
 * audit and read by exactly one tab. A page with a four-second LCP produced
 * no issue, so it was absent from the issue list, the severity rollup, the
 * CSV export and the MCP issue tool — the audit called it clean.
 *
 * Free by construction: this reads rows the Lighthouse phase already wrote
 * and calls nothing.
 */
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { auditLighthouseResults, auditPages } from "@/db/schema";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import { lighthouseIssuesFor } from "@/server/features/audit/lighthouseIssues";

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

export async function findLighthouseProblems(input: {
  auditId: string;
}): Promise<DetectedIssue[]> {
  const rows = await db
    .select({
      pageId: auditPages.id,
      pageUrl: auditPages.url,
      lcpMs: auditLighthouseResults.lcpMs,
      cls: auditLighthouseResults.cls,
      inpMs: auditLighthouseResults.inpMs,
      seoScore: auditLighthouseResults.seoScore,
      errorMessage: auditLighthouseResults.errorMessage,
    })
    .from(auditLighthouseResults)
    .innerJoin(auditPages, eq(auditPages.id, auditLighthouseResults.pageId))
    .where(
      and(
        eq(auditLighthouseResults.auditId, input.auditId),
        eq(auditLighthouseResults.strategy, DECIDING_STRATEGY),
      ),
    );

  return lighthouseIssuesFor(rows);
}
