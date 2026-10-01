import {
  KIND_COPY,
  KIND_ORDER,
  type KindId,
} from "@/client/features/opportunities/opportunityLogic";
import { formatCount } from "@/client/lib/format";

/**
 * The three kinds of opportunity, as a filter and a legend: the ring above
 * is the chart (impressions or clicks per kind), so these tiles carry only the
 * explanation and a page count, not a second set of figures.
 *
 *
 * This replaced a position-band histogram, which was the right shape for the
 * wrong question: the screen used to keep only positions 4–20, so the bands
 * divided an arbitrary slice rather than the work. A page ranking second
 * that nobody clicks and a page at 34 with four thousand impressions are
 * both opportunities — they just need different afternoons, and that is what
 * an operator is choosing between.
 *
 * Ordered by what the work costs, cheapest first.
 */

type Row = { kind: KindId };

export function OpportunityKinds({
  rows,
  selected,
  onSelect,
}: {
  rows: Row[];
  selected: KindId | null;
  onSelect: (kind: KindId | null) => void;
}) {
  const counts = new Map<KindId, { pages: number }>();
  for (const row of rows) {
    const entry = counts.get(row.kind) ?? { pages: 0 };
    entry.pages += 1;
    counts.set(row.kind, entry);
  }

  return (
    <section
      aria-label="Fırsat türleri"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {KIND_ORDER.map((id) => {
        const kind = { id, ...KIND_COPY[id] };
        const entry = counts.get(kind.id) ?? { pages: 0 };
        const active = selected === kind.id;
        return (
          <button
            key={kind.id}
            type="button"
            // An empty kind stays visible — its absence is a finding — but
            // there is nothing to filter down to.
            disabled={entry.pages === 0}
            aria-pressed={active}
            onClick={() => onSelect(active ? null : kind.id)}
            className={`flex flex-col items-start justify-start rounded-box border px-4 py-3 text-left transition-colors disabled:cursor-default disabled:opacity-60 ${
              active
                ? "border-primary bg-primary/5"
                : "border-base-300 bg-base-100 enabled:hover:border-primary/40"
            }`}
          >
            <span className="text-xs uppercase tracking-wide text-muted">
              {kind.label}
              {entry.pages === 0
                ? null
                : ` · ${formatCount(entry.pages)} sayfa`}
            </span>
            <span className="mt-1 block text-xs text-muted">
              {entry.pages === 0
                ? `Şu an bu türde sayfa yok. ${kind.hint}`
                : kind.hint}
            </span>
          </button>
        );
      })}
    </section>
  );
}
