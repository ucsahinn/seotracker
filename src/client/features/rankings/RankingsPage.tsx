import { QueryHistoryCard } from "@/client/features/rankings/QueryHistoryCard";
import { TablePagination } from "@/client/components/table/TablePagination";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { formatDate, formatDecimal, formatNumber } from "@/client/lib/format";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { describeWindow } from "@/shared/dataFreshness";
import { TrendingUp } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { useLocalSort } from "@/client/components/table/useLocalSort";
import {
  compareTracked,
  type SortKey,
} from "@/client/features/rankings/rankingsSort";
import {
  getQueryHistory,
  getTrackedQueries,
  syncGscHistory,
} from "@/serverFunctions/gscHistory";

/** Rows per page, and the third value is also what one fetch asks for. */
const PAGE_SIZES = [25, 50, 100] as const;

/*
 * "Tümü" used to mean 480 days, which is Search Console's own 16-month
 * window -- so the one thing this archive is for, the months Google has
 * already dropped, was unreachable from the screen while an agent could read
 * them through `get_ranking_history`. 1825 matches that tool's cap.
 */
export const RANKING_WINDOWS = [
  { days: 30, label: "30 gün" },
  { days: 90, label: "90 gün" },
  { days: 180, label: "6 ay" },
  /*
   * 480 is where a *backfill* stops: Google retains sixteen months, so
   * `GscHistoryService.MAX_HISTORY_DAYS` cannot reach past it on a fresh
   * install. The option above is not a duplicate of it -- the local archive
   * keeps every day it has ever stored, so an install running longer than
   * sixteen months holds history Google will no longer serve. Labelled for
   * that, rather than as "5 yıl", which would promise a fresh install data
   * no backfill can fetch.
   */
  { days: 480, label: "16 ay" },
  { days: 1825, label: "Arşivin tamamı" },
] as const;

export function RankingsPage({
  projectId,
  days,
  onDaysChange,
}: {
  projectId: string;
  /** Held in the URL by the route, so a reload or a shared link keeps it. */
  days: number;
  onDaysChange: (days: number) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  // Catching the archive up is the page's first act: it fills any gap, and
  // even when caught up it re-reads the days Search Console is still
  // revising. Kept fresh for a minute so that costs one request per visit,
  // not one per window switch.
  const sync = useQuery({
    queryKey: ["gscHistorySync", projectId],
    queryFn: () => syncGscHistory({ data: { projectId } }),
    staleTime: 60_000,
    retry: false,
  });

  const tracked = useQuery({
    queryKey: ["trackedQueries", projectId, days],
    queryFn: () =>
      getTrackedQueries({ data: { projectId, days, limit: PAGE_SIZES[2] } }),
    enabled: sync.isSuccess || sync.isError,
  });

  const history = useQuery({
    queryKey: ["queryHistory", projectId, selected, days],
    queryFn: () =>
      getQueryHistory({ data: { projectId, query: selected ?? "", days } }),
    enabled: selected !== null,
  });

  /*
   * Sorting and a text filter, on the screen whose entire subject is average
   * position. It was a hand-rolled table with five static <th> and no sort
   * at all, so "which of my queries rank worst" -- the question the page
   * exists to answer -- could not be asked, and finding one query among a
   * hundred meant paging through four screens.
   *
   * Local state rather than `useAppTable`: the query cell is a disclosure
   * button and the pagination below is already wired, so this reuses
   * `SortableHeader` (and with it the aria-sort contract and the 24px
   * target fix) without moving the table onto a different engine.
   */
  const sorting = useLocalSort<SortKey>({ key: "impressions", desc: true });
  const [search, setSearch] = useState("");

  const fetched = tracked.data?.rows ?? [];
  const needle = search.trim().toLocaleLowerCase("tr");
  const allRows = sorting.apply(
    needle
      ? fetched.filter((row) =>
          row.query.toLocaleLowerCase("tr").includes(needle),
        )
      : fetched,
    compareTracked,
  );
  /*
   * Paginated in the browser over the whole fetched set. The screen used to
   * ask Google's archive for 25 rows and render them with no pagination and
   * nothing saying 25 was a cut, while every neighbouring list paginates
   * and names its total -- so an archive of four hundred queries looked
   * like an archive of twenty-five.
   */
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(allRows.length / pageSize));
  const current = Math.min(page, pageCount);
  const rows = allRows.slice((current - 1) * pageSize, current * pageSize);

  return (
    <PageShell>
      <PageHeader
        title="Sıralama takibi"
        description="Google'ın kendi ölçtüğü ortalama sıra. Arşiv yerelde tutulduğu için 16 aylık Google sınırının ötesine geçebilir."
        /* A pick-one filter, not tabs: it re-queries the one table below
           rather than swapping between panels, so there is no panel for
           `aria-controls` to point at. */
        actions={
          <div
            role="radiogroup"
            aria-label="Zaman aralığı"
            className="tabs tabs-border"
          >
            {RANKING_WINDOWS.map((option) => (
              <button
                key={option.days}
                type="button"
                role="radio"
                aria-checked={days === option.days}
                className={`tab ${days === option.days ? "tab-active" : ""}`}
                onClick={() => onDaysChange(option.days)}
              >
                {option.label}
              </button>
            ))}
          </div>
        }
      />

      <ArchiveStatus sync={sync} />

      {tracked.data ? (
        <p className="text-xs text-muted">
          {describeWindow(
            tracked.data.range.startDate,
            tracked.data.range.endDate,
            formatDate,
          )}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
        <div className="border-b border-base-300 px-4 py-3">
          <input
            type="search"
            className="input input-bordered input-sm w-full sm:max-w-xs"
            placeholder="Sorgu içinde ara"
            aria-label="Sorgu içinde ara"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th aria-sort={sorting.ariaSort("query")}>
                <SortableHeader
                  column={sorting.column("query", false)}
                  label="Sorgu"
                />
              </th>
              <th
                className="text-right"
                aria-sort={sorting.ariaSort("position")}
              >
                <SortableHeader
                  column={sorting.column("position", false)}
                  label="Ort. sıra"
                  align="right"
                />
              </th>
              <th
                className="text-right"
                aria-sort={sorting.ariaSort("impressions")}
              >
                <SortableHeader
                  column={sorting.column("impressions")}
                  label="Gösterim"
                  align="right"
                />
              </th>
              <th className="text-right" aria-sort={sorting.ariaSort("clicks")}>
                <SortableHeader
                  column={sorting.column("clicks")}
                  label="Tıklama"
                  align="right"
                />
              </th>
              <th className="text-right" aria-sort={sorting.ariaSort("days")}>
                <SortableHeader
                  column={sorting.column("days")}
                  label="Gün"
                  align="right"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* `tracked` is disabled until the sync settles, and a disabled
                query reports `isLoading: false` - so while the first archive
                sync ran (up to half a minute of paginated Search Console
                requests) this table stated there were no queries, directly
                under a header saying the archive was still updating. */}
            {rows.length === 0 && !tracked.isLoading && !tracked.isPending ? (
              <tr>
                <td colSpan={5} className="p-0">
                  <EmptyState
                    compact
                    icon={TrendingUp}
                    title={
                      sync.data?.rowCount === 0
                        ? "Arşiv henüz boş"
                        : search.trim()
                          ? "Aramanıza uyan sorgu yok"
                          : "Bu aralıkta kayıtlı sorgu yok"
                    }
                    description={
                      sync.data?.rowCount === 0
                        ? "Arşivin durumu yukarıda yazıyor; Search Console veri döndürmeye başlayınca burada birikir."
                        : search.trim()
                          ? "Arama kutusunu temizleyin ya da başka bir sorgu deneyin."
                          : "Daha geniş bir dönem seçmeyi deneyin."
                    }
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
                    {Array.from({ length: 4 }, (__, cell) => (
                      <td key={cell}>
                        <div className="skeleton ml-auto h-4 w-12" />
                      </td>
                    ))}
                  </tr>
                ))
              : null}
            {tracked.isError ? (
              <tr>
                <td colSpan={5}>
                  <QueryErrorState
                    compact
                    error={tracked.error}
                    onRetry={() => void tracked.refetch()}
                    title="Sorgular yüklenemedi"
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
                    className="w-full truncate px-4 py-2 text-left transition-colors hover:bg-base-200/50"
                    aria-expanded={selected === row.query}
                    onClick={() =>
                      setSelected(selected === row.query ? null : row.query)
                    }
                  >
                    {row.query}
                  </button>
                </td>
                <td className="text-right tabular-nums">
                  {formatDecimal(row.position)}
                </td>
                <td className="text-right tabular-nums">
                  {formatNumber(row.impressions)}
                </td>
                <td className="text-right tabular-nums">
                  {formatNumber(row.clicks)}
                </td>
                <td className="text-right tabular-nums text-muted">
                  {formatNumber(row.days)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allRows.length > PAGE_SIZES[0] ? (
          <TablePagination
            page={current}
            pageSize={pageSize}
            pageSizes={PAGE_SIZES}
            totalCount={allRows.length}
            hasNextPage={current < pageCount}
            isLoading={tracked.isFetching}
            onPageChange={setPage}
            onPageSizeChange={(next) => {
              setPageSize(next);
              setPage(1);
            }}
          />
        ) : null}
        {tracked.data?.truncated ? (
          <p className="border-t border-base-300 px-4 py-2 text-xs text-muted">
            Arşivde daha fazla sorgu var; bu liste en çok gösterim alan{" "}
            {formatNumber(allRows.length)} tanesiyle sınırlı. Aralığı daraltarak
            farklı sorguları görebilirsiniz.
          </p>
        ) : null}
      </div>

      {selected ? (
        <QueryHistoryCard
          query={selected}
          rows={history.data?.rows ?? []}
          loading={history.isLoading}
          error={history.isError ? history.error : null}
          onRetry={() => void history.refetch()}
        />
      ) : null}
    </PageShell>
  );
}

function ArchiveStatus({
  sync,
}: {
  sync: {
    isLoading: boolean;
    // `data.error` is a sync outcome the service reports; `isError` is the
    // call itself failing. The component used to be handed only the first.
    isError: boolean;
    error: unknown;
    refetch: () => unknown;
    data?: {
      earliestDate: string | null;
      lastDate: string | null;
      /** How far the sweep has looked, data or not. */
      scannedThrough: string | null;
      rowCount: number;
      newDays: number;
      hasMore: boolean;
      notConnected: boolean;
      error: string | null;
    };
  };
}) {
  if (sync.isLoading) {
    /*
     * A line of text where a line of text is coming. `ArchiveStatus` renders
     * one sentence, so a skeleton of the same shape is the honest
     * placeholder -- and unlike the spinner it does not claim motion the
     * archive sync may not have.
     */
    return <div className="skeleton h-4 w-72" aria-busy />;
  }

  // An unexpected server error used to render nothing at all, leaving the
  // table below with no explanation for why it was empty.
  if (sync.isError) {
    return (
      <QueryErrorState
        compact
        error={sync.error}
        onRetry={() => void sync.refetch()}
        title="Arşiv durumu okunamadı"
      />
    );
  }

  const data = sync.data;
  if (!data) return null;

  // Setup being unfinished is not a sync failure, so it gets a plain
  // instruction rather than a warning alert.
  if (data.notConnected) {
    return (
      <p className="text-sm text-muted">
        Sıralama arşivi Search Console verisinden doldurulur. Bağladığınızda
        geçmiş günler kendiliğinden birikmeye başlar.
      </p>
    );
  }

  if (data.error) {
    return (
      <div className="alert alert-warning text-sm">
        <AlertCircle className="size-4 shrink-0" />
        <span>Arşiv güncellenemedi: {data.error}</span>
      </div>
    );
  }

  if (data.rowCount === 0) {
    /*
     * The state that used to render nothing at all -- no span, no progress,
     * no reason -- directly above a table promising the archive was filling.
     * `scannedThrough` is how far the sweep has looked; without it there was
     * no way to tell "still working through the back catalogue" from
     * "Google has nothing for this property".
     */
    return (
      <p className="text-xs text-muted">
        Arşiv boş.{" "}
        {data.scannedThrough
          ? `${formatDate(data.scannedThrough)} tarihine kadar tarandı, veri bulunamadı.`
          : "Tarama henüz başlamadı."}
        {data.hasMore
          ? " Kalan günler sonraki açılışlarda taranacak."
          : " Search Console bu mülk için veri döndürmüyor; site yeni doğrulandıysa birkaç gün sürebilir."}
      </p>
    );
  }

  // Both ends are nullable. Interpolated raw they rendered as nothing, so a
  // half-populated archive read "Arşiv  –  arasını kapsıyor"; the range is
  // either there or the sentence does without it.
  const span =
    data.earliestDate && data.lastDate
      ? `${formatDate(data.earliestDate)} – ${formatDate(data.lastDate)} arasını kapsıyor, `
      : "";

  return (
    <p className="text-xs text-muted">
      Arşiv {span}
      {formatNumber(data.rowCount)} satır.
      {/* `newDays`, not the days written. A caught-up archive re-reads the
          three days Search Console is still revising on every open, and
          reporting that as days added claimed growth that never happened. */}
      {data.newDays > 0 ? ` Bu açılışta ${data.newDays} gün eklendi.` : ""}
      {/* The backfill walks oldest to newest, so what is left is the recent
          end, not the old one. */}
      {data.hasMore ? " Kalan günler sonraki açılışta tamamlanacak." : ""}
    </p>
  );
}
