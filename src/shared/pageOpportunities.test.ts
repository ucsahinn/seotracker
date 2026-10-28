import { describe, expect, it } from "vitest";
import { pageOpportunities, perMonth } from "./pageOpportunities";

/** Five queries per band, enough impressions for each band to be a curve point. */
function curveQueries(ctrByPosition: Array<[number, number]>) {
  return ctrByPosition.flatMap(([position, ctr]) =>
    Array.from({ length: 5 }, (_, i) => ({
      key: `curve ${position} ${i}`,
      clicks: Math.round(1000 * ctr),
      impressions: 1000,
      ctr,
      position,
    })),
  );
}

// Site CTR: #1 30%, #2-3 15%, #4-5 8%, #6-10 4%, #11-20 1%.
const SITE = curveQueries([
  [1, 0.3],
  [2, 0.15],
  [4.5, 0.08],
  [8, 0.04],
  [15, 0.01],
]);

const qp = (
  page: string,
  query: string,
  position: number,
  impressions: number,
  clicks: number,
) => ({
  page,
  query,
  position,
  impressions,
  clicks,
  ctr: clicks / impressions,
});

function pageRow(page: string, rows: ReturnType<typeof qp>[]) {
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const position =
    rows.reduce((s, r) => s + r.position * r.impressions, 0) / impressions;
  return {
    key: page,
    clicks,
    impressions,
    ctr: clicks / impressions,
    position,
  };
}

/**
 * The curve is read from query rows; only the brand test feeds the page's own
 * queries into it, so the other expectations stay on the fixed curve above.
 */
function run(
  rows: ReturnType<typeof qp>[],
  brandTerms: string[] = [],
  inCurve = false,
) {
  const pages = [...new Set(rows.map((r) => r.page))].map((page) =>
    pageRow(
      page,
      rows.filter((r) => r.page === page),
    ),
  );
  return pageOpportunities({
    days: 28,
    queries: inCurve
      ? [...SITE, ...rows.map((r) => ({ ...r, key: r.query }))]
      : SITE,
    queryPages: rows,
    pages,
    brandTerms,
  });
}

describe("pageOpportunities", () => {
  it("retains every contributing query on an opportunity page", () => {
    const queries = Array.from({ length: 15 }, (_, i) =>
      qp("/all", `query ${i}`, 8, 1000, 10),
    );
    const page = run(queries).pages[0];
    expect(page?.queryCount).toBe(15);
    expect(page?.queries).toHaveLength(15);
    expect(page?.otherQueryGain).toBe(0);
  });
  it("keeps mixed target coverage separate from genuine measured zero", () => {
    const rows = [
      qp("/known", "supported", 5, 1000, 40),
      qp("/unknown", "unsupported", 8, 1000, 10),
    ];
    const result = pageOpportunities({
      days: 28,
      queries: curveQueries([[2, 0.15]]),
      queryPages: rows,
      pages: rows.map((row) => pageRow(row.page, [row])),
      brandTerms: [],
    });
    expect(result.pages.map((page) => page.page)).toEqual(["/known"]);
    expect(result.noGainPages).toBe(0);
    expect(result.reasons.insufficientTargetCurve).toBe(1);
  });
  it("compares mixed positions against their impression-weighted supported curve, not the mean position band", () => {
    const result = run([
      qp("/mixed", "head", 2, 1000, 80),
      qp("/mixed", "tail", 8, 1000, 10),
    ]);
    expect(result.pages[0].siteCtr).toBeCloseTo(0.095);
    expect(result.pages[0].nonBrandCtr).toBeCloseTo(0.045);
  });

  it("does not call absent query pairs a measured zero opportunity", () => {
    const result = pageOpportunities({
      days: 28,
      queries: SITE,
      queryPages: [],
      pages: [pageRow("/missing", [qp("/missing", "hidden", 8, 1000, 10)])],
      brandTerms: [],
    });
    expect(result.noGainPages).toBe(0);
    expect(result.reasons.missingQueryPairs).toBe(1);
  });

  it("keeps the top ten allocated queries and the labelled remainder equal to the page cap", () => {
    const result = run(
      Array.from({ length: 11 }, (_, i) =>
        qp("/many", `query ${i}`, 8, 1000, 10),
      ),
    );
    const page = result.pages[0];
    expect(page.queryCount).toBe(11);
    expect(
      page.queries.reduce((sum, query) => sum + (query.allocatedGain ?? 0), 0) +
        (page.otherQueryGain ?? 0),
    ).toBe(page.gain);
    expect(
      page.queries.reduce((sum, query) => sum + (query.gainPerMonth ?? 0), 0) +
        (page.otherQueryGainPerMonth ?? 0),
    ).toBe(perMonth(page.gain, 28));
    expect(
      Object.values(page.gainByWork).reduce((sum, gain) => sum + gain, 0),
    ).toBe(page.gain);
  });
  it("estimates each kind of work against the site's own curve", () => {
    const result = run([
      // Page one, clicked far below the 15% the site earns at #2: title work.
      qp("/snippet", "a", 2, 1000, 50),
      // On page one, one band up: #7 aims at #4-5 (8%).
      qp("/page1", "b", 7, 1000, 40),
      // Page two is estimated for page one (4% at #6-10).
      qp("/page2", "c", 15, 1000, 10),
      qp("/deep", "d", 30, 1000, 0),
    ]);
    const byPage = Object.fromEntries(result.pages.map((p) => [p.page, p]));
    expect(byPage["/snippet"]).toMatchObject({ work: "snippet", gain: 100 });
    expect(byPage["/page1"]).toMatchObject({ work: "page1", gain: 40 });
    expect(byPage["/page2"]).toMatchObject({ work: "page2", gain: 30 });
    expect(byPage["/deep"]).toMatchObject({ work: "deep", gain: 10 });
    // Largest gain first.
    expect(result.pages.map((p) => p.page)).toEqual([
      "/snippet",
      "/page1",
      "/page2",
      "/deep",
    ]);
  });

  it("leaves out a top page that is already clicked normally", () => {
    const result = run([
      qp("/", "home", 1, 5000, 1600),
      qp("/page1", "b", 7, 1000, 40),
    ]);
    expect(result.pages.map((p) => p.page)).toEqual(["/page1"]);
    expect(result.noGainPages).toBe(1);
  });

  it("keeps brand queries out of the curve and out of the gain", () => {
    const rows = [
      // The brand name clicks at 60% at #1 and drags the #1 band up.
      ...Array.from({ length: 5 }, (_, i) =>
        qp("/", `ornek site ${i}`, 1, 20_000, 12_000),
      ),
      // An informational post at #1 with a healthy 20%.
      qp("/blog/post", "how to wash", 1, 1000, 200),
    ];
    const withoutTerms = run(rows, [], true);
    expect(withoutTerms.pages.map((p) => p.page)).toContain("/blog/post");

    const withTerms = run(rows, ["ornek"], true);
    expect(withTerms.curve).toBe("nonBrand");
    expect(withTerms.pages).toEqual([]);
  });

  it("sums a page's queries and names the work that holds most of it", () => {
    const result = run([
      qp("/mixed", "a", 2, 1000, 50), // snippet +100
      qp("/mixed", "b", 4, 1000, 60), // page1, #4 aims at #2-3: +90
    ]);
    expect(result.pages[0]).toMatchObject({
      gain: 190,
      work: "snippet",
      gainByWork: { snippet: 100, page1: 90, page2: 0, deep: 0 },
    });
    expect(result.pages[0]?.queries.map((q) => q.query)).toEqual(["a", "b"]);
  });
});

describe("page cap", () => {
  /*
   * Query gains are summed per page, then capped per group of queries that
   * would move to the same band. Three queries at #7-9 aim at #4-5 (8%):
   * "a" +40 one band up, "b" a snippet gap +30, while "c" already clicks at
   * 15%. The group of 3000 impressions tops out at 240 - 200 = 40.
   */
  it("caps a group of queries at its impressions times the target CTR", () => {
    const result = run([
      qp("/p", "a", 7, 1000, 40),
      qp("/p", "b", 8, 1000, 10),
      qp("/p", "c", 9, 1000, 150),
    ]);
    expect(result.pages[0]).toMatchObject({ gain: 40, capped: true });
  });

  /*
   * A page at #2 on its head query, clicked well, and #15 on three others.
   * Its average position (5) put the whole page one band up at #2-3, where
   * the head query's clicks already exceed the cap, so the tail's upside was
   * zeroed and the page vanished.
   */
  it("keeps the tail's upside on a page whose head query ranks at the top", () => {
    const result = run([
      qp("/guide", "head", 2, 10_000, 3000),
      qp("/guide", "tail a", 15, 1000, 10),
      qp("/guide", "tail b", 15, 1000, 10),
      qp("/guide", "tail c", 15, 1000, 10),
    ]);
    // Each tail query at page one's 4%: +30.
    expect(result.pages[0]).toMatchObject({
      page: "/guide",
      gain: 90,
      capped: false,
    });
  });
});

describe("perMonth", () => {
  it("scales a window's gain to thirty days", () => {
    expect(perMonth(280, 28)).toBe(300);
    expect(perMonth(70, 7)).toBe(300);
    expect(perMonth(10, 0)).toBe(0);
  });
});
