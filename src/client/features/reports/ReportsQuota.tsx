import { t } from "@/shared/i18n";
import { QuotaCard } from "@/client/features/quotas/QuotaCard";
import { useQuotaStatus } from "@/client/features/quotas/useQuotaStatus";
import { usedFraction } from "@/server/features/quotas/quotaTypes";

/** Quiet by default: the report limits only show once one is 70% used. */
const REPORT_QUOTA_VISIBLE_FRACTION = 0.7;

export function ReportsQuota({ projectId }: { projectId: string }) {
  const query = useQuotaStatus(projectId, ["reports"]);
  const nearLimit = (query.data?.items ?? []).some((item) => {
    const fraction = usedFraction(item.used, item.limit);
    return fraction !== null && fraction >= REPORT_QUOTA_VISIBLE_FRACTION;
  });
  if (query.isError)
    return (
      <details className="text-sm text-muted">
        <summary>{t("Saklama durumu")}</summary>
        <p>
          {t(
            "Saklama bilgileri alınamadı. Bu durum boş alan olduğunu göstermez; bağlantıyı kontrol edip yeniden deneyin.",
          )}
        </p>
        <button
          type="button"
          className="btn min-h-11"
          onClick={() => void query.refetch()}
        >
          {t("Yeniden dene")}
        </button>
      </details>
    );
  if (!nearLimit) return null;
  return <QuotaCard projectId={projectId} kinds={["reports"]} />;
}
