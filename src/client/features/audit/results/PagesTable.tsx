import { formatCount, formatDuration } from "@/client/lib/format";
import { TablePagination } from "@/client/components/table/TablePagination";
import { SEARCH_PERFORMANCE_PAGE_SIZES } from "@/types/schemas/search-performance";
import { useMemo, useState } from "react";
import {
  createColumnHelper,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import {
  extractHostname,
  extractPathname,
  HttpStatusBadge,
} from "@/client/features/audit/shared";
import type { AuditResultsData } from "@/client/features/audit/results/types";
import {
  countActiveFilters,
  EmptyTableMessage,
  PagesFilterBar,
  TableFilterToggle,
} from "@/client/features/audit/results/AuditResultsTableFilters";
import {
  EMPTY_PAGES_FILTERS,
  nullableNumberSort,
  nullableStringSort,
  type PageRow,
  type PagesFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";

const pageColumnHelper = createColumnHelper<PageRow>();

/**
 * Path shown in the URL/redirect cells. Redirect sources on another host
 * (e.g. the apex domain 301ing to www) would otherwise render identically
 * to their target, so include the host whenever it differs from the
 * site's canonical host.
 */
function displayPath(url: string, canonicalHost: string): string {
  const host = extractHostname(url);
  const path = extractPathname(url);
  return host === canonicalHost ? path : host + path;
}

/**
 * The host most of the site's real (2xx) pages live on. The start URL's host
 * is only a fallback: audits often start from the apex domain of a site that
 * canonicalizes to www, and prefixing every row with the host is exactly the
 * noise this display is meant to avoid.
 */
function predominantHost(pages: PageRow[], startUrl: string): string {
  const counts = new Map<string, number>();
  for (const page of pages) {
    if (page.statusCode === null || page.statusCode >= 300) continue;
    const host = extractHostname(page.url);
    counts.set(host, (counts.get(host) ?? 0) + 1);
  }
  let best = extractHostname(startUrl);
  let bestCount = 0;
  for (const [host, count] of counts) {
    if (count > bestCount) {
      best = host;
      bestCount = count;
    }
  }
  return best;
}

function isRedirect(row: PageRow): boolean {
  return (
    row.statusCode !== null && row.statusCode >= 300 && row.statusCode < 400
  );
}

/** Redirects and blocked/errored fetches have no analyzed content — their
 * zero H1/word/image counts are an artifact, not a finding. */
function hasAnalyzedContent(row: PageRow): boolean {
  return row.fetchClass === "ok" && !isRedirect(row);
}

const EmptyCell = () => <span className="text-xs text-muted">-</span>;

function buildPagesColumns({
  canonicalHost,
  missingTitlePageIds,
  issueCountByPageId,
  onShowIssues,
}: {
  canonicalHost: string;
  missingTitlePageIds: Set<string>;
  /** Findings per page, so a row can say how much is wrong with it. */
  issueCountByPageId: Map<string, number>;
  /** Opens the issues tab filtered to this page. */
  onShowIssues: (url: string) => void;
}): ColumnDef<PageRow>[] {
  return [
    pageColumnHelper.accessor("url", {
      header: ({ column }) => <SortableHeader column={column} label="URL" />,
      cell: ({ getValue }) => {
        const url = getValue();
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary inline-flex items-center gap-1 text-xs"
          >
            <span className="truncate">{displayPath(url, canonicalHost)}</span>
            <ExternalLink className="size-3 shrink-0" />
          </a>
        );
      },
      meta: { cellClassName: "max-w-[240px] truncate" },
    }),
    pageColumnHelper.accessor("statusCode", {
      header: ({ column }) => <SortableHeader column={column} label="Durum" />,
      cell: ({ getValue }) => <HttpStatusBadge code={getValue()} />,
      sortingFn: nullableNumberSort,
    }),
    /*
     * The row's only exit used to be the live URL in a new tab. A page with
     * findings could not reach them, even though both sides key off the
     * same id -- so "which of these 212 pages is broken, and how" took a
     * tab switch and a manual scan.
     */
    pageColumnHelper.display({
      id: "issues",
      header: "Sorun",
      cell: ({ row }) => {
        const count = issueCountByPageId.get(row.original.id) ?? 0;
        if (count === 0) return <EmptyCell />;
        return (
          <button
            type="button"
            onClick={() => onShowIssues(row.original.url)}
            className="link link-hover text-xs text-[var(--ink-warning)]"
          >
            {formatCount(count)}
          </button>
        );
      },
    }),
    pageColumnHelper.accessor("title", {
      header: ({ column }) => <SortableHeader column={column} label="Başlık" />,
      cell: ({ getValue, row }) => {
        if (isRedirect(row.original)) {
          const target = row.original.redirectUrl;
          return (
            <span className="text-xs text-muted">
              → {target ? displayPath(target, canonicalHost) : "redirect"}
            </span>
          );
        }
        const title = getValue();
        if (title) {
          return <span className="break-words">{title}</span>;
        }
        // Red only when the engine flagged it — a 200 that isn't an HTML
        // document (robots.txt, security.txt) legitimately has no title.
        return missingTitlePageIds.has(row.original.id) ? (
          <span className="text-xs text-[var(--ink-error)]">eksik</span>
        ) : (
          <EmptyCell />
        );
      },
      sortingFn: nullableStringSort,
      meta: { cellClassName: "max-w-[360px]" },
    }),
    pageColumnHelper.accessor("h1Count", {
      header: ({ column }) => <SortableHeader column={column} label="H1" />,
      cell: ({ getValue, row }) =>
        hasAnalyzedContent(row.original) ? getValue() : <EmptyCell />,
    }),
    pageColumnHelper.accessor("wordCount", {
      header: ({ column }) => <SortableHeader column={column} label="Kelime" />,
      cell: ({ getValue, row }) =>
        hasAnalyzedContent(row.original) ? getValue() : <EmptyCell />,
    }),
    pageColumnHelper.display({
      id: "images",
      header: ({ column }) => <SortableHeader column={column} label="Görsel" />,
      cell: ({ row }) => {
        if (!hasAnalyzedContent(row.original)) return <EmptyCell />;
        return row.original.imagesMissingAlt > 0 ? (
          <span className="text-[var(--ink-warning)]">
            {row.original.imagesMissingAlt}/{row.original.imagesTotal}
          </span>
        ) : (
          row.original.imagesTotal
        );
      },
      enableSorting: true,
      sortingFn: (left, right) =>
        left.original.imagesMissingAlt - right.original.imagesMissingAlt ||
        left.original.imagesTotal - right.original.imagesTotal,
    }),
    pageColumnHelper.accessor("responseTimeMs", {
      header: ({ column }) => <SortableHeader column={column} label="Hız" />,
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? (
          <span className="text-xs">{formatDuration(value)}</span>
        ) : (
          <EmptyCell />
        );
      },
      sortingFn: nullableNumberSort,
    }),
    /*
     * Three columns the crawler has always filled and no screen showed.
     *
     * They are the questions an operator arrives with on a site this size:
     * which pages is Google allowed to index, how deep is this one buried,
     * and did the sitemap forget it. Only depth is nullable, and a null
     * there means nothing linked to the page -- not depth zero.
     */
    pageColumnHelper.accessor("isIndexable", {
      header: ({ column }) => <SortableHeader column={column} label="Dizin" />,
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="text-xs text-muted">Evet</span>
        ) : (
          <span className="text-xs text-[var(--ink-warning)]">noindex</span>
        ),
    }),
    pageColumnHelper.accessor("crawlDepth", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Derinlik" />
      ),
      cell: ({ getValue }) => {
        const value = getValue();
        return value === null ? (
          <EmptyCell />
        ) : (
          <span className="text-xs">{formatCount(value)}</span>
        );
      },
      sortingFn: nullableNumberSort,
    }),
    pageColumnHelper.accessor("inSitemap", {
      header: ({ column }) => <SortableHeader column={column} label="Harita" />,
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="text-xs text-muted">Var</span>
        ) : (
          <span className="text-xs text-subtle">Yok</span>
        ),
    }),
  ];
}

export function PagesTable({
  pages,
  startUrl,
  issues,
  filters,
  onFiltersChange,
  filteredPages,
  onShowIssues,
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
}) {
  const [showFilters, setShowFilters] = useState(false);
  // URL order reads as a site inventory; status-first would open the table
  // on its most boring rows (redirects) whenever a site has no errors.
  const [sorting, setSorting] = useState<SortingState>([
    { id: "url", desc: false },
  ]);
  const activeFilterCount = countActiveFilters(filters, EMPTY_PAGES_FILTERS);
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
