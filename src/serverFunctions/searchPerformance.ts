import { createServerFn } from "@tanstack/react-start";
import {
  GscNotConnectedError,
  GscService,
  isExpectedGrantFailure,
} from "@/server/features/gsc/services/GscService";
import { resolveDateRange } from "@/server/features/gsc/searchAnalytics";
import {
  buildStrikingDistanceRows,
  previousPeriod,
  sumSearchTotals,
  toDailyRows,
  toDimensionRows,
} from "@/server/features/gsc/searchPerformanceReport";
import { buildGscFilters } from "@/server/features/gsc/performanceFilters";
import { requireProjectContext } from "@/serverFunctions/middleware";
import {
  searchPerformanceInputSchema,
  searchPerformanceTableExportInputSchema,
  searchPerformanceTableInputSchema,
} from "@/types/schemas/search-performance";

// query x page fan-out needs more rows to find the 5..20 band.
const STRIKING_DISTANCE_FETCH_LIMIT = 1000;
// dimensions:["date"] returns one row per day; the longest range is ~92 days.
const DAILY_ROW_LIMIT = 200;
const COUNTRY_ROW_LIMIT = 25;
// Google defines a few dozen appearance types; the ring shows the top few.
const APPEARANCE_ROW_LIMIT = 25;
// GSC knows three devices.
const DEVICE_ROW_LIMIT = 3;
// Export pulls the whole dimension in one shot, capped at GSC's per-call max
// (GSC_MAX_ROW_LIMIT). Large stores get everything up to this ceiling.
const EXPORT_ROW_LIMIT = 1000;
/*
 * The table holds its whole dataset so the column headers can sort it.
 * Same ceiling as the export: what you can sort is what you can download.
 */
const TABLE_ROW_LIMIT = 1000;

/** Not connected, or a dead/denied grant (token failure or 401/403): the page
 *  renders the connect card. Other statuses (429, 5xx) are real faults. */
function isExpectedConnectionFailure(error: unknown): boolean {
  return error instanceof GscNotConnectedError || isExpectedGrantFailure(error);
}

/**
 * The Search Performance overview: current + previous-period totals, the
 * striking-distance rows, and the country list that powers the filter dropdown.
 * The queries/pages tables paginate separately (getSearchPerformanceTable) so
 * page-flips never re-run the striking-distance scan. All first-party GSC data,
 * free.
 */
export const getSearchPerformanceReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceInputSchema)
  .handler(async ({ data, context }) => {
    const { startDate, endDate } = resolveDateRange({
      dateRange: data.dateRange,
    });
    const prev = previousPeriod(startDate, endDate);
    const projectId = context.projectId;
    const type = data.searchType;
    const { deviceFilters, filters } = buildGscFilters(data);
    // The device ring ignores the device filter (so every device stays
    // visible while one is chosen) but keeps the country filter.
    const deviceRingFilters = buildGscFilters({
      country: data.country,
    }).filters;

    try {
      const [current, previous, queryPages, countries, devices, appearances] =
        await Promise.all([
          GscService.getPerformance({
            projectId,
            startDate,
            endDate,
            dimensions: ["date"],
            type,
            filters,
            rowLimit: DAILY_ROW_LIMIT,
          }),
          GscService.getPerformance({
            projectId,
            startDate: prev.startDate,
            endDate: prev.endDate,
            dimensions: ["date"],
            type,
            filters,
            rowLimit: DAILY_ROW_LIMIT,
          }),
          GscService.getPerformance({
            projectId,
            startDate,
            endDate,
            dimensions: ["query", "page"],
            type,
            filters,
            rowLimit: STRIKING_DISTANCE_FETCH_LIMIT,
          }),
          GscService.getPerformance({
            projectId,
            startDate,
            endDate,
            dimensions: ["country"],
            type,
            filters: deviceFilters,
            rowLimit: COUNTRY_ROW_LIMIT,
          }),
          GscService.getPerformance({
            projectId,
            startDate,
            endDate,
            dimensions: ["device"],
            type,
            filters: deviceRingFilters,
            rowLimit: DEVICE_ROW_LIMIT,
          }),
          /*
           * searchAppearance cannot be combined with any other dimension, so
           * it is its own call. Same range, country and device filters as
           * the trend; most sites get no rows back.
           */
          GscService.getPerformance({
            projectId,
            startDate,
            endDate,
            dimensions: ["searchAppearance"],
            type,
            filters,
            rowLimit: APPEARANCE_ROW_LIMIT,
          }),
        ]);

      return {
        connected: true as const,
        range: {
          startDate,
          endDate,
          prevStartDate: prev.startDate,
          prevEndDate: prev.endDate,
        },
        totals: sumSearchTotals(current.rows),
        prevTotals: sumSearchTotals(previous.rows),
        /*
         * The same rows the totals are summed from, kept instead of thrown
         * away. Already fetched by date, so the trend costs no extra Google
         * call -- and "4.200 tıklama in 28 days" and "it halved on day 14"
         * are different findings.
         *
         * Only the current period. The previous one is summed into
         * `prevTotals` for the deltas; sending its ~90 daily rows as well
         * would be payload nothing reads.
         */
        daily: toDailyRows(current.rows, startDate, endDate),
        /** Zero means Search Console shared no keyword-level data at all. */
        queryRowCount: queryPages.rows.length,
        strikingDistance: buildStrikingDistanceRows(queryPages.rows),
        countries: toDimensionRows(countries.rows),
        devices: toDimensionRows(devices.rows),
        searchAppearance: toDimensionRows(appearances.rows),
      };
    } catch (error) {
      if (isExpectedConnectionFailure(error)) {
        return { connected: false as const };
      }
      throw error;
    }
  });

/**
 * One page of the queries or pages table, paginated server-side against GSC via
 * `startRow` so it scales to large properties. GSC returns no total count, so we
 * fetch one extra row to detect a next page. All first-party GSC data, free.
 */
export const getSearchPerformanceTable = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceTableInputSchema)
  .handler(async ({ data, context }) => {
    const { startDate, endDate } = resolveDateRange({
      dateRange: data.dateRange,
    });
    const { filters } = buildGscFilters(data);

    try {
      // One extra row so the client can say the set was capped rather than
      // silently presenting a truncated table as the whole dataset.
      const result = await GscService.getPerformance({
        projectId: context.projectId,
        startDate,
        endDate,
        dimensions: [data.dimension],
        type: data.searchType,
        filters,
        rowLimit: TABLE_ROW_LIMIT + 1,
      });

      const fetched = toDimensionRows(result.rows);
      const truncated = fetched.length > TABLE_ROW_LIMIT;

      return {
        connected: true as const,
        dimension: data.dimension,
        truncated,
        rows: truncated ? fetched.slice(0, TABLE_ROW_LIMIT) : fetched,
      };
    } catch (error) {
      if (isExpectedConnectionFailure(error)) {
        return { connected: false as const };
      }
      throw error;
    }
  });

/**
 * The full queries/pages dataset for CSV/Sheets export (capped at
 * EXPORT_ROW_LIMIT), rather than only the visible page.
 */
export const exportSearchPerformanceTable = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceTableExportInputSchema)
  .handler(async ({ data, context }) => {
    const { startDate, endDate } = resolveDateRange({
      dateRange: data.dateRange,
    });
    const { filters } = buildGscFilters(data);

    const result = await GscService.getPerformance({
      projectId: context.projectId,
      startDate,
      endDate,
      dimensions: [data.dimension],
      type: data.searchType,
      filters,
      rowLimit: EXPORT_ROW_LIMIT,
    });

    return {
      dimension: data.dimension,
      rows: toDimensionRows(result.rows),
    };
  });
