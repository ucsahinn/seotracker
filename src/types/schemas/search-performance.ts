import { z } from "zod";

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

export type SearchPerformanceDateRange =
  (typeof SEARCH_PERFORMANCE_RANGES)[number];
export type SearchPerformanceDevice = (typeof GSC_DEVICES)[number];

// Shared report/table filters. Spread into each request schema so the overview
// and the paginated table calls always accept the exact same filter surface.
const searchPerformanceFilterShape = {
  projectId: z.string().min(1),
  dateRange: z.enum(SEARCH_PERFORMANCE_RANGES).default("last_28_days"),
  device: z.enum(GSC_DEVICES).optional(),
  // ISO-3166-1 alpha-3, the code GSC returns in `country` dimension keys.
  country: z
    .string()
    .length(3)
    .transform((value) => value.toLowerCase())
    .optional(),
};

export const searchPerformanceInputSchema = z.object(
  searchPerformanceFilterShape,
);

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
  dimension: z.enum(SEARCH_PERFORMANCE_TABLE_DIMENSIONS),
});

/** Export pulls the full dataset (capped) rather than a single page. */
export const searchPerformanceTableExportInputSchema = z.object({
  ...searchPerformanceFilterShape,
  dimension: z.enum(SEARCH_PERFORMANCE_TABLE_DIMENSIONS),
});
