---
title: Google'a bağlanma
description: Kurulum kimliğini ve proje mülkünü ayrı seçin; kayıt ile veri erişiminin farkını görün.
kind: nasil-yapilir
updated: 2026-10-27
---

## Kimlik ve mülk ayrı seçimlerdir

**Ayarlar** içindeki Google kimliği tüm kuruluma uygulanır; **Proje ayarları → Bağlantılar** içindeki mülk yalnızca o projeye uygulanır. **Kayıtlı** kimliğin saklandığını, **Mülk seçili** ise mülk seçiminin kaydedildiğini söyler. İkisi de rapor verisine erişimin doğrulandığı anlamına gelmez. Son veri durumunu Arama performansı veya Analytics raporundan kontrol edin. Analytics mülkünün saat dilimi ve para birimi kimliğinin yanında görünür. Mülk bağlamak sitenize izleme kodu kurmaz.

## Hizmet hesabı

Google Cloud'da ilgili API'leri etkinleştirin: Search Console API; Analytics için Admin API ve Data API. Hizmet hesabı oluşturup JSON anahtarını indirin. **Ayarlar → Hizmet hesabı** bölümünde dosyayı seçin veya gizli yapıştırma alanını kullanın ve **Kaydet** deyin. Dosyanın özel anahtarı ekranda gösterilmez. Görünen hizmet hesabı e-postasını Search Console mülküne Tam, Analytics mülküne Görüntüleyen olarak ekleyin. Ardından proje bağlantılarında mülkü seçin.

## Google OAuth alternatifi

Google Cloud'da OAuth Web application istemcisi oluşturun. Ayarlar'daki Search Console ve Analytics yönlendirme adreslerinin ikisini de aynen ekleyin. İstemci kimliği ve gizli anahtarı Ayarlar'a kaydedin. Proje bağlantılarından Google iznini verip mülkü seçin. Hizmet hesabı kayıtlıysa öncelikle o kullanılır.

## Sorun çıkarsa

Son mülk listesi okuma hatasında korunur; boş liste erişiminiz olmadığına tek başına kanıt değildir. Süresi dolan izni yeniden bağlayın; erişim reddinde mülk izinlerini, etkin olmayan API'de Cloud projesini kontrol edin. İstek sınırında bekleyip yeniden deneyin. Bilinmeyen hatada **Tekrar dene** ve **Yardım** tanılamasını kullanın. Kimlik silmek Google tarafındaki anahtarı iptal etmez. Alan adını değiştirmek Google mülkünü veya geçmişi değiştirmez.
