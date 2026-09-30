import { useState } from "react";
import { DonutChart } from "@/client/components/DonutChart";
import {
  KIND_ORDER,
  kindTotals,
  type KindId,
  type Metric,
  type OpportunityRow,
} from "@/client/features/opportunities/opportunityLogic";
import { formatCount, formatPercent } from "@/client/lib/format";

const METRICS = [
  { id: "impressions", label: "Gösterim", unit: "gösterim" },
  { id: "clicks", label: "Tıklama", unit: "tıklama" },
] as const satisfies ReadonlyArray<{ id: Metric; label: string; unit: string }>;

/**
 * Where the opportunity is, as one ring: how the shown impressions (or
 * clicks) split across the three kinds of work. Choosing a segment filters
 * the table to that kind, from the ring or from its legend row -- the same
 * choice the kind tiles below make, held in the same state.
 */
export function OpportunitySummary({
  rows,
  selectedKind,
  onSelectKind,
}: {
  rows: OpportunityRow[];
  selectedKind: KindId | null;
  onSelectKind: (kind: KindId | null) => void;
}) {
  const [metric, setMetric] = useState<Metric>("impressions");
  const segments = kindTotals(rows, metric);
  const shown = segments.filter((segment) => segment.value > 0);
  const total = shown.reduce((sum, segment) => sum + segment.value, 0);
  const unit = METRICS.find((m) => m.id === metric)?.unit ?? "";
  if (total === 0) return null;

  const leader = shown.reduce((a, b) => (b.value > a.value ? b : a));

  return (
    <section
      aria-label="Fırsatların dağılımı"
      className="rounded-box border border-base-300 bg-base-100 px-4 py-4 transition-opacity duration-700 starting:opacity-0"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium">Fırsat nerede toplanıyor?</h2>
        <div role="group" aria-label="Ölçü" className="join">
          {METRICS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={metric === option.id}
              onClick={() => setMetric(option.id)}
              className={`btn btn-xs join-item ${metric === option.id ? "btn-neutral" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <DonutChart
        segments={segments}
        totalLabel={unit}
        height={170}
        selectedKey={selectedKind}
        // `KIND_ORDER.find` narrows the ring's string key back to a `KindId`
        // without a cast: a key that is not one of the three becomes null.
        onSelect={(key) =>
          onSelectKind(KIND_ORDER.find((id) => id === key) ?? null)
        }
        summary={`${formatCount(total)} ${unit} içinde en büyük pay ${leader.label.toLocaleLowerCase("tr")} sayfalarda (${formatPercent(leader.value / total)}).`}
      />
    </section>
  );
}
