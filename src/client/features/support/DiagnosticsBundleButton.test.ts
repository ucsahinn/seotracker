import { describe, expect, it, vi } from "vitest";

vi.mock("@/serverFunctions/diagnostics", () => ({ getDiagnostics: vi.fn() }));

import { buildDiagnosticsSummary } from "./DiagnosticsBundleButton";

describe("buildDiagnosticsSummary", () => {
  it("prints the failed audit phase and sanitized explanation", () => {
    const diagnostics = {
      version: "0.7.1",
      authMode: "local_noauth",
      generatedAt: "2026-10-26T00:00:00.000Z",
      setup: {
        version: "0.7.1",
        authMode: "local_noauth",
        installKind: "windows",
        port: {
          configured: 8787,
          actual: 8788,
          fallback: { configured: 8787, actual: 8788 },
        },
        checks: {},
      },
      tables: {},
      projects: [],
      connections: { searchConsole: [], analytics: [] },
      audits: [
        {
          id: "audit-1",
          projectId: "project-1",
          startedAt: "2026-10-25 20:24:00",
          status: "failed",
          currentPhase: "failed",
          failedPhase: "lighthouse",
          errorCode: "unknown",
          errorDetail: "Workflow instance errored",
          noticeCode: null,
          urlsDiscovered: 640,
          pagesCrawled: 144,
          pagesTotal: 144,
          lighthouseTotal: 400,
          lighthouseCompleted: 0,
          lighthouseFailed: 10,
          completedAt: "2026-10-25 20:27:00",
          issueCount: 1,
          lighthouseErrors: [
            {
              count: 10,
              errorMessage: "PageSpeed timed out for [URL redacted]",
            },
          ],
        },
      ],
    } as Parameters<typeof buildDiagnosticsSummary>[0];

    const summary = buildDiagnosticsSummary(diagnostics, 0);

    expect(summary).toContain(
      "unknown · phase=lighthouse · Workflow instance errored · found=640",
    );
    expect(summary).toContain("Port: 8788 (ayarlanan: 8787)");
    expect(summary).toContain("seowatcher bu sefer 8788 numarasında");
    expect(summary).toContain(
      "PageSpeed ölçüm hatası (10): PageSpeed timed out for [URL redacted]",
    );
  });
});
