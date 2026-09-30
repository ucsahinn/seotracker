import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import {
  COVERAGE_BUCKETS,
  type CoverageBucket,
} from "@/client/features/audit/results/coverageBuckets";

const BUCKET: Record<
  CoverageBucket,
  { label: string; hint: string; color: string }
> = {
  indexed: {
    label: "Google'da",
    hint: "Aramada çıkabilir",
    color: "var(--color-success)",
  },
  notIndexed: {
    label: "Dizinde değil",
    hint: "Google baktı ama almadı",
    color: "var(--color-warning)",
  },
  pending: {
    label: "Yanıt bekleyen",
    hint: "Henüz sorulmadı ya da yanıt gelmedi",
    color: "var(--color-base-300)",
  },
};

/** The split of the audited pages by what Google says; a group filters the table. */
export function CoverageVerdictDonut({
  counts,
  selected,
  onSelect,
}: {
  counts: Record<CoverageBucket, number>;
  selected: CoverageBucket | null;
  onSelect: (bucket: CoverageBucket | null) => void;
}) {
  const segments = COVERAGE_BUCKETS.map((key) => ({
    key,
    value: counts[key],
    ...BUCKET[key],
  }));
  return (
    <DonutCard
      title="Google bu sayfalarla ne yapmış?"
      description="Bir gruba tıklayın, aşağıdaki liste yalnızca o sayfaları göstersin."
      totalLabel="sayfa"
      segments={segments}
      summary={donutSummary(segments, "sayfa")}
      selectedKey={selected}
      onSelect={(key) =>
        onSelect(COVERAGE_BUCKETS.find((bucket) => bucket === key) ?? null)
      }
    />
  );
}
