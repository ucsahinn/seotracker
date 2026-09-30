/** Indexability, canonicalisation, hreflang, and Google's own verdicts. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const INDEXING_ISSUES = {
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
  "missing-canonical": {
    severity: "info",
    title: "Sayfada canonical (asıl adres) etiketi yok",
    explanation:
      "Sayfa, kendi asıl adresini belirtmiyor. Aynı sayfa birden çok adresten açılabilir (sonunda eğik çizgi olan ve olmayan, ?utm_source gibi eklerle gelen, www'lu ve www'suz adresler). Asıl adres etiketi yoksa arama motoru bunlardan hangisini göstereceğine kendisi karar verir. Google bu etiketi zorunlu değil, önerilen bir işaret olarak tanımlar; o yüzden bu yalnızca bir öneridir.",
    howToFix:
      'Sayfanın `<head>` bölümüne kendi tam adresini gösteren bir satır ekleyin: `<link rel="canonical" href="https://www.siteniz.com/hakkimizda">`. Adres, sayfanın arama sonuçlarında görünmesini istediğiniz adres olmalı. Çoğu site oluşturucu ve SEO eklentisi bunu tek bir ayarla tüm sayfalara ekler.',
  },
  "canonical-conflict": {
    severity: "warning",
    title: "Asıl adres bildirimleri birbiriyle çelişiyor",
    explanation:
      "Sayfa, HTML içindeki <link rel=canonical> ile HTTP Link başlığında farklı asıl adresler bildiriyor. Sinyaller çeliştiğinde arama motoru ikisini de yok sayıp kendi seçimini yapar.",
    howToFix:
      "Tek bir asıl adres seçin ve yalnız bir yerde bildirin (genelde HTML head). Diğer bildirimi kaldırın ya da aynı adrese getirin.",
  },
  "noindex-page": {
    severity: "info",
    title: "Sayfa arama sonuçlarından gizlenmiş (noindex)",
    explanation:
      "Sayfa, arama motorlarından kendisini dizine almamalarını istiyor (robots meta etiketi veya X-Robots-Tag başlığı ile). Bu çoğu zaman bilinçlidir; bu bir hata değil, bilgi notudur.",
    howToFix:
      "Bu sayfanın sıralanması gerekiyorsa noindex yönergesini kaldırın. Bilinçliyse (yönetim, teşekkür, filtre sayfaları) yapılacak bir şey yok.",
  },
  "canonicalized-page": {
    severity: "info",
    title: "Sayfa, asıl adres olarak başka bir sayfayı gösteriyor",
    explanation:
      "Sayfa asıl adres olarak başka bir adresi bildiriyor, yani arama motoruna onun yerine o adresi dizine almasını söylüyor. Bilinçliyse sorun değil (parametreli sayfalar, yeniden yayın); ama bu sayfa sıralanacaksa sorundur.",
    howToFix:
      "Bu sayfa kendi başına sıralanacaksa canonical değerini kendisine çevirin. Aksi hâlde yapılacak bir şey yok.",
  },
  "canonical-to-broken": {
    severity: "warning",
    title: "Asıl adres olarak gösterilen sayfa açılmıyor",
    explanation:
      "Sayfa asıl adres olarak taramada hata veren bir adresi bildiriyor (404 veya 5xx). rel=canonical bir yönerge değil, güçlü bir sinyaldir; gösterdiği adres yayında değilse Google bu sinyali kullanamaz ve asıl adresi kendi seçer. Sonuç, hiç canonical vermemişsiniz gibi olur.",
    howToFix:
      "Canonical değerini çalışan bir adrese çevirin ya da hedef adresi yeniden yayına alın. Hedefin gerçekten kaldırıldığı durumda canonical sayfanın kendisini göstermelidir.",
  },
  "canonical-to-redirect": {
    severity: "warning",
    title: "Asıl adres olarak yönlendiren bir sayfa gösterilmiş",
    explanation:
      "Sayfa asıl adres olarak yönlendirme (3xx) dönen bir adresi bildiriyor. Google yönlendirmeyi izler; üstelik yönlendirmenin kendisi hedefin asıl adres olduğunu söyleyen ayrı bir sinyaldir. Yani bu sayfa, Google'a zaten asıl olmadığı bildirilmiş bir adresi asıl diye gösteriyor.",
    howToFix:
      "Canonical değerini yönlendirmenin ulaştığı son adrese çevirin; böylece bildirdiğiniz adres ile yayınlanan adres aynı olur.",
  },
  "canonical-to-noindex": {
    severity: "critical",
    title: "Asıl adres olarak gizlenmiş bir sayfa gösterilmiş",
    explanation:
      "Sayfa asıl adres olarak noindex işaretli bir sayfayı bildiriyor. İkisi eşit ağırlıkta değil: noindex kesin bir yönergedir ve hedef sayfanın arama sonuçlarında hiç görünmemesini sağlar, rel=canonical ise yalnızca bir sinyaldir. Yani bu sayfa, Google'ın asla gösteremeyeceği bir adresi asıl adres olarak öneriyor. Google da canonical seçimi için noindex kullanılmamasını öneriyor.",
    howToFix:
      "Ya hedef sayfadaki noindex yönergesini kaldırın ya da bu sayfanın canonical değerini kendisine çevirin.",
  },
  "google-soft-404": {
    severity: "critical",
    title: "Google sayfayı boş sayıyor (soft 404)",
    explanation:
      "Sayfa 200 döndürüyor ama Google onu 'bulunamadı' olarak değerlendiriyor. Google bunu Sayfa dizine ekleme raporunda soft 404 diye adlandırır ve sayfayı dizine almaz. Bir tarayıcı bunu kendi başına göremez: durum kodu sağlıklı görünür, kararı veren Google'dır. Genellikle boş sonuç sayfaları, silinmiş ürünler ya da 'kayıt bulunamadı' mesajı gösteren şablonlarda olur.",
    howToFix:
      "Sayfa gerçekten yoksa 404 ya da 410 döndürün. Varsa, içeriğinin gerçekten var olduğunu belli edecek kadar dolu olduğundan emin olun; boş liste şablonları en sık nedendir.",
  },
  "google-blocked-by-robots": {
    severity: "critical",
    title: "Google sayfayı robots.txt yüzünden tarayamıyor",
    explanation:
      "Google'ın kendi URL denetimi bu adresi robots.txt'nin engellediğini söylüyor. Bu denetimin tarayıcısı sayfaya ulaşabildiği hâlde Google ulaşamıyorsa, iki tarayıcıya farklı kurallar uygulanıyor demektir.",
    howToFix:
      "robots.txt'de bu adresi kapsayan Disallow satırını bulun. Google'ın kullandığı user-agent adına özel bir kural olup olmadığını kontrol edin; çoğu zaman genel kural değil, Googlebot'a özel bir satır olur.",
  },
  "google-blocked-by-meta": {
    severity: "warning",
    title: "Google sayfada gizleme etiketi (noindex) görüyor",
    explanation:
      "Google'ın kendi denetimi bu sayfada bir noindex yönergesi gördüğünü bildiriyor. Bu denetimin tarayıcısı sayfayı dizine alınabilir gördüyse, ikisi sayfanın farklı sürümlerini okuyor demektir: örneğin yönerge yalnızca JavaScript çalıştıktan sonra ekleniyor olabilir.",
    howToFix:
      "Sayfanın kaynak kodunu Google'ın gördüğü hâliyle karşılaştırın. Search Console'daki canlı test, işlenmiş HTML'i gösterir.",
  },
  "google-chose-different-canonical": {
    severity: "warning",
    title: "Google başka bir adresi asıl adres seçti",
    explanation:
      "Sayfa bir asıl adres bildiriyor, Google başkasını seçti. rel=canonical bir yönerge değil sinyaldir; Google içerik benzerliğine, iç bağlantılara ve site haritasına bakarak farklı karar verebilir. Sonuç olarak arama sonuçlarında sizin seçtiğiniz adres görünmez.",
    howToFix:
      "Google'ın seçtiği adrese bakın: sayfalar gerçekten aynıysa iç bağlantılarınızı ve site haritanızı istediğiniz adrese yöneltin. Farklıysa, aralarındaki farkı içerikte belirginleştirin.",
  },
  "hreflang-invalid-code": {
    severity: "warning",
    title: "Dil sürümü kodu (hreflang) geçersiz",
    explanation:
      'hreflang değeri Google\'ın beklediği biçimde değil. Google dil için ISO 639-1, isteğe bağlı bölge için ISO 3166-1 Alpha 2 bekler ve ikisini tire ile ayırır. Google\'ın kendi yaygın hata listesi "UK", "EU" ve "UN" gibi uydurma bölge kodlarını açıkça sayar. Geçersiz bir kod, o alternatifin tamamen yok sayılması demektir.',
    howToFix:
      'Birleşik Krallık için "en-GB" kullanın, "en-UK" diye bir kod yok. Ayırıcı alt çizgi değil tire olmalı ("en_US" değil "en-US"). "x-default" geçerlidir ve olduğu gibi bırakılmalıdır.',
  },
  "hreflang-missing-self": {
    severity: "warning",
    title: "Dil sürümleri arasında sayfa kendini listelemiyor (hreflang)",
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
    title: "Sayfalanmış sayfa, asıl adres olarak ilk sayfayı gösteriyor",
    explanation:
      "Adres bir sayfa numarası taşıyor ama asıl adres olarak numarasız hâlini, yani ilk sayfayı bildiriyor. Google bunu sayfalama belgelerinde açıkça hata olarak sayar: her sayfa kendi adresini asıl adres olarak vermelidir. Aksi hâlde ikinci ve sonraki sayfalardaki içerik dizinden düşer.",
    howToFix:
      "Her sayfalama adımının canonical değerini kendisine çevirin. Gerçekten tümünü tek sayfada gösteren bir sürüm varsa, Google o sürümün asıl adres olmasına izin verir.",
  },
  "hreflang-missing-x-default": {
    severity: "info",
    title: "Dil sürümlerinde varsayılan sürüm (x-default) yok",
    explanation:
      "Sayfa hreflang ile dil sürümlerini bildiriyor ama bir x-default sürümü belirtmiyor. x-default, listelenen dillerin hiçbirine uymayan kullanıcıya hangi sürümün gösterileceğini söyler; yoksa Google seçimi kendi yapar.",
    howToFix:
      'hreflang kümesine <link rel="alternate" hreflang="x-default" href="..."> ekleyin; genellikle dil seçme sayfası ya da varsayılan pazarın sürümü gösterilir.',
  },
  "hreflang-no-return-tag": {
    severity: "warning",
    title: "Dil sürümü karşılıklı bağlanmamış (hreflang)",
    explanation:
      "Sayfa başka bir adresi dil alternatifi olarak bildiriyor, ama o adres bu sayfayı geri bildirmiyor. hreflang çift taraflı çalışır: karşılığı olmayan bir bildirim yok sayılır, yani iki sayfa da bu etiketten hiçbir fayda görmez.",
    howToFix:
      "Hedef sayfaya bu sayfayı gösteren bir hreflang bağlantısı ekleyin. Kümedeki her sayfa, kümedeki tüm sayfaları (kendisi dahil) listelemelidir.",
  },
  "stale-google-verdicts": {
    severity: "info",
    title: "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş",
    explanation:
      "Bu sayfalar için saklanan Google kararları tazelik penceresinin dışında kaldı. Karar sorulduğu andaki durumu anlatır; o zamandan beri sayfa düzelmiş ya da bozulmuş olabilir. Eski bir yanıtı güncelmiş gibi raporlamamak için bu sayfaların Google kararları bu denetimde bulgu olarak sayılmadı.",
    howToFix:
      'İndeksleme sekmesindeki "Google\'a sor" düğmesi en çok gecikmiş adresleri yeniden sorar. Günlük 2000 adres sınırı olduğu için tek tıkta hepsi değil, en acil olanları sorulur; birkaç tıkla liste tazelenir.',
  },
  "google-crawled-not-indexed": {
    severity: "warning",
    title: "Google taradı ama dizine almadı",
    explanation:
      "Google sayfayı çekti, okudu ve dizine almamayı seçti. Teknik bir engel yok: karar içerikle ilgili. En sık sebepler sayfanın başka bir sayfayla büyük ölçüde örtüşmesi, tek başına bir arama niyetini karşılamayacak kadar ince olması, ya da sitede ona işaret eden bağlantı azlığı yüzünden önemsiz görünmesi.",
    howToFix:
      "Sayfanın kendine ait bir sorusu ve cevabı olduğundan emin olun. Yakın konulu başka sayfalarla örtüşüyorsa birleştirip tek adrese yönlendirin. Duracaksa içeriği derinleştirin ve ilgili sayfalardan ona bağlantı verin.",
  },
  "google-discovered-not-indexed": {
    severity: "warning",
    title: "Google keşfetti ama henüz taramadı",
    explanation:
      "Google adresi biliyor ama sayfayı çekmedi. Bu bir içerik kararı değil, bir sıraya girme sorunu: Google siteye ayırdığı tarama bütçesini bu adrese harcamaya değer bulmamış. Büyük sitelerde ve iç bağlantısı zayıf sayfalarda olur.",
    howToFix:
      "Sayfaya site içinden, özellikle sık taranan sayfalardan bağlantı verin ve site haritasında olduğundan emin olun. Sunucu yavaşsa tarama bütçesi de daralır, yanıt süresine bakın.",
  },
  "google-duplicate-no-canonical": {
    severity: "warning",
    title: "Google yinelenen içerik gördü, asıl adres belirtilmemiş",
    explanation:
      "Google bu sayfayı bir başkasının kopyası saydı ve hangisinin asıl olduğunu siz söylemediğiniz için kendi seçti. Seçtiği sayfa sizin istediğiniz olmayabilir; sıralama sinyalleri o adreste toplanır.",
    howToFix:
      "Kopya kümesindeki her sayfaya, asıl saydığınız adresi gösteren bir rel=canonical ekleyin. Kopyalar gereksizse yönlendirin.",
  },
  "google-url-unknown": {
    severity: "warning",
    title: "Google bu adresi hiç bilmiyor",
    explanation:
      "Google adresi hiç duymamış: ne keşfetmiş ne taramış. Sayfaya giden bir yol yok demektir. Dizine girmeyen bir sayfa arama sonuçlarında hiç görünmez.",
    howToFix:
      "Adresi site haritasına ekleyin ve site haritasını Search Console'a gönderin. Ayrıca sitenin taranan sayfalarından bu sayfaya bağlantı verin; Google sayfaları bağlantı takip ederek bulur.",
  },
  "google-rich-results-invalid": {
    severity: "warning",
    title: "Google yapısal veride hata buldu",
    explanation:
      "Sayfadaki yapısal veri (schema.org işaretlemesi) Google'ın zengin sonuç denetiminden geçemedi. Zengin sonuç, arama sonucunda yıldız, SSS açılırı, fiyat gibi ek alanların çıkmasıdır; hatalı işaretleme bunları kapatır. Bu karar Google'ın kendisinden geliyor: yerel bir tarayıcı işaretlemenin geçerli olup olmadığını söyleyemez, yalnızca var olup olmadığını görebilir.",
    howToFix:
      "Adresi Google'ın Zengin Sonuç Testi'nde açın; hangi alanın eksik ya da yanlış türde olduğunu adıyla söyler. Genelde zorunlu bir alanın boş bırakılması ya da sayfada görünmeyen bir şeyin işaretlenmesi olur.",
  },
  "open-graph-missing-site": {
    severity: "info",
    title: "Sitede sosyal medya paylaşım etiketleri (Open Graph) yok",
    explanation:
      "Taranan sayfaların hiçbirinde og:title ya da og:image bulunamadı. Bu etiketler Google sıralamasını doğrudan etkilemez; adresiniz WhatsApp'ta, LinkedIn'de, Slack'te veya X'te paylaşıldığında ne görüneceğini belirler. Yoklarsa bağlantı çıplak bir URL olarak görünür ve paylaşımdan gelen tıklama düşer. Sayfa başına bildirilmiyor: eksiklik tek tek sayfaların değil, şablonun.",
    howToFix:
      "Şablonun <head> bölümüne og:title, og:description ve mutlak adresli (en az 1200x630 piksel) bir og:image ekleyin. Tek bir şablon düzeltmesi tüm sayfaları kapatır.",
  },
  "structured-data-missing-site": {
    severity: "info",
    title: "Sitede hiç yapısal veri yok",
    explanation:
      "Taranan hiçbir sayfada schema.org işaretlemesi bulunamadı. Yapısal veri bir sıralama sinyali değildir; arama sonucunda ek alanların (SSS, ürün, nasıl yapılır, kırıntı yolu) çıkmasını mümkün kılar. Bu alanlar sonuçta kapladığınız yeri ve tıklanma oranını değiştirir.",
    howToFix:
      "Sayfa türüne uyan şemayla başlayın: dokümantasyon için Article ve BreadcrumbList, SSS sayfası için FAQPage, ürün sayfası için Product. İşaretlemenin sayfada gerçekten görünen içeriği anlatması şart; görünmeyeni işaretlemek Google'ın kurallarını ihlal eder.",
  },
  "multiple-canonical-tags": {
    severity: "warning",
    title: "Sayfa birbiriyle çelişen asıl adresler bildiriyor",
    explanation:
      "Sayfanın head bölümünde farklı adresleri gösteren birden çok rel=canonical var. Canonical, içeriğin hangi adreste durduğuna dair tek bir ifadedir; ikisi daha güçlü bir ifade değil, bir çelişkidir. Google çelişkiyi kendi seçimini yaparak çözer, yani asıl adresi siz belirlememiş olursunuz. Genelde şablonun bir değer, bir eklentinin başka bir değer yazmasından çıkar.",
    howToFix:
      "Sayfanın kaynağında rel=canonical arayın; hangisinin doğru olduğuna karar verip diğerini üreten yeri kapatın. Aynı adresi iki kez yazan bir kurulum sorun değildir, bu bulgu yalnızca hedefler farklıyken çıkar.",
  },
  "google-crawl-stale": {
    severity: "info",
    title: "Google bu sayfayı uzun süredir taramadı",
    explanation:
      "Google'ın bu adresi en son ziyareti aylar öncesine dayanıyor. Sayfa dizinde olabilir, ama Google'ın gördüğü sürüm o tarihteki sürüm: o günden sonra yaptığınız hiçbir değişiklik arama sonuçlarına yansımamıştır. Nadiren taranan bir sayfa genelde sitenin geri kalanından yeterince bağlantı almayan ya da Google'ın önemsiz bulduğu bir sayfadır.",
    howToFix:
      "Sayfayı sık taranan sayfalardan bağlantılayın ve site haritasında olduğundan emin olun. İçerik gerçekten güncellendiyse Search Console'dan dizine ekleme isteyebilirsiniz; ama asıl çözüm sayfanın siteye daha iyi bağlanması.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
