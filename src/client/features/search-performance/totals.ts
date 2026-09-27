import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";

type GscTotals = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/**
 * The four headline numbers, as they should read on screen.
 *
 * A period with no impressions has no click-through rate and no average
 * position: the first is 0/0 and the second is a mean over an empty set.
 * Google returns both as `0`, and both screens printed them — so a property
 * Search Console has no data for showed "%0,0" and "0,0", which reads as a
 * measurement rather than as an absence. "Ortalama sıra 0,0" in particular
 * claims a rank above the first result, which cannot happen.
 *
 * Found on a real, freshly verified property: every server call returned
 * 200 with zero rows, and the dashboard reported a site ranking at zero.
 *
 * Clicks and impressions stay as numbers. Zero of those is a fact, not an
 * absence, and a site that was served no impressions genuinely got none.
 */
export function describeTotals(totals: GscTotals): {
  clicks: string;
  impressions: string;
  /** Null when the period has no impressions to divide by. */
  ctr: string | null;
  /** Null when the period has no impressions to average over. */
  position: string | null;
  hasImpressions: boolean;
} {
  const hasImpressions = totals.impressions > 0;
  return {
    clicks: formatCount(totals.clicks),
    impressions: formatCount(totals.impressions),
    ctr: hasImpressions ? formatPercent(totals.ctr) : null,
    position: hasImpressions ? formatDecimal(totals.position) : null,
    hasImpressions,
  };
}
