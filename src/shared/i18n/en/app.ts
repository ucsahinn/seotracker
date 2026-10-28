import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/routes, src/client/components, lib, layout, navigation,
 * tanstack-db, features/projects, reports, saved-keywords.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enApp: Catalog = {
  "Bu bölüm başka bir yerde değişti. Metinleri karşılaştırıp taslağınızı birleştirin.":
    "This section changed elsewhere. Compare the texts and merge your draft.",
  "Düzenleme başındaki metin": "Text when editing began",
  "Son kayıtlı metin": "Latest saved text",
  "Karşılaştırdım, birleştirilmiş taslağı kullan":
    "Compared; use the merged draft",
  "Son doksan gündeki en yeni yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler.":
    "The newest twenty entries from the last ninety days are shown. Dates follow the server's UTC day.",
  "Bu zaman aralığında gösterilmeyen daha eski kayıtlar var.":
    "Older entries in this period are not shown.",
  "Önceki: {previous} → {current}": "Previous: {previous} → {current}",
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

  Ad: "Name",
  "Yalnızca sizin içindir. Proje değiştiricide ve raporların başlığında görünür, Google'a gitmez.":
    "Just for you. It appears in the project switcher and report titles, and is never sent to Google.",
  "Alan adı": "Domain",
  "(isteğe bağlı)": "(optional)",

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

  "Rakip ekle": "Add competitor",
  "Önemli sayfalar": "Key pages",
  "{count} önemli sayfa kayıtlı.": {
    one: "{count} key page saved.",
    other: "{count} key pages saved.",
  },

  "Sayfa ekle": "Add page",

  "Bağlı değil. Sıralama, arama performansı ve fırsatlar bu bağlantıya dayanır.":
    "Not connected. Rank tracking, search performance and opportunities depend on this connection.",
  Bağla: "Connect",

  "PageSpeed anahtarı": "PageSpeed key",

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

  "İstemi kopyala": "Copy prompt",
  "İstem kopyalandı": "Prompt copied",
  "Araştırma günlüğü": "Research log",

  "Henüz kayıt yok. Bağladığınız ajan bir araştırma yaptıkça buraya yazar.":
    "No entries yet. Your connected agent writes here as it does research.",
  "{date} tarihli kaydı sil": "Delete the entry from {date}",
  "Kurulum durumu": "Setup status",

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

  "Henüz rapor yok": "No reports yet",

  "Rapor komutunu kopyala": "Copy report prompt",
  "Komut kopyalandı. Ajanınıza yapıştırın":
    "Prompt copied. Paste it into your agent",

  "Raporlarda ara": "Search reports",
  "Aramanıza uyan rapor yok": "No reports match your search",

  "Filtreleri temizle": "Clear filters",
  Tür: "Type",
  Oluşturuldu: "Created",
  Boyut: "Size",
  İşlemler: "Actions",
  "{title} için işlemler": "Actions for {title}",
  Sil: "Delete",

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

  "Sıra {band}": "Position {band}",

  "Sıraya göre hızlı filtreler": "Quick filters by position",
  "İlk 10": "Top 10",
  "Ortalama sırası 10 veya daha iyi olan kelimeler; yani Google'ın ilk sayfası.":
    "Keywords with an average position of 10 or better; that is, Google's first page.",
  "Ortalama sırası 11 ile 20 arasında olanlar, yani ikinci sayfadakiler. Küçük bir iyileştirme ilk sayfaya taşıyabilir.":
    "Keywords with an average position between 11 and 20, that is, on the second page. A small improvement can move them to the first page.",
  "Sıra dağılımı": "Position distribution",

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

  "Ortalama sıra": "Average position",

  Amaç: "Intent",
  Etiketler: "Tags",
  Eklenme: "Added",
  "Kelimeyi kopyala": "Copy keyword",
  "Kelime kopyalandı": "Keyword copied",

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

  "Henüz proje yok": "No projects yet",
  "Bir proje oluşturun, sonra sitesini ekleyin.":
    "Create a project, then add its site.",

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

  Genel: "General",
  Bağlantılar: "Connections",
  "Ayar bölümleri": "Settings sections",
  "Projeler yüklenemedi": "Could not load projects",
  İndirildi: "Downloaded",
  "Denetim uygulamadaki bir hata yüzünden durdu.":
    "The audit stopped because of an error in the app.",
  "Sorun sitenizde değil. Denetimi yeniden başlatın. Tekrarlarsa Yardım ekranından tanı paketini indirip sorun kaydına ekleyin. Hata kodu: {code}":
    "Your site is not the problem. Start the audit again. If it happens again, download the diagnostics bundle from Help and attach it to an issue. Error code: {code}",
  "Yanıtınız alındı": "Your response has been recorded",
  "{count} yanıt": { one: "{count} response", other: "{count} responses" },
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Güncel denetim": "Recent audit",
  "Yapay zeka ajanı": "AI agent",

  Denetle: "Audit",

  "öneri, sayılmaz": "advice, not counted",

  // Cards and stats review (Opportunities, rankings, setup verdict).

  "{start} – {end}": "{start} – {end}",
  // Cards and stats review (Opportunities, rankings, setup verdict).

  // Translation pass for project, report, saved keyword, settings and help updates.
  "En fazla {count} karakter": "Up to {count} characters",
  "İsteğe bağlı rakip notu eklenmemiş. Bu liste rakip sıralaması ölçmez.":
    "No optional competitor notes have been added. This list does not measure competitor rankings.",
  "İsteğe bağlı sayfa listesi boş. Sayfa rolleri sizin notlarınızdır; ölçülen dönüşüm değildir.":
    "The optional page list is empty. Page roles are your notes, not measured conversions.",
  "Search Console bağlantısı kayıtlı. Veri durumunu Arama performansında görün.":
    "The Search Console connection is saved. Check data status in Search performance.",
  "Analytics bağlantısı kayıtlı. Veri durumunu Analytics ekranında görün.":
    "The Analytics connection is saved. Check data status in Analytics.",
  "Bağlı değil. Oturum ve dönüşüm analizi için Analytics bağlayın; arama tıklamalarını Search Console ile inceleyebilirsiniz.":
    "Not connected. Connect Analytics to analyze sessions and conversions; you can use Search Console to review search clicks.",
  "Anahtar kayıtlı. Google kotası veya hizmet hatası hız ölçümünü yine engelleyebilir.":
    "Key saved. Google quotas or service errors can still prevent speed tests.",
  "Anahtar yok. Ortak Google kotası hız ölçümünü sınırlayabilir; Ayarlar’dan kendi anahtarınızı ekleyin.":
    "No key. Google's shared quota may limit speed tests; add your own key in Settings.",
  "Son yedi günde başlatılıp tamamlanmış bu siteye ait denetim var.":
    "An audit of this site was started and completed within the last seven days.",
  "Son yedi günde başlatılıp tamamlanmış bu-site denetimi yok. Site denetiminden yeni bir denetim başlatın.":
    "No audit of this site was started and completed within the last seven days. Start a new audit from Site audit.",
  "Bu kurulumda bir ajan en az bir araç kullandı.":
    "An agent has used at least one tool in this installation.",
  "Bu kurulumda kayıtlı araç çağrısı yok. Ajan kurulumu adımlarını izleyin.":
    "No tool calls are recorded in this installation. Follow the Agent setup steps.",
  "Kayıtlı bağlantılar ve proje notları. Bu liste bir SEO başarı puanı veya canlı bağlantı testi değildir.":
    "Saved connections and project notes. This list is not an SEO success score or a live connection test.",
  "Kurulum ve proje notları farklı anlarda okundu. Tutarlı durum için bilgiyi yenileyin.":
    "Installation status and project notes were read at different times. Refresh for a consistent view.",
  "{done}/{total} kayıtlı · {missing} eksik · {unknown} okunamadı":
    "{done}/{total} saved · {missing} missing · {unknown} unreadable",
  "Kurulum yenilenemedi; son alınan durum gösteriliyor. Yeniden deneyin.":
    "Could not refresh installation status; showing the last result. Try again.",
  "Kaydedilmemiş değişiklikleriniz var. Bu sayfadan ayrılmak istiyor musunuz?":
    "You have unsaved changes. Do you want to leave this page?",
  "İstemi kopyalayıp Claude Code ya da Codex'e yapıştırın. Bu istem ajandan kaydetmeden önce onayınızı istemesini ister. Araç çağrıları bilgiyi hemen kaydedebilir; onay davranışı ajanınıza bağlıdır.":
    "Copy the prompt and paste it into Claude Code or Codex. It asks the agent to seek your approval before saving. Tool calls can save information immediately; approval behavior depends on your agent.",
  "İstemi kopyalayıp ajana yapıştırın. Bu istem ajandan mevcut notları gözden geçirmesini ve kaydetmeden önce onayınızı istemesini ister. Uygulama araçları ayrıca bir onay kapısı uygulamaz.":
    "Copy the prompt and paste it into your agent. It asks the agent to review existing notes and seek your approval before saving. The application tools do not enforce an additional approval step.",
  "Ajanın kullanabileceği kayıtlı proje notları. Kaydedilen bilgiyi, son yazanı ve eksikleri gözden geçirin.":
    "Saved project notes available to the agent. Review saved information, who last edited it, and what is missing.",
  "Son kayıtlı bilgi gösteriliyor; yenileme başarısız. Taslaklarınız korunuyor.":
    "Showing the last saved information; refresh failed. Your drafts are preserved.",
  "{filled}/{total} bölüm dolu": "{filled}/{total} sections filled",
  "Şu anki hedef kayıtlı değil. Hedef bölümüne bu dönem başarmak istediğinizi yazın.":
    "No current goal is saved. In the Goal section, describe what you want to achieve this period.",
  "İlk boş bölümü doldur": "Fill the first empty section",
  "Bölüme git": "Go to section",
  "Bölüm seçin": "Choose a section",
  "Ajanla taslak hazırla": "Draft with an agent",
  "Proje kimliği okunmadan istem hazırlanamaz. Proje listesini yeniden yükleyin.":
    "The project ID must be loaded before preparing a prompt. Reload the project list.",
  "Kaynak ve kurulum": "Source and setup",
  "En yeni en fazla yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler. Doksan günden eski kayıtlar yeni kayıt eklenirken temizlenir; bu liste eksiksiz geçmiş değildir.":
    "Shows up to twenty most recent entries. Dates use the server's UTC day. Entries older than ninety days are removed when a new entry is added; this is not a complete history.",
  "Bilgi kaydedilemedi. Taslağınız korunuyor; alanları kontrol edip yeniden kaydedin.":
    "Could not save the information. Your draft is preserved; check the fields and save again.",
  "Proje verileri okunamadı. Listeyi yenileyerek yeniden deneyin.":
    "Could not read project data. Refresh the list and try again.",
  "Bazı kaynaklar okunamadı; gösterilen diğer bilgiler korunuyor.":
    "Some sources could not be read; other displayed information is preserved.",
  "Arama arşivi · Web · tüm cihazlar ve ülkeler":
    "Search archive · Web · all devices and countries",
  "{observed}/{total} gün kayıtlı; toplam yalnızca kayıtlı günleri içerir.":
    "{observed}/{total} days saved; totals include only saved days.",
  "Kayıtlı günlerde ölçülen tıklama sayısı sıfır.":
    "Measured clicks on saved days total zero.",
  "Önceki dönem: {start} – {end} · {observed}/{total} gün kayıtlı":
    "Previous period: {start} – {end} · {observed}/{total} days saved",
  "İki dönemin de tüm günleri kayıtlı olmadığı için değişim hesaplanmadı.":
    "Change was not calculated because one or both periods have missing days.",
  "Arşiv kaynağı": "Archive source",
  "Son kayıtlı gün: {date}": "Last saved day: {date}",
  "Son arşiv okuması: {date}": "Last archive read: {date}",
  "Kesinleşme kaynağı arşivde kayıtlı değil":
    "The source of data finalization is not recorded in the archive",
  "Bu kurulumda henüz arama arşivi yok. Arama performansını açarak veriyi okuyun.":
    "This installation has no search archive yet. Open Search performance to load data.",
  "Son tamamlanan bu-site denetimi": "Last completed audit of this site",
  "Başlangıç: {date}": "Started: {date}",
  "Tamamlanma: {date}": "Completed: {date}",
  "Bu denetim en az yedi gün önce başlatıldı. Güncel durum için yeni denetim başlatın.":
    "This audit was started at least seven days ago. Start a new audit for the current status.",
  "Denetimi aç": "Open audit",
  "Bu site için tamamlanmış denetim yok. Siteyi seçip denetim başlatın.":
    "No completed audit for this site. Select the site and start an audit.",
  "Son deneme başarısız": "Last attempt failed",
  "Son denetim sürüyor": "Latest audit in progress",
  "Son deneme tamamlanmadı": "Last attempt did not complete",
  "Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.":
    "A saved connection does not prove that data was read successfully.",
  "Bağlantı kayıtlı": "Connection saved",
  "Ülke ve dil, kaydettiğiniz kelimelerin varsayılan pazarıdır. Arama performansında ülkeyi filtrelerden seçersiniz; bu ayar geçmiş veriyi değiştirmez.":
    "Country and language define the default market for your saved keywords. In Search performance, choose the country in the filters; this setting does not change historical data.",
  "Denetim bu adresten başlar. Google mülkünü Bağlantılar bölümünden ayrıca seçersiniz. https:// olmadan yazın, örneğin example.com.":
    "The audit starts at this address. Select the Google property separately in Connections. Omit https://, for example example.com.",
  "Alan adı değişikliği Google mülk seçimini ve geçmiş kayıtları değiştirmez. Kaydetmeden önce Bağlantılar bölümündeki mülkün bu siteye ait olduğunu kontrol edin.":
    "Changing the domain does not change your Google property selection or historical records. Before saving, check that the property in Connections belongs to this site.",
  "Marka terimlerini Arama performansında düzenleyin":
    "Edit brand terms in Search performance",
  "Google mülk seçimi ve geçmiş korunarak alan adının değiştirilmesini onaylıyorum.":
    "I confirm the domain change while preserving the Google property selection and history.",
  "Rapor indirmesi bağlantı hatası veya zaman aşımı nedeniyle tamamlanamadı. Bağlantınızı kontrol edip yeniden indirin.":
    "The report download failed because of a connection error or timeout. Check your connection and download again.",
  "Rapor indirmesi başka bir sayfaya yönlendirildi. Uygulamayı yenileyip erişiminizi kontrol edin.":
    "The report download was redirected to another page. Refresh the application and check your access.",
  "Rapor bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Report not found or access denied. Refresh the list and select the report again.",
  "Rapor erişimi doğrulanamadı. Uygulamayı yenileyip yeniden indirin.":
    "Report access could not be verified. Refresh the application and download again.",
  "Rapor sunucusu indirmeyi tamamlayamadı. Biraz sonra yeniden indirin.":
    "The report server could not complete the download. Download again shortly.",
  "Kaydedildi: {date}": "Saved: {date}",
  "Arama performansı ekranında dönem ve süzgeçleri seçip Raporu indir düğmesini kullanın. Kaydedilmiş raporlar kaynak bağlantısı kesilse de okunabilir.":
    "Select the period and filters in Search performance, then use Download report. Saved reports remain readable even if the source connection is lost.",
  Sıralama: "Sort order",
  "Oluşturulma zamanı": "Created at",
  "{matching} sonuç / projedeki {total} rapor":
    "Results: {matching} / reports in the project: {total}",
  "Son 7 gün, bu sürede kaydedilen veya güncellenen ayrı dosyaları süzer; kaynak verinin güncelliğini göstermez. Arama başlık ve kayıtlı özeti tarar.":
    "Last 7 days filters distinct files saved or updated during that time; it does not indicate how current the source data is. Search covers titles and saved summaries.",
  "Tür sayıları arama ve Son 7 gün süzgecine göredir; seçili türden önce hesaplanır.":
    "Type counts reflect the search and Last 7 days filters, before the selected type is applied.",
  "Aramayı veya türü temizleyerek kayıtlı raporları görün.":
    "Clear the search or type filter to see saved reports.",
  "Arama performansı veya Site denetimi ekranından rapor hazırlayın ya da rapor komutunu ajanınıza yapıştırın.":
    "Create a report from Search performance or Site audit, or paste the report command into your agent.",
  "Veri dönemi: raporun içinde kontrol edin.":
    "Data period: check inside the report.",
  Şablon: "Template",
  "{start}–{end} / {total}": "{start}–{end} / {total}",
  Sonraki: "Next",
  "Saklama durumu": "Storage status",
  "Saklama bilgileri alınamadı. Bu durum boş alan olduğunu göstermez; bağlantıyı kontrol edip yeniden deneyin.":
    "Could not load storage information. This does not mean space is available; check your connection and try again.",
  "Son güncellenen rapor": "Most recently updated report",
  "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.":
    "No summary was saved for this report. Check the findings and first step inside the report.",
  "Kaydedildi: {date}. Bu zaman, kaynak verinin ölçüm tarihi değildir.":
    "Saved: {date}. This is not the date when the source data was measured.",
  "Bu raporun veri dönemi yapılandırılmış olarak kaydedilmemiş. Dönemi ve veri sınırlarını raporun içinde kontrol edin.":
    "This report's data period was not saved in structured form. Check the period and data limitations inside the report.",
  "Raporu aç": "Open report",
  "Rapor belgesi bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Report document not found or access denied. Refresh the list and select the report again.",
  "Raporun kullanılabilirliği doğrulanamadı. Sunucuya veya bağlantınıza erişilemiyor; yeniden deneyin.":
    "Could not verify report availability. The server or your connection is unavailable; try again.",
  "Rapor önizlemesi zamanında açılmadı. Bağlantıyı kontrol edin; yeniden deneyin veya yeni sekmede açın.":
    "The report preview did not open in time. Check your connection; try again or open it in a new tab.",
  "Arşiv ayrıntısı": "Archive details",
  "Dönem: {start} – {end}": "Period: {start} – {end}",
  "Sıra bilinmiyor": "Position unknown",
  "Önceki dönem: {start} – {end}": "Previous period: {start} – {end}",
  "Önceki ortalama sıra": "Previous average position",
  Gösterimler: "Impressions",
  "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.":
    "Could not read the position archive. Your list is saved; try again for position data.",
  "Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz":
    "Missing archive data prevents verification that no observations exist",
  "Okunan arşivde eşleşen gözlem yok":
    "No matching observations in the archive data read",
  "Eşleşen ham sorgular; gösterimle ağırlıklandırılır":
    "Matching raw queries; weighted by impressions",
  "Önceki dönemin ham sorguları": "Raw queries from the previous period",
  "Gözlem yok": "No observations",
  "Konum ve dil kayıt bilgisi olarak korunur. Arşiv tüm ülkeleri ve cihazları kapsar. Türkçe büyük/küçük harf ve birden fazla boşluk eşleştirilir; ham sorgular gösterimle ağırlıklandırılır. Google bazı nadir sorguları döndürmeyebilir.":
    "Location and language are preserved as saved information. The archive covers all countries and devices. Matching handles Turkish letter case and repeated spaces; raw queries are weighted by impressions. Google may omit some rare queries.",
  "Kayıtlı pazar (arşiv filtresi değil)":
    "Saved market (not an archive filter)",
  "Eski kayıt bilgisi: {intent}; tarih: {date}":
    "Legacy record: {intent}; date: {date}",
  "Arama amacı ölçülmedi": "Search intent not measured",
  "Canlı arama son 28 günü ve metni içeren sorguları açar; bu arşiv ortalamasıyla aynı dönem veya tam eşleşme değildir.":
    "Live search opens the last 28 days and queries containing the text; its period and matching differ from this archive average.",
  "Arama performansında ara (canlı dönem)":
    "Search in Search performance (live period)",
  "Günlük arşiv gözlemlerini göster": "Show daily archive observations",
  "Günlük arşiv okunamadı veya liste değişti. Ayrıntıyı kapatıp listeyi yenileyin; ardından yeniden açın.":
    "Could not read the daily archive, or the list changed. Close the details, refresh the list, then reopen them.",
  "Bu tarihlerde eşleşen günlük gözlem yok; eksik günler sıfır sayılmaz.":
    "No matching daily observations on these dates; missing days are not counted as zero.",
  "Eklenen terimlerin tümü eşleşmelidir.": "All added terms must match.",
  "Eklenen terimlerden hiçbiri bulunmamalıdır.":
    "None of the added terms may appear.",
  "En fazla {count} terim.": "Up to {count} terms.",
  "Terim sınırı aşıldı. Eklemek için önce bir terimi kaldırın.":
    "Term limit exceeded. Remove a term before adding another.",
  "Seçtiğiniz kelimelerin arşiv gözlemlerini, karşılaştırılabilir hareketlerini ve eksik kanıtlarını inceleyin.":
    "Review archive observations, comparable movements, and gaps in the evidence for your selected keywords.",
  "Liste yanıtı: {date}": "List response: {date}",
  "Arşiv dönemi": "Archive period",
  "{count} gün": "{count} days",
  "Listeyi yenile": "Refresh list",
  "Filtrelenen {count} kelimeyi aktar": "Export {count} filtered keywords",
  "Kelime ara; tüm terimler eşleşir": "Search keywords; all terms must match",
  "Terimleri virgülle ayırın": "Separate terms with commas",
  "Filtre uygulanıyor…": "Applying filter…",
  "En fazla {count} terim girin; fazla terimleri kaldırın.":
    "Enter no more than {count} terms; remove the extra terms.",
  "Etkin sıra grubu: {band}": "Active position band: {band}",
  "Belirgin gerileyenler": "Significant declines",
  "Sıra özeti okunamadı; kayıtlı liste kullanılabilir":
    "Could not read the position summary; the saved list is available",
  "Sıra grubu uygulanamadı; sıra arşivi okunamadı. Yeniden deneyin veya grubu temizleyin.":
    "Could not apply the position band because the position archive could not be read. Try again or clear the band.",
  "Sıra 1–3": "Positions 1–3",
  "Sıra 4–10": "Positions 4–10",
  "Sıra 11–20": "Positions 11–20",
  "Sıra 21+": "Positions 21+",
  "Gözlenen kelimeler": "Observed keywords",
  "{shown} / {total} kayıtlı kelime; seçim yalnızca bu sayfada":
    "{shown} / {total} saved keywords; selection applies to this page only",
  "Kayıtlı kelimelerin arşiv özeti": "Archive summary of saved keywords",
  "Kelimeler kayıtlı; sıra karşılaştırması şu anda kullanılamıyor.":
    "Your keywords are saved; position comparison is currently unavailable.",
  "Kaydettiğiniz {saved} kelimenin {observed} tanesi bu aralıkta arşivde gözlendi.":
    "Of your {saved} saved keywords, {observed} were observed in the archive during this period.",
  "Google Web · tüm ülkeler ve cihazlar · {zone}":
    "Google Web · all countries and devices · {zone}",
  "Eşleşen kelimelerde gözlenen gün: {observed} / {requested}":
    "Observed days for matching keywords: {observed} / {requested}",
  "Son doğrulanmış yanıt gösteriliyor; liste yenilenirken işlem yapmayın.":
    "Showing the last verified response; do not perform actions while the list is refreshing.",
  "Sıralama takibi'nde arşivi güncelle": "Update the archive in Rank tracking",
  "Gerileyenleri incele": "Review declines",
  "Metin ve etiket filtresine uyan kayıtlar":
    "Records matching the text and tag filters",
  "{count} kayıtlı kelime içinde": "Among {count} saved keywords",
  "Belirgin hareket ≥{value} sıra": "Significant movement ≥{value} positions",
  "↑ {up} · ↓ {down}": "↑ {up} · ↓ {down}",
  "Karşılaştırılabilen: {comparable} / {total}":
    "Comparable: {comparable} / {total}",
  "Önceki dönem okunamadı; karşılaştırma için yeniden deneyin.":
    "Could not read the previous period; try again to compare.",
  "Belirgin değişmedi: {stable}; önceki gözlem yok: {previous}; güncel gözlem yok: {current}.":
    "No significant change: {stable}; no previous observation: {previous}; no current observation: {current}.",
  "Sıra gruplarının tabanı: {count} kayıtlı kelime (sıra grubu uygulanmadan önce).":
    "Position bands are based on {count} saved keywords (before applying the position band filter).",
  "Sıra grupları; metin ve etiket filtresi sonrası tüm kayıtlar":
    "Position bands; all records after text and tag filtering",
  "Veri kapsamı ve hesaplama": "Data coverage and calculation",
  "Son arşiv aktarımı: {date}": "Last archive import: {date}",
  "Tam yanıt: {complete}; sınırlı: {limited}; başarısız: {failed}; doğrulanmamış gün: {unknown}.":
    "Complete responses: {complete}; limited: {limited}; failed: {failed}; unverified days: {unknown}.",
  "Önceki dönemde tam yanıt: {complete} / {days}; eşleşen gözlem günü: {observed}.":
    "Complete responses in the previous period: {complete} / {days}; days with matching observations: {observed}.",
  "Listeyi yenile yalnızca yerel veritabanını okur; Google'dan yeni veri almaz. Tarihler Pasifik takviminde üç günlük gecikme varsayımıyla seçilir; bu, tam arşiv kanıtı değildir.":
    "Refresh list only reads the local database; it does not fetch new data from Google. Dates use the Pacific calendar with an assumed three-day delay; this does not prove archive completeness.",
  "Arşiv aktarım durumu okunamadı. Son aktarım bilgisi için yeniden deneyin.":
    "Could not read archive import status. Try again for the latest import information.",
  "Search Console bağlantısı okunamadı. Bağlantıyı denetleyin veya yeniden deneyin.":
    "Could not read the Search Console connection. Check the connection or try again.",
  "Kelimeleriniz kayıtlı. Güncel sıra verisi için Search Console bağlantısı gerekiyor.":
    "Your keywords are saved. A Search Console connection is required for current position data.",
  "Search Console bağlı; bu aralık henüz arşive alınmadı. Sıralama takibi'nden arşivi güncelleyin.":
    "Search Console is connected; this period has not been archived yet. Update the archive in Rank tracking.",
  "Son arşiv aktarımı tamamlanamadı. Sıralamalar ekranında hatayı inceleyip yeniden deneyin.":
    "The latest archive import could not complete. Review the error in Rank tracking and try again.",
  "Arşiv bu tarihlerin tümünü doğrulamıyor. Eksik veya sınırlı günler için Sıralama takibi'nden arşivi güncelleyin.":
    "The archive does not verify all these dates. Update the archive in Rank tracking for missing or limited days.",
  "Arşiv seçilen dönemin sonuna ulaşmadı. Sıralama takibi'nden arşivi güncelleyin.":
    "The archive has not reached the end of the selected period. Update the archive in Rank tracking.",
  "Bu tarihlerde okunan arşivde eşleşen sorgu yok. Bu, Google'da görünmediğiniz anlamına gelmez.":
    "No matching queries were found in the archive data read for these dates. This does not mean you did not appear on Google.",
  "Sıralar, kaydedilen nihai Google yanıtlarından hesaplanan ortalamalardır; bugünkü sabit sıranız değildir.":
    "Positions are averages calculated from saved final Google responses; they are not your fixed position today.",
  "Bağlantı okunamadı; yeniden dene": "Could not read connection; retry",
  "Seçilen etiketlerden herhangi biri; sayılar tüm kayıtlı kelimelerdeki etiket atamalarıdır.":
    "Any of the selected tags; counts are tag assignments across all saved keywords.",
  "En fazla {count} etiket seçin.": "Select up to {count} tags.",
  "Liste veya arşiv değişti. Listeyi yenileyip aktarımı yeniden başlatın.":
    "The list or archive changed. Refresh the list and start the export again.",
  "Ajan araçları bu kurulumdaki projelere erişir. Son çağrı geçmiş kullanım kaydıdır; sürekli çevrimiçi bağlantı anlamına gelmez.":
    "Agent tools can access projects in this installation. The last call is a record of past use; it does not mean a continuous online connection.",
  "Durumu yeniden oku": "Reload status",
  "Bağlantıyı doğrula": "Verify connection",
  "Durum okunamadı. Yeniden deneyin; bağlantının başarısız olduğu sonucuna varılamaz.":
    "Could not read status. Try again; this does not establish that the connection failed.",
  "Yeni araç çağrısı doğrulandı.": "A new tool call was verified.",
  "Yeni araç çağrısı görülmedi. Ajanınızın MCP durumunu kontrol edip bir araç çağrısı yapın, sonra yeniden doğrulayın.":
    "No new tool call was detected. Check your agent's MCP status and make a tool call, then verify again.",
  "Yeni araç çağrısı bekleniyor. Ajanınızdan seowatcher araçlarını kullanmasını isteyin.":
    "Waiting for a new tool call. Ask your agent to use the seowatcher tools.",
  "Sitelerinizi açın; arşiv verisini, son denetimi ve eksik bağlantıları burada görün.":
    "Open your sites; see archive data, the latest audit, and missing connections here.",
  "Proje ara": "Search projects",
  "Ad veya alan adı": "Name or domain",
  "Liste yenilenemedi; son alınan projeler gösteriliyor. Yeniden deneyin.":
    "Could not refresh the list; showing the last loaded projects. Try again.",
  "Proje verileri yenilenemedi. Listeyi yenileyerek yeniden deneyin.":
    "Could not refresh project data. Refresh the list and try again.",
  "Bu aramayla eşleşen proje yok. Aramayı değiştirin.":
    "No projects match this search. Change your search.",
  "Site eklenmedi. Bu proje için bir site seçin.":
    "No site added. Select a site for this project.",
  "Son açılan": "Last opened",
  "Search Console bağla": "Connect Search Console",
  "Paneli aç": "Open dashboard",
  "Arşivlenen liste yenilenemedi; son alınan liste gösteriliyor":
    "Could not refresh the archived list; showing the last loaded list",
  "Görünüm ve dil bu tarayıcıya, Google kimlikleri bu kurulumdaki tüm projelere, Windows tercihleri başlatıcıya uygulanır. Önce kullanacağınız Google kimliğini seçin, sonra proje bağlantılarından mülkünüzü belirleyin.":
    "Appearance and language apply to this browser, Google credentials to all projects in this installation, and Windows preferences to the launcher. First choose the Google credentials to use, then select your property in project connections.",
  "Kurulum türü okunamadı. Durumu yeniden kontrol edin; günlük konumu kurulum türü belirlendiğinde gösterilir.":
    "Could not read the installation type. Check the status again; the log location appears once the installation type is known.",
  "Proje kimliği okunuyor…": "Loading project ID…",
  "Proje kimliği okunamadı. Proje listesini yeniden yükleyin.":
    "Could not read the project ID. Reload the project list.",
  "Yazdırma sekmesi tarayıcı tarafından engellendi. Bu site için açılır pencerelere izin verin veya raporu yeni sekmede açıp Yazdır kullanın.":
    "The browser blocked the print tab. Allow pop-ups for this site, or open the report in a new tab and use Print.",
  "Kaynak ve kayıt bilgileri": "Source and saved record details",
  "Rapor bilgileri yenilenemedi. Son alınan kayıt gösteriliyor; sayfayı yenileyerek tekrar deneyin.":
    "Could not refresh report information. Showing the last loaded record; refresh the page to try again.",
  "Rapor kaydedildiği dilde ve verilerle açılır. Güncel veri veya başka dil için kaynak ekrandan bilinçli olarak yeniden hazırlayın.":
    "The report opens with its saved language and data. To use current data or another language, deliberately generate it again from the source screen.",
  "Arama raporu hazırla": "Create search report",
  "Denetim raporu hazırla": "Create audit report",
  "Liste yenilenemedi. Son alınan kayıtlar gösteriliyor; Yenile ile tekrar deneyin.":
    "Could not refresh the list. Showing the last loaded records; use Refresh to try again.",
  "Filtreler uygulanıyor. Yeni sonuçlar gelene kadar önceki liste gösteriliyor.":
    "Applying filters. Showing the previous list until new results arrive.",
  "Proje alan adı: {domain} · Search Console mülkü: {property}":
    "Project domain: {domain} · Search Console property: {property}",
  "Alan adı belirtilmedi": "No domain specified",
  "Mülk seçilmedi": "No property selected",
  "Seçilen Search Console mülkü proje alan adını kapsamıyor. Ayrı bir mülkü bilerek seçtiyseniz koruyabilirsiniz; değiştirmek için aşağıdaki mülk seçimini kullanın.":
    "The selected Search Console property does not cover the project domain. You can keep it if you deliberately selected a separate property; use the property selector below to change it.",
  "{name} · {domain}. Değişiklikler yalnızca bu projeye uygulanır.":
    "{name} · {domain}. Changes apply only to this project.",
  "Uygulama raporu, tür kaydedilmemiş": "Application report, type not recorded",

  "Bu sitenin son tamamlanan denetimi": "Last completed audit for this site",
  "Bunlar kaydedilen pazar tercihleridir. Arşivdeki sıralamalar tüm ülkeleri ve cihazları kapsar; bu tercihler sıralamaları filtrelemez.":
    "These are saved market preferences. Archived positions cover all countries and devices; these preferences do not filter rankings.",
  "Dil, seçilen ülkeye göre belirlenir. Bu, arayüz dilini değiştirmez.":
    "Language follows the selected country. This does not change the interface language.",
  "Hedefinizi ekleyin": "Add your goal",
  "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için kurulumunuza göre Docker kapsayıcısını veya geliştirici sunucusunu durdurun. Bilgisayar uyurken denetimler çalışmaz.":
    "Closing the browser tab does not stop the app. To shut it down, stop the Docker container or development server, depending on your installation. Audits do not run while the computer is asleep.",
  "Burada kayıtlı mülk seçimleri gösterilir; Google erişimi bu kontrolde sınanmaz. Güncel bir okuma denemek için Bağlantıları açın, seçili mülkün raporuna gidin ve Yenile düğmesine basın.":
    "These are saved property selections; this check does not test Google access. To try a current read, open Connections, go to the selected property’s report and press Refresh.",
  "Kaydedilmiş rapor": "Saved report",
  "Eski rapor · kaynak ve tarih doğrulanmamış":
    "Legacy report · source and date unverified",
  "Kaynak site: {domain}": "Source site: {domain}",
  "Kaynak site doğrulanamadı. Bu rapor başka bir siteye ait olabilir.":
    "The source site could not be verified. This report may concern another site.",
  "Bu rapor projenin sitesine ait değil: {domain}.":
    "This report is not about the project site: {domain}.",
  "Dosya kaydı: {date}": "File saved: {date}",
  "Bugün karar vermeden önce raporun içindeki siteyi, ölçüm tarihini ve veri sınırlarını kontrol edin.":
    "Before making decisions today, check the site, measurement date and data limits inside the report.",
  "Güncel bir denetim raporu oluştur": "Create a current audit report",
};
