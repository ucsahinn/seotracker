import { useEffect, useState } from "react";
import { HelpTip } from "@/client/components/HelpTip";
import {
  BAND_IDS,
  BAND_LABELS,
  countBands,
  type BandId,
} from "@/client/features/rankings/positionBands";
import { formatCount, formatPercent } from "@/client/lib/format";

type Row = { position: number };

/** Lighter as the rank gets worse, so the top of the page reads strongest. */
const BAND_SHADE: Record<BandId, number> = {
  top3: 100,
  top10: 72,
  top20: 48,
  beyond: 30,
};

/**
 * Where the tracked queries sit: how many rank 1-3, 4-10, 11-20 and 21+.
 *
 * The bars are the filter -- pressing one narrows the table to that band, and
 * pressing it again clears it. Bars grow in on first paint. Each is a real
 * button with the count in its label, so the chart is fully usable without
 * seeing it. No `Chart` wrapper: there is no SVG to describe.
 */
export function PositionBandBars({
  rows,
  active,
  onChange,
}: {
  rows: Row[];
  active: BandId | undefined;
  onChange: (next: BandId | undefined) => void;
}) {
  const counts = countBands(rows);
  const total = rows.length;
  const max = Math.max(...BAND_IDS.map((id) => counts[id]), 1);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (total === 0) return null;

  return (
    <section className="rounded-box border border-base-300 bg-base-100 px-4 py-4">
      <div className="flex items-center gap-1.5">
        <h2 className="text-sm font-medium">Sıra dağılımı</h2>
        <HelpTip label="Sıra dağılımı">
          Takip edilen sorguların ortalama sırasına göre kaç gruba ayrıldığını
          gösterir. Bir çubuğa tıklayarak tabloyu o gruba daraltın.
        </HelpTip>
      </div>
      <p className="mt-0.5 text-xs text-muted">
        {formatCount(total)} sorgunun ortalama sırası. Bir çubuğa tıklayınca
        tablo o gruba göre daralır.
      </p>
      <div role="group" aria-label="Sıra grupları" className="mt-3 space-y-1.5">
        {BAND_IDS.map((id) => {
          const count = counts[id];
          const pressed = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={pressed}
              disabled={count === 0 && !pressed}
              aria-label={`Sıra ${BAND_LABELS[id]}: ${formatCount(count)} sorgu`}
              title={
                pressed
                  ? "Filtreyi kaldır"
                  : `Sırası ${BAND_LABELS[id]} olan sorguları göster`
              }
              onClick={() => onChange(pressed ? undefined : id)}
              className={`group flex w-full items-center gap-3 rounded-field px-2 py-1.5 text-left text-sm transition-colors enabled:hover:bg-base-200/60 disabled:cursor-not-allowed disabled:opacity-60 ${pressed ? "bg-base-200" : ""}`}
            >
              <span className="w-12 shrink-0 tabular-nums text-muted">
                {BAND_LABELS[id]}
              </span>
              <span className="h-2.5 min-w-0 flex-1 rounded-full bg-base-200">
                <span
                  aria-hidden
                  className="block h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{
                    width: drawn ? `${(count / max) * 100}%` : "0%",
                    backgroundColor: `color-mix(in oklab, var(--color-primary) ${BAND_SHADE[id]}%, transparent)`,
                  }}
                />
              </span>
              <span className="w-24 shrink-0 text-right tabular-nums">
                {formatCount(count)}
                <span className="ml-2 text-muted">
                  {formatPercent(count / total, 0)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
