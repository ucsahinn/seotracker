import { t } from "./i18n";

/** Appearance types Google documents, in plain Turkish (translated by t()
 *  where they are read). Anything else is shown under the code Google sent,
 *  which is still better than hiding it. */
const APPEARANCE_LABELS: Record<string, string> = {
  AMP_BLUE_LINK: "AMP sayfası",
  AMP_TOP_STORIES: "AMP haber kutusu",
  AMP_STORY: "AMP hikayesi",
  BREADCRUMB: "Gezinme yolu (breadcrumb)",
  EVENT_DETAILS: "Etkinlik ayrıntısı",
  EVENT_LISTING: "Etkinlik listesi",
  FAQ_RICH_RESULT: "Sık sorulan sorular",
  HOWTO_RICH_RESULT: "Nasıl yapılır",
  JOBS_DETAILS: "İş ilanı ayrıntısı",
  JOBS_LISTING: "İş ilanı listesi",
  MERCHANT_LISTINGS: "Ürün listesi",
  PRODUCT_SNIPPETS: "Ürün özeti",
  PRACTICE_PROBLEM: "Alıştırma sorusu",
  MATH_SOLVERS: "Matematik çözücü",
  RECIPE_FEATURE: "Tarif kutusu",
  RECIPE_RICH_SNIPPET: "Tarif özeti",
  REVIEW_SNIPPET: "Değerlendirme özeti",
  SITELINKS_SEARCHBOX: "Site içi arama kutusu",
  TPF_FAQ: "Sık sorulan sorular",
  TPF_HOWTO: "Nasıl yapılır",
  TPF_QA: "Soru ve cevap",
  VIDEO: "Video",
  VIDEO_CHAPTERS: "Video bölümleri",
  WEB_STORY: "Web hikayesi",
  ORGANIC_SHOPPING: "Ücretsiz alışveriş listesi",
  PODCAST: "Podcast",
  TRANSLATED_RESULT: "Çevrilmiş sonuç",
};

export function appearanceLabel(key: string): string {
  const label = APPEARANCE_LABELS[key];
  return label ? t(label) : key;
}
