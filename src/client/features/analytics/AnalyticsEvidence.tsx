import type { ReportResult } from "./ReportView";
import { DataTruncationNotice } from "./DataTruncationNotice";
import { formatCount, formatDate, formatPercent } from "@/shared/format";
import { t } from "@/shared/i18n";

const diagnosticCopy: Record<string, string> = {
  attribution_not_set_share_high:
    "Kaynak / ortam bilgisi olmayan oturumlar var; bağlantı etiketlerini inceleyin. Bu, tek başına ölçüm hatası kanıtı değildir.",
  internal_referral_traffic_detected:
    "Yerel ağ kaynaklı yönlendirmeler kaydedildi; kaynak / ortam satırlarını inceleyin.",
  source_medium_case_variants_detected:
    "Kaynak / ortam adlarının büyük ve küçük harfli çeşitleri var; kampanya etiketlerini tutarlı kullanın.",
  no_ecommerce_activity:
    "Bu dönem ve kanalda eşleşen e-ticaret etkinliği ölçülmedi; bu, mağaza olmadığı anlamına gelmez.",
  no_site_search_activity:
    "Bu dönemde ölçülmüş arama sonucu olayı yok; arama ölçüm ayarlarını kontrol edin.",
};
export function AnalyticsEvidence({
  result,
  onOpenHealth,
}: {
  result: ReportResult;
  onOpenHealth?: () => void;
}) {
  const meta = result.reportMetadata;
  const limited =
    meta?.hasLimitedData ||
    result.sampled ||
    result.thresholded ||
    result.warnings?.includes("property_time_zone_changed");
  const diagnostics =
    limited || result.diagnosticCoverage?.complete === false
      ? []
      : (result.diagnostics ?? [])
          .filter((d) => typeof d.code === "string" && diagnosticCopy[d.code])
          .slice(0, 2);
  return (
    <div className="space-y-2 text-xs text-muted">
      {result.warnings?.includes("property_time_zone_changed") ? (
        <p role="status">
          {t(
            "Mülkün saat dilimi değişmiş; bağlantı ayarlarını yenileyip tarihleri yeniden kontrol edin.",
          )}
        </p>
      ) : null}
      <p>
        {t(
          "Mülk kapsamı: tüm ana makineler ve akışlar. Bu toplam yalnızca projenin sitesine ait olmayabilir.",
        )}
      </p>
      <p>
        {t(
          "Son günler yeniden işlenebilir; dün, tamamlanmış bir takvim günüdür, kesinleşmiş veri garantisi değildir.",
        )}
      </p>
      <p>
        {result.channel === "all"
          ? t("Tüm trafik")
          : t("Organik arama motorları")}{" "}
        · {result.propertyTimeZone ?? t("Saat dilimi bilinmiyor")}
      </p>
      {result.warnings?.includes("end_date_clamped") ? (
        <p role="status">
          {t(
            "Bitiş tarihi, mülkün saat diliminde düne çekildi; gösterilen tarihleri kullanın.",
          )}
        </p>
      ) : null}
      {limited ? (
        <p role="status" className="text-[var(--ink-warning)]">
          {t(
            "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.",
          )}
        </p>
      ) : null}
      <DataTruncationNotice reasons={meta?.dataTruncationReasons} />
      <details>
        <summary className="min-h-11 cursor-pointer py-3">
          {t("Veri ayrıntıları")}
        </summary>
        <p>
          {formatDate(result.dateRange.startDate)} –{" "}
          {formatDate(result.dateRange.endDate)}
        </p>
        {result.diagnosticCoverage ? (
          <p>
            {t("İnceleme kapsamı: {shown} / {total} satır.", {
              shown: formatCount(result.diagnosticCoverage.fetchedRowCount),
              total: formatCount(result.diagnosticCoverage.totalRowCount),
            })}
          </p>
        ) : null}
        {result.activityStatus === "unknown" ? (
          <p>
            {t(
              "Etkinlik durumu bilinmiyor; rapor sınırlı veya eksik. Dönemi ve ölçüm ayarlarını kontrol edin.",
            )}
          </p>
        ) : null}
        {meta?.dataLossFromOtherRow ? (
          <p>
            {t(
              "Bazı satırlar Google tarafından birleştirildi; ayrıntılar eksik olabilir.",
            )}
          </p>
        ) : null}
        {meta?.subjectToThresholding ? (
          <p>
            {t("Google gizlilik eşiği nedeniyle bazı verileri göstermiyor.")}
          </p>
        ) : null}
        {meta?.restrictedMetrics.length ? (
          <p>
            {t(
              "Bazı ölçümler hesap erişim kısıtı nedeniyle okunamadı. Analytics mülkündeki yetkinizi kontrol edin.",
            )}{" "}
            {meta.restrictedMetrics.map((r) => r.metricName).join(", ")}
          </p>
        ) : null}
        {meta?.sampling.map((s, i) => (
          <p key={i}>
            {t("Google bu raporu örneklenmiş veriden hesapladı.")}{" "}
            {formatCount(Number(s.samplesReadCount))} /{" "}
            {formatCount(Number(s.samplingSpaceSize))} (
            {Number(s.samplingSpaceSize) > 0
              ? formatPercent(
                  Number(s.samplesReadCount) / Number(s.samplingSpaceSize),
                )
              : "–"}
            )
          </p>
        ))}
      </details>
      {diagnostics.map((d, i) => (
        <div key={i} className="rounded-box border border-base-300 p-3">
          <p>{t(diagnosticCopy[d.code])}</p>
          {d.sessions !== null ? (
            <p>
              {t("{count} oturum", { count: d.sessions })}
              {d.share !== null ? " · " + formatPercent(d.share) : ""}
            </p>
          ) : null}
          {d.code.startsWith("no_") && onOpenHealth ? (
            <button
              type="button"
              className="btn btn-sm mt-2 min-h-11"
              onClick={onOpenHealth}
            >
              {t("Ölçüm durumunu kontrol et")}
            </button>
          ) : (
            <a
              className="link inline-flex min-h-11 items-center"
              href="#analytics-table"
            >
              {t("Listele")}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
