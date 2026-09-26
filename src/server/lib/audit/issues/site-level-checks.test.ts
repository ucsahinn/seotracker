import { describe, expect, it } from "vitest";
import { siteLevelIssues } from "./site-level-checks";

const START = "https://example.com/";

const types = (...args: Parameters<typeof siteLevelIssues>) =>
  siteLevelIssues(...args).map((issue) => issue.issueType);

const robots = (
  overrides: Partial<Parameters<typeof siteLevelIssues>[0]["robotsFindings"]>,
) => ({
  status: 200,
  truncated: false,
  startBlocked: false,
  disallowedSitemapSample: [],
  disallowedSitemapCount: 0,
  ...overrides,
});

describe("siteLevelIssues", () => {
  it("says nothing when nothing was recorded", () => {
    // Absent findings mean the run predates them, not that the site is
    // clean. Inventing a clean bill of health from missing data is the one
    // thing this must not do.
    expect(types({ startUrl: START })).toEqual([]);
  });

  /*
   * Google's robots.txt spec: on a 5xx it "stops crawling the site" for the
   * first twelve hours, then falls back to the last good copy for thirty
   * days. One file's error is a site-wide crawl problem.
   */
  it("treats a 5xx robots.txt as a site-wide problem", () => {
    expect(
      types({ startUrl: START, robotsFindings: robots({ status: 503 }) }),
    ).toEqual(["robots-txt-server-error"]);
  });

  it("does not report a missing robots.txt, which Google reads as no rules", () => {
    expect(
      types({ startUrl: START, robotsFindings: robots({ status: 404 }) }),
    ).toEqual([]);
  });

  it("separates a request that never completed from one that answered", () => {
    expect(
      types({ startUrl: START, robotsFindings: robots({ status: null }) }),
    ).toEqual(["robots-txt-unreachable"]);
  });

  it("reports every robots finding that applies, not just the first", () => {
    expect(
      types({
        startUrl: START,
        robotsFindings: robots({
          status: null,
          truncated: true,
          startBlocked: true,
          disallowedSitemapCount: 3,
          disallowedSitemapSample: ["https://example.com/a"],
        }),
      }),
    ).toEqual([
      "robots-txt-unreachable",
      "robots-txt-truncated",
      "robots-txt-blocks-start-url",
      "sitemap-disallowed-page",
    ]);
  });

  /*
   * One issue for all oversized shards, because the finding is "your
   * sitemap is too big to read" and the fix is the same however many hit
   * it. The over-count shards get one apiece, because the URL count is the
   * number the operator acts on.
   */
  it("groups unreadable shards and itemises over-count ones", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      sitemapProblems: {
        oversized: ["https://example.com/sitemap-1.xml"],
        oversizedCount: 2,
        overfull: [
          { url: "https://example.com/sitemap-3.xml", urlCount: 60_000 },
          { url: "https://example.com/sitemap-4.xml", urlCount: 51_000 },
        ],
        overfullCount: 2,
      },
    });

    expect(issues.map((i) => i.issueType)).toEqual([
      "sitemap-too-large",
      "sitemap-too-many-urls",
      "sitemap-too-many-urls",
    ]);
    expect(issues[0]?.details).toMatchObject({ count: 2 });
    expect(issues[1]?.details).toMatchObject({ urlCount: 60_000 });
  });

  it("attaches site findings to no page, since none of them is about one", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      robotsFindings: robots({ status: 500 }),
    });

    expect(issues[0]?.pageId).toBeNull();
    expect(issues[0]?.pageUrl).toBe(START);
  });
});
