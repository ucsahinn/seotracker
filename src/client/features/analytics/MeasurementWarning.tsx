import type { Ga4ReportMetadata } from "@/server/features/ga4/services/Ga4ReportNormalization";
import { t } from "@/shared/i18n";

/** Surface the reported limitation without inferring a collection or tag failure. */
export function MeasurementWarning({
  reports,
  unknown,
  onRetry,
  onOpenHealth,
}: {
  reports: Ga4ReportMetadata[];
  unknown: boolean;
  onRetry?: () => void;
  onOpenHealth?: () => void;
}) {
  const restricted = reports.some((r) => r.restrictedMetrics?.length);
  const reasons = [
    restricted
      ? t(
          "Bazı ölçümler hesap erişim kısıtı nedeniyle okunamadı. Analytics mülkündeki yetkinizi kontrol edin.",
        )
      : null,
    reports.some((r) => r.subjectToThresholding)
      ? t("Google gizlilik eşiği nedeniyle bazı verileri göstermiyor.")
      : null,
    reports.some((r) => r.sampling?.length)
      ? t("Google bu raporu örneklenmiş veriden hesapladı.")
      : null,
    reports.some((r) => r.dataLossFromOtherRow)
      ? t(
          "Bazı satırlar Google tarafından birleştirildi; ayrıntılar eksik olabilir.",
        )
      : null,
  ].filter(Boolean);
  if (!unknown && reasons.length === 0) return null;
  return (
    <div role="status" className="space-y-2 text-sm text-[var(--ink-warning)]">
      {reasons.length ? (
        reasons.map((reason) => <p key={reason}>{reason}</p>)
      ) : (
        <p>
          {t(
            "Bazı ölçümler belirlenemedi. Nedeni bilinmiyor; bu, hiç ziyaret olmadığı anlamına gelmez.",
          )}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {onRetry ? (
          <button
            type="button"
            className="btn btn-sm min-h-11"
            onClick={onRetry}
          >
            {t("Yeniden dene")}
          </button>
        ) : null}
        {onOpenHealth && (restricted || unknown) ? (
          <button
            type="button"
            className="btn btn-sm min-h-11"
            onClick={onOpenHealth}
          >
            {t("Ölçüm durumunu kontrol et")}
          </button>
        ) : null}
      </div>
    </div>
  );
}
