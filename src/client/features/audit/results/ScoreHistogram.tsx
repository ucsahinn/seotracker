import {
  DistributionBars,
  type DistributionRow,
} from "@/client/features/audit/results/DistributionBars";
import type {
  PerformanceFilters,
  PerformanceRowData,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import { speedBands } from "@/client/features/audit/results/performanceBands";
import { formatCount } from "@/client/lib/format";

/**
 * How the speed scores are spread, beside the average that hides it.
 *
 * An average of 62 across two hundred pages reads identically whether every
 * page is mediocre or half are perfect and half are unusable -- and those
 * are different weeks of work. Three bands answer which one it is, and each
 * is a filter: the counts come from the unfiltered audit so the other bands
 * stay clickable after one is chosen.
 */
export function ScoreHistogram({
  rows,
  filters,
  onChange,
}: {
  rows: Array<Pick<PerformanceRowData, "performanceScore" | "strategy">>;
  filters: PerformanceFilters;
  onChange: (filters: PerformanceFilters) => void;
}) {
  const bands = speedBands(rows);
  const measured = bands.reduce((sum, band) => sum + band.count, 0);
  if (measured === 0) return null;

  const distribution: DistributionRow[] = bands.map((band) => ({
    key: band.key,
    label: band.label,
    hint: band.hint,
    count: band.count,
    color: band.color,
    active: band.matches(filters),
  }));
  const parts = bands
    .map(
      (band) =>
        `${formatCount(band.count)} ${band.label.toLocaleLowerCase("tr")}`,
    )
    .join(", ");

  return (
    <DistributionBars
      rows={distribution}
      summary={`Mobilde ölçülen ${formatCount(measured)} sayfadan ${parts}.`}
      onSelect={(key) => {
        const band = bands.find((entry) => entry.key === key);
        if (!band) return;
        onChange(
          band.matches(filters) ? band.clear(filters) : band.apply(filters),
        );
      }}
    />
  );
}
