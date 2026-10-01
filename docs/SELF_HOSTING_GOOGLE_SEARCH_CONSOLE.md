# Kendi kurulumunuzda Google Search Console

Google Search Console (GSC) bağlantısı, seotracker'ın gerçek tıklama, gösterim,
sıra ve URL Inspection verilerinizi doğrudan Google'dan çekmesini sağlar.

**İsteğe bağlıdır:** seotracker bağlantı olmadan da çalışır, yalnızca Search
Console verisi olmaz.

## Gerekenler

- Doğrulanmış Search Console mülkünüze erişimi olan bir Google hesabı.
- [Google Cloud Console](https://console.cloud.google.com/)'da yaklaşık 10 dakika.
- Sunucuda yapılacak bir şey yok. İstemci uygulamanın kendi Ayarlar ekranına
  girilir ([4. adım](#4-istemciyi-ayarlara-girin)); ortam değişkeni gerekmez.

## 1) Google Cloud projesi oluşturun ve API'yi etkinleştirin

Hangi yolu seçerseniz seçin bu adım ortaktır ve her şeyden önce gelir.

1. [Google Cloud Console](https://console.cloud.google.com/) açın ve bir proje
   oluşturun (ya da var olan bir projeyi seçin). Sonraki tüm adımlar aynı
   projede yapılır; sayfanın üstündeki proje seçicide doğru projenin seçili
   olduğuna bakın.
2. Bu proje için
   [Google Search Console API](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com)'yi
   etkinleştirin.
3. Google Analytics 4'ü de bağlayacaksanız aynı projede **Google Analytics
   Admin API** ve **Google Analytics Data API**'yi de etkinleştirin. Ayrıntı:
   [SELF_HOSTING_GOOGLE_ANALYTICS.md](./SELF_HOSTING_GOOGLE_ANALYTICS.md).

## İki yol

Search Console'a ulaşan iki kimlik bilgisi türü vardır; yalnızca birine ihtiyacınız
var.

**Hizmet hesabı daha kısa yoldur** ve özel bir nedeniniz yoksa seçilecek olandır.
Kurulumun gerçekten takıldığı üç adımı atlar — onay ekranı, kendinizi test
kullanıcısı olarak eklemek ve bayt bayt eşleşmesi gereken yönlendirme adresi —
çünkü hiçbir oturum açma işlemi yoktur. Hesabı oluşturur, anahtarını indirir,
Ayarlar'a yapıştırır ve hesabın e-posta adresini Search Console mülkünüze bir
meslektaşınızı eklermiş gibi eklersiniz. Bkz.
[Hizmet hesabı](#hizmet-hesabı-daha-kısa-yol).

**OAuth istemcisi** aşağıdaki yoldur. Mülke başka bir adres eklemek yerine kendi
hesabınızla oturum açarak erişim vermeyi tercih ediyorsanız ya da mülkünüz
kullanıcı ekleyemeyeceğiniz bir yerden yönetiliyorsa bunu kullanın.

İkisi de sırlarını kurulum anahtarıyla şifreli saklar. İkisi birden tanımlıysa
hizmet hesabı kazanır.

## Hizmet hesabı (daha kısa yol)

1. 1. adımdaki projede
      [bir hizmet hesabı oluşturun](https://console.cloud.google.com/iam-admin/serviceaccounts).
      İstediğiniz adı verin; isteğe bağlı rol ve kullanıcı erişimi adımlarını
      atlayın — proje rolü gerekmez.
2. Hesabı açın, **Keys → Add key → Create new key → JSON** yolunu izleyin ve
   dosyayı indirin.
3. seotracker'da: **Ayarlar → Hizmet hesabı (daha kısa yol)** bölümüne dosyanın
   tamamını yapıştırın ve kaydedin. Sayfa bundan sonra hesabın e-posta adresini
   bir kopyalama düğmesiyle gösterir.
4. [Search Console](https://search.google.com/search-console)'da mülkünüzü seçin,
   **Settings → Users and permissions → Add user** yolunu izleyin, o adresi
   yapıştırın ve izni **Full** yapın. Bu adım olmadan hesap kimliği doğrulanmış
   olur ama hiçbir şey göremez.
5. Analytics için aynı adresi GA4 mülkünde **Admin → Access management**
   altından Viewer olarak ekleyin; ayrıca 1. adımdaki Analytics API'lerinin
   etkin olduğundan emin olun.

## 2) OAuth onay ekranını yapılandırın

**APIs & Services → OAuth consent screen** altında:

- **External** seçin (kullanacakların hepsi Google Workspace kuruluşunuzdaysa
  başka).
- Uygulama adını, destek e-postasını ve geliştirici iletişim e-postasını doldurun.
- Uygulama **Testing** durumundayken bağlanacak Google hesaplarını **test
  kullanıcısı** olarak ekleyin; aksi hâlde Google oturum açmayı `access_denied`
  ile engeller.

Kişisel ya da kurum içi kullanım için doğrulama başvurusu yapmanız gerekmez; test
modu yeterlidir.

## 3) OAuth istemci kimliği oluşturun

**APIs & Services → Credentials → Create credentials → OAuth client ID** altında:

1. Uygulama türü: **Web application**.
2. Dağıtımınızın kaynağı (origin) artı `/api/gsc/oauth/callback` ile birebir
   eşleşen bir **Authorized redirect URI** ekleyin.

   Belgelenen Docker kurulumu için tam olarak şudur:

   ```
   http://localhost:3001/api/gsc/oauth/callback
   ```

   `PORT`'u değiştirdiyseniz ya da konteyneri bir ters vekil sunucunun arkasına
   koyup `ALLOWED_HOST` ayarladıysanız onun kaynağını kullanın.

   Şema, konak ve port birebir eşleşmelidir; sonda eğik çizgi olmamalıdır.

3. Kaydedin, ardından **Client ID** ve **Client secret** değerlerini kopyalayın.

## 4) İstemciyi Ayarlar'a girin

seotracker'ı açın, **Ayarlar**'a gidin ve 3. adımdaki istemci kimliğini ile gizli
anahtarı **Google bağlantısı** bölümüne yapıştırın. Kaydedin.

Gizli anahtar saklanmadan önce sunucuda şifrelenir ve tarayıcıya geri
gönderilmez. Hiçbir şeyin yeniden başlaması gerekmez; sonraki bağlantı denemesi
yeni istemciyi kullanır.

Gizli anahtarı ve Google'ın verdiği jetonları şifreleyen anahtarı konteyner ilk açılışta
üretir ve veri biriminde saklar. Siz ayarlamazsınız.

> Kimlik bilgilerini dışarıdan enjekte etmek mi istiyorsunuz? `GOOGLE_CLIENT_ID` ve
> `GOOGLE_CLIENT_SECRET` ortam değişkeni olarak hâlâ çalışır ve o zaman
> `BETTER_AUTH_SECRET` (en az 32 karakter) üretilen anahtarın yerini alır.
> Ayarlar'a kaydedilen istemci ikisinden de önceliklidir. Ne ayarladıysanız
> saklayın: anahtarın değişmesi mevcut Google bağlantılarını okunamaz yapar.

## 5) Bağlanın

Bu adım bir **projenin** ayarlarında yapılır. Projenizi açın,
projenin ayar sayfasındaki **Entegrasyonlar** sekmesine gidin (genel **Ayarlar**
ekranı değil) ve **Bağlan** düğmesine tıklayın. Bağlantının süresi dolduysa aynı
yerde **Yeniden bağlan** düğmesi çıkar. Doğrulanmış mülkün sahibi Google hesabını
yetkilendirin ve projenize bağlanacak mülkü seçin.

## Nasıl çalışır

- seotracker, OAuth akışını yürütmek için sizin Google istemcinizi kullanır ve
  ortaya çıkan yetkiyi, erişim ve yenileme jetonları kurulum anahtarıyla **diskte
  şifrelenmiş** olarak veritabanında saklar.
- Erişim jetonları gerektiğinde üretilir ve yenilenir; yalnızca bir kez yetki
  verirsiniz.
- Veri kendi Google hesabınızdan, kendi kotanız altında okunur. Bilmeye değer tek
  kota URL Inspection'dır: Google mülk başına günde 2000 adrese izin verir ve bunu
  indeksleme ekranı ile `inspect_urls` MCP aracı paylaşır.

## Sorun giderme

**Google'dan `redirect_uri_mismatch`** — OAuth istemcinizdeki yönlendirme adresi
tam olarak `<kaynağınız>/api/gsc/oauth/callback` olmalıdır. Şemayı (`http` ile
`https`), konağı, portu ve sonda eğik çizgi olmadığını yeniden kontrol edin.

**"Google istemcisi tanımlı değil" / "not configured for Search Console yet"**
(uygulamada ya da MCP araçlarında) — kayıtlı bir OAuth istemcisi yok. **Ayarlar →
Google bağlantısı** altından bir tane girin. `BETTER_AUTH_SECRET`'ı kendiniz
ayarladıysanız en az 32 karakter olduğunu kontrol edin; altındaysa entegrasyon
kapalı kalır.

**Dün bağlantı çalışıyordu, şimdi yeniden bağlanmamı istiyor** — kurulum anahtarı
değişti, bu yüzden kayıtlı jetonların şifresi artık çözülemiyor. Bu,
`BETTER_AUTH_SECRET` eklendiğinde, değiştirildiğinde ya da kaldırıldığında veya
veri birimi yeniden oluşturulduğunda olur. İstemciyi yeniden girin ve yeniden
bağlanın.

**Oturum açarken `access_denied`** — Google hesabı OAuth onay ekranında test
kullanıcısı olarak listelenmemiş (uygulama Testing modundayken). **OAuth consent
screen → Test users** altından ekleyin.

**Bağlandı ama seçilecek mülk yok** — yetkilendirdiğiniz Google hesabının Search
Console'da doğrulanmış bir mülkü yok. Önce siteyi
[Search Console](https://search.google.com/search-console)'da doğrulayın, sonra
yeniden bağlanın.
