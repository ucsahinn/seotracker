import { formatCount, formatNumber } from "@/client/lib/format";

/**
 * The three kinds of opportunity, as a filter.
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

type Row = { kind: KindId; clicks: number; impressions: number };

export type KindId = "ctr_gap" | "near_miss" | "deep";

const KINDS = [
  {
    id: "ctr_gap",
    label: "Tıklanmıyor",
    hint: "Sıra iyi ama tıklama oranı, sizin bu sıradaki diğer sayfalarınızın altında. Başlık ve açıklama işi.",
  },
  {
    id: "near_miss",
    label: "Yaklaşmış",
    hint: "İlk sayfaya yakın ya da üstünde. Sıra yükseltme işi.",
  },
  {
    id: "deep",
    label: "Derinde",
    hint: "20. sıranın altında ama talep var. İçerik kararı.",
  },
] as const satisfies ReadonlyArray<{
  id: KindId;
  label: string;
  hint: string;
}>;

export function OpportunityKinds({
  rows,
  selected,
  onSelect,
}: {
  rows: Row[];
  selected: KindId | null;
  onSelect: (kind: KindId | null) => void;
}) {
  const counts = new Map<KindId, { pages: number; impressions: number }>();
  for (const row of rows) {
    const entry = counts.get(row.kind) ?? { pages: 0, impressions: 0 };
    entry.pages += 1;
    entry.impressions += row.impressions;
    counts.set(row.kind, entry);
  }

  const most = Math.max(1, ...KINDS.map((k) => counts.get(k.id)?.pages ?? 0));

  return (
    <section aria-label="Fırsat türleri" className="grid gap-3 sm:grid-cols-3">
      {KINDS.map((kind) => {
        const entry = counts.get(kind.id) ?? { pages: 0, impressions: 0 };
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
            className={`rounded-box border px-4 py-3 text-left transition-colors disabled:cursor-default disabled:opacity-60 ${
              active
                ? "border-primary bg-primary/5"
                : "border-base-300 bg-base-100 enabled:hover:border-primary/40"
            }`}
          >
            <span className="text-xs uppercase tracking-wide text-muted">
              {kind.label}
            </span>
            <span className="mt-1 block text-2xl font-semibold tabular-nums">
              {formatNumber(entry.pages)}
            </span>
            <span
              aria-hidden
              className="mt-2 block h-1.5 rounded-full bg-base-200"
            >
              <span
                className={`block h-full rounded-full ${active ? "bg-primary" : "bg-primary/45"}`}
                style={{ width: `${(entry.pages / most) * 100}%` }}
              />
            </span>
            <span className="mt-2 block text-xs text-muted">
              {entry.pages === 0
                ? kind.hint
                : `${formatCount(entry.impressions)} gösterim · ${kind.hint}`}
            </span>
          </button>
        );
      })}
    </section>
  );
}
