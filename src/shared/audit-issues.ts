/**
 * Registry of site-audit issue types.
 *
 * Shared between the server (issue engine, MCP tools) and the client
 * (issues UI, CSV export). Each issue row in `audit_issues` references one
 * of these types by id.
 *
 * The ids stay in English because they are stored in the database and read by
 * agents; the prose is what the operator reads, so it is Turkish.
 */

export type IssueSeverity = "critical" | "warning" | "info";

interface AuditIssueDescriptor {
  severity: IssueSeverity;
  title: string;
  explanation: string;
  howToFix: string;
}

export const AUDIT_ISSUE_TYPES = {
  "blocked-page": {
    severity: "critical",
    title: "Tarayıcı engellendi",
    explanation:
      "Sayfa yerine bir bot doğrulaması ya da erişim reddi döndü (Cloudflare doğrulaması veya 403 gibi). Bu sayfa denetlenemedi. Arama motorlarının tarayıcıları da benzer bir engelle karşılaşıyor olabilir.",
    howToFix:
      'Site sizinse "seotracker-audit" kullanıcı aracısını güvenlik duvarı veya bot koruması ayarlarınızda izin listesine ekleyin (Cloudflare\'de: kullanıcı aracısı "seotracker-audit" içerdiğinde bot korumasını atlayan bir WAF kuralı). Sonra denetimi yeniden çalıştırın.',
  },
  "rate-limited-page": {
    severity: "warning",
    title: "İstek sınırına takıldı (429)",
    explanation:
      "Sunucu 429 Too Many Requests döndürdü, bu yüzden sayfa denetlenemedi. Sitenin bekleme süresi denetim süresine sığıyorsa tarayıcı bekleyip yeniden dener.",
    howToFix:
      'Tarayıcılar için istek sınırını yükseltin ya da "seotracker-audit" kullanıcı aracısını sınır kurallarınızın dışında bırakın. Sonra denetimi yeniden çalıştırın. Sınır çok katıysa daha az sayfayla çalıştırmak da işe yarar.',
  },
  "crawl-rate-limited": {
    severity: "warning",
    title: "Tarama erken durdu: istek sınırı",
    explanation:
      "Site, tarayıcıdan denetim süresinden daha uzun beklemesini istedi. Sayfa istemeyi bıraktık. Bu rapor eksiktir; çekemediğimiz adresler kırık ya da sınırlanmış olarak kaydedilmedi.",
    howToFix:
      "Sitenin istek sınırı sıfırlandıktan sonra denetimi yeniden çalıştırın, ya da site sahibinden seotracker-audit tarayıcısına izin vermesini isteyin.",
  },
  "server-error": {
    severity: "critical",
    title: "Sunucu hatası (5xx)",
    explanation:
      "Sayfa 5xx sunucu hatası döndürdü. Sürekli sunucu hatası gören arama motorları siteyi daha seyrek tarar ve sayfayı dizinden düşürebilir.",
    howToFix:
      "Bu adres için sunucu günlüklerine bakıp asıl hatayı giderin. Sayfa kaldırıldıysa hata yerine 404/410 döndürün veya ilgili bir sayfaya yönlendirin.",
  },
  "broken-internal-link": {
    severity: "critical",
    title: "Kırık iç bağlantı",
    explanation:
      "Bu sayfa, hata döndüren (4xx/5xx) bir iç adrese bağlantı veriyor. Kırık bağlantılar tarama bütçesini harcar, bağlantı değerini kaybettirir ve ziyaretçiyi çıkmaza sokar. En yaygın ve en çok zarar veren teknik SEO sorunlarından biridir.",
    howToFix:
      "Bağlantıyı doğru ve çalışan adrese güncelleyin ya da kaldırın. Hedef taşındıysa yönlendirmeye güvenmek yerine doğrudan yeni adrese bağlanın.",
  },
  "missing-title": {
    severity: "critical",
    title: "Başlık etiketi yok",
    explanation:
      "Sayfanın <title> etiketi yok. Başlık, sayfanın konusunu anlatan en güçlü sinyal ve arama sonuçlarında görünen manşettir. Yoksa arama motoru kendi üretir, genelde kötü bir şekilde.",
    howToFix:
      "Sayfanın ana konusunu içeren, yaklaşık 50-60 karakterlik benzersiz ve açıklayıcı bir <title> ekleyin.",
  },
  "broken-page": {
    severity: "warning",
    title: "Sayfa hata döndürüyor (4xx)",
    explanation:
      "Taranan bu adres bir istemci hatası döndürdü (404 gibi). Site haritanızda veya başka sayfalarda geçiyorsa tarayıcılar boşuna istek yapmaya devam eder.",
    howToFix:
      "Sayfa var olmalıysa geri getirin. Bilerek kaldırıldıysa site haritasından ve iç bağlantılardan çıkarın, en yakın çalışan sayfaya 301 yönlendirmesi düşünün.",
  },
  "duplicate-title": {
    severity: "warning",
    title: "Yinelenen başlık",
    explanation:
      "Birden çok sayfa aynı başlık etiketini paylaşıyor. Arama motorları sayfaları başlıklarıyla ayırt eder; yinelenen başlıklar sayfaları birbiriyle yarıştırır ve tıklama oranını düşürür.",
    howToFix:
      "Her sayfaya kendi içeriğini anlatan benzersiz bir başlık yazın. Şablondan üretilen sayfalarda ayırt edici özelliği (ad, kategori, konum) şablona ekleyin.",
  },
  "duplicate-meta-description": {
    severity: "warning",
    title: "Yinelenen meta açıklama",
    explanation:
      "Birden çok sayfa aynı meta açıklamayı paylaşıyor, bu yüzden arama sonuçlarında aynı özet görünüyor ve kullanıcı sayfaları ayırt edemiyor.",
    howToFix:
      "Her sayfaya kendi meta açıklamasını yazın ya da yineleneni tamamen kaldırın. Arama motorunun sayfa içeriğinden ürettiği özet, yanlış bir yinelenenden iyidir.",
  },
  "duplicate-content": {
    severity: "warning",
    title: "Yinelenen sayfa içeriği",
    explanation:
      "İki ya da daha fazla adres birebir aynı görünür metni sunuyor. Arama motoru bir sürümü dizine alıp diğerlerini yok sayar ve sıralama sinyalleri yinelenenler arasında bölünür.",
    howToFix:
      "Yinelenenleri birleştirin: asıl adresi seçin, diğerlerinden ona rel=canonical verin ve mümkünse 301 ile yönlendirin. Sık görülen nedenler: sonda eğik çizgi farkı, adres parametreleri, http/https veya www farkı.",
  },
  "missing-meta-description": {
    severity: "warning",
    title: "Meta açıklama yok",
    explanation:
      "Sayfanın meta açıklaması yok. Arama motoru özeti sayfa metninden derler; bu genelde daha az çekici olur ve tıklama oranını düşürür.",
    howToFix:
      "Sayfayı özetleyen ve tıklamak için bir sebep veren, yaklaşık 70-160 karakterlik bir meta açıklama ekleyin.",
  },
  "missing-h1": {
    severity: "warning",
    title: "H1 başlığı yok",
    explanation:
      "Sayfada H1 yok. H1, sayfanın ne hakkında olduğunu hem kullanıcıya hem arama motoruna söyler; H1'i olmayan sayfaların konu netliği zayıf kalır.",
    howToFix:
      "Sayfanın ana konusunu belirten, başlık etiketiyle tutarlı tek bir H1 ekleyin.",
  },
  "multiple-h1": {
    severity: "warning",
    title: "Birden çok H1 başlığı",
    explanation:
      "Sayfada birden fazla H1 var. Bu, ana konu sinyalini zayıflatır ve genelde bir şablon hatasına işaret eder (logo ile manşetin ikisinin de H1 olması gibi).",
    howToFix:
      "Ana başlık için tek bir H1 bırakın, diğerlerini H2/H3 yapın. Logo gibi başlık olmayan öğeleri başlık etiketinden çıkarın.",
  },
  "redirect-chain": {
    severity: "warning",
    title: "Yönlendirme zinciri",
    explanation:
      "Son sayfaya ulaşmak için arka arkaya iki veya daha fazla yönlendirme gerekiyor. Her adım gecikme ekler, bağlantı değeri kaybettirir ve tarama bütçesi harcar; uzun zincirler hiç takip edilmeyebilir.",
    howToFix:
      "İlk adresi ve ona veren iç bağlantıları doğrudan son hedefe yöneltin; en çok tek yönlendirme kalsın.",
  },
  "redirect-loop": {
    severity: "warning",
    title: "Yönlendirme döngüsü",
    explanation:
      "Bu yönlendirme dönüp dolaşıp kendine geliyor, yani adres hiç açılmıyor. Tarayıcılar ve arama motorları hata vererek vazgeçer.",
    howToFix:
      "Bu adresin yönlendirme kurallarını izleyip döngüyü kırın; zincir gerçek bir 200 sayfada bitmeli.",
  },
  "canonical-conflict": {
    severity: "warning",
    title: "Çelişen canonical sinyalleri",
    explanation:
      "Sayfa, HTML içindeki <link rel=canonical> ile HTTP Link başlığında farklı asıl adresler bildiriyor. Sinyaller çeliştiğinde arama motoru ikisini de yok sayıp kendi seçimini yapar.",
    howToFix:
      "Tek bir asıl adres seçin ve yalnız bir yerde bildirin (genelde HTML head). Diğer bildirimi kaldırın ya da aynı adrese getirin.",
  },
  "thin-content": {
    severity: "warning",
    title: "İnce içerik",
    explanation:
      "Sayfada çok az görünür metin var. İnce sayfalar nadiren sıralanır, site genelindeki kalite değerlendirmesini aşağı çekebilir ve site istemci tarafında oluşturuluyorsa içeriğin tarayıcıya hiç görünmediğine işaret edebilir.",
    howToFix:
      "Sayfayı gerçekten faydalı içerikle genişletin, noindex yapın ya da daha güçlü bir sayfayla birleştirin. İçerik varsa ama JavaScript ile geliyorsa sunucu tarafında oluşturulduğundan emin olun.",
  },
  "images-missing-alt": {
    severity: "warning",
    title: "Alt metni olmayan görseller",
    explanation:
      "Sayfadaki bir veya daha fazla görselin alt niteliği yok. Alt metni hem erişilebilirlik gereğidir hem de arama motorunun görseli anlamasının başlıca yoludur.",
    howToFix:
      'Anlam taşıyan görsellere açıklayıcı alt metni yazın; yalnız süs amaçlı olanlarda boş alt (alt="") kullanın.',
  },
  "orphan-page": {
    severity: "warning",
    title: "Yetim sayfa",
    explanation:
      "Taranan hiçbir sayfa bu adrese bağlantı vermiyor; yalnız site haritasından bulunabiliyor. İç bağlantısı olmayan sayfalar az taranır, bağlantı değeri almaz ve kullanıcı gezinerek onlara ulaşamaz.",
    howToFix:
      "Bu sayfaya ilgili sayfalardan bağlantı verin (menü, ilgili içerik, kategori sayfaları). Dizine girmemesi gerekiyorsa site haritasından çıkarın.",
  },
  "no-outgoing-links": {
    severity: "warning",
    title: "Sayfada hiç dış bağlantı yok",
    explanation:
      "Sayfada hiç bağlantı yok, yani bir çıkmaz sokak. Sayfaya akan bağlantı değeri orada kalır, tarayıcının gidecek yeri olmaz ve kullanıcı geri düğmesine uzanır.",
    howToFix:
      "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa sunucudan gelen HTML'de de bulunduğundan emin olun.",
  },
  "title-too-long": {
    severity: "info",
    title: "Başlık çok uzun",
    explanation:
      "Başlık yaklaşık 60 karakteri aşıyor, bu yüzden arama sonuçlarında kesilecek ve sonu yarıda kalabilecek.",
    howToFix:
      "Başlığı yaklaşık 50-60 karaktere indirin ve en önemli kelimeleri başa alın.",
  },
  "title-too-short": {
    severity: "info",
    title: "Başlık çok kısa",
    explanation:
      "Başlık yaklaşık 10 karakterin altında. Bu kadar kısa bir başlık sayfayı anlatmak ya da tıklama çekmek için genelde fazla genel kalır.",
    howToFix:
      "Başlığı, sayfanın ne sunduğunu söyleyen açıklayıcı bir ifadeye genişletin (yaklaşık 30-60 karakter).",
  },
  "meta-description-too-long": {
    severity: "info",
    title: "Meta açıklama çok uzun",
    explanation:
      "Meta açıklama yaklaşık 160 karakteri aşıyor, bu yüzden arama motoru özeti kesecek.",
    howToFix:
      "Ana mesajı ve tıklama çağrısını koruyarak açıklamayı yaklaşık 70-160 karaktere indirin.",
  },
  "meta-description-too-short": {
    severity: "info",
    title: "Meta açıklama çok kısa",
    explanation:
      "Meta açıklama yaklaşık 70 karakterin altında. Kısa açıklamalar arama sonucunun size verdiği alanı boşa harcar ve arama motorları çoğu zaman bunları yok sayıp sayfadan metin çeker.",
    howToFix:
      "Açıklamayı, sayfayı özetleyen ve tıklamak için sebep veren yaklaşık 70-160 karaktere genişletin.",
  },
  "heading-order-skip": {
    severity: "info",
    title: "Başlık seviyeleri atlanmış",
    explanation:
      "Başlık sıralaması seviye atlıyor (H2'den sonra doğrudan H4 gibi). Bu, erişilebilirlik araçları ve içerik ayrıştırma için belge yapısını zayıflatır.",
    howToFix:
      "Başlık seviyelerini atlamadan birer birer inecek şekilde düzeltin (H1 → H2 → H3).",
  },
  "slow-response": {
    severity: "info",
    title: "Sunucu yanıtı yavaş",
    explanation:
      "HTML yanıtı 1,5 saniyeden uzun sürdü. İlk bayta kadar geçen sürenin yavaşlığı sonraki tüm performans ölçümlerini aşağı çeker ve büyük sitelerde tarama hızını düşürür.",
    howToFix:
      "Bu adres için sunucu ve veritabanı süresine, bir de önbelleğe bakın. Önbelleklenmiş ya da statik üretilmiş HTML sunmak genelde sorunu çözer.",
  },
  "noindex-page": {
    severity: "info",
    title: "Sayfa noindex",
    explanation:
      "Sayfa, arama motorlarından kendisini dizine almamalarını istiyor (robots meta etiketi veya X-Robots-Tag başlığı ile). Bu çoğu zaman bilinçlidir; bu bir hata değil, bilgi notudur.",
    howToFix:
      "Bu sayfanın sıralanması gerekiyorsa noindex yönergesini kaldırın. Bilinçliyse (yönetim, teşekkür, filtre sayfaları) yapılacak bir şey yok.",
  },
  "canonicalized-page": {
    severity: "info",
    title: "Başka bir adrese canonical verilmiş",
    explanation:
      "Sayfa asıl adres olarak başka bir adresi bildiriyor, yani arama motoruna onun yerine o adresi dizine almasını söylüyor. Bilinçliyse sorun değil (parametreli sayfalar, yeniden yayın); ama bu sayfa sıralanacaksa sorundur.",
    howToFix:
      "Bu sayfa kendi başına sıralanacaksa canonical değerini kendisine çevirin. Aksi hâlde yapılacak bir şey yok.",
  },
  "deep-page": {
    severity: "info",
    title: "Sayfa site yapısında çok derinde",
    explanation:
      "Sayfa, ana sayfadan 5 veya daha fazla tık uzakta. Derin sayfalar daha seyrek taranır ve daha az bağlantı değeri alır.",
    howToFix:
      "Üst seviyedeki sayfalardan (kategori sayfaları, menü, toplayıcı sayfalar) bu sayfaya bağlantı ekleyerek yolu kısaltın.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;

export type AuditIssueType = keyof typeof AUDIT_ISSUE_TYPES;

export const ISSUE_SEVERITY_ORDER: Record<IssueSeverity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
};

const issueRegistry: Record<string, AuditIssueDescriptor> = AUDIT_ISSUE_TYPES;

export function getIssueDescriptor(
  issueType: string,
): AuditIssueDescriptor | null {
  return issueRegistry[issueType] ?? null;
}
