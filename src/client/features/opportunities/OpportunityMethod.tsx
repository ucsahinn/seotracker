import { t } from "@/shared/i18n";
import { Link } from "@tanstack/react-router";
import type { OpportunityReport } from "@/client/features/opportunities/report";
import { formatCount } from "@/client/lib/format";

/** How the number is made, and what it leaves out, in plain words. */
export function OpportunityMethod({
  data,
  projectId,
}: {
  data: OpportunityReport;
  projectId: string;
}) {
  const { method, analytics, coverage } = data;
  return (
    <details className="rounded-box border border-base-300 bg-base-100 p-4 text-sm text-muted">
      <summary className="min-h-11 cursor-pointer font-medium text-base-content">
        {t("Veri kapsamı ve hesaplama")}
      </summary>
      <div className="max-w-[75ch] space-y-3 leading-relaxed">
        <p>
          {t(
            "Hesaplanan kazanç yalnızca alınan ve tanımlanabilen aramaları kapsar; gizli sorguların payı bilinmiyor. Panelin sorgu tahminiyle toplanmaz.",
          )}
        </p>
        <p>
          {t(
            "Ek kazanç hesaplanmayan: {zero}; gösterimi yetersiz: {small}; karşılaştırılacak tıklama oranı olmayan: {curve}; tahmine uygun araması olmayan sayfa: {pairs}.",
            {
              zero: formatCount(data.totals.reasons.calculableZero),
              small: formatCount(data.totals.reasons.belowThreshold),
              curve: formatCount(data.totals.reasons.insufficientTargetCurve),
              pairs: formatCount(data.totals.reasons.missingQueryPairs),
            },
          )}
        </p>
        {data.truncated.gsc ? (
          <p role="status">
            {t(
              "Search Console satır sınırına ulaşıldı; toplamlar tüm siteyi kapsamaz.",
            )}
          </p>
        ) : null}
        {data.truncated.ga4 ||
        data.reportMetadata?.hasLimitedData ||
        data.warnings.length > 0 ? (
          <p role="status">
            {t(
              "Analytics verisi sınırlı; eksik ölçümler sıfır değildir ve dönüşüm yorumu yapılamayabilir.",
            )}
          </p>
        ) : null}
        <p>
          {data.request.searchConsoleTimeZone} ·{" "}
          {data.request.googleAnalyticsTimeZone ?? "–"} ·{" "}
          {t(
            "Aynı takvim günleri farklı saat dilimlerinde aynı an aralığı değildir. Analytics, tüm Organic Search kanalını kapsar.",
          )}
        </p>
        <p>
          <span className="font-medium text-base-content">
            {t("Tahmin nasıl yapılır?")}
          </span>{" "}
          {t(
            "Her sayfanın Google'da çıktığı her arama ayrı ayrı ele alınır. İlk sayfadaki bir arama sitenizin aynı sıradaki aramalarının tıklama oranının %70'inin altındaysa kazanç o orana ulaşmaktır (başlık işi). Diğer her arama yalnızca bir basamak yükselir: 6-10. sıradan 4-5'in oranına, 4-5. sıradan 2-3'ün oranına, 2. sayfadan ilk sayfanın (6-10. sıra) oranına, daha geriden 2. sayfanın (11-20. sıra) oranına. Bir sayfanın toplamı, aramaları sıra gruplarına ayrılıp her grup bir basamak yükselse alacağı ek tıklamayı geçemez. Oranlar başka sitelerden değil, sizin sitenizden ölçülür; bu yüzden üstteki sayı bir üst sınırdır, söz değildir.",
          )}
        </p>
        <p>
          <span className="font-medium text-base-content">
            {t("Marka aramaları")}
          </span>{" "}
          {method.brandSource === "confirmed"
            ? t(
                "Hesaba katılmadı ({terms}). Markanızı arayan sizi zaten bulur; onların yüksek tıklama oranı diğer aramaları haksız yere düşük gösterirdi.",
                { terms: method.brandTerms.join(", ") },
              )
            : method.brandSource === "suggested"
              ? t(
                  "Alan adınızdan tahmin edilen terimlerle ayrıldı ({terms}). Doğru terimleri Arama performansı ekranında onaylayabilirsiniz.",
                  { terms: method.brandTerms.join(", ") },
                )
              : t(
                  "Marka terimi tanımlı değil, bu yüzden marka aramaları da karşılaştırmaya dahil. Arama performansı ekranında tanımlayabilirsiniz.",
                )}{" "}
          {method.brandSource === "confirmed" ? null : (
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              className="link"
            >
              {t("Arama performansını aç")}
            </Link>
          )}
        </p>
        <p>
          <span className="font-medium text-base-content">
            {t("Analytics ne katıyor?")}
          </span>{" "}
          {analytics.state === "not_connected"
            ? t(
                "Analytics bağlı değil. Bağlarsanız her sayfanın dönüşüm getirip getirmediği tahminin yanında görünür.",
              )
            : analytics.state === "unavailable"
              ? t(
                  analytics.code === "ga4_quota_exhausted"
                    ? "Analytics kotası doldu. Bir süre bekleyip Yenile’ye basın."
                    : analytics.code === "ga4_reconnect_required" ||
                        analytics.code === "ga4_property_inaccessible"
                      ? "Analytics izni veya mülk erişimi yok. Bağlantıları ayarla ekranında erişimi doğrulayın."
                      : "Analytics yanıtı okunamadı. İnternet bağlantısını kontrol edip Yenile’ye basın.",
                )
              : data.totalCandidateRows === 0
                ? t(
                    "Tahmini değiştirmez; yanında bir etiket olarak durur. Bu dönemde tahmin edilebilen sayfa olmadığı için eşleştirilecek bir şey yok.",
                  )
                : t(
                    "Tahmini değiştirmez; yanında bir etiket olarak durur. Bir sayfa en az {sessions} organik oturum aldıysa dönüşümlerine bakılır, daha azında oran gürültüdür. {matched} / {total} sayfanın Analytics karşılığı var.",
                    {
                      sessions: formatCount(method.valueMinSessions),
                      matched: formatCount(coverage.matchedRows),
                      total: formatCount(data.totalCandidateRows),
                    },
                  )}
        </p>
        {analytics.code ? (
          <p>
            {analytics.code}{" "}
            {analytics.code === "ga4_reconnect_required" ||
            analytics.code === "ga4_property_inaccessible" ? (
              <Link
                to="/p/$projectId/settings/integrations"
                params={{ projectId }}
                className="link"
              >
                {t("Bağlantıları ayarla")}
              </Link>
            ) : null}
          </p>
        ) : null}
      </div>
    </details>
  );
}
