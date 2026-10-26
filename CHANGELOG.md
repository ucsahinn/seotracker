# Değişiklik günlüğü

Her sürümde eklenen özellikler ve düzeltilen sorunlar, en yeni sürümden başlayarak listelenir.

## Sürüm numaraları

- **Alpha:** 1.0 gelene kadar tüm sürümler 0.x Alpha'dır.
- **0.MINOR.PATCH:** Kullanıcının fark ettiği her yeni özellik MINOR numarasını artırır (0.7.1 → 0.8.0). Yalnızca düzeltme içeren sürüm PATCH numarasını artırır (0.7.0 → 0.7.1).
- **Yayın başına tek giriş:** Yayımlanan her sürümün bir bölümü vardır. Kullanıcının fark etmediği ara yayınlar komşu sürümle birleştirilir; birleşen girişte yüksek numara ve onun tarihi kalır. GitHub etiketi `v` ve sürüm numarasından oluşur (`v0.7.1`).
- **Yayınlanmamış:** Henüz yayımlanmayan değişiklikler `## [Yayınlanmamış]` başlığında toplanır. Yayın gününde bu başlık sürüm numarası ve tarihle değiştirilir; uygulamadaki sürüm notları bu bölümü göstermez.
- **Araç ve adımlar:** Sürüm numarasını `scripts/bump-version.mjs` taşır. Tam yayın adımları [docs/RELEASING.md](./docs/RELEASING.md) dosyasındadır.

### Eski etiket → Sürüm

0.0.0 ile 0.4.3 arasındaki sürümler ilk yayımlandığında 2.x numarasıyla etiketlendi; numaralar sonradan 0.x olarak yeniden verildi. GitHub'da bu sürümler eski etiketleriyle durur.

| Eski etiket | Sürüm                                              |
| ----------- | -------------------------------------------------- |
| v2.0.0      | 0.0.0                                              |
| v2.1.0      | 0.1.0                                              |
| v2.2.0      | 0.2.1 (0.2.0 bu sürümle birleştirildi)             |
| v2.2.1      | 0.2.1                                              |
| v2.3.0      | 0.3.0                                              |
| v2.4.3      | 0.4.3 (0.3.0'dan sonraki tüm ara yayınları içerir) |

0.5.0 ve sonrası doğrudan `v0.5.0`, `v0.6.0`, `v0.7.0`, `v0.7.1` etiketleriyle yayımlandı.

**v2.4.3 veya daha eski bir Windows kurulumunuz varsa:** Eski güncelleyici 0.x numarasını daha küçük sayıp yeni sürüm olarak görmez, bu yüzden kendiliğinden güncellenmez. En son sürümün kurulum dosyasını GitHub sürüm sayfasından bir kez elle çalıştırın. Verileriniz ve Google bağlantılarınız korunur. Sonraki güncellemeler her zamanki gibi gelir.

## [0.8.0] Alpha — 2026-10-26

### Öne çıkanlar

- **Site denetimi yeniden yazıldı:** 201 kural sayfalara ve sitenin bütününe bakar; güvenlik başlıkları, e-posta ve alan adı kayıtları, SSL ve alan adı süreleri, yapay zekâ botlarının erişimi ve Lighthouse bulguları da içindedir.
- **Dürüst sonuç:** Ölçülemeyen bir kontrol artık "geçti" sayılmaz ve ölçemeyen bir yoklama bulgu üretmez. Veri yoksa ekran bunu açıkça söyler.
- **Yapılacaklar sırası:** Düzeltmeler Search Console trafiğinize göre sıralanır; puan kategorilere göre ağırlıklandırılır.
- **Yeni ekran ve rapor:** Kontroller ve Anlık veri sekmeleri, arama ve paylaşım önizlemeleri, puan geçmişi ve baştan tasarlanan indirilebilir rapor.
- **Altı dilde arayüz:** Almanca, Fransızca, İtalyanca ve Portekizce (Brezilya) eklendi; tüm uygulama Türkçe ve İngilizceyle birlikte altı dilde.

### Site denetimi

- **Site düzeyi kontroller:** Güvenlik başlıkları (HSTS gibi), yönlendirmeler, var olmayan adrese verilen yanıt, robots.txt, SPF ve DMARC kayıtları, SSL sertifikasının ve alan adının bitiş tarihi denetimin başında bir kez yoklanır; her biri tek bir bulgu üretir.
- **Yapay zekâ botları:** robots.txt dosyanızın GPTBot, ClaudeBot ve PerplexityBot gibi yapay zekâ tarayıcılarını engelleyip engellemediği ve llms.txt dosyanızın olup olmadığı kontrol edilir.
- **Lighthouse bulguları:** Hız ölçümü açıkken Lighthouse'un denetimleri sorun olarak listelenir; her birinin tahmini kazancı yazılır.
- **Dış bağlantılar ve görseller:** İsteğe bağlı olarak dış bağlantıların açılıp açılmadığına ve görsellerin gereğinden büyük olup olmadığına bakılır.
- **Daha fazla kural:** Sayfa sinyalleri ve 20'den fazla yeni bulguyla toplam 201 kural. Her kuralın ne demek olduğu ve nasıl düzeltileceği Denetim kuralları kılavuzunda anlatılır.
- **Puan:** Puan kategorilere göre ağırlıklandırılarak hesaplanır.
- **Yapılacaklar:** Düzeltilecek işler Search Console trafiğine göre sıralanır. Search Console bağlı değilse yalnızca puana etkisine göre sıralanır.
- **Kontroller ve Anlık veri:** Kontroller sekmesi geçen ve ölçülemeyen kontrolleri de listeler. Anlık veri sekmesi denetim sırasında ölçülen site bilgilerini ve varsa Temel Web Verilerini gösterir.
- **Önizlemeler:** Google arama sonucu, paylaşım kartı (Open Graph) ve mobil görünüm önizlemesi.
- **Geçmiş ve rapor:** Puan geçmişi, denetimler arasındaki değişimi gösterir. İndirilebilir rapor baştan tasarlandı.

### Diğer yenilikler

- **Arayüz dili:** Ayarlar → Görünüm → Dil bölümünden altı dilden birini seçebilirsiniz; sayı ve tarihler de seçtiğiniz dile uyar.
- **Kurulum yönergeleri:** Windows paketi ile Docker arasındaki farklar, yani ayarların nerede durduğu ve hangilerinin geçerli olduğu, kılavuzda ve Yardım'da açık anlatılır.
- **Ajan araçları:** Yeni `get_audit_summary` aracı site puanını, kategori puanlarını, sıralı yapılacaklar listesini ve sitenin anlık verisini tek çağrıda verir.
- **Kılavuz:** Denetim kuralları sayfası 201 kuralı tek tek anlatır; kılavuz ve sürüm notları altı dilde sunulur.
- **seowatcher.io · gizlilik:** Sitede Google Analytics 4 yalnızca ölçüm kimliği tanımlıysa ve Kabul et derseniz çalışır; kabul etmeden Google'a hiçbir veri gitmez. Gizlilik sayfası altı dilde sunulur.

### Düzeltmeler

- **Denetim doğruluğu:** Gerçek siteler üzerinde yapılan ölçümlerle karşılaştırma turunda bulunan dokuz hata nedeni düzeltildi.
- **Denetim · telefon:** Denetim ekranı ve indirilen rapor telefonda taşmaz.

## [0.7.1] Alpha — 2026-10-26

### Düzeltmeler

- **Duyurular:** Akış, 0.7.0 uygulamasının beklediği ek dil alanlarını İngilizce yedek metinle tamamlar.
- **Yardım · Tanılama paketi:** Başarısız denetimin aşaması, ayıklanmış hata ayrıntısı ve en sık PageSpeed ölçüm hataları eklenir. Sayfa URL'leri dışa aktarılan özetlerden çıkarılır.

## [0.7.0] Alpha — 2026-10-25

### Yenilikler

- **Açılış:** Sunucu hazırlığı ve güncelleme indirme yüzdesi görünür ilerleme penceresinde gösterilir.
- **Windows bildirimleri:** Uygulama güncellemeleri ve canlı duyurular, izin verildiğinde Windows bildirim merkezinde gösterilir. Ayarlar → Bildirimler bölümünden açılıp kapatılır.
- **Duyurular:** Duyurular Türkçe ve İngilizce hazırlanır. Diğer arayüz dillerinde İngilizce sürüm gösterilir.

## [0.6.0] Alpha — 2026-10-24

### Yenilikler

- **Duyurular:** Canlı duyurular uygulamanın Duyurular ekranında görünür. Türkçe ve İngilizce metinleri parola korumalı yönetim ekranından hazırlayıp yayımlayabilirsiniz.
- **Pano:** Panodaki Sıradaki adımlar bölümü Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumuna göre hazırlık puanı ile yönlendirici görevler sunar. Puan SEO başarısı veya arama sırası değildir.
- **Ajan raporları:** Raporlar; denetim ve PageSpeed, Search Console, fırsatlar, sıralama geçmişi, kayıtlı kelimeler, Analytics, dizin ve site haritası verilerini kapsayan bir kontrol listesiyle iyileştirme adımları hazırlar.
- **Gezinme:** Uygulamadaki marka bağlantısı masaüstü ve mobil menüden seowatcher.io sitesini açar.

### Düzeltmeler

- **Ajan raporları:** Rapor yönergeleri tüm ilgili veri kaynaklarının durumunu ve eksik veriyi raporda açıkça belirtir.
- **Gezinme:** Küçük ekranlarda menüdeki marka alanı taşmadan kullanılabilir.

### Güvenlik

- **Duyurular:** Yönetim API'sinde çapraz kaynak erişimi kapatıldı; herkese açık feed yalnızca duyuru okumaya izin verir.

## [0.5.0] Alpha — 2026-10-23

### Yenilikler

- **Dil ayarı:** Arayüzü Türkçe veya İngilizce kullanabilirsiniz. Ayarlar → Görünüm → Dil bölümündeki seçiminiz sayı ve tarihlerin gösterimini de değiştirir.
- **Bildirimler:** Bildirim merkezi denetim sonuçlarını, yeni sürümleri, Google bağlantı sorunlarını ve rapor bildirimlerini bir arada tutar. Bildirim sesi ve masaüstü bildirimleri ayrı ayrı açılıp kapatılabilir.
- **Sürüm notları:** Sol menüde, Bildirimler'in üstünde yer alır. Renkli etiketler her sürümün yeniliklerini, düzeltmelerini ve güvenlik değişikliklerini ayırır.
- **Windows ayarları:** Windows'ta başlangıçta çalışma ve otomatik güncelleme kurulumu Ayarlar → Windows bölümünden açılıp kapatılabilir. Yönetici tarafından sınırlandırılan seçeneklerin nedeni ekranda açıklanır.
- **Denetim:** Denetim sırasında geçen süreyi, ilerlemeyi ve bitiş özetini görebilirsiniz. Rapor hazırlanırken ve güncelleme kontrol edilirken işlemin durumu gösterilir.
- **Yardım:** Her ekranın başlığından ilgili kullanım kılavuzuna ulaşabilirsiniz.

### Düzeltmeler

- **Yeni proje:** Telefonda yeni proje oluştururken ülke listesi artık pencerenin altında kesilmez. Escape tuşu önce ülke listesini kapatır; yazdığınız form açık kalır.
- **Yardım:** Uzun yardım açıklamaları küçük ve kısa pencerelerde ekranın dışında kalmaz.
- **Ayarlar:** Ayarlarda seçtiğiniz bölüm doğru vurgulanır. Windows seçeneklerinin dokunma alanları büyütüldü.
- **Dizin durumu:** Aynı anda yapılan dizin kontrolleri günlük hakkınızı daha doğru kullanır. Gruptaki bir sorgu başarısız olduğunda başarılı sonuçlar korunur.

### Güvenlik

- **Güvenlik güncellemeleri:** Uygulamanın kullandığı bileşenlerdeki güvenlik düzeltmeleri eklendi.

### Güncellemeden önce

2.x sürümünden 0.x Alpha serisine ilk geçişte yeni Windows kurulum dosyasını elle çalıştırın. Eski güncelleyici daha küçük sürüm numarasını yeni sürüm olarak tanımaz. Verileriniz ve Google bağlantılarınız korunur.

## [0.4.3] Alpha — 2026-10-22

0.3.0'dan sonraki tüm ara yayınlar bu sürümde birleştirildi.

### Yenilikler

- **Windows kurulumu:** Kurulum dosyası eksik bileşenleri beraberinde getirir; uygulama temiz bir bilgisayarda da ilk seferde açılır. Dosya adı ve kurulum sihirbazı kurulan sürümü yazar; kaldırma verinizi silmez.
- **Windows güncellemesi:** Görev çubuğundaki Güncelle seçeneği her zaman durur. Yeni sürümü indirir, doğrular ve kurar; kontrol, indirme yüzdesi ve kurulum aşamasını gösterir. İsterseniz güncellemeleri otomatik kurabilirsiniz.
- **Windows · Kendini toparlar:** Sunucu beklenmedik biçimde kapanırsa uygulama kendini yeniden başlatır. Günlük dosyaları büyümez.
- **Yardım · Tanılama:** Kurulumu onar seçeneği açılış sorunlarını gidermeye yardımcı olur. Sorunu bildir hazır bir kayıt açar; kullanıcı adı, site adları ve e-postalar tanı raporunda maskelenir.
- **İlk kurulum:** Ajan kurulumunda Sıfırdan kurulum en üsttedir; Claude Code, Codex ve diğer asistanlar için tek kart ve tek kopyalama düğmesi vardır. Ayarlar'da Google bağlantısı üç adımda anlatılır.
- **Geri bildirim:** Kaydetme, silme ve bağlantı işlemleri beklerken, bitince ve hata olunca ne olduğunu söyler. Silme ve bağlantıyı kesme önce onay ister.
- **Uygulama görünümü:** Menü, ayarlar ve ilk kurulum ekranları sadeleştirildi; iki yüzden fazla ekran metni doğal Türkçeyle yeniden yazıldı. Koyu tema varsayılandır; açık ve koyu tema siteyle tutarlıdır.
- **Windows ve Docker:** Yardım ve ajan yönergeleri iki kurulumu da tanır. Windows'ta görev çubuğunu, Docker'da `docker compose` komutlarını anlatır.
- **Kullanım kılavuzu ve site:** seowatcher.io ve 20 sayfalık kullanım kılavuzu altı dilde sunulur. Sorun giderme sayfaları Belirti, Sebep ve Çözüm kutularıyla yazılmıştır.

### Düzeltmeler

- **Denetim · Fırsatlar:** Telefonda site denetimi ve Fırsatlar ekranlarındaki yatay taşma giderildi.
- **Google bağlantısı:** Yalnızca hizmet hesabıyla bağlı kurulumda gösterilen yanlış "Google erişim anahtarı eksik" uyarısı düzeltildi. Google'dan gelen hatalar artık Google bağlantısını gösterir.
- **Analytics:** Cihaz, kanal ve ülke adları Türkçe görünür; gelir tutarlarında para birimi gösterilir; değişim yüzdeleri her ekranda aynı biçimdedir.
- **Site · indirmeler:** İndirme bağlantısı doğru sürümü gösterir. Tanınmayan adresler boş ekran yerine panele dönüş bağlantılı Sayfa bulunamadı ekranını açar.

## [0.3.0] Alpha — 2026-10-21

### Yenilikler

- **Windows kurulumu:** Windows'a Docker veya terminal kullanmadan tek kurulum dosyasıyla kurabilirsiniz. Uygulama ilk açılışta gerekli anahtarları üretir, veritabanını hazırlar ve tarayıcıyı açar; görev çubuğu simgesinden yönetilir. Kaldırma verinizi silmez.
- **Site:** seowatcher.io üzerinden indirme bağlantılarına, ürün bilgilerine ve kullanım kılavuzuna ulaşabilirsiniz.
- **Kullanım kılavuzu:** Kurulum, özellikler, hazır beceriler ve ajan araçları baştan yazıldı; ürün içi ekran görüntüleri eklendi.

### Düzeltmeler

- **Denetim:** Site denetimindeki sorun özeti kartında sayıların dışarı taşması giderildi.

## [0.2.1] Alpha — 2026-10-04

0.2.0 bu sürümle birleştirildi. Ağırlık hata temizliğindedir; güncellerken verileriniz korunur.

### Yenilikler

- **Ajan kurulumu:** Depoyu yeni indirdiyseniz Ajan kurulumu ekranındaki kurulum istemini ajanınıza yapıştırın; Docker'ı, Google bağlantısını, PageSpeed anahtarını, projeyi ve ajan bağlantısını sırayla kontrol eder. Gizli bilgileri sohbete yapıştırmanızı istemez. Aynı istem Yardım ekranındaki hızlı eylemlerde de bulunur.

### Düzeltmeler

- **Ayarlar · Google:** Ayarlar'dan girilen Google istemcisi yenilemede de kullanılır; yaklaşık bir saat sonra yeniden bağlantı isteme sorunu giderildi. Ayarlar ekranı hangi Google bağlantısının kullanıldığını açıklar.
- **Denetim:** Yarıda kalan veya yeniden denenen denetimlerde önceki başarılı sonuçlar, hız ölçümü dahil, korunur.
- **Denetim · hesaplar:** Sayfa derinliği, site haritası kapsamı ve bağlantısız sayfa tespiti daha doğru hesaplanır. Aynı görünen ama farklı adresler (http ve https, www, sondaki eğik çizgi) asıl adres karşılaştırmasında artık farklı sayılır; bu, daha önce gizlenen gerçek uyuşmazlıkları gösterebilir.
- **Projeler · Google:** Google hesabı veya mülkü değiştirildiğinde eski projeye ait verilerin karışması önlendi. Hesabı kaldırmak yalnızca o hesabın projelerinin verisini siler.
- **Analytics:** Kota kartı doğru kullanımı gösterir ("231 / 200.000"). Rapor boyutları her yerde aynı birimle yazılır. Denetim geçmişindeki sütunların "yüz sayfa başına" olduğu belirtildi.
- **Kayıtlı kelimeler · CSV:** Kayıtlı kelimelerin sırası ve Türkçe karakter içeren CSV dosyalarının Excel'de açılması düzeltildi. 500'den fazla sorgu tek seferde kaydedilebilir.
- **Formlar · hatalar:** Arka planda yenileme başarısız olduğunda açık formdaki yazdıklarınız korunur. Hata mesajları ne olduğunu ve yapılabilecek sonraki adımı söyler.
- **Ajan kurulumu:** Windows ve Git Bash için bağlantı yönergeleri ve Codex komutu düzeltildi. Kelime kaydetme ve proje bilgisi yazma araçlarının onay istemeden çalıştığı araç açıklamalarında açıkça yazar.

### Güvenlik

- **Raporlar:** İndirilen rapor her zaman kendi koruma kuralıyla açılır; kötü niyetli yazılmış bir sayfa korumadan önce çalışamaz.
- **Taranan adresler:** www ve çıplak alan adı taramadan önce ayrı ayrı doğrulanır. Adrese yazılmış kullanıcı adı ve parola reddedilir, ekranda gizlenir.
- **Docker:** Şifreleme anahtarı ve MCP şifresi güvenli biçimde yazılır; var olan anahtarın üzerine hiçbir zaman yazılmaz.

## [0.1.0] Alpha — 2026-10-02

### Yenilikler

- **Codex desteği:** Ajan kurulumu ekranında Codex için ayrı bir yönerge vardır; tek komutla bağlanır, SEO becerilerini kurar ve gerçek bir çağrıyla doğrular.
- **Google ve sistem sınırları:** Günlük URL denetimi hakkınız, Analytics kotanız, bugünkü hız ölçümü sayınız ve rapor sınırlarınız ilgili ekranlarda görünür. Yalnızca gerçekten bilinen sayılar gösterilir; her sayının kaynağı ve zamanı yazar.
- **Hızlı eylemler:** Ana ekranlarda Yenile düğmesi, son güncelleme zamanı ve r kısayolu vardır.
- **Canlı görünüm:** Denetim ilerlemesi taramayı ve hız ölçümünü ayrı çubuklarla, kalan süre tahminiyle gösterir. Hareketi azaltma ayarı açıksa hiçbir animasyon oynamaz.
- **Yardım:** Durumu yeniden kontrol, tanılama paketi, belgeler ve sürüm notları tek çubukta toplandı. Sık sorunlar Docker, dolu port, MCP şifresi, PageSpeed sınırı ve sorgu verisi yok durumlarını anlatır.
- **Ayarlar:** Bölümler arasında hızlı geçiş, her bölümde durum rozeti ve PageSpeed anahtarı için Anahtarı test et düğmesi.

### Düzeltmeler

- **Denetim:** Yarıda kalan denetimler yeni denetim başlatmayı kalıcı olarak engellemez; tamamlanmış denetimler kapasiteyi doldurmaz. Çalışan bir denetimi okuyan ajan "sorun yok" yerine "denetim sürüyor" görür.
- **Projeler · Google:** Projeler arasında geçerken önceki projenin filtreleri ve sonuçları ekranda kalmaz. Search Console mülkünü değiştirince ya da bağlantıyı kesince iki mülkün geçmişi artık karışmaz. Google bağlantısı değişince Fırsatlar, Sıralama takibi ve Analytics eski veriyi tutmaz.
- **Kayıtlı kelimeler:** Türkçe karakterli kelime araması ("çay", "istanbul"), dışa aktarma ve kalan süre tahmini düzeltildi.
- **Ayarlar:** Google istemcisi ortam değişkeninden geliyorsa form artık gizlenmez; Google istemci kimliğinin biçimi kontrol edilir. Güncelleme denetimi başarısız olunca "en güncel" denmez.
- **Silme · bağlantıyı kesme:** Silme ve Google bağlantısını kaldırma işlemleri, kimlik bilgisi silme dahil, onay ister.
- **Arama kutusu · pano:** Arama kutusu her tuşta geçmişe kayıt eklemez, harf kaybı olmaz. Pano kopyalama güvenli olmayan adreslerde de çalışır.

## [0.0.0] Alpha — 2026-10-01

### Neler sunuyor

- Search Console, Analytics, site denetimi ve PageSpeed verileri kendi bilgisayarınızda tek uygulamada toplanır.
- Site sorunlarını, etkilenen sayfaları, hız sonuçlarını ve denetim geçmişini inceleyebilirsiniz.
- Arama performansını ve kayıtlı kelimelerin sıralamasını izleyebilir, iyileştirme fırsatlarını görebilirsiniz.
- Denetim raporlarını indirebilir, yazdırabilir ve ajanlarınızın oluşturduğu raporlarla aynı listede saklayabilirsiniz.
- Açık ve koyu tema, klavye kullanımı ve ekran okuyucu desteği sunulur.

### Başlamadan önce

Google bağlantısını ve PageSpeed anahtarını Ayarlar'dan ekleyin. Ajan bağlantısını uygulamadaki Ajan kurulumu ekranından yapabilirsiniz. Docker kurulumunda bağlantı parolanızı yerel terminalde görmek için:

```
docker compose exec -T seotracker cat /app/.wrangler/mcp-token
```

Parolanızı sohbetlerde veya herkese açık ortamlarda paylaşmayın.
