---
title: Ayarlar
description: Görünüm, Google istemcisi, hizmet hesabı, PageSpeed anahtarı, Google ve sistem sınırları, sürüm ve güncelleme kontrolü, sürüm notları. Kurulumun tek ayar ekranı.
screen: Ayarlar
route: /settings
updated: 2026-10-22
---

Ayarlar, kurulumun tamamını ilgilendiren şeylerin ekranıdır; proje başına ayarlar (ad, alan adı, Search Console ve Analytics mülkü) ayrıca her projenin **Proje ayarları** sayfasındadır. Burada Google'a bağlanmak için gereken istemciyi, PageSpeed anahtarını, temayı ve güncelleme kontrolünü yönetirsiniz. Sol tarafta sabit bir bölüm listesi vardır: **Görünüm**, **Google**, **Hizmet hesabı**, **Hız ölçümü**, **Sınırlar**, **Hakkında**, **Sürüm notları**. Her bölümün başlığında durumunu söyleyen bir rozet durur.

## Ekranda neler var

**Görünüm.** **Tema**: Sistem, Açık, Koyu. Seçim bu tarayıcıda saklanır; başka bir tarayıcı ya da bilgisayarda ayrı seçilir.

**Google.** Rozet: **Kayıtlı**, **Ortamdan geliyor** (Docker .env ile verilmiş) ya da **Eksik**. Bölüm, Google Cloud Console'a ekleyeceğiniz iki yönlendirme adresini kopyalama düğmeleriyle gösterir ve "ikisini de" eklemeniz gerektiğini vurgular; Analytics adresi eksikse Search Console bağlanır ama Analytics bağlanmaz. Alanlar: **İstemci kimliği** ve **Gizli anahtar**; düğmeler **Kaydet**, **Vazgeç**, kayıt varsa **Değiştir** ve **Sil**. Silme, var olan bağlantıları koparır; "Google istemcisi silinsin mi?" diye sorar. Adım adım kurulum Google'a bağlanma kılavuzundadır.

**Hizmet hesabı (daha kısa yol).** **JSON anahtar dosyası** alanına Google Cloud'dan indirdiğiniz hizmet hesabı dosyasının içeriğini yapıştırırsınız. Kayıt varsa hesabın e-posta adresi ve onu Search Console'a ("Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle", yetki Tam) ve Analytics'e ("Yönetici → Erişim yönetimi", Görüntüleyen) nasıl ekleyeceğiniz yazar. Rozet **Kayıtlı** ya da **Kullanılmıyor**. Kayıtlı hizmet hesabı, OAuth istemcisine tercih edilir; "Şu an kullanılan" satırı hangisinin devrede olduğunu gösterir. Silmek uygulamadan kaldırır ama Google tarafındaki anahtarı iptal etmez; uygulama bunu hatırlatır.

**Hız ölçümü.** **API anahtarı** alanı, **Anahtarı test et** düğmesi ("1 ölçüm harcar", on saniyede bir basılabilir). Rozet **Anahtar kayıtlı**, **Ortam anahtarı** ya da **Anahtar eksik**. Ayrıntı PageSpeed anahtarı kılavuzunda.

**Sınırlar.** "Google ve sistem sınırları" kartları: URL Denetimi (Search Console) günde 2.000, PageSpeed Insights, GA4 günlük ve saatlik belirteç (varsayılan 200.000 ve 40.000; Google yalnızca kalanı bildirir), denetim sayfa sınırı 10.000, proje başına rapor 10.000 ve şablon 10, en büyük rapor 500.000 bayt. Her kartın durumu **Yeterli**, **Azalıyor** (yüzde 70'ten sonra), **Neredeyse doldu** (yüzde 90'dan sonra) ya da **Bilinmiyor**.

**Hakkında.** **Sürüm** satırı (v2.3.0 gibi). **Güncellemeleri kontrol et** anahtarı varsayılan olarak açıktır; açıksa uygulama günde en fazla bir kez GitHub'daki son sürümü sorar ve **Şimdi kontrol et** düğmesi görünür. Yeni sürüm varsa "X yayımlandı." satırı, **Değişiklikler** bağlantısı ve Docker kurulumları için kopyalanacak komut (`git pull && docker compose up -d --build`) gösterilir; Windows paketinde yeni kurulum dosyasını indirmeniz yeter. Diğer durumlar: "En güncel sürümü kullanıyorsunuz.", "Güncelleme kontrolü kapalı; GitHub'a istek gitmiyor.", "Son kontrolde GitHub'a ulaşılamadı."

**Sürüm notları.** Uygulamayla gelen değişiklik günlüğünün sürüm sürüm dökümü.

## Nasıl kullanılır

1. İlk kurulumda sırayla: **Google** bölümüne istemci kimliği ve gizli anahtar, **Hız ölçümü** bölümüne PageSpeed anahtarı. İkisi de kaydedilince projeye geçip mülk seçersiniz.
2. Ayda bir **Sınırlar** bölümüne bakın. "Azalıyor" gördüğünüz kota, o ayki denetim ve soru alışkanlığınızı anlatır; çoğu zaman URL Denetimi sınırıdır.
3. **Hakkında** bölümünde yeni sürüm varsa güncelleyin; sürüm notları neyin değiştiğini söyler. Güncelleme kontrolü bilgisayarınızdan dışarıya giden tek "Google dışı" bağlantıdır; istemiyorsanız anahtarı kapatın.
4. Google istemcisini değiştirmeniz gerekirse (yeni Cloud projesi gibi) **Değiştir** deyin, yeni değerleri yapıştırın; mevcut bağlantılar yeni istemciyle çalışmaz, projelerde **Yeniden bağlan** gerekir.

## Sık sorulanlar

**Gizli anahtarımı ekranda neden göremiyorum?** Sunucu onu şifreli saklar ve tarayıcıya geri göndermez. Ekran yalnızca kayıtlı olduğunu ve kimliği gösterir.

**Docker'da .env ile verdiğim değerle ekrana girdiğim çakışırsa?** Ekrana girilen kazanır; rozet "Ortamdan geliyor" iken bir değer kaydederseniz artık o kullanılır.

**Tema neden bilgisayarımın diğer tarayıcısında farklı?** Tema tarayıcıda saklanır, veritabanında değil.

**Güncelleme kontrolü ne gönderiyor?** Hiçbir veri göndermez; GitHub'ın herkese açık sürüm listesini okur. İstek anonimdir.

**Hizmet hesabı mı OAuth mu?** Hizmet hesabı izin ekranıyla hiç uğraştırmaz ve süresi dolmaz; bunun karşılığında Search Console ve Analytics'te o hesaba elle yetki vermeniz gerekir. Tek kişilik kurulumda ikisi de olur; sık "süresi doldu" görüyorsanız hizmet hesabına geçin.

## Sınırlar

Ayarlar ekranı port, veri klasörü ya da ağ ayarlarını değiştirmez; bunlar Windows paketinde config.json, Docker'da .env dosyasındadır. Kullanıcı ve parola yönetimi yoktur; uygulama tek kullanıcılıdır. Kota kartları Google'ın gerçek sayacı değil, uygulamanın kendi sayımıdır; Search Console'da elle yaptığınız URL denetimleri burada görünmez ama Google'ın sınırını harcar.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
