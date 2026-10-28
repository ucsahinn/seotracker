import {
  findCannibalizedQueries,
  type CannibalizationReport,
} from "@/server/features/gsc/cannibalization";
import type { GscSearchType } from "@/server/features/gsc/searchAnalytics";
import { buildGscFilters } from "@/server/features/gsc/performanceFilters";
import { GscService } from "@/server/features/gsc/services/GscService";

export async function getCannibalization(input: {
  projectId: string;
  /** Matches the Search Performance page's own windows. */
  dateRange?: "last_28_days" | "last_3_months" | "last_6_months";
  /*
   * The panel sits under the page's device and country dropdowns and used to
   * ignore both, so a report filtered to Mobile/Turkey showed all-device,
   * all-country conflicts with nothing saying so.
   */
  device?: string;
  country?: string;
  searchType?: GscSearchType;
}): Promise<CannibalizationReport> {
  const performance = await GscService.queryAnalytics({
    projectId: input.projectId,
    dimensions: ["query", "page"],
    type: input.searchType,
    dateRange: input.dateRange ?? "last_28_days",
    filters: buildGscFilters(input).filters,
    // Cannibalisation is read against settled numbers, not today's partials.
    dataState: "final",
  });
  return {
    ...findCannibalizedQueries(performance.rows),
    truncated: performance.truncated,
    startDate: performance.request.startDate,
    endDate: performance.request.endDate,
  };
}
