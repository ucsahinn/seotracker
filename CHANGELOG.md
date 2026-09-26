# Değişiklik günlüğü

Biçim [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/), sürüm
numaraları [SemVer](https://semver.org/lang/tr/) izler.

## [Yayınlanmamış]

## [0.4.0] — 2026-09-27

İlk kez canlı bir Search Console bağlantısına karşı test edildi ve bu, birim
testlerinin ve fixture koşusunun göremediği bir dizi hatayı ortaya çıkardı.
İki bağımsız inceleme turu da (biri canlı bağlantıyla) bu sürümde açılan
kodda gerçek kusurlar buldu. Denetim kural sayısı 51'den 56'ya, test 628'den
649'a çıktı; uçtan uca fixture koşusu 54'ten 56 kontrole.

### Eklenenler

- **Render test paketi.** `vitest` artık iki proje: `unit` (node) ve `render`
  (happy-dom). Bu turda düzeltilen sekiz "başarısız sorgu boş ekran olarak
  görünüyor" hatasının hiçbirini 628 node testi göremezdi. Paket, kodu
  bilerek bozarak doğrulandı: düzeltme geri alınınca iki assertion kırmızıya
  dönüyor.
- **Engellenmiş kaynak kontrolü** (`blocked-resource`, kritik). Google:
  _"Google Search won't render JavaScript from blocked files or on blocked
  pages."_ Sayfa taranabilir olduğu hâlde onu dolduran script robots.txt ile
  kapalıysa Google boş kabuk görür. Klasik `Disallow: /wp-includes/` hatası.
- **Viewport kontrolü** (`missing-viewport`). Lighthouse bunu zaten
  denetliyor ama en fazla on örnek sayfada; bu kontrol taranan her sayfayı
  kapsıyor.
- **İki site haritası sınırı:** okunamayacak kadar büyük parça ve 50.000
  adresi aşan parça. Öncesinde büyük parça sessizce düşüyor ve sayfaları
  denetimden yok oluyordu.
- **`stale-google-verdicts`.** Google'ın eskimiş kararları artık taze
  kararmış gibi raporlanmıyor; kaç tanesinin yenilenmesi gerektiği tek bir
  bilgi bulgusu olarak söyleniyor.

### Düzeltilenler

- **Türkçe anahtar kelime bozulması.** `IŞIK` kaydedilince `işik` olarak
  saklanıyordu — Türkçede olmayan bir kelime — ve `İstanbul` `i` + ayrı bir
  nokta oluyordu. Saklanan değer aynı zamanda gösterilen değerdi. Artık
  kelime yazıldığı gibi saklanıyor, eşleştirme için ayrı bir anahtar
  tutuluyor (migration 0055); etiket tablosu bunu baştan beri böyle yapıyordu.
  Eski satırlardaki bozulma geri alınamıyor.
- **`D1_ERROR: too many SQL variables`.** İndeksleme kapsamı okuması
  denetimdeki tüm adresleri tek sorguya bağlıyordu; D1'in sınırı 100. 100
  sayfadan büyük her denetimde ekran tamamen çalışmıyordu — yani gerçek
  sitelerin çoğunda. Fixture sitesi sınırın altında olduğu için hiç
  görülmemişti.
- **Geçerli hreflang kodları geçersiz sayılıyordu.** Sahte bölge listesi
  `uk`/`eu`/`un`; kontrol kodun son parçasına bakıyordu, yani tek parçalı bir
  dil kodunda dili bölge sanıyordu. `uk` Ukraynaca, `eu` Baskça — doğru
  markup'ı olan siteye "bozuk" deniyordu.
- **Üç yorum var olmayan bir katlamayı iddia ediyordu.** `canonicalUrlKey`
  sondaki eğik çizgiyi bilerek koruyor; üç çağrı noktası tersini varsayıyordu.
  Sonuç: hreflang kendini listelemiyor sanılıyor, canonical uyuşmazlığı iki
  ekranda farklı cevaplanıyor, dönüş etiketi sessizce atlanıyordu.
- **Sayfalama kontrolü Google'ın onayladığı yerde tetikleniyordu.**
  `?page=1`'i temiz adrese canonical vermek doğru tekilleştirmedir. Ayrıca
  parametre regex ile kesildiği için `?page=2&sort=asc` bozuluyor ve gerçek
  ihlal raporlanmıyordu.
- **Tarama nezaket bütçesi sıfırda sabitlenebiliyordu.** Her başarılı sayfa
  tam bir gecikme kadar borç ödüyordu; bu, varsayılan yoldaki en küçük
  tahakkukla birebir eşit. İki isteğinden birini reddeden bir sunucuya karşı
  tarama süresiz devam ediyordu. Artık geri ödeme kesinlikle daha küçük ve
  yalnızca gerçekten dönen bir sayfa için geçerli — 403 kredi kazanmıyor.
- **`MAX_ROBOTS_TXT_BYTES` bayt değil UTF-16 birimi sayıyordu.** Çok baytlı
  500 KiB'lık bir robots.txt sınırın altında görünüyor ve kesilmiş
  raporlanmıyordu; Google ise baytla sayıp çoktan okumayı bırakmıştı.
- **MCP yüzeyinde dört yanlış cevap:** tüm Lighthouse koşuları başarısızken
  `lighthouse 20/20` yazılıyordu; Google'ın kalıcı 400'ü "geçici olarak
  kullanılamıyor, yeniden bağlanın" diye raporlanıyordu; bağlanmamış bir
  projeye "Sıralama sayfasını açın" deniyordu; ve `get_cannibalization`
  bağlantı yokken tek başına hata fırlatıyordu.
- **`inspect_urls` kota harcamayan yolda şema hatası veriyordu.** Her adres
  önbellekten atlandığında `siteUrl: null` dönüyordu, kendi şeması ise
  `string` diyordu — doğru ve ucuz cevap "Output validation error" olarak
  görünüyordu.
- **`google-blocked-by-meta`** sıradan noindex sayfalarda da tetikleniyor ve
  operatörü olmayan bir render farkını aramaya gönderiyordu.

### Geliştirilenler

- Harness artık deterministik: fixture sitesinin durum sayacı her koşudan
  önce sıfırlanıyor, ve sıfırlama başarısızsa koşu sessizce devam etmek
  yerine gürültüyle duruyor.

## [0.3.0] — 2026-09-26

Bu sürümün büyük kısmı, Google'ın kendi belgelerinin araçtaki karşılığını
tamamlamaktan ve aracın zaten sahip olduğu ama hiçbir ekranın göstermediği
yeteneklerin önünü açmaktan ibaret. Denetim kural sayısı 31'den 51'e çıktı;
MCP yüzeyi 30 araçtan 32'ye; uçtan uca fixture koşusu 49 kontrolden 54'e.

### Eklenenler

- **Ajan bağlantı göstergesi.** `/ai` sayfası bir ajanın bu kuruluma gerçekten
  ulaşıp ulaşmadığını ve en son ne zaman ulaştığını gösteriyor. Bilerek geçmiş
  zaman: MCP oturumsuz HTTP, yani "şu anda bağlı" bilinebilir bir şey değil.
  Otuz günden eski bir çağrı yeşil değil sarı görünür.
- **`get_index_coverage` MCP aracı.** Google'ın daha önce verdiği indeksleme
  kararlarını önbellekten okur ve hiçbir şey çağırmaz. Ajanın tek yolu
  günde 2000 ile sınırlı `inspect_urls`'ti; kırk sayfa sormak kırk kota
  harcıyordu. `inspect_urls` artık son 14 gün içinde yanıtlanmış adresleri
  atlıyor ve neyi neden atladığını söylüyor.
- **`get_sitemaps` MCP aracı ve site haritası paneli.** Google'ın gönderilen
  site haritalarıyla ne yaptığı: indirdi mi, ne zaman, kaç hata buldu. Tarayıcı
  site haritasını zaten okuyordu; eksik olan Google'ın tarafıydı.
- **Ölçüm durumu ekranı.** GA4 mülkünün gerçekten ölçüp ölçmediğini kontrol
  eder. Servis baştan beri vardı ve yalnızca ajan erişebiliyordu.
- **Yirmi yeni denetim kuralı**, hepsi Google'ın kendi belgelerine dayanıyor:
  site haritasındaki ölü ve yönlendiren adresler, robots.txt'nin 5xx / erişilemez
  / 500 KiB'ı aşan hâlleri, başlangıç adresini engelleyen robots.txt, site
  haritası ile robots.txt'nin çeliştiği adresler, geçersiz hreflang kodları,
  kendini listelemeyen hreflang kümesi, bağlantılarını kapatan indekslenebilir
  sayfa, ilk sayfaya canonical veren sayfalama, viewport etiketi eksikliği ve
  Google'ın kendi kararları (soft 404, robots/meta engeli, farklı canonical
  seçimi).
- **İki yeni SEO becerisi:** `seo-check-in` (aylık "ne değişti", tarama ve kota
  harcamaz) ve `seo-triage` (düşüş incelemesi; ilk sorduğu şey düşüşün gerçek
  olup olmadığı). Toplam altı açık beceri.

### Düzeltilenler

- `pnpm run verify:local` her koşuda yeni bir proje bırakıyordu; artık tek bir
  `seotracker verify` projesini yeniden kullanıyor.
- Dört ekran başarısız sorguyu "veri yok" diye gösteriyordu: tamamlanmış ama
  sonuçları alınamayan denetim boş sayfa, başarısız panel özeti "hiç denetim
  yapmamışsınız", süren tarama "siteniz sağlıklı", başarısız sıralama geçmişi
  "kayıtlı gün yok".
- Sıralama arşivi ekrandan 480 günle sınırlıydı — Search Console'un kendi
  penceresi, yani arşivin var olma sebebi olan aylar erişilemezdi. Şimdi 1825.
- Çakışma paneli üstündeki tarih, cihaz ve ülke filtrelerini yok sayıyordu.
- Önem derecesi altı yerde iki farklı kaynaktan hesaplanıyordu; aynı düğme
  CSV'ye `Kritik`, JSON'a `warning` yazabiliyordu.
- İndeksleme kutucuğu ile satır rozeti farklı kural kullanıyordu.
- Fırsatlar sayfası üst sınırı sayı gibi gösteriyor, hesaplanmış kesilme
  uyarılarını atıyordu.
- Ölü bir Google yetkisi, o partide zaten ücreti ödenmiş incelemeleri çöpe
  atıyor ve sonraki turda ikinci kez satın alıyordu.
- Panel kurulum kartı var olmayan bir adrese (`/docs/mcp`, yanlış şema ile)
  bağlanıyordu; her kurulumda 404.
- Kenar çubuğu e-postayı hiçbir rotanın karşılamadığı bir uçtan okuyordu: her
  sayfa yüklemesinde başarısız istek, erişilemez hesap menüsü.
- Altı ekranın sekme şeridi klavyeyle gezilemiyordu ve `aria-selected` var
  olmayan bir panele işaret ediyordu. İkisi zaten sekme değildi.
- 22 dosyada Türkçeleşmemiş metin kaldığı görüldü; operatörün kendi Google
  E-Tablosuna inen dışa aktarma başlıkları dahil.
- Kopyalanan kurulum istemi, `MCP_TOKEN` ayarlı kurulumda "token yok" diyordu.

### Güvenlik

- CSRF korumasının tek kayıt satırına bağlı olduğu artık yorumda adıyla yazılı
  ve bir testle korunuyor. Çalışan konteynerde ölçüldü: çapraz-site `Origin`,
  preflight atlayan content-type ve `Origin`siz istek — üçü de 403.
- MCP istemcisinin kendi bildirdiği etiket veritabanına yazılıp arayüzde
  gösteriliyor; karakter listesi ile temizleniyor ve 60 karakterle sınırlı.

## [0.2.0] — 2026-09-22

Bu çatalın kendi ilk sürümü. Temel aldığı nokta
[open-seo](https://github.com/every-app/open-seo) `v0.1.9`; aradaki 61
commit'in 58'i buraya ait. Devralınan `v0.0.1` – `v0.1.9` etiketleri bu
depodan kaldırıldı, çünkü onlar open-seo'nun yayınlarıydı.

### Kaldırılanlar

- Ücretli veri sağlayıcısı (DataForSEO) ve ona bağlı her yüzey: anahtar
  hacimleri, backlink sayıları, rakip sıralamaları, üçüncü taraf SERP verisi.
  Bu veri geri gelmeyecek; araç Search Console'un zaten bildiği şeyin üstüne
  kuruludur.
- Çok kullanıcılı altyapı, Postgres, pazarlama sitesi, barındırılan abonelik
  akışı.

### Eklenenler

- **Servis hesabıyla Google bağlantısı.** OAuth istemcisi kurmanın izin
  ekranı, test kullanıcısı ve redirect URI adımları olmadan Search Console ve
  Analytics'e erişim: hesabı oluşturun, JSON anahtarını Ayarlar'a yapıştırın,
  adresini mülkünüze kullanıcı olarak ekleyin. OAuth yolu duruyor; ikisi
  birden varsa servis hesabı kazanır.
- **Yerel Search Console arşivi ve sıralama takibi.** Google veriyi 16 ay
  sonra siliyor; bu arşiv yerelde tutuluyor ve sayfa her açıldığında eksik
  günleri tamamlıyor. Zamanlanmış görev gerekmez.
- **Çekirdek Web Verileri saha verisi** ve denetim tazeliği: bir denetimden
  diğerine neyin değiştiği.
- **Fırsatlar ekranı.** 4. ile 20. sıradaki sayfalar, talep + iş değeri +
  erişilebilirlik bileşenlerine göre sıralı.
- **`/mcp` için isteğe bağlı paylaşılan anahtar** (`MCP_TOKEN`), varsayılan
  kapalı.
- **Güncelleme denetimi.** Ayarlar → Hakkında, günde bir kez GitHub'a bakıp
  yeni sürüm yayımlanmış mı söyler. Kapatılabilir; kapalıyken istek hiç
  kurulmaz.
- **Analytics raporları ekranı.** Yedi GA4 raporu — giriş sayfaları, sayfa
  performansı, trafik kaynakları, anahtar olaylar, e-ticaret, site içi arama,
  kitle dağılımı. Motor baştan beri vardı ve yalnızca ajanlar erişebiliyordu.
- **Ajanlar için iki yeni MCP aracı.** `get_ranking_history` yerel arşivi
  okur (Google'ın 16 aylık penceresinden sonrasını da), `get_cannibalization`
  aynı sorgu için yarışan kendi sayfalarınızı bulur — Search Console bunu
  gösteremez, çünkü sırayı hangi sayfanın kazandığını söylemez.
- **`pnpm run verify:local`** — çalışan bir kurulumu uçtan uca sınayan
  betik: sağlık ucu, MCP araç listesi, gerçek bir site denetimi.

### Değişenler

- **Arayüz tamamen Türkçe.** Ajanların okuduğu MCP açıklamaları ve kod
  yorumları İngilizce kalır.
- **Tek bir tasarım sistemi.** Dokuz ayrı sayfa genişliği yerine iki; elle
  seçilmiş metin alfaları yerine tema token'ları; tüm ekranlar ortak
  `PageShell` çerçevesinde.
- İmaj bu depodan derleniyor, bir yerden indirilmiyor.
- Hız skorları Lighthouse yerine Google PageSpeed Insights ile.
- Fırsat puanlaması orta-sıra (mid-rank) üzerinden: bir sayfanın değerini
  ölçmek ona puan kaybettiremez.
- Search Console arşivi, Google'ın hâlâ revize ettiği pencereyi her açılışta
  yeniden okur.

### Düzeltilenler

- Google hataları artık ekranlarda yutulmuyor: başarısız bir sorgu "boş
  sonuç" gibi gösterilmiyor, OAuth hataları kullanıcıya sebebiyle dönüyor.
- Ekranların birbiriyle çelişen dört sayısı: 28 günlük pencere 29 gündü,
  çakışan GA4 satırları toplanmıyordu, kanonik uyuşmazlığı kutucuğu ile
  sütunu farklı kural kullanıyordu, yüzde iki ayrı biçimde basılıyordu.
- Başarısız bir URL indeksleme yığınını süresiz kilitlemiyor.
- Konteyner açılışı: bayat durable object, CRLF entrypoint, isteğe bağlı
  `.env`.
- Servis hesabıyla seçilen mülk artık kaydedilebiliyor.

### Güvenlik

- Saklanan Google kimlik bilgileri için gerçek anahtar türetme (PBKDF2,
  tuzlu). Eski biçimde mühürlenmiş değerler okunmaya devam eder.
- Bir ajanın `/mcp` üzerinden harcayabileceği Google kotası ve başlatabileceği
  eş zamanlı denetim sayısı sınırlandı.
- Tarayıcı, DNS'e ulaşamadığında hedefi geçirmek yerine reddediyor.
- Açılış denetimi, kimlik doğrulaması kapalıyken uygulamanın dışarı açık
  olduğunu fark edip uyarıyor.

### Veritabanı

- Yeni göç: `update_check`. Konteyner açılışta kendiliğinden uygular.
  Verileriniz `seotracker_data` biriminde; güncellemeden önce yedek almak
  isteyebilirsiniz.

[0.4.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.4.0
[0.3.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.3.0
[0.2.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.2.0
