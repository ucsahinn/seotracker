/**
 * The one-click row filters above the queries and pages tables.
 *
 * Pure and row-shaped so the counts on the chips and the rows that survive a
 * click can never disagree: both come from `matchesQuickFilter`.
 */

export const QUICK_FILTER_IDS = [
  "top10",
  "noClicks",
  "lowCtr",
  "hasClicks",
  "pos1to3",
  "pos4to10",
  "pos5to10",
  "pos11to20",
  "pos21plus",
  "clicks1to9",
  "clicks10to99",
  "clicks100plus",
] as const;
export type QuickFilterId = (typeof QUICK_FILTER_IDS)[number];

type FilterableRow = {
  clicks: number;
  impressions: number;
  /** Derived from clicks and impressions when the row does not carry one. */
  ctr?: number;
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

/** Rounded like `isFirstPage`, so a bar and the "İlk 10'da" chip never split a row differently. */
function roundedBetween(position: number, min: number, max: number): boolean {
  const rounded = Math.round(position);
  return position > 0 && rounded >= min && rounded <= max;
}

export function matchesQuickFilter(
  id: QuickFilterId,
  row: FilterableRow,
): boolean {
  switch (id) {
    case "top10":
      return isFirstPage(row.position);
    case "noClicks":
      return row.clicks === 0 && row.impressions > 0;
    case "lowCtr":
      return (
        isFirstPage(row.position) &&
        row.impressions >= LOW_CTR_MIN_IMPRESSIONS &&
        (row.ctr ?? row.clicks / row.impressions) < LOW_CTR_THRESHOLD
      );
    case "hasClicks":
      return row.clicks > 0;
    case "pos1to3":
      return roundedBetween(row.position, 1, 3);
    case "pos4to10":
      return roundedBetween(row.position, 4, 10);
    case "pos5to10":
      return roundedBetween(row.position, 5, 10);
    case "pos11to20":
      return roundedBetween(row.position, 11, 20);
    case "pos21plus":
      return roundedBetween(row.position, 21, Infinity);
    case "clicks1to9":
      return row.clicks >= 1 && row.clicks <= 9;
    case "clicks10to99":
      return row.clicks >= 10 && row.clicks <= 99;
    case "clicks100plus":
      return row.clicks >= 100;
  }
}

export function applyQuickFilter<Row extends FilterableRow>(
  rows: Row[],
  id: QuickFilterId | undefined,
): Row[] {
  return id ? rows.filter((row) => matchesQuickFilter(id, row)) : rows;
}

export function countQuickFilter(
  rows: FilterableRow[],
  id: QuickFilterId,
): number {
  return rows.filter((row) => matchesQuickFilter(id, row)).length;
}
