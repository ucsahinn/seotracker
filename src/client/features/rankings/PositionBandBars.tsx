import { t } from "@/shared/i18n";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { HelpTip } from "@/client/components/HelpTip";
import {
  BAND_IDS,
  BAND_LABELS,
  countBands,
  type BandId,
} from "@/shared/positionBands";
import { formatCount, formatPercent } from "@/client/lib/format";

type Row = { position: number; previousPosition?: number | null };

/**
 * How many queries each band gained or lost against the previous window,
 * over the queries that have a reading in both (a query new this window is
 * not a move into a band).
 */
export function bandChanges(rows: readonly Row[]): Record<BandId, number> {
  const both = rows.filter(
    (row): row is Row & { previousPosition: number } =>
      row.previousPosition != null,
  );
  const now = countBands(both);
  const before = countBands(
    both.map((row) => ({ position: row.previousPosition })),
  );
  return {
    top3: now.top3 - before.top3,
    top10: now.top10 - before.top10,
    top20: now.top20 - before.top20,
    beyond: now.beyond - before.beyond,
  };
}

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
  const changes = bandChanges(rows);
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
        <h2 className="text-sm font-medium">{t("Sıra dağılımı")}</h2>
        <HelpTip label={t("Sıra dağılımı")}>
          {t(
            "Takip edilen sorgular ortalama sırasına göre gruplanır. Bir çubuğa tıklayınca tablo o gruba daralır.",
          )}
        </HelpTip>
      </div>
      <p className="mt-0.5 text-xs text-muted">
        {t(
          "{count} sorgunun ortalama sırası; sağdaki sayı önceki döneme göre değişim. Bir çubuğa tıklayınca tablo o gruba göre daralır.",
          { count: total },
        )}
      </p>
      <div
        role="group"
        aria-label={t("Sıra grupları")}
        className="mt-3 space-y-1.5"
      >
        {BAND_IDS.map((id) => {
          const count = counts[id];
          const pressed = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={pressed}
              disabled={count === 0 && !pressed}
              aria-label={t("Sıra {band}: {count} sorgu", {
                band: BAND_LABELS[id],
                count,
              })}
              title={
                pressed
                  ? t("Filtreyi kaldır")
                  : t("Sırası {band} olan sorguları göster", {
                      band: BAND_LABELS[id],
                    })
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
              <BandChange band={id} change={changes[id]} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

/**
 * The band's move against the previous window, with an arrow and a sign.
 * More queries in the first three bands is good; more in 21+ is not.
 */
function BandChange({ band, change }: { band: BandId; change: number }) {
  if (change === 0) {
    return (
      <span className="w-14 shrink-0 text-right text-xs text-subtle">±0</span>
    );
  }
  const good = band === "beyond" ? change < 0 : change > 0;
  const Icon = change > 0 ? ArrowUp : ArrowDown;
  return (
    <span
      className={`inline-flex w-14 shrink-0 items-center justify-end gap-0.5 text-xs font-medium tabular-nums ${
        good ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"
      }`}
      title={t("Önceki döneme göre bu gruba giren ya da çıkan sorgu sayısı")}
    >
      <Icon aria-hidden className="size-3" />
      {change > 0 ? "+" : "-"}
      {formatCount(Math.abs(change))}
    </span>
  );
}
