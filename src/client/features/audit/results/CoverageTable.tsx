import { sort } from "remeda";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { coverageStateLabel } from "@/shared/gsc-coverage-states";
import { TablePagination } from "@/client/components/table/TablePagination";
import { formatCount, formatDateTime } from "@/client/lib/format";
import { UrlCell } from "@/client/components/table/UrlCell";
import { severityChip } from "@/client/features/audit/shared";
import { coverageReasons } from "@/client/features/audit/results/coverageReasons";
import type { getAuditIndexCoverage } from "@/serverFunctions/indexCoverage";

const COVERAGE_PAGE_SIZES = [25, 50, 100] as const;

export function CoverageTable({
  rows,
  filtered,
  onClearFilter,
}: {
  rows: Awaited<ReturnType<typeof getAuditIndexCoverage>>["rows"];
  /** True when the donut has narrowed `rows` to one group. */
  filtered: boolean;
  onClearFilter: () => void;
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
      {filtered ? (
        <div className="flex items-center justify-between gap-2 rounded-box border border-base-300 bg-base-200/40 px-3 py-2 text-sm">
          <span className="text-muted">
            {formatCount(rows.length)} sayfa gösteriliyor
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={onClearFilter}
          >
            Tümünü göster
          </button>
        </div>
      ) : null}
      {/* Framed like the Pages and Issues tables. This one sat on the page
          background, so switching tabs changed whether the results looked
          like a panel. */}
      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Sayfa</th>
              <th>Durum</th>
              <th>Sebep</th>
              <th>Google&apos;ın seçtiği adres</th>
              <th>Google&apos;ın son ziyareti</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              // The server decides this, so the column and the tile above it
              // cannot drift apart again.
              const mismatch = row.canonicalMismatch;
              const reasons = coverageReasons(row);

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
                  {/*
                   * Google's own machine-readable answer. `coverageState`
                   * -- the only thing this table showed -- is a free-form
                   * sentence Google reformats and localises; these enums
                   * say why, and they were fetched, stored and shipped here
                   * without ever being rendered.
                   */}
                  <td className="max-w-xs">
                    {reasons.length > 0 ? (
                      <ul className="space-y-0.5 text-xs text-muted">
                        {reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-subtle">-</span>
                    )}
                  </td>
                  <td className="max-w-xs">
                    {mismatch && row.googleCanonical ? (
                      /* The value someone fixing a canonical mismatch has to
                         paste somewhere; it was only ever a title tooltip. */
                      <div className="space-y-0.5">
                        <UrlCell
                          url={row.googleCanonical}
                          label={pathOf(row.googleCanonical)}
                          className="text-[var(--ink-warning)]"
                        />
                        {/* Both sides of the mismatch. The tile above says
                            one exists; without the declared value the reader
                            had to download the CSV to see what it was. */}
                        {row.userCanonical ? (
                          <p className="truncate text-xs text-muted">
                            Sizin seçtiğiniz: {pathOf(row.userCanonical)}
                          </p>
                        ) : null}
                      </div>
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
    return <span className="text-xs text-muted">Kontrol edilmedi</span>;
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
