# Değişiklik günlüğü

Biçim [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/), sürüm
numaraları [SemVer](https://semver.org/lang/tr/) izler.

## [Yayınlanmamış]

## [0.11.0] — 2026-09-28

Uygulamanın kendini anlatması: sürüm notları içeride, her ayarın yanında
"nasıl yapılır", ve panelin bağlı-ama-boş hâline nihayet bir cevabı var.

### Eklenenler

- **Sürüm notları Ayarlar'da.** Kendi sunucusunda bir araç güncelleyen kişi
  bir sürüm sayfası görmez: bir komut çalıştırır ve konteyner bir sürüm
  yeni döner. Notlar artık depodaki `CHANGELOG.md`'den okunuyor — ayrı bir
  kopya bir sürümde birbirinden ayrılırdı — çalışan sürüm işaretli, eskiler
  tek tıkla açılıyor.
- **Her ayarın yanında "nasıl yapılır".** Yedi bölüm ve altı alan için,
  etiketi tekrar eden değil işi anlatan metin: OAuth istemcisinin Google
  Cloud'da tam olarak nerede olduğu, PageSpeed anahtarı için önce hangi
  API'nin etkinleştirilmesi gerektiği, servis hesabının neden daha kısa yol
  olduğu. Tetikleyici gerçek bir düğme: klavyeyle erişilir, Escape kapatır,
  `aria-describedby` bağlar.
- **İndeksleme sekmesine dışa aktarma.** Denetimin dört sekmesinden üçünde
  vardı; Google'ın adres başına kararını taşıyan, yani operatörün asıl
  tabloya döktüğü sekmede yoktu.

### Düzeltilenler

- **Bağlı-ama-boş Search Console'un cevabı yoktu.** Google'ın veri
  döndürmediği bir mülkte panelin en görünür bloğu `0 / 0 / -- / --` olarak
  çiziliyor, nedenini söylemiyor ve hiçbir yere gitmiyordu. Bu üçüncü bir
  durum — "bağlı değil" ve "verisi var" ikisi de ele alınmıştı — ve artık
  kendi metnini taşıyor.
- **Sorunlar sekmesinin dışa aktarması odak çipini yok sayıyordu.** Sayfalar
  ve performans için iki sürüm önce giderilen kusurun aynısı buradaydı: bir
  sayfaya odaklanıp CSV'ye basınca denetimdeki tüm sorunlar iniyordu.
- **Sıralama yönü ekran okuyucuya ulaşmıyordu.** `aria-pressed` artan ile
  azalanı aynı okutuyordu; yön `aria-sort` ile başlık hücresine taşındı,
  yani uygulamadaki her sıralanabilir tabloda.
- **Önem derecesi yalnızca renkle anlatılıyordu.** Panel kartındaki 8
  piksellik nokta, metinsiz ve adsızdı.
- **Analytics kartının hatasından çıkış yoktu** — aynı sayfadaki diğer iki
  hata durumunun ikisinde de yeniden deneme vardı.
- **Kurulum listesinin alt başlığı var olmayan bir adımı anlatıyordu** ve
  tamamlanmış iki adımı sayıyordu; artık kaç adım kaldığını söylüyor.
- Toplu seçim çubuğu Türkçe arayüzde "12 selected" yazıyordu.
- Denetim kartının damgası kendi başlığını tekrar ediyordu.
- İki farklı "veri yok" işareti (`—` ve `--`) tek işarete indi, ve `Stat`'ın
  kullanılmayan `tone` desteği dolgu renkleri yerine `--ink-*` jetonlarını
  kullanıyor.

## [0.10.0] — 2026-09-27

Doğrulama turu: iddia edilen ama kanıtlanmamış üç şeyin gerçekten sınanması,
ve kurulumdaki son yanıltıcı dosyanın kaldırılması.

### Kaldırılanlar

- **`.env.example` silindi.** Upstream'den gelen dosya `DATAFORSEO_API_KEY`,
  `AUTUMN_SECRET_KEY`, `LOOPS_*` ve `POSTHOG_*` tanımlıyordu — hiçbiri bu
  çatallamada yok. İki doküman insanlara onu kopyalamamalarını söylüyordu,
  ki bu bir çözüm değil: yeni gelen birinin ilk refleksi
  `cp .env.example .env`. Yerine [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md)
  geldi: `compose.yaml`'ın gerçekten ilettiği sekiz değişken, hangisinin
  Ayarlar'dan girilmesinin daha kolay olduğu, ve `BETTER_AUTH_SECRET`'ın
  zaten kendiliğinden üretildiği. `.gitignore`'daki dört izin girdisi de
  var olmayan dosyaları işaret ediyordu; onlar da gitti.

### Eklenenler

- **Sıralama için regresyon testi.** Bir önceki sürümde düzeltilen "yalnızca
  görünen satırları sıralıyor" kusuru tiplerle doğrulanmıştı, veriyle değil
  — çünkü bu mülkte Search Console verisi yok. Test, tıklamaya göre ikinci
  sayfada duran yüksek gösterimli bir satır kuruyor: sıralama tüm kümeye
  ulaşmıyorsa o satır hiç görünmez. Eski davranış geri konarak kırmızıya
  döndüğü doğrulandı.
- Tablonun boş hâli artık iki durumu ayırıyor: dönemde veri olmaması ile
  filtrelerin hiçbir şeyle eşleşmemesi. İkincisi tek tıkla düzelir,
  birincisi operatörü başka yere gönderir.

### Doğrulananlar

- **Kendi kendine güncellenme, gerçek bir taramada ölçüldü.** vaultpilot.io
  üzerinde 50 sayfalık bir denetim başlatıldı, geçmiş listesine dönüldü ve
  hiç yeniden yükleme yapılmadan izlendi: satır 40. saniyede "Sürüyor"dan
  "Bitti"ye geçti. Panel de yeni denetimi aldı ve doğru `auditId` ile
  bağlandı.
- 23 rotanın tamamı gezildi: hepsi çiziliyor, konsolda hata yok.

## [0.9.0] — 2026-09-27

Açıkta bıraktığım dört işin tamamlanması. Biri yanlış cevap veriyordu, ikisi
gerçek ölçekte çöküyordu, biri de ekranı salt-okunur bırakıyordu.

### Düzeltilenler

- **Arama performansında sıralama yanlış cevap veriyordu.** Google
  sayfalamayı sunucu tarafında yapıyor ve kendi tıklama sırasını
  döndürüyordu; istemci elindeki 25 satırı sıralıyordu. Yani "Gösterim"e
  tıklamak, _tıklamaya göre ilk 25_'in içinden 25'ini yeniden sıralayıp
  bunu "en çok gösterim alan sorgular" diye sunuyordu — tam olarak bu
  tablonun cevaplaması gereken sorunun yanlış cevabı. Search Console'da
  `orderBy` yok, bu yüzden bir kümeyi sıralamanın tek yolu onu elde
  tutmak: tek çağrıda 1000 satıra kadar getirilip tarayıcıda sıralanıyor
  ve sayfalanıyor. Sınıra ulaşıldığında bunu söylüyor.

### Eklenenler

- **İndeksleme tablosu sayfalanıyor.** `ordered.map(...)` ile hiçbir sınır
  olmadan çiziliyordu. Bugün 53 satır, ama bu tablo denetimle birlikte
  büyüyor: kota yetiştiğinde 474 satır olacak.
- **Sayfa satırından o sayfanın sorunlarına geçiş.** Satırın tek çıkışı
  yeni sekmede açılan canlı adresti; bulguları olan bir sayfa onlara
  ulaşamıyordu, üstelik iki taraf da aynı kimliği kullanıyorken. Artık
  "Sorun" sütunu bulgu sayısını gösteriyor ve tıklayınca sorunlar sekmesi
  o adrese odaklanıyor.
- **Raporlar ekranı bir rapor başlatabiliyor.** Raporları `save_report` ile
  ajan yazıyor, insan okuyor — elle HTML yazma yolu yok ve bir belge
  düzenleyici icat etmek kimsenin istemediği bir iş olurdu. Eksik olan
  kaydet düğmesi değil, raporları listeleyen ekrandan bir rapor
  _başlatabilmekti_: panodaki ajan kurulum isteminin aynı şekli.

## [0.8.0] — 2026-09-27

Görünüm durumunun adrese taşınması ve istatistik kartlarının gerçekten
tıklanabilir olması.

### Eklenenler

- **Arama performansında filtreler artık adreste.** Tarih aralığı, cihaz ve
  ülke bileşen durumundaydı — yani yeniden yükleme, Geri ve paylaşılan bir
  bağlantı hepsini varsayılana düşürüyordu. Bu ekranda filtrenin kendisi
  bulgu: "mobil, Türkiye, son 3 ay" cevabın ta kendisi, ve bağlantıyı alan
  kişi gönderenin baktığı şeyi görmüyordu. Her alanda `catch` var, yani elle
  bozulmuş bir adres hata vermek yerine varsayılana düşüyor.
- **İstatistik kartları sekmelerine gidiyor.** "Taranan sayfa 212",
  "Sorunlu sayfa", "Lighthouse testi" ve "Lighthouse hatası" birer `<p>`
  etiketiydi — ekrandaki en tıklanabilir görünen şeyler hiçbir şey
  yapmıyordu. Belirgin bir hedefi olmayan kartlar (ortalamalar, yanıt
  süresi) bilerek hareketsiz kaldı; rastgele bir yere götürmek, hiçbir yere
  götürmemekten kötü.

### Düzeltilenler

- **Performans sekmesinin dışa aktarması da filtreleri yok sayıyordu.**
  Sayfalar sekmesinde giderilen kusurun aynısı buradaydı. Filtrelenmiş
  satırların kimlikleri yukarı bildiriliyor — yeniden filtrelenmiyor, çünkü
  metin filtresi Lighthouse sonucuyla sayfasının birleştirilmesinden gelen
  adrese bakıyor ve o birleştirme olmadan yapılan ikinci bir filtreleme
  sessizce yanlış satırları yazardı.

## [0.7.0] — 2026-09-27

Ekranların tıklanabilir, filtrelenebilir ve kendi kendine güncellenen hâle
getirilmesi. Denetim verisi 212 sayfalık gerçek bir taramaya karşı
doğrulandı.

### Eklenenler

- **Sayfa tablosunda üç yeni sütun: Dizin, Derinlik, Harita.** Tarayıcı bu
  üçünü baştan beri kaydedip tarayıcıya gönderiyordu; hiçbir ekran
  göstermiyordu. Üçü de sıralanabilir, üçünün de filtresi var — "hangi
  sayfaları Google dizine alabiliyor", "hangisi kaç tık derinde", "haritanın
  unuttukları". Gerçek veriyle doğrulandı: 212 sayfa, `noindex` filtresiyle
  2'ye iniyor.
- **Panel kartlarındaki her bulgu artık bir bağlantı.** "Sayfa noindex ·
  2 sayfa"ya tıklamak o denetimin sorunlar sekmesini açıyor.

### Düzeltilenler

- **Panel kartı anlattığı denetime ulaşamıyordu.** `DashboardAuditSummary`
  ve `AuditFreshness` `auditId` taşımıyordu, bu yüzden "Ayrıntılar"
  `/audit`'e gidiyor — yani "474 sayfa tarandı · 3 kritik" okuyup tıklayan
  operatör, yeni bir tarama başlatmasını isteyen bir formda buluyordu
  kendini.
- **Denetim başlatmak hiçbir şeyi tazelemiyordu.** `startAudit` hiçbir
  sorguyu geçersiz kılmıyordu; beş dakika boyunca (genel `staleTime`)
  geçmiş listesi, panel kartı ve tazelik kartı tarama öncesi cevabı
  vermeye devam ediyordu — panelin "sonuçlar bittiğinde görünecek" sözü
  dahil, ki onu tazeleyecek hiçbir şey yoktu.
- **Geçmiş tablosu tarama sürerken donuyordu.** Satır, sert bir yeniden
  yükleme yapılana kadar "Sürüyor"da kalıyordu; üç tık ötedeki ayrıntı
  görünümü ise üç saniyede bir yokluyordu.

### Geliştirilenler

- Tazelik kartındaki yön göstergeleri temanın `--ink-*` jetonlarını
  kullanıyor, dolgu renklerini değil.

## [0.6.0] — 2026-09-27

Kurulumun son parçası da ortam değişkeninden ekrana taşındı, ve gerçek bir
mülke (vaultpilot.io) karşı bakınca ekranların ölçemedikleri şeyi sıfır diye
gösterdiği ortaya çıktı. Üç bağımsız inceleme turu daha yapıldı.

### Eklenenler

- **PageSpeed anahtarı artık Ayarlar'da.** Lighthouse aşamasının kotasını
  yükselten anahtar `PAGESPEED_API_KEY` olarak yalnızca ortamda
  ayarlanabiliyordu — yani dosya düzenleyip konteyneri yeniden kurmak
  gerekiyordu. Google OAuth istemcisiyle aynı yolu izliyor: sunucuda
  şifreleniyor, tarayıcıya bir daha dönmüyor, ortam değişkeni de çalışmaya
  devam ediyor. Kurulumda elle dosya düzenlemeyi gerektiren hiçbir şey
  kalmadı (migration 0056).

### Düzeltilenler

- **Ölçülemeyen değerler sıfır olarak çiziliyordu.** Search Console bağlı ama
  o dönem için verisi olmayan bir mülkte panel ve arama performansı
  "Tıklama 0 · Gösterim 0 · TO %0,0 · **Ortalama sıra 0,0**" gösteriyordu.
  Sıfır gösterimde tıklama oranı 0/0, ortalama sıra da boş kümenin
  ortalamasıdır — ikisi de tanımsız, ve "ortalama sıra 0,0" ilk sonucun
  üstünde bir sıra iddia ediyor ki bu mümkün değil. Artık ikisi de "--".
  Tıklama ve gösterim sıfır kalıyor: onlar gerçek.
- **Sıralama arşivi hiç dolamıyordu.** İlk koşu 480 gün geriden başlıyor;
  orada veri bulamayınca imleci `null` yazıyor, bir sonraki açılış yine aynı
  boş ayları okuyordu. 16 aydan genç her site için arşiv sonsuza dek sıfır
  satırda kalıyor, ekran ise "bu sayfa açıldığında dolmaya başlar" diyordu.
  Artık taranan pencere veriden ayrı tutuluyor (migration 0057); tam bir
  tarama hiçbir şey bulamazsa baştan başlıyor, böylece izni geç yayılan bir
  mülk de kaçırılmıyor. Gerçek mülkte doğrulandı: imleç 2025-10-01'den
  2026-01-29'a ilerledi.
- **Boş arşiv hiçbir şey göstermiyordu.** `rowCount === 0` durumunda durum
  satırı `null` dönüyordu — yani operatörün en çok karşılaştığı hâl, tek
  açıklama olmadan boş bir boşluktu. Artık nereye kadar tarandığını ve
  sıradaki adımı söylüyor.
- **Fırsatlar ekranındaki "250" seçeneği her seferinde hata veriyordu.**
  Listede 250 vardı, doğrulayıcı 250'ye izin veriyordu, servis 100'ün
  üstünde hata fırlatıyordu — üç dosya üç farklı sayı söylüyordu.
- **Dışa aktarma filtreleri yok sayıyordu.** 477 sayfayı 4xx dönen on dörde
  indirip CSV'ye basınca 477 satır iniyordu, ekranda bunu söyleyen hiçbir şey
  olmadan. Artık filtreyi izliyor ve menü kaç satır yazacağını yazıyor.
- **Analytics başlığı tablodan fazlasını iddia ediyordu.** En fazla 50 satır
  gösteren tablonun üstünde veri kümesinin tamamı yazıyordu; artık ikisi de.
- **Lighthouse sorun ayrıntıları fareyle sınırlıydı.** Satırın kendisi
  tıklanabilirdi ama rolü, odağı ve klavye davranışı yoktu — o ekrandaki her
  ayrıntı klavyeyle erişilemezdi.
- **Kayıtlı kelime bildirimi gönderileni sayıyordu.** Zaten kayıtlı on
  kelimeyi tekrar kaydedince "10 kelime kaydedildi" diyordu; yazma çakışmayı
  yok sayan bir upsert.
- **Denetim ekranındaki üç büyük sayı birbirini tutmuyordu.** Satır
  düzeltmesi grup satırlarına uygulanmış, sekme etiketi ve üstündeki
  istatistik kayıt saymaya devam ediyordu — sekiz kırık bağlantısı olan bir
  sayfa ikisini de şişiriyor, gruplar da başlığa toplanmıyordu.

### Geliştirilenler

- Açılış kontrolü ve `/api/health` artık PageSpeed anahtarını kaynağına göre
  değerlendiriyor: veritabanını göremeyen açılış kontrolü bilgi veriyor,
  görebilen sağlık ucu gerçekten anahtar yoksa uyarıyor.
- Denetim sonuçlarındaki sayılar `format.ts` üzerinden geçiyor.

## [0.5.0] — 2026-09-27

Tasarım turu, depo temizliği ve fixture koşusunun belirsizliğinin
giderilmesi. Ölçülenler: 56 denetim kuralı, 32 MCP aracı, 635 test, ve
fixture koşusu ilk kez dört ardışık koşuda da 56/56 (57 sayfa, tarama
tamamlandı).

### Eklenenler

- **Beşinci kurulum adımı: proje bilgisi.** Kurulum boşluklarının en
  sessizi: hiçbir şey hata vermiyor, denetim çalışıyor, ama "bu sayfalardan
  hangisi para kazandırıyor" diye soran bir ajanın okuyacağı hiçbir şey yok
  ve rapor şablonları siteyi tanımadan yazıyor. Panoda artık söyleniyor.
- Harness neden durduğunu yazıyor. Kuru bir "TRUNCATED" üç kez yanlış
  okundu; koşu hangi sigortanın attığını zaten biliyordu, sadece
  söylemiyordu.

### Düzeltilenler

- **Fixture koşusundaki belirsizlik giderildi.** Aralıklı `NOT CRAWLED`
  bloğu üç kez yanlış teşhis edildi — sayfa sınırı, soğuk başlangıç,
  regresyon — ve hiçbiri değildi. Ölçüldü: dört ardışık 429 tekrar
  sigortasını attırıyor. Throttle bir origin boyunca paylaşılıyor, fixture
  sitesi de bilerek her isteğe 429 dönen iki sayfa sunuyor; `CONCURRENCY =
10`'da araya bir başarının girip girmemesi zamanlama yarışıydı. Koşular
  hiçbir şey değişmeden ~46 ile ~57 sayfa arasında gidip geliyordu. Sigorta
  doğru çalışıyordu, fixture onu tetikliyordu. Artık o iki adres kendi
  throttle'ını alıyor, sitenin geri kalanı üretim ayarlarında kalıyor.
- **"N sayfa" sayfa değil satır sayıyordu.** Bağlantı düzeyindeki
  kontroller her bulgu için bir satır yazıyor, yani sekiz kırık bağlantısı
  olan bir sayfa sekiz sayfa gibi okunuyordu — operatörün az önce
  tıkladığı, tekil adres sayan panodaki kartın tam tersi. Sıralama da artık
  satırın gösterdiği sayıya göre.
- **Sayfalar sekmesi taranan her sayfayı birden çiziyordu.** Gerçek bir
  sitede bu yüzlerce–binlerce satır; sekmenin açılması saniyeler alıyordu.
  Artık istemci tarafında sayfalanıyor.
- **Çakışmalar sekmesindeki dışa aktarma yanlış dosyayı indiriyordu.**
  `tabDimension` o sekme için "query" cevaplıyor, yani ekranda örtüşen
  sayfalar dururken sorgu raporu iniyordu — hiçbir uyarı olmadan.
- **İkinci bir delta bileşeni** (`PercentDelta`) temanın rozetlere ayırdığı
  dolgu renklerini kullanıyor ve yönü hiç seslendirmiyordu. Silindi;
  `MetricTile` bunu ok ve ekran okuyucu metniyle bir kez yapıyor.
- Denetim ilerleme ekranındaki sayılar `format.ts` üzerinden geçiyor.

### Geliştirilenler

- **Tek yarıçap ölçeği artık gerçekten tek.** 23 çıplak `rounded` ve ölçek
  dışı üç yönlü yarıçap, temanın üç jetonuna çevrildi.
- **Dört kullanılmayan bağımlılık kaldırıldı** (`@ai-sdk/react`, `ai`,
  `@modelcontextprotocol/client`, `@modelcontextprotocol/sdk`). MCP v1 SDK
  `agents` üzerinden geçişli olarak duruyor, bu yüzden onu bekleyen dört
  `pnpm-workspace` geçersiz kılması geçerliliğini koruyor. Güvenlik
  uyarıları 29'dan 28'e.
- **Ölü kod silindi:** kilit dosyasında bulunmayan paketleri koruyan
  `workers-ai-provider-stub.ts` ve iki denylist kaydı; yalnızca kendi
  testlerinin çağırdığı yedi `keyword-locations` dışa aktarımı; anahtar
  olmadan yenilenemeyen ücretli API anlık görüntüsü; ve hiçbir yerden
  referans verilmeyen üç görsel — `transparent-logo.png` tek başına her
  kendi kendine barındırma imajında 1.46 MB idi.
- **`.gitleaksignore`** eklendi. Geçmişteki üç bulgu upstream kaynaklı ve
  tasarımı gereği herkese açık jetonlar; artık doğru tanımlanıyorlar.
  `.gitignore`'a anahtar ve sertifika kalıpları eklendi.
- **Dokümantasyon doğruluğu:** README'deki iki manşet sayı dahil altı sayı
  eskimişti (36 → 56 denetim kuralı, 28 → 32 MCP aracı). `AGENTS.md`
  `CLAUDE.md`'nin yarısına kadar birebir kopyasıydı ve orada duruyordu, yani
  onu okuyan bir ajan arayüz kurallarını hiç görmüyordu; artık bir işaretçi.
  Dört ölü doküman yolu — biri kurtarma sırasında operatöre yazdırılıyordu.
  Ve `db:generate` tuzağı belgelendi: 0048'den itibaren göçler elle yazıldı,
  yani komut 0047'ye karşı fark alıyor.

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

[0.11.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.11.0
[0.10.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.10.0
[0.9.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.9.0
[0.8.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.8.0
[0.7.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.7.0
[0.6.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.6.0
[0.5.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.5.0
[0.4.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.4.0
[0.3.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.3.0
[0.2.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.2.0
