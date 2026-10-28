import { expect, it, vi } from "vitest";
import { Ga4ReportingService } from "./Ga4ReportingService";
import { makeGa4Connection } from "./ga4-test-fixtures";
const mocks = vi.hoisted(() => ({
  getByProjectId: vi.fn(),
  runReport: vi.fn(),
}));
vi.mock("@/server/features/ga4/repositories/Ga4ConnectionRepository", () => ({
  Ga4ConnectionRepository: { getByProjectId: mocks.getByProjectId },
}));
vi.mock("@/server/lib/ga4Client", () => ({
  createGa4DataClient: () => ({ runReport: mocks.runReport }),
}));
it("timestamps each fresh report rather than reusing an earlier result", async () => {
  mocks.getByProjectId.mockResolvedValue(makeGa4Connection());
  mocks.runReport.mockResolvedValue({
    rows: [],
    rowCount: 0,
  });
  vi.useFakeTimers();
  try {
    vi.setSystemTime(new Date("2026-10-28T10:00:00Z"));
    const first = await Ga4ReportingService.runReport({
      projectId: "project_1",
      kind: "landing_pages",
    });
    vi.setSystemTime(new Date("2026-10-28T11:00:00Z"));
    const second = await Ga4ReportingService.runReport({
      projectId: "project_1",
      kind: "landing_pages",
    });
    expect(first.fetchedAt).toBe("2026-10-28T10:00:00.000Z");
    expect(second.fetchedAt).toBe("2026-10-28T11:00:00.000Z");
  } finally {
    vi.useRealTimers();
  }
});
