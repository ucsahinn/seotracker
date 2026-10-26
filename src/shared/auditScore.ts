/**
 * One number for "how healthy is this site", that only reaches 100 when
 * there is nothing left to fix.
 *
 * The audit listed findings and never added them up, so a site with two
 * warnings and a site with two hundred both showed a list. An operator wants
 * a target: fix what it says and the number goes up, until it stops.
 *
 * Every finding has a cost in proportion to how much of the site it touches
 * and how much it matters:
 *
 *   cost = weight[severity] * (FLOOR + (1 - FLOOR) * share)
 *
 * `share` is the fraction of crawled pages that carry the finding, and a
 * finding about the site as a whole (robots.txt, the sitemap) has share 1.
 * The floor is what keeps a critical problem on one page from costing
 * nothing: a single noindexed page on a 200-page site is still a problem, and
 * 0.5% of a weight would round it away.
 *
 * Costs are charged to the finding's category (see `auditCategory`), and each
 * category scores 100 minus its costs, floored at 0. The site score is the
 * weighted average of the category scores, by `AUDIT_CATEGORY_WEIGHT`. It
 * used to be 100 minus every cost at once, which saturated: forty checks'
 * worth of warnings and infos summed past 100 and a site with no critical
 * finding and category scores of 65-94 read 0. Averaging keeps one bad
 * category from erasing six good ones, and the number stays explainable as
 * "the categories, weighted".
 *
 * Two deliberate properties:
 *
 *  - **100 means empty.** Any finding at all caps the score at 99, however
 *    small its cost. A score that reads 100 with warnings still listed is a
 *    score nobody believes.
 *  - **A fix's points are exact.** A finding's `points` is what fixing it
 *    adds to the site score: its category's gain times the category's share
 *    of the weight. That is what lets the screen say "fix this, get +4".
 *
 * Lives in `shared/` so the audit screen, the dashboard and the exported
 * report can never disagree about the number.
 */

import { sort } from "remeda";
import { resolveIssueSeverity } from "./audit-issues";
import {
  AUDIT_CATEGORIES,
  AUDIT_CATEGORY_WEIGHT,
  auditCategoryOf,
  type AuditCategory,
} from "./auditCategory";

export type ScoredFinding = {
  issueType: string;
  severity: "critical" | "warning" | "info";
  /** Distinct pages carrying it. A site-level finding is passed as `total`. */
  pages: number;
  /** About the whole site rather than some pages (robots.txt, a header). */
  siteLevel?: boolean;
};

const WEIGHT = { critical: 40, warning: 15, info: 3 } as const;

/** How much each severity weighs, for rankings that must agree with the score. */
export const SEVERITY_WEIGHT = WEIGHT;

/** The part of a finding's cost that does not depend on how widespread it is. */
const FLOOR = 0.15;

/*
 * Nice-to-haves whose title says "(isteğe bağlı)". Missing llms.txt is a
 * site-level info, which charged it as if every page carried it: it
 * outranked real one-page warnings on a large site. An optional item costs
 * the floor only, the least any real finding can cost.
 */
const OPTIONAL = new Set(["missing-llms-txt"]);

type CategoryResult = {
  category: AuditCategory;
  /** 0-100, or null when the category was left out of the average. */
  score: number | null;
  /** Points its findings take off the site score. */
  impact: number;
};

type AuditScore = {
  /** 0-100, or null when nothing was crawled to score. */
  score: number | null;
  /** Findings by what fixing them would add to the site score, largest first. */
  gains: {
    issueType: string;
    severity: ScoredFinding["severity"];
    points: number;
  }[];
  categories: CategoryResult[];
};

/*
 * Where a site score changes meaning, defined once so the audit screen, the
 * dashboard and the exported report colour and word the same number the same
 * way. 90/70/50: the screen's verdict used to switch at 75 and its ring at 60
 * while the report used 70 and 50, so one score read "good" on screen and
 * "fair" in the PDF. The report's 70 won because its wording ("temel sağlam")
 * does not depend on the exact cut. Not the Lighthouse bands (see
 * `lighthouseBand`), which are Google's and apply to a different score.
 */
const AUDIT_EXCELLENT_FROM = 90;
const AUDIT_GOOD_FROM = 70;
const AUDIT_FAIR_FROM = 50;

/** Four-way tier for wording. 100 ("nothing left to fix") is the caller's. */
export function auditScoreTier(
  score: number,
): "excellent" | "good" | "fair" | "poor" {
  if (score >= AUDIT_EXCELLENT_FROM) return "excellent";
  if (score >= AUDIT_GOOD_FROM) return "good";
  if (score >= AUDIT_FAIR_FROM) return "fair";
  return "poor";
}

/** Three-way band for colour: green, amber, red. */
export function auditScoreBand(score: number): "good" | "fair" | "poor" {
  const tier = auditScoreTier(score);
  if (tier === "excellent") return "good";
  return tier === "poor" ? "poor" : "fair";
}

/** Floor, not round: 99.6 must not read as 100 while findings remain. */
const capped = (raw: number, hasFindings: boolean) =>
  hasFindings ? Math.min(99, Math.floor(raw)) : 100;

const categoryRaw = (cost: number) => Math.max(0, 100 - cost);

/**
 * `measured` names the categories that had at least one check measured;
 * a category outside it with no finding is left out of the average rather
 * than counted as a clean 100. Omitted, every category counts, which is
 * also what happens once anything is crawled: each category has checks
 * that run on any fetched page.
 */
export function scoreAudit(
  findings: ScoredFinding[],
  pagesCrawled: number,
  measured?: ReadonlySet<AuditCategory>,
): AuditScore {
  if (pagesCrawled <= 0) {
    return {
      score: null,
      gains: [],
      categories: AUDIT_CATEGORIES.map((category) => ({
        category,
        score: null,
        impact: 0,
      })),
    };
  }

  const costed = findings
    .filter((finding) => finding.pages > 0)
    .map((finding) => {
      const share = OPTIONAL.has(finding.issueType)
        ? 0
        : Math.min(1, finding.pages / pagesCrawled);
      return {
        ...finding,
        category: auditCategoryOf(finding.issueType),
        cost: WEIGHT[finding.severity] * (FLOOR + (1 - FLOOR) * share),
      };
    });

  const costOf = new Map<AuditCategory, number>();
  for (const finding of costed) {
    costOf.set(
      finding.category,
      (costOf.get(finding.category) ?? 0) + finding.cost,
    );
  }
  const included = AUDIT_CATEGORIES.filter(
    (category) => costOf.has(category) || (measured?.has(category) ?? true),
  );
  const totalWeight = included.reduce(
    (sum, category) => sum + AUDIT_CATEGORY_WEIGHT[category],
    0,
  );
  // Share of the site score one category point is worth.
  const worth = (category: AuditCategory) =>
    totalWeight > 0 ? AUDIT_CATEGORY_WEIGHT[category] / totalWeight : 0;

  const raw = included.reduce(
    (sum, category) =>
      sum + categoryRaw(costOf.get(category) ?? 0) * worth(category),
    0,
  );

  const gains = sort(
    costed.map((finding) => {
      const total = costOf.get(finding.category) ?? 0;
      return {
        issueType: finding.issueType,
        severity: finding.severity,
        // Exact even when the category is floored at 0: a fix that leaves
        // the category still below zero gives back less than its cost.
        points:
          (categoryRaw(total - finding.cost) - categoryRaw(total)) *
          worth(finding.category),
      };
    }),
    (a, b) => b.points - a.points,
  );

  return {
    score: included.length === 0 ? null : capped(raw, costed.length > 0),
    gains,
    categories: AUDIT_CATEGORIES.map((category) => {
      const cost = costOf.get(category);
      if (!included.includes(category)) {
        return { category, score: null, impact: 0 };
      }
      return {
        category,
        score: capped(categoryRaw(cost ?? 0), cost !== undefined),
        impact: (100 - categoryRaw(cost ?? 0)) * worth(category),
      };
    }),
  };
}

/**
 * Stored issue rows as scored findings: distinct pages per issue type, and a
 * finding with no page (robots.txt, the sitemap) counts as every page. The
 * one place this grouping lives, so the score card, the report, the history
 * and the MCP summary all score the same rows the same way.
 */
export function findingsFromIssues(
  issues: { issueType: string; severity: string; pageId: string | null }[],
  pagesCrawled: number,
): ScoredFinding[] {
  const byType = new Map<
    string,
    { severity: ScoredFinding["severity"]; pages: Set<string>; site: boolean }
  >();
  for (const issue of issues) {
    const entry = byType.get(issue.issueType) ?? {
      severity: resolveIssueSeverity(issue),
      pages: new Set<string>(),
      site: false,
    };
    if (issue.pageId) entry.pages.add(issue.pageId);
    else entry.site = true;
    byType.set(issue.issueType, entry);
  }
  return [...byType].map(([issueType, entry]) => ({
    issueType,
    severity: entry.severity,
    pages: entry.site ? pagesCrawled : entry.pages.size,
    siteLevel: entry.site,
  }));
}
