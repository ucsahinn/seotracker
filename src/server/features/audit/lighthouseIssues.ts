/**
 * Whether a speed measurement is a finding, decided from values alone.
 *
 * A leaf module on purpose: the read that fetches these rows imports `@/db`,
 * which pulls in `cloudflare:workers` and cannot be loaded by the unit test
 * project. Keeping the decisions here means they are tested against values
 * rather than against a mocked query builder, which is what the house rule
 * asks for.
 */
import { CWV_POOR, SEO_SCORE_FLOOR } from "@/shared/audit-issues/speed";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";

export type LighthouseMeasurement = {
  pageId: string;
  pageUrl: string;
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  seoScore: number | null;
  errorMessage: string | null;
};

/**
 * The decisions, separated from the read so they can be tested against
 * values rather than against a mocked query builder.
 */
export function lighthouseIssuesFor(
  rows: LighthouseMeasurement[],
): DetectedIssue[] {
  const issues: DetectedIssue[] = [];

  for (const row of rows) {
    /*
     * A failed measurement is not a slow page. The Performance tab already
     * shows the error; turning a missing number into a "poor LCP" would be
     * a finding about the measurement, not about the site.
     */
    if (row.errorMessage) continue;
    const at = { pageId: row.pageId, pageUrl: row.pageUrl };

    if (row.lcpMs !== null && row.lcpMs > CWV_POOR.lcpMs) {
      issues.push({
        ...at,
        issueType: "cwv-lcp-poor",
        details: { lcpMs: Math.round(row.lcpMs), thresholdMs: CWV_POOR.lcpMs },
      });
    }

    if (row.cls !== null && row.cls > CWV_POOR.cls) {
      issues.push({
        ...at,
        issueType: "cwv-cls-poor",
        // Two decimals: CLS is a ratio, and the raw float is noise.
        details: {
          cls: Math.round(row.cls * 100) / 100,
          threshold: CWV_POOR.cls,
        },
      });
    }

    if (row.inpMs !== null && row.inpMs > CWV_POOR.inpMs) {
      issues.push({
        ...at,
        issueType: "cwv-inp-poor",
        details: { inpMs: Math.round(row.inpMs), thresholdMs: CWV_POOR.inpMs },
      });
    }

    if (row.seoScore !== null && row.seoScore < SEO_SCORE_FLOOR) {
      issues.push({
        ...at,
        issueType: "lighthouse-seo-low",
        details: { score: row.seoScore, floor: SEO_SCORE_FLOOR },
      });
    }
  }

  return issues;
}
