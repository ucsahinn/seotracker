import { describe, expect, it } from "vitest";
import { runPageReporters } from "@/server/lib/audit/issues/page-reporters";
import type { CrawledPageResult } from "@/server/lib/audit/types";
import { makeCrawledPage as makePage } from "@/server/lib/audit/issues/page-test-fixtures";

function issueTypes(page: CrawledPageResult): string[] {
  return runPageReporters(page).map((issue) => issue.issueType);
}

describe("basic hygiene: not-https, missing-canonical, missing-lang", () => {
  describe("not-https", () => {
    it("flags an indexable HTML page served over http", () => {
      const types = issueTypes(
        makePage({
          url: "http://example.com/a",
          canonicalUrl: "http://example.com/a",
        }),
      );
      expect(types).toContain("not-https");
    });

    it("stays quiet on https", () => {
      expect(issueTypes(makePage({}))).not.toContain("not-https");
    });

    it("stays quiet on a noindex http page", () => {
      expect(
        issueTypes(
          makePage({ url: "http://example.com/a", isIndexable: false }),
        ),
      ).not.toContain("not-https");
    });

    it("stays quiet on an http URL that redirects, errors or is blocked", () => {
      const url = "http://example.com/a";
      expect(
        issueTypes(
          makePage({
            url,
            statusCode: 301,
            redirectUrl: "https://example.com/a",
          }),
        ),
      ).not.toContain("not-https");
      expect(issueTypes(makePage({ url, statusCode: 404 }))).not.toContain(
        "not-https",
      );
      expect(
        issueTypes(makePage({ url, fetchClass: "blocked", statusCode: 403 })),
      ).not.toContain("not-https");
      expect(
        issueTypes(makePage({ url, fetchClass: "error", statusCode: 0 })),
      ).not.toContain("not-https");
    });

    it("stays quiet on a non-HTML resource", () => {
      expect(
        issueTypes(
          makePage({ url: "http://example.com/a.pdf", isHtml: false }),
        ),
      ).not.toContain("not-https");
    });
  });

  describe("missing-canonical", () => {
    const bare = { canonicalUrl: null, canonicalCount: 0 };

    it("flags an indexable HTML page with no canonical at all", () => {
      expect(issueTypes(makePage(bare))).toEqual(["missing-canonical"]);
    });

    it("stays quiet when the page names itself", () => {
      expect(issueTypes(makePage({}))).not.toContain("missing-canonical");
    });

    it("stays quiet when only the HTTP header carries the canonical", () => {
      expect(
        issueTypes(
          makePage({ ...bare, headerCanonicalUrl: "https://example.com/a" }),
        ),
      ).not.toContain("missing-canonical");
    });

    it("gives a page that points elsewhere its own finding, not this one", () => {
      const types = issueTypes(
        makePage({
          canonicalUrl: "https://example.com/other",
          canonicalCount: 1,
        }),
      );
      expect(types).toContain("canonicalized-page");
      expect(types).not.toContain("missing-canonical");
    });

    it("stays quiet on noindex, non-HTML, redirect, error and blocked pages", () => {
      expect(
        issueTypes(makePage({ ...bare, isIndexable: false })),
      ).not.toContain("missing-canonical");
      expect(issueTypes(makePage({ ...bare, isHtml: false }))).not.toContain(
        "missing-canonical",
      );
      expect(
        issueTypes(
          makePage({
            ...bare,
            statusCode: 301,
            redirectUrl: "https://example.com/b",
          }),
        ),
      ).not.toContain("missing-canonical");
      expect(issueTypes(makePage({ ...bare, statusCode: 404 }))).not.toContain(
        "missing-canonical",
      );
      expect(
        issueTypes(
          makePage({ ...bare, fetchClass: "blocked", statusCode: 403 }),
        ),
      ).not.toContain("missing-canonical");
    });
  });

  describe("missing-lang", () => {
    it("flags an indexable HTML page with no lang", () => {
      expect(issueTypes(makePage({ htmlLang: null }))).toEqual([
        "missing-lang",
      ]);
    });

    it("stays quiet when a language is declared", () => {
      expect(issueTypes(makePage({ htmlLang: "tr" }))).not.toContain(
        "missing-lang",
      );
    });

    it("stays quiet on noindex, non-HTML, redirect, error and blocked pages", () => {
      const none = { htmlLang: null };
      expect(
        issueTypes(makePage({ ...none, isIndexable: false })),
      ).not.toContain("missing-lang");
      expect(issueTypes(makePage({ ...none, isHtml: false }))).not.toContain(
        "missing-lang",
      );
      expect(
        issueTypes(
          makePage({
            ...none,
            statusCode: 302,
            redirectUrl: "https://example.com/b",
          }),
        ),
      ).not.toContain("missing-lang");
      expect(issueTypes(makePage({ ...none, statusCode: 500 }))).not.toContain(
        "missing-lang",
      );
      expect(
        issueTypes(
          makePage({ ...none, fetchClass: "blocked", statusCode: 403 }),
        ),
      ).not.toContain("missing-lang");
    });
  });
});
