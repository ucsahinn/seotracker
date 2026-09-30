import { queryOptions } from "@tanstack/react-query";
import { getSearchPerformanceReport } from "@/serverFunctions/searchPerformance";

/*
 * One definition for the dashboard's Search Console report, so the metric row
 * and the insight cards below it share a single cached request instead of
 * each asking Google for the same 28 days.
 */
export function dashboardGscReportQuery(projectId: string, enabled: boolean) {
  return queryOptions({
    queryKey: ["dashboardGscReport", projectId],
    queryFn: () =>
      getSearchPerformanceReport({
        data: { projectId, dateRange: "last_28_days" },
      }),
    enabled,
  });
}
