/**
 * Position bands and quick filters for the tracked-queries table.
 *
 * `position` is an average over the window, so it is a fraction. Bands are cut
 * on the rounded value: 3.4 is "around third", 3.5 is "around fourth". The
 * same rounding drives the first-page chip, so a query never sits in the
 * "4-10" bar while being missing from "İlk sayfada".
 */

import { sort } from "remeda";
import { bandOf, type BandId } from "@/shared/positionBands";

export const CHIP_IDS = ["firstPage", "highImpressions", "noClicks"] as const;
export type ChipId = (typeof CHIP_IDS)[number];

/** The share of the set, by impressions, that "Gösterimi yüksek" holds. */
const HIGH_IMPRESSIONS_SHARE = 0.25;

type BandRow = {
  position: number;
  impressions: number;
  clicks: number;
};

/**
 * The impressions a query needs to count as "high": the top quarter of the
 * set being looked at. A fixed 100 impressions held all 100 rows on a
 * 90-day window, so the chip selected everything.
 */
export function highImpressionsThreshold(
  rows: readonly { impressions: number }[],
): number {
  if (rows.length === 0) return Infinity;
  const sorted = sort(
    rows.map((row) => row.impressions),
    (a, b) => b - a,
  );
  const index = Math.max(
    0,
    Math.ceil(sorted.length * HIGH_IMPRESSIONS_SHARE) - 1,
  );
  return Math.max(1, sorted[index] ?? 1);
}

export function matchesChip(
  id: ChipId,
  row: BandRow,
  highImpressions: number,
): boolean {
  switch (id) {
    case "firstPage":
      return Math.round(row.position) <= 10;
    case "highImpressions":
      return row.impressions >= highImpressions;
    case "noClicks":
      return row.clicks === 0;
  }
}

export function countChips(
  rows: BandRow[],
  highImpressions: number,
): Record<ChipId, number> {
  const count = (id: ChipId) =>
    rows.filter((row) => matchesChip(id, row, highImpressions)).length;
  return {
    firstPage: count("firstPage"),
    highImpressions: count("highImpressions"),
    noClicks: count("noClicks"),
  };
}

export function applyBandAndChip<Row extends BandRow>(
  rows: Row[],
  band: BandId | undefined,
  chip: ChipId | undefined,
  highImpressions = Infinity,
): Row[] {
  return rows.filter(
    (row) =>
      (!band || bandOf(row.position) === band) &&
      (!chip || matchesChip(chip, row, highImpressions)),
  );
}
