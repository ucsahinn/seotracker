# Değişiklik günlüğü

Biçim [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/), sürüm
numaraları [SemVer](https://semver.org/lang/tr/) izler.

## [Yayınlanmamış]

### Düzeltilenler

- `pnpm run verify:local` her koşuda yeni bir proje bırakıyordu; artık tek bir
  `seotracker verify` projesini yeniden kullanıyor.

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

[0.2.0]: https://github.com/ucsahinn/seotracker/releases/tag/v0.2.0
