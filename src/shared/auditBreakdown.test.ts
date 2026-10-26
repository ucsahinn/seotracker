import { describe, expect, it } from "vitest";
import { unknownFacts } from "@/server/lib/audit/site-probes/site-facts-fixture";
import { buildAuditBreakdown, type CheckContext } from "./auditBreakdown";

const ctx = (overrides: Partial<CheckContext> = {}): CheckContext => ({
  pagesCrawled: 10,
  hasLighthouse: false,
  siteFacts: null,
  googleInspected: null,
  analyticsCompared: null,
  ...overrides,
});

const stateOf = (
  breakdown: ReturnType<typeof buildAuditBreakdown>,
  issueType: string,
) => breakdown.checks.find((check) => check.issueType === issueType)?.state;

describe("buildAuditBreakdown", () => {
  it("fails a check with a finding and passes a measured one without", () => {
    const breakdown = buildAuditBreakdown(
      [{ issueType: "missing-title", severity: "critical", pages: 2 }],
      ctx(),
    );

    expect(stateOf(breakdown, "missing-title")).toBe("failed");
    expect(stateOf(breakdown, "missing-h1")).toBe("passed");
  });

  /*
   * The point of a third state: a speed check with no speed run, or a
   * security header check on an audit that never probed the site, did not
   * pass. Reading it as passed would be a false all-clear.
   */
  it("leaves checks whose data was never measured unknown", () => {
    const breakdown = buildAuditBreakdown([], ctx());

    expect(stateOf(breakdown, "cwv-lcp-poor")).toBe("unknown");
    expect(stateOf(breakdown, "missing-hsts")).toBe("unknown");
    expect(stateOf(breakdown, "google-soft-404")).toBe("unknown");
  });

  /*
   * A recorded check passes only where this audit wrote down that it
   * measured it: an older audit, an audit with the option off, or a
   * Lighthouse run that never reported that audit leaves it unknown.
   */
  it("passes a recorded check only when the audit recorded measuring it", () => {
    const facts = unknownFacts();
    expect(
      stateOf(
        buildAuditBreakdown([], ctx({ siteFacts: facts, hasLighthouse: true })),
        "lh-render-blocking",
      ),
    ).toBe("unknown");

    facts.measuredChecks = ["lh-render-blocking", "cwv-lcp-needs-improvement"];
    const breakdown = buildAuditBreakdown(
      [{ issueType: "cwv-lcp-poor", severity: "warning", pages: 1 }],
      ctx({ siteFacts: facts, hasLighthouse: true }),
    );
    expect(stateOf(breakdown, "lh-render-blocking")).toBe("passed");
    expect(stateOf(breakdown, "broken-external-link")).toBe("unknown");
    // The poor finding replaces the band below it; that one did not pass.
    expect(stateOf(breakdown, "cwv-lcp-needs-improvement")).toBe("unknown");
  });

  it("passes the GA4 id check only when the ids were actually compared", () => {
    expect(
      stateOf(buildAuditBreakdown([], ctx()), "analytics-id-mismatch"),
    ).toBe("unknown");
    expect(
      stateOf(
        buildAuditBreakdown([], ctx({ analyticsCompared: true })),
        "analytics-id-mismatch",
      ),
    ).toBe("passed");
  });

  it("passes a site-fact check only when that fact was measured", () => {
    const facts = unknownFacts();
    facts.start.status = 200;
    facts.start.finalUrl = "https://example.com/";

    const breakdown = buildAuditBreakdown([], ctx({ siteFacts: facts }));

    expect(stateOf(breakdown, "missing-hsts")).toBe("passed");
    expect(stateOf(breakdown, "slow-ttfb")).toBe("unknown");
    expect(stateOf(breakdown, "ssl-expiring-soon")).toBe("unknown");
  });

  // Headers read off a firewall's 403 are not the site's headers.
  it("leaves header checks unknown on a start page that answered 403", () => {
    const facts = unknownFacts();
    facts.start.status = 403;
    facts.start.finalUrl = "https://example.com/";
    facts.start.htmlBytes = 9000;

    const breakdown = buildAuditBreakdown([], ctx({ siteFacts: facts }));

    expect(stateOf(breakdown, "missing-x-content-type-options")).toBe(
      "unknown",
    );
    expect(stateOf(breakdown, "missing-hsts")).toBe("unknown");
    expect(stateOf(breakdown, "no-compression")).toBe("unknown");
  });

  it("does not pass HSTS on a site served over plain http", () => {
    const facts = unknownFacts();
    facts.start.status = 200;
    facts.start.finalUrl = "http://example.com/";

    const breakdown = buildAuditBreakdown([], ctx({ siteFacts: facts }));

    expect(stateOf(breakdown, "missing-hsts")).toBe("unknown");
    expect(stateOf(breakdown, "missing-referrer-policy")).toBe("passed");
  });

  it("leaves the robots checks unknown when robots.txt answered 503", () => {
    const facts = unknownFacts();
    facts.robots.status = 503;

    const breakdown = buildAuditBreakdown([], ctx({ siteFacts: facts }));

    expect(stateOf(breakdown, "robots-disallow-all")).toBe("unknown");
    expect(stateOf(breakdown, "robots-missing-sitemap-line")).toBe("unknown");
  });

  it("does not pass a check an audit from before it never ran", () => {
    const breakdown = buildAuditBreakdown([], ctx({ siteFacts: null }));

    expect(stateOf(breakdown, "twitter-card-missing")).toBe("unknown");
    expect(stateOf(breakdown, "near-duplicate-content")).toBe("unknown");
    expect(stateOf(breakdown, "missing-h1")).toBe("passed");
  });

  it("does not pass the 30-day certificate check when the 14-day one failed", () => {
    const facts = unknownFacts();
    facts.certificate.notAfter = "2026-11-01T00:00:00.000Z";

    const breakdown = buildAuditBreakdown(
      [
        {
          issueType: "ssl-expiring-very-soon",
          severity: "critical",
          pages: 10,
        },
      ],
      ctx({ siteFacts: facts }),
    );

    expect(stateOf(breakdown, "ssl-expiring-soon")).toBe("unknown");
  });

  it("scores each category from its own findings only", () => {
    const breakdown = buildAuditBreakdown(
      [{ issueType: "missing-hsts", severity: "warning", pages: 10 }],
      ctx(),
    );
    const security = breakdown.categories.find(
      (c) => c.category === "security",
    );
    const content = breakdown.categories.find((c) => c.category === "content");

    // A warning on every page costs its category its full weight of 15,
    // and the site score security's share of the weight: 15 * 1.5 / 14.
    expect(security?.score).toBe(85);
    expect(security?.impact).toBeCloseTo((15 * 1.5) / 14);
    expect(content?.score).toBe(100);
    expect(breakdown.score).toBe(98);
  });

  it("has no score for a category with nothing measured", () => {
    const breakdown = buildAuditBreakdown([], ctx({ pagesCrawled: 0 }));

    expect(breakdown.categories.every((c) => c.score === null)).toBe(true);
    expect(breakdown.counters.passed).toBe(0);
  });

  it("counts critical failures as errors and the rest as opportunities", () => {
    const { counters } = buildAuditBreakdown(
      [
        { issueType: "missing-title", severity: "critical", pages: 1 },
        { issueType: "missing-h1", severity: "warning", pages: 1 },
        { issueType: "title-too-long", severity: "info", pages: 1 },
      ],
      ctx(),
    );

    expect(counters.errors).toBe(1);
    expect(counters.opportunities).toBe(2);
  });
});
