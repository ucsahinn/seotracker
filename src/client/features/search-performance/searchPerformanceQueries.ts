import { queryOptions } from "@tanstack/react-query";
import {
  getSearchPerformanceDrilldown,
  getSearchPerformanceTable,
} from "@/serverFunctions/searchPerformance";
import type { SearchPerformanceViewFilters } from "@/client/features/dashboard/dashboardGscReport";
import type { QuickFilterId } from "@/client/features/search-performance/quickFilters";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceTableDimension,
  SearchPerformanceType,
  SearchTableSortColumn,
} from "@/types/schemas/search-performance";

/** The server filter payload: absent device/country are left out, not sent empty. */
export function buildFilterInput(
  range: SearchPerformanceDateRange,
  device: SearchPerformanceDevice | undefined,
  country: string | undefined,
  searchType: SearchPerformanceType,
): SearchPerformanceViewFilters {
  return {
    dateRange: range,
    searchType,
    ...(device ? { device } : {}),
    ...(country ? { country } : {}),
  };
}

/** The window the view resolved; tables and drill-downs read exactly these days. */
export type ResolvedWindow = { startDate: string; endDate: string };

export type TableSort = {
  column: SearchTableSortColumn;
  direction: "asc" | "desc";
};

type TableRequest = {
  dimension: SearchPerformanceTableDimension;
  search: string;
  quickFilter?: QuickFilterId;
  sort?: TableSort;
  offset: number;
  limit: number;
};

/** One page of the queries or pages table, searched, filtered and sorted on the server. */
export function tableQueryOptions(
  projectId: string,
  filters: SearchPerformanceViewFilters,
  window: ResolvedWindow,
  request: TableRequest,
) {
  return queryOptions({
    queryKey: [
      "searchPerformanceTable",
      projectId,
      request.dimension,
      filters,
      window,
      request,
    ],
    queryFn: () =>
      getSearchPerformanceTable({
        data: {
          projectId,
          ...filters,
          window,
          dimension: request.dimension,
          ...(request.search ? { search: request.search } : {}),
          ...(request.quickFilter ? { quickFilter: request.quickFilter } : {}),
          ...(request.sort ? { sort: request.sort } : {}),
          offset: request.offset,
          limit: request.limit,
        },
      }),
  });
}

/** A query's pages, or a page's queries, with that key's own daily series. */
export function drilldownQueryOptions(
  projectId: string,
  filters: SearchPerformanceViewFilters,
  window: ResolvedWindow,
  target: { dimension: SearchPerformanceTableDimension; key: string },
) {
  return queryOptions({
    queryKey: [
      "searchPerformanceDrilldown",
      projectId,
      filters,
      window,
      target,
    ],
    queryFn: () =>
      getSearchPerformanceDrilldown({
        data: { projectId, ...filters, window, ...target },
      }),
  });
}
