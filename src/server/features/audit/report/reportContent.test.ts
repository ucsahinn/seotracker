import { describe, expect, it } from "vitest";
import { buildAuditReportHtml } from "./buildAuditReportHtml";
import { barChart, donutChart } from "./reportCharts";
import { capList } from "./reportFormat";
import { depthBuckets, statusBuckets } from "./reportModel";
import { ISSUE_PAGE_CAP } from "./reportIssueSections";
import type { AuditReportInput, ReportPage } from "./reportTypes";

function page(url: string, overrides: Partial<ReportPage> = {}): ReportPage {
  return {
    url,
    statusCode: 200,
    title: "Başlık",
    metaDescription: "açıklama",
    wordCount: 100,
    responseTimeMs: 100,
    isIndexable: true,
    inSitemap: true,
    ...overrides,
  };
}

function input(overrides: Partial<AuditReportInput>): AuditReportInput {
  return {
    siteUrl: "https://example.com/",
    startedAt: "2026-09-28T08:00:00.000Z",
    completedAt: "2026-09-28T08:04:00.000Z",
    pagesCrawled: 0,
    pages: [],
    issues: [],
    lighthouse: [],
    ...overrides,
  };
}

describe("issue section", () => {
  /*
   * The point of the rewrite: "10 sayfa" without saying which pages. Every
   * affected URL is listed, up to the cap, and the rest is admitted to.
   */
  it("lists affected pages, caps them, and says how many were cut", () => {
    const count = ISSUE_PAGE_CAP + 7;
    const urls = Array.from(
      { length: count },
      (_, i) => `https://example.com/p${i}`,
    );
    const { html } = buildAuditReportHtml(
      input({
        pagesCrawled: count,
        pages: urls.map((url) => page(url)),
        issues: urls.map((pageUrl, i) => ({
          issueType: "missing-title",
          severity: "critical",
          pageUrl,
          pageId: `id${i}`,
        })),
      }),
    );

    expect(html).toContain("example.com&#47;p0<");
    expect(html).toContain("ve 7 adres daha");
    expect(html).toContain('id="ek-adresler"');
    // The overflow is in the appendix, not dropped.
    expect(html).toContain(`example.com&#47;p${count - 1}<`);
  });

  it("treats a finding with no page as site-wide, not as a page", () => {
    const { html } = buildAuditReportHtml(
      input({
        pagesCrawled: 4,
        issues: [
          {
            issueType: "missing-title",
            severity: "critical",
            pageUrl: "https://example.com/robots.txt",
            pageId: null,
          },
        ],
      }),
    );

    expect(html).toContain("Tüm siteyi ilgilendiriyor");
    expect(html).toContain("Tüm site<");
  });

  it("escapes crawled details too", () => {
    const { html } = buildAuditReportHtml(
      input({
        pagesCrawled: 1,
        issues: [
          {
            issueType: "missing-title",
            severity: "critical",
            pageUrl: "https://example.com/a",
            detailsJson: JSON.stringify({
              target: "<script>alert(1)</script>",
            }),
          },
        ],
      }),
    );
    expect(html).not.toContain("<script>alert(1)");
    expect(html).toContain("&lt;script&gt;");
  });
});

describe("cover", () => {
  it("shows the same score the app computes", () => {
    const { html, summary } = buildAuditReportHtml(input({ pagesCrawled: 2 }));

    // No findings: a clean site is 100, and says so.
    expect(html).toContain("Site puanı 100 üzerinden 100");
    expect(summary).toContain("100/100");
  });
});

describe("chart builders", () => {
  it("escapes labels and never divides by zero", () => {
    const donut = donutChart([{ label: "<b>x</b>", value: 0 }], "0", "sayfa");
    const bars = barChart([{ label: "<b>x</b>", value: 0 }]);

    expect(donut + bars).not.toContain("<b>");
    expect(donut + bars).not.toContain("NaN");
  });

  it("buckets status codes and crawl depth", () => {
    const pages = [
      page("a", { statusCode: 301, crawlDepth: 0 }),
      page("b", { statusCode: 404, crawlDepth: 9 }),
      page("c", { statusCode: null, crawlDepth: null }),
    ];

    expect(statusBuckets(pages).map((b) => b.value)).toEqual([0, 1, 1, 0, 1]);
    const depth = depthBuckets(pages);
    expect(depth[0].value).toBe(1);
    expect(depth[5].value).toBe(1);
    expect(depth.at(-1)).toEqual({ label: "Bilinmiyor", value: 1 });
  });

  it("reports how many a capped list left out", () => {
    expect(capList([1, 2, 3], 2)).toEqual({ shown: [1, 2], hidden: 1 });
  });
});

const scripts = (value: string) => value.match(/<script/gi)?.length ?? 0;

describe("hostile crawled values", () => {
  const ATTACK_URL = 'javascript:alert(1)"><script>';
  const ATTACK_TITLE = "</text><script>";

  // Titles, URLs and redirect targets come from third-party HTML.
  it("never reaches the document unescaped", () => {
    const hostile = [
      page("https://example.com/", {
        title: ATTACK_TITLE,
        redirectUrl: ATTACK_URL,
        canonicalUrl: ATTACK_URL,
      }),
      page(ATTACK_URL, { title: ATTACK_TITLE }),
    ];
    const baseline = buildAuditReportHtml(
      input({ pagesCrawled: 2, pages: [page("https://a.test/")] }),
    ).html;
    const { html } = buildAuditReportHtml(
      input({
        pagesCrawled: 2,
        pages: hostile,
        issues: hostile.map((p, i) => ({
          issueType: "missing-title",
          severity: "critical",
          pageUrl: p.url,
          pageId: `id${i}`,
        })),
      }),
    );

    expect(scripts(html)).toBe(scripts(baseline));
    expect(html).not.toContain('"><script');
    expect(html).not.toContain("</text><script");
    expect(html).not.toMatch(/(?:href|src|action)\s*=\s*["']?\s*javascript:/i);
  });
});
