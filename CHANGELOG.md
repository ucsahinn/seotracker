# Değişiklik günlüğü

Her sürümde eklenen özellikler ve düzeltilen sorunlar, en yeni sürümden başlayarak listelenir.

## Sürüm numaraları

- **Alpha:** 1.0 gelene kadar tüm sürümler 0.x Alpha'dır.
- **0.MINOR.PATCH:** Kullanıcının fark ettiği her yeni özellik MINOR numarasını artırır (0.7.1 → 0.8.0). Yalnızca düzeltme içeren sürüm PATCH numarasını artırır (0.7.0 → 0.7.1).
- **Dört ana giriş:** Yayın notları dört ana girişte toplandı: 0.2.1, 0.4.3, 0.7.1 ve 0.8.0. Her giriş, grubundaki en yüksek yayımlanmış sürümün numarasını ve tarihini taşır; böylece her giriş gerçek bir etikete karşılık gelir. Bundan sonra her yayın tek giriştir; ara yamalar bir sonraki girişe katılır. GitHub etiketi `v` ve sürüm numarasından oluşur (`v0.8.0`).
- **Yayınlanmamış:** Henüz yayımlanmayan değişiklikler `## [Yayınlanmamış]` başlığında toplanır. Yayın gününde bu başlık sürüm numarası ve tarihle değiştirilir; uygulamadaki sürüm notları bu bölümü göstermez.
- **Araç ve adımlar:** Sürüm numarasını `scripts/bump-version.mjs` taşır. Tam yayın adımları [docs/RELEASING.md](./docs/RELEASING.md) dosyasındadır.

### Eski etiket → Sürüm

0.0.0 ile 0.4.3 arasındaki sürümler ilk yayımlandığında 2.x numarasıyla etiketlendi; numaralar sonradan 0.x olarak yeniden verildi. GitHub'da bu sürümler eski etiketleriyle durur. Aşağıdaki tabloda her etiketin hangi girişte okunacağı yazar.

| Eski etiket | Sürüm                                  |
| ----------- | -------------------------------------- |
| v2.0.0      | 0.2.1 (0.0.0 bu girişte birleştirildi) |
| v2.1.0      | 0.2.1 (0.1.0 bu girişte birleştirildi) |
| v2.2.0      | 0.2.1 (0.2.0 bu girişte birleştirildi) |
| v2.2.1      | 0.2.1                                  |
| v2.3.0      | 0.4.3 (0.3.0 bu girişte birleştirildi) |
| v2.4.3      | 0.4.3                                  |
| v0.5.0      | 0.7.1 (0.5.0 bu girişte birleştirildi) |
| v0.6.0      | 0.7.1 (0.6.0 bu girişte birleştirildi) |
| v0.7.0      | 0.7.1 (0.7.0 bu girişte birleştirildi) |
| v0.7.1      | 0.7.1                                  |
| v0.8.0      | 0.8.0                                  |

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

Bu giriş 0.5.0, 0.6.0 ve 0.7.0 sürümlerini de kapsar.

### Yenilikler

- **Duyurular:** Canlı duyurular uygulamanın Duyurular ekranında görünür. Türkçe ve İngilizce hazırlanır; diğer arayüz dillerinde İngilizce sürüm gösterilir. Metinleri parola korumalı yönetim ekranından hazırlayıp yayımlayabilirsiniz.
- **Pano:** Panodaki Sıradaki adımlar bölümü Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumuna göre hazırlık puanı ile yönlendirici görevler sunar. Puan SEO başarısı veya arama sırası değildir.
- **Ajan raporları:** Raporlar; denetim ve PageSpeed, Search Console, fırsatlar, sıralama geçmişi, kayıtlı kelimeler, Analytics, dizin ve site haritası verilerini kapsayan bir kontrol listesiyle iyileştirme adımları hazırlar.
- **Bildirimler:** Bildirim merkezi denetim sonuçlarını, yeni sürümleri, Google bağlantı sorunlarını ve rapor bildirimlerini bir arada tutar. Bildirim sesi ve masaüstü bildirimleri ayrı ayrı açılıp kapatılabilir.
- **Windows bildirimleri:** Uygulama güncellemeleri ve canlı duyurular, izin verildiğinde Windows bildirim merkezinde gösterilir. Ayarlar → Bildirimler bölümünden açılıp kapatılır.
- **Açılış:** Sunucu hazırlığı ve güncelleme indirme yüzdesi görünür ilerleme penceresinde gösterilir.
- **Windows ayarları:** Windows'ta başlangıçta çalışma ve otomatik güncelleme kurulumu Ayarlar → Windows bölümünden açılıp kapatılabilir. Yönetici tarafından sınırlandırılan seçeneklerin nedeni ekranda açıklanır.
- **Denetim:** Denetim sırasında geçen süreyi, ilerlemeyi ve bitiş özetini görebilirsiniz. Rapor hazırlanırken ve güncelleme kontrol edilirken işlemin durumu gösterilir.

### Düzeltmeler

- **Yeni proje:** Telefonda yeni proje oluştururken ülke listesi artık pencerenin altında kesilmez. Escape tuşu önce ülke listesini kapatır; yazdığınız form açık kalır.
- **Yardım · Tanılama paketi:** Başarısız denetimin aşaması, ayıklanmış hata ayrıntısı ve en sık PageSpeed ölçüm hataları eklenir. Sayfa URL'leri dışa aktarılan özetlerden çıkarılır.

### Güvenlik

- **Güvenlik güncellemeleri:** Uygulamanın kullandığı bileşenlerdeki güvenlik düzeltmeleri eklendi.

## [0.4.3] Alpha — 2026-10-23

Bu giriş 0.3.0 sürümünü de kapsar.

### Yenilikler

- **Windows kurulumu:** Windows'a Docker veya terminal kullanmadan tek kurulum dosyasıyla kurabilirsiniz. Dosya eksik bileşenleri beraberinde getirir; uygulama temiz bir bilgisayarda da ilk seferde açılır, gerekli anahtarları üretir, veritabanını hazırlar ve tarayıcıyı açar. Görev çubuğu simgesinden yönetilir; kaldırma verinizi silmez.
- **Windows güncellemesi:** Görev çubuğundaki Güncelle seçeneği her zaman durur. Yeni sürümü indirir, doğrular ve kurar; kontrol, indirme yüzdesi ve kurulum aşamasını gösterir. İsterseniz güncellemeleri otomatik kurabilirsiniz.
- **Windows · Kendini toparlar:** Sunucu beklenmedik biçimde kapanırsa uygulama kendini yeniden başlatır. Günlük dosyaları büyümez.
- **Yardım · Tanılama:** Kurulumu onar seçeneği açılış sorunlarını gidermeye yardımcı olur. Sorunu bildir hazır bir kayıt açar; kullanıcı adı, site adları ve e-postalar tanı raporunda maskelenir.
- **İlk kurulum:** Ajan kurulumunda Sıfırdan kurulum en üsttedir; Claude Code, Codex ve diğer asistanlar için tek kart ve tek kopyalama düğmesi vardır. Ayarlar'da Google bağlantısı üç adımda anlatılır.
- **Geri bildirim:** Kaydetme, silme ve bağlantı işlemleri beklerken, bitince ve hata olunca ne olduğunu söyler. Silme ve bağlantıyı kesme önce onay ister.
- **Uygulama görünümü:** Menü, ayarlar ve ilk kurulum ekranları sadeleştirildi; iki yüzden fazla ekran metni doğal Türkçeyle yeniden yazıldı. Koyu tema varsayılandır; açık ve koyu tema siteyle tutarlıdır.
- **Kullanım kılavuzu ve site:** seowatcher.io ve 20 sayfalık kullanım kılavuzu altı dilde sunulur. Sorun giderme sayfaları Belirti, Sebep ve Çözüm kutularıyla yazılmıştır.

### Düzeltmeler

- **Google bağlantısı:** Yalnızca hizmet hesabıyla bağlı kurulumda gösterilen yanlış "Google erişim anahtarı eksik" uyarısı düzeltildi. Google'dan gelen hatalar artık Google bağlantısını gösterir.
- **Analytics:** Cihaz, kanal ve ülke adları Türkçe görünür; gelir tutarlarında para birimi gösterilir; değişim yüzdeleri her ekranda aynı biçimdedir.
- **Denetim · Fırsatlar:** Telefonda site denetimi ve Fırsatlar ekranlarındaki yatay taşma giderildi.

## [0.2.1] Alpha — 2026-10-04

Bu giriş 0.0.0, 0.1.0 ve 0.2.0 sürümlerini de kapsar: ilk yayın, Docker ile kendi kendine barındırma, Search Console ve GA4 bağlantısı, ilk denetim, raporlar, ajan bağlantısı ve hata temizliği.

### Öne çıkanlar

- **Tek uygulamada veri:** Search Console, Analytics, site denetimi ve PageSpeed verileri kendi bilgisayarınızda tek uygulamada toplanır. Site sorunlarını, etkilenen sayfaları, hız sonuçlarını ve denetim geçmişini inceleyebilirsiniz.
- **İzleme ve raporlar:** Arama performansını ve kayıtlı kelimelerin sıralamasını izler, iyileştirme fırsatlarını görürsünüz. Denetim raporlarını indirebilir, yazdırabilir ve ajanlarınızın raporlarıyla aynı listede saklayabilirsiniz. Açık ve koyu tema, klavye kullanımı ve ekran okuyucu desteği vardır.

### Yenilikler

- **Ajan kurulumu:** Depoyu yeni indirdiyseniz Ajan kurulumu ekranındaki kurulum istemini ajanınıza yapıştırın; Docker'ı, Google bağlantısını, PageSpeed anahtarını, projeyi ve ajan bağlantısını sırayla kontrol eder. Gizli bilgileri sohbete yapıştırmanızı istemez. Aynı istem Yardım ekranındaki hızlı eylemlerde de bulunur.
- **Codex desteği:** Ajan kurulumu ekranında Codex için ayrı bir yönerge vardır; tek komutla bağlanır, SEO becerilerini kurar ve gerçek bir çağrıyla doğrular.
- **Google ve sistem sınırları:** Günlük URL denetimi hakkınız, Analytics kotanız, bugünkü hız ölçümü sayınız ve rapor sınırlarınız ilgili ekranlarda görünür. Yalnızca gerçekten bilinen sayılar gösterilir; her sayının kaynağı ve zamanı yazar.
- **Canlı görünüm:** Denetim ilerlemesi taramayı ve hız ölçümünü ayrı çubuklarla, kalan süre tahminiyle gösterir. Hareketi azaltma ayarı açıksa hiçbir animasyon oynamaz.

### Düzeltmeler

- **Denetim:** Yarıda kalan denetimler yeni denetim başlatmayı kalıcı olarak engellemez; tamamlanmış denetimler kapasiteyi doldurmaz. Çalışan bir denetimi okuyan ajan "sorun yok" yerine "denetim sürüyor" görür.
- **Denetim · hesaplar:** Sayfa derinliği, site haritası kapsamı ve bağlantısız sayfa tespiti daha doğru hesaplanır. Aynı görünen ama farklı adresler (http ve https, www, sondaki eğik çizgi) asıl adres karşılaştırmasında artık farklı sayılır; bu, daha önce gizlenen gerçek uyuşmazlıkları gösterebilir.
- **Projeler · Google:** Google hesabı veya mülkü değiştirildiğinde eski projeye ait verilerin karışması önlendi. Hesabı kaldırmak yalnızca o hesabın projelerinin verisini siler.
- **Ayarlar · Google:** Ayarlar'dan girilen Google istemcisi yenilemede de kullanılır; yaklaşık bir saat sonra yeniden bağlantı isteme sorunu giderildi. Ayarlar ekranı hangi Google bağlantısının kullanıldığını açıklar.

### Güvenlik

- **Raporlar:** İndirilen rapor her zaman kendi koruma kuralıyla açılır; kötü niyetli yazılmış bir sayfa korumadan önce çalışamaz.
