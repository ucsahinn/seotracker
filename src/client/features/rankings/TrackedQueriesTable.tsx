import { Sparkline } from "@/client/components/Sparkline";
import { t } from "@/shared/i18n";
import { copyText } from "@/client/lib/copyText";
import { useNavigate } from "@tanstack/react-router";
import type { UseQueryResult } from "@tanstack/react-query";
import { Bookmark, Copy, Search, TrendingUp } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { RowActions } from "@/client/components/table/RowActions";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import type { useLocalSort } from "@/client/components/table/useLocalSort";
import type { SortKey } from "@/client/features/rankings/rankingsSort";
import { positionInk } from "@/client/features/rankings/positionBands";
import { useSaveTrackedKeyword } from "@/client/features/rankings/useSaveTrackedKeyword";
import { PositionChange } from "@/client/features/rankings/PositionChange";
import { formatDecimal, formatNumber } from "@/client/lib/format";

type Row = {
  query: string;
  position: number;
  impressions: number;
  clicks: number;
  days: number;
  previousPosition: number | null;
  delta: number | null;
  /** Weekly position across the window, oldest first; gaps are null. */
  trend?: (number | null)[];
};

/** The tracked-queries table: sortable header, states, and per-row actions. */
export function TrackedQueriesTable({
  projectId,
  rows,
  sorting,
  tracked,
  selected,
  onSelect,
  emptyTitle,
  emptyDescription,
  showDays = true,
  expectedDays,
}: {
  projectId: string;
  rows: Row[];
  sorting: ReturnType<typeof useLocalSort<SortKey>>;
  tracked: Pick<
    UseQueryResult,
    "isLoading" | "isPending" | "isError" | "error" | "refetch"
  >;
  selected: string | null;
  onSelect: (query: string | null) => void;
  emptyTitle: string;
  emptyDescription: string;
  /** Off when every row has data on every day: a column of one number says nothing. */
  showDays?: boolean;
  expectedDays?: number;
}) {
  const navigate = useNavigate();
  const saveKeyword = useSaveTrackedKeyword(projectId);
  return (
    <div
      className="min-w-0 overflow-x-auto"
      role="region"
      aria-label={t("Sorgular")}
      tabIndex={0}
    >
      <table className="table table-sm max-sm:[&_thead]:sr-only max-sm:[&_tr]:flex max-sm:[&_tr]:flex-wrap max-sm:[&_tr]:border-b max-sm:[&_td]:block max-sm:[&_td]:min-w-0 max-sm:[&_td]:whitespace-normal">
        <thead>
          <tr>
            <th aria-sort={sorting.ariaSort("query")}>
              <SortableHeader
                column={sorting.column("query", false)}
                label={t("Sorgu")}
              />
            </th>
            <th className="text-right" aria-sort={sorting.ariaSort("position")}>
              <SortableHeader
                column={sorting.column("position", false)}
                label={t("Ortalama sıra")}
                align="right"
              />
            </th>
            <th className="text-right" aria-sort={sorting.ariaSort("delta")}>
              <SortableHeader
                column={sorting.column("delta")}
                label={t("Değişim")}
                helpText={t(
                  "Bir önceki, aynı uzunluktaki dönemle karşılaştırılır. Sıra numarası küçüldüyse (12'den 8'e gibi) kelime yükselmiştir ve yeşil “Yükseldi” yazar. Büyüdüyse kırmızı “Düştü” yazar.",
                )}
                align="right"
              />
            </th>
            <th
              className="text-right"
              aria-sort={sorting.ariaSort("impressions")}
            >
              <SortableHeader
                column={sorting.column("impressions")}
                label={t("Gösterim")}
                align="right"
              />
            </th>
            <th className="text-right" aria-sort={sorting.ariaSort("clicks")}>
              <SortableHeader
                column={sorting.column("clicks")}
                label={t("Tıklama")}
                align="right"
              />
            </th>
            {showDays ? (
              <th className="text-right" aria-sort={sorting.ariaSort("days")}>
                <SortableHeader
                  column={sorting.column("days")}
                  label={t("Gözlenen gün")}
                  align="right"
                />
              </th>
            ) : null}
            <th />
          </tr>
        </thead>
        <tbody>
          {/* `tracked` is disabled until the sync settles, and a disabled
                query reports `isLoading: false` - so while the first archive
                sync ran (up to half a minute of paginated Search Console
                requests) this table stated there were no queries, directly
                under a header saying the archive was still updating. */}
          {rows.length === 0 &&
          !tracked.isLoading &&
          !tracked.isPending &&
          !tracked.isError ? (
            <tr>
              <td colSpan={showDays ? 7 : 6} className="p-0">
                <EmptyState
                  compact
                  icon={TrendingUp}
                  title={emptyTitle}
                  description={emptyDescription}
                />
              </td>
            </tr>
          ) : null}
          {/* Shaped like the rows that are coming, not a sentence in a
                merged cell: the house rule asks for a skeleton so the table
                does not change height when the archive lands. */}
          {tracked.isPending
            ? Array.from({ length: 6 }, (_, index) => (
                <tr key={`skeleton-${index}`} aria-hidden>
                  <td>
                    <div className="skeleton h-4 w-40" />
                  </td>
                  {Array.from({ length: 5 }, (__, cell) => (
                    <td key={cell}>
                      <div className="skeleton ml-auto h-4 w-12" />
                    </td>
                  ))}
                </tr>
              ))
            : null}
          {tracked.isError ? (
            <tr>
              <td colSpan={showDays ? 7 : 6}>
                <QueryErrorState
                  compact
                  error={tracked.error}
                  onRetry={() => void tracked.refetch()}
                  title={t("Sorgular yüklenemedi")}
                />
              </td>
            </tr>
          ) : null}
          {rows.map((row) => (
            <tr
              key={row.query}
              className={selected === row.query ? "bg-base-200/60" : undefined}
            >
              {/* A real button, not a click handler on the row. Opening a
                      query's history is the whole point of this screen, and
                      on a bare <tr> it was reachable with a mouse and nothing
                      else. A button also picks up the app's focus ring. */}
              <td className="max-w-md p-0 max-sm:w-full max-sm:max-w-none">
                <button
                  type="button"
                  className="min-h-11 w-full break-words px-4 py-2 text-left transition-colors hover:bg-base-200/50 focus-visible:-outline-offset-2"
                  aria-controls="ranking-query-history"
                  title={row.query}
                  aria-expanded={selected === row.query}
                  onClick={() =>
                    onSelect(selected === row.query ? null : row.query)
                  }
                >
                  {row.query}
                </button>
              </td>
              <td
                className={`text-right tabular-nums ${positionInk(row.position)}`}
              >
                {/* The week-by-week line, inverted: up means a better rank. */}
                <span className="inline-flex items-center justify-end gap-2">
                  {row.trend && row.trend.length > 1 ? (
                    <span className="hidden w-16 sm:block [&_svg]:mt-0 [&_svg]:h-5">
                      <Sparkline values={row.trend} inverted />
                    </span>
                  ) : null}
                  {formatDecimal(row.position)}
                </span>
              </td>
              <td className="text-right tabular-nums">
                <PositionChange delta={row.delta} />
              </td>
              <td className="text-right tabular-nums">
                <span className="sm:hidden">{t("Gösterim")}: </span>
                {formatNumber(row.impressions)}
              </td>
              <td className="text-right tabular-nums">
                <span className="sm:hidden">{t("Tıklama")}: </span>
                {formatNumber(row.clicks)}
              </td>
              {showDays ? (
                <td className="text-right tabular-nums text-muted">
                  <span className="sm:hidden">{t("Gözlenen gün")}: </span>
                  {formatNumber(row.days)}
                  {expectedDays ? ` / ${formatNumber(expectedDays)}` : ""}
                </td>
              ) : null}
              {/*
               * Row actions. An operator looking at a query that dropped
               * nine positions could not copy it, save it, or jump to its
               * Search Console rows -- the four cells beside the
               * disclosure button were inert.
               */}
              <td className="w-10 text-right">
                <RowActions
                  label={t("{value} için işlemler", { value: row.query })}
                  actions={[
                    {
                      label: t("Kelimeyi kopyala"),
                      icon: Copy,
                      onSelect: () =>
                        void copyText(row.query, t("Kelime kopyalandı")),
                    },
                    {
                      label: t("Kayıtlı kelimelere ekle"),
                      icon: Bookmark,
                      onSelect: () => saveKeyword.mutate(row.query),
                    },
                    {
                      label: t(
                        "Arama performansında metin ara (tarih ve birebir sorgu korunmaz)",
                      ),
                      icon: Search,
                      onSelect: () =>
                        void navigate({
                          to: "/p/$projectId/search-performance",
                          params: { projectId },
                          search: { tab: "queries" as const, q: row.query },
                        }),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
