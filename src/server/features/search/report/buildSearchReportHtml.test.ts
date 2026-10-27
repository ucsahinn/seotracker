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
