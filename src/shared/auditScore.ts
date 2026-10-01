/**
 * One number for "how healthy is this site", that only reaches 100 when
 * there is nothing left to fix.
 *
 * The audit listed findings and never added them up, so a site with two
 * warnings and a site with two hundred both showed a list. An operator wants
 * a target: fix what it says and the number goes up, until it stops.
 *
 * Every finding costs points in proportion to how much of the site it
 * touches and how much it matters:
 *
 *   cost = weight[severity] * (FLOOR + (1 - FLOOR) * share)
 *
 * `share` is the fraction of crawled pages that carry the finding, and a
 * finding about the site as a whole (robots.txt, the sitemap) has share 1.
 * The floor is what keeps a critical problem on one page from costing
 * nothing: a single noindexed page on a 200-page site is still a problem, and
 * 0.5% of a weight would round it away.
 *
 * Two deliberate properties:
 *
 *  - **100 means empty.** Any finding at all caps the score at 99, however
 *    small its cost. A score that reads 100 with warnings still listed is a
 *    score nobody believes.
 *  - **It is additive.** Fixing one finding gives back exactly what it cost,
 *    which is what lets the screen say "fix this, get +4" and be right.
 *
 * Lives in `shared/` so the audit screen, the dashboard and the exported
 * report can never disagree about the number.
 */

import { sort } from "remeda";

type ScoredFinding = {
  issueType: string;
  severity: "critical" | "warning" | "info";
  /** Distinct pages carrying it. A site-level finding is passed as `total`. */
  pages: number;
};

const WEIGHT = { critical: 40, warning: 15, info: 3 } as const;

/** The part of a finding's cost that does not depend on how widespread it is. */
const FLOOR = 0.15;

type AuditScore = {
  /** 0-100, or null when nothing was crawled to score. */
  score: number | null;
  /** Findings by what fixing them would give back, largest first. */
  gains: {
    issueType: string;
    severity: ScoredFinding["severity"];
    points: number;
  }[];
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

export function scoreAudit(
  findings: ScoredFinding[],
  pagesCrawled: number,
): AuditScore {
  if (pagesCrawled <= 0) return { score: null, gains: [] };

  const gains = sort(
    findings
      .filter((finding) => finding.pages > 0)
      .map((finding) => {
        const share = Math.min(1, finding.pages / pagesCrawled);
        return {
          issueType: finding.issueType,
          severity: finding.severity,
          points: WEIGHT[finding.severity] * (FLOOR + (1 - FLOOR) * share),
        };
      }),
    (a, b) => b.points - a.points,
  );

  const cost = gains.reduce((sum, gain) => sum + gain.points, 0);
  const raw = Math.max(0, 100 - cost);

  return {
    // Floor, not round: 99.6 must not read as 100 while findings remain.
    score: gains.length > 0 ? Math.min(99, Math.floor(raw)) : 100,
    gains,
  };
}
