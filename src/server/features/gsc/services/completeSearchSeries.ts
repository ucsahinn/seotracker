import { GscService } from "./GscService";
import {
  sixteenMonthFloor,
  type GscDateRange,
  type GscDimension,
  type GscPerformanceFilter,
} from "../searchAnalytics";
import { resolveSearchWindow } from "../searchPerformanceReport";
import { addIsoDays, gscToday } from "@/shared/dataFreshness";
import type { SearchPerformanceType } from "@/types/schemas/search-performance";

/** One bounded date-series request supplies the complete-day boundary for both screens. */
export async function completeSearchSeries(input: {
  projectId: string;
  range: GscDateRange;
  filters: GscPerformanceFilter[];
  searchType: SearchPerformanceType;
  fresh?: boolean;
  now?: Date;
}) {
  const today = gscToday(input.now);
  const floorDate = sixteenMonthFloor(new Date(`${today}T12:00:00Z`));
  const series = await GscService.queryAnalytics({
    projectId: input.projectId,
    startDate: floorDate,
    endDate: addIsoDays(today, -1),
    dimensions: ["date"] satisfies GscDimension[],
    filters: input.filters,
    type: input.searchType,
    dataState: "all",
    maxPages: 1,
    fresh: input.fresh,
  });
  let lastDataDate: string | null = null;
  for (const row of series.rows) {
    const date = row.keys?.[0];
    if (
      date &&
      /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      (lastDataDate === null || date > lastDataDate)
    )
      lastDataDate = date;
  }
  return {
    series,
    window: resolveSearchWindow({
      range: input.range,
      today,
      floorDate,
      firstIncompleteDate: series.firstIncompleteDate ?? null,
      lastDataDate,
    }),
  };
}
