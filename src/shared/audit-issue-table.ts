/**
 * The issue descriptors themselves: id, severity, and the Turkish prose the
 * operator reads.
 *
 * Split out of `audit-issues.ts` when the two together crossed the file
 * line ceiling. That file keeps the types, the severity ordering and the
 * lookups -- the parts with logic in them -- and this one is a table.
 */
import type { AuditIssueDescriptor } from "./audit-issue-types";

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
      "Bu sayfa, hata döndüren (4xx/5xx) bir iç adrese bağlantı veriyor. Kırık bağlantılar tarama bütçesini harcar ve ziyaretçiyi çıkmaza sokar.",
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
      "İki ya da daha fazla adres birebir aynı görünür metni sunuyor. Arama motoru bir sürümü seçip dizine alır, ve seçtiği sizin istediğiniz olmayabilir. Yinelenen içerik bir ceza değildir.",
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
    severity: "info",
    title: "Birden çok H1 başlığı",
    explanation:
      "Sayfada birden fazla H1 var. Bu tek başına bir hata değildir; Google birden çok H1’i sorunsuz işler. Ancak çoğu zaman bir şablon hatasının işaretidir (logo ile manşetin ikisinin de H1 olması gibi), o yüzden bakmaya değer.",
    howToFix:
      "Ana başlık için tek bir H1 bırakın, diğerlerini H2/H3 yapın. Logo gibi başlık olmayan öğeleri başlık etiketinden çıkarın.",
  },
  "redirect-chain": {
    severity: "warning",
    title: "Yönlendirme zinciri",
    explanation:
      "Son sayfaya ulaşmak için arka arkaya iki veya daha fazla yönlendirme gerekiyor. Her adım gecikme ekler ve tarama bütçesi harcar; çok uzun zincirler (10 adımdan fazla) hiç takip edilmez.",
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
    severity: "info",
    title: "Sayfada neredeyse hiç metin yok",
    explanation:
      "Bu adreste çok az görünür metin bulundu. Genelde bunun anlamı, içeriğin JavaScript ile geldiği ve sunucudan gelen HTML'de yer almadığıdır. Kelime sayısı bir kalite ölçüsü değildir: kısa olması sorun değil, boş olması sorundur.",
    howToFix:
      'Sayfayı tarayıcıda açıp metnin göründüğünü, sonra "kaynağı görüntüle" ile aynı metnin HTML\'de de olduğunu doğrulayın. Yoksa sunucu tarafında oluşturun. Sayfa gerçekten boşsa noindex yapın ya da daha güçlü bir sayfayla birleştirin.',
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
      "Taranan hiçbir sayfa bu adrese bağlantı vermiyor. İç bağlantısı olmayan sayfalar daha seyrek taranır ve kullanıcı gezinerek onlara ulaşamaz.",
    howToFix:
      "Bu sayfaya ilgili sayfalardan bağlantı verin (menü, ilgili içerik, kategori sayfaları). Dizine girmemesi gerekiyorsa site haritasından çıkarın.",
  },
  "no-outgoing-links": {
    severity: "info",
    title: "Sayfadan hiç bağlantı çıkmıyor",
    explanation:
      "Sayfadan hiçbir yere bağlantı çıkmıyor, yani bir çıkmaz sokak. Tarayıcının buradan gidecek yeri olmaz ve kullanıcı geri düğmesine uzanır.",
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
      "Başlık sıralaması seviye atlıyor (H2'den sonra doğrudan H4 gibi). Bu, erişilebilirlik araçları ve içerik ayrıştırma için belge yapısını zayıflatabilir. Menü ve altbilgi başlıkları da bu sıralamaya karıştığı için yanlış alarm olabilir.",
    howToFix:
      "Başlık seviyelerini atlamadan birer birer inecek şekilde düzeltin (H1 → H2 → H3).",
  },
  "slow-response": {
    severity: "info",
    title: "Sunucu yanıtı yavaş",
    explanation:
      "HTML yanıtı 600 milisaniyeden uzun sürdü; Lighthouse de bu eşiği kullanır. İlk bayta kadar geçen sürenin yavaşlığı sonraki tüm performans ölçümlerini aşağı çeker ve büyük sitelerde tarama hızını düşürür. Bu süre denetimi çalıştıran makineden ölçülür, ziyaretçinizin bağlantısından değil.",
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
  "canonical-to-broken": {
    severity: "warning",
    title: "Canonical çalışmayan bir adresi gösteriyor",
    explanation:
      "Sayfa asıl adres olarak taramada hata veren bir adresi bildiriyor (404 veya 5xx). rel=canonical bir yönerge değil, güçlü bir sinyaldir; gösterdiği adres yayında değilse Google bu sinyali kullanamaz ve asıl adresi kendi seçer. Sonuç, hiç canonical vermemişsiniz gibi olur.",
    howToFix:
      "Canonical değerini çalışan bir adrese çevirin ya da hedef adresi yeniden yayına alın. Hedefin gerçekten kaldırıldığı durumda canonical sayfanın kendisini göstermelidir.",
  },
  "canonical-to-redirect": {
    severity: "warning",
    title: "Canonical bir yönlendirmeyi gösteriyor",
    explanation:
      "Sayfa asıl adres olarak yönlendirme (3xx) dönen bir adresi bildiriyor. Google yönlendirmeyi izler; üstelik yönlendirmenin kendisi hedefin asıl adres olduğunu söyleyen ayrı bir sinyaldir. Yani bu sayfa, Google'a zaten asıl olmadığı bildirilmiş bir adresi asıl diye gösteriyor.",
    howToFix:
      "Canonical değerini yönlendirmenin ulaştığı son adrese çevirin; böylece bildirdiğiniz adres ile yayınlanan adres aynı olur.",
  },
  "canonical-to-noindex": {
    severity: "critical",
    title: "Canonical noindex bir sayfayı gösteriyor",
    explanation:
      "Sayfa asıl adres olarak noindex işaretli bir sayfayı bildiriyor. İkisi eşit ağırlıkta değil: noindex kesin bir yönergedir ve hedef sayfanın arama sonuçlarında hiç görünmemesini sağlar, rel=canonical ise yalnızca bir sinyaldir. Yani bu sayfa, Google'ın asla gösteremeyeceği bir adresi asıl adres olarak öneriyor. Google da canonical seçimi için noindex kullanılmamasını öneriyor.",
    howToFix:
      "Ya hedef sayfadaki noindex yönergesini kaldırın ya da bu sayfanın canonical değerini kendisine çevirin.",
  },
  "robots-txt-server-error": {
    severity: "critical",
    title: "robots.txt sunucu hatası döndürüyor",
    explanation:
      "robots.txt dosyanız 5xx hatası veriyor. Google'ın kendi belgelerine göre bu durumda Google ilk 12 saat siteyi taramayı tamamen durdurur, sonrasında 30 gün boyunca dosyanın son sağlam kopyasını kullanır. Yani bu tek dosyanın hatası tüm sitenin taranmasını etkiler.",
    howToFix:
      "Sunucu hatasını giderin. robots.txt yoksa 404 döndürmesi sorun değildir; Google bunu 'kısıtlama yok' olarak okur. Hata 5xx olduğunda ise Google dosyayı okuyamadığını değil, okumaya çalışmaması gerektiğini varsayar.",
  },
  "robots-txt-unreachable": {
    severity: "warning",
    title: "robots.txt'ye ulaşılamadı",
    explanation:
      "robots.txt isteği hiç tamamlanmadı: zaman aşımı, DNS ya da TLS hatası. Bu tarama dosyayı okuyamadığı için sitenin tamamını taranabilir kabul etti; gerçek robots.txt farklı kurallar içeriyor olabilir.",
    howToFix:
      "Adresi tarayıcıda açıp gerçekten yanıt verdiğini doğrulayın. Yanıt veriyorsa bu geçici bir ağ hatası olabilir, denetimi tekrar çalıştırın.",
  },
  "robots-txt-truncated": {
    severity: "warning",
    title: "robots.txt 500 KiB sınırını aşıyor",
    explanation:
      "Google robots.txt dosyasının yalnızca ilk 500 KiB'ını okur ve gerisini yok sayar. Dosyanız bu sınırı aştığı için sondaki kurallar Google için hiç var olmamış gibi davranır.",
    howToFix:
      "Dosyayı kısaltın. Çok sayıda tekil adresi engellemek yerine dizin kalıpları kullanın; gerçekten dizine girmemesi gereken sayfalar için robots.txt yerine noindex daha kesin bir yoldur.",
  },
  "robots-txt-blocks-start-url": {
    severity: "critical",
    title: "Başlangıç adresi robots.txt ile engellenmiş",
    explanation:
      "Denetimi başlattığınız adresi sitenizin kendi robots.txt dosyası taramaya kapatıyor. Google da bu kurala uyar, yani bu sayfa taranmaz. Bu denetim de aynı nedenle o sayfadan başlayamadı.",
    howToFix:
      "Sayfanın taranması gerekiyorsa robots.txt'deki ilgili Disallow satırını kaldırın. Engel kasıtlıysa denetimi taranabilir bir adresten başlatın.",
  },
  "sitemap-broken-page": {
    severity: "critical",
    title: "Site haritasındaki sayfa açılmıyor",
    explanation:
      "Adres site haritanızda listelenmiş ama sunucu hata döndürüyor. Site haritası Google'a 'bu sayfaları tara ve dizine al' demenin yoludur; açılmayan bir adresi listelemek Google'ı boşa gönderir ve site haritanızın geri kalanına olan güveni azaltır.",
    howToFix:
      "Sayfa var olmalıysa hatayı giderin. Kaldırıldıysa adresi site haritasından çıkarın; site haritanız otomatik üretiliyorsa üretecin silinmiş sayfaları listelememesi gerekir.",
  },
  "sitemap-redirect-page": {
    severity: "warning",
    title: "Site haritasındaki sayfa yönlendiriyor",
    explanation:
      "Adres site haritanızda listelenmiş ama başka bir adrese yönlendiriyor. Google site haritasındaki adresleri asıl adres önerisi sayar, yani asıl olmadığını kendi söylediğiniz bir adresi öneriyorsunuz. Sayfa taşındıysa bu geçicidir; kalıcıysa harita eskimiş demektir.",
    howToFix:
      "Site haritasında yönlendirmenin hedefini listeleyin, kaynağını değil.",
  },
  "sitemap-disallowed-page": {
    severity: "warning",
    title: "Site haritasındaki adres robots.txt ile engellenmiş",
    explanation:
      "Aynı adres için sitenizin iki sistemi birbiriyle çelişiyor: site haritası Google'a 'bunu tara' derken robots.txt 'tarama' diyor. Google robots.txt'ye uyar ve sayfayı taramaz; başka sitelerden bağlantı alıyorsa içeriğini görmeden yine de dizine alabilir.",
    howToFix:
      "Sayfanın dizine girmesini istiyorsanız robots.txt engelini kaldırın. İstemiyorsanız adresi site haritasından çıkarın.",
  },
  "sitemap-canonicalized-page": {
    severity: "info",
    title: "Site haritasındaki sayfa başka adrese canonical veriyor",
    explanation:
      "Sayfa site haritasında listelenmiş, ama kendi içinde asıl adres olarak başka bir adresi bildiriyor. Google site haritasındaki adresleri asıl adres önerisi sayar, dolayısıyla aynı sayfa için iki farklı öneri göndermiş oluyorsunuz. Google bu iki öneriden birini seçer; bilinçli yaptıysanız sorun değil.",
    howToFix:
      "Site haritası yalnızca asıl adresleri listelemelidir: bu adresi haritadan çıkarın ya da canonical değerini sayfanın kendisine çevirin.",
  },
  "sitemap-noindex-page": {
    severity: "info",
    title: "Site haritasındaki sayfa noindex",
    explanation:
      "Sayfa site haritasında listelenmiş ama noindex işaretli. Site haritası dizine almayı garanti etmez; adres keşfine yarar ve listelediği adresleri asıl adres olarak önerir. Yani burada gösterilmeyecek bir sayfayı öneriyorsunuz. Bu çoğu zaman geçicidir: bir sayfayı yeni noindex yaptıysanız Google yönergeyi görebilmek için sayfayı yine de taramalıdır.",
    howToFix:
      "Sayfa dizine girecekse noindex yönergesini kaldırın. Kalıcı olarak girmeyecekse, Google yönergeyi gördükten sonra sayfayı site haritasından çıkarın.",
  },
  "hreflang-invalid-code": {
    severity: "warning",
    title: "Geçersiz hreflang kodu",
    explanation:
      'hreflang değeri Google\'ın beklediği biçimde değil. Google dil için ISO 639-1, isteğe bağlı bölge için ISO 3166-1 Alpha 2 bekler ve ikisini tire ile ayırır. Google\'ın kendi yaygın hata listesi "UK", "EU" ve "UN" gibi uydurma bölge kodlarını açıkça sayar. Geçersiz bir kod, o alternatifin tamamen yok sayılması demektir.',
    howToFix:
      'Birleşik Krallık için "en-GB" kullanın, "en-UK" diye bir kod yok. Ayırıcı alt çizgi değil tire olmalı ("en_US" değil "en-US"). "x-default" geçerlidir ve olduğu gibi bırakılmalıdır.',
  },
  "hreflang-missing-self": {
    severity: "warning",
    title: "hreflang kümesi kendini listelemiyor",
    explanation:
      "Google'ın belgelerine göre her dil sürümü, diğerlerinin yanı sıra kendisini de listelemelidir. Bu sayfa alternatiflerini bildiriyor ama aralarında kendisi yok, bu yüzden Google kümeyi eksik görebilir ve bağlantıyı kurmayabilir.",
    howToFix:
      "Sayfanın kendi adresini de kendi dil koduyla hreflang listesine ekleyin. Çoğu şablonda bu, listeyi tüm diller üzerinde döndürüp geçerli olanı atlamaktan kaynaklanır.",
  },
  "nofollow-page": {
    severity: "warning",
    title: "Sayfa robots yönergesiyle bağlantılarını kapatıyor",
    explanation:
      'Sayfa "nofollow" (ya da eşdeğeri "none") yönergesi taşıyor. Google\'ın belgelerine göre bu, sayfadaki bağlantıların izlenmemesi demektir: Google normalde bu bağlantıları yeni sayfa keşfetmek için kullanır, burada kullanmaz. Sayfa dizine giriyorsa, ondan çıkan yollar Google için kapalıdır.',
    howToFix:
      'Bağlantıların izlenmesini istiyorsanız yönergeden "nofollow" ifadesini kaldırın. Giriş, filtre ya da kullanıcı içeriği sayfalarında bu bilinçli olabilir; o durumda bir şey yapmanız gerekmez.',
  },
  "paginated-canonical-to-first-page": {
    severity: "warning",
    title: "Sayfalanmış sayfa ilk sayfaya canonical veriyor",
    explanation:
      "Adres bir sayfa numarası taşıyor ama asıl adres olarak numarasız hâlini, yani ilk sayfayı bildiriyor. Google bunu sayfalama belgelerinde açıkça hata olarak sayar: her sayfa kendi adresini asıl adres olarak vermelidir. Aksi hâlde ikinci ve sonraki sayfalardaki içerik dizinden düşer.",
    howToFix:
      "Her sayfalama adımının canonical değerini kendisine çevirin. Gerçekten tümünü tek sayfada gösteren bir sürüm varsa, Google o sürümün asıl adres olmasına izin verir.",
  },
  "hreflang-missing-x-default": {
    severity: "info",
    title: "hreflang kümesinde x-default yok",
    explanation:
      "Sayfa hreflang ile dil sürümlerini bildiriyor ama bir x-default sürümü belirtmiyor. x-default, listelenen dillerin hiçbirine uymayan kullanıcıya hangi sürümün gösterileceğini söyler; yoksa Google seçimi kendi yapar.",
    howToFix:
      'hreflang kümesine <link rel="alternate" hreflang="x-default" href="..."> ekleyin; genellikle dil seçme sayfası ya da varsayılan pazarın sürümü gösterilir.',
  },
  "hreflang-no-return-tag": {
    severity: "warning",
    title: "hreflang karşılığı yok",
    explanation:
      "Sayfa başka bir adresi dil alternatifi olarak bildiriyor, ama o adres bu sayfayı geri bildirmiyor. hreflang çift taraflı çalışır: karşılığı olmayan bir bildirim yok sayılır, yani iki sayfa da bu etiketten hiçbir fayda görmez.",
    howToFix:
      "Hedef sayfaya bu sayfayı gösteren bir hreflang bağlantısı ekleyin. Kümedeki her sayfa, kümedeki tüm sayfaları (kendisi dahil) listelemelidir.",
  },
  "deep-page": {
    severity: "info",
    title: "Sayfa site yapısında çok derinde",
    explanation:
      "Sayfa, ana sayfadan 5 veya daha fazla tık uzakta. Derin sayfalar daha seyrek taranır ve kullanıcının onları bulması zorlaşır.",
    howToFix:
      "Üst seviyedeki sayfalardan (kategori sayfaları, menü, toplayıcı sayfalar) bu sayfaya bağlantı ekleyerek yolu kısaltın.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
