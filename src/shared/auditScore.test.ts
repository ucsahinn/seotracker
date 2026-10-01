import { describe, expect, it } from "vitest";
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
    expect(critical.gains[0]?.points).toBeGreaterThan(5);
  });

  it("charges more the wider a finding spreads", () => {
    const few = scoreAudit([finding("warning", 2)], 200);
    const most = scoreAudit([finding("warning", 180)], 200);

    expect(most.score).toBeLessThan(few.score ?? 0);
  });

  /*
   * Additive: fixing one finding gives back exactly what it cost. That is
   * what lets the screen say "fix this, get +4" and be right.
   */
  it("gives back exactly what a finding cost when it is fixed", () => {
    const both = scoreAudit(
      [finding("warning", 20, "a"), finding("info", 20, "b")],
      100,
    );
    const onlyA = scoreAudit([finding("warning", 20, "a")], 100);
    const cost = both.gains.find((gain) => gain.issueType === "b")?.points ?? 0;

    // Floored on both sides, so they can differ by the rounding step.
    expect(
      Math.abs((onlyA.score ?? 0) - (both.score ?? 0) - cost),
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

  it("does not go below zero, however much is wrong", () => {
    const wreck = scoreAudit(
      Array.from({ length: 30 }, (_, index) =>
        finding("critical", 100, `c${index}`),
      ),
      100,
    );

    expect(wreck.score).toBe(0);
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
