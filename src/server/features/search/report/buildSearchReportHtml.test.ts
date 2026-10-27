import { describe, expect, it } from "vitest";
import { brandSplit } from "@/shared/searchInsights";
import { searchViewFixture as view } from "@/shared/search-view-test-fixtures";
import { buildSearchReportHtml } from "./buildSearchReportHtml";

describe("buildSearchReportHtml", () => {
  it("prints the view's own totals and escapes query text from Google", () => {
    const { html, summary } = buildSearchReportHtml({
      view: view(),
      overlaps: null,
      now: new Date("2026-10-26T10:00:00Z"),
    });
    // The site totals are the view's, not a sum of the one query row.
    expect(html).toContain("1.234");
    expect(html).toContain("56.789");
    expect(summary).toContain("1.234");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
    // No previous period: no change is invented.
    expect(html).not.toContain('class="delta ');
  });

  it("marks brand terms suggested from the domain as unconfirmed", () => {
    const base = view();
    const { html } = buildSearchReportHtml({
      view: {
        ...base,
        insights: {
          ...base.insights,
          brand: brandSplit([], ["example"], []),
          brandState: { terms: ["example"], source: "suggested" },
        },
      },
      overlaps: null,
      now: new Date("2026-10-26T10:00:00Z"),
    });
    expect(html).toContain("example (önerilen, onaylanmadı)");
  });
});

describe("report evidence honesty", () => {
  it.each(["google", "assumed"] as const)(
    "distinguishes %s finality from measurement freshness",
    (source) => {
      const base = view();
      const { html } = buildSearchReportHtml({
        view: { ...base, window: { ...base.window, incompleteSource: source } },
        overlaps: null,
      });
      expect(html).toContain(
        source === "google"
          ? "tamamlandığını bildirdiği"
          : "Google kesinleşme sınırı bildirmedi",
      );
      expect(html).not.toContain("veriler 23 Eki");
    },
  );
  it("does not attribute truncated residuals solely to privacy or turn unavailable data into zero", () => {
    const base = view();
    const { html } = buildSearchReportHtml({
      view: {
        ...base,
        coverage: {
          ...base.coverage,
          queryPages: { ...base.coverage.queryPages, truncated: true },
          hiddenQueries: { ...base.coverage.hiddenQueries, exact: false },
        },
      },
      overlaps: null,
    });
    expect(html).toContain(
      "Gizlenen ve satır sınırı dışında kalan sorgular birlikte",
    );
    expect(html).toContain("satır sınırına ulaşıldı");
    expect(html).toContain("Kaynak bu iki durumu ayırmadığı");
    expect(html).not.toContain("bir yılı aşkın veri gerekir");
    expect(html).not.toContain("Bu rapor 0 Google isteğiyle");
  });
  it("keeps empty overlap evidence dated and capped without claiming no site-wide harm", () => {
    const { html } = buildSearchReportHtml({
      view: view(),
      overlaps: {
        rows: [],
        queriesAnalyzed: 120,
        splitImpressions: 0,
        analyzedImpressions: 14000,
        truncated: true,
        startDate: "2026-09-26",
        endDate: "2026-10-23",
      },
    });
    expect(html).toContain("Çakışma dönemi:");
    expect(html).toContain("İncelenen: 120 sorgu");
    expect(html).toContain("Okunmayan sorgularda");
    expect(html).toContain("Okunan sorgularda eşiği aşan");
    expect(html).not.toContain("Hiçbir sorguda");
  });
  it("saves a legal long-domain title and emits valid local contents links", () => {
    const { title, html } = buildSearchReportHtml({
      view: view({ siteUrl: "sc-domain:" + "a".repeat(220) + ".example" }),
      overlaps: null,
    });
    expect(title.length).toBeLessThanOrEqual(120);
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
      expect(html).toContain('id="' + id + '"');
  });
});

it("labels a top-ten cut against the observed population", () => {
  const base = view();
  const { html } = buildSearchReportHtml({
    view: {
      ...base,
      insights: {
        ...base.insights,
        snippets: Array.from({ length: 12 }, (_, i) => ({
          query: "observed-" + i,
          page: null,
          clicks: 2,
          impressions: 500,
          ctr: 0.004,
          position: 5,
          band: "4-5",
          expectedCtr: 0.1,
          gainClicks: 48,
        })),
      },
    },
    overlaps: null,
  });
  expect(html).toContain("Gösterilen: 10 &#47; 12 gözlenen kayıt");
  expect(html).toContain("observed-9");
  expect(html).not.toContain("observed-10");
});
