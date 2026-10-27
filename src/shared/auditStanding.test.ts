import { describe, expect, it } from "vitest";
import type { AuditCheck, CategoryScore } from "./auditBreakdown";
import { buildAuditBreakdown } from "./auditBreakdown";
import { AUDIT_CATEGORIES, type AuditCategory } from "./auditCategory";
import {
  auditCoverage,
  auditStanding,
  crawlLimitNote,
  thinCategoryLines,
} from "./auditStanding";

/** A category with `measured` of `total` checks seen; everything passed. */
const category = (
  name: AuditCategory,
  measured: number,
  total: number,
): CategoryScore => ({
  category: name,
  score: measured > 0 ? 100 : null,
  passed: measured,
  failed: 0,
  unknown: total - measured,
  impact: 0,
});

/** Every category fully measured, with `overrides` replacing some. */
const categories = (...overrides: CategoryScore[]) =>
  AUDIT_CATEGORIES.map(
    (name) =>
      overrides.find((c) => c.category === name) ?? category(name, 10, 10),
  );

const breakdown = (
  overrides: Partial<Parameters<typeof auditStanding>[0]> = {},
): Parameters<typeof auditStanding>[0] => ({
  score: 99,
  cappedBy: null,
  checks: [],
  categories: categories(),
  ...overrides,
});

const scoredStanding = (
  overrides: Partial<Parameters<typeof auditStanding>[0]>,
) => {
  const standing = auditStanding(breakdown(overrides));
  if (standing.kind !== "scored") throw new Error(standing.reason);
  return standing;
};

const cutShort: AuditCheck = {
  issueType: "crawl-rate-limited",
  category: "crawl",
  severity: "warning",
  state: "failed",
  pages: 1,
  siteLevel: true,
  points: 0,
};

describe("auditCoverage", () => {
  // Weighted like the score: half of crawl (3) and all of social (1).
  it("averages each category's measured share by its weight", () => {
    const coverage = auditCoverage([
      category("crawl", 1, 2),
      category("social", 1, 1),
    ]);

    expect(coverage).toEqual({ measured: 2, total: 3, ratio: 0.625 });
  });
});

describe("auditStanding", () => {
  it("gives no score to a failed, running or cut-short audit", () => {
    expect(auditStanding(breakdown(), "failed")).toEqual({
      kind: "withheld",
      reason: "failed",
    });
    expect(auditStanding(breakdown(), "running")).toEqual({
      kind: "withheld",
      reason: "running",
    });
    expect(auditStanding(breakdown({ checks: [cutShort] }))).toEqual({
      kind: "withheld",
      reason: "cut-short",
    });
  });

  it("is provisional below 70% coverage and final above it", () => {
    // Crawl, indexing, content and speed weigh 10 of 14. At 55% each and
    // the rest full: (5.5 + 4) / 14 = 0.68. At 60%: (6 + 4) / 14 = 0.71.
    const heavy = ["crawl", "indexing", "content", "speed"] as const;
    const at = (measured: number) =>
      scoredStanding({
        categories: categories(
          ...heavy.map((name) => category(name, measured, 100)),
        ),
      });

    expect(at(55).provisional).toBe(true);
    expect(at(55).tier).toBeNull();
    expect(at(60).provisional).toBe(false);
  });

  // 90% coverage overall, but speed was barely measured.
  it("is provisional when a heavy category is under half measured", () => {
    const standing = scoredStanding({
      categories: categories(category("speed", 4, 10)),
    });

    expect(standing.coverage.ratio).toBeGreaterThan(0.7);
    expect(standing.provisional).toBe(true);
    expect(standing.thinCategories).toEqual(["speed"]);
  });

  // Social weighs 1: a light category alone does not make it provisional.
  it("is not provisional for a light category left unmeasured", () => {
    const standing = scoredStanding({
      categories: categories(category("social", 0, 10)),
    });

    expect(standing.provisional).toBe(false);
  });

  /*
   * The owner's case: PageSpeed quota spent and Search Console not asked.
   * The score was 100 on what the audit could see and read "Mükemmel".
   */
  it("says why speed is missing when the PageSpeed quota ran out", () => {
    const real = buildAuditBreakdown([], {
      pagesCrawled: 10,
      hasLighthouse: false,
      siteFacts: null,
      googleInspected: null,
      analyticsCompared: null,
    });
    const standing = auditStanding(real);
    if (standing.kind !== "scored") throw new Error(standing.reason);

    expect(standing.score).toBe(100);
    expect(standing.provisional).toBe(true);
    expect(standing.coverage.measured).toBeLessThan(standing.coverage.total);
    expect(
      thinCategoryLines(standing, real.categories, {
        lighthouse: [{ errorMessage: "Kota doldu: sınır" }],
        speedOff: false,
        googleInspected: null,
      }),
    ).toContain("Hız kontrollerinin çoğu ölçülmedi: PageSpeed kotası doldu");
  });
});

describe("crawlLimitNote", () => {
  // The page limit was the operator's choice: a note, not a withheld score.
  it("notes a crawl that stopped at its page limit with more pages left", () => {
    const at = (sitemapUrls: number | null) =>
      crawlLimitNote({
        pagesCrawled: 100,
        maxPages: 100,
        urlsDiscovered: null,
        sitemapUrls,
      });

    expect(at(null)).toContain("100 sayfayla sınırlıydı");
    expect(at(250)).not.toBeNull();
    expect(at(80)).toBeNull();
    expect(
      crawlLimitNote({
        pagesCrawled: 40,
        maxPages: 100,
        urlsDiscovered: null,
        sitemapUrls: null,
      }),
    ).toBeNull();
  });

  it("decides on the URLs the crawl found before the sitemap's count", () => {
    const note = (urlsDiscovered: number, sitemapUrls: number) =>
      crawlLimitNote({
        pagesCrawled: 100,
        maxPages: 100,
        urlsDiscovered,
        sitemapUrls,
      });

    // The sitemap lists 80, but links led to 300 more.
    expect(note(380, 80)).not.toBeNull();
    // The sitemap overcounts (other hosts, dead entries); the crawl found all.
    expect(note(100, 900)).toBeNull();
  });
});
