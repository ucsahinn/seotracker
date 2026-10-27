import { sort } from "remeda";
type Day = {
  date: string;
  position: number;
  impressions: number;
  clicks: number;
};
/** Only observed dates survive; the existing Rankings chart owns gap geometry. */
export function groupSavedDailyObservations(rows: Day[]): Day[] {
  const grouped = new Map<
    string,
    { weighted: number; impressions: number; clicks: number }
  >();
  for (const row of rows) {
    if (
      row.impressions <= 0 ||
      row.position <= 0 ||
      !Number.isFinite(row.position)
    )
      continue;
    const day = grouped.get(row.date) ?? {
      weighted: 0,
      impressions: 0,
      clicks: 0,
    };
    day.weighted += row.position * row.impressions;
    day.impressions += row.impressions;
    day.clicks += row.clicks;
    grouped.set(row.date, day);
  }
  return sort(
    [...grouped].map(([date, day]) => ({
      date,
      position: day.weighted / day.impressions,
      impressions: day.impressions,
      clicks: day.clicks,
    })),
    (a, b) => a.date.localeCompare(b.date),
  );
}
