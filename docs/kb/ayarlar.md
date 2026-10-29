---
title: Ayarlar
description: Tema, dil, bildirimler, Google kimlikleri, PageSpeed anahtarı ve sürüm kontrolü; hangi ayar tarayıcıya, hangisi tüm kuruluma uygulanır.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

**Ayarlar** tüm kurulum için geçerli seçimleri tutar. Bir projeye özel ayarlar (ad, alan adı, ülke, dil ve Google mülkleri) burada değil, o projenin **Proje ayarları** ekranındadır.

## Hangi ayar nereye uygulanır

| Ayar                              | Kapsam       | Nerede                                  |
| --------------------------------- | ------------ | --------------------------------------- |
| Tema ve dil                       | Bu tarayıcı  | **Ayarlar → Görünüm**                   |
| Bildirim sesi                     | Bu tarayıcı  | **Ayarlar → Bildirimler**               |
| Google kimlikleri                 | Tüm projeler | **Ayarlar → Google**, **Hizmet hesabı** |
| PageSpeed anahtarı                | Tüm projeler | **Ayarlar → Hız ölçümü**                |
| Ad, alan adı, ülke, dil           | Tek proje    | **Proje ayarları → Genel**              |
| Search Console ve Analytics mülkü | Tek proje    | **Proje ayarları → Bağlantılar**        |

## Görünüm

Tema bu tarayıcıda saklanır. Dili değiştirmek için listeden seçin ve **Dili uygula** düğmesine basın; listede gezinmek sayfayı değiştirmez. Projenin ülke ve dil ayarı ayrı bir şeydir: kayıtlı kelimelerin varsayılan pazarını belirler. Arama performansındaki ülke filtresi de proje ülkesinden bağımsız seçilir.

## Bildirimler

Uygulama açıkken bildirimler ekranda görünür. Sekme arka plandayken gelenler bildirim geçmişinde saklanır. **Bildirim sesi** önemli bildirimlerin sesini açar ya da kapatır. **Sesi dinle** ve **Uygulama bildirimini dene** ile deneyebilirsiniz.

## Google kimlikleri

Google kimliği tüm projeler için geçerlidir. Hem hizmet hesabı hem OAuth istemcisi kayıtlıysa hizmet hesabı kullanılır. Adım adım kurulum için [Google'a bağlanma](/docs/google-baglantisi/) sayfasına bakın.

Hizmet hesabını kaydetmek için JSON dosyasını seçin ya da **JSON içeriğini gizli yapıştır** alanını kullanın, sonra **Kaydet** düğmesine basın. Özel anahtar ekranda gösterilmez.

**Kayıtlı** rozeti yalnızca kimliğin saklandığını söyler; Google'ın erişim verdiğini doğrulamaz. Kimlik okunamazsa son kayıt korunur ve yeniden deneme önerilir.

## Hız ölçümü

PageSpeed anahtarı isteğe bağlıdır. Anahtar yoksa her denetim en fazla 50 sayfayı ölçmeyi dener; Google daha erken durdurabilir. Anahtar da başarı garantisi vermez. Ayrıntılar [PageSpeed anahtarı](/docs/pagespeed-anahtari/) sayfasındadır.

## Sınırlar

**Google ve sistem sınırları** bölümü uygulamanın kendi tuttuğu sayaçları gösterir. **Sınırları gösterilen proje** listesinden bir proje seçin.

- **URL Denetimi:** Bu mülk için uygulamanın son 24 saatte yaptığı istekler. Google'daki tüm kullanımı saymaz.
- **PageSpeed:** Son 24 saatte başlayan denetimlerin istekleri.
- **GA4:** Son yanıttaki kalan kota. Standart mülk sınırı bir varsayımdır.
- **Denetim sayfaları:** Proje alan adındaki son tamamlanan denetimden gelir.
- **Rapor ve şablon:** Projenin tüm kayıtları.

Eski ya da okunamayan bir sayaç sıfır yazılmaz; özet satırı kaç sınırın kullanımının bilinmediğini söyler.

## Windows

Bu bölüm yalnızca Windows sürümünde görünür. **Windows açılınca başlat** ve **Otomatik güncelleme kurulumu** tercihleri tepsi uygulamasına kaydedilir. Docker sürümünde bu anahtarlar yoktur.

Tepsi uygulamasına ulaşılamazsa bu, ayarın kapalı olduğu anlamına gelmez; **Tekrar dene** ile yeniden okuyun. Bir ayarı yönetici kilitlediyse nedeni yanında yazar.

### Windows bildirimleri

Bu tercih tepsi menüsündedir: seowatcher simgesine sağ tıklayın ve **Windows bildirimleri** seçeneğini açın ya da kapatın. Varsayılan açıktır.

Açıkken, tarayıcı kapalı olsa bile tüm projelerdeki tamamlanan ya da başarısız denetimler ve yeni duyurular yaklaşık 90 saniye içinde Windows bildirimi olarak gelir. Bildirime tıklamak ilgili sayfayı açar. Aynı anda birden çok olay varsa tek özette toplanır.

- İlk açılışta geçmiş olaylar gösterilmez. Yeniden başlatmak gösterilmiş olayları tekrarlamaz.
- Tercih kapalıyken ya da başlatıcı çalışmazken gelen olaylar sonradan gösterilmez.
- Windows'un Odaklanma ya da Rahatsız etmeyin modu bildirimleri gizleyebilir.
- Yeni sürüm bildirimleri, güncelleme ayarınıza uyar.

## Hakkında ve sürüm kontrolü

**Uygulama içi sürüm kontrolü** açıkken uygulama en çok altı saatte bir GitHub'da yeni sürüm arar; **Şimdi kontrol et** hemen bakar. Windows tepsisi bundan bağımsız olarak günde bir kez kontrol edebilir; otomatik kurulum **Windows** bölümünden ayarlanır.

Son başarılı kontrolün tarihi, sürüm bilgisinin ne kadar güncel olduğunu gösterir. GitHub istek sınırı ya da erişim hatası verirse bir süre bekleyip yeniden deneyin. 404 hatası için **Yardım** ekranındaki tanılamayı kullanın. Ayar okunamazsa anahtar değiştirilemez.

<!-- Sources: src/routes/_app/settings/; src/client/features/settings/; src/client/features/notifications/NotificationSettings.tsx; src/client/features/quotas/SystemLimitsSection.tsx -->
