/**
 * The last 28 stored days of a project's Search Console archive against the
 * 28 before, read from what this install already keeps -- no Google request.
 * The window ends on the newest stored day, so the card can print exactly
 * which days it covers.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import { addIsoDays, DEFAULT_WINDOW_DAYS } from "./dataFreshness";

type Day = { date: string; clicks: number };

type ArchiveTrend = {
  startDate: string;
  endDate: string;
  clicks: number;
  /** Null when the archive does not reach back a whole previous window. */
  previousClicks: number | null;
  /** Clicks per day across the window, oldest first, for a sparkline. */
  daily: number[];
};

export function archiveTrend(
  days: readonly Day[],
  windowDays = DEFAULT_WINDOW_DAYS,
): ArchiveTrend | null {
  const last = days.reduce<string | null>(
    (max, day) => (max === null || day.date > max ? day.date : max),
    null,
  );
  if (last === null) return null;
  const startDate = addIsoDays(last, -(windowDays - 1));
  const previousStart = addIsoDays(startDate, -windowDays);
  const byDate = new Map(days.map((day) => [day.date, day.clicks]));
  let clicks = 0;
  let previous = 0;
  let previousDays = 0;
  const daily: number[] = [];
  for (let i = 0; i < windowDays; i += 1) {
    const value = byDate.get(addIsoDays(startDate, i)) ?? 0;
    clicks += value;
    daily.push(value);
    const before = byDate.get(addIsoDays(previousStart, i));
    if (before !== undefined) {
      previous += before;
      previousDays += 1;
    }
  }
  return {
    startDate,
    endDate: last,
    clicks,
    previousClicks: previousDays === windowDays ? previous : null,
    daily,
  };
}
