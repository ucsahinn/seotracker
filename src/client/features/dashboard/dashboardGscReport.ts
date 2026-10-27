import { queryOptions } from "@tanstack/react-query";
import { getSearchPerformanceView } from "@/serverFunctions/searchPerformance";
import { toLegacyReport } from "@/shared/searchPerformanceView";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";

export type SearchPerformanceViewFilters = {
  dateRange: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
};

/** What the dashboard shows: the screen's default view. */
const DASHBOARD_FILTERS: SearchPerformanceViewFilters = {
  dateRange: "last_28_days",
  searchType: "web",
};

/**
 * The one cache entry for a Search performance view. The screen and the
 * dashboard build their queries from here, so the dashboard's default window
 * and the screen opened on the same filters are one request, not two.
 * Absent filters are dropped from the key, so `{device: undefined}` and `{}`
 * are the same entry.
 */
export function searchPerformanceViewQuery(
  projectId: string,
  filters: SearchPerformanceViewFilters,
) {
  const normalized: SearchPerformanceViewFilters = {
    dateRange: filters.dateRange,
    searchType: filters.searchType,
    ...(filters.device ? { device: filters.device } : {}),
    ...(filters.country ? { country: filters.country } : {}),
  };
  return queryOptions({
    queryKey: ["searchPerformanceView", projectId, normalized],
    queryFn: () =>
      getSearchPerformanceView({ data: { projectId, ...normalized } }),
  });
}

/** The dashboard's default view, unshaped: for cards that read the view's insights. */
export function dashboardSearchViewQuery(projectId: string, enabled: boolean) {
  return queryOptions({
    ...searchPerformanceViewQuery(projectId, DASHBOARD_FILTERS),
    enabled,
  });
}

/*
 * The dashboard's Search Console report: the default view, read through the
 * old report shape its cards were written against (`toLegacyReport`), from
 * the shared cache entry above. The metric row and the insight cards share
 * this single request.
 */
export function dashboardGscReportQuery(projectId: string, enabled: boolean) {
  return queryOptions({
    ...searchPerformanceViewQuery(projectId, DASHBOARD_FILTERS),
    select: (view) => (view.connected ? toLegacyReport(view) : view),
    enabled,
  });
}
