import { t } from "@/shared/i18n";

/**
 * Plain-language meanings for the Google Analytics figures shown to beginners.
 * Turkish source strings: callers pass them through t() where they render.
 */
export const GA4_HELP = {
  keyEvents:
    "Önemli sayılan olayların tetiklenme sayısıdır; benzersiz müşteri sayısı değildir. Sıfır, kurulumun eksik olduğunu kanıtlamaz.",
  keyEventRate:
    "En az bir anahtar olay içeren oturumların payıdır. Olay sayısının oturuma bölünmesiyle hesaplanmaz.",
  engagementRate:
    "Ziyaretçinin sayfada vakit geçirip bir şey yaptığı oturumların yüzdesi.",
  activeUsers:
    "Bu satırdaki aktif kullanıcılardır; aynı kişi farklı sayfa ve kategorilerde tekrar sayılabilir.",
} as const;

/** Help text for a report column, when it is one beginners tend to trip on. */
export function ga4ColumnHelp(field: string): string | undefined {
  switch (field) {
    case "keyEvents":
      return t(GA4_HELP.keyEvents);
    case "sessionKeyEventRate":
      return t(GA4_HELP.keyEventRate);
    case "engagementRate":
      return t(GA4_HELP.engagementRate);
    case "activeUsers":
      return t(GA4_HELP.activeUsers);
    case "sessions":
      return t(
        "Oturum, bir ziyaret dönemidir; aynı kişi birden fazla oturum başlatabilir.",
      );
    case "transactions":
      return t(
        "Kaydedilen işlem sayısıdır; satılan ürün adedi ve benzersiz alıcı sayısı farklıdır.",
      );
    case "userEngagementDuration":
      return t(
        "Bu satırdaki kullanıcıların toplam etkileşim süresidir; kullanıcı başına ortalama değildir.",
      );
    case "screenPageViews":
      return t(
        "Tekrarlanan görüntülemeler dahildir; benzersiz sayfa veya ziyaretçi sayısı değildir.",
      );
    case "itemsViewed":
    case "itemsAddedToCart":
    case "itemsPurchased":
      return t(
        "Ürün adedidir; sipariş sayısı değildir ve bu sütunlar bir dönüşüm hunisi oluşturmaz.",
      );
    case "itemRevenue":
      return t(
        "Ürün kapsamlı gelirdir; satın alma geliriyle aynı ölçüm değildir. İadeler negatif olabilir.",
      );
    case "purchaseRevenue":
      return t(
        "Mülkün para biriminde satın alma geliri; ürün gelirinden farklıdır.",
      );
    case "totalUsers":
      return t(
        "Bu satırdaki kullanıcılar başka satırlarda tekrar sayılabilir; satırları benzersiz kullanıcı toplamı için toplamayın.",
      );
    default:
      return undefined;
  }
}
