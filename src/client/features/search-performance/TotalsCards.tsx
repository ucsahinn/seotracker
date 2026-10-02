import { fractionalChange } from "@/shared/delta";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import type { Report } from "@/client/features/search-performance/SearchPerformanceColumns";
import { describeTotals } from "@/client/features/search-performance/totals";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

type Delta = { text: string; improved: boolean } | null;

function percentDelta(current: number, previous: number): Delta {
  const change = fractionalChange(current, previous);
  if (change === null || Math.round(Math.abs(change) * 100) === 0) return null;
  // The sign is carried in the text, so `formatPercent` gets the magnitude.
  return {
    text: `${change >= 0 ? "+" : "-"}${formatPercent(Math.abs(change))}`,
    improved: change >= 0,
  };
}

/**
 * CTR is already a percentage, so its change is a difference in percentage
 * points ("puan"), not a percentage of a percentage.
 */
function ctrDelta(current: number, previous: number): Delta {
  if (previous <= 0) return null;
  const points = (current - previous) * 100;
  if (formatDecimal(Math.abs(points)) === formatDecimal(0)) return null;
  return {
    text: `${points >= 0 ? "+" : "-"}${formatDecimal(Math.abs(points))} puan`,
    improved: points >= 0,
  };
}

/**
 * Position falls as rankings improve, so the badge is inverted. A relative
 * change, as on the dashboard tile: one arrow and one wording for the same
 * number on both screens.
 */
function positionDelta(current: number, previous: number): number | null {
  if (current <= 0) return null;
  return fractionalChange(current, previous);
}

export function TotalsCards({ report }: { report: Report }) {
  const { totals, prevTotals, range } = report;
  const deltaTitle = `${formatDate(range.prevStartDate)} - ${formatDate(range.prevEndDate)} dönemine göre`;
  const shown = describeTotals(totals);
  // Nothing to compare against when the period itself is empty, and a delta
  // beside a dash is noise.
  const delta = (current: number, previous: number) =>
    shown.hasImpressions ? percentDelta(current, previous) : null;
  return (
    <MetricRow>
      <MetricTile
        label="Tıklama"
        value={shown.clicks}
        animateTo={{ value: totals.clicks, format: formatCount }}
        delta={delta(totals.clicks, prevTotals.clicks)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Gösterim"
        value={shown.impressions}
        animateTo={{ value: totals.impressions, format: formatCount }}
        delta={delta(totals.impressions, prevTotals.impressions)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Tıklama oranı"
        hint="Gösterimlerin yüzde kaçı tıklamaya döndü."
        value={shown.ctr}
        animateTo={{ value: totals.ctr, format: (n) => formatPercent(n) }}
        delta={
          shown.hasImpressions ? ctrDelta(totals.ctr, prevTotals.ctr) : null
        }
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Ortalama sıra"
        hint="Küçük olan iyidir; 1, sonuçların en üstü demek."
        value={shown.position}
        animateTo={{ value: totals.position, format: (n) => formatDecimal(n) }}
        delta={
          shown.hasImpressions
            ? positionDelta(totals.position, prevTotals.position)
            : null
        }
        deltaTitle={deltaTitle}
        inverted
      />
    </MetricRow>
  );
}
