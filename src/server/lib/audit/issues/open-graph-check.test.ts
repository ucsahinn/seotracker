import { describe, expect, it } from "vitest";
import type { SlimPage } from "@/server/lib/audit/issues/multipage-checks";
import { findMissingOpenGraph } from "@/server/lib/audit/issues/open-graph-check";

const START = "https://example.com/";

function page(overrides: Partial<SlimPage> = {}): SlimPage {
  return {
    id: overrides.url ?? "page",
    url: "https://example.com/a",
    statusCode: 200,
    fetchClass: "ok",
    title: null,
    metaDescription: null,
    contentHash: null,
    redirectUrl: null,
    wordCount: 100,
    isIndexable: true,
    hasStructuredData: false,
    ogTitle: null,
    ogImage: null,
    canonicalUrl: null,
    headerCanonicalUrl: null,
    robotsMeta: null,
    googlebotMeta: null,
    xRobotsTag: null,
    hreflangAlternates: [],
    ...overrides,
  };
}

function pages(count: number, overrides: Partial<SlimPage> = {}) {
  return Array.from({ length: count }, (_, index) =>
    page({ url: `https://example.com/${index}`, ...overrides }),
  );
}

describe("findMissingOpenGraph", () => {
  it("raises one site-level finding when no page carries either tag", () => {
    const issues = findMissingOpenGraph(pages(8), START);

    expect(issues).toEqual([
      {
        issueType: "open-graph-missing-site",
        pageId: null,
        pageUrl: START,
        details: { pagesChecked: 8 },
      },
    ]);
  });

  /*
   * The finding is "nobody set this up". One page with a card proves somebody
   * did, and the gaps after that are a per-template question this check is
   * the wrong shape to answer.
   */
  it("stays quiet when a single page carries one of the two tags", () => {
    const withCard = [
      ...pages(7),
      page({ url: "https://example.com/x", ogImage: "https://cdn/og.png" }),
    ];

    expect(findMissingOpenGraph(withCard, START)).toEqual([]);
  });

  it("stays quiet on a crawl too small to say anything about a site", () => {
    expect(findMissingOpenGraph(pages(4), START)).toEqual([]);
  });

  /*
   * Redirects and error pages have no head to carry a tag, so counting them
   * as evidence of absence would fire on a site whose only crawled 200s all
   * had cards.
   */
  it("counts only pages that returned a document", () => {
    const mixed = [
      ...pages(4, { statusCode: 301, redirectUrl: "https://example.com/b" }),
      ...pages(4),
    ];

    expect(findMissingOpenGraph(mixed, START)).toEqual([]);
  });
});
