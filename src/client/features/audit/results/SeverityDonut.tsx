import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import type { IssueSeverity } from "@/shared/audit-issues";

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
    color: "var(--color-error)",
  },
  {
    key: "warning",
    label: "Uyarı",
    hint: "Sıralamayı ve tıklamayı düşürür",
    color: "var(--color-warning)",
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
  selected,
  onSelect,
}: {
  counts: Record<IssueSeverity, number>;
  selected: IssueSeverity | null;
  onSelect: (severity: IssueSeverity | null) => void;
}) {
  const segments = SEVERITY.map((row) => ({ ...row, value: counts[row.key] }));
  return (
    <DonutCard
      title="Sorunlar ne kadar ciddi?"
      description="Bir gruba tıklayın, liste yalnızca o sorunları göstersin."
      totalLabel="bulgu"
      segments={segments}
      summary={donutSummary(segments, "bulgu")}
      selectedKey={selected}
      onSelect={(key) =>
        onSelect(SEVERITY.find((row) => row.key === key)?.key ?? null)
      }
    />
  );
}
