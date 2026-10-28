import { t } from "@/shared/i18n";
import * as React from "react";
import { Download, Sheet } from "lucide-react";
import { toast } from "sonner";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { TabPanel } from "@/client/components/Tabs";
import { EmptyState } from "@/client/components/EmptyState";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { useSaveTrackedKeyword } from "@/client/features/rankings/useSaveTrackedKeyword";
import { useSearchView } from "./useSearchView";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { isDevice } from "@/client/features/search-performance/deviceShare";
import { exportSearchPerformanceTable } from "@/serverFunctions/searchPerformance";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";
import { SearchPerformanceLoadingState } from "@/client/features/search-performance/SearchPerformanceLoadingState";
import { SearchFilters } from "@/client/features/search-performance/SearchFilters";
import { DataTrustStrip } from "@/client/features/search-performance/DataTrustStrip";
import { KpiTiles } from "@/client/features/search-performance/KpiTiles";
import {
  SearchVerdict,
  TopTasks,
} from "@/client/features/search-performance/SearchVerdict";
import { useDoneTodos } from "@/client/features/search-performance/useDoneTodos";
import { SearchTrendPanel } from "@/client/features/search-performance/SearchTrendChart";
import { TodoTab } from "@/client/features/search-performance/TodoTab";
import { DimensionTab } from "@/client/features/search-performance/DimensionTab";
import { OpportunitiesTab } from "@/client/features/search-performance/OpportunitiesTab";
import { ChangesTab } from "@/client/features/search-performance/ChangesTab";
import { DistributionTab } from "@/client/features/search-performance/DistributionTab";
import { OverlapsTab } from "@/client/features/search-performance/CannibalizationSummary";
import {
  DrilldownPanel,
  type DrillTarget,
} from "@/client/features/search-performance/DrilldownPanel";
import { SearchReportButton } from "@/client/features/search-performance/SearchReportButton";
import { buildFilterInput } from "@/client/features/search-performance/searchPerformanceQueries";
import {
  dimensionExportTable,
  runExport,
  strikingExportTable,
  type ExportTarget,
} from "@/client/features/search-performance/searchExport";
import type { QuickFilterId } from "@/client/features/search-performance/quickFilters";
import type {
  CompareMode,
  Granularity,
  SearchTab,
} from "@/client/features/search-performance/searchTabs";
import type { TodoTarget } from "@/shared/searchTodoCopy";
import {
  TabStrip,
  useHistorySync,
} from "@/client/features/search-performance/SearchPageParts";

type ViewChange = {
  tab?: SearchTab;
  range?: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  type?: SearchPerformanceType;
  q?: string;
  f?: QuickFilterId;
  cmp?: CompareMode;
  g?: Granularity;
  exactQuery?: string;
  exactPage?: string;
};

export function SearchPerformancePage({
  projectId,
  tab,
  range,
  device,
  country,
  searchType,
  query,
  quickFilter,
  compare,
  granularity,
  window: pinnedWindow,
  exactTarget,
  onViewChange,
}: {
  projectId: string;
  tab: SearchTab;
  range: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
  query: string;
  quickFilter?: QuickFilterId;
  compare: CompareMode;
  granularity: Granularity;
  window?: { startDate: string; endDate: string };
  exactTarget?: DrillTarget;
  onViewChange: (next: ViewChange) => void;
}) {
  const saveOne = useSaveTrackedKeyword(projectId);
  const filters = buildFilterInput(range, device, country, searchType);
  const { viewQuery, refresh } = useSearchView(
    projectId,
    filters,
    pinnedWindow,
  );
  const view = viewQuery.data?.connected ? viewQuery.data : null;
  useHistorySync(projectId, view);

  const doneTodos = useDoneTodos(projectId);
  const openTodos = view
    ? view.todo.filter((item) => !doneTodos.done.has(item.id))
    : [];
  const drill = exactTarget;
  const setDrill = (target: DrillTarget) =>
    onViewChange({
      exactQuery: target.dimension === "query" ? target.key : undefined,
      exactPage: target.dimension === "page" ? target.key : undefined,
    });
  const closeDrill = () =>
    onViewChange({ exactQuery: undefined, exactPage: undefined });

  const setTab = (next: SearchTab) =>
    onViewChange({ tab: next, f: undefined, q: undefined });
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const showTodo = () => {
    setTab("todo");
    tabsRef.current?.scrollIntoView({ block: "start" });
  };

  const onTarget = (target: Exclude<TodoTarget, null | { kind: "brand" }>) => {
    if (target.kind === "drill") {
      setDrill({ dimension: target.dimension, key: target.key });
    } else if (target.kind === "device") {
      if (isDevice(target.device)) onViewChange({ device: target.device });
    } else {
      onViewChange({ country: target.country });
    }
  };

  const handleExport = async (
    what: "query" | "page" | "striking",
    target: ExportTarget,
  ) => {
    if (!view) return;
    try {
      if (what === "striking") {
        runExport(strikingExportTable(view), target);
        return;
      }
      const onThisTab =
        (what === "query" && tab === "queries") ||
        (what === "page" && tab === "pages");
      const result = await exportSearchPerformanceTable({
        data: {
          projectId,
          ...filters,
          dimension: what,
          window: {
            startDate: view.window.startDate,
            endDate: view.window.endDate,
          },
          ...(onThisTab && query ? { search: query } : {}),
          ...(onThisTab && quickFilter ? { quickFilter } : {}),
        },
      });
      runExport(dimensionExportTable(result), target);
    } catch (error) {
      toast.error(getStandardErrorMessage(error, t("Dışa aktarılamadı")));
    }
  };

  const stale = viewQuery.isPlaceholderData;

  return (
    <PageShell width={view || viewQuery.isPending ? "wide" : "reading"}>
      <PageHeader
        title={t("Arama performansı")}
        description={t(
          "Google'da kaç kez göründüğünüz, kaç tıklama aldığınız ve önce neyi düzeltmeniz gerektiği.",
        )}
        actions={
          view ? (
            <PageActions>
              <RefreshButton
                onRefresh={() => refresh.mutate()}
                isFetching={refresh.isPending || viewQuery.isFetching}
                dataUpdatedAt={viewQuery.dataUpdatedAt}
                shortcut
              />
              <SearchReportButton
                projectId={projectId}
                filters={filters}
                window={view.window}
                disabled={
                  viewQuery.isPlaceholderData ||
                  refresh.isPending ||
                  viewQuery.isFetching
                }
              />
              <TableExportMenu
                buttonClassName="btn btn-sm gap-1"
                actions={[
                  {
                    label: t("Sorgular (CSV)"),
                    icon: <Download className="size-4" />,
                    onClick: () => void handleExport("query", "csv"),
                  },
                  {
                    label: t("Sayfalar (CSV)"),
                    icon: <Download className="size-4" />,
                    onClick: () => void handleExport("page", "csv"),
                  },
                  {
                    label: t("İlk üçe yakın sorgular (CSV)"),
                    icon: <Download className="size-4" />,
                    onClick: () => void handleExport("striking", "csv"),
                  },
                  {
                    label: t("Sorguları E-Tablolar'a aktar"),
                    icon: <Sheet className="size-4" />,
                    onClick: () => void handleExport("query", "sheets"),
                  },
                  {
                    label: t("Sayfaları E-Tablolar'a aktar"),
                    icon: <Sheet className="size-4" />,
                    onClick: () => void handleExport("page", "sheets"),
                  },
                ]}
              />
            </PageActions>
          ) : null
        }
      />

      {viewQuery.isPending ? (
        <SearchPerformanceLoadingState />
      ) : viewQuery.isError ? (
        <div className="rounded-box border border-[var(--hairline)] bg-base-100">
          <QueryErrorState
            error={viewQuery.error}
            onRetry={() => void viewQuery.refetch()}
            title={t("Arama performansı yüklenemedi")}
          />
        </div>
      ) : !view ? (
        <SearchConsoleConnectionCard projectId={projectId} />
      ) : (
        <div
          className={`flex flex-col gap-5 transition-opacity ${
            stale ? "opacity-60" : ""
          }`}
          aria-busy={stale}
        >
          <SearchFilters
            pinned={Boolean(pinnedWindow)}
            range={range}
            device={device}
            country={country}
            searchType={searchType}
            compare={compare}
            countries={view.breakdowns.countries.rows}
            onViewChange={onViewChange}
          />

          <DataTrustStrip projectId={projectId} view={view} compare={compare} />
          <SearchVerdict
            view={view}
            compare={compare}
            open={openTodos}
            onShowTodo={showTodo}
          />
          <KpiTiles view={view} compare={compare} />

          {view.totals.current.impressions === 0 ? (
            <EmptyState
              title={t("Bu dönemde hiç gösterim yok")}
              description={
                device || country || searchType !== "web"
                  ? t(
                      "Seçili cihaz, ülke ya da arama türü için Google bu günlerde sitenizi hiç göstermedi. Filtreleri genişletmeyi deneyin.",
                    )
                  : t(
                      "Google bu günlerde sitenizi arama sonuçlarında göstermedi. Yeni bir siteyse birkaç gün sonra tekrar bakın; değilse dizin durumunu Site denetimi'nden kontrol edin.",
                    )
              }
            />
          ) : null}

          <SearchTrendPanel
            projectId={projectId}
            view={view}
            compare={compare}
            granularity={granularity}
            onGranularityChange={(next) =>
              onViewChange({ g: next === "day" ? undefined : next })
            }
          />

          <TopTasks
            open={openTodos}
            onTarget={onTarget}
            onShowTodo={showTodo}
          />

          <div
            ref={tabsRef}
            className="scroll-mt-4 overflow-hidden rounded-box border border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-raise)]"
          >
            <TabStrip tab={tab} view={view} onChange={setTab} />
            <TabPanel group="search-performance" value={tab}>
              {tab === "todo" ? (
                <TodoTab
                  projectId={projectId}
                  todo={view.todo}
                  days={view.window.days}
                  onShowQueries={() => setTab("queries")}
                  doneTodos={doneTodos}
                  onTarget={onTarget}
                />
              ) : tab === "queries" || tab === "pages" ? (
                <DimensionTab
                  key={tab}
                  projectId={projectId}
                  view={view}
                  filters={filters}
                  dimension={tab === "queries" ? "query" : "page"}
                  search={query}
                  quickFilter={quickFilter}
                  onSearchChange={(next) =>
                    onViewChange({ q: next || undefined })
                  }
                  onQuickFilterChange={(next) => onViewChange({ f: next })}
                  onOpen={(key) =>
                    setDrill({
                      dimension: tab === "queries" ? "query" : "page",
                      key,
                    })
                  }
                  onSaveKeyword={(keyword) => saveOne.mutate(keyword)}
                />
              ) : tab === "opportunities" ? (
                <OpportunitiesTab
                  projectId={projectId}
                  view={view}
                  segmentFiltered={Boolean(device ?? country)}
                  onOpen={setDrill}
                />
              ) : tab === "changes" ? (
                <ChangesTab
                  projectId={projectId}
                  view={view}
                  searchType={searchType}
                  device={device}
                  onOpen={setDrill}
                />
              ) : tab === "overlaps" ? (
                <OverlapsTab
                  projectId={projectId}
                  range={range}
                  device={device}
                  country={country}
                  searchType={searchType}
                  search={query}
                  onSearch={(next) => onViewChange({ q: next })}
                />
              ) : (
                <DistributionTab
                  projectId={projectId}
                  view={view}
                  device={device}
                  country={country}
                  onDevice={(next) => onViewChange({ device: next })}
                  onCountry={(next) => onViewChange({ country: next })}
                  onOpen={setDrill}
                />
              )}
            </TabPanel>
          </div>
        </div>
      )}

      {view && drill && !stale ? (
        <DrilldownPanel
          projectId={projectId}
          filters={filters}
          window={{
            startDate: view.window.startDate,
            endDate: view.window.endDate,
          }}
          target={drill}
          onNavigate={setDrill}
          onClose={closeDrill}
          onSaveKeyword={(keyword) => saveOne.mutate(keyword)}
        />
      ) : null}
    </PageShell>
  );
}
