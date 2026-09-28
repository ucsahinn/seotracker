import { describe, expect, it } from "vitest";
import { buildAuditReportHtml } from "./buildAuditReportHtml";

function input(overrides: Partial<Parameters<typeof buildAuditReportHtml>[0]>) {
  return {
    siteUrl: "https://example.com/",
    startedAt: "2026-09-28T08:00:00.000Z",
    completedAt: "2026-09-28T08:04:00.000Z",
    pagesCrawled: 3,
    pages: [],
    issues: [],
    lighthouse: [],
    ...overrides,
  };
}

describe("buildAuditReportHtml", () => {
  /*
   * Titles and meta descriptions are crawled from somebody else's HTML, and
   * this function builds a document by interpolating them. A page whose
   * title closes the tag it sits in rewrites the report.
   */
  it("escapes crawled text instead of embedding it as markup", () => {
    const { html } = buildAuditReportHtml(
      input({
        siteUrl: "https://example.com/</title><script>alert(1)</script>",
        pages: [
          {
            url: "https://example.com/<img src=x onerror=alert(1)>",
            statusCode: 200,
            title: null,
            metaDescription: null,
            wordCount: 10,
            responseTimeMs: 120,
            isIndexable: true,
            inSitemap: true,
          },
        ],
      }),
    );

    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;img src=x");
  });

  it("stands alone: no network reference in the document", () => {
    const { html } = buildAuditReportHtml(input({}));

    // A report opened from a downloads folder in two years has no network.
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/<link[^>]+href/i);
    expect(html).not.toMatch(/https?:\/\/(?!example\.com)/);
  });

  it("orders findings by severity, then by pages affected", () => {
    const { html, summary } = buildAuditReportHtml(
      input({
        issues: [
          { issueType: "missing-title", severity: "critical", pageUrl: "/a" },
          {
            issueType: "meta-description-too-long",
            severity: "info",
            pageUrl: "/b",
          },
          {
            issueType: "meta-description-too-long",
            severity: "info",
            pageUrl: "/c",
          },
        ],
      }),
    );

    expect(html.indexOf("Kritik")).toBeLessThan(html.indexOf("Bilgi"));
    expect(summary).toContain("1 kritik");
  });

  /*
   * The stored row caps both, and a save that trips the cap is rejected
   * outright -- so a long site name must not be able to produce a report
   * that cannot be saved.
   */
  it("keeps the title and summary inside what a report row accepts", () => {
    const { title, summary } = buildAuditReportHtml(
      input({ siteUrl: `https://${"a".repeat(300)}.com/` }),
    );

    expect(title.length).toBeLessThanOrEqual(120);
    expect(summary.length).toBeLessThanOrEqual(2500);
  });
});
