import { createServerFn } from "@tanstack/react-start";
import { isExpectedConnectionFailure } from "@/server/features/gsc/connectionFailure";
import {
  SearchPerformanceService,
  type SearchFilters,
} from "@/server/features/gsc/services/SearchPerformanceService";
import { requireProjectContext } from "@/serverFunctions/middleware";
import type { SearchPerformanceViewResult } from "@/shared/searchPerformanceView";
import {
  brandTermsInputSchema,
  searchNoteDeleteInputSchema,
  searchNoteInputSchema,
  searchPerformanceDrilldownInputSchema,
  searchPerformanceTableExportInputSchema,
  searchPerformanceTableInputSchema,
  searchPerformanceViewInputSchema,
  siteDailyHistoryInputSchema,
} from "@/types/schemas/search-performance";
import { z } from "zod";

function filtersOf(data: {
  dateRange: SearchFilters["dateRange"];
  device?: SearchFilters["device"];
  country?: string;
  searchType: SearchFilters["searchType"];
}): SearchFilters {
  return {
    dateRange: data.dateRange,
    device: data.device,
    country: data.country,
    searchType: data.searchType,
  };
}

/** Not connected, or a dead grant: the screen shows the connect card. */
async function orNotConnected<T>(
  call: () => Promise<T>,
): Promise<T | { connected: false }> {
  try {
    return await call();
  } catch (error) {
    if (isExpectedConnectionFailure(error)) return { connected: false };
    throw error;
  }
}

/**
 * The Search performance view: window, totals, series, breakdowns, coverage,
 * insights and the ranked to-do list in one typed answer
 * (`SearchPerformanceView`). All first-party Search Console data, free.
 */
export const getSearchPerformanceView = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceViewInputSchema)
  .handler(
    async ({ data, context }): Promise<SearchPerformanceViewResult> =>
      orNotConnected(() =>
        SearchPerformanceService.getView({
          projectId: context.projectId,
          filters: filtersOf(data),
          fresh: data.fresh,
        }),
      ),
  );

/**
 * One page of the queries or pages table: searched, chip-filtered and sorted
 * on the server over every row fetched for the window (up to 50,000), each
 * with the previous period beside it.
 *
 * `truncated` keeps its old meaning for the current screen: there are rows
 * this answer does not show, either past this page or past Google's cap.
 */
export const getSearchPerformanceTable = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceTableInputSchema)
  .handler(async ({ data, context }) => {
    const result = await orNotConnected(async () => ({
      connected: true as const,
      ...(await SearchPerformanceService.getTable({
        projectId: context.projectId,
        filters: filtersOf(data),
        dimension: data.dimension,
        window: data.window,
        search: data.search,
        quickFilter: data.quickFilter,
        sort: data.sort,
        offset: data.offset,
        limit: data.limit,
      })),
    }));
    if (!result.connected) return result;
    return {
      ...result,
      dimension: data.dimension,
      truncated:
        result.googleTruncated ||
        result.total > data.offset + result.rows.length,
    };
  });

/** Every fetched row that matches, for CSV/Sheets. */
export const exportSearchPerformanceTable = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceTableExportInputSchema)
  .handler(async ({ data, context }) => {
    const result = await SearchPerformanceService.exportTable({
      projectId: context.projectId,
      filters: filtersOf(data),
      dimension: data.dimension,
      window: data.window,
      search: data.search,
      quickFilter: data.quickFilter,
    });
    return { dimension: data.dimension, ...result };
  });

/** A query's pages or a page's queries, with that key's own daily series. */
export const getSearchPerformanceDrilldown = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceDrilldownInputSchema)
  .handler(async ({ data, context }) =>
    orNotConnected(async () => ({
      connected: true as const,
      ...(await SearchPerformanceService.getDrilldown({
        projectId: context.projectId,
        filters: filtersOf(data),
        dimension: data.dimension,
        key: data.key,
        window: data.window,
      })),
    })),
  );

/** Archived site totals (local, no Google call), for trends past 16 months. */
export const getSiteDailyHistory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(siteDailyHistoryInputSchema)
  .handler(async ({ data, context }) =>
    SearchPerformanceService.getSiteHistory({
      projectId: context.projectId,
      searchType: data.searchType,
      device: data.device,
      days: data.days,
    }),
  );

const projectOnlySchema = z.object({ projectId: z.string().min(1) });

/** The brand terms and suggestions from the domain. */
export const getBrandTerms = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(projectOnlySchema)
  .handler(async ({ context }) =>
    SearchPerformanceService.getBrandTerms(context.projectId),
  );

export const setBrandTerms = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(brandTermsInputSchema)
  .handler(async ({ data, context }) =>
    SearchPerformanceService.setBrandTerms(context.projectId, data.terms),
  );

export const listSearchNotes = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(projectOnlySchema)
  .handler(async ({ context }) =>
    SearchPerformanceService.listNotes({ projectId: context.projectId }),
  );

export const addSearchNote = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchNoteInputSchema)
  .handler(async ({ data, context }) =>
    SearchPerformanceService.addNote({
      projectId: context.projectId,
      date: data.date,
      note: data.note,
    }),
  );

export const deleteSearchNote = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchNoteDeleteInputSchema)
  .handler(async ({ data, context }) => {
    await SearchPerformanceService.deleteNote(context.projectId, data.id);
    return { ok: true as const };
  });
