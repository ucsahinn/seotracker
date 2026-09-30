import { describe, expect, it } from "vitest";
import { runPageReporters } from "@/server/lib/audit/issues/page-reporters";
import {
  genericAnchors,
  isPlaceholderTitle,
  pathHasUppercaseOrUnderscore,
} from "@/server/lib/audit/issues/page-hygiene-checks";
import { makeCrawledPage as makePage } from "@/server/lib/audit/issues/page-test-fixtures";
import type { CrawledPageResult, PageLink } from "@/server/lib/audit/types";

function types(overrides: Partial<CrawledPageResult>): string[] {
  return runPageReporters(makePage(overrides)).map((i) => i.issueType);
}

function link(anchor: string | null, extra: Partial<PageLink> = {}): PageLink {
  return {
    targetUrl: `https://example.com/${anchor ?? "x"}-${Math.random()}`,
    anchor,
    isInternal: true,
    isNofollow: false,
    ...extra,
  };
}

describe("healthy page", () => {
  it("raises none of the hygiene rules", () => {
    const got = types({});
    for (const id of [
      "missing-charset",
      "multiple-titles",
      "multiple-meta-descriptions",
      "placeholder-title",
      "h1-too-long",
      "empty-anchor-text",
      "generic-anchor-text",
      "too-many-links",
      "internal-nofollow-links",
      "url-too-long",
      "url-uppercase-or-underscore",
    ]) {
      expect(got).not.toContain(id);
    }
  });
});

describe("missing-charset", () => {
  it("fires only when no encoding is declared", () => {
    expect(types({ charsetDeclared: false })).toContain("missing-charset");
    expect(types({ charsetDeclared: true })).not.toContain("missing-charset");
  });
});

describe("multiple titles and descriptions", () => {
  it("fire above one", () => {
    expect(types({ titleCount: 2 })).toContain("multiple-titles");
    expect(types({ metaDescriptionCount: 2 })).toContain(
      "multiple-meta-descriptions",
    );
  });
});

describe("placeholder-title", () => {
  it("matches placeholders in both languages, ignoring case", () => {
    expect(isPlaceholderTitle("Untitled Document")).toBe(true);
    expect(isPlaceholderTitle("  BAŞLIKSIZ  ")).toBe(true);
    expect(isPlaceholderTitle("Untitled Design Studio")).toBe(false);
    expect(types({ title: "Untitled Document" })).toContain(
      "placeholder-title",
    );
  });
});

describe("h1-too-long", () => {
  it("fires past 70 characters", () => {
    expect(types({ firstH1: "a".repeat(71) })).toContain("h1-too-long");
    expect(types({ firstH1: "a".repeat(70) })).not.toContain("h1-too-long");
  });
});

describe("empty-anchor-text", () => {
  it("fires on the analyzer's count", () => {
    expect(types({ emptyAnchorCount: 2 })).toContain("empty-anchor-text");
  });
});

describe("generic-anchor-text", () => {
  it("needs three internal generic links, in either language", () => {
    const three = [
      link("Devamı"),
      link("CLICK HERE..."),
      link("Buraya tıklayın »"),
    ];
    expect(genericAnchors(makePage({ links: three }))).toHaveLength(3);
    expect(types({ links: three })).toContain("generic-anchor-text");
    expect(types({ links: three.slice(0, 2) })).not.toContain(
      "generic-anchor-text",
    );
  });

  it("ignores external links and descriptive text", () => {
    const links = [
      link("Devamı", { isInternal: false }),
      link("Devamı", { isInternal: false }),
      link("Devamı", { isInternal: false }),
      link("2026 fiyat listesi"),
    ];
    expect(types({ links })).not.toContain("generic-anchor-text");
  });
});

describe("internal-nofollow-links", () => {
  it("needs three internal nofollow links", () => {
    const nofollow = (n: number) =>
      Array.from({ length: n }, () => link("Giriş", { isNofollow: true }));
    expect(types({ links: nofollow(3) })).toContain("internal-nofollow-links");
    expect(types({ links: nofollow(2) })).not.toContain(
      "internal-nofollow-links",
    );
    expect(
      types({
        links: Array.from({ length: 5 }, () =>
          link("x", { isNofollow: true, isInternal: false }),
        ),
      }),
    ).not.toContain("internal-nofollow-links");
  });
});

describe("too-many-links", () => {
  it("fires above 300 links on an indexable page only", () => {
    const many = Array.from({ length: 301 }, (_, i) => link(`l${i}`));
    expect(types({ links: many })).toContain("too-many-links");
    expect(types({ links: many.slice(0, 300) })).not.toContain(
      "too-many-links",
    );
    expect(types({ links: many, isIndexable: false })).not.toContain(
      "too-many-links",
    );
  });
});

describe("URL checks", () => {
  it("url-too-long fires past 115 characters", () => {
    const long = `https://example.com/${"a".repeat(96)}`;
    expect(long.length).toBe(116);
    expect(types({ url: long, canonicalUrl: long })).toContain("url-too-long");
    expect(
      types({ url: long.slice(0, -1), canonicalUrl: long.slice(0, -1) }),
    ).not.toContain("url-too-long");
  });

  it("flags uppercase and underscores in the path only", () => {
    expect(pathHasUppercaseOrUnderscore("https://example.com/About")).toBe(
      true,
    );
    expect(pathHasUppercaseOrUnderscore("https://example.com/a_b")).toBe(true);
    expect(pathHasUppercaseOrUnderscore("https://example.com/a-b?Q=A_B")).toBe(
      false,
    );
    // %C3%BC is an escaped letter, not an uppercase one.
    expect(pathHasUppercaseOrUnderscore("https://example.com/%C3%BC")).toBe(
      false,
    );
    const url = "https://example.com/Some_Page";
    expect(types({ url, canonicalUrl: url })).toContain(
      "url-uppercase-or-underscore",
    );
  });
});
