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
  "canonical-conflict": {
    severity: "warning",
    title: "Çelişen canonical sinyalleri",
    explanation:
      "Sayfa, HTML içindeki <link rel=canonical> ile HTTP Link başlığında farklı asıl adresler bildiriyor. Sinyaller çeliştiğinde arama motoru ikisini de yok sayıp kendi seçimini yapar.",
    howToFix:
      "Tek bir asıl adres seçin ve yalnız bir yerde bildirin (genelde HTML head). Diğer bildirimi kaldırın ya da aynı adrese getirin.",
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
  "google-soft-404": {
    severity: "critical",
    title: "Google sayfayı soft 404 sayıyor",
    explanation:
      "Sayfa 200 döndürüyor ama Google onu 'bulunamadı' olarak değerlendiriyor. Google bunu Sayfa dizine ekleme raporunda soft 404 diye adlandırır ve sayfayı dizine almaz. Bir tarayıcı bunu kendi başına göremez: durum kodu sağlıklı görünür, kararı veren Google'dır. Genellikle boş sonuç sayfaları, silinmiş ürünler ya da 'kayıt bulunamadı' mesajı gösteren şablonlarda olur.",
    howToFix:
      "Sayfa gerçekten yoksa 404 ya da 410 döndürün. Varsa, içeriğinin gerçekten var olduğunu belli edecek kadar dolu olduğundan emin olun; boş liste şablonları en sık nedendir.",
  },
  "google-blocked-by-robots": {
    severity: "critical",
    title: "Google sayfayı robots.txt nedeniyle tarayamıyor",
    explanation:
      "Google'ın kendi URL denetimi bu adresi robots.txt'nin engellediğini söylüyor. Bu denetimin tarayıcısı sayfaya ulaşabildiği hâlde Google ulaşamıyorsa, iki tarayıcıya farklı kurallar uygulanıyor demektir.",
    howToFix:
      "robots.txt'de bu adresi kapsayan Disallow satırını bulun. Google'ın kullandığı user-agent adına özel bir kural olup olmadığını kontrol edin; çoğu zaman genel kural değil, Googlebot'a özel bir satır olur.",
  },
  "google-blocked-by-meta": {
    severity: "warning",
    title: "Google sayfada noindex görüyor",
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
} as const satisfies Record<string, AuditIssueDescriptor>;
