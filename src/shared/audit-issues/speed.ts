/**
 * What the speed measurement found, as findings rather than as scores.
 *
 * `audit_lighthouse_results` has stored PageSpeed Insights scores and Core
 * Web Vitals since the Lighthouse phase was built, and not one of them
 * produced an issue: the numbers sat on their own tab, outside the issue
 * list, the severity rollup, the CSV export and the MCP issue tool. A page
 * with a four-second LCP was a green audit.
 *
 * Every threshold here is Google's own "poor" boundary, and every
 * explanation says where the number comes from (lab run or Chrome field
 * data) via PageSpeed Insights. The distinction matters: Google uses field
 * data, and a lab number is a reproducible proxy for it.
 */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const SPEED_ISSUES = {
  "cwv-lcp-poor": {
    severity: "warning",
    title: "Sayfanın ana içeriği geç yükleniyor (LCP)",
    explanation:
      "Sayfanın en büyük öğesi (genelde kapak görseli ya da ana başlık) 4 saniyeden geç göründü. Google bu süreyi 'zayıf' sayar. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır. Bu, PageSpeed Insights'ın laboratuvar ölçümüdür; ziyaretçilerinizin gerçek süresi değil, ama onun güvenilir bir göstergesidir.",
    howToFix:
      "PageSpeed Insights raporunda en büyük öğenin ne olduğuna bakın. Genelde bir görseldir: görseli küçültüp WebP gibi hafif bir biçime çevirin, ilk ekrandaki görselin geç yüklenmesini kapatın ve sayfayı yavaşlatan betik ve yazı tiplerini erteleyin.",
  },
  "cwv-cls-poor": {
    severity: "warning",
    title: "Sayfa yüklenirken içerik kayıyor (CLS)",
    explanation:
      "Sayfa yüklenirken içerik 0,25'ten fazla kaydı; Google bu değeri 'zayıf' sayar. Okurken metin kayınca ziyaretçi yanlış yere tıklar. Bu, laboratuvar ölçümüdür.",
    howToFix:
      "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, reklam ve afiş alanları için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek yazı tipi tanımlayın.",
  },
  "cwv-inp-poor": {
    severity: "warning",
    title: "Sayfa tıklamalara geç yanıt veriyor (INP)",
    explanation:
      "Sayfa bir tıklamaya ya da dokunuşa 500 milisaniyeden geç yanıt verdi; Google bu süreyi 'zayıf' sayar. Bu ölçü (INP) 2024'ten beri Core Web Vitals'ın parçasıdır. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarından toplanan gerçek (alan) veridir.",
    howToFix:
      "Sayfayı en çok meşgul eden betikleri bulun; genelde üçüncü taraf etiketler (reklam, sohbet, takip kodu) ve büyük betik paketleridir. Gereksizleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin.",
  },
  "lighthouse-seo-low": {
    severity: "warning",
    title: "Google'ın SEO denetim puanı düşük",
    explanation:
      "PageSpeed Insights'ın SEO denetimi bu sayfaya 90'ın altında puan verdi. Bu denetim başlık, meta açıklama, bağlantı metinleri, taranabilirlik (robots, HTTP durum kodu), geçerli canonical ve hreflang gibi temel kontrollere bakar. Puanın kendisi sıralamayı etkilemez; hangi kontrollerin başarısız olduğunu gösterir.",
    howToFix:
      "Sayfayı PageSpeed Insights'ta açın ve SEO bölümünde başarısız görünen kontrollere bakın. Her biri neyin eksik olduğunu adıyla söyler; başarısız kontroller düzelince puan yükselir.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;

/** Google's "poor" boundaries. Everything below these is not reported. */
export const CWV_POOR = {
  lcpMs: 4000,
  cls: 0.25,
  inpMs: 500,
} as const;

/** Lighthouse calls 90 and above "good"; below it, something is failing. */
export const SEO_SCORE_FLOOR = 90;
