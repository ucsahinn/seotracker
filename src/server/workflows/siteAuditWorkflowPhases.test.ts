import { beforeEach, describe, expect, it, vi } from "vitest";
import type { LighthouseResult } from "@/server/lib/audit/types";

const {
  fetchLighthouseResultMock,
  selectLighthouseSampleMock,
  storeLighthouseResultMock,
  stepDoMock,
  getPagesForAuditMock,
  insertLighthouseResultsMock,
  updateAuditProgressMock,
} = vi.hoisted(() => ({
  fetchLighthouseResultMock: vi.fn(),
  selectLighthouseSampleMock: vi.fn(),
  storeLighthouseResultMock: vi.fn(),
  stepDoMock: vi.fn(),
  getPagesForAuditMock: vi.fn(),
  insertLighthouseResultsMock: vi.fn(),
  updateAuditProgressMock: vi.fn(),
}));

// The real module reaches cloudflare:workers through r2.ts at import time.
vi.mock("cloudflare:workers", () => ({ env: {} }));
// failedLighthouseFetch stays real — the failure-path test asserts on the
// rows it builds.
vi.mock("@/server/lib/audit/lighthouse", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    fetchLighthouseResult: fetchLighthouseResultMock,
    selectLighthouseSample: selectLighthouseSampleMock,
    storeLighthouseResult: storeLighthouseResultMock,
  };
});
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: {
    getPagesForAudit: getPagesForAuditMock,
    insertLighthouseResults: insertLighthouseResultsMock,
    updateAuditProgress: updateAuditProgressMock,
  },
}));
vi.mock("@/server/features/audit/AuditScratchpad", () => ({
  getAuditScratchpad: vi.fn(),
}));
vi.mock("@/server/lib/audit/progress-kv", () => ({ AuditProgressKV: {} }));
vi.mock("@/server/lib/audit/discovery", () => ({
  discoverUrls: vi.fn(),
  parseRobotsTxt: vi.fn(),
}));
vi.mock("@/server/lib/audit/issues/multipage", () => ({
  runMultipageChecks: vi.fn(),
}));
vi.mock("@/server/lib/observability", () => ({ captureServerEvent: vi.fn() }));
vi.mock("@/server/workflows/siteAuditWorkflowCrawl", () => ({
  runCrawlPhase: vi.fn(),
}));

import { runLighthousePhase } from "@/server/workflows/siteAuditWorkflowPhases";

const PHASE_PARAMS = {
  auditId: "audit-1",
  workflowInstanceId: "workflow-1",
  actorUserId: "user-1",
  projectId: "project-1",
  startUrl: "https://example.com/",
  config: { maxPages: 50, lighthouseStrategy: "auto" as const },
};

// runLighthousePhase only ever calls `step.do`; the rest of the WorkflowStep
// surface is never touched, so the stub supplies just that one method.
function stepStub() {
  const step: Parameters<typeof runLighthousePhase>[0] = {
    do: stepDoMock,
    sleep: vi.fn(),
    sleepUntil: vi.fn(),
    waitForEvent: vi.fn(),
  };
  return step;
}

describe("runLighthousePhase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPagesForAuditMock.mockResolvedValue([
      {
        id: "page-1",
        url: "https://example.com/",
        statusCode: 200,
      },
    ]);
    selectLighthouseSampleMock.mockReturnValue(["https://example.com/"]);
    fetchLighthouseResultMock.mockImplementation(
      async (_url: string, pageId: string, strategy: "mobile" | "desktop") => ({
        result: { pageId, strategy },
        payloadJson: "{}",
      }),
    );
    storeLighthouseResultMock.mockImplementation(
      async ({ fetched }: { fetched: { result: unknown } }) => fetched.result,
    );
    insertLighthouseResultsMock.mockResolvedValue(undefined);
    updateAuditProgressMock.mockResolvedValue(undefined);
  });

  it("retries persistence without re-running a completed fetch step", async () => {
    let persistenceAttempts = 0;
    let fetchRetryLimit: number | undefined;
    let persistenceRetryLimit: number | undefined;
    stepDoMock.mockImplementation(
      async (
        name: string,
        config: { retries?: { limit?: number } },
        callback: () => Promise<unknown>,
      ) => {
        if (name === "lighthouse-fetch-1") {
          fetchRetryLimit = config.retries?.limit;
        }
        if (name === "lighthouse-persist-chunk-1") {
          persistenceRetryLimit = config.retries?.limit;
          persistenceAttempts += 1;
          try {
            return await callback();
          } catch (error) {
            if ((config.retries?.limit ?? 0) < 1) throw error;
            persistenceAttempts += 1;
            return callback();
          }
        }
        return callback();
      },
    );

    updateAuditProgressMock
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("progress unavailable"))
      .mockResolvedValueOnce(undefined);

    await runLighthousePhase(stepStub(), PHASE_PARAMS);

    expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(2);
    expect(storeLighthouseResultMock).toHaveBeenCalledTimes(4);
    expect(insertLighthouseResultsMock).toHaveBeenCalledTimes(2);
    expect(persistenceAttempts).toBe(2);
    expect(fetchRetryLimit).toBe(2);
    expect(persistenceRetryLimit).toBe(3);
    expect(updateAuditProgressMock).toHaveBeenLastCalledWith(
      "audit-1",
      "workflow-1",
      { lighthouseCompleted: 2, lighthouseFailed: 0 },
    );
  });

  it("persists sibling results when one fetch step fails", async () => {
    getPagesForAuditMock.mockResolvedValue([
      { id: "page-1", url: "https://example.com/", statusCode: 200 },
      { id: "page-2", url: "https://example.com/about", statusCode: 200 },
    ]);
    selectLighthouseSampleMock.mockReturnValue([
      "https://example.com/",
      "https://example.com/about",
    ]);
    stepDoMock.mockImplementation(
      async (
        name: string,
        _config: unknown,
        callback: () => Promise<unknown>,
      ) => {
        if (name === "lighthouse-fetch-2") {
          throw new Error("step timed out");
        }
        return callback();
      },
    );

    await runLighthousePhase(stepStub(), PHASE_PARAMS);

    // Only the surviving URL's pair was fetched; the failed step's checks
    // still land as errorMessage rows in the same insert.
    expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(2);
    expect(insertLighthouseResultsMock).toHaveBeenCalledTimes(1);
    // vi.fn() mock calls are untyped; the mocked storeLighthouseResult above
    // passes fetch results through as rows.
    // oxlint-disable-next-line typescript-eslint/no-unsafe-type-assertion
    const inserted = insertLighthouseResultsMock.mock
      .calls[0]?.[1] as LighthouseResult[];
    expect(inserted).toHaveLength(4);
    expect(
      inserted.filter((row) => row.errorMessage === "step timed out"),
    ).toHaveLength(2);
    expect(updateAuditProgressMock).toHaveBeenLastCalledWith(
      "audit-1",
      "workflow-1",
      { lighthouseCompleted: 2, lighthouseFailed: 2 },
    );
  });
});
