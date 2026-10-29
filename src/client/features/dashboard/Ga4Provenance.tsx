import type { Ga4ReportMetadata } from "@/server/features/ga4/services/Ga4ReportNormalization";
import { t } from "@/shared/i18n";
import { formatDate } from "@/shared/format";
import { FactStrip } from "@/client/components/FactStrip";
import type { getGa4DashboardReport } from "@/serverFunctions/ga4";
type Report = Extract<
  Awaited<ReturnType<typeof getGa4DashboardReport>>,
  { connected: true }
>;
export function Ga4Provenance({ report }: { report: Report }) {
  const limited =
    report.reportMetadata.hasLimitedData ||
    report.warnings.length > 0 ||
    report.totals.sessions === null;
  return (
    <FactStrip
      label={t("Verinin durumu")}
      facts={[
        {
          label: t("Kaynak"),
          value: "Google Analytics",
          hint: limited ? t("Yetersiz veri") : undefined,
          tone: limited ? "warning" : undefined,
        },
        {
          label: t("Dönem"),
          value: `${formatDate(report.resolvedDateRange.startDate)} – ${formatDate(report.resolvedDateRange.endDate)}`,
        },
        {
          label: t("Karşılaştırma"),
          value: `${formatDate(report.previousDateRange.startDate)} – ${formatDate(report.previousDateRange.endDate)}`,
        },
        {
          label: t("Saat dilimi"),
          value: report.propertyTimeZone ?? t("Saat dilimi bilinmiyor"),
        },
      ]}
      detailsLabel={t("Veri hakkında")}
      details={
        <div className="max-w-prose space-y-4 text-sm text-muted">
          <p>
            {t(
              "Mülk kapsamı: tüm ana makineler ve akışlar. Bu toplam yalnızca projenin sitesine ait olmayabilir.",
            )}
          </p>
          <p>
            {t(
              "Google arama tıklamaları ile organik oturumlar farklı ölçümlerdir; Analytics diğer arama motorlarını da kapsar.",
            )}
          </p>
          {limited ? (
            <p role="status" className="text-[var(--ink-warning)]">
              {t(
                "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.",
              )}
            </p>
          ) : null}
          {report.reportMetadata.reports.some(
            (r: Ga4ReportMetadata) => r.subjectToThresholding,
          ) ? (
            <p>
              {t("Google gizlilik eşiği nedeniyle bazı verileri göstermiyor.")}
            </p>
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
      }
    />
  );
}
