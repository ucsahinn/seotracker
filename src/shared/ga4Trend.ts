/** Preserve null metrics and leave absent limited dates as gaps. */
export function dailySessions(
  rows: Array<Record<string, string | number | null>>,
  range: { startDate: string; endDate: string },
  usable: boolean,
): Array<{ date: string; sessions: number | null }> {
  const byDate = new Map<string, number | null>();
  for (const row of rows) {
    if (typeof row.date !== "string") continue;
    const date = row.date.includes("-")
      ? row.date
      : row.date.slice(0, 4) +
        "-" +
        row.date.slice(4, 6) +
        "-" +
        row.date.slice(6, 8);
    byDate.set(date, typeof row.sessions === "number" ? row.sessions : null);
  }
  const days: Array<{ date: string; sessions: number | null }> = [];
  for (let date = range.startDate; date <= range.endDate; ) {
    days.push({
      date,
      sessions: byDate.has(date) ? byDate.get(date)! : usable ? 0 : null,
    });
    const next = new Date(date + "T00:00:00Z");
    next.setUTCDate(next.getUTCDate() + 1);
    date = next.toISOString().slice(0, 10);
  }
  return days;
}
