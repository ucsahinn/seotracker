---
title: Google'a bağlanma
description: Search Console ve Analytics 4 verisini okumak için Google tarafında bir kerelik erişim anahtarı (OAuth istemcisi) oluşturma, uygulamaya yapıştırma ve mülk seçme. Adım adım.
kind: nasil-yapilir
updated: 2026-10-22
---

Uygulama bir bulut hizmeti olmadığı için Google'a sizin adınıza bağlanacak bir "uygulama kimliği" gerekir; Google buna OAuth istemcisi der. Bunu Google Cloud Console'da bir kez oluşturur, uygulamanın Ayarlar ekranına yapıştırırsınız. Sonra her proje için Search Console mülkünü ve isterseniz Analytics mülkünü seçersiniz. En uzun adım Google tarafıdır; yaklaşık on dakika sürer, bir daha uğraşmazsınız. Daha kısa bir yol da var: bir hizmet hesabı dosyası; sayfanın sonunda anlatılır.

## Gerekenler

- Search Console'da doğrulanmış bir site (mülk). Doğrulanmamışsa uygulama mülk listesinde göremez.
- Analytics 4 için o mülkte en az "Görüntüleyen" yetkisi (isteğe bağlı; Search Console tek başına yeter).
- Bir Google hesabı ve Google Cloud Console'a erişim (ücretsiz, kart istemez).
- Uygulama açık ve **Ayarlar** ekranı elinizin altında; iki yönlendirme adresini oradan kopyalayacaksınız.

## Adımlar

1. Uygulamada **Ayarlar → Google** bölümünü açın. İki yönlendirme adresi görürsünüz, her birinin yanında kopyalama düğmesi var: biri **/api/gsc/oauth/callback** ile biten (Search Console), diğeri **/api/ga4/oauth/callback** ile biten (Analytics). Windows paketinde adres http://127.0.0.1:3001 ile, Docker'da http://localhost:3001 ile başlar. İkisini de bir yere not edin.
2. Tarayıcıda console.cloud.google.com adresine gidin. Üstteki proje seçiciden **Yeni proje** oluşturun; adı önemsiz, "seowatcher" yazabilirsiniz.
3. **API'ler ve Hizmetler → Kitaplık** bölümünde şu API'leri bulup **Etkinleştir** deyin: **Google Search Console API**. Analytics de bağlayacaksanız **Google Analytics Admin API** ve **Google Analytics Data API**.
4. **API'ler ve Hizmetler → OAuth izin ekranı**: kullanıcı türü **Harici**, uygulama adı ve e-posta alanlarını doldurun. Yayın durumu "Test" kalabilir; **Test kullanıcıları** bölümüne kendi Google hesabınızı ekleyin. Doğrulama süreci gerekmez, çünkü uygulamayı yalnızca siz kullanıyorsunuz.
5. **API'ler ve Hizmetler → Kimlik bilgileri → Kimlik bilgisi oluştur → OAuth istemci kimliği**. Uygulama türü **Web uygulaması**. **Yetkilendirilmiş yönlendirme URI'leri** bölümüne 1. adımdaki iki adresi ekleyin; sona eğik çizgi koymayın, bir karakter bile fark ederse Google "redirect_uri_mismatch" hatası verir. **Oluştur** deyince istemci kimliği ve gizli anahtar gösterilir.
6. Uygulamaya dönün. **Ayarlar → Google** bölümünde **İstemci kimliği** alanına "....apps.googleusercontent.com" ile biten kimliği, **Gizli anahtar** alanına "GOCSPX-" ile başlayan anahtarı yapıştırın, **Kaydet** deyin. "Google istemcisi kaydedildi" bildirimi çıkar; yeniden başlatma gerekmez. Kimlik yanlış alana yapıştırılırsa uygulama uyarır: "Kimlik .apps.googleusercontent.com ile bitmeli. Gizli anahtarı değil, istemci kimliğini yapıştırın."
7. Projenize gidin: **Proje ayarları → Entegrasyonlar**. **Google Search Console** kartında **Bağlan** deyin. Google'ın izin ekranı açılır; test kullanıcısı olduğunuz hesabı seçin, izin verin. Uygulamaya dönünce "Search Console bağlandı" bildirimi gelir.
8. **Mülk seç** listesinden sitenizi seçin ve **Mülkü kaydet** deyin. Alan adı mülkü seçerseniz kart "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar." notunu gösterir.
9. Analytics için aynı ekranda **Google Analytics** kartında **Bağlan** deyin, izin verin, mülkü seçin. Her iki bağlantı ayrı izin ister; biri diğerini kapsamaz.

### Daha kısa yol: hizmet hesabı

Her gün Google izin ekranıyla uğraşmak istemiyorsanız Google Cloud'da bir hizmet hesabı oluşturup JSON anahtar dosyasını **Ayarlar → Hizmet hesabı** alanına yapıştırabilirsiniz. Kaydedince uygulama hizmet hesabının e-posta adresini gösterir; o adresi Search Console'da **Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle** ile (yetki: Tam), Analytics'te **Yönetici → Erişim yönetimi** ile (Görüntüleyen) eklersiniz. Kayıtlı bir hizmet hesabı varsa uygulama onu OAuth istemcisine tercih eder; Ayarlar ekranındaki "Şu an kullanılan" satırı hangisinin devrede olduğunu söyler.

## Kontrol

- **Proje ayarları → Entegrasyonlar** kartlarında rozet **Bağlı** olmalı.
- **Panel** ekranındaki dört sayı kartı birkaç saniye içinde dolmalı. Yeni bir sitede sayılar sıfır olabilir; bu bağlantının değil Google'ın verisinin durumudur.
- **Ayarlar → Google** bölümündeki rozet **Kayıtlı** demeli.

## Sık sorulanlar

**Neden Google bunu bu kadar zorlaştırıyor?** Çünkü uygulama sizin verinizi sizin adınıza okuyor ve Google, okuyanın kim olduğunu bilmek istiyor. Bulut hizmetlerinde bu işi hizmet sağlayıcı bir kez yapar; burada siz kendi sağlayıcınızsınız.

**Gizli anahtar nerede saklanıyor?** Bu bilgisayardaki veritabanında, şifreli. Şifreleyen anahtar Windows paketinde veri klasöründeki instance-secret dosyası, Docker'da birimdeki aynı adlı dosyadır. Anahtar tarayıcıya hiç gönderilmez; Ayarlar ekranı yalnızca kimliği ve kayıt zamanını gösterir.

**Aynı istemciyi birden fazla projede kullanabilir miyim?** Evet. İstemci kurulum başına bir tanedir; her proje kendi mülkünü seçer.

**Test kullanıcısı izinleri bir süre sonra düşüyor.** Google, "Test" durumundaki uygulamalarda izinleri yedi günle sınırlayabilir. O zaman kart "Bağlantının süresi doldu" der; **Yeniden bağlan** yeter. Kalıcı çözüm, izin ekranını "Üretim"e almak ya da hizmet hesabına geçmektir.

**Hangi izinleri istiyor?** Search Console için yalnızca okuma (webmasters.readonly), Analytics için yalnızca okuma (analytics.readonly). Uygulama Google'da hiçbir şeyi değiştiremez.

## Sorun çıkarsa

- **Google "redirect_uri_mismatch" diyor.** Cloud Console'daki yönlendirme adresi uygulamadakiyle birebir aynı değil. Ayarlar'daki kopyalama düğmesini kullanın; http ile https, 127.0.0.1 ile localhost, sondaki eğik çizgi farkı hataya yeter. Port değiştirdiyseniz adresleri güncelleyin.
- **"Google istemcisi tanımlı değil" uyarısı.** 6. adım atlanmış ya da kayıt başarısız olmuş. Ayarlar'da rozet **Kayıtlı** olmalı.
- **Google "access_denied" diyor.** Giriş yaptığınız hesap, izin ekranındaki test kullanıcıları listesinde değil. Listeye ekleyin ya da doğru hesabı seçin.
- **Mülk listesi boş.** Bu hesabın Search Console'da doğrulanmış sitesi yok ya da Analytics'te yetkisi yok. Önce Search Console'da siteyi doğrulayın.
- **"Bağlantısı tamamlanmadı" ve "state_mismatch".** İzin ekranını iki sekmede açmışsınız ya da on dakikadan uzun beklemişsiniz. Tek sekmede, baştan deneyin; tarayıcı çerezleri kapalıysa açın.
- **"Google hesabı zaten bağlı."** Aynı Google hesabı daha önce başka bir kayda bağlanmış. Mülk seçicideki **Hesabı kaldır** ile eskisini kaldırıp yeniden bağlanın.
- **Güncellemeden sonra bağlantılar koptu.** Şifreleme anahtarı değişmiştir (Docker'da BETTER_AUTH_SECRET eklendi ya da birim yeniden oluşturuldu). Kartlarda **Yeniden bağlan** deyin.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
