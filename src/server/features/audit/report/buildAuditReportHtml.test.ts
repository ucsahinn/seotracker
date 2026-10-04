import { describe, expect, it } from "vitest";
import { REPORT_MAX_HTML_BYTES } from "@/types/schemas/reports";
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

const issuesFor = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    issueType: "missing-title",
    severity: "critical",
    pageUrl: `https://example.com/p${i}`,
    pageId: `id${i}`,
  }));

const row = (pageId: string, strategy: "mobile" | "desktop") => ({
  pageId,
  strategy,
  performanceScore: 90,
});

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
          { issueType: "server-error", severity: "critical", pageUrl: "/a" },
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

  it("links Ek A only when the appendix exists", () => {
    const few = buildAuditReportHtml(
      input({ pagesCrawled: 3, issues: issuesFor(3) }),
    );
    expect(few.html).not.toContain('href="#ek-adresler"');

    const many = buildAuditReportHtml(
      input({ pagesCrawled: 80, issues: issuesFor(80) }),
    );
    expect(many.html).toContain('href="#ek-adresler"');
    expect(many.html).toContain('id="ek-adresler"');
  });

  /*
   * Nothing but the lists is capped by halving, so a pathological audit (many
   * issue types, long details and addresses) used to end above the budget and
   * be refused by saveReport.
   */
  it("fits the stored cap for a pathological audit", () => {
    const longUrl = `https://example.com/${"x".repeat(2000)}`;
    const details = JSON.stringify({ a: "d".repeat(5000) });
    const issues = Array.from({ length: 3000 }, (_, i) => ({
      issueType: `custom-type-${i}-${"t".repeat(100)}`,
      severity: "warning",
      pageUrl: `${longUrl}${i}`,
      pageId: `id${i}`,
      detailsJson: details,
    }));
    const { html } = buildAuditReportHtml(
      input({ pagesCrawled: 3000, issues }),
    );

    expect(new TextEncoder().encode(html).length).toBeLessThanOrEqual(
      REPORT_MAX_HTML_BYTES,
    );
  });

  it("counts Lighthouse checks as two per page when judging partial measurement", () => {
    const rows = ["a", "b", "c"].flatMap((id) => [
      row(id, "mobile"),
      row(id, "desktop"),
    ]);
    const full = buildAuditReportHtml(
      input({ lighthouse: rows, lighthouseTotal: 6 }),
    );
    expect(full.html).not.toContain("Ölçüm kısmi");

    const partial = buildAuditReportHtml(
      input({ lighthouse: rows, lighthouseTotal: 10 }),
    );
    expect(partial.html).toContain("Ölçüm kısmi");
    expect(partial.html).toContain("5 sayfanın ölçülmesi planlandı");
  });

  it("does not call a failed or empty audit clean", () => {
    for (const overrides of [
      { status: "failed" as const },
      { pagesCrawled: 0 },
    ]) {
      const { html, summary } = buildAuditReportHtml(input(overrides));
      expect(html).not.toContain("Kayıtlı hiçbir sorun yok");
      expect(html).not.toContain("Bu denetimde kayıtlı sorun yok");
      expect(summary).not.toContain("Kayıtlı sorun yok");
      expect(summary).not.toContain("Site puanı");
    }
  });

  it("gives two audits sharing an id prefix, of one site on one day, different titles", () => {
    const a = buildAuditReportHtml(input({ auditId: "aaaaaa-1" }));
    const b = buildAuditReportHtml(input({ auditId: "aaaaaa-2" }));
    expect(a.title).not.toBe(b.title);
  });

  /*
   * Every attribute in the document is double-quoted today. A single-quoted
   * one added later would be a hole nobody would think to look for, so the
   * escaper covers it and this test keeps it covering it.
   */
  it("escapes both quote styles and the slash", () => {
    const { html } = buildAuditReportHtml(
      input({ siteUrl: `https://example.com/'"</script>` }),
    );

    expect(html).not.toContain("</script>");
    expect(html).toContain("&#39;");
    expect(html).toContain("&#47;");
  });
});
