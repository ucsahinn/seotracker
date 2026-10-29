---
title: Google'a bağlanma
description: Search Console ve GA4'ü kendi Google Cloud hizmet hesabınız ya da OAuth istemcinizle bağlayın, sonra her proje için mülkleri seçin.
kind: nasil-yapilir
updated: 2026-10-27
---

Bağlantı iki adımdır. Önce Google kimliğini tüm kurulum için bir kez kaydedersiniz. Sonra her projede bir Search Console ve bir Google Analytics 4 mülkü seçersiniz. Kimlik için iki yol vardır: hizmet hesabı (daha kısa yol) ya da Google OAuth istemcisi.

## Kimlik ve mülk farkı

| Seçim  | Kapsam       | Nerede                           | Rozet           |
| ------ | ------------ | -------------------------------- | --------------- |
| Kimlik | Tüm projeler | **Ayarlar → Google kimlikleri**  | **Kayıtlı**     |
| Mülk   | Tek proje    | **Proje ayarları → Bağlantılar** | **Mülk seçili** |

İki rozet de yalnızca kaydı gösterir; Google'ın veri verdiğini doğrulamaz. Erişimin çalıştığını **Arama performansı** ya da **Analytics** ekranında veri görerek anlarsınız. Mülk bağlamak sitenize izleme kodu da kurmaz.

## Yol 1: Hizmet hesabı

1. Google Cloud'da bir proje açın ve şu API'leri etkinleştirin: Search Console API, Google Analytics Admin API ve Google Analytics Data API.
2. Bir hizmet hesabı oluşturun ve JSON anahtar dosyasını indirin.
3. seowatcher'da **Ayarlar → Hizmet hesabı** bölümünde dosyayı seçin ya da **JSON içeriğini gizli yapıştır** alanını kullanın. **Kaydet** düğmesine basın. Özel anahtar ekranda gösterilmez.
4. Ekranda görünen hizmet hesabı e-postasını kopyalayın.
5. Search Console'da **Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle** yolunu izleyin ve bu e-postayı **Tam** izinle ekleyin.
6. Google Analytics'te **Yönetici → Erişim yönetimi** altında aynı e-postayı **Görüntüleyici** rolüyle ekleyin.
7. seowatcher'da projeyi açın, **Proje ayarları → Bağlantılar** altında **Mülk seç** ile mülkü seçip **Mülkü kaydet** düğmesine basın.

## Yol 2: Google OAuth istemcisi

1. Google Cloud'da aynı API'leri etkinleştirin ve "Web application" türünde bir OAuth istemcisi oluşturun.
2. seowatcher **Ayarlar** ekranında gösterilen iki yönlendirme adresini (Search Console ve Analytics için) istemciye aynen ekleyin.
3. İstemci kimliğini ve gizli anahtarı **Ayarlar**'a yazıp kaydedin.
4. **Proje ayarları → Bağlantılar** altında **Google hesabı ekle** ile izni verin, sonra mülkü seçip kaydedin.

Hizmet hesabı da kayıtlıysa uygulama hizmet hesabını kullanır; OAuth kartında **Kullanılmıyor, hizmet hesabı bağlı** yazar.

## Bağlantı kartını okumak

Bağlantı kartı, seçili kimlik ve mülk için son Google okumasını tarihiyle gösterir: **Son başarılı Google okuması** ya da **Son başarısız Google okuması**. Geçici bir hatadan sonra önceki başarılı okumanın tarihi korunur. Hiç okuma yapılmadıysa **Veri erişimi henüz doğrulanmadı.** yazar. Analytics mülkünün saat dilimi ve para birimi de kartta görünür.

Ayarlar ekranını açmak Google'a sorgu göndermez. Kimliği değiştirdiğinizde eski okuma ve kota kayıtları yeni kimliğe taşınmaz; raporları elle yenileyin.

## Sorun çıkarsa

- **Mülk listesi boş:** Bu tek başına erişiminiz olmadığını kanıtlamaz. Okuma hatasında son liste korunur; **Tekrar dene** ile yeniden okuyun.
- **Bağlantının süresi doldu:** **Yeniden bağlan** ile izni yenileyin.
- **Erişim reddedildi:** Hizmet hesabının ya da Google hesabının mülkte izni olduğunu kontrol edin.
- **API etkin değil:** Google Cloud projesinde ilgili API'yi etkinleştirin.
- **İstek sınırı:** Bir süre bekleyip yeniden deneyin.
- **Bilinmeyen hata:** **Tekrar dene**, sonra **Yardım** ekranındaki tanılamayı kullanın.

Kimliği seowatcher'dan silmek, anahtarı Google tarafında iptal etmez; bunu Google Cloud'da yapın. Projenin alan adını değiştirmek de seçili mülkü ya da geçmiş veriyi değiştirmez.

Belirti ve çözüm listesinin tamamı [Sorun giderme](/docs/sorun-giderme/) sayfasındadır.
