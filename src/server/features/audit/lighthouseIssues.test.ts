import { describe, expect, it } from "vitest";
import {
  lighthouseIssuesFor,
  type LighthouseMeasurement,
} from "./lighthouseIssues";

function measurement(
  overrides: Partial<LighthouseMeasurement> = {},
): LighthouseMeasurement {
  return {
    pageId: "page-1",
    pageUrl: "https://example.com/",
    lcpMs: 1200,
    cls: 0.01,
    inpMs: 120,
    seoScore: 100,
    errorMessage: null,
    ...overrides,
  };
}

const types = (rows: LighthouseMeasurement[]) =>
  lighthouseIssuesFor(rows).map((issue) => issue.issueType);

describe("lighthouseIssuesFor", () => {
  it("says nothing about a page inside every threshold", () => {
    expect(types([measurement()])).toEqual([]);
  });

  it("reports each Core Web Vital past Google's poor boundary", () => {
    expect(types([measurement({ lcpMs: 4001 })])).toEqual(["cwv-lcp-poor"]);
    expect(types([measurement({ cls: 0.26 })])).toEqual(["cwv-cls-poor"]);
    expect(types([measurement({ inpMs: 501 })])).toEqual(["cwv-inp-poor"]);
  });

  /*
   * The boundary itself is "needs improvement", not "poor". Reporting it
   * would file a finding against a page Google does not count as failing.
   */
  it("leaves a value sitting exactly on the boundary alone", () => {
    expect(
      types([measurement({ lcpMs: 4000, cls: 0.25, inpMs: 500 })]),
    ).toEqual([]);
  });

  /*
   * The one that matters most. A measurement that errored has null metrics,
   * and treating a missing number as a failing one would report every page
   * PageSpeed could not reach as slow.
   */
  it("does not turn a failed measurement into a finding about the page", () => {
    expect(
      types([
        measurement({
          errorMessage: "PageSpeed Insights timed out",
          lcpMs: null,
          cls: null,
          inpMs: null,
          seoScore: null,
        }),
      ]),
    ).toEqual([]);
  });

  it("ignores metrics the measurement did not return", () => {
    expect(
      types([measurement({ lcpMs: null, cls: null, inpMs: null })]),
    ).toEqual([]);
  });

  it("reports a Lighthouse SEO score below the good line", () => {
    expect(types([measurement({ seoScore: 89 })])).toEqual([
      "lighthouse-seo-low",
    ]);
    expect(types([measurement({ seoScore: 90 })])).toEqual([]);
  });

  it("carries the measured value so the row can show it", () => {
    const [issue] = lighthouseIssuesFor([measurement({ lcpMs: 5432.7 })]);

    expect(issue.details).toEqual({ lcpMs: 5433, thresholdMs: 4000 });
    expect(issue.pageUrl).toBe("https://example.com/");
  });
});
