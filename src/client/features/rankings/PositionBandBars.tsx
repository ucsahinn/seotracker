import { t } from "@/shared/i18n";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
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
export function bandChanges(
  rows: readonly Row[],
): Record<BandId, number | null> {
  const both = rows.filter(
    (row): row is Row & { previousPosition: number } =>
      row.previousPosition != null,
  );
  if (!both.length)
    return { top3: null, top10: null, top20: null, beyond: null };
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
  counts: suppliedCounts,
  changes: suppliedChanges,
  comparableCount,
  active,
  onChange,
}: {
  rows: Row[];
  counts?: Record<BandId, number>;
  changes?: Record<BandId, number | null>;
  comparableCount?: number;
  active: BandId | undefined;
  onChange: (next: BandId | undefined) => void;
}) {
  const counts = suppliedCounts ?? countBands(rows);
  const changes = suppliedChanges ?? bandChanges(rows);
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const paired =
    comparableCount ??
    rows.filter((row) => row.previousPosition != null).length;
  const max = Math.max(...BAND_IDS.map((id) => counts[id]), 1);
  const [drawn, setDrawn] = useState(false);
  const reduced = useReducedMotion();
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
          "{count} sorgu; aynı {paired} sorguda net değişim. Çubuklar en büyük gruba görelidir.",
          { count: formatCount(total), paired: formatCount(paired) },
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
                count: formatCount(count),
              })}
              title={
                pressed
                  ? t("Filtreyi kaldır")
                  : t("Sırası {band} olan sorguları göster", {
                      band: BAND_LABELS[id],
                    })
              }
              onClick={() => onChange(pressed ? undefined : id)}
              className={`group grid min-h-11 w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-field px-2 py-1.5 text-left text-sm transition-colors enabled:hover:bg-base-200/60 disabled:cursor-not-allowed disabled:opacity-60 ${pressed ? "bg-base-200" : ""}`}
            >
              <span className="w-12 shrink-0 tabular-nums text-muted">
                {BAND_LABELS[id]}
              </span>
              <span className="col-span-3 row-start-2 h-2.5 w-full rounded-full bg-base-200">
                <span
                  aria-hidden
                  className="block h-full rounded-full origin-left transition-transform duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none"
                  style={{
                    width: `${(count / max) * 100}%`,
                    transform: drawn || reduced ? "scaleX(1)" : "scaleX(0)",
                    backgroundColor: "var(--ink-primary)",
                  }}
                />
              </span>
              <span className="min-w-0 text-right tabular-nums">
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
function BandChange({ band, change }: { band: BandId; change: number | null }) {
  if (change === null)
    return (
      <span className="max-w-28 text-right text-xs text-subtle">
        {t("Karşılaştırma yok")}
      </span>
    );
  if (change === 0) {
    return (
      <span className="w-14 shrink-0 text-right text-xs text-subtle">
        {t("Değişmedi")}
      </span>
    );
  }
  const good = band === "beyond" ? change < 0 : change > 0;
  const Icon = change > 0 ? ArrowUp : ArrowDown;
  return (
    <span
      className={`inline-flex w-14 shrink-0 items-center justify-end gap-0.5 text-xs font-medium tabular-nums ${
        good ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"
      }`}
      title={t(
        "Aynı sorgu kümesinde net değişim; giriş veya çıkış sayısı değildir.",
      )}
    >
      <Icon aria-hidden className="size-3" />
      {change > 0 ? "+" : "-"}
      {formatCount(Math.abs(change))}
    </span>
  );
}
