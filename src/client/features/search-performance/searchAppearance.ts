import { sort } from "remeda";

/** Appearance types Google documents, in plain Turkish. Anything else is
 *  shown under the code Google sent, which is still better than hiding it. */
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
  return APPEARANCE_LABELS[key] ?? key;
}

type AppearanceRow = { key: string; clicks: number; impressions: number };

/** The ring shows this many types by name; the tail is pooled. */
const SHOWN = 5;
const OTHER_APPEARANCE_KEY = "__other";

/**
 * Segments for the appearance ring, biggest first. Split by clicks; when no
 * appearance got a click (common for rich results that only show up) it
 * falls back to impressions so the card does not vanish while Google did
 * report the appearance. Empty when there is nothing to show.
 */
export function appearanceSegments(rows: AppearanceRow[]): {
  metric: "clicks" | "impressions";
  segments: { key: string; label: string; value: number; disabled?: boolean }[];
} {
  const totalClicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const metric = totalClicks > 0 ? "clicks" : "impressions";
  const ranked = sort(
    rows
      .map((row) => ({
        key: row.key,
        label: appearanceLabel(row.key),
        value: row[metric],
      }))
      .filter((row) => row.value > 0),
    (a, b) => b.value - a.value,
  );
  const head = ranked.slice(0, SHOWN);
  const rest = ranked.slice(SHOWN).reduce((sum, row) => sum + row.value, 0);
  const segments =
    rest > 0
      ? [
          ...head,
          {
            key: OTHER_APPEARANCE_KEY,
            label: "Diğer görünümler",
            value: rest,
            disabled: true,
          },
        ]
      : head;
  return { metric, segments };
}
