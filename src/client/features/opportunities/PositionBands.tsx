import { formatCount, formatNumber } from "@/client/lib/format";

/*
 * The two fields this reads, rather than the whole opportunity row. Narrower
 * than `OpportunityReport["rows"][number]` on purpose: the component is a
 * histogram over one number, and taking the full row would make every test
 * of it assemble a twenty-field fixture to exercise two of them.
 */
type Row = { position: number; clicks: number };

/**
 * Where in the band the pages actually sit, and a way to look at one slice.
 *
 * "4. ile 20. sıra arası" is a sixteen-position range doing very different
 * work at its two ends. A page at 4 needs one competitor to slip; a page at
 * 19 needs a rewrite. The table sorted by score mixed them, and the only way
 * to see the shape was to sort by position and scroll. These four tiles are
 * that shape, and each one is a filter — the actual question an operator has
 * is "show me the near-misses", and now that is one click.
 */

const BANDS = [
  {
    id: "4-5",
    label: "4 – 5",
    hint: "İlk sayfanın üstü; küçük bir iyileştirme yeter",
    min: 4,
    max: 5,
  },
  { id: "6-10", label: "6 – 10", hint: "İlk sayfa", min: 6, max: 10 },
  {
    id: "11-15",
    label: "11 – 15",
    hint: "İkinci sayfanın başı",
    min: 11,
    max: 15,
  },
  {
    id: "16-20",
    label: "16 – 20",
    hint: "Ciddi iş gerektirir",
    min: 16,
    max: 20,
  },
] as const;

export type BandId = (typeof BANDS)[number]["id"];

/** Which band a position falls in, or null when it is outside the range. */
export function bandOf(position: number): BandId | null {
  const band = BANDS.find(
    (entry) => position >= entry.min && position <= entry.max,
  );
  return band?.id ?? null;
}

export function PositionBands({
  rows,
  selected,
  onSelect,
}: {
  rows: Row[];
  selected: BandId | null;
  onSelect: (band: BandId | null) => void;
}) {
  const counts = new Map<BandId, { pages: number; clicks: number }>();
  for (const row of rows) {
    const id = bandOf(row.position);
    if (!id) continue;
    const entry = counts.get(id) ?? { pages: 0, clicks: 0 };
    entry.pages += 1;
    entry.clicks += row.clicks;
    counts.set(id, entry);
  }

  const most = Math.max(
    1,
    ...BANDS.map((band) => counts.get(band.id)?.pages ?? 0),
  );

  return (
    <section
      aria-label="Sıra aralıkları"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {BANDS.map((band) => {
        const entry = counts.get(band.id) ?? { pages: 0, clicks: 0 };
        const active = selected === band.id;
        return (
          <button
            key={band.id}
            type="button"
            // Empty bands stay visible — a gap in the distribution is a
            // finding — but there is nothing to filter down to.
            disabled={entry.pages === 0}
            aria-pressed={active}
            onClick={() => onSelect(active ? null : band.id)}
            className={`rounded-box border px-4 py-3 text-left transition-colors disabled:cursor-default disabled:opacity-60 ${
              active
                ? "border-primary bg-primary/5"
                : "border-base-300 bg-base-100 enabled:hover:border-primary/40"
            }`}
          >
            <span className="text-xs uppercase tracking-wide text-muted">
              {band.label}. sıra
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
                ? band.hint
                : `${formatCount(entry.clicks)} tıklama · ${band.hint}`}
            </span>
          </button>
        );
      })}
    </section>
  );
}
