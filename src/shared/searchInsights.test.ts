/* eslint-disable max-lines -- one fixture per insight rule, beside the module it tests (which carries the same exemption) */
import { describe, expect, it } from "vitest";
import {
  appearedOnlyIn,
  brandSplit,
  buildInsights,
  buildTodo,
  contentDecay,
  ctrCurve,
  detectAnomalies,
  expectedCtr,
  foldText,
  isBrandQuery,
  isLongTailQuery,
  isQuestionQuery,
  movers,
  positionBucketFor,
  scaleThreshold,
  segmentGaps,
  strikingDistance,
  suggestBrandTerms,
  underperformingSnippets,
  zeroClickPages,
  type DailyValue,
  type MetricRow,
  type SearchInsights,
} from "./searchInsights";

const row = (
  key: string,
  clicks: number,
  impressions: number,
  position: number,
): MetricRow => ({
  key,
  clicks,
  impressions,
  ctr: impressions > 0 ? clicks / impressions : 0,
  position,
});

/** Five queries per band so every band is "sufficient" at 500 impressions. */
function healthyCurveRows(): MetricRow[] {
  const bands: Array<[number, number]> = [
    [1.2, 0.3],
    [2.5, 0.15],
    [4.5, 0.08],
    [8, 0.03],
    [15, 0.01],
  ];
  return bands.flatMap(([position, ctr], b) =>
    Array.from({ length: 5 }, (_, i) =>
      row(`band${b}-q${i}`, Math.round(200 * ctr), 200, position),
    ),
  );
}

describe("thresholds", () => {
  it("scale a 28-day threshold to the window shown", () => {
    expect(scaleThreshold(50, 28)).toBe(50);
    expect(scaleThreshold(50, 7)).toBe(13);
    expect(scaleThreshold(50, 92)).toBe(164);
  });
});

describe("site CTR curve", () => {
  it("gives an expected CTR only for bands with enough queries and impressions", () => {
    const curve = ctrCurve(
      [...healthyCurveRows(), row("lonely", 1, 900, 30)],
      500,
    );
    expect(expectedCtr(curve, "2-3")).toBeCloseTo(0.15);
    const thin = ctrCurve([row("a", 5, 100, 2)], 500);
    // One query in the band: no curve point, and nothing interpolated.
    expect(expectedCtr(thin, "2-3")).toBeNull();
  });
});

describe("striking distance", () => {
  const curve = ctrCurve(healthyCurveRows(), 500);

  it("selects by the query's own position and names its best page", () => {
    const result = strikingDistance(
      [
        row("yorgan", 2, 400, 7.4),
        row("top", 50, 400, 2.1),
        row("thin", 0, 10, 9),
      ],
      [
        {
          query: "yorgan",
          page: "/a",
          clicks: 1,
          impressions: 300,
          ctr: 0,
          position: 9,
        },
        {
          query: "yorgan",
          page: "/b",
          clicks: 1,
          impressions: 100,
          ctr: 0,
          position: 6,
        },
      ],
      curve,
      50,
    );
    expect(result.total).toBe(1);
    expect(result.rows[0]).toMatchObject({
      query: "yorgan",
      page: "/b",
      pageCount: 2,
      // One band up from 7.4 is "4-5" (0.08): 32 clicks; 2 held.
      potentialClicks: 30,
    });
  });

  it("totals the gain over every striking query, not only the listed hundred", () => {
    const queries = Array.from({ length: 150 }, (_, i) =>
      row(`q${i}`, 0, 100, 7),
    );
    const result = strikingDistance(queries, [], curve, 50);
    expect(result.rows).toHaveLength(100);
    expect(result.total).toBe(150);
    // One band up from 7 is "4-5" (8%): 8 clicks each.
    expect(result.totalGain).toBe(150 * 8);
  });

  it("leaves brand queries out, as snippets and Opportunities do", () => {
    const result = strikingDistance(
      [row("ornek yorgan", 2, 400, 7), row("yorgan", 2, 400, 7)],
      [],
      curve,
      50,
      ["ornek"],
    );
    expect(result.rows.map((r) => r.query)).toEqual(["yorgan"]);
  });

  it("leaves the gain unknown when the site has no data at the target band", () => {
    const result = strikingDistance(
      [row("q", 0, 100, 12)],
      [],
      ctrCurve([], 500),
      50,
    );
    expect(result.rows[0]?.potentialClicks).toBeNull();
  });
});

describe("under-performing snippets", () => {
  it("flags a first-page query far below its band's site CTR, and not a healthy one", () => {
    const queries = [
      ...healthyCurveRows(),
      row("weak", 2, 1000, 2.4),
      row("fine", 140, 1000, 2.4),
    ];
    const snippets = underperformingSnippets({
      queries,
      queryPages: [],
      curve: { all: ctrCurve(queries, 500), brand: null, nonBrand: null },
      brandTerms: [],
      minImpressions: 200,
    });
    expect(snippets.map((s) => s.query)).toEqual(["weak"]);
    // Band "2-3" holds the five curve queries plus both: 292 / 3000 clicks.
    expect(snippets[0]?.gainClicks).toBe(Math.round(1000 * (292 / 3000) - 2));
  });
});

describe("movers and new/lost", () => {
  it("ranks the biggest click changes and ignores small ones", () => {
    const result = movers(
      {
        rows: [
          row("up", 40, 400, 3),
          row("down", 5, 300, 9),
          row("flat", 20, 300, 4),
        ],
        truncated: false,
      },
      {
        rows: [
          row("up", 10, 300, 6),
          row("down", 30, 300, 5),
          row("flat", 19, 300, 4),
        ],
        truncated: false,
      },
      10,
    );
    expect(result.growing.map((r) => r.key)).toEqual(["up"]);
    expect(result.declining.map((r) => [r.key, r.clickChange])).toEqual([
      ["down", -25],
    ]);
  });

  it("does not read a row missing from a truncated period as zero", () => {
    const result = movers(
      { rows: [row("only-now", 40, 400, 3)], truncated: false },
      { rows: [], truncated: true },
      10,
    );
    expect(result.growing).toEqual([]);
    expect(result.complete).toBe(false);
  });

  it("calls a query new only against a complete earlier table", () => {
    const now = { rows: [row("new", 2, 80, 9)], truncated: false };
    expect(
      appearedOnlyIn(now, { rows: [], truncated: false }, 50)?.[0]?.query,
    ).toBe("new");
    expect(appearedOnlyIn(now, { rows: [], truncated: true }, 50)).toBeNull();
  });
});

function quarter(rows: MetricRow[], index: number, truncated = false) {
  return {
    startDate: `2026-0${index + 1}-01`,
    endDate: `2026-0${index + 1}-28`,
    rows: { rows, truncated },
  };
}

describe("content decay", () => {
  it("flags a page well below its best earlier quarter", () => {
    const decay = contentDecay([
      quarter([row("/p", 20, 900, 8)], 0),
      quarter([row("/p", 80, 900, 4)], 1),
      quarter([row("/p", 60, 900, 5)], 2),
    ]);
    expect(decay[0]).toMatchObject({
      page: "/p",
      clicks: 20,
      peakClicks: 80,
      lostClicks: 60,
    });
  });

  it("reads an off-season that holds up against a year ago as seasonal, not decay", () => {
    const quarters = [80, 70, 60, 400, 75].map((clicks, i) =>
      quarter([row("/winter", clicks, 900, 6)], i),
    );
    expect(contentDecay(quarters)).toEqual([]);
  });

  it("stays silent for a steady page and for a page the newest truncated quarter lacks", () => {
    expect(
      contentDecay([
        quarter([row("/p", 75, 900, 4)], 0),
        quarter([row("/p", 80, 900, 4)], 1),
      ]),
    ).toEqual([]);
    expect(
      contentDecay([quarter([], 0, true), quarter([row("/p", 80, 900, 4)], 1)]),
    ).toEqual([]);
  });
});

describe("pages with impressions and no clicks", () => {
  it("lists only zero-click pages above the impression floor", () => {
    const result = zeroClickPages(
      [
        row("/none", 0, 500, 12),
        row("/some", 3, 500, 8),
        row("/tiny", 0, 20, 30),
      ],
      100,
    );
    expect(result.rows.map((r) => r.page)).toEqual(["/none"]);
  });
});

describe("position buckets", () => {
  it("rounds like the quick filters", () => {
    expect(positionBucketFor(3.4)).toBe("1-3");
    expect(positionBucketFor(3.5)).toBe("4-10");
    expect(positionBucketFor(50.4)).toBe("21-50");
    expect(positionBucketFor(0)).toBeNull();
  });
});

describe("device and country gaps", () => {
  const site = { clicks: 300, impressions: 10_000, ctr: 0.03, position: 6 };

  it("flags a large segment with a much lower CTR", () => {
    const [mobile, desktop] = segmentGaps(
      [row("MOBILE", 60, 6000, 6.5), row("DESKTOP", 240, 4000, 5)],
      site,
      200,
      0.05,
    );
    expect(mobile?.ctrGap).toBe(true);
    expect(mobile?.gainClicks).toBe(120);
    expect(desktop?.ctrGap).toBe(false);
  });

  it("ignores a segment too small to matter", () => {
    const [tablet] = segmentGaps([row("TABLET", 0, 150, 20)], site, 200, 0.05);
    expect(tablet?.ctrGap).toBe(false);
    expect(tablet?.positionGapFlag).toBe(false);
  });
});

describe("brand", () => {
  it("folds Turkish letters and spacing when matching brand terms", () => {
    expect(foldText("Örnek-Sİte ılık")).toBe("ornek site ilik");
    expect(isBrandQuery("örnek site kampanya", ["ornek site"])).toBe(true);
    expect(isBrandQuery("orneksite iletişim", ["örnek site"])).toBe(true);
    expect(isBrandQuery("nevresim takımı", ["örnek site"])).toBe(false);
  });

  it("matches a single-word term on word boundaries only", () => {
    expect(isBrandQuery("afford a car", ["ford"])).toBe(false);
    expect(isBrandQuery("workshop tools", ["shop"])).toBe(false);
    expect(isBrandQuery("ford fiesta", ["ford"])).toBe(true);
    expect(isBrandQuery("orneksite iade", ["orneksite"])).toBe(true);
  });

  it("suggests the registrable label, not a subdomain", () => {
    expect(suggestBrandTerms("blog.example.com", null)).toEqual(["example"]);
    expect(suggestBrandTerms("example.co.uk", null)).toEqual(["example"]);
    expect(suggestBrandTerms("sc-domain:shop.ornek-site.com.tr", null)).toEqual(
      ["ornek site", "orneksite"],
    );
  });

  it("stays unknown until terms are set, and suggests them from the domain", () => {
    expect(suggestBrandTerms("ornek-site.com", "Örnek site")).toEqual([
      "ornek site",
      "orneksite",
      "örnek site",
    ]);
    expect(brandSplit([row("x", 1, 10, 3)], [], ["ornek site"]).status).toBe(
      "unset",
    );
    const split = brandSplit(
      [row("örnek site", 50, 100, 1), row("yorgan", 5, 300, 7)],
      ["örnek site"],
      [],
    );
    expect(
      split.status === "set" && [split.brand.clicks, split.nonBrand.clicks],
    ).toEqual([50, 5]);
  });
});

describe("question and long-tail lenses", () => {
  it("recognises question words in the supported languages", () => {
    expect(isQuestionQuery("nevresim nasıl yıkanır")).toBe(true);
    expect(isQuestionQuery("ranforce nedir")).toBe(true);
    expect(isQuestionQuery("how to wash a duvet")).toBe(true);
    expect(isQuestionQuery("wie wäscht man bettwäsche")).toBe(true);
    expect(isQuestionQuery("nevresim takımı fiyatları")).toBe(false);
    // "is" is a question word only at the start.
    expect(isQuestionQuery("price is right")).toBe(false);
    // Turkish particles only after another word.
    expect(isQuestionQuery("iade var mı")).toBe(true);
    expect(isQuestionQuery("mi band 8")).toBe(false);
  });

  it("counts four or more words as long tail", () => {
    expect(isLongTailQuery("kaz tüyü yorgan fiyatları")).toBe(true);
    expect(isLongTailQuery("kaz tüyü yorgan")).toBe(false);
  });
});

describe("anomalies", () => {
  function series(last: number): DailyValue[] {
    const out: DailyValue[] = [];
    for (let i = 0; i < 63; i += 1) {
      const date = new Date(Date.UTC(2026, 7, 1 + i))
        .toISOString()
        .slice(0, 10);
      // A weekly cycle: weekends lower. A flat weekly pattern must not alarm.
      const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
      const base = weekday === 0 || weekday === 6 ? 60 : 100;
      out.push({
        date,
        clicks: i === 62 ? last : base,
        impressions: base * 10,
        complete: true,
      });
    }
    return out;
  }

  it("flags a collapse against the same weekday's history", () => {
    const data = series(20);
    const lastDate = data[62]?.date ?? "";
    const found = detectAnomalies(data, lastDate, lastDate);
    expect(found).toHaveLength(1);
    expect(found[0]).toMatchObject({
      metric: "clicks",
      direction: "down",
      value: 20,
    });
  });

  it("stays silent on a normal weekend dip", () => {
    const data = series(100);
    expect(
      detectAnomalies(data, data[56]?.date ?? "", data[62]?.date ?? ""),
    ).toEqual([]);
  });
});

describe("to-do list", () => {
  const none = { rows: [], truncated: false };
  const metrics = { clicks: 0, impressions: 0, ctr: null, position: null };
  const insightsFor = (input: {
    queries?: MetricRow[];
    pages?: MetricRow[];
    brandSuggestions?: string[];
  }) =>
    buildInsights({
      days: 28,
      queries: { rows: input.queries ?? [], truncated: false },
      previousQueries: none,
      pages: { rows: input.pages ?? [], truncated: false },
      previousPages: none,
      queryPages: none,
      decayQuarters: null,
      devices: [],
      deviceBase: metrics,
      countries: [],
      countryBase: metrics,
      daily: [],
      windowStart: "2026-10-01",
      windowEnd: "2026-10-28",
      brandTerms: [],
      brandSuggestions: input.brandSuggestions ?? [],
    });
  const context = { days: 28, deviceBase: metrics, countryBase: metrics };

  it("asks to confirm suggested brand terms, carrying them", () => {
    const insights = insightsFor({ brandSuggestions: ["ornek"] });
    expect(insights.brandState.source).toBe("suggested");
    const todo = buildTodo(insights, context);
    expect(todo.find((item) => item.kind === "setBrandTerms")).toMatchObject({
      suggestions: ["ornek"],
    });
  });

  it("estimates a zero-click page at the CTR of the band below it", () => {
    const insights = insightsFor({
      queries: healthyCurveRows(),
      pages: [row("/none", 0, 1000, 3)],
    });
    const todo = buildTodo(insights, context);
    // At position 3 ("2-3", 15%) it is estimated at "4-5" (8%), not 15%.
    expect(
      todo.find((item) => item.kind === "zeroClickPage")?.estimatedClicks,
    ).toBe(80);
  });

  it("ranks by estimated clicks and puts unknown gains last", () => {
    const quiet = insightsFor({});
    const insights: SearchInsights = {
      ...quiet,
      snippets: [
        {
          query: "s",
          page: null,
          clicks: 1,
          impressions: 1000,
          ctr: 0.001,
          position: 3,
          band: "2-3",
          expectedCtr: 0.1,
          gainClicks: 99,
        },
      ],
      striking: {
        rows: [
          {
            query: "q",
            clicks: 1,
            impressions: 400,
            ctr: 0,
            position: 8,
            page: null,
            pagePosition: null,
            pageCount: 0,
            potentialClicks: 10,
            targetBand: "2-3",
          },
        ],
        total: 1,
        totalGain: 10,
      },
    };
    const todo = buildTodo(insights, context);
    expect(todo.map((t) => [t.kind, t.estimatedClicks])).toEqual([
      ["snippet", 99],
      ["striking", 10],
      ["setBrandTerms", null],
    ]);
  });
});
