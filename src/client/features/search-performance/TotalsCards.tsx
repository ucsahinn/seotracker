import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import type { Report } from "@/client/features/search-performance/SearchPerformanceColumns";
import { describeTotals } from "@/client/features/search-performance/totals";
import { formatDate, formatDecimal, formatPercent } from "@/client/lib/format";

type Delta = { text: string; improved: boolean } | null;

function percentDelta(current: number, previous: number): Delta {
  if (previous <= 0) return null;
  const change = (current - previous) / previous;
  // The sign is carried in the text, so `formatPercent` gets the magnitude.
  return {
    text: `${change >= 0 ? "+" : "-"}${formatPercent(Math.abs(change))}`,
    improved: change >= 0,
  };
}

/** Position falls as rankings improve, so the delta is inverted. */
function positionDelta(current: number, previous: number): Delta {
  if (previous <= 0 || current <= 0) return null;
  const change = previous - current;
  return {
    text: `${change >= 0 ? "+" : "-"}${formatDecimal(Math.abs(change))}`,
    improved: change >= 0,
  };
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
        delta={delta(totals.clicks, prevTotals.clicks)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Gösterim"
        value={shown.impressions}
        delta={delta(totals.impressions, prevTotals.impressions)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Tıklama oranı"
        hint="Gösterimlerin yüzde kaçı tıklamaya döndü."
        value={shown.ctr}
        delta={delta(totals.ctr, prevTotals.ctr)}
        deltaTitle={deltaTitle}
      />
      <MetricTile
        label="Ortalama sıra"
        hint="Küçük olan iyidir; 1, sonuçların en üstü demek."
        value={shown.position}
        delta={
          shown.hasImpressions
            ? positionDelta(totals.position, prevTotals.position)
            : null
        }
        deltaTitle={deltaTitle}
      />
    </MetricRow>
  );
}
