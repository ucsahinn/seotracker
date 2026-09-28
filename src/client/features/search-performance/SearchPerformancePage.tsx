import { QueryErrorState } from "@/client/components/QueryErrorState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { SearchTrendPanel } from "@/client/features/search-performance/SearchTrendChart";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  keepPreviousData,
  queryOptions,
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
  TotalsCards,
  type ExportTarget,
  type Tab,
} from "@/client/features/search-performance/SearchPerformanceParts";
import { CannibalizationTable } from "@/client/features/search-performance/CannibalizationTable";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  exportSearchPerformanceTable,
  getSearchPerformanceReport,
  getSearchPerformanceTable,
} from "@/serverFunctions/searchPerformance";
import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_RANGES,
  type SearchPerformanceDateRange,
  type SearchPerformanceDevice,
  type SearchPerformanceTableDimension,
} from "@/types/schemas/search-performance";

const RANGE_LABELS: Record<SearchPerformanceDateRange, string> = {
  last_7_days: "Son 7 gün",
  last_28_days: "Son 28 gün",
  last_3_months: "Son 3 ay",
};
const RANGE_OPTIONS = SEARCH_PERFORMANCE_RANGES.map((value) => ({
  value,
  label: RANGE_LABELS[value],
}));

const DEVICE_LABELS: Record<SearchPerformanceDevice, string> = {
  DESKTOP: "Masaüstü",
  MOBILE: "Mobil",
  TABLET: "Tablet",
};
const DEVICE_OPTIONS = GSC_DEVICES.map((value) => ({
  value,
  label: DEVICE_LABELS[value],
}));

// Sentinel for "no filter" in the selects; never sent to the server.
const ALL = "ALL";

function isDateRange(value: string): value is SearchPerformanceDateRange {
  return SEARCH_PERFORMANCE_RANGES.some((option) => option === value);
}

function isDevice(value: string): value is SearchPerformanceDevice {
  return GSC_DEVICES.some((option) => option === value);
}

function tabDimension(tab: Tab): SearchPerformanceTableDimension {
  return tab === "pages" ? "page" : "query";
}

type FilterInput = {
  dateRange: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
};

// The server filter payload: drop device/country when set to the "ALL" sentinel.
function buildFilterInput(
  range: SearchPerformanceDateRange,
  device: SearchPerformanceDevice | undefined,
  country: string | undefined,
): FilterInput {
  return {
    dateRange: range,
    ...(device ? { device } : {}),
    ...(country ? { country } : {}),
  };
}

// Single source for the paginated table query, shared by the live query and the
// warm-on-connect prefetch so their key + fn can never drift apart.
function tableQueryOptions(
  projectId: string,
  dimension: SearchPerformanceTableDimension,
  filterInput: FilterInput,
) {
  return queryOptions({
    queryKey: ["searchPerformanceTable", projectId, dimension, filterInput],
    queryFn: () =>
      getSearchPerformanceTable({
        data: { projectId, dimension, ...filterInput },
      }),
  });
}

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
  onViewChange: (next: {
    tab?: Tab;
    range?: SearchPerformanceDateRange;
    device?: SearchPerformanceDevice;
    country?: string;
  }) => void;
}) {
  const queryClient = useQueryClient();
  const setTab = (next: Tab) => onViewChange({ tab: next });

  const filterInput = buildFilterInput(range, device, country);

  const reportQuery = useQuery({
    queryKey: ["searchPerformance", projectId, range, device, country],
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
  const tableTruncated = tableData?.connected ? tableData.truncated : false;

  // Warm the Queries tab (first page) as soon as the report connects so the tab
  // opens instantly instead of showing a spinner. Free first-party GSC data.
  useEffect(() => {
    if (report?.connected !== true) return;
    void queryClient.prefetchQuery(
      tableQueryOptions(
        projectId,
        "query",
        buildFilterInput(range, device, country),
      ),
    );
  }, [report?.connected, projectId, range, device, country, queryClient]);

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
              Kaynağı değiştir
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
          <TotalsCards report={report} />
          <SearchTrendPanel daily={report.daily} />
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
                    label: `Eşiğe yakın (${report.strikingDistance.length})`,
                  },
                  { id: "queries", label: "Sorgular" },
                  { id: "pages", label: "Sayfalar" },
                  { id: "cannibalization", label: "Çakışmalar" },
                ]}
              />
              <div className="flex flex-wrap items-center gap-2">
                {reportQuery.isFetching && !reportQuery.isPending ? (
                  <Loader2 className="size-4 animate-spin text-muted" />
                ) : null}
                <select
                  className="select select-bordered select-sm w-36"
                  value={device ?? ALL}
                  onChange={(event) =>
                    onViewChange({
                      device: isDevice(event.target.value)
                        ? event.target.value
                        : undefined,
                    })
                  }
                  aria-label="Cihaz filtresi"
                >
                  <option value={ALL}>Tüm cihazlar</option>
                  {DEVICE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered select-sm w-36"
                  value={country ?? ALL}
                  onChange={(event) =>
                    onViewChange({
                      country:
                        event.target.value === ALL
                          ? undefined
                          : event.target.value,
                    })
                  }
                  aria-label="Ülke filtresi"
                >
                  <option value={ALL}>Tüm ülkeler</option>
                  {report.countries.map((row) => (
                    <option key={row.key} value={row.key}>
                      {row.key.toUpperCase()}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered select-sm w-36"
                  value={range}
                  onChange={(event) => {
                    if (isDateRange(event.target.value)) {
                      onViewChange({ range: event.target.value });
                    }
                  }}
                  aria-label="Tarih aralığı"
                >
                  {RANGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {/* Cannibalization has no export of its own, and
                    `tabDimension` answers "query" for it -- so the button
                    downloaded a query report while the screen showed
                    overlapping pages, with nothing saying so. */}
                {tab === "cannibalization" ? null : (
                  <TableExportMenu
                    buttonClassName="btn btn-ghost btn-sm gap-1"
                    actions={[
                      {
                        label: "Sheets'e aktar",
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

            <TabPanel group="search-performance" value={tab}>
              {tab === "striking" ? (
                <StrikingDistanceTable
                  projectId={projectId}
                  rows={report.strikingDistance}
                />
              ) : tab === "cannibalization" ? (
                <CannibalizationTable
                  projectId={projectId}
                  dateRange={range}
                  device={device}
                  country={country}
                />
              ) : tableQuery.isPending ? (
                <div className="flex items-center gap-2 p-8 text-sm text-muted">
                  <Loader2 className="size-4 animate-spin" /> Yükleniyor…
                </div>
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
                  <div className="p-4">
                    <DimensionTable
                      rows={tableRows}
                      keyLabel={tab === "queries" ? "Sorgu" : "Sayfa"}
                      truncated={tableTruncated}
                      hasActiveFilter={Boolean(device ?? country)}
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
