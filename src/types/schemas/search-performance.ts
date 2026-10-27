import { z } from "zod";
import { QUICK_FILTER_IDS } from "@/shared/searchQuickFilters";

/** Date ranges offered by the Search Performance page. A deliberate subset of
 *  the GSC agent ranges (GSC_DATE_RANGES in searchAnalytics.ts); assignability
 *  to GscDateRange is compiler-checked at the resolveDateRange call site. */
export const SEARCH_PERFORMANCE_RANGES = [
  "last_7_days",
  "last_28_days",
  "last_3_months",
] as const;

/** Device values exactly as the GSC `device` dimension returns/accepts them. */
export const GSC_DEVICES = ["DESKTOP", "MOBILE", "TABLET"] as const;

/*
 * Search types the page offers. Discover and Google News are left out on
 * purpose: they have no query dimension, so the queries table and the
 * striking-distance scan (query x page) would be rejected with a 400.
 */
export const SEARCH_PERFORMANCE_TYPES = [
  "web",
  "image",
  "video",
  "news",
] as const;
export type SearchPerformanceType = (typeof SEARCH_PERFORMANCE_TYPES)[number];

export type SearchPerformanceDateRange =
  (typeof SEARCH_PERFORMANCE_RANGES)[number];
export type SearchPerformanceDevice = (typeof GSC_DEVICES)[number];

// Shared report/table filters. Spread into each request schema so the overview
// and the paginated table calls always accept the exact same filter surface.
const searchPerformanceFilterShape = {
  projectId: z.string().min(1),
  dateRange: z.enum(SEARCH_PERFORMANCE_RANGES).default("last_28_days"),
  device: z.enum(GSC_DEVICES).optional(),
  searchType: z.enum(SEARCH_PERFORMANCE_TYPES).default("web"),
  // ISO-3166-1 alpha-3, the code GSC returns in `country` dimension keys.
  country: z
    .string()
    .length(3)
    .transform((value) => value.toLowerCase())
    .optional(),
};

const searchPerformanceInputSchema = z.object(searchPerformanceFilterShape);

/**
 * The view. `fresh` skips the server's few-minute memory of Google's
 * answers (searchAnalyticsCache.ts) for an explicit refresh.
 */
const isoDate = z.iso.date();

/**
 * The window a view resolved, handed back by the table, drill-down and export
 * calls so they read exactly the days the view's totals cover, even across
 * Google's midnight. Omitted, the server resolves it the same way.
 */
const resolvedWindowSchema = z
  .object({ startDate: isoDate, endDate: isoDate })
  .refine((w) => w.startDate <= w.endDate, "startDate after endDate");

export const searchPerformanceViewInputSchema =
  searchPerformanceInputSchema.extend({
    window: resolvedWindowSchema.optional(),
    fresh: z.boolean().optional(),
  });

/** A native report must name the period actually displayed by the caller. */
export const searchReportInputSchema = searchPerformanceInputSchema.extend({
  window: resolvedWindowSchema,
});

/** Exact source links coexist with the original preset and substring aliases. */
export const searchPerformanceLinkSchema = z
  .object({
    startDate: isoDate.optional(),
    endDate: isoDate.optional(),
    exactQuery: z.string().min(1).max(2048).optional(),
    exactPage: z.string().min(1).max(2048).optional(),
  })
  .refine(
    (v) =>
      Boolean(v.startDate) === Boolean(v.endDate) &&
      (!v.startDate || !v.endDate || v.startDate <= v.endDate),
    "Provide both dates in chronological order.",
  )
  .refine((v) => !(v.exactQuery && v.exactPage), "Choose one exact dimension.");

export const SEARCH_TABLE_SORT_COLUMNS = [
  "clicks",
  "impressions",
  "ctr",
  "position",
  "clickChange",
] as const;
export type SearchTableSortColumn = (typeof SEARCH_TABLE_SORT_COLUMNS)[number];

/** Server-side search, chip, sort and paging over the whole fetched set. */
const tableQueryShape = {
  window: resolvedWindowSchema.optional(),
  search: z.string().trim().max(200).optional(),
  quickFilter: z.enum(QUICK_FILTER_IDS).optional(),
  sort: z
    .object({
      column: z.enum(SEARCH_TABLE_SORT_COLUMNS),
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(1000).default(1000),
};

export const searchPerformanceDrilldownInputSchema = z.object({
  ...searchPerformanceFilterShape,
  window: resolvedWindowSchema.optional(),
  dimension: z.enum(["query", "page"]),
  key: z.string().min(1).max(2048),
});

export const siteDailyHistoryInputSchema = z.object({
  projectId: z.string().min(1),
  searchType: z.enum(SEARCH_PERFORMANCE_TYPES).default("web"),
  device: z.enum(GSC_DEVICES).optional(),
  /** Up to five years, like the query archive. */
  days: z.number().int().min(7).max(1825).default(730),
});

export const brandTermsInputSchema = z.object({
  projectId: z.string().min(1),
  terms: z.array(z.string().trim().min(2).max(80)).max(50),
});

export const searchNoteInputSchema = z.object({
  projectId: z.string().min(1),
  date: isoDate,
  note: z.string().trim().min(1).max(280),
});

export const searchNoteDeleteInputSchema = z.object({
  projectId: z.string().min(1),
  id: z.number().int().positive(),
});

/** The dimensions that get their own paginated table (query + page). Striking
 *  distance is computed from the overview call and never paginates. */
export const SEARCH_PERFORMANCE_TABLE_DIMENSIONS = ["query", "page"] as const;
export type SearchPerformanceTableDimension =
  (typeof SEARCH_PERFORMANCE_TABLE_DIMENSIONS)[number];

export const SEARCH_PERFORMANCE_PAGE_SIZES = [25, 50, 100] as const;

/*
 * No page here on purpose.
 *
 * This used to paginate through Google with `startRow`, which meant the
 * client held 25 rows and sorted those -- so clicking "Gösterim" reordered
 * twenty-five of the top-twenty-five-by-clicks and presented the result as
 * the highest-impression queries. That is the wrong answer to the question
 * the header appears to ask, and impression-tail work is exactly what this
 * table is for. Search Console has no `orderBy`, so the only way to sort a
 * dataset is to hold it: one capped fetch, then sort and paginate in the
 * browser, the way the striking-distance table already does.
 */
export const searchPerformanceTableInputSchema = z.object({
  ...searchPerformanceFilterShape,
  ...tableQueryShape,
  dimension: z.enum(SEARCH_PERFORMANCE_TABLE_DIMENSIONS),
});

/** Export pulls every fetched row that matches, rather than a single page. */
export const searchPerformanceTableExportInputSchema = z.object({
  ...searchPerformanceFilterShape,
  window: resolvedWindowSchema.optional(),
  search: tableQueryShape.search,
  quickFilter: tableQueryShape.quickFilter,
  dimension: z.enum(SEARCH_PERFORMANCE_TABLE_DIMENSIONS),
});
