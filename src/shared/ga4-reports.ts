/**
 * The seven Google Analytics reports, named once.
 *
 * Shared because three places have to agree on the list: the server
 * function's validator, the screen's picker, and the MCP tools that were the
 * only way to reach them before the screen existed.
 */
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
  landing_pages: {
    label: "Giriş sayfaları",
    description: "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.",
  },
  page_performance: {
    label: "Sayfa performansı",
    description: "Görüntülenme ve sayfada geçirilen süre.",
  },
  traffic_acquisition: {
    label: "Trafik kaynakları",
    description: "Ziyaretçiler nereden geliyor.",
  },
  key_events: {
    label: "Anahtar olaylar",
    description: "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.",
  },
  ecommerce_performance: {
    label: "E-ticaret",
    description: "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.",
  },
  site_search: {
    label: "Site içi arama",
    description: "Ziyaretçilerin sitenizde ne aradığı.",
  },
  audience_breakdown: {
    label: "Kitle dağılımı",
    description: "Cihaz, ülke, yeni ve geri dönen ziyaretçi.",
  },
};

/** A GA4 metric name to a column header. Unknown names pass through. */
export const GA4_FIELD_LABELS: Record<string, string> = {
  hostName: "Alan adı",
  landingPage: "Giriş sayfası",
  pagePath: "Sayfa",
  eventName: "Olay",
  sessionDefaultChannelGroup: "Kanal",
  sessionSource: "Kaynak",
  sessionMedium: "Ortam",
  sessionCampaignName: "Kampanya",
  deviceCategory: "Cihaz",
  country: "Ülke",
  newVsReturning: "Yeni / geri dönen",
  itemName: "Ürün",
  searchTerm: "Arama terimi",
  date: "Tarih",
  sessions: "Oturum",
  activeUsers: "Aktif kullanıcı",
  totalUsers: "Kullanıcı",
  engagedSessions: "Etkileşimli oturum",
  engagementRate: "Etkileşim oranı",
  keyEvents: "Anahtar olay",
  sessionKeyEventRate: "Olay oranı",
  transactions: "İşlem",
  purchaseRevenue: "Gelir",
  screenPageViews: "Görüntülenme",
  userEngagementDuration: "Etkileşim süresi",
  itemsViewed: "Ürün görüntüleme",
  itemsPurchased: "Satılan ürün",
  itemRevenue: "Ürün geliri",
};

/** Rendered as a percentage rather than a count. */
export const GA4_RATE_FIELDS = new Set([
  "engagementRate",
  "sessionKeyEventRate",
]);
