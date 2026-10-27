/** Stored Web/all-device archive windows; never substitutes zero for an absent day. */
import { addIsoDays, DEFAULT_WINDOW_DAYS } from "./dataFreshness";

type Day = {
  date: string;
  clicks: number;
  fetchedAt?: string;
  dataState?: string;
};

export function archiveTrend(
  days: readonly Day[],
  windowDays = DEFAULT_WINDOW_DAYS,
) {
  const last = days.reduce<string | null>(
    (max, day) => (max === null || day.date > max ? day.date : max),
    null,
  );
  if (last === null) return null;
  const startDate = addIsoDays(last, -(windowDays - 1));
  const previousStartDate = addIsoDays(startDate, -windowDays);
  const previousEndDate = addIsoDays(startDate, -1);
  const byDate = new Map(days.map((day) => [day.date, day]));
  let clicks = 0;
  let previous = 0;
  let observedDays = 0;
  let previousObservedDays = 0;
  let fetchedAt: string | null = null;
  const daily: (number | null)[] = [];
  for (let i = 0; i < windowDays; i += 1) {
    const day = byDate.get(addIsoDays(startDate, i));
    daily.push(day?.clicks ?? null);
    if (day) {
      clicks += day.clicks;
      observedDays += 1;
      if (day.fetchedAt && (!fetchedAt || day.fetchedAt > fetchedAt))
        fetchedAt = day.fetchedAt;
    }
    const before = byDate.get(addIsoDays(previousStartDate, i));
    if (before) {
      previous += before.clicks;
      previousObservedDays += 1;
    }
  }
  return {
    startDate,
    endDate: last,
    previousStartDate,
    previousEndDate,
    windowDays,
    observedDays,
    previousObservedDays,
    clicks,
    previousClicks:
      observedDays === windowDays && previousObservedDays === windowDays
        ? previous
        : null,
    daily,
    fetchedAt,
    // The legacy writer stamps final without storing whether Google or a lag assumption established it.
    finalitySource: "unknown" as const,
  };
}
