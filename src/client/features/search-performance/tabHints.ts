import type { Tab } from "@/client/features/search-performance/SearchPerformanceParts";

/** What each tab is for, in one plain sentence, shown above its panel. */
export const TAB_HINTS: Record<Tab, string> = {
  striking:
    "Ortalama sırası 5 ile 20 arasında olan sorgular. 5-10 arası ilk sayfanın alt yarısı, 11-20 ikinci sayfa; küçük bir iyileştirme ikisini de üste taşıyabilir. Gösterime göre sıralı.",
  queries:
    "İnsanların sizi hangi aramalarla bulduğu; her sorgunun tıklama, gösterim ve ortalama sırasıyla.",
  pages: "Google'da en çok görünen ve tıklanan sayfalarınız.",
  cannibalization:
    "Aynı arama için birden fazla sayfanızın birbiriyle yarıştığı yerler.",
};
