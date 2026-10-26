import { describe, expect, it } from "vitest";
import { AUDIT_ISSUE_TYPES } from "./audit-issues";
import {
  AUDIT_CATEGORIES,
  auditCategoryOf,
  type AuditCategory,
} from "./auditCategory";
import { auditScoreBand, auditScoreTier, scoreAudit } from "./auditScore";

const finding = (
  severity: "critical" | "warning" | "info",
  pages: number,
  issueType = `${severity}-${pages}`,
) => ({ issueType, severity, pages });

describe("scoreAudit", () => {
  /*
   * The whole point of a target: fix everything it lists and the number
   * reaches the top. A site that has nothing left to fix must read 100.
   */
  it("gives 100 to a site with no findings", () => {
    expect(scoreAudit([], 200).score).toBe(100);
  });

  /*
   * And the converse, which is what makes 100 believable. A finding that
   * costs 0.45 points would round to 100 and leave a warning listed under a
   * perfect score -- so any finding at all caps it at 99.
   */
  it("never reads 100 while a finding remains, however small", () => {
    const tiny = scoreAudit([finding("info", 1)], 10_000);

    expect(tiny.score).toBe(99);
  });

  // An optional nice-to-have must never outrank a real problem on one page.
  it("charges an optional site-wide item less than a one-page warning", () => {
    const { gains } = scoreAudit(
      [
        { ...finding("info", 200, "missing-llms-txt"), siteLevel: true },
        finding("warning", 1, "robots-missing-sitemap-line"),
      ],
      200,
    );

    expect(gains.map((gain) => gain.issueType)).toEqual([
      "robots-missing-sitemap-line",
      "missing-llms-txt",
    ]);
  });

  it("scores nothing when nothing was crawled", () => {
    expect(scoreAudit([finding("critical", 1)], 0).score).toBeNull();
  });

  /*
   * One noindexed page on a 200-page site is still a critical problem, and
   * 0.5% of the weight would round it to nothing. The floor is what keeps it
   * visible.
   */
  it("charges a critical on one page more than a warning on one page", () => {
    const critical = scoreAudit([finding("critical", 1)], 200);
    const warning = scoreAudit([finding("warning", 1)], 200);

    expect(critical.score).toBeLessThan(warning.score ?? 0);
    expect(critical.categories[0]?.score).toBeLessThan(95);
  });

  it("charges more the wider a finding spreads", () => {
    const few = scoreAudit([finding("warning", 2)], 200);
    const most = scoreAudit([finding("warning", 180)], 200);

    expect(most.score).toBeLessThan(few.score ?? 0);
  });

  /*
   * A fix's points are what it adds to the site score. That is what lets
   * the screen say "fix this, get +4" and be right.
   */
  it("gives back what a finding's points say when it is fixed", () => {
    const both = scoreAudit(
      [finding("warning", 20, "missing-h1"), finding("info", 20, "a")],
      100,
    );
    const onlyA = scoreAudit([finding("info", 20, "a")], 100);
    const points =
      both.gains.find((gain) => gain.issueType === "missing-h1")?.points ?? 0;

    expect(points).toBeGreaterThan(0);
    // Floored on both sides, so they can differ by the rounding step.
    expect(
      Math.abs((onlyA.score ?? 0) - (both.score ?? 0) - points),
    ).toBeLessThan(1.01);
  });

  it("lists what to fix first: the most points back at the top", () => {
    const { gains } = scoreAudit(
      [
        finding("info", 100, "small"),
        finding("critical", 100, "big"),
        finding("warning", 100, "middle"),
      ],
      100,
    );

    expect(gains.map((gain) => gain.issueType)).toEqual([
      "big",
      "middle",
      "small",
    ]);
  });

  it("floors a category at zero, however much is wrong in it", () => {
    const wreck = scoreAudit(
      Array.from({ length: 30 }, (_, index) =>
        finding("critical", 100, `c${index}`),
      ),
      100,
    );

    // Unregistered types file under crawl; the other categories are clean.
    expect(wreck.categories.find((c) => c.category === "crawl")?.score).toBe(0);
    expect(wreck.score).toBeGreaterThan(0);
  });

  /*
   * The bug this formula replaced: forty checks' worth of warnings and
   * infos summed past 100 and a site with no critical finding and category
   * scores of 65-94 read 0. Spread the same load over the categories and
   * the site score must stay with them.
   */
  it("keeps a site with no critical finding near its category scores", () => {
    const types = (category: AuditCategory) =>
      Object.keys(AUDIT_ISSUE_TYPES).filter(
        (issueType) => auditCategoryOf(issueType) === category,
      );
    const findings = AUDIT_CATEGORIES.flatMap((category, index) => [
      ...types(category)
        .slice(0, index < 2 ? 2 : 1)
        .map((issueType) => finding("warning", 100, issueType)),
      ...types(category)
        .slice(2, 5)
        .map((issueType) => finding("info", 100, issueType)),
    ]);

    const scored = scoreAudit(findings, 100);
    const lowest = Math.min(...scored.categories.map((c) => c.score ?? 100));

    expect(findings.length).toBeGreaterThanOrEqual(25);
    expect(lowest).toBeGreaterThanOrEqual(50);
    expect(scored.score).toBeGreaterThanOrEqual(lowest);
  });

  it("leaves a category with nothing measured out of the average", () => {
    const measured = new Set<AuditCategory>(["crawl"]);
    const scored = scoreAudit([finding("warning", 100, "x")], 100, measured);

    expect(scored.score).toBe(85);
    expect(
      scored.categories.find((c) => c.category === "speed")?.score,
    ).toBeNull();
  });
});

describe("auditScoreTier and auditScoreBand", () => {
  it.each([
    [100, "excellent", "good"],
    [90, "excellent", "good"],
    [89, "good", "fair"],
    [70, "good", "fair"],
    [69, "fair", "fair"],
    [50, "fair", "fair"],
    [49, "poor", "poor"],
    [0, "poor", "poor"],
  ] as const)("scores %i as %s / %s", (score, tier, band) => {
    expect(auditScoreTier(score)).toBe(tier);
    expect(auditScoreBand(score)).toBe(band);
  });
});
