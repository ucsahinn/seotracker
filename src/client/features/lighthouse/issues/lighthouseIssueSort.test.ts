import { describe, expect, it } from "vitest";
import { compareIssues } from "./lighthouseIssueSort";

function issue(overrides: Partial<Parameters<typeof compareIssues>[0]> = {}) {
  return {
    severity: "warning" as const,
    title: "Bir sorun",
    score: 0.5 as number | null,
    impactMs: null as number | null,
    impactBytes: null as number | null,
    ...overrides,
  };
}

describe("compareIssues", () => {
  /*
   * The reason the sort exists. "Etki" holds the millisecond and byte cost
   * of each audit, and the list arrived in whatever order the server
   * produced -- so "biggest saving first" was not a question the screen
   * could answer.
   */
  it("orders by impact, with time ahead of bytes", () => {
    const slow = issue({ impactMs: 900 });
    const quick = issue({ impactMs: 100 });

    expect(compareIssues(quick, slow, "impact")).toBeLessThan(0);
  });

  /*
   * One column, two units. Ranking a millisecond against a kilobyte is not
   * a comparison, so time leads: a render-blocking request costs every
   * visitor a wait, an oversized image costs bandwidth.
   */
  it("puts any time cost ahead of a byte-only cost", () => {
    const bytesOnly = issue({ impactBytes: 500_000 });
    const timeCost = issue({ impactMs: 50 });

    expect(compareIssues(bytesOnly, timeCost, "impact")).toBeLessThan(0);
  });

  it("falls back to bytes when neither carries a time cost", () => {
    const small = issue({ impactBytes: 1000 });
    const large = issue({ impactBytes: 90_000 });

    expect(compareIssues(small, large, "impact")).toBeLessThan(0);
  });

  it("ranks severity critical-first and breaks ties on impact", () => {
    const critical = issue({ severity: "critical", impactMs: 10 });
    const warning = issue({ severity: "warning", impactMs: 5000 });

    expect(compareIssues(critical, warning, "severity")).toBeLessThan(0);

    const smallCritical = issue({ severity: "critical", impactMs: 10 });
    const bigCritical = issue({ severity: "critical", impactMs: 5000 });
    // Within one severity the biggest saving leads.
    expect(compareIssues(bigCritical, smallCritical, "severity")).toBeLessThan(
      0,
    );
  });

  /*
   * An unscored audit must not read as a perfect one. Absent sinks whichever
   * way the column is sorted, so the caller cannot accidentally promote it.
   */
  it("sinks an unscored audit rather than treating it as zero", () => {
    const scored = issue({ score: 0 });
    const unscored = issue({ score: null });

    expect(compareIssues(unscored, scored, "score")).toBeGreaterThan(0);
    expect(compareIssues(scored, unscored, "score")).toBeLessThan(0);
  });

  it("sorts titles with Turkish collation", () => {
    const iDotless = issue({ title: "Işık" });
    const iDotted = issue({ title: "İzleme" });

    // "I" precedes "İ" in Turkish; the default comparison disagrees.
    expect(compareIssues(iDotless, iDotted, "title")).toBeLessThan(0);
  });
});
