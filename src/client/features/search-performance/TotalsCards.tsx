import { fractionalChange } from "@/shared/delta";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import type { Report } from "@/client/features/search-performance/SearchPerformanceColumns";
import { describeTotals } from "@/client/features/search-performance/totals";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
  formatSignedPercent,
} from "@/client/lib/format";

type Delta = { text: string; improved: boolean } | null;

function percentDelta(current: number, previous: number): Delta {
  const change = fractionalChange(current, previous);
  const text = change === null ? null : formatSignedPercent(change);
  if (change === null || text === null) return null;
  return { text, improved: change >= 0 };
}

/**
 * CTR is already a percentage, so its change is a difference in percentage
 * points ("puan"), not a percentage of a percentage. The dashboard tile uses
 * this too, so the same CTR change reads the same on both screens.
 */
export function ctrDelta(current: number, previous: number): Delta {
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
        hint="Düşük sayı daha iyi: 1, listenin en üstü demek."
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
