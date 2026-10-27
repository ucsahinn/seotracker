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
};
