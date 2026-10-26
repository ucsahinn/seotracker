import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAuditInsights } from "@/serverFunctions/audit";
import { buildAuditBreakdown } from "@/shared/auditBreakdown";
import { findingsFromIssues } from "@/shared/auditScore";
import { pageKey, rankTodos, todoInputs } from "@/shared/auditTodo";
import type { AuditInsightsData, AuditResultsData } from "./types";

/** How many fixes the to-do list marks as "do these first". */
export const FIRST_COUNT = 3;

const NO_INSIGHTS: AuditInsightsData = {
  history: [],
  changes: null,
  traffic: null,
  startPage: null,
  speed: null,
  speedError: null,
  analyticsTags: [],
  schemaTypes: [],
  googleInspected: null,
  platformHost: false,
};

/**
 * Score, check breakdown and ranked to-do list for one audit. The audit's
 * own rows decide all three at once; the insights (Search Console traffic,
 * whether Google was asked) refine them when they arrive.
 */
export function useAuditOverview(projectId: string, data: AuditResultsData) {
  const { audit, issues, lighthouse, siteFacts } = data;
  const insightsQuery = useQuery({
    queryKey: ["audit-insights", projectId, audit.id],
    queryFn: () => getAuditInsights({ data: { projectId, auditId: audit.id } }),
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
  // A failed read leaves every insight "not measured" instead of a skeleton
  // that never resolves.
  const insights =
    insightsQuery.data ?? (insightsQuery.isError ? NO_INSIGHTS : undefined);

  const findings = useMemo(
    () => findingsFromIssues(issues, audit.pagesCrawled),
    [issues, audit.pagesCrawled],
  );
  const context = useMemo(
    () => ({
      pagesCrawled: audit.pagesCrawled,
      hasLighthouse: lighthouse.some((row) => row.performanceScore !== null),
      siteFacts,
      googleInspected: insights?.googleInspected ?? null,
      analyticsCompared: audit.analyticsCompared,
    }),
    [
      audit.pagesCrawled,
      audit.analyticsCompared,
      lighthouse,
      siteFacts,
      insights,
    ],
  );
  const breakdown = useMemo(
    () => buildAuditBreakdown(findings, context),
    [findings, context],
  );
  const traffic = useMemo(
    () =>
      insights?.traffic
        ? new Map(
            insights.traffic.rows.map((row) => [
              pageKey(row.url),
              { clicks: row.clicks, impressions: row.impressions },
            ]),
          )
        : null,
    [insights],
  );
  const todos = useMemo(
    () => rankTodos(todoInputs(issues, breakdown.gains), traffic),
    [issues, breakdown.gains, traffic],
  );

  /*
   * What the first few fixes give together, by scoring the audit again
   * without them: two fixes in one category are not the sum of their
   * separate gains, so adding the rows' numbers would promise too much.
   */
  const firstGain = useMemo(() => {
    const first = new Set(
      todos.slice(0, FIRST_COUNT).map((todo) => todo.issueType),
    );
    if (first.size === 0 || breakdown.score === null) return null;
    const after = buildAuditBreakdown(
      findings.filter((finding) => !first.has(finding.issueType)),
      context,
    ).score;
    return after === null ? null : after - breakdown.score;
  }, [todos, findings, context, breakdown.score]);

  return {
    score: breakdown.score,
    firstGain,
    breakdown,
    todos,
    traffic,
    insights,
  };
}
