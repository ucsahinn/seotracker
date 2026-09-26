import {
  findCannibalizedQueries,
  type CannibalizationReport,
} from "@/server/features/gsc/cannibalization";
import { GSC_MAX_ROW_LIMIT } from "@/server/features/gsc/searchAnalytics";
import { buildGscFilters } from "@/server/features/gsc/performanceFilters";
import { GscService } from "@/server/features/gsc/services/GscService";

/**
 * Rows per request. This used to ask for 5000 with a comment about Search
 * Console's 25k ceiling, but the request goes through
 * `buildSearchAnalyticsRequest`, which clamps to `GSC_MAX_ROW_LIMIT` - so it
 * silently asked for 1000 and the comment was wrong twice over. Paginate
 * instead, and tell the caller when Google still had more.
 */
const PAGES = 5;

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
}): Promise<CannibalizationReport> {
  const rows = [];
  let request;
  let truncated = false;

  for (let page = 0; page < PAGES; page += 1) {
    const performance = await GscService.getPerformance({
      projectId: input.projectId,
      dimensions: ["query", "page"],
      dateRange: input.dateRange ?? "last_28_days",
      filters: buildGscFilters(input).filters,
      rowLimit: GSC_MAX_ROW_LIMIT,
      startRow: page * GSC_MAX_ROW_LIMIT,
      // Cannibalisation is read against settled numbers, not today's partials.
      dataState: "final",
    });
    request ??= performance.request;
    rows.push(...performance.rows);

    if (performance.rows.length < GSC_MAX_ROW_LIMIT) break;
    if (page === PAGES - 1) truncated = true;
  }

  return {
    ...findCannibalizedQueries(rows),
    truncated,
    startDate: request?.startDate ?? "",
    endDate: request?.endDate ?? "",
  };
}
