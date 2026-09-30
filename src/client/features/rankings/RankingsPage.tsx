import { QueryHistoryCard } from "@/client/features/rankings/QueryHistoryCard";
import { TablePagination } from "@/client/components/table/TablePagination";
import { formatDate, formatNumber } from "@/client/lib/format";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { describeWindow } from "@/shared/dataFreshness";
import { useLocalSort } from "@/client/components/table/useLocalSort";
import {
  ArrowDown,
  ArrowUp,
  CircleSlash,
  Eye,
  LogOut,
  Trophy,
} from "lucide-react";
import { TrackedQueriesTable } from "@/client/features/rankings/TrackedQueriesTable";
import { FilterChips } from "@/client/features/search-performance/FilterChips";
import { PositionBandBars } from "@/client/features/rankings/PositionBandBars";
import {
  applyBandAndChip,
  countChips,
  HIGH_IMPRESSIONS,
  type BandId,
  type ChipId,
} from "@/client/features/rankings/positionBands";
import { MoversCard } from "@/client/features/rankings/MoversCard";
import {
  applyMove,
  countMoves,
  type MoveId,
} from "@/client/features/rankings/rankingMoves";
import { ArchiveStatus } from "@/client/features/rankings/ArchiveStatus";
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
  // Both narrow the table from the summary above it; neither is in the URL,
  // because they describe a look at one fetch, not a shareable view.
  const [band, setBand] = useState<BandId | undefined>(undefined);
  const [chip, setChip] = useState<ChipId | undefined>(undefined);
  const [move, setMove] = useState<MoveId | undefined>(undefined);
  const historyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    const node = historyRef.current;
    if (!node) return;
    // `block: "nearest"` so a card already in view does not jump.
    node.scrollIntoView({ block: "nearest", behavior: "smooth" });
    node.focus({ preventScroll: true });
  }, [selected]);

  const fetched = tracked.data?.rows ?? [];
  const needle = search.trim().toLocaleLowerCase("tr");
  // Chip counts describe the band that is open, so pressing "İlk sayfada"
  // inside the 21+ bar honestly reads zero instead of a number the table
  // could never show.
  const inBand = applyBandAndChip(fetched, band, undefined);
  const chipCounts = countChips(inBand);
  const moveCounts = countMoves(inBand);
  const filtered = applyMove(applyBandAndChip(fetched, band, chip), move);
  const allRows = sorting.apply(
    needle
      ? filtered.filter((row) =>
          row.query.toLocaleLowerCase("tr").includes(needle),
        )
      : filtered,
    compareTracked,
  );
  const narrowed =
    band !== undefined || chip !== undefined || move !== undefined;
  const hasChange = fetched.some((row) => row.delta !== null);
  const archiveEmpty = sync.data?.rowCount === 0;
  const searching = search.trim() !== "";
  const emptyTitle = archiveEmpty
    ? "Arşiv henüz boş"
    : searching
      ? "Aramanıza uyan sorgu yok"
      : narrowed
        ? "Bu filtreye uyan sorgu yok"
        : "Bu aralıkta kayıtlı sorgu yok";
  const emptyDescription = archiveEmpty
    ? "Arşivin durumu yukarıda yazıyor; Search Console veri döndürmeye başlayınca burada birikir."
    : searching
      ? "Arama kutusunu temizleyin ya da başka bir sorgu deneyin."
      : narrowed
        ? "Sıra dağılımındaki çubuğu ya da hızlı filtreyi kaldırın."
        : "Daha geniş bir dönem seçmeyi deneyin.";
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
        description="Sorgularınızın Google'daki ortalama sırası. Arşiv bu bilgisayarda saklandığı için Google'ın 16 aylık sınırından daha eskiye de bakabilirsiniz."
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

      {tracked.data && fetched.length > 0 ? (
        hasChange ? (
          <MoversCard rows={fetched} onPick={setSelected} />
        ) : (
          <p className="rounded-box border border-base-300 bg-base-100 px-4 py-3 text-sm text-muted">
            Değişim gösterilemiyor: arşivde önceki dönem (
            {formatDate(tracked.data.previousRange.startDate)} –{" "}
            {formatDate(tracked.data.previousRange.endDate)}) için bu sorgulara
            ait kayıt yok. Karşılaştırma, aynı uzunluktaki iki dönemde de verisi
            olan sorgular için yapılır; daha kısa bir aralık seçin ya da arşiv
            birikmeye devam etsin.
          </p>
        )
      ) : null}

      <PositionBandBars
        rows={fetched}
        active={band}
        onChange={(next) => {
          setBand(next);
          setPage(1);
        }}
      />

      <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
        <div className="flex flex-col gap-3 border-b border-base-300 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
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
          {fetched.length > 0 ? (
            <div className="flex flex-col gap-2">
              <FilterChips<MoveId>
                label="Değişim filtreleri"
                active={move}
                onChange={(next) => {
                  setMove(next);
                  setPage(1);
                }}
                chips={[
                  {
                    id: "risers",
                    label: "Yükselenler",
                    icon: ArrowUp,
                    count: moveCounts.risers,
                    hint: "Önceki döneme göre en az yarım sıra yükselen sorgular.",
                  },
                  {
                    id: "fallers",
                    label: "Düşenler",
                    icon: ArrowDown,
                    count: moveCounts.fallers,
                    hint: "Önceki döneme göre en az yarım sıra düşen sorgular.",
                  },
                  {
                    id: "top10",
                    label: "İlk 10'da kalanlar",
                    icon: Trophy,
                    count: moveCounts.top10,
                    hint: "Şimdi ortalama 10 veya daha iyi sırada olan ve önceki dönemde de verisi olan sorgular. Üstteki çubuk ise şu anki tüm sorguları sayar.",
                  },
                  {
                    id: "lost",
                    label: "Sıralama kaybedenler",
                    icon: LogOut,
                    count: moveCounts.lost,
                    hint: "Önceki dönemde ilk 10'da olup şimdi ilk 10'un dışına çıkan sorgular.",
                  },
                ]}
              />
              <FilterChips<ChipId>
                label="Hızlı filtreler"
                active={chip}
                onChange={(next) => {
                  setChip(next);
                  setPage(1);
                }}
                chips={[
                  {
                    id: "highImpressions",
                    label: "Gösterimi yüksek",
                    icon: Eye,
                    count: chipCounts.highImpressions,
                    hint: `${formatNumber(HIGH_IMPRESSIONS)} veya daha fazla gösterim alan sorgular.`,
                  },
                  {
                    id: "noClicks",
                    label: "Hiç tıklanmayan",
                    icon: CircleSlash,
                    count: chipCounts.noClicks,
                    hint: "Gösterilmiş ama hiç tıklanmamış sorgular.",
                  },
                ]}
              />
            </div>
          ) : null}
        </div>
        <TrackedQueriesTable
          projectId={projectId}
          rows={rows}
          sorting={sorting}
          tracked={tracked}
          selected={selected}
          onSelect={setSelected}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
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
            {formatNumber(fetched.length)} tanesiyle sınırlı. Aralığı daraltarak
            farklı sorguları görebilirsiniz.
          </p>
        ) : null}
      </div>

      {selected ? (
        /*
         * Scrolled to, and focused. The card renders after the table and
         * after the pagination row, so tapping row 3 of 25 on a phone put
         * it roughly a screen below the fold with no in-place feedback
         * beyond the row's tint -- the screen looked like it had ignored
         * the tap.
         */
        <QueryHistoryCard
          ref={historyRef}
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
