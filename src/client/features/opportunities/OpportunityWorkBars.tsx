import { t } from "@/shared/i18n";
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
  gainKnown = true,
  selected,
  onSelect,
}: {
  byWork: ByWork;
  gainKnown?: boolean;
  selected: WorkKind | null;
  onSelect: (work: WorkKind | null) => void;
}) {
  const max = Math.max(...WORK_KINDS.map((id) => byWork[id].gainPerMonth), 1);

  return (
    <section className="rounded-box border border-base-300 bg-base-100 px-4 py-4 shadow-[var(--shadow-raise)]">
      <h2 className="text-sm font-semibold">
        {t(gainKnown ? "Kazanç hangi işte?" : "İş türüne göre sayfalar")}
      </h2>
      <div role="group" aria-label={t("İş türleri")} className="mt-3 space-y-1">
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
              className={`grid w-full grid-cols-1 items-center gap-x-4 gap-y-1 rounded-field px-3 py-2 text-left transition-colors enabled:hover:bg-base-200/60 disabled:cursor-default sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_10rem] ${
                pressed ? "bg-base-200" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {t(copy.label)}
                </span>
                <span className="block text-xs text-muted">
                  {empty
                    ? t("Aday sayfa yok")
                    : gainKnown
                      ? t(copy.action)
                      : t("Sayfayı inceleyin")}
                </span>
              </span>
              {gainKnown && entry.gain > 0 ? (
                <span
                  aria-hidden
                  className="h-2.5 min-w-0 rounded-full bg-base-200"
                >
                  <span
                    className="block h-full origin-left rounded-full transition-transform duration-200 ease-out motion-reduce:transition-none"
                    style={{
                      transform: `scaleX(${entry.gainPerMonth / max})`,
                      backgroundColor: workColor(id),
                    }}
                  />
                </span>
              ) : (
                <span />
              )}
              <span className="tabular-nums sm:text-right">
                {!gainKnown || entry.pages === 0 ? null : entry.gain === 0 ? (
                  <span className="block text-sm text-muted">
                    {t("Kazanç bilinmiyor")}
                  </span>
                ) : (
                  <span className="block text-sm">
                    <span className="font-semibold">
                      <AnimatedNumber
                        value={entry.gainPerMonth}
                        format={plusCount}
                      />
                    </span>{" "}
                    <span className="text-xs text-muted">
                      {t("tıklama/ay")}
                    </span>
                  </span>
                )}
                <span className="block text-xs text-muted">
                  {t("{count} sayfa", { count: formatCount(entry.pages) })}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
