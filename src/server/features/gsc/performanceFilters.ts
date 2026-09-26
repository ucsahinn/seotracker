import type { GscPerformanceFilter } from "@/server/features/gsc/searchAnalytics";

/**
 * Build GSC filter groups shared by every Search Performance call.
 *
 * Device applies everywhere; country applies everywhere except the country
 * breakdown itself, so the dropdown keeps every option visible while one
 * country is selected.
 *
 * Lifted out of `serverFunctions/searchPerformance.ts` when the
 * cannibalization panel -- which sits under the same three filter dropdowns
 * -- turned out to ignore all of them.
 */
export function buildGscFilters(data: { device?: string; country?: string }): {
  deviceFilters: GscPerformanceFilter[];
  filters: GscPerformanceFilter[];
} {
  const deviceFilters: GscPerformanceFilter[] = data.device
    ? [{ dimension: "device", operator: "equals", expression: data.device }]
    : [];
  const filters: GscPerformanceFilter[] = data.country
    ? [
        ...deviceFilters,
        { dimension: "country", operator: "equals", expression: data.country },
      ]
    : deviceFilters;
  return { deviceFilters, filters };
}
