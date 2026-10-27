import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/shared (except audit-issues and i18n).
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enShared: Catalog = {
  // dataFreshness.ts
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. Search Console data runs {count} day behind, so the last day is never today.",
      other:
        "{start} – {end}. Search Console data runs {count} days behind, so the last day is never today.",
    },

  // selfhost-checks.ts
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN must be a full https address, such as https://your-team.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    'TEAM_DOMAIN must be a full https address, such as https://your-team.cloudflareaccess.com — add https:// to the start of "{value}"',

  // gsc-coverage-states.ts: Google's own English sentences
  "Site haritasında var, dizine alındı": "Submitted and indexed",
  "Dizine alındı, site haritasında yok": "Indexed, not submitted in sitemap",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexed; consider adding to a sitemap",
  "Tarandı, şu an dizine alınmadı": "Crawled - currently not indexed",
  "Keşfedildi, henüz taranmadı": "Discovered - currently not indexed",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Duplicate without user-selected canonical",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Duplicate, Google chose different canonical than user",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Duplicate, submitted URL not selected as canonical",
  "Alternatif sayfa, canonical doğru":
    "Alternate page with proper canonical tag",
  "'noindex' etiketiyle dışlandı": "Excluded by 'noindex' tag",
  "robots.txt engelliyor": "Blocked by robots.txt",
  "401 nedeniyle engellendi": "Blocked due to unauthorized request (401)",
  "403 nedeniyle engellendi": "Blocked due to access forbidden (403)",
  "Bulunamadı (404)": "Not found (404)",
  "Yumuşak 404": "Soft 404",
  "Yönlendirme yapan sayfa": "Page with redirect",
  "Sunucu hatası (5xx)": "Server error (5xx)",
  "Google bu adresi bilmiyor": "URL is unknown to Google",

  // ga4-reports.ts: report names, as Google Analytics names them
  "Giriş sayfaları": "Landing pages",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Pages where visits start: sessions, engagement, conversions.",
  "Sayfa performansı": "Pages and screens",
  "Görüntülenme ve sayfada geçirilen süre.": "Views and time spent on page.",
  "Trafik kaynakları": "Traffic acquisition",
  "Ziyaretçiler nereden geliyor.": "Where visitors come from.",
  "Anahtar olaylar": "Key events",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "The events you count as conversions, and how many people triggered them.",
  "E-ticaret": "Ecommerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Items and revenue; populated when the property measures ecommerce.",
  "Site içi arama": "Site search",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "What visitors search for on your site.",
  "Kitle dağılımı": "Audience",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Device, country, new and returning visitors.",

  // ga4-reports.ts: column headers, as Google Analytics names them
  "Ana makine adı": "Hostname",
  "Giriş sayfası": "Landing page",
  Sayfa: "Page",
  Olay: "Event name",
  Kanal: "Channel",
  Kaynak: "Source",
  Ortam: "Medium",
  "Kaynak / ortam": "Source / medium",
  Kampanya: "Campaign",
  Cihaz: "Device",
  Ülke: "Country",
  "Yeni / geri dönen": "New / returning",
  Ürün: "Item",
  "Ürün kodu": "Item ID",
  "Arama terimi": "Search term",
  Tarih: "Date",
  Oturum: "Sessions",
  "Aktif kullanıcı": "Active users",
  Kullanıcı: "Users",
  "Etkileşimli oturum": "Engaged sessions",
  "Etkileşim oranı": "Engagement rate",
  "Anahtar olay": "Key events",
  "Olay oranı": "Key event rate",
  "Satın alma işlemleri": "Transactions",
  Gelir: "Revenue",
  Görüntülenme: "Views",
  "Etkileşim süresi": "Engagement time",
  "Ürün görüntüleme": "Items viewed",
  "Sepete eklenen ürün": "Items added to cart",
  "Arama sayısı": "Searches",
  "Satılan ürün": "Items purchased",
  "Ürün geliri": "Item revenue",

  // audit screens UX pass (2026-10-26)
  "Sosyal ve yapılandırılmış veri": "Social and structured data",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "{value} sıra yükseldi": "up {value} places",
  "{value} sıra geriledi": "down {value} places",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "“{query}” için bir basamak yükselme fırsatı":
    "A chance to move “{query}” up one step",
  "Okunan kaynakta bu dönem için kayıt bulunmadı.":
    "No records were returned by this source for this period.",
  "Kaynak satır sınırına ulaştı; sonuçlar yalnızca okunan kayıtları kapsar.":
    "The source row limit was reached; results cover only the records read.",
  "Kaynak isteği başarısız; bu bölümün verisi alınamadı.":
    "The source request failed; data for this section could not be retrieved.",
  "Kaynak saklama süresi bu karşılaştırmanın tamamını kapsamıyor.":
    "The source retention period does not cover this entire comparison.",
  "Kaynak durumu kaydedilmemiş.": "Source status was not recorded.",
  "Bu rapor GA4 oturum veya gelir raporu değildir.":
    "This document is not a GA4 sessions or revenue report.",
  "Search Console sayfa trafiği": "Search Console page traffic",
  "Dönem: {start} – {end} (Pasifik). Okunan sayfa satırı: {rows}.":
    "Period: {start} – {end} (Pacific). Page rows read: {rows}.",
  "Mülk: {property}. Alınma zamanı: {time}. Satır sınırı: {limit}.":
    "Property: {property}. Retrieved: {time}. Row limit: {limit}.",
  "Kaynak ayrıntıları bu kayıtta mevcut değil.":
    "Source details are unavailable in this record.",
  "Search Console sayfa trafiği alınamadı; trafik yokluğu sonucu çıkarılamaz.":
    "Search Console page traffic could not be retrieved; this does not establish an absence of traffic.",
  "Gerçek kullanıcı hızı": "Real-user speed",
  "Mobil CrUX: {url}. Kaydedilen PageSpeed ölçümü: {time}. Sayfa ve origin kapsamları ayrı gösterilir; kayan 28 günlük veri denetim süresi değildir.":
    "Mobile CrUX: {url}. Stored PageSpeed measurement: {time}. Page and origin scopes are shown separately; the rolling 28-day data is not the audit duration.",
  "Bu kayıtta kullanılabilir CrUX verisi yok; laboratuvar ölçümü gerçek kullanıcı ölçümü değildir.":
    "This record has no usable CrUX data; a lab measurement is not a real-user measurement.",
  "Harita keşif toplamları Anlık veri bölümündedir. Harita kapsamı oranı yalnızca taranan sayfaları kullanır; tüm harita adreslerinin tarandığını göstermez.":
    "Discovered sitemap totals appear in Snapshot data. Sitemap coverage uses only crawled pages; it does not show that all sitemap URLs were crawled.",
  "Taranan {count} sayfanın {inMap} tanesi ({percent}) site haritasında. Bu oran taranan sayfalara aittir; keşfedilen harita adreslerinin toplamı mevcutsa Anlık veri bölümünde ayrıca gösterilir.":
    "Of {count} crawled pages, {inMap} ({percent}) are in the sitemap. This rate applies to crawled pages; discovered sitemap URL totals, when available, appear separately in Snapshot data.",
  "Kaydedilen mobil PageSpeed ölçümü: {time}.":
    "Stored mobile PageSpeed measurement: {time}.",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Aynı kaynak yeniden hazırlanırsa kayıt güncellenir; rapor dili değişebilir.":
    "Data was read again from the server when preparing this report; Google may revise historical values. The same period label does not guarantee identical measurements to a previous screenshot. Regenerating the same source updates the record; the report language may change.",
  "Okunan sayfalarda güç kaybı koşulunu sağlayan kayıt bulunmadı.":
    "No pages matching the decay condition were found among the pages read.",
  "Kaydedilmiş harita keşif toplamı mevcut değil; kapsam oranı yalnızca taranan sayfaları kullanır.":
    "No discovered sitemap total was stored; the coverage rate uses only crawled pages.",
};
