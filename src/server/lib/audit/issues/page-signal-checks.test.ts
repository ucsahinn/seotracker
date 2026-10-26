import { describe, expect, it } from "vitest";
import { runPageReporters } from "@/server/lib/audit/issues/page-reporters";
import { makeCrawledPage } from "@/server/lib/audit/issues/page-test-fixtures";
import { makePageSignals } from "@/server/test-support/crawled-page";
import type { CrawledPageResult, PageSignals } from "@/server/lib/audit/types";

function types(
  signals: Partial<PageSignals>,
  page: Partial<CrawledPageResult> = {},
): string[] {
  return runPageReporters(
    makeCrawledPage({ signals: makePageSignals(signals), ...page }),
  ).map((issue) => issue.issueType);
}

describe("page signal checks", () => {
  it("says nothing about a clean page", () => {
    const signalTypes = [
      "og-incomplete",
      "twitter-card-missing",
      "structured-data-required-props-missing",
      "title-equals-h1",
      "title-pixel-too-wide",
      "dom-too-large",
      "dom-too-deep",
      "low-text-ratio",
      "images-not-lazy",
      "images-legacy-format",
    ];
    expect(types({}).filter((type) => signalTypes.includes(type))).toEqual([]);
  });

  it("says nothing when the page was not analyzed", () => {
    expect(
      runPageReporters(makeCrawledPage({ ogTitle: "Only a title" })).map(
        (issue) => issue.issueType,
      ),
    ).not.toContain("og-incomplete");
  });

  it("names the Open Graph tags a partly set-up page leaves out", () => {
    const [issue] = runPageReporters(
      makeCrawledPage({
        ogTitle: "Shared title",
        signals: makePageSignals({ twitterCard: "summary" }),
      }),
    ).filter((found) => found.issueType === "og-incomplete");
    expect(issue?.details).toEqual({
      missing: ["og:description", "og:image"],
    });
  });

  it("asks for twitter:card only where Open Graph is set up", () => {
    expect(types({}, { ogTitle: "T" })).toContain("twitter-card-missing");
    expect(types({})).not.toContain("twitter-card-missing");
  });

  it("compares the title with the H1 ignoring case and spacing", () => {
    expect(
      types({}, { title: "Kışlık  Botlar", firstH1: "kışlık botlar" }),
    ).toContain("title-equals-h1");
  });

  it("flags a short but wide title that title-too-long does not cover", () => {
    const wide = "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW";
    expect(types({}, { title: wide })).toContain("title-pixel-too-wide");
    expect(types({}, { title: `${wide} and more words here` })).not.toContain(
      "title-pixel-too-wide",
    );
  });

  it("uses Lighthouse's DOM size and the 32-level depth limits", () => {
    expect(types({ domNodeCount: 1_501 })).toContain("dom-too-large");
    expect(types({ domNodeCount: 1_500 })).not.toContain("dom-too-large");
    expect(types({ domMaxDepth: 33 })).toContain("dom-too-deep");
  });

  it("reports low text ratio on indexable pages only", () => {
    expect(types({ textRatio: 0.05 })).toContain("low-text-ratio");
    expect(types({ textRatio: 0.05 }, { isIndexable: false })).not.toContain(
      "low-text-ratio",
    );
  });

  it("needs more than six eager images below the fold before it says anything", () => {
    expect(types({ imagesBelowFoldNotLazy: 7 })).toContain("images-not-lazy");
    expect(types({ imagesBelowFoldNotLazy: 6 })).not.toContain(
      "images-not-lazy",
    );
  });

  // Article and Organization have no required properties; a gap there is
  // the info-level finding, never "required".
  it("keeps recommended-only gaps out of the required finding", () => {
    const gap = {
      type: "Article",
      level: "recommended" as const,
      missing: ["image"],
    };
    const found = types({ structuredDataGaps: [gap] });
    expect(found).toContain("structured-data-recommended-props-missing");
    expect(found).not.toContain("structured-data-required-props-missing");
  });

  it("carries the structured data gaps in the details", () => {
    const gap = {
      type: "Product",
      level: "required" as const,
      missing: ["offers/review/aggregateRating"],
    };
    const [issue] = runPageReporters(
      makeCrawledPage({
        signals: makePageSignals({ structuredDataGaps: [gap] }),
      }),
    ).filter(
      (found) => found.issueType === "structured-data-required-props-missing",
    );
    expect(issue?.details).toEqual({ problems: [gap] });
  });
});
