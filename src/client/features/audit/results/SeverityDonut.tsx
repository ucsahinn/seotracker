import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import type { IssueSeverity } from "@/shared/audit-issues";
import { formatCount } from "@/client/lib/format";
import { t } from "@/shared/i18n";

/**
 * How one audit's findings divide by severity, and a way into each part.
 *
 * Three numbers in a row do not say whether this is "mostly information with
 * two real problems" or "half of it is critical", and those are different
 * afternoons. A ring answers that in one glance because the parts sum to the
 * whole, which is the case a donut is actually for. Choosing a part narrows
 * the list beside it to that severity.
 */

const SEVERITY: Array<{
  key: IssueSeverity;
  label: string;
  hint: string;
  color: string;
}> = [
  {
    key: "critical",
    label: "Kritik",
    hint: "Google siteyi anlayamıyor",
    color: "var(--mark-error)",
  },
  {
    key: "warning",
    label: "Uyarı",
    hint: "Sıralamayı ve tıklamayı düşürür",
    color: "var(--mark-warning)",
  },
  {
    key: "info",
    label: "Bilgi",
    hint: "Küçük iyileştirme fırsatları",
    color: "var(--color-info)",
  },
];

export function SeverityDonut({
  counts,
  typeCount,
  selected,
  onSelect,
}: {
  counts: Record<IssueSeverity, number>;
  /** Distinct issue types behind the findings. */
  typeCount: number;
  selected: IssueSeverity | null;
  onSelect: (severity: IssueSeverity | null) => void;
}) {
  // The labels stay Turkish in SEVERITY and are translated here, at render.
  const segments = SEVERITY.map((row) => ({
    ...row,
    label: t(row.label),
    hint: t(row.hint),
    value: counts[row.key],
  }));
  return (
    <DonutCard
      title={t("Sorunlar ne kadar ciddi?")}
      description={t(
        "{findings} bulgu, {types} sorun türü. Bulgu, bir sorunun bir sayfada görülmesidir. Bir gruba tıklayın, liste yalnızca onları göstersin.",
        {
          findings: formatCount(counts.critical + counts.warning + counts.info),
          types: formatCount(typeCount),
        },
      )}
      totalLabel={t("bulgu")}
      segments={segments}
      summary={donutSummary(segments, t("bulgu"))}
      selectedKey={selected}
      onSelect={(key) =>
        onSelect(SEVERITY.find((row) => row.key === key)?.key ?? null)
      }
    />
  );
}
