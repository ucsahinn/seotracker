import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/client/features/analytics, ga4, gsc, integrations, dashboard.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enAnalytics: Catalog = {
  "Bağlantıyı düzelt": "Fix the connection",
  "Hazırlık puanı": "Readiness score",
  "{completed} / {total} hazır": "{completed} / {total} ready",
  "Puan; Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumunun hazır olup olmadığını gösterir. Arama sırası ya da SEO başarısı değildir.":
    "This score reflects whether Google connections, a recent audit, project context and your agent are ready. It is not a ranking or SEO performance score.",
  "Denetimi yeniden başlatın": "Run the audit again",
  "Önceki denetim tamamlanamadı. Yeniden deneyin.":
    "The previous audit did not finish. Try again.",
  "Yeniden denetle": "Run again",
  "Denetim sürüyor": "Audit in progress",
  "İlerlemeyi ve bitiş özetini denetim ekranında izleyin.":
    "Follow its progress and completion summary on the audit screen.",
  "İlerlemeyi gör": "View progress",
  "Sizin 'önemli' saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse hep 0 görünür.":
    "An action you count as important, such as a form submission or a purchase. Shows 0 until one is set up.",
  "Oturumların yüzde kaçında önemli saydığınız bir hareket (anahtar olay) gerçekleşti. Anahtar olay tanımlı değilse hep %0 görünür.":
    "The share of sessions in which an action you count as important (a key event) happened. Shows 0% until a key event is set up.",
  "Ziyaretçinin sayfada vakit geçirip bir şey yaptığı oturumların yüzdesi.":
    "The share of sessions in which the visitor spent time on the page or did something.",
  "Seçilen aralıkta siteyle gerçekten etkileşime giren (sayfada vakit geçiren ya da bir şey yapan) kişi sayısı.":
    "People who actually engaged with the site in the selected range (spent time on a page or did something).",
  "Anahtar olay": "Key events",
  "Olay türü": "Event types",
  "En çok tetiklenen": "Most triggered",
  "{count} kez, {share} pay": {
    one: "{count} time, {share} share",
    other: "{count} times, {share} share",
  },
  "Tetikleyen kullanıcı": "Users who triggered it",
  "En çok tetiklenen olayda": "On the most triggered event",
  "Ürün geliri": "Item revenue",
  "Satılan ürün": "Items purchased",
  "Sepete eklenen": "Items added to cart",
  "Görüntülenen ürün": "Items viewed",
  Arama: "Searches",
  "Farklı terim": "Distinct terms",
  "En çok aranan": "Most searched",
  "{count} kez": {
    one: "{count} time",
    other: "{count} times",
  },
  "Yalnızca bir kez aranan": "Searched only once",
  "Pay: {share}": "Share: {share}",
  "Google Analytics bağlı değil": "Google Analytics is not connected",
  "Raporlar, Analytics'teki sitenizden gelir. Önce bağlantıyı kurun.":
    "Reports come from your site in Analytics. Connect it first.",
  "Analytics'i bağla": "Connect Analytics",
  "{title}: toplam {total} {unit}.": "{title}: {total} {unit} in total.",
  "En büyük pay {label}, {share}.": "Largest share: {label}, {share}.",
  "Birine tıklayın, aşağıdaki tablo o satırlara daralsın.":
    "Click one to narrow the table below to those rows.",
  "Organik oturum grafiği yüklenemedi":
    "Couldn't load the organic sessions chart",
  "{start} – {end} dönemine göre": "Compared with {start} – {end}",
  "Organik oturumlar": "Organic sessions",
  "Seçtiğiniz aralık, gün gün.": "Your selected range, day by day.",
  Oturum: "Sessions",
  "Etkileşim oranı": "Engagement rate",
  "Organik gelir": "Organic revenue",
  "Bu aralıkta organik oturum yok, grafik boş.":
    "No organic sessions in this range, so the chart is empty.",
  "{days} günde toplam {total} organik oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} organic sessions over {days} days. Peak day {day}, with {peak} sessions.",
  oturum: "sessions",
  "{dimension} bazında oturum payı": "Share of sessions by {dimension}",
  "{dimension} bazında kullanıcı payı": "Share of users by {dimension}",
  kullanıcı: "users",
  "Giriş sayfaları, oturuma göre": "Landing pages by sessions",
  "Sayfalar, görüntülenmeye göre": "Pages by views",
  görüntülenme: "views",
  "Olaylar, tetiklenme sayısına göre": "Events by times triggered",
  "anahtar olay": "key events",
  "Ürünler, gelire göre": "Items by revenue",
  gelir: "revenue",
  "Ürünler, satış adedine göre": "Items by quantity sold",
  "satılan ürün": "items purchased",
  "Ürünler, görüntülenmeye göre": "Items by views",
  "ürün görüntüleme": "item views",
  "Arama terimleri, arama sayısına göre": "Search terms by searches",
  arama: "searches",
  "Dönüşüm (anahtar olay) tanımlı olmadığı için bu filtre kullanılamıyor":
    "This filter is unavailable because no conversion (key event) is set up",
  "Etkileşimi düşük": "Low engagement",
  "Etkileşim oranı yüzde 50'nin altında olan satırlar.":
    "Rows with an engagement rate below 50%.",
  "Dönüşümü olan": "Converting",
  "En az bir anahtar olay getirmiş satırlar.":
    "Rows that brought at least one key event.",
  "Geliri olan": "Earning revenue",
  "Gelir getirmiş ürünler.": "Items that brought revenue.",
  "Etkileşim süresi düşük": "Low engagement time",
  "Kullanıcı başına etkileşim süresi {bar} altında kalan sayfalar (listenin ortancası {median}, yarısı {bar}).":
    "Pages with engagement time per user under {bar} (the list's median is {median}; half of it is {bar}).",
  "Trafiği yüksek, dönüşümü düşük": "High traffic, low conversion",
  "Oturumu ortancanın ({sessions}) üstünde ama oturum başına anahtar olay oranı ortancanın ({rate}) altında kalan sayfalar, bir de hiç olay getirmeyenler.":
    "Pages with sessions above the median ({sessions}) but a session key event rate below the median ({rate}), plus those with no key events at all.",
  Diğer: "Other",
  "Bu dönemde anahtar olay kaydı yok": "No key events recorded in this period",
  "Mülkte hiçbir olay anahtar olay işaretli olmayabilir ya da işaretli olaylar bu aralıkta hiç olmamış olabilir.":
    "The property may have no events marked as key events, or the marked events may not have happened in this range.",
  "Anahtar olay nasıl tanımlanır": "How to set up key events",
  "Bu dönemde ürün verisi yok": "No item data in this period",
  "Mülk e-ticaret olayı (ürün görüntüleme, sepete ekleme, satın alma) göndermiyor olabilir. Mağazası olmayan bir sitede bu normal.":
    "The property may not be sending ecommerce events (item views, add to cart, purchases). That is normal for a site without a store.",
  "GA4 e-ticaret ölçümü": "GA4 ecommerce measurement",
  "Bu dönemde site içi arama kaydı yok":
    "No site searches recorded in this period",
  "Sitede arama kutusu yoksa ya da site içi arama ölçümü kapalıysa bu rapor boş kalır. Açıkken de kimse bir şey aramadıysa boştur.":
    "This report stays empty if the site has no search box or site search measurement is off. It is also empty when it is on but nobody searched.",
  "Gelişmiş ölçüm ve site içi arama": "Enhanced measurement and site search",
  "Bu dönemde veri yok": "No data in this period",
  "Google hiç satır vermedi ({reason}).": "Google returned no rows ({reason}).",
  "Google bu aralık için satır vermedi. Mülkü yeni bağladıysanız veri birkaç gün sonra görünür.":
    "Google returned no rows for this range. If you connected the property recently, data appears after a few days.",
  "Şu an yalnızca Google organik aramadan gelen ziyaretler sayılıyor; tüm trafiğe bakmak sonucu değiştirebilir.":
    "Only visits from Google organic search are counted right now; looking at all traffic may change the result.",
  "Google'ın verdiği not: {reason}.": "Google's note: {reason}.",
  "Tüm trafiğe bak": "View all traffic",
  "Ölçüm durumunu kontrol et": "Check measurement health",
  "Listelenen {count} satırdan": {
    one: "Of the {count} row listed",
    other: "Of the {count} rows listed",
  },
  "Analytics mülkü": "Analytics property",
  "{shown} / {count} satır": {
    one: "{shown} / {count} row",
    other: "{shown} / {count} rows",
  },
  "{count} satır": {
    one: "{count} row",
    other: "{count} rows",
  },
  örneklenmiş: "sampled",
  "eşik altı satırlar gizlendi": "rows below thresholds hidden",
  "Hızlı filtreler": "Quick filters",
  "Yalnızca Google organik aramadan gelen ziyaretleri gösterir.":
    "Shows only visits from Google organic search.",
  "Sadece organik": "Organic only",
  "Sayılar, listelenen tüm satırlara göre hesaplanır. Birden fazla filtre seçerseniz satırın hepsine uyması gerekir.":
    "Counts are based on all listed rows. If you pick more than one filter, a row has to match all of them.",
  "Filtreleri temizle": "Clear filters",
  "E-Tablolar'a aktar ({count} satır)": {
    one: "Export to Sheets ({count} row)",
    other: "Export to Sheets ({count} rows)",
  },
  "CSV ({count} satır)": {
    one: "CSV ({count} row)",
    other: "CSV ({count} rows)",
  },
  "Bu filtrelere uyan satır yok": "No rows match these filters",
  "Seçtiğiniz filtrelerle hiçbir satır eşleşmiyor.":
    "No rows match the filters you picked.",
  "Kanal grubu": "Channel group",
  "Organik arama": "Organic Search",
  "Tüm trafik": "All traffic",
  "Ziyaretçiler siteye hangi sayfadan giriyor ve o sayfada kalıp bir sonuca ulaşıyor mu?":
    "Which page do visitors enter the site on, and do they stay and reach an outcome there?",
  "Hangi sayfalar en çok görüntüleniyor ve okurlar orada ne kadar vakit geçiriyor?":
    "Which pages get the most views, and how long do readers spend on them?",
  "Ziyaretçiler hangi kanallardan geliyor ve hangi kanal gerçekten sonuç getiriyor?":
    "Which channels do visitors come from, and which one actually brings results?",
  "Sonuç saydığınız olaylar ne sıklıkla gerçekleşiyor ve kaç kişi tetikliyor?":
    "How often do the events you count as outcomes happen, and how many people trigger them?",
  "Hangi ürünler görüntüleniyor, sepete ekleniyor ve gelir getiriyor? Mülkte e-ticaret ölçümü yoksa bu sekme boş kalır.":
    "Which items are viewed, added to cart and bring revenue? This tab stays empty if the property does not measure ecommerce.",
  "Ziyaretçiler sitenizde ne arıyor? Bulamadıkları içerik, yazacağınız yeni sayfaların ipucudur.":
    "What do visitors search for on your site? Content they cannot find hints at the new pages to write.",
  "Ziyaretçileriniz hangi cihazlardan geliyor ve cihaza göre deneyim nasıl değişiyor?":
    "Which devices do your visitors use, and how does the experience change by device?",
  "Ziyaretçiler siteye hangi sayfadan giriyor, orada ne yapıyor.":
    "Which page visitors enter the site on, and what they do there.",
  "Ölçüm durumu": "Measurement health",
  "Satır sayısı": "Rows",
  "Analytics gerçekten ölçüyor mu? Mülkünüzün kurulum ayarlarını okur, rapor kotanızdan harcamaz.":
    "Is Analytics actually measuring? This reads your property's setup and does not use your report quota.",
  "Kitleyi neye göre böl": "Split audience by",
  "Trafiği neye göre böl": "Split traffic by",
  "Rapor alınamadı": "Couldn't load the report",
  "Web veri akışı yok": "No web data stream",
  "Bu mülke bir web veri akışı eklenmeden site trafiği hiç ölçülmez.":
    "Site traffic is not measured at all until this property has a web data stream.",
  "Gelişmiş ölçüm kapalı": "Enhanced measurement off",
  "Kaydırma, dış bağlantı ve dosya indirme gibi olaylar toplanmıyor. Akış ayarlarından açabilirsiniz.":
    "Events such as scrolls, outbound clicks and file downloads are not collected. You can turn it on in the stream settings.",
  "Site içi arama ölçülmüyor": "Site search is not measured",
  "Sitenizde arama kutusu varsa, ziyaretçilerin ne aradığını göremezsiniz.":
    "If your site has a search box, you cannot see what visitors search for.",
  "Anahtar olay tanımlı değil": "No key events set up",
  "Anahtar olay olmadan trafiğin sonuca dönüşüp dönüşmediği ölçülemez; her rapor oturum sayısında kalır.":
    "Without key events there is no way to tell whether traffic turns into results; every report stops at session counts.",
  "Envanter eksik olabilir": "The inventory may be incomplete",
  'Google bu mülkün listesini eksik verdi. Sayımlara ve "eksik yok" sonucuna tam güvenmeyin.':
    'Google returned an incomplete list for this property. Do not fully trust the counts or a "nothing missing" result.',
  Kaydırma: "Scrolls",
  "Dış bağlantı": "Outbound clicks",
  "Dosya indirme": "File downloads",
  "Sayfa geçişleri": "Page changes",
  "Her tetiklemede sayılır": "Once per event",
  "Oturumda bir kez sayılır": "Once per session",
  "Android uygulaması": "Android app",
  "iOS uygulaması": "iOS app",
  "Ölçüm durumu okunamadı": "Couldn't read measurement health",
  "Web veri akışı": "Web data streams",
  "{count} akıştan web olanlar": {
    one: "The web ones out of {count} stream",
    other: "The web ones out of {count} streams",
  },
  "Web akışı yok": "No web stream",
  "Tüm akışlar web": "All streams are web",
  "Önemli saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse rapor hep 0 gösterir.":
    "An action you count as important, such as a form submission or a purchase. Reports show 0 until one is set up.",
  "Özel boyut": "Custom dimensions",
  "{count} özel metrik": {
    one: "{count} custom metric",
    other: "{count} custom metrics",
  },
  Bulgu: "Findings",
  "Kurulum eksiksiz": "Setup is complete",
  "Aşağıda açıklanıyor": "Explained below",
  "Ölçüm kurulumunda eksik yok.":
    "Nothing is missing from the measurement setup.",
  "adres yok": "no address",
  "Gelişmiş ölçüm açık": "Enhanced measurement on",
  "{on} / {count} otomatik olay açık": "{on} / {count} automatic events on",
  "Gelişmiş ölçüm": "Enhanced measurement",
  "Gelişmiş ölçüm; kaydırma, dış bağlantı tıklaması ve dosya indirme gibi olayları koda dokunmadan toplar. Kapalı olanlar raporlarda hiç görünmez.":
    "Enhanced measurement collects events such as scrolls, outbound clicks and file downloads without touching code. Events that are off never appear in reports.",
  "açık:": "on:",
  "kapalı:": "off:",
  "Uygulama veri akışları": "App data streams",
  "Bu mülke bağlı, web dışındaki akışlar. Buradaki raporlar yalnızca web trafiğini kapsamaz; uygulama verisi de toplamlara karışır.":
    "Non-web streams linked to this property. Reports here are not limited to web traffic; app data is included in the totals too.",
  "Sayım yöntemi": "Counting method",
  "Sayım yöntemi, aynı oturumda tekrarlanan bir olayın kaç kez sayılacağını belirler. Dönüşüm rakamlarını karşılaştırırken bu ayara bakın.":
    "The counting method decides how many times an event repeated in one session is counted. Check it when comparing conversion numbers.",
  "Google Analytics bağlandı": "Google Analytics connected",
  "Google Analytics bağlantısı kesildi": "Google Analytics disconnected",
  "Bağlantı yükleniyor": "Loading connection",
  "Bu projenin bağlantısı kontrol edilemedi.":
    "Couldn't check this project's connection.",
  "Tekrar dene": "Try again",
  Vazgeç: "Cancel",
  "Bağlantıyı değiştirmek için Ayarlar'daki Google kurulumunu kontrol edin.":
    "To change the connection, check the Google setup in Settings.",
  Gizle: "Hide",
  "Search Console bağlandı": "Search Console connected",
  "Search Console bağlantısı kesildi": "Search Console disconnected",
  "Google erişim anahtarı eksik": "Google access key missing",
  "Search Console'u bağlamak için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "To connect Search Console, first enter your Google access key in Settings.",
  "Ayarlar'ı aç": "Open Settings",
  "Kurulum kılavuzunu aç": "Open the setup guide",
  görsel: "image",
  haber: "news",
  "{count} adres": {
    one: "{count} URL",
    other: "{count} URLs",
  },
  "{list} gönderilmiş": "{list} submitted",
  "Site haritaları okunamadı": "Couldn't read sitemaps",
  "Search Console bağlı değil": "Search Console is not connected",
  "Site haritalarınızı Google'ın gözünden görmek için Search Console bağlantısı gerekir.":
    "Connect Search Console to see your sitemaps the way Google does.",
  Bağlantılar: "Connections",
  "Google bu mülkün site haritalarını vermedi. Hesabınızın Search Console'da site haritası gönderme yetkisi yoksa, mülke erişseniz bile bu listeyi göremezsiniz.":
    "Google did not return this property's sitemaps. If your account cannot submit sitemaps in Search Console, you cannot see this list even with access to the property.",
  "Gönderilmiş site haritası yok": "No sitemaps submitted",
  "Google site haritası olmadan da sayfa bulur. Ama site haritası, hangi sayfaları önemsediğinizi ona doğrudan söylemenin yoludur.":
    "Google finds pages without a sitemap too. But a sitemap is how you tell it directly which pages you care about.",
  "Site haritaları": "Sitemaps",
  "Google'a gönderdikleriniz ve Google'ın onlarla ne yaptığı.":
    "What you submitted to Google, and what Google did with it.",
  "dizin dosyası": "sitemap index",
  "son indirme {date}": "last read {date}",
  "Google hiç indirmedi": "Google never read it",
  "{count} hata": {
    one: "{count} error",
    other: "{count} errors",
  },
  "{count} uyarı": {
    one: "{count} warning",
    other: "{count} warnings",
  },
  Hatalı: "Has errors",
  İşlenmedi: "Pending",
  Okundu: "Read",
  İndirilmedi: "Not read",
  "{provider} bağlantısı tamamlanmadı":
    "{provider} connection was not completed",
  "Google girişi tamamlanmadı": "Google sign-in was not completed",
  "Deneme zaman aşımına uğradı ya da yarıda kesildi. Tek bir tarayıcı sekmesinde yeniden deneyin ve Google adımlarını 10 dakika içinde bitirin. Tekrar ederse tarayıcınızın bu site için çerezlere izin verdiğinden emin olun.":
    "The attempt timed out or was interrupted. Try again in a single browser tab and finish the Google steps within 10 minutes. If it happens again, make sure your browser allows cookies for this site.",
  "{provider} bağlantısı iptal edildi": "{provider} connection was canceled",
  "Google girişi iptal edildi": "Google sign-in was canceled",
  "Google'ın izin ekranı kapatıldı ya da reddedildi. Hazır olduğunuzda yeniden deneyebilirsiniz.":
    "Google's consent screen was closed or declined. You can try again whenever you are ready.",
  "Google hesabı zaten bağlı": "Google account already linked",
  'Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. {provider} mülk seçicisini açıp hesabın yanındaki "Hesabı kaldır"a basın, sonra yeniden bağlayın.':
    'This Google account already appears linked to another record. Open the {provider} property picker, click "Remove account" next to the account, then connect it again.',
  "Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. Ayarlar'daki mülk seçicisinden hesabı kaldırıp yeniden bağlayın.":
    "This Google account already appears linked to another record. Remove the account from the property picker in Settings, then connect it again.",
  "Google ile konuşurken bir şeyler ters gitti. Yeniden deneyin. Sürerse hatanın ayrıntısı Yardım ekranındaki günlüklerde.":
    "Something went wrong while talking to Google. Try again. If it keeps happening, the error details are in the logs on the Help screen.",
  "{integration} için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "To use {integration}, first enter your Google access key in Settings.",
  Bağlı: "Connected",
  "Bağlı değil": "Not connected",
  "Bu projenin bağlantısını tamamlamak için bir {name} mülkü seçin.":
    "Choose a {name} property to finish connecting this project.",
  "Bu projenin verisini görmek için {name} bağlayın.":
    "Connect {name} to see this project's data.",
  "Google açılıyor…": "Opening Google…",
  "Mülk seç": "Choose property",
  Bağlan: "Connect",
  "Google hesaplarını yönet": "Manage Google accounts",
  Kapat: "Close",
  "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar.":
    "Domain property: covers all subdomains and both http and https URLs.",
  "Mülkü veya hesabı değiştir": "Change property or account",
  "Bağlantıyı kes": "Disconnect",
  "Bağlantı kesilirse bu projenin bu kaynağa bağlı ekranları boş kalır. Veriler silinmez; mülkü yeniden seçerek geri bağlayabilirsiniz.":
    "If you disconnect, this project's screens that rely on this source go empty. No data is deleted; choose the property again to reconnect.",
  "Bağlantı kesiliyor…": "Disconnecting…",
  "Google hesabı kaldırıldı": "Google account removed",
  "Google hesabı kaldırılsın mı?": "Remove Google account?",
  "Bu hesabın {name} bağlantısı seowatcher'dan kaldırılır. İstediğiniz zaman yeniden bağlayabilirsiniz.":
    "This account's {name} connection is removed from seowatcher. You can connect it again at any time.",
  "Bağlı projeler kontrol ediliyor": "Checking linked projects",
  "Bağlı projeler kontrol edilemedi.": "Couldn't check linked projects.",
  "Bu işlem {name} bağlantısını {count} projeden de kaldırır.": {
    one: "This also removes the {name} connection from {count} project.",
    other: "This also removes the {name} connection from {count} projects.",
  },
  "Hiçbir proje etkilenmeyecek.": "No projects will be affected.",
  "Hesap kaldırılamadı. Tekrar deneyin.":
    "Couldn't remove the account. Try again.",
  "Kaldırılıyor…": "Removing…",
  "Hesabı kaldır": "Remove account",
  "Google hesabı · {id}": "Google account · {id}",
  "Bir mülk seçin…": "Choose a property…",
  "Google mülkleri": "Google properties",
  "Mülk veya hesap ara": "Search properties or accounts",
  "Mülk veya hesap ara…": "Search properties or accounts…",
  "Mülkler yüklenemedi.": "Couldn't load properties.",
  "{account} hesabını kaldır": "Remove account {account}",
  "Bağlantının süresi doldu": "The connection has expired",
  "{account} hesabını yeniden bağla": "Reconnect account {account}",
  "Yeniden bağlan": "Reconnect",
  "Bu hesabın görebildiği bir GA4 mülkü yok. Henüz mülk oluşturmadıysanız analytics.google.com'dan oluşturun, sonra bu hesabı ona Görüntüleyen olarak ekleyin.":
    "This account cannot see any GA4 property. If you have not created one yet, create it at analytics.google.com, then add this account to it as a Viewer.",
  "Bu hesabın görebildiği bir Search Console mülkü yok. Mülkü doğruladıysanız bu hesabı search.google.com/search-console adresinden kullanıcı olarak ekleyin.":
    "This account cannot see any Search Console property. If you have verified the property, add this account as a user at search.google.com/search-console.",
  "Doğrulanmış erişim yok": "No verified access",
  "Eşleşen mülk veya hesap yok": "No matching properties or accounts",
  "Mülkleri bulmak için bir Google hesabı ekleyin.":
    "Add a Google account to find properties.",
  "Google hesabı ekle": "Add Google account",
  "Kaydediliyor…": "Saving…",
  "Mülkü kaydet": "Save property",
  "Sıradaki adımlar": "Next steps",
  "En hızlı kazandıracak işten başlayın.": "Start with what pays off fastest.",
  "Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok.":
    "Nothing urgent. The audit is current and there are no critical issues.",
  "Search Console'u bağlayın": "Connect Search Console",
  "Hangi kelimede kaçıncı sırada olduğunuzu yalnızca Google bilir. Bağlantı ücretsiz.":
    "Only Google knows where you rank for each keyword. Connecting is free.",
  Bağla: "Connect",
  "İlk denetimi başlatın": "Run your first audit",
  "Sitenizi tarar, teknik sorunları önem sırasına göre listeler.":
    "Crawls your site and lists technical issues by severity.",
  Başlat: "Start",
  "{count} kritik sorun var": {
    one: "{count} critical issue",
    other: "{count} critical issues",
  },
  "Kritik sorunlar Google'ın sayfayı taramasını ya da dizine almasını engelleyebilir.":
    "Critical issues can stop Google from crawling or indexing a page.",
  Gör: "View",
  "Fırsatlara bakın": "Review opportunities",
  "Sayfalarınız, sıralarına göre değil, üzerinde çalışmaya ne kadar değdiğine göre sıralı.":
    "Your pages, ranked by how much they are worth working on rather than by position.",
  Aç: "Open",
  "Denetimi tazeleyin": "Refresh the audit",
  "Son denetim {when}. Bu ekrandaki sayılar o denetimden geliyor.":
    "The last audit ran {when}. The numbers on this screen come from it.",
  "{count} uyarı var": {
    one: "{count} warning",
    other: "{count} warnings",
  },
  "Kritik değil ama Google'ın sayfayı anlamasını zorlaştırıyor.":
    "Not critical, but it makes the page harder for Google to understand.",
  "Sitenizi ekleyin": "Add your site",
  "Bu proje için siteyi ve ülkeyi belirleyin.":
    "Set the site and country for this project.",
  "Başka sitelerinizi de ekleyin": "Add your other sites",
  "Her site için ayrı proje açın.": "Create a separate project for each site.",
  "Yapay zeka ajanınızı bağlayın": "Connect your AI agent",
  "seowatcher'ı Claude ya da tercih ettiğiniz ajanın içinden kullanın.":
    "Use seowatcher from inside Claude or the agent you prefer.",
  "Gerçek tıklamalarınızı ve sorgularınızı buraya getirin.":
    "Bring your real clicks and queries here.",
  "Projeyi anlatın": "Describe the project",
  "Ajanınız ve raporlarınız siteyi tanısın.":
    "Help your agent and reports get to know the site.",
  "Tercihiniz kaydedilemedi. Tekrar deneyin.":
    "Couldn't save your choice. Try again.",
  "Kurulum listesi": "Setup checklist",
  "Çalışma alanınızı kurun": "Set up your workspace",
  "Bir adım kaldı.": "One step left.",
  "{count} adım kaldı.": {
    one: "{count} step left.",
    other: "{count} steps left.",
  },
  "Hepsi isteğe bağlı, istediğiniz zaman dönebilirsiniz.":
    "All optional; come back any time.",
  "Tek proje bana yeter": "One project is enough for me",
  "Şimdilik geç": "Skip for now",
  "{count} adım sonraya bırakıldı": {
    one: "{count} step postponed",
    other: "{count} steps postponed",
  },
  "{step} adımını geri al": "Restore the step {step}",
  "Geri al": "Restore",
  "{count} tamamlandı": "{count} completed",
  "Önceki döneme göre yüzde {percent} yüksek.":
    "{percent}% higher than the previous period.",
  "Önceki döneme göre yüzde {percent} düşük.":
    "{percent}% lower than the previous period.",
  "Aramada görünürlüğü doğrudan bozan sorunlar; önce bunlar.":
    "Issues that directly hurt visibility in search; fix these first.",
  "Sıralamayı zamanla aşındıran, ama acil olmayan sorunlar.":
    "Issues that wear rankings down over time but are not urgent.",
  "Küçük iyileştirme fırsatları.": "Small improvement opportunities.",
  "{count} kritik": "{count} critical",
  "{count} bilgi": "{count} info",
  "{severity}: {count} bulgu. {hint}": {
    one: "{severity}: {count} finding. {hint}",
    other: "{severity}: {count} findings. {hint}",
  },
  "Önem düzeyi": "Severity",
  "Kritik sorunlar sayfanın aramada görünmesini engelleyebilir, uyarılar sıralamayı zamanla aşındırır, bilgi notları ise küçük iyileştirmelerdir. Çubuğa ya da altındaki etiketlerden birine tıklarsanız sorun listesine geçersiniz.":
    "Critical issues can keep a page out of search, warnings wear rankings down over time, and info notes are small improvements. Click the bar or one of the labels below it to open the issue list.",
  "Son denetimin ne kadar eski olduğu okunamadı.":
    "Couldn't tell how old the last audit is.",
  "Son denetimin üzerinden {count} gün geçti. Sitede değişiklik yaptıysanız yeni bir denetim başlatmak iyi olur.":
    {
      one: "It has been {count} day since the last audit. If you changed the site, it is worth running a new one.",
      other:
        "It has been {count} days since the last audit. If you changed the site, it is worth running a new one.",
    },
  "Denetimi başlat": "Start audit",
  "Son denetimde yeni çıkanlar": "New in the last audit",
  "Yeni sorun yok.": "No new issues.",
  Düzelenler: "Fixed",
  "Düzelen sorun yok.": "No fixed issues.",
  "{count} sayfa": {
    one: "{count} page",
    other: "{count} pages",
  },
  "Site denetimi": "Site audit",
  "Kırık bağlantılar, eksik etiketler ve dizine girme sorunları için sitenizi tarayın.":
    "Crawl your site for broken links, missing tags and indexing problems.",
  "{count} sayfa tarandı · {date}": {
    one: "{count} page crawled · {date}",
    other: "{count} pages crawled · {date}",
  },
  "denetim sürüyor": "audit in progress",
  "son denetim başarısız": "last audit failed",
  Ayrıntılar: "Details",
  "Denetim sürüyor, sonuçlar bittiğinde görünecek.":
    "The audit is running; results appear when it finishes.",
  "Son denetim tamamlanamadı, bu yüzden sonuç yok.":
    "The last audit could not finish, so there are no results.",
  "Sorun bulunamadı, siteniz sağlıklı görünüyor.":
    "No issues found; your site looks healthy.",
  "+ {count} sorun daha": {
    one: "+ {count} more issue",
    other: "+ {count} more issues",
  },
  "En çok sorunu olan sayfalar": "Pages with the most issues",
  "{count} sorun": {
    one: "{count} issue",
    other: "{count} issues",
  },
  "Son {days} gün": "Last {days} days",
  "Search Console verisi alınamadı": "Couldn't load Search Console data",
  "Bağlanınca görünür": "Shows once connected",
  "Bu dönemde gösterim yok": "No impressions in this period",
  Tıklama: "Clicks",
  Gösterim: "Impressions",
  "Tıklama oranı": "CTR",
  "Ortalama sıra": "Average position",
  "{period} · düşük sayı daha iyi: 1, listenin en üstü demek":
    "{period} · lower is better: 1 means the top of the list",
  Panel: "Dashboard",
  "Panel yüklenemedi": "Couldn't load the dashboard",
  "Denetim özeti yüklenemedi": "Couldn't load the audit summary",
  "Bu istemi ajanınıza yapıştırın; seowatcher'ı sizin için kendiliğinden kuracak.":
    "Paste this prompt into your agent; it sets up seowatcher for you.",
  "seowatcher eklentisi": "seowatcher plugin",
  "Ajan bağlantısı (MCP) ve hazır SEO görevleri":
    "Agent connection (MCP) and ready-made SEO tasks",
  "Kurulum istemini kopyala": "Copy setup prompt",
  "Kurulum istemi kopyalandı": "Setup prompt copied",
  "Kurulumu elle yapın": "Set it up manually",
  "Ne sattığınız, kimi hedeflediğiniz ve hangi sayfaların para kazandırdığı burada duruyor. Rapor şablonları ve bağladığınız ajan bu bilgiyi okuyor; boşken ikisi de siteyi tanımadan yorum yapıyor.":
    "This is where you record what you sell, who you target and which pages make money. Report templates and your connected agent read it; while it is empty, both comment without knowing the site.",
  "Proje bilgisini doldurun": "Fill in project context",
  'Her sitenin araştırmasını, sıralamalarını ve bağlantılarını kendi projesinde tutun. Yan menüdeki proje değiştiriciden "Yeni proje" diyerek istediğiniz zaman ekleyebilirsiniz.':
    'Keep each site\'s research, rankings and connections in its own project. Add one any time with "New project" in the project switcher in the sidebar.',
  "Başka bir proje oluştur": "Create another project",
  "Bir site listeniz mi var? Ajanınız hepsini kursun.":
    "Have a list of sites? Let your agent set them all up.",
  "{link}, sonra site listenizle birlikte bu istemi yapıştırın.":
    "{link}, then paste this prompt along with your list of sites.",
  "Ajanınızı bağlayın": "Connect your agent",
  "Proje istemini kopyala": "Copy project prompt",
  "Proje istemi kopyalandı": "Project prompt copied",
  "Site kaydedildi": "Site saved",
  "Siteniz kaydedilemedi. Tekrar deneyin.":
    "Couldn't save your site. Try again.",
  "Bu projenin sitesini ekleyin ve müşterilerinizin arama yaptığı ülkeyi seçin. İkisini de proje ayarlarından istediğiniz zaman değiştirebilirsiniz.":
    "Add this project's site and choose the country your customers search from. You can change both in project settings at any time.",
  "Site adresi": "Site address",
  "Siteyi kaydet": "Save site",
  "{count} oturum": {
    one: "{count} session",
    other: "{count} sessions",
  },
  "Organik trafik": "Organic traffic",
  Raporlar: "Reports",
  Yönet: "Manage",
  "Google Analytics verileri yüklenemedi.":
    "Couldn't load Google Analytics data.",
  "Bu aralıkta organik arama trafiği kaydedilmemiş.":
    "No organic search traffic was recorded in this range.",
  "Aktif kullanıcı": "Active users",
  Sipariş: "Transactions",
  "Gösterilecek oturum verisi yok.": "No session data to show.",
  "{days} günde toplam {total} oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} sessions over {days} days. Peak day {day}, with {peak} sessions.",
  "Kart gizlenemedi. Tekrar deneyin.": "Couldn't hide the card. Try again.",
  "Search Console ve Analytics aynı erişim anahtarını kullanır. Önce onu Ayarlar'a girin.":
    "Search Console and Analytics use the same access key. Enter it in Settings first.",
  "Google erişim anahtarını Ayarlar'a girin":
    "Enter the Google access key in Settings",
  "Tıklama eğilimi": "Click trend",
  "Sorguları aç": "Open queries",
  "tıklama, son {days} gün": "clicks, last {days} days",
  "önceki döneme göre": "vs. previous period",
  "Son {days} günde {total} tıklama.":
    "{total} clicks in the last {days} days.",
  "En yüksek gün {day}, {clicks} tıklama.":
    "Peak day {day}, with {clicks} clicks.",
  tıklama: "clicks",
  "Sıra 5-20 arası sorgular": "Queries in positions 5-20",
  "Tümünü gör": "View all",
  "Şu an 5. ile 20. sıra arasında sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "No queries rank between positions 5 and 20 right now. They are listed here as they enter that range.",
  "{impressions} gösterim · sıra {position}":
    "{impressions} impressions · position {position}",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Önceki {days} güne göre": "Against the previous {days} days",
  "Analytics {ga4} gün, Search Console {gsc} gün geriden gelir; bu yüzden buradaki günler üstteki tıklama kutularından farklıdır. Değişimler önceki aynı uzunluktaki döneme göredir.":
    "Analytics runs {ga4} day behind and Search Console {gsc} days, so the days here differ from the click tiles above. Changes are against the previous period of the same length.",
  "Kurulum tamam": "Setup complete",
  "Kurulum {done} / {total}": "Setup {done} / {total}",
  "Kurulumda eksik: {items}.": "Missing from setup: {items}.",
  Tamamla: "Complete it",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Trafiği yüksek, dönüşümü düşük sayfa":
    "pages with high traffic and low conversion",
  "Listede gösteriliyor": "Shown in the list",
  Listele: "List them",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Ortalama sırası 4–20 olan {count} sorgu; her biri bir basamak yükselirse en fazla {clicks} ek tıklama (üst sınır).":
    "{count} queries averaging positions 4–20; if each moves up one step, at most {clicks} extra clicks (upper bound).",
  "Karşılaştırma yapılamadı: tarama kapsamları farklı veya bilinmiyor.":
    "Cannot compare: crawl scopes differ or are unknown.",
  "{measured} / {total} kontrol ölçüldü.":
    "{measured} / {total} checks measured.",
  "{types} kontrol türünde {pages} sayfa etkileniyor.":
    "{pages} pages affected across {types} check types.",
  "Taranan kapsamda sorun bulunamadı.":
    "No issues found within the crawled scope.",
  "Ölçülmeyen kontroller var; tüm site için sağlıklı sonucu çıkarılamaz. Ayrıntılarda kapsamı kontrol edin.":
    "Some checks were not measured; site-wide health cannot be established. Check coverage in the details.",
  "+ {count} kontrol türü daha": "+ {count} more check types",
  "Google aramasından sitenize gelen tıklamalar.":
    "Clicks to your site from Google Search.",
  "Sitenizin Google sonuçlarında gösterilme sayısı.":
    "How often your site appeared in Google results.",
  "Kurulum tercihleri": "Setup preferences",
  Denetimler: "Audits",
  "Bağlantı durumu yenilenemedi": "Connection status could not be refreshed",
  "Google yapılandırması okunamadı. Yenile ile tekrar deneyin.":
    "Google configuration could not be read. Try Refresh again.",
  "Site seçilmedi": "No site selected",
  "Kendi sitenizin denetimini göstermek için proje ayarlarına alan adını girin.":
    "Enter the domain in project settings to show your own site’s audit.",
  "Son denetim başarısız": "Latest audit failed",
  "Arama verisi için Search Console bağlantısını kontrol edin.":
    "Check the Search Console connection to see search data.",
  "Arama verisi şu an okunamadı. Yenile ile tekrar deneyin.":
    "Search data could not be read right now. Try Refresh again.",
  "Arama özeti": "Search summary",
  "Son {days} günde Google aramalarından {clicks} tıklama aldınız.":
    "You received {clicks} clicks from Google Search over {days} days.",
  "Son yenileme başarısız; önbellekteki veriler gösteriliyor.":
    "The latest refresh failed; cached data is shown.",
  "Önceki dönem: {start} – {end}.": "Previous period: {start} – {end}.",
  "Son veri günü: {date}. Son {count} gün toplamlara dahil değil.":
    "Latest data day: {date}. The last {count} days are excluded from totals.",
  "Google tarih bildirmedi; son günler dışarıda.":
    "Google did not report a completeness date; recent days are excluded.",
  "Sorgu listesi satır sınırında kesildi; tahminler yalnızca alınan sorguları kapsar.":
    "The query list reached its row limit; estimates cover only the fetched queries.",
  "Google bazı sorguları gizler; sorgu listesi site toplamının tamamı değildir.":
    "Google hides some queries; the query list does not represent the entire site total.",
  "{value} (para birimi bilinmiyor)": "{value} (currency unknown)",
  "Satış ölçümü doğrulanmadı; sıfır satış, mağaza olmadığı anlamına gelmez.":
    "Sales measurement is unverified; zero sales does not mean there is no shop.",
  "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.":
    "Analytics data is limited or incomplete. Unknown values are left as gaps; period comparisons are withheld.",
  "Saat dilimi bilinmiyor": "Time zone unknown",
  "Google arama tıklamaları ile organik oturumlar farklı ölçümlerdir; Analytics diğer arama motorlarını da kapsar.":
    "Google Search clicks and organic sessions measure different things; Analytics also includes other search engines.",
  "Google gizlilik eşiği nedeniyle bazı verileri göstermiyor.":
    "Google is withholding some data because of privacy thresholds.",
  "Google bu raporu örneklenmiş veriden hesapladı.":
    "Google calculated this report from sampled data.",
  "Bazı ölçümler hesap erişim kısıtı nedeniyle okunamadı. Analytics mülkündeki yetkinizi kontrol edin.":
    "Some metrics could not be read due to account restrictions. Check your permissions on the Analytics property.",
  "Bazı satırlar Google tarafından birleştirildi; ayrıntılar eksik olabilir.":
    "Google combined some rows; details may be missing.",
  "Ölçülen bulgulara göre önce şu işleri değerlendirin.":
    "Consider these tasks first, based on measured findings.",
  "Kurulum durumu okunamayanlar: {items}. Yenile ile tekrar deneyin.":
    "Setup status could not be read for: {items}. Try Refresh again.",
  "Ölçülen kapsamda öncelikli iş bulunmadı.":
    "No priority task was found within the measured scope.",
  "Denetim özeti okunamadı": "Audit summary could not be read",
  "İlk denetim olup olmadığı bilinmiyor. Denetim geçmişini açın veya Yenile ile tekrar deneyin.":
    "It is unknown whether an audit already exists. Open audit history or try Refresh again.",
  "Son denetim {when}. Denetim bulguları yalnızca bu taramaya dayanır.":
    "Latest audit: {when}. Audit findings reflect only that crawl.",
  "Bazı veriler yenilenemedi; önbellekteki tarihleri kontrol edin.":
    "Some data could not be refreshed; check the cached dates.",
  Yenilendi: "Refreshed",
  "Veri alındı: {time}": "Data retrieved: {time}",
  "Günlük tıklamalar; soluk çizgi önceki dönemi gösterir.":
    "Daily clicks; the faded line shows the previous period.",
  "Bir üst sıra bandına çıkabilecek sorgular":
    "Queries that could move up one position band",
  "Marka adları onaylandı.": "Brand terms confirmed.",
  "Marka adları öneriye göre ayrıldı.":
    "Brand queries were separated using suggested terms.",
  "Marka ayrımı yapılmadı.": "Brand queries were not separated.",
  "Bu kapsamda uygun sorgu bulunmadı.": "No eligible queries in this scope.",
  "{count} sorgu bir üst sıra bandı için değerlendirildi.":
    "{count} queries evaluated for the next position band.",
  "Yeterli örnek yok; ek tıklama üst sınırı hesaplanamadı.":
    "Not enough observations to calculate an upper bound for extra clicks.",
  "Hesaplanabilen {known} sorguda en fazla {clicks} ek tıklama (üst sınır); {unknown} sorguda hesaplanamadı.":
    "At most {clicks} extra clicks across {known} estimable queries (upper bound); {unknown} queries could not be estimated.",
  "Bu bir tahmindir; sayfa bazlı Fırsatlar toplamına eklenmez.":
    "This is an estimate; do not add it to the page-based Opportunities total.",
  "Birim: sayfa ve kontrol türü çifti; benzersiz sayfa sayısı değildir.":
    "Unit: page and check-type pair; this is not a unique-page count.",
  "{count} kritik kontrol türü": "{count} critical check types",
  "{count} uyarı kontrol türü": "{count} warning check types",
  "Site geneli": "Site-wide",
  "Sorgu arşivi": "Query archive",
  "Karşılaştırma yalnızca iki taramada da ölçülen kontrolleri kapsar; diğer kontroller için değişim bilinmiyor.":
    "The comparison covers only checks measured in both crawls; changes in other checks are unknown.",
  "Mülk kapsamı: tüm ana makineler ve akışlar. Bu toplam yalnızca projenin sitesine ait olmayabilir.":
    "Property scope: all hosts and streams. This total may include more than this project’s site.",
  "Son günler yeniden işlenebilir; dün, tamamlanmış bir takvim günüdür, kesinleşmiş veri garantisi değildir.":
    "Recent days may be reprocessed. Yesterday is an elapsed calendar day, not a guarantee of final data.",
  "Organik arama motorları": "Organic search engines",
  "Bitiş tarihi, mülkün saat diliminde düne çekildi; gösterilen tarihleri kullanın.":
    "The end date was moved to yesterday in the property’s time zone. Use the displayed dates.",
  "Veri ayrıntıları": "Data details",
  "Özel tarih aralığı": "Custom date range",
  "Tüm trafik · ölçülmüş arama sonuçları":
    "All traffic · measured search results",
  "Bu kontrol yalnızca mülk ayarlarını okur; etiketin veri gönderdiğini doğrulamaz.":
    "This check reads property settings only. It does not verify that the tag sends data.",
  "Rapor sayfaları": "Report pages",
  "En az {count}": "At least {count}",
  "Etiket veri toplamayı doğrulama adımları":
    "Steps to verify tag data collection",
  "Tanımlanmış olay sayısıdır; bu dönemde tetiklenen olay sayısı veya veri toplama kanıtı değildir.":
    "Configured event definitions, not events triggered in this period or proof of collection.",
  "Kontrol edilen ayarlarda eksik bulunmadı":
    "No gaps found in the settings checked",
  "GA4 yönetiminde akış ve anahtar olay ayarlarını aç":
    "Open stream and key event settings in GA4 Admin",
  "Oturum, bir ziyaret dönemidir; aynı kişi birden fazla oturum başlatabilir.":
    "A session is a visit period. The same person can start several sessions.",
  "Kaydedilen işlem sayısıdır; satılan ürün adedi ve benzersiz alıcı sayısı farklıdır.":
    "Recorded transactions. Item quantities and unique buyers are different measures.",
  "Bu satırdaki kullanıcıların toplam etkileşim süresidir; kullanıcı başına ortalama değildir.":
    "Total engagement time for users in this row, not an average per user.",
  "Tekrarlanan görüntülemeler dahildir; benzersiz sayfa veya ziyaretçi sayısı değildir.":
    "Includes repeat views. This is not a unique page or visitor count.",
  "Ürün adedidir; sipariş sayısı değildir ve bu sütunlar bir dönüşüm hunisi oluşturmaz.":
    "Item quantities, not orders. These columns do not form a conversion funnel.",
  "Ürün kapsamlı gelirdir; satın alma geliriyle aynı ölçüm değildir. İadeler negatif olabilir.":
    "Item-scoped revenue differs from purchase revenue. Refunds can be negative.",
  "Mülkün para biriminde satın alma geliri; ürün gelirinden farklıdır.":
    "Purchase revenue in the property currency, distinct from item revenue.",
  "Bu satırdaki kullanıcılar başka satırlarda tekrar sayılabilir; satırları benzersiz kullanıcı toplamı için toplamayın.":
    "Users in this row can recur in other rows. Do not add rows to get unique users.",
  "Trafik veya sonuç ölçümü okunamadı; dönüşüm yorumu yapılamıyor.":
    "Traffic or outcome measurements could not be read. Conversion cannot be assessed.",
  "Bu dönemde {sessions} oturum ve {events} anahtar olay kaydedildi.":
    "{sessions} sessions and {events} key events were recorded in this period.",
  "Anahtar olaylar önceki döneme göre en az yarıya düştü. Bu bir gözlemdir; nedenini belirlemek için olayları ve ölçüm ayarlarını inceleyin.":
    "Key events fell by at least half compared with the previous period. This is an observation. Review events and measurement settings to investigate the cause.",
  "Karşılaştırma yok; önceki değer okunamadı veya veri sınırlı.":
    "No comparison: the previous value could not be read or data is limited.",
  "Önceki dönem sıfır, şimdi {value}.": "Previous period zero; now {value}.",
  "Şu an organik arama motorlarından gelen ziyaretler sayılıyor; tüm trafiğe bakmak sonucu değiştirebilir.":
    "Only organic search engine visits are counted. Viewing all traffic may change the result.",
  "Anahtar olay tanımlı, ancak bu listede tetiklenme görülmedi.":
    "Key events are configured, but none were observed in this list.",
  "Bu listede anahtar olay görülmedi; kurulum doğrulanmadı.":
    "No key events observed in this list; setup has not been verified.",
  "Kullanıcılar kategoriler arasında tekrar sayılabilir; bu değerler benzersiz mülk toplamı değildir.":
    "Users may recur across categories. These counts are not a unique property total.",
  "Toplam etkileşim süresi": "Total engagement time",
  "Diğer ölçümler": "Other metrics",
  "Listelenen {count} satırda": "Across the {count} listed rows",
  "Filtreleme, sıralama ve dışa aktarma bu sayfadaki satırları kapsar.":
    "Filtering, sorting and exports cover rows on this page only.",
  "Birebir sayfa filtresi yalnızca listelenen satırlara uygulanır; diğer sayfalarda da arayın.":
    "The exact page filter applies only to listed rows. Check other report pages too.",
  "Organik arama motorlarından gelen ziyaretleri gösterir.":
    "Shows visits from organic search engines.",
  "Ziyaretçiler hangi konuları aradı? Sonuçları inceleyin; arama sıklığı, eksik içerik kanıtı değildir.":
    "What topics did visitors search for? Inspect the results; search frequency does not prove missing content.",
  "Önemli sayılan olayların tetiklenme sayısıdır; benzersiz müşteri sayısı değildir. Sıfır, kurulumun eksik olduğunu kanıtlamaz.":
    "Triggers of events considered important, not unique customers. Zero does not prove missing setup.",
  "En az bir anahtar olay içeren oturumların payıdır. Olay sayısının oturuma bölünmesiyle hesaplanmaz.":
    "Share of sessions containing at least one key event, not event count divided by sessions.",
  "Bu satırdaki aktif kullanıcılardır; aynı kişi farklı sayfa ve kategorilerde tekrar sayılabilir.":
    "Active users in this row. The same person can recur on other pages and categories.",
  "{dimension} bazında kullanıcı": "Users by {dimension}",
  "En az 30 oturumlu listelenen sayfalarda bir inceleme ipucu: oturum ≥ {sessions}, anahtar olay oranı < {rate} veya sıfır. Bu bir satış kaybı tahmini değildir.":
    "Investigation heuristic for listed pages with at least 30 sessions: sessions ≥ {sessions}, key event rate < {rate} or zero. This is not a lost-sales estimate.",
  "Kaynak / ortam bilgisi olmayan oturumlar var; bağlantı etiketlerini inceleyin. Bu, tek başına ölçüm hatası kanıtı değildir.":
    "Some sessions have no source/medium attribution. Review link tags; this alone does not prove a measurement fault.",
  "Yerel ağ kaynaklı yönlendirmeler kaydedildi; kaynak / ortam satırlarını inceleyin.":
    "Local-network referrals were recorded. Inspect the source/medium rows.",
  "Kaynak / ortam adlarının büyük ve küçük harfli çeşitleri var; kampanya etiketlerini tutarlı kullanın.":
    "Source/medium names have case variants. Use consistent campaign tags.",
  "Bu dönem ve kanalda eşleşen e-ticaret etkinliği ölçülmedi; bu, mağaza olmadığı anlamına gelmez.":
    "No matching ecommerce activity was measured in this period and channel. This does not mean there is no shop.",
  "Bu dönemde ölçülmüş arama sonucu olayı yok; arama ölçüm ayarlarını kontrol edin.":
    "No measured search-result events in this period. Check search measurement settings.",
  "Mülkün saat dilimi değişmiş; bağlantı ayarlarını yenileyip tarihleri yeniden kontrol edin.":
    "The property time zone has changed. Refresh connection settings and check the dates again.",
  "İnceleme kapsamı: {shown} / {total} satır.":
    "Diagnostic coverage: {shown} / {total} rows.",
  "Etkinlik durumu bilinmiyor; rapor sınırlı veya eksik. Dönemi ve ölçüm ayarlarını kontrol edin.":
    "Activity is unknown because the report is limited or incomplete. Check the period and measurement settings.",
  // Translation pass for project, report, saved keyword, settings and help updates.
  "Google Analytics mülkü seçildi": "Google Analytics property selected",
  "Mülk seçim tarihi: {date}": "Property selected on: {date}",
  "Kimlik yöntemi: hizmet hesabı": "Credential method: service account",
  "Kimlik yöntemi: Google OAuth": "Credential method: Google OAuth",
  "Saat dilimi: {timezone} · Para birimi: {currency}":
    "Time zone: {timezone} · Currency: {currency}",
  "Search Console mülkü seçildi": "Search Console property selected",
  "Bağlantı ayarları yenilenemedi. Son kayıt gösteriliyor; erişim durumu bilinmiyor.":
    "Could not refresh connection settings. Showing the last saved record; access status is unknown.",
  "Google izni geçersiz veya süresi dolmuş. İlgili Google hesabını yeniden bağlayın.":
    "Google authorization is invalid or has expired. Reconnect the relevant Google account.",
  "Google bu mülke erişimi reddetti. Seçilen hesabın mülk izinlerini kontrol edin.":
    "Google denied access to this property. Check the selected account's property permissions.",
  "Google API etkin değil. Google Cloud projesinde ilgili API'yi etkinleştirip yeniden deneyin.":
    "The Google API is not enabled. Enable the relevant API in your Google Cloud project and try again.",
  "Google istek sınırına ulaşıldı. Bir süre bekleyin ve Google Cloud kota ekranını kontrol edin.":
    "Google's request limit has been reached. Wait a while and check the Google Cloud quota page.",
  "Google zamanında yanıt vermedi. Bağlantıyı kontrol edip yeniden deneyin; mevcut mülk seçimi korunur.":
    "Google did not respond in time. Check your connection and try again; your current property selection is preserved.",
  "Google bağlantı yanıtı okunamadı; erişiminizin olmadığı sonucu çıkarılamaz. Yeniden deneyin. Sürerse Yardım ekranından tanılama paketini alıp sorunu bildirin.":
    "Could not read the Google connection response; this does not establish that you lack access. Try again. If it persists, download a diagnostics package from Help and report the issue.",
  "Mülk seçimi kayıtlıdır. Veri erişimi bu ayar okumasıyla doğrulanmaz; son veri durumunu ilgili rapordan kontrol edin.":
    "Your property selection is saved. Reading these settings does not verify data access; check the latest data status in the relevant report.",
  "Kurulumun Google kimlik ayarları":
    "Google credential settings for this installation",
  "Google mülk listesi okunamadı. Bu durum erişiminiz olmadığı anlamına gelmez. Son liste korunur; yeniden deneyin veya Yardım tanılamasını kontrol edin.":
    "Could not read the Google property list. This does not mean you lack access. The last list is preserved; try again or check diagnostics in Help.",
  "Mülk seçili": "Property selected",
};
