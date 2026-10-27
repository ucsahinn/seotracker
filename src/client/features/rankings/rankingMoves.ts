/**
 * Quick filters and top movers built on the position change of each query.
 *
 * Every filter here needs a change value, so a query with no reading in the
 * preceding window matches none of them -- it is unknown, not stable.
 */

export const MOVE_IDS = ["risers", "fallers", "top10", "lost"] as const;
export type MoveId = (typeof MOVE_IDS)[number];

export type MoveRow = {
  query: string;
  position: number;
  previousPosition: number | null;
  delta: number | null;
};

const onFirstPage = (position: number) => Math.round(position) <= 10;

function matchesMove(id: MoveId, row: MoveRow): boolean {
  if (id === "top10") return onFirstPage(row.position);
  if (row.delta === null || row.previousPosition === null) return false;
  switch (id) {
    case "risers":
      return row.delta >= 0.5;
    case "fallers":
      return row.delta <= -0.5;
    case "lost":
      // On page one before, not any more.
      return onFirstPage(row.previousPosition) && !onFirstPage(row.position);
  }
}

export function countMoves(rows: MoveRow[]): Record<MoveId, number> {
  const counts: Record<MoveId, number> = {
    risers: 0,
    fallers: 0,
    top10: 0,
    lost: 0,
  };
  for (const id of MOVE_IDS) {
    counts[id] = rows.filter((row) => matchesMove(id, row)).length;
  }
  return counts;
}

export function applyMove<Row extends MoveRow>(
  rows: Row[],
  move: MoveId | undefined,
): Row[] {
  return move ? rows.filter((row) => matchesMove(move, row)) : rows;
}

const impact = (row: { delta: number; impressions: number }) =>
  Math.abs(row.delta) * row.impressions;

/**
 * The moves that matter most, each list at most `size` long: places moved
 * times impressions, so a query seen 5.000 times that climbed two places
 * outranks one seen 30 times that climbed four. By places alone, low-volume
 * queries going from page three to page two (still no clicks) filled both
 * lists.
 */
export function topMovers<Row extends MoveRow & { impressions: number }>(
  rows: Row[],
  size = 5,
): { risers: Row[]; fallers: Row[] } {
  const moved = rows.filter(
    (row): row is Row & { delta: number } =>
      row.delta !== null && Math.abs(row.delta) >= 0.5,
  );
  const risers = moved.filter((row) => row.delta > 0);
  const fallers = moved.filter((row) => row.delta < 0);
  risers.sort(
    (a, b) => impact(b) - impact(a) || a.query.localeCompare(b.query),
  );
  fallers.sort((a, b) => impact(b) - impact(a));
  return { risers: risers.slice(0, size), fallers: fallers.slice(0, size) };
}
