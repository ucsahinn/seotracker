import { DonutChart } from "@/client/components/DonutChart";
import { formatCount, formatPercent } from "@/client/lib/format";
import type { IssueSeverity } from "@/shared/audit-issues";

/**
 * How one audit's findings divide by severity.
 *
 * The screen already counts them — three numbers in a row above the table —
 * but three numbers do not say whether this is "mostly information with two
 * real problems" or "half of it is critical", and those are different
 * afternoons. A ring answers that in one glance because the parts sum to the
 * whole, which is the case a donut is actually for.
 *
 * Bars stayed bars elsewhere (countries, position bands) because those are
 * rankings, not divisions of a total.
 */

const SEVERITY = [
  { key: "critical", label: "Kritik", color: "var(--color-error)" },
  { key: "warning", label: "Uyarı", color: "var(--color-warning)" },
  { key: "info", label: "Bilgi", color: "var(--color-info)" },
] as const;

export function SeverityDonut({
  counts,
}: {
  counts: Record<IssueSeverity, number>;
}) {
  const total = SEVERITY.reduce((sum, row) => sum + counts[row.key], 0);
  if (total === 0) return null;

  const segments = SEVERITY.map((row) => ({
    key: row.key,
    label: row.label,
    value: counts[row.key],
    color: row.color,
  }));

  const worst = segments.find((segment) => segment.value > 0);

  return (
    <section className="rounded-box border border-base-300 bg-base-100 px-4 py-4">
      <h3 className="mb-3 text-sm font-medium">Sorunların önem dağılımı</h3>
      <DonutChart
        segments={segments}
        totalLabel="bulgu"
        height={180}
        summary={
          worst
            ? `${formatCount(total)} bulgunun ${formatPercent(worst.value / total)} kadarı ${worst.label.toLocaleLowerCase("tr")} düzeyinde.`
            : `${formatCount(total)} bulgu.`
        }
      />
    </section>
  );
}
