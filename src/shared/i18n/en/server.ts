import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/server, src/serverFunctions, src/lib, src/middleware, src/server.ts.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enServer: Catalog = {
  // installed-0.8.0 diagnostics: Google/Windows/audit failure causes
  "{host} site denetimi (eksik)": "{host} site audit (partial)",
  "Eksik rapor: {why} Sorun listesi tam değil.":
    "Partial report: {why} The issue list is incomplete.",
  "Tepsi uygulaması 4 saniye içinde yanıt vermedi (zaman aşımı). Bilgisayar uykudan yeni uyandıysa birkaç saniye sonra Tekrar dene'ye basın; sürerse tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "The tray app did not answer within 4 seconds (timeout). If the computer just woke from sleep, press Try again in a few seconds; if it persists, choose Exit in the tray menu and open the app again.",
  "Tepsi uygulamasının ayar servisine bağlanılamadı. Tepsi uygulaması kapanmış olabilir; seowatcher'ı Başlat menüsünden yeniden açın.":
    "Could not connect to the tray app's settings service. The tray app may have closed; open seowatcher again from the Start menu.",
  "Bu ayar yönetici tarafından kilitlenmiş (HTTP 409). Yalnızca bilgisayarın yöneticisi değiştirebilir.":
    "This preference is locked by an administrator (HTTP 409). Only the computer's administrator can change it.",
  "Tepsi uygulaması bu isteği tanımadı (HTTP 403); sunucu ile tepsi uygulaması farklı oturumlardan kalmış olabilir. Tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "The tray app did not recognise this request (HTTP 403); the server and the tray app may be left over from different sessions. Choose Exit in the tray menu and open the app again.",
  "Tepsi uygulaması ayar isteğini reddetti (HTTP {status}). Uygulamayı tepsi menüsünden yeniden başlatın; sürerse Windows paketini güncelleyin.":
    "The tray app refused the settings request (HTTP {status}). Restart the app from the tray menu; if it persists, update the Windows package.",
  "Tepsi uygulaması tanınmayan bir yanıt döndürdü; uygulama ile tepsi sürümü uyuşmuyor olabilir. Windows paketini güncelleyin.":
    "The tray app returned an unrecognised answer; the app and tray versions may not match. Update the Windows package.",
  "Google Analytics geçersiz bir yanıt döndürdü. Birazdan tekrar deneyin.":
    "Google Analytics returned an invalid response. Try again shortly.",
  "Google'a bağlanılamadı, birazdan tekrar deneyin. Neden: {reason}. Sürerse bu bilgisayarın internet bağlantısını kontrol edin.":
    "Could not connect to Google, try again shortly. Reason: {reason}. If it persists, check this computer's internet connection.",
  bilinmiyor: "unknown",
  "Search Console isteği geçersiz buldu (HTTP 400). Bu bir bağlantı sorunu değil; seçili boyut, filtre ya da arama türü bu mülkte kullanılamıyor.":
    "Search Console rejected the request (HTTP 400). This is not a connection problem; the selected dimension, filter or search type is not available for this property.",
  "Search Console bu mülke erişimi reddetti (HTTP {status}). Hesabın mülkte doğrulanmış yetkisi olduğunu kontrol edin ya da Ayarlar'dan bağlantıyı yenileyin.":
    "Search Console denied access to this property (HTTP {status}). Check that the account has verified permission on the property, or renew the connection in Settings.",
  "Search Console mülkü bulunamadı (HTTP 404). Mülk Search Console'dan kaldırılmış olabilir; Ayarlar'dan yeniden seçin.":
    "Search Console property not found (HTTP 404). It may have been removed from Search Console; choose it again in Settings.",
  "Search Console istek sınırı doldu (HTTP 429). Birkaç dakika sonra tekrar deneyin.":
    "Search Console request limit reached (HTTP 429). Try again in a few minutes.",
  "Search Console zamanında yanıt vermedi. Birazdan tekrar deneyin.":
    "Search Console did not answer in time. Try again shortly.",
  "Search Console geçici olarak yanıt vermiyor (HTTP {status}). Birazdan tekrar deneyin; sürerse Google'ın durum sayfasına bakın.":
    "Search Console is temporarily not answering (HTTP {status}). Try again shortly; if it persists, check Google's status page.",
  'Google Analytics Data API bu Google Cloud projesinde kapalı. Google Cloud Console\'da "Google Analytics Data API"yi etkinleştirip tekrar deneyin.':
    'The Google Analytics Data API is turned off in this Google Cloud project. Enable "Google Analytics Data API" in the Google Cloud Console and try again.',
  "Bu rapor seçili Google Analytics mülküyle uyumlu değil (HTTP 400).":
    "This report is not compatible with the selected Google Analytics property (HTTP 400).",
  "Google Analytics bağlantısının süresi dolmuş ya da iptal edilmiş. Ayarlar'dan yeniden bağlayın.":
    "The Google Analytics connection has expired or was revoked. Reconnect it in Settings.",
  "Google Analytics bu mülke erişimi reddetti (HTTP 403). Bağlı hesaba ya da hizmet hesabına mülkte en az Görüntüleyen yetkisi verin.":
    "Google Analytics denied access to this property (HTTP 403). Give the connected account or service account at least Viewer access on the property.",
  "Google Analytics mülkü bulunamadı (HTTP 404). Mülk silinmiş ya da taşınmış olabilir; Ayarlar'dan yeniden seçin.":
    "Google Analytics property not found (HTTP 404). It may have been deleted or moved; choose it again in Settings.",
  "Google Analytics raporlama kotası doldu (HTTP 429). Kota saatlik ve günlük yenilenir; daha sonra tekrar deneyin.":
    "Google Analytics reporting quota is exhausted (HTTP 429). The quota renews hourly and daily; try again later.",
  "Google Analytics geçici olarak yanıt vermiyor (HTTP {status}{reason}). Birazdan tekrar deneyin.":
    "Google Analytics is temporarily not answering (HTTP {status}{reason}). Try again shortly.",
  "Bu projeye bağlı bir Google Analytics mülkü yok. Ayarlar'dan bir mülk seçin.":
    "No Google Analytics property is connected to this project. Choose one in Settings.",
  "Google Analytics geçici olarak yanıt vermiyor. Birazdan tekrar deneyin.":
    "Google Analytics is temporarily not answering. Try again shortly.",
  "Bu seçenek yalnızca Windows paketinde kullanılabilir.":
    "This option is only available in the Windows app.",
  "Windows ayarı kaydedilemedi. Tepsi uygulamasının açık olduğunu ve ayarın yönetici tarafından kilitlenmediğini kontrol edip tekrar deneyin.":
    "The Windows preference could not be saved. Check that the tray app is running and the preference is not locked by an administrator, then try again.",
  "Giriş yok: uygulama yalnızca bu bilgisayarda kullanılır. İnternete açacaksanız önüne kendi girişinizi koyun.":
    "No sign-in: the app is meant to be used only on this computer. If you expose it to the internet, put your own sign-in in front of it.",
  "Cloudflare Access belirteci reddedildi: hedef kitle uyuşmuyor. POLICY_AUD, Access uygulamanızın AUD etiketiyle aynı değil — Zero Trust -> Access controls -> Applications -> Configure -> Additional settings yolundan kopyalayın.":
    "Cloudflare Access token rejected: audience mismatch. POLICY_AUD does not match your Access application's AUD tag — copy it from Zero Trust -> Access controls -> Applications -> Configure -> Additional settings.",
  "Cloudflare Access belirteci reddedildi: veren taraf uyuşmuyor. TEAM_DOMAIN, belirteci veren Cloudflare ekibiyle aynı değil — Zero Trust ayarlarındaki ekip alan adınızla karşılaştırın.":
    "Cloudflare Access token rejected: issuer mismatch. TEAM_DOMAIN does not match the Cloudflare team that issued the token — compare it with the team domain in your Zero Trust settings.",
  "Cloudflare Access belirteci TEAM_DOMAIN'in imza anahtarlarıyla doğrulanamadı. TEAM_DOMAIN'in ekibinizin https://<team>.cloudflareaccess.com adresi olduğundan emin olun.":
    "The Cloudflare Access token could not be verified with TEAM_DOMAIN's signing keys. Make sure TEAM_DOMAIN is your team's https://<team>.cloudflareaccess.com address.",
  "Bu işlem için yetkiniz yok.": "You do not have permission to do this.",
  "Bu projede böyle bir denetim bulunamadı.": "This project has no such audit.",
  "Denetim ayarları geçersiz.": "The audit settings are invalid.",
  "Çalışan denetimin durumu doğrulanamadı; silme iptal edildi. Lütfen tekrar deneyin.":
    "Couldn't confirm the status of the running audit, so it was not deleted. Please try again.",
  "Çalışan denetim durdurulamadı.": "Couldn't stop the running audit.",
  "Bu denetim şu an silinemiyor. Bitmesini bekleyip yeniden deneyin.":
    "This audit can't be deleted right now. Wait for it to finish and try again.",
  "Denetimin Lighthouse çıktıları silinemedi; denetim silinmedi. Lütfen tekrar deneyin.":
    "Couldn't delete the audit's Lighthouse results, so the audit was not deleted. Please try again.",
  "Google Analytics bu hizmet hesabına izin vermedi. İki şey gerekiyor: Google Cloud projenizde Google Analytics Admin API etkin olmalı, ve GA4 mülkünüzde Yönetici → Erişim yönetimi altında {email} adresi Görüntüleyen olarak ekli olmalı.":
    "Google Analytics denied access to this service account. Two things are needed: the Google Analytics Admin API must be enabled in your Google Cloud project, and {email} must be added as a Viewer under Admin → Access management in your GA4 property.",
  "Google Analytics bu hizmet hesabına izin vermedi. Google Analytics Admin API'yi etkinleştirin ve hesabın adresini GA4 mülkünüze Görüntüleyen olarak ekleyin.":
    "Google Analytics denied access to this service account. Enable the Google Analytics Admin API and add the account's address to your GA4 property as a Viewer.",
  "Bu Google hesabı seowatcher hesabınıza bağlı değil.":
    "This Google account isn't connected to your seowatcher account.",
  "Bu Google Analytics mülkü bağlı Google hesabınızda bulunmuyor.":
    "This Google Analytics property isn't in your connected Google account.",
  "Google kimlik bilgisini döndürmedi. Bağlantıyı yeniden deneyin.":
    "Google didn't return an identity token. Try connecting again.",
  "Google, {name} yetkilendirme kodunu reddetti. Bağlantıyı yeniden deneyin.":
    "Google rejected the {name} authorization code. Try connecting again.",
  "{name} yapılandırılmamış. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET ve BETTER_AUTH_SECRET değerlerini ayarlayın.":
    "{name} isn't configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and BETTER_AUTH_SECRET.",
  "{name} bağlantı isteği geçersiz. Bağlantıyı yeniden başlatın.":
    "The {name} connection request is invalid. Start connecting again.",
  "{name} bağlantı isteğinin süresi doldu. Bağlantıyı yeniden başlatın.":
    "The {name} connection request has expired. Start connecting again.",
  "Search Console bağlantısının yenilenmesi gerekiyor.":
    "The Search Console connection needs to be renewed.",
  "Search Console isteği başarısız oldu.": "The Search Console request failed.",
  "Bu Search Console mülkü bağlı Google hesabınızda bulunmuyor.":
    "This Search Console property isn't in your connected Google account.",
  "Bu Search Console mülkü için doğrulanmış erişiminiz yok.":
    "You don't have verified access to this Search Console property.",
  "En fazla {count} etikete göre filtreleyebilirsiniz.": {
    one: "You can filter by at most {count} tag.",
    other: "You can filter by at most {count} tags.",
  },
  "Bu adda bir etiket zaten var. Farklı bir ad seçin.":
    "A tag with this name already exists. Choose a different name.",
  "Etiket {count} kelimeye bağlı. Önce bu kelimelerden kaldırıp tekrar deneyin.":
    {
      one: "This tag is on {count} keyword. Remove it from that keyword first, then try again.",
      other:
        "This tag is on {count} keywords. Remove it from those keywords first, then try again.",
    },
  "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti.":
    "The key works: Google PageSpeed Insights accepted the measurement.",
  "Kayıtlı bir anahtar yok; test edilecek bir şey yok. Önce anahtarı kaydedin.":
    "No key is saved, so there is nothing to test. Save the key first.",
  "Google anahtarı geçersiz buldu. Anahtarı Google Cloud Console'dan yeniden kopyalayıp kaydedin.":
    "Google found the key invalid. Copy it again from the Google Cloud Console and save it.",
  "Anahtar tanınıyor ama PageSpeed Insights için kullanılamıyor: API etkin değil ya da anahtarın kısıtlamaları buna izin vermiyor. Google Cloud Console'da API'yi etkinleştirin ve anahtar kısıtlamasını kontrol edin.":
    "The key is recognized but can't be used for PageSpeed Insights: the API isn't enabled, or the key's restrictions don't allow it. Enable the API in the Google Cloud Console and check the key's restrictions.",
  "Anahtar geçerli ama Google'ın günlük kotası dolmuş. Yarın yeniden deneyin ya da Google Cloud Console'dan kotayı kontrol edin.":
    "The key is valid, but Google's daily quota is used up. Try again tomorrow, or check the quota in the Google Cloud Console.",
  "Anahtar geçerli ama Google dakikalık sınıra takıldı. Bir dakika bekleyip yeniden deneyin.":
    "The key is valid, but Google hit its per-minute limit. Wait a minute and try again.",
  "Google'a ulaşılamadı. İnternet bağlantısını kontrol edip yeniden deneyin; anahtar hakkında bir sonuç alınamadı.":
    "Couldn't reach Google, so there is no result for the key. Check your internet connection and try again.",
  "Google beklenmeyen bir yanıt verdi; anahtar hakkında bir sonuç alınamadı. Birazdan yeniden deneyin.":
    "Google sent an unexpected response, so there is no result for the key. Try again in a moment.",
  "Tek projenizi arşivleyemezsiniz.": "You cannot archive your only project.",
  'Alan adı olmayan "Default" adında bir proje zaten var. Farklı bir ad seçin ya da bir alan adı ekleyin.':
    'A project named "Default" with no domain already exists. Choose a different name or add a domain.',
  "Geçerli bir alan adı girin, örneğin acme.com.":
    "Enter a valid domain, for example acme.com.",
  'Alan adı olmayan, "Default" adında etkin bir proje zaten var. Önce onu yeniden adlandırın, sonra bunu geri yükleyin.':
    'An active project named "Default" with no domain already exists. Rename it first, then restore this one.',
  "Geçerli bir alan adı girin.": "Enter a valid domain.",
  "Adresin nereye çözümlendiği doğrulanamadı, bu yüzden tarama başlatılmadı. Uygulamanın cloudflare-dns.com adresine erişebildiğinden emin olun.":
    "Couldn't confirm where this address resolves, so the crawl was not started. Make sure the app can reach cloudflare-dns.com.",
  "Adres herkese açık DNS'te çözümlenmiyor, bu yüzden tarama başlatılmadı.":
    "This address doesn't resolve in public DNS, so the crawl was not started.",
  "Kullanıcı adı veya parola içeren adresler taranamaz.":
    "Addresses that contain a username or password can't be crawled.",
  "Google beklenmedik bir yanıt verdi.": "Google sent an unexpected response.",
  "Google'a ulaşılamadı.": "Couldn't reach Google.",
  "Google'ın istek sınırı doldu.": "Google's request limit has been reached.",
  'Anahtarın API kısıtlaması "Chrome UX Report API"yi dışarıda bırakıyor. Google Cloud Console\'da anahtarın kısıtlamasına ekleyip tekrar deneyin.':
    "The key's API restrictions leave out the \"Chrome UX Report API\". Add it to the key's restrictions in the Google Cloud Console and try again.",
  'Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin değil. Google Cloud Console\'da API bölümünden etkinleştirip tekrar deneyin.':
    "The \"Chrome UX Report API\" isn't enabled in the key's Google Cloud project. Enable it under APIs in the Google Cloud Console and try again.",
  'Google bu anahtara izin vermedi{reason}. Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin olmalı ve anahtarın kısıtlamasında yer almalı.':
    "Google denied this key{reason}. The \"Chrome UX Report API\" must be enabled in the key's Google Cloud project and included in the key's restrictions.",
  "Google yanıt vermedi (HTTP {status}). Birazdan tekrar deneyin.":
    "Google didn't respond (HTTP {status}). Try again in a moment.",
  "Hizmet hesabı Google Analytics için erişim anahtarı alamadı.":
    "The service account couldn't get an access token for Google Analytics.",
  "Google Analytics erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Couldn't get a Google Analytics access token (access may have been revoked or expired).",
  "Google Analytics erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Google Analytics didn't return an access token (access may have been revoked or expired).",
  'Bu bir hizmet hesabı anahtarı değil. Dosyada "type": "service_account" yazmalı.':
    'This isn\'t a service account key. The file should contain "type": "service_account".',
  "client_email bir e-posta adresi olmalı.":
    "client_email must be an email address.",
  "private_key alanı eksik ya da bozuk.":
    "The private_key field is missing or damaged.",
  "Geçerli bir JSON değil. Google'dan indirdiğiniz dosyanın tamamını yapıştırın.":
    "This isn't valid JSON. Paste the whole file you downloaded from Google.",
  "Anahtar dosyası okunamadı.": "Couldn't read the key file.",
  "Hizmet hesabı tanımlı değil ya da saklanan anahtar okunamıyor.":
    "No service account is set up, or the stored key can't be read.",
  "Hizmet hesabı için izin verilmeyen kapsam: {scope}":
    "Scope not allowed for the service account: {scope}",
  "Hizmet hesabı anahtarı imzalanamadı; dosya bozuk olabilir.":
    "Couldn't sign with the service account key; the file may be damaged.",
  "Google hizmet hesabı için erişim anahtarı vermedi ({status}). {detail}":
    "Google didn't issue an access token for the service account ({status}). {detail}",
  "Google beklenmeyen bir erişim anahtarı yanıtı döndürdü.":
    "Google returned an unexpected access token response.",
  "Hizmet hesabı Search Console'a bağlanamadı. Anahtar dosyasını yeniden yükleyin.":
    "The service account couldn't connect to Search Console. Upload the key file again.",
  "Search Console erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Couldn't get a Search Console access token (access may have been revoked or expired).",
  "Search Console erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Search Console didn't return an access token (access may have been revoked or expired).",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı). Bir OAuth istemcisi de tanımlı; hizmet hesabı önce gelir.":
    "Using the Google service account (saved in Settings). An OAuth client is set up too; the service account takes precedence.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı).":
    "Using the Google service account (saved in Settings).",
  "Google OAuth istemcisi kullanılıyor (Ayarlar'da kayıtlı).":
    "Using the Google OAuth client (saved in Settings).",
  "Google OAuth istemcisi kullanılıyor (GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET ortam değişkenlerinden).":
    "Using the Google OAuth client (from the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables).",
  "Google erişimi henüz girilmedi: Ayarlar'a bir hizmet hesabı ya da OAuth istemcisi girin. Girmeden Search Console ve Analytics bağlanamaz.":
    "No Google access entered yet: add a service account or an OAuth client in Settings. Search Console and Analytics can't connect without one.",
  "PageSpeed anahtarı Ayarlar'da kayıtlı.":
    "The PageSpeed key is saved in Settings.",
  "Denetim hâlâ çalışıyor. Rapor, denetim bitince oluşturulabilir.":
    "The audit is still running. The report can be created once it finishes.",
  "Bu denetim raporu, sorun listeleri en aza indirilse bile saklama sınırını aşıyor. Raporu oluşturmak için denetimi daha az sayfa veya daha kısa adreslerle yeniden çalıştırın.":
    "This audit report exceeds the storage limit even with the issue lists cut to a minimum. To create it, run the audit again with fewer pages or shorter addresses.",
  "URL Denetimi (Search Console)": "URL Inspection (Search Console)",
  "Mülk başına günlük {count} sorgu; son 24 saatte bu uygulamanın kaydettiği sorgular sayılır. Google'ın sıfırlanma saati doğrulanmadı.":
    "{count} queries per property per day; counts the queries this app logged in the last 24 hours. Google's reset time is not verified.",
  "Uygulamanın kendi kaydı": "The app's own log",
  "Anahtar tanımlı.": "A key is set.",
  "PageSpeed anahtarı yok: denetimde en fazla {count} sayfanın hızı ölçülür. Anahtarı Ayarlar > Hız ölçümü bölümünden girebilirsiniz.":
    {
      one: "No PageSpeed key: an audit measures the speed of at most {count} page. You can enter a key under Settings > Speed tests.",
      other:
        "No PageSpeed key: an audit measures the speed of at most {count} pages. You can enter a key under Settings > Speed tests.",
    },
  "{count} ölçüm günlük sınır nedeniyle yapılamadı": {
    one: "{count} measurement was skipped because of the daily limit",
    other: "{count} measurements were skipped because of the daily limit",
  },
  "{count} ölçüm dakikalık sınıra takıldı": {
    one: "{count} measurement hit the per-minute limit",
    other: "{count} measurements hit the per-minute limit",
  },
  "Son 24 saatte başlayan denetimlerde {events}.":
    "In audits started in the last 24 hours, {events}.",
  "Son 24 saatte başlayan denetimlerde sınır olayı yok.":
    "No limit was hit in audits started in the last 24 hours.",
  "{key} Sayılar, son 24 saatte başlayan denetimlere aittir (tek tek ölçüm saati kaydedilmez). {lastEvent} Google'ın günlük toplamı doğrulanmadı; gerçek kota Google Cloud Console > PageSpeed Insights API > Quotas bölümünde.":
    "{key} The figures cover audits started in the last 24 hours (individual measurement times are not recorded). {lastEvent} Google's daily total is not verified; the real quota is in Google Cloud Console > PageSpeed Insights API > Quotas.",
  "Google yanıtındaki son kota bilgisi":
    "Latest quota info in Google's response",
  "Uygulama yeniden başladığından ya da GA4 bağlantısı değiştiğinden beri bu bağlantıyla GA4 raporu çalışmadı; sayaç bir rapor çalışınca dolar.":
    "No GA4 report has run on this connection since the app restarted or the GA4 connection changed; the meter fills in once a report runs.",
  "Son istek: {count} puan.": {
    one: "Last request: {count} point.",
    other: "Last request: {count} points.",
  },
  "günlük {count}": "{count} per day",
  "saatlik {count}": "{count} per hour",
  "Kalan değer standart mülk sınırını ({limit}) aşıyor; mülk büyük olasılıkla Analytics 360, sınır 10 kat. Gerçek sınır Google'dan gelmez, bu yüzden çubuk gösterilmez. {lastCost}":
    "What's left exceeds the standard property limit ({limit}), so this is most likely an Analytics 360 property with a 10x limit. Google doesn't report the real limit, so no bar is shown. {lastCost}",
  "Google yalnızca kalanı bildirir. Sınır varsayımdır: standart mülk için {limit}; 360 mülklerde 10 kat. Kullanılan = varsayılan sınır − kalan. {lastCost} Sıfırlanma saati doğrulanmadı.":
    "Google reports only what's left. The limit is an assumption: {limit} for a standard property, 10x for 360 properties. Used = assumed limit − remaining. {lastCost} The reset time is not verified.",
  "Analytics (GA4) günlük kota puanı": "Analytics (GA4) daily quota points",
  "Analytics (GA4) saatlik kota puanı": "Analytics (GA4) hourly quota points",
  "Denetim sayfa sınırı": "Audit page limit",

  "Uygulamanın veritabanı": "The app's database",
  "Proje başına rapor": "Reports per project",
  "Takılan bir döngüye karşı koruma; gerçek bir iş akışı buna yaklaşmaz.":
    "A guard against a runaway loop; a real workflow never gets close.",
  "Proje başına rapor şablonu": "Report templates per project",
  "Doluysa yeni şablon için birini silmek gerekir.":
    "When it's full, delete one to add a new template.",
  "En büyük raporun boyutu": "Size of the largest report",
  "Tek bir rapor bu boyutu aşarsa kaydedilmez; genelde gömülü görseller yüzünden olur.":
    "A single report over this size isn't saved; embedded images are the usual cause.",
  "Denetim tamamlanmadığı için puan hesaplanmadı.":
    "The audit didn't finish, so no score was calculated.",
  "Taranan sayfa olmadığı için puan hesaplanamadı.":
    "No pages were crawled, so no score could be calculated.",
  "Kayıtlı hiçbir sorun yok. Site temiz görünüyor.":
    "No issues recorded. The site looks clean.",
  "Site sağlıklı. Kalan birkaç düzeltme puanı yukarı çeker.":
    "The site is healthy. A few remaining fixes will raise the score.",
  "Temel sağlam, ama düzeltilmesi gereken belirgin sorunlar var.":
    "The foundation is solid, but there are clear issues to fix.",
  "Orta düzeyde. Kritik ve uyarı sorunları aramadaki performansı gölgeliyor.":
    "Fair. Critical issues and warnings are holding back search performance.",
  "Orta düzeyde. Kritik sorun yok; uyarı sorunları aramadaki performansı gölgeliyor.":
    "Fair. No critical issues; warnings are holding back search performance.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar aramadaki performansı aşağı çekiyor; en çok puan getirenlerden başlayın.":
    "Poor. No critical issues, but accumulated warnings are holding back search performance; start with the ones worth the most points.",
  "Zayıf. Önce kritik sorunlar düzeltilmeli; bunlar sayfaların aramada görünmesini engelleyebilir.":
    "Poor. Fix the critical issues first; they can keep pages from appearing in search.",
  'Denetim tamamlanmadığı ya da hiç sayfa taranamadığı için sorun listesi eksik olabilir; bu yüzden "sorun yok" denmiyor.':
    "The audit didn't finish or no pages could be crawled, so the issue list may be incomplete; that is why it doesn't say \"no issues\".",
  "Yanıt yok": "No response",
  Bilinmiyor: "Unknown",
  Yok: "None",
  Tarama: "Crawling",
  İçerik: "Content",
  "Dizine alma": "Indexing",
  Hız: "Speed",
  Diğer: "Other",
  Kritik: "Critical",
  Uyarı: "Warning",
  Bilgi: "Info",
  "ve {count} adres daha (boyutu makul tutmak için burada kesildi).": {
    one: "and {count} more address (cut here to keep the file size reasonable).",
    other:
      "and {count} more addresses (cut here to keep the file size reasonable).",
  },
  "ve {count} sayfa daha (boyutu makul tutmak için burada kesildi).": {
    one: "and {count} more page (cut here to keep the file size reasonable).",
    other:
      "and {count} more pages (cut here to keep the file size reasonable).",
  },
  "ve {count} kayıt daha (boyutu makul tutmak için burada kesildi).": {
    one: "and {count} more record (cut here to keep the file size reasonable).",
    other:
      "and {count} more records (cut here to keep the file size reasonable).",
  },
  "ve {count} sorun türü daha (boyutu makul tutmak için burada kesildi).": {
    one: "and {count} more issue type (cut here to keep the file size reasonable).",
    other:
      "and {count} more issue types (cut here to keep the file size reasonable).",
  },
  "{count} sayfa": {
    one: "{count} page",
    other: "{count} pages",
  },
  "Puan yok": "No score",
  "Site puanı 100 üzerinden {score}": "Site score {score} out of 100",
  "{host} site denetimi": "{host} site audit",
  "{host} için {count} sayfa tarandı.": {
    one: "{count} page crawled on {host}.",
    other: "{count} pages crawled on {host}.",
  },
  "Site puanı {count}/100.": "Site score {count}/100.",
  "Kayıtlı sorun yok.": "No issues recorded.",
  "Denetim tamamlanmadığı için sorun listesi eksik olabilir.":
    "The audit didn't finish, so the issue list may be incomplete.",
  "{count} sorun türü bulundu: {critical} kritik, {warning} uyarı, {info} bilgi.":
    {
      one: "{count} issue type found: {critical} critical, {warning} warning, {info} info.",
      other:
        "{count} issue types found: {critical} critical, {warning} warnings, {info} info.",
    },
  "En çok sayfayı etkileyen: {title} ({count} sayfa).": {
    one: "Affecting the most pages: {title} ({count} page).",
    other: "Affecting the most pages: {title} ({count} pages).",
  },
  "Site denetim raporu": "Site audit report",
  "seowatcher ile üretildi. Bu dosya kendi kendine yeter: açmak için internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.":
    "Made with seowatcher. This file is self-contained: it opens without an internet connection. For a PDF, use Print in your browser.",
  "3. Genel görünüm": "3. Overview",
  "4. Sorunlar": "4. Issues",
  "5. Hız ölçümü": "5. Speed tests",
  "6. Google dizin durumu": "6. Google index status",
  "7. Site haritası": "7. Sitemap",
  "8. Yöntem ve sınırlar": "8. Method and limits",
  "Ek A. Kalan etkilenen adresler": "Appendix A. Remaining affected addresses",
  "Ek B. Taranan sayfalar": "Appendix B. Crawled pages",
  K: "C",
  U: "W",
  B: "I",
  "K kritik, U uyarı, B bilgi.": "C critical, W warning, I info.",
  "Sorun türleri": "Issue types",
  İçindekiler: "Contents",
  "Sorun sayısı bilinmiyor.": "The number of issues is unknown.",
  "{severity} sorun türü": "{severity} issue types",
  "Önem derecesine göre sorun türleri": "Issue types by severity",
  tür: "types",
  "Önem derecesine göre sorun türü dağılımı":
    "Distribution of issue types by severity",
  "Kategoriye göre sorun türleri": "Issue types by category",
  "Kategori ve önem derecesine göre sorun türü sayısı":
    "Number of issue types by category and severity",
  "En çok sayfayı etkileyen 10 sorun türü":
    "10 issue types affecting the most pages",
  "Etkilenen sayfa sayısına göre ilk on sorun türü":
    "Top ten issue types by pages affected",
  "HTTP durum kodları": "HTTP status codes",
  sayfa: "pages",
  "Durum kodu dağılımı": "Status code distribution",
  "Tarama derinliği (ana sayfadan kaç tıklama)":
    "Crawl depth (clicks from the home page)",
  "Tarama derinliği dağılımı": "Crawl depth distribution",
  "Başlık uzunluğu (karakter)": "Title length (characters)",
  "Yaklaşık 30-60 karakter, başlığın arama sonucunda kısaltılmadan görünmesi için bir ölçüttür; Google sabit bir sınır koymaz.":
    "About 30-60 characters is a rule of thumb for a title to show in search results without being cut off; Google sets no fixed limit.",
  "Sayfa başlığı uzunluğu dağılımı": "Page title length distribution",
  "Sunucu yanıt süresi": "Server response time",
  "Yanıt süresi dağılımı": "Response time distribution",
  "Dizine girebilir": "Indexable",
  "Site haritasında": "In sitemap",
  "Başlığı yok": "No title",
  "Meta açıklaması yok": "No meta description",
  "%{value}": "{value}%",
  "{count} taranan sayfaya oranla.": {
    one: "Relative to {count} crawled page.",
    other: "Relative to {count} crawled pages.",
  },
  "Sayfa durumu": "Page status",
  "Sayfa durumu özeti": "Page status summary",
  "Her grafiğin altında aynı veriler yazıyla da verilir.":
    "Each chart's data is also given in words below it.",
  "tüm site": "whole site",
  "Etkilenen: tüm site": "Affected: the whole site",
  "ve {count} sayfa daha (ayrıntı sorun bölümünde)": {
    one: "and {count} more page (details in the issues section)",
    other: "and {count} more pages (details in the issues section)",
  },
  "Ne yapılmalı:": "What to do:",
  "Neden:": "Why:",
  "Bu hafta yapılacaklar": "To do this week",
  "Düzeltilecek kayıtlı sorun yok.": "No recorded issues to fix.",
  "Düzeltilecek sorun listesi eksik olabilir.":
    "The list of issues to fix may be incomplete.",
  "Bu hafta yapılacak {count} şey": {
    one: "{count} thing to do this week",
    other: "{count} things to do this week",
  },
  "Sıralama, düzeltildiğinde site puanına en çok puan kazandıranlara göre.":
    "Ordered by how many points each fix adds to the site score.",
  Sonrasında: "After that",
  "Denetim hata verip durdu.": "The audit stopped with an error.",
  "Denetim hâlâ çalışıyor.": "The audit is still running.",
  "Hiç sayfa taranamadı.": "No pages could be crawled.",
  "{count} sayfa tarandı": {
    one: "{count} page crawled",
    other: "{count} pages crawled",
  },
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "PageSpeed returned no result in this audit: {error} Real-user data (CrUX) was not measured.",
  "Rapor eksik olabilir.": "The report may be incomplete.",
  "{count} sorun türü: {critical} kritik, {warning} uyarı, {info} bilgi.": {
    one: "{count} issue type: {critical} critical, {warning} warning, {info} info.",
    other:
      "{count} issue types: {critical} critical, {warning} warnings, {info} info.",
  },
  "Taranan sayfa": "Pages crawled",
  "Ortalama yanıt": "Average response",
  "Site puanı": "Site score",
  Dizinde: "Indexed",
  "Dizinde değil": "Not indexed",
  Kısmen: "Partial",
  Nötr: "Neutral",
  "Bu denetimin sayfaları için Search Console URL Denetleme Aracı sonucu kayıtlı değil, bu yüzden Google'ın hangi sayfaları dizine aldığı rapora girmiyor. Dizin Kapsamı ekranından inceleme çalıştırıldıktan sonra rapor yeniden oluşturulursa bu bölüm dolar.":
    "No Search Console URL Inspection results are stored for this audit's pages, so the report can't say which pages Google has indexed. Run an inspection from the Index status screen and create the report again to fill this section.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz; son inceleme {date}.":
    "Source: Search Console URL Inspection. The results are stored, so this report sends Google no new requests; last inspected {date}.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz.":
    "Source: Search Console URL Inspection. The results are stored, so this report sends Google no new requests.",
  "Dizine girebilen {count} sayfadan {checked} tanesi için Google yanıt verdi ({percent}).":
    {
      one: "Google answered for {checked} of {count} indexable page ({percent}).",
      other:
        "Google answered for {checked} of {count} indexable pages ({percent}).",
    },
  "Dizin durumu": "Index status",
  "Google dizin durumu dağılımı": "Google index status distribution",
  "Google'ın verdiği durumlar": "States reported by Google",
  "Kapsam durumu dağılımı": "Coverage state distribution",
  "Dikkat isteyen sayfalar": "Pages that need attention",
  Sonuç: "Result",
  "Google'ın seçtiği asıl adres": "Google-selected canonical",
  "Hata: {error}": "Error: {error}",
  Aynı: "Same",
  "Dizinde değil olarak işaretlenen ya da asıl adresi farklı seçilen sayfa yok.":
    "No page is marked as not indexed or has a different canonical selected.",
  "Taranan {count} sayfanın {inMap} tanesi ({percent}) site haritasında. Haritanın kendisi (toplam adres sayısı, dosya boyutu) rapora girmez; yalnızca taranan sayfaların harita durumu ve haritayla ilgili bulunan sorunlar gösterilir.":
    {
      one: "{inMap} of {count} crawled page ({percent}) is in the sitemap. The sitemap itself (total addresses, file size) isn't covered; only the sitemap status of crawled pages and the sitemap issues found are shown.",
      other:
        "{inMap} of {count} crawled pages ({percent}) are in the sitemap. The sitemap itself (total addresses, file size) isn't covered; only the sitemap status of crawled pages and the sitemap issues found are shown.",
    },
  "Haritayla ilgili sorun": "Sitemap issue",
  Önem: "Severity",
  "Haritayla ilgili kayıtlı sorun yok.": "No sitemap issues recorded.",
  "Dizine girebilen ama haritada olmayan sayfalar ({count})":
    "Indexable pages missing from the sitemap ({count})",
  "Etkilenen adres": "Affected address",
  Ayrıntı: "Details",
  "Tüm site": "Whole site",
  "Tüm siteyi ilgilendiriyor": "Affects the whole site",
  "Ne demek, neden önemli:": "What it means and why it matters:",
  "Nasıl düzeltilir:": "How to fix:",
  'Kalan adresler raporun sonundaki <a href="#ek-adresler">Ek A</a> bölümünde.':
    'The remaining addresses are in <a href="#ek-adresler">Appendix A</a> at the end of the report.',
  "Bu denetimde kayıtlı sorun yok.": "This audit recorded no issues.",
  "Sorun listesi eksik olabilir (denetim tamamlanmadı).":
    "The issue list may be incomplete (the audit didn't finish).",
  "{count} tür": {
    one: "{count} type",
    other: "{count} types",
  },
  "{count} sorun türü": {
    one: "{count} issue type",
    other: "{count} issue types",
  },
  "Önem derecesine, sonra kategoriye, sonra etkilenen sayfa sayısına göre sıralı. Her sorun için en fazla {count} adres yazılır.":
    {
      one: "Sorted by severity, then category, then pages affected. At most {count} address is listed per issue.",
      other:
        "Sorted by severity, then category, then pages affected. At most {count} addresses are listed per issue.",
    },
  "{take} / {count} adres": {
    one: "{take} / {count} address",
    other: "{take} / {count} addresses",
  },
  "Sorunların altında gösterilen ilk {count} adresin ötesindekiler.": {
    one: "Addresses beyond the first {count} shown under each issue.",
    other: "Addresses beyond the first {count} shown under each issue.",
  },
  "{count} sayfa tarandı, başlangıç adresi {url}.": {
    one: "{count} page crawled, starting from {url}.",
    other: "{count} pages crawled, starting from {url}.",
  },
  "Tarama üst sınırı {count} sayfaydı; sınıra ulaşıldı, yani site bundan büyük olabilir ve görülmeyen sayfalardaki sorunlar rapora girmedi.":
    {
      one: "The crawl limit was {count} page and it was reached, so the site may be larger and issues on unseen pages are not in the report.",
      other:
        "The crawl limit was {count} pages and it was reached, so the site may be larger and issues on unseen pages are not in the report.",
    },
  "Tarama üst sınırı {count} sayfaydı.": {
    one: "The crawl limit was {count} page.",
    other: "The crawl limit was {count} pages.",
  },
  "Hız ölçümü bu denetimde kapalıydı.":
    "Speed measurement was off for this audit.",
  "Hiçbir sayfa için hız puanı kaydedilmedi.":
    "No speed score was recorded for any page.",
  "{count} sayfa Lighthouse ile ölçüldü (laboratuvar verisi, tek sanal cihaz). Ölçülmeyen sayfalar hakkında hız bilgisi yoktur.":
    {
      one: "{count} page was measured with Lighthouse (lab data, a single simulated device). There is no speed data for pages that weren't measured.",
      other:
        "{count} pages were measured with Lighthouse (lab data, a single simulated device). There is no speed data for pages that weren't measured.",
    },
  "Başlangıç {start}.": "Started {start}.",
  "Başlangıç {start}, bitiş {end}, süre {duration}.":
    "Started {start}, finished {end}, took {duration}.",
  "Başlangıç {start}, bitiş {end}.": "Started {start}, finished {end}.",
  "Rapor o andaki durumu gösterir; site sonradan değişmiş olabilir.":
    "The report shows the site as it was then; it may have changed since.",
  "Tarih aralığı": "Date range",
  "Hız ölçümü": "Speed tests",
  "Google dizin durumu": "Google index status",
  "Search Console URL Denetleme Aracı'nın kayıtlı yanıtları; {count} sayfa için Google yanıt verdi. Rapor Google'a yeni istek atmaz.":
    {
      one: "Stored Search Console URL Inspection answers; Google answered for {count} page. The report sends Google no new requests.",
      other:
        "Stored Search Console URL Inspection answers; Google answered for {count} pages. The report sends Google no new requests.",
    },
  "Bu denetim için kayıtlı Google yanıtı yok, bölüm boş.":
    "No Google answers are stored for this audit, so the section is empty.",
  "Listelerdeki kesintiler": "Cuts in the lists",
  "Dosya boyutunu makul tutmak için her sorunun altında en fazla {issuePages} adres, sayfa tablosunda {pages} sayfa, hız tablosunda {speed} sayfa yazılır; kesilen her listenin altında kaç kaydın dışarıda kaldığı belirtilir. Tam kayıtlar denetim ekranındadır.":
    "To keep the file size reasonable, each issue lists at most {issuePages} addresses, the pages table {pages} pages and the speed table {speed} pages; every cut list says how many records were left out. The full records are on the audit screen.",
  "Bu raporda ölçülmeyenler": "Not measured in this report",
  "Arama sıralaması, tıklama ve trafik: bu rapor Search Console ya da Analytics trafiğini içermez.":
    "Search rankings, clicks and traffic: this report doesn't include Search Console or Analytics traffic.",
  "Geri bağlantılar ve rakip siteler.": "Backlinks and competing sites.",
  "İçeriğin kalitesi, arama niyetine uygunluğu ve özgünlüğü; yalnızca kelime sayısı gibi yapısal sinyallere bakılır.":
    "Content quality, fit with search intent and originality; only structural signals such as word count are checked.",
  "Gerçek kullanıcı hız verisi (CrUX); yalnızca laboratuvar ölçümü vardır.":
    "Real-user speed data (CrUX); there are only lab measurements.",
  "Giriş gerektiren sayfalar ve taramanın ulaşamadığı adresler.":
    "Pages that require sign-in, and addresses the crawl couldn't reach.",
  "Kayıtlı sayfa yok.": "No pages recorded.",
  '{count} sayfa; en çok sorunu olanlar üstte. "Başlık" başlığın karakter sayısıdır.':
    {
      one: '{count} page; those with the most issues first. "Title" is the title\'s length in characters.',
      other:
        '{count} pages; those with the most issues first. "Title" is the title\'s length in characters.',
    },
  "Dizine girer": "Indexable",
  Haritada: "In sitemap",
  Yanıt: "Response",
  "Yönlenir: {url}": "Redirects to: {url}",
  yok: "none",
  İyi: "Good",
  Orta: "Average",
  Zayıf: "Poor",
  iyi: "good",
  orta: "average",
  zayıf: "poor",
  "Bu metrik ölçülmedi.": "This metric wasn't measured.",
  "{metric}: en kötü 5": "{metric}: worst 5",
  "LCP (en büyük içerik)": "LCP (largest content)",
  "Sayfanın ana görselinin ya da başlığının ekranda belirmesi ne kadar sürdü. 2,5 saniye altı iyi.":
    "How long the page's main image or heading took to appear on screen. Under 2.5 seconds is good.",
  "CLS (görsel kayma)": "CLS (layout shift)",
  "Sayfa yüklenirken içerik ne kadar yer değiştirdi; yanlış tıklamaya yol açan kayma. 0,1 altı iyi.":
    "How much content moved while the page loaded, the kind of shift that causes mis-clicks. Under 0.1 is good.",
  "INP (tepki süresi)": "INP (responsiveness)",
  "Bir tıklamaya ya da dokunmaya sayfa ne kadar çabuk karşılık verdi. 200 ms altı iyi.":
    "How quickly the page responded to a click or tap. Under 200 ms is good.",
  İ: "G",
  O: "A",
  Z: "P",
  "İ iyi, O orta, Z zayıf; her sayfa yalnızca ölçülen metrikte sayılır.":
    "G good, A average, P poor; each page counts only for the metrics measured on it.",
  "Temel Web Verileri: sayfaların dağılımı (mobil)":
    "Core Web Vitals: distribution of pages (mobile)",
  "Her metrik için iyi, orta ve zayıf sayfa sayısı":
    "Good, average and poor pages for each metric",
  "Bu denetimde hız ölçümü kapalıydı, bu yüzden sayfa hızı hakkında bir şey söylenmiyor.":
    "Speed measurement was off for this audit, so nothing is said about page speed.",
  "Bu denetimde kayıtlı Lighthouse sonucu yok: hız ölçümü kapalıydı ya da ölçümler tamamlanamadı (ör. ölçüm servisi istek sınırına takıldı). Hız ölçülmediği için bu rapor hız hakkında bir şey söylemez.":
    "This audit has no stored Lighthouse results: speed measurement was off, or the measurements couldn't finish (for example, the measuring service hit its request limit). Since speed wasn't measured, this report says nothing about it.",
  "(adres bulunamadı)": "(address not found)",
  "İyi (90-100)": "Good (90-100)",
  "Orta (50-89)": "Average (50-89)",
  "Zayıf (0-49)": "Poor (0-49)",
  Performans: "Performance",
  Erişilebilirlik: "Accessibility",
  "En iyi uygulamalar": "Best practices",
  "{category} (mobil ort.)": "{category} (mobile avg.)",
  "Mobil puan": "Mobile score",
  "Masaüstü puan": "Desktop score",
  "Ölçüm hatası: {error}": "Measurement error: {error}",
  "{count} sayfa mobilde ölçüldü": {
    one: "{count} page measured on mobile",
    other: "{count} pages measured on mobile",
  },
  " (taranan {count} sayfanın {percent}'i)": {
    one: " ({percent} of {count} crawled page)",
    other: " ({percent} of {count} crawled pages)",
  },
  "; {count} ölçüm hata verdi": {
    one: "; {count} measurement failed",
    other: "; {count} measurements failed",
  },
  '<strong>{measured}</strong>{share}{failed}. Ortalama tek bir sayı "her sayfa orta" ile "yarısı mükemmel yarısı felaket"i aynı gösterdiği için dağılım veriliyor.':
    '<strong>{measured}</strong>{share}{failed}. The distribution is shown because a single average makes "every page is fair" look the same as "half excellent, half terrible".',
  "{planned} sayfanın ölçülmesi planlandı, {measured} tanesi puan verdi{failed}. Aşağıdaki dağılım yalnızca ölçülen sayfaları yansıtır; ölçülmeyenler iyi ya da kötü sayılmadı.":
    "{planned} pages were planned for measurement and {measured} returned a score{failed}. The distribution below reflects only the measured pages; the rest were counted as neither good nor bad.",
  "; kalanlar hata verdi ya da ölçüm servisinin istek sınırına takılmış olabilir":
    "; the rest failed or may have hit the measuring service's request limit",
  "Ölçüm kısmi.": "Partial measurement.",
  "Mobil performans puanı dağılımı": "Mobile performance score distribution",
  "Lighthouse performans puanı histogramı":
    "Lighthouse performance score histogram",
  "Puan bandı": "Score band",
  "İyi, orta, zayıf sayfa sayısı": "Good, average and poor page counts",
  "Lighthouse kategorileri": "Lighthouse categories",
  "Kategori başına mobil ortalama puan": "Mobile average score per category",
  "Sayfa sayfa sonuçlar": "Results by page",
  "Mobil performans puanı en düşük sayfalar üstte. Metrikler mobil ölçümden.":
    "Pages with the lowest mobile performance score first. Metrics are from the mobile measurement.",
  "<strong>Laboratuvar ve gerçek kullanıcı verisi.</strong> Buradaki rakamlar Lighthouse'un laboratuvar ölçümüdür: tek bir sanal cihazda, kontrollü ağ ve işlemci koşulunda yapılır. Gerçek ziyaretçilerden toplanan alan verisi (Chrome Kullanıcı Deneyimi Raporu, CrUX), PageSpeed ölçümü varsa Anlık veri bölümündeki Temel Web Verileri tablosundadır. İkisi farklı çıkabilir. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır.":
    "<strong>Lab data and real-user data.</strong> These figures are Lighthouse lab measurements, taken on a single simulated device under controlled network and CPU conditions. Field data collected from real visitors (Chrome User Experience Report, CrUX) is in the Core Web Vitals table of the Instant data section when PageSpeed was measured. The two can differ. Google's ranking systems use field data (CrUX), but a good value alone doesn't guarantee rankings; relevant content comes first.",
  'Eşikler Google\'ın yayımladığı değerlerdir: LCP 2,5 sn altı iyi, 4 sn üstü zayıf; CLS 0,1 altı iyi, 0,25 üstü zayıf; INP 200 ms altı iyi, 500 ms üstü zayıf. INP laboratuvarda çoğu zaman ölçülemez ("--" görünür).':
    "The thresholds are Google's published values: LCP under 2.5 s is good and over 4 s poor; CLS under 0.1 is good and over 0.25 poor; INP under 200 ms is good and over 500 ms poor. INP often can't be measured in the lab (it shows \"--\").",

  // audit screens UX pass (2026-10-26)
  "{points} puan": "{points} points",
  "Puanlar, o sorun tek başına tamamen düzeltilirse site puanına eklenecek yaklaşık değerdir; değerler toplanmaz.":
    "Points are roughly what fully fixing that issue alone adds to the site score; the values don't add up.",
  "Kısmi veri": "Partial data",
  Kapalı: "Off",
  "{measured} / {total} ölçüm": "{measured} of {total} measurements",
  "{count} ölçüm": {
    one: "{count} measurement",
    other: "{count} measurements",
  },
  Ölçülemedi: "Not measured",
  "Denetim tarihi": "Audit date",
  "{count} (üst sınır {max})": "{count} (limit {max})",
  "Google dizin verisi": "Google index data",
  "Kritik sorun": "Critical issues",
  "Kritik kontrol": "Critical checks",
  İyileştirme: "Improvements",
  "Geçen kontrol": "Checks passed",
  "Temiz çıkan": "Came back clean",
  "Veri toplanamadı": "No data collected",
  "Henüz kontrol edilmedi": "Not checked yet",

  // audit screens UX pass (2026-10-26)
  "Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.":
    "New checks were added; this comparison covers only the checks both audits measured.",
  "Platform alan adı": "Platform domain",
  "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.":
    "The site is on a subdomain of a hosting platform; its registration and DNS belong to the platform, so the domain and DNS checks were skipped.",
  "sayı alınamadı (tarama sınırı)": "count not read (crawl limit)",
  // Cards and stats review (Opportunities, rankings, setup verdict).

  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, sorgu bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) beklenen en fazla ek tıklamadır.":
    "{count} queries averaging positions 4 to 20 with at least {impressions} impressions. The possible gain is the most extra clicks expected if a query moves up one step (6-10 to 4-5, 4-5 to 2-3, 11-20 to page one).",
  // Translation pass for project, report, saved keyword, settings and help updates.
  "PageSpeed Insights · yalnızca denetimler":
    "PageSpeed Insights · audits only",
  "Standart mülk sınırı varsayımı": "Assumed standard property limit",
  "Son gözlenen kalan gösteriliyor; kota penceresi güncelliği doğrulanamadı. Yeni rapor yanıtı gelene kadar güncel kapasite bilinmiyor.":
    "Showing the last observed remaining quota; the quota window's freshness could not be verified. Current capacity is unknown until a new report response arrives.",
  "Bir denetim en çok {count} sayfa tarar; gösterilen sayı proje alan adındaki son tamamlanan denetime aittir. Tarih denetimin başlangıcıdır.":
    "An audit crawls up to {count} pages; the displayed count is from the last completed audit of the project domain. The date is the audit's start time.",
  "Proje alan adındaki son tamamlanan denetim":
    "Last completed audit of the project domain",
  "Son denetim girişimi": "Latest audit attempt",
  "Proje alan adındaki son denetim girişimi":
    "Latest audit attempt for the project domain",
  "Son denetim sürüyor. Sayfa sınırı için son tamamlanan denetim ayrı gösterilir.":
    "The latest audit is in progress. The last completed audit is shown separately for the page limit.",
  "Son denetim tamamlanamadı. Son tamamlanan denetimin sayfa sayısı korunur; ayrıntıyı Denetim ekranından kontrol edin.":
    "The latest audit could not complete. The last completed audit's page count is preserved; check the details on the Audit screen.",
  "Rapor dönemi": "Report period",
  "Google'ın tamamlandığını bildirdiği günler kullanıldı. Dönem sonu: {date}. Günler Pasifik saatine göredir.":
    "Used days that Google reported as complete. Period end: {date}. Days follow Pacific time.",
  "Son günler gecikme varsayımıyla dışarıda bırakıldı; Google kesinleşme sınırı bildirmedi. Günler Pasifik saatine göredir.":
    "Recent days were excluded using an assumed delay; Google did not report a data finalization boundary. Days follow Pacific time.",
  "Gösterilen: {shown} / {observed} gözlenen kayıt. Kaynak satır sınırları nedeniyle tüm siteyi temsil etmeyebilir.":
    "Showing {shown} / {observed} observed records. Source row limits mean these may not represent the entire site.",
  "Okunan satırlar: {queries} sorgu, {pages} sayfa, {pairs} sorgu×sayfa. Listelerden türetilen fırsatlar bu kapsamla sınırlıdır.":
    "Rows read: {queries} queries, {pages} pages, {pairs} query×page pairs. Opportunities derived from these lists are limited to this coverage.",
  "Listelenmeyen sorguların tıklama payı: {share}. Gizlenen ve satır sınırı dışında kalan sorgular birlikte hesaplanır.":
    "Click share of unlisted queries: {share}. Hidden queries and queries beyond the row limit are counted together.",
  "Google'ın satır sınırına ulaşıldı; sorgu, sayfa veya sorgu×sayfa listeleri eksik olabilir. Bu listelerden üretilen fırsatlar tam site envanteri değildir.":
    "Google's row limit was reached; query, page, or query×page lists may be incomplete. Opportunities derived from these lists are not a full site inventory.",
  "İlk {count} işin {known} tanesinde kazanç hesaplanabildi; {unknown} tanesinde bilinmiyor. Hesaplanabilen işler için {days} günde en fazla {clicks} ek tıklama (üst sınır).":
    "Gains could be calculated for {known} of the first {count} tasks; they are unknown for {unknown}. For calculable tasks, up to {clicks} additional clicks in {days} days (upper bound).",
  "Okunan sayfalarda eşiği aşan, gösterim alıp hiç tıklanmayan sayfa bulunmadı.":
    "No pages in the data read exceeded the threshold for impressions without clicks.",
  "Önceki tıklama": "Previous clicks",
  "Şimdiki tıklama": "Current clicks",
  "Okunan sorgularda bu koşulu sağlayan kayıt bulunmadı.":
    "No queries in the data read met this condition.",
  "Önceki dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Yeni sorgu sayısı bu veriden belirlenemez.":
    "The previous period comparison is unavailable or row coverage is incomplete. The number of new queries cannot be determined from this data.",
  "Dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Kaybolan sorgu sayısı bu veriden belirlenemez.":
    "The period comparison is unavailable or row coverage is incomplete. The number of lost queries cannot be determined from this data.",
  "Uzun dönem karşılaştırması alınamadı. Yeterli geçmiş olmayabilir veya kaynak isteği başarısız olmuş olabilir; geçmiş veriyi kontrol edip raporu yeniden hazırlayın.":
    "Could not retrieve the long-term comparison. There may be insufficient history or a failed source request; check historical data and generate the report again.",
  "Çakışma analizi alınamadı. Diğer bölümler kullanılabilir; Arama performansında çakışmaları kontrol edip raporu yeniden hazırlayın.":
    "Could not retrieve overlap analysis. Other sections are available; check overlaps in Search performance and generate the report again.",
  "Çakışma dönemi: {start} – {end}. İncelenen: {count} sorgu. Eşik: sorguda 100 gösterim; sayfada 10 gösterim ve yüzde 20 pay. Bu dönem ana rapordan farklı olabilir.":
    "Overlap period: {start} – {end}. Analyzed: {count} queries. Thresholds: 100 impressions per query; 10 impressions and a 20 percent share per page. This period may differ from the main report.",
  "Kaynak satır sınırına ulaştı. Okunmayan sorgularda başka çok sayfalı sonuçlar olabilir.":
    "The source row limit was reached. Unread queries may contain other results with multiple pages.",
  "Sonuçlar yalnızca okunan ve eşikleri geçen sorguları kapsar.":
    "Results cover only the queries read that exceeded the thresholds.",
  "Okunan sorgularda eşiği aşan çok sayfalı sonuç bulunmadı.":
    "No queries in the data read exceeded the thresholds for results with multiple pages.",
  "Diğer sayfa sayısı": "Number of other pages",
  "Bölünen gösterim payı": "Split impression share",
  "Bir sorguda birden çok sayfanın görünmesi kayıp tıklama veya SEO zararı kanıtı değildir. Sayfaların aynı ihtiyacı karşılayıp karşılamadığını inceleyin.":
    "Multiple pages appearing for a query do not prove lost clicks or SEO harm. Review whether the pages serve the same need.",
  "Kaynak satır sınırına ulaştı; dağılım eksik olabilir.":
    "The source row limit was reached; the distribution may be incomplete.",
  "Özel sonuç görünümü verisi alınamadı veya kayıt dönmedi. Kaynak bu iki durumu ayırmadığı için yokluk sonucu çıkarılamaz; Arama performansını kontrol edin.":
    "Special search appearance data could not be retrieved or returned no records. The source does not distinguish these cases, so absence cannot be established; check Search performance.",
  "Okunan görünüm tablosunda bu döneme ait kayıt bulunmadı.":
    "No records for this period were found in the appearance table read.",
  "Kaydedilmiş belge": "Saved document",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Başlık dili değiştiğinde ayrı bir belge oluşabilir.":
    "Data was read again from the server when preparing this report; Google may revise historical values. The same period label does not guarantee identical measurements to a previous screenshot. Changing the title language may create a separate document.",
  "Sorgu tabloları gizlilik nedeniyle gizlenen satırları içermez. Satır sınırı varsa listelenmeyen pay, sınır dışında kalan sorguları da içerir.":
    "Query tables exclude rows hidden for privacy. When a row limit applies, the unlisted share also includes queries beyond that limit.",
  "Arama görünümünün istek bütçesi: {count}. Ek çakışma analizi dahil değildir; önbellek kullanımı gerçek ağ isteği sayısını değiştirir.":
    "Request budget for the search view: {count}. Additional overlap analysis is excluded; caching changes the actual number of network requests.",
  Özet: "Summary",
};
