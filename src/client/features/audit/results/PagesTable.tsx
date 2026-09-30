import { X } from "lucide-react";
import { TablePagination } from "@/client/components/table/TablePagination";
import { SEARCH_PERFORMANCE_PAGE_SIZES } from "@/types/schemas/search-performance";
import { useMemo, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import type { AuditResultsData } from "@/client/features/audit/results/types";
import {
  QuickFilters,
  quickFilterCounts,
} from "@/client/features/audit/results/QuickFilters";
import {
  countActiveFilters,
  EmptyTableMessage,
  PagesFilterBar,
  TableFilterToggle,
} from "@/client/features/audit/results/AuditResultsTableFilters";
import {
  EMPTY_PAGES_FILTERS,
  type PagesFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import {
  buildPagesColumns,
  predominantHost,
} from "@/client/features/audit/results/pagesColumns";
import { PagesSummary } from "@/client/features/audit/results/PagesSummary";

export function PagesTable({
  pages,
  startUrl,
  issues,
  filters,
  onFiltersChange,
  filteredPages,
  onShowIssues,
  scopeLabel,
  onClearScope,
}: {
  pages: AuditResultsData["pages"];
  startUrl: string;
  issues: AuditResultsData["issues"];
  /*
   * Filter state is owned by `ResultsView`, not here.
   *
   * It used to live in this component, which meant the export menu one level
   * up closed over the unfiltered array: narrowing 477 pages down to the
   * fourteen that 4xx and clicking CSV wrote all 477 rows, with nothing on
   * screen saying so. The operator found out in the spreadsheet.
   */
  filters: PagesFilters;
  onFiltersChange: (filters: PagesFilters) => void;
  filteredPages: AuditResultsData["pages"];
  onShowIssues: (url: string) => void;
  /** Set when the table was narrowed to one problem's pages from Sorunlar. */
  scopeLabel?: string;
  onClearScope: () => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  // URL order reads as a site inventory; status-first would open the table
  // on its most boring rows (redirects) whenever a site has no errors.
  const [sorting, setSorting] = useState<SortingState>([
    { id: "url", desc: false },
  ]);
  const activeFilterCount = countActiveFilters(filters, EMPTY_PAGES_FILTERS);
  // Counted over the whole crawl, not the filtered view: a chip that only
  // counted what is already on screen would read zero the moment you used it.
  const presetCounts = useMemo(() => quickFilterCounts(pages), [pages]);
  const issueCountByPageId = useMemo(() => {
    const counts = new Map<string, number>();
    for (const issue of issues) {
      if (!issue.pageId) continue;
      counts.set(issue.pageId, (counts.get(issue.pageId) ?? 0) + 1);
    }
    return counts;
  }, [issues]);
  const columns = useMemo(
    () =>
      buildPagesColumns({
        canonicalHost: predominantHost(pages, startUrl),
        missingTitlePageIds: new Set(
          issues
            .filter((issue) => issue.issueType === "missing-title")
            .map((issue) => issue.pageId)
            .filter((pageId): pageId is string => pageId !== null),
        ),
        issueCountByPageId,
        onShowIssues,
      }),
    [issueCountByPageId, issues, onShowIssues, pages, startUrl],
  );
  const table = useAppTable({
    data: filteredPages,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    withSorting: true,
    withPagination: true,
    // Every page of the audit is already in memory, so this is purely about
    // what the browser renders. A real site is hundreds to thousands of rows
    // and the table drew all of them: the tab took seconds to appear and
    // scrolling stuttered. Same client-side pagination the striking-distance
    // table uses.
    initialState: { pagination: { pageIndex: 0, pageSize: 50 } },
  });
  const pagination = table.getState().pagination;

  return (
    <div className="space-y-3">
      <PagesSummary
        pages={pages}
        filters={filters}
        onChange={onFiltersChange}
      />
      {scopeLabel ? (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted">Gösterilen:</span>
          <button
            type="button"
            onClick={onClearScope}
            aria-label={`${scopeLabel} seçimini kaldır`}
            className="inline-flex items-center gap-1 rounded-full border border-primary bg-primary/10 px-2.5 py-1 text-primary transition-colors hover:bg-primary/15"
          >
            {scopeLabel} sorunu olan sayfalar
            <X aria-hidden className="size-3" />
          </button>
        </div>
      ) : null}
      {/*
       * The four questions that get asked every time, one click each. The
       * full panel stays for the unusual ones; these write into the same
       * filter state, so a chip and the panel cannot disagree.
       */}
      <QuickFilters
        filters={filters}
        onChange={onFiltersChange}
        counts={presetCounts}
        sitemapFound={pages.some((page) => page.inSitemap)}
      />
      <TableFilterToggle
        showFilters={showFilters}
        onToggle={() => setShowFilters((current) => !current)}
        activeFilterCount={activeFilterCount}
        resultCount={filteredPages.length}
        totalCount={pages.length}
      />
      {showFilters ? (
        <PagesFilterBar
          filters={filters}
          onChange={onFiltersChange}
          activeFilterCount={activeFilterCount}
          onReset={() => onFiltersChange(EMPTY_PAGES_FILTERS)}
        />
      ) : null}
      <div className="overflow-hidden rounded-box border border-base-300">
        <AppDataTable
          table={table}
          stickyHeader
          wrapperClassName="max-h-[70vh] overflow-auto"
          className="table table-sm"
          empty={
            <EmptyTableMessage
              label="Bu denetim hiçbir sayfa taramadı."
              filteredLabel="Bu filtrelerle eşleşen sayfa yok."
              hasActiveFilter={activeFilterCount > 0}
            />
          }
        />
        {filteredPages.length > 0 ? (
          <TablePagination
            page={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            pageSizes={SEARCH_PERFORMANCE_PAGE_SIZES}
            totalCount={filteredPages.length}
            hasNextPage={table.getCanNextPage()}
            isLoading={false}
            onPageChange={(nextPage) => table.setPageIndex(nextPage - 1)}
            onPageSizeChange={(nextSize) => table.setPageSize(nextSize)}
          />
        ) : null}
      </div>
    </div>
  );
}
