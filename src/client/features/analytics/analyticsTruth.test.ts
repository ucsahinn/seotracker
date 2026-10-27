import { describe, expect, it } from "vitest";
import {
  availableChips,
  buildShareSegments,
  applySegment,
} from "./reportInsights";
import { buildKpis } from "./reportKpis";
import { formatGa4Metric, compareReportCells } from "./ReportTable";
import { buildReportExport } from "./reportExport";
import { buildSummary } from "./reportBuckets";

describe("Analytics evidence boundaries", () => {
  it("does not turn restricted item revenue into zero or hide refunds in shares", () => {
    expect(
      buildKpis(
        "ecommerce_performance",
        [{ itemRevenue: null }],
        "listed",
        "EUR",
      )[0]?.value,
    ).toBe("–");
    expect(
      buildSummary(
        "ecommerce_performance",
        ["itemName", "itemId"],
        [
          { itemName: "A", itemId: "1", itemRevenue: 100 },
          { itemName: "B", itemId: "2", itemRevenue: -20 },
        ],
        (x) => x,
      ),
    ).toBeNull();
  });
  it("keeps equal paths on different hosts separately selectable", () => {
    const rows = [
      { hostName: "a.test", landingPage: "/", sessions: 10 },
      { hostName: "b.test", landingPage: "/", sessions: 20 },
    ];
    const segments = buildShareSegments(rows, "landingPage", "sessions");
    expect(segments).toHaveLength(2);
    expect(applySegment(rows, "landingPage", segments[0] ?? null)).toEqual([
      rows[1],
    ]);
  });
  it("does not describe overlapping audience users as a partition", () => {
    const plan = buildSummary(
      "audience_breakdown",
      ["deviceCategory"],
      [
        { deviceCategory: "mobile", activeUsers: 1 },
        { deviceCategory: "desktop", activeUsers: 1 },
      ],
      (x) => x,
    );
    expect(plan?.form).toBe("bars");
    expect(plan?.showShares).toBe(false);
  });
  it("requires four eligible pages with thirty sessions for a conversion heuristic", () => {
    const rows = [100, 80, 20, 10].map((sessions, i) => ({
      sessions,
      sessionKeyEventRate: i / 10,
    }));
    expect(
      availableChips(["sessions", "sessionKeyEventRate"], rows).find(
        (c) => c.id === "weakConversion",
      ),
    ).toBeUndefined();
  });
  it("disables confident conversion advice when quality is limited", () => {
    const rows = [100, 80, 60, 40].map((sessions, i) => ({
      sessions,
      sessionKeyEventRate: i / 10,
    }));
    expect(
      availableChips(["sessions", "sessionKeyEventRate"], rows, {
        limited: true,
      }).find((c) => c.id === "weakConversion"),
    ).toBeUndefined();
  });
  it("formats total engagement seconds as time and names unknown currency", () => {
    expect(formatGa4Metric("userEngagementDuration", 120, null)).toContain("2");
    expect(formatGa4Metric("itemRevenue", 80, null)).toContain(
      "para birimi bilinmiyor",
    );
  });
  it("keeps nulls last in either sort direction", () => {
    expect(compareReportCells(null, 1, false, true)).toBeLessThan(0);
    expect(compareReportCells(null, 1, false, false)).toBeGreaterThan(0);
  });
  it("keeps refund-adjusted revenue consistent with its numeric target", () => {
    const kpi = buildKpis(
      "ecommerce_performance",
      [{ itemRevenue: 100 }, { itemRevenue: -20 }],
      "listed",
      "EUR",
    )[0];
    expect(kpi?.animateTo?.value).toBe(80);
  });
  it("exports raw numeric cells with recoverable exact scope", () => {
    const row = { hostName: "example.com", landingPage: "/x", sessions: 5000 };
    const result = {
      propertyDisplayName: "Site",
      propertyId: "properties/123",
      dateRange: { startDate: "2026-10-01", endDate: "2026-10-07" },
      propertyTimeZone: "Europe/Istanbul",
      channel: "organic_search",
      currencyCode: "EUR",
      dimensions: ["hostName", "landingPage"],
      metrics: ["sessions"],
      rows: [row],
      rowCount: 1,
      totalRowCount: 300,
      sampled: false,
      thresholded: false,
      emptyReason: null,
      pageInfo: { offset: 200, limit: 50, hasMore: true, nextOffset: 201 },
    };
    const exported = buildReportExport({
      result,
      kind: "landing_pages",
      organicOnly: true,
      rows: [row],
      filters: [],
      segmentKey: null,
      focusedRowKey: null,
      sort: { key: "sessions", desc: true },
    });
    expect(exported.rows[0]?.[2]).toBe(5000);
    expect(JSON.parse(String(exported.rows[0]?.[3]))).toMatchObject({
      propertyId: "properties/123",
      dates: result.dateRange,
      timeZone: "Europe/Istanbul",
      page: { offset: 200 },
      listedRows: 1,
      exportedRows: 1,
    });
  });
});
