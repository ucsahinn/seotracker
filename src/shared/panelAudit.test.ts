import { describe, expect, it } from "vitest";
import {
  selectPanelAudits,
  auditIsStale,
  panelFindingCounts,
} from "./panelAudit";
describe("Panel audit scope", () => {
  it("keeps own-site progress and completed snapshot when a foreign crawl is newer (previously selected foreign latest)", () => {
    const a = {
      id: "a",
      startUrl: "https://www.example.com/",
      status: "completed",
    };
    const c = {
      id: "c",
      startUrl: "https://example.com/blog",
      status: "running",
    };
    const b = { id: "b", startUrl: "https://other.com", status: "completed" };
    expect(selectPanelAudits([b, c, a], "example.com")).toEqual({
      latestAttempt: c,
      snapshot: a,
    });
    expect(selectPanelAudits([a], null)).toEqual({
      latestAttempt: null,
      snapshot: null,
    });
  });
  it("marks the exact seven-day boundary stale (readiness previously included it)", () => {
    expect(auditIsStale(0, 7 * 86400000)).toBe(true);
    expect(auditIsStale(1, 7 * 86400000)).toBe(false);
  });
});

it("separates unique affected pages, check types, repeated link occurrences and site-wide findings", () => {
  const page = {
    pageId: "p",
    pageUrl: "https://example.com/",
    severity: "critical" as const,
    issueType: "broken-link",
  };
  expect(
    panelFindingCounts([
      page,
      page,
      { ...page, issueType: "missing-title" },
      { ...page, pageId: null, issueType: "site-check" },
    ]),
  ).toEqual({
    affectedPages: 1,
    failedCheckTypes: 3,
    severityTotals: { critical: 2, warning: 0, info: 0 },
    siteSeverityTotals: { critical: 1, warning: 0, info: 0 },
    severityCheckTypes: { critical: 3, warning: 0, info: 0 },
  });
});
