import { t } from "@/shared/i18n";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type { TodoItem } from "@/shared/searchInsights";
import type { CompareMode } from "@/client/features/search-performance/searchTabs";
import {
  combinedGain,
  describeTodo,
  type TodoTarget,
} from "@/shared/searchTodoCopy";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import { FIRST_TODOS } from "@/client/features/search-performance/TodoTab";
import { searchSampleNote } from "./searchSample";

/**
 * The clicks sentence: how clicks moved against the chosen comparison, or
 * the plain totals when there is none to make.
 */
function clicksSentence(
  view: SearchPerformanceView,
  compare: CompareMode,
): string {
  const { totals, window } = view;
  const change =
    compare === "previous"
      ? totals.vsPrevious?.clicks
      : compare === "yoy"
        ? totals.vsYoy?.clicks
        : null;
  const days = window.days;
  if (!change || change.relative === null || searchSampleNote(view, compare)) {
    return t("Son {days} günde {clicks} tıklama, {impressions} gösterim.", {
      days: formatCount(days),
      clicks: formatCount(totals.current.clicks),
      impressions: formatCount(totals.current.impressions),
    });
  }
  const share = formatPercent(Math.abs(change.relative));
  const flat =
    formatDecimal(Math.abs(change.relative) * 100) === formatDecimal(0);
  if (compare === "yoy") {
    return flat
      ? t("Son {days} günde tıklamalar geçen yılın aynı günleriyle aynı.", {
          days,
        })
      : change.relative > 0
        ? t("Son {days} günde tıklamalar geçen yıla göre {share} arttı.", {
            days,
            share,
          })
        : t("Son {days} günde tıklamalar geçen yıla göre {share} azaldı.", {
            days,
            share,
          });
  }
  return flat
    ? t("Son {days} günde tıklamalar önceki dönemle aynı.", { days })
    : change.relative > 0
      ? t("Son {days} günde tıklamalar önceki döneme göre {share} arttı.", {
          days,
          share,
        })
      : t("Son {days} günde tıklamalar önceki döneme göre {share} azaldı.", {
          days,
          share,
        });
}

/**
 * The second fact worth a sentence: CTR when it moved a tenth of a point or
 * more, otherwise the average position when it moved, otherwise nothing.
 */
function secondSentence(
  view: SearchPerformanceView,
  compare: CompareMode,
): string | null {
  const changes =
    compare === "previous"
      ? view.totals.vsPrevious
      : compare === "yoy"
        ? view.totals.vsYoy
        : null;
  if (!changes || view.totals.current.impressions === 0) return null;
  const ctr = changes.ctr.change;
  // Moved by what the tile shows (a tenth of a point after rounding).
  if (ctr !== null && formatDecimal(Math.abs(ctr) * 100) !== formatDecimal(0)) {
    const points = formatDecimal(Math.abs(ctr) * 100);
    return ctr > 0
      ? t("Tıklama oranı {points} puan arttı.", { points })
      : t("Tıklama oranı {points} puan düştü.", { points });
  }
  const position = changes.position.change;
  if (
    position !== null &&
    formatDecimal(Math.abs(position)) !== formatDecimal(0)
  ) {
    const places = formatDecimal(Math.abs(position));
    return position > 0
      ? t("Ortalama sıra {places} basamak yükseldi.", { places })
      : t("Ortalama sıra {places} basamak geriledi.", { places });
  }
  return null;
}

/**
 * The five-second answer above the tiles: what happened, and what the first
 * few to-dos are worth, with the way to them.
 */
export function SearchVerdict({
  view,
  compare,
  open,
  onShowTodo,
}: {
  view: SearchPerformanceView;
  compare: CompareMode;
  /** The to-dos not marked done, ranked. */
  open: TodoItem[];
  onShowTodo: () => void;
}) {
  const first = open.slice(0, FIRST_TODOS);
  const gain = combinedGain(first);
  const second =
    searchSampleNote(view, compare) ?? secondSentence(view, compare);
  return (
    <div className="max-w-prose space-y-4">
      <h2 className="text-lg font-semibold leading-snug text-base-content">
        {clicksSentence(view, compare)}
      </h2>
      {second ? (
        <p className="text-sm leading-relaxed text-muted">{second}</p>
      ) : null}
      {first.length > 0 ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">
            {gain === null
              ? t("Önce yapılacak {count} iş hazır.", { count: first.length })
              : t(
                  "Önce yapılacak {count} iş birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).",
                  {
                    count: first.length,
                    clicks: formatCount(Math.round(gain)),
                  },
                )}
          </span>{" "}
          <button
            type="button"
            className="btn btn-sm gap-2 max-sm:min-h-11"
            onClick={onShowTodo}
          >
            {t("Yapılacaklar")}
            <ArrowRight className="size-3.5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The first few to-dos as one compact strip between the chart and the tabs,
 * so the work is above the fold without opening a tab.
 */
export function TopTasks({
  open,
  onTarget,
  onShowTodo,
}: {
  open: TodoItem[];
  onTarget: (target: Exclude<TodoTarget, null | { kind: "brand" }>) => void;
  onShowTodo: () => void;
}) {
  const first = open.slice(0, FIRST_TODOS);
  if (first.length === 0) return null;
  return (
    <section
      aria-labelledby="sp-top-tasks"
      className="rounded-box border border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-raise)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--hairline)] px-4 py-2">
        <h2 id="sp-top-tasks" className="text-sm font-medium">
          {t("Önce bunlar")}
        </h2>
        <button
          type="button"
          className="btn btn-ghost btn-sm gap-1 max-sm:min-h-11"
          onClick={onShowTodo}
        >
          {t("Tüm yapılacaklar ({count})", { count: open.length })}
          <ChevronRight className="size-3.5" aria-hidden />
        </button>
      </div>
      <ol className="grid divide-y divide-[var(--hairline)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {first.map((item, index) => {
          const copy = describeTodo(item);
          const target = copy.target;
          const gain =
            item.estimatedClicks !== null && item.estimatedClicks > 0
              ? item.estimatedClicks
              : null;
          const body = (
            <>
              <span
                aria-hidden
                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-content"
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium [overflow-wrap:anywhere]">
                  {copy.title}
                </span>
                {gain !== null ? (
                  <span className="mt-0.5 block text-xs font-medium tabular-nums text-[var(--ink-success)]">
                    {t("en fazla +{count} tıklama", {
                      count: Math.round(gain),
                    })}
                  </span>
                ) : null}
              </span>
            </>
          );
          return (
            <li key={item.id} className="min-w-0">
              <button
                type="button"
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-base-200/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                onClick={() =>
                  target && target.kind !== "brand"
                    ? onTarget(target)
                    : onShowTodo()
                }
              >
                {body}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
