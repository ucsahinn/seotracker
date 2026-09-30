/**
 * The one-click row filters above the queries and pages tables.
 *
 * Pure and row-shaped so the counts on the chips and the rows that survive a
 * click can never disagree: both come from `matchesQuickFilter`.
 */

export const QUICK_FILTER_IDS = ["top10", "noClicks", "lowCtr"] as const;
export type QuickFilterId = (typeof QUICK_FILTER_IDS)[number];

type FilterableRow = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/** Below this a CTR is noise: three impressions and no click is not a finding. */
export const LOW_CTR_MIN_IMPRESSIONS = 100;
/** A first-page result that earns fewer than 2 clicks in 100 views. */
export const LOW_CTR_THRESHOLD = 0.02;

/** Average positions are fractions; 10.4 is still "around tenth". */
export function isFirstPage(position: number): boolean {
  return position > 0 && Math.round(position) <= 10;
}

function matchesQuickFilter(id: QuickFilterId, row: FilterableRow): boolean {
  switch (id) {
    case "top10":
      return isFirstPage(row.position);
    case "noClicks":
      return row.clicks === 0 && row.impressions > 0;
    case "lowCtr":
      return (
        isFirstPage(row.position) &&
        row.impressions >= LOW_CTR_MIN_IMPRESSIONS &&
        row.ctr < LOW_CTR_THRESHOLD
      );
  }
}

export function applyQuickFilter<Row extends FilterableRow>(
  rows: Row[],
  id: QuickFilterId | undefined,
): Row[] {
  return id ? rows.filter((row) => matchesQuickFilter(id, row)) : rows;
}

export function countQuickFilters(
  rows: FilterableRow[],
): Record<QuickFilterId, number> {
  return {
    top10: rows.filter((row) => matchesQuickFilter("top10", row)).length,
    noClicks: rows.filter((row) => matchesQuickFilter("noClicks", row)).length,
    lowCtr: rows.filter((row) => matchesQuickFilter("lowCtr", row)).length,
  };
}
