import { queryOptions } from "@tanstack/react-query";
import type { Tab } from "@/client/features/search-performance/SearchPerformanceParts";
import { getSearchPerformanceTable } from "@/serverFunctions/searchPerformance";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceTableDimension,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";

export function tabDimension(tab: Tab): SearchPerformanceTableDimension {
  return tab === "pages" ? "page" : "query";
}

type FilterInput = {
  dateRange: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
};

// The server filter payload: drop device/country when set to the "ALL" sentinel.
export function buildFilterInput(
  range: SearchPerformanceDateRange,
  device: SearchPerformanceDevice | undefined,
  country: string | undefined,
  searchType: SearchPerformanceType,
): FilterInput {
  return {
    dateRange: range,
    searchType,
    ...(device ? { device } : {}),
    ...(country ? { country } : {}),
  };
}

// Single source for the paginated table query, shared by the live query and the
// warm-on-connect prefetch so their key + fn can never drift apart.
export function tableQueryOptions(
  projectId: string,
  dimension: SearchPerformanceTableDimension,
  filterInput: FilterInput,
) {
  return queryOptions({
    queryKey: ["searchPerformanceTable", projectId, dimension, filterInput],
    queryFn: () =>
      getSearchPerformanceTable({
        data: { projectId, dimension, ...filterInput },
      }),
  });
}
