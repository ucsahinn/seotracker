import { bandOf, type BandId } from "@/client/features/rankings/positionBands";

/**
 * Where each saved keyword ranks, read from the Search Console archive.
 *
 * A saved keyword row carries no position of its own. The only real source is
 * the tracked-queries archive, matched by the query text, so a keyword Google
 * has never shown the site for simply has no position -- it is not treated as
 * rank 0 or "21+".
 */

export type PositionFilter = BandId | "none" | "firstPage";

/** Narrows a chart segment key to a filter, without a type assertion. */
export function toPositionFilter(key: string): PositionFilter | null {
  switch (key) {
    case "top3":
    case "top10":
    case "top20":
    case "beyond":
    case "none":
    case "firstPage":
      return key;
    default:
      return null;
  }
}

type Tracked = { query: string; position: number };

/** Turkish-aware, so "ISPARTA" and "ısparta" are the same query. */
function normalizeKeyword(value: string): string {
  return value.trim().toLocaleLowerCase("tr");
}

export function indexPositions(tracked: Tracked[]): Map<string, number> {
  return new Map(
    tracked.map((row) => [normalizeKeyword(row.query), row.position]),
  );
}

export function positionOf(
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
