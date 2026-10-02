import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { tableQueryOptions } from "@/client/features/search-performance/searchPerformanceQueries";

type FilterInput = Parameters<typeof tableQueryOptions>[2];

/**
 * Warm the Queries tab (first page) as soon as the report connects so the tab
 * opens instantly instead of showing a spinner. Free first-party GSC data.
 */
export function useWarmQueriesTab(
  projectId: string,
  connected: boolean,
  { dateRange, device, country, searchType }: FilterInput,
) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!connected) return;
    void queryClient.prefetchQuery(
      tableQueryOptions(projectId, "query", {
        dateRange,
        device,
        country,
        searchType,
      }),
    );
  }, [
    connected,
    projectId,
    dateRange,
    device,
    country,
    searchType,
    queryClient,
  ]);
}
