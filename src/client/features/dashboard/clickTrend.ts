type DailyClicks = { key: string; clicks: number; impressions: number };

type ClickTrend = {
  total: number;
  peakDay: string;
  peakClicks: number;
};

/**
 * Reads a daily click series as one finding: the total and the peak day.
 * The change against the previous period comes from the report's totals, not
 * from here. Returns null when there is no shape worth drawing.
 */
export function describeClickTrend(daily: DailyClicks[]): ClickTrend | null {
  if (daily.length < 4) return null;
  const total = daily.reduce((sum, row) => sum + row.clicks, 0);
  if (total === 0 && !daily.some((row) => row.impressions > 0)) return null;

  const peak = daily.reduce((best, row) =>
    row.clicks > best.clicks ? row : best,
  );

  return {
    total,
    peakDay: peak.key,
    peakClicks: peak.clicks,
  };
}
