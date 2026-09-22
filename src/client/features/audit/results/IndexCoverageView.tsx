import { coverageStateLabel } from "@/shared/gsc-coverage-states";
import { sort } from "remeda";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Loader2, RefreshCw, SearchCheck } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/client/components/EmptyState";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatDateTime, formatNumber } from "@/client/lib/format";
import {
  getAuditIndexCoverage,
  refreshAuditIndexCoverage,
} from "@/serverFunctions/indexCoverage";

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
}: {
  projectId: string;
  auditId: string;
}) {
  const queryClient = useQueryClient();
  const queryKey = ["indexCoverage", projectId, auditId] as const;

  const coverage = useQuery({
    queryKey,
    queryFn: () => getAuditIndexCoverage({ data: { projectId, auditId } }),
  });

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
      <div className="alert alert-error">
        {getStandardErrorMessage(coverage.error)}
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

  return (
    <div className="space-y-4">
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
          disabled={refresh.isPending || data.due === 0}
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

function CoverageTable({
  rows,
}: {
  rows: Awaited<ReturnType<typeof getAuditIndexCoverage>>["rows"];
}) {
  // Problems first: a page Google rejected is the reason to open this tab.
  const ordered = sort(
    rows,
    (a, b) =>
      rank(a.verdict, a.checkedAt, a.error) -
      rank(b.verdict, b.checkedAt, b.error),
  );

  return (
    <div className="overflow-x-auto">
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
          {ordered.map((row) => {
            // The server decides this, so the column and the tile above it
            // cannot drift apart again.
            const mismatch = row.canonicalMismatch;

            return (
              <tr key={row.url}>
                <td className="max-w-md">
                  <span className="block truncate" title={row.url}>
                    {pathOf(row.url)}
                  </span>
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
                  {mismatch ? (
                    <span
                      className="block truncate text-warning"
                      title={row.googleCanonical ?? undefined}
                    >
                      {pathOf(row.googleCanonical ?? "")}
                    </span>
                  ) : (
                    <span className="text-subtle">-</span>
                  )}
                </td>
                <td className="whitespace-nowrap text-muted">
                  {row.lastCrawlTime ? formatDateTime(row.lastCrawlTime) : "-"}
                </td>
                <td>
                  {row.inspectionLink ? (
                    <a
                      href={row.inspectionLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link link-hover inline-flex items-center gap-1 text-xs"
                      title="Search Console'da aç"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
      <span className="badge badge-sm badge-error badge-outline" title={error}>
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
