import { savedMatchKey } from "@/shared/savedWatchlist";
import { bandOf, type BandId } from "@/shared/positionBands";

/**
 * Where each saved keyword ranks, read from the Search Console archive.
 *
 * A saved keyword row carries no position of its own. The only real source is
 * the tracked-queries archive, matched by the query text, so a keyword Google
 * has never shown the site for simply has no position -- it is not treated as
 * rank 0 or "21+".
 */

type PositionFilter = BandId | "none" | "firstPage";

type Tracked = { query: string; position: number; impressions?: number };

/** Turkish-aware, so "ISPARTA" and "ısparta" are the same query. */
function normalizeKeyword(value: string): string {
  return savedMatchKey(value);
}

export function indexPositions(tracked: Tracked[]): Map<string, number> {
  const weighted = new Map<string, { sum: number; impressions: number }>();
  for (const row of tracked) {
    const key = normalizeKeyword(row.query);
    const weight = row.impressions ?? 1;
    if (!Number.isFinite(row.position) || row.position <= 0 || weight <= 0)
      continue;
    const previous = weighted.get(key) ?? { sum: 0, impressions: 0 };
    previous.sum += row.position * weight;
    previous.impressions += weight;
    weighted.set(key, previous);
  }
  return new Map(
    [...weighted].map(([key, row]) => [key, row.sum / row.impressions]),
  );
}

/**
 * How many saved keywords climbed and how many slipped against the previous
 * window, by the archive's own change (half a place or more, the
 * Rankings movers bar). A keyword with no earlier reading is neither.
 */
export function countMoves(
  keywords: { keyword: string }[],
  tracked: { query: string; delta: number | null }[],
): { up: number; down: number } {
  const deltas = new Map(
    tracked.map((row) => [normalizeKeyword(row.query), row.delta]),
  );
  let up = 0;
  let down = 0;
  for (const { keyword } of keywords) {
    const delta = deltas.get(normalizeKeyword(keyword));
    // Same half-place bar as the Rankings movers, not the arrow's noise floor.
    if (delta == null || Math.abs(delta) < 0.5) continue;
    if (delta > 0) up += 1;
    else down += 1;
  }
  return { up, down };
}

function positionOf(
  keyword: string,
  positions: Map<string, number>,
): number | null {
  return positions.get(normalizeKeyword(keyword)) ?? null;
}

function matchesPositionFilter(
  filter: PositionFilter,
  position: number | null,
): boolean {
  if (filter === "none") return position === null;
  if (position === null) return false;
  if (filter === "firstPage") return Math.round(position) <= 10;
  return bandOf(position) === filter;
}

export function countPositionGroups(
  keywords: { keyword: string }[],
  positions: Map<string, number>,
): Record<BandId | "none" | "firstPage", number> {
  const counts = {
    top3: 0,
    top10: 0,
    top20: 0,
    beyond: 0,
    none: 0,
    firstPage: 0,
  };
  for (const { keyword } of keywords) {
    const position = positionOf(keyword, positions);
    if (position === null) {
      counts.none += 1;
      continue;
    }
    counts[bandOf(position)] += 1;
    if (matchesPositionFilter("firstPage", position)) counts.firstPage += 1;
  }
  return counts;
}

export function filterByPosition<Row extends { keyword: string }>(
  rows: Row[],
  filter: PositionFilter | null,
  positions: Map<string, number>,
): Row[] {
  if (filter === null) return rows;
  return rows.filter((row) =>
    matchesPositionFilter(filter, positionOf(row.keyword, positions)),
  );
}
