import { QuotaCard } from "@/client/features/quotas/QuotaCard";
import { t } from "@/shared/i18n";
import { ProgressBar } from "@/client/components/ProgressBar";
import { notify } from "@/client/features/notifications/notify";
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

/** Pages one run of the button asks about; MAX_PER_RUN in gsc/indexCoverage.ts. */
const INSPECT_BATCH = 25;

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
}: {
  projectId: string;
  auditId: string;
  /** Hands the rows to the export menu a level up; undefined while loading. */
  onRowsChange?: (rows: CoverageRow[] | undefined) => void;
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
          t(
            "Search Console bağlı değil. Sayfaların Google'daki durumunu görmek için önce bağlayın.",
          ),
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
            t(
              "Google'ın günlük {limit} adres sınırı doldu. {count} sayfa sırada, sınır birkaç saat içinde yenilenir.",
              { limit: formatNumber(2000), count: result.remaining },
            ),
          );
        } else {
          toast.success(t("Tüm sayfalar güncel, sorulacak bir şey yok."));
        }
        return;
      }
      // Separate sentences, each translated whole.
      const sentences = [
        t("{count} sayfa soruldu.", { count: result.inspected }),
      ];
      if (result.remaining > 0) {
        sentences.push(t("{count} sayfa kaldı.", { count: result.remaining }));
      }
      // The daily cap is worth naming only when it is close enough to stop
      // the next run; otherwise it is a number nobody needs.
      if (result.quotaRemaining < 100) {
        sentences.push(
          t("Bugünkü kotadan {count} sorgu kaldı.", {
            count: result.quotaRemaining,
          }),
        );
      }
      notify({
        kind: "inspection",
        title: sentences.join(" "),
        importance: "low",
        projectId,
      });
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          t("Google'daki durum sorulamadı. Birazdan tekrar deneyin."),
        ),
      ),
    // URL Inspection spends the daily quota whether or not the call succeeds.
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["quotaStatus", projectId] }),
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
          title={t("Dizin durumu yüklenemedi")}
        />
      </div>
    );
  }

  if (!data || data.rows.length === 0) {
    return (
      <EmptyState
        icon={SearchCheck}
        title={t("Sorulacak sayfa yok")}
        description={t(
          "Bu denetimde Google'ın dizine alabileceği bir sayfa yok.",
        )}
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
          label={t("Google'ın farklı adresi seçtiği sayfalar")}
          value={neverChecked ? null : formatNumber(data.canonicalMismatches)}
          animateTo={{ value: data.canonicalMismatches, format: formatNumber }}
          /* The finding and the fix, with its base, rather than how the
             tile relates to the chart above it. */
          hint={
            data.canonicalMismatches > 0
              ? t(
                  "Kontrol edilen {checked} sayfa içinde. Google başka bir adresi asıl saydı: bu sayfaların canonical etiketini ve iç bağlantılarını kontrol edin.",
                  { checked: formatNumber(data.asked) },
                )
              : t(
                  "Kontrol edilen {checked} sayfanın hiçbirinde Google başka bir adresi asıl saymadı.",
                  { checked: formatNumber(data.asked) },
                )
          }
        />
        <MetricTile
          label={t("Henüz kontrol edilmedi")}
          value={formatNumber(data.due)}
          animateTo={{ value: data.due, format: formatNumber }}
          hint={
            data.lastCheckedAt
              ? t(
                  "Bu denetimin Google'a sorulmamış sayfaları. Son kontrol {date}",
                  {
                    date: formatDateTime(data.lastCheckedAt),
                  },
                )
              : t("Bu denetimin Google'a sorulmamış sayfaları.")
          }
        />
      </MetricRow>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {t(
            "Google günde en çok {limit} adres sormanıza izin verir. Her seferde {batch} sayfa kontrol edilir. Önce hiç sorulmamış olanlara, sonra Google'ın dizine almadıklarına bakılır.",
            { limit: formatNumber(2000), batch: formatNumber(INSPECT_BATCH) },
          )}
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
          {refresh.isPending
            ? t("Google'dan yanıt bekleniyor…")
            : t("Google'da durumunu kontrol et")}
        </button>
      </div>

      {refresh.isPending && (
        <ProgressBar
          // One run asks at most a batch; `due` is what was waiting when it
          // started, so the smaller of the two is how many are in flight.
          label={t("{count} sayfa soruluyor", {
            count: formatNumber(Math.min(data.due, INSPECT_BATCH)),
          })}
          indeterminate
          showPercent={false}
        />
      )}

      <QuotaCard
        projectId={projectId}
        kinds={["url_inspection"]}
        refreshable={false}
      />

      {neverChecked ? (
        <EmptyState
          icon={SearchCheck}
          title={t("Henüz kontrol edilmedi")}
          description={t(
            "Taradığınız sayfaların gerçekten dizine girip girmediğini görmek için yukarıdaki düğmeyi kullanın.",
          )}
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
