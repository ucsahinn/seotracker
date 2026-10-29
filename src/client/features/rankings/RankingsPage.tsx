import { RankingsFilters } from "./RankingsFilters";
import { RankingSourceEvidence } from "./RankingSourceEvidence";
import { HelpTip } from "@/client/components/HelpTip";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "@/shared/i18n";
import { formatCount } from "@/client/lib/format";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { refreshState } from "@/client/lib/refreshState";
import { TablePagination } from "@/client/components/table/TablePagination";
import { useLocalSort } from "@/client/components/table/useLocalSort";
import type { BandId } from "@/shared/positionBands";
import type { ChipId } from "./positionBands";
import type { MoveId } from "./rankingMoves";
import type { SortKey } from "./rankingsSort";
import { QueryHistoryCard } from "./QueryHistoryCard";
import { TrackedQueriesTable } from "./TrackedQueriesTable";
import { PositionBandBars } from "./PositionBandBars";
import { MoversCard } from "./MoversCard";
import { ArchiveStatus } from "./ArchiveStatus";
import { archiveSyncInterval } from "./archiveSyncInterval";
import { EmptyArchivePanel, NotConnectedPanel } from "./EmptyArchivePanel";
import {
  getQueryHistory,
  getTrackedQueries,
  syncGscHistory,
} from "@/serverFunctions/gscHistory";

const PAGE_SIZES = [25, 50, 100] as const;
export const RANKING_WINDOWS = [
  { days: 30, label: "30 gün" },
  { days: 90, label: "90 gün" },
  { days: 180, label: "6 ay" },
  { days: 480, label: "16 ay" },
  { days: 1825, label: "Son 5 yıllık arşiv" },
] as const;

export function RankingsPage({
  projectId,
  days,
  onDaysChange,
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
  projectId: string;
  days: number;
  onDaysChange: (days: number) => void;
}) {
  const client = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [band, setBand] = useState<BandId>();
  const [chip, setChip] = useState<ChipId>();
  const [move, setMove] = useState<MoveId>();
  const [pageSize, setPageSize] = useState<number>(25);
  const [page, setPage] = useState(1);
  const sorting = useLocalSort<SortKey>({ key: "impressions", desc: true });
  const historyRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const sync = useQuery({
    queryKey: ["gscHistorySync", projectId],
    queryFn: async () => {
      const result = await syncGscHistory({ data: { projectId } });
      // Every entry point shares the same refresh contract, including partial writes.
      await Promise.all([
        client.invalidateQueries({ queryKey: ["trackedQueries", projectId] }),
        client.invalidateQueries({ queryKey: ["queryHistory", projectId] }),
      ]);
      return result;
    },
    staleTime: 15 * 60_000,
    retry: false,
    refetchInterval: (query) =>
      archiveSyncInterval(query.state.data, query.state.status === "error"),
  });
  const tracked = useQuery({
    queryKey: [
      "trackedQueries",
      projectId,
      days,
      startDate,
      endDate,
      search,
      band,
      chip,
      move,
      sorting.sort,
      page,
      pageSize,
    ],
    queryFn: () =>
      getTrackedQueries({
        data: {
          projectId,
          days,
          startDate,
          endDate,
          search,
          band,
          chip,
          move,
          sort: sorting.sort.key,
          desc: sorting.sort.desc,
          offset: (page - 1) * pageSize,
          limit: pageSize,
        },
      }),
  });
  const range = tracked.data?.range;
  const history = useQuery({
    queryKey: ["queryHistory", projectId, selected, days, range],
    queryFn: () =>
      getQueryHistory({
        data: { projectId, query: selected ?? "", days, ...range },
      }),
    enabled: selected !== null && range !== undefined,
  });
  useEffect(() => {
    if (!selected || !historyRef.current) return;
    historyRef.current.scrollIntoView({
      block: "nearest",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    historyRef.current.focus({ preventScroll: true });
  }, [selected]);
  useEffect(() => {
    setPage(1);
  }, [days, startDate, endDate, sorting.sort]);
  const pick = (query: string | null) => {
    if (query)
      returnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    setSelected(query);
    if (!query) {
      const target = returnFocus.current?.isConnected
        ? returnFocus.current
        : document.getElementById("rankings-query-search");
      target?.focus({ preventScroll: true });
    }
  };
  const reset = () => {
    setSearch("");
    setBand(undefined);
    setChip(undefined);
    setMove(undefined);
    setPage(1);
  };
  const data = tracked.data;
  const refresh = refreshState([sync, tracked]);
  const notConnected = sync.data?.notConnected === true;
  const archiveEmpty =
    sync.data?.rowCount === 0 && !sync.data.error && !sync.data.hasMore;
  return (
    <PageShell>
      <PageHeader
        title={t("Sıralama takibi")}
        description={
          <span className="inline-flex items-center gap-1.5">
            {t("Ortalama sıra")}
            <HelpTip label={t("Ortalama sıra")}>
              {t(
                "GSC Web · Ortalama sıra, sabit bir Google sırası değildir. Konum ve cihazla değişebilir.",
              )}
            </HelpTip>
          </span>
        }
        actions={
          <PageActions>
            <fieldset
              className="flex flex-wrap gap-2"
              aria-label={t("Zaman aralığı")}
            >
              {RANKING_WINDOWS.map((option) => (
                <label
                  key={option.days}
                  className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-field px-2 text-sm"
                >
                  <input
                    type="radio"
                    name="ranking-window"
                    className="radio radio-xs"
                    checked={!startDate && days === option.days}
                    onChange={() => {
                      setPage(1);
                      onDaysChange(option.days);
                    }}
                  />
                  {t(option.label)}
                </label>
              ))}
            </fieldset>
            <RefreshButton
              {...refresh}
              onRefresh={() => void sync.refetch()}
              shortcut
            />
          </PageActions>
        }
      />

      <RankingSourceEvidence
        data={data}
        notConnected={notConnected}
        pick={pick}
      />
      <ArchiveStatus sync={sync} projectId={projectId} />
      {sync.data?.hasMore ? (
        <button
          className="btn btn-outline min-h-11 self-start"
          disabled={sync.isFetching}
          onClick={() => void sync.refetch()}
        >
          {t("Arşivi doldurmaya devam et")}
        </button>
      ) : null}

      {notConnected ? (
        <NotConnectedPanel projectId={projectId} />
      ) : archiveEmpty ? (
        <EmptyArchivePanel projectId={projectId} />
      ) : (
        <>
          {data ? (
            <div
              className={`grid min-w-0 gap-4 ${data.comparableCount > 0 ? "xl:grid-cols-2" : ""}`}
            >
              <PositionBandBars
                rows={[]}
                counts={data.bands}
                changes={data.bandDeltas}
                comparableCount={data.comparableCount}
                active={band}
                onChange={(next) => {
                  setBand(next);
                  setPage(1);
                }}
              />
              <MoversCard
                rows={[...data.risers, ...data.fallers]}
                comparableCount={data.comparableCount}
                onPick={pick}
              />
            </div>
          ) : null}
          <section className="min-w-0 rounded-box border border-base-300 bg-base-100">
            <RankingsFilters
              data={data}
              search={search}
              band={band}
              chip={chip}
              move={move}
              setSearch={setSearch}
              setChip={setChip}
              setMove={setMove}
              setPage={setPage}
              reset={reset}
            />
            <TrackedQueriesTable
              range={range}
              projectId={projectId}
              rows={data?.rows ?? []}
              sorting={sorting}
              tracked={tracked}
              selected={selected}
              onSelect={pick}
              emptyTitle={t("Bu aralıkta kayıtlı sorgu yok")}
              emptyDescription={t(
                "Filtreleri kaldırın, dönemi genişletin veya arşivi doldurmaya devam edin.",
              )}
              showDays
              expectedDays={data?.days}
            />
            <TablePagination
              page={page}
              pageSize={pageSize}
              pageSizes={PAGE_SIZES}
              totalCount={data?.totalMatching ?? 0}
              hasNextPage={page * pageSize < (data?.totalMatching ?? 0)}
              isLoading={tracked.isFetching}
              onPageChange={setPage}
              onPageSizeChange={(next) => {
                setPageSize(next);
                setPage(1);
              }}
            />
          </section>
          {data && data.unobservedCount > 0 ? (
            <details className="text-sm text-muted">
              <summary className="min-h-11 cursor-pointer">
                {t("Gözlem yok")} · {formatCount(data.unobservedCount)}
              </summary>
              <p className="max-w-prose">
                {t(
                  "Bu dönemde gözlenmeyen: {count}. Bu, sıra kaybı anlamına gelmez.",
                  { count: formatCount(data.unobservedCount) },
                )}
              </p>
              <ul>
                {data.unobserved.map((query) => (
                  <li key={query}>
                    <button
                      className="link min-h-11 break-all text-left"
                      onClick={() => pick(query)}
                    >
                      {query}
                    </button>
                  </li>
                ))}
              </ul>
              <p>
                {t(
                  "En çok gösterim alan ilk {count} kayıt; arama kutusu bu listede de geçerlidir.",
                  { count: formatCount(25) },
                )}
              </p>
            </details>
          ) : null}
        </>
      )}
      {selected ? (
        <div
          id="ranking-query-history"
          ref={historyRef}
          tabIndex={-1}
          className="min-w-0 space-y-2"
        >
          <button className="btn btn-ghost min-h-11" onClick={() => pick(null)}>
            {t("Kapat")}
          </button>
          <QueryHistoryCard
            projectId={projectId}
            query={selected}
            rows={history.data?.rows ?? []}
            range={history.data?.range ?? range}
            comparison={history.data?.comparison}
            coverage={history.data?.coverage}
            loading={history.isPending}
            error={history.isError ? history.error : null}
            onRetry={() => void history.refetch()}
          />
        </div>
      ) : null}
    </PageShell>
  );
}
