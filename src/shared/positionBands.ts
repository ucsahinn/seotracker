/**
 * The one set of position bands every screen labels with.
 *
 * There used to be six: the dashboard said "Sıra 5-20" over a 4-20 rule,
 * Opportunities cut at <=3 / 4-20 / >20 on the unrounded value, Rankings and
 * Saved keywords at 1-3 / 4-10 / 11-20 / 21+ on the rounded one. The same
 * query at 3.4 was "top three" on one screen and "near miss" on the next.
 *
 * `position` is Google's impression-weighted average, so it is a fraction.
 * Bands are cut on the rounded value: 3.4 is "around third", 3.5 is "around
 * fourth". The CTR curve in `searchInsights.ts` keeps finer bands (1, 2-3,
 * 4-5, 6-10, 11-20) internally because click-through falls steeply inside
 * the first page; those bands never reach a label.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */

export const BAND_IDS = ["top3", "top10", "top20", "beyond"] as const;
export type BandId = (typeof BAND_IDS)[number];

/** Numbers, not words, so they need no translation. */
export const BAND_LABELS: Record<BandId, string> = {
  top3: "1-3",
  top10: "4-10",
  top20: "11-20",
  beyond: "21+",
};

export function bandOf(position: number): BandId {
  const rounded = Math.round(position);
  if (rounded <= 3) return "top3";
  if (rounded <= 10) return "top10";
  if (rounded <= 20) return "top20";
  return "beyond";
}

export function countBands(
  rows: readonly { position: number }[],
): Record<BandId, number> {
  const counts: Record<BandId, number> = {
    top3: 0,
    top10: 0,
    top20: 0,
    beyond: 0,
  };
  for (const row of rows) counts[bandOf(row.position)] += 1;
  return counts;
}
