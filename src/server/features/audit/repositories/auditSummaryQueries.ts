import { countDistinct, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { auditIssues } from "@/db/schema";

/**
 * Distinct-page counts per issue type for one audit — link-level issues
 * write one row per occurrence, and consumers phrase this as "N pages".
 * Lives beside AuditRepository (same pattern as rank-tracking's
 * snapshotQueries) to keep the main repository under the file-size limit.
 */
export async function getIssueTypePageCountsForAudit(auditId: string) {
  return db
    .select({
      issueType: auditIssues.issueType,
      severity: auditIssues.severity,
      pages: countDistinct(auditIssues.pageUrl),
    })
    .from(auditIssues)
    .where(eq(auditIssues.auditId, auditId))
    .groupBy(auditIssues.issueType, auditIssues.severity);
}

/**
 * The pages with the most wrong with them, worst severity first.
 *
 * The dashboard could say which issue *types* an audit found and never
 * which *pages* to open, yet opening a page is always the next move. Same
 * table, grouped the other way: one row per URL, ranked by how bad its
 * worst finding is and then by how many it has.
 *
 * `severity` is text, so the ordering is spelled out rather than left to
 * alphabetical, which would put "critical" after "warning" only by luck.
 */
export async function getTopAffectedPagesForAudit(
  auditId: string,
  limit: number,
) {
  const worstRank = sql<number>`min(case ${auditIssues.severity}
    when 'critical' then 0
    when 'warning' then 1
    else 2 end)`;

  return db
    .select({
      pageUrl: auditIssues.pageUrl,
      issueCount: countDistinct(auditIssues.issueType),
      worstRank,
    })
    .from(auditIssues)
    .where(eq(auditIssues.auditId, auditId))
    .groupBy(auditIssues.pageUrl)
    .orderBy(worstRank, desc(countDistinct(auditIssues.issueType)))
    .limit(limit);
}
