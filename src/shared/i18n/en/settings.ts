import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/client/features/settings, support, ai-mcp, quotas.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enSettings: Catalog = {
  "Geri döndüğünüzde kaçırdığınız bir veya iki bildirim ayrı ayrı, üç veya daha fazlası özet olarak gösterilir.":
    "When you return, one or two missed notifications appear individually; three or more appear as a summary.",
  "Siz yokken {count} bildirim geldi": {
    one: "{count} notification arrived while you were away",
    other: "{count} notifications arrived while you were away",
  },
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli.":
    "Could not reach the release source: the repository was not found or is private.",
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli (GitHub 404). Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Could not reach the release source: the repository was not found or is private (GitHub 404). Download the diagnostics bundle from the Help screen and report the problem.",
  "Her sürümde nelerin eklendiğini ve düzeltildiğini burada bulabilirsiniz.":
    "See what was added and fixed in each release.",
  Yenilik: "Feature",
  Güvenlik: "Security",
  Düzeltme: "Fix",
  "Acil düzeltme": "Hotfix",
  "Windows açılınca başlat": "Start with Windows",
  "Windows ayarı kaydedildi": "Windows preference saved",
  "Bu tercihler Windows uygulamasına kaydedilir ve tepsi menüsüyle aynı ayarları kullanır.":
    "These preferences are saved in the Windows app and shared with the tray menu.",
  "Windows ayarları okunuyor…": "Reading Windows preferences…",
  "Bu seçenekler Windows paketinde kullanılabilir. Docker veya geliştirici kurulumunda başlangıç davranışını işletim sisteminizden yönetin.":
    "These options are available in the Windows app. For Docker or development installations, manage startup through your operating system.",
  "Bu Windows başlatıcısı uygulama içinden ayar değiştirmeyi desteklemiyor. Windows paketini güncelleyin; bu sırada tepsi menüsündeki seçenekleri kullanabilirsiniz.":
    "This Windows launcher does not support changing preferences from the app. Update the Windows package; until then, use the tray menu options.",
  "Windows ayarlarına ulaşılamadı. Tepsi uygulamasının açık olduğunu kontrol edip yeniden deneyin.":
    "Windows preferences are unavailable. Check that the tray app is running and try again.",
  "Windows oturumu açıldığında arka planda başlar. Kapalıyken uygulamayı kendiniz açarsınız.":
    "Starts in the background when you sign in to Windows. When off, you open the app yourself.",
  "Bu ayar yönetici tarafından tüm kullanıcılar için açılmış. Yalnızca yönetici kapatabilir.":
    "An administrator enabled this for all users. Only an administrator can turn it off.",
  "Otomatik güncelleme kurulumu": "Install updates automatically",
  "Yeni sürümü indirir, doğrular ve kurar. Kapalıyken tepsi menüsünden Güncelle seçeneğiyle kurabilirsiniz.":
    "Downloads, verifies and installs new releases. When off, use Update in the tray menu to install them.",
  "Tüm kullanıcılar için kurulumda güncellemeyi yönetici kurar. Uygulama yeni sürümü haber verir.":
    "For all-user installations, an administrator installs updates. The app notifies you of new releases.",
  "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için tepsi menüsünden Çıkış deyin. Bilgisayar uyurken denetimler çalışmaz.":
    "Closing the browser tab does not stop the app. To close it completely, choose Exit in the tray menu. Audits do not run while the computer is asleep.",
  // settings/ThemeSection.tsx
  Görünüm: "Appearance",
  "Varsayılan koyu tema seowatcher.io ile aynı görünür. Sistem, işletim sisteminizin tercihini izler. Seçim bu tarayıcıda saklanır.":
    "The default dark theme matches seowatcher.io. System follows your operating system's preference. Your choice is saved in this browser.",
  Tema: "Theme",
  "Tema tercihi": "Theme preference",
  Sistem: "System",
  Açık: "Light",
  Koyu: "Dark",
  Dil: "Language",

  // settings/SettingsIndex.tsx
  "Ayar bölümleri": "Settings sections",
  Google: "Google",
  "Hizmet hesabı": "Service account",
  "Hız ölçümü": "Speed tests",
  Sınırlar: "Limits",
  Hakkında: "About",
  "Sürüm notları": "Release notes",
  // settings/sectionStatus.ts
  Kayıtlı: "Saved",
  "Kurulum dosyasından geliyor": "From the setup file",
  Eksik: "Missing",
  Kullanılmıyor: "Not used",
  "Şu an kullanılan: hizmet hesabı": "In use: service account",
  "Şu an kullanılan: Google erişim anahtarı": "In use: Google access key",
  "Şu an kullanılmıyor (hizmet hesabı öncelikli): Google erişim anahtarı":
    "Not in use (the service account takes precedence): Google access key",
  "Şu an kullanılmıyor (Google erişim anahtarı öncelikli): hizmet hesabı":
    "Not in use (the Google access key takes precedence): service account",
  "Anahtar kayıtlı": "Key saved",
  "Anahtar eksik": "Key missing",
  "Yeni sürüm {version}": "New version {version}",
  "Kontrol kapalı": "Checks off",
  Güncel: "Up to date",
  Ulaşılamadı: "Unreachable",
  Denetlenmedi: "Not checked",
  Okunamadı: "Unreadable",
  // settings/googleClientId.ts
  "Kimlikte boşluk olamaz.": "The client ID can't contain spaces.",
  "Kimlik {suffix} ile bitmeli. Gizli anahtarı değil, OAuth client ID'yi yapıştırın.":
    "The client ID must end in {suffix}. Paste the OAuth client ID, not the client secret.",
  // settings/PageSpeedKeyTest.tsx
  "Anahtarı test et": "Test key",

  // settings/GoogleOAuthClientSection.tsx
  "Google erişim anahtarı kaydedildi": "Google access key saved",
  "Google erişim anahtarı kaydedilemedi. Değerleri kontrol edip tekrar deneyin.":
    "Couldn't save the Google access key. Check the values and try again.",
  "Google erişim anahtarı silindi": "Google access key deleted",
  "Google erişim anahtarı silinemedi. Tekrar deneyin.":
    "Couldn't delete the Google access key. Try again.",
  "Google bağlantısı": "Google connection",
  "Uygulama Google'a sizin adınıza bağlanır. Bunun için Google'dan aldığınız erişim anahtarını (OAuth client ID) buraya girin. Gizli kısmı şifrelenir ve bir daha tarayıcıya gönderilmez. Search Console ve Analytics aynı anahtarı kullanır.":
    "The app connects to Google on your behalf. To do that, enter the access key (OAuth client ID) you got from Google here. The secret part is encrypted and never sent back to the browser. Search Console and Analytics use the same key.",
  "{console}'da bir OAuth client oluşturun (tür: {type}).":
    "Create an OAuth client in {console} (type: {type}).",
  "Şu iki adresi {field} alanına ekleyin.":
    "Add these two addresses under {field}.",
  "Adresler harfi harfine aynı olmalı, aksi halde Google {code} hatası verir. İkisini de ekleyin: biri Search Console, biri Analytics için.":
    "The addresses must match exactly, or Google returns a {code} error. Add both: one is for Search Console, the other for Analytics.",
  "{service} yönlendirme adresi kopyalandı": "{service} redirect URI copied",
  "Kimliği ve gizli anahtarı aşağıya yazın.":
    "Enter the client ID and client secret below.",
  "Google erişim anahtarının durumu okunamadı.":
    "Couldn't read the Google access key status.",
  "Tekrar dene": "Try again",
  "Ortam değişkenlerinden geliyor": "Coming from environment variables",
  "{id} ve {secret} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{id} and {secret} are set. If you save a value here, it is used instead.",
  Değiştir: "Change",
  Sil: "Delete",
  "İstemci kimliği": "Client ID",
  "Google Cloud Console'da APIs & Services → Credentials listesinde, OAuth 2.0 Client IDs altında görünür. {suffix} ile biter, gizli değildir.":
    "In Google Cloud Console, under APIs & Services → Credentials, in the OAuth 2.0 Client IDs list. It ends in {suffix} and is not secret.",
  "Gizli anahtar": "Client secret",
  "Aynı OAuth client'ı açınca sağdaki panelde. Google bunu yalnızca oluşturduğunuz anda tam gösterir. Kaçırdıysanız yeni bir gizli anahtar üretin. Burada sunucuda şifrelenir, bir daha tarayıcıya gönderilmez.":
    "In the panel on the right when you open the same OAuth client. Google shows it in full only at the moment you create it; if you missed it, add a new secret. Here it is encrypted on the server and never sent back to the browser.",
  Kaydet: "Save",
  Vazgeç: "Cancel",
  "Google erişim anahtarı silinsin mi?": "Delete the Google access key?",
  "Kimlik ve gizli anahtar bu kurulumdan silinir. Mevcut Search Console ve Analytics bağlantıları yerinde kalır ama anahtar yeniden girilene kadar çalışmaz.":
    "The client ID and secret are removed from this install. Existing Search Console and Analytics connections stay in place but stop working until the key is entered again.",
  "Anahtarı sil": "Delete key",
  // settings/GoogleServiceAccountSection.tsx
  "Hizmet hesabı kaydedildi": "Service account saved",
  "Hizmet hesabı kaydedilemedi. Tekrar deneyin.":
    "Couldn't save the service account. Try again.",
  "Hizmet hesabı bu kurulumdan silindi. Anahtarı gerçekten iptal etmek için Google Cloud'dan da silin.":
    "The service account was removed from this install. To actually revoke the key, delete it in Google Cloud too.",
  "Hizmet hesabı silinemedi. Tekrar deneyin.":
    "Couldn't delete the service account. Try again.",
  "Hizmet hesabı (daha kısa yol)": "Service account (the shorter way)",

  "Hizmet hesapları": "Service accounts",
  "Hizmet hesabı durumu okunamadı.":
    "Couldn't read the service account status.",
  "Bu adresi Search Console'da {path} ile mülkünüze ekleyin (yetki: {level}). Eklemeden veri gelmez. Analytics için de GA4 mülkünde {gaPath}'ne aynı adresi Görüntüleyici olarak ekleyin.":
    "In Search Console, add this address to your property under {path} (permission: {level}). No data arrives until you do. For Analytics, also add the same address as a Viewer in the GA4 property under {gaPath}.",
  "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle":
    "Settings → Users and permissions → Add user",
  Tam: "Full",
  "Yönetici → Erişim yönetimi": "Admin → Access management",
  "Hizmet hesabı adresi kopyalandı": "Service account address copied",
  "Hizmet hesabı dosyası (JSON)": "Service account key file (JSON)",
  "Anahtar sunucuda şifrelenir ve bir daha tarayıcıya gönderilmez.":
    "The key is encrypted on the server and never sent back to the browser.",
  "Hizmet hesabı silinsin mi?": "Delete the service account?",
  "JSON anahtarı bu kurulumdan silinir ve Search Console ile Analytics bu hesapla veri çekemez. Anahtarı Google tarafında da iptal etmek için Google Cloud'dan silmeniz gerekir.":
    "The JSON key is removed from this install, and Search Console and Analytics can no longer fetch data with this account. To revoke the key at Google as well, delete it in Google Cloud.",
  "Hesabı sil": "Delete account",
  // settings/PageSpeedKeySection.tsx
  "PageSpeed anahtarı kaydedildi": "PageSpeed key saved",
  "PageSpeed anahtarı kaydedilemedi. Anahtarı kontrol edip tekrar deneyin.":
    "Couldn't save the PageSpeed key. Check the key and try again.",
  "PageSpeed anahtarı silindi": "PageSpeed key deleted",
  "PageSpeed anahtarı silinemedi. Tekrar deneyin.":
    "Couldn't delete the PageSpeed key. Try again.",

  "Anahtar durumu okunamadı.": "Couldn't read the key status.",
  "Ortam değişkeninden geliyor": "Coming from an environment variable",
  "{name} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{name} is set. If you save a value here, it is used instead.",
  "API anahtarı": "API key",
  "Google Cloud Console → Credentials → Create credentials → API key. Önce aynı projede PageSpeed Insights API'sini etkinleştirin, yoksa anahtar 403 hatası verir.":
    "Google Cloud Console → Credentials → Create credentials → API key. Enable the PageSpeed Insights API in the same project first, or the key returns a 403 error.",
  "PageSpeed anahtarı silinsin mi?": "Delete the PageSpeed key?",

  // settings/UpdateSection.tsx

  "GitHub'a ulaşılamadı; son bilinen sürüm {version}":
    "Couldn't reach GitHub; the last known version is {version}",
  "En güncel sürümü kullanıyorsunuz": "You're on the latest version",
  "Güncelleme kontrol edilemedi. Birazdan tekrar deneyin.":
    "Couldn't check for updates. Try again in a moment.",
  "Güncelleme kontrolü açıldı": "Update checks turned on",
  "Güncelleme kontrolü kapatıldı": "Update checks turned off",
  "Ayar kaydedilemedi. Tekrar deneyin.":
    "Couldn't save the setting. Try again.",
  "Uygulama yeni sürümü fark eder ve ne yapacağınızı söyler. Windows paketi güncellemeyi kendisi kurar, Docker'da verilen komutu siz çalıştırırsınız. Docker'da kontrolü kapatırsanız GitHub'a istek gitmez. Windows paketinde görev çubuğu uygulaması günde bir kez GitHub'a bakar. Kendiliğinden kurup kurmayacağını menüdeki {option} seçeneği belirler.":
    "The app notices a new version and tells you what to do. The Windows package installs the update itself; on Docker you run the command shown. On Docker, turning checks off means no request goes to GitHub. In the Windows package the taskbar app checks GitHub once a day, and the {option} option in its menu decides whether it installs on its own.",
  // The tray menu is Turkish only, so its items keep their Turkish name.
  "Güncellemeleri kendiliğinden kur": "Install updates automatically",
  Sürüm: "Version",
  "Site ve kılavuz": "Website and guide",
  "{version} yayımlandı.": "{version} is out.",
  Değişiklikler: "What's changed",
  "Windows paketi güncellemeyi kendisi kurar: görev çubuğundaki seowatcher simgesi yeni sürümü indirir, doğrular ve sessizce kurar. Kendiliğinden kurmayı istemiyorsanız simgeye sağ tıklayıp {option} işaretini kaldırın; o zaman yeni sürüm hazır olunca menüde {item} maddesi çıkar, tıklayınca kurulur. Verileriniz ve Google bağlantınız olduğu gibi kalır.":
    "The Windows package installs the update itself: the seowatcher icon on the taskbar downloads the new version, verifies it and installs it quietly. If you'd rather it didn't, right-click the icon and clear {option}; then, when a new version is ready, a {item} item appears in the menu and installs it when clicked. Your data and Google connection stay as they are.",
  "Güncelle: sürüm hazır": "Güncelle: sürüm hazır (Update: version ready)",
  "Güncelleme komutu kopyalandı": "Update command copied",
  "Proje klasöründe çalıştırın. Verileriniz Docker biriminde ({volume}) kalır, güncelleme onu silmez.":
    "Run it in the project folder. Your data stays in the Docker volume ({volume}); updating does not delete it.",
  "En güncel sürümü kullanıyorsunuz.": "You're on the latest version.",

  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version} (son başarılı kontrol: {date}); güncel olup olmadığı doğrulanamadı.":
    "The last check failed: GitHub couldn't be reached. The last known version is {version} (last successful check: {date}), so it couldn't be confirmed whether you're up to date.",
  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version}; güncel olup olmadığı doğrulanamadı.":
    "The last check failed: GitHub couldn't be reached. The last known version is {version}, so it couldn't be confirmed whether you're up to date.",
  "Son kontrolde GitHub'a ulaşılamadı.":
    "GitHub couldn't be reached on the last check.",

  "Şimdi kontrol et": "Check now",
  "Kontrol açıkken uygulama, bir sekmede açık olduğu sürece en çok altı saatte bir GitHub'a bağlanıp en son sürümü sorar. GitHub bu istekte yalnızca genel IP adresinizi, uygulama adını ve sürümü görür; siteleriniz, Google hesabınız ya da denetimleriniz gönderilmez.":
    "With checks on, the app asks GitHub for the latest version at most every six hours while it is open in a browser tab. GitHub sees only your public IP address, the app name and its version; your sites, Google account and audits are never sent.",
  "Son kontrol: {date}.": "Last checked: {date}.",
  // settings/WhatsNewSection.tsx
  "Kurulu sürüm": "Installed version",
  "Komutu kopyala": "Copy command",
  "Komut kopyalandı": "Command copied",
  // support/checkCopy.ts (tray menu items are Turkish only, so they keep their Turkish name)
  "Görev çubuğu menüsünden Günlükleri aç deyip server.log dosyasına bakın; düzelmezse Kurulumu onar.":
    "In the taskbar menu, click Günlükleri aç (Open logs) and check server.log; if that doesn't help, use Kurulumu onar (Repair installation).",
  "Ayrıntı için docker compose logs --tail 50 çıktısına bakın.":
    "For details, check the output of docker compose logs --tail 50.",
  "Search Console ve Analytics kapalı. Uygulamanın şifreleme anahtarı (veri klasöründeki instance-secret dosyası) eksik ya da bozuk. Görev çubuğu menüsünden Kurulumu onar deyin.":
    "Search Console and Analytics are off. The app's encryption key (the instance-secret file in the data folder) is missing or damaged. In the taskbar menu, click Kurulumu onar (Repair installation).",
  "Search Console ve Analytics kapalı. Google bağlantılarını şifreleyen gizli kurulum anahtarı (BETTER_AUTH_SECRET) eksik ya da çok kısa. Uygulama bu anahtarı kendisi üretir; elle kısa bir değer girdiyseniz silin.":
    "Search Console and Analytics are off. The secret install key that encrypts the Google connections (BETTER_AUTH_SECRET) is missing or too short. The app generates this key itself; if you entered a short value by hand, remove it.",
  "GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET'ten yalnızca biri tanımlı. İkisi de gerekir. Ya da ikisini de boş bırakıp Google erişim anahtarını Ayarlar'dan girin.":
    "Only one of GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET is set. Both are needed. Or leave both empty and enter the Google access key in Settings.",
  "Google erişim anahtarı ya da hizmet hesabı henüz girilmedi. Girmeden Search Console ve Analytics bağlanamaz.":
    "No Google access key or service account has been entered yet. Search Console and Analytics can't connect without one.",
  "Google erişim anahtarı ortam değişkenlerinden geliyor.":
    "The Google access key comes from environment variables.",

  "Google erişimi hazır.": "Google access is ready.",
  "PageSpeed anahtarı kontrol edilemedi. {logs}":
    "Couldn't check the PageSpeed key. {logs}",
  "Anahtar yok. Hız ölçümü Google'ın anahtarsız kotasıyla çalışır ve çoğu zaman 429 ile yarım kalır. Tarama ve diğer SEO kontrolleri etkilenmez.":
    "No key. Speed measurement runs on Google's keyless quota and often stops partway with a 429. Crawling and the other SEO checks are not affected.",
  "PageSpeed anahtarı ortam değişkeninden geliyor.":
    "The PageSpeed key comes from an environment variable.",
  "PageSpeed anahtarı Ayarlar'da kayıtlı.":
    "The PageSpeed key is saved in Settings.",
  "Giriş koruması ayarlı.": "Sign-in protection is set up.",
  "Bu kurulum parolasız ama dışarıdan erişime açık görünüyor; açan herkes yönetici olur. Önüne kendi giriş korumanızı koyun ya da uygulamayı yalnızca bu bilgisayara (127.0.0.1) açık tutun.":
    "This install has no password but looks reachable from outside; anyone who opens it is an admin. Put your own sign-in protection in front of it, or keep the app open to this computer only (127.0.0.1).",
  "Giriş ayarı eksik ya da geçersiz. Görev çubuğu menüsünden Kurulumu onar deyin; düzelmezse Sorunu bildir.":
    "The sign-in setting is missing or invalid. In the taskbar menu, click Kurulumu onar (Repair installation); if that doesn't help, use Sorunu bildir (Report a problem).",
  "Giriş ayarı eksik ya da geçersiz. AUTH_MODE, TEAM_DOMAIN ve POLICY_AUD değerlerini docs/ENVIRONMENT.md'ye göre kontrol edin.":
    "The sign-in setting is missing or invalid. Check AUTH_MODE, TEAM_DOMAIN and POLICY_AUD against docs/ENVIRONMENT.md.",
  "Yerel veritabanı yanıt veriyor.": "The local database is responding.",
  "Veritabanı yanıt vermiyor. {logs}": "The database is not responding. {logs}",
  "Çalışma ortamı hazır.": "The runtime is ready.",
  "Çalışma ortamında bir sorun var. {logs}":
    "Something is wrong with the runtime. {logs}",
  // support/SetupStatusPanel.tsx
  "Giriş ve erişim": "Sign-in and access",
  "Google girişi": "Google sign-in",
  "Ayarları aç": "Open Settings",
  "PageSpeed anahtarı": "PageSpeed key",
  "Anahtar gir": "Enter key",
  "Çalışma ortamı": "Runtime",
  Veritabanı: "Database",
  "Sorun yok": "OK",
  Dikkat: "Attention",
  Hata: "Error",
  "Kurulum durumu okunamadı": "Couldn't read the setup status",
  "Port: {actual} (ayarlanan: {configured})":
    "Port: {actual} (configured: {configured})",
  "seowatcher bu sefer {actual} numarasında çalışıyor çünkü {configured} başka bir program tarafından kullanılıyor (ör. eski bir Docker kopyası). Google bağlantısı {configured} için ayarlandı; o programı kapatıp seowatcher'ı yeniden başlatın.":
    "seowatcher is running on {actual} this time because another program is using {configured} (for example an old Docker copy). Google sign-in is set up for {configured}; close that program and restart seowatcher.",
  "Sürümünüz v{version}.": "You're on v{version}.",
  "Yeni sürüm {version} çıktı": "Version {version} is out",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; son bilinen sürüm {latest}.":
    "You're on v{version}. The update check failed; the last known version is {latest}.",
  "Sürümünüz v{version}, güncel.": "You're on v{version}, the latest.",
  "Sürümünüz v{version}. Güncelleme kontrolü kapalı.":
    "You're on v{version}. Update checks are off.",
  "Kurulumunuzun durumu": "Your setup status",

  "Son kontrol: {date}": "Last checked: {date}",
  "Özeti kopyala": "Copy summary",
  "Özet kopyalandı. İçinde gizli değer yok.":
    "Summary copied. It contains no secrets.",
  Projeler: "Projects",
  "Henüz proje yok. {link}.": "No projects yet. {link}.",
  "Proje ekleyin": "Add a project",
  "Search Console {gsc} · Analytics {ga4}":
    "Search Console {gsc} · Analytics {ga4}",
  bağlı: "connected",
  "bağlı değil": "not connected",
  "Bağlantıları aç": "Open connections",
  // support/CommonProblems.tsx (tray menu items stay Turkish; the English adds their meaning)

  "Sık sorunlar": "Common problems",
  "Sayfa açılmıyor ya da uygulama kapalı":
    "The page won't open, or the app isn't running",
  "Görev çubuğundaki seowatcher simgesine bakın; üzerine gelince {running} yazmalı. Simge yoksa Başlat menüsünden seowatcher'ı açın. Simgede {error} yazıyorsa sağ tıklayıp {restart}, olmazsa {repair} deyin.":
    "Look at the seowatcher icon on the taskbar; hovering over it should show {running} (Running). If there is no icon, open seowatcher from the Start menu. If the icon says {error} (Error), right-click it and choose {restart} (Restart), or if that doesn't help, {repair} (Repair installation).",
  "Hâlâ açılmıyorsa {logs} ile {launcher} ve {server} dosyalarının son satırlarına bakın; {report} bunları hazır bir kayda koyar.":
    "If it still won't open, choose {logs} (Open logs) and check the last lines of {launcher} and {server}; {report} (Report a problem) puts them into a ready-made issue.",
  "Windows kurulum kılavuzu": "Windows installation guide",
  "Bir ayarı değiştirdim, uygulama görmüyor":
    "I changed a setting and the app doesn't see it",
  "Google erişimi, PageSpeed anahtarı ve dil Ayarlar ekranında girilir ve hemen geçerli olur. Windows paketinde .env dosyası ve ortam değişkeni yoktur.":
    "Google access, the PageSpeed key and the language are entered on the Settings screen and apply immediately. The Windows package has no .env file and no environment variables.",
  "Elle değiştirilebilen tek dosya {config}: adres numarası (port) ve kendiliğinden güncelleme. {dataFolder} ile açın, değiştirin, sonra {restart} deyin. Yanındaki {serverEnv} dosyasını düzenlemeyin; uygulama her açılışta onu yeniden yazar.":
    "The only file you edit by hand is {config}: the port and automatic updates. Open it with {dataFolder} (Open data folder), change it, then choose {restart} (Restart). Don't edit the {serverEnv} file next to it; the app rewrites it at every start.",
  "Ayarlar ekranında girilenler hemen geçerli olur. {env} dosyasındaki değişkenler (örneğin {port}, {host}, {token}) ise yalnızca konteyner yeniden oluşturulunca okunur: {command}":
    "What you enter on the Settings screen applies immediately. Variables in the {env} file (for example {port}, {host}, {token}) are read only when the container is recreated: {command}",
  "Yalnızca yeniden başlatmak için: {command} Bu, .env değişikliğini uygulamaz. {docs}":
    "To restart only: {command} This does not apply a .env change. {docs}",
  "Ortam değişkenleri": "Environment variables",
  "Sayfa açılmıyor ya da Docker kapalı":
    "The page won't open, or Docker isn't running",
  "Önce Docker Desktop'ın çalıştığına bakın; Windows'ta tepsideki simge \"running\" demeli. Sonra durumu görün: {command} Durum {healthy} olana kadar bekleyin; ilk açılış birkaç dakika sürebilir.":
    'First check that Docker Desktop is running; on Windows its tray icon should say "running". Then check the status: {command} Wait until the status is {healthy}; the first start can take a few minutes.',
  "Hâlâ açılmıyorsa son günlük satırları nedeni yazar: {command}":
    "If it still won't open, the last log lines give the reason: {command}",
  "Docker kurulum belgesi": "Docker installation guide",
  "Adres numarası (port) dolu": "The port is in use",
  "Adres numarası (port) dolu (Bind for 127.0.0.1:3001 failed)":
    "The port is in use (Bind for 127.0.0.1:3001 failed)",
  "Windows paketi 3001 doluysa o açılış için 3002 ile 3010 arasında boş bir numara kullanır; bunu bir bildirimle ve simgenin yazısında söyler. Numarayı kalıcı yapmak istiyorsanız {dataFolder} deyip {config} içindeki {port} değerini değiştirin, sonra {restart} deyin.":
    "If 3001 is in use, the Windows package picks a free port between 3002 and 3010 for that start and says so in a notification and in the icon's text. To make the port permanent, choose {dataFolder} (Open data folder), change the {port} value in {config}, then choose {restart} (Restart).",
  "3001 numaralı adresi (port) başka bir program kullanıyor. Proje klasöründe {line} satırı olan bir {env} dosyası oluşturup konteyneri yeniden oluşturun: {command}":
    "Another program is using port 3001. In the project folder, create a {env} file with the line {line}, then recreate the container: {command}",
  "Adres numarası (port) değişince Google'a verdiğiniz yönlendirme adresleri de değişir. Yenilerini {link} kopyalayıp Google Cloud Console'da güncelleyin.":
    "When the port changes, so do the redirect URIs you gave Google. Copy the new ones from {link} and update them in Google Cloud Console.",
  "Ayarlar'daki Google bölümünden": "the Google section in Settings",
  "Ajanım bağlanamıyor (401)": "My agent can't connect (401)",
  "Ajan bağlantısı bir parola (token) ister. Windows paketinde bu parola {path} dosyasındadır ({dataFolder}). Panoya kopyalamak için PowerShell (değer ekrana yazılmaz): {command} Değeri sohbete yazmayın; yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "The agent connection asks for a password (token). In the Windows package it is in the file {path} ({dataFolder}, Open data folder). To copy it to the clipboard with PowerShell (the value is not shown on screen): {command} Don't type the value into a chat; clear the clipboard after pasting it (Win+V, Clear all).",
  "Ajan bağlantısı varsayılan olarak bir parola ister. Parola ilk açılışta üretilir ve veri biriminde durur; okumak için (PowerShell ve cmd): {command}":
    "By default the agent connection asks for a password. It is generated on first start and kept in the data volume; to read it (PowerShell and cmd): {command}",
  "Git Bash (Windows): {command} Önek olmadan Git Bash yolu bozar ve parola boş çıkar; PowerShell'de önek hata verir.":
    "Git Bash (Windows): {command} Without the prefix, Git Bash mangles the path and the password comes out empty; in PowerShell the prefix causes an error.",
  "Adres: {command} Aracınız {header} başlığını göndermezse bağlantı 401 döner.":
    "Address: {command} If your tool doesn't send the {header} header, the connection returns 401.",
  "{link} aracınız için hazır komutu verir. {details}":
    "{link} gives you a ready-made command for your tool. {details}",
  "Ajan kurulumu sayfası": "The Agent setup page",
  Ayrıntılar: "Details",
  "Hız ölçümü yarım kalıyor (429)": "Speed measurement stops partway (429)",
  "{code} genellikle anahtar girilmediğini gösterir: Google'ın anahtarsız kotası birkaç sayfada dolar. Ücretsiz bir anahtar girin: {link}.":
    "{code} usually means no key has been entered: Google's keyless quota runs out within a few pages. Enter a free key: {link}.",
  '429 / "çok fazla istek"': '429 / "too many requests"',
  "Ayarlar, Hız ölçümü": "Settings, Speed tests",
  "Anahtar varken de olabilir: dakikalık sınır aşılırsa denetim bekleyip yeniden dener. {daily} dolarsa ölçülenler korunur ve ölçüm durur; ertesi gün yeniden denetleyin. Kendi kotanızı Google Cloud Console'da APIs & Services, PageSpeed Insights API, Quotas altında görebilirsiniz.":
    "It can happen with a key too: if the per-minute limit is exceeded, the audit waits and tries again. If the {daily} runs out, what was already measured is kept and measuring stops; run the audit again the next day. You can see your own quota in Google Cloud Console under APIs & Services, PageSpeed Insights API, Quotas.",
  "Günlük sınır": "daily limit",
  "PageSpeed anahtarı belgesi": "PageSpeed key guide",
  "Sorgu verisi yok, grafikler boş": "No query data, empty charts",
  "Önce projede Search Console'un bağlı olduğunu ve bir mülk seçildiğini doğrulayın. Hizmet hesabı kullanıyorsanız hesabın e-postasını Search Console'da mülke kullanıcı olarak eklemiş olmanız gerekir; eklemeden veri gelmez.":
    "First make sure Search Console is connected in the project and a property is selected. If you use a service account, its email address must be added as a user on the property in Search Console; no data arrives until it is.",
  "Mülk yeni doğrulandıysa Google'ın veri vermesi birkaç gün sürebilir.":
    "If the property was verified recently, Google can take a few days to provide data.",
  "Projenin bağlantılarını aç": "Open the project's connections",
  "Projelere git": "Go to projects",
  "Search Console belgesi": "Search Console guide",
  // support/DiagnosticsBundleButton.tsx
  "seowatcher-tanilama-{date}.zip": "seowatcher-diagnostics-{date}.zip",
  "Tanılama paketi indirildi": "Diagnostics bundle downloaded",
  "Paket oluşturulamadı": "Couldn't create the bundle",
  "Tanılama paketi indir": "Download diagnostics bundle",
  "seowatcher tanılama paketi\nOluşturulma: {generatedAt}\n\nİçindekiler\n  summary.txt        Tek sayfalık özet.\n  diagnostics.json   Sürüm, kurulum kontrolleri, tablo satır sayıları,\n                     projeler, bağlı Google mülkleri ve son 25 denetim.\n  client-log.json    Bu sekmede yakalanan tarayıcı hataları.\n  browser.json       Tarayıcı ve ekran bilgisi.\n\nİçinde OLMAYAN şeyler\n  Gizli değer yok: Google erişim ve yenileme anahtarları, Google erişim\n  anahtarının gizli kısmı, PageSpeed API anahtarı, ajan parolası (MCP token)\n  ve oturum çerezleri toplanmaz. Yalnızca her birinin ayarlı olup olmadığı yazar.\n  Taranan sayfaların içeriği de yok, yalnızca sayıları var.\n\nİçinde OLAN, sizi tanımlayan şeyler\n  Proje adlarınız, alan adlarınız, bağlı Search Console mülkünüz ve GA4\n  mülk kimliğiniz. Bunlar olmadan bir sorun teşhis edilemez. Göndermeden\n  önce dosyaları açıp okuyun; karar sizin.\n":
    "seowatcher diagnostics bundle\nCreated: {generatedAt}\n\nContents\n  summary.txt        A one-page summary.\n  diagnostics.json   Version, setup checks, table row counts,\n                     projects, connected Google properties and the last 25 audits.\n  client-log.json    Browser errors caught in this tab.\n  browser.json       Browser and screen details.\n\nWhat is NOT inside\n  No secrets: Google access and refresh tokens, the Google access key's\n  secret, the PageSpeed API key, the agent password (MCP token) and\n  session cookies are not collected. Only whether each one is set is noted.\n  The content of crawled pages is not included either, only their counts.\n\nWhat IS inside and identifies you\n  Your project names, domains, connected Search Console property and GA4\n  property ID. A problem can't be diagnosed without them. Open and read the\n  files before you send them; the decision is yours.\n",
  "{pages} sayfa  {issues} bulgu": "{pages} pages  {issues} issues",
  "Oluşturulma: {date}": "Created: {date}",
  "Kurulum kontrolleri": "Setup checks",
  "hepsi ok": "all ok",
  Tablolar: "Tables",
  "Projeler: {n}": "Projects: {n}",
  "Search Console bağlantısı: {n}": "Search Console connections: {n}",
  "Analytics bağlantısı: {n}": "Analytics connections: {n}",
  "Son denetimler": "Recent audits",
  yok: "none",
  "Tarayıcıda yakalanan hata: {n}": "Errors caught in the browser: {n}",
  // support/QuickActions.tsx
  "Hızlı işlemler": "Quick actions",
  "Durumu yeniden kontrol et": "Check status again",
  "Kılavuzu aç": "Open the guide",
  "(yeni sekmede açılır)": "(opens in a new tab)",
  "Ajan kurulumu": "Agent setup",
  // ai-mcp/SetupCards.tsx, InstallPromptButton.tsx
  "Becerileri /seo-audit diye çağırırsınız.": "You call skills as /seo-audit.",
  "Komut, Codex'in kendi bağlama adımlarını kullanır. Becerileri $seo-audit diye çağırırsınız.":
    "The command uses Codex's own connection steps. You call skills as $seo-audit.",
  Diğer: "Other",
  "Genel komut. Beceriyi aracınızın kendi yöntemiyle çağırın.":
    "A general command. Call the skill the way your tool does.",
  "Ajanınızı bağlayın": "Connect your agent",
  "Uygulama kurulu, Google ve PageSpeed hazırsa yalnızca bu adım yeter.":
    "If the app is installed and Google and PageSpeed are ready, this step is all you need.",
  "Komutu ajanınıza yapıştırın. Ajan seowatcher'ı bağlar, SEO becerilerini kurar, elle yapacağınız adımlarda size yol gösterir.":
    "Paste the command into your agent. It connects seowatcher, installs the SEO skills and guides you through the steps you do by hand.",
  "Hangi ajanı kullanıyorsunuz?": "Which agent do you use?",
  "Ajan bağlantıyı kurar, becerileri kopyalar ve doğrular. Parolayı sohbete yazmaz, bilgisayarınızdan okur.":
    "The agent sets up the connection, copies the skills and verifies them. It reads the password from your computer instead of writing it into the chat.",
  "Kurulum komutunu kopyala": "Copy setup command",
  "Kurulum komutu kopyalandı": "Setup command copied",
  "Bağlandıktan sonra ajanınızdan {skill} becerisini kullanmasını isteyin; sıradaki adımı birlikte seçersiniz.":
    "Once connected, ask your agent to use the {skill} skill; you'll pick the next step together.",
  "Ajanınız seowatcher'a ilk kez istek attığında yukarıdaki durum değişir.":
    "The status above changes the first time your agent sends seowatcher a request.",
  "Claude Code, Codex, Cursor, ChatGPT ve MCP destekleyen diğer uygulamalarla çalışır.":
    "Works with Claude Code, Codex, Cursor, ChatGPT and other apps that support MCP.",
  "İlk kez mi kuruyorsunuz? Buradan başlayın.":
    "Setting up for the first time? Start here.",
  "Sıfırdan kurulum": "Fresh install",
  "Uygulamayı yeni kurduysanız ilk adım bu.":
    "If you just installed the app, this is the first step.",
  "Yeni bir kurulum ya da baştan kontrol için.":
    "For a new install or a full check from the start.",
  "Ajanınız kurulumu, Google bağlantısını, PageSpeed anahtarını ve ilk projenizi sırayla kontrol eder, sonra kendini bağlar. Windows paketini de Docker'ı da tanır. Google Cloud'daki adımları siz yaparsınız. Anahtarlar sohbete değil, yalnızca Ayarlar'a girilir.":
    "Your agent checks the install, the Google connection, the PageSpeed key and your first project in turn, then connects itself. It knows both the Windows package and Docker. You do the Google Cloud steps yourself. Keys are entered only in Settings, never in the chat.",
  "Sıfırdan kurulum komutunu kopyala": "Copy fresh install command",
  // quotas/*
  Yeterli: "Enough left",
  Azalıyor: "Running low",
  "Neredeyse doldu": "Almost used up",
  Bilinmiyor: "Unknown",
  "{count} sorgu": { one: "{count} query", other: "{count} queries" },
  "{count} ölçüm": {
    one: "{count} measurement",
    other: "{count} measurements",
  },
  "{count} puan": { one: "{count} point", other: "{count} points" },
  "{count} sayfa": { one: "{count} page", other: "{count} pages" },
  "{count} rapor": { one: "{count} report", other: "{count} reports" },
  "{count} şablon": { one: "{count} template", other: "{count} templates" },
  "Kalan: {amount}": "Remaining: {amount}",
  "Veri yok": "No data",
  "Sınır: {amount}": "Limit: {amount}",
  "{amount} kaldı": "{amount} left",
  "Durum: {state}": "Status: {state}",
  "Son güncelleme: {date}": "Last updated: {date}",
  "Henüz veri yok": "No data yet",
  "Sabit sınır": "Fixed limit",
  "Kaynak: {source}. {freshness}": "Source: {source}. {freshness}",
  "Kota ve sınırlar": "Quotas and limits",
  "Kota bilgisi yüklenemedi": "Couldn't load quota information",
  "Gösterilecek sınır yok": "No limits to show",
  "Bu bölümde izlenen bir kota yok.": "No quota is tracked in this section.",
  "Google ve sistem sınırları": "Google and system limits",
  "Search Console, GA4 ve PageSpeed'in günlük sınırları, bir de denetim ve rapor üst sınırları. Rakamlar uygulamanın kendi kaydından gelir, Google'a ek istek gitmez. Sınırlar proje başına gösterilir.":
    "The daily limits of Search Console, GA4 and PageSpeed, plus the caps on audits and reports. The figures come from the app's own records, so no extra requests go to Google. Limits are shown per project.",
  "Projeler okunamadı": "Couldn't read projects",
  "Henüz bir proje yok": "No projects yet",
  "Sınırlar proje başına gösterilir. Proje listesi yüklenince burada görünür.":
    "Limits are shown per project. They appear here once the project list loads.",
  "Sınırlar proje başına gösterilir. Bir proje oluşturunca burada görünür.":
    "Limits are shown per project. They appear here once you create a project.",
  "Sınırları göster": "Show limits",
  "Güncel durum": "Current status",

  "Bu ekranın kılavuzunu aç": "Open the guide for this screen",
  Yükleniyor: "Loading",
  "Geçen süre: {duration}": "Elapsed: {duration}",
  "Rapor hazır": "Report ready",
  "Rapor hazırlanıyor…": "Preparing report…",
  "Dizin durumu kontrol ediliyor": "Checking index status",
  "Google'dan yanıt bekleniyor…": "Waiting for Google…",
  "Bildirimler ({count} okunmamış)": "Notifications ({count} unread)",
  Bildirimler: "Notifications",
  "Tümünü okundu işaretle": "Mark all as read",
  "Henüz bildirim yok. İşlemler tamamlandığında burada görünür.":
    "No notifications yet. Completed tasks will appear here.",
  Okunmamış: "Unread",
  "Uygulama açıkken bildirimler kendi popup'ı olarak görünür; sekme arka plandayken zil geçmişinde tutulur. Önemli bildirimlerin sesini buradan açıp kapatabilirsiniz.":
    "When the app is open, alerts appear in its own popups. In a background tab, they stay in the bell history. Turn sounds for important alerts on or off here.",
  "Bildirim sesi": "Notification sound",
  "Sesi dinle": "Preview sound",
  "Uygulama bildirimini dene": "Test in-app notification",
  "Uygulama bildirimi testi": "seowatcher in-app notification test",
  "Bu, uygulama içi bildirim ve ses denemesidir.":
    "This tests the in-app notification and sound.",
  "Yeni sürüm yayımlandı: {version}": "New version released: {version}",
  "Ayarlar'daki Hakkında bölümü nasıl güncelleyeceğinizi söyler.":
    "See Settings → About for update instructions.",
  "{service} bağlantısı yenilenmeli": "Reconnect {service}",
  "Google erişim izni geçersiz ya da geri alınmış. Hesabı yeniden bağlayın.":
    "Google access has expired or been revoked. Reconnect your account.",
  "Denetim bitti: {pages} sayfa, {issues} bulgu":
    "Audit complete: {pages} pages, {issues} findings",
  "Denetim tamamlanamadı": "Audit failed",
  "Kontrol ediliyor…": "Checking…",
  "Rapor kaydedildi ancak indirilemedi. Raporlar ekranından tekrar deneyin.":
    "The report was saved but could not be downloaded. Try again from Reports.",
  Denetim: "Audit",
  "Başarısız denetimler, hangi aşamada durduğunu ve URL/kimlik bilgileri ayıklanmış hata açıklamasını içerir. PageSpeed ölçüm hataları URL'ler çıkarılarak özetlenir.":
    "Failed audits include the phase where they stopped and a redacted error summary. PageSpeed measurement errors are summarized without page URLs.",
  "PageSpeed ölçüm hatası ({count}): {message}":
    "PageSpeed measurement error ({count}): {message}",
  // Notification settings strings used by the 0.7.x settings screen.
  "Bildirim geçmişi zil simgesinde tutulur. Ses ve Windows sistem bildirimlerini buradan açıp kapatabilirsiniz.":
    "Notification history stays under the bell. Turn notification sounds and Windows system notifications on or off here.",
  "Windows ve sistem bildirimleri": "Windows and system notifications",
  "Güncellemeler ve yeni duyurular dahil bildirimler Windows bildirim merkezinde gösterilir.":
    "Notifications, including updates and new announcements, appear in the Windows notification center.",
  "Bildirim izni engellendi. Açmak için tarayıcının site izinlerini kullanın.":
    "Notification permission is blocked. Enable it in your browser’s site permissions.",
  "Bu tarayıcı masaüstü bildirimlerini desteklemiyor.":
    "This browser does not support desktop notifications.",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Kullanılmıyor, hizmet hesabı bağlı":
    "Not used, a service account is connected",
  "Uygulamanın durumu": "App health",
  "Bu kurulumun kendisi. Bir projenin kurulum listesi Panel'de ve Proje bilgisi'nde.":
    "This install itself. A project's setup checklist is on the Dashboard and in Project context.",
  // Translation pass for project, report, saved keyword, settings and help updates.
  "PowerShell: parolayı ekrana yazdırmadan panoya kopyalayın. Yalnızca MCP istemcinizin yerel gizli başlık alanına yapıştırın, ardından panoyu temizleyin. Sohbete yapıştırmayın.":
    "PowerShell: copy the password to the clipboard without displaying it. Paste it only into your MCP client's local secret header field, then clear the clipboard. Do not paste it into chat.",
  "Sınırları gösterilen proje": "Project whose limits are shown",
  "Sınırlar yenilenemedi; son kayıt gösteriliyor":
    "Could not refresh limits; showing the last record",
  "{state} · {count} kaynak bilinmiyor": "{state} · {count} sources unknown",
  "Bilinen sınırlarda sorun yok": "No issues with known limits",
  "Google kimlikleri bu kurulumdaki tüm projelerde kullanılır. Hizmet hesabı kayıtlıysa önceliklidir. Projenizin mülkünü Proje ayarları → Bağlantılar bölümünden seçin.":
    "Google credentials apply to all projects in this installation. A saved service account takes priority. Select your project's property in Project settings → Connections.",
  "Kullanılan kimlik okunamadı. Google kimlik durumunu yeniden yükleyin.":
    "Could not read the credentials in use. Reload Google credential status.",
  "Kimlik kayıt tarihi: {date}": "Credentials saved on: {date}",
  "Google kurulum adımları": "Google setup steps",
  "{service} yönlendirme adresini kopyala": "Copy {service} redirect address",
  "Mülk izinlerini ayarla": "Configure property permissions",
  "JSON dosyası çok büyük. Google Cloud'dan indirdiğiniz hizmet hesabı anahtarını seçin.":
    "The JSON file is too large. Select the service account key you downloaded from Google Cloud.",
  "Dosya okunamadı. Dosyayı yeniden seçin.":
    "Could not read the file. Select it again.",
  "JSON içeriğini gizli yapıştır": "Paste JSON content (hidden)",
  "Hizmet hesabı kurulum adımları": "Service account setup steps",
  "Yukarıdaki Google erişim anahtarı yerine bunu kullanabilirsiniz. Hizmet hesabında izin ekranı, test kullanıcısı ve yönlendirme adresi adımları yok. Google Cloud'da hesabı açıp JSON dosyasını indirin ve burada seçin, sonra hesabın e-posta adresini Search Console'da mülkünüze, bir meslektaşınızı eklermiş gibi kullanıcı olarak ekleyin.":
    "You can use this instead of the Google access key above. A service account does not require consent screen, test user, or redirect address setup. Create the account in Google Cloud, download its JSON file and select it here, then add the account's email address as a user to your Search Console property, as you would a colleague.",
  "Anahtarsız ölçüm sınırlıdır; bu uygulama denetim başına en fazla {count} sayfayı dener. Google daha önce sınır koyabilir. Anahtar başarı garantisi vermez.":
    "Testing without a key is limited; this application tries up to {count} pages per audit. Google may impose a lower limit. A key does not guarantee success.",
  "Anahtar bu kurulumdan silinir; hız ölçümü denetim başına uygulamanın anahtarsız sayfa sınırına döner. Google daha erken sınır koyabilir. İstediğiniz zaman yeniden girebilirsiniz.":
    "The key will be deleted from this installation; speed tests will return to the application's per-audit page limit without a key. Google may impose a lower limit. You can enter a key again at any time.",
  "example.com için 1 mobil istek; denetim ölçüm sayacına eklenmez.":
    "1 mobile request for example.com; not added to the audit measurement counter.",
  "Test tarihi: {date}": "Test date: {date}",
  "Diğer ayar bölümleri için yana kaydırın.":
    "Scroll sideways for other settings sections.",
  "Dili uygula": "Apply language",
  "Arayüz dili bu tarayıcıda saklanır; projenin varsayılan pazar dilini değiştirmez.":
    "The interface language is saved in this browser; it does not change the project's default market language.",
  "GitHub istek sınırı veya erişim kısıtı bildirdi. Bir süre bekleyip tekrar deneyin; Yardım tanılamasını kontrol edin.":
    "GitHub reported a request limit or access restriction. Wait a while and try again; check diagnostics in Help.",
  "GitHub sürüm bilgisi okunamadı. Biraz bekleyip yeniden deneyin; sürerse Yardım ekranından tanılama alın.":
    "Could not read GitHub release information. Wait a moment and try again; if it persists, collect diagnostics from Help.",
  "Uygulama içi sürüm kontrolü kapalı. Windows tepsisi bağımsız olarak günlük sürüm kontrolü yapabilir.":
    "In-app update checks are off. The Windows tray may independently check for updates daily.",
  "Sürüm kontrolü ayarı okunamadı. Son kayıt güncel olmayabilir.":
    "Could not read the update check setting. The last saved record may be out of date.",
  "Son başarılı sürüm kontrolü: {date}": "Last successful update check: {date}",
  "Windows otomatik kurulum ayarları":
    "Windows automatic installation settings",
  "Uygulama içi sürüm kontrolü": "In-app update checks",
  "Açıkken uygulama içi kontrol en çok altı saatte bir GitHub sürüm listesine bakar. Bu tercih Windows tepsisinin günlük kontrolünü ve otomatik kurulum tercihini değiştirmez.":
    "When enabled, the in-app check reads GitHub's release list at most once every six hours. This preference does not change the Windows tray's daily check or automatic installation preference.",
  "Bu pakette sürüm notu bulunmuyor.":
    "This package contains no release notes.",
  "Notlar uygulama paketiyle birlikte gelir. Yayınlanan notları kılavuzdan kontrol edebilirsiniz; bu durum kurulum kontrolü değildir.":
    "Release notes are included in the application package. You can check published notes in the guide; this is not an installation check.",
  "Bu kurulu sürüm için sürüm notu bulunmuyor. Aşağıda bu paketle gelen son notlar var.":
    "No release notes were found for this installed version. The latest notes included in this package are shown below.",
  "Son doğrulanan Windows ayarları gösteriliyor; yeniden okunana kadar değiştirilemez.":
    "Showing the last verified Windows settings; they cannot be changed until reloaded.",
  "Google bağlantı ayarı henüz doğrulanamadı. Okuma tamamlanmazsa durumu yeniden kontrol edin.":
    "The Google connection setting has not been verified yet. If loading does not complete, check the status again.",
  "Kurulum türü henüz doğrulanamadı. Üstteki durumu kontrol edin ve gerekirse yeniden deneyin.":
    "The installation type has not been verified yet. Check the status above and try again if needed.",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; yeni sürüm olup olmadığı doğrulanamadı. Ayarlar'daki güncelleme bölümünden yeniden deneyin.":
    "Your version is v{version}. The update check failed; availability of a newer version could not be verified. Try again in the update section of Settings.",
  "Kurulum kontrolü sonucu alınamadı. Durumu yeniden kontrol edin.":
    "Could not retrieve the installation check result. Check the status again.",
  "Kurulum kontrollerinde sorun bulunmadı.":
    "No issues found in installation checks.",
  "{count} kurulum kontrolü dikkat istiyor.":
    "{count} installation checks need attention.",
  "Bildirim ayarları": "Notification settings",
  "Bildirim geçmişi bu tarayıcıda saklanır. Denetim sonuçları, yeni sürümler ve bağlantı sorunları burada görünür.":
    "Notification history is saved in this browser. Audit results, new versions and connection problems appear here.",
  "Henüz bildirim yok. Bir denetim tamamlandığında veya önemli bir güncelleme olduğunda burada görünür.":
    "No notifications yet. Completed audits and important updates will appear here.",
  "Burada kayıtlı mülk seçimleri gösterilir; Google erişimi bu kontrolde sınanmaz. Erişimi proje bağlantılarından doğrulayın.":
    "These are saved property selections; this check does not test Google access. Verify access in project connections.",
  "seçili değil": "not selected",
  "Araç çağrısı alındı": "Tool call received",
  "{state} · {count} sınırın kullanımı bilinmiyor":
    "{state} · usage unknown for {count} limits",
  "Uygulama açıkken bildirimler ekranda görünür; sekme arka plandayken bildirim geçmişinde saklanır. Önemli bildirimlerin sesini buradan açıp kapatabilirsiniz.":
    "When the app is open, alerts appear on screen. In a background tab, they stay in notification history. Turn sounds for important alerts on or off here.",
  "Google hesabıyla giriş seçeneği": "Sign in with a Google account",
  "Az trafik alan sitelerde Google bazı sorguları gizler. Sayfa toplamlarında tıklama varken sorgu listesi boş veya daha küçük olabilir; bu tek başına bağlantı hatası değildir.":
    "On sites with little search traffic, Google hides some queries. The query list can be empty or show fewer clicks than the page totals; this alone does not mean the connection is broken.",
  "Bu tarayıcı": "This browser",
  "Henüz bildirim yok": "No notifications yet",
  "Para birimi": "Currency",
  "Mülk alan adını kapsamıyor.": "Property does not cover this domain.",
  "Denetim eski": "Older audit",
  "İlgili ayarlar": "Related settings",
  Kaynaklar: "Resources",
  "{count} okunmamış": "{count} unread",
};
