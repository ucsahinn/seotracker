import { DonutCard } from "@/client/components/DonutChart";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import {
  DistributionBars,
  type DistributionRow,
} from "@/client/features/audit/results/DistributionBars";
import { OTHER_KEY } from "@/client/features/analytics/reportInsights";
import type { SummaryPlan } from "@/client/features/analytics/reportBuckets";
import type { Kpi } from "@/client/features/analytics/reportKpis";
import { formatCount, formatPercent } from "@/client/lib/format";

/**
 * The tab's own summary: a few figures, then the chart that answers the tab's
 * question. Clicking a ring slice or a bar hands its key to the report, which
 * narrows the table below to those rows.
 */
export function ReportSummary({
  plan,
  kpis,
  selectedKey,
  onSelect,
}: {
  plan: SummaryPlan | null;
  kpis: Kpi[];
  selectedKey: string | null;
  onSelect: (key: string | null) => void;
}) {
  if (!plan && kpis.length === 0) return null;
  return (
    <div className="enter space-y-3">
      {kpis.length > 0 ? (
        <MetricRow>
          {kpis.map((kpi) => (
            <MetricTile
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              hint={kpi.hint}
            />
          ))}
        </MetricRow>
      ) : null}
      {plan ? (
        <SummaryChart
          plan={plan}
          selectedKey={selectedKey}
          onSelect={onSelect}
        />
      ) : null}
    </div>
  );
}

function SummaryChart({
  plan,
  selectedKey,
  onSelect,
}: {
  plan: SummaryPlan;
  selectedKey: string | null;
  onSelect: (key: string | null) => void;
}) {
  const total = plan.segments.reduce((sum, segment) => sum + segment.value, 0);
  const lead = plan.segments[0];
  const summary = `${plan.title}: toplam ${formatCount(total)} ${plan.unit}. ${
    lead
      ? `En büyük pay ${lead.label}, ${formatPercent(lead.value / total)}.`
      : ""
  }`;
  const description = "Birine tıklayın, aşağıdaki tablo o satırlara daralsın.";

  if (plan.form === "ring") {
    return (
      <DonutCard
        title={plan.title}
        description={description}
        totalLabel={plan.unit}
        segments={plan.segments}
        summary={summary}
        selectedKey={selectedKey}
        onSelect={onSelect}
      />
    );
  }

  const rows = plan.segments.map(
    (segment): DistributionRow => ({
      key: segment.key,
      label: segment.label,
      count: segment.value,
      color:
        segment.key === OTHER_KEY
          ? "var(--color-base-300)"
          : "var(--color-primary)",
      active: segment.key === selectedKey,
    }),
  );
  return (
    <section className="rounded-box border border-base-300 bg-base-100 px-3 py-3">
      <h2 className="px-2 text-sm font-medium">{plan.title}</h2>
      <p className="mb-2 px-2 text-xs text-muted">{description}</p>
      <DistributionBars
        rows={rows}
        summary={summary}
        onSelect={(key) => onSelect(key === selectedKey ? null : key)}
      />
    </section>
  );
}
