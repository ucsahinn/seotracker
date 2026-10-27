import { t } from "@/shared/i18n";
import { Link } from "@tanstack/react-router";
import type { OpportunityReport } from "@/client/features/opportunities/report";

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
    <div className="space-y-1.5 text-xs text-muted">
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
                "Analytics bu kez yanıt vermedi; tahminler yalnızca Search Console'dan.",
              )
            : t(
                "Tahmini değiştirmez; yanında bir etiket olarak durur. Bir sayfa en az {sessions} organik oturum aldıysa dönüşümlerine bakılır, daha azında oran gürültüdür. {matched} / {total} sayfanın Analytics karşılığı var.",
                {
                  sessions: method.valueMinSessions,
                  matched: coverage.matchedRows,
                  total: data.totalCandidateRows,
                },
              )}
      </p>
    </div>
  );
}
