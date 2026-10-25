# Sürüm notları

Kullanıcıların fark edeceği yenilikler ve düzeltmeler, en yeni sürümden başlayarak listelenir.

## [0.7.0] Alpha — 2026-10-25

### Yenilikler

- Windows uygulaması açılırken sunucu hazırlığı görünür ilerleme penceresinde gösterilir; güncelleme indirilirken gerçek yüzde görünür.
- Uygulama güncellemeleri ve canlı duyurular, izin verildiğinde Windows bildirim merkezinde gösterilir. Ayarlar → Bildirimler bölümünden açılıp kapatılır.
- Canlı duyurular altı dilde hazırlanıp seçili arayüz dilinde gösterilebilir.

## [0.6.0] Alpha — 2026-10-24

### Yenilikler

- Canlı duyurular uygulamanın Duyurular ekranında görünür. Türkçe ve İngilizce metinleri parola korumalı yönetim ekranından hazırlayıp yayımlayabilirsiniz.
- Panodaki Sıradaki adımlar bölümü Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumuna göre hazırlık puanı ile yönlendirici görevler sunar. Puan SEO başarısı veya arama sırası değildir.
- Ajan raporları denetim ve PageSpeed, Search Console, fırsatlar, sıralama geçmişi, kayıtlı kelimeler, Analytics, dizin ve site haritası verilerini kapsayan bir kontrol listesiyle iyileştirme adımları hazırlar.
- Uygulamadaki marka bağlantısı masaüstü ve mobil menüden seowatcher.io sitesini açar.

### Düzeltmeler

- Rapor yönergeleri tüm ilgili veri kaynaklarının durumunu ve eksik veriyi raporda açıkça belirtir.
- Küçük ekranlarda menüdeki marka alanı taşmadan kullanılabilir.

### Güvenlik

- Yönetim API'sinde çapraz kaynak erişimi kapatıldı; herkese açık feed yalnızca duyuru okumaya izin verir.

## [0.5.0] Alpha — 2026-10-23

### Yenilikler

- Arayüzü Türkçe veya İngilizce kullanabilirsiniz. Ayarlar → Görünüm → Dil bölümündeki seçiminiz sayı ve tarihlerin gösterimini de değiştirir.
- Bildirim merkezi denetim sonuçlarını, yeni sürümleri, Google bağlantı sorunlarını ve rapor bildirimlerini bir arada tutar. Bildirim sesi ve masaüstü bildirimleri ayrı ayrı açılıp kapatılabilir.
- Sürüm notları sol menüde, Bildirimler'in üstünde yer alır. Her sürümün yanındaki renkli etiketler yenilikleri, düzeltmeleri ve güvenlik değişikliklerini gösterir.
- Windows'ta başlangıçta çalışma ve otomatik güncelleme kurulumu Ayarlar → Windows bölümünden açılıp kapatılabilir. Yönetici tarafından sınırlandırılan seçeneklerin nedeni ekranda açıklanır.
- Denetim sırasında geçen süreyi, ilerlemeyi ve bitiş özetini görebilirsiniz. Rapor hazırlanırken ve güncelleme kontrol edilirken işlemin durumu gösterilir.
- Her ekranın başlığından ilgili kullanım kılavuzuna ulaşabilirsiniz.

### Düzeltmeler

- Telefonda yeni proje oluştururken ülke listesi artık pencerenin altında kesilmez. Escape tuşu önce ülke listesini kapatır; yazdığınız form açık kalır.
- Uzun yardım açıklamaları küçük ve kısa pencerelerde ekranın dışında kalmaz.
- Ayarlarda seçtiğiniz bölüm doğru vurgulanır. Windows seçeneklerinin dokunma alanları büyütüldü.
- Aynı anda yapılan dizin kontrolleri günlük hakkınızı daha doğru kullanır. Gruptaki bir sorgu başarısız olduğunda başarılı sonuçlar korunur.

### Güvenlik

- Uygulamanın kullandığı bileşenlerdeki güvenlik düzeltmeleri eklendi.

### Güncellemeden önce

2.x sürümünden 0.x Alpha serisine ilk geçişte yeni Windows kurulum dosyasını elle çalıştırın. Eski güncelleyici daha küçük sürüm numarasını yeni sürüm olarak tanımaz. Verileriniz ve Google bağlantılarınız korunur.

## [0.4.3] Alpha — 2026-10-22

### Yenilikler

- Windows kurulumu eksik bileşenleri beraberinde getirir; uygulama temiz bir bilgisayarda da açılır.
- Yeni sürümler görev çubuğundaki Güncelle seçeneğiyle indirilebilir. İsterseniz güncellemeleri otomatik kurabilirsiniz.
- Kurulumu onar seçeneği açılış sorunlarını gidermeye yardımcı olur. Sorun bildirirken kişisel bilgiler tanı raporunda maskelenir.
- Menü, ayarlar ve ilk kurulum ekranları sadeleştirildi. Açık ve koyu tema uygulamayla site arasında tutarlı hale getirildi.
- Kullanım kılavuzu altı dilde sunulur.

### Düzeltmeler

- Telefonda site denetimi ve Fırsatlar ekranlarında yatay taşma giderildi.
- Yalnızca hizmet hesabıyla bağlı kurulumda gösterilen yanlış Google bağlantı uyarısı düzeltildi.
- Analytics'te cihaz, kanal ve ülke adları ile para birimlerinin gösterimi iyileştirildi.
- Yanlış indirme bağlantıları ve tanınmayan adreslerdeki boş ekran düzeltildi.

## [0.3.0] Alpha — 2026-10-21

### Yenilikler

- Windows'a Docker veya terminal kullanmadan tek kurulum dosyasıyla kurabilirsiniz.
- seowatcher.io üzerinden indirme bağlantılarına, ürün bilgilerine ve kullanım kılavuzuna ulaşabilirsiniz.

### Düzeltmeler

- Site denetimindeki sorun özeti kartında sayıların dışarı taşması giderildi.

## [0.2.1] Alpha — 2026-10-04

### Düzeltmeler

- Ayarlar'dan girilen Google bağlantısının yaklaşık bir saat sonra yeniden bağlantı istemesine neden olan sorun giderildi.
- Yarıda kalan veya yeniden denenen denetimlerde önceki başarılı sonuçlar korunur.
- Sayfa derinliği, site haritası kapsamı ve bağlantısız sayfa tespiti daha doğru hesaplanır.
- Google hesabı veya mülkü değiştirildiğinde eski projeye ait verilerin karışması önlendi.
- Kayıtlı kelimelerin sırası ve Türkçe karakter içeren CSV dosyalarının Excel'de açılması düzeltildi.
- Arka planda yenileme başarısız olduğunda açık formdaki yazdıklarınız korunur. Hatalar yapılabilecek sonraki adımı daha açık anlatır.

### Güvenlik

- İndirilen raporlar ve taranan site adresleri için güvenlik kontrolleri güçlendirildi.

## [0.2.0] Alpha — 2026-10-03

### Yenilikler

- Ajan kurulumu ekranındaki kurulum istemi, ilk kurulumu ve Google bağlantısını adım adım kontrol etmenize yardımcı olur.

### Düzeltmeler

- Analytics kota göstergesi, rapor boyutları ve denetim geçmişindeki karşılaştırmalar düzeltildi.
- Ayarlar ekranı hangi Google bağlantısının kullanıldığını açıklar.
- Windows ve Git Bash için ajan bağlantısı yönergeleri düzeltildi.

## [0.1.0] Alpha — 2026-10-02

### Yenilikler

- Codex için ayrı bağlantı yönergeleri eklendi.
- Google ve sistem sınırları ilgili ekranlarda görünür. Verisi bilinmeyen sayaçlar ayrıca belirtilir.
- Ana ekranlara Yenile düğmesi ve son güncelleme zamanı eklendi.
- Yardım ekranında tanı bilgileri, sık karşılaşılan sorunlar ve hızlı işlemler bir araya getirildi.

### Düzeltmeler

- Yarıda kalan denetimler yeni denetim başlatmayı kalıcı olarak engellemez.
- Projeler arasında geçerken önceki projenin filtreleri ve sonuçları ekranda kalmaz.
- Türkçe kelime araması, dışa aktarma ve kalan süre tahmini düzeltildi.
- Silme ve Google bağlantısını kaldırma işlemleri onay ister.
