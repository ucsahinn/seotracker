import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import {
  COVERAGE_BUCKETS,
  type CoverageBucket,
} from "@/client/features/audit/results/coverageBuckets";
import { t } from "@/shared/i18n";

// Turkish source labels; t() runs where they render.
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
    color: "var(--mark-warning)",
  },
  pending: {
    label: "Yanıt bekleyen",
    hint: "Google'a sorduk ama yanıt gelmedi ya da hiç sorulmadı",
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
    color: BUCKET[key].color,
    label: t(BUCKET[key].label),
    hint: t(BUCKET[key].hint),
  }));
  return (
    <DonutCard
      title={t("Google bu sayfalarla ne yapmış?")}
      description={t(
        "Bir gruba tıklayın, aşağıdaki liste yalnızca o sayfaları göstersin.",
      )}
      totalLabel={t("sayfa")}
      segments={segments}
      summary={donutSummary(segments, t("sayfa"))}
      selectedKey={selected}
      onSelect={(key) =>
        onSelect(COVERAGE_BUCKETS.find((bucket) => bucket === key) ?? null)
      }
    />
  );
}
