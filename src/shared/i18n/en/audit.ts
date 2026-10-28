import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/client/features/audit, src/client/features/lighthouse, src/shared/audit-issues.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enAudit: Catalog = {
  // installed-0.8.0 diagnostics: Google/Windows/audit failure causes
  "{count} sayfa alınamadı (ağ hatası).": {
    one: "{count} page could not be fetched (network error).",
    other: "{count} pages could not be fetched (network error).",
  },
  "Bağlantı yeniden denemede de kurulamadı, bu sayfalar denetlenmedi ve bozuk sayılmadı. Çoğu zaman geçicidir; denetimi yeniden çalıştırın. Sürerse sitenin bu bilgisayardan açıldığını kontrol edin.":
    "The connection failed again on retry, so these pages were not audited and are not counted as broken. It is usually temporary; run the audit again. If it persists, check that the site opens from this computer.",
  "Sunucudan yanıt alınamadı (bağlantı koptu ya da adres çözülemedi). Sayfa denetlenmedi ve bozuk sayılmadı; denetimi yeniden çalıştırın.":
    "No answer from the server (the connection dropped or the address did not resolve). The page was not audited and is not counted as broken; run the audit again.",
  "alınamadı (ağ hatası)": "not fetched (network error)",
  "Toplam {count} site haritası dosyası okunamadı": {
    one: "{count} sitemap file could not be read in total",
    other: "{count} sitemap files could not be read in total",
  },
  "Site haritası dosyası okunamadı": "A sitemap file could not be read",
  "robots.txt dosyanızın ya da bir site haritası dizininin gösterdiği bir site haritası dosyasından hiç adres okunamadı. Ayrıntıda hangi dosya olduğu ve nedeni yazıyor: hata kodu, zaman aşımı, bağlantı hatası, siteden çıkan yönlendirme, XML olmayan içerik ya da boş liste. O dosyadaki sayfalar bu denetime site haritasından girmedi; Google da aynı hatayı görüyorsa onları da okuyamıyor olabilir.":
    "No addresses could be read from a sitemap file that your robots.txt or a sitemap index points to. The details name the file and the reason: an error code, a timeout, a connection error, a redirect off the site, content that is not XML, or an empty list. The pages in that file did not enter this audit from the sitemap; if Google sees the same error, it may not be able to read them either.",
  "Ayrıntıdaki adresi tarayıcıda açın. Hata kodu ya da yönlendirme varsa dosyayı doğru adreste yayınlayın veya robots.txt ve site haritası dizinindeki satırı düzeltin. Zaman aşımı ya da bağlantı hatası çoğu zaman geçicidir; denetimi yeniden çalıştırın, sürerse sunucunun yanıt süresine bakın. Search Console'daki Site Haritaları raporu Google'ın gördüğünü gösterir.":
    "Open the address from the details in a browser. If there is an error code or a redirect, publish the file at the right address or fix the line in robots.txt and the sitemap index. A timeout or connection error is usually temporary; run the audit again, and if it persists, look at the server's response time. The Sitemaps report in Search Console shows what Google sees.",
  "Sunucu HTTP {status} döndürdü": "The server returned HTTP {status}",
  "Sunucu zamanında yanıt vermedi (zaman aşımı, yeniden denendi)":
    "The server did not answer in time (timeout, retried)",
  "Bağlantı kurulamadı (ağ hatası, yeniden denendi)":
    "No connection could be made (network error, retried)",
  "Başka bir siteye ya da döngüye yönlendiriyor":
    "It redirects to another site or in a loop",
  "Dönen içerik site haritası XML'i değil":
    "The content returned is not sitemap XML",
  "Dosya okundu ama hiç adres listelemiyor":
    "The file was read but lists no addresses",
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

  // shared/audit-issues/details.ts (evidence of the Lighthouse, HTML and external checks)
  "Sayfadaki canonical adresi": "Canonical URL in the page",
  "robots etiketleri": "robots tags",
  "googlebot etiketleri": "googlebot tags",
  "Sayfa başlığı": "Page title",
  "Başlıktaki anlamlı kelime": "Meaningful words in the title",
  "Lighthouse denetimi": "Lighthouse audit",
  "Etkilenen öğe": "Affected elements",
  "Karşılanmayan koşul": "Condition not met",
  "Tahmini kazanç": "Estimated savings",
  "Üçüncü taraf kodların ana iş parçacığı süresi":
    "Main-thread time of third-party code",
  "Toplam indirme boyutu": "Total download size",
  "Kırık dış bağlantı": "Broken external link",
  Görseller: "Images",
  "Gömülü betik ve stil": "Inline script and style",
  "Sayfaya yönlendirme olmadan ulaşılmıyor":
    "The page is not reached without a redirect",
  "Sunucu ilk yanıtı hızlı vermiyor": "The server's first response is slow",
  "Belge sıkıştırılmadan gönderiliyor": "The document is sent uncompressed",
  'Ana görselde loading="lazy" var': 'The main image has loading="lazy"',
  "Ana görsel sayfanın ilk HTML'inde yok":
    "The main image is not in the page's initial HTML",
  'Ana görselde fetchpriority="high" yok':
    'The main image has no fetchpriority="high"',
  "{count} güvensiz (http) görsel, video ya da çerçeve": {
    one: "{count} insecure (http) image, video or frame",
    other: "{count} insecure (http) images, videos or frames",
  },
  "{count} form bilgileri http adresine gönderiyor": {
    one: "{count} form submits to an http address",
    other: "{count} forms submit to an http address",
  },
  "{count} e-posta adresi açıkta": {
    one: "{count} email address in plain view",
    other: "{count} email addresses in plain view",
  },
  "{count} iç bağlantı http:// ile veriliyor": {
    one: "{count} internal link uses http://",
    other: "{count} internal links use http://",
  },
  "{count} görsel {limit}'tan büyük": {
    one: "{count} image larger than {limit}",
    other: "{count} images larger than {limit}",
  },
  "{value} (iyi: en çok {good}, kötü: {poor} üstü)":
    "{value} (good: up to {good}, poor: above {poor})",
  "{value} (kötü sınırı: {limit})": "{value} (poor above {limit})",
  "saha verisi (gerçek Chrome kullanıcıları)": "field data (real Chrome users)",
  "laboratuvar ölçümü (PageSpeed Insights)":
    "lab measurement (PageSpeed Insights)",
  "alan adı bulunamadı": "domain not found",
  hata: "error",
  "en az {size}": "at least {size}",
  'Sayfa "{text}" diyor, ama sunucu {status} döndürüyor':
    'The page says "{text}", but the server returns {status}',
  "{size} (sınır {limit})": "{size} (limit {limit})",
  "Yazı olarak işaretlenmiş {count} sayfa": {
    one: "{count} page marked up as an article",
    other: "{count} pages marked up as articles",
  },
  "ve {count} tane daha": {
    one: "and {count} more",
    other: "and {count} more",
  },
  "Tahmini kazanç: {value}": "Estimated savings: {value}",
  "{count} adres, bu sitede {onHost}": {
    one: "{count} URL, {onHost} on this site",
    other: "{count} URLs, {onHost} on this site",
  },
  "Lighthouse'un tahmini; en çok kazandıran sayfa için.":
    "Lighthouse's estimate, for the page that gains most.",
  "Lighthouse bu denetimde bu ölçümleri raporlamadı, ya da denetim bu kontroller eklenmeden önce yapıldı.":
    "Lighthouse did not report these measurements in this audit, or the audit ran before these checks were added.",
  "Dış bağlantı ve görsel boyutu kontrolü bu denetimde açık değildi ya da ölçülemedi.":
    "The external link and image size check was off for this audit or could not be measured.",
  "Bu kontroller denetimden sonra eklendi; yeni bir denetim onları da ölçer.":
    "These checks were added after this audit ran; a new audit measures them too.",
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
  "Orta. Kritik sorun yok; en çok puan getiren uyarılardan başlayın.":
    "Fair. No critical issues; start with the warnings worth the most points.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar puanı aşağı çekiyor.":
    "Poor. No critical issues, but accumulated warnings are pulling the score down.",
  "Zayıf. Google'ın sitenizi anlamasını engelleyen sorunlar var.":
    "Poor. Some issues are keeping Google from understanding your site.",
  "Site puanı": "Site score",

  // audit/results/PerformanceSummary.tsx
  "Google'ın ücretsiz ölçüm kotası dolmuş; sayfalarınızda bir sorun yok. Ayarlar'dan PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "Google's free measurement quota ran out; nothing is wrong with your pages. Add a PageSpeed key in Settings, or run the audit again once the quota resets.",
  Hız: "Speed",
  "Ortalama puanlar": "Average scores",
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
  "Google günde en çok {limit} adres sormanıza izin verir. Her seferde {batch} sayfa kontrol edilir. Önce hiç sorulmamış olanlara, sonra Google'ın dizine almadıklarına bakılır.":
    "Google lets you check up to {limit} URLs a day. Each run checks {batch} pages: first those never checked, then those Google didn't index.",
  "Google'da durumunu kontrol et": "Check status on Google",
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
  "Site haritasında başka bir siteye ait adresler var":
    "The sitemap lists addresses on another site",
  "Site haritanız bu sitenin değil, başka bir alan adının adreslerini listeliyor. Google bir site haritasındaki adresleri yalnızca haritayla aynı sitedeyse kabul eder; diğer sitenin robots.txt dosyası bu haritayı göstermiyorsa ya da o site Search Console'da sizin adınıza doğrulanmamışsa bu adresleri yok sayar.":
    "Your sitemap lists addresses on another domain, not on this site. Google accepts sitemap entries only when they are on the same site as the sitemap; unless the other site's robots.txt points at this sitemap or that site is verified for you in Search Console, Google ignores these addresses.",
  "Site haritasını, adreslerin ait olduğu sitede yayınlayın ya da haritayı üreten ayarda sitenin adresini düzeltin (çoğu zaman eski bir alan adı ya da önizleme adresi kalmıştır). Bilerek başka siteye ait adresleri listeliyorsanız o sitenin robots.txt dosyasına bu haritayı gösteren bir Sitemap satırı ekleyin.":
    "Publish the sitemap on the site the addresses belong to, or fix the site address in the setting that generates it (often an old domain or a preview address is left behind). If you list another site's addresses on purpose, add a Sitemap line pointing at this sitemap to that site's robots.txt.",
  "robots.txt bazı yolları yalnızca Googlebot'a açıyor":
    "robots.txt opens some paths only to Googlebot",
  "robots.txt dosyanız bazı yolları tüm botlara (User-agent: *) kapatıyor ama Googlebot'a ayrıca izin veriyor. Bu araç Googlebot değil, o yüzden bu yollardaki sayfaları taramadı; denetimde görünmemeleri sorun olmadıkları anlamına gelmez. Google bu sayfaları tarayabilir.":
    "Your robots.txt closes some paths to all bots (User-agent: *) but separately allows Googlebot. This tool is not Googlebot, so it did not crawl the pages under those paths; their absence from this audit does not mean they are fine. Google can crawl them.",
  "Bir şey yapmanız gerekmiyor. Bu sayfaları da denetlemek istiyorsanız ayrıntıdaki kuralları gözden geçirin; yalnızca Googlebot'a açık bırakmanın bir nedeni yoksa kuralı tüm botlar için aynı yapın.":
    "Nothing needs to change. If you want these pages audited too, review the rules in the details; if there is no reason to open them only to Googlebot, make the rule the same for all bots.",
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
  "Tekrarlanan başlık": "Duplicate title",
  "Birden çok sayfa aynı başlığı (<title>) kullanıyor. Aynı başlıkla arama sonucunda sayfalar birbirine benzer görünür ve ziyaretçi hangisine tıklayacağını seçemez.":
    "Several pages use the same title (<title>). With the same title, the pages look alike in search results and visitors can't tell which one to click.",
  "Her sayfaya kendi içeriğini anlatan farklı bir başlık yazın. Şablondan üretilen sayfalarda ayırt edici bilgiyi (ürün adı, kategori, şehir) başlık şablonuna ekleyin.":
    "Write a different title for each page that describes its own content. For pages generated from a template, add the distinguishing detail (product name, category, city) to the title template.",
  "Tekrarlanan ana başlık (H1)": "Duplicate main heading (H1)",
  "Birden çok sayfa aynı ana başlığı (H1) kullanıyor. Başlık, ziyaretçiye ve Google'a sayfanın ne hakkında olduğunu söyler; aynı başlık farklı sayfaları ayırt etmeyi zorlaştırır. Sitenin her sayfasında logo ya da site adı H1 olarak yazılmışsa bu uyarı genelde ondan gelir.":
    "Several pages use the same main heading (H1). The heading tells visitors and Google what the page is about; the same heading makes different pages hard to tell apart. If the logo or site name is the H1 on every page, that's usually where this warning comes from.",
  "Her sayfanın H1'ini o sayfanın konusunu anlatan kendi cümlesiyle yazın. Logo ya da site adı H1 ise onu H1 olmayan bir etikete çevirin ve sayfa başlığını H1 yapın.":
    "Give each page its own H1 that states that page's topic. If the logo or site name is the H1, change it to a non-H1 tag and make the page title the H1.",
  "Tekrarlanan meta açıklama": "Duplicate meta description",
  "Birden çok sayfa aynı meta açıklamayı (arama sonucunda başlığın altındaki özet) kullanıyor. Aramada hepsi aynı özetle çıkar ve ziyaretçi sayfaları ayırt edemez.":
    "Several pages use the same meta description (the summary under the title in search results). They all appear with the same snippet in search, and visitors can't tell the pages apart.",
  "Her sayfaya kendi açıklamasını yazın ya da yinelenen açıklamayı tamamen silin. Açıklama yoksa Google sayfa metninden bir özet seçer; bu, yanlış bir kopyadan iyidir.":
    "Write a description for each page, or delete the duplicated description entirely. Without one, Google picks a snippet from the page text, which is better than a wrong copy.",
  "Tekrarlanan sayfa içeriği": "Duplicate page content",
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
  "Bazı sayfalar için Google'ın yanıtı eski":
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
  "{count} sayfa soruluyor": "Asking Google about {count} pages",
  "{pages} sayfa tarandı, {issues} bulgu":
    "{pages} pages crawled, {issues} findings",

  // audit-issues/lighthouse-audits.ts, html-checks.ts, external-checks.ts
  "Sayfanın ilk görünümünü engelleyen dosyalar var":
    "Files are blocking the page's first render",
  "Tarayıcı bazı CSS ve JavaScript dosyalarını indirip işlemeden sayfada hiçbir şey göstermiyor. Lighthouse, bunlar ertelenirse ilk içeriğin daha erken görüneceğini hesapladı; tahmini kazanç bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "The browser shows nothing on the page until it has downloaded and processed some CSS and JavaScript files. Lighthouse calculated that deferring them would make the first content appear sooner; the estimated gain is in the finding's details. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sayfanın ilk ekranı için gerekmeyen betiklere defer ya da async ekleyin, ilk ekran için gereken küçük CSS'i sayfaya gömün, kalan CSS'i sonradan yükleyin. WordPress'te bir önbellek eklentisinin \"JavaScript'i ertele\" ve \"kritik CSS\" ayarları bu işi yapar.":
    'Add defer or async to scripts the first screen doesn\'t need, inline the small CSS the first screen needs, and load the rest of the CSS later. On WordPress, a caching plugin\'s "defer JavaScript" and "critical CSS" settings do this.',
  "Sayfada kullanılmayan JavaScript yükleniyor":
    "The page loads JavaScript it doesn't use",
  "Sayfa, açılışta hiç çalışmayan JavaScript kodunu da indiriyor. Telefonda bu hem veri hem işlemci harcar ve sayfayı yavaşlatır. Lighthouse'un tahmin ettiği tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "The page also downloads JavaScript that never runs while it opens. On a phone this costs both data and processor time and slows the page down. Lighthouse's estimated saving is in the finding's details. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Kullanılmayan eklentileri ve etiketleri kaldırın, büyük betik paketlerini sayfaya göre bölün ve yalnızca gereken sayfada yükleyin. Hangi dosyanın ne kadar boşa indiğini PageSpeed Insights raporunda görürsünüz.":
    "Remove unused plugins and tags, split large script bundles by page and load them only where they're needed. PageSpeed Insights shows how much of each file is wasted.",
  "Sayfada kullanılmayan CSS yükleniyor": "The page loads CSS it doesn't use",
  "Sayfa, bu sayfada hiçbir öğeye uygulanmayan stil kurallarını da indiriyor. Genelde tüm siteye tek bir büyük tema dosyası yüklendiğinde olur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "The page also downloads style rules that apply to nothing on this page. This usually happens when one large theme file is loaded on the whole site. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Tema ya da eklentilerin kullanılmayan stil dosyalarını kapatın; bir derleme aracı kullanıyorsanız kullanılmayan CSS'i temizleyen adımı açın.":
    "Turn off unused stylesheets from the theme or plugins; if you use a build tool, enable its step that removes unused CSS.",
  "JavaScript dosyaları sıkıştırılmamış (küçültülmemiş)":
    "JavaScript files aren't minified",
  "Bazı JavaScript dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Küçültme dosyayı anlamını değiştirmeden küçültür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some JavaScript files are served with their whitespace and comments, without minification. Minifying makes a file smaller without changing what it does. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Derleme aracınızda küçültmeyi (minify) açın ya da önbellek/CDN ayarlarından JavaScript küçültmeyi etkinleştirin.":
    "Turn on minification in your build tool, or enable JavaScript minification in your cache or CDN settings.",
  "CSS dosyaları sıkıştırılmamış (küçültülmemiş)": "CSS files aren't minified",
  "Bazı CSS dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some CSS files are served with their whitespace and comments, without minification. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Derleme aracınızda CSS küçültmeyi açın ya da önbellek/CDN ayarlarından CSS küçültmeyi etkinleştirin.":
    "Turn on CSS minification in your build tool, or enable it in your cache or CDN settings.",
  "Görseller gereğinden büyük indiriliyor":
    "Images are downloaded larger than they need to be",
  "Lighthouse sayfadaki bazı görsellerin daha küçük indirilebileceğini hesapladı: eski bir biçimde (JPEG, PNG) sunuluyorlar, sıkıştırılmamışlar ya da ekranda gösterildiklerinden çok daha büyük boyutta indiriliyorlar. Tahmini tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse calculated that some images on the page could be downloaded smaller: they're served in an old format (JPEG, PNG), aren't compressed, or are downloaded much larger than they're displayed. The estimated saving is in the finding's details. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Görselleri WebP ya da AVIF'e çevirin, sıkıştırın ve ekrandaki boyutlarına göre küçültün; farklı ekranlar için srcset ile birden çok boyut sunun. Çoğu CMS'te bir görsel optimizasyon eklentisi bunu otomatik yapar.":
    "Convert images to WebP or AVIF, compress them and resize them to their on-screen size; serve several sizes with srcset for different screens. In most CMSs an image optimization plugin does this automatically.",
  "Dosyalar tarayıcıda yeterince uzun saklanmıyor":
    "Files aren't kept in the browser long enough",
  "Görsel, betik ve stil dosyaları kısa bir önbellek süresiyle ya da hiç önbellek bilgisi olmadan sunuluyor. Ziyaretçi siteye dönünce aynı dosyaları yeniden indirir. Lighthouse'un tahmin ettiği tekrar ziyaret tasarrufu bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Image, script and style files are served with a short cache lifetime or no cache information at all. When a visitor comes back, they download the same files again. Lighthouse's estimated repeat-visit saving is in the finding's details. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  'Değişmeyen dosyalara uzun bir Cache-Control süresi verin (örneğin max-age=31536000) ve dosya değiştiğinde adını değiştirin. Barındırma panelinde ya da CDN\'de "tarayıcı önbelleği" ayarı genelde bunu yapar.':
    "Give files that don't change a long Cache-Control lifetime (for example max-age=31536000) and change a file's name when its content changes. A \"browser cache\" setting in your hosting panel or CDN usually does this.",
  "Sayfanın toplam indirme boyutu çok büyük":
    "The page's total download size is very large",
  "Sayfayı açmak için indirilen her şeyin toplamı 2,5 MB'ı geçiyor. Mobil bağlantıda bu uzun bir yükleme ve ziyaretçinin veri paketinden harcama demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Everything downloaded to open the page adds up to more than 2.5 MB. On a mobile connection that means a long load and data taken from the visitor's plan. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "PageSpeed Insights raporunda en büyük dosyalara bakın. Genelde görseller, videolar ve büyük betik paketleridir: görselleri küçültün, videoyu tıklanınca yükleyin, gereksiz betikleri kaldırın.":
    "Look at the largest files in the PageSpeed Insights report. They're usually images, videos and large script bundles: shrink images, load videos on click, remove unneeded scripts.",
  "Tarayıcıda oluşan sayfa yapısı çok büyük":
    "The page structure built in the browser is very large",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra oluşan HTML yapısının çok büyük olduğunu buldu. Bu, sayfanın kaynak kodunu sayan kontrolden farklıdır: JavaScript'in sonradan eklediği öğeleri de içerir. Büyük bir yapı stil hesaplamayı ve tıklamalara yanıtı yavaşlatır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse found that the HTML structure the page builds after running in the browser is very large. This differs from the check that counts the page's source: it includes elements JavaScript adds later. A large structure slows style calculation and responses to taps. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler, uzun listeler) gerektiğinde oluşturun ve sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Build hidden content (closed menus, tabs, long lists) only when needed, and reduce the page builder's unnecessary wrapper layers.",
  "Sayfa açılmadan önce yönlendirme yapılıyor":
    "The page redirects before it opens",
  "Lighthouse sayfanın ana belgesine ulaşmadan önce bir ya da daha fazla yönlendirmeden geçti. Her yönlendirme, içerik görünmeden önce fazladan bir istek demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse went through one or more redirects before reaching the page's main document. Each redirect is an extra request before any content appears. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Bu sayfaya giden bağlantıları ve site haritasını doğrudan son adrese çevirin; yönlendirme gerekiyorsa tek adımda bitsin.":
    "Point links and the sitemap at the final address directly; if a redirect is needed, make it a single step.",
  "Sunucu ilk yanıtı geç veriyor (Lighthouse)":
    "The server is slow to answer (Lighthouse)",
  "Lighthouse'un ölçümünde sunucunun sayfanın ilk baytını göndermesi 600 milisaniyeden uzun sürdü. Sunucu yanıt vermeden tarayıcı hiçbir şey yapamaz; bu süre sayfanın tüm açılışına eklenir. Tarayıcımızın kendi ölçtüğü yanıt süresinden ayrı, Google'ın sunucularından yapılan bir ölçümdür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "In Lighthouse's measurement, the server took longer than 600 milliseconds to send the page's first byte. The browser can do nothing until the server answers, so this time adds to the whole page load. It's a measurement from Google's servers, separate from the response time our crawler measured. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sayfa önbelleğini (tam sayfa önbellek) açın, yavaş veritabanı sorgularını ve eklentileri bulun, gerekirse daha güçlü bir sunucuya ya da bir CDN'e geçin.":
    "Turn on page caching (full-page cache), find slow database queries and plugins, and if needed move to a stronger server or a CDN.",
  "Sayfa sıkıştırılmadan gönderiliyor": "The page is sent uncompressed",
  "Lighthouse, sayfanın HTML belgesinin gzip ya da Brotli ile sıkıştırılmadan gönderildiğini gördü. Sıkıştırma metin dosyalarını genelde üçte bire indirir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse saw that the page's HTML document is sent without gzip or Brotli compression. Compression usually shrinks text files to a third of their size. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sunucunuzda ya da CDN'de gzip veya Brotli sıkıştırmayı açın. Çoğu barındırma panelinde tek bir ayardır.":
    "Turn on gzip or Brotli compression on your server or CDN. In most hosting panels it's a single setting.",
  "Yazı tipleri yüklenirken metin görünmüyor":
    "Text is invisible while fonts load",
  "Özel yazı tipleri yüklenene kadar metin görünmez kalıyor. Lighthouse, metnin yedek yazı tipiyle hemen gösterilmesinin ilk görünümü hızlandıracağını hesapladı. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Text stays invisible until custom fonts load. Lighthouse calculated that showing the text right away in a fallback font would speed up the first render. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "@font-face kurallarına font-display: swap ekleyin. Google Fonts kullanıyorsanız adresin sonuna &display=swap ekleyin.":
    "Add font-display: swap to your @font-face rules. If you use Google Fonts, add &display=swap to the end of the URL.",
  "Sayfanın ana görseli geç yüklenecek şekilde işaretlenmiş":
    "The page's main image is marked to load late",
  'Sayfanın en büyük öğesi (LCP) olan görselde loading="lazy" var. Tarayıcı bu görseli sayfa yerleşimi bitene kadar istemez, bu yüzden ana içerik geç görünür. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "The image that is the page's largest element (LCP) has loading=\"lazy\". The browser doesn't request it until layout is done, so the main content appears late. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  'Sayfanın ilk ekranındaki ana görselden loading="lazy" özniteliğini kaldırın. Geç yükleme yalnızca ilk ekranın altındaki görsellere uygulanmalı.':
    'Remove loading="lazy" from the main image on the first screen. Lazy loading belongs only on images below the first screen.',
  "Sayfanın ana görseli öncelikli istenmiyor":
    "The page's main image isn't requested with priority",
  "Sayfanın en büyük öğesi (LCP) olan görsel ya sayfanın ilk HTML'inde yer almıyor (tarayıcı onu geç keşfediyor) ya da fetchpriority=\"high\" ile öncelikli istenmiyor. Ayrıntıda hangisinin eksik olduğu yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "The image that is the page's largest element (LCP) is either not in the page's initial HTML (the browser discovers it late) or isn't requested with fetchpriority=\"high\". The details say which is missing. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  'Ana görseli sayfanın HTML\'inde doğrudan bir <img> olarak verin (yalnızca JavaScript ya da CSS arka planı ile değil) ve ona fetchpriority="high" ekleyin. Gerekirse <link rel="preload"> ile önceden yükleyin.':
    'Put the main image directly in the page\'s HTML as an <img> (not only through JavaScript or a CSS background) and add fetchpriority="high". If needed, preload it with <link rel="preload">.',
  "Dosyalar eski HTTP/1.1 ile sunuluyor": "Files are served over old HTTP/1.1",
  "Sayfanın dosyalarının bir kısmı HTTP/2 ya da HTTP/3 yerine HTTP/1.1 ile geliyor. Eski protokolde tarayıcı aynı anda az sayıda dosya indirebilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some of the page's files arrive over HTTP/1.1 instead of HTTP/2 or HTTP/3. With the old protocol the browser can download only a few files at a time. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sunucunuzda ya da CDN'de HTTP/2'yi (tercihen HTTP/3'ü) açın. Çoğu modern barındırma ve CDN bunu varsayılan olarak destekler.":
    "Turn on HTTP/2 (preferably HTTP/3) on your server or CDN. Most modern hosting and CDNs support it by default.",
  "Eski tarayıcılar için gereksiz JavaScript gönderiliyor":
    "Unneeded JavaScript is sent for old browsers",
  "Sayfadaki betikler, güncel tarayıcıların zaten bildiği özellikler için eski tarayıcılara yönelik ek kod (polyfill, dönüştürme) içeriyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "The page's scripts include extra code for old browsers (polyfills, transpiled code) for features current browsers already have. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Derleme aracınızın hedef tarayıcı ayarını (browserslist) güncel tarayıcılara çekin ve artık gerekmeyen polyfill'leri kaldırın.":
    "Move your build tool's target browsers (browserslist) to current browsers and remove polyfills you no longer need.",
  "Üçüncü taraf kodlar tarayıcıyı uzun süre meşgul ediyor":
    "Third-party code keeps the browser busy for a long time",
  "Reklam, sohbet, analiz ya da sosyal medya gibi başka sitelerden gelen betikler telefonda tarayıcının ana iş parçacığını toplam yarım saniyeden uzun meşgul etti. Bu sürede sayfa tıklamalara geç yanıt verir. Hangi hizmetin ne kadar sürdüğü bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Scripts from other sites, such as ads, chat, analytics or social media, kept the browser's main thread busy for more than half a second in total on a phone. During that time the page responds late to taps. Which service took how long is in the finding's details. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Kullanmadığınız etiketleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin; sohbet ya da video gibi ağır gömülü öğeleri tıklanınca yüklenen bir önizlemeyle değiştirin.":
    "Remove tags you don't use, load the rest after the page opens, and replace heavy embeds such as chat or video with a preview that loads on click.",
  "Ana içeriğin yüklenmesi iyileştirilebilir (LCP)":
    "Main content loading could be faster (LCP)",
  "Sayfanın en büyük öğesi 2,5 ile 4 saniye arasında göründü. Google bu aralığı 'iyileştirilmeli' sayar; 2,5 saniye ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa PageSpeed Insights'ın laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    "The page's largest element appeared between 2.5 and 4 seconds. Google rates this range 'needs improvement'; 2.5 seconds or less is 'good'. The value comes from real Chrome user (field) data when there is some, otherwise from PageSpeed Insights' lab measurement; the details say which.",
  "En büyük öğe genelde kapak görseli ya da ana başlıktır: görseli küçültüp WebP gibi hafif bir biçime çevirin, geç yüklenmesini kapatın ve onu engelleyen betik ve yazı tiplerini erteleyin.":
    "The largest element is usually the cover image or the main heading: shrink the image and convert it to a light format such as WebP, turn off its lazy loading, and defer the scripts and fonts blocking it.",
  "Yüklenirken içerik biraz kayıyor (CLS)":
    "Content shifts a little while loading (CLS)",
  "Sayfa yüklenirken içerik 0,1 ile 0,25 arasında kaydı. Google bu aralığı 'iyileştirilmeli' sayar; 0,1 ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    "Content shifted between 0.1 and 0.25 while the page loaded. Google rates this range 'needs improvement'; 0.1 or less is 'good'. The value comes from real Chrome user (field) data when there is some, otherwise from the lab measurement; the details say which.",
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, sonradan yüklenen afiş ve reklamlar için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek tanımlayın.":
    "Give images and embedded frames a width and height, reserve space for banners and ads that load later, and set a fallback for custom fonts that doesn't break the layout.",
  "Tıklamalara yanıt iyileştirilebilir (INP)":
    "Responses to taps could be faster (INP)",
  "Sayfa tıklama ve dokunuşlara 200 ile 500 milisaniye arasında yanıt verdi. Google bu aralığı 'iyileştirilmeli' sayar; 200 milisaniye ve altı 'iyi'dir. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarının gerçek (alan) verisidir.":
    "The page responded to clicks and taps in 200 to 500 milliseconds. Google rates this range 'needs improvement'; 200 milliseconds or less is 'good'. Because a lab test can't simulate interaction, this value is real Chrome user (field) data.",
  "Tıklamada çalışan uzun betikleri bölün, üçüncü taraf etiketleri sayfa açıldıktan sonra yükleyin ve gereksiz olanları kaldırın.":
    "Split long scripts that run on a click, load third-party tags after the page opens, and remove the ones you don't need.",
  "Bazı metinlerin renk karşıtlığı yetersiz":
    "Some text has too little color contrast",
  "Bazı metinler arka planlarıyla yeterince ayrışmıyor; az gören ziyaretçiler ve güneş altında telefon kullananlar onları zor okur. Kaç öğenin etkilendiği ayrıntıda yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some text doesn't stand out enough from its background; visitors with low vision and people using a phone in sunlight struggle to read it. The details say how many elements are affected. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Normal metin için en az 4,5:1, büyük metin için 3:1 karşıtlık oranı sağlayın. Hangi öğelerin yetersiz kaldığını PageSpeed Insights'ın Erişilebilirlik bölümünde görürsünüz.":
    "Ensure a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. PageSpeed Insights' Accessibility section shows which elements fall short.",
  "Görsellerde alternatif metin eksik (Lighthouse)":
    "Images are missing alternative text (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra alternatif metni (alt) olmayan görseller buldu. Bu, JavaScript'in sonradan eklediği görselleri de kapsar. Ekran okuyucular bu görselleri anlatamaz, Google da ne gösterdiklerini metinden öğrenemez. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse found images without alternative text (alt) after the page ran in the browser. This includes images JavaScript adds later. Screen readers can't describe these images, and Google can't learn from text what they show. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  'Her anlamlı görsele ne gösterdiğini anlatan kısa bir alt metni ekleyin; süs amaçlı görsellere boş alt="" verin.':
    'Give every meaningful image a short alt text describing what it shows; give decorative images an empty alt="".',
  "Form alanlarının etiketi yok (Lighthouse)":
    "Form fields have no label (Lighthouse)",
  "Bazı form alanlarına bağlı bir etiket yok. Ekran okuyucu kullanan ziyaretçi alana ne yazması gerektiğini duyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some form fields have no label attached. A visitor using a screen reader can't hear what to type into the field. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Her alana for özniteliğiyle bağlı bir <label> ekleyin; görünür etiket istenmiyorsa aria-label kullanın.":
    "Add a <label> linked to each field with the for attribute; if you don't want a visible label, use aria-label.",
  "Bazı bağlantıların okunabilir adı yok": "Some links have no readable name",
  'Bazı bağlantılarda ne metin ne de erişilebilir bir ad var (örneğin yalnızca bir simge). Ekran okuyucu bunları yalnızca "bağlantı" diye okur; Google da bağlantının neye gittiğini metinden anlayamaz. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Some links have neither text nor an accessible name (for example only an icon). A screen reader reads them only as "link", and Google can\'t tell from the text where they go. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.',
  "Bağlantıya görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Add visible text to the link; if it's only an icon, say what it does with aria-label.",
  "Bazı düğmelerin okunabilir adı yok": "Some buttons have no readable name",
  'Bazı düğmelerde ne metin ne de erişilebilir bir ad var. Ekran okuyucu bunları yalnızca "düğme" diye okur. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Some buttons have neither text nor an accessible name. A screen reader reads them only as "button". This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.',
  "Düğmeye görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Add visible text to the button; if it's only an icon, say what it does with aria-label.",
  "Sayfanın tarayıcıda başlığı yok (Lighthouse)":
    "The page has no title in the browser (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra bir <title> bulamadı. Sekmede ve arama sonucunda başlık olarak gösterilecek bir şey yok. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse couldn't find a <title> after the page ran in the browser. There's nothing to show as the title in the tab or in search results. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sayfanın <head> bölümüne sayfayı anlatan benzersiz bir <title> ekleyin; başlığı JavaScript ile sonradan yazıyorsanız sunucunun gönderdiği HTML'e taşıyın.":
    "Add a unique <title> describing the page to its <head>; if JavaScript writes the title later, move it into the HTML the server sends.",
  "Sayfanın dili tarayıcıda belirtilmemiş (Lighthouse)":
    "The page's language isn't declared in the browser (Lighthouse)",
  "Lighthouse, <html> öğesinde lang özniteliği bulamadı. Ekran okuyucular metni yanlış dilin kurallarıyla okuyabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse found no lang attribute on the <html> element. Screen readers may read the text with the wrong language's rules. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  'Sayfanın <html> etiketine dilini ekleyin, örneğin <html lang="tr">.':
    'Add the page\'s language to its <html> tag, for example <html lang="en">.',
  "Telefonda yakınlaştırma engellenmiş (Lighthouse)":
    "Zooming is blocked on phones (Lighthouse)",
  "Sayfanın viewport ayarı ziyaretçinin metni büyütmesini engelliyor (user-scalable=no ya da düşük bir maximum-scale). Az gören ziyaretçiler sayfayı okuyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "The page's viewport setting stops visitors from enlarging the text (user-scalable=no or a low maximum-scale). Visitors with low vision can't read the page. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerini kaldırın; content="width=device-width, initial-scale=1" yeterlidir.':
    'Remove user-scalable=no and the maximum-scale value from the viewport tag; content="width=device-width, initial-scale=1" is enough.',
  "Dokunma hedefleri çok küçük ya da çok sık":
    "Tap targets are too small or too close together",
  "Bazı düğme ve bağlantılar telefonda parmakla rahat dokunulamayacak kadar küçük ya da birbirine çok yakın. Ziyaretçi yanlış yere dokunur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some buttons and links are too small or too close to each other to tap comfortably with a finger on a phone. Visitors tap the wrong thing. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Dokunulan öğelere en az 24×24 piksel alan verin ve aralarında boşluk bırakın; menü ve altbilgi bağlantıları genelde bunun için büyütülmelidir.":
    "Give tappable elements at least 24×24 pixels and leave space between them; menu and footer links usually need to be made larger.",
  "Başlık sırası tarayıcıda atlıyor (Lighthouse)":
    "Heading order skips levels in the browser (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra başlık düzeylerinin sırayla gitmediğini gördü (örneğin H2'den H4'e atlama). Ekran okuyucu kullananlar sayfada başlıklarla gezinir ve atlanan düzey yapıyı bozar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse saw that heading levels don't go in order after the page ran in the browser (for example jumping from H2 to H4). Screen reader users navigate by headings, and a skipped level breaks the structure. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Başlıkları sırayla kullanın (H1, H2, H3); bir başlığı yalnızca küçük görünsün diye alt düzeyden seçmeyin, boyutu CSS ile ayarlayın.":
    "Use headings in order (H1, H2, H3); don't pick a lower level just so a heading looks small, set its size with CSS.",
  "Sayfa güvensiz (http) istekler yapıyor":
    "The page makes insecure (http) requests",
  'Lighthouse, sayfanın kendisinin ya da yüklediği bazı dosyaların şifresiz http ile geldiğini gördü. Tarayıcı bu istekleri engelleyebilir ya da "Güvenli değil" uyarısı gösterebilir. Hangi adreslerin güvensiz olduğu ayrıntıda yazar. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Lighthouse saw that the page itself or some of the files it loads arrive unencrypted over http. The browser may block these requests or show a "Not secure" warning. The details say which addresses are insecure. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.',
  "Sayfayı ve yüklediği tüm dosyaları https adresinden sunun; sayfadaki http:// ile başlayan dosya adreslerini https:// yapın.":
    "Serve the page and every file it loads from https; change file addresses on the page that start with http:// to https://.",
  "Sayfa açılırken tarayıcı hata kaydediyor":
    "The browser logs errors while the page opens",
  "Sayfa açılırken tarayıcının konsoluna hata düştü: yüklenemeyen bir dosya, çalışırken çöken bir betik ya da engellenen bir istek. Bazıları ziyaretçiye görünmez, bazıları bir özelliğin çalışmadığını gösterir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Errors appeared in the browser console while the page opened: a file that failed to load, a script that crashed while running, or a blocked request. Some are invisible to visitors, some mean a feature doesn't work. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sayfayı Chrome'da açıp geliştirici araçlarının Konsol sekmesine bakın; ayrıntıdaki adreslerden başlayarak hataları giderin.":
    "Open the page in Chrome and look at the Console tab in developer tools; start fixing from the addresses in the details.",
  "Sayfa tarayıcıların kaldıracağı özellikler kullanıyor":
    "The page uses features browsers are removing",
  "Sayfa, Chrome'un kullanımdan kaldırdığı ya da kaldıracağı özellikleri kullanıyor. Şimdi çalışıyor olabilir ama bir tarayıcı güncellemesinden sonra bozulabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "The page uses features Chrome has deprecated or will remove. It may work now but can break after a browser update. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "PageSpeed Insights raporundaki listeye bakın; genelde eski bir eklenti ya da kütüphanedir ve güncellemek yeterlidir.":
    "Look at the list in the PageSpeed Insights report; it's usually an old plugin or library and updating it is enough.",
  "Tarayıcı sayfada sorunlar bildiriyor":
    "The browser reports problems on the page",
  "Chrome'un geliştirici araçlarındaki \"Sorunlar\" bölümü bu sayfa için kayıt tuttu: örneğin engellenen çerezler, güvenlik başlığı sorunları ya da hatalı kaynak istekleri. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    'Chrome\'s developer tools "Issues" panel logged entries for this page: for example blocked cookies, security header problems or faulty resource requests. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.',
  'Sayfayı Chrome\'da açıp geliştirici araçlarının "Issues" (Sorunlar) sekmesine bakın ve listelenen sorunları giderin.':
    'Open the page in Chrome, look at the "Issues" tab in developer tools and fix the problems listed.',
  "Bazı görseller yanlış oranla gösteriliyor":
    "Some images are shown at the wrong ratio",
  "Bazı görseller, kendi en-boy oranlarından farklı bir oranda gösterildiği için basık ya da uzamış görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some images look squashed or stretched because they're displayed at a different ratio from their own aspect ratio. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Görselin width ve height değerlerini kendi oranına uygun verin ya da CSS'te object-fit kullanın.":
    "Give the image width and height values that match its own ratio, or use object-fit in CSS.",
  "Bazı görseller ekran için düşük çözünürlüklü":
    "Some images are low resolution for the screen",
  "Bazı görseller, telefonun ekran yoğunluğuna göre gereğinden küçük çözünürlükte sunuluyor ve bulanık görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Some images are served at a lower resolution than the phone's screen density needs and look blurry. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Görsellerin daha büyük sürümlerini srcset ile sunun, böylece tarayıcı ekrana uygun olanı seçer.":
    "Serve larger versions of the images with srcset so the browser picks the one that fits the screen.",
  "Bazı bağlantılar taranamıyor (Lighthouse)":
    "Some links can't be crawled (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra Google'ın izleyemeyeceği bağlantılar buldu: geçerli bir href'i olmayan ya da yalnızca JavaScript ile çalışan bağlantılar. Google yalnızca href'i gerçek bir adres olan <a> bağlantılarını izler. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "After the page ran in the browser, Lighthouse found links Google can't follow: links without a valid href or that only work with JavaScript. Google follows only <a> links whose href is a real address. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Her bağlantıyı href özniteliği gerçek bir adres olan bir <a> etiketi yapın; javascript: ya da yalnızca onclick ile çalışan bağlantıları değiştirin.":
    "Make every link an <a> tag whose href is a real address; replace links that work only with javascript: or onclick.",
  "Bağlantı metinleri açıklayıcı değil (Lighthouse)":
    "Link texts aren't descriptive (Lighthouse)",
  'Bazı bağlantıların metni "buraya tıklayın" ya da "devamı" gibi gittiği yeri anlatmayan sözlerden oluşuyor. Google bağlantı metninden hedef sayfanın konusunu öğrenir. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Some links\' text is made of words like "click here" or "read more" that don\'t say where they go. Google learns the target page\'s topic from link text. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.',
  'Bağlantı metnini gittiği sayfanın konusunu anlatacak şekilde yazın, örneğin "devamı" yerine "kargo ücretleri".':
    'Write link text that describes the target page\'s topic, for example "shipping costs" instead of "read more".',
  "Google sayfayı dizine alamıyor (Lighthouse)":
    "Google can't index the page (Lighthouse)",
  "Tarayıcımız bu sayfayı dizine alınabilir gördü, ama Lighthouse'un ölçümünde Google'ın sayfayı dizine almasını engelleyen bir kural vardı (robots.txt, noindex etiketi ya da X-Robots-Tag başlığı). Kural yalnızca Google'a ya da yalnızca bazı ziyaretçilere gösteriliyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Our crawler found this page indexable, but in Lighthouse's measurement there was a rule stopping Google from indexing it (robots.txt, a noindex tag or an X-Robots-Tag header). The rule may be shown only to Google or only to some visitors. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sayfanın aramada görünmesi gerekiyorsa robots.txt'teki ilgili Disallow satırını ve sayfadaki noindex kuralını kaldırın; sunucunun Googlebot'a farklı bir yanıt vermediğini kontrol edin.":
    "If the page should appear in search, remove the matching Disallow line from robots.txt and the noindex rule on the page; check that the server doesn't answer Googlebot differently.",
  "robots.txt dosyasında geçersiz satırlar var": "robots.txt has invalid lines",
  "Lighthouse sitenin robots.txt dosyasında kurallara uymayan satırlar buldu. Google geçersiz satırları yok sayar, yani yazdığınız bir kural uygulanmıyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse found lines in the site's robots.txt that don't follow the rules. Google ignores invalid lines, so a rule you wrote may not be applied. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  'robots.txt\'i açın ve PageSpeed Insights raporunda gösterilen satırları düzeltin; her satır "Alan: değer" biçiminde olmalı (User-agent, Disallow, Allow, Sitemap).':
    'Open robots.txt and fix the lines shown in the PageSpeed Insights report; each line should be in "Field: value" form (User-agent, Disallow, Allow, Sitemap).',
  "hreflang etiketleri geçersiz (Lighthouse)":
    "hreflang tags are invalid (Lighthouse)",
  "Lighthouse, sayfadaki dil sürümü (hreflang) etiketlerinde geçersiz bir dil kodu ya da göreli bir adres buldu. Google geçersiz hreflang etiketlerini yok sayar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse found an invalid language code or a relative address in the page's language version (hreflang) tags. Google ignores invalid hreflang tags. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Her hreflang değerinin geçerli bir dil kodu (tr, en-GB gibi) ve adresin tam adres (https:// ile başlayan) olduğundan emin olun.":
    "Make sure each hreflang value is a valid language code (en, en-GB and so on) and the address is a full address (starting with https://).",
  "canonical etiketi geçersiz (Lighthouse)":
    "The canonical tag is invalid (Lighthouse)",
  "Lighthouse sayfanın canonical etiketini geçersiz buldu: birbiriyle çelişen birden çok adres, geçersiz bir adres, başka bir alan adına ya da sitenin ana sayfasına işaret eden bir adres olabilir. Google böyle bir canonical'ı yok sayabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse found the page's canonical tag invalid: it may be several conflicting addresses, an invalid address, or an address on another domain or the site's home page. Google may ignore such a canonical. This finding comes from the Lighthouse report PageSpeed Insights produced when it measured the mobile version of the page.",
  "Sayfada tek bir canonical etiketi bırakın ve onu sayfanın kendi tam adresine (ya da gerçekten asıl olan sayfaya) yönlendirin.":
    "Keep a single canonical tag on the page and point it at the page's own full address (or at the page that really is the original).",
  "Güvenli sayfada güvensiz görsel, video ya da çerçeve":
    "Insecure image, video or frame on a secure page",
  'Güvenli (https) sayfa bir görseli, videoyu, sesi ya da gömülü çerçeveyi (iframe) şifresiz http adresinden yüklüyor. Tarayıcılar böyle görsel ve medyayı https\'e çevirmeyi dener, olmazsa göstermez; http çerçeveleri ise doğrudan engeller. Ziyaretçi boş bir alan ya da "Güvenli değil" uyarısı görebilir.':
    'The secure (https) page loads an image, video, audio or embedded frame (iframe) from an unencrypted http address. Browsers try to upgrade such images and media to https and don\'t show them if that fails; http frames are blocked outright. The visitor may see an empty space or a "Not secure" warning.',
  "Ayrıntıdaki adresleri https:// ile başlayacak şekilde değiştirin. Dosya kendi sitenizdeyse adresi göreli (/resimler/...) yazmak da yeter.":
    "Change the addresses in the details to start with https://. If the file is on your own site, writing the address as relative (/images/...) also works.",
  "Form bilgileri şifresiz gönderiliyor": "Form data is sent unencrypted",
  "Güvenli (https) sayfadaki bir form, doldurulan bilgileri şifresiz bir http adresine gönderiyor. Tarayıcılar gönderimden önce ziyaretçiyi uyarır ve bilgiler yolda okunabilir.":
    "A form on the secure (https) page sends what's filled in to an unencrypted http address. Browsers warn the visitor before submitting, and the data can be read in transit.",
  "Formun action adresini https:// ile başlayacak şekilde değiştirin ya da formu aynı sitedeki göreli bir adrese gönderin.":
    "Change the form's action address to start with https://, or send the form to a relative address on the same site.",
  "Sayfa meta refresh ile yönlendiriyor":
    "The page redirects with meta refresh",
  'Sayfa, sunucu yönlendirmesi yerine HTML içindeki <meta http-equiv="refresh"> etiketiyle başka bir adrese gönderiyor. Google bunu anlar, ama sunucu tarafında bir 301 yönlendirmesini tercih eder; ziyaretçi de yönlendirmeden önce boş bir sayfa görebilir.':
    'The page sends visitors to another address with a <meta http-equiv="refresh"> tag in the HTML instead of a server redirect. Google understands it but prefers a server-side 301 redirect; the visitor may also see a blank page before the redirect.',
  "Mümkünse yönlendirmeyi sunucuda (301 ya da 308) yapın ve meta refresh etiketini kaldırın.":
    "If possible, redirect on the server (301 or 308) and remove the meta refresh tag.",
  "canonical adresi göreli yazılmış":
    "The canonical address is written as relative",
  "Sayfanın canonical etiketi tam adres yerine göreli bir yol (örneğin /urun) gösteriyor. Google göreli adresi çözebilir, ama tam adres kullanılmasını önerir; göreli yol, sayfa farklı bir adresten açıldığında yanlış yere işaret edebilir.":
    "The page's canonical tag shows a relative path (for example /product) instead of a full address. Google can resolve relative addresses but recommends full ones; a relative path can point to the wrong place when the page is opened from a different address.",
  "canonical adresini https:// ile başlayan tam adres olarak yazın.":
    "Write the canonical address as a full address starting with https://.",
  "canonical adresinde # parçası var": "The canonical address has a # fragment",
  "Sayfanın canonical adresi # ile başlayan bir parça içeriyor. Google adresin # sonrasını dikkate almaz, bu yüzden bu parça bir işe yaramaz ve genelde bir şablon hatasının işaretidir.":
    "The page's canonical address contains a fragment starting with #. Google ignores everything after the #, so the fragment does nothing and is usually a sign of a template mistake.",
  "canonical adresinden # ve sonrasını kaldırın.":
    "Remove the # and everything after it from the canonical address.",
  "canonical etiketi sayfanın gövdesinde":
    "The canonical tag is in the page body",
  "Sayfanın tek canonical etiketi <head> bölümünde değil, <body> içinde. Google canonical etiketini yalnızca <head> içinde okur; gövdedeki etiket yok sayılır, yani sayfanın aslında canonical'ı yok.":
    "The page's only canonical tag is inside <body>, not in the <head> section. Google reads the canonical tag only in <head>; the one in the body is ignored, so the page effectively has no canonical.",
  "canonical etiketini sayfanın <head> bölümüne taşıyın. Genelde bir eklentinin ya da şablonun etiketi yanlış yere yazmasından olur.":
    "Move the canonical tag into the page's <head> section. It usually happens when a plugin or template writes the tag in the wrong place.",
  "robots etiketleri birbiriyle çelişiyor": "Robots tags contradict each other",
  "Sayfada birden fazla robots etiketi var ve biri izin verirken diğeri yasaklıyor (örneğin biri index, diğeri noindex). Google böyle bir çelişkide daha kısıtlayıcı olan kuralı uygular; yani sayfa büyük olasılıkla istediğinizden farklı işlenir.":
    "The page has more than one robots tag and one allows what another forbids (for example one says index, another noindex). In such a conflict Google applies the more restrictive rule, so the page is probably handled differently from what you want.",
  "Sayfada tek bir robots etiketi bırakın. Genelde bir SEO eklentisi ile temanın aynı etiketi ayrı ayrı yazmasından olur.":
    "Keep a single robots tag on the page. It usually happens when an SEO plugin and the theme each write the same tag.",
  "Aramada sayfanın özeti gösterilmiyor":
    "Search doesn't show the page's snippet",
  "Sayfa dizine alınabilir, ama nosnippet ya da max-snippet:0 kuralı Google'ın arama sonucunda sayfanın metninden özet göstermesini engelliyor. Özetsiz bir sonuç daha az tıklanır. Bilerek yapılmış olabilir.":
    "The page can be indexed, but a nosnippet or max-snippet:0 rule stops Google from showing a snippet of the page's text in search results. A result without a snippet gets fewer clicks. It may be intentional.",
  "Bilerek değilse robots etiketinden ya da X-Robots-Tag başlığından nosnippet ve max-snippet:0 kuralını kaldırın.":
    "If it's not intentional, remove nosnippet and max-snippet:0 from the robots tag or the X-Robots-Tag header.",
  'Sayfa "bulunamadı" diyor ama başarılı yanıt veriyor':
    'The page says "not found" but answers successfully',
  'Sayfanın başlığı ya da ana başlığı "404" ya da "sayfa bulunamadı" diyor, ama sunucu 200 (başarılı) kodu döndürüyor. Google böyle sayfaları "soft 404" sayar ve dizine almaz; ama taramaya zaman harcar ve gerçek bir hata sayfası olduğunu anlamakta gecikebilir.':
    'The page\'s title or main heading says "404" or "page not found", but the server returns a 200 (success) code. Google treats such pages as "soft 404s" and doesn\'t index them, but it spends crawl time on them and can be slow to realize it\'s an error page.',
  "Sayfa gerçekten yoksa sunucunun 404 ya da 410 kodu döndürmesini sağlayın. Varsa başlığını ve içeriğini düzeltin.":
    "If the page really doesn't exist, make the server return a 404 or 410 code. If it does, fix its title and content.",
  "Sayfada yer tutucu metin (lorem ipsum) kalmış":
    "Placeholder text (lorem ipsum) was left on the page",
  'Sayfanın görünen metninde "lorem ipsum" yer tutucu metni var. Tasarım aşamasından kalmış ve yayına unutulmuş içerik, ziyaretçiye ve Google\'a sayfanın bitmediğini söyler.':
    "The page's visible text contains the \"lorem ipsum\" placeholder. Content left over from the design stage and published by mistake tells visitors and Google the page isn't finished.",
  "Yer tutucu metni gerçek içerikle değiştirin ya da o bölümü kaldırın.":
    "Replace the placeholder text with real content or remove that section.",
  "E-posta adresi düz metin olarak açıkta":
    "An e-mail address is exposed as plain text",
  "Sayfada düz metin ya da mailto bağlantısı olarak bir e-posta adresi var. Spam gönderenlerin botları sayfaları bu adresler için tarar. Ziyaretçinin size ulaşması için gerekliyse sorun değildir.":
    "The page has an e-mail address as plain text or as a mailto link. Spammers' bots crawl pages for these addresses. It's not a problem if visitors need it to reach you.",
  "İletişim için bir form kullanmayı düşünün ya da adresi spam filtresi güçlü bir kutuya yönlendirin.":
    "Consider using a contact form, or route the address to a mailbox with strong spam filtering.",
  "Başlıktaki kelimeler sayfa içeriğinde geçmiyor":
    "The title's words don't appear in the page content",
  "Sayfa başlığındaki (title) anlamlı kelimelerin hiçbiri ana başlıkta ya da sayfa metninde geçmiyor. Google başlığın sayfayı anlatıp anlatmadığına bakar; içerikle ilgisi olmayan bir başlığı arama sonucunda başka bir metinle değiştirebilir. Bu bir tahmindir: eş anlamlı kelimeler sayılmaz.":
    "None of the meaningful words in the page title appear in the main heading or the page text. Google checks whether a title describes the page and may replace a title unrelated to the content with other text in search results. This is a heuristic: synonyms aren't counted.",
  "Başlığı sayfanın gerçekten anlattığı konuya göre yazın ya da başlıktaki ana kelimeyi ana başlıkta ve ilk paragrafta kullanın.":
    "Write the title around what the page is really about, or use the title's main word in the main heading and the first paragraph.",
  "Kuruluş yapısal verisinde sosyal profiller yok":
    "Organization structured data lists no social profiles",
  "Sayfadaki Organization yapısal verisinde sameAs özelliği yok. sameAs, kuruluşunuzun resmi sosyal medya ve kayıt profillerini (LinkedIn, Wikipedia gibi) gösterir; Google kuruluşu tanırken bu bağlantıları kullanır. Google bunu önerir, zorunlu tutmaz.":
    "The Organization structured data on the page has no sameAs property. sameAs lists your organization's official social media and registry profiles (LinkedIn, Wikipedia and so on); Google uses these links to recognize the organization. Google recommends it but doesn't require it.",
  'Organization yapısal verisine sameAs ekleyin ve içine resmi profil adreslerinizi liste olarak yazın, örneğin "sameAs": ["https://www.linkedin.com/company/..."].':
    'Add sameAs to the Organization structured data with your official profile addresses as a list, for example "sameAs": ["https://www.linkedin.com/company/..."].',
  "Derindeki sayfada içerik yolu (breadcrumb) yok":
    "A deep page has no breadcrumb trail",
  "Ana sayfadan en az üç tıklama uzaktaki bu sayfada ne bir içerik yolu (breadcrumb) gezinmesi ne de BreadcrumbList yapısal verisi var. İçerik yolu ziyaretçiye nerede olduğunu gösterir; Google da arama sonucunda adres yerine bu yolu gösterebilir.":
    "This page, at least three clicks from the home page, has neither breadcrumb navigation nor BreadcrumbList structured data. A breadcrumb shows visitors where they are, and Google can show the trail instead of the address in search results.",
  "Sayfanın üstüne Ana sayfa > Kategori > Sayfa biçiminde bir içerik yolu ekleyin ve BreadcrumbList yapısal verisiyle işaretleyin. Çoğu SEO eklentisi ikisini birlikte ekler.":
    "Add a breadcrumb trail like Home > Category > Page at the top of the page and mark it up with BreadcrumbList structured data. Most SEO plugins add both together.",
  "Sayfalamanın devam sayfası aramadan gizlenmiş":
    "A follow-on page of a paginated list is hidden from search",
  "Bir listenin 2. ya da sonraki sayfası noindex ile aramadan gizlenmiş. Google'ın sayfalama rehberi her sayfanın kendi adresiyle dizine girebilmesini önerir. Uzun süre noindex kalan bir sayfadaki bağlantıları Google zamanla izlemeyi bırakabilir; o zaman yalnızca bu sayfalardan bağlantı alan ürün ya da yazılar bulunmaz olur.":
    "Page 2 or later of a list is hidden from search with noindex. Google's pagination guidance recommends that every page can be indexed at its own address. Google may eventually stop following links on a page that stays noindexed for a long time; then products or posts linked only from these pages can't be found.",
  "Sayfalama sayfalarından noindex'i kaldırın ve her birine kendi adresini canonical olarak verin.":
    "Remove noindex from the paginated pages and give each one its own address as canonical.",
  "Güvenli sitede iç bağlantılar http adresine gidiyor":
    "On a secure site, internal links go to http addresses",
  "Site https ile çalışıyor, ama bu sayfadaki bazı bağlantılar sitenin kendi sayfalarına http:// ile veriliyor. Her tıklama önce bir yönlendirmeden geçer ya da ziyaretçi güvensiz sürüme düşer; Google da aynı sayfanın iki adresini görür.":
    "The site runs on https, but some links on this page point to the site's own pages with http://. Every click first goes through a redirect or drops the visitor to the insecure version, and Google sees two addresses for the same page.",
  "Şablondaki ve içerikteki iç bağlantıları https:// ile ya da göreli (/sayfa) olarak yazın. Veritabanında eski http adreslerini toplu değiştirmek genelde en hızlı yoldur.":
    "Write internal links in templates and content with https:// or as relative (/page). Replacing old http addresses in the database in bulk is usually the fastest way.",
  "Sayfanın içine gömülü kod çok büyük":
    "The code embedded in the page is very large",
  "Sayfanın HTML'ine doğrudan gömülmüş betik ve stil kodu 100 KB'ı geçiyor. Gömülü kod tarayıcı önbelleğinde saklanmaz ve her sayfa açılışında yeniden indirilir; sayfa da ilk içeriği göstermeden önce bu kodu okumak zorunda kalır.":
    "Script and style code embedded directly in the page's HTML exceeds 100 KB. Embedded code isn't kept in the browser cache and is downloaded again on every page view; the page also has to read it before showing the first content.",
  "Büyük gömülü betik ve stilleri ayrı dosyalara taşıyın; yalnızca ilk ekran için gereken küçük CSS'i gömülü bırakın.":
    "Move large embedded scripts and styles into separate files; keep embedded only the small CSS the first screen needs.",
  "Blog var ama RSS/Atom akışı bildirilmemiş":
    "There's a blog but no RSS/Atom feed is declared",
  "Sitede yazı (Article, BlogPosting) olarak işaretlenmiş sayfalar var, ama taranan hiçbir sayfa bir RSS ya da Atom akışı bildirmiyor. Akış, okuyucuların ve haber toplayıcıların yeni yazılarınızı izlemesini sağlar; Google da yeni içeriği daha çabuk keşfedebilir.":
    "The site has pages marked as posts (Article, BlogPosting), but no crawled page declares an RSS or Atom feed. A feed lets readers and news aggregators follow your new posts, and Google can discover new content sooner.",
  'Bir RSS ya da Atom akışı yayınlayın ve sayfaların <head> bölümüne <link rel="alternate" type="application/rss+xml" href="/feed"> ile bildirin. Çoğu blog altyapısında akış hazırdır, yalnızca etiketin eklenmesi gerekir.':
    'Publish an RSS or Atom feed and declare it in the pages\' <head> with <link rel="alternate" type="application/rss+xml" href="/feed">. Most blog platforms have a feed ready; only the tag needs adding.',
  "Başka bir siteye verilen bağlantı kırık": "A link to another site is broken",
  "Bu sayfadaki bir bağlantı başka bir sitede açılmayan bir adrese gidiyor: adres 404 ya da başka bir hata veriyor, ya da alan adı artık yok. Ziyaretçi bir hata sayfasına düşer ve sayfanız bakımsız görünür. Botlara kapalı siteler (sosyal ağlar gibi) ve yanıt vermeyen adresler kırık sayılmaz, kontrol edilmemiş sayılır.":
    "A link on this page goes to an address on another site that doesn't open: the address returns 404 or another error, or the domain no longer exists. The visitor lands on an error page and your page looks neglected. Sites closed to bots (such as social networks) and addresses that don't answer aren't counted as broken; they count as not checked.",
  "Bağlantıyı hedefin yeni adresine güncelleyin ya da kaldırın. Ayrıntıda hangi adresin hangi yanıtı verdiği yazar.":
    "Update the link to the target's new address or remove it. The details say which address gave which answer.",
  "Görsel dosyası çok büyük": "Image file is too large",
  "Sayfadaki bir ya da daha fazla görsel dosyası 200 KB'tan büyük (ayrıntıda 500 KB'ı geçenler ayrıca sayılır). Boyut, dosyanın kendisine istek gönderilerek ölçüldü. Büyük görseller özellikle mobil bağlantıda sayfayı yavaşlatır.":
    "One or more image files on the page are larger than 200 KB (those over 500 KB are counted separately in the details). The size was measured by requesting the file itself. Large images slow the page down, especially on mobile connections.",
  "Görseli gösterildiği boyuta küçültün, sıkıştırın ve WebP ya da AVIF biçimine çevirin. Çoğu fotoğraf bu işlemden sonra 100 KB'ın altına iner.":
    "Resize the image to the size it's shown at, compress it and convert it to WebP or AVIF. Most photos drop below 100 KB after this.",

  // audit/launch/LaunchFormCard.tsx (external checks)
  "Dış bağlantıları ve görsel boyutlarını da kontrol et":
    "Also check outgoing links and image sizes",
  "Dış kontroller": "External checks",
  "Tarama bittikten sonra başka sitelere verilen bağlantıların açılıp açılmadığına ve sitenizdeki görsel dosyalarının boyutuna bakar. En çok 300 adres sorulur; sosyal ağlar gibi botları engelleyen siteler atlanır.":
    "After the crawl, checks whether links to other sites still open and measures your site's image files. At most 300 addresses are requested; sites that block bots, such as social networks, are skipped.",

  // ---- W1: site-level probes (audit-issues/crawl.ts site facts, audit-issues/security.ts) ----
  "Site hem www ile hem www'siz açılıyor":
    "Site opens both with and without www",
  "Sitenizin www'li ve www'siz adresi ikisi de sayfayı açıyor; biri ötekine yönlendirmiyor. Google bunları aynı içeriğin iki kopyası olarak görür, hangisini göstereceğini kendisi seçer ve bağlantıların değeri iki adres arasında bölünebilir.":
    "Both the www and the non-www address of your site serve the page; neither redirects to the other. Google sees them as two copies of the same content, picks which one to show by itself, and the value of links can be split between the two addresses.",
  'Bir adresi asıl seçin (genelde zaten kullandığınız) ve ötekinden ona kalıcı (301) yönlendirme verin. Barındırma panellerinde bu genelde "www\'ye yönlendir" ya da "www\'siz adrese yönlendir" ayarıdır.':
    'Pick one address as the main one (usually the one you already use) and give the other a permanent (301) redirect to it. In hosting panels this is usually a "redirect to www" or "redirect to non-www" setting.',
  "Var olmayan sayfa 404 yerine 200 dönüyor":
    "Missing page returns 200 instead of 404",
  'Sitede olmayan rastgele bir adres istedik, sunucu "bulunamadı" (404) yerine "tamam" (200) yanıtı verdi. Google bunu yumuşak 404 sayar: silinen ya da yanlış yazılan adresler gerçek sayfa gibi görünür, tarama boşa gider ve boş sayfalar dizine girebilir.':
    'We requested a random address that doesn\'t exist on the site and the server answered "OK" (200) instead of "not found" (404). Google counts this as a soft 404: deleted or mistyped addresses look like real pages, crawling is wasted, and empty pages can get indexed.',
  'Sitenizin hata sayfası ayarını kontrol edin: olmayan adresler için 404 durum kodu dönmeli. İçerik yönetim sisteminizde "özel 404 sayfası" varsa sayfanın içeriği aynı kalabilir, yalnızca durum kodu 404 olmalı.':
    "Check your site's error page setting: addresses that don't exist must return the 404 status code. If your CMS has a \"custom 404 page\", its content can stay the same; only the status code needs to be 404.",
  "Var olmayan sayfalar ana sayfaya yönlendiriliyor":
    "Missing pages redirect to the home page",
  "Sitede olmayan rastgele bir adres istedik, sunucu bizi ana sayfaya yönlendirdi. Google bunu genelde yumuşak 404 sayar ve yönlendirmeyi yok sayar; ziyaretçi de aradığını bulamadığını anlamadan ana sayfaya düşer.":
    "We requested a random address that doesn't exist on the site and the server redirected us to the home page. Google usually counts this as a soft 404 and ignores the redirect; visitors land on the home page without realising what they were looking for isn't there.",
  "Olmayan adreslerde 404 dönen, arama kutusu ya da önemli bağlantılar içeren bir hata sayfası gösterin. Yalnızca taşınan sayfaları yeni adreslerine yönlendirin.":
    "Show an error page that returns 404 and offers a search box or key links for addresses that don't exist. Only redirect pages that actually moved to their new addresses.",
  "Site simgesi (favicon) bulunamadı": "Site icon (favicon) not found",
  "Sayfada bir site simgesi tanımlanmamış ve /favicon.ico adresi de bir simge döndürmüyor (ya da tanımlanan simge açılmıyor). Google mobil arama sonuçlarında sitenizin adının yanında bu simgeyi gösterir; yoksa genel bir simge çıkar ve sonuç daha az fark edilir.":
    "The page declares no site icon and /favicon.ico doesn't return one either (or the declared icon doesn't load). Google shows this icon next to your site's name in mobile search results; without it a generic icon appears and the result stands out less.",
  'En az 48x48 piksellik kare bir simge hazırlayın, sitenize yükleyin ve sayfaların <head> bölümüne `<link rel="icon" href="/favicon.ico">` ekleyin. Site oluşturucularda bu genelde "site simgesi" ayarıdır.':
    'Make a square icon of at least 48x48 pixels, upload it to your site and add `<link rel="icon" href="/favicon.ico">` to the <head> of your pages. In site builders this is usually the "site icon" setting.',
  "robots.txt tüm siteyi Google'a kapatıyor":
    "robots.txt closes the whole site to Google",
  "robots.txt dosyanız Googlebot'un ana sayfayı taramasını yasaklıyor (genelde `Disallow: /` satırı). Google sitenizi taramaz; sayfalar arama sonuçlarından zamanla düşer ya da açıklamasız görünür. Çoğu zaman geliştirme sırasında konup unutulmuş bir kuraldır.":
    "Your robots.txt forbids Googlebot from crawling the home page (usually a `Disallow: /` line). Google won't crawl your site; pages drop out of search over time or appear without a description. It's often a rule added during development and forgotten.",
  "robots.txt'teki `Disallow: /` satırını kaldırın ya da yalnızca gizli kalması gereken klasörlerle sınırlayın. Sonra Search Console'daki robots.txt raporundan Google'ın yeni dosyayı okuduğunu kontrol edin.":
    "Remove the `Disallow: /` line from robots.txt or limit it to the folders that must stay hidden. Then check in Search Console's robots.txt report that Google has read the new file.",
  "robots.txt site haritasını göstermiyor":
    "robots.txt doesn't point to the sitemap",
  "robots.txt dosyanızda `Sitemap:` satırı yok. Arama motorları site haritasını bu satırdan da bulur; Search Console'a gönderdiyseniz Google için sorun değildir, ama Bing ve diğer tarayıcılar için en kolay yoldur.":
    "Your robots.txt has no `Sitemap:` line. Search engines also find the sitemap through this line; if you submitted it in Search Console it's not a problem for Google, but it's the easiest route for Bing and other crawlers.",
  "robots.txt'in sonuna site haritanızın tam adresiyle bir satır ekleyin, örneğin `Sitemap: https://alanadiniz.com/sitemap.xml`.":
    "Add a line with your sitemap's full address at the end of robots.txt, for example `Sitemap: https://yourdomain.com/sitemap.xml`.",
  "Bazı yapay zekâ tarayıcıları robots.txt ile engellenmiş":
    "Some AI crawlers are blocked by robots.txt",
  "robots.txt dosyanız bazı yapay zekâ tarayıcılarının (örneğin GPTBot, ClaudeBot, PerplexityBot) sitenizi taramasını yasaklıyor. Bu bir tercih: içeriğinizin yapay zekâ eğitiminde kullanılmasını istemiyorsanız doğrudur. Ama bu asistanların arama ve yanıt özelliklerinde sitenizin görünmesini de azaltabilir. Google araması etkilenmez.":
    "Your robots.txt forbids some AI crawlers (GPTBot, ClaudeBot, PerplexityBot, for example) from crawling your site. This is a choice: it's right if you don't want your content used for AI training. But it can also reduce how often your site appears in these assistants' search and answer features. Google Search isn't affected.",
  "Bilerek engellediyseniz bir şey yapmanıza gerek yok. Yapay zekâ yanıtlarında görünmek istiyorsanız arama amaçlı tarayıcılara (OAI-SearchBot, Claude-SearchBot, PerplexityBot gibi) izin verip yalnızca eğitim tarayıcılarını (GPTBot, ClaudeBot, Google-Extended gibi) engelleyebilirsiniz.":
    "If you blocked them on purpose, there's nothing to do. If you want to appear in AI answers, you can allow the search crawlers (such as OAI-SearchBot, Claude-SearchBot, PerplexityBot) and block only the training crawlers (such as GPTBot, ClaudeBot, Google-Extended).",
  "llms.txt dosyası yok (isteğe bağlı)": "No llms.txt file (optional)",
  "Sitenizin kökünde llms.txt dosyası yok. Bu dosya yapay zekâ asistanlarına sitenin önemli sayfalarını kısa bir listeyle anlatmak için önerilen yeni bir biçimdir. Henüz bir standart değildir ve Google bunu kullanmaz; yoksa bir sorun yoktur.":
    "There's no llms.txt file at your site's root. This file is a newly proposed format for describing a site's important pages to AI assistants in a short list. It isn't a standard yet and Google doesn't use it; not having one is not a problem.",
  "İsterseniz sitenizin kökünde /llms.txt adresine, sitenin ne olduğunu bir paragrafta anlatan ve önemli sayfalarınızı bağlantılarıyla listeleyen düz metin (Markdown) bir dosya koyun.":
    "If you like, put a plain-text (Markdown) file at /llms.txt on your site's root that describes the site in one paragraph and lists your important pages with links.",
  "Başlangıç sayfasının HTML'i 2 MB'tan büyük":
    "Start page HTML is larger than 2 MB",
  "Başlangıç sayfasının HTML'i 2 MB'ı aşıyor. Google bir HTML dosyasının yalnızca ilk 2 MB'ını işler; sonrasındaki içerik ve bağlantılar Google için yok sayılır. Büyük HTML ayrıca yavaş mobil bağlantılarda sayfayı geciktirir.":
    "The start page's HTML exceeds 2 MB. Google only processes the first 2 MB of an HTML file; content and links after that are ignored by Google. Large HTML also slows the page down on slow mobile connections.",
  "HTML'in içine gömülü büyük verileri (satır içi görseller, büyük JSON, tekrar eden menüler) ayrı dosyalara taşıyın. Uzun listeleri sayfalara bölün.":
    "Move large data embedded in the HTML (inline images, large JSON, repeated menus) into separate files. Split long lists into pages.",
  "Başlangıç sayfası sıkıştırılmadan geldi": "Start page arrived uncompressed",
  "Denetim başlangıç sayfasını gzip ve brotli kabul ettiğini söyleyerek istedi, ama yanıtta Content-Encoding başlığı yoktu: sayfa sıkıştırılmadan geldi. Sıkıştırma HTML'i genelde 4-5 kat küçültür ve sayfayı hızlandırır. Bazı ara sunucular ve CDN'ler sıkıştırmayı yalnızca tarayıcılara uyguladığı için tarayıcıda da doğrulayın.":
    "The audit asked for the start page saying it accepts gzip and brotli, but the response had no Content-Encoding header: the page arrived uncompressed. Compression usually shrinks HTML 4-5 times and speeds up the page. Some proxies and CDNs only compress for browsers, so confirm it in a browser too.",
  "Sunucunuzda ya da CDN'de gzip veya brotli sıkıştırmayı açın. Sonucu tarayıcının geliştirici araçlarında, yanıt başlıklarında `content-encoding` satırına bakarak doğrulayın.":
    "Turn on gzip or brotli compression on your server or CDN. Verify the result in the browser's developer tools by looking for the `content-encoding` line in the response headers.",
  "Sunucu ilk yanıtı geç veriyor (TTFB)":
    "Server is slow to send its first response (TTFB)",
  "Başlangıç sayfasının ilk baytı 800 milisaniyeden geç geldi; web.dev bu sınırın altını önerir. Sunucu yanıtı geç başlarsa sayfadaki her şey o kadar geç başlar. Süre, denetimi çalıştıran bilgisayardan iki ayrı istekle ölçülür ve hızlı olanı esas alınır; yine de ağa göre değişebilir.":
    "The start page's first byte arrived after more than 800 milliseconds; web.dev recommends staying below that. If the server response starts late, everything on the page starts that much later. The time is measured with two separate requests from the computer running the audit and the faster one counts; it can still vary with the network.",
  "Sayfa önbelleğini açın, yavaş veritabanı sorgularını ve eklentileri bulun, ziyaretçilerinize yakın bir CDN kullanın. Sorun sürerse barındırma paketinizi gözden geçirin.":
    "Turn on page caching, find slow database queries and plugins, and use a CDN close to your visitors. If the problem persists, review your hosting plan.",
  "http adresi https'e yönlendirilmiyor":
    "http address doesn't redirect to https",
  'Sitenizin http:// ile başlayan adresi şifreli https sürümüne yönlendirmiyor, sayfayı düz http ile açıyor. Ziyaretçi adresi elle yazdığında ya da eski bir bağlantıdan geldiğinde güvenli olmayan sürümde kalır ve tarayıcı "Güvenli değil" uyarısı gösterir. Google da aynı içeriğin iki sürümünü görür.':
    "Your site's http:// address doesn't redirect to the encrypted https version; it opens the page over plain http. When visitors type the address by hand or come from an old link, they stay on the insecure version and the browser shows a \"Not secure\" warning. Google also sees two versions of the same content.",
  'Sunucunuzda ya da barındırma panelinizde "HTTPS\'e zorla" ayarını açın; yoksa tüm http isteklerini aynı adresin https karşılığına kalıcı (301) yönlendiren bir kural ekleyin.':
    'Turn on the "Force HTTPS" setting on your server or hosting panel; otherwise add a rule that permanently (301) redirects every http request to the https equivalent of the same address.',
  "HSTS başlığı yok": "No HSTS header",
  'Sayfa https ile açılıyor ama Strict-Transport-Security (HSTS) başlığı göndermiyor. Bu başlık tarayıcıya "bu siteye bundan sonra hep https ile gel" der. Olmadığında ilk istek http ile gidebilir ve araya giren biri ziyaretçiyi güvensiz sürüme düşürebilir.':
    'The page opens over https but doesn\'t send a Strict-Transport-Security (HSTS) header. This header tells the browser "always come to this site over https from now on". Without it, the first request can go over http and someone in between can downgrade the visitor to the insecure version.',
  "Sunucu yanıtına `Strict-Transport-Security: max-age=31536000; includeSubDomains` başlığını ekleyin. Önce tüm alt alan adlarınızın https ile çalıştığından emin olun; tarayıcı bu süre boyunca http'yi denemez.":
    "Add the `Strict-Transport-Security: max-age=31536000; includeSubDomains` header to the server response. First make sure all your subdomains work over https; browsers won't try http for that period.",
  "X-Content-Type-Options başlığı yok": "No X-Content-Type-Options header",
  "Sunucu `X-Content-Type-Options: nosniff` başlığını göndermiyor. Bu başlık tarayıcının dosya türünü tahmin etmesini engeller; yoksa yüklenen bir dosya betik gibi çalıştırılabilir. Sıralamayı etkilemez, sitenin güvenlik düzenini gösterir.":
    "The server doesn't send the `X-Content-Type-Options: nosniff` header. This header stops the browser from guessing a file's type; without it an uploaded file could be run as a script. It doesn't affect rankings; it shows the site's security setup.",
  "Sunucu yanıtlarına `X-Content-Type-Options: nosniff` başlığını ekleyin. Çoğu barındırma panelinde ya da CDN'de güvenlik başlıkları ayarından tek tıkla açılır.":
    "Add the `X-Content-Type-Options: nosniff` header to server responses. In most hosting panels or CDNs it's a one-click option in the security headers settings.",
  "Sayfa başka sitelerin çerçevesine gömülebiliyor":
    "Page can be embedded in other sites' frames",
  "Ne X-Frame-Options başlığı ne de Content-Security-Policy içinde frame-ancestors kuralı var. Başka bir site sayfanızı görünmez bir çerçeveye koyup ziyaretçiyi istemediği bir yere tıklatabilir (clickjacking). Sıralamayı etkilemez.":
    "There's neither an X-Frame-Options header nor a frame-ancestors rule in a Content-Security-Policy. Another site could put your page in an invisible frame and trick visitors into clicking somewhere they didn't intend (clickjacking). It doesn't affect rankings.",
  "Sayfanın başka sitelerde gösterilmesi gerekmiyorsa `Content-Security-Policy: frame-ancestors 'self'` ya da `X-Frame-Options: SAMEORIGIN` başlığını ekleyin.":
    "If the page doesn't need to be shown on other sites, add the `Content-Security-Policy: frame-ancestors 'self'` or `X-Frame-Options: SAMEORIGIN` header.",
  "Referrer-Policy başlığı yok": "No Referrer-Policy header",
  "Sunucu Referrer-Policy başlığı göndermiyor. Güncel tarayıcılar bu durumda güvenli bir varsayılan kullanır, yani acil bir sorun değil; ama başlık, ziyaretçi başka siteye geçtiğinde adresinizin ne kadarının paylaşılacağını sizin belirlemenizi sağlar.":
    "The server doesn't send a Referrer-Policy header. Current browsers use a safe default in that case, so it's not urgent; but the header lets you decide how much of your address is shared when a visitor moves to another site.",
  "Sunucu yanıtlarına `Referrer-Policy: strict-origin-when-cross-origin` başlığını ekleyin.":
    "Add the `Referrer-Policy: strict-origin-when-cross-origin` header to server responses.",
  "SSL sertifikasının süresi 30 günden az":
    "SSL certificate expires in less than 30 days",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 30 günden az kaldı. Süre dolarsa tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar ve ziyaretçilerin çoğu geri döner. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "According to public certificate logs (Certificate Transparency), the newest certificate on record for this domain expires in less than 30 days. If it expires, browsers open the site with a full-page security warning and most visitors turn back. The server may already use a newer certificate that has not reached the logs yet; confirm the expiry date from the padlock in the browser's address bar.",
  "Sertifikanın otomatik yenilendiğini barındırma panelinizden kontrol edin. Let's Encrypt gibi otomatik sertifikalar genelde bitmeden 30 gün önce yenilenir; yenilenmediyse yenilemeyi elle başlatın.":
    "Check in your hosting panel that the certificate renews automatically. Automatic certificates such as Let's Encrypt usually renew 30 days before they expire; if it hasn't renewed, start the renewal manually.",
  "SSL sertifikasının süresi dolmak üzere":
    "SSL certificate is about to expire",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 14 günden az kaldı. Süre dolunca tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar; ziyaretçilerin çoğu siteye hiç giremez. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "According to public certificate logs (Certificate Transparency), the newest certificate on record for this domain expires in less than 14 days. Once it expires, browsers open the site with a full-page security warning; most visitors can't get in at all. The server may already use a newer certificate that has not reached the logs yet; confirm the expiry date from the padlock in the browser's address bar.",
  "Sertifikayı hemen yenileyin ve sunucuya yükleyin. Otomatik yenileme varsa neden çalışmadığına bakın (DNS kaydı değişmiş, doğrulama dosyasına erişilemiyor gibi).":
    "Renew the certificate right away and install it on the server. If automatic renewal is set up, find out why it didn't work (a changed DNS record or an unreachable validation file, for example).",
  "Alan adının süresi 30 günden az": "Domain expires in less than 30 days",
  "Alan adı kayıt bilgisine (RDAP) göre alan adınızın süresinin bitmesine 30 günden az kaldı. Yenilenmezse site ve e-postalar tamamen durur, alan adı başkasının eline geçebilir.":
    "According to the domain's registration data (RDAP), your domain expires in less than 30 days. If it isn't renewed, the site and email stop completely and the domain can end up in someone else's hands.",
  "Alan adını aldığınız firmadan süreyi uzatın ve otomatik yenilemeyi açın. Kayıttaki e-posta adresinin güncel olduğundan emin olun; hatırlatmalar oraya gider.":
    "Extend the registration with the company you bought the domain from and turn on auto-renewal. Make sure the email address on the registration is current; reminders go there.",
  "Alan adında SPF kaydı yok": "No SPF record on the domain",
  "Alan adınızın DNS'inde SPF kaydı (v=spf1 ile başlayan TXT kaydı) yok. SPF, alan adınız adına hangi sunucuların e-posta gönderebileceğini söyler. Yoksa başkaları sizin adınıza sahte e-posta gönderebilir ve sizin gerçek e-postalarınız spam klasörüne düşebilir. SEO'yu doğrudan etkilemez.":
    "Your domain's DNS has no SPF record (a TXT record starting with v=spf1). SPF says which servers may send email on behalf of your domain. Without it, others can send fake email in your name and your real email can land in spam. It doesn't affect SEO directly.",
  "E-postanızı gönderen hizmetin (Google Workspace, Microsoft 365, barındırma firması) önerdiği SPF kaydını DNS'e TXT olarak ekleyin. Alan adından hiç e-posta gönderilmiyorsa `v=spf1 -all` yeterlidir.":
    "Add the SPF record recommended by the service that sends your email (Google Workspace, Microsoft 365, your hosting company) to DNS as a TXT record. If no email is sent from the domain at all, `v=spf1 -all` is enough.",
  "Alan adında DMARC kaydı yok": "No DMARC record on the domain",
  "Alan adınızda DMARC kaydı (_dmarc alt adında v=DMARC1 ile başlayan TXT kaydı) yok. DMARC, SPF ve DKIM kontrolünden geçemeyen e-postalara ne yapılacağını söyler. Gmail ve Yahoo toplu gönderim yapan alan adlarından bu kaydı istiyor. SEO'yu doğrudan etkilemez.":
    "Your domain has no DMARC record (a TXT record starting with v=DMARC1 on the _dmarc subdomain). DMARC says what to do with email that fails SPF and DKIM checks. Gmail and Yahoo require it from domains that send bulk email. It doesn't affect SEO directly.",
  "DNS'e `_dmarc` adıyla `v=DMARC1; p=none; rua=mailto:dmarc@alanadiniz.com` gibi bir TXT kaydı ekleyin. Raporları birkaç hafta izledikten sonra politikayı `quarantine` ya da `reject` yapın.":
    "Add a TXT record named `_dmarc` to DNS, such as `v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com`. After watching the reports for a few weeks, change the policy to `quarantine` or `reject`.",
  // audit-issues: per-page signal checks (site audit overhaul, W2)
  "Open Graph etiketleri eksik": "Open Graph tags incomplete",
  "Sayfada Open Graph etiketleri var ama başlık, açıklama ve görselden biri ya da birkaçı eksik. Bu etiketler sayfa Facebook, LinkedIn, WhatsApp gibi yerlerde paylaşıldığında görünen kartı belirler. Eksik olanı paylaşılan platform kendisi tahmin eder; çoğu zaman yanlış görsel ya da kesik bir metin çıkar. Google sıralamasını etkilemez.":
    "The page has Open Graph tags, but the title, description or image is missing. These tags decide the card shown when the page is shared on Facebook, LinkedIn, WhatsApp and similar places. The platform guesses whatever is missing, which often means the wrong image or a cut-off text. They don't affect Google rankings.",
  "Eksik etiketi ekleyin: og:title, og:description ve og:image üçü birlikte olmalı. Görsel en az 1200x630 piksel olsun. SEO eklentiniz varsa sosyal paylaşım bölümünü doldurmanız yeter.":
    "Add the missing tag: og:title, og:description and og:image belong together. Make the image at least 1200x630 pixels. If you use an SEO plugin, filling in its social sharing section is enough.",
  "X (Twitter) kart etiketi yok": "No X (Twitter) card tag",
  "Sayfada Open Graph etiketleri var ama twitter:card etiketi yok. X başlık, açıklama ve görseli Open Graph'tan alabilir, ama kart türünü söyleyen bu etiket olmadan bağlantı kartsız, düz bir adres olarak görünebilir. Google sıralamasını etkilemez.":
    "The page has Open Graph tags but no twitter:card tag. X can take the title, description and image from Open Graph, but without this tag, which names the card type, the link may show as a plain address with no card. It doesn't affect Google rankings.",
  'Sayfanın head bölümüne <meta name="twitter:card" content="summary_large_image"> ekleyin. Diğer twitter: etiketlerine gerek yok; X eksikleri Open Graph etiketlerinden tamamlar.':
    'Add <meta name="twitter:card" content="summary_large_image"> to the page\'s head. The other twitter: tags aren\'t needed; X fills them in from the Open Graph tags.',
  "Başlık etiketi ile H1 aynı": "Title tag and H1 are identical",
  "Sayfanın başlık etiketi (<title>) ile H1 başlığı birebir aynı. Bu bir hata değil ve Google bunu cezalandırmaz. Ama iki farklı yer, iki farklı fırsat demek: başlık arama sonucunda tıklatmak için, H1 sayfaya gelen ziyaretçiye konuyu söylemek için yazılır. Aynı metin ikisinden birini boşa harcar.":
    "The page's title tag (<title>) and its H1 are exactly the same. This isn't an error and Google doesn't penalise it. But two places mean two chances: the title is written to earn the click in search results, the H1 to tell the visitor on the page what it's about. The same text wastes one of them.",
  "Başlığı arama sonucu için yazın (ana kelime başta, marka sonda), H1'i sayfadaki okur için yazın. Konu aynı kalsın, ifade farklı olsun.":
    "Write the title for the search result (main keyword first, brand last) and the H1 for the reader on the page. Keep the topic, vary the wording.",
  "Başlık arama sonucunda kesilebilir":
    "Title may be cut off in search results",
  "Başlık 60 karakterin altında ama geniş harfler yüzünden yaklaşık 580 pikseli aşıyor. Google başlığı karakter sayısına göre değil, genişliğe göre keser; geniş büyük harfler (W, M) ve sayılar başlığı daha erken taşırır. Ölçüm, Google'ın masaüstünde kullandığı 20 piksellik Arial yazı tipine göre yapılan bir tahmindir.":
    "The title is under 60 characters but wide letters push it past about 580 pixels. Google cuts titles by width, not by character count; wide capitals (W, M) and digits fill the line sooner. The measurement is an estimate based on the 20-pixel Arial font Google uses on desktop.",
  "Başlığı kısaltın ya da büyük harfle yazılmış sözcükleri normal yazıma çevirin. En önemli kelimeleri başa alın; kesilme olursa sondaki marka adı gitsin.":
    "Shorten the title or change words written in capitals to normal case. Put the most important words first, so that if anything is cut, it's the brand name at the end.",
  "Gereksiz meta keywords etiketi": "Unnecessary meta keywords tag",
  "Sayfada meta keywords etiketi var. Google bu etiketi yıllardır hiç kullanmıyor; sıralamaya ne katkısı ne zararı var. Tek etkisi, hedeflediğiniz kelimeleri rakiplerin kaynak koduna bakarak görebilmesi.":
    "The page has a meta keywords tag. Google hasn't used this tag for years; it neither helps nor hurts rankings. Its only effect is that competitors can see the keywords you target by looking at the source code.",
  "Etiketi şablondan ya da SEO eklentisinin ayarlarından kaldırın. Acil değil; zamanınız olduğunda temizleyin.":
    "Remove the tag from the template or in your SEO plugin's settings. It isn't urgent; clean it up when you have time.",
  "Sayfa yakınlaştırmayı engelliyor": "Page blocks zooming",
  "Sayfanın viewport etiketi kullanıcının yakınlaştırmasını kapatıyor (user-scalable=no ya da 2'den küçük maximum-scale). Az gören ziyaretçiler telefonda metni büyütemez. Erişilebilirlik standardı (WCAG) metnin %200'e kadar büyütülebilmesini ister; Lighthouse da bunu hata sayar.":
    "The page's viewport tag turns off zooming (user-scalable=no or a maximum-scale under 2). Visitors with low vision can't enlarge the text on their phone. The accessibility standard (WCAG) requires text to be resizable up to 200%, and Lighthouse counts this as a failure.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerlerini kaldırın: <meta name="viewport" content="width=device-width, initial-scale=1"> yeterlidir.':
    'Remove user-scalable=no and maximum-scale from the viewport tag: <meta name="viewport" content="width=device-width, initial-scale=1"> is enough.',
  "En iyi uygulama: yeni sekmede açılan dış bağlantılarda noopener yok":
    "Best practice: external links open in a new tab without noopener",
  'Sayfada target="_blank" ile yeni sekmede açılan ama rel="noopener" ya da rel="noreferrer" taşımayan dış bağlantılar var. Güncel tarayıcılar (Chrome 88, Firefox 79 ve Safari 12.1\'den beri) target="_blank" bağlantılara noopener\'ı kendiliğinden uygular; yani bu bir güvenlik açığı değil, eski tarayıcılar için bir en iyi uygulama notudur. Sıralamayı etkilemez.':
    'The page has external links that open in a new tab with target="_blank" but carry neither rel="noopener" nor rel="noreferrer". Current browsers (since Chrome 88, Firefox 79 and Safari 12.1) apply noopener to target="_blank" links on their own, so this is not a security hole, only a best-practice note for older browsers. It doesn\'t affect rankings.',
  'Bu bağlantılara rel="noopener" ekleyin. Çoğu zaman tek bir şablon ya da editör ayarıdır.':
    'Add rel="noopener" to these links. It\'s usually a single template or editor setting.',
  'Adresi "javascript:" olan bağlantılar':
    'Links whose address is "javascript:"',
  'Sayfada href değeri "javascript:" ile başlayan bağlantılar var. Google yalnızca gerçek bir adrese giden <a href> bağlantılarını izler; bunları izleyemez, yani gittikleri sayfaları bu yoldan bulamaz. Klavye ve ekran okuyucu kullananlar için de bunlar çoğu zaman çalışmaz.':
    "The page has links whose href starts with \"javascript:\". Google follows only <a href> links that lead to a real address; it can't follow these, so it can't find the pages they lead to this way. They often don't work for keyboard and screen reader users either.",
  "Bir sayfaya gidiyorsa href'e o sayfanın adresini yazın. Bir işlem yapıyorsa (menü açmak gibi) <a> yerine <button> kullanın.":
    "If the link goes to a page, put that page's address in href. If it performs an action (such as opening a menu), use a <button> instead of an <a>.",
  "Aşağıdaki görseller hemen yükleniyor":
    "Images further down load immediately",
  'Sayfada ilk ekranın altında kalan altıdan fazla görsel loading="lazy" olmadan, sayfa açılır açılmaz yükleniyor. Ziyaretçi o kısma inmeden bant genişliği harcanır ve sayfa yavaşlar. Tahmin, ilk üç içerik görselinin ilk ekranda olduğunu varsayar ve yalnızca ana içerikteki (<main>, <article>) ya da büyük boyutlu görselleri sayar; logolar ve simgeler sayılmaz. Gerçek ekran düzeni farklı olabilir.':
    'More than six images below the first screen load as soon as the page opens, without loading="lazy". Bandwidth is spent before the visitor scrolls there, and the page slows down. The estimate assumes the first three content images are in the first screen and counts only images in the main content (<main>, <article>) or sized large; logos and icons are not counted. The real layout may differ.',
  'İlk ekranın altındaki görsellere loading="lazy" ekleyin. İlk ekrandaki ana görsele eklemeyin; o görsel hemen yüklenmeli.':
    'Add loading="lazy" to the images below the first screen. Don\'t add it to the main image in the first screen; that one should load right away.',
  "Görseller eski biçimde": "Images in older formats",
  "Sayfadaki üç ya da daha fazla görsel JPEG, PNG ya da GIF biçiminde ve WebP ya da AVIF alternatifi yok (logolar, simgeler ve SVG'ler sayılmaz). Yeni biçimler aynı kalitede genelde %25-50 daha küçüktür; sayfa daha hızlı açılır. Tüm güncel tarayıcılar bu biçimleri destekler.":
    "Three or more images on the page are JPEG, PNG or GIF with no WebP or AVIF alternative (logos, icons and SVGs are not counted). The newer formats are usually 25-50% smaller at the same quality, so the page opens faster. All current browsers support them.",
  "Görselleri WebP ya da AVIF'e çevirin, ya da <picture> içinde bu biçimlerde bir <source> ekleyin. Çoğu CMS ve görsel eklentisi bunu otomatik yapabilir.":
    "Convert the images to WebP or AVIF, or add a <source> in those formats inside a <picture>. Most CMSs and image plugins can do this automatically.",
  "Etiketi olmayan form alanları": "Form fields without labels",
  'Sayfadaki bazı form alanlarının (metin kutusu, seçim listesi) etiketi yok: ne <label>, ne aria-label, ne title, ne de yer tutucu metin. Ekran okuyucu kullanan ziyaretçi alana gelince yalnızca "düzenleme alanı" duyar, ne yazacağını bilemez. Lighthouse\'un erişilebilirlik denetimi de bunu hata sayar.':
    "Some form fields on the page (text boxes, select lists) have no label: no <label>, no aria-label, no title and no placeholder. A visitor using a screen reader hears only \"edit text\" when they reach the field and can't tell what to type. Lighthouse's accessibility audit counts this as a failure too.",
  'Her alana görünür bir <label for="alan-id"> ekleyin. Tasarım görünür etikete izin vermiyorsa aria-label="E-posta adresi" gibi bir etiket verin.':
    'Give each field a visible <label for="field-id">. If the design doesn\'t allow a visible label, add one such as aria-label="Email address".',
  "Aynı id birden çok öğede": "Same id on several elements",
  "Sayfada aynı id değerini taşıyan birden fazla öğe var. id sayfada tek olmalı; tekrar ettiğinde form etiketleri, sayfa içi bağlantılar ve erişilebilirlik bağlantıları yanlış öğeye gider. Sıralamayı etkilemez, ama genelde bir bileşenin aynı sayfada iki kez kullanılmasından kaynaklanan bir şablon hatasıdır.":
    "Several elements on the page share the same id value. An id must be unique on a page; when it repeats, form labels, in-page links and accessibility references point at the wrong element. It doesn't affect rankings, but it's usually a template bug where a component is used twice on one page.",
  "Tekrar eden id'leri bulun (tarayıcının geliştirici araçlarında document.querySelectorAll('[id]') ile) ve her birini benzersiz yapın; yalnızca stil için kullanılıyorsa class'a çevirin.":
    "Find the repeated ids (with document.querySelectorAll('[id]') in the browser's developer tools) and make each one unique; if one is only used for styling, turn it into a class.",
  "Sayfanın HTML yapısı çok büyük": "Page's HTML structure is too large",
  "Sayfada 1.500'den fazla HTML öğesi var. Lighthouse bu sınırdan sonra uyarı verir: büyük bir sayfa yapısı daha çok bellek harcar, stil hesaplamayı ve etkileşimi yavaşlatır, özellikle telefonda. Genelde her sayfada tekrarlanan dev menülerden, gizli ama yüklenen içerikten ya da iç içe geçmiş sayfa oluşturucu katmanlarından olur.":
    "The page has more than 1,500 HTML elements. Lighthouse warns from this point: a large page structure uses more memory and slows down style calculation and interaction, especially on phones. It usually comes from huge menus repeated on every page, hidden content that still loads, or nested page builder layers.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler) gerektiğinde yükleyin, uzun listeleri sayfalara bölün, sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Load content that isn't visible (closed menus, tabs) when it's needed, split long lists into pages, and cut down the page builder's unnecessary wrapper layers.",
  "HTML öğeleri çok iç içe": "HTML elements nested too deeply",
  "Sayfada 32 kattan derin iç içe geçmiş HTML öğeleri var. Çok derin yapı stil hesaplamayı yavaşlatır ve genelde sayfa oluşturucuların her bölümü birkaç gereksiz kutuya sarmasından kaynaklanır.":
    "The page has HTML elements nested more than 32 levels deep. A very deep structure slows down style calculation and usually comes from page builders wrapping each section in several unnecessary boxes.",
  "Şablonda gereksiz sarmalayıcı <div> katmanlarını kaldırın; sayfa oluşturucu kullanıyorsanız iç içe bölüm ve sütunları azaltın.":
    "Remove unnecessary wrapper <div> layers from the template; if you use a page builder, reduce nested sections and columns.",
  "Görünür metin, koda göre çok az":
    "Very little visible text compared with code",
  "Sayfanın görünür metni, HTML'nin onda birinden az. Bu tek başına bir sıralama sorunu değil; Google böyle bir oran ölçmez. Ama çoğu zaman sayfanın satır içi betik ve stil kodlarıyla şiştiğini ya da içeriğin ilk gelen HTML'de olmadığını gösterir.":
    "The page's visible text is less than a tenth of its HTML. On its own this isn't a ranking problem; Google doesn't measure such a ratio. But it often shows that the page is bloated with inline scripts and styles, or that the content isn't in the HTML that arrives first.",
  "Satır içi büyük betik ve stilleri ayrı dosyalara taşıyın, kullanılmayan kodu kaldırın. İçerik JavaScript ile yükleniyorsa sayfa kaynağında da göründüğünden emin olun.":
    "Move large inline scripts and styles into separate files and remove unused code. If the content is loaded with JavaScript, make sure it also appears in the page source.",
  "Neredeyse aynı içerik": "Near-duplicate content",
  "Bu sayfaların ana içeriği neredeyse aynı; yalnızca birkaç kelime (şehir adı, renk, fiyat gibi) farklı. Menü, üst ve alt bilgi gibi her sayfada tekrar eden kısımlar karşılaştırmaya katılmaz. Google bu sayfalardan birini seçip diğerlerini arama sonucunda göstermeyebilir ve hangisini seçeceğine o karar verir. Genelde aynı şablonla çoğaltılmış konum, ürün çeşidi ya da etiket sayfalarında olur.":
    "The main content of these pages is almost the same; only a few words (a city name, a colour, a price) differ. Parts repeated on every page, such as the menu, header and footer, are left out of the comparison. Google may pick one of them and leave the others out of search results, and it decides which. It usually happens with location, product variant or tag pages copied from the same template.",
  "Her sayfaya kendine özgü, işe yarar içerik ekleyin. Gerçekten aynı şeyi anlatıyorlarsa tek sayfada birleştirin ya da diğerlerine asıl sayfayı gösteren bir canonical ekleyin.":
    "Give each page its own useful content. If they really say the same thing, merge them into one page or add a canonical on the others pointing to the main page.",
  "Yapılandırılmış veride zorunlu özellikler eksik":
    "Required properties missing in structured data",
  "Sayfadaki yapılandırılmış veri (JSON-LD) bir türü bildiriyor ama Google'ın o tür için zorunlu saydığı özelliklerden bazıları yok. Bu, Product, FAQPage, BreadcrumbList ve LocalBusiness türleri içindir; eksik olunca arama sonucunda zengin görünüm (yıldız, fiyat, içerik haritası) çıkmaz.":
    "The page's structured data (JSON-LD) declares a type but lacks some of the properties Google calls required for it. This applies to Product, FAQPage, BreadcrumbList and LocalBusiness; without them no rich result (stars, price, breadcrumb) appears in search.",
  "Ayrıntıdaki eksik özellikleri işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. İşaretleme sayfada gerçekten görünen bilgiyi anlatmalı; sayfada olmayan bir fiyatı ya da yorumu işaretlemek Google kurallarına aykırıdır.":
    "Add the missing properties listed in the details to the markup and check the result with Google's Rich Results Test. The markup must describe information actually visible on the page; marking up a price or review that isn't on the page is against Google's guidelines.",
  "Yapılandırılmış veride önerilen özellikler eksik":
    "Recommended properties missing in structured data",
  "Sayfadaki Article ya da Organization işaretlemesinde Google'ın önerdiği özelliklerden (başlık, görsel, tarih, yazar; ya da ad, web adresi, logo) bazıları yok. Google bu türler için zorunlu özellik saymaz, bu yüzden işaretleme geçerlidir ve zengin görünümü engellemez; önerilen özellikler yalnızca Google'ın sayfayı daha eksiksiz göstermesine yardım eder.":
    "The page's Article or Organization markup lacks some of the properties Google recommends (headline, image, date, author; or name, URL, logo). Google lists no required properties for these types, so the markup is valid and does not block a rich result; the recommended properties only help Google show the page more completely.",
  "Ayrıntıdaki özellikleri, sayfada gerçekten görünen bilgiyle işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. Acil değildir; zorunlu özellik eksiklerinden sonra gelir.":
    "Add the properties listed in the details to the markup, using information actually visible on the page, and check the result with Google's Rich Results Test. It is not urgent; it comes after missing required properties.",
  "Sayfalarda Google Analytics etiketi bulunamadı":
    "No Google Analytics tag found on the pages",
  "Taranan sayfaların HTML'sinde Google Analytics 4 (G-), Google Etiket Yöneticisi (GTM-) ya da Universal Analytics (UA-) kimliği bulunamadı. Ölçüm yoksa hangi sayfanın ziyaretçi ve dönüşüm getirdiğini göremezsiniz. Etiket bir çerez onay aracı ya da başka bir betik tarafından sonradan yükleniyorsa burada görünmez; o durumda bu bulguyu yok sayabilirsiniz.":
    "No Google Analytics 4 (G-), Google Tag Manager (GTM-) or Universal Analytics (UA-) id was found in the HTML of the crawled pages. Without measurement you can't see which pages bring visitors and conversions. If the tag is loaded later by a cookie consent tool or another script, it won't show up here; in that case you can ignore this finding.",
  "Google Analytics 4'te bir web veri akışı oluşturun ve verdiği etiketi tüm sayfaların head bölümüne ekleyin; ya da Etiket Yöneticisi kullanıyorsanız kapsayıcı kodunu ekleyin. Sonra Analytics'teki gerçek zamanlı raporda ziyaretinizin göründüğünü kontrol edin.":
    "Create a web data stream in Google Analytics 4 and add the tag it gives you to the head of every page, or add the container code if you use Tag Manager. Then check that your own visit appears in Analytics' realtime report.",
  "Sayfalardaki Analytics kimliği bağlı mülkle eşleşmiyor":
    "Analytics id on the pages doesn't match the connected property",
  "Sayfalarda bulunan Google Analytics 4 ölçüm kimliği (G-), bu projeye bağlı Analytics mülkünün web veri akışlarındaki kimliklerden hiçbiriyle eşleşmiyor. Yani ziyaretçi verisi büyük olasılıkla başka bir mülke gidiyor ve buradaki Analytics raporları siteyi göstermiyor. Eski bir mülkün kodu ya da kopyalanmış bir şablon genelde nedendir.":
    "The Google Analytics 4 measurement id (G-) found on the pages matches none of the ids in the web data streams of the Analytics property connected to this project. So visitor data is most likely going to another property, and the Analytics reports here don't show this site. An old property's code or a copied template is the usual cause.",
  "Ayrıntıdaki iki kimlik listesini karşılaştırın. Doğru mülk bağlıysa sayfalardaki etiketi o mülkün ölçüm kimliğiyle değiştirin; sayfalardaki doğruysa Ayarlar'dan projeye o mülkü bağlayın.":
    "Compare the two id lists in the details. If the right property is connected, replace the tag on the pages with that property's measurement id; if the one on the pages is right, connect that property to the project in Settings.",

  // ── Site audit overview: score breakdown, checks, to-do, instant data, report ──
  "{count} kontrol aşamasından geçti": "Passed {count} checks",
  Ölçülmedi: "Not measured",
  "Geçen {count} kontrol": "{count} passed checks",
  Geçti: "Passed",
  "{count} sayfada": "On {count} pages",
  "Başlangıç sayfası okunamadığı için önizleme yok.":
    "No preview, because the start page couldn't be read.",
  "Hız ölçülmedi": "Speed not measured",
  "Hız ölçülemedi": "Speed could not be measured",
  "Başlangıç sayfası ölçülemedi; gösterilen, ölçülen en üst sayfa: {url}":
    "The start page could not be measured; showing the shallowest measured page: {url}",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok. Denetimi hız ölçümü açık başlatırsanız gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "This audit has no PageSpeed measurement for the start page. Run the audit with speed tests on and real-user data (CrUX) and lab results appear here.",
  "Temel Web Verileri": "Core Web Vitals",
  "Gerçek kullanıcı verisi Chrome Kullanıcı Deneyimi Raporu'ndan (CrUX, son 28 gün, mobil); laboratuvar sütunu PageSpeed Insights'ın tek ölçümü.":
    "Real-user data comes from the Chrome User Experience Report (CrUX, last 28 days, mobile); the lab column is a single PageSpeed Insights run.",
  Metrik: "Metric",
  "Bu sayfa, gerçek": "This page, real users",
  "Tüm site, gerçek": "Whole site, real users",
  "Anlık veri": "Instant data",
  "Site puanı {score}/100, {word}": "Site score {score}/100, {word}",
  "Uyarı ve bilgi": "Warnings and notices",
  "Kategori puanları": "Category scores",
  "Tüm kontroller": "All checks",
  "{passed}/{total} geçti": "{passed}/{total} passed",
  "Puan geçmişi": "Score history",
  "Son {count} denetimin puanı": "Score of the last {count} audits",
  "Öncekiyle aynı": "Same as last time",
  "{value} puan, öncekine göre": "{value} points since the last audit",
  "Tarayıcı erişimi (robots.txt)": "Crawler access (robots.txt)",
  "Arama motorları ve yapay zekâ tarayıcıları sitenin ana sayfasını okuyabiliyor mu?":
    "Can search engines and AI crawlers read the site's home page?",
  "Arama motoru": "Search engine",
  "Yapay zekâ": "AI",
  Engelli: "Blocked",
  İzinli: "Allowed",
  "DNS kayıtları": "DNS records",
  "Bazı sorgular yanıt vermedi; liste eksik olabilir.":
    "Some lookups didn't answer; the list may be incomplete.",
  "Ölçüm etiketleri": "Measurement tags",
  "Sayfaların HTML'sinde bulunan Google Analytics ve Etiket Yöneticisi kimlikleri.":
    "Google Analytics and Tag Manager ids found in the pages' HTML.",
  "Hiçbir sayfada etiket bulunamadı.": "No tag found on any page.",
  "Yapılandırılmış veri türleri": "Structured data types",
  "Sayfaların JSON-LD ile bildirdiği schema.org türleri.":
    "schema.org types the pages declare in JSON-LD.",
  "Hiçbir sayfada yapılandırılmış veri bulunamadı.":
    "No structured data found on any page.",
  "{date} (süresi doldu)": "{date} (expired)",
  "{date} ({count} gün kaldı)": "{date} ({count} days left)",
  "Sunucu ve yanıt": "Server and response",
  "{count} adım": "{count} hops",
  "İlk bayt (TTFB)": "First byte (TTFB)",
  "Toplam yanıt": "Total response",
  "HTML boyutu": "HTML size",
  Sıkıştırma: "Compression",
  Önbellek: "Caching",
  Sunucu: "Server",
  "Teknoloji ipucu": "Technology hint",
  "Güvenlik başlıkları": "Security headers",
  "http'den https'e yönlendirme": "http to https redirect",
  "Çerçeveye gömme koruması": "Framing protection",
  "Alan adı ve sertifika": "Domain and certificate",
  "Sertifika bilgisi herkese açık Certificate Transparency kayıtlarından; alan adı bilgisi RDAP'tan.":
    "Certificate details come from public Certificate Transparency logs; domain details from RDAP.",
  "Sertifikayı veren": "Certificate issuer",
  "Sertifika bitişi": "Certificate expires",
  "Kayıt firması": "Registrar",
  "Kayıt tarihi": "Registered",
  "Alan adı bitişi": "Domain expires",
  "Diğer adres": "Other host",
  "Asıl adrese yönleniyor": "Redirects to the main host",
  "Ayrı açılıyor": "Opens separately",
  "Ana sayfaya yönleniyor": "Redirects to the home page",
  "Doğru: {status}": "Correct: {status}",
  "Hatalı: {status} dönüyor": "Wrong: returns {status}",
  "Dosyalar ve hata sayfası": "Files and error page",
  "robots.txt içinde Sitemap satırı": "Sitemap line in robots.txt",
  "Olmayan bir sayfa": "A page that doesn't exist",
  "Bu denetim site bilgisi toplanmadan önce yapılmış. Sunucu, güvenlik başlıkları, DNS ve sertifika bilgisini görmek için denetimi yeniden çalıştırın.":
    "This audit ran before site details were collected. Run the audit again to see the server, security headers, DNS and certificate details.",
  "Google arama sonucu önizlemesi": "Google search result preview",
  "(başlık yok)": "(no title)",
  "(meta açıklama yok; Google sayfadan bir parça seçer)":
    "(no meta description; Google picks a passage from the page)",
  "Başlık {px} piksel; yaklaşık {max} pikselden sonrası kesiliyor.":
    "The title is {px} pixels; anything past about {max} pixels is cut off.",
  "Başlık {px} piksel, sığıyor.": "The title is {px} pixels and fits.",
  "Sayfanın başlığı yok.": "The page has no title.",
  "Açıklama iki satıra sığmıyor; sonu kesilerek gösterilir.":
    "The description doesn't fit on two lines; its end is cut off.",
  "Paylaşım kartı önizlemesi (Open Graph)": "Share card preview (Open Graph)",
  "Görsel açılamadı": "Image couldn't be loaded",
  "og:image yok": "No og:image",
  "Open Graph başlığı, açıklaması ve görseli tanımlı.":
    "Open Graph title, description and image are set.",
  "Eksik: {tags}. Paylaşım siteleri yerine sayfadan tahmin eder.":
    "Missing: {tags}. Sharing sites guess them from the page instead.",
  "Twitter kartı: {card}": "Twitter card: {card}",
  "Twitter kartı tanımlı değil.": "No Twitter card set.",
  "{url}: {critical} kritik, {warning} uyarı, {info} bilgi":
    "{url}: {critical} critical, {warning} warnings, {info} notices",
  "{count} tıklama": "{count} clicks",
  "Son denetimden bu yana": "Since the last audit",
  "{date} tarihli denetimle karşılaştırıldı.":
    "Compared with the audit of {date}.",
  "Düzeltilenler ({count})": "Fixed ({count})",
  "Önceki denetimdeki sorunların hiçbiri tamamen gitmedi.":
    "None of the earlier audit's issues is fully gone.",
  "Yeni çıkanlar ({count})": "New ({count})",
  "Yeni bir sorun türü çıkmadı.": "No new kind of issue appeared.",
  "Search Console trafiği yükleniyor; sıralama birazdan güncellenebilir.":
    "Loading Search Console traffic; the order may update in a moment.",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı ({start} – {end}).":
    "Order: score impact, weighted by the affected pages' Search Console clicks ({start} – {end}).",
  "Search Console bağlı değil ya da yanıt vermedi; sıralama yalnızca puan etkisine göre.":
    "Search Console isn't connected or didn't answer; the order is by score impact only.",
  "İlk {count} işi göster": "Show the first {count} tasks",
  "Tüm {count} işi göster": "Show all {count} tasks",
  "{clicks} tıklama, {impressions} gösterim":
    "{clicks} clicks, {impressions} impressions",
  "ve {count} sayfa daha": "and {count} more pages",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı.":
    "Order: score impact, weighted by the affected pages' Search Console clicks.",
  Tarayıcılar: "Crawlers",
  "Başlık arama sonucunda kesiliyor.":
    "The title is cut off in search results.",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok; gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "This audit has no PageSpeed measurement for the start page; real-user data (CrUX) was not measured.",
  "2. Anlık veri": "2. Instant data",
  "Siteniz hakkında denetim anında toplanan bilgiler: sunucu, güvenlik başlıkları, DNS, sertifika, robots.txt ve gerçek kullanıcı hızı.":
    "What the audit collected about your site at the time: server, security headers, DNS, certificate, robots.txt and real-user speed.",
  "Kategori başına 100 üzerinden puan": "Score out of 100 per category",
  Sorunlu: "Failing",
  "Puan etkisi": "Score impact",
  "Puan etkisi, o kategorideki sorunların site puanından düşürdüğü puandır; hepsi düzelirse site puanına geri eklenir.":
    "Score impact is the points that category's issues take off the site score; fix them all and they're added back.",
  "Denetim tarihine göre site puanı": "Site score by audit date",
  "1. Puan dağılımı ve kontroller": "1. Score breakdown and checks",
  "Denetim, her sorun türünü bir kontrol olarak çalıştırır. Bulgusu olan kontrol sorunlu, ölçülüp temiz çıkan geçti sayılır; verisi toplanamayan kontrol ölçülmedi olarak kalır, ne geçti ne kaldı sayılır.":
    "The audit runs every kind of issue as a check. A check with findings is failing, one that was measured and came out clean has passed, and one whose data couldn't be collected stays not measured: it counts as neither passed nor failed.",
  "Ölçülmedi ({count})": "Not measured ({count})",
  "Ek C. Geçen ve ölçülemeyen kontroller":
    "Appendix C. Passed and unmeasured checks",
  "Sorun çıkmayan kontroller ve verisi toplanamadığı için sonuç verilmeyen kontroller.":
    "Checks that found nothing, and checks with no result because their data couldn't be collected.",
  "Ana içeriğin görünmesi": "Main content appears",
  "Tıklamaya tepki": "Response to a tap",
  "Görsel kayma": "Layout shift",
  "İlk içerik": "First content",
  "Sunucunun ilk yanıtı": "Server's first response",
  İyileştirilmeli: "Needs work",
  Mükemmel: "Excellent",
  "Yapılacak her iş tek listede, en çok kazandıranı üstte. Search Console bağlıysa trafik getiren sayfalardaki işler öne çıkar.":
    "Every task in one list, the most valuable first. With Search Console connected, work on pages that bring traffic moves up.",
  "Denetimin yaptığı her kontrol, kategorisine göre: geçenler, kalanlar ve ölçülemeyenler.":
    "Every check the audit ran, by category: passed, failing and not measured.",
  "Küçük iş": "Small task",
  "Orta iş": "Medium task",
  "Büyük iş": "Large task",
  "{url} adresinin telefondaki görünümü": "{url} as it looks on a phone",
  "Mobil hız ölçümünün son ekran görüntüsü":
    "Last screenshot from the mobile speed test",

  // audit screens UX pass (2026-10-26)
  "yaklaşık {duration} kaldı": "about {duration} left",
  "Hız ölçümü: {pages} sayfa × {devices} cihaz, Google PageSpeed ile. Google dakikada sınırlı ölçüme izin verdiği için bu adım en uzunu.":
    "Speed tests: {pages} pages × {devices} devices, with Google PageSpeed. Google allows only so many tests a minute, so this is the longest step.",
  "{done} / {total} ölçüm": "{done} / {total} tests",
  "Site haritası ve ana sayfanın bağlantılarından adresler toplanıyor.":
    "Collecting addresses from the sitemap and the home page's links.",
  "Her sayfa indirilip başlık, içerik, bağlantı ve teknik kontrollerden geçiriliyor.":
    "Downloading each page and running the title, content, link and technical checks.",
  "Bulgular puanlanıyor ve sonuçlar hazırlanıyor.":
    "Scoring the findings and preparing the results.",
  "{shown} / {total} satır": "{shown} of {total} rows",
  "{count} geçti": "{count} passed",
  "{count} sorunlu": "{count} with issues",
  "{count} ölçülmedi": "{count} not measured",
  "{total} kontrol: {summary}": "{total} checks: {summary}",
  "Kısmi veri": "Partial data",
  "{count} kontrol ölçülmedi: neden?": {
    one: "{count} check not measured: why?",
    other: "{count} checks not measured: why?",
  },
  "Düzeltilirse site puanına yaklaşık bu kadar eklenir; değerler toplanmaz.":
    "Roughly what fixing it adds to the site score; the values don't add up.",
  "{points} puan kayıp": "{points} points lost",
  "Hız ölçümü (PageSpeed) bu denetimde sonuç vermedi; nedeni Hız sekmesinde.":
    "The speed test (PageSpeed) returned no results in this audit; the Speed tab says why.",
  "Sayfalar Google'da henüz kontrol edilmedi; Dizin durumu sekmesinden sorabilirsiniz.":
    "The pages haven't been checked with Google yet; you can ask from the Index status tab.",
  "Karşılaştırma için bağlı bir Google Analytics mülkü ve sayfalarda bir G- etiketi gerekir.":
    "This comparison needs a connected Google Analytics property and a G- tag on the pages.",
  "Site hakkındaki bilginin bir kısmı (sertifika, alan adı kaydı, DNS) bu denetimde okunamadı.":
    "Some site information (certificate, domain registration, DNS) couldn't be read in this audit.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Ölçüm çalışınca gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "The PageSpeed test returned no results in this audit: {error} Once it runs, real-user data (CrUX) and lab results appear here.",
  "Bu proje {auditedHost} için Google verisi okuyamıyor":
    "This project can't read Google data for {auditedHost}",
  "Projenin Search Console bağlantısı {propertyHost} mülküne ait. Google'a {auditedHost} sayfalarını sormak günlük kotayı boşa harcardı, bu yüzden dizin durumu, site haritaları ve kota bu denetimde gösterilmiyor. {auditedHost} için ayrı bir proje açıp kendi mülküne bağlayın.":
    "The project's Search Console connection belongs to the {propertyHost} property. Asking Google about {auditedHost} pages would waste the daily quota, so index status, sitemaps and quota aren't shown for this audit. Create a separate project for {auditedHost} and connect it to its own property.",
  "Siteyi ayrı proje olarak ekle": "Add the site as its own project",
  "Henüz kontrol edilmedi": "Not checked yet",
  "Bu denetimin Google'a sorulmamış sayfaları. Son kontrol {date}":
    "Pages from this audit not yet checked with Google. Last check {date}",
  "Bu denetimin Google'a sorulmamış sayfaları.":
    "Pages from this audit not yet checked with Google.",
  "En çok sayfayı etkileyen {count} sorun türü; kalan {hidden} tür aşağıdaki listede.":
    "The {count} issue types affecting the most pages; the other {hidden} are in the list below.",
  "En çok sayfayı etkileyen {count} sorun türü.":
    "The {count} issue types affecting the most pages.",
  "Renklerin anlamı": "What the colors mean",
  "Kısmi veri: {measured} / {total} ölçüm sonuç verdi. Ortalamalar yalnızca ölçülenlerden.":
    "Partial data: {measured} of {total} tests returned a result. Averages use only those.",
  "Ayarlar'dan ücretsiz bir PageSpeed anahtarı ekleyip denetimi yeniden başlatın.":
    "Add a free PageSpeed key in Settings and run the audit again.",
  "PageSpeed anahtarı ekle": "Add a PageSpeed key",
  "{count} ölçüm yapılamadı": {
    one: "{count} test couldn't run",
    other: "{count} tests couldn't run",
  },
  "Sayfa başına telefon ve bilgisayar ayrı ölçülür.":
    "Each page is tested separately on phone and computer.",
  Ölçülemedi: "Not measured",
  "Google'ın ücretsiz günlük ölçüm kotası doldu. Bu sitenizden kaynaklanmıyor: sayfalar yavaş sayılmadı, yalnızca ölçülemedi.":
    "Google's free daily testing quota ran out. This isn't caused by your site: the pages weren't judged slow, they just couldn't be measured.",
  "PageSpeed anahtarı olmadan Google'ın herkesle paylaşılan ücretsiz kotası kullanılıyor ve bu kota doldu. Bu sitenizden kaynaklanmıyor.":
    "Without a PageSpeed key, Google's free quota shared by everyone is used, and it ran out. This isn't caused by your site.",
  "Google'ın dakikalık ölçüm sınırına takıldı. Bu sitenizden kaynaklanmıyor; bir süre sonra yeniden deneyin.":
    "The tests hit Google's per-minute limit. This isn't caused by your site; try again a little later.",
  "Google'ın ölçüm aracı bu sayfalar için sonuç döndürmedi. Ayrıntı aşağıdaki listede.":
    "Google's testing tool returned no results for these pages. The list below has the details.",
  "Yapılacaklar ({count})": "To-do ({count})",
  "Kontroller ({count})": "Checks ({count})",
  "Hız ({measured}/{total})": "Speed ({measured}/{total})",
  "İlk denetim. Puanın seyri bir sonrakinde başlar.":
    "First audit. The score's trend starts with the next one.",
  "Kritik sorun": "Critical issues",
  İyileştirme: "Improvements",
  "Geçen kontrol": "Checks passed",
  "Veri toplanamadı": "No data collected",
  "{measured}/{total} kontrol ölçüldü": "{measured}/{total} checks measured",
  "Bu denetimde veri toplanamadı": "No data collected in this audit",
  "{category}: {state}. Kontrolleri aç": "{category}: {state}. Open the checks",
  "{findings} bulgu, {types} sorun türü. Bulgu, bir sorunun bir sayfada görülmesidir. Bir gruba tıklayın, liste yalnızca onları göstersin.":
    "{findings} findings, {types} issue types. A finding is one issue seen on one page. Click a group to show only those in the list.",
  "{allowed}/{total} izinli": "{allowed}/{total} allowed",
  "{present}/{total} var": "{present}/{total} present",
  "Sertifikanın süresi doldu": "Certificate expired",
  "Sertifika {count} gün geçerli": {
    one: "Certificate valid for {count} day",
    other: "Certificate valid for {count} days",
  },
  "Site ya da kayıt servisi denetim sırasında bu bilgilere yanıt vermedi. Sitenizde bir sorun olduğu anlamına gelmez; denetimi yeniden çalıştırınca tekrar sorulur.":
    "The site or the registry didn't answer these during the audit. That doesn't mean something is wrong with your site; they're asked again when you rerun the audit.",
  "Çubuk, sayfadaki sorun türlerinin önem ağırlıklı toplamı: bir kritik sorun 40, bir uyarı 15, bir bilgi 3 sayılır. En uzun çubuk en çok iş çıkaran sayfa.":
    "The bar is the severity-weighted total of the page's issue types: a critical issue counts 40, a warning 15, an info 3. The longest bar is the page with the most work.",
  "Önce bunlar:": "Start here:",
  "ilk {count} iş.": {
    one: "{count} fix.",
    other: "the first {count} fixes.",
  },
  "ilk {count} iş birlikte site puanını yaklaşık {points} puan yükseltir.": {
    one: "{count} fix raises the site score by about {points} points.",
    other:
      "together, the first {count} fixes raise the site score by about {points} points.",
  },
  "ilk {count} iş, site puanını 1 puandan az yükseltir.": {
    one: "{count} fix raises the site score by less than 1 point.",
    other: "the first {count} fixes raise the site score by less than 1 point.",
  },
  "Bu sorun tek başına düzeltilirse yaklaşık kazanç; değerler toplanmaz.":
    "Roughly what fixing this issue alone gains; the values don't add up.",
  "{points} puan": "{points} points",

  // audit screens UX pass (2026-10-26)
  "Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.":
    "New checks were added; this comparison covers only the checks both audits measured.",
  "Platform alan adı": "Platform domain",
  "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.":
    "The site is on a subdomain of a hosting platform; its registration and DNS belong to the platform, so the domain and DNS checks were skipped.",
  "sayı alınamadı (tarama sınırı)": "count not read (crawl limit)",
  "Twitter kartı: ölçülmedi.": "Twitter card: not measured.",
  // Audit failure and notice copy (auditFailureCopy.ts)
  "Denetim {phase} aşamasında durdu.":
    "The audit stopped during the {phase} phase.",
  "Denetim tamamlanamadan durdu.": "The audit stopped before it could finish.",
  "adres keşfi": "URL discovery",
  tarama: "crawl",
  "hız ölçümü": "speed test",
  "sonuçların hazırlanması": "results preparation",
  "Bir adım zamanında bitmedi. Genelde site çok yavaş yanıt veriyor ya da bağlantıyı açık tutup bekletiyor.":
    "A step did not finish in time. Usually the site is answering very slowly or keeping the connection open without replying.",
  "Birkaç dakika sonra yeniden deneyin. Yine olursa daha az sayfayla başlatın.":
    "Try again in a few minutes. If it happens again, start with fewer pages.",
  "Denetim, uygulamanın kullanabildiği belleğe sığmadı. Çok büyük sayfalar ya da çok fazla sayfa buna yol açar.":
    "The audit did not fit in the memory the app can use. Very large pages or too many pages cause this.",
  "Daha az sayfayla yeniden başlatın.": "Start it again with fewer pages.",
  "Denetim, uygulamanın izin verdiği işlemci süresini aştı. Çok büyük ya da çok karmaşık sayfalar buna yol açar.":
    "The audit went over the processor time the app allows. Very large or complex pages cause this.",
  "Sonuçlar uygulamanın veritabanına yazılırken hata oluştu. Disk dolu ya da veri dosyası başka bir programda kilitli olabilir.":
    "An error occurred while writing the results to the app's database. The disk may be full or the data file may be locked by another program.",
  "Diskte boş yer olduğunu kontrol edin, uygulamayı yeniden başlatın ve denetimi yeniden başlatın.":
    "Check that the disk has free space, restart the app, then start the audit again.",
  "Bir adımın sonucu uygulamanın saklayabildiği boyutu aştı. Çok büyük siteler buna yol açar.":
    "The result of one step was larger than the app can store. Very large sites cause this.",
  "Denetimi yürüten uygulamanın iç düzeni hata verdi.":
    "The app's internal audit engine reported an error.",
  "Uygulamayı yeniden başlatın (tepsi menüsünde Yeniden başlat), sonra denetimi yeniden başlatın.":
    "Restart the app (Restart in the tray menu), then start the audit again.",
  "Denetim yarıda kaldı. Uygulama denetimin ortasında kapanmış ya da yeniden başlamış olabilir.":
    "The audit was cut off. The app may have been closed or restarted in the middle of it.",
  "Uygulamanın açık kaldığından emin olun ve denetimi yeniden başlatın.":
    "Make sure the app stays open, then start the audit again.",
  "Kayıtlı Google ve PageSpeed anahtarlarını açan kurulum anahtarı denetimi yürüten bölüme ulaşmamış. Anahtarlarınız silinmedi.":
    "The install key that opens the saved Google and PageSpeed keys did not reach the part of the app that runs audits. Your keys were not deleted.",
  "Uygulamayı güncelleyin ya da yeniden başlatın, sonra denetimi yeniden başlatın.":
    "Update or restart the app, then start the audit again.",
  "Denetim beklenmedik bir hatayla durdu.":
    "The audit stopped with an unexpected error.",
  "Denetimi yeniden başlatın. Tekrarlarsa Yardım'dan tanılama paketini indirip sorunu bildirin.":
    "Start the audit again. If it keeps happening, download the diagnostics bundle from Help and report the problem.",
  "Sorun sitenizde değil, uygulamada.":
    "The problem is in the app, not in your site.",
  "Büyük olasılıkla sorun sitenizin yavaş yanıt vermesinde; uygulamada bir arıza yok.":
    "Most likely your site is answering slowly; nothing is wrong with the app.",
  "Nedeni belirlenemedi.": "The cause could not be determined.",
  "{count} sayfa tarandı ve kaydedildi; aşağıdaki sonuçlar bu sayfalara dayanır.":
    {
      one: "{count} page was crawled and saved; the results below are based on it.",
      other:
        "{count} pages were crawled and saved; the results below are based on them.",
    },
  "Kayıtlı PageSpeed anahtarı okunamadı; hız ölçümü anahtarsız yapıldı.":
    "The saved PageSpeed key could not be read, so the speed test ran without a key.",
  "Tarama sonuçları etkilenmedi, ama hız ölçümü yalnızca ilk sayfalarla sınırlı kaldı. Uygulamayı güncelleyin ya da yeniden başlatın, sonra yeni bir denetim başlatın. Sürerse Ayarlar'dan PageSpeed anahtarını yeniden kaydedin.":
    "The crawl results are not affected, but the speed test was limited to the first pages only. Update or restart the app, then start a new audit. If it continues, save the PageSpeed key again in Settings.",
  // Audit score standing: coverage, provisional score, tier caps
  "Kısmi puan": "Partial score",
  "Gri çubuklar kısmi puandır: o denetimde kontrollerin önemli bir kısmı ölçülemedi.":
    "Grey bars are partial scores: a large share of that audit's checks could not be measured.",
  "{count} eksik denetim puansız olduğu için grafikte yok.": {
    one: "{count} incomplete audit has no score and is not on the chart.",
    other: "{count} incomplete audits have no score and are not on the chart.",
  },
  "Kısmi puan — ölçüm kapsamı {percent}":
    "Partial score — measurement coverage {percent}",
  "Kontrollerin önemli bir kısmı ölçülemediği için bu puan kesin değil; derece verilmedi.":
    "A large share of the checks could not be measured, so this score is not final and gets no rating.",
  "Eksik denetim — puan verilmedi": "Incomplete audit — no score given",
  "Sorun listesi tam olmadığı için puan hesaplanmadı. Aşağıdaki bulgular taranan sayfalar için geçerli; tam bir puan için denetimi yeniden çalıştırın.":
    "The issue list is incomplete, so no score was calculated. The findings below apply to the pages that were crawled; run the audit again for a full score.",
  kısmi: "partial",
  "{category} ölçülmedi: {reason}": "{category} not measured: {reason}",
  "{category} ölçülmedi.": "{category} not measured.",
  "{category} kontrollerinin çoğu ölçülmedi: {reason}":
    "Most {category} checks not measured: {reason}",
  "{category} kontrollerinin çoğu ölçülmedi.":
    "Most {category} checks not measured.",
  "hız ölçümü kapalıydı": "speed testing was turned off",
  "PageSpeed kotası doldu": "the PageSpeed quota ran out",
  "PageSpeed anahtarı yok": "no PageSpeed key",
  "hız ölçümü yapılmadı": "no speed test was run",
  "hız ölçümleri başarısız oldu": "the speed tests failed",
  "Search Console'dan dizin verisi alınmadı":
    "no index data was read from Search Console",
  "Puan, ölçülen {count} kontrolün sonucuna göre.": {
    one: "Score based on the {count} check that was measured.",
    other: "Score based on the {count} checks that were measured.",
  },
  "{count} kontrol ölçülemedi.": {
    one: "{count} check could not be measured.",
    other: "{count} checks could not be measured.",
  },
  "Her bulgu, önemine ve etkilediği sayfa oranına göre kendi kategorisinden puan düşer; site puanı yedi kategorinin ağırlıklı ortalamasıdır. Ölçülemeyen kontroller puanı ne artırır ne düşürür. Kontrollerin ağırlıklı kapsamı {coverage} değerinin altındaysa ya da Tarama, Dizine alma, İçerik veya Hız kategorisinde ölçülen kontrollerin oranı {heavy} değerinin altındaysa puan kısmidir ve derece verilmez. Kritik bir sorun varken puan en fazla {criticalCap}, {count} veya daha fazla uyarı varken en fazla {warningsCap} olur.":
    "Each finding takes points off its own category by its severity and the share of pages it affects; the site score is the weighted average of the seven categories. Checks that could not be measured neither raise nor lower it. If the weighted coverage of the checks is below {coverage}, or the measured share of Crawl, Indexing, Content or Speed is below {heavy}, the score is partial and gets no rating. With a critical issue the score is at most {criticalCap}; with {count} or more warnings, at most {warningsCap}.",
  "Kritik sorun olduğu için puan en fazla {cap} olabilir. Önce kritik sorunlara bakın.":
    "With a critical issue the score can be at most {cap}. Look at the critical issues first.",
  "{count} veya daha fazla uyarı olduğu için puan en fazla {cap} olabilir.":
    "With {count} or more warnings the score can be at most {cap}.",
  "Denetim {count} sayfayla sınırlıydı; sitede daha fazla sayfa olabilir.": {
    one: "The audit was limited to {count} page; the site may have more pages.",
    other:
      "The audit was limited to {count} pages; the site may have more pages.",
  },
  "Bulunan adres: {found}, taranan: {crawled}":
    "URLs found: {found}, crawled: {crawled}",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  Site: "Site",
  "Bu projede {count} farklı site denetlenmiş:":
    "This project has audits of {count} different sites:",
  "Grafik ve değişim okları her zaman aynı sitenin denetimlerini karşılaştırır; birden çok site seçiliyken grafik gizlenir.":
    "The chart and change arrows always compare audits of the same site; the chart is hidden while several sites are shown.",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Kontrol edilen {checked} sayfa içinde. Google başka bir adresi asıl saydı: bu sayfaların canonical etiketini ve iç bağlantılarını kontrol edin.":
    "Out of {checked} checked pages. Google chose another address as the main one: check these pages' canonical tags and internal links.",
  "Kontrol edilen {checked} sayfanın hiçbirinde Google başka bir adresi asıl saymadı.":
    "For none of the {checked} checked pages did Google choose another address as the main one.",

  "Tüm sütunları ve işlemleri görmek için tabloyu yana kaydırın.":
    "Scroll sideways to see all columns and actions.",
  "Hız ölçümü istendi": "Speed measurement requested",
};
