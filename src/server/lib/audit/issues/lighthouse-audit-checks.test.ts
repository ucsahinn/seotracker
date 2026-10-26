import { describe, expect, it } from "vitest";
import type { StoredAuditResult } from "@/server/lib/lighthouseStoredPayload";
import {
  lighthouseAuditIssuesFor,
  type LighthousePageReport,
} from "./lighthouse-audit-checks";

const result = (
  overrides: Partial<StoredAuditResult> = {},
): StoredAuditResult => ({
  score: 1,
  mode: "binary",
  savingsMs: null,
  savingsBytes: null,
  numericValue: null,
  itemCount: null,
  checklist: null,
  mainThreadMs: null,
  examples: [],
  ...overrides,
});

const page = (
  audits: Record<string, StoredAuditResult> | null,
  overrides: Partial<LighthousePageReport> = {},
): LighthousePageReport => ({
  pageId: "p1",
  pageUrl: "https://example.com/a",
  isIndexable: true,
  audits,
  fieldData: null,
  labLcpMs: null,
  labCls: null,
  ...overrides,
});

const field = (lcpMs: number) => ({
  overall: null,
  largestContentfulPaint: { percentile: lcpMs, category: "AVERAGE" },
  cumulativeLayoutShift: { percentile: 5, category: "FAST" },
  interactionToNextPaint: null,
  firstContentfulPaint: null,
  timeToFirstByte: null,
});

const run = (pages: LighthousePageReport[]) =>
  lighthouseAuditIssuesFor(pages, "https://example.com/");

const types = (pages: LighthousePageReport[]) =>
  run(pages).issues.map((issue) => issue.issueType);

describe("lighthouseAuditIssuesFor", () => {
  it("reports a failed opportunity with its savings, not a trivial one", () => {
    const bad = page({
      "render-blocking-insight": result({
        score: 0,
        mode: "metricSavings",
        savingsMs: 820,
        examples: ["https://example.com/app.css"],
      }),
    });
    const trivial = page({
      "render-blocking-insight": result({
        score: 0,
        mode: "metricSavings",
        savingsMs: 40,
      }),
    });

    expect(run([bad]).issues).toEqual([
      expect.objectContaining({
        issueType: "lh-render-blocking",
        details: {
          lighthouseAudit: "render-blocking-insight",
          savingsMs: 820,
          examples: ["https://example.com/app.css"],
        },
      }),
    ]);
    const quiet = run([trivial]);
    expect(quiet.issues).toEqual([]);
    expect(quiet.measured.has("lh-render-blocking")).toBe(true);
  });

  it("splits the document latency checklist into its three findings", () => {
    const checklist = (values: Record<string, boolean>) =>
      page({
        "document-latency-insight": result({
          score: 0,
          mode: "metricSavings",
          checklist: values,
        }),
      });

    expect(
      types([
        checklist({
          noRedirects: true,
          serverResponseIsFast: true,
          usesCompression: false,
        }),
      ]),
    ).toEqual(["lh-text-compression"]);
    expect(
      types([
        checklist({
          noRedirects: true,
          serverResponseIsFast: true,
          usesCompression: true,
        }),
      ]),
    ).toEqual([]);
  });

  it("flags heavy third parties by main-thread time, not by presence", () => {
    const heavy = page({
      "third-parties-insight": result({
        score: null,
        mode: "informative",
        mainThreadMs: 900,
      }),
    });
    const light = page({
      "third-parties-insight": result({
        score: null,
        mode: "informative",
        mainThreadMs: 120,
      }),
    });

    expect(types([heavy])).toEqual(["lh-third-parties"]);
    expect(types([light])).toEqual([]);
  });

  it("reports an accessibility failure with the failing element count", () => {
    const issues = run([
      page({ "color-contrast": result({ score: 0, itemCount: 7 }) }),
    ]).issues;

    expect(issues[0]).toMatchObject({
      issueType: "lh-a11y-color-contrast",
      details: { lighthouseAudit: "color-contrast", items: 7 },
    });
    expect(types([page({ "color-contrast": result({ score: 1 }) })])).toEqual(
      [],
    );
  });

  it("leaves an audit Lighthouse did not run or could not finish unmeasured", () => {
    const { issues, measured } = run([
      page({ "image-alt": result({ score: null, mode: "error" }) }),
      page(null),
    ]);

    expect(issues).toEqual([]);
    expect(measured.has("lh-a11y-image-alt")).toBe(false);
    expect(measured.has("lh-canonical")).toBe(false);
  });

  it("only reports is-crawlable against a page the crawl found indexable", () => {
    const blocked = { "is-crawlable": result({ score: 0 }) };

    expect(types([page(blocked)])).toEqual(["lh-is-crawlable"]);
    expect(types([page(blocked, { isIndexable: false })])).toEqual([]);
  });

  it("reports an invalid robots.txt once for the site", () => {
    const bad = { "robots-txt": result({ score: 0 }) };
    const issues = run([page(bad), page(bad, { pageId: "p2" })]).issues;

    expect(issues).toEqual([
      expect.objectContaining({ issueType: "lh-robots-txt", pageId: null }),
    ]);
  });

  it("reports the band before poor from field data, and leaves poor to its own check", () => {
    expect(
      types([page({}, { fieldData: field(3100), labLcpMs: 2000 })]),
    ).toEqual(["cwv-lcp-needs-improvement"]);
    // Good field LCP and CLS 0.05: nothing.
    expect(types([page({}, { fieldData: field(1800) })])).toEqual([]);
    // Lab already poor: the poor check owns this page.
    expect(
      types([page({}, { fieldData: field(3100), labLcpMs: 4600 })]),
    ).toEqual([]);
    // No field data: the lab value decides.
    expect(types([page({}, { labCls: 0.18 })])).toEqual([
      "cwv-cls-needs-improvement",
    ]);
  });
});
