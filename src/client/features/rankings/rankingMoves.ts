/**
 * Quick filters and top movers built on the position change of each query.
 *
 * Every filter here needs a change value, so a query with no reading in the
 * preceding window matches none of them -- it is unknown, not stable.
 */
import { directionOf } from "@/shared/rankingChange";

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
  if (row.delta === null || row.previousPosition === null) return false;
  switch (id) {
    case "risers":
      return directionOf(row.delta) === "up";
    case "fallers":
      return directionOf(row.delta) === "down";
    case "top10":
      // Anything on page one now that also has a previous reading, including
      // queries that have just risen in.
      return onFirstPage(row.position);
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

/** The biggest climbers and biggest drops, each at most `size` long. */
export function topMovers<Row extends MoveRow>(
  rows: Row[],
  size = 5,
): { risers: Row[]; fallers: Row[] } {
  const moved = rows.filter(
    (row): row is Row & { delta: number } =>
      row.delta !== null && directionOf(row.delta) !== "flat",
  );
  const risers = moved.filter((row) => row.delta > 0);
  const fallers = moved.filter((row) => row.delta < 0);
  risers.sort((a, b) => b.delta - a.delta);
  fallers.sort((a, b) => a.delta - b.delta);
  return { risers: risers.slice(0, size), fallers: fallers.slice(0, size) };
}
