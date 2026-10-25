# Sürüm notları

Kullanıcıların fark edeceği yenilikler ve düzeltmeler, en yeni sürümden başlayarak listelenir.

## [0.7.1] Alpha — 2026-10-26

### Düzeltmeler

- **Duyurular:** Duyuru akışı, 0.7.0 uygulamasının beklediği ek dil alanlarını İngilizce yedek metinlerle tamamlar.
- **Yardım · Tanılama paketi:** Başarısız denetim kaydı hangi aşamada durduğunu, ayıklanmış hata ayrıntısını ve en sık PageSpeed ölçüm hatalarını gösterir. Sayfa URL'leri dışa aktarılan özetlerden çıkarılır.

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

### Yenilikler

- **Windows kurulumu:** Windows kurulumu eksik bileşenleri beraberinde getirir; uygulama temiz bir bilgisayarda da açılır.
- **Windows güncellemesi:** Yeni sürümler görev çubuğundaki Güncelle seçeneğiyle indirilebilir. İsterseniz güncellemeleri otomatik kurabilirsiniz.
- **Yardım · Tanılama:** Kurulumu onar seçeneği açılış sorunlarını gidermeye yardımcı olur. Sorun bildirirken kişisel bilgiler tanı raporunda maskelenir.
- **Uygulama görünümü:** Menü, ayarlar ve ilk kurulum ekranları sadeleştirildi. Açık ve koyu tema uygulamayla site arasında tutarlı hale getirildi.
- **Kullanım kılavuzu:** Kullanım kılavuzu altı dilde sunulur.

### Düzeltmeler

- **Denetim · Fırsatlar:** Telefonda site denetimi ve Fırsatlar ekranlarında yatay taşma giderildi.
- **Google bağlantısı:** Yalnızca hizmet hesabıyla bağlı kurulumda gösterilen yanlış Google bağlantı uyarısı düzeltildi.
- **Analytics:** Analytics'te cihaz, kanal ve ülke adları ile para birimlerinin gösterimi iyileştirildi.
- **Site · indirmeler:** Yanlış indirme bağlantıları ve tanınmayan adreslerdeki boş ekran düzeltildi.

## [0.3.0] Alpha — 2026-10-21

### Yenilikler

- **Windows kurulumu:** Windows'a Docker veya terminal kullanmadan tek kurulum dosyasıyla kurabilirsiniz.
- **Site:** seowatcher.io üzerinden indirme bağlantılarına, ürün bilgilerine ve kullanım kılavuzuna ulaşabilirsiniz.

### Düzeltmeler

- **Denetim:** Site denetimindeki sorun özeti kartında sayıların dışarı taşması giderildi.

## [0.2.1] Alpha — 2026-10-04

### Düzeltmeler

- **Ayarlar · Google:** Ayarlar'dan girilen Google bağlantısının yaklaşık bir saat sonra yeniden bağlantı istemesine neden olan sorun giderildi.
- **Denetim:** Yarıda kalan veya yeniden denenen denetimlerde önceki başarılı sonuçlar korunur.
- **Denetim:** Sayfa derinliği, site haritası kapsamı ve bağlantısız sayfa tespiti daha doğru hesaplanır.
- **Projeler · Google:** Google hesabı veya mülkü değiştirildiğinde eski projeye ait verilerin karışması önlendi.
- **Kayıtlı kelimeler · CSV:** Kayıtlı kelimelerin sırası ve Türkçe karakter içeren CSV dosyalarının Excel'de açılması düzeltildi.
- **Formlar · yenileme:** Arka planda yenileme başarısız olduğunda açık formdaki yazdıklarınız korunur. Hatalar yapılabilecek sonraki adımı daha açık anlatır.

### Güvenlik

- **Raporlar · tarama:** İndirilen raporlar ve taranan site adresleri için güvenlik kontrolleri güçlendirildi.

## [0.2.0] Alpha — 2026-10-03

### Yenilikler

- **Ajan kurulumu:** Ajan kurulumu ekranındaki kurulum istemi, ilk kurulumu ve Google bağlantısını adım adım kontrol etmenize yardımcı olur.

### Düzeltmeler

- **Analytics:** Analytics kota göstergesi, rapor boyutları ve denetim geçmişindeki karşılaştırmalar düzeltildi.
- **Ayarlar:** Ayarlar ekranı hangi Google bağlantısının kullanıldığını açıklar.
- **Ajan kurulumu:** Windows ve Git Bash için ajan bağlantısı yönergeleri düzeltildi.

## [0.1.0] Alpha — 2026-10-02

### Yenilikler

- **Ajan kurulumu:** Codex için ayrı bağlantı yönergeleri eklendi.
- **Google bağlantısı:** Google ve sistem sınırları ilgili ekranlarda görünür. Verisi bilinmeyen sayaçlar ayrıca belirtilir.
- **Ana ekranlar:** Ana ekranlara Yenile düğmesi ve son güncelleme zamanı eklendi.
- **Yardım:** Yardım ekranında tanı bilgileri, sık karşılaşılan sorunlar ve hızlı işlemler bir araya getirildi.

### Düzeltmeler

- **Denetim:** Yarıda kalan denetimler yeni denetim başlatmayı kalıcı olarak engellemez.
- **Projeler:** Projeler arasında geçerken önceki projenin filtreleri ve sonuçları ekranda kalmaz.
- **Kayıtlı kelimeler:** Türkçe kelime araması, dışa aktarma ve kalan süre tahmini düzeltildi.
- **Silme · bağlantıyı kesme:** Silme ve Google bağlantısını kaldırma işlemleri onay ister.
