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
 * explanation says these are lab measurements from PageSpeed Insights, not
 * what the site's visitors experienced. The distinction matters: Google
 * ranks on field data, and a lab number is a reproducible proxy for it.
 */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const SPEED_ISSUES = {
  "cwv-lcp-poor": {
    severity: "warning",
    title: "En büyük içerik çok geç geliyor (LCP)",
    explanation:
      "Sayfanın en büyük görsel öğesi 4 saniyeden geç yerleşti. Google bu eşiği 'zayıf' sayar ve LCP, sayfa deneyimi sinyallerinden biridir. Ölçüm PageSpeed Insights laboratuvarından gelir; ziyaretçilerinizin gerçek süresi değildir, ama tekrarlanabilir bir göstergesidir.",
    howToFix:
      "En büyük öğenin ne olduğunu PageSpeed Insights raporunda görün. Genelde bir kapak görseli ya da başlık metni olur: görseli sıkıştırıp modern bir biçime geçirin, ilk ekrandaki görsele yükleme önceliği verin, ve o öğeyi geciktiren yazı tipi ile betikleri erteleyin.",
  },
  "cwv-cls-poor": {
    severity: "warning",
    title: "Sayfa yerleşimi kayıyor (CLS)",
    explanation:
      "Sayfa yüklenirken içerik 0,25'ten fazla yer değiştirdi; Google bu eşiği 'zayıf' sayar. Okumaya başlayan biri metnin altından kaymasıyla yanlış yere tıklar. Ölçüm laboratuvar ölçümüdür.",
    howToFix:
      "Görsellere ve gömülü çerçevelere genişlik ve yükseklik verin, reklam ve banner alanları için yer ayırın, ve sonradan yüklenen yazı tiplerinde yerleşimi bozmayan bir yedek yazı tipi tanımlayın.",
  },
  "cwv-inp-poor": {
    severity: "warning",
    title: "Etkileşime yanıt yavaş (INP)",
    explanation:
      "Sayfa bir etkileşime yanıt vermek için 500 milisaniyeden uzun sürdü; Google bu eşiği 'zayıf' sayar. INP, 2024'te FID'in yerini alan sayfa deneyimi ölçüsüdür. Ölçüm laboratuvar ölçümüdür.",
    howToFix:
      "Ana iş parçacığını uzun süre meşgul eden betikleri bulun. Genelde suçlu üçüncü taraf etiketleri ve büyük paketlerdir: gereksizleri kaldırın, kalanları erteleyin, uzun işleri parçalara bölün.",
  },
  "lighthouse-seo-low": {
    severity: "warning",
    title: "Lighthouse SEO puanı düşük",
    explanation:
      "PageSpeed Insights'ın SEO denetimi bu sayfada 90'ın altında bir puan verdi. Bu denetim tarayıcının baktığından farklı şeylere de bakar: bağlantı metinleri, dokunma hedefi boyutları, eklenti kullanımı, robots yönergeleri. Puan bir sıralama sinyali değildir; hangi kontrollerin düştüğünü gösteren bir işarettir.",
    howToFix:
      "Bu sayfayı PageSpeed Insights'ta açıp SEO bölümündeki düşen kontrollere bakın. Her biri neyin eksik olduğunu adıyla söyler.",
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
