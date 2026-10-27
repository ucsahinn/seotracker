---
title: Ayarlar
description: Tema, Google erişim anahtarı, PageSpeed anahtarı, kullanım sınırları ve güncelleme kontrolü: bütün kurulum için tek ayar ekranı.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Google bağlantısını, hız anahtarını ve güncellemeyi nereden yöneteceğinizi burada görürsünüz.

**Ayarlar** bütün kurulumu ilgilendirir. Projeye özel ayarlar (ad, alan adı, Search Console ve Analytics mülkü) her projenin **Proje ayarları** sayfasındadır. Bu ekranda **Görünüm**, **Bildirimler**, **Google**, **Hizmet hesabı**, **Hız ölçümü**, **Sınırlar**, **Hakkında** ve **Windows** bölümleri bulunur.

## Ekranda neler var

**Görünüm.** **Tema** için Sistem, Açık ve Koyu seçeneği var. Seçim bu tarayıcıda saklanır. Başka bir tarayıcıda ya da bilgisayarda ayrıca seçersiniz.

**Dil.** **Ayarlar → Görünüm → Dil** bölümünden Türkçe, English, Deutsch, Français, Italiano ya da Português seçin. Sayfa seçilen dilde yeniden açılır; sayı ve tarihler de bu dili izler. Her dil kendi adıyla yazılır, bu yüzden geçerli dili okuyamasanız bile kendi dilinizi bulursunuz. Seçim bu tarayıcıda saklanır. Seçim yapılmazsa tarayıcının dili kullanılır. Tarayıcının dili bunlardan biri değilse English, tarayıcı dil bilgisi vermiyorsa Türkçe açılır.

**Bildirimler.** Sol menüdeki zil son 50 olayı ve okunmamış sayısını gösterir. **Tümünü okundu işaretle** geçmişi korur. Denetim sonucu, yeni sürüm, Google bağlantı sorunu, rapor ve dizin sorgusu sonuçları burada bulunur. Uygulama açıkken yeni bir olay uygulamanın kendi küçük penceresinde görünür. Sekme arka plandayken olay yalnızca zil geçmişinde tutulur. Uygulama Windows ya da tarayıcı bildirimi göndermez. Böylece aynı olay üst üste iki pencerede çıkmaz. Bir denetimin kendi ekranını izliyorsanız o denetimin bitiş penceresi ayrıca açılmaz, çünkü ekran bitişi zaten gösterir. **Bildirim sesi** önemli olaylarda kısa bir ses çalar; **Sesi dinle** ile deneyebilirsiniz. **Uygulama bildirimini dene** bir deneme bildirimi ve sesi üretir. Görsel animasyonlar sistemin hareketi azaltma tercihine uyar; ses ayrı ayarlanır.

**Windows.** Windows açılınca başlat ve Otomatik güncelleme kurulumu seçeneklerini buradan açıp kapatabilirsiniz. Bunlar tepsi menüsüyle aynı kalıcı ayarlardır. Yönetici kısıtlaması varsa nedeni görünür. Docker ve geliştirici kurulumunda seçenekler kapalıdır; eski Windows başlatıcısında paketi güncellemeniz istenir.

Bir ayar kaydedilemezse ekran nedenini ve ne yapacağınızı yazar. Ayar bölümü görev çubuğundaki uygulamayla konuştuğu için hatalar o uygulamadan gelir:

- **Tepsi uygulaması 4 saniye içinde yanıt vermedi.** Bilgisayar uykudan yeni uyandıysa birkaç saniye sonra **Tekrar dene**'ye basın. Sürerse tepsi menüsünden **Çıkış** deyip uygulamayı yeniden açın.
- **Tepsi uygulamasının ayar servisine bağlanılamadı.** Tepsi uygulaması kapanmış olabilir. seowatcher'ı Başlat menüsünden yeniden açın.
- **Bu ayar yönetici tarafından kilitlenmiş.** Yalnızca bilgisayarın yöneticisi değiştirebilir. Kurulum tüm kullanıcılar için yapılmışsa bu normaldir.
- **Tepsi uygulaması bu isteği tanımadı.** Sunucu ile tepsi uygulaması farklı oturumlardan kalmış olabilir. Tepsi menüsünden **Çıkış** deyip uygulamayı yeniden açın.
- **Tepsi uygulaması ayar isteğini reddetti.** Uygulamayı tepsi menüsünden yeniden başlatın. Sürerse Windows paketini güncelleyin.
- **Tepsi uygulaması tanınmayan bir yanıt döndürdü.** Uygulama ile tepsi sürümü uyuşmuyor olabilir. Windows paketini güncelleyin.

Bölüm hiç açılmıyor ve "Windows ayarlarına ulaşılamadı" diyorsa tepsi uygulamasının açık olduğunu kontrol edin.

**Google.** Rozet üç değerden biridir: **Kayıtlı**, **Ortamdan geliyor** (Docker kurulumunda `.env` dosyasıyla verilmiş) ya da **Eksik**. Bölüm, Google Cloud Console'a (Google'ın geliştirici paneli) ekleyeceğiniz iki yönlendirme adresini gösterir. Yanlarında kopyalama düğmeleri vardır. İkisini de eklemeniz gerekir. Analytics adresini eklemezseniz yalnızca Search Console bağlanır.

İki alan var: **İstemci kimliği** ve **Gizli anahtar**. İkisi de Google'dan aldığınız erişim anahtarının parçasıdır. Düğmeler şunlar: **Kaydet**, **Vazgeç**, **Değiştir** ve **Sil**. **Sil** var olan bağlantıları koparır. Adım adım kurulumu Google'a bağlanma kılavuzunda bulursunuz.

**Hizmet hesabı (daha kısa yol).** Hizmet hesabı, uygulamanın kullanması için Google'da açılan bir robot hesaptır. **JSON anahtar dosyası** alanına, Google Cloud'dan indirdiğiniz dosyanın içeriğini yapıştırırsınız. Kayıt varsa hesabın e-posta adresi görünür. Ekran bu adresi nereye ekleyeceğinizi de yazar:

- Search Console: "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle", yetki Tam.
- Analytics: "Yönetici → Erişim yönetimi", yetki Görüntüleyen.

Rozet **Kayıtlı** ya da **Kullanılmıyor** yazar. Google bölümünde istemci kimliği girilmemişse ama bir hizmet hesabı bağlıysa, **Google** bölümünün rozeti sarı **Eksik** yerine nötr bir **Kullanılmıyor, hizmet hesabı bağlı** yazar. Google bu durumda hizmet hesabıyla çalışır. Kayıtlı bir hizmet hesabı varsa uygulama onu Google erişim anahtarına tercih eder. Silmek hesabı uygulamadan kaldırır ama Google'daki anahtarı iptal etmez.

**Hız ölçümü.** **API anahtarı** alanı ve **Anahtarı test et** düğmesi var. Test "1 ölçüm harcar". Ona on saniyede bir basabilirsiniz. Rozet **Anahtar kayıtlı**, **Ortam anahtarı** ya da **Anahtar eksik** yazar. Ayrıntıyı PageSpeed anahtarı kılavuzunda bulursunuz.

**Sınırlar.** "Google ve sistem sınırları" kartlarında şunlar var:

- URL Denetimi (Search Console): günde 2.000.
- PageSpeed Insights.
- GA4 (Google Analytics) günlük ve saatlik kota birimi: varsayılan 200.000 ve 40.000. Google bu sayıyı açıklamaz, yalnızca ne kadarının kaldığını bildirir.
- Denetim sayfa sınırı: 10.000.
- Proje başına rapor: 10.000, şablon: 10.
- En büyük rapor: 500.000 bayt.

Her kartın durumu **Yeterli**, **Azalıyor** (yüzde 70'ten sonra), **Neredeyse doldu** (yüzde 90'dan sonra) ya da **Bilinmiyor** olur.

**Hakkında.** **Sürüm** satırı sürümü gösterir (0.8.0 Alpha gibi). **Güncellemeleri kontrol et** anahtarı varsayılan olarak açıktır. Açıksa uygulama altı saatte bir GitHub'daki son sürümü sorar. Bu durumda **Şimdi kontrol et** düğmesi de görünür. Windows paketindeki görev çubuğu uygulaması ayrıca kendi kontrolünü yapar. O, günde bir kez bakar. Yeni sürüm varsa **Değişiklikler** bağlantısı çıkar. Docker kurulumları için kopyalayacağınız komut da çıkar: `git pull && docker compose up -d --build`. Windows paketinde ekran sizi görev çubuğu simgesindeki **Güncelle** maddesine yönlendirir. Otomatik güncelleme açıksa yeni sürüm kendiliğinden kurulur.

Kontrol şunlardan birini söyler: yeni sürümün yayımlandığını, "En güncel sürümü kullanıyorsunuz." ya da bir sorunu. GitHub'a ulaşılamazsa ekran "Son kontrolde GitHub'a ulaşılamadı" der ve son bilinen sürümü, bir önceki başarılı kontrolün tarihiyle birlikte yazar. Bu durumda sürümün güncel olup olmadığı doğrulanamamıştır. İnternet bağlantınızı kontrol edip yeniden deneyin. Ekran "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli (GitHub 404)" derse sorun sizde değildir. **Yardım** ekranından tanılama paketini indirip sorunu bildirin. Anahtar kapalıysa ekran "Güncelleme kontrolü kapalı; GitHub'a istek gitmiyor." der.

**Sürüm notları.** Sol menüde Bildirimler’in üstündeki ayrı sayfada bulunur. Renkli etiketler sürümün yenilik, düzeltme ve güvenlik içeriğini gösterir.

## Nasıl kullanılır

1. İlk kurulumda önce **Hizmet hesabı** bölümüne JSON anahtarını ya da **Google** bölümüne istemci kimliğini ve gizli anahtarı girin; biri yeter. Sonra **Hız ölçümü** bölümüne PageSpeed anahtarını girin. İkisi kaydedilince projeye geçip mülkü seçersiniz.
2. Ayda bir **Sınırlar** bölümüne bakın. "Azalıyor" gördüğünüz kota çoğu zaman URL Denetimi sınırıdır.
3. **Hakkında** bölümünde yeni sürüm varsa güncelleyin. Sürüm notları neyin değiştiğini söyler. Google'ın dışına giden tek bağlantı güncelleme kontrolüdür. İstemezseniz anahtarı kapatın.
4. Google erişim anahtarını değiştirmeniz gerekirse (yeni Cloud projesi gibi) **Değiştir**'i tıklayın ve yeni değerleri yapıştırın. Mevcut bağlantılar yeni anahtarla çalışmaz. Projelerde **Yeniden bağlan** gerekir.

## Sık sorulanlar

**Gizli anahtarımı ekranda neden göremiyorum?** Uygulama onu şifreli saklar ve tarayıcıya geri göndermez. Ekran yalnızca kayıtlı olduğunu ve kimliği gösterir.

**Docker'da `.env` ile verdiğim değerle ekrana girdiğim çakışırsa?** Ekrana girilen kazanır. Rozet "Ortamdan geliyor" iken bir değer kaydederseniz artık o kullanılır.

**Güncelleme kontrolü ne gönderiyor?** Hiçbir veri göndermez. GitHub'ın herkese açık sürüm listesini okur. İstek anonimdir.

**Hizmet hesabı mı, Google erişim anahtarı mı?** Hizmet hesabı sizi izin ekranıyla uğraştırmaz ve süresi dolmaz. Karşılığında Search Console ve Analytics'te o hesaba elle yetki vermeniz gerekir. Tek kişilik kurulumda ikisi de olur. Sık "süresi doldu" görüyorsanız hizmet hesabına geçin.

## Windows paketi ve Docker'da farklı olanlar

Ekrandaki her ayar iki kurulumda aynı çalışır ve veritabanında saklanır. Fark, ekranın dışındaki ayarlardadır:

| Konu                         | Windows paketi                                                                               | Docker                                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Google ve PageSpeed anahtarı | Yalnızca bu ekrandan. Rozet hiçbir zaman **Ortamdan geliyor** demez.                         | Bu ekrandan ya da `.env` içindeki `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `PAGESPEED_API_KEY` ile. Ekrandaki kazanır. |
| Adres numarası (port)        | `%LOCALAPPDATA%\seowatcher\config.json` içindeki `"port"`, sonra menüden **Yeniden başlat**. | `.env` içindeki `PORT`, sonra `docker compose up -d --force-recreate seotracker`.                                         |
| Ajan parolası (MCP token)    | `%LOCALAPPDATA%\seowatcher\mcp-token`; başlatıcı üretir, kapatılamaz.                        | Konteynerde `/app/.wrangler/mcp-token`; `.env` içindeki `MCP_TOKEN` ile değiştirilir ya da `off` ile kapatılır.           |
| Güncelleme                   | **Windows** bölümü ya da görev çubuğu menüsü; kendiliğinden kurulabilir.                     | **Hakkında** bölümündeki komut: `git pull && docker compose up -d --build`.                                               |
| **Windows** bölümü           | Açık.                                                                                        | Seçenekler kapalı.                                                                                                        |

Windows paketinde veri klasöründeki `server.env` dosyasını düzenlemeyin: başlatıcı onu her açılışta yeniden yazar. Docker değişkenlerinin tam listesi `docs/ENVIRONMENT.md` dosyasındadır.

## Sınırlar

Ayarlar ekranı adres numarasını (port), veri klasörünü ya da ağ ayarlarını değiştirmez. Bunlar Windows paketinde `config.json`, Docker'da `.env` dosyasındadır. Kullanıcı ve parola yönetimi yoktur, uygulama tek kullanıcılıdır. Kota kartları Google'ın gerçek sayacı değil, uygulamanın kendi sayımıdır. Search Console'da elle yaptığınız URL denetimleri burada görünmez ama Google'ın sınırını harcar.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
