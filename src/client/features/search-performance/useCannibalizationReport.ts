import { useQuery } from "@tanstack/react-query";
import { getCannibalizationReport } from "@/serverFunctions/cannibalization";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";

/**
 * The one place the cannibalization query is declared. The tab's summary card
 * and its table both read it, so they share one cache entry and one Google
 * call instead of each fetching.
 */
export function useCannibalizationReport(input: {
  projectId: string;
  dateRange: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
}) {
  const { projectId, dateRange, device, country, searchType } = input;
  return useQuery({
    // The filters belong in the key as well as the payload: without them the
    // panel kept serving its first answer while the dropdowns above changed.
    queryKey: [
      "cannibalization",
      projectId,
      dateRange,
      device,
      country,
      searchType,
    ],
    queryFn: () =>
      getCannibalizationReport({
        data: { projectId, dateRange, device, country, searchType },
      }),
  });
}
