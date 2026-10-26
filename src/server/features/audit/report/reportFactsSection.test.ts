import { describe, expect, it } from "vitest";
import { unknownFacts } from "@/server/lib/audit/site-probes/site-facts-fixture";
import { buildAuditReportHtml } from "./buildAuditReportHtml";
import type { AuditReportInput } from "./reportTypes";

type Insights = NonNullable<AuditReportInput["insights"]>;

const insights: Insights = {
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
  speed: null,
  speedError: null,
  analyticsTags: [],
  schemaTypes: [],
  googleInspected: null,
  platformHost: false,
};

const report = (siteFacts: AuditReportInput["siteFacts"]) =>
  buildAuditReportHtml({
    siteUrl: "https://example.com/",
    startedAt: "2026-09-28T08:00:00.000Z",
    completedAt: "2026-09-28T08:04:00.000Z",
    pagesCrawled: 3,
    pages: [],
    issues: [],
    lighthouse: [],
    insights,
    siteFacts,
  }).html;

describe("facts section", () => {
  // An audit from before the site facts never read tags or JSON-LD; empty
  // lists there are "not measured", not "none found".
  it("does not claim no tags or structured data for an older audit", () => {
    const html = report(null);

    expect(html).not.toContain("Hiçbir sayfada etiket bulunamadı.");
    expect(html).not.toContain(
      "Hiçbir sayfada yapılandırılmış veri bulunamadı.",
    );
    expect(html).not.toContain("Twitter kartı tanımlı değil.");
  });

  it("says none were found when the audit looked", () => {
    const html = report(unknownFacts());

    expect(html).toContain("Hiçbir sayfada etiket bulunamadı.");
    expect(html).toContain("Twitter kartı tanımlı değil.");
  });
});
