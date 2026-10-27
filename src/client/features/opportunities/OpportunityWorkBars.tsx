import { t } from "@/shared/i18n";
import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { WORK_KINDS, type WorkKind } from "@/shared/pageOpportunities";
import {
  WORK_COPY,
  workColor,
} from "@/client/features/opportunities/opportunityLogic";
import { formatCount } from "@/client/lib/format";

type ByWork = Record<
  WorkKind,
  { pages: number; gain: number; gainPerMonth: number }
>;

const plusCount = (n: number) => `+${formatCount(n)}`;

/**
 * Where the extra clicks are, by the kind of work that gets them.
 *
 * This replaced a donut of impressions per kind, where one kind held 90% of
 * the site because "near miss" spanned positions 4 to 20 -- the chart had
 * nothing to say. Each bar is now the clicks a month that one kind of work
 * could bring, with the action that gets them; pressing a bar narrows the
 * table to pages whose main work is that kind. Cheapest work first.
 */
export function OpportunityWorkBars({
  byWork,
  selected,
  onSelect,
}: {
  byWork: ByWork;
  selected: WorkKind | null;
  onSelect: (work: WorkKind | null) => void;
}) {
  const max = Math.max(...WORK_KINDS.map((id) => byWork[id].gainPerMonth), 1);
  // Bars grow in after first paint; `motion-reduce` keeps them still.
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="rounded-box border border-base-300 bg-base-100 px-4 py-4 shadow-[var(--shadow-raise)]">
      <h2 className="text-sm font-semibold">{t("Kazanç hangi işte?")}</h2>
      <p className="mt-0.5 text-xs text-muted">
        {t(
          "Her satır, o işle ayda gelebilecek ek tıklama. Bir satıra basınca tablo o işe daralır.",
        )}
      </p>
      <div
        role="group"
        aria-label={t("İş türleri")}
        className="stagger mt-3 space-y-1"
      >
        {WORK_KINDS.map((id) => {
          const entry = byWork[id];
          const copy = WORK_COPY[id];
          const pressed = selected === id;
          const empty = entry.pages === 0;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={pressed}
              disabled={empty && !pressed}
              onClick={() => onSelect(pressed ? null : id)}
              className={`grid w-full grid-cols-1 items-center gap-x-4 gap-y-1 rounded-field border-l-4 px-3 py-2 text-left transition-colors enabled:hover:bg-base-200/60 disabled:cursor-default disabled:opacity-60 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_10rem] ${
                pressed ? "bg-base-200" : ""
              }`}
              style={{ borderLeftColor: workColor(id) }}
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {t(copy.label)}
                </span>
                <span className="block text-xs text-muted">
                  {empty
                    ? t("Bu türde kazanç beklenen sayfa yok.")
                    : t(copy.action)}
                </span>
              </span>
              <span
                aria-hidden
                className="h-2.5 min-w-0 rounded-full bg-base-200"
              >
                <span
                  className="block h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{
                    width: drawn
                      ? `${(entry.gainPerMonth / max) * 100}%`
                      : "0%",
                    backgroundColor: workColor(id),
                  }}
                />
              </span>
              <span className="tabular-nums sm:text-right">
                <span className="block text-sm">
                  <span className="font-semibold">
                    <AnimatedNumber
                      value={entry.gainPerMonth}
                      format={plusCount}
                    />
                  </span>{" "}
                  <span className="text-xs text-muted">{t("tıklama/ay")}</span>
                </span>
                <span className="block text-xs text-muted">
                  {t("{count} sayfa", { count: entry.pages })}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
