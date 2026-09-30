import {
  formatCount,
  formatDecimal,
  formatDuration,
} from "@/client/lib/format";
import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import {
  extractPathname,
  LighthouseScoreBadge,
} from "@/client/features/audit/shared";
import type { AuditResultsData } from "@/client/features/audit/results/types";
import { severityChip } from "@/client/features/audit/shared";
import {
  countActiveFilters,
  EmptyTableMessage,
  PerformanceFilterBar,
  TableFilterToggle,
} from "@/client/features/audit/results/AuditResultsTableFilters";
import {
  EMPTY_PERFORMANCE_FILTERS,
  filterPerformanceRows,
  isLighthouseFailure,
  nullableNumberSort,
  nullableStringSort,
  type PerformanceFilters,
  type PerformanceRowData,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";

const performanceColumnHelper = createColumnHelper<PerformanceRowData>();

export function PerformanceTable({
  auditId,
  projectId,
  lighthouse,
  pages,
  filters,
  onFiltersChange,
  onFilteredIdsChange,
}: {
  auditId: string;
  projectId: string;
  lighthouse: AuditResultsData["lighthouse"];
  pages: AuditResultsData["pages"];
  /*
   * Owned by `ResultsView`, for the same reason the pages filters are: the
   * export menu lives one level up and was closing over the unfiltered
   * array, so a narrowed table exported everything.
   */
  filters: PerformanceFilters;
  onFiltersChange: (filters: PerformanceFilters) => void;
  /** The ids that survived the filter, so the export can write exactly them. */
  onFilteredIdsChange: (ids: string[]) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "performanceScore", desc: false },
  ]);
  const rows = useMemo(
    () =>
      lighthouse.map((result) => {
        const page = pages.find((candidate) => candidate.id === result.pageId);
        const pageUrl = page?.url ?? null;
        return {
          ...result,
          pageUrl,
          pagePath: pageUrl ? extractPathname(pageUrl) : null,
        };
      }),
    [lighthouse, pages],
  );
  const filteredRows = useMemo(
    () => filterPerformanceRows(rows, filters),
    [filters, rows],
  );
  /*
   * Reported up rather than recomputed up. The rows are assembled here by
   * joining Lighthouse results to their pages, and the text filter searches
   * the joined URL -- so filtering again upstairs without the join would
   * quietly export the wrong rows.
   */
  const filteredIds = useMemo(
    () => filteredRows.map((row) => row.id),
    [filteredRows],
  );
  useEffect(() => {
    onFilteredIdsChange(filteredIds);
  }, [filteredIds, onFilteredIdsChange]);
  const activeFilterCount = countActiveFilters(
    filters,
    EMPTY_PERFORMANCE_FILTERS,
  );
  const columns = useMemo(
    () => buildPerformanceColumns({ auditId, projectId }),
    [auditId, projectId],
  );
  const table = useAppTable({
    data: filteredRows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    withSorting: true,
  });

  return (
    <div className="space-y-3">
      <TableFilterToggle
        showFilters={showFilters}
        onToggle={() => setShowFilters((current) => !current)}
        activeFilterCount={activeFilterCount}
        resultCount={filteredRows.length}
        totalCount={rows.length}
      />
      {showFilters ? (
        <PerformanceFilterBar
          filters={filters}
          onChange={onFiltersChange}
          activeFilterCount={activeFilterCount}
          onReset={() => onFiltersChange(EMPTY_PERFORMANCE_FILTERS)}
        />
      ) : null}
      {/* Framed like the Pages and Issues tables beside it. This one sat
          on the page background, so switching tabs changed whether the
          results looked like a panel. */}
      <div className="overflow-hidden rounded-box border border-base-300">
        <AppDataTable
          table={table}
          className="table table-sm"
          empty={
            <EmptyTableMessage
              label="Bu denetimde Lighthouse sonucu yok."
              filteredLabel="Bu filtrelerle eşleşen performans sonucu yok."
              hasActiveFilter={activeFilterCount > 0}
            />
          }
        />
      </div>
    </div>
  );
}

function buildPerformanceColumns({
  auditId,
  projectId,
}: {
  auditId: string;
  projectId: string;
}): ColumnDef<PerformanceRowData>[] {
  return [
    performanceColumnHelper.accessor("pagePath", {
      header: ({ column }) => <SortableHeader column={column} label="URL" />,
      cell: ({ getValue }) => (
        <span className="text-xs">{getValue() ?? "-"}</span>
      ),
      sortingFn: nullableStringSort,
      meta: { cellClassName: "max-w-[180px] truncate" },
    }),
    performanceColumnHelper.accessor("strategy", {
      header: ({ column }) => <SortableHeader column={column} label="Cihaz" />,
      cell: ({ getValue }) => (
        <span className="capitalize text-xs">{getValue()}</span>
      ),
    }),
    performanceColumnHelper.display({
      id: "status",
      header: ({ column }) => <SortableHeader column={column} label="Durum" />,
      cell: ({ row }) => {
        const isFailed = isLighthouseFailure(row.original);
        const failureMessage =
          row.original.errorMessage ??
          "Hız ölçümü hiçbir kategori puanı döndürmedi";
        return isFailed ? (
          <span
            className={`badge text-xs ${severityChip.error}`}
            title={failureMessage}
          >
            başarısız
          </span>
        ) : (
          <span className={`badge text-xs ${severityChip.success}`}>tamam</span>
        );
      },
      enableSorting: true,
      sortingFn: (left, right) =>
        Number(isLighthouseFailure(left.original)) -
        Number(isLighthouseFailure(right.original)),
    }),
    performanceColumnHelper.accessor("performanceScore", {
      header: ({ column }) => <SortableHeader column={column} label="Perf" />,
      cell: ({ getValue }) => <LighthouseScoreBadge score={getValue()} />,
      sortingFn: nullableNumberSort,
    }),
    performanceColumnHelper.accessor("accessibilityScore", {
      header: ({ column }) => <SortableHeader column={column} label="A11y" />,
      cell: ({ getValue }) => <LighthouseScoreBadge score={getValue()} />,
      sortingFn: nullableNumberSort,
    }),
    performanceColumnHelper.accessor("seoScore", {
      header: ({ column }) => <SortableHeader column={column} label="SEO" />,
      cell: ({ getValue }) => <LighthouseScoreBadge score={getValue()} />,
      sortingFn: nullableNumberSort,
    }),
    performanceColumnHelper.accessor("lcpMs", {
      header: ({ column }) => <SortableHeader column={column} label="LCP" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? (
          <span className="text-xs">{formatDuration(value)}</span>
        ) : (
          <span className="text-xs text-muted">-</span>
        );
      },
      sortingFn: nullableNumberSort,
    }),
    performanceColumnHelper.accessor("cls", {
      header: ({ column }) => <SortableHeader column={column} label="CLS" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value != null ? (
          <span className="text-xs">{formatDecimal(value, 3)}</span>
        ) : (
          <span className="text-xs text-muted">-</span>
        );
      },
      sortingFn: nullableNumberSort,
    }),
    performanceColumnHelper.accessor("inpMs", {
      header: ({ column }) => <SortableHeader column={column} label="INP" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? (
          <span className="text-xs">{formatDuration(value)}</span>
        ) : (
          <span className="text-xs text-muted">-</span>
        );
      },
      sortingFn: nullableNumberSort,
    }),
    performanceColumnHelper.accessor("ttfbMs", {
      header: ({ column }) => <SortableHeader column={column} label="TTFB" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? (
          <span className="text-xs">{formatDuration(value)}</span>
        ) : (
          <span className="text-xs text-muted">-</span>
        );
      },
      sortingFn: nullableNumberSort,
    }),
    performanceColumnHelper.display({
      id: "issues",
      header: () => "Sorunlar",
      cell: ({ row }) =>
        row.original.r2Key && !isLighthouseFailure(row.original) ? (
          <Link
            className="btn btn-primary btn-xs"
            to="/p/$projectId/audit/issues/$resultId"
            params={{ projectId, resultId: row.original.id }}
            search={{ auditId, category: "performance" }}
          >
            Sorunları gör
          </Link>
        ) : (
          <span className="text-xs text-muted">-</span>
        ),
    }),
  ];
}

export function ExportDropdown({
  onExport,
  rowCount,
}: {
  onExport: (format: "csv" | "json" | "sheets") => void;
  /**
   * How many rows the export will actually write.
   *
   * Named in every label because the export follows the table's filters:
   * without it, "CSV" on a filtered table is indistinguishable from "CSV" on
   * the whole audit until the file opens.
   */
  rowCount: number;
}) {
  const suffix = `(${formatCount(rowCount)} satır)`;
  return (
    <TableExportMenu
      buttonClassName="btn btn-sm btn-ghost gap-1"
      menuClassName="dropdown-content z-10 menu p-2 shadow-lg bg-base-100 border border-base-300 rounded-box w-56"
      actions={[
        {
          label: `Sheets'e aktar ${suffix}`,
          onClick: () => onExport("sheets"),
        },
        { label: `CSV ${suffix}`, onClick: () => onExport("csv") },
        { label: `JSON ${suffix}`, onClick: () => onExport("json") },
      ]}
    />
  );
}
