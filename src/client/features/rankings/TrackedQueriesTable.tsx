import { Sparkline } from "@/client/components/Sparkline";
import { searchScopeUnavailableReason } from "@/client/features/search-performance/searchScope";
import { t } from "@/shared/i18n";
import { copyText } from "@/client/lib/copyText";
import { useNavigate } from "@tanstack/react-router";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Bookmark, Copy, Search, TrendingUp } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { RowActions } from "@/client/components/table/RowActions";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import type { useLocalSort } from "@/client/components/table/useLocalSort";
import type { SortKey } from "@/client/features/rankings/rankingsSort";
import { BAND_LABELS, bandOf } from "@/shared/positionBands";
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
  range,
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
  range?: { startDate: string; endDate: string };
}) {
  const navigate = useNavigate();
  const saveKeyword = useSaveTrackedKeyword(projectId);
  // A column of dashes on every row says one thing; the line above the table
  // says it once.
  const comparable = rows.some((row) => row.delta !== null);
  const columns = 5 + (comparable ? 1 : 0) + (showDays ? 1 : 0);
  const actionsFor = (query: string) => [
    {
      label: t("Kelimeyi kopyala"),
      icon: Copy,
      onSelect: () => void copyText(query, t("Kelime kopyalandı")),
    },
    {
      label: t("Kayıtlı kelimelere ekle"),
      icon: Bookmark,
      onSelect: () => saveKeyword.mutate(query),
    },
    {
      label: t("Arama performansında aç"),
      disabledReason: range
        ? searchScopeUnavailableReason(range.startDate)
        : t("Yükleniyor"),
      icon: Search,
      onSelect: () =>
        range &&
        void navigate({
          to: "/p/$projectId/search-performance",
          params: { projectId },
          search: {
            tab: "queries" as const,
            exactQuery: query,
            ...range,
          },
        }),
    },
  ];
  return (
    <>
      {rows.length > 0 && !comparable ? (
        <p className="border-b border-[var(--hairline)] px-4 py-2 text-xs text-muted">
          {t(
            "Değişim sütunu gizlendi: önceki dönemde bu sorguların hiçbiri için veri yok.",
          )}
        </p>
      ) : null}
      {/* Phones get stacked records: the query, then its numbers under
          labels. A table squeezed to 390px wrapped into three lines of
          undifferentiated 12px text. */}
      {rows.length > 0 ? (
        <ul className="divide-y divide-[var(--hairline)] sm:hidden">
          {rows.map((row) => (
            <li
              key={row.query}
              className={`flex items-start gap-1 pr-1 ${selected === row.query ? "bg-base-200/60" : ""}`}
            >
              <button
                type="button"
                className="min-w-0 flex-1 space-y-2 px-4 py-3 text-left"
                aria-controls="ranking-query-history"
                aria-expanded={selected === row.query}
                onClick={() =>
                  onSelect(selected === row.query ? null : row.query)
                }
              >
                <span className="block text-[15px] font-medium break-words">
                  {row.query}
                </span>
                <span className="grid grid-cols-3 gap-x-3 gap-y-2">
                  <Stat label={t("Ortalama sıra")}>
                    {formatDecimal(row.position)}
                    <span className="ml-1 text-xs text-muted">
                      {BAND_LABELS[bandOf(row.position)]}
                    </span>
                  </Stat>
                  <Stat label={t("Gösterim")}>
                    {formatNumber(row.impressions)}
                  </Stat>
                  <Stat label={t("Tıklama")}>{formatNumber(row.clicks)}</Stat>
                </span>
                <SecondaryLine
                  delta={comparable ? row.delta : undefined}
                  days={showDays ? row.days : undefined}
                  expectedDays={expectedDays}
                />
              </button>
              <span className="pt-2">
                <RowActions
                  label={t("{value} için işlemler", { value: row.query })}
                  actions={actionsFor(row.query)}
                />
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      <div
        className={`min-w-0 overflow-x-auto ${rows.length > 0 ? "max-sm:hidden" : ""}`}
        role="region"
        aria-label={t("Sorgular")}
        tabIndex={0}
      >
        <table className="table table-sm">
          <thead>
            <tr>
              <th aria-sort={sorting.ariaSort("query")}>
                <SortableHeader
                  column={sorting.column("query", false)}
                  label={t("Sorgu")}
                />
              </th>
              <th
                className="text-right"
                aria-sort={sorting.ariaSort("position")}
              >
                <SortableHeader
                  column={sorting.column("position", false)}
                  label={t("Ortalama sıra")}
                  helpText={t(
                    "Dönem ortalaması ve grubu (1-3, 4-10, 11-20, 21+). Yanındaki çizgi haftalık sırayı gösterir; çizginin yükselmesi sıranın iyileştiği demektir.",
                  )}
                  align="right"
                />
              </th>
              {comparable ? (
                <th
                  className="text-right"
                  aria-sort={sorting.ariaSort("delta")}
                >
                  <SortableHeader
                    column={sorting.column("delta")}
                    label={t("Değişim")}
                    helpText={t(
                      "Bir önceki, aynı uzunluktaki dönemle karşılaştırılır. Sıra numarası küçüldüyse (12'den 8'e gibi) kelime yükselmiştir ve yeşil “Yükseldi” yazar. Büyüdüyse kırmızı “Düştü” yazar.",
                    )}
                    align="right"
                  />
                </th>
              ) : null}
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
                <td colSpan={columns} className="p-0">
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
                    {Array.from({ length: columns - 1 }, (__, cell) => (
                      <td key={cell}>
                        <div className="skeleton ml-auto h-4 w-12" />
                      </td>
                    ))}
                  </tr>
                ))
              : null}
            {tracked.isError ? (
              <tr>
                <td colSpan={columns}>
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
                className={
                  selected === row.query ? "bg-base-200/60" : undefined
                }
              >
                {/* A real button, not a click handler on the row. Opening a
                      query's history is the whole point of this screen, and
                      on a bare <tr> it was reachable with a mouse and nothing
                      else. A button also picks up the app's focus ring. */}
                <td className="max-w-md p-0">
                  <button
                    type="button"
                    className="min-h-10 w-full break-words px-4 py-2 text-left transition-colors hover:bg-base-200/50 focus-visible:-outline-offset-2"
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
                <td className="text-right tabular-nums">
                  {/* The week-by-week line, inverted: up means a better rank.
                    The band beside the number names what the number means,
                    where a colour alone used to. */}
                  <span className="inline-flex items-center justify-end gap-2">
                    {row.trend && row.trend.length > 1 ? (
                      <span className="w-16 text-muted [&_svg]:mt-0 [&_svg]:h-5">
                        <Sparkline values={row.trend} inverted />
                      </span>
                    ) : null}
                    <span>
                      {formatDecimal(row.position)}
                      <span className="ml-1.5 inline-block w-10 text-left text-xs text-muted">
                        {BAND_LABELS[bandOf(row.position)]}
                      </span>
                    </span>
                  </span>
                </td>
                {comparable ? (
                  <td className="text-right tabular-nums">
                    <PositionChange delta={row.delta} />
                  </td>
                ) : null}
                <td className="text-right tabular-nums">
                  {formatNumber(row.impressions)}
                </td>
                <td className="text-right tabular-nums">
                  {formatNumber(row.clicks)}
                </td>
                {showDays ? (
                  <td className="text-right tabular-nums text-muted">
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
                    actions={actionsFor(row.query)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="min-w-0">
      <span className="block truncate text-xs text-muted">{label}</span>
      <span className="block text-sm tabular-nums">{children}</span>
    </span>
  );
}

/**
 * Change and coverage are secondary on a phone: one muted line under the
 * three numbers, not two more labelled cells that pushed every query to
 * three lines.
 */
function SecondaryLine({
  delta,
  days,
  expectedDays,
}: {
  /** `undefined` when the period has no comparison at all. */
  delta: number | null | undefined;
  days: number | undefined;
  expectedDays?: number;
}) {
  if (delta === undefined && days === undefined) return null;
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
      {delta !== undefined ? (
        <span className="inline-flex items-center gap-1">
          <span>{t("Değişim")}</span>
          <PositionChange delta={delta} />
        </span>
      ) : null}
      {days !== undefined ? (
        <span className="tabular-nums">
          {t("Gözlenen gün")}: {formatNumber(days)}
          {expectedDays ? ` / ${formatNumber(expectedDays)}` : ""}
        </span>
      ) : null}
    </span>
  );
}
