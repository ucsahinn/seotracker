import type { Ga4ReportMetadata } from "@/server/features/ga4/services/Ga4ReportNormalization";
import { t } from "@/shared/i18n";
import { formatDate } from "@/shared/format";
import type { getGa4DashboardReport } from "@/serverFunctions/ga4";
type Report = Extract<
  Awaited<ReturnType<typeof getGa4DashboardReport>>,
  { connected: true }
>;
export function Ga4Provenance({ report }: { report: Report }) {
  return (
    <div className="space-y-2 text-xs text-muted">
      <p>
        {t(
          "Mülk kapsamı: tüm ana makineler ve akışlar. Bu toplam yalnızca projenin sitesine ait olmayabilir.",
        )}
      </p>
      <p>
        {formatDate(report.resolvedDateRange.startDate)} –{" "}
        {formatDate(report.resolvedDateRange.endDate)} ·{" "}
        {report.propertyTimeZone ?? t("Saat dilimi bilinmiyor")}
      </p>
      <p>
        {t("Önceki dönem: {start} – {end}.", {
          start: formatDate(report.previousDateRange.startDate),
          end: formatDate(report.previousDateRange.endDate),
        })}
      </p>
      <p>
        {t(
          "Google arama tıklamaları ile organik oturumlar farklı ölçümlerdir; Analytics diğer arama motorlarını da kapsar.",
        )}
      </p>
      {report.reportMetadata.hasLimitedData ||
      report.warnings.length > 0 ||
      report.totals.sessions === null ? (
        <p role="status" className="text-[var(--ink-warning)]">
          {t(
            "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.",
          )}
        </p>
      ) : null}
      {report.reportMetadata.reports.some(
        (r: Ga4ReportMetadata) => r.subjectToThresholding,
      ) ? (
        <p>{t("Google gizlilik eşiği nedeniyle bazı verileri göstermiyor.")}</p>
      ) : null}
      {report.reportMetadata.reports.some(
        (r: Ga4ReportMetadata) => r.sampling.length > 0,
      ) ? (
        <p>{t("Google bu raporu örneklenmiş veriden hesapladı.")}</p>
      ) : null}
      {report.reportMetadata.reports.some(
        (r: Ga4ReportMetadata) => r.restrictedMetrics.length > 0,
      ) ? (
        <p>
          {t(
            "Bazı ölçümler hesap erişim kısıtı nedeniyle okunamadı. Analytics mülkündeki yetkinizi kontrol edin.",
          )}
        </p>
      ) : null}
      {report.reportMetadata.reports.some(
        (r: Ga4ReportMetadata) => r.dataLossFromOtherRow,
      ) ? (
        <p>
          {t(
            "Bazı satırlar Google tarafından birleştirildi; ayrıntılar eksik olabilir.",
          )}
        </p>
      ) : null}
    </div>
  );
}
