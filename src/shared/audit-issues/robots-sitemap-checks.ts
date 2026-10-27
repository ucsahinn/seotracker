/**
 * Checks on what robots.txt and the sitemap say about the site as a whole,
 * added after the site facts (so each audit records whether it measured
 * them; see `recorded-checks.ts`).
 */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const ROBOTS_SITEMAP_CHECK_ISSUES = {
  "sitemap-off-host-urls": {
    severity: "warning",
    title: "Site haritasında başka bir siteye ait adresler var",
    explanation:
      "Site haritanız bu sitenin değil, başka bir alan adının adreslerini listeliyor. Google bir site haritasındaki adresleri yalnızca haritayla aynı sitedeyse kabul eder; diğer sitenin robots.txt dosyası bu haritayı göstermiyorsa ya da o site Search Console'da sizin adınıza doğrulanmamışsa bu adresleri yok sayar.",
    howToFix:
      "Site haritasını, adreslerin ait olduğu sitede yayınlayın ya da haritayı üreten ayarda sitenin adresini düzeltin (çoğu zaman eski bir alan adı ya da önizleme adresi kalmıştır). Bilerek başka siteye ait adresleri listeliyorsanız o sitenin robots.txt dosyasına bu haritayı gösteren bir Sitemap satırı ekleyin.",
  },
  "sitemap-unreadable": {
    severity: "warning",
    title: "Site haritası dosyası okunamadı",
    explanation:
      "robots.txt dosyanızın ya da bir site haritası dizininin gösterdiği bir site haritası dosyasından hiç adres okunamadı. Ayrıntıda hangi dosya olduğu ve nedeni yazıyor: hata kodu, zaman aşımı, bağlantı hatası, siteden çıkan yönlendirme, XML olmayan içerik ya da boş liste. O dosyadaki sayfalar bu denetime site haritasından girmedi; Google da aynı hatayı görüyorsa onları da okuyamıyor olabilir.",
    howToFix:
      "Ayrıntıdaki adresi tarayıcıda açın. Hata kodu ya da yönlendirme varsa dosyayı doğru adreste yayınlayın veya robots.txt ve site haritası dizinindeki satırı düzeltin. Zaman aşımı ya da bağlantı hatası çoğu zaman geçicidir; denetimi yeniden çalıştırın, sürerse sunucunun yanıt süresine bakın. Search Console'daki Site Haritaları raporu Google'ın gördüğünü gösterir.",
  },
  "robots-googlebot-only-paths": {
    severity: "info",
    title: "robots.txt bazı yolları yalnızca Googlebot'a açıyor",
    explanation:
      "robots.txt dosyanız bazı yolları tüm botlara (User-agent: *) kapatıyor ama Googlebot'a ayrıca izin veriyor. Bu araç Googlebot değil, o yüzden bu yollardaki sayfaları taramadı; denetimde görünmemeleri sorun olmadıkları anlamına gelmez. Google bu sayfaları tarayabilir.",
    howToFix:
      "Bir şey yapmanız gerekmiyor. Bu sayfaları da denetlemek istiyorsanız ayrıntıdaki kuralları gözden geçirin; yalnızca Googlebot'a açık bırakmanın bir nedeni yoksa kuralı tüm botlar için aynı yapın.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
