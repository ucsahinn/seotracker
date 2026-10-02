import { expect, it, vi } from "vitest";
import { diagnosticsTool } from "./diagnostics-tool";

const mocks = vi.hoisted(() => ({
  collectDiagnostics: vi.fn(),
  getQuotaStatus: vi.fn(),
}));

vi.mock("@/server/features/diagnostics/collectDiagnostics", () => ({
  collectDiagnostics: mocks.collectDiagnostics,
}));
vi.mock("@/server/features/quotas/QuotaService", () => ({
  getQuotaStatus: mocks.getQuotaStatus,
}));

it("adds each active project's quota meters", async () => {
  mocks.collectDiagnostics.mockResolvedValue({
    version: "1.0.0",
    authMode: "none",
    generatedAt: "2026-10-02T00:00:00.000Z",
    setup: { checks: {} },
    projects: [
      { id: "p1", archivedAt: null },
      { id: "p2", archivedAt: "2026-01-01" },
    ],
    connections: { searchConsole: [], analytics: [] },
    audits: [],
  });
  mocks.getQuotaStatus.mockResolvedValue({
    items: [
      {
        id: "url_inspection",
        kind: "url_inspection",
        label: "URL Inspection",
        used: 5,
        limit: 2000,
        state: "ok",
        detail: "Last 24 hours.",
        source: "gsc_url_inspections",
        updatedAt: null,
      },
    ],
  });

  const result = await diagnosticsTool.handler();

  expect(mocks.getQuotaStatus).toHaveBeenCalledTimes(1);
  expect(result.structuredContent?.quotas).toEqual([
    {
      projectId: "p1",
      id: "url_inspection",
      label: "URL Inspection",
      used: 5,
      limit: 2000,
      state: "ok",
      detail: "Last 24 hours.",
    },
  ]);
});
