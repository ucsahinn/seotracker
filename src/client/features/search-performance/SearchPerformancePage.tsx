import { QueryErrorState } from "@/client/components/QueryErrorState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { SearchTrendPanel } from "@/client/features/search-performance/SearchTrendChart";
import { DeviceBreakdown } from "@/client/features/search-performance/DeviceBreakdown";
import { SearchAppearanceBreakdown } from "@/client/features/search-performance/SearchAppearanceBreakdown";
import { TYPE_LABELS } from "@/client/features/search-performance/SearchFilters";
import { CountryBreakdown } from "@/client/features/search-performance/CountryBreakdown";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Download, Loader2, Sheet } from "lucide-react";
import { toast } from "sonner";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { SearchPerformanceLoadingState } from "@/client/features/search-performance/SearchPerformanceLoadingState";
import {
  DimensionTable,
  exportDimensionRows,
  exportStriking,
  StrikingDistanceTable,
  type ExportTarget,
  type Tab,
} from "@/client/features/search-performance/SearchPerformanceParts";
import { TotalsCards } from "@/client/features/search-performance/TotalsCards";
import { SearchFilters } from "@/client/features/search-performance/SearchFilters";
import { CannibalizationTable } from "@/client/features/search-performance/CannibalizationTable";
import {
  applyQuickFilter,
  type QuickFilterId,
} from "@/client/features/search-performance/quickFilters";
import {
  CannibalizationSummary,
  PagesSummary,
  QueriesSummary,
  StrikingSummary,
  TabSummarySkeleton,
} from "@/client/features/search-performance/TabSummaries";
import {
  buildFilterInput,
  tabDimension,
  tableQueryOptions,
} from "@/client/features/search-performance/searchPerformanceQueries";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { saveKeywords } from "@/serverFunctions/savedKeywords";
import { describeWindow } from "@/shared/dataFreshness";
import { formatDate } from "@/client/lib/format";
import {
  exportSearchPerformanceTable,
  getSearchPerformanceReport,
} from "@/serverFunctions/searchPerformance";
import {
  type SearchPerformanceDateRange,
  type SearchPerformanceDevice,
  type SearchPerformanceType,
} from "@/types/schemas/search-performance";

/** What each tab is for, in one plain sentence, shown above its panel. */
const TAB_HINTS: Record<Tab, string> = {
  striking:
    "Ortalama sırası 5 ile 20 arasında olan sorgular. 5-10 arası ilk sayfanın alt yarısı, 11-20 ikinci sayfa; küçük bir iyileştirme ikisini de üste taşıyabilir. Gösterime göre sıralı.",
  queries:
    "İnsanların sizi hangi aramalarla bulduğu; her sorgunun tıklama, gösterim ve ortalama sırasıyla.",
  pages: "Google'da en çok görünen ve tıklanan sayfalarınız.",
  cannibalization:
    "Aynı arama için birden fazla sayfanızın birbiriyle yarıştığı yerler.",
};

/** The tab values the route validates against. */
export const SEARCH_PERFORMANCE_TABS = [
  "striking",
  "queries",
  "pages",
  "cannibalization",
] as const;

export function SearchPerformancePage({
  projectId,
  tab,
  range,
  device,
  country,
  searchType,
  query,
  quickFilter,
  onViewChange,
}: {
  projectId: string;
  tab: Tab;
  /*
   * Range, device and country come from the URL rather than local state:
   * on this screen the filter is the finding, and a link that drops it is
   * a link to the wrong answer. `undefined` means "no filter".
   */
  range: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  /** Web unless the URL says otherwise. */
  searchType: SearchPerformanceType;
  /** Free-text narrowing of the dimension table, from the URL. */
  query: string;
  /** Chip filter on the queries and pages tables, from the URL. */
  quickFilter?: QuickFilterId;
  onViewChange: (next: {
    tab?: Tab;
    range?: SearchPerformanceDateRange;
    device?: SearchPerformanceDevice;
    country?: string;
    type?: SearchPerformanceType;
    q?: string;
    f?: QuickFilterId;
  }) => void;
}) {
  const queryClient = useQueryClient();
  /*
   * One keyword from a row menu. The bulk path on the striking-distance tab
   * already existed; this is the same server call for the single row an
   * operator is looking at, so the Sorgular tab stops being the one place a
   * keyword cannot be saved.
   */
  const saveOne = useMutation({
    mutationFn: (keyword: string) =>
      saveKeywords({ data: { projectId, keywords: [keyword] } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["savedKeywords", projectId],
      });
      toast.success("Kelime kayıtlı");
    },
    onError: (error) => {
      toast.error(getStandardErrorMessage(error, "Kelime kaydedilemedi"));
    },
  });
  // A chip chosen on one tab must not silently narrow the next one.
  const setTab = (next: Tab) => onViewChange({ tab: next, f: undefined });

  const filterInput = buildFilterInput(range, device, country, searchType);

  const reportQuery = useQuery({
    queryKey: [
      "searchPerformance",
      projectId,
      range,
      device,
      country,
      searchType,
    ],
    queryFn: () =>
      getSearchPerformanceReport({ data: { projectId, ...filterInput } }),
    placeholderData: keepPreviousData,
  });
  const report = reportQuery.data;

  const isTableTab = tab === "queries" || tab === "pages";
  const dimension = tabDimension(tab);
  const tableQuery = useQuery({
    ...tableQueryOptions(projectId, dimension, filterInput),
    enabled: report?.connected === true && isTableTab,
    placeholderData: keepPreviousData,
  });
  const tableData = tableQuery.data;
  const tableRows = tableData?.connected ? tableData.rows : [];
  const strikingRows = applyQuickFilter(
    report?.connected ? report.strikingDistance : [],
    quickFilter,
  );
  const onFilter = (next: QuickFilterId | undefined) =>
    onViewChange({ f: next });
  const tableTruncated = tableData?.connected ? tableData.truncated : false;

  // Warm the Queries tab (first page) as soon as the report connects so the tab
  // opens instantly instead of showing a spinner. Free first-party GSC data.
  useEffect(() => {
    if (report?.connected !== true) return;
    void queryClient.prefetchQuery(
      tableQueryOptions(
        projectId,
        "query",
        buildFilterInput(range, device, country, searchType),
      ),
    );
  }, [
    report?.connected,
    projectId,
    range,
    device,
    country,
    searchType,
    queryClient,
  ]);

  const handleExport = async (target: ExportTarget) => {
    if (!report?.connected) return;
    try {
      if (tab === "striking") {
        exportStriking(report, target);
        return;
      }
      const data = await exportSearchPerformanceTable({
        data: { projectId, dimension, ...filterInput },
      });
      exportDimensionRows(dimension, data.rows, report.range, target);
    } catch (error) {
      toast.error(getStandardErrorMessage(error, "Dışa aktarma başarısız"));
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="Arama performansı"
        description="Google Search Console'dan gelen tıklama, gösterim, tıklama oranı ve ortalama sıra."
        actions={
          report?.connected ? (
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className="link link-hover shrink-0 self-start text-sm font-medium text-muted transition-colors hover:text-base-content sm:mt-1"
            >
              Mülkü değiştir
            </Link>
          ) : null
        }
      />

      {reportQuery.isPending ? (
        <SearchPerformanceLoadingState />
      ) : reportQuery.isError ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={reportQuery.error}
            onRetry={() => void reportQuery.refetch()}
            title="Arama performansı yüklenemedi"
          />
        </div>
      ) : !report?.connected ? (
        <div className="max-w-2xl">
          <SearchConsoleConnectionCard projectId={projectId} />
        </div>
      ) : (
        <>
          {/*
           * Which days these totals are about. The dropdown says "Son 28
           * gün" and the resolved range reached the client all along, but
           * it was spent on export filenames and a tooltip -- so nothing on
           * a populated screen told the operator the window stops three
           * days short of today, which is the first thing someone asks
           * when a number looks lower than they expected.
           */}
          <p className="text-xs text-muted">
            {describeWindow(
              report.range.startDate,
              report.range.endDate,
              formatDate,
            )}
            {searchType === "web"
              ? null
              : ` · Arama türü: ${TYPE_LABELS[searchType]}`}
          </p>
          <TotalsCards report={report} />
          <SearchTrendPanel daily={report.daily} />
          <DeviceBreakdown
            devices={report.devices}
            selected={device}
            onSelect={(next) => onViewChange({ device: next })}
          />
          <SearchAppearanceBreakdown rows={report.searchAppearance} />
          <CountryBreakdown
            countries={report.countries}
            selected={country}
            onSelect={(next) => onViewChange({ country: next })}
          />
          <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
            <div className="flex flex-col gap-3 border-b border-base-300 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
              <Tabs
                group="search-performance"
                className="w-fit"
                value={tab}
                onChange={setTab}
                items={[
                  {
                    id: "striking",
                    label: `Sıra 5-20 (${report.strikingDistance.length})`,
                  },
                  { id: "queries", label: "Sorgular" },
                  { id: "pages", label: "Sayfalar" },
                  { id: "cannibalization", label: "Sayfa çakışmaları" },
                ]}
              />
              <div className="flex flex-wrap items-center gap-2">
                {reportQuery.isFetching && !reportQuery.isPending ? (
                  <Loader2 className="size-4 animate-spin text-muted" />
                ) : null}
                <SearchFilters
                  range={range}
                  device={device}
                  country={country}
                  searchType={searchType}
                  countries={report.countries}
                  onViewChange={onViewChange}
                />
                {/* Cannibalization has no export of its own, and
                    `tabDimension` answers "query" for it -- so the button
                    downloaded a query report while the screen showed
                    overlapping pages, with nothing saying so. */}
                {tab === "cannibalization" ? null : (
                  <TableExportMenu
                    buttonClassName="btn btn-ghost btn-sm gap-1"
                    actions={[
                      {
                        label: "E-Tablolar'a aktar",
                        icon: <Sheet className="size-4" />,
                        onClick: () => void handleExport("sheets"),
                      },
                      {
                        label: "CSV indir",
                        icon: <Download className="size-4" />,
                        onClick: () => void handleExport("csv"),
                      },
                    ]}
                  />
                )}
              </div>
            </div>

            <p className="border-b border-base-300 px-4 py-2.5 text-sm text-muted">
              {TAB_HINTS[tab]}
              {tab === "cannibalization" && range === "last_7_days"
                ? " 7 günlük seçim bu analizde 28 güne genişletilir; gösterilen tarih aralığı aşağıda yazar."
                : null}
            </p>

            <TabPanel group="search-performance" value={tab}>
              {tab === "striking" ? (
                <>
                  <StrikingSummary
                    rows={report.strikingDistance}
                    active={quickFilter}
                    onChange={onFilter}
                  />
                  <StrikingDistanceTable
                    projectId={projectId}
                    rows={strikingRows}
                    filtered={quickFilter !== undefined}
                  />
                </>
              ) : tab === "cannibalization" ? (
                <>
                  <CannibalizationSummary
                    projectId={projectId}
                    dateRange={range}
                    device={device}
                    country={country}
                    searchType={searchType}
                    onPickQuery={(picked) => onViewChange({ q: picked })}
                  />
                  <CannibalizationTable
                    projectId={projectId}
                    dateRange={range}
                    device={device}
                    country={country}
                    searchType={searchType}
                    search={query}
                    onClearSearch={() => onViewChange({ q: undefined })}
                  />
                </>
              ) : tableQuery.isPending ? (
                /* Shaped like the table that is coming, per the house rule:
                   a spinner in an empty box tells the reader nothing about
                   what is about to appear or how tall it will be. */
                <>
                  <TabSummarySkeleton />
                  <div className="space-y-2 p-4" aria-busy>
                    {Array.from({ length: 8 }, (_, index) => (
                      <div key={index} className="skeleton h-10" />
                    ))}
                  </div>
                </>
              ) : tableQuery.isError ? (
                <div className="p-4">
                  <QueryErrorState
                    compact
                    error={tableQuery.error}
                    onRetry={() => void tableQuery.refetch()}
                    title="Tablo yüklenemedi"
                  />
                </div>
              ) : (
                <>
                  {tab === "queries" ? (
                    <QueriesSummary
                      rows={tableRows}
                      active={quickFilter}
                      onChange={onFilter}
                    />
                  ) : (
                    <PagesSummary
                      rows={tableRows}
                      active={quickFilter}
                      onChange={onFilter}
                    />
                  )}
                  <div className="p-4">
                    <DimensionTable
                      rows={tableRows}
                      keyLabel={tab === "queries" ? "Sorgu" : "Sayfa"}
                      onSaveKeyword={
                        tab === "queries"
                          ? (keyword) => saveOne.mutate(keyword)
                          : undefined
                      }
                      truncated={tableTruncated}
                      hasActiveFilter={
                        Boolean(device ?? country) || searchType !== "web"
                      }
                      search={query}
                      onSearchChange={(next) =>
                        onViewChange({ q: next || undefined })
                      }
                      quickFilter={quickFilter}
                    />
                  </div>
                </>
              )}
            </TabPanel>
          </div>
        </>
      )}
    </PageShell>
  );
}
