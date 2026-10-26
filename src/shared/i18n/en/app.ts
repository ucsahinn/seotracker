import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/routes, src/client/components, lib, layout, navigation,
 * tanstack-db, features/projects, reports, saved-keywords.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enApp: Catalog = {
  "seowatcher.io sitesini yeni sekmede aç":
    "Open the seowatcher.io website in a new tab",
  Duyurular: "Announcements",
  "seowatcher ekibinden ürün, bakım ve güvenlik güncellemeleri.":
    "Product, maintenance and security updates from the seowatcher team.",
  "Duyurular şu anda alınamıyor": "Announcements are unavailable right now",
  "Duyurular alınamadı ({status})": "Could not load announcements ({status})",
  "Yanıt gönderilemedi ({status})": "Could not submit your response ({status})",
  "Yanıt gönderilemedi": "Could not submit your response",
  "Bu kurulumdan daha önce yanıt verildi.":
    "This installation has already responded.",
  "Çok hızlı yanıt gönderildi. Biraz sonra yeniden deneyin.":
    "Too many responses. Try again shortly.",
  "Kişisel bilgi paylaşmayın": "Do not include personal information",
  "Adınız veya hesabınız alınmaz. Aynı tarayıcıda saklanan katılımcı anahtarıyla bir kez yanıt verilebilir; bu, kişi başına tek yanıt garantisi değildir. Yanıtınız yöneticiler tarafından görülebilir. Kişisel bilgi yazmayın.":
    "We do not collect your name or account. One response is allowed per saved browser key; this does not guarantee one response per person. Administrators can view your response. Do not include personal information.",
  Yanıtla: "Submit response",
  "Gönderiliyor…": "Sending…",
  "Bağlantınızı kontrol edip yeniden deneyin.":
    "Check your connection and try again.",
  "Şimdilik yeni duyuru yok": "No new announcements yet",
  "Yeni bir duyuru yayımlandığında burada görünecek.":
    "New announcements will appear here when they are published.",
  "Ürün yeniliği": "Product update",
  Bakım: "Maintenance",
  Güvenlik: "Security",
  Yeni: "New",
  // navigation/items.ts (translated where Sidebar renders them)
  Panel: "Dashboard",
  "Sıralama takibi": "Rank tracking",
  Fırsatlar: "Opportunities",
  "Kayıtlı kelimeler": "Saved keywords",
  "Arama performansı": "Search performance",
  "Site denetimi": "Site audit",
  Raporlar: "Reports",
  "Proje bilgisi": "Project context",
  "Ajan kurulumu": "Agent setup",
  Ajan: "Agent",
  "Arama ve site": "Search and site",
  // components/Sidebar.tsx
  "Kenar çubuğunu kapat": "Close sidebar",
  "Ana gezinme": "Main navigation",
  Yardım: "Help",
  Ayarlar: "Settings",
  // components (shared)
  Vazgeç: "Cancel",
  Kopyala: "Copy",
  "Pano kullanılamıyor": "Clipboard is not available",
  "Panoya kopyalanamadı": "Could not copy to the clipboard",
  Kopyalandı: "Copied",
  "Bir şeyler ters gitti. Lütfen yeniden deneyin.":
    "Something went wrong. Please try again.",
  "Yeniden dene": "Try again",
  "Ana sayfa": "Home",
  "Geri dön": "Go back",
  "Sayfa bulunamadı": "Page not found",
  "Bu adreste bir sayfa yok": "There is no page at this address",
  "Adres yanlış yazılmış ya da sayfa kaldırılmış olabilir. Panelden devam edebilir ya da Yardım'a bakabilirsiniz.":
    "The address may be mistyped, or the page may have been removed. You can continue from the Dashboard or check Help.",
  "Panele dön": "Back to Dashboard",
  "{label} hakkında açıklama": "About {label}",
  "Ülke: {country}": "Country: {country}",
  seçilmedi: "not selected",
  "Ülke seçin": "Select a country",
  "Ülke ara": "Search countries",
  "“{query}” ile eşleşen ülke yok": "No country matches “{query}”",
  arttı: "up",
  azaldı: "down",
  Sürüyor: "In progress",
  Tamamlandı: "Done",
  Uyarı: "Warning",
  Hata: "Error",
  bekliyor: "waiting",
  "Bu bölüm yüklenemedi": "This section could not be loaded",
  "Uygulamaya ulaşılamadı. Uygulamanın açık olduğunu kontrol edip yeniden deneyin.":
    "Could not reach the app. Check that it is running and try again.",
  "Tekrar dene": "Try again",
  Yenile: "Refresh",
  Güncellendi: "Updated",
  "Güncellendi: {time}": "Updated {time}",
  Güncelleniyor: "Updating",
  "Giriş gerekli": "Sign-in required",
  "Bu kurulum dışarıdan bir giriş korumasının arkasında. Sayfayı yenileyip tekrar deneyin.":
    "This installation sits behind an external sign-in. Reload the page and try again.",
  "Seçimi kaldır": "Clear selection",
  "{total} {totalLabel}; en büyük pay {lead}, {share}.":
    "{total} {totalLabel}; the largest share is {lead}, {share}.",
  "{total} {totalLabel}.": "{total} {totalLabel}.",
  "Satırı seç: {name}": "Select row: {name}",
  "Satırı seç": "Select row",
  "Tüm satırları seç": "Select all rows",
  "{count} satır panoya kopyalandı": {
    one: "{count} row copied to the clipboard",
    other: "{count} rows copied to the clipboard",
  },
  Kapat: "Close",
  "Google E-Tablolar'da yeni bir dosya açıp yapıştırın.":
    "Open a new file in Google Sheets and paste.",
  "Google E-Tablolar'da yeni dosya aç": "Open a new file in Google Sheets",
  "{label} sütununa göre sırala (şu an artan)":
    "Sort by {label} (currently ascending)",
  "{label} sütununa göre sırala (şu an azalan)":
    "Sort by {label} (currently descending)",
  "{label} sütununa göre sırala": "Sort by {label}",
  seçili: "selected",
  "Toplu işlemler": "Bulk actions",
  "Seçili satırları dışa aktar": "Export selected rows",
  "Dışa aktar": "Export",
  "Dışa aktarma seçenekleri": "Export options",
  "Sayfa başına satır": "Rows per page",
  "Sayfa {page} / {total}": "Page {page} of {total}",
  "Sayfa {page}": "Page {page}",
  "Önceki sayfa": "Previous page",
  "Sonraki sayfa": "Next page",
  "Adresi kopyala": "Copy URL",
  "Adres kopyalandı": "URL copied",
  // lib
  "Oturumunuz doğrulanamadı. Sayfayı yenileyip tekrar deneyin.":
    "Your session could not be verified. Reload the page and try again.",
  "Giriş ayarı eksik. Yardım ekranındaki kurulum belgelerine bakın.":
    "Sign-in is not configured. See the setup guide on the Help screen.",
  "Bu işlem için yetkiniz yok.": "You do not have permission to do this.",
  "Kayıt bulunamadı.": "Record not found.",
  "Şu an çok fazla denetim çalışıyor. Biri bitince yeniden deneyin.":
    "Too many audits are running right now. Try again when one finishes.",
  "Bir denetim en çok {max} sayfa tarayabilir.":
    "An audit can crawl at most {max} pages.",
  "Aynı anda çalışabilecek denetim sayısına ulaştınız. Biri bitene kadar bekleyin ya da çalışan birini silin.":
    "You have reached the number of audits that can run at once. Wait for one to finish, or delete a running one.",
  "Girdiğiniz bilgileri kontrol edip tekrar deneyin.":
    "Check what you entered and try again.",
  "Güvenlik nedeniyle bu adres taranamaz.":
    "This address cannot be crawled for security reasons.",
  "Çok fazla istek gönderildi. Biraz bekleyip tekrar deneyin.":
    "Too many requests. Wait a moment and try again.",
  "Google bu isteği yanıtlamadı. Birazdan tekrar deneyin; sürerse Ayarlar'dan Google bağlantısını kontrol edin.":
    "Google did not respond to this request. Try again shortly; if it persists, check the Google connection in Settings.",
  "Bu, zaten var olan bir kayıtla çakışıyor.":
    "This conflicts with an existing record.",
  "Bir şeyler ters gitti. Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Something went wrong. Download the diagnostics bundle from the Help screen and report the problem.",
  "Dışa aktarılacak veri yok": "There is no data to export",
  "Bir site adresi girin, örneğin example.com.":
    "Enter a site address, for example example.com.",
  "Bu bir site adresine benzemiyor.": "This does not look like a site address.",
  "Geçerli bir alan adı girin, örneğin example.com.":
    "Enter a valid domain, for example example.com.",
  "Bu tarayıcıda pano erişimi yok.": "This browser has no clipboard access.",
  // layout
  "Ana içeriğe geç": "Skip to main content",
  "Kenar çubuğunu aç": "Open sidebar",
  "Ana menü": "Main menu",
  // features/projects
  "Proje yüklenemedi": "Could not load the project",
  "Proje bulunamadı": "Project not found",
  "Bu proje silinmiş ya da arşivlenmiş olabilir.":
    "This project may have been deleted or archived.",
  "Proje güncellendi": "Project updated",
  "Proje güncellenemedi": "Could not update the project",
  "Proje adı gerekli": "A project name is required",
  "Temel bilgiler": "Basics",
  "Site adresi, denetimin nereden başlayacağını belirler. Ülke ve dil, Search Console verisinin hangi pazar için okunacağını belirler. Yanlış seçerseniz sayılar doğru olur ama sizinle ilgisiz kalır.":
    "The site address sets where the audit starts. Country and language set which market Search Console data is read for. Choose wrong and the numbers stay correct but say nothing about you.",
  Ad: "Name",
  "Yalnızca sizin içindir. Proje değiştiricide ve raporların başlığında görünür, Google'a gitmez.":
    "Just for you. It appears in the project switcher and report titles, and is never sent to Google.",
  "Alan adı": "Domain",
  "(isteğe bağlı)": "(optional)",
  "Denetim bu adresten başlar, Search Console mülkü de bununla eşleştirilir. https:// olmadan yazın, örneğin example.com.":
    "The audit starts from this address, and the Search Console property is matched to it. Enter it without https://, for example example.com.",
  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır.":
    "Keywords you save are stored for this country and language.",
  "Kaydediliyor…": "Saving…",
  "Değişiklikleri kaydet": "Save changes",
  "Proje arşivlendi": "Project archived",
  "Proje arşivlenemedi": "Could not archive the project",
  "Projeyi arşivle": "Archive project",
  "Arşivlenen proje kenar çubuğundan kalkar ama hiçbir verisi silinmez. Denetimler, kelimeler ve raporlar durur, geri alınca aynen döner.":
    "An archived project leaves the sidebar, but none of its data is deleted. Audits, keywords and reports pause, and come back unchanged when you restore it.",
  "{name} projesini arşivlerseniz çalışma alanınızdan kaldırılır. Daha sonra Projeler sayfasından geri alabilirsiniz.":
    "Archiving {name} removes it from your workspace. You can restore it later from the Projects page.",
  "Evet, projeyi arşivle": "Yes, archive the project",
  "Bu projeyi arşivleyerek çalışma alanınızdan kaldırabilirsiniz.":
    "Archive this project to remove it from your workspace.",
  "Tek projenizi arşivleyemezsiniz.": "You cannot archive your only project.",
  "Proje değiştir": "Switch project",
  "Proje ayarları": "Project settings",
  "Proje ara…": "Search projects…",
  "Projeleri filtrele": "Filter projects",
  Projeler: "Projects",
  "“{query}” ile eşleşen proje yok": "No project matches “{query}”",
  "Yeni proje": "New project",
  "Projeleri yönet": "Manage projects",
  "Projeler yüklenemedi.": "Could not load projects.",
  "Projeler yükleniyor": "Loading projects",
  "Proje seçin": "Select a project",
  "Proje oluşturuldu": "Project created",
  "Proje oluşturulamadı": "Could not create the project",
  "Projeyi oluşturduktan sonra Search Console'u bağlayın; arama ve sıralama verileri oradan gelir.":
    "After creating the project, connect Search Console; search and ranking data come from there.",
  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır. Sonradan proje ayarlarından değiştirebilirsiniz.":
    "Keywords you save are stored for this country and language. You can change this later in project settings.",
  "Proje oluştur": "Create project",
  Ülke: "Country",
  Dil: "Language",
  // features/projects/project-context
  "Proje tanımı": "Project definition",
  "{count} bölümün hepsi dolu.": {
    one: "The {count} section is filled in.",
    other: "All {count} sections are filled in.",
  },
  "{total} bölümün {filled} tanesi dolu. Boş olan: {missing}.":
    "{filled} of {total} sections filled in. Empty: {missing}.",
  "Gözden geçir": "Review",
  Doldur: "Fill in",
  Rakipler: "Competitors",
  "{count} rakip kayıtlı.": {
    one: "{count} competitor saved.",
    other: "{count} competitors saved.",
  },
  "Rakip yok. Ajan, kimle yarıştığınızı bilmeden öneri yapar.":
    "No competitors. The agent makes suggestions without knowing who you compete with.",
  "Rakip ekle": "Add competitor",
  "Önemli sayfalar": "Key pages",
  "{count} önemli sayfa kayıtlı.": {
    one: "{count} key page saved.",
    other: "{count} key pages saved.",
  },
  "Önemli sayfa işaretlenmemiş. Hangi sayfaların kazanç getirdiği belli değil.":
    "No key pages marked. It is not clear which pages bring in revenue.",
  "Sayfa ekle": "Add page",
  "Bağlı. Tıklama, gösterim ve sıra verisi okunuyor.":
    "Connected. Clicks, impressions and position data are being read.",
  "Bağlı değil. Sıralama, arama performansı ve fırsatlar bu bağlantıya dayanır.":
    "Not connected. Rank tracking, search performance and opportunities depend on this connection.",
  Bağla: "Connect",
  "Bağlı. Organik oturumlar okunuyor.":
    "Connected. Organic sessions are being read.",
  "Bağlı değil. Ziyaret ve dönüşüm verisi olmadan trafik düşüşleri yorumlanamaz.":
    "Not connected. Without visit and conversion data, traffic drops cannot be interpreted.",
  "PageSpeed anahtarı": "PageSpeed key",
  "Anahtar tanımlı. Hız ölçümleri kota sorunu olmadan çalışır.":
    "Key set. Speed measurements run without quota problems.",
  "Anahtar yok. Hız ölçümü Google'ın ortak kotasına takılıyor ve çoğu zaman yarıda kalır.":
    "No key. Speed measurement hits Google's shared quota and often stops partway.",
  "Anahtar gir": "Enter key",
  // project context section labels (src/types/schemas/projectContext.ts) and sectionCopy.ts
  "İşin özeti": "Business overview",
  "Şu anki hedef": "Current goal",
  Konumlandırma: "Positioning",
  "Yazım tercihleri": "Writing preferences",
  "Ne satıyorsunuz, kim alıyor, nerede.":
    "What you sell, who buys it, and where.",
  "Şu anda neyin peşindesiniz ve ne zamana kadar.":
    "What you are after right now, and by when.",
  "Biri neden alternatifler yerine sizi seçsin.":
    "Why someone should choose you over the alternatives.",
  "Üslup, kullanılmayacak kelimeler, girilmeyecek konular.":
    "Tone, words to avoid, topics to stay away from.",
  "örn. Bağımsız restoranlar için rezervasyon yazılımı. Alıcılar pazarlamacı değil, işletme sahipleri.":
    "e.g. Booking software for independent restaurants. The buyers are owners, not marketers.",
  "örn. Dördüncü çeyreğe kadar organik üyelikleri ikiye katlamak. Karşılaştırma sayfaları şu anki öncelik.":
    "e.g. Double organic sign-ups by Q4. Comparison pages are the current priority.",
  "örn. Bir öğleden sonrada kurulan tek rezervasyon aracı. Mevcut rakiplerden ucuz, kendin yap çözümlerden basit.":
    "e.g. The only booking tool you can set up in an afternoon. Cheaper than incumbents, simpler than DIY.",
  "örn. Sade ve doğrudan, abartı yok. “Kusursuz” ya da “devrim niteliğinde” yazmayın. Rakip fiyatlarına girmeyin.":
    "e.g. Plain and direct, no hype. Do not write “seamless” or “revolutionary”. Do not get into competitor pricing.",
  "Ajanınızın bu proje hakkında bildikleri. Ajan işe başlamadan önce burayı okur, öğrendiklerini buraya yazar. Yanlış bir şey görürseniz düzeltin.":
    "What your agent knows about this project. The agent reads this before it starts and writes what it learns here. If you see something wrong, fix it.",
  "Proje bilgisi yüklenemedi": "Could not load the project context",
  "Henüz boş. Kendiniz doldurabilir ya da ajanınıza sitenizden taslak çıkarttırıp onaylayabilirsiniz.":
    "Empty for now. Fill it in yourself, or have your agent draft it from your site and approve it.",
  Boş: "Empty",
  "{count} bölüm kaydedilmedi": {
    one: "{count} section not saved",
    other: "{count} sections not saved",
  },
  "Özel bölümler": "Custom sections",
  "Bir ajanın not aldığı, yukarıdaki bölümlere sığmayan her şey.":
    "Anything an agent noted that does not fit the sections above.",
  "Burada henüz bir şey yok. Ajanlar başka yere sığmayan önemli bir şey öğrendiklerinde buraya bir bölüm ekler.":
    "Nothing here yet. When agents learn something important that fits nowhere else, they add a section here.",
  "{title} bölümünü düzenle": "Edit section {title}",
  "{title} bölümünü sil": "Delete section {title}",
  "Bölüm başlığı": "Section title",
  "Bölüm içeriği": "Section content",
  "Merkez sayfa": "Hub page",
  "Destek sayfası": "Supporting page",
  "Dönüşüm sayfası": "Conversion page",
  Diğer: "Other",
  "Sitenin en önemli sayfaları. Tam liste olması gerekmez.":
    "The site's most important pages. It does not need to be a full list.",
  "Henüz önemli sayfa yok. Sıralamada olması gereken birkaç sayfayı ekleyin, ya da bir ajan son site denetiminizden bunları önersin.":
    "No key pages yet. Add a few pages that should rank, or have an agent suggest them from your latest site audit.",
  "Hedef: {topic}": "Target: {topic}",
  "{url} sayfasını düzenle": "Edit page {url}",
  "{url} sayfasını kaldır": "Remove page {url}",
  "Sayfa adresi": "Page URL",
  "Sayfa rolü": "Page role",
  "Hedef konu (isteğe bağlı)": "Target topic (optional)",
  "Hedef konu": "Target topic",
  "Notlar (isteğe bağlı)": "Notes (optional)",
  "Sayfa notları": "Page notes",
  "Kendinizi kıyasladığınız siteler.": "Sites you compare yourself against.",
  "Henüz rakip yok. Rekabet ettiğiniz siteleri ekleyin, ya da bağladığınız ajandan bunları bulup buraya kaydetmesini isteyin.":
    "No competitors yet. Add the sites you compete with, or ask your connected agent to find them and save them here.",
  "{domain} rakibini düzenle": "Edit competitor {domain}",
  "{domain} rakibini kaldır": "Remove competitor {domain}",
  "Rakip alan adı": "Competitor domain",
  "Ad (isteğe bağlı)": "Name (optional)",
  "Rakip adı": "Competitor name",
  "Neden önemliler? Örn. her karşılaştırma aramasında önde (isteğe bağlı)":
    "Why do they matter? E.g. ahead in every comparison search (optional)",
  "Rakip notları": "Competitor notes",
  "Proje bilgisi güncellendi": "Project context updated",
  "Değişiklikleriniz kaydedilemedi": "Could not save your changes",
  siz: "you",
  ajan: "the agent",
  "yapay zeka istemciniz": "your AI client",
  "{author} güncelledi · {time}": "Updated by {author} · {time}",
  "{author} ekledi": "Added by {author}",
  Kaldır: "Remove",
  Kaydet: "Save",
  "Ajanınıza doldurtabilirsiniz": "Let your agent fill it in",
  "Ajanınıza gözden geçirtin": "Have your agent review it",
  "İstemi kopyalayıp Claude Code ya da Codex'e yapıştırın. Ajan sitenizi ve ölçümleri okuyup taslak hazırlar; siz onaylamadan hiçbir şey kaydetmez ve sitedeki metinleri talimat saymaz.":
    "Copy the prompt and paste it into Claude Code or Codex. The agent reads your site and metrics and prepares a draft; it saves nothing until you approve, and does not treat text on the site as instructions.",
  "İstemi kopyalayıp ajana yapıştırın. Yazılı olanı sitenin bugünkü haliyle karşılaştırır, yalnızca yanlış olanı düzeltir ve kaydetmeden önce size sorar; sitedeki metinleri talimat saymaz.":
    "Copy the prompt and paste it into your agent. It compares what is written with the site as it is today, fixes only what is wrong, and asks you before saving; it does not treat text on the site as instructions.",
  "İstemi kopyala": "Copy prompt",
  "İstem kopyalandı": "Prompt copied",
  "Araştırma günlüğü": "Research log",
  "Neye bakıldığının kaydı. Aynı araştırma iki kez yapılmasın diye tutulur.":
    "A record of what has been looked into, kept so the same research is not done twice.",
  "Henüz kayıt yok. Bağladığınız ajan bir araştırma yaptıkça buraya yazar.":
    "No entries yet. Your connected agent writes here as it does research.",
  "{date} tarihli kaydı sil": "Delete the entry from {date}",
  "Kurulum durumu": "Setup status",
  "Ajanların ve uygulamanın düzgün çalışması için gerekenler. Eksik satırın yanındaki düğme sizi düzeltebileceğiniz yere götürür.":
    "What agents and the app need to work properly. The button beside a missing item takes you to where you can fix it.",
  "{done} / {total} tamam": "{done} of {total} done",
  Tamam: "Done",
  Eksik: "Missing",
  "Kontrol ediliyor": "Checking",
  Denetlenemedi: "Could not check",
  "Durum okunuyor…": "Reading status…",
  "Durum okunamadı. Yeniden deneyin.": "Could not read the status. Try again.",
  // features/reports
  "Şablona bir ad verin.": "Give the template a name.",
  "Bu şablonun ne zaman kullanılacağını tek cümleyle yazın.":
    "Write in one sentence when this template should be used.",
  "Raporun kime yazıldığını ve hangi bölümlerden oluştuğunu yazın.":
    "Write who the report is for and which sections it has.",
  "Kitle: müşterinin pazarlama sorumlusu, teknik biri değil.\nBölümler, sırayla: Neredeyiz / Bu ay ne yaptık / Ne değişti / Sırada ne var.\nÜslup: sade ve kendinden emin. Her SEO terimini açıkla. Ünlem kullanma.\nİmza: Acme SEO\nVurgu rengi: #1C4ED8":
    "Audience: the client's marketing lead, not a technical person.\nSections, in order: Where we are / What we did this month / What changed / What is next.\nTone: plain and confident. Explain every SEO term. No exclamation marks.\nSignature: Acme SEO\nAccent color: #1C4ED8",
  "Şablon oluşturuldu": "Template created",
  "Şablon kaydedildi": "Template saved",
  "Şablon kaydedilemedi": "Could not save the template",
  "Şablonu düzenle": "Edit template",
  "Yeni şablon": "New template",
  "Aylık müşteri değerlendirmesi": "Monthly client review",
  Açıklama: "Description",
  "Ne zaman kullanılacağını anlatan tek cümle. Bir ajan kararını buna bakarak verir.":
    "One sentence on when to use it. An agent decides based on this.",
  "Sürekli çalıştığımız müşterilere gönderdiğimiz aylık güncelleme.":
    "The monthly update we send to our ongoing clients.",
  Yönerge: "Instructions",
  "Projenin geneline ait marka dili Proje bilgisi › Yazım tercihleri altında tutulur.":
    "Brand voice for the whole project is kept under Project context › Writing preferences.",
  "Şablon oluştur": "Create template",
  Rapor: "Reports",
  "Son 7 gün": "Last 7 days",
  "Bu sürede güncellenen": "Updated in this period",
  "Son güncelleme": "Last update",
  "{date} · raporu aç": "{date} · open report",
  "Türe göre raporlar": "Reports by type",
  "Bir türe tıklayarak listeyi o türdeki raporlarla sınırlayın.":
    "Click a type to limit the list to reports of that type.",
  rapor: "reports",
  Belirtilmemiş: "Unspecified",
  "Site denetimi raporu": "Site audit report",
  "SEO denetimi": "SEO audit",
  "Dönem karşılaştırması": "Period comparison",
  "Trafik düşüşü incelemesi": "Traffic drop review",
  "SEO raporu": "SEO report",
  "Koçluk notu": "Coaching note",
  "Proje kurulumu": "Project setup",
  "Diğer türler": "Other types",
  Tümü: "All",
  "Şablonla yazılan": "Written with a template",
  "Beceriyle yazılan": "Written with a skill",
  "Henüz rapor yok": "No reports yet",
  "Rapor iki yoldan alınır: ajanınıza yazdırın ya da Site denetimi ekranından indirin.":
    "There are two ways to get a report: have your agent write one, or download one from the Site audit screen.",
  "Rapor komutunu kopyala": "Copy report prompt",
  "Komut kopyalandı. Ajanınıza yapıştırın":
    "Prompt copied. Paste it into your agent",
  "Ajan kurulumunu aç": "Open Agent setup",
  Filtre: "Filter",
  "Raporlarda ara": "Search reports",
  "Aramanıza uyan rapor yok": "No reports match your search",
  "Aramayı, filtreyi ya da seçili türü kaldırarak tüm raporları görün.":
    "Clear the search, the filter or the selected type to see all reports.",
  "Filtreleri temizle": "Clear filters",
  Tür: "Type",
  Oluşturuldu: "Created",
  Boyut: "Size",
  İşlemler: "Actions",
  "{title} için işlemler": "Actions for {title}",
  Sil: "Delete",
  "En son {count} rapor gösteriliyor.": {
    one: "Showing the latest {count} report.",
    other: "Showing the latest {count} reports.",
  },
  "Henüz şablon yok": "No templates yet",
  "Şablon olmadan da rapor alabilirsiniz. Her seferinde aynı biçimde rapor istiyorsanız (örneğin yöneticiye aylık özet) sağ üstteki düğmeyle ilk şablonunuzu oluşturun.":
    "You can get reports without a template. If you want the same format every time (for example a monthly summary for your manager), create your first template with the button at the top right.",
  "{count} şablon": { one: "{count} template", other: "{count} templates" },
  "son güncelleme": "last updated",
  "Şablonlarda ara": "Search templates",
  "{name} şablonunu düzenle": "Edit template {name}",
  Düzenle: "Edit",
  "Aramanıza uyan şablon yok": "No templates match your search",
  "Başka bir sözcükle deneyin.": "Try a different word.",
  "Nasıl çalışır?": "How does it work?",
  "Ajanın yazdığı raporlar": "Reports your agent writes",
  "Claude Code ya da Codex projenizi inceler ve raporu buraya kaydeder. “Rapor komutunu kopyala” ajanınıza yapıştıracağınız komutu kopyalar.":
    "Claude Code or Codex reviews your project and saves the report here. “Copy report prompt” copies the prompt you paste into your agent.",
  "Site denetimi ekranındaki “Raporu indir” hem bilgisayarınıza indirir hem burada saklar. Ajan gerekmez.":
    "“Download report” on the Site audit screen both downloads it to your computer and keeps it here. No agent needed.",
  "Rapor önizlemesi: {title}": "Report preview: {title}",
  "HTML olarak indir": "Download as HTML",
  "Tam ekrandan çık": "Exit full screen",
  İndir: "Download",
  "Rapor indirildi": "Report downloaded",
  "Rapor indirilemedi.": "Could not download the report.",
  "Rapor silindi": "Report deleted",
  "Rapor silinemedi": "Could not delete the report",
  "“{title}” silinsin mi?": "Delete “{title}”?",
  "Bu geri alınamaz.": "This cannot be undone.",
  "Raporu sil": "Delete report",
  // features/saved-keywords
  "Sıra bilgisi yüklenemedi": "Could not load position data",
  "Bilinmiyor (arşiv kesildi)": "Unknown (archive cut off)",
  "Verisi yok": "No data",
  "Okunan arşiv kesildiği için bu kelimelerin sırası bilinmiyor; Search Console'da sırası olabilir.":
    "The archive read was cut off, so these keywords' positions are unknown; they may have a position in Search Console.",
  "Search Console arşivinde bu kelimeyle eşleşen sorgu olmayanlar.":
    "Keywords with no matching query in the Search Console archive.",
  "Sıra {band}": "Position {band}",
  "{total} kelimenin {ranked} tanesi Search Console arşivinde var; sıralar son {days} günün ortalaması.":
    "{ranked} of {total} keywords are in the Search Console archive; positions are the average of the last {days} days.",
  "Arşivden en çok {limit} sorgu okunuyor; bu yüzden bazı kelimelerin sırası eksik görünebilir.":
    "At most {limit} queries are read from the archive, so some keywords may appear without a position.",
  "Kelimelerinizin sırası henüz yok": "Your keywords have no positions yet",
  "Sıralar, Search Console'un hangi kelimeyle arandığınızı paylaşmasına bağlı. Az ziyaretçisi olan sitelerde bu normaldir; veri gelince sıralar kendiliğinden dolar. Toplam rakamlara {searchPerformance}'ndan, bağlantı durumuna {integrations} bakabilirsiniz.":
    "Positions depend on Search Console sharing which keywords people searched to find you. This is normal for sites with few visitors; positions fill in on their own once data arrives. See the totals in {searchPerformance}, and the connection status in the {integrations}.",
  "Bağlantılar sekmesinden": "Connections tab",
  "Sıraya göre hızlı filtreler": "Quick filters by position",
  "İlk 10": "Top 10",
  "Ortalama sırası 10 veya daha iyi olan kelimeler; yani Google'ın ilk sayfası.":
    "Keywords with an average position of 10 or better; that is, Google's first page.",
  "Ortalama sırası 11 ile 20 arasında olanlar, yani ikinci sayfadakiler. Küçük bir iyileştirme ilk sayfaya taşıyabilir.":
    "Keywords with an average position between 11 and 20, that is, on the second page. A small improvement can move them to the first page.",
  "Sıra dağılımı": "Position distribution",
  "Bir gruba tıklayınca tablo yalnızca o gruptaki kelimeleri gösterir.":
    "Click a group to show only that group's keywords in the table.",
  kelime: "keywords",
  Bilgi: "Info",
  Ticari: "Commercial",
  İşlem: "Transactional",
  Gezinme: "Navigational",
  "Bilgi amaçlı": "Informational",
  "Ticari araştırma": "Commercial research",
  "İşlem odaklı": "Transactional",
  Yönlendirici: "Navigational",
  Bilinmiyor: "Unknown",
  "Arayan kişi bilgi ya da cevap arıyor. Eğitici içerikler, rehberler ve sade açıklayıcı yazılar için uygun.":
    "The searcher wants information or an answer. Suits educational content, guides and plain explainers.",
  "Arayan kişi satın almadan önce seçenekleri inceliyor. Karşılaştırma, alternatif ve ürün sayfaları bu aramaya uyar.":
    "The searcher is weighing options before buying. Comparison, alternatives and product pages fit this search.",
  "Arayan kişi bir eylemi, çoğunlukla satın almayı tamamlamaya hazır. Net teklifleri, fiyatları, denemeleri ve dönüşüm yollarını öne çıkarın.":
    "The searcher is ready to act, usually to buy. Put clear offers, prices, trials and conversion paths up front.",
  "Arayan kişi belirli bir siteyi, markayı ya da sayfayı arıyor. Bu aramalarda beklenen siteyle birebir eşleşen sayfa öne çıkar.":
    "The searcher is looking for a specific site, brand or page. In these searches the page that matches the expected site exactly comes first.",
  "Bu kelime için arama amacı bilinmiyor; içerik kararlarınızı yalnızca bu rozete bakarak vermeyin.":
    "The search intent for this keyword is unknown; do not base content decisions on this badge alone.",
  "Arama amacı bilinmiyor": "Search intent unknown",
  "{intent} arama amacı": "{intent} search intent",
  "Etiketleri güncelle": "Update tags",
  "Seçili {count} kelimeye etiket ekleyin ya da bunlardan etiket kaldırın.": {
    one: "Add tags to the {count} selected keyword, or remove tags from it.",
    other:
      "Add tags to the {count} selected keywords, or remove tags from them.",
  },
  "Etiket ekle": "Add tags",
  "Etiket kaldır": "Remove tags",
  "Seçimden çıkar": "Remove from selection",
  "Etiket ara": "Search tags",
  "Ara ya da oluştur…": "Search or create…",
  "Oluştur {name}": "Create {name}",
  "Henüz etiket yok. Yukarıya bir ad yazıp oluşturun.":
    "No tags yet. Type a name above to create one.",
  "Bu aramaya uyan etiket yok.": "No tags match this search.",
  "Seçili kelimelerde kaldırılacak etiket yok.":
    "The selected keywords have no tags to remove.",
  Kaldırılacak: "Will be removed",
  "Kaldırmak için tıklayın": "Click to remove",
  "Seçili kelimelerden {count} etiket kaldırılacak.": {
    one: "{count} tag will be removed from the selected keywords.",
    other: "{count} tags will be removed from the selected keywords.",
  },
  Uygula: "Apply",
  Kelime: "Keyword",
  "Arama performansında göster": "Show in Search performance",
  "Ortalama sıra": "Average position",
  "Search Console bu kelime için sıra kaydetmemiş":
    "Search Console has recorded no position for this keyword",
  Amaç: "Intent",
  Etiketler: "Tags",
  Eklenme: "Added",
  "Kelimeyi kopyala": "Copy keyword",
  "Kelime kopyalandı": "Keyword copied",
  "Arama performansında ara": "Search in Search performance",
  "Kelimeyi sil": "Delete keyword",
  "Bu filtrelere uyan kelime yok": "No keywords match these filters",
  "Filtreleri gevşetin ya da temizleyin.": "Loosen or clear the filters.",
  "Henüz kayıtlı kelime yok": "No saved keywords yet",
  "Arama performansı ekranında bir ya da birkaç sorguyu seçip “Kelime olarak kaydet” deyin. Kaydettikleriniz burada etiketlenir, sıralamayla birlikte listelenir ve dışa aktarılır.":
    "On the Search performance screen, select one or more queries and choose “Save as keyword”. What you save is tagged here, listed with its position, and can be exported.",
  "Search Console'u bağla": "Connect Search Console",
  "Sorgulara göz at": "Browse queries",
  "Sonuçları filtrele": "Filter results",
  "{count} etkin": "{count} active",
  "Tümünü temizle": "Clear all",
  İçeren: "Contains",
  "örn. denetim": "e.g. audit",
  İçermeyen: "Does not contain",
  "örn. iş ilanı": "e.g. job listing",
  "{term} terimini kaldır": "Remove term {term}",
  Gri: "Gray",
  Pembe: "Pink",
  Turuncu: "Orange",
  "Fıstık yeşili": "Lime",
  Yeşil: "Green",
  Mavi: "Blue",
  Mor: "Purple",
  Fuşya: "Fuchsia",
  "Yeniden adlandır": "Rename",
  Renk: "Color",
  "Etiket kalıcı olarak silinir. Kelimelere dokunulmaz.":
    "The tag is deleted permanently. Keywords are not affected.",
  "Etiketi sil": "Delete tag",
  "Filtreyi kaldır": "Clear filter",
  Temizle: "Clear",
  "Etiket ara…": "Search tags…",
  "Aramayı temizle": "Clear search",
  "Henüz etiket yok. Kelimeleri seçip etiket ekleyin.":
    "No tags yet. Select keywords and add tags.",
  "{count} seçili": "{count} selected",
  "{name} etiketini yönet": "Manage tag {name}",
  "Etiket güncellendi": "Tag updated",
  "Etiket artık yok. Liste yenilendi.":
    "The tag no longer exists. The list was refreshed.",
  "Etiket güncellenemedi": "Could not update the tag",
  "Etiket zaten silinmiş. Liste yenilendi.":
    "The tag was already deleted. The list was refreshed.",
  "Etiket silindi": "Tag deleted",
  "Etiket silinemedi": "Could not delete the tag",
  "Dışa aktarılacak kelime yok": "There are no keywords to export",
  "CSV dışa aktarılamadı": "Could not export CSV",
  "E-Tablolar'a aktarılamadı": "Could not export to Google Sheets",
  "{count} kelime kaldırıldı": {
    one: "{count} keyword removed",
    other: "{count} keywords removed",
  },
  "Kelimeler kaldırılamadı": "Could not remove the keywords",
  "{count} kelimenin etiketleri güncellendi": {
    one: "Tags updated for {count} keyword",
    other: "Tags updated for {count} keywords",
  },
  "Etiketler güncellenemedi": "Could not update the tags",
  "Kelime silinsin mi?": "Delete keyword?",
  "Kelimeler silinsin mi?": "Delete keywords?",
  "{keyword} kalıcı olarak silinir. İsterseniz Arama performansından yeniden kaydedebilirsiniz.":
    "{keyword} will be deleted permanently. You can save it again from Search performance.",
  "Kayıtlı {count} kelime kalıcı olarak silinecek. Bu geri alınamaz.": {
    one: "{count} saved keyword will be deleted permanently. This cannot be undone.",
    other:
      "{count} saved keywords will be deleted permanently. This cannot be undone.",
  },
  "Kelimeler silinemedi. Tekrar deneyin.":
    "Could not delete the keywords. Try again.",
  "{count} kelimeyi sil": {
    one: "Delete {count} keyword",
    other: "Delete {count} keywords",
  },
  "{count} kayıtlı kelime": {
    one: "{count} saved keyword",
    other: "{count} saved keywords",
  },
  "Etiketleyin, Search Console'daki ortalama sıralarına bakın, CSV ya da E-Tablolar olarak dışa aktarın.":
    "Tag them, see their average position in Search Console, and export to CSV or Google Sheets.",
  "E-Tablolar'a aktar": "Export to Sheets",
  "CSV indir": "Download CSV",
  "Tablo filtrelerini aç/kapat": "Show or hide table filters",
  Filtreler: "Filters",
  Etiketle: "Tag",
  "Kelimeleri kopyala": "Copy keywords",
  // routes/_app/ai.tsx
  "Nerede durduğunuzu anlatır ve sıradaki adımı seçer.":
    "Explains where you stand and picks the next step.",
  "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı bir kez kaydeder; diğer beceriler bunu hep bilir.":
    "Saves your goals, competitors and key pages once; the other skills always know them.",
  "Sitenizi denetler ve bu hafta yapılacak tek bir işi öne çıkarır.":
    "Audits your site and puts forward the one thing to do this week.",
  "Bu dönemi öncekiyle karşılaştırır. Ne değişti, ne zaman değişti, önemli mi, söyler.":
    "Compares this period with the last one. Says what changed, when it changed, and whether it matters.",
  "Trafik düştüyse önce şuna bakar. Düşüş gerçek mi, nerede ve ne zaman oldu?":
    "If traffic dropped, it checks this first. Is the drop real, where did it happen, and when?",
  "Yukarıdakilerden birinin sonucunu Raporlar sayfasına kaydeder.":
    "Saves the result of any of the above to the Reports page.",
  "Ajanınızı kurun": "Set up your agent",
  Beceriler: "Skills",
  "seowatcher'ı yapay zeka ajanınızla kullanabilirsiniz. Bir kez bağlayın, sonra ne istiyorsanız ona sorun.":
    "You can use seowatcher with your AI agent. Connect it once, then ask it whatever you need.",
  "Durum okunamadı": "Could not read the status",
  Bağlandı: "Connected",
  "{client} · son çağrı {time}": "{client} · last call {time}",
  "Bir ajan": "An agent",
  "Henüz bağlanmadı": "Not connected yet",
  "Kurulum adımları yükleniyor": "Loading setup steps",
  "Becerileri güncelleyin": "Update the skills",
  "Ajanınızı daha önce kurduysanız güncelleme komutunu yapıştırın. Beceriler yenilenir, bağlantı ayarlarınız ve kendi düzenlemeleriniz olduğu gibi kalır.":
    "If you have set up your agent before, paste the update prompt. The skills are refreshed; your connection settings and your own edits stay as they are.",
  "Güncelleme komutunu kopyala": "Copy update command",
  "Güncelleme komutu kopyalandı": "Update command copied",
  "Bu kurulum Cloudflare Access arkasında. Ajanın bağlanabilmesi için Access uygulamanızda Managed OAuth'u açın.":
    "This installation is behind Cloudflare Access. Turn on Managed OAuth in your Access application so the agent can connect.",
  "Elle bağlamak istiyorsanız": "If you want to connect manually",
  "Bu kurulumun MCP adresi:": "This installation's MCP address:",
  "MCP adresi kopyalandı": "MCP address copied",
  "Bu adres {token} ile, yani bir parola (token) ile korunuyor. Aracınıza şu başlığı ekletin:":
    "This address is protected by {token}, a password (token). Have your tool send this header:",
  "Windows paketinde parola bir dosyadır (görev çubuğu menüsünde {menu}):":
    "In the Windows package the password is a file ({menu} in the taskbar menu):",
  "Veri klasörünü aç": "Open data folder",
  "Panoya kopyalamak için PowerShell (değer ekrana yazılmaz):":
    "To copy it to the clipboard, in PowerShell (the value is not printed):",
  "Değeri sohbete ya da ekrana yazmayın. Yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "Do not type the value into a chat or onto the screen. Clear the clipboard after pasting (Win+V, Clear all).",
  "Kendiniz belirlemediyseniz uygulama ilk açılışta bir parola üretir. Okumak için (PowerShell ve cmd):":
    "If you did not set one yourself, the app generates a password on first start. To read it (PowerShell and cmd):",
  "Windows'ta Git Bash için komutun başına {prefix} ekleyin, yoksa parola boş çıkar (PowerShell'de bu önek hata verir).":
    "In Git Bash on Windows, put {prefix} in front of the command, or the password comes out empty (in PowerShell this prefix is an error).",
  "Bu adres parola istemez. Bilgisayarınızdaki başka bir programın araçları çalıştırmasını önlemek için {token} adıyla bir parola ayarlayın ve aracınıza şu başlığı ekletin:":
    "This address asks for no password. To stop other programs on your computer from running the tools, set a password named {token} and have your tool send this header:",
  "Kurulum komutu bunları kurar. Kısa cevap yerine tam bir çıktı istiyorsanız beceriyi adıyla çağırın.":
    "The setup prompt installs these. If you want a full output instead of a short answer, call the skill by name.",
  "{name} adını kopyala": "Copy the name {name}",
  "Beceri adı kopyalandı": "Skill name copied",
  // routes/_app/support.tsx
  "Bir şey ters giderse önce aşağıdaki duruma bakın. Çözüm çoğu zaman satırın yanındaki düğmededir.":
    "If something goes wrong, check the status below first. The fix is usually the button beside the line.",
  Günlükler: "Logs",
  "Konteyner günlüğü": "Container log",
  "Kurulum türü anlaşılıyor. Günlüklerin yeri birazdan burada görünür.":
    "Detecting the installation type. Where the logs are will appear here shortly.",
  "Görev çubuğundaki seowatcher simgesine sağ tıklayıp {menu} deyin. Açılış kontrolleri {launcherLog}, sunucu satırları {serverLog} dosyasındadır.":
    "Right-click the seowatcher icon in the taskbar and choose {menu}. Startup checks are in {launcherLog}, server lines in {serverLog}.",
  "Günlükleri aç": "Open logs",
  "Açılış kontrolleri uygulama başlamadan önce yazılır. Komut:":
    "Startup checks are written before the app starts. Command:",
  "Komutu kopyala": "Copy command",
  "Komut kopyalandı": "Command copied",
  "Sağlık adresi:": "Health endpoint:",
  "{link} hangi bağlantıların ayarlı olduğunu ve veritabanının yanıt verip vermediğini gösterir.":
    "{link} shows which connections are configured and whether the database responds.",
  "Kurulum belgeleri": "Setup docs",
  "Windows paketi, Docker, Search Console, Analytics ve PageSpeed kurulumu kılavuzda anlatılıyor. Üstteki “{button}” düğmesi sizi oraya götürür.":
    "The guide covers setting up the Windows package, Docker, Search Console, Analytics and PageSpeed. The “{button}” button at the top takes you there.",
  "Kılavuzu aç": "Open the guide",
  "Sorun bildirmek için": "To report a problem",
  "Üstteki “{download}” düğmesi tek bir arşiv indirir. İçinde sürüm, kurulum kontrolleri, tablo büyüklükleri, bağlı Google mülkleri, son denetimlerin durumu ve bu sekmede yakalanan tarayıcı hataları var. Gizli değer yok. Parolalar ve anahtarlar toplanmaz, yalnızca ayarlı olup olmadıkları yazılır. Kısa bir not yeterliyse durum panelindeki “{summary}” düğmesi aynı özeti metin olarak verir. Arşivdeki {readme} içindekileri ve sizi tanımlayan şeyleri satır satır anlatır.":
    "The “{download}” button at the top downloads a single archive. It contains the version, setup checks, table sizes, connected Google properties, the status of recent audits and browser errors caught in this tab. No secret values: passwords and keys are not collected, only whether they are set. If a short note is enough, the “{summary}” button in the status panel gives the same summary as text. The {readme} in the archive explains, line by line, what it contains and what could identify you.",
  "Tanılama paketi indir": "Download diagnostics bundle",
  "Özeti kopyala": "Copy summary",
  "Proje GitHub'da": "Project on GitHub",
  // routes/_app/projects.tsx
  "Her projenin kendi Search Console bağlantısı, arama verisi ve site denetimleri vardır.":
    "Each project has its own Search Console connection, search data and site audits.",
  "Henüz proje yok": "No projects yet",
  "Bir proje oluşturun, sonra sitesini ekleyin.":
    "Create a project, then add its site.",
  Etkin: "Active",
  "Site eklenmedi": "No site added",
  "Site ekle": "Add site",
  "Proje geri alındı": "Project restored",
  "Proje geri alınamadı": "Could not restore the project",
  Arşivlendi: "Archived",
  "Arşivlenen projeler yüklenemedi": "Could not load archived projects",
  "Geri al": "Restore",
  "Bu çalışma alanına girişiniz doğrulanamadı.":
    "Your access to this workspace could not be verified.",
  "Bir şeyler ters gitti. Yardım ekranındaki günlüklere bakın.":
    "Something went wrong. Check the logs on the Help screen.",
  // routes/_project/p/$projectId/audit/index.tsx
  "Bu denetim bulunamadı. Silinmiş olabilir.":
    "This audit was not found. It may have been deleted.",
  "Denetime bağlanılamadı": "Could not load the audit",
  "Tüm denetimler": "All audits",
  "Site denetimi · {time}": "Site audit · {time}",
  "Denetim bu siteyi tamamen tarayamadı.":
    "The audit could not fully crawl this site.",
  "Sitenin bot koruması tarayıcımızı engelledi ve şu an aşmanın bir yolu yok. Bilgisayarınızda çalışan masaüstü tarayıcılar genelde geçer. Şunları deneyin: {libreCrawl} (ücretsiz, açık kaynak) ya da {screamingFrog} (500 adrese kadar ücretsiz).":
    "The site's bot protection blocked our crawler, and there is no way around it right now. Desktop crawlers running on your computer usually get through. Try {libreCrawl} (free, open source) or {screamingFrog} (free up to 500 URLs).",
  "Denetim {count} sayfadan sonra erken durdu.": {
    one: "The audit stopped early after {count} page.",
    other: "The audit stopped early after {count} pages.",
  },
  "Aşağıdaki sonuçlar, tarama durmadan önce bakılan her şeyi içerir. Yeniden denemek için yeni bir denetim başlatın. Yine olursa Yardım'dan tanılama paketini indirip sorunu bildirin.":
    "The results below include everything checked before the crawl stopped. Start a new audit to try again. If it happens again, download the diagnostics bundle from Help and report the problem.",
  "Denetim sonuçları yüklenemedi": "Could not load the audit results",
  // routes/_project/p/$projectId/reports
  "Bu rapor bulunamadı. Silinmiş olabilir ya da başka bir projeye ait olabilir.":
    "This report was not found. It may have been deleted or may belong to another project.",
  "Rapor yüklenemedi": "Could not load the report",
  Oluşturan: "Created by",
  "PDF olarak kaydet (yazdır)": "Save as PDF (print)",
  "Yeni sekmede aç": "Open in new tab",
  "Diğer işlemler": "More actions",
  "Tam ekran": "Full screen",
  "Bağlantı kopyalanamadı": "Could not copy the link",
  "Bağlantı kopyalandı": "Link copied",
  "Bağlantıyı kopyala": "Copy link",
  "Hazırlanan raporlar. Her raporu açabilir, indirebilir ya da silebilirsiniz.":
    "Reports that have been prepared. You can open, download or delete each one.",
  Şablonlar: "Templates",
  "Raporlar yüklenemedi": "Could not load reports",
  "Şablon silindi": "Template deleted",
  "Şablon silinemedi": "Could not delete the template",
  "Rapor şablonları": "Report templates",
  "Şablon, ajanınıza raporu nasıl yazacağını söyler. Kim okuyacak, hangi bölümler olacak, hangi dilde yazılacak, hepsi burada durur. Ajan rapor yazarken uygun olanı seçer.":
    "A template tells your agent how to write a report: who will read it, which sections it has, which language it is written in. When writing a report, the agent picks the one that fits.",
  "Şablonlar yüklenemedi": "Could not load templates",
  "Bu şablondan üretilmiş raporlar etkilenmez.":
    "Reports made from this template are not affected.",
  "Şablonu sil": "Delete template",
  // routes/r/$reportId.ts (plain-text responses)
  "Bu rapor yok ya da erişiminiz bulunmuyor.":
    "This report does not exist, or you do not have access to it.",
  "Bu raporu okumak için oturum açın.": "Sign in to read this report.",
  "Bu proje arşivde, bu yüzden raporları gizli. Okumak için {name} projesini geri alın.":
    "This project is archived, so its reports are hidden. Restore {name} to read them.",
  "Kayıtlı kelimeler yüklenemedi": "Could not load saved keywords",
  "{count} kelime kopyalandı": {
    one: "{count} keyword copied",
    other: "{count} keywords copied",
  },
  "Önce Ayarlar'da Google erişim anahtarını ya da hizmet hesabını girin. Sonra izleyeceğiniz siteyi seçin. Google buna mülk der. Siteyi yeni doğruladıysanız Google'ın veri vermesi birkaç gün sürebilir.":
    "First enter the Google access key or service account in Settings. Then choose the site to track; Google calls it a property. If you only just verified the site, Google may take a few days to share data.",
  "Search Console'daki Google erişim anahtarını kullanır, ayrı kurulum istemez. Bağlandıktan sonra Analytics'teki sitenizi (Analytics mülkü) seçin. Organik ziyaretler Panel'de ve Analytics ekranında görünür.":
    "Uses the same Google access key as Search Console; no separate setup. Once connected, choose your site in Analytics (the Analytics property). Organic visits appear on the Dashboard and the Analytics screen.",
  Genel: "General",
  Bağlantılar: "Connections",
  "Ayar bölümleri": "Settings sections",
  "Projeler yüklenemedi": "Could not load projects",
  İndirildi: "Downloaded",
  "Denetim uygulamadaki bir hata yüzünden durdu.":
    "The audit stopped because of an error in the app.",
  "Sorun sitenizde değil. Denetimi yeniden başlatın. Tekrarlarsa Yardım ekranından tanı paketini indirip sorun kaydına ekleyin. Hata kodu: {code}":
    "Your site is not the problem. Start the audit again. If it happens again, download the diagnostics bundle from Help and attach it to an issue. Error code: {code}",
};
