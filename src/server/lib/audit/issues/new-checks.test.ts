/**
 * Five later checks: invalid JSON-LD, duplicate h1, cross-host canonical,
 * images without dimensions, and broken hreflang targets.
 */
import { describe, expect, it } from "vitest";
import {
  findDuplicates,
  findHreflangTargetProblems,
  type SlimPage,
} from "@/server/lib/audit/issues/multipage-checks";
import { runPageReporters } from "@/server/lib/audit/issues/page-reporters";
import { makeCrawledPage as makePage } from "@/server/lib/audit/issues/page-test-fixtures";
import type { CrawledPageResult } from "@/server/lib/audit/types";

function types(page: CrawledPageResult): string[] {
  return runPageReporters(page).map((issue) => issue.issueType);
}

function slim(overrides: Partial<SlimPage>): SlimPage {
  return {
    id: overrides.url ?? "page",
    url: "https://example.com/a",
    statusCode: 200,
    fetchClass: "ok",
    title: null,
    firstH1: null,
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

describe("structured-data-invalid-json", () => {
  it("fires when the analyzer counted a broken block", () => {
    expect(types(makePage({ invalidStructuredDataCount: 1 }))).toContain(
      "structured-data-invalid-json",
    );
    expect(types(makePage({}))).not.toContain("structured-data-invalid-json");
  });
});

describe("duplicate-h1", () => {
  it("groups by normalized first h1 and skips canonicalized pages", () => {
    const issues = findDuplicates([
      slim({ url: "https://example.com/a", firstH1: "Our  Shop" }),
      slim({ url: "https://example.com/b", firstH1: "our shop" }),
      slim({
        url: "https://example.com/c",
        firstH1: "Our Shop",
        canonicalUrl: "https://example.com/a",
      }),
      slim({ url: "https://example.com/d", firstH1: "Other" }),
    ]).filter((issue) => issue.issueType === "duplicate-h1");
    expect(issues.map((issue) => issue.pageUrl)).toEqual([
      "https://example.com/a",
      "https://example.com/b",
    ]);
  });
});

describe("canonical-cross-host-or-http", () => {
  const withCanonical = (canonicalUrl: string) =>
    types(makePage({ canonicalUrl }));

  it("flags an http canonical on an https page", () => {
    expect(withCanonical("http://example.com/a")).toContain(
      "canonical-cross-host-or-http",
    );
  });

  it("flags another host but not www versus apex", () => {
    expect(withCanonical("https://other.org/a")).toContain(
      "canonical-cross-host-or-http",
    );
    expect(withCanonical("https://www.example.com/a")).not.toContain(
      "canonical-cross-host-or-http",
    );
    expect(withCanonical("https://example.com/a")).not.toContain(
      "canonical-cross-host-or-http",
    );
  });
});

const images = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    src: `/i/${i}.png`,
    alt: "x",
    missingDimensions: true,
  }));

describe("images-missing-dimensions", () => {
  it("needs three or more", () => {
    expect(types(makePage({ images: images(2) }))).not.toContain(
      "images-missing-dimensions",
    );
    expect(types(makePage({ images: images(3) }))).toContain(
      "images-missing-dimensions",
    );
  });
});

describe("hreflang-target-broken", () => {
  const source = slim({
    url: "https://example.com/en",
    hreflangAlternates: [{ hreflang: "de", href: "https://example.com/de" }],
  });
  const reasonFor = (target: Partial<SlimPage>) =>
    findHreflangTargetProblems([
      source,
      slim({ url: "https://example.com/de", ...target }),
    ]).map((issue) => issue.details?.reason);

  it("reports an error, a redirect and a noindex target", () => {
    expect(reasonFor({ statusCode: 404 })).toEqual(["error"]);
    expect(reasonFor({ statusCode: 301 })).toEqual(["redirect"]);
    expect(reasonFor({ isIndexable: false, robotsMeta: "noindex" })).toEqual([
      "noindex",
    ]);
  });

  it("skips a healthy target and one the crawl never visited", () => {
    expect(reasonFor({})).toEqual([]);
    expect(findHreflangTargetProblems([source])).toEqual([]);
  });
});
