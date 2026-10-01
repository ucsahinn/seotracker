import { formatCount, formatDuration } from "@/client/lib/format";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { UrlCell } from "@/client/components/table/UrlCell";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import {
  extractHostname,
  extractPathname,
  HttpStatusBadge,
} from "@/client/features/audit/shared";
import {
  nullableNumberSort,
  nullableStringSort,
  type PageRow,
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
export function predominantHost(pages: PageRow[], startUrl: string): string {
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

export function buildPagesColumns({
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
      cell: ({ getValue }) => (
        <UrlCell
          url={getValue()}
          label={displayPath(getValue(), canonicalHost)}
          className="text-xs"
        />
      ),
      meta: { cellClassName: "max-w-[240px]" },
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
            aria-label={`${formatCount(count)} sorunu göster`}
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
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Kelime"
          helpText="Sayfadaki kelime sayısı"
        />
      ),
      // Through the formatter, like every other count in this table: a
      // 3.400-word page was rendering as "3400" next to columns that group.
      cell: ({ getValue, row }) =>
        hasAnalyzedContent(row.original) ? (
          formatCount(getValue())
        ) : (
          <EmptyCell />
        ),
    }),
    pageColumnHelper.display({
      id: "images",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Görsel"
          helpText="Sayfadaki görsel sayısı. Uyarı renkli sayı, açıklaması (alt metni) eksik görselleri gösterir."
        />
      ),
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
    /*
     * Both link counts, written by every crawl since the crawler was built
     * and shown on no screen. Internal is the one that matters for ranking
     * -- a page nothing links to is a page Google reaches last and weights
     * least -- so it leads, and the external count sits behind it as the
     * outbound half of the same sentence.
     */
    pageColumnHelper.accessor("internalLinkCount", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Bağlantı"
          helpText="Site içi · dışarıya giden bağlantı sayısı. Bu sayfadan çıkan bağlantılar: önce site içi, sonra dışarı. Site içi bağlantısı olmayan bir sayfa, kendi sitesinin geri kalanına yol açmıyor demektir."
        />
      ),
      cell: ({ row }) => {
        if (!hasAnalyzedContent(row.original)) return <EmptyCell />;
        return (
          <span className="whitespace-nowrap text-xs">
            {formatCount(row.original.internalLinkCount)}
            <span className="text-subtle"> · </span>
            <span className="text-muted">
              {formatCount(row.original.externalLinkCount)}
            </span>
          </span>
        );
      },
      sortingFn: (left, right) =>
        left.original.internalLinkCount - right.original.internalLinkCount,
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
        <SortableHeader
          column={column}
          label="Derinlik"
          helpText="Ana sayfadan kaç tıkla ulaşılıyor"
        />
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
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Harita"
          helpText="Site haritasında var mı"
        />
      ),
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="text-xs text-muted">Var</span>
        ) : (
          <span className="text-xs text-subtle">Yok</span>
        ),
    }),
  ];
}
