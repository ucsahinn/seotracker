import { beforeEach, describe, expect, it, vi } from "vitest";
import type {
  Ga4RunReportRequest,
  Ga4RunReportResponse,
} from "@/server/lib/ga4Client";
import { makeGa4Connection } from "./ga4-test-fixtures";
import { Ga4ReportingService } from "./Ga4ReportingService";

const mocks = vi.hoisted(() => ({
  getByProjectId: vi.fn(),
  runReport:
    vi.fn<(request: Ga4RunReportRequest) => Promise<Ga4RunReportResponse>>(),
}));

vi.mock("@/server/features/ga4/repositories/Ga4ConnectionRepository", () => ({
  Ga4ConnectionRepository: { getByProjectId: mocks.getByProjectId },
}));

vi.mock("@/server/lib/ga4Client", () => ({
  createGa4DataClient: () => ({ runReport: mocks.runReport }),
}));

const connection = makeGa4Connection();

const landingHeaders = {
  dimensionHeaders: [{ name: "hostName" }, { name: "landingPage" }],
  metricHeaders: [
    "sessions",
    "activeUsers",
    "engagedSessions",
    "engagementRate",
    "keyEvents",
    "sessionKeyEventRate",
    "transactions",
    "purchaseRevenue",
  ].map((name) => ({ name })),
};

describe("Analytics address groups", () => {
  beforeEach(() => {
    mocks.getByProjectId.mockResolvedValue(connection);
  });
  it("filters normalized variants before pagination, including rows below the UI limit", async () => {
    const pages = ["/other", "/a?utm_source=x", "/a/", "/ab", "/A"];
    mocks.runReport.mockResolvedValue({
      ...landingHeaders,
      rows: pages.map((path) => ({
        dimensionValues: [{ value: "example.com" }, { value: path }],
        metricValues: landingHeaders.metricHeaders.map(() => ({ value: "1" })),
      })),
      rowCount: pages.length,
    });
    const result = await Ga4ReportingService.runReport({
      projectId: "project_1",
      kind: "landing_pages",
      pageGroup: "example.com/a",
      limit: 1,
      offset: 1,
    });
    expect(result.rows.map((row) => row.landingPage)).toEqual(["/a/"]);
    expect(result.totalRowCount).toBe(2);
    expect(result.pageInfo.hasMore).toBe(false);
    expect(result.pageGroup).toMatchObject({
      key: "example.com/a",
      complete: true,
    });
    expect(mocks.runReport).toHaveBeenCalledWith(
      expect.objectContaining({ limit: "1000", offset: "0" }),
    );
  });

  it("rejects a stalled source instead of presenting a partial group", async () => {
    mocks.runReport.mockResolvedValue({
      ...landingHeaders,
      rows: [],
      rowCount: 1001,
    });
    await expect(
      Ga4ReportingService.runReport({
        projectId: "project_1",
        kind: "landing_pages",
        pageGroup: "example.com/a",
      }),
    ).rejects.toMatchObject({ code: "ga4_malformed_response" });
  });

  it.each(["https://example.com/a", "(not set)"])(
    "rejects noncanonical group %s",
    async (pageGroup) => {
      await expect(
        Ga4ReportingService.runReport({
          projectId: "project_1",
          kind: "landing_pages",
          pageGroup,
        }),
      ).rejects.toMatchObject({ code: "validation_error" });
    },
  );
});
