import { PageShell } from "@/client/components/PageShell";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { useEffect, useState } from "react";
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
import { TablePagination } from "@/client/components/table/TablePagination";
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
  SEARCH_PERFORMANCE_DEFAULT_PAGE_SIZE,
  SEARCH_PERFORMANCE_PAGE_SIZES,
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
  device: SearchPerformanceDevice | typeof ALL,
  country: string,
): FilterInput {
  return {
    dateRange: range,
    ...(device === ALL ? {} : { device }),
    ...(country === ALL ? {} : { country }),
  };
}

// Single source for the paginated table query, shared by the live query and the
// warm-on-connect prefetch so their key + fn can never drift apart.
function tableQueryOptions(
  projectId: string,
  dimension: SearchPerformanceTableDimension,
  page: number,
  pageSize: number,
  filterInput: FilterInput,
) {
  return queryOptions({
    queryKey: [
      "searchPerformanceTable",
      projectId,
      dimension,
      page,
      pageSize,
      filterInput,
    ],
    queryFn: () =>
      getSearchPerformanceTable({
        data: { projectId, dimension, page, pageSize, ...filterInput },
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
  onTabChange: setTab,
}: {
  projectId: string;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  const queryClient = useQueryClient();
  const [range, setRange] =
    useState<SearchPerformanceDateRange>("last_28_days");
  const [device, setDevice] = useState<SearchPerformanceDevice | typeof ALL>(
    ALL,
  );
  const [country, setCountry] = useState<string>(ALL);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(
    SEARCH_PERFORMANCE_DEFAULT_PAGE_SIZE,
  );

  // Any change to the query set (tab, filters, page size) restarts at page 1.
  useEffect(() => {
    setPage(1);
  }, [tab, range, device, country, pageSize]);

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
    ...tableQueryOptions(projectId, dimension, page, pageSize, filterInput),
    enabled: report?.connected === true && isTableTab,
    placeholderData: keepPreviousData,
  });
  const tableData = tableQuery.data;
  const tableRows = tableData?.connected ? tableData.rows : [];
  const hasNextPage = tableData?.connected ? tableData.hasNextPage : false;

  // Warm the Queries tab (first page) as soon as the report connects so the tab
  // opens instantly instead of showing a spinner. Free first-party GSC data.
  useEffect(() => {
    if (report?.connected !== true) return;
    void queryClient.prefetchQuery(
      tableQueryOptions(
        projectId,
        "query",
        1,
        SEARCH_PERFORMANCE_DEFAULT_PAGE_SIZE,
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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Arama performansı</h1>
          <p className="text-sm text-muted">
            Google Search Console&apos;dan gelen tıklama, gösterim, tıklama
            oranı ve ortalama sıra.
          </p>
        </div>
        {report?.connected ? (
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="link link-hover shrink-0 self-start text-sm font-medium text-muted transition-colors hover:text-base-content sm:mt-1"
          >
            Kaynağı değiştir
          </Link>
        ) : null}
      </div>

      {reportQuery.isPending ? (
        <SearchPerformanceLoadingState />
      ) : reportQuery.isError ? (
        <div className="alert alert-error">
          <span className="text-sm">
            {getStandardErrorMessage(reportQuery.error)}
          </span>
        </div>
      ) : !report?.connected ? (
        <div className="max-w-2xl">
          <SearchConsoleConnectionCard projectId={projectId} />
        </div>
      ) : (
        <>
          <TotalsCards report={report} />
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
                  value={device}
                  onChange={(event) => {
                    setDevice(
                      isDevice(event.target.value) ? event.target.value : ALL,
                    );
                  }}
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
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
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
                      setRange(event.target.value);
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
              </div>
            </div>

            <TabPanel group="search-performance" value={tab}>
              {tab === "striking" ? (
                <StrikingDistanceTable
                  projectId={projectId}
                  rows={report.strikingDistance}
                />
              ) : tab === "cannibalization" ? (
                <CannibalizationTable projectId={projectId} />
              ) : tableQuery.isPending ? (
                <div className="flex items-center gap-2 p-8 text-sm text-muted">
                  <Loader2 className="size-4 animate-spin" /> Yükleniyor…
                </div>
              ) : tableQuery.isError ? (
                <div className="p-4">
                  <div className="alert alert-error">
                    <span className="text-sm">
                      {getStandardErrorMessage(tableQuery.error)}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4">
                    <DimensionTable
                      rows={tableRows}
                      keyLabel={tab === "queries" ? "Sorgu" : "Sayfa"}
                    />
                  </div>
                  <TablePagination
                    page={page}
                    pageSize={pageSize}
                    pageSizes={SEARCH_PERFORMANCE_PAGE_SIZES}
                    totalCount={null}
                    hasNextPage={hasNextPage}
                    isLoading={tableQuery.isFetching}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                  />
                </>
              )}
            </TabPanel>
          </div>
        </>
      )}
    </PageShell>
  );
}
