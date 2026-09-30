type DailyClicks = { key: string; clicks: number; impressions: number };

type ClickTrend = {
  total: number;
  /** Fractional change of the later half against the earlier half; null without a base. */
  change: number | null;
  peakDay: string;
  peakClicks: number;
};

/**
 * Reads a daily click series as one finding: did the second half of the
 * window do better than the first? A week-over-week style signal without a
 * second Google call. Returns null when there is no shape worth drawing.
 */
export function describeClickTrend(daily: DailyClicks[]): ClickTrend | null {
  if (daily.length < 4) return null;
  const total = daily.reduce((sum, row) => sum + row.clicks, 0);
  if (total === 0 && !daily.some((row) => row.impressions > 0)) return null;

  const half = Math.floor(daily.length / 2);
  const earlier = daily
    .slice(0, half)
    .reduce((sum, row) => sum + row.clicks, 0);
  const later = daily.slice(-half).reduce((sum, row) => sum + row.clicks, 0);
  const peak = daily.reduce((best, row) =>
    row.clicks > best.clicks ? row : best,
  );

  return {
    total,
    change: earlier > 0 ? (later - earlier) / earlier : null,
    peakDay: peak.key,
    peakClicks: peak.clicks,
  };
}
