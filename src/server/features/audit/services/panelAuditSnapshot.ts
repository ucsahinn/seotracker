import { getAuditResults } from "./auditResults";
import { getIssueTypePageCountsForAudit } from "../repositories/auditSummaryQueries";
import { buildAuditBreakdown, checkMeasured } from "@/shared/auditBreakdown";
import { findingsFromIssues } from "@/shared/auditScore";
import type { PanelAuditSnapshot } from "@/shared/panelAuditComparison";
/** Stored evidence only: no Google API request or reconstructed historical inspection state. */
export async function loadPanelAuditSnapshot(
  projectId: string,
  auditId: string,
): Promise<PanelAuditSnapshot> {
  const [result, counts] = await Promise.all([
    getAuditResults(auditId, projectId),
    getIssueTypePageCountsForAudit(auditId),
  ]);
  const ctx = {
    pagesCrawled: result.audit.pagesCrawled,
    hasLighthouse:
      result.lighthouse.length > 0 &&
      result.lighthouse.every((row) => row.performanceScore !== null),
    siteFacts: result.siteFacts,
    googleInspected: null,
    analyticsCompared: result.audit.analyticsCompared,
  };
  const breakdown = buildAuditBreakdown(
    findingsFromIssues(result.issues, result.audit.pagesCrawled),
    ctx,
  );
  const pageUrls = new Map(result.pages.map((page) => [page.id, page.url]));
  return {
    startUrl: result.audit.startUrl,
    completed:
      result.audit.status === "completed" &&
      !result.issues.some((issue) => issue.issueType === "crawl-rate-limited"),
    config: result.audit.config,
    pages: result.pages,
    measuredChecks: breakdown.checks
      .filter((check) => checkMeasured(check.issueType, ctx))
      .map((check) => check.issueType),
    counts,
    speedUrls: ctx.hasLighthouse
      ? result.lighthouse.flatMap((row) => {
          const url = pageUrls.get(row.pageId);
          return url ? [url] : [];
        })
      : [],
  };
}
