/**
 * Findings from the Lighthouse audits the stored payload keeps, decided
 * from values alone (the R2 read lives in `lighthouse-checks.ts`).
 *
 * Every finding is Lighthouse's own verdict plus the floor in
 * `lighthouse-audit-rules.ts`; every check also reports whether it was
 * judged at all, because an audit Lighthouse skipped, errored on or did not
 * run must read "unknown", never "passed".
 */
import { entries } from "remeda";
import type { StoredAuditResult } from "@/server/lib/lighthouseStoredPayload";
import type { StoredFieldData } from "@/server/lib/lighthouseStoredPayload";
import {
  LIGHTHOUSE_AUDIT_SPECS,
  type LighthouseAuditIssueType,
  type LighthouseAuditSpec,
} from "@/server/lib/audit/lighthouse-audit-rules";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import { CWV_POOR } from "@/shared/audit-issues/speed";

/** Lighthouse's own pass line for a scored audit. */
const PASS_SCORE = 0.9;

/** Google's "good" boundaries; between these and "poor" needs improvement. */
const CWV_GOOD = { lcpMs: 2500, cls: 0.1, inpMs: 200 } as const;

export type LighthousePageReport = {
  pageId: string;
  pageUrl: string;
  /** What the crawl decided; `lh-is-crawlable` is only a finding against it. */
  isIndexable: boolean;
  /** Null for a payload stored before the verdicts were kept. */
  audits: Record<string, StoredAuditResult> | null;
  /** This URL's own Chrome field data (never the origin fallback). */
  fieldData: StoredFieldData | null;
  labLcpMs: number | null;
  labCls: number | null;
};

type Verdict = "pass" | "fail" | null;

function judge(spec: LighthouseAuditSpec, result: StoredAuditResult): Verdict {
  if (result.mode === "error" || result.mode === "manual") return null;
  if (result.mode === "notApplicable") return "pass";
  const rule = spec.rule;
  switch (rule.kind) {
    case "failed":
      if (result.score === null) return null;
      return result.score < PASS_SCORE ? "fail" : "pass";
    case "savings": {
      if (result.score === null) return null;
      if (result.score >= PASS_SCORE) return "pass";
      const material =
        (rule.minMs !== undefined && (result.savingsMs ?? 0) >= rule.minMs) ||
        (rule.minBytes !== undefined &&
          (result.savingsBytes ?? 0) >= rule.minBytes);
      return material ? "fail" : "pass";
    }
    case "checklist": {
      const values = rule.keys.map((key) => result.checklist?.[key]);
      if (values.some((value) => value === false)) return "fail";
      if (values.every((value) => value === true)) return "pass";
      // No checklist: the insight passed without one, or did not say.
      return result.score === 1 && result.checklist === null ? "pass" : null;
    }
    case "mainThread":
      if (result.mainThreadMs !== null) {
        return result.mainThreadMs >= rule.minMs ? "fail" : "pass";
      }
      // "pass" is Lighthouse's state when no third party loaded at all.
      return result.score === 1 ? "pass" : null;
    case "numericAbove":
      if (result.numericValue === null) return null;
      return result.numericValue > rule.limit ? "fail" : "pass";
  }
}

function detailsFor(
  spec: LighthouseAuditSpec,
  result: StoredAuditResult,
): Record<string, unknown> {
  const details: Record<string, unknown> = { lighthouseAudit: spec.audit };
  const rule = spec.rule;
  if (rule.kind === "savings") {
    if (result.savingsMs !== null) {
      details.savingsMs = Math.round(result.savingsMs);
    }
    if (result.savingsBytes !== null) {
      details.savingsBytes = Math.round(result.savingsBytes);
    }
  }
  if (rule.kind === "checklist") {
    details.failed = rule.keys.filter(
      (key) => result.checklist?.[key] === false,
    );
    if (result.savingsMs !== null) {
      details.savingsMs = Math.round(result.savingsMs);
    }
  }
  if (rule.kind === "mainThread") details.mainThreadMs = result.mainThreadMs;
  if (rule.kind === "numericAbove") details.totalBytes = result.numericValue;
  if (rule.kind === "failed" && result.itemCount !== null) {
    details.items = result.itemCount;
  }
  if (result.examples.length > 0) details.examples = result.examples;
  return details;
}

/** The value a band check reads, and which measurement it came from. */
function bandValue(
  field: { percentile: number } | null | undefined,
  lab: number | null,
  scale = 1,
): { value: number; source: "field" | "lab" } | null {
  if (field) return { value: field.percentile / scale, source: "field" };
  return lab === null ? null : { value: lab, source: "lab" };
}

function needsImprovementChecks(
  page: LighthousePageReport,
  measured: Set<string>,
  report: (
    issueType: DetectedIssue["issueType"],
    details: Record<string, unknown>,
  ) => void,
) {
  /*
   * The poor checks read the lab number (and field INP), so a page they
   * already report is left to them: one page is never "poor" and "needs
   * improvement" for the same metric at once.
   */
  const lcp = bandValue(page.fieldData?.largestContentfulPaint, page.labLcpMs);
  if (lcp) {
    measured.add("cwv-lcp-needs-improvement");
    const labPoor = (page.labLcpMs ?? 0) > CWV_POOR.lcpMs;
    if (!labPoor && lcp.value > CWV_GOOD.lcpMs && lcp.value <= CWV_POOR.lcpMs) {
      report("cwv-lcp-needs-improvement", {
        lcpMs: Math.round(lcp.value),
        source: lcp.source,
        goodMs: CWV_GOOD.lcpMs,
        poorMs: CWV_POOR.lcpMs,
      });
    }
  }
  // CrUX reports CLS multiplied by 100.
  const cls = bandValue(
    page.fieldData?.cumulativeLayoutShift,
    page.labCls,
    100,
  );
  if (cls) {
    measured.add("cwv-cls-needs-improvement");
    const labPoor = (page.labCls ?? 0) > CWV_POOR.cls;
    if (!labPoor && cls.value > CWV_GOOD.cls && cls.value <= CWV_POOR.cls) {
      report("cwv-cls-needs-improvement", {
        cls: Math.round(cls.value * 100) / 100,
        source: cls.source,
        good: CWV_GOOD.cls,
        poor: CWV_POOR.cls,
      });
    }
  }
  // The lab run cannot interact, so INP is field data or nothing.
  const inp = page.fieldData?.interactionToNextPaint;
  if (inp) {
    measured.add("cwv-inp-needs-improvement");
    if (inp.percentile > CWV_GOOD.inpMs && inp.percentile <= CWV_POOR.inpMs) {
      report("cwv-inp-needs-improvement", {
        inpMs: Math.round(inp.percentile),
        source: "field",
        goodMs: CWV_GOOD.inpMs,
        poorMs: CWV_POOR.inpMs,
      });
    }
  }
}

/**
 * Findings for the mobile reports of one audit, and the checks that were
 * judged on at least one page.
 */
export function lighthouseAuditIssuesFor(
  pages: LighthousePageReport[],
  startUrl: string,
): { issues: DetectedIssue[]; measured: Set<string> } {
  const issues: DetectedIssue[] = [];
  const measured = new Set<string>();
  let robotsTxt: Record<string, unknown> | null = null;

  for (const page of pages) {
    const report = (
      issueType: DetectedIssue["issueType"],
      details: Record<string, unknown>,
    ) => {
      issues.push({
        issueType,
        pageId: page.pageId,
        pageUrl: page.pageUrl,
        details,
      });
    };
    needsImprovementChecks(page, measured, report);
    if (!page.audits) continue;

    for (const [issueType, spec] of entries<
      Record<LighthouseAuditIssueType, LighthouseAuditSpec>
    >(LIGHTHOUSE_AUDIT_SPECS)) {
      // Not a finding on a page the crawl already found noindexed.
      if (issueType === "lh-is-crawlable" && !page.isIndexable) continue;
      const result = page.audits[spec.audit];
      if (!result) continue;
      const verdict = judge(spec, result);
      if (verdict === null) continue;
      measured.add(issueType);
      if (verdict === "pass") continue;
      // robots.txt is one file for the whole site: one finding.
      if (issueType === "lh-robots-txt") {
        robotsTxt ??= detailsFor(spec, result);
        continue;
      }
      report(issueType, detailsFor(spec, result));
    }
  }

  if (robotsTxt) {
    issues.push({
      issueType: "lh-robots-txt",
      pageId: null,
      pageUrl: startUrl,
      details: robotsTxt,
    });
  }
  return { issues, measured };
}
