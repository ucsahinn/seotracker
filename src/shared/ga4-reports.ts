/**
 * The seven Google Analytics reports, named once.
 *
 * Shared because three places have to agree on the list: the server
 * function's validator, the screen's picker, and the MCP tools that were the
 * only way to reach them before the screen existed.
 *
 * The label maps keep the Turkish source strings and translate on every read
 * (`translateOnRead`): they are built at import time, before the locale is
 * known, and the server's locale changes per request. Their English is in
 * src/shared/i18n/en/shared.ts.
 */
import { t } from "./i18n";

/** The same keys, each value passed through t() when it is read. */
function translateOnRead<T extends Record<string, string>>(source: T): T {
  const translated = { ...source };
  for (const key of Object.keys(source)) {
    Object.defineProperty(translated, key, {
      enumerable: true,
      get: () => t(source[key]),
    });
  }
  return translated;
}

export const GA4_REPORT_KINDS = [
  "landing_pages",
  "page_performance",
  "traffic_acquisition",
  "key_events",
  "ecommerce_performance",
  "site_search",
  "audience_breakdown",
] as const;

export type Ga4ReportKindName = (typeof GA4_REPORT_KINDS)[number];

/** What each one answers, in the operator's language. */
export const GA4_REPORT_LABELS: Record<
  Ga4ReportKindName,
  { label: string; description: string }
> = {
  landing_pages: translateOnRead({
    label: "Giriş sayfaları",
    description: "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.",
  }),
  page_performance: translateOnRead({
    label: "Sayfa performansı",
    description: "Görüntülenme ve sayfada geçirilen süre.",
  }),
  traffic_acquisition: translateOnRead({
    label: "Trafik kaynakları",
    description: "Ziyaretçiler nereden geliyor.",
  }),
  key_events: translateOnRead({
    label: "Anahtar olaylar",
    description: "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.",
  }),
  ecommerce_performance: translateOnRead({
    label: "E-ticaret",
    description: "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.",
  }),
  site_search: translateOnRead({
    label: "Site içi arama",
    description: "Ziyaretçilerin sitenizde ne aradığı.",
  }),
  audience_breakdown: translateOnRead({
    label: "Kitle dağılımı",
    description: "Cihaz, ülke, yeni ve geri dönen ziyaretçi.",
  }),
};

/** A GA4 metric name to a column header. Unknown names pass through. */
export const GA4_FIELD_LABELS: Record<string, string> = translateOnRead({
  hostName: "Ana makine adı",
  landingPage: "Giriş sayfası",
  pagePath: "Sayfa",
  eventName: "Olay",
  sessionDefaultChannelGroup: "Kanal",
  sessionSource: "Kaynak",
  sessionMedium: "Ortam",
  sessionSourceMedium: "Kaynak / ortam",
  sessionCampaignName: "Kampanya",
  deviceCategory: "Cihaz",
  country: "Ülke",
  newVsReturning: "Yeni / geri dönen",
  itemName: "Ürün",
  itemId: "Ürün kodu",
  searchTerm: "Arama terimi",
  date: "Tarih",
  sessions: "Oturum",
  activeUsers: "Aktif kullanıcı",
  totalUsers: "Kullanıcı",
  engagedSessions: "Etkileşimli oturum",
  engagementRate: "Etkileşim oranı",
  keyEvents: "Anahtar olay",
  sessionKeyEventRate: "Olay oranı",
  transactions: "Satın alma işlemleri",
  purchaseRevenue: "Gelir",
  screenPageViews: "Görüntülenme",
  userEngagementDuration: "Etkileşim süresi",
  itemsViewed: "Ürün görüntüleme",
  itemsAddedToCart: "Sepete eklenen ürün",
  eventCount: "Arama sayısı",
  itemsPurchased: "Satılan ürün",
  itemRevenue: "Ürün geliri",
});

/**
 * Rendered as money in the property's currency rather than a count. The
 * dashboard already showed revenue as "₺663.106" and the Analytics tab as a
 * bare "663.106", which reads as a count of something.
 */
export const GA4_MONEY_FIELDS = new Set(["purchaseRevenue", "itemRevenue"]);

/** Rendered as a percentage rather than a count. */
export const GA4_RATE_FIELDS = new Set([
  "engagementRate",
  "sessionKeyEventRate",
]);
