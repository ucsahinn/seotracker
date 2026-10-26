import { auditScoreBand, auditScoreTier } from "@/shared/auditScore";
import { t } from "@/shared/i18n";

/**
 * The words and colours a score is shown with, in one place so the gauge,
 * the category rows and the history bars say the same thing about the same
 * number. The word always travels with the colour: a reader who cannot tell
 * the amber from the green still reads "Orta".
 */

/** Turkish source text; shown through t(). */
const TIER_WORD = {
  excellent: "Mükemmel",
  good: "İyi",
  fair: "Orta",
  poor: "Zayıf",
} as const;

export function scoreWord(score: number): string {
  return t(TIER_WORD[auditScoreTier(score)]);
}

/** A fill colour (marks only, never text); 3:1 on the surface in both themes. */
export function scoreFill(score: number): string {
  const band = auditScoreBand(score);
  if (band === "good") return "var(--mark-success)";
  if (band === "fair") return "var(--mark-warning)";
  return "var(--mark-error)";
}

/**
 * How much of a category the audit could see. "unmeasured": no check had
 * data, so there is no score and no word. "partial": some checks had no
 * data, so the score stands but its word does not -- "Mükemmel" on a speed
 * category whose Lighthouse runs all failed was praise for what nobody
 * measured.
 */
export function categoryCoverage(category: {
  score: number | null;
  unknown: number;
}): "unmeasured" | "partial" | "full" {
  if (category.score === null) return "unmeasured";
  return category.unknown > 0 ? "partial" : "full";
}

/** Text colour that keeps contrast on both themes. */
export function scoreInk(score: number): string {
  const band = auditScoreBand(score);
  if (band === "good") return "var(--ink-success)";
  if (band === "fair") return "var(--ink-warning)";
  return "var(--ink-error)";
}

/**
 * `critical` is the number of failed critical checks: a low score made of
 * warnings must not send the reader looking for critical problems that the
 * audit did not find.
 */
export function scoreVerdict(score: number, critical: number): string {
  if (score === 100) return t("Eksiksiz. Düzeltilecek bir şey kalmadı.");
  switch (auditScoreTier(score)) {
    case "excellent":
      return t("Çok iyi. Birkaç küçük iş kaldı.");
    case "good":
      return t("İyi. Birkaç düzeltme puanı yükseltir.");
    case "fair":
      return critical > 0
        ? t("Orta. Önce kritik sorunlara bakın.")
        : t(
            "Orta. Kritik sorun yok; en çok puan getiren uyarılardan başlayın.",
          );
    case "poor":
      return critical > 0
        ? t("Zayıf. Google'ın sitenizi anlamasını engelleyen sorunlar var.")
        : t(
            "Zayıf. Kritik sorun yok, ama birikmiş uyarılar puanı aşağı çekiyor.",
          );
  }
}
