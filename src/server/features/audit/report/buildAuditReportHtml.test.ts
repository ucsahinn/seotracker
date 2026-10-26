import { describe, expect, it } from "vitest";
import { REPORT_MAX_HTML_BYTES } from "@/types/schemas/reports";
import { unknownFacts } from "@/server/lib/audit/site-probes/site-facts-fixture";
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

/** Printed issue rows, by their address. */
const printedRows = (html: string) => html.match(/example\.com&#47;p/g)?.length;

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

  /*
   * Security findings used to land under "Diğer", and a check whose data the
   * audit never collected must read "Ölçülmedi", not pass: the appendix of
   * passed checks is only honest if it leaves those out.
   */
  it("files security findings under their own category and keeps unmeasured checks out of the passed list", () => {
    const facts = unknownFacts();
    facts.start.status = 200;
    const { html } = buildAuditReportHtml(
      input({
        siteFacts: facts,
        issues: [
          {
            issueType: "missing-hsts",
            severity: "warning",
            pageUrl: "https://example.com/",
            pageId: null,
          },
        ],
      }),
    );

    expect(html).toContain('<span class="cat">Güvenlik</span>');
    const appendix = html.slice(html.indexOf('id="gecen-kontroller"'));
    const security = appendix.slice(appendix.indexOf("Güvenlik <span"));
    const [passed, unmeasured] = security
      .slice(0, security.indexOf("<h3", 1))
      .split("Ölçülmedi (");
    expect(passed).toContain("X-Content-Type-Options başlığı yok");
    expect(passed).not.toContain("SSL sertifikasının süresi 30 günden az");
    expect(unmeasured).toContain("SSL sertifikasının süresi 30 günden az");
  });

  /*
   * The screenshot is one picture worth tens of kilobytes, so it is the
   * first thing to go when the report is over its byte budget, before any
   * list is cut.
   */
  it("inlines the mobile screenshot and drops it first when over budget", () => {
    const shot = `data:image/jpeg;base64,${"A".repeat(120_000)}`;
    const insights = {
      history: [],
      changes: null,
      traffic: null,
      startPage: {
        id: "p0",
        url: "https://example.com/",
        title: "Home",
        metaDescription: null,
        canonicalUrl: null,
        htmlLang: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        twitterCard: null,
        wordCount: 0,
        textRatio: null,
        domNodeCount: null,
        imagesTotal: 0,
      },
      speed: {
        url: "https://example.com/",
        isStartPage: true,
        fetchedAt: "2026-09-28T08:00:00.000Z",
        page: null,
        origin: null,
        screenshot: shot,
        lab: {
          lcpMs: null,
          cls: null,
          inpMs: null,
          fcpMs: null,
          ttfbMs: null,
          tbtMs: null,
        },
      },
      speedError: null,
      analyticsTags: [],
      schemaTypes: [],
      googleInspected: null,
      platformHost: false,
    };

    expect(buildAuditReportHtml(input({ insights })).html).toContain(
      "data:image&#47;jpeg;base64,AAAA",
    );

    // About 330 KB of issue rows: fits alone, not with the screenshot.
    const issues = Array.from({ length: 1000 }, (_, i) => ({
      issueType: `custom-${i % 100}`,
      severity: "warning",
      pageUrl: `https://example.com/p${i}`,
      pageId: `id${i}`,
      detailsJson: JSON.stringify({ a: "d".repeat(150) }),
    }));
    const lean = buildAuditReportHtml(input({ pagesCrawled: 1000, issues }));
    const crowded = buildAuditReportHtml(
      input({ insights, pagesCrawled: 1000, issues }),
    );

    expect(crowded.html).not.toContain("data:image");
    expect(printedRows(crowded.html)).toBe(printedRows(lean.html));
  });
});
