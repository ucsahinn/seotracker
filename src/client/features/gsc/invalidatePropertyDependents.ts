import type { QueryClient } from "@tanstack/react-query";

/**
 * Every cached answer that is derived from the connected Search Console or
 * GA4 property. Changing, connecting or disconnecting a property must drop
 * all of them, or screens keep serving the previous property's data for the
 * global staleTime. Keys are matched by prefix: `[name, projectId]`.
 */
const PROPERTY_DEPENDENT_QUERY_KEYS = [
  "searchPerformance",
  "searchPerformanceTable",
  "searchOpportunities",
  "gscHistorySync",
  "trackedQueries",
  "queryHistory",
  "sitemapReport",
  "indexCoverage",
  "ga4Overview",
  "ga4MeasurementHealth",
  "ga4Report",
  "dashboardActivation",
  "dashboardGscReport",
  "dashboardGa4Report",
  "dashboardOverview",
  "quotaStatus",
] as const;

export function invalidatePropertyDependents(
  queryClient: QueryClient,
  projectId: string,
): void {
  for (const name of PROPERTY_DEPENDENT_QUERY_KEYS) {
    void queryClient.invalidateQueries({ queryKey: [name, projectId] });
  }
}
