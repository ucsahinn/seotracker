---
title: Ayarlar
description: Tarayıcı, kurulum ve proje kapsamı; Google kimlikleri, yerel sayaçlar ve sürüm kontrolü.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Ayarlar; bu tarayıcıya (görünüm ve dil), tüm kuruluma (Google kimlikleri, PageSpeed anahtarı, sınırlar ve güncellemeler) uygulanan seçimleri tutar. Projenin adı, alan adı ve Google mülkleri **Proje ayarları** içindedir. Bu sayfa her ayarın kapsamını ve nereden değiştirileceğini anlatır.

## Kapsam ve kullanım

Görünüm bu tarayıcıda saklanır. Dil listesinden seçiminizi yapın ve **Dili uygula** düğmesine basın; yalnızca listede gezinmek sayfayı yenilemez. Projenin ülke/dil varsayılanı ayrı bir ayardır.

Google kimlikleri bu kurulumdaki tüm projeler için geçerlidir. Hizmet hesabı varsa önceliklidir. **Kayıtlı** rozeti anahtarın saklandığını söyler; Google erişimini doğrulamaz. Kimlik okuması başarısızsa son kayıt korunur ve yeniden deneme sunulur. Hizmet hesabı JSON dosyasını seçin veya gizli yapıştırma alanını kullanın, ardından **Kaydet** deyin. Özel anahtar ekranda gösterilmez.

Her projenin adını, alan adını ve Google mülkünü **Proje ayarları** bölümünden yönetirsiniz. Alan adı değişikliği mülkü veya geçmişi kendiliğinden değiştirmez. Ülke ve dil kayıtlı kelimelerin varsayılan pazarıdır; Arama performansında ülke filtresini ayrıca seçersiniz.

## Windows, hız ve sınırlar

Windows tercihleri tepsi uygulamasından doğrulanır. Docker'da anahtarlar gösterilmez. Başlatıcıya ulaşılamaması ayarın kapalı olduğunu göstermez; **Tekrar dene** ile okuyun. Yönetici kilitlerinin nedeni görünür.

PageSpeed anahtarı başarı garantisi vermez. Anahtarsız denetim en fazla 50 sayfayı dener; Google daha erken sınır koyabilir. Anahtar testi example.com için bir mobil istek yapar, denetim ölçüm sayacına eklenmez. Test tarihi görünür; anahtar değişince eski test kaldırılır.

**Sınırlar** bölümündeki proje listesinden kapsamı seçin. URL Denetimi sayacı uygulamanın son 24 saatlik mülk kaydıdır, Google'ın tüm kullanımını saymaz. PageSpeed sayıları yalnızca son 24 saatte başlayan denetimlerindir. GA4 kalan değeri son yanıtın zamanına aittir; standart mülk sınırı varsayımdır. Eski veya eksik kaynaklar bilinmiyor olarak belirtilir. Denetim sayfa sayısı proje alan adındaki son tamamlanan denetimden gelir; rapor ve şablon sayıları projenin tüm kayıtlarıdır.

## Sürüm kontrolü

**Uygulama içi sürüm kontrolü** en çok altı saatte bir GitHub'a bakar. Windows tepsisi bağımsız olarak günlük kontrol yapabilir; otomatik kurulum için **Windows** bölümünü kullanın. Son başarılı kontrol tarihi sürüm bilgisinin yaşını gösterir. GitHub sınır/erişim hatasında bekleyin ve yeniden deneyin; 404 için Yardım tanılamasını kullanın. Ayar okunamazsa anahtar değiştirilemez.

## Windows bildirimleri

Tepsideki seowatcher simgesine sağ tıklayın ve **Windows bildirimleri** seçeneğini kullanın (varsayılan açık). Başlatıcı çalışırken, tarayıcı kapalı veya arka planda olsa da tüm projelerin tamamlanan/başarısız denetimleri ve yeni duyurular yaklaşık 90 saniyede Windows baloncuğu olarak görünür. Tıklamak ilgili sayfayı açar; birden fazla olay tek özette toplanır. İlk kullanım geçmiş olayları göstermez; yeniden başlatmak görülen olayları tekrarlamaz. Kapalıyken gelen olaylar sonradan gösterilmez. Yeni sürüm bildirimleri mevcut güncelleme ayarını izler. Windows Odaklanma/Rahatsız etmeyin bildirimleri gizleyebilir. Başlatıcı kapalıysa bildirim gelmez. Docker sürümünde bu özellik yoktur.
