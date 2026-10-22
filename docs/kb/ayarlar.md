---
title: Ayarlar
description: Tema, Google erişim anahtarı, PageSpeed anahtarı, kullanım sınırları, sürüm ve güncelleme kontrolü. Tüm kurulumun tek ayar ekranı.
screen: Ayarlar
route: /settings
updated: 2026-10-22
---

Bu sayfada Google bağlantısını, hız anahtarını ve güncellemeyi nereden yöneteceğinizi görürsünüz.

**Ayarlar**, tüm kurulumu ilgilendiren şeylerin ekranıdır. Proje başına ayarlar (ad, alan adı, Search Console ve Analytics mülkü) her projenin **Proje ayarları** sayfasındadır. Burada Google'a bağlanmak için gereken erişim anahtarını, PageSpeed anahtarını, temayı ve güncelleme kontrolünü yönetirsiniz. Solda **Görünüm**, **Google**, **Hizmet hesabı**, **Hız ölçümü**, **Sınırlar**, **Hakkında** ve **Sürüm notları** bölümleri var. Her bölümün başlığında durumunu söyleyen bir rozet durur.

## Ekranda neler var

**Görünüm.** **Tema** için Sistem, Açık ve Koyu seçeneği var. Seçim bu tarayıcıda saklanır. Başka bir tarayıcıda ya da bilgisayarda ayrıca seçersiniz.

**Google.** Rozet üç değerden biridir: **Kayıtlı**, **Ortamdan geliyor** (Docker kurulumunda `.env` dosyasıyla verilmiş) ya da **Eksik**. Bölüm, Google Cloud Console'a (Google'ın geliştirici paneli) ekleyeceğiniz iki yönlendirme adresini gösterir. Yanlarında kopyalama düğmeleri vardır. İkisini de eklemeniz gerekir. Analytics adresini eklemezseniz yalnızca Search Console bağlanır.

Alanlar: **İstemci kimliği** ve **Gizli anahtar**. İkisi de Google'dan aldığınız erişim anahtarının bilgisidir. Düğmeler: **Kaydet**, **Vazgeç**, **Değiştir** ve **Sil**. **Sil** var olan bağlantıları koparır. Adım adım kurulum Google'a bağlanma kılavuzundadır.

**Hizmet hesabı (daha kısa yol).** Hizmet hesabı, Google'da uygulama için açılan bir robot hesaptır. **JSON anahtar dosyası** alanına, Google Cloud'dan indirdiğiniz dosyanın içeriğini yapıştırırsınız. Kayıt varsa hesabın e-posta adresi görünür. Ekran bu adresi nereye ekleyeceğinizi yazar:

- Search Console: "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle", yetki Tam.
- Analytics: "Yönetici → Erişim yönetimi", yetki Görüntüleyen.

Rozet **Kayıtlı** ya da **Kullanılmıyor** der. Kayıtlı hizmet hesabı, Google erişim anahtarına tercih edilir. Silmek hesabı uygulamadan kaldırır ama Google'daki anahtarı iptal etmez.

**Hız ölçümü.** **API anahtarı** alanı ve **Anahtarı test et** düğmesi var. Test "1 ölçüm harcar", on saniyede bir basabilirsiniz. Rozet **Anahtar kayıtlı**, **Ortam anahtarı** ya da **Anahtar eksik** der. Ayrıntı PageSpeed anahtarı kılavuzundadır.

**Sınırlar.** "Google ve sistem sınırları" kartları şunları gösterir:

- URL Denetimi (Search Console): günde 2.000.
- PageSpeed Insights.
- GA4 (Google Analytics) günlük ve saatlik kota birimi: varsayılan 200.000 ve 40.000. Google bu sayıyı açıklamaz, yalnızca ne kadar kaldığını söyler.
- Denetim sayfa sınırı: 10.000.
- Proje başına rapor: 10.000, şablon: 10.
- En büyük rapor: 500.000 bayt.

Her kartın durumu **Yeterli**, **Azalıyor** (yüzde 70'ten sonra), **Neredeyse doldu** (yüzde 90'dan sonra) ya da **Bilinmiyor** olur.

**Hakkında.** **Sürüm** satırı sürümü gösterir (v2.3.0 gibi). **Güncellemeleri kontrol et** anahtarı varsayılan olarak açıktır. Açıksa uygulama günde en çok bir kez GitHub'daki son sürümü sorar. Bu durumda **Şimdi kontrol et** düğmesi de görünür. Yeni sürüm varsa **Değişiklikler** bağlantısı ve Docker kurulumları için kopyalanacak komut çıkar: `git pull && docker compose up -d --build`. Windows paketinde ise görev çubuğu simgesindeki **Güncelle** anlatılır; otomatik güncelleme açıksa yeni sürüm kendiliğinden kurulur.

**Sürüm notları.** Her sürümde neyin değiştiğini listeler.

## Nasıl kullanılır

1. İlk kurulumda önce **Google** bölümüne istemci kimliğini ve gizli anahtarı girin. Sonra **Hız ölçümü** bölümüne PageSpeed anahtarını girin. İkisi kaydedilince projeye geçip mülkü seçersiniz.
2. Ayda bir **Sınırlar** bölümüne bakın. "Azalıyor" gördüğünüz kota çoğu zaman URL Denetimi sınırıdır.
3. **Hakkında** bölümünde yeni sürüm varsa güncelleyin. Sürüm notları neyin değiştiğini söyler. Güncelleme kontrolü, bilgisayarınızdan Google dışına giden tek bağlantıdır. İstemezseniz anahtarı kapatın.
4. Google erişim anahtarını değiştirmeniz gerekirse (yeni Cloud projesi gibi) **Değiştir**'i tıklayın ve yeni değerleri yapıştırın. Mevcut bağlantılar yeni anahtarla çalışmaz. Projelerde **Yeniden bağlan** gerekir.

## Sık sorulanlar

**Gizli anahtarımı ekranda neden göremiyorum?** Uygulama onu şifreli saklar ve tarayıcıya geri göndermez. Ekran yalnızca kayıtlı olduğunu ve kimliği gösterir.

**Docker'da `.env` ile verdiğim değerle ekrana girdiğim çakışırsa?** Ekrana girilen kazanır. Rozet "Ortamdan geliyor" iken bir değer kaydederseniz artık o kullanılır.

**Güncelleme kontrolü ne gönderiyor?** Hiçbir veri göndermez. GitHub'ın herkese açık sürüm listesini okur. İstek anonimdir.

**Hizmet hesabı mı, Google erişim anahtarı mı?** Hizmet hesabı izin ekranıyla uğraştırmaz ve süresi dolmaz. Karşılığında Search Console ve Analytics'te o hesaba elle yetki vermeniz gerekir. Tek kişilik kurulumda ikisi de olur. Sık "süresi doldu" görüyorsanız hizmet hesabına geçin.

## Sınırlar

Ayarlar ekranı adres numarasını (port), veri klasörünü ya da ağ ayarlarını değiştirmez. Bunlar Windows paketinde `config.json`, Docker'da `.env` dosyasındadır. Kullanıcı ve parola yönetimi yoktur, uygulama tek kullanıcılıdır. Kota kartları Google'ın gerçek sayacı değil, uygulamanın kendi sayımıdır. Search Console'da elle yaptığınız URL denetimleri burada görünmez ama Google'ın sınırını harcar.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
