import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/client/features/audit, src/client/features/lighthouse, src/shared/audit-issues.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enAudit: Catalog = {
  // audit/shared.tsx
  Sürüyor: "In progress",
  Bitti: "Done",
  Başarısız: "Failed",

  // audit/results/TabIntro.tsx
  "Sitenizde düzeltmeniz gereken her şey, önem sırasına göre. Bir satıra tıklayın. Neden önemli olduğunu, nasıl düzelteceğinizi ve hangi sayfaların etkilendiğini adresleriyle görürsünüz.":
    "Everything on your site that needs fixing, most important first. Click a row to see why it matters, how to fix it and which pages are affected, with their addresses.",
  "Taranan her sayfa ve sunucunun ona verdiği yanıt. Hatalı, yavaş ya da derinde kalmış sayfaları buradan bulun.":
    "Every crawled page and how the server responded to it. Find broken, slow or deeply buried pages here.",
  "Google bu sayfaları gerçekten dizinine almış mı? Almadıysa nedenini burada görürsünüz.":
    "Has Google actually indexed these pages? If not, you can see why here.",
  "Sayfalarınız telefonda ve bilgisayarda ne kadar hızlı açılıyor? Ölçüm, Google'ın kullandığı Lighthouse ile yapılır.":
    "How fast do your pages load on phones and computers? Measured with Lighthouse, the tool Google uses.",

  // audit/results/DownloadReportButton.tsx
  "Rapor oluşturulamadı": "Couldn't create the report",
  "Raporu indir": "Download report",

  // audit/results/ScoreHistogram.tsx
  "{count} {band}": "{count} {band}",
  "Mobilde ölçülen {measured} sayfadan {parts}.":
    "Of {measured} pages measured on mobile: {parts}.",

  // audit/results/issueGroups.ts (severity labels, translated where shown)
  Kritik: "Critical",
  Uyarı: "Warning",
  Bilgi: "Info",

  // audit/launch/LaunchView.tsx
  "Site denetimi": "Site audit",
  "Sitenizi tarar, bulduğu sorunları önem sırasına göre sıralar.":
    "Crawls your site and ranks the problems it finds by importance.",
  Kotalar: "Quotas",
  "Güncel durum": "Current status",
  '"{url}" denetimi silinsin mi?': 'Delete the audit of "{url}"?',
  "{date} · {count} sayfa. Denetimin sayfaları, sorunları ve hız ölçümleri de silinir. Bu geri alınamaz.":
    {
      one: "{date} · {count} page. The audit's pages, issues and speed measurements are deleted too. This can't be undone.",
      other:
        "{date} · {count} pages. The audit's pages, issues and speed measurements are deleted too. This can't be undone.",
    },
  "Denetimi sil": "Delete audit",

  // audit/results/performanceBands.ts
  Hızlı: "Fast",
  Orta: "Average",
  Yavaş: "Slow",
  "{score} ve üzeri": "{score} and above",
  "Kota doldu": "Quota used up",
  "{marker}; {measured} sayfa ölçüldü, {left} sayfa ölçülemedi. Google'ın ücretsiz günlük ölçüm sınırı bitti, sayfalarınızda bir sorun yok. Ayarlar'dan bir PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "{marker}: pages measured {measured}, not measured {left}. Google's free daily measurement limit ran out; nothing is wrong with your pages. Add a PageSpeed key in Settings, or run the audit again once the quota resets.",
  "PageSpeed anahtarı girilmediği için {count} ölçüm yapılamadı: Google'ın ortak ücretsiz kotası doldu, sayfalarınızda bir sorun yok. Ayarlar'dan ücretsiz bir anahtar ekleyip denetimi yeniden başlatın.":
    {
      one: "{count} measurement couldn't run because no PageSpeed key is set: Google's shared free quota is used up; nothing is wrong with your pages. Add a free key in Settings and run the audit again.",
      other:
        "{count} measurements couldn't run because no PageSpeed key is set: Google's shared free quota is used up; nothing is wrong with your pages. Add a free key in Settings and run the audit again.",
    },
  "Google'ın dakikalık sınırı yüzünden {count} ölçüm yapılamadı; denetimi daha sonra yeniden başlatın veya Ayarlar'dan anahtarınızın kotasını kontrol edin.":
    {
      one: "{count} measurement couldn't run because of Google's per-minute limit. Run the audit again later, or check your key's quota in Settings.",
      other:
        "{count} measurements couldn't run because of Google's per-minute limit. Run the audit again later, or check your key's quota in Settings.",
    },

  // audit/launch/useLaunchController.ts
  "Taranacak site adresini girin.": "Enter the address of the site to crawl.",
  "{pages} sayfa taranacak. Biraz zaman alabilir. Devam edelim mi?":
    "{pages} pages will be crawled. This may take a while. Continue?",
  "Denetim başlatıldı": "Audit started",
  "Denetim başlatılamadı": "Couldn't start the audit",
  "Denetim silindi": "Audit deleted",
  "Denetim silinemedi": "Couldn't delete the audit",

  // audit/launch/LaunchFormCard.tsx
  "Yeni denetim başlat": "Start a new audit",
  "Taranacak site adresi": "Address of the site to crawl",
  "Başlatılıyor…": "Starting…",
  "Denetimi başlat": "Start audit",
  "En fazla {input} sayfa tara": "Crawl up to {input} pages",
  "En çok taranacak sayfa sayısı": "Maximum number of pages to crawl",
  "{min} ile {max} arasında bir sayı girin.":
    "Enter a number between {min} and {max}.",
  "Taranan her sayfanın hızı telefonda ve bilgisayarda ölçülür. En çok {pages} sayfa, yani {checks} ölçüm. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun.":
    "Each crawled page's speed is measured on mobile and desktop. Up to {pages} pages, so {checks} measurements. The speed phase takes at least about {minutes} minutes, longer if it hits Google's limit.",
  "PageSpeed anahtarınız yok. Google'ın ücretsiz kotası küçük olduğu için en çok {pages} sayfa ({checks} ölçüm) ölçülür. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun sürer.":
    "You have no PageSpeed key. Google's free quota is small, so at most {pages} pages ({checks} measurements) are measured. The speed phase takes at least about {minutes} minutes, longer if it hits Google's limit.",
  "Tüm sayfaları ölçmek için {settings}'dan ücretsiz bir PageSpeed anahtarı ekleyin.":
    "To measure every page, add a free PageSpeed key in {settings}.",
  Ayarlar: "Settings",
  "Sayfa hızını da ölç": "Also measure page speed",
  "Hız ölçümü": "Speed tests",
  "Google Lighthouse ile taranan her sayfanın telefonda ve bilgisayarda ne kadar hızlı açıldığını ölçer, yavaşlatan sorunları listeler.":
    "Uses Google Lighthouse to measure how fast each crawled page loads on mobile and desktop, and lists what slows it down.",
  "Daha uzun sürer.": "Takes longer.",

  // audit/launch/ProgressCard.tsx
  "Sayfa bulma": "Finding pages",
  Taranıyor: "Crawling",
  Tarama: "Crawling",
  Tamamlanıyor: "Finishing",
  Çalışıyor: "Working",
  "~{duration} kaldı": "~{duration} left",
  "Lighthouse kontrolleri çalışıyor": "Running Lighthouse checks",
  "Sayfalar taranıyor": "Crawling pages",
  "{count} ölçüm başarısız oldu; kalanlar sürüyor.": {
    one: "{count} measurement failed; the rest are still running.",
    other: "{count} measurements failed; the rest are still running.",
  },
  "Adresler bulunuyor…": "Finding addresses…",
  "{done} / {total} kontrol ({failed} başarısız)":
    "{done} / {total} checks ({failed} failed)",
  "{done} / {total} kontrol": "{done} / {total} checks",
  "{done} / {total} sayfa": "{done} / {total} pages",
  "Taranan sayfalar ({count})": "Crawled pages ({count})",
  "Güncellendi {date}": "Updated {date}",

  // audit/launch/AuditTrendChart.tsx
  "Denetimler arası değişim": "Change across audits",
  "Yüz sayfa başına sorun sayısı. Farklı büyüklükteki taramalar bu ölçüyle karşılaştırılabilir.":
    "Issues per hundred pages, so crawls of different sizes can be compared.",
  "Bu {count} denetimin hiçbirinde kritik sorun ya da uyarı çıkmadı, grafik boş. Bilgi düzeyindeki bulgular denetimlerin kendi sayfalarında.":
    // The chart needs two audits, so there is no singular.
    "None of these {count} audits found critical issues or warnings, so the chart is empty. Info-level findings are on each audit's own page.",
  "Denetim başına sayfa yoğunluğu: yüz sayfa başına sorun":
    "Density per audit: issues per hundred pages",
  Tarih: "Date",
  Sayfa: "Page",
  "{density} ({total} toplam)": "{density} ({total} total)",
  "{date} · {count} sayfa": {
    one: "{date} · {count} page",
    other: "{date} · {count} pages",
  },
  "{density} / 100 sayfa ({total} toplam)":
    "{density} / 100 pages ({total} total)",
  "kritik sorun": "critical issues",
  uyarı: "warnings",
  değişmedi: "unchanged",
  azaldı: "down",
  arttı: "up",
  "{count} denetim. Yüz sayfa başına {series}, {fromDate} tarihinde {from} idi, {toDate} tarihinde {to} oldu ({direction}).":
    {
      one: "{count} audit. Per hundred pages, {series} went from {from} on {fromDate} to {to} on {toDate} ({direction}).",
      other:
        "{count} audits. Per hundred pages, {series} went from {from} on {fromDate} to {to} on {toDate} ({direction}).",
    },

  // audit/launch/AuditHistorySection.tsx
  "Denetim geçmişi yüklenemedi": "Couldn't load the audit history",
  "Henüz denetim yok": "No audits yet",
  "Henüz denetim yapılmadı. Yukarıya site adresinizi yazıp başlatın; geçmiş burada listelenir.":
    "You haven't run an audit yet. Enter your site's address above and start one; past audits are listed here.",
  "Önceki denetimler": "Previous audits",
  Durum: "Status",
  "Yüz sayfa başına (toplam ayrıca parantezde)":
    "Per hundred pages (total in parentheses)",
  "Adresi kopyala": "Copy URL",
  "Adres kopyalandı": "URL copied",
  Evet: "Yes",
  "{date} denetimini görüntüle": "View the audit from {date}",
  Görüntüle: "View",
  "Aynı siteye ait bir önceki denetime göre":
    "Compared with the previous audit of the same site",
  "{url} denetimi için işlemler": "Actions for the audit of {url}",
  "Aynı ayarlarla yeniden başlat": "Run again with the same settings",
  "Bir denetim zaten başlatılıyor": "An audit is already starting",

  // audit/results/ForeignPropertyNotice.tsx
  "Bu denetim {auditedHost} sitesine ait, ama Search Console bağlantınız {propertyHost} mülküne bağlı.":
    "This audit is of {auditedHost}, but your Search Console connection points to the {propertyHost} property.",
  "Aşağıdaki site haritaları {propertyHost} mülküne ait, bu denetimin sayfalarıyla ilgisi yok. Google'a sorma da kapalı, çünkü bu sayfalar o mülkte değil ve sorulan her adres günlük kotadan boşuna giderdi. {auditedHost} için Google verisi görmek istiyorsanız siteyi ayrı bir proje olarak ekleyip kendi Search Console mülküne bağlayın.":
    "The sitemaps below belong to {propertyHost} and have nothing to do with this audit's pages. Asking Google is turned off as well: these pages aren't in that property, so every address checked would waste daily quota. To see Google data for {auditedHost}, add the site as a separate project and connect it to its own Search Console property.",
  Bağlantılar: "Connections",

  // audit/results/CoverageVerdictDonut.tsx
  "Google'da": "On Google",
  "Aramada çıkabilir": "Can appear in search",
  "Dizinde değil": "Not indexed",
  "Google baktı ama almadı": "Google looked but didn't index it",
  "Yanıt bekleyen": "Awaiting an answer",
  "Google'a sorduk ama yanıt gelmedi ya da hiç sorulmadı":
    "Asked Google but got no answer, or never asked",
  "Google bu sayfalarla ne yapmış?": "What has Google done with these pages?",
  "Bir gruba tıklayın, aşağıdaki liste yalnızca o sayfaları göstersin.":
    "Click a group to show only those pages in the list below.",
  sayfa: "pages",

  // audit/results/SeverityDonut.tsx
  "Google siteyi anlayamıyor": "Google can't make sense of the site",
  "Sıralamayı ve tıklamayı düşürür": "Costs rankings and clicks",
  "Küçük iyileştirme fırsatları": "Small chances to improve",
  "Sorunlar ne kadar ciddi?": "How serious are the issues?",
  "Bir gruba tıklayın, liste yalnızca o sorunları göstersin.":
    "Click a group to show only those issues in the list.",
  bulgu: "findings",

  // audit/results/AffectedPageList.tsx
  "Bu sorun için kayıtlı adres yok.": "No addresses recorded for this issue.",
  "{title}: etkilenen adresler": "{title}: affected addresses",
  "Adres ara": "Search addresses",
  "{title}: adreslerde ara": "{title}: search addresses",
  "Aramayla eşleşen adres yok.": "No addresses match your search.",
  "{total} adres içinden {shown} tanesi gösteriliyor.":
    "Showing {shown} of {total} addresses.",
  "{total} sayfa içinden {shown} tanesi gösteriliyor.":
    "Showing {shown} of {total} pages.",
  "Daha fazla göster ({left} kaldı)": "Show more ({left} left)",
  "Bu sayfada {count} kayıt var": {
    one: "{count} record on this page",
    other: "{count} records on this page",
  },

  // audit/results/IssueCard.tsx
  "{title}, {count}": "{title}, {count}",
  "Nasıl düzeltilir?": "How to fix it",
  "Bu sorun tek bir sayfayla değil, sitenin tamamıyla ilgili.":
    "This issue concerns the whole site, not a single page.",
  "URL'leri kopyala ({count})": "Copy URLs ({count})",
  "CSV indir": "Download CSV",
  "Sayfalar sekmesinde göster": "Show in the Pages tab",
  "Pano kullanılamıyor": "Clipboard is not available",
  "{count} adres kopyalandı": {
    one: "{count} address copied",
    other: "{count} addresses copied",
  },
  "Panoya kopyalanamadı": "Could not copy to the clipboard",

  // audit/results/IssuesView.tsx
  "Bu denetimde kayıtlı sorun yok.": "This audit recorded no issues.",
  "Site gerçekten iyi durumda olabilir ya da bu denetim, sorun kontrolleri eklenmeden önce çalıştırılmış olabilir. Tam raporu görmek için yeni bir denetim başlatın.":
    "The site may really be in good shape, or this audit may have run before the issue checks were added. Start a new audit to get the full report.",
  "Yalnızca {url}": "Only {url}",
  "Tüm sayfaları göster": "Show all pages",
  "Gösterilen:": "Showing:",
  "Seçtiğiniz kombinasyonda sorun yok.":
    "No issues match the combination you chose.",
  "Bu sayfada kayıtlı sorun yok.": "No issues recorded for this page.",
  "Filtreleri temizle": "Clear filters",
  "{label} seçimini kaldır": "Remove the {label} filter",

  // audit/results/issueAffected.ts (evidence labels)
  "Durum kodu": "Status code",
  "Uzunluk (karakter)": "Length (characters)",
  "Kelime sayısı": "Word count",
  "H1 sayısı": "H1 count",
  "Ana sayfadan uzaklık (tık)": "Clicks from the home page",
  "Yanıt süresi": "Response time",
  "Asıl adres": "Canonical URL",
  "Sayfadaki asıl adres": "Canonical URL in the page",
  "Başlıktaki asıl adres": "Canonical URL in the HTTP header",
  "Yönlendirdiği adres": "Redirects to",
  "Son adres": "Final URL",
  "Aynı içerikteki sayfa sayısı": "Pages with the same content",
  "Aynı içerikteki diğer sayfalar": "Other pages with the same content",
  "Karşılıklı bağlanmayan alternatif": "Alternate without a return link",
  "Dil kodu": "Language code",
  "Dil kodları": "Language codes",
  Neden: "Reason",
  "Erişim sonucu": "Fetch result",
  "Robots meta etiketi": "Robots meta tag",
  "Googlebot meta etiketi": "Googlebot meta tag",
  "X-Robots-Tag başlığı": "X-Robots-Tag header",
  Adet: "Count",
  Örnek: "Example",
  Sınır: "Limit",
  "Alt metni eksik görsel": "Images missing alt text",
  "Toplam görsel": "Total images",
  "Engellenen kaynaklar": "Blocked resources",
  "Engellenen kaynak sayısı": "Blocked resources count",
  Örnekler: "Examples",
  "Sizin belirttiğiniz adres": "User-declared canonical",
  "Google'ın seçtiği adres": "Google-selected canonical",
  "Google'ın kararı": "Google's verdict",
  "Google'ın son tarama tarihi": "Google's last crawl",
  "Kontrol tarihi": "Checked on",
  "Eşik (gün)": "Threshold (days)",
  "Kontrol edilen sayfa": "Pages checked",
  "Adres sayısı": "Number of URLs",
  Hayır: "No",
  "{shown} ve {rest} tane daha": "{shown} and {rest} more",
  "Tüm site": "Whole site",
  "{count} sayfa": {
    one: "{count} page",
    other: "{count} pages",
  },
  // Findings differ from pages only when some page has several, so >= 2.
  "{count} sayfa · {findings} bulgu": {
    one: "{count} page · {findings} findings",
    other: "{count} pages · {findings} findings",
  },
  Önem: "Severity",
  Sorun: "Issue",
  Adres: "URL",
  Ayrıntı: "Details",
  "Nasıl düzeltilir": "How to fix",

  // audit/results/IssueWorkloadChart.tsx
  "En çok sayfayı hangi sorun etkiliyor?":
    "Which issue affects the most pages?",
  "En çok sayfayı etkileyen {count} tür, kalan {hidden} tür aşağıda.": {
    one: "The {count} type affecting the most pages; the other {hidden} are below.",
    other:
      "The {count} types affecting the most pages; the other {hidden} are below.",
  },
  "En çok sayfayı etkileyen {count} tür.": {
    one: "The {count} type affecting the most pages.",
    other: "The {count} types affecting the most pages.",
  },
  "Bir çubuğa tıklayıp listeyi daraltın.": "Click a bar to narrow the list.",
  "En çok sayfayı etkileyen sorun: {title}, {pages} sayfa. Grafikte {count} tür var.":
    {
      one: "The issue affecting the most pages: {title}, {pages} pages. The chart shows {count} type.",
      other:
        "The issue affecting the most pages: {title}, {pages} pages. The chart shows {count} types.",
    },
  "Sorun türüne göre etkilenen sayfa sayısı": "Pages affected by issue type",
  "Etkilenen sayfa": "Pages affected",
  "Sorun türüne göre filtre": "Filter by issue type",

  // audit/results/export.ts (CSV and Sheets headers)
  Başlık: "Title",
  Görsel: "Image",
  "Alt metni eksik": "Missing alt text",
  "Yanıt süresi (ms)": "Response time (ms)",
  Cihaz: "Device",
  Performans: "Performance",
  Erişilebilirlik: "Accessibility",
  Karar: "Verdict",
  "Kapsam durumu": "Coverage state",
  "Google'ın seçtiği asıl adres": "Google-selected canonical",
  "Sizin belirttiğiniz asıl adres": "User-declared canonical",
  "Asıl adres uyuşmazlığı": "Canonical mismatch",
  "Son tarama": "Last crawl",
  Sorgulandı: "Checked",
  Hata: "Error",
  evet: "yes",
  hayır: "no",

  // audit/results/QuickFilters.tsx
  "Dizine kapalı": "Blocked from indexing",
  "Google'ın dizine almasına izin verilmeyen sayfalar":
    "Pages Google isn't allowed to index",
  "Sunucu yanıtı 1 saniyeden uzun süren sayfalar":
    "Pages whose server response takes longer than 1 second",
  "En az bir görselinde alt metni olmayan sayfalar":
    "Pages with at least one image missing alt text",
  "Site haritasında yok": "Not in sitemap",
  "Taranan ama site haritasına girmemiş sayfalar":
    "Crawled pages that aren't in the sitemap",
  '"Site haritasında yok" kullanılamıyor: bu denetimde site haritası bulunamadı.':
    '"Not in sitemap" isn\'t available: this audit found no sitemap.',
  Temizle: "Clear",

  // audit/results/ScoreCard.tsx
  "Eksiksiz. Düzeltilecek bir şey kalmadı.": "Spotless. Nothing left to fix.",
  "Çok iyi. Birkaç küçük iş kaldı.": "Very good. A few small jobs are left.",
  "İyi. Birkaç düzeltme puanı yükseltir.":
    "Good. A few fixes will raise the score.",
  "Orta. Önce kritik sorunlara bakın.": "Fair. Start with the critical issues.",
  "Zayıf. Google'ın sitenizi anlamasını engelleyen sorunlar var.":
    "Poor. Some issues are keeping Google from understanding your site.",
  "Site puanı": "Site score",
  "+{points} puan": "+{points} points",

  // audit/results/PerformanceSummary.tsx
  "Google'ın ücretsiz ölçüm kotası dolmuş; sayfalarınızda bir sorun yok. Ayarlar'dan PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "Google's free measurement quota ran out; nothing is wrong with your pages. Add a PageSpeed key in Settings, or run the audit again once the quota resets.",
  Hız: "Speed",
  "Ortalama puanlar": "Average scores",
  "Ölçülemeyen {count} sayfa": {
    one: "{count} page couldn't be measured",
    other: "{count} pages couldn't be measured",
  },
  "Ayarlar'ı aç": "Open Settings",
  "Mobilde hız dağılımı": "Speed distribution on mobile",
  "Ortalama tek başına yanıltır. Bir gruba tıklayıp o sayfaları listeleyin.":
    "An average alone is misleading. Click a group to list those pages.",

  // audit/results/PagesSummary.tsx and pagesBuckets.ts
  "Sayfalar nasıl yanıt verdi?": "How did the pages respond?",
  "Bir çubuğa tıklayarak tabloyu daraltın.": "Click a bar to narrow the table.",
  "Ortalama yanıt süresi {duration}. Bir çubuğa tıklayarak tabloyu daraltın.":
    "Average response time {duration}. Click a bar to narrow the table.",
  "{count} sayfanın yanıt durumuna göre dağılımı.": {
    one: "{count} page by response status.",
    other: "{count} pages by response status.",
  },
  "Ana sayfadan kaç tık uzakta?": "How many clicks from the home page?",
  "{count} sayfaya hiçbir bağlantı verilmemiş, bu yüzden çubuklarda yok.": {
    one: "{count} page has no links pointing to it, so it isn't in the bars.",
    other:
      "{count} pages have no links pointing to them, so they aren't in the bars.",
  },
  "Derindeki sayfaları Google geç bulur ve daha az değer verir.":
    "Google finds deep pages late and values them less.",
  "En derin sayfalar {depth} uzaklığında.":
    "The deepest pages are {depth} away.",
  "Derinlik bilgisi yok.": "No depth data.",
  Sorunsuz: "OK",
  "2xx: sayfa açıldı": "2xx: page loaded",
  Yönlendirme: "Redirect",
  "3xx: başka adrese gidiyor": "3xx: goes to another URL",
  Hatalı: "Has errors",
  "4xx / 5xx: sayfa açılmadı": "4xx / 5xx: page didn't load",
  Ulaşılamadı: "Unreachable",
  "Sunucudan yanıt gelmedi": "No response from the server",
  "Ana sayfa": "Home",
  "1 tık": "1 click",
  "2 tık": "2 clicks",
  "3 tık": "3 clicks",
  "4+ tık": "4+ clicks",

  // audit/results/coverageReasons.ts (URL Inspection states)
  "robots.txt izin veriyor": "Allowed by robots.txt",
  "robots.txt engelliyor": "Blocked by robots.txt",
  "Google henüz bakmadı": "Google hasn't checked yet",
  "Dizine almaya izin var": "Indexing allowed",
  "Gizleme etiketi (noindex) engelliyor": "Blocked by the noindex meta tag",
  "Sunucu başlığı (X-Robots-Tag) engelliyor":
    "Blocked by the X-Robots-Tag HTTP header",
  "Sayfa alındı": "Page fetched",
  "Boş sayfa, hata vermeden açılıyor (soft 404)":
    "Empty page that loads without an error (soft 404)",
  "robots.txt engelledi": "Blocked by robots.txt",
  "404, sayfa yok": "404, page not found",
  "401 yetkisiz": "401 unauthorized",
  "403 yasak": "403 forbidden",
  "Sunucu hatası": "Server error",
  "Yönlendirme hatası": "Redirect error",
  "Zaman aşımı": "Timed out",
  "Google tarafında tarama hatası": "Crawl error on Google's side",
  "Geçersiz adres": "Invalid URL",
  "Google henüz almadı": "Google hasn't fetched it yet",
  "Zengin sonuç verisi geçerli": "Rich result data is valid",
  "Zengin sonuç verisinde uyarı var": "Rich result data has warnings",
  "Zengin sonuç verisi geçersiz": "Rich result data is invalid",
  "Zengin sonuç verisi yok": "No rich result data",
  "Google henüz değerlendirmedi": "Google hasn't evaluated it yet",

  // audit/results/ResultsView.tsx
  "{count} sayfada engellendik.": {
    one: "We were blocked on {count} page.",
    other: "We were blocked on {count} pages.",
  },
  "Sitenin bot koruması tarayıcımızı durdurdu, o sayfalar denetlenemedi. Henüz bir çözümümüz yok. Masaüstü tarayıcılar sizin bilgisayarınızdan çalıştığı için genelde geçer. Şunları deneyin: {librecrawl} (ücretsiz, açık kaynak) ya da {screamingfrog} (500 adrese kadar ücretsiz).":
    "The site's bot protection stopped our crawler, so those pages couldn't be audited. We have no workaround yet. Desktop crawlers usually get through because they run from your own computer. Try {librecrawl} (free, open source) or {screamingfrog} (free up to 500 URLs).",
  "Tarama, sitenin istek sınırı yüzünden erken durdu.":
    "The crawl stopped early because of the site's rate limit.",
  "Site {count} sayfada istek sınırı uyguladı.": {
    one: "The site rate-limited {count} page.",
    other: "The site rate-limited {count} pages.",
  },
  "İstenen bekleme süresi denetim süresini aştı, bazı adresler ziyaret edilmedi. Bu rapor eksik.":
    "The wait the site asked for ran past the audit's time limit, so some URLs weren't visited. This report is incomplete.",
  'Sunucunun "çok fazla istek" (429) yanıtı verdiği sayfalar denetlenemedi.':
    'Pages where the server answered "too many requests" (429) couldn\'t be audited.',
  'İstek sınırı sıfırlandıktan sonra denetimi yeniden başlatın, ya da site sahibinden "seotracker-audit" tarayıcısına izin vermesini isteyin.':
    'Run the audit again once the rate limit resets, or ask the site owner to allow the "seotracker-audit" crawler.',
  "başka bir mülk": "another property",
  "Bu denetim {auditedHost} sitesine ait, bağlı mülk ise {propertyHost}. Sorarsak kota boşa giderdi.":
    "This audit is of {auditedHost}, but the connected property is {propertyHost}. Asking would waste quota.",
  "Sorunlu sayfalar ({count})": "Pages with issues ({count})",
  "Sayfalar ({count})": "Pages ({count})",
  "Dizin durumu": "Index status",
  "Dizin durumu ({count})": "Index status ({count})",
  "Hız ({count})": "Speed ({count})",

  // audit/results/PagesTable.tsx
  "{issue} sorunu olan sayfalar": "Pages with: {issue}",
  "Taranan sayfalar": "Crawled pages",
  "Bu denetim hiçbir sayfa taramadı.": "This audit didn't crawl any pages.",
  "Bu filtrelerle eşleşen sayfa yok.": "No pages match these filters.",

  // audit/results/ResultsTables.tsx
  "Sayfa hızı ölçümleri": "Page speed measurements",
  "Bu denetimde Lighthouse sonucu yok.":
    "This audit has no Lighthouse results.",
  "Bu filtrelerle eşleşen performans sonucu yok.":
    "No performance results match these filters.",
  "Hız ölçümü hiç puan vermedi": "The speed measurement returned no score",
  başarısız: "failed",
  tamam: "ok",
  "Hız puanı (0-100)": "Performance score (0-100)",
  "Erişilebilirlik puanı (0-100)": "Accessibility score (0-100)",
  "Arama motoru uyumu puanı (0-100)": "Search engine readiness score (0-100)",
  "Ana içeriğin görünme süresi": "Time until the main content appears",
  "Sayfanın ne kadar kaydığı": "How much the page shifts",
  "Tıklamaya yanıt süresi": "Time to respond to a click",
  "Sunucunun ilk yanıt süresi": "Time to the server's first response",
  Sorunlar: "Issues",
  "Sorunları gör": "See issues",
  "E-Tablolar'a aktar ({count} satır)": {
    one: "Export to Sheets ({count} row)",
    other: "Export to Sheets ({count} rows)",
  },
  "CSV ({count} satır)": {
    one: "CSV ({count} row)",
    other: "CSV ({count} rows)",
  },
  "JSON ({count} satır)": {
    one: "JSON ({count} row)",
    other: "JSON ({count} rows)",
  },

  // audit/results/pagesColumns.tsx
  "{count} sorunu göster": {
    one: "Show {count} issue",
    other: "Show {count} issues",
  },
  yönlendirme: "redirect",
  eksik: "missing",
  "Sayfadaki kelime sayısı": "Number of words on the page",
  "Sayfadaki görsel sayısı. Renkli sayı, alt metni (açıklaması) eksik görsellerin sayısıdır.":
    "Number of images on the page. The colored number counts images missing alt text (their description).",
  Bağlantı: "Links",
  "Bu sayfadan çıkan bağlantılar. Önce site içi, sonra dışarı giden sayısı yazar. Site içi bağlantısı olmayan sayfa, sitenin geri kalanına yönlendirmiyor demektir.":
    "Links leaving this page: internal first, then external. A page with no internal links leads nowhere else on the site.",
  Dizin: "Index",
  Derinlik: "Depth",
  "Ana sayfadan kaç tıkla ulaşılıyor": "Clicks needed from the home page",
  Harita: "Sitemap",
  "Site haritasında var mı": "Whether it's in the sitemap",
  Var: "Listed",
  Yok: "None",

  // audit/results/AuditResultsTableFilters.tsx
  Ara: "Search",
  "Adres, başlık, açıklama": "URL, title, description",
  Tümü: "All",
  "Alt metni": "Alt text",
  "Alt metni yok": "Missing alt text",
  "Alt metni tam": "Alt text complete",
  Dizinlenebilir: "Indexable",
  "Hayır (noindex)": "No (noindex)",
  "Site haritası": "Sitemap",
  Haritada: "In sitemap",
  "Haritada yok": "Not in sitemap",
  Başarılı: "Succeeded",
  "En çok LCP (sn)": "Max LCP (s)",
  Filtreler: "Filters",
  "Filtreleri aç/kapat": "Show or hide filters",
  "Sonuçları filtrele": "Filter results",
  "{count} etkin": "{count} active",
  "Tümünü temizle": "Clear all",
  "En az": "Min",
  "En fazla": "Max",
  "{label} en az": "{label} minimum",
  "{label} en fazla": "{label} maximum",

  // audit/results/IndexCoverageView.tsx
  "Search Console bağlı değil. Sayfaların Google'daki durumunu görmek için önce bağlayın.":
    "Search Console isn't connected. Connect it first to see how Google treats your pages.",
  "Google'ın günlük {limit} adres sınırı doldu. {count} sayfa sırada, sınır birkaç saat içinde yenilenir.":
    {
      one: "Google's daily limit of {limit} URLs is used up. {count} page is waiting; the limit resets within a few hours.",
      other:
        "Google's daily limit of {limit} URLs is used up. {count} pages are waiting; the limit resets within a few hours.",
    },
  "Tüm sayfalar güncel, sorulacak bir şey yok.":
    "All pages are up to date; there's nothing to check.",
  "{count} sayfa soruldu.": {
    one: "Checked {count} page.",
    other: "Checked {count} pages.",
  },
  "{count} sayfa kaldı.": {
    one: "{count} page left.",
    other: "{count} pages left.",
  },
  "Bugünkü kotadan {count} sorgu kaldı.": {
    one: "{count} check left in today's quota.",
    other: "{count} checks left in today's quota.",
  },
  "Google'daki durum sorulamadı. Birazdan tekrar deneyin.":
    "Couldn't check the status on Google. Try again shortly.",
  "Dizin durumu yüklenemedi": "Couldn't load the index status",
  "Sorulacak sayfa yok": "No pages to check",
  "Bu denetimde Google'ın dizine alabileceği bir sayfa yok.":
    "This audit has no pages Google could index.",
  "Google'ın farklı adresi seçtiği sayfalar":
    "Pages where Google chose a different canonical",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar. Google, sizin seçtiğiniz adres yerine başka bir sayfayı asıl sayfa saydı.":
    "Counts every checked page, whatever group you picked in the chart above. Google treated a different page as canonical instead of the one you declared.",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar.":
    "Counts every checked page, whatever group you picked in the chart above.",
  "Bu denetimde henüz sorulmamış": "Not yet checked in this audit",
  "Google'a hiç sorulmamış sayfalar. Son kontrol {date}":
    "Pages never checked with Google. Last check {date}",
  "Google'a hiç sorulmamış sayfalar. Henüz kontrol yapılmadı.":
    "Pages never checked with Google. No checks yet.",
  "Google günde en çok {limit} adres sormanıza izin verir. Her seferde {batch} sayfa kontrol edilir. Önce hiç sorulmamış olanlara, sonra Google'ın dizine almadıklarına bakılır.":
    "Google lets you check up to {limit} URLs a day. Each run checks {batch} pages: first those never checked, then those Google didn't index.",
  "Google'da durumunu kontrol et": "Check status on Google",
  "Google'da henüz kontrol edilmedi": "Not checked on Google yet",
  "Taradığınız sayfaların gerçekten dizine girip girmediğini görmek için yukarıdaki düğmeyi kullanın.":
    "Use the button above to see whether your crawled pages are actually indexed.",

  // audit/results/CoverageTable.tsx
  "{count} sayfa gösteriliyor": {
    one: "Showing {count} page",
    other: "Showing {count} pages",
  },
  "Tümünü göster": "Show all",
  Sebep: "Reason",
  "Google'ın son ziyareti": "Google's last crawl",
  "Sizin seçtiğiniz: {url}": "Your choice: {url}",
  "{url} adresini Search Console'da aç": "Open {url} in Search Console",
  "Search Console'da aç": "Open in Search Console",
  "Google bu adres için yanıt vermedi ({error}). Google'da durumunu kontrol et düğmesiyle yeniden sorabilirsiniz.":
    "Google didn't answer for this URL ({error}). You can ask again with the Check status on Google button.",
  Sorulamadı: "Check failed",
  "Kontrol edilmedi": "Not checked",
  "Yanıt alınamadı": "No answer",

  // lighthouse/cruxHistoryView.ts
  iyi: "good",
  geliştirilmeli: "needs improvement",
  zayıf: "poor",
  "düşüyor, yani iyileşiyor": "falling, so improving",
  "yükseliyor, yani kötüleşiyor": "rising, so getting worse",
  "yatay seyrediyor": "holding steady",
  "{metric} son {count} haftada {start} değerinden {now} değerine geldi, {trend}; şu an {rating}.":
    {
      one: "{metric} went from {start} to {now} over the last {count} week, {trend}; currently {rating}.",
      other:
        "{metric} went from {start} to {now} over the last {count} weeks, {trend}; currently {rating}.",
    },

  // lighthouse/CruxHistoryCard.tsx
  "Gerçek kullanıcı hızı, son haftalar": "Real-user speed, recent weeks",
  "Cihaz türü": "Device type",
  Telefon: "Phone",
  Bilgisayar: "Desktop",
  "Google'a ulaşılamadı.": "Couldn't reach Google.",
  "Tekrar dene": "Try again",
  "Bu geçmiş için PageSpeed anahtarı gerekiyor.":
    "This history needs a PageSpeed key.",
  "Ayarlar'a git": "Go to Settings",
  "Google bu site için yeterli ziyaretçi verisine sahip değil. Siteye Chrome ile gelen ziyaretçi arttıkça burada görünür.":
    "Google doesn't have enough visitor data for this site yet. It appears here as more visitors arrive using Chrome.",
  "Google bu site için yeterli ziyaretçi verisine sahip değil.":
    "Google doesn't have enough visitor data for this site.",
  "Her nokta, o haftada biten 28 günde ziyaretçilerin yüzde 75'inin gördüğü değerdir (p75). Kesikli çizgiler iyi ile zayıf arasındaki sınırlardır.":
    "Each point is the value 75% of visitors saw in the 28 days ending that week (p75). The dashed lines mark the good and poor thresholds.",
  "Son pencere {date} tarihinde bitiyor.": "The latest window ends on {date}.",

  // lighthouse/issues/utils.tsx
  Kategori: "Category",
  Puan: "Score",
  "Görünen değer": "Displayed value",
  Açıklama: "Description",
  "Etki (ms)": "Impact (ms)",
  "Etki (bayt)": "Impact (bytes)",
  "Etkilenen öğeler": "Affected elements",
  "En iyi uygulamalar": "Best practices",
  "Tüm sorunlar": "All issues",
  "Tüm sorunları": "all issues",
  "Performans sorunları": "Performance issues",
  "Performans sorunlarını": "performance issues",
  "Erişilebilirlik sorunları": "Accessibility issues",
  "Erişilebilirlik sorunlarını": "accessibility issues",
  "En iyi uygulama sorunları": "Best practices issues",
  "En iyi uygulama sorunlarını": "best practices issues",
  "SEO sorunları": "SEO issues",
  "SEO sorunlarını": "SEO issues",

  // lighthouse/issues/LighthouseIssueList.tsx and LighthouseIssueRow.tsx
  "Bu kategoride işlem gerektiren sorun yok.":
    "No issues in this category need action.",
  Etki: "Impact",
  "Ayrıntıları gizle": "Hide details",
  "Ayrıntıları göster": "Show details",
  "Etkilenen öğeler ({count})": "Affected elements ({count})",

  // lighthouse/issues/LighthouseIssuesParts.tsx
  "{label} sayfasına dön": "Back to {label}",
  "{date} tarihinde tarandı": "Scanned on {date}",
  "Sayfa hızı sorunları (Lighthouse)": "Page speed issues (Lighthouse)",
  "Lighthouse sorunlarını dışa aktar": "Export Lighthouse issues",
  "Dışa aktar": "Export",
  "E-Tablolar'a aktar": "Export to Sheets",
  "{issues} E-Tablolar'da aç": "{issues}: open in Sheets",
  "İşlem gerektiren tüm sorunları E-Tablolar'da aç":
    "Open all issues that need action in Sheets",
  Kopyala: "Copy",
  "{issues} kopyalandı": "{issues} copied",
  "{issues} kopyala": "Copy {issues}",
  "İşlem gerektiren tüm sorunlar kopyalandı":
    "All issues that need action copied",
  "İşlem gerektiren tüm sorunları kopyala": "Copy all issues that need action",
  "Kayıtlı Lighthouse verisi kopyalandı": "Saved Lighthouse data copied",
  "Kayıtlı Lighthouse verisini kopyala": "Copy saved Lighthouse data",
  "JSON indir": "Download JSON",
  "{issues} indir": "Download {issues}",
  "İşlem gerektiren tüm sorunları indir":
    "Download all issues that need action",
  "Kayıtlı Lighthouse verisini indir": "Download saved Lighthouse data",
  "{category} ({count})": "{category} ({count})",

  // lighthouse/issues/LighthouseIssuesScreen.tsx
  "Lighthouse sorunları yüklenemedi.": "Couldn't load the Lighthouse issues.",
  "Bu denetim, Lighthouse sorun ayrıntıları olmadan kaydedilmiş. Bu ekranı doldurmak için denetimi yeniden başlatın.":
    "This audit was saved without Lighthouse issue details. Run the audit again to fill this screen.",
  "Bu Lighthouse çalışması, sorun ayrıntıları saklanmaya başlamadan önce kaydedilmiş. Kategori sayılarını ve sorun kartlarını görmek için denetimi yeniden başlatın.":
    "This Lighthouse run was saved before issue details were stored. Run the audit again to see category counts and issue cards.",
  "İndirme başladı": "Download started",
  "Veri dışa aktarılamadı. Birazdan tekrar deneyin.":
    "Couldn't export the data. Try again shortly.",
  "CSV indirmesi başladı": "CSV download started",
  "Veri kopyalanamadı. Tekrar deneyin.": "Couldn't copy the data. Try again.",

  // lighthouse/issues/LighthouseIssuesSummary.tsx
  "Gerçek kullanıcı verisi · site geneli · son 28 gün":
    "Real-user data · whole site · last 28 days",
  "Gerçek kullanıcı verisi · bu sayfa · son 28 gün":
    "Real-user data · this page · last 28 days",
  "Yukarıdaki puanlar Google'ın test makinesinde ölçüldü. Bunlar sitenizi gerçekten ziyaret eden Chrome kullanıcılarından geliyor.":
    "The scores above were measured on Google's test machine. These come from Chrome users who actually visit your site.",
  "Bu sayfanın kendi ziyaretçi sayısı Google'ın eşiğinin altında kaldığı için sitenizin tamamının ortalaması gösteriliyor.":
    "This page has too few visitors of its own to meet Google's threshold, so the average for your whole site is shown.",

  // lighthouse/issues/LabFieldComparison.tsx
  "Laboratuvar ↔ gerçek kullanıcı": "Lab ↔ real users",
  "Test ortamında sitenizin hızı ziyaretçilerinkinden iyi çıkıyor. Google sıralamada sağdaki sütunu kullanır.":
    "Your site looks faster in the test environment than it is for visitors. Google uses the right-hand column for ranking.",
  "Gerçek ziyaretçiler sitenizi test ortamından daha hızlı görüyor. Google sıralamada sağdaki sütunu kullanır.":
    "Real visitors see your site faster than the test environment does. Google uses the right-hand column for ranking.",
  "İki ölçüm birbirini tutuyor. Laboratuvar puanı ziyaretçilerin gördüğüne yakın.":
    "The two measurements agree. The lab score is close to what visitors experience.",
  Ölçüm: "Metric",
  Laboratuvar: "Lab",
  "Gerçek kullanıcı": "Real users",
  Fark: "Difference",
  Tutuyor: "Matches",
  "{gap} daha yavaş": "{gap} slower",
  "{gap} daha hızlı": "{gap} faster",
  "en büyük içerik": "largest content",
  "ilk içerik": "first content",
  "sunucu yanıtı": "server response",
  "düzen kayması": "layout shift",

  // src/shared/audit-issues: titles, explanations and how-to-fix steps.
  // audit-issues/crawl.ts
  "Tarama robotu engellendi": "Crawler was blocked",
  "Sayfa yerine bir bot doğrulaması ya da erişim engeli döndü (Cloudflare doğrulaması ya da 403 gibi), bu yüzden sayfa denetlenemedi. Google'ın tarayıcısı da benzer bir engele takılıyor olabilir; takılırsa sayfa aramada çıkmaz.":
    "Instead of the page, the server returned a bot check or an access block (a Cloudflare challenge or a 403, for example), so the page couldn't be audited. Googlebot may be hitting a similar block; if it is, the page won't appear in search.",
  'Site sizinse güvenlik duvarınızda ya da bot korumanızda "seotracker-audit" kullanıcı aracısına izin verin (Cloudflare\'de: kullanıcı aracısı "seotracker-audit" içerdiğinde bot korumasını atlayan bir WAF kuralı). Sonra denetimi yeniden başlatın.':
    'If the site is yours, allow the "seotracker-audit" user agent in your firewall or bot protection (in Cloudflare: a WAF rule that skips bot protection when the user agent contains "seotracker-audit"). Then run the audit again.',
  "İstek sınırına takıldı (429)": "Hit the rate limit (429)",
  "Sunucu 429 (çok fazla istek) yanıtı verdi, bu yüzden sayfa denetlenemedi. Sitenin istediği bekleme süresi denetimin süresine sığıyorsa tarayıcı bekleyip yeniden dener.":
    "The server answered 429 (too many requests), so the page couldn't be audited. If the wait the site asks for fits within the audit's time, the crawler waits and tries again.",
  'Sunucunuzda ya da güvenlik duvarınızda istek sınırını yükseltin veya "seotracker-audit" kullanıcı aracısını sınırın dışında tutun. Sonra denetimi yeniden başlatın. Sınır çok katıysa denetimi daha az sayfayla başlatmak da işe yarar.':
    'Raise the rate limit on your server or firewall, or exempt the "seotracker-audit" user agent from it. Then run the audit again. If the limit is very strict, starting the audit with fewer pages also helps.',
  "Tarama erken durdu: istek sınırı": "Crawl stopped early: rate limit",
  "Site, tarayıcıdan denetimin süresinden uzun beklemesini istedi, biz de sayfa istemeyi bıraktık. Bu rapor eksik; çekemediğimiz adresler kırık ya da sınırlanmış diye kaydedilmedi.":
    "The site asked the crawler to wait longer than the audit allows, so we stopped requesting pages. This report is incomplete; the URLs we couldn't fetch were not recorded as broken or rate-limited.",
  "Sitenin istek sınırı sıfırlandıktan sonra denetimi yeniden başlatın. Sorun sürerse site yöneticisinden seotracker-audit tarayıcısına izin vermesini isteyin.":
    "Run the audit again after the site's rate limit resets. If it keeps happening, ask the site administrator to allow the seotracker-audit crawler.",
  "Sunucu hatası (5xx)": "Server error (5xx)",
  "Sayfa 5xx sunucu hatası verdi. Google sürekli hata veren siteyi daha seyrek tarar ve sayfayı dizinden çıkarabilir.":
    "The page returned a 5xx server error. Google crawls a site that keeps erroring less often and may drop the page from its index.",
  "Sunucu günlüklerinde bu adrese ait hatayı bulup giderin. Sayfa bilerek kaldırıldıysa hata yerine 404 ya da 410 döndürün veya ilgili bir sayfaya yönlendirin.":
    "Find the error for this URL in the server logs and fix it. If the page was removed on purpose, return a 404 or 410 instead of an error, or redirect to a related page.",
  "Kırık iç bağlantı": "Broken internal link",
  "Bu sayfa, hata veren (4xx ya da 5xx) başka bir sayfaya bağlantı veriyor. Kırık bağlantı ziyaretçiyi çıkmaza sokar ve Google'ın sayfaya ulaşmasını engeller; çok büyük sitelerde taramayı da boşa harcar.":
    "This page links to another page that returns an error (4xx or 5xx). A broken link leads visitors to a dead end and keeps Google from reaching the page; on very large sites it also wastes crawling.",
  "Bağlantıyı çalışan doğru adrese çevirin ya da kaldırın. Hedef taşındıysa yönlendirmeye güvenmeyin, doğrudan yeni adrese bağlanın.":
    "Point the link to the correct working URL, or remove it. If the target moved, don't rely on a redirect: link straight to the new URL.",
  "Sayfa açılırken hata veriyor (4xx)": "Page returns an error (4xx)",
  "Bu adres hata döndürdü (404 gibi). Site haritanızda ya da başka sayfalarda geçiyorsa Google boşuna istek yapmaya devam eder; bu, esas olarak çok büyük sitelerde tarama bütçesi açısından önemlidir.":
    "This URL returned an error (such as 404). If it appears in your sitemap or on other pages, Google keeps requesting it for nothing; this matters mainly for crawl budget on very large sites.",
  "Sayfa var olmalıysa geri yayınlayın. Bilerek kaldırıldıysa site haritasından ve iç bağlantılardan çıkarın; yerine geçecek bir sayfa varsa oraya 301 (kalıcı) yönlendirme verin.":
    "If the page should exist, publish it again. If you removed it on purpose, take it out of the sitemap and internal links; if another page replaces it, add a 301 (permanent) redirect there.",
  "Yönlendirme zinciri": "Redirect chain",
  "Son sayfaya ulaşmak için art arda iki ya da daha fazla yönlendirme gerekiyor. Her adım sayfayı yavaşlatır ve tarama bütçesinden (Google'ın siteniz için ayırdığı tarama zamanından) harcar; bu, esas olarak çok büyük siteler için önemlidir. Çok uzun zincirler (10 adımdan fazla) Google'ın takip ettiği kadarıyla hiç izlenmez.":
    "Reaching the final page takes two or more redirects in a row. Each hop slows the page down and uses crawl budget (the crawling time Google sets aside for your site); this matters mainly for very large sites. Very long chains (more than 10 hops) aren't followed at all, as far as Google follows them.",
  "İlk adresi ve ona bağlantı veren sayfaları doğrudan son hedefe yönlendirin; en fazla tek yönlendirme kalsın.":
    "Redirect the first URL, and the pages linking to it, straight to the final destination, so at most one redirect remains.",
  "Yönlendirme döngüsü": "Redirect loop",
  "Bu adresin yönlendirmesi dönüp dolaşıp kendine geliyor, yani sayfa hiç açılmıyor. Tarayıcılar ve Google hata verip vazgeçer.":
    "This URL's redirects circle back to itself, so the page never loads. Browsers and Google give up with an error.",
  "Bu adresin yönlendirme kurallarını izleyip döngüyü kırın; zincir gerçekten açılan bir sayfada (200) bitmeli.":
    "Follow this URL's redirect rules and break the loop; the chain should end on a page that actually loads (200).",
  "Hiçbir sayfadan bağlantı almayan sayfa": "Page with no links pointing to it",
  "Taranan hiçbir sayfa bu adrese bağlantı vermiyor. Google sayfaları bağlantıları izleyerek bulur, bu yüzden böyle bir sayfa daha seyrek taranır ve ziyaretçi gezinerek ona ulaşamaz.":
    "No crawled page links to this URL. Google finds pages by following links, so a page like this is crawled less often, and visitors can't reach it by browsing.",
  "İlgili sayfalardan buraya bağlantı verin (menü, ilgili yazılar, kategori sayfası). Sayfanın aramada çıkması gerekmiyorsa site haritasından da çıkarın.":
    "Link to it from related pages (the menu, related posts, a category page). If the page doesn't need to appear in search, also remove it from the sitemap.",
  "Sunucu yanıtı yavaş": "Slow server response",
  "Sunucu sayfanın HTML'ini 600 milisaniyeden geç verdi; Lighthouse de aynı eşiği kullanır. Bu gecikme sayfanın geri kalan tüm hız ölçümlerini de aşağı çeker. Süre, denetimi çalıştıran bilgisayardan ölçülür, ziyaretçilerinizin bağlantısından değil.":
    "The server took longer than 600 milliseconds to deliver the page's HTML; Lighthouse uses the same threshold. This delay also drags down every other speed measurement for the page. The time is measured from the computer running the audit, not from your visitors' connections.",
  "Bu sayfa için sunucu ve veritabanı süresine bakın, önbelleği açın. Önbelleğe alınmış ya da önceden üretilmiş (statik) HTML sunmak genelde sorunu çözer.":
    "Look at the server and database time for this page, and turn on caching. Serving cached or pre-built (static) HTML usually solves it.",
  "robots.txt dosyası sunucu hatası veriyor":
    "robots.txt returns a server error",
  "robots.txt dosyanız 5xx sunucu hatası veriyor. Google'ın belgelerine göre bu durumda ilk 12 saat siteyi hiç taramaz, sonra 30 gün boyunca dosyanın son çalışan kopyasını kullanır. Yani bu tek dosyanın hatası tüm sitenin taranmasını etkiler.":
    "Your robots.txt file returns a 5xx server error. According to Google's documentation, Google then doesn't crawl the site at all for the first 12 hours, and for the next 30 days uses the last working copy of the file. So an error in this one file affects crawling of the whole site.",
  "Sunucu hatasını giderin ve robots.txt adresinin normal açıldığını doğrulayın. Dosya hiç yoksa 404 döndürmesi sorun değildir; Google bunu 'kısıtlama yok' diye okur.":
    'Fix the server error and confirm the robots.txt URL loads normally. If the file doesn\'t exist at all, a 404 is fine; Google reads it as "no restrictions".',
  "robots.txt'ye ulaşılamadı": "Couldn't reach robots.txt",
  "robots.txt isteği tamamlanmadı (zaman aşımı, DNS ya da TLS hatası). Bu denetim dosyayı okuyamadığı için siteyi tamamen taranabilir saydı; gerçek robots.txt farklı kurallar içeriyor olabilir.":
    "The robots.txt request didn't complete (a timeout, DNS or TLS error). Because this audit couldn't read the file, it treated the whole site as crawlable; the real robots.txt may contain different rules.",
  "robots.txt adresini tarayıcıda açıp yanıt verdiğini kontrol edin. Yanıt veriyorsa hata geçici bir ağ sorunuydu, denetimi yeniden başlatın.":
    "Open the robots.txt URL in a browser and check that it responds. If it does, the error was a temporary network problem; run the audit again.",
  "robots.txt 500 KiB sınırını aşıyor": "robots.txt exceeds the 500 KiB limit",
  "Google robots.txt dosyasının yalnızca ilk 500 KiB'ını okur, gerisini yok sayar. Dosyanız bu sınırı aştığı için sondaki kurallar Google için yokmuş gibi davranır.":
    "Google reads only the first 500 KiB of a robots.txt file and ignores the rest. Your file is over that limit, so the rules at the end don't exist as far as Google is concerned.",
  "Dosyayı kısaltın. Tek tek adresleri engellemek yerine klasör kalıpları kullanın. Aramada çıkmaması gereken sayfalar için robots.txt yerine noindex daha kesin bir yoldur. Ama noindex'in çalışması için sayfanın robots.txt ile engellenmemiş olması gerekir; Google engellenmiş sayfadaki noindex'i göremez.":
    "Shorten the file. Use folder patterns instead of blocking URLs one by one. For pages that shouldn't appear in search, noindex is a more reliable tool than robots.txt. But for noindex to work, the page must not be blocked by robots.txt; Google can't see a noindex on a blocked page.",
  "Başlangıç adresi robots.txt ile engellenmiş":
    "Start URL is blocked by robots.txt",
  "Denetimi başlattığınız adresi sitenizin kendi robots.txt dosyası taramaya kapatıyor. Google da bu kurala uyar, yani bu sayfayı taramaz. Bu denetim de aynı nedenle o sayfadan başlayamadı.":
    "Your site's own robots.txt blocks crawling of the URL you started the audit from. Google follows this rule too, so it doesn't crawl this page. For the same reason, this audit couldn't start from it.",
  "Sayfanın taranması gerekiyorsa robots.txt'teki ilgili Disallow satırını kaldırın. Engel bilerek konduysa denetimi taranabilir bir adresten başlatın.":
    "If the page should be crawled, remove the matching Disallow line from robots.txt. If the block is intentional, start the audit from a crawlable URL.",
  "Site haritasındaki sayfa açılmıyor": "Sitemap page doesn't load",
  "Bu adres site haritanızda listelenmiş ama hata veriyor. Site haritası Google'a 'şu sayfaları tara' demenin yoludur; açılmayan adres listelemek Google'ı boşa gönderir ve haritanıza güveni azaltır.":
    'This URL is listed in your sitemap but returns an error. A sitemap is how you tell Google "crawl these pages"; listing URLs that don\'t load sends Google on wasted trips and makes your sitemap less trustworthy.',
  "Sayfa var olmalıysa hatayı giderin. Kaldırıldıysa adresi site haritasından çıkarın. Harita otomatik üretiliyorsa, silinen sayfaları listelememesi için üreticinin ayarını kontrol edin.":
    "If the page should exist, fix the error. If it was removed, take the URL out of the sitemap. If the sitemap is generated automatically, check the generator's settings so it stops listing deleted pages.",
  "Site haritasındaki sayfa yönlendiriyor": "Sitemap page redirects",
  "Bu adres site haritanızda listelenmiş ama başka bir adrese yönlendiriyor. Google site haritasındaki adresleri 'asıl adres' önerisi sayar (asıl adres: aynı sayfanın aramada gösterilmesini istediğiniz tek adres). Yani asıl olmadığını kendiniz söylediğiniz bir adresi öneriyorsunuz.":
    "This URL is listed in your sitemap but redirects to another URL. Google treats sitemap URLs as canonical suggestions (the canonical is the one URL you want shown in search for a page). So you're suggesting a URL that you yourself say isn't canonical.",
  "Site haritasında yönlendirmenin kaynağını değil, vardığı hedef adresi listeleyin.":
    "List the redirect's destination URL in the sitemap, not its source.",
  "Site haritasındaki adres robots.txt ile engellenmiş":
    "Sitemap URL is blocked by robots.txt",
  "Bu adres için iki kural çelişiyor: site haritası Google'a 'bunu tara' derken robots.txt 'tarama' diyor. Google robots.txt'ye uyar ve sayfayı taramaz; başka sitelerden bağlantı alıyorsa içeriğini görmeden yine de dizine alabilir.":
    'Two rules conflict for this URL: the sitemap tells Google "crawl this" while robots.txt says "don\'t". Google follows robots.txt and doesn\'t crawl the page; if other sites link to it, Google may still index it without seeing its content.',
  "Sayfanın aramada çıkmasını istiyorsanız robots.txt engelini kaldırın. İstemiyorsanız adresi site haritasından çıkarın.":
    "If you want the page in search, remove the robots.txt block. If you don't, take the URL out of the sitemap.",
  "Site haritasındaki sayfa, asıl adres olarak başka sayfayı gösteriyor":
    "Sitemap page names another page as its canonical",
  "Bu sayfa site haritasında listelenmiş ama kendi içinde asıl adres olarak başka bir adresi gösteriyor. Aynı sayfa için iki farklı öneri göndermiş oluyorsunuz; Google birini seçer. Bilerek yaptıysanız sorun yok.":
    "This page is listed in the sitemap, but its own canonical tag points to a different URL. You're sending two different suggestions for the same page, and Google picks one. If you did this on purpose, it's fine.",
  "Site haritasında yalnızca asıl adresler olmalı: bu adresi haritadan çıkarın ya da sayfanın canonical (asıl adres) etiketini sayfanın kendi adresine çevirin.":
    "A sitemap should contain only canonical URLs: remove this URL from the sitemap, or change the page's canonical tag to the page's own URL.",
  "Site haritasındaki sayfa arama sonuçlarından gizlenmiş":
    "Sitemap page is hidden from search results",
  "Bu sayfa site haritasında listelenmiş ama noindex ile aramadan gizlenmiş. Yani hem 'bunu tara' hem 'bunu gösterme' diyorsunuz. Sayfayı yeni gizlediyseniz bu geçici olabilir: Google noindex'i görmek için sayfayı bir kez daha taramalı.":
    'This page is listed in the sitemap but hidden from search with noindex. So you\'re saying both "crawl this" and "don\'t show this". If you only just hid the page, this may be temporary: Google has to crawl the page once more to see the noindex.',
  "Sayfa aramada çıkacaksa noindex'i kaldırın. Kalıcı olarak gizli kalacaksa, Google noindex'i gördükten sonra adresi site haritasından çıkarın.":
    "If the page should appear in search, remove the noindex. If it should stay hidden for good, remove the URL from the sitemap once Google has seen the noindex.",
  "Sayfa site yapısında çok derinde":
    "Page is buried deep in the site structure",
  "Bu sayfa ana sayfadan 5 ya da daha fazla tık uzakta. Derin sayfalar Google tarafından daha seyrek taranabilir ve ziyaretçinin bulması zorlaşır.":
    "This page is 5 or more clicks from the home page. Google may crawl deep pages less often, and visitors have a harder time finding them.",
  "Kategori sayfaları, menü ya da öne çıkan listeler gibi üst sayfalardan buraya bağlantı vererek yolu kısaltın.":
    "Shorten the path by linking here from higher-level pages, such as category pages, the menu or featured lists.",
  "Site haritası dosyası okunamayacak kadar büyük":
    "Sitemap file is too large to read",
  "Site haritası parçalarından biri bu aracın okuma sınırını (10 MB) aştı, bu yüzden içindeki adresler bu denetime girmedi. Google'ın sınırı 50 MB olduğundan dosya Google için geçerli olabilir; ama buradaki sayfa listesi eksik.":
    "One of the sitemap files exceeded this tool's read limit (10 MB), so the URLs in it weren't included in this audit. Google's limit is 50 MB, so the file may still be valid for Google, but the page list here is incomplete.",
  "Site haritanızı daha küçük parçalara bölün ve bir site haritası dizini (sitemapindex) ile birbirine bağlayın. Her parça 50 MB ve 50.000 adresin altında kalmalı; daha küçük parçalar iki tarafın da işine yarar.":
    "Split your sitemap into smaller files and tie them together with a sitemap index (sitemapindex). Keep each file under 50 MB and 50,000 URLs; smaller files work better for both tools.",
  "Site haritasında 50.000'den fazla adres var":
    "Sitemap has more than 50,000 URLs",
  "Google bir site haritası dosyasında en fazla 50.000 adrese izin verir. Bu parça sınırı aşıyor; Google dosyayı reddedebilir ya da bir kısmını yok sayabilir.":
    "Google allows at most 50,000 URLs in one sitemap file. This file exceeds the limit; Google may reject it or ignore part of it.",
  "Dosyayı her biri 50.000 adresin altında kalan parçalara bölün ve hepsini bir site haritası dizini (sitemapindex) dosyasında listeleyin. Search Console'a parçaları tek tek değil, yalnızca dizin dosyasını gönderin.":
    "Split the file into parts of fewer than 50,000 URLs each, and list them all in a sitemap index (sitemapindex) file. Submit only the index file to Search Console, not each part.",
  "Site haritasında hiç lastmod tarihi yok": "Sitemap has no lastmod dates",
  "Site haritasındaki adreslerin hiçbirinde <lastmod> (son değişiklik tarihi) yok. Google bu alan doğru olduğu sürece hangi sayfayı ne zaman yeniden tarayacağını buna göre seçer. Yoksa yeniden tarama Google'ın kendi takvimine kalır; güncellediğiniz sayfanın fark edilmesi günler sürebilir.":
    "None of the URLs in the sitemap has a <lastmod> (last modified date). As long as this field is accurate, Google uses it to decide which pages to recrawl and when. Without it, recrawling follows Google's own schedule, and it can take days for an updated page to be noticed.",
  "Site haritasını üreten ayarda ya da eklentide her adres için <lastmod> açın ve içeriğin gerçekten değiştiği tarihi yazdırın. Yayın tarihini ya da her derlemedeki anı yazmayın; bu alanı değersiz kılar.":
    "Turn on <lastmod> for every URL in the setting or plugin that generates your sitemap, and have it write the date the content actually changed. Don't write the publish date or the time of each build; that makes the field worthless.",
  "Site haritasında gelecek tarihli lastmod var":
    "Sitemap has a lastmod date in the future",
  "En az bir adresin <lastmod> (son değişiklik tarihi) değeri gelecekte. Bu doğru olamaz; Google bir sitenin tarihlerini tutarsız bulursa alanı o site için tümden yok sayar, yani doğru tarihleriniz de işe yaramaz.":
    "At least one URL has a <lastmod> (last modified date) in the future. That can't be right; when Google finds a site's dates unreliable, it ignores the field for that whole site, so your correct dates stop helping too.",
  "Tarihleri üreten yeri kontrol edin. Genelde sunucu saatinin ileri olmasından ya da tarih alanına içerik tarihi yerine yayın planı tarihinin yazılmasından olur; düzeltip site haritasını yeniden üretin.":
    "Check whatever generates the dates. It's usually a server clock running ahead, or a scheduled publish date written into the field instead of the content's date. Fix it and regenerate the sitemap.",
  "Sayfanın ihtiyaç duyduğu dosya robots.txt ile engellenmiş":
    "A file the page needs is blocked by robots.txt",
  "Sayfa taranabiliyor ama içindeki bir JavaScript ya da CSS dosyası robots.txt ile kapatılmış. Google engellenen dosyadaki JavaScript'i çalıştırmaz ve CSS'i okuyamaz; içerik JavaScript ile geliyorsa Google boş bir sayfa görür. Klasik örnek `Disallow: /wp-includes/` kuralıdır.":
    "The page can be crawled, but a JavaScript or CSS file it uses is blocked by robots.txt. Google doesn't run JavaScript from a blocked file and can't read its CSS; if content is loaded with JavaScript, Google sees an empty page. The classic example is a `Disallow: /wp-includes/` rule.",
  "robots.txt'den bu dosyaları kapsayan kuralı kaldırın. Sayfayı gizlemek istiyorsanız sayfanın kendisini engelleyin; onu oluşturan dosyaları engellemek sayfayı gizlemez, yalnızca Google'ın yanlış görmesine yol açar.":
    "Remove the robots.txt rule that covers these files. If you want to hide the page, block the page itself; blocking the files that build it doesn't hide it, it only makes Google see it wrong.",
  "İç bağlantı yönlendirmeye gidiyor": "Internal link points to a redirect",
  "Bu sayfa sitenizdeki bir adrese bağlantı veriyor ama o adres başka bir yere yönlendiriyor. Bağlantı çalışır ama fazladan bir adım atılır: ziyaretçi bekler ve Google yönlendirmeyi de izlemek zorunda kalır (tarama bütçesi esas olarak çok büyük sitelerde önemlidir). Genelde adresler değişip iç bağlantılar eskisinde kalınca olur.":
    "This page links to a URL on your site, but that URL redirects somewhere else. The link works, but with an extra step: visitors wait, and Google has to follow the redirect too (crawl budget matters mainly on very large sites). It usually happens when URLs change and internal links keep the old one.",
  "Bağlantıyı yönlendirmenin vardığı yeni adresle değiştirin. Yönlendirmenin kendisi kalsın; dışarıdan gelen bağlantılar için gerekli. Düzeltilecek olan kendi sitenizin içinden verdiğiniz adrestir.":
    "Replace the link with the new URL the redirect leads to. Keep the redirect itself; links from other sites still need it. What needs fixing is the URL you link to from within your own site.",
  "Sayfa güvenli olmayan http ile açılıyor": "Page loads over insecure http",
  'Sayfa şifreli (https) yerine düz http ile sunuluyor. Tarayıcılar adres çubuğunda "Güvenli değil" uyarısı gösterir, formlara girilen bilgiler başkalarınca görülebilir ve Google https\'i hafif bir sıralama işareti sayar. Aynı içeriğin iki sürümü varsa https olanı tercih eder.':
    'The page is served over plain http instead of encrypted https. Browsers show a "Not secure" warning in the address bar, information entered in forms can be seen by others, and Google treats https as a light ranking signal. When the same content exists in both versions, Google prefers the https one.',
  'Barındırma firmanızdan ya da site oluşturucunuzun ayarlarından ücretsiz bir SSL sertifikası açın. Sonra tüm http adreslerini kalıcı yönlendirmeyle (301) https karşılığına gönderin; "http://siteniz.com/hakkimizda" açılınca "https://siteniz.com/hakkimizda" adresine geçilsin.':
    'Turn on a free SSL certificate with your hosting provider or in your site builder\'s settings. Then send every http URL to its https counterpart with a permanent (301) redirect, so opening "http://yoursite.com/about" goes to "https://yoursite.com/about".',
  "Güvenli sayfada güvensiz kaynak": "Insecure resource on a secure page",
  "Bu https sayfa, http ile yüklenen bir betik ya da stil dosyası istiyor. Tarayıcılar bunu engeller: betik çalışmaz, stil uygulanmaz. Google'ın sayfayı işlerken bu dosyayı yükleyememesi de mümkündür; bu yüzden sayfa sizin gördüğünüzden farklı işlenebilir. Adres çubuğundaki kilit de bozulur.":
    "This https page requests a script or stylesheet over http. Browsers block it: the script doesn't run and the styles aren't applied. Google may also fail to load the file while rendering, so the page may be processed differently from what you see. The padlock in the address bar breaks as well.",
  "Dosyanın adresini https'e çevirin. Dosya https sunmuyorsa kendi sunucunuza alın ya da https sunan bir alternatifle değiştirin.":
    "Change the file's URL to https. If the file isn't available over https, host it on your own server or replace it with an alternative that supports https.",
  "Karakter kodlaması belirtilmemiş": "Character encoding isn't declared",
  "Ne sunucu yanıtında ne de sayfanın ilk 1024 baytında karakter kodlaması (charset) belirtilmiş. Bu durumda tarayıcı ve Google kodlamayı tahmin eder; yanlış tahmin ettiğinde Türkçe karakterler (ş, ğ, ı) bozuk görünür.":
    "Neither the server response nor the first 1024 bytes of the page declare a character encoding (charset). Browsers and Google then guess the encoding; when they guess wrong, non-English characters (such as ş, ğ, ı) show up garbled.",
  'Sayfanın <head> bölümünün en başına `<meta charset="utf-8">` ekleyin. Şablondan üretiliyorsa şablonda bir kez eklemeniz yeter.':
    'Add `<meta charset="utf-8">` at the very start of the page\'s <head>. If pages come from a template, adding it once in the template is enough.',
  "Sayfa adresi çok uzun": "Page URL is too long",
  "Sayfanın adresi 115 karakterden uzun. Google için katı bir sınır yok ve sıralamayı etkilemez; ama uzun adres paylaşırken kırılır, arama sonucunda kısalarak görünür ve yazarken hata yapılmasına yol açar. Çoğu zaman adrese sorgu parametreleri ya da gereksiz klasörler eklenmiştir.":
    "The page's URL is longer than 115 characters. Google has no hard limit and it doesn't affect rankings, but a long URL breaks when shared, appears shortened in search results and invites typing mistakes. Usually query parameters or unnecessary folders have been added to it.",
  "Adresi kısa ve anlamlı tutun: klasör derinliğini azaltın, gereksiz kelimeleri ve parametreleri çıkarın. Adresi değiştirirseniz eskisinden yenisine 301 yönlendirme verin.":
    "Keep URLs short and meaningful: reduce folder depth and drop unnecessary words and parameters. If you change a URL, add a 301 redirect from the old one to the new one.",
  "Adreste büyük harf ya da alt çizgi var":
    "URL contains uppercase letters or underscores",
  "Sayfa adresinin yol kısmında büyük harf ya da alt çizgi (_) var. Adresler büyük/küçük harfe duyarlıdır: /Hakkimizda ile /hakkimizda Google'a iki ayrı sayfa gibi görünebilir ve içerik çift dizine girer. Google ayrıca kelimeleri ayırmak için tire (-) kullanılmasını önerir.":
    "The path of the page's URL contains uppercase letters or underscores (_). URLs are case-sensitive: /About and /about can look like two separate pages to Google, and the content gets indexed twice. Google also recommends hyphens (-) to separate words.",
  "Adresleri küçük harf ve tireyle yazın. Büyük harfli adrese gelenleri küçük harfli adrese 301 ile yönlendirin ve asıl adresi (canonical) küçük harfli olarak belirtin.":
    "Write URLs in lowercase with hyphens. Redirect visitors arriving at an uppercase URL to the lowercase one with a 301, and declare the lowercase URL as the canonical.",
  // audit-issues/content.ts
  "Başlık etiketi yok": "No title tag",
  "Sayfanın başlık etiketi (<title>) yok. Başlık, arama sonucunda mavi bağlantı olarak görünen yazıdır. Yoksa Google başlığı sayfadaki başlıklardan ya da başka bağlantı metinlerinden türetir; bu, sizin seçmeyeceğiniz bir metin olabilir.":
    "The page has no title tag (<title>). The title is the text shown as the blue link in search results. Without one, Google builds a title from the page's headings or other link text, which may not be the text you would choose.",
  "Sayfaya konusunu anlatan, sayfaya özgü bir <title> ekleyin (yaklaşık 50-60 karakter bir ölçüttür, kural değil). SEO eklentisi ya da site oluşturucunuz varsa başlık alanını doldurmanız yeter.":
    "Add a <title> that is unique to the page and describes its topic (about 50-60 characters is a guide, not a rule). If you use an SEO plugin or a site builder, filling in its title field is enough.",
  "Meta açıklama yok": "No meta description",
  "Sayfanın meta açıklaması yok. Bu, arama sonucunda başlığın altında görünen kısa özet yazısıdır. Yoksa Google özeti sayfa metninden kendisi seçer; bu özet sizin vermek istediğiniz mesaj olmayabilir.":
    "The page has no meta description. That is the short summary shown under the title in search results. Without one, Google picks a snippet from the page text itself, which may not be the message you want to give.",
  "Sayfayı özetleyen ve tıklamak için bir neden veren bir meta açıklama yazın. Yaklaşık 70-160 karakter bir ölçüttür, kural değil; Google sınır koymaz, kesilme ekran genişliğine göre değişir.":
    "Write a meta description that summarizes the page and gives people a reason to click. About 70-160 characters is a guide, not a rule; Google sets no limit, and where it gets cut off depends on screen width.",
  "H1 başlığı yok": "No H1 heading",
  "Sayfada H1 (ana başlık) yok. Google H1'i zorunlu tutmaz, ama başlıklar ziyaretçinin sayfanın konusunu ilk bakışta anlamasını ve ekran okuyucuyla gezinmeyi kolaylaştırır; Google da başlıkları sayfanın yapısını anlamak için kullanabilir.":
    "The page has no H1 (main heading). Google doesn't require an H1, but headings help visitors grasp the page's topic at a glance and make screen-reader navigation easier; Google may also use headings to understand the page's structure.",
  "Sayfaya konusunu anlatan tek bir H1 ekleyin; başlık etiketiyle uyumlu olsun.":
    "Add a single H1 that describes the page's topic, in line with its title tag.",
  "Birden çok H1 başlığı": "Multiple H1 headings",
  "Sayfada birden fazla H1 var. Google bunu sorun etmez, yani ceza yok. Ama çoğu zaman şablon hatasının işaretidir; örneğin logo ile sayfa başlığının ikisi de H1 olmuştur.":
    "The page has more than one H1. Google doesn't mind, so there's no penalty. But it's often a sign of a template mistake, such as both the logo and the page title being H1s.",
  "Ana başlık için tek H1 bırakın, diğerlerini H2 ya da H3 yapın. Logo gibi başlık olmayan öğelerden H1 etiketini kaldırın.":
    "Keep one H1 for the main heading and make the others H2 or H3. Remove the H1 tag from elements that aren't headings, such as the logo.",
  "Sayfada neredeyse hiç metin yok": "Page has almost no text",
  "Bu sayfada neredeyse hiç görünür metin bulunamadı. Genelde içeriğin JavaScript ile sonradan yüklenmesi ve ilk gelen HTML'de yer almaması yüzünden olur. Metnin kısa olması sorun değil; sorun sayfanın boş görünmesi, çünkü Google boş sayfayı dizine almak istemez.":
    "Almost no visible text was found on this page. This usually happens when content is loaded later with JavaScript and isn't in the initial HTML. Short text isn't the problem; the problem is the page looking empty, because Google doesn't want to index empty pages.",
  "Sayfayı açıp metnin göründüğünü, sonra sağ tık > Sayfa kaynağını görüntüle ile aynı metnin orada da olduğunu kontrol edin. Yoksa içeriği sunucu tarafında üretin. Sayfa gerçekten boşsa noindex ekleyin ya da daha dolu bir sayfayla birleştirin.":
    "Open the page and check that the text shows, then use right-click > View page source to check that the same text is there too. If it isn't, render the content on the server. If the page really is empty, add noindex or merge it into a fuller page.",
  "Alt metni olmayan görseller": "Images without alt text",
  "Sayfadaki bazı görsellerin alt metni (görseli anlatan kısa yazı) yok. Alt metin, görmeyen kullanıcılar için gereklidir ve Google'ın görselin ne olduğunu anlamasının başlıca yoludur.":
    "Some images on the page have no alt text (a short description of the image). Alt text is essential for blind users and is the main way Google understands what an image shows.",
  'Anlam taşıyan her görsele ne gösterdiğini anlatan kısa bir alt metin yazın. Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Give every meaningful image a short alt text describing what it shows. Leave alt text empty (alt="") only on purely decorative images.',
  "Sayfadan başka hiçbir yere bağlantı yok": "Page links nowhere else",
  "Bu sayfadan başka hiçbir sayfaya bağlantı verilmiyor, yani ziyaretçi ve Google için çıkmaz sokak. Google siteyi bağlantıları izleyerek gezer; buradan yeni bir yere gidemez.":
    "This page doesn't link to any other page, so it's a dead end for visitors and for Google. Google moves through a site by following links; from here it can't go anywhere new.",
  "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa, bağlantıların ilk gelen HTML'de de bulunduğundan emin olun.":
    "Add links to related pages, the parent category or the home page. If the menu is built with JavaScript, make sure its links are also in the initial HTML.",
  "Başlık çok uzun": "Title is too long",
  "Başlık yaklaşık 60 karakteri aşıyor. Bu bir ölçüt, kural değil: Google karakter sınırı koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun başlıkta en önemli kısım görünmeyebilir.":
    "The title is over about 60 characters. That's a guide, not a rule: Google sets no character limit, and where it gets cut off in search results depends on screen width. In a long title, the most important part may not show.",
  "Başlığı yaklaşık 50-60 karaktere indirin ve en önemli kelimeleri başa koyun.":
    "Cut the title to about 50-60 characters and put the most important words first.",
  "Başlık çok kısa": "Title is too short",
  "Başlık 10 karakterden kısa. Bu kadar kısa bir başlık sayfanın ne sunduğunu anlatmaya ve tıklatmaya yetmez.":
    "The title is shorter than 10 characters. A title this short can't say what the page offers or earn a click.",
  "Başlığı, sayfanın ne sunduğunu söyleyen bir ifadeye genişletin (yaklaşık 30-60 karakter).":
    "Expand the title into a phrase that says what the page offers (about 30-60 characters).",
  "Meta açıklama çok uzun": "Meta description is too long",
  "Meta açıklama yaklaşık 160 karakteri aşıyor. Bu bir ölçüt, kural değil: Google sınır koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun açıklamada sondaki mesaj görünmeyebilir.":
    "The meta description is over about 160 characters. That's a guide, not a rule: Google sets no limit, and where it gets cut off in search results depends on screen width. In a long description, the message at the end may not show.",
  "Ana mesajı başta tutarak açıklamayı yaklaşık 70-160 karaktere indirin.":
    "Cut the description to about 70-160 characters, keeping the main message at the start.",
  "Meta açıklama çok kısa": "Meta description is too short",
  "Meta açıklama yaklaşık 70 karakterden kısa. Bu bir ölçüt, kural değil; ama bu kadar kısa yazı arama sonucundaki alanı boşa harcar ve Google bunun yerine sayfadan kendi seçtiği bir metni gösterebilir.":
    "The meta description is shorter than about 70 characters. That's a guide, not a rule; but text this short wastes the space in search results, and Google may show a snippet of its own choosing from the page instead.",
  "Açıklamayı, sayfayı özetleyen ve tıklamak için bir neden veren yaklaşık 70-160 karaktere genişletin.":
    "Expand the description to about 70-160 characters that summarize the page and give a reason to click.",
  "Başlık seviyeleri atlanmış": "Heading levels are skipped",
  "Başlık seviyeleri atlanmış, örneğin H2'den sonra doğrudan H4 gelmiş. Bu, ekran okuyucuyla gezinen ziyaretçiler için sayfa yapısını karıştırır; Google için sıralama kuralı yoktur. Menü ve altbilgi başlıkları da bu sıralamaya dahil olduğundan bazen yanlış alarm olabilir.":
    "Heading levels are skipped, for example an H4 comes straight after an H2. This confuses the page structure for visitors navigating with a screen reader; Google has no ordering rule. Menu and footer headings count toward the order too, so this can sometimes be a false alarm.",
  "Başlıkları sırayla kullanın: H1, sonra H2, sonra H3. Seviye atlayan başlığı bir kademe yukarı çekin. Atlamanın menü ya da altbilgiden geldiğini görürseniz orada başlık etiketi yerine düz metin kullanın.":
    "Use headings in order: H1, then H2, then H3. Move the heading that skips a level up one step. If the skip comes from the menu or footer, use plain text there instead of a heading tag.",
  "Mobil görünüm etiketi (viewport) yok": "No mobile viewport tag",
  'Sayfada mobil görünüm etiketi (`<meta name="viewport">`) yok. Google siteleri telefon sürümü üzerinden değerlendirir; bu etiket yoksa sayfa telefonda masaüstü genişliğinde açılır ve okumak için yakınlaştırmak gerekir. Bu denetim taranan her sayfaya bakar, bu yüzden bozuk bir şablon gözden kaçmaz.':
    'The page has no mobile viewport tag (`<meta name="viewport">`). Google evaluates sites by their mobile version; without this tag the page opens at desktop width on a phone and has to be zoomed to read. This audit checks every crawled page, so a broken template won\'t slip through.',
  'Sayfanın `<head>` bölümüne `<meta name="viewport" content="width=device-width, initial-scale=1">` satırını ekleyin. Hemen her site için doğru değer budur.':
    'Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to the page\'s `<head>`. That\'s the right value for almost every site.',
  "Sayfa dili belirtilmemiş": "Page language isn't declared",
  "Sayfanın `<html>` etiketinde `lang` (sayfa dili) yok. Ekran okuyucular doğru telaffuz için, tarayıcılar çeviri önerisi için buna bakar. Google dili içerikten de anlar, ama açıkça yazmak belirsizliği ortadan kaldırır.":
    "The page's `<html>` tag has no `lang` (page language). Screen readers use it for correct pronunciation and browsers for translation offers. Google can tell the language from the content too, but stating it removes any doubt.",
  'Sayfanın başındaki `<html>` etiketine dilinizi ekleyin; Türkçe bir sayfa için `<html lang="tr">`. Sayfalar tek şablondan üretiliyorsa şablonda bir kez düzeltmek hepsine yeter.':
    'Add your language to the `<html>` tag at the top of the page, for example `<html lang="en">` for an English page. If pages come from one template, fixing the template once covers all of them.',
  "Görsellerde genişlik ve yükseklik yok": "Images have no width and height",
  "Sayfada genişlik (width) ve yükseklik (height) belirtilmemiş üç ya da daha fazla görsel var. Tarayıcı görsel inmeden ona ne kadar yer ayıracağını bilemez; görsel gelince yazılar aşağı kayar ve okuyan kişi yerini kaybeder.":
    "The page has three or more images with no width and height set. The browser can't know how much space to reserve before an image downloads; when it arrives, the text jumps down and the reader loses their place.",
  'Her `<img>` etiketine görselin gerçek boyutunu yazın: `<img src="..." width="800" height="600">`. CSS ile küçültüyorsanız bu değerler oranı korur, yine de yazın. SVG görsellerde gerek yok.':
    'Give every `<img>` tag the image\'s real size: `<img src="..." width="800" height="600">`. If you scale it down with CSS, these values keep the aspect ratio, so set them anyway. SVG images don\'t need them.',
  "Uzun metinde alt başlık yok": "Long text has no subheadings",
  "Sayfada epey uzun metin var ama H1 dışında hiç başlık yok. Alt başlıklar uzun metni taranabilir yapar ve Google'ın sayfanın hangi konuları kapsadığını anlamasına yardım eder.":
    "The page has quite a lot of text but no headings other than the H1. Subheadings make long text easy to scan and help Google understand which topics the page covers.",
  "Metni konularına göre bölün ve her bölüme bir H2 başlığı verin. Başlıklar bölümün ne anlattığını söylesin; anahtar kelime doldurmayın.":
    "Split the text by topic and give each section an H2 heading. Let each heading say what its section covers; don't stuff it with keywords.",
  "Görselin alt metni bir dosya adı": "Image alt text is a file name",
  "Bir görselin alt metni dosya adı ya da kamera çıktısı gibi duruyor (IMG_2231.jpg, DSC0043, ekran-goruntusu-1.png). Alt metin, görseli göremeyen birine ne olduğunu anlatmalıdır; dosya adı bunu yapmaz. Google'ın görselin konusunu anlamasına da yardım etmez.":
    "An image's alt text looks like a file name or camera output (IMG_2231.jpg, DSC0043, screenshot-1.png). Alt text should tell someone who can't see the image what it shows; a file name doesn't. It doesn't help Google understand the image's subject either.",
  'Alt metne görselde ne olduğunu yazın, örneğin "kırmızı koltukta oturan kadın". Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Write what the image shows in the alt text, for example "woman sitting on a red armchair". Leave alt text empty (alt="") only on purely decorative images.',
  "Görsel alt metni çok uzun": "Image alt text is too long",
  "Bir görselin alt metni 250 karakteri aşıyor. Ekran okuyucular alt metni sonuna kadar okur; bu kadar uzun olunca görsel anlatımı paragrafa döner ve dinleyen sayfanın akışını kaybeder.":
    "An image's alt text is over 250 characters. Screen readers read alt text to the end; at this length the image description turns into a paragraph and the listener loses the flow of the page.",
  "Görselin ne olduğunu bir cümleyle anlatın (yaklaşık 125 karakter). Daha fazla anlatılacak şey varsa onu sayfanın metnine ya da görselin açıklama yazısına taşıyın.":
    "Describe what the image is in one sentence (about 125 characters). If there's more to say, move it into the page text or the image's caption.",
  "Sayfada birden fazla başlık etiketi (<title>)":
    "Page has more than one title tag (<title>)",
  "Sayfada birden fazla <title> etiketi var. Bir sayfanın tek başlığı olur; Google hangisini alacağını kendisi seçer ve seçtiği, arama sonucunda görmek istediğiniz olmayabilir. Genelde şablon ile SEO eklentisinin ikisi birden başlık yazınca olur.":
    "The page has more than one <title> tag. A page has one title; Google picks which one to use, and its choice may not be the one you want in search results. It usually happens when both the template and an SEO plugin write a title.",
  "Sayfa kaynağında <title> araması yapın ve yalnızca birini bırakın. İkisi farklı yerden geliyorsa (şablon ve eklenti) birini kapatın.":
    "Search the page source for <title> and keep only one. If they come from different places (template and plugin), turn one of them off.",
  "Sayfada birbirinden farklı birden fazla meta açıklama":
    "Page has several different meta descriptions",
  "Sayfada içeriği farklı iki ya da daha fazla meta açıklama var. Google hangisini özet olarak göstereceğini kendisi seçer, yani arama sonucunda çıkan yazı sizin yazdığınız olmayabilir. Şablon ile SEO eklentisinin ikisi birden yazınca olur.":
    "The page has two or more meta descriptions with different content. Google picks which one to show as the snippet, so the text in search results may not be the one you wrote. It happens when both the template and an SEO plugin write one.",
  'Sayfa kaynağında name="description" araması yapın ve yalnızca birini bırakın. İki kaynak varsa (şablon ve eklenti) birini kapatın.':
    'Search the page source for name="description" and keep only one. If there are two sources (template and plugin), turn one of them off.',
  "Başlık etiketi yer tutucu bir yazı": "Title tag is placeholder text",
  'Sayfanın başlığı "Untitled", "Başlıksız" ya da "New Page" gibi kimsenin yazmadığı bir yer tutucu. Arama sonucunda mavi bağlantı olarak bu çıkabilir; kimse tıklamak istemez. Google da bazen bu başlığı kullanmayıp başka bir metinle değiştirir.':
    'The page\'s title is a placeholder nobody wrote, such as "Untitled", "Başlıksız" or "New Page". That may appear as the blue link in search results, and nobody wants to click it. Google sometimes replaces such a title with other text, too.',
  "Sayfanın konusunu anlatan kendi başlığını yazın (yaklaşık 50-60 karakter bir ölçüttür). Sayfa sonradan doldurulacaksa dolana kadar noindex ile dizin dışında tutun.":
    "Write a real title that describes the page's topic (about 50-60 characters is a guide). If the page will be filled in later, keep it out of the index with noindex until then.",
  "Ana başlık (H1) çok uzun": "Main heading (H1) is too long",
  "Sayfanın ana başlığı (H1) 70 karakterden uzun. Google için bir sınır yok ve sıralamayı etkilemez; ama uzun başlık bir bakışta okunmaz, genelde de başlığa metin paragrafı yazılmıştır.":
    "The page's main heading (H1) is longer than 70 characters. Google has no limit and it doesn't affect rankings, but a long heading can't be read at a glance, and usually a paragraph of text has been put in the heading.",
  "H1'i bir cümlelik, sayfanın konusunu söyleyen kısa bir başlığa indirin. Geri kalan açıklamayı başlığın altındaki paragrafa taşıyın.":
    "Cut the H1 down to a short, one-line heading that states the page's topic. Move the rest of the description into the paragraph below it.",
  "Metni olmayan iç bağlantılar": "Internal links with no text",
  'Sayfada içinde yazı, görsel ya da erişilebilirlik etiketi (aria-label) olmayan iç bağlantılar var. Google bir bağlantının nereye gittiğini bağlantı metninden anlar; boş bağlantı hiçbir şey söylemez. Ekran okuyucu kullanan ziyaretçi için de bağlantı sadece "bağlantı" diye okunur.':
    'The page has internal links with no text, image or accessibility label (aria-label) inside. Google understands where a link goes from its anchor text; an empty link says nothing. For visitors using a screen reader, the link is read out as just "link".',
  'Bağlantıya görünür bir yazı ekleyin ya da yalnızca simge ise `aria-label="Sepet"` gibi ne yaptığını söyleyen bir etiket ekleyin. Kullanılmayan boş `<a>` etiketlerini silin.':
    "Add visible text to the link, or, if it's only an icon, a label that says what it does, such as `aria-label=\"Cart\"`. Delete empty `<a>` tags that aren't used.",
  '"Buraya tıklayın" gibi anlamsız bağlantı metinleri':
    'Meaningless link text such as "Click here"',
  'Sayfada "buraya tıklayın", "devamı", "daha fazla", "click here" gibi hedefi anlatmayan iç bağlantı metinleri var (üç ya da daha fazla). Google, bağlantı metnini hedef sayfanın konusunu anlamak için kullanır; bu metinler o bilgiyi vermez. Ekran okuyucu kullanan biri bağlantı listesini açtığında hepsini aynı duyar.':
    'The page has internal link text that doesn\'t describe the target, such as "click here", "read more" or "more" (three or more of them). Google uses anchor text to understand the target page\'s topic; these phrases don\'t give that information. Someone using a screen reader hears them all the same when they open the list of links.',
  'Bağlantı metnini hedefin konusuyla değiştirin: "buraya tıklayın" yerine "2026 fiyat listesini indirin". Kart şablonlarında "Devamı" yazısına yazı başlığını ekleyin ya da görünmeyen bir aria-label ile tamamlayın.':
    'Replace the link text with the target\'s topic: instead of "click here", write "download the 2026 price list". In card templates, add the post title to "Read more", or complete it with a hidden aria-label.',
  "Sayfada çok fazla bağlantı": "Too many links on the page",
  "Sayfada 300'den fazla farklı adrese bağlantı var. Google'ın sabit bir sınırı yok ve bu tek başına sıralamayı düşürmez; ama bu kadar bağlantı ziyaretçinin seçim yapmasını zorlaştırır ve Google'ın önemli bağlantıyı ayırt etmesini güçleştirir. Genelde büyük bir menü ya da kategori listesinin her sayfada tekrarlanması yüzünden olur.":
    "The page links to more than 300 different URLs. Google has no fixed limit and this alone doesn't lower rankings, but that many links make it hard for visitors to choose and harder for Google to tell which links matter. It usually comes from a large menu or category list repeated on every page.",
  "Menüyü ve alt bilgiyi (footer) en önemli sayfalarla sınırlayın. Uzun listeleri sayfalara bölün ya da kategori sayfalarına indirin.":
    "Limit the menu and footer to your most important pages. Split long lists across pages or move them down to category pages.",
  "Kendi sitenizin sayfalarına nofollow bağlantılar":
    "Nofollow links to your own pages",
  'Sayfada kendi sitenizin sayfalarına giden üç ya da daha fazla bağlantıda rel="nofollow" var. nofollow, Google\'a "bu bağlantıya güvenme" demek içindir ve iç bağlantıda genelde gerek yoktur. Google bu bağlantıları takip etmeyebilir; yani sayfaya başka yolla ulaşılamıyorsa hedef sayfa dizine geç girer ya da hiç girmez.':
    'Three or more links on the page that go to your own site carry rel="nofollow". nofollow tells Google "don\'t trust this link", and internal links rarely need it. Google may not follow these links, so if the target page can\'t be reached another way, it gets indexed late or not at all.',
  'Kendi sayfalarınıza verdiğiniz bağlantılardan rel="nofollow" özelliğini kaldırın. Sayfanın dizine girmesini istemiyorsanız bağlantıyı değil sayfayı noindex ile işaretleyin.':
    'Remove rel="nofollow" from links to your own pages. If you don\'t want a page indexed, mark the page itself with noindex, not the link.',
  // audit-issues/indexing.ts
  "Yinelenen başlık": "Duplicate title",
  "Birden çok sayfa aynı başlığı (<title>) kullanıyor. Aynı başlıkla arama sonucunda sayfalar birbirine benzer görünür ve ziyaretçi hangisine tıklayacağını seçemez.":
    "Several pages use the same title (<title>). With the same title, the pages look alike in search results and visitors can't tell which one to click.",
  "Her sayfaya kendi içeriğini anlatan farklı bir başlık yazın. Şablondan üretilen sayfalarda ayırt edici bilgiyi (ürün adı, kategori, şehir) başlık şablonuna ekleyin.":
    "Write a different title for each page that describes its own content. For pages generated from a template, add the distinguishing detail (product name, category, city) to the title template.",
  "Yinelenen ana başlık (H1)": "Duplicate main heading (H1)",
  "Birden çok sayfa aynı ana başlığı (H1) kullanıyor. Başlık, ziyaretçiye ve Google'a sayfanın ne hakkında olduğunu söyler; aynı başlık farklı sayfaları ayırt etmeyi zorlaştırır. Sitenin her sayfasında logo ya da site adı H1 olarak yazılmışsa bu uyarı genelde ondan gelir.":
    "Several pages use the same main heading (H1). The heading tells visitors and Google what the page is about; the same heading makes different pages hard to tell apart. If the logo or site name is the H1 on every page, that's usually where this warning comes from.",
  "Her sayfanın H1'ini o sayfanın konusunu anlatan kendi cümlesiyle yazın. Logo ya da site adı H1 ise onu H1 olmayan bir etikete çevirin ve sayfa başlığını H1 yapın.":
    "Give each page its own H1 that states that page's topic. If the logo or site name is the H1, change it to a non-H1 tag and make the page title the H1.",
  "Yinelenen meta açıklama": "Duplicate meta description",
  "Birden çok sayfa aynı meta açıklamayı (arama sonucunda başlığın altındaki özet) kullanıyor. Aramada hepsi aynı özetle çıkar ve ziyaretçi sayfaları ayırt edemez.":
    "Several pages use the same meta description (the summary under the title in search results). They all appear with the same snippet in search, and visitors can't tell the pages apart.",
  "Her sayfaya kendi açıklamasını yazın ya da yinelenen açıklamayı tamamen silin. Açıklama yoksa Google sayfa metninden bir özet seçer; bu, yanlış bir kopyadan iyidir.":
    "Write a description for each page, or delete the duplicated description entirely. Without one, Google picks a snippet from the page text, which is better than a wrong copy.",
  "Yinelenen sayfa içeriği": "Duplicate page content",
  "İki ya da daha fazla adres birebir aynı metni gösteriyor. Google bunlardan birini seçip dizine alır ve seçtiği sizin istediğiniz olmayabilir. Ceza değildir, ama sıralama gücü adresler arasında bölünür.":
    "Two or more URLs show exactly the same text. Google picks one of them to index, and its choice may not be the one you want. It isn't a penalty, but ranking strength is split between the URLs.",
  "Asıl adresi (aramada görünmesini istediğiniz tek adres) seçin. Kopya adres kullanıcıya gerekmiyorsa 301 ile asıl adrese yönlendirin; kopya adres açık kalacaksa (parametreli sayfa gibi) canonical (asıl adres) etiketiyle asıl adresi gösterin. Sık nedenler: sonda eğik çizgi farkı, adrese eklenen parametreler, http/https ya da www farkı.":
    "Choose the canonical URL (the one URL you want shown in search). If visitors don't need the duplicate URL, redirect it to the canonical with a 301; if the duplicate must stay available (a page with parameters, say), point to the canonical with a canonical tag. Common causes: a trailing slash difference, parameters added to the URL, or http/https or www differences.",
  "Sayfada canonical (asıl adres) etiketi yok": "Page has no canonical tag",
  "Sayfa, kendi asıl adresini belirtmiyor. Aynı sayfa birden çok adresten açılabilir: sonunda eğik çizgi olan ve olmayan, ?utm_source gibi eklerle gelen, www'lu ve www'suz adresler. Etiket yoksa Google bunlardan hangisini göstereceğine kendi karar verir. Google bu etiketi zorunlu değil, önerilen bir işaret sayar; bu yüzden bu yalnızca bir öneridir.":
    "The page doesn't declare its own canonical URL. The same page can often be opened from several URLs: with and without a trailing slash, with additions such as ?utm_source, with and without www. Without the tag, Google decides which one to show. Google treats this tag as a recommended signal rather than a requirement, so this is only a suggestion.",
  'Sayfanın `<head>` bölümüne kendi tam adresini gösteren şu satırı ekleyin: `<link rel="canonical" href="https://www.siteniz.com/hakkimizda">`. Adres, aramada görünmesini istediğiniz adres olsun. Çoğu site oluşturucu ve SEO eklentisi bunu tek ayarla tüm sayfalara ekler.':
    'Add this line, pointing to the page\'s own full URL, to the page\'s `<head>`: `<link rel="canonical" href="https://www.yoursite.com/about">`. Use the URL you want shown in search. Most site builders and SEO plugins add this to every page with a single setting.',
  "Asıl adres bildirimleri birbiriyle çelişiyor":
    "Canonical declarations contradict each other",
  "Sayfa, asıl adresi iki yerde farklı söylüyor: HTML içindeki asıl adres etiketinde bir adres, HTTP Link başlığında başka bir adres. Sinyaller çelişince Google ikisini de bırakıp kendi seçimini yapar.":
    "The page states its canonical URL differently in two places: one URL in the canonical tag in the HTML, another in the HTTP Link header. When the signals conflict, Google ignores both and makes its own choice.",
  "Tek bir asıl adres seçin ve onu yalnızca bir yerde bildirin (genelde HTML head). Diğerini kaldırın ya da aynı adrese çevirin.":
    "Choose one canonical URL and declare it in only one place (usually the HTML head). Remove the other, or change it to the same URL.",
  "Sayfa arama sonuçlarından gizlenmiş (noindex)":
    "Page is hidden from search results (noindex)",
  "Sayfa, arama motorlarından kendisini dizine almamalarını istiyor (robots meta etiketi ya da X-Robots-Tag başlığıyla). Yani sayfa aramada çıkmaz. Çoğu zaman bilerek yapılır; bu bir hata değil, bilgi notudur.":
    "The page asks search engines not to index it (with a robots meta tag or an X-Robots-Tag header). So the page won't appear in search. This is usually intentional; it's a note, not an error.",
  "Sayfa aramada çıkmalıysa noindex yönergesini kaldırın. Bilerek konduysa (yönetim paneli, teşekkür, filtre sayfaları gibi) yapmanız gereken bir şey yok.":
    "If the page should appear in search, remove the noindex directive. If it was added on purpose (admin pages, thank-you pages, filter pages and the like), there's nothing to do.",
  "Sayfa, asıl adres olarak başka bir sayfayı gösteriyor":
    "Page names another page as its canonical",
  "Sayfa asıl adres olarak başka bir adresi gösteriyor, yani Google'dan onun yerine o adresi dizine almasını istiyor. Bilerek yaptıysanız sorun yok (parametreli sayfalar gibi); ama bu sayfanın aramada çıkmasını istiyorsanız sorundur.":
    "The page names another URL as its canonical, which asks Google to index that URL instead. That's fine if you did it on purpose (pages with parameters, say), but a problem if you want this page itself to appear in search.",
  "Bu sayfa kendi adıyla aramada çıkacaksa asıl adres etiketini sayfanın kendi adresine çevirin. Aksi halde yapılacak bir şey yok.":
    "If this page should appear in search under its own URL, change the canonical tag to the page's own URL. Otherwise there's nothing to do.",
  "Asıl adres olarak gösterilen sayfa açılmıyor":
    "Canonical points to a page that doesn't load",
  "Sayfa, asıl adres olarak hata veren (404 ya da 5xx) bir adresi gösteriyor. Asıl adres etiketi güçlü bir işarettir ama gösterdiği adres yayında değilse Google onu kullanamaz ve asıl adresi kendi seçer. Sonuç, hiç asıl adres vermemişsiniz gibi olur.":
    "The page names a URL that returns an error (404 or 5xx) as its canonical. A canonical tag is a strong signal, but if the URL it points to isn't live, Google can't use it and picks the canonical itself. The result is as if you had given no canonical at all.",
  "Asıl adres etiketini çalışan bir adrese çevirin ya da hedef sayfayı yeniden yayınlayın. Hedef gerçekten kaldırıldıysa etiket sayfanın kendi adresini göstersin.":
    "Point the canonical tag to a working URL, or publish the target page again. If the target really was removed, let the tag point to the page's own URL.",
  "Asıl adres olarak yönlendiren bir sayfa gösterilmiş":
    "Canonical points to a redirecting page",
  "Sayfa, asıl adres olarak başka yere yönlendiren (3xx) bir adresi gösteriyor. Yönlendirmenin kendisi zaten hedefin asıl olduğunu söyler; yani bu sayfa, asıl olmadığı bilinen bir adresi asıl diye öneriyor.":
    "The page names a URL that redirects elsewhere (3xx) as its canonical. The redirect itself already says the target is the canonical, so this page is suggesting as canonical a URL known not to be one.",
  "Asıl adres etiketini yönlendirmenin vardığı son adrese çevirin; bildirdiğiniz adres ile açılan adres aynı olsun.":
    "Point the canonical tag to the final URL the redirect leads to, so the URL you declare and the URL that loads are the same.",
  "Asıl adres olarak gizlenmiş bir sayfa gösterilmiş":
    "Canonical points to a hidden page",
  "Sayfa, asıl adres olarak noindex ile gizlenmiş bir sayfayı gösteriyor. Noindex kesin bir yönergedir, asıl adres etiketi ise yalnızca bir işarettir; yani bu sayfa, Google'ın hiçbir zaman gösteremeyeceği bir adresi öneriyor ve kendisi de aramadan düşebilir.":
    "The page names a page hidden with noindex as its canonical. Noindex is a firm directive while a canonical tag is only a signal, so this page is suggesting a URL Google can never show, and it may drop out of search itself.",
  "İki yoldan biri: hedef sayfadaki noindex'i kaldırın ya da bu sayfanın asıl adres etiketini sayfanın kendi adresine çevirin.":
    "Do one of the two: remove the noindex from the target page, or change this page's canonical tag to the page's own URL.",
  "Google sayfayı boş sayıyor (soft 404)":
    "Google treats the page as empty (soft 404)",
  "Sayfa normal açılıyor (200) ama Google onu 'bulunamadı' sayıyor (soft 404) ve dizine almıyor. Bunu yalnızca Google söyleyebilir; durum kodu sağlıklı göründüğü için tarayıcılar fark etmez. En sık boş sonuç sayfalarında, silinmiş ürünlerde ve 'kayıt bulunamadı' gösteren şablonlarda olur.":
    'The page loads normally (200), but Google treats it as "not found" (soft 404) and doesn\'t index it. Only Google can tell you this; browsers don\'t notice because the status code looks healthy. It happens most on empty results pages, deleted products and templates that show "no records found".',
  "Sayfa gerçekten yoksa 404 ya da 410 döndürün. Varsa, içeriğinin gerçek ve dolu olduğundan emin olun; boş liste şablonları en sık nedendir.":
    "If the page really doesn't exist, return a 404 or 410. If it does, make sure its content is real and substantial; empty list templates are the most common cause.",
  "Google sayfayı robots.txt yüzünden tarayamıyor":
    "Google can't crawl the page because of robots.txt",
  "Google'ın URL Denetleme Aracı bu adresi robots.txt'nin engellediğini söylüyor. Bizim tarayıcımız sayfaya ulaşabildiği halde Google ulaşamıyorsa, iki tarayıcıya farklı kurallar uygulanıyor demektir.":
    "Google's URL Inspection tool says robots.txt blocks this URL. If our crawler can reach the page but Google can't, the two crawlers are getting different rules.",
  "robots.txt'te bu adresi kapsayan Disallow satırını bulup kaldırın. Googlebot'a özel bir kural (User-agent: Googlebot) olup olmadığına da bakın; çoğu zaman sorun genel kuralda değil, ona özel satırdadır.":
    "Find and remove the Disallow line in robots.txt that covers this URL. Also check for a rule just for Googlebot (User-agent: Googlebot); the problem is often in that specific line rather than the general rule.",
  "Google sayfada gizleme etiketi (noindex) görüyor":
    "Google sees a noindex tag on the page",
  "Google bu sayfada noindex (aramada gösterme) yönergesi gördüğünü söylüyor. Bizim tarayıcımız sayfayı dizine alınabilir görüyorsa, iki tarayıcı sayfanın farklı sürümlerini okuyor demektir; örneğin yönerge yalnızca JavaScript çalışınca ekleniyor olabilir.":
    "Google says it sees a noindex (don't show in search) directive on this page. If our crawler sees the page as indexable, the two crawlers are reading different versions of the page; for example, the directive may be added only when JavaScript runs.",
  "Sayfanın kaynak kodunu Google'ın gördüğü haliyle karşılaştırın: Search Console'da URL Denetleme > Canlı URL'yi test et > Taranan sayfayı görüntüle > HTML ekranı işlenmiş HTML'i gösterir. Noindex'in nereden geldiğini bulup kaldırın.":
    "Compare the page source with what Google sees: in Search Console, URL Inspection > Test live URL > View tested page > HTML shows the rendered HTML. Find where the noindex comes from and remove it.",
  "Google başka bir adresi asıl adres seçti":
    "Google chose a different canonical",
  "Sayfa bir asıl adres bildiriyor ama Google başka bir adresi seçti. Asıl adres etiketi bir emir değil, öneridir; Google içerik benzerliğine, iç bağlantılara ve site haritasına bakıp farklı karar verebilir. Sonuçta aramada sizin seçtiğiniz adres çıkmaz.":
    "The page declares a canonical URL, but Google chose a different one. A canonical tag is a suggestion, not an order; Google may decide otherwise based on content similarity, internal links and the sitemap. As a result, the URL you chose doesn't appear in search.",
  "Google'ın seçtiği adrese bakın. Sayfalar gerçekten aynıysa iç bağlantılarınızı ve site haritanızı istediğiniz adrese çevirin. Farklıysa aradaki farkı içerikte belirginleştirin.":
    "Look at the URL Google chose. If the pages really are the same, point your internal links and sitemap to the URL you want. If they're different, make the difference clearer in the content.",
  "Dil sürümü kodu (hreflang) geçersiz":
    "Language version code (hreflang) is invalid",
  'Dil sürümü bağlantısındaki (hreflang) kod Google\'ın beklediği biçimde değil. Google dil için ISO 639-1 kodunu (tr, en), istenirse bölge için ISO 3166-1 ülke kodunu bekler ve ikisini tire ile ayırır; zh-Hans gibi yazı sistemi eki de geçerlidir. "UK", "EU" ve "UN" gibi ayrılmış kodlarda Google bölge kısmını yok sayar (en-UK, en gibi okunur); es-419 gibi bölge kodları da desteklenmez. Geçersiz kod, o dil sürümünün yok sayılması demektir.':
    'The code in a language version link (hreflang) isn\'t in the format Google expects. Google expects an ISO 639-1 language code (tr, en), optionally followed by an ISO 3166-1 country code for the region, separated by a hyphen; a script suffix such as zh-Hans is valid too. For reserved codes such as "UK", "EU" and "UN", Google ignores the region part (en-UK is read as en), and region codes such as es-419 aren\'t supported. An invalid code means that language version is ignored.',
  'Birleşik Krallık için "en-GB" yazın; "en-UK" geçerli bir bölge kodu değil. Latin Amerika İspanyolcası için es-419 yerine "es" yazın. Ayırıcı alt çizgi değil tire olmalı ("en_US" değil "en-US"). "x-default" geçerlidir, olduğu gibi bırakın.':
    'Write "en-GB" for the United Kingdom; "en-UK" isn\'t a valid region code. For Latin American Spanish, write "es" instead of es-419. The separator must be a hyphen, not an underscore ("en-US", not "en_US"). "x-default" is valid; leave it as it is.',
  "Dil sürümleri arasında sayfa kendini listelemiyor (hreflang)":
    "Page doesn't list itself among its language versions (hreflang)",
  "Bu sayfa, dil sürümü bağlantılarında (hreflang) diğer dilleri listeliyor ama kendisini listelemiyor. Google'ın belgelerine göre her dil sürümü kendisini de listelemeli; yoksa Google dil sürümlerini birbirine bağlamayabilir.":
    "This page lists other languages in its language version links (hreflang) but not itself. According to Google's documentation, every language version should list itself too; otherwise Google may not connect the language versions.",
  "Sayfanın kendi adresini, kendi dil koduyla dil sürümü listesine ekleyin. Şablonlarda sorun çoğu zaman listenin geçerli sayfayı atlayarak üretilmesinden kaynaklanır.":
    "Add the page's own URL, with its own language code, to the list of language versions. In templates, the problem usually comes from the list being generated without the current page.",
  "Sayfa robots yönergesiyle bağlantılarını kapatıyor":
    "Page turns off its links with a robots directive",
  'Sayfada "nofollow" (ya da "none") yönergesi var; yani Google bu sayfadaki bağlantıları izlemez. Google yeni sayfaları çoğunlukla bağlantı izleyerek bulur; sayfa aramada çıkıyor olsa bile ondan çıkan yollar kapalıdır.':
    'The page has a "nofollow" (or "none") directive, so Google doesn\'t follow the links on it. Google finds new pages mostly by following links; even if this page appears in search, the paths leading out of it are closed.',
  'Bağlantıların izlenmesini istiyorsanız yönergeden "nofollow" ifadesini kaldırın. Giriş, filtre ya da kullanıcı içeriği sayfalarında bu bilerek yapılmış olabilir; o durumda yapmanız gereken bir şey yok.':
    'If you want the links followed, remove "nofollow" from the directive. On login, filter or user-content pages this may be intentional; in that case there\'s nothing to do.',
  "Sayfalanmış sayfa, asıl adres olarak ilk sayfayı gösteriyor":
    "Paginated page names the first page as its canonical",
  "Adres bir sayfa numarası taşıyor (2. sayfa gibi) ama asıl adres olarak numarasız ilk sayfayı gösteriyor. Google bunu sayfalama belgelerinde hata sayar: her sayfa kendi adresini asıl adres olarak vermeli. Aksi halde 2. ve sonraki sayfalardaki içerik aramadan düşer.":
    "The URL carries a page number (page 2, say) but names the unnumbered first page as its canonical. Google's pagination documentation calls this a mistake: each page should give its own URL as the canonical. Otherwise the content on page 2 and beyond drops out of search.",
  "Her sayfalama adımının asıl adres etiketini o sayfanın kendi adresine çevirin. Tüm içeriği tek sayfada gösteren bir sürümünüz varsa Google onun asıl adres olmasına izin verir.":
    "Change the canonical tag of each paginated page to that page's own URL. If you have a version that shows all the content on one page, Google allows that one to be the canonical.",
  "Dil sürümlerinde varsayılan sürüm (x-default) yok":
    "Language versions have no default (x-default)",
  "Sayfa dil sürümlerini bildiriyor (hreflang) ama varsayılan bir sürüm (x-default) belirtmiyor. x-default, listelenen dillerin hiçbirine uymayan ziyaretçiye hangi sürümün gösterileceğini söyler; yoksa Google seçimi kendisi yapar.":
    "The page declares language versions (hreflang) but no default version (x-default). x-default tells Google which version to show visitors who match none of the listed languages; without it, Google makes the choice itself.",
  'Dil sürümü listesine `<link rel="alternate" hreflang="x-default" href="...">` satırını ekleyin. Genelde dil seçme sayfası ya da ana pazarınızın sürümü gösterilir.':
    'Add `<link rel="alternate" hreflang="x-default" href="...">` to the list of language versions. It usually points to a language picker page or the version for your main market.',
  "Dil sürümü karşılıklı bağlanmamış (hreflang)":
    "Language version isn't linked back (hreflang)",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres bu sayfayı geri göstermiyor. Dil sürümü bağlantısı iki taraflı çalışır; karşılığı olmayan bildirim yok sayılır, yani iki sayfa da bundan fayda görmez.":
    "This page names another URL as a language version (hreflang), but that URL doesn't name this page back. Language version links work both ways; a declaration without its counterpart is ignored, so neither page benefits.",
  "Hedef sayfaya bu sayfayı gösteren bir dil sürümü bağlantısı ekleyin. Gruptaki her sayfa, kendisi dahil tüm sayfaları listelemeli.":
    "Add a language version link on the target page that points to this page. Every page in the group should list all the pages, itself included.",
  "Dil sürümü açılmayan ya da dizinden çıkarılmış bir sayfayı gösteriyor":
    "Language version points to a page that doesn't load or isn't indexable",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres hata veriyor (404, 500 gibi), başka yere yönlendiriyor ya da noindex ile dizinden çıkarılmış. Google böyle bir adresi dil sürümü olarak kullanamaz, bildirim boşa gider.":
    "This page names another URL as a language version (hreflang), but that URL returns an error (404, 500 and the like), redirects elsewhere or is excluded from the index with noindex. Google can't use such a URL as a language version, so the declaration is wasted.",
  "Ayrıntılardaki adrese bakın. Hata veriyorsa sayfayı düzeltin ya da bu bildirimi kaldırın; yönlendiriyorsa bildirimi son adrese çevirin; noindex ise ya noindex'i kaldırın ya da bildirimi silin.":
    "Look at the URL in the details. If it returns an error, fix the page or remove this declaration; if it redirects, point the declaration to the final URL; if it's noindex, either remove the noindex or delete the declaration.",
  "Asıl adres (canonical) başka bir alan adını ya da http'yi gösteriyor":
    "Canonical points to another domain or to http",
  "Sayfanın asıl adresi (yani Google'a bu içeriğin ana adresi olarak bildirdiğiniz adres) ya güvensiz http:// ile başlıyor ya da başka bir alan adına gidiyor. Bu, sayfanın kendisini dizinde istemediğinizi söyler. Başka sitede yayımlanan içeriği bilerek böyle işaretliyorsanız bu uyarıyı yok sayabilirsiniz.":
    "The page's canonical URL (the URL you tell Google is the main address of this content) either starts with insecure http:// or goes to another domain. That tells Google you don't want this page itself in the index. If you're deliberately marking content published on another site this way, you can ignore this warning.",
  "Bilerek yapmadıysanız asıl adresi sayfanın kendi https:// adresine çevirin. Şablon ya da SEO eklentisindeki site adresi ayarı genelde yanlış yazılmıştır; oradan bir kez düzeltmek hepsine yeter.":
    "If it wasn't deliberate, change the canonical to the page's own https:// URL. Usually the site URL setting in the template or SEO plugin is wrong; fixing it there once fixes every page.",
  "Yapısal veri bloğu bozuk": "Structured data block is broken",
  "Sayfadaki yapısal veri bloklarından (ld+json) en az biri okunamıyor ya da içinde tür (@type) yok. Bozuk blok Google tarafından yok sayılır, yani o işaretlemeden beklediğiniz ek bilgiler (ürün, makale, kırıntı yolu) aramada çıkmaz.":
    "At least one structured data block (ld+json) on the page can't be read or has no type (@type). Google ignores a broken block, so the extra details you expect from that markup (product, article, breadcrumb) don't appear in search.",
  'Bloğu bir JSON denetleyicisine yapıştırın; genelde fazladan virgül ya da kapanmamış tırnak çıkar. Sonra bloğa en az bir tür ekleyin, örneğin "@type": "Article". Eklentiyle üretiliyorsa eklentiyi güncelleyin.':
    'Paste the block into a JSON validator; it\'s usually an extra comma or an unclosed quote. Then give the block at least one type, for example "@type": "Article". If a plugin generates it, update the plugin.',
  "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş":
    "Google's answers for some pages are out of date",
  "Bu sayfalar için saklanan Google yanıtları eskidi. Yanıt, sorulduğu andaki durumu anlatır; sayfa o zamandan beri düzelmiş ya da bozulmuş olabilir. Eski yanıtı güncelmiş gibi göstermemek için bu sayfaların Google yanıtları bu denetimde bulgu sayılmadı.":
    "The Google answers stored for these pages are out of date. An answer describes the state at the moment it was asked; the page may have been fixed or broken since. So as not to present an old answer as current, these pages' Google answers weren't counted as findings in this audit.",
  'Dizin durumu sekmesindeki "Google\'da durumunu kontrol et" düğmesine basın; en eski yanıtlı sayfalar yeniden sorulur. Google bir sitede günde en fazla 2.000 adres incelemeye izin verir, bu yüzden her tıklamada 25 sayfa sorulur; birkaç tıkla liste yenilenir.':
    'Press the "Check status on Google" button on the Index status tab; the pages with the oldest answers are checked again. Google allows at most 2,000 URL inspections per site per day, so each click checks 25 pages; a few clicks refresh the list.',
  "Google taradı ama dizine almadı": "Crawled by Google but not indexed",
  "Google sayfayı çekti ama dizine almadı; yeniden istek göndermeniz gerekmez, sonradan dizine girebilir de girmeyebilir de. Google nedenini söylemez. Sık görülen olasılıklar: sayfanın başka bir sayfayla büyük ölçüde aynı olması, çok az özgün içerik taşıması ya da siteden az bağlantı alması.":
    "Google fetched the page but didn't index it; you don't need to resubmit it, and it may or may not be indexed later. Google doesn't give a reason. Common possibilities: the page is largely the same as another page, carries very little original content, or gets few links from the site.",
  "Önce URL Denetleme Aracı'nda noindex, engellenen kaynak ya da boş görünen içerik olup olmadığına bakın. Sorun yoksa sayfanın kendine ait bir sorusu ve cevabı olduğundan emin olun. Yakın konulu başka sayfalarla örtüşüyorsa birleştirip tek adrese yönlendirin. Sayfa kalacaksa içeriği derinleştirin ve ilgili sayfalardan buraya bağlantı verin.":
    "First, check in the URL Inspection tool for a noindex, blocked resources or content that looks empty. If none of those apply, make sure the page answers a question of its own. If it overlaps with other pages on a similar topic, merge them and redirect to a single URL. If the page stays, deepen its content and link to it from related pages.",
  "Google keşfetti ama henüz taramadı":
    "Discovered by Google but not crawled yet",
  "Google bu adresi biliyor ama sayfayı henüz çekmedi. Google'ın belgelerine göre bu genelde siteyi aşırı yüklememek için taramanın ertelenmesidir; sayfa hakkında bir kalite kararı değildir. Büyük sitelerde ve az bağlantı alan sayfalarda daha sık görülür.":
    "Google knows this URL but hasn't fetched the page yet. According to Google's documentation, this usually means crawling was postponed to avoid overloading the site; it isn't a quality verdict on the page. It's more common on large sites and on pages with few links.",
  "Çoğu durumda beklemek yeterlidir. Sayfa önemliyse sık taranan sayfalardan bağlantı verin, site haritasında olduğundan emin olun ve Search Console'dan dizine ekleme isteyin. Sunucunuz yavaşsa onu da iyileştirin.":
    "In most cases, waiting is enough. If the page matters, link to it from frequently crawled pages, make sure it's in the sitemap and request indexing in Search Console. If your server is slow, improve that too.",
  "Google yinelenen içerik gördü, asıl adres belirtilmemiş":
    "Google found duplicate content with no canonical declared",
  "Google bu sayfayı başka bir sayfanın kopyası saydı ve hangisinin asıl olduğunu siz söylemediğiniz için kendisi seçti. Seçtiği sayfa sizin istediğiniz olmayabilir; sıralama gücü de seçtiği adreste toplanır.":
    "Google treated this page as a copy of another page and, because you didn't say which one is the canonical, chose one itself. Its choice may not be the one you want, and ranking strength collects on the URL it chose.",
  "Kopya grubundaki her sayfaya, asıl saydığınız adresi gösteren bir canonical (asıl adres) etiketi ekleyin. Kopyalar gereksizse asıl sayfaya yönlendirin.":
    "Add a canonical tag to every page in the duplicate group, pointing to the URL you consider canonical. If the copies aren't needed, redirect them to the canonical page.",
  "Google bu adresi hiç bilmiyor": "Google doesn't know this URL at all",
  "Google bu adresi hiç duymamış: ne keşfetmiş ne taramış. Yani sayfaya giden bir yol yok ve dizine girmeyen sayfa aramada hiç çıkmaz.":
    "Google has never heard of this URL: it has neither discovered nor crawled it. So there's no path leading to the page, and a page that isn't indexed never appears in search.",
  "Adresi site haritasına ekleyin ve site haritasını Search Console'a gönderin. Ayrıca sitenizin taranan sayfalarından bu sayfaya bağlantı verin; Google sayfaları bağlantıları izleyerek bulur.":
    "Add the URL to your sitemap and submit the sitemap in Search Console. Also link to this page from crawled pages on your site; Google finds pages by following links.",
  "Google yapısal veride hata buldu":
    "Google found errors in the structured data",
  "Sayfadaki yapısal veri (Google'a sayfanın ürün, makale, tarif gibi ne olduğunu anlatan işaretleme) Google'ın zengin sonuç denetiminden geçemedi. Zengin sonuç, aramada yıldız puanı, fiyat ya da stok durumu gibi ek bilgilerin çıkmasıdır; hatalı işaretleme bunları kapatır. Bu kararı yalnızca Google verebilir; bizim tarayıcımız işaretlemenin var olup olmadığını görür, geçerli olup olmadığını göremez.":
    "The structured data on the page (markup telling Google what the page is, such as a product, article or recipe) failed Google's rich result checks. Rich results are extras in search such as star ratings, prices or stock status; broken markup turns them off. Only Google can make this call; our crawler can see whether the markup exists, not whether it's valid.",
  "Adresi Google'ın Zengin Sonuç Testi'nde açın; hangi alanın eksik ya da yanlış türde olduğunu adıyla söyler. Çoğunlukla zorunlu bir alan boştur ya da sayfada görünmeyen bir şey işaretlenmiştir; düzeltin.":
    "Open the URL in Google's Rich Results Test; it names the field that is missing or has the wrong type. Usually a required field is empty or something not visible on the page has been marked up. Fix it.",
  "Sitede sosyal medya paylaşım etiketleri (Open Graph) yok":
    "Site has no social sharing tags (Open Graph)",
  "Taranan sayfaların hiçbirinde og:title ya da og:image yok. Bu etiketler Google sıralamasını etkilemez; bağlantınız WhatsApp, LinkedIn, Slack ya da X'te paylaşılınca ne görüneceğini belirler. Yoksa bağlantı çıplak adres olarak görünür ve paylaşımdan gelen tıklama düşer. Bu bulgu sayfa başına değil, site genelinde bir şablon eksiğini gösterir.":
    "None of the crawled pages has og:title or og:image. These tags don't affect Google rankings; they decide what appears when your link is shared on WhatsApp, LinkedIn, Slack or X. Without them the link shows as a bare URL, and clicks from shares drop. This finding points to a sitewide template gap, not a per-page one.",
  "Şablonun <head> bölümüne og:title, og:description ve tam adresli bir og:image (en az 1200x630 piksel) ekleyin. Tek bir şablon düzeltmesi tüm sayfaları kapatır; SEO eklentileri bunu hazır ayar olarak sunar.":
    "Add og:title, og:description and an og:image with a full URL (at least 1200x630 pixels) to the template's <head>. One template fix covers every page; SEO plugins offer this as a ready-made setting.",
  "Sitede hiç yapısal veri yok": "Site has no structured data",
  "Taranan hiçbir sayfada yapısal veri (Google'a sayfanın ürün, makale, kurum gibi ne olduğunu anlatan işaretleme) yok. Yapısal veri sıralamayı doğrudan etkilemez; bazı türler (ürün, makale, kırıntı yolu, kurum, etkinlik) aramada fiyat, puan ya da yol gibi ek bilgilerle görünmeyi mümkün kılar. Hangi türlerin gösterildiğini Google belirler ve zaman zaman kaldırır; garanti yoktur.":
    "No crawled page has structured data (markup telling Google what the page is, such as a product, article or organization). Structured data doesn't affect rankings directly; some types (product, article, breadcrumb, organization, event) make it possible to appear in search with extras such as prices, ratings or a breadcrumb trail. Google decides which types are shown and drops some from time to time; nothing is guaranteed.",
  "Sayfa türüne uyan işaretlemeyle başlayın: yazılar için Article, her yerde BreadcrumbList, ürün sayfası için Product, ana sayfa için Organization. Google'ın desteklediği türleri Search Gallery'den kontrol edin; FAQPage ve HowTo artık arama sonucunda zengin görünüm üretmez. İşaretleme sayfada gerçekten görünen içeriği anlatmalı; görünmeyeni işaretlemek Google kurallarına aykırıdır.":
    "Start with markup that fits the page type: Article for posts, BreadcrumbList everywhere, Product for product pages, Organization for the home page. Check the types Google supports in the Search Gallery; FAQPage and HowTo no longer produce rich results in search. Markup must describe content actually visible on the page; marking up what isn't visible is against Google's guidelines.",
  "Sayfa birbiriyle çelişen asıl adresler bildiriyor":
    "Page declares conflicting canonicals",
  "Sayfanın head bölümünde farklı adresleri gösteren birden çok canonical (asıl adres) etiketi var. Bu, iki farklı söz demektir, daha güçlü bir söz değil; Google çelişkiyi kendi seçimini yaparak çözer. Genelde şablon bir adres, bir eklenti başka bir adres yazınca olur.":
    "The page's head has several canonical tags pointing to different URLs. That's two different statements, not a stronger one; Google resolves the conflict by making its own choice. It usually happens when the template writes one URL and a plugin writes another.",
  "Sayfa kaynağında asıl adres etiketlerini bulun, hangisinin doğru olduğuna karar verin ve diğerini üreten ayarı ya da eklentiyi kapatın. Aynı adresi iki kez yazan kurulum sorun değildir; bulgu yalnızca adresler farklıyken çıkar.":
    "Find the canonical tags in the page source, decide which one is right and turn off the setting or plugin that writes the other. A setup that writes the same URL twice is fine; this finding appears only when the URLs differ.",
  "Google bu sayfayı uzun süredir taramadı":
    "Google hasn't crawled this page in a long time",
  "Google bu adresi en son aylar önce ziyaret etmiş. Sayfa dizinde olabilir ama Google'ın gördüğü sürüm o tarihteki sürüm: sonradan yaptığınız değişiklikler aramaya yansımamıştır. Nadiren taranan sayfalar genelde siteden yeterince bağlantı almayan ya da Google'ın önemsiz bulduğu sayfalardır.":
    "Google last visited this URL months ago. The page may be indexed, but the version Google has is the one from that date: changes you made since aren't reflected in search. Rarely crawled pages are usually ones that get too few links from the site or that Google considers unimportant.",
  "Sayfaya sık taranan sayfalardan bağlantı verin ve site haritasında olduğundan emin olun. İçerik gerçekten güncellendiyse Search Console'dan dizine ekleme isteyebilirsiniz; ama kalıcı çözüm sayfayı siteye daha iyi bağlamaktır.":
    "Link to the page from frequently crawled pages and make sure it's in the sitemap. If the content really was updated, you can request indexing in Search Console; but the lasting fix is to link the page into the site better.",
  // audit-issues/speed.ts
  "Sayfanın ana içeriği geç yükleniyor (LCP)":
    "Page's main content loads late (LCP)",
  "Sayfanın en büyük öğesi (genelde kapak görseli ya da ana başlık) 4 saniyeden geç göründü. Google bu süreyi 'zayıf' sayar. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır. Bu, PageSpeed Insights'ın laboratuvar ölçümüdür; ziyaretçilerinizin gerçek süresi değil, ama onun güvenilir bir göstergesidir.":
    "The page's largest element (usually the hero image or main heading) appeared after more than 4 seconds. Google rates this time as \"poor\". Google uses field data (CrUX) in its ranking systems, but a good value alone doesn't guarantee rankings; relevant content comes first. This is a PageSpeed Insights lab measurement: not your visitors' real time, but a reliable indicator of it.",
  "PageSpeed Insights raporunda en büyük öğenin ne olduğuna bakın. Genelde bir görseldir: görseli küçültüp WebP gibi hafif bir biçime çevirin, ilk ekrandaki görselin geç yüklenmesini kapatın ve sayfayı yavaşlatan betik ve yazı tiplerini erteleyin.":
    "Check in the PageSpeed Insights report what the largest element is. It's usually an image: shrink it and convert it to a lighter format such as WebP, turn off lazy loading for the image in the first screen, and defer the scripts and fonts that slow the page down.",
  "Sayfa yüklenirken içerik kayıyor (CLS)":
    "Content shifts while the page loads (CLS)",
  "Sayfa yüklenirken içerik 0,25'ten fazla kaydı; Google bu değeri 'zayıf' sayar. Okurken metin kayınca ziyaretçi yanlış yere tıklar. Bu, laboratuvar ölçümüdür.":
    'Content shifted by more than 0.25 while the page loaded; Google rates this value as "poor". When text moves while someone is reading, they click the wrong thing. This is a lab measurement.',
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, reklam ve afiş alanları için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek yazı tipi tanımlayın.":
    "Give images and embedded frames a width and height, reserve space for ad and banner slots, and define a fallback font for custom fonts that doesn't break the layout.",
  "Sayfa tıklamalara geç yanıt veriyor (INP)":
    "Page responds slowly to clicks (INP)",
  "Sayfa bir tıklamaya ya da dokunuşa 500 milisaniyeden geç yanıt verdi; Google bu süreyi 'zayıf' sayar. Bu ölçü (INP) 2024'ten beri Core Web Vitals'ın parçasıdır. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarından toplanan gerçek (alan) veridir.":
    'The page took longer than 500 milliseconds to respond to a click or tap; Google rates this time as "poor". This metric (INP) has been part of Core Web Vitals since 2024. Because a lab test can\'t simulate interaction, this value is real (field) data collected from Chrome users.',
  "Sayfayı en çok meşgul eden betikleri bulun; genelde üçüncü taraf etiketler (reklam, sohbet, takip kodu) ve büyük betik paketleridir. Gereksizleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin.":
    "Find the scripts that keep the page busiest; they're usually third-party tags (ads, chat, tracking code) and large script bundles. Remove the unnecessary ones and load the rest after the page has opened.",
  "Google'ın SEO denetim puanı düşük": "Low Google SEO audit score",
  "PageSpeed Insights'ın SEO denetimi bu sayfaya 90'ın altında puan verdi. Bu denetim başlık, meta açıklama, bağlantı metinleri, taranabilirlik (robots, HTTP durum kodu), geçerli canonical ve hreflang gibi temel kontrollere bakar. Puanın kendisi sıralamayı etkilemez; hangi kontrollerin başarısız olduğunu gösterir.":
    "PageSpeed Insights' SEO audit gave this page a score below 90. The audit looks at basic checks such as the title, meta description, link text, crawlability (robots, HTTP status code), a valid canonical and hreflang. The score itself doesn't affect rankings; it shows which checks failed.",
  "Sayfayı PageSpeed Insights'ta açın ve SEO bölümünde başarısız görünen kontrollere bakın. Her biri neyin eksik olduğunu adıyla söyler; başarısız kontroller düzelince puan yükselir.":
    "Open the page in PageSpeed Insights and look at the failed checks in the SEO section. Each one names what's missing; the score rises once the failed checks are fixed.",
};
