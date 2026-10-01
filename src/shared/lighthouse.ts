export const LIGHTHOUSE_CATEGORIES = [
  "performance",
  "accessibility",
  "best-practices",
  "seo",
] as const;

export const LIGHTHOUSE_CATEGORY_TABS = [
  "all",
  ...LIGHTHOUSE_CATEGORIES,
] as const;

export type LighthouseCategory = (typeof LIGHTHOUSE_CATEGORIES)[number];
export type LighthouseCategoryTab = (typeof LIGHTHOUSE_CATEGORY_TABS)[number];

/*
 * Lighthouse's own bands, so every surface reads like PageSpeed Insights.
 * Not the audit-score bands (`auditScoreBand`), which grade a different
 * number. Category scores are whole numbers.
 */
export const LIGHTHOUSE_GOOD_FROM = 90;
export const LIGHTHOUSE_FAIR_FROM = 50;

export function lighthouseBand(score: number): "good" | "fair" | "poor" {
  if (score >= LIGHTHOUSE_GOOD_FROM) return "good";
  if (score >= LIGHTHOUSE_FAIR_FROM) return "fair";
  return "poor";
}
