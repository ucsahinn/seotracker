/**
 * Position bands and quick filters for the tracked-queries table.
 *
 * `position` is an average over the window, so it is a fraction. Bands are cut
 * on the rounded value: 3.4 is "around third", 3.5 is "around fourth". The
 * same rounding drives the first-page chip, so a query never sits in the
 * "4-10" bar while being missing from "İlk sayfada".
 */

export const BAND_IDS = ["top3", "top10", "top20", "beyond"] as const;
export type BandId = (typeof BAND_IDS)[number];

export const BAND_LABELS: Record<BandId, string> = {
  top3: "1-3",
  top10: "4-10",
  top20: "11-20",
  beyond: "21+",
};

export const CHIP_IDS = ["firstPage", "highImpressions", "noClicks"] as const;
export type ChipId = (typeof CHIP_IDS)[number];

/** Impressions from which a query counts as "high". */
export const HIGH_IMPRESSIONS = 100;

type BandRow = {
  position: number;
  impressions: number;
  clicks: number;
};

export function bandOf(position: number): BandId {
  const rounded = Math.round(position);
  if (rounded <= 3) return "top3";
  if (rounded <= 10) return "top10";
  if (rounded <= 20) return "top20";
  return "beyond";
}

export function countBands(
  rows: { position: number }[],
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

export function matchesChip(id: ChipId, row: BandRow): boolean {
  switch (id) {
    case "firstPage":
      return Math.round(row.position) <= 10;
    case "highImpressions":
      return row.impressions >= HIGH_IMPRESSIONS;
    case "noClicks":
      return row.clicks === 0;
  }
}

export function countChips(rows: BandRow[]): Record<ChipId, number> {
  return {
    firstPage: rows.filter((row) => matchesChip("firstPage", row)).length,
    highImpressions: rows.filter((row) => matchesChip("highImpressions", row))
      .length,
    noClicks: rows.filter((row) => matchesChip("noClicks", row)).length,
  };
}

export function applyBandAndChip<Row extends BandRow>(
  rows: Row[],
  band: BandId | undefined,
  chip: ChipId | undefined,
): Row[] {
  return rows.filter(
    (row) =>
      (!band || bandOf(row.position) === band) &&
      (!chip || matchesChip(chip, row)),
  );
}
