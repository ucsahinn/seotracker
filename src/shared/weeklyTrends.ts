/**
 * Weekly positions per query, aligned on one shared list of weeks so every
 * row's sparkline spans the same time axis. A week with no reading for a
 * query is a gap (null), never a zero: position 0 would draw as the top.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import { sort } from "remeda";
import { addIsoDays } from "./dataFreshness";

export function weeklyTrends(
  rows: ReadonlyArray<{ query: string; weekStart: string; position: number }>,
  range?: { startDate: string; endDate: string },
): Map<string, (number | null)[]> {
  let weeks = sort([...new Set(rows.map((row) => row.weekStart))], (a, b) =>
    a.localeCompare(b),
  );
  if (range) {
    weeks = [];
    const weekday = new Date(`${range.startDate}T00:00:00Z`).getUTCDay();
    for (
      let date = addIsoDays(range.startDate, -((weekday + 6) % 7));
      date <= range.endDate;
      date = addIsoDays(date, 7)
    )
      weeks.push(date);
  }
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
