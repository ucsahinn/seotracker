import { describe, expect, it } from "vitest";
import type { SiteFacts } from "@/server/lib/audit/site-probes/types";
import { measuredSiteLevelChecks, siteLevelIssues } from "./site-level-checks";
import { unknownFacts } from "@/server/lib/audit/site-probes/site-facts-fixture";

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

const sitemapWith = (lastmod: {
  urls: number;
  withLastmod: number;
  future: number;
  futureSample: string | null;
}) => ({
  oversized: [],
  oversizedCount: 0,
  overfull: [],
  overfullCount: 0,
  lastmod,
});

describe("siteLevelIssues", () => {
  it("reports each unreadable sitemap at its own address, with why", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      sitemapProblems: {
        ...sitemapWith({
          urls: 0,
          withLastmod: 0,
          future: 0,
          futureSample: null,
        }),
        failed: [
          {
            url: "https://example.com/gone.xml",
            reason: "status",
            statusCode: 404,
          },
        ],
        failedCount: 1,
      },
    });

    expect(issues).toEqual([
      expect.objectContaining({
        issueType: "sitemap-unreadable",
        pageUrl: "https://example.com/gone.xml",
        details: { reason: "status", statusCode: 404 },
      }),
    ]);
  });

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

  it("reports a sitemap that carries no lastmod at all", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      sitemapProblems: sitemapWith({
        urls: 40,
        withLastmod: 0,
        future: 0,
        futureSample: null,
      }),
    });

    expect(issues.map((i) => i.issueType)).toEqual(["sitemap-lastmod-missing"]);
    expect(issues[0]?.details).toMatchObject({ urlCount: 40 });
  });

  /*
   * The two findings are mutually exclusive by construction -- a date in the
   * future is a date -- and reporting "no dates" alongside "this date is
   * wrong" would be a contradiction on one screen.
   */
  it("reports an impossible date instead, when there are dates", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      sitemapProblems: sitemapWith({
        urls: 40,
        withLastmod: 40,
        future: 3,
        futureSample: "2099-01-01",
      }),
    });

    expect(issues.map((i) => i.issueType)).toEqual(["sitemap-lastmod-future"]);
    expect(issues[0]?.details).toMatchObject({
      count: 3,
      example: "2099-01-01",
    });
  });

  it("stays quiet on a sitemap too small to judge", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      sitemapProblems: sitemapWith({
        urls: 4,
        withLastmod: 0,
        future: 0,
        futureSample: null,
      }),
    });

    expect(issues).toEqual([]);
  });

  /*
   * An audit that started before the field existed replays its discovery
   * step from durable storage and gets the old shape back. Absent has to
   * mean "not recorded", never "no dates".
   */
  it("stays quiet when the discovery step recorded nothing", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      sitemapProblems: {
        oversized: [],
        oversizedCount: 0,
        overfull: [],
        overfullCount: 0,
      },
    });

    expect(issues).toEqual([]);
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

describe("siteLevelIssues from site facts", () => {
  const factTypes = (facts: SiteFacts) =>
    types({ startUrl: START, siteFacts: facts });

  it("raises nothing from facts that were not measured", () => {
    expect(factTypes(unknownFacts())).toEqual([]);
  });

  it("reads security headers only off a page that answered", () => {
    const facts = unknownFacts();
    facts.start.status = 200;
    facts.start.finalUrl = START;
    facts.start.cspFrameAncestors = false;
    facts.start.xContentTypeOptions = "nosniff";
    facts.start.referrerPolicy = "no-referrer";
    expect(factTypes(facts)).toEqual([
      "missing-hsts",
      "missing-clickjacking-protection",
    ]);
  });

  it("does not ask for HSTS under a TLD every browser preloads as https-only", () => {
    const facts = unknownFacts();
    facts.start.status = 200;
    facts.start.finalUrl = "https://hono.dev/";
    facts.start.xContentTypeOptions = "nosniff";
    facts.start.referrerPolicy = "no-referrer";
    facts.start.xFrameOptions = "DENY";
    expect(factTypes(facts)).toEqual([]);
  });

  it("tells a missing page sent home from one answering 200 in place", () => {
    const home = unknownFacts();
    home.notFound = { ...home.notFound, status: 200, redirectedHome: true };
    expect(factTypes(home)).toEqual(["not-found-redirects-home"]);

    const soft = unknownFacts();
    soft.notFound = { ...soft.notFound, status: 200, redirectedHome: false };
    expect(factTypes(soft)).toEqual(["soft-404-on-missing-page"]);
  });

  it("lists blocked AI crawlers but folds them into a disallow-all", () => {
    const facts = unknownFacts();
    facts.robots = {
      status: 200,
      bytes: 40,
      hasSitemapLine: true,
      disallowAll: false,
      access: [
        { bot: "Googlebot", blocked: false },
        { bot: "GPTBot", blocked: true },
      ],
    };
    const issues = siteLevelIssues({ startUrl: START, siteFacts: facts });
    expect(issues.map((issue) => issue.issueType)).toEqual([
      "ai-crawlers-blocked",
    ]);
    expect(issues[0]?.details).toEqual({ bots: ["GPTBot"] });

    facts.robots.disallowAll = true;
    expect(factTypes(facts)).toEqual(["robots-disallow-all"]);
  });

  it("checks SPF and DMARC only on a fully resolved lookup", () => {
    const facts = unknownFacts();
    facts.dns = {
      resolved: true,
      records: [{ type: "SPF", value: "v=spf1 -all" }],
    };
    expect(factTypes(facts)).toEqual(["missing-dmarc"]);
  });

  it("grades certificate expiry by days left from the check time", () => {
    const at = (notAfter: string) => {
      const facts = unknownFacts();
      facts.certificate = { issuer: "R11", notBefore: null, notAfter };
      return factTypes(facts);
    };
    expect(at("2026-11-15T00:00:00.000Z")).toEqual(["ssl-expiring-soon"]);
    expect(at("2026-11-01T00:00:00.000Z")).toEqual(["ssl-expiring-very-soon"]);
    expect(at("2027-01-15T00:00:00.000Z")).toEqual([]);
  });
});

describe("robots.txt and sitemap checks added after the site facts", () => {
  const factTypes = (facts: SiteFacts) =>
    types({ startUrl: START, siteFacts: facts });

  it("warns when the sitemap lists another host's addresses", () => {
    const issues = siteLevelIssues({
      startUrl: START,
      sitemapProblems: {
        oversized: [],
        oversizedCount: 0,
        overfull: [],
        overfullCount: 0,
        offHost: { count: 52, sample: ["https://twin.netlify.app/"] },
      },
    });
    expect(issues.map((issue) => issue.issueType)).toEqual([
      "sitemap-off-host-urls",
    ]);
    expect(issues[0]?.details).toEqual({
      count: 52,
      sample: ["https://twin.netlify.app/"],
    });
  });

  it("says which rules kept this crawler out while letting Googlebot in", () => {
    const facts = unknownFacts();
    facts.robots.googlebotOnlyRules = ["/*?*", "/*.js"];
    expect(factTypes(facts)).toEqual(["robots-googlebot-only-paths"]);
  });

  it("records the checks as measured only when the run carried their data", () => {
    const facts = unknownFacts();
    expect(measuredSiteLevelChecks({ siteFacts: facts })).toEqual([]);
    facts.robots.googlebotOnlyRules = [];
    expect(
      measuredSiteLevelChecks({
        siteFacts: facts,
        sitemapProblems: {
          oversized: [],
          oversizedCount: 0,
          overfull: [],
          overfullCount: 0,
          offHost: { count: 0, sample: [] },
        },
      }),
    ).toEqual(["sitemap-off-host-urls", "robots-googlebot-only-paths"]);
  });
});
