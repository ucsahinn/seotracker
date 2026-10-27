/**
 * Whether an audit's score can be shown, and how much it may claim.
 *
 * The score (`scoreAudit`) is computed from what the audit found, and a
 * check it could not measure neither raises nor lowers it. That is right for
 * the number, and wrong for the word beside it: an audit whose speed runs all
 * hit the PageSpeed quota, with no Search Console and the site probes timed
 * out, scored 99 "Mükemmel" on the half of the checks it could see. This
 * module decides, from the breakdown, what the screen, the report and the
 * MCP summary say about that number:
 *
 *  - **Withheld.** A failed audit, one still running, one whose crawl was cut
 *    short (`crawl-rate-limited`), or one with nothing crawled has an
 *    incomplete issue list. Its score would be a guess, so it gets none.
 *  - **Provisional.** Coverage below `PROVISIONAL_COVERAGE_BELOW`, or a heavy
 *    category (weight >= `HEAVY_CATEGORY_MIN_WEIGHT`: crawl, indexing,
 *    content, speed) with less than `HEAVY_COVERAGE_BELOW` of its checks
 *    measured. The number is shown, neutrally, as "Kısmi puan", never with a
 *    tier word.
 *  - **Final.** The tier word follows the score, which `scoreAudit` has
 *    already capped by the severity mix (critical findings at 69, many
 *    warnings at 89); `cappedBy` says when that cap is what holds it down.
 *
 * Coverage is weighted like the score: each category's measured share of
 * its checks, averaged by `AUDIT_CATEGORY_WEIGHT`. Unweighted, the 43
 * Lighthouse-report checks would swamp the rest, and an audit without speed
 * runs would read as half-blind when crawl and indexing were fully seen.
 *
 * Measured on the current registry (202 checks): everything measured is
 * 100%; no Search Console and external checks off is ~93%; the PageSpeed
 * quota spent as well is ~71% with speed at 28% (provisional, through the
 * speed rule); site probes failing on top of that is ~60% (provisional
 * through both rules).
 */
import {
  LIGHTHOUSE_NO_KEY_MARKER,
  LIGHTHOUSE_QUOTA_MARKER,
} from "./audit-limits";
import type { AuditBreakdown, CategoryScore } from "./auditBreakdown";
import {
  AUDIT_CATEGORY_LABEL,
  AUDIT_CATEGORY_WEIGHT,
  type AuditCategory,
} from "./auditCategory";
import {
  auditScoreTier,
  CRITICAL_SCORE_CAP,
  MANY_WARNINGS,
  WARNINGS_SCORE_CAP,
} from "./auditScore";
import { formatCount, formatPercent } from "./format";
import { t } from "./i18n";

/** Below this weighted share of checks measured, the score is provisional. */
const PROVISIONAL_COVERAGE_BELOW = 0.7;
/** Categories weighing at least this much are the ones a score cannot do without. */
const HEAVY_CATEGORY_MIN_WEIGHT = 2;
/** A heavy category with less than this share measured makes the score provisional. */
const HEAVY_COVERAGE_BELOW = 0.5;
/** The issue a crawl that stopped early (the site's rate limit) records. */
const CUT_SHORT_ISSUE = "crawl-rate-limited";

export type AuditTier = ReturnType<typeof auditScoreTier>;

export type AuditCoverage = {
  /** Checks with data, passed or failed. */
  measured: number;
  /** Every check the audit has. */
  total: number;
  /** 0-1, each category's measured share averaged by its weight in the score. */
  ratio: number;
};

type CoverageCounts = Pick<CategoryScore, "passed" | "failed" | "unknown">;

/** A category's measured share of its checks, 0-1; null when it has none. */
function categoryCoverageRatio(category: CoverageCounts): number | null {
  const total = category.passed + category.failed + category.unknown;
  return total === 0 ? null : (category.passed + category.failed) / total;
}

export function auditCoverage(
  categories: (CoverageCounts & { category: AuditCategory })[],
): AuditCoverage {
  let measured = 0;
  let total = 0;
  let weighted = 0;
  let weight = 0;
  for (const category of categories) {
    const ratio = categoryCoverageRatio(category);
    if (ratio === null) continue;
    measured += category.passed + category.failed;
    total += category.passed + category.failed + category.unknown;
    weighted += ratio * AUDIT_CATEGORY_WEIGHT[category.category];
    weight += AUDIT_CATEGORY_WEIGHT[category.category];
  }
  return { measured, total, ratio: weight > 0 ? weighted / weight : 0 };
}

export type WithheldReason = "failed" | "running" | "cut-short" | "empty";

export type AuditStanding =
  | { kind: "withheld"; reason: WithheldReason }
  | {
      kind: "scored";
      score: number;
      coverage: AuditCoverage;
      /** Too little measured for a verdict: no tier word, neutral colour. */
      provisional: boolean;
      /** Heavy categories under `HEAVY_COVERAGE_BELOW`, in category order. */
      thinCategories: AuditCategory[];
      /** The score's tier (already severity-capped); null when provisional. */
      tier: AuditTier | null;
      /** The severity cap holding the score down, if one is. */
      cappedBy: "critical" | "warnings" | null;
    };

/** True when the crawl stopped before visiting every address it found. */
function crawlCutShort(breakdown: Pick<AuditBreakdown, "checks">) {
  return breakdown.checks.some(
    (check) => check.issueType === CUT_SHORT_ISSUE && check.state === "failed",
  );
}

/**
 * `status` is the audit row's; absent means completed (older callers and
 * tests that only have the rows).
 */
export function auditStanding(
  breakdown: Pick<
    AuditBreakdown,
    "score" | "cappedBy" | "checks" | "categories"
  >,
  status?: string | null,
): AuditStanding {
  if (status === "failed") return { kind: "withheld", reason: "failed" };
  if (status === "running") return { kind: "withheld", reason: "running" };
  if (crawlCutShort(breakdown)) {
    return { kind: "withheld", reason: "cut-short" };
  }
  if (breakdown.score === null) return { kind: "withheld", reason: "empty" };

  const coverage = auditCoverage(breakdown.categories);
  const thinCategories = breakdown.categories
    .filter((category) => {
      const ratio = categoryCoverageRatio(category);
      return (
        AUDIT_CATEGORY_WEIGHT[category.category] >= HEAVY_CATEGORY_MIN_WEIGHT &&
        ratio !== null &&
        ratio < HEAVY_COVERAGE_BELOW
      );
    })
    .map((category) => category.category);
  const provisional =
    coverage.ratio < PROVISIONAL_COVERAGE_BELOW || thinCategories.length > 0;

  return {
    kind: "scored",
    score: breakdown.score,
    coverage,
    provisional,
    thinCategories,
    tier: provisional ? null : auditScoreTier(breakdown.score),
    cappedBy: provisional ? null : breakdown.cappedBy,
  };
}

/**
 * The crawl stopped at the page limit the operator chose while the site may
 * have more pages. Not "cut short": the limit was a choice, so the score
 * stands, with a note. The URLs the crawl itself found (sitemap plus links)
 * say whether there were more; audits from before that was stored fall back
 * to the sitemap's on-host count, and without either, reaching the limit is
 * reason enough to say so.
 */
export function crawlLimitNote(input: {
  pagesCrawled: number;
  maxPages: number | null | undefined;
  urlsDiscovered: number | null | undefined;
  sitemapUrls: number | null | undefined;
}): string | null {
  const { pagesCrawled, maxPages } = input;
  if (!maxPages || pagesCrawled < maxPages) return null;
  const found = input.urlsDiscovered ?? input.sitemapUrls;
  if (found != null && found <= pagesCrawled) return null;
  return t(
    "Denetim {count} sayfayla sınırlıydı; sitede daha fazla sayfa olabilir.",
    {
      count: maxPages,
    },
  );
}

/**
 * "Bulunan adres: 640, taranan: 500": what the crawl found against what it
 * fetched. Null for an audit from before the found count was stored.
 */
export function crawlCountLine(input: {
  pagesCrawled: number;
  urlsDiscovered?: number | null;
}): string | null {
  if (input.urlsDiscovered == null) return null;
  return t("Bulunan adres: {found}, taranan: {crawled}", {
    found: formatCount(input.urlsDiscovered),
    crawled: formatCount(input.pagesCrawled),
  });
}

/** Three-way colour band for a tier: green, amber, red. */
export function tierBand(tier: AuditTier): "good" | "fair" | "poor" {
  if (tier === "excellent") return "good";
  return tier === "poor" ? "poor" : "fair";
}

/*
 * Why a heavy category went unmeasured, as Turkish source text the caller
 * translates. Only the two heavy categories that depend on something outside
 * the crawl have a known reason; the rest return null.
 */
type GapSignals = {
  lighthouse: { errorMessage?: string | null }[];
  /** Speed testing was switched off for this audit. */
  speedOff: boolean;
  googleInspected: boolean | null;
};

function thinCategoryReason(
  category: AuditCategory,
  signals: GapSignals,
): string | null {
  if (category === "speed") {
    if (signals.speedOff) return "hız ölçümü kapalıydı";
    const errors = signals.lighthouse.map((row) => row.errorMessage ?? "");
    if (errors.some((e) => e.startsWith(LIGHTHOUSE_QUOTA_MARKER))) {
      return "PageSpeed kotası doldu";
    }
    if (errors.some((e) => e.startsWith(LIGHTHOUSE_NO_KEY_MARKER))) {
      return "PageSpeed anahtarı yok";
    }
    if (signals.lighthouse.length === 0) return "hız ölçümü yapılmadı";
    return "hız ölçümleri başarısız oldu";
  }
  if (category === "indexing" && signals.googleInspected !== true) {
    return "Search Console'dan dizin verisi alınmadı";
  }
  return null;
}

/**
 * "Hız ölçülmedi: PageSpeed kotası doldu", one translated line per heavy
 * category the score had to do without. "ölçülmedi" only when nothing in it
 * was; a speed category whose crawl-side checks ran is "mostly", or the
 * category row beside it would contradict the line.
 */
export function thinCategoryLines(
  standing: AuditStanding,
  categories: Pick<CategoryScore, "category" | "score">[],
  signals: GapSignals,
): string[] {
  if (standing.kind !== "scored") return [];
  return standing.thinCategories.map((category) => {
    const reason = thinCategoryReason(category, signals);
    const none =
      categories.find((c) => c.category === category)?.score === null;
    const values = {
      category: t(AUDIT_CATEGORY_LABEL[category]),
      reason: reason ? t(reason) : "",
    };
    if (none) {
      return reason
        ? t("{category} ölçülmedi: {reason}", values)
        : t("{category} ölçülmedi.", values);
    }
    return reason
      ? t("{category} kontrollerinin çoğu ölçülmedi: {reason}", values)
      : t("{category} kontrollerinin çoğu ölçülmedi.", values);
  });
}

type ScoredStanding = Extract<AuditStanding, { kind: "scored" }>;

/**
 * "Puan, ölçülen 142 kontrolün sonucuna göre. 38 kontrol ölçülemedi." The
 * line under the score on the screen and on the report cover.
 */
export function coverageLine(standing: ScoredStanding): string {
  const { measured, total } = standing.coverage;
  const based = t("Puan, ölçülen {count} kontrolün sonucuna göre.", {
    count: measured,
  });
  return total > measured
    ? `${based} ${t("{count} kontrol ölçülemedi.", { count: total - measured })}`
    : based;
}

/** How the score is computed, built from the thresholds above. */
export function scoreMethod(): string {
  return t(
    "Her bulgu, önemine ve etkilediği sayfa oranına göre kendi kategorisinden puan düşer; site puanı yedi kategorinin ağırlıklı ortalamasıdır. Ölçülemeyen kontroller puanı ne artırır ne düşürür. Kontrollerin ağırlıklı kapsamı {coverage} değerinin altındaysa ya da Tarama, Dizine alma, İçerik veya Hız kategorisinde ölçülen kontrollerin oranı {heavy} değerinin altındaysa puan kısmidir ve derece verilmez. Kritik bir sorun varken puan en fazla {criticalCap}, {count} veya daha fazla uyarı varken en fazla {warningsCap} olur.",
    {
      coverage: formatPercent(PROVISIONAL_COVERAGE_BELOW, 0),
      heavy: formatPercent(HEAVY_COVERAGE_BELOW, 0),
      criticalCap: CRITICAL_SCORE_CAP,
      warningsCap: WARNINGS_SCORE_CAP,
      count: MANY_WARNINGS,
    },
  );
}

/** Why the score stops where it does, when a severity cap holds it down. */
export function capVerdict(standing: ScoredStanding): string | null {
  if (standing.cappedBy === "critical") {
    return t(
      "Kritik sorun olduğu için puan en fazla {cap} olabilir. Önce kritik sorunlara bakın.",
      { cap: CRITICAL_SCORE_CAP },
    );
  }
  if (standing.cappedBy === "warnings") {
    return t(
      "{count} veya daha fazla uyarı olduğu için puan en fazla {cap} olabilir.",
      { count: MANY_WARNINGS, cap: WARNINGS_SCORE_CAP },
    );
  }
  return null;
}
