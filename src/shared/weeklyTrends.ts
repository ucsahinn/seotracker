/**
 * Weekly positions per query, aligned on one shared list of weeks so every
 * row's sparkline spans the same time axis. A week with no reading for a
 * query is a gap (null), never a zero: position 0 would draw as the top.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import { sort } from "remeda";

export function weeklyTrends(
  rows: ReadonlyArray<{ query: string; weekStart: string; position: number }>,
): Map<string, (number | null)[]> {
  const weeks = sort([...new Set(rows.map((row) => row.weekStart))], (a, b) =>
    a.localeCompare(b),
  );
  const index = new Map(weeks.map((week, i) => [week, i]));
  const out = new Map<string, (number | null)[]>();
  for (const row of rows) {
    const line =
      out.get(row.query) ?? Array.from({ length: weeks.length }, () => null);
    const at = index.get(row.weekStart);
    if (at !== undefined) line[at] = row.position;
    out.set(row.query, line);
  }
  return out;
}
