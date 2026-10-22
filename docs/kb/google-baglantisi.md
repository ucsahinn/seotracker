---
title: Google'a bağlanma
description: Search Console ve Analytics 4 verisini okumak için Google'dan bir kerelik erişim anahtarı alın, uygulamaya yapıştırın ve sitenizi seçin. Adım adım.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda uygulama Google'a sizin adınıza bağlanacak ve sitenizin verisini okuyacak. Bunun için Google'dan bir kez "Google erişim anahtarı" alırsınız. Bu yaklaşık on dakika sürer, bir daha uğraşmazsınız. Daha kısa bir yol da var (hizmet hesabı), sayfanın sonunda.

## Gerekenler

- Search Console'da doğrulanmış bir siteniz (mülk). Doğrulanmamışsa uygulama onu listede göremez.
- Analytics 4 için o mülkte en az "Görüntüleyen" yetkisi. İsteğe bağlı, Search Console tek başına yeter.
- Bir Google hesabı. Google Cloud Console (Google'ın geliştirici sayfası) ücretsizdir, kart istemez.
- Açık uygulama. İki yönlendirme adresini (izin sonrası Google'ın sizi uygulamaya geri getirdiği adres) oradan kopyalayacaksınız.

## Adımlar

1. Uygulamada **Ayarlar → Google** bölümünü açın. İki adres görürsünüz. Biri `/api/gsc/oauth/callback` ile biter (Search Console), öteki `/api/ga4/oauth/callback` ile (Analytics). Windows paketinde adresler `http://127.0.0.1:3001` ile, Docker'da `http://localhost:3001` ile başlar. İkisini de bir yere not edin.
2. Tarayıcıda `console.cloud.google.com` adresine gidin. Üstteki proje seçiciden **Yeni proje** deyin. Ad önemsiz, "seowatcher" yazabilirsiniz.
3. **API'ler ve Hizmetler → Kitaplık** sayfasını açın. Arama kutusuna **Google Search Console API** yazın, tıklayın, **Etkinleştir** deyin. Analytics de bağlayacaksanız aynısını **Google Analytics Admin API** ve **Google Analytics Data API** için yapın.
4. **API'ler ve Hizmetler → OAuth izin ekranı** sayfasını açın. Kullanıcı türü olarak **Harici** seçin. Uygulama adına istediğiniz bir ad, e-posta alanlarına kendi e-posta adresinizi yazın. Yayın durumu "Test" kalabilir.
5. Aynı sayfada **Test kullanıcıları** bölümüne kendi Google hesabınızı ekleyin. Google'ın ayrıca onaylaması gerekmez.
6. **API'ler ve Hizmetler → Kimlik bilgileri** sayfasında **Kimlik bilgisi oluştur** deyin, sonra **OAuth istemci kimliği** seçin. Bu, Google erişim anahtarınızdır.
7. Uygulama türü olarak **Web uygulaması** seçin.
8. **Yetkilendirilmiş yönlendirme URI'leri** bölümüne 1. adımdaki iki adresi ekleyin. Sona eğik çizgi koymayın. Tek karakter farkı Google'da "redirect_uri_mismatch" (adres uyuşmuyor) hatası verir.
9. **Oluştur** deyin. Google bir istemci kimliği ve bir gizli anahtar gösterir.
10. Uygulamaya dönün. **Ayarlar → Google** bölümünde **İstemci kimliği** alanına `.apps.googleusercontent.com` ile biten kimliği yapıştırın. **Gizli anahtar** alanına `GOCSPX-` ile başlayan anahtarı yapıştırın.
11. **Kaydet** deyin. "Google istemcisi kaydedildi" bildirimi çıkar. Yeniden başlatmak gerekmez. Kimliği yanlış alana yapıştırırsanız uygulama uyarır: "Kimlik .apps.googleusercontent.com ile bitmeli. Gizli anahtarı değil, istemci kimliğini yapıştırın."
12. Projenize gidin: **Proje ayarları → Bağlantılar**. **Google Search Console** kartında **Bağlan** deyin.
13. Google'ın izin ekranında test kullanıcısı olarak eklediğiniz hesabı seçin ve izin verin. Uygulamaya dönünce "Search Console bağlandı" bildirimi gelir.
14. **Mülk seç** listesinden sitenizi seçin, **Mülkü kaydet** deyin. Alan adı mülkü seçerseniz kart "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar." yazar.
15. Analytics için aynı ekranda **Google Analytics** kartında **Bağlan** deyin, izin verin, mülkü seçin. İki bağlantı ayrı izin ister. Biri ötekini kapsamaz.

### Daha kısa yol: hizmet hesabı

Hizmet hesabı, Google'a sizin yerinize bağlanan özel bir hesaptır. İzin ekranı gerekmez.

1. Google Cloud'da bir hizmet hesabı oluşturun ve JSON anahtar dosyasını indirin.
2. Dosyanın içindekini uygulamada **Ayarlar → Hizmet hesabı** alanına yapıştırın ve kaydedin. Uygulama hizmet hesabının e-posta adresini gösterir.
3. O adresi Search Console'da **Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle** ile ekleyin. Yetki: Tam.
4. Analytics'te **Yönetici → Erişim yönetimi** ile ekleyin. Yetki: Görüntüleyen.

Kayıtlı hizmet hesabı varsa uygulama onu tercih eder. **Ayarlar** ekranındaki "Şu an kullanılan" satırı hangisinin devrede olduğunu söyler.

## Kontrol

- **Proje ayarları → Bağlantılar** kartlarında rozet **Bağlı** olmalı.
- **Panel** ekranındaki dört sayı kartı birkaç saniyede dolmalı. Yeni sitede sayılar sıfır olabilir. Bu bağlantı hatası değildir.
- **Ayarlar → Google** bölümündeki rozet **Kayıtlı** demeli.

## Sık sorulanlar

**Gizli anahtar nerede saklanıyor?** Bu bilgisayardaki veritabanında, şifreli. Şifreleyen anahtar `instance-secret` dosyasıdır (Windows'ta veri klasöründe, Docker'da veri deposunda). Anahtar tarayıcıya gönderilmez.

**Aynı erişim anahtarını birden fazla projede kullanabilir miyim?** Evet. Kurulum başına bir tane yeter. Her proje kendi mülkünü seçer.

**Birkaç gün sonra bağlantı düştü.** Google "Test" durumundaki uygulamalarda izni yedi günle sınırlayabilir. Kart "Bağlantının süresi doldu" der. **Yeniden bağlan** yeter. Kalıcı çözüm izin ekranını "Üretim"e almak ya da hizmet hesabına geçmektir.

**Hangi izinleri istiyor?** Search Console için yalnızca okuma (`webmasters.readonly`), Analytics için yalnızca okuma (`analytics.readonly`). Uygulama Google'da hiçbir şeyi değiştiremez.

## Sorun çıkarsa

- **Google "redirect_uri_mismatch" diyor.** Cloud Console'daki yönlendirme adresi uygulamadakiyle bire bir aynı değil. **Ayarlar** ekranındaki kopyalama düğmesini kullanın. http ile https, 127.0.0.1 ile localhost ya da sondaki eğik çizgi hataya yeter.
- **"Google erişim anahtarı eksik" uyarısı çıkıyor.** 10 ve 11. adım atlanmış ya da kayıt başarısız olmuş. **Ayarlar** ekranında rozet **Kayıtlı** olmalı.
- **Google "access_denied" diyor.** Giriş yaptığınız hesap izin ekranındaki test kullanıcıları listesinde yok. Hesabı listeye ekleyin ya da doğru hesabı seçin.
- **Mülk listesi boş.** Bu hesabın Search Console'da doğrulanmış sitesi ya da Analytics yetkisi yok. Önce siteyi doğrulayın.
- **"Bağlantısı tamamlanmadı" ve "state_mismatch" yazıyor.** İzin ekranını iki sekmede açmışsınız ya da on dakikadan fazla beklemişsiniz. Tek sekmede baştan deneyin. Tarayıcı çerezleri (küçük kayıt dosyaları) kapalıysa açın.
- **"Google hesabı zaten bağlı" yazıyor.** Hesap daha önce başka bir kayda bağlanmış. Mülk seçicideki **Hesabı kaldır** ile eskisini kaldırıp yeniden bağlanın.
- **Güncellemeden sonra bağlantılar koptu.** Şifreleme anahtarı değişmiş (Docker'da `BETTER_AUTH_SECRET` eklendi ya da veri deposu yeniden oluşturuldu). Kartlarda **Yeniden bağlan** deyin.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
