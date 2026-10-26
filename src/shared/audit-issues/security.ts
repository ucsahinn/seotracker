/** Transport security, response headers, DNS mail records and expiry dates. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const SECURITY_ISSUES = {
  "no-https-redirect": {
    severity: "critical",
    title: "http adresi https'e yönlendirilmiyor",
    explanation:
      'Sitenizin http:// ile başlayan adresi şifreli https sürümüne yönlendirmiyor, sayfayı düz http ile açıyor. Ziyaretçi adresi elle yazdığında ya da eski bir bağlantıdan geldiğinde güvenli olmayan sürümde kalır ve tarayıcı "Güvenli değil" uyarısı gösterir. Google da aynı içeriğin iki sürümünü görür.',
    howToFix:
      'Sunucunuzda ya da barındırma panelinizde "HTTPS\'e zorla" ayarını açın; yoksa tüm http isteklerini aynı adresin https karşılığına kalıcı (301) yönlendiren bir kural ekleyin.',
  },
  "missing-hsts": {
    severity: "warning",
    title: "HSTS başlığı yok",
    explanation:
      'Sayfa https ile açılıyor ama Strict-Transport-Security (HSTS) başlığı göndermiyor. Bu başlık tarayıcıya "bu siteye bundan sonra hep https ile gel" der. Olmadığında ilk istek http ile gidebilir ve araya giren biri ziyaretçiyi güvensiz sürüme düşürebilir.',
    howToFix:
      "Sunucu yanıtına `Strict-Transport-Security: max-age=31536000; includeSubDomains` başlığını ekleyin. Önce tüm alt alan adlarınızın https ile çalıştığından emin olun; tarayıcı bu süre boyunca http'yi denemez.",
  },
  "missing-x-content-type-options": {
    severity: "info",
    title: "X-Content-Type-Options başlığı yok",
    explanation:
      "Sunucu `X-Content-Type-Options: nosniff` başlığını göndermiyor. Bu başlık tarayıcının dosya türünü tahmin etmesini engeller; yoksa yüklenen bir dosya betik gibi çalıştırılabilir. Sıralamayı etkilemez, sitenin güvenlik düzenini gösterir.",
    howToFix:
      "Sunucu yanıtlarına `X-Content-Type-Options: nosniff` başlığını ekleyin. Çoğu barındırma panelinde ya da CDN'de güvenlik başlıkları ayarından tek tıkla açılır.",
  },
  "missing-clickjacking-protection": {
    severity: "info",
    title: "Sayfa başka sitelerin çerçevesine gömülebiliyor",
    explanation:
      "Ne X-Frame-Options başlığı ne de Content-Security-Policy içinde frame-ancestors kuralı var. Başka bir site sayfanızı görünmez bir çerçeveye koyup ziyaretçiyi istemediği bir yere tıklatabilir (clickjacking). Sıralamayı etkilemez.",
    howToFix:
      "Sayfanın başka sitelerde gösterilmesi gerekmiyorsa `Content-Security-Policy: frame-ancestors 'self'` ya da `X-Frame-Options: SAMEORIGIN` başlığını ekleyin.",
  },
  "missing-referrer-policy": {
    severity: "info",
    title: "Referrer-Policy başlığı yok",
    explanation:
      "Sunucu Referrer-Policy başlığı göndermiyor. Güncel tarayıcılar bu durumda güvenli bir varsayılan kullanır, yani acil bir sorun değil; ama başlık, ziyaretçi başka siteye geçtiğinde adresinizin ne kadarının paylaşılacağını sizin belirlemenizi sağlar.",
    howToFix:
      "Sunucu yanıtlarına `Referrer-Policy: strict-origin-when-cross-origin` başlığını ekleyin.",
  },
  "ssl-expiring-soon": {
    severity: "warning",
    title: "SSL sertifikasının süresi 30 günden az",
    explanation:
      "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 30 günden az kaldı. Süre dolarsa tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar ve ziyaretçilerin çoğu geri döner. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.",
    howToFix:
      "Sertifikanın otomatik yenilendiğini barındırma panelinizden kontrol edin. Let's Encrypt gibi otomatik sertifikalar genelde bitmeden 30 gün önce yenilenir; yenilenmediyse yenilemeyi elle başlatın.",
  },
  "ssl-expiring-very-soon": {
    severity: "critical",
    title: "SSL sertifikasının süresi dolmak üzere",
    explanation:
      "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 14 günden az kaldı. Süre dolunca tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar; ziyaretçilerin çoğu siteye hiç giremez. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.",
    howToFix:
      "Sertifikayı hemen yenileyin ve sunucuya yükleyin. Otomatik yenileme varsa neden çalışmadığına bakın (DNS kaydı değişmiş, doğrulama dosyasına erişilemiyor gibi).",
  },
  "domain-expiring-soon": {
    severity: "warning",
    title: "Alan adının süresi 30 günden az",
    explanation:
      "Alan adı kayıt bilgisine (RDAP) göre alan adınızın süresinin bitmesine 30 günden az kaldı. Yenilenmezse site ve e-postalar tamamen durur, alan adı başkasının eline geçebilir.",
    howToFix:
      "Alan adını aldığınız firmadan süreyi uzatın ve otomatik yenilemeyi açın. Kayıttaki e-posta adresinin güncel olduğundan emin olun; hatırlatmalar oraya gider.",
  },
  "missing-spf": {
    severity: "info",
    title: "Alan adında SPF kaydı yok",
    explanation:
      "Alan adınızın DNS'inde SPF kaydı (v=spf1 ile başlayan TXT kaydı) yok. SPF, alan adınız adına hangi sunucuların e-posta gönderebileceğini söyler. Yoksa başkaları sizin adınıza sahte e-posta gönderebilir ve sizin gerçek e-postalarınız spam klasörüne düşebilir. SEO'yu doğrudan etkilemez.",
    howToFix:
      "E-postanızı gönderen hizmetin (Google Workspace, Microsoft 365, barındırma firması) önerdiği SPF kaydını DNS'e TXT olarak ekleyin. Alan adından hiç e-posta gönderilmiyorsa `v=spf1 -all` yeterlidir.",
  },
  "missing-dmarc": {
    severity: "info",
    title: "Alan adında DMARC kaydı yok",
    explanation:
      "Alan adınızda DMARC kaydı (_dmarc alt adında v=DMARC1 ile başlayan TXT kaydı) yok. DMARC, SPF ve DKIM kontrolünden geçemeyen e-postalara ne yapılacağını söyler. Gmail ve Yahoo toplu gönderim yapan alan adlarından bu kaydı istiyor. SEO'yu doğrudan etkilemez.",
    howToFix:
      "DNS'e `_dmarc` adıyla `v=DMARC1; p=none; rua=mailto:dmarc@alanadiniz.com` gibi bir TXT kaydı ekleyin. Raporları birkaç hafta izledikten sonra politikayı `quarantine` ya da `reject` yapın.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
