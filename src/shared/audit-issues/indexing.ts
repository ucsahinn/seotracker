/** Indexability, canonicalisation, hreflang, and Google's own verdicts. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const INDEXING_ISSUES = {
  "duplicate-title": {
    severity: "warning",
    title: "Yinelenen başlık",
    explanation:
      "Birden çok sayfa aynı başlığı (<title>) kullanıyor. Google sayfaları başlıklarıyla ayırt eder; aynı başlık sayfaları birbiriyle yarıştırır ve arama sonucunda hangisine tıklanacağı belirsizleşir, tıklama oranı düşer.",
    howToFix:
      "Her sayfaya kendi içeriğini anlatan farklı bir başlık yazın. Şablondan üretilen sayfalarda ayırt edici bilgiyi (ürün adı, kategori, şehir) başlık şablonuna ekleyin.",
  },
  "duplicate-meta-description": {
    severity: "warning",
    title: "Yinelenen meta açıklama",
    explanation:
      "Birden çok sayfa aynı meta açıklamayı (arama sonucunda başlığın altındaki özet) kullanıyor. Aramada hepsi aynı özetle çıkar ve ziyaretçi sayfaları ayırt edemez.",
    howToFix:
      "Her sayfaya kendi açıklamasını yazın ya da yinelenen açıklamayı tamamen silin. Açıklama yoksa Google sayfa metninden bir özet seçer; bu, yanlış bir kopyadan iyidir.",
  },
  "duplicate-content": {
    severity: "warning",
    title: "Yinelenen sayfa içeriği",
    explanation:
      "İki ya da daha fazla adres birebir aynı metni gösteriyor. Google bunlardan birini seçip dizine alır ve seçtiği sizin istediğiniz olmayabilir. Ceza değildir, ama sıralama gücü adresler arasında bölünür.",
    howToFix:
      "Asıl adresi (aramada görünmesini istediğiniz tek adres) seçin. Diğerlerinde canonical (asıl adres) etiketi ile asıl adresi gösterin ve mümkünse 301 ile yönlendirin. Sık nedenler: sonda eğik çizgi farkı, adrese eklenen parametreler, http/https ya da www farkı.",
  },
  "missing-canonical": {
    severity: "info",
    title: "Sayfada canonical (asıl adres) etiketi yok",
    explanation:
      "Sayfa, kendi asıl adresini (canonical) belirtmiyor. Aynı sayfa birden çok adresten açılabilir: sonunda eğik çizgi olan ve olmayan, ?utm_source gibi eklerle gelen, www'lu ve www'suz adresler. Etiket yoksa Google bunlardan hangisini göstereceğine kendi karar verir. Google bu etiketi zorunlu değil, önerilen bir işaret sayar; bu yüzden bu yalnızca bir öneridir.",
    howToFix:
      'Sayfanın `<head>` bölümüne kendi tam adresini gösteren şu satırı ekleyin: `<link rel="canonical" href="https://www.siteniz.com/hakkimizda">`. Adres, aramada görünmesini istediğiniz adres olsun. Çoğu site oluşturucu ve SEO eklentisi bunu tek ayarla tüm sayfalara ekler.',
  },
  "canonical-conflict": {
    severity: "warning",
    title: "Asıl adres bildirimleri birbiriyle çelişiyor",
    explanation:
      "Sayfa, asıl adresi iki yerde farklı söylüyor: HTML içindeki canonical etiketinde bir adres, HTTP Link başlığında başka bir adres. Sinyaller çelişince Google ikisini de bırakıp kendi seçimini yapar.",
    howToFix:
      "Tek bir asıl adres seçin ve onu yalnızca bir yerde bildirin (genelde HTML head). Diğerini kaldırın ya da aynı adrese çevirin.",
  },
  "noindex-page": {
    severity: "info",
    title: "Sayfa arama sonuçlarından gizlenmiş (noindex)",
    explanation:
      "Sayfa, arama motorlarından kendisini dizine almamalarını istiyor (robots meta etiketi ya da X-Robots-Tag başlığıyla). Yani sayfa aramada çıkmaz. Çoğu zaman bilerek yapılır; bu bir hata değil, bilgi notudur.",
    howToFix:
      "Sayfa aramada çıkmalıysa noindex yönergesini kaldırın. Bilerek konduysa (yönetim paneli, teşekkür, filtre sayfaları gibi) yapmanız gereken bir şey yok.",
  },
  "canonicalized-page": {
    severity: "info",
    title: "Sayfa, asıl adres olarak başka bir sayfayı gösteriyor",
    explanation:
      "Sayfa asıl adres olarak başka bir adresi gösteriyor, yani Google'dan onun yerine o adresi dizine almasını istiyor. Bilerek yaptıysanız sorun yok (parametreli sayfalar gibi); ama bu sayfanın aramada çıkmasını istiyorsanız sorundur.",
    howToFix:
      "Bu sayfa kendi adıyla aramada çıkacaksa canonical etiketini sayfanın kendi adresine çevirin. Aksi halde yapılacak bir şey yok.",
  },
  "canonical-to-broken": {
    severity: "warning",
    title: "Asıl adres olarak gösterilen sayfa açılmıyor",
    explanation:
      "Sayfa, asıl adres olarak hata veren (404 ya da 5xx) bir adresi gösteriyor. Canonical güçlü bir işarettir ama gösterdiği adres yayında değilse Google onu kullanamaz ve asıl adresi kendi seçer. Sonuç, hiç canonical vermemişsiniz gibi olur.",
    howToFix:
      "Canonical'ı çalışan bir adrese çevirin ya da hedef sayfayı yeniden yayınlayın. Hedef gerçekten kaldırıldıysa canonical sayfanın kendi adresini göstersin.",
  },
  "canonical-to-redirect": {
    severity: "warning",
    title: "Asıl adres olarak yönlendiren bir sayfa gösterilmiş",
    explanation:
      "Sayfa, asıl adres olarak başka yere yönlendiren (3xx) bir adresi gösteriyor. Yönlendirmenin kendisi zaten hedefin asıl olduğunu söyler; yani bu sayfa, asıl olmadığı bilinen bir adresi asıl diye öneriyor.",
    howToFix:
      "Canonical'ı yönlendirmenin vardığı son adrese çevirin; bildirdiğiniz adres ile açılan adres aynı olsun.",
  },
  "canonical-to-noindex": {
    severity: "critical",
    title: "Asıl adres olarak gizlenmiş bir sayfa gösterilmiş",
    explanation:
      "Sayfa, asıl adres olarak noindex ile gizlenmiş bir sayfayı gösteriyor. Noindex kesin bir yönergedir, canonical ise yalnızca bir işarettir; yani bu sayfa, Google'ın hiçbir zaman gösteremeyeceği bir adresi öneriyor ve kendisi de aramadan düşebilir.",
    howToFix:
      "İki yoldan biri: hedef sayfadaki noindex'i kaldırın ya da bu sayfanın canonical etiketini sayfanın kendi adresine çevirin.",
  },
  "google-soft-404": {
    severity: "critical",
    title: "Google sayfayı boş sayıyor (soft 404)",
    explanation:
      "Sayfa normal açılıyor (200) ama Google onu 'bulunamadı' sayıyor (soft 404) ve dizine almıyor. Bunu yalnızca Google söyleyebilir; durum kodu sağlıklı göründüğü için tarayıcılar fark etmez. En sık boş sonuç sayfalarında, silinmiş ürünlerde ve 'kayıt bulunamadı' gösteren şablonlarda olur.",
    howToFix:
      "Sayfa gerçekten yoksa 404 ya da 410 döndürün. Varsa, içeriğinin gerçek ve dolu olduğundan emin olun; boş liste şablonları en sık nedendir.",
  },
  "google-blocked-by-robots": {
    severity: "critical",
    title: "Google sayfayı robots.txt yüzünden tarayamıyor",
    explanation:
      "Google'ın URL denetimi bu adresi robots.txt'nin engellediğini söylüyor. Bizim tarayıcımız sayfaya ulaşabildiği halde Google ulaşamıyorsa, iki tarayıcıya farklı kurallar uygulanıyor demektir.",
    howToFix:
      "robots.txt'te bu adresi kapsayan Disallow satırını bulup kaldırın. Googlebot'a özel bir kural (User-agent: Googlebot) olup olmadığına da bakın; çoğu zaman sorun genel kuralda değil, ona özel satırdadır.",
  },
  "google-blocked-by-meta": {
    severity: "warning",
    title: "Google sayfada gizleme etiketi (noindex) görüyor",
    explanation:
      "Google bu sayfada noindex (aramada gösterme) yönergesi gördüğünü söylüyor. Bizim tarayıcımız sayfayı dizine alınabilir görüyorsa, iki tarayıcı sayfanın farklı sürümlerini okuyor demektir; örneğin yönerge yalnızca JavaScript çalışınca ekleniyor olabilir.",
    howToFix:
      "Sayfanın kaynak kodunu Google'ın gördüğü haliyle karşılaştırın; Search Console'daki canlı test işlenmiş HTML'i gösterir. Noindex'in nereden geldiğini bulup kaldırın.",
  },
  "google-chose-different-canonical": {
    severity: "warning",
    title: "Google başka bir adresi asıl adres seçti",
    explanation:
      "Sayfa bir asıl adres bildiriyor ama Google başka bir adresi seçti. Canonical bir emir değil, öneridir; Google içerik benzerliğine, iç bağlantılara ve site haritasına bakıp farklı karar verebilir. Sonuçta aramada sizin seçtiğiniz adres çıkmaz.",
    howToFix:
      "Google'ın seçtiği adrese bakın. Sayfalar gerçekten aynıysa iç bağlantılarınızı ve site haritanızı istediğiniz adrese çevirin. Farklıysa aradaki farkı içerikte belirginleştirin.",
  },
  "hreflang-invalid-code": {
    severity: "warning",
    title: "Dil sürümü kodu (hreflang) geçersiz",
    explanation:
      'Dil sürümü bağlantısındaki (hreflang) kod Google\'ın beklediği biçimde değil. Google dil için iki harfli kodu (tr, en), istenirse bölge için iki harfli ülke kodunu bekler ve ikisini tire ile ayırır. "UK", "EU" ve "UN" gibi uydurma kodları Google açıkça hata sayar. Geçersiz kod, o dil sürümünün tamamen yok sayılması demektir.',
    howToFix:
      'Birleşik Krallık için "en-GB" yazın; "en-UK" diye bir kod yok. Ayırıcı alt çizgi değil tire olmalı ("en_US" değil "en-US"). "x-default" geçerlidir, olduğu gibi bırakın.',
  },
  "hreflang-missing-self": {
    severity: "warning",
    title: "Dil sürümleri arasında sayfa kendini listelemiyor (hreflang)",
    explanation:
      "Bu sayfa, dil sürümü bağlantılarında (hreflang) diğer dilleri listeliyor ama kendisini listelemiyor. Google'ın belgelerine göre her dil sürümü kendisini de listelemeli; yoksa Google dil sürümlerini birbirine bağlamayabilir.",
    howToFix:
      "Sayfanın kendi adresini, kendi dil koduyla dil sürümü listesine ekleyin. Şablonlarda sorun çoğu zaman listenin geçerli sayfayı atlayarak üretilmesinden kaynaklanır.",
  },
  "nofollow-page": {
    severity: "warning",
    title: "Sayfa robots yönergesiyle bağlantılarını kapatıyor",
    explanation:
      'Sayfada "nofollow" (ya da "none") yönergesi var; yani Google bu sayfadaki bağlantıları izlemez. Google yeni sayfaları çoğunlukla bağlantı izleyerek bulur; sayfa aramada çıkıyor olsa bile ondan çıkan yollar kapalıdır.',
    howToFix:
      'Bağlantıların izlenmesini istiyorsanız yönergeden "nofollow" ifadesini kaldırın. Giriş, filtre ya da kullanıcı içeriği sayfalarında bu bilerek yapılmış olabilir; o durumda yapmanız gereken bir şey yok.',
  },
  "paginated-canonical-to-first-page": {
    severity: "warning",
    title: "Sayfalanmış sayfa, asıl adres olarak ilk sayfayı gösteriyor",
    explanation:
      "Adres bir sayfa numarası taşıyor (2. sayfa gibi) ama asıl adres olarak numarasız ilk sayfayı gösteriyor. Google bunu sayfalama belgelerinde hata sayar: her sayfa kendi adresini asıl adres olarak vermeli. Aksi halde 2. ve sonraki sayfalardaki içerik aramadan düşer.",
    howToFix:
      "Her sayfalama adımının canonical etiketini o sayfanın kendi adresine çevirin. Tüm içeriği tek sayfada gösteren bir sürümünüz varsa Google onun asıl adres olmasına izin verir.",
  },
  "hreflang-missing-x-default": {
    severity: "info",
    title: "Dil sürümlerinde varsayılan sürüm (x-default) yok",
    explanation:
      "Sayfa dil sürümlerini bildiriyor (hreflang) ama varsayılan bir sürüm (x-default) belirtmiyor. x-default, listelenen dillerin hiçbirine uymayan ziyaretçiye hangi sürümün gösterileceğini söyler; yoksa Google seçimi kendisi yapar.",
    howToFix:
      'Dil sürümü listesine `<link rel="alternate" hreflang="x-default" href="...">` satırını ekleyin. Genelde dil seçme sayfası ya da ana pazarınızın sürümü gösterilir.',
  },
  "hreflang-no-return-tag": {
    severity: "warning",
    title: "Dil sürümü karşılıklı bağlanmamış (hreflang)",
    explanation:
      "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres bu sayfayı geri göstermiyor. Dil sürümü bağlantısı iki taraflı çalışır; karşılığı olmayan bildirim yok sayılır, yani iki sayfa da bundan fayda görmez.",
    howToFix:
      "Hedef sayfaya bu sayfayı gösteren bir dil sürümü bağlantısı ekleyin. Gruptaki her sayfa, kendisi dahil tüm sayfaları listelemeli.",
  },
  "stale-google-verdicts": {
    severity: "info",
    title: "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş",
    explanation:
      "Bu sayfalar için saklanan Google yanıtları eskidi. Yanıt, sorulduğu andaki durumu anlatır; sayfa o zamandan beri düzelmiş ya da bozulmuş olabilir. Eski yanıtı güncelmiş gibi göstermemek için bu sayfaların Google yanıtları bu denetimde bulgu sayılmadı.",
    howToFix:
      'Dizin durumu sekmesindeki "Google\'da durumunu kontrol et" düğmesine basın; en eski yanıtlı sayfalar yeniden sorulur. Google günde en fazla 2000 adres sorgulatır, bu yüzden her tıklamada 25 sayfa sorulur; birkaç tıkla liste yenilenir.',
  },
  "google-crawled-not-indexed": {
    severity: "warning",
    title: "Google taradı ama dizine almadı",
    explanation:
      "Google sayfayı çekti, okudu ve dizine almamaya karar verdi. Teknik bir engel yok; karar içerikle ilgili. En sık nedenler: sayfanın başka bir sayfayla büyük ölçüde aynı olması, tek başına bir aramayı karşılayamayacak kadar ince olması ya da siteden çok az bağlantı alıp önemsiz görünmesi.",
    howToFix:
      "Sayfanın kendine ait bir sorusu ve cevabı olduğundan emin olun. Yakın konulu başka sayfalarla örtüşüyorsa birleştirip tek adrese yönlendirin. Sayfa kalacaksa içeriği derinleştirin ve ilgili sayfalardan buraya bağlantı verin.",
  },
  "google-discovered-not-indexed": {
    severity: "warning",
    title: "Google keşfetti ama henüz taramadı",
    explanation:
      "Google bu adresi biliyor ama sayfayı henüz çekmedi. Bu bir içerik kararı değil, sıra sorunu: Google, siteniz için ayırdığı tarama bütçesini (tarama zamanı ve isteği) bu adrese harcamaya değer bulmamış. Büyük sitelerde ve az bağlantı alan sayfalarda olur.",
    howToFix:
      "Sayfaya site içinden, özellikle sık taranan sayfalardan bağlantı verin ve site haritasında olduğundan emin olun. Sunucunuz yavaşsa tarama bütçesi de daralır; sunucu yanıt süresine de bakın.",
  },
  "google-duplicate-no-canonical": {
    severity: "warning",
    title: "Google yinelenen içerik gördü, asıl adres belirtilmemiş",
    explanation:
      "Google bu sayfayı başka bir sayfanın kopyası saydı ve hangisinin asıl olduğunu siz söylemediğiniz için kendisi seçti. Seçtiği sayfa sizin istediğiniz olmayabilir; sıralama gücü de seçtiği adreste toplanır.",
    howToFix:
      "Kopya grubundaki her sayfaya, asıl saydığınız adresi gösteren bir canonical (asıl adres) etiketi ekleyin. Kopyalar gereksizse asıl sayfaya yönlendirin.",
  },
  "google-url-unknown": {
    severity: "warning",
    title: "Google bu adresi hiç bilmiyor",
    explanation:
      "Google bu adresi hiç duymamış: ne keşfetmiş ne taramış. Yani sayfaya giden bir yol yok ve dizine girmeyen sayfa aramada hiç çıkmaz.",
    howToFix:
      "Adresi site haritasına ekleyin ve site haritasını Search Console'a gönderin. Ayrıca sitenizin taranan sayfalarından bu sayfaya bağlantı verin; Google sayfaları bağlantıları izleyerek bulur.",
  },
  "google-rich-results-invalid": {
    severity: "warning",
    title: "Google yapısal veride hata buldu",
    explanation:
      "Sayfadaki yapısal veri (Google'a sayfanın ürün, SSS, tarif gibi ne olduğunu anlatan işaretleme) Google'ın zengin sonuç denetiminden geçemedi. Zengin sonuç, aramada yıldız, SSS açılırı ya da fiyat gibi ek bilgilerin çıkmasıdır; hatalı işaretleme bunları kapatır. Bu kararı yalnızca Google verebilir; bizim tarayıcımız işaretlemenin var olup olmadığını görür, geçerli olup olmadığını göremez.",
    howToFix:
      "Adresi Google'ın Zengin Sonuç Testi'nde açın; hangi alanın eksik ya da yanlış türde olduğunu adıyla söyler. Çoğunlukla zorunlu bir alan boştur ya da sayfada görünmeyen bir şey işaretlenmiştir; düzeltin.",
  },
  "open-graph-missing-site": {
    severity: "info",
    title: "Sitede sosyal medya paylaşım etiketleri (Open Graph) yok",
    explanation:
      "Taranan sayfaların hiçbirinde og:title ya da og:image yok. Bu etiketler Google sıralamasını etkilemez; bağlantınız WhatsApp, LinkedIn, Slack ya da X'te paylaşılınca ne görüneceğini belirler. Yoksa bağlantı çıplak adres olarak görünür ve paylaşımdan gelen tıklama düşer. Bu bulgu sayfa başına değil, site genelinde bir şablon eksiğini gösterir.",
    howToFix:
      "Şablonun <head> bölümüne og:title, og:description ve tam adresli bir og:image (en az 1200x630 piksel) ekleyin. Tek bir şablon düzeltmesi tüm sayfaları kapatır; SEO eklentileri bunu hazır ayar olarak sunar.",
  },
  "structured-data-missing-site": {
    severity: "info",
    title: "Sitede hiç yapısal veri yok",
    explanation:
      "Taranan hiçbir sayfada yapısal veri (Google'a sayfanın ürün, SSS, makale gibi ne olduğunu anlatan işaretleme) yok. Yapısal veri sıralamayı doğrudan etkilemez; ama aramada SSS, ürün, yol haritası ya da kırıntı yolu gibi ek alanların çıkmasını sağlar ve bunlar sonucun kapladığı yeri ve tıklama oranını artırabilir.",
    howToFix:
      "Sayfa türüne uyan işaretlemeyle başlayın: yazılar için Article ve BreadcrumbList, SSS sayfası için FAQPage, ürün sayfası için Product. İşaretleme sayfada gerçekten görünen içeriği anlatmalı; görünmeyeni işaretlemek Google kurallarına aykırıdır.",
  },
  "multiple-canonical-tags": {
    severity: "warning",
    title: "Sayfa birbiriyle çelişen asıl adresler bildiriyor",
    explanation:
      "Sayfanın head bölümünde farklı adresleri gösteren birden çok canonical (asıl adres) etiketi var. Bu, iki farklı söz demektir, daha güçlü bir söz değil; Google çelişkiyi kendi seçimini yaparak çözer. Genelde şablon bir adres, bir eklenti başka bir adres yazınca olur.",
    howToFix:
      "Sayfa kaynağında canonical etiketlerini bulun, hangisinin doğru olduğuna karar verin ve diğerini üreten ayarı ya da eklentiyi kapatın. Aynı adresi iki kez yazan kurulum sorun değildir; bulgu yalnızca adresler farklıyken çıkar.",
  },
  "google-crawl-stale": {
    severity: "info",
    title: "Google bu sayfayı uzun süredir taramadı",
    explanation:
      "Google bu adresi en son aylar önce ziyaret etmiş. Sayfa dizinde olabilir ama Google'ın gördüğü sürüm o tarihteki sürüm: sonradan yaptığınız değişiklikler aramaya yansımamıştır. Nadiren taranan sayfalar genelde siteden yeterince bağlantı almayan ya da Google'ın önemsiz bulduğu sayfalardır.",
    howToFix:
      "Sayfaya sık taranan sayfalardan bağlantı verin ve site haritasında olduğundan emin olun. İçerik gerçekten güncellendiyse Search Console'dan dizine ekleme isteyebilirsiniz; ama kalıcı çözüm sayfayı siteye daha iyi bağlamaktır.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
