type CoverageRow = Awaited<
  ReturnType<typeof getAuditIndexCoverage>
>["rows"][number];
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, RefreshCw, SearchCheck } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatDateTime, formatNumber } from "@/client/lib/format";
import {
  getAuditIndexCoverage,
  refreshAuditIndexCoverage,
} from "@/serverFunctions/indexCoverage";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { CoverageTable } from "@/client/features/audit/results/CoverageTable";
import { CoverageVerdictDonut } from "@/client/features/audit/results/CoverageVerdictDonut";
import {
  coverageBucket,
  countCoverage,
  type CoverageBucket,
} from "@/client/features/audit/results/coverageBuckets";

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
  // Set by the donut; the table below shows only this group. Null is all.
  const [bucket, setBucket] = useState<CoverageBucket | null>(null);
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
          "Search Console bağlı değil. Google'da durumunu kontrol etmeden önce bağlamanız gerekiyor.",
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
  const allRows = data?.rows;
  const bucketCounts = useMemo(() => countCoverage(allRows ?? []), [allRows]);
  const visibleRows = useMemo(
    () =>
      bucket === null
        ? (allRows ?? [])
        : (allRows ?? []).filter((row) => coverageBucket(row) === bucket),
    [allRows, bucket],
  );

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

  return (
    <div className="space-y-4">
      {neverChecked ? null : (
        <CoverageVerdictDonut
          counts={bucketCounts}
          selected={bucket}
          onSelect={setBucket}
        />
      )}
      <MetricRow>
        <MetricTile
          label="Canonical uyuşmazlığı"
          value={neverChecked ? null : formatNumber(data.canonicalMismatches)}
          hint={
            data.canonicalMismatches > 0
              ? "Google, sizin seçtiğiniz adres yerine başka bir sayfayı ana sayfa saydı"
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
          Google, günde en fazla 2000 adresin durumunu sormanıza izin verir. Her
          tıklamada 25 sayfa sorulur: önce hiç sorulmamışlar, sonra
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
          Google'da durumunu kontrol et
        </button>
      </div>

      {neverChecked ? (
        <EmptyState
          icon={SearchCheck}
          title="Google'a henüz sorulmadı"
          description="Taradığınız sayfaların gerçekten dizine girip girmediğini görmek için yukarıdaki düğmeyi kullanın."
        />
      ) : (
        <CoverageTable
          rows={visibleRows}
          filtered={bucket !== null}
          onClearFilter={() => setBucket(null)}
        />
      )}
    </div>
  );
}
