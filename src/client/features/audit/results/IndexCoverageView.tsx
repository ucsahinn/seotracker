import { coverageStateLabel } from "@/shared/gsc-coverage-states";
type CoverageRow = Awaited<
  ReturnType<typeof getAuditIndexCoverage>
>["rows"][number];
import { sort } from "remeda";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Loader2, RefreshCw, SearchCheck } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { TablePagination } from "@/client/components/table/TablePagination";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatDateTime, formatNumber } from "@/client/lib/format";
import {
  getAuditIndexCoverage,
  refreshAuditIndexCoverage,
} from "@/serverFunctions/indexCoverage";
import { UrlCell } from "@/client/components/table/UrlCell";
import { StackedShare } from "@/client/components/StackedShare";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { severityChip } from "@/client/features/audit/shared";

/**
 * What Google says about the pages the crawler found.
 *
 * The crawl can only establish that a page *could* be indexed. Whether Google
 * agreed is the question that decides whether the page earns anything, and
 * the URL Inspection API answers it for free. The two disagree more often
 * than people expect.
 */
export function IndexCoverageView({
  projectId,
  auditId,
  onRowsChange,
  askDisabledReason,
}: {
  projectId: string;
  auditId: string;
  /** Hands the rows to the export menu a level up; undefined while loading. */
  onRowsChange?: (rows: CoverageRow[] | undefined) => void;
  /*
   * Set when asking Google would spend quota on a question it cannot
   * answer -- an audit of a site the project's property does not cover.
   * The allowance is 2000 URLs a day and does not replenish early.
   */
  askDisabledReason?: string;
}) {
  const queryClient = useQueryClient();
  const queryKey = ["indexCoverage", projectId, auditId] as const;

  const coverage = useQuery({
    queryKey,
    queryFn: () => getAuditIndexCoverage({ data: { projectId, auditId } }),
  });

  /*
   * Handed up so the export menu one level away writes these rows. The
   * query lives here, and duplicating it upstairs would mean two fetches
   * of the same quota-backed cache.
   */
  const rows = coverage.data?.rows;
  useEffect(() => {
    /*
     * `undefined` while the query is in flight, the rows once they arrive.
     *
     * Reporting `[]` during the flight made the tab label upstairs read
     * "(0)" for a moment and an export clicked then wrote an empty file.
     * But holding the previous value was worse: switching to another audit
     * with this tab open left the parent holding the *old* audit's rows,
     * so the label counted one crawl while the screen drew another -- and
     * an export in that moment wrote a different audit's coverage.
     */
    onRowsChange?.(rows);
  }, [onRowsChange, rows]);

  const refresh = useMutation({
    mutationFn: () =>
      refreshAuditIndexCoverage({ data: { projectId, auditId } }),
    onSuccess: async (result) => {
      if (result.status === "needs_gsc") {
        toast.error(
          "Search Console bağlı değil. Google'a sormadan önce bağlamanız gerekiyor.",
        );
        return;
      }
      await queryClient.invalidateQueries({ queryKey });
      if (result.inspected === 0) {
        /*
         * Nothing was asked. The button is disabled while `due === 0`, so a
         * click that reaches here almost always means the daily quota is
         * gone, not that the work is done -- and this branch used to answer
         * it with a green "everything is up to date" while pages waited.
         */
        if (result.quotaRemaining === 0) {
          toast.error(
            `Google'ın günlük 2000 adres sınırına ulaşıldı. ${formatNumber(result.remaining)} sayfa bekliyor; sınır birkaç saat içinde yenilenir.`,
          );
        } else {
          toast.success("Tüm sayfalar güncel, sorulacak bir şey yok.");
        }
        return;
      }
      const left =
        result.remaining > 0 ? ` ${result.remaining} sayfa kaldı.` : "";
      // The daily cap is worth naming only when it is close enough to stop
      // the next run; otherwise it is a number nobody needs.
      const quota =
        result.quotaRemaining < 100
          ? ` Bugünkü kotadan ${result.quotaRemaining} sorgu kaldı.`
          : "";
      toast.success(`${result.inspected} sayfa soruldu.${left}${quota}`);
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  const data = coverage.data;

  if (coverage.isPending) {
    return (
      <div className="space-y-3" aria-busy>
        <div className="skeleton h-[104px]" />
        <div className="skeleton h-64" />
      </div>
    );
  }

  if (coverage.isError) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          compact
          error={coverage.error}
          onRetry={() => void coverage.refetch()}
          title="Dizin durumu yüklenemedi"
        />
      </div>
    );
  }

  if (!data || data.rows.length === 0) {
    return (
      <EmptyState
        icon={SearchCheck}
        title="Sorulacak sayfa yok"
        description="Bu denetimde Google'ın dizine alabileceği bir sayfa bulunmadı."
      />
    );
  }

  // Asked, not answered. An audit where every inspection errored has
  // `checked === 0` but plenty to show: the error strings live in the table.
  const neverChecked = data.asked === 0;

  /*
   * The same four numbers as the tiles below, but as shares of one whole.
   * Four tiles say how many; this says how far through the site Google has
   * actually got, which is the question the screen exists to answer.
   */
  const share = neverChecked ? null : (
    <StackedShare
      summary={`${formatNumber(data.rows.length)} sayfadan ${formatNumber(data.indexed)} tanesi Google'da, ${formatNumber(data.notIndexed)} tanesi dizinde değil, ${formatNumber(data.pending)} tanesi henüz yanıtlanmadı.`}
      segments={[
        {
          label: "Google'da",
          value: data.indexed,
          color: "var(--color-success)",
        },
        {
          label: "Dizinde değil",
          value: data.notIndexed,
          color: "var(--color-warning)",
        },
        {
          /*
           * `pending`, not `due`. The three have to add up to the whole, and
           * only these do: `indexed + notIndexed + pending === rows.length`.
           * `due` counts every row worth re-asking, which includes answered
           * rows whose answer has aged out -- so a site answered three weeks
           * ago had every page counted twice and the bar read 200%.
           */
          label: "Yanıt bekleyen",
          value: data.pending,
          color: "var(--color-base-300)",
        },
      ]}
    />
  );

  return (
    <div className="space-y-4">
      {share ? (
        <div className="rounded-box border border-base-300 bg-base-100 px-4 py-3">
          {share}
        </div>
      ) : null}
      <MetricRow>
        <MetricTile
          label="Google'da"
          value={neverChecked ? null : formatNumber(data.indexed)}
          hint={
            neverChecked
              ? undefined
              : `${formatNumber(data.rows.length)} sayfadan`
          }
        />
        <MetricTile
          label="Dizinde değil"
          value={neverChecked ? null : formatNumber(data.notIndexed)}
        />
        <MetricTile
          label="Canonical uyuşmazlığı"
          value={neverChecked ? null : formatNumber(data.canonicalMismatches)}
          hint={
            data.canonicalMismatches > 0
              ? "Google sizin seçtiğinizden başka bir sayfayı tercih etti"
              : undefined
          }
        />
        <MetricTile
          label="Sorulmayı bekleyen"
          value={formatNumber(data.due)}
          hint={
            data.lastCheckedAt
              ? `Son kontrol ${formatDateTime(data.lastCheckedAt)}`
              : "Henüz hiç sorulmadı"
          }
        />
      </MetricRow>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Google URL Inspection API günde 2000 adres sorgulamanıza izin verir.
          Her tıklamada 25 sayfa sorulur: önce hiç sorulmayanlar, sonra
          Google&apos;ın dizine almadıkları.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          /* `due`, not `pending`: a page Google already answered becomes
             worth re-asking once the answer ages out, and keying off
             `pending` left the button disabled while there was work. */
          disabled={
            refresh.isPending || data.due === 0 || Boolean(askDisabledReason)
          }
          title={askDisabledReason}
          onClick={() => refresh.mutate()}
        >
          {refresh.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <RefreshCw className="size-4" />
          )}
          Google'a sor
        </button>
      </div>

      {neverChecked ? (
        <EmptyState
          icon={SearchCheck}
          title="Google'a henüz sorulmadı"
          description="Taradığınız sayfaların gerçekten dizine girip girmediğini görmek için yukarıdaki düğmeyi kullanın."
        />
      ) : (
        <CoverageTable rows={data.rows} />
      )}
    </div>
  );
}

const COVERAGE_PAGE_SIZES = [25, 50, 100] as const;

function CoverageTable({
  rows,
}: {
  rows: Awaited<ReturnType<typeof getAuditIndexCoverage>>["rows"];
}) {
  // Problems first: a page Google rejected is the reason to open this tab.
  const ordered = useMemo(
    () =>
      sort(
        rows,
        (a, b) =>
          rank(a.verdict, a.checkedAt, a.error) -
          rank(b.verdict, b.checkedAt, b.error),
      ),
    [rows],
  );
  /*
   * Paginated because this table grows with the audit, not with the quota.
   * It holds the pages Google has been asked about -- 53 today on a
   * 212-page site, and every one of them once the daily allowance catches
   * up. It was rendering `ordered.map(...)` with no cap at all.
   */
  const [pageSize, setPageSize] = useState<number>(COVERAGE_PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(ordered.length / pageSize));
  const current = Math.min(page, pageCount);
  const visible = ordered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <>
      {/* Framed like the Pages and Issues tables. This one sat on the page
          background, so switching tabs changed whether the results looked
          like a panel. */}
      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Sayfa</th>
              <th>Durum</th>
              <th>Google&apos;ın canonical&apos;ı</th>
              <th>Son tarama</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              // The server decides this, so the column and the tile above it
              // cannot drift apart again.
              const mismatch = row.canonicalMismatch;

              return (
                <tr key={row.url} className="group/row">
                  <td className="max-w-md">
                    <UrlCell url={row.url} label={pathOf(row.url)} />
                  </td>
                  <td>
                    <VerdictBadge
                      verdict={row.verdict}
                      coverageState={row.coverageState}
                      error={row.error}
                      checkedAt={row.checkedAt}
                    />
                  </td>
                  <td className="max-w-xs">
                    {mismatch && row.googleCanonical ? (
                      /* The value someone fixing a canonical mismatch has to
                         paste somewhere; it was only ever a title tooltip. */
                      <UrlCell
                        url={row.googleCanonical}
                        label={pathOf(row.googleCanonical)}
                        className="text-[var(--ink-warning)]"
                      />
                    ) : (
                      <span className="text-subtle">-</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap text-muted">
                    {row.lastCrawlTime
                      ? formatDateTime(row.lastCrawlTime)
                      : "-"}
                  </td>
                  <td>
                    {row.inspectionLink ? (
                      <a
                        href={row.inspectionLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        /*
                         * `aria-label`, not `title` alone: a title is only a
                         * fallback accessible name and several screen
                         * readers never expose it. The padding takes the
                         * 14px icon up to a 24px target.
                         */
                        className="link link-hover inline-flex size-6 items-center justify-center text-xs"
                        aria-label={`${row.url} adresini Search Console'da aç`}
                        title="Search Console'da aç"
                      >
                        <ExternalLink aria-hidden className="size-3.5" />
                      </a>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {ordered.length > COVERAGE_PAGE_SIZES[0] ? (
        <TablePagination
          page={current}
          pageSize={pageSize}
          pageSizes={COVERAGE_PAGE_SIZES}
          totalCount={ordered.length}
          hasNextPage={current < pageCount}
          isLoading={false}
          onPageChange={setPage}
          onPageSizeChange={(next) => {
            setPageSize(next);
            setPage(1);
          }}
        />
      ) : null}
    </>
  );
}

function VerdictBadge({
  verdict,
  coverageState,
  error,
  checkedAt,
}: {
  verdict: string | null;
  coverageState: string | null;
  error: string | null;
  checkedAt: string | null;
}) {
  if (error) {
    return (
      <span className={`badge badge-sm ${severityChip.error}`} title={error}>
        Hata
      </span>
    );
  }
  if (!checkedAt) {
    return <span className="text-xs text-muted">Sorulmadı</span>;
  }
  if (verdict === "PASS") {
    return (
      <span className="badge badge-sm border-success/30 bg-success/10 text-[var(--ink-success)]">
        Google&apos;da
      </span>
    );
  }
  /*
   * `summarizeCoverage` counts a missing or VERDICT_UNSPECIFIED verdict as
   * pending, on the stated grounds that calling it "not indexed" invents a
   * negative Google never gave. This badge had no such branch, so the same
   * row was pending in the tile and "Dizinde değil" in the table -- the tile
   * could read 0 while the row below it showed one.
   */
  if (!verdict || verdict === "VERDICT_UNSPECIFIED") {
    return (
      <span className="text-xs text-muted" title={coverageState ?? undefined}>
        Yanıt alınamadı
      </span>
    );
  }
  return (
    <span
      className="badge badge-sm border-warning/30 bg-warning/10 text-[var(--ink-warning)]"
      // Google's own sentence explains why, and it is more precise than
      // anything we could paraphrase.
      // Google's own wording, kept as the tooltip so the exact phrase is
      // still searchable when someone goes looking in Search Console.
      title={coverageState ?? undefined}
    >
      {coverageStateLabel(coverageState) ?? "Dizinde değil"}
    </span>
  );
}

/**
 * Not indexed, then errors, then unchecked, then indexed.
 *
 * `error` was described in this comment and never passed, so a URL Google
 * refused to answer about - one outside the verified property, say - landed
 * in bucket 0 alongside the pages Google looked at and excluded. Twenty-five
 * failed checks then scattered through the top of the table, above the real
 * findings.
 */
function rank(
  verdict: string | null,
  checkedAt: string | null,
  error: string | null,
): number {
  if (error) return 1;
  if (!checkedAt) return 2;
  if (verdict === "PASS") return 3;
  // Same rule as the badge and the tile: no verdict is not an exclusion, so
  // it does not sort above the pages Google actually looked at and excluded.
  if (verdict === "VERDICT_UNSPECIFIED") return 2;
  return 0;
}

function pathOf(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname + parsed.search || "/";
  } catch {
    return url;
  }
}
