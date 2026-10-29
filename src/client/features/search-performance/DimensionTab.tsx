import { t } from "@/shared/i18n";
import { FactStrip } from "@/client/components/FactStrip";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { BookmarkPlus, Copy, ExternalLink, Search } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Skeleton } from "@/client/components/Skeleton";
import { RowActions } from "@/client/components/table/RowActions";
import { TablePagination } from "@/client/components/table/TablePagination";
import { getSafeExternalUrl } from "@/client/components/table/url";
import { copyText } from "@/client/lib/copyText";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type { SearchPerformanceViewFilters } from "@/client/features/dashboard/dashboardGscReport";
import {
  tableQueryOptions,
  type TableSort,
} from "@/client/features/search-performance/searchPerformanceQueries";
import {
  ariaSort,
  CHIPS,
  ClickChange,
  COLUMNS,
  QuickChips,
  SortButton,
} from "@/client/features/search-performance/DimensionTableParts";
import { useDebouncedUrlSearch } from "@/client/features/search-performance/useDebouncedUrlSearch";
import { type QuickFilterId } from "@/client/features/search-performance/quickFilters";
import { positionMove, shortPage } from "@/shared/searchTodoCopy";
import {
  SEARCH_PERFORMANCE_PAGE_SIZES,
  type SearchPerformanceTableDimension,
} from "@/types/schemas/search-performance";

type PageSize = (typeof SEARCH_PERFORMANCE_PAGE_SIZES)[number];

/**
 * The queries or pages table, over every row read from Google for the
 * window: search, chips, sort and paging all run on the server, so "highest
 * impressions" really is the highest of the whole set, not of one page.
 */
export function DimensionTab({
  projectId,
  view,
  filters,
  dimension,
  search,
  quickFilter,
  onSearchChange,
  onQuickFilterChange,
  onOpen,
  onSaveKeyword,
}: {
  projectId: string;
  view: SearchPerformanceView;
  filters: SearchPerformanceViewFilters;
  dimension: SearchPerformanceTableDimension;
  search: string;
  quickFilter: QuickFilterId | undefined;
  onSearchChange: (next: string) => void;
  onQuickFilterChange: (next: QuickFilterId | undefined) => void;
  onOpen: (key: string) => void;
  onSaveKeyword: (keyword: string) => void;
}) {
  const [sort, setSort] = React.useState<TableSort | undefined>();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState<PageSize>(
    SEARCH_PERFORMANCE_PAGE_SIZES[0],
  );
  const [draft, setDraft] = useDebouncedUrlSearch(search, onSearchChange);
  const chips = CHIPS[dimension];
  const activeChip = chips.some((c) => c.id === quickFilter)
    ? quickFilter
    : undefined;

  // A new result set starts on its first page.
  const filtersKey = JSON.stringify(filters);
  React.useEffect(() => {
    setPage(1);
  }, [search, activeChip, sort, dimension, filtersKey]);

  const span = {
    startDate: view.window.startDate,
    endDate: view.window.endDate,
  };
  const table = useQuery({
    ...tableQueryOptions(projectId, filters, span, {
      dimension,
      search,
      quickFilter: activeChip,
      sort,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    }),
    // Keep the old rows while a page, sort or filter loads; never show
    // query rows under the pages heading or another project's rows.
    placeholderData: (previous, previousQuery) =>
      previousQuery?.queryKey[1] === projectId &&
      previousQuery.queryKey[2] === dimension
        ? previous
        : undefined,
  });

  const keyLabel = dimension === "query" ? t("Sorgu") : t("Sayfa");
  const site = view.totals.current;
  const data = table.data?.connected ? table.data : null;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 border-b border-[var(--hairline)] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="input input-sm flex w-full items-center gap-2 sm:max-w-xs">
            <Search className="size-3.5 text-subtle" aria-hidden />
            <input
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={t("{column} içinde ara", { column: keyLabel })}
              aria-label={t("{column} içinde ara", { column: keyLabel })}
              className="grow"
            />
          </label>
          {data && (search || activeChip) ? (
            <span className="text-xs text-muted tabular-nums">
              {t("{shown} / {total} satır", {
                shown: formatCount(data.total),
                total: formatCount(data.fetched),
              })}
            </span>
          ) : null}
        </div>
        <QuickChips
          dimension={dimension}
          active={activeChip}
          onChange={onQuickFilterChange}
        />
      </div>

      {table.isPending ? (
        <Skeleton variant="table" rows={10} className="p-4" />
      ) : table.isError ? (
        <div className="p-4">
          <QueryErrorState
            compact
            error={table.error}
            onRetry={() => void table.refetch()}
            title={t("Tablo yüklenemedi")}
          />
        </div>
      ) : !data ? null : data.rows.length === 0 ? (
        <EmptyState
          compact
          icon={Search}
          title={
            search
              ? t("Aramanıza uyan satır yok")
              : activeChip
                ? t("Bu hızlı filtreye uyan satır yok")
                : t("Bu dönem için satır yok")
          }
          description={
            search
              ? t(
                  '"{search}" hiçbir satırda geçmiyor. Aramayı temizleyin ya da başka bir terim deneyin.',
                  { search },
                )
              : activeChip
                ? t("Hızlı filtreyi kaldırarak tüm satırlara dönün.")
                : t(
                    "Search Console bu dönem ve filtreler için satır vermedi. Dönemi genişletmeyi ya da filtreleri kaldırmayı deneyin.",
                  )
          }
          action={
            search || activeChip ? (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  setDraft("");
                  onSearchChange("");
                  onQuickFilterChange(undefined);
                }}
              >
                {t("Filtreleri kaldır")}
              </button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div
            className={`overflow-x-auto transition-opacity ${
              table.isPlaceholderData ? "opacity-60" : ""
            }`}
            aria-busy={table.isPlaceholderData}
          >
            <table className="table table-sm">
              <caption className="sr-only">
                {t("Arama performansı: {column}", { column: keyLabel })}
              </caption>
              <thead>
                <tr className="text-muted">
                  <th scope="col" className="w-full">
                    {keyLabel}
                  </th>
                  {COLUMNS.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      aria-sort={ariaSort(column.id, sort)}
                      className={`whitespace-nowrap text-right ${column.className ?? ""}`}
                    >
                      <SortButton
                        column={column.id}
                        label={t(column.label)}
                        sort={sort}
                        onSort={setSort}
                      />
                    </th>
                  ))}
                  <th scope="col">
                    <span className="sr-only">{t("İşlemler")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => {
                  const share =
                    data.base.clicks > 0 ? row.clicks / data.base.clicks : 0;
                  const isUrl = /^https?:\/\//.test(row.key);
                  const move = positionMove(row.previousPosition, row.position);
                  return (
                    <tr key={row.key} className="hover:bg-base-200/50">
                      <td className="max-w-0">
                        <button
                          type="button"
                          className="block w-full truncate text-left hover:underline focus-visible:outline-2 focus-visible:outline-primary"
                          title={row.key}
                          onClick={() => onOpen(row.key)}
                        >
                          {isUrl ? shortPage(row.key) : row.key}
                        </button>
                        <span
                          aria-hidden
                          className="mt-1 block h-1 rounded-full bg-[var(--data-clicks)]"
                          style={{
                            width: `${Math.max(share * 100, row.clicks > 0 ? 1 : 0)}%`,
                          }}
                        />
                      </td>
                      <td className="text-right tabular-nums">
                        {formatCount(row.clicks)}
                      </td>
                      <td className="whitespace-nowrap text-right tabular-nums">
                        <ClickChange value={row.clickChange} />
                      </td>
                      <td className="hidden text-right tabular-nums md:table-cell">
                        {formatCount(row.impressions)}
                      </td>
                      <td className="hidden text-right tabular-nums lg:table-cell">
                        {row.impressions > 0
                          ? formatPercent(row.clicks / row.impressions)
                          : "–"}
                      </td>
                      <td className="whitespace-nowrap text-right tabular-nums">
                        {formatDecimal(row.position)}
                        {move ? (
                          <span className="block text-[11px] text-subtle">
                            {move}
                          </span>
                        ) : null}
                      </td>
                      <td className="text-right">
                        <RowActions
                          label={t("{value} için işlemler", { value: row.key })}
                          actions={[
                            ...(isUrl
                              ? [
                                  {
                                    label: t("Sayfayı yeni sekmede aç"),
                                    icon: ExternalLink,
                                    onSelect: () => {
                                      const safe = getSafeExternalUrl(row.key);
                                      if (safe)
                                        window.open(safe, "_blank", "noopener");
                                    },
                                  },
                                ]
                              : []),
                            {
                              label: isUrl
                                ? t("Adresi kopyala")
                                : t("Kelimeyi kopyala"),
                              icon: Copy,
                              onSelect: () =>
                                void copyText(
                                  row.key,
                                  isUrl
                                    ? t("Adres kopyalandı")
                                    : t("Kelime kopyalandı"),
                                ),
                            },
                            ...(!isUrl
                              ? [
                                  {
                                    label: t("Kelime olarak kaydet"),
                                    icon: BookmarkPlus,
                                    onSelect: () => onSaveKeyword(row.key),
                                  },
                                ]
                              : []),
                          ]}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <TablePagination
            page={page}
            pageSize={pageSize}
            pageSizes={SEARCH_PERFORMANCE_PAGE_SIZES}
            totalCount={data.total}
            hasNextPage={page * pageSize < data.total}
            isLoading={table.isFetching}
            onPageChange={setPage}
            onPageSizeChange={(next) => {
              setPageSize(next);
              setPage(1);
            }}
          />
          <TableProvenance dimension={dimension} data={data} site={site} />
        </>
      )}
    </div>
  );
}

function TableProvenance({
  dimension,
  data,
  site,
}: {
  dimension: SearchPerformanceTableDimension;
  data: {
    fetched: number;
    base: { clicks: number };
    googleTruncated: boolean;
    previousTruncated: boolean;
  };
  site: { clicks: number };
}) {
  return (
    <FactStrip
      label={t("Verinin durumu")}
      facts={[
        {
          label: dimension === "query" ? t("Sorgular") : t("Sayfalar"),
          value: formatCount(data.fetched),
        },
        { label: t("Tıklama"), value: formatCount(data.base.clicks) },
        {
          label: t("Site"),
          value: formatCount(site.clicks),
          hint: t("Tıklama"),
        },
      ]}
      detailsLabel={t("Veri hakkında")}
      details={
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          {dimension === "query"
            ? t(
                "Taban: okunan {rows} sorgu, {clicks} tıklama. Sitenin toplamı {site} tıklama; aradaki fark Google'ın gizlediği sorgulardan.",
                {
                  rows: formatCount(data.fetched),
                  clicks: formatCount(data.base.clicks),
                  site: formatCount(site.clicks),
                },
              )
            : t(
                "Taban: okunan {rows} sayfa, {clicks} tıklama. Google sayfa satırlarını sayfa bazında topladığı için site toplamından ({site}) biraz farklı olabilir.",
                {
                  rows: formatCount(data.fetched),
                  clicks: formatCount(data.base.clicks),
                  site: formatCount(site.clicks),
                },
              )}{" "}
          {t("Çubuk, satırın bu tablodaki tıklama payı.")}
          {data.googleTruncated
            ? ` ${t("Google'ın satır sınırına ulaşıldı; en az tıklanan uç listede yok.")}`
            : ""}
          {data.previousTruncated
            ? ` ${t("Önceki dönem tablosu da kesildi; değişimi bilinmeyen satırlarda – yazar.")}`
            : ""}
        </p>
      }
    />
  );
}
