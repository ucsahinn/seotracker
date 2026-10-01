import { beforeEach, describe, expect, it, vi } from "vitest";
import type { LighthouseResult } from "@/server/lib/audit/types";

const {
  fetchLighthouseResultMock,
  selectLighthousePagesMock,
  storeLighthouseResultMock,
  stepDoMock,
  getPagesForAuditMock,
  insertLighthouseResultsMock,
  updateAuditProgressMock,
  getPageSpeedApiKeyMock,
  sleepMock,
} = vi.hoisted(() => ({
  sleepMock: vi.fn(),
  fetchLighthouseResultMock: vi.fn(),
  selectLighthousePagesMock: vi.fn(),
  storeLighthouseResultMock: vi.fn(),
  stepDoMock: vi.fn(),
  getPagesForAuditMock:
    vi.fn<
      () => Promise<
        Array<{ id: string; url: string; [field: string]: unknown }>
      >
    >(),
  insertLighthouseResultsMock: vi.fn(),
  updateAuditProgressMock: vi.fn(),
  getPageSpeedApiKeyMock: vi.fn(),
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
    selectLighthousePages: selectLighthousePagesMock,
    storeLighthouseResult: storeLighthouseResultMock,
  };
});
vi.mock("@/server/features/lighthouse/pagespeed-config", () => ({
  getPageSpeedApiKey: getPageSpeedApiKeyMock,
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: {
    getPagesForAudit: getPagesForAuditMock,
    // A wave looks its URLs up by id; the pages come from the same fixture.
    getPageUrlsByIds: async (_auditId: string, ids: string[]) =>
      (await getPagesForAuditMock())
        .filter((page) => ids.includes(page.id))
        .map((page) => ({ id: page.id, url: page.url })),
    updateAuditProgress: updateAuditProgressMock,
  },
}));
// Lighthouse rows moved to their own repository when AuditRepository
// crossed its line ceiling; they come from a different source (PageSpeed
// Insights, not this crawler), which is the seam that cost least to cut.
vi.mock(
  "@/server/features/audit/repositories/AuditLighthouseRepository",
  () => ({
    AuditLighthouseRepository: {
      insertLighthouseResults: insertLighthouseResultsMock,
    },
  }),
);
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

import { UNKEYED_LIGHTHOUSE_PAGE_CAP } from "@/shared/audit-limits";
import { lighthouseStepCount } from "@/server/workflows/auditStepBudget";
import { runLighthousePhase } from "@/server/workflows/siteAuditWorkflowLighthouse";

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
    sleep: sleepMock,
    sleepUntil: vi.fn(),
    waitForEvent: vi.fn(),
  };
  return step;
}

const rateLimited = (pageId: string, strategy: "mobile" | "desktop") => ({
  result: { pageId, strategy, errorMessage: "429 per minute" },
  payloadJson: null,
  rateLimited: true,
});
const passThrough = async (
  _name: string,
  _config: unknown,
  callback: () => Promise<unknown>,
) => callback();

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
    selectLighthousePagesMock.mockReturnValue(["https://example.com/"]);
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
    getPageSpeedApiKeyMock.mockResolvedValue("key");
  });

  it("retries the wave step; rows and R2 keys are idempotent so the re-fetch is harmless", async () => {
    let chunkAttempts = 0;
    let chunkRetryLimit: number | undefined;
    stepDoMock.mockImplementation(
      async (
        name: string,
        config: { retries?: { limit?: number } },
        callback: () => Promise<unknown>,
      ) => {
        if (name === "lighthouse-chunk-1") {
          chunkRetryLimit = config.retries?.limit;
          chunkAttempts += 1;
          try {
            return await callback();
          } catch (error) {
            if ((config.retries?.limit ?? 0) < 1) throw error;
            chunkAttempts += 1;
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

    // Attempt 1 fetched and failed at progress; attempt 2 re-ran everything.
    expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(4);
    expect(insertLighthouseResultsMock).toHaveBeenCalledTimes(2);
    expect(chunkAttempts).toBe(2);
    expect(chunkRetryLimit).toBe(2);
    expect(updateAuditProgressMock).toHaveBeenLastCalledWith(
      "audit-1",
      "workflow-1",
      { lighthouseCompleted: 2, lighthouseFailed: 0 },
    );
  });

  it("records error rows for a wave whose step fails after retries", async () => {
    getPagesForAuditMock.mockResolvedValue([
      { id: "page-1", url: "https://example.com/", statusCode: 200 },
      { id: "page-2", url: "https://example.com/about", statusCode: 200 },
    ]);
    selectLighthousePagesMock.mockReturnValue([
      "https://example.com/",
      "https://example.com/about",
    ]);
    stepDoMock.mockImplementation(
      async (
        name: string,
        _config: unknown,
        callback: () => Promise<unknown>,
      ) => {
        if (name === "lighthouse-chunk-1") {
          throw new Error("step timed out");
        }
        return callback();
      },
    );

    await runLighthousePhase(stepStub(), PHASE_PARAMS);

    // The wave step threw before fetching; its checks land as errorMessage
    // rows through the fallback step.
    expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(0);
    expect(insertLighthouseResultsMock).toHaveBeenCalledTimes(1);
    // vi.fn() mock calls are untyped; the mocked storeLighthouseResult above
    // passes fetch results through as rows.
    // oxlint-disable-next-line typescript-eslint/no-unsafe-type-assertion
    const inserted = insertLighthouseResultsMock.mock
      .calls[0]?.[1] as LighthouseResult[];
    expect(inserted).toHaveLength(4);
    expect(
      inserted.filter((row) => row.errorMessage === "step timed out"),
    ).toHaveLength(4);
    expect(updateAuditProgressMock).toHaveBeenLastCalledWith(
      "audit-1",
      "workflow-1",
      { lighthouseCompleted: 0, lighthouseFailed: 4 },
    );
  });

  it("creates one step per wave of five URLs and returns only counts", async () => {
    const pages = Array.from({ length: 12 }, (_, index) => ({
      id: `page-${index}`,
      url: `https://example.com/p${index}`,
      statusCode: 200,
    }));
    getPagesForAuditMock.mockResolvedValue(pages);
    selectLighthousePagesMock.mockReturnValue(pages.map((page) => page.url));
    const names: string[] = [];
    const returned: unknown[] = [];
    stepDoMock.mockImplementation(
      async (
        name: string,
        _config: unknown,
        callback: () => Promise<unknown>,
      ) => {
        names.push(name);
        const value = await callback();
        returned.push(value);
        return value;
      },
    );

    await runLighthousePhase(stepStub(), PHASE_PARAMS);

    expect(names).toEqual([
      "select-lighthouse-sample",
      "lighthouse-chunk-1",
      "lighthouse-chunk-2",
      "lighthouse-chunk-3",
    ]);
    expect(names.length - 1).toBe(lighthouseStepCount(12));
    expect(returned[1]).toEqual({
      completed: 10,
      failed: 0,
      quotaExhausted: false,
      pending: [],
    });
  });

  it("caps the run when no PageSpeed key is set and leaves it open with one", async () => {
    stepDoMock.mockImplementation(
      async (
        _name: string,
        _config: unknown,
        callback: () => Promise<unknown>,
      ) => callback(),
    );

    await runLighthousePhase(stepStub(), PHASE_PARAMS);
    expect(selectLighthousePagesMock.mock.calls[0]?.[3]).toBe(
      Number.POSITIVE_INFINITY,
    );

    getPageSpeedApiKeyMock.mockResolvedValue(undefined);
    await runLighthousePhase(stepStub(), PHASE_PARAMS);
    expect(selectLighthousePagesMock.mock.calls[1]?.[3]).toBe(
      UNKEYED_LIGHTHOUSE_PAGE_CAP,
    );
  });

  it("stops after the chunk that hit the daily quota and keeps what it has", async () => {
    // Six pages = two chunks of five and one; the quota hits in the first.
    const pages = Array.from({ length: 6 }, (_, index) => ({
      id: `page-${index}`,
      url: `https://example.com/p${index}`,
      statusCode: 200,
    }));
    getPagesForAuditMock.mockResolvedValue(pages);
    selectLighthousePagesMock.mockReturnValue(pages.map((page) => page.url));
    fetchLighthouseResultMock.mockImplementation(
      async (url: string, pageId: string, strategy: "mobile" | "desktop") =>
        url.endsWith("/p3")
          ? {
              result: { pageId, strategy, errorMessage: "Kota doldu: dolu" },
              payloadJson: null,
              quotaExhausted: true,
            }
          : { result: { pageId, strategy }, payloadJson: "{}" },
    );
    stepDoMock.mockImplementation(
      async (
        _name: string,
        _config: unknown,
        callback: () => Promise<unknown>,
      ) => callback(),
    );

    await runLighthousePhase(stepStub(), PHASE_PARAMS);

    // Only the first chunk ran: five pages, ten checks, two of them quota rows.
    expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(10);
    expect(insertLighthouseResultsMock).toHaveBeenCalledTimes(1);
    expect(updateAuditProgressMock).toHaveBeenLastCalledWith(
      "audit-1",
      "workflow-1",
      { lighthouseCompleted: 8, lighthouseFailed: 2 },
    );
  });

  describe("per-minute rate limit", () => {
    function insertedRows() {
      // The mocked storeLighthouseResult passes fetch results through as rows.
      return insertLighthouseResultsMock.mock.calls.flatMap(
        // oxlint-disable-next-line typescript-eslint/no-unsafe-type-assertion
        (call) => call[1] as LighthouseResult[],
      );
    }

    it("pauses, re-runs only the rate-limited checks and keeps first-pass successes", async () => {
      getPagesForAuditMock.mockResolvedValue([
        { id: "page-1", url: "https://example.com/", statusCode: 200 },
        { id: "page-2", url: "https://example.com/about", statusCode: 200 },
      ]);
      selectLighthousePagesMock.mockReturnValue([
        "https://example.com/",
        "https://example.com/about",
      ]);
      const names: string[] = [];
      stepDoMock.mockImplementation(
        async (name: string, ...rest: [unknown, () => Promise<unknown>]) => {
          names.push(name);
          return passThrough(name, ...rest);
        },
      );
      // page-2 mobile is rejected once, then succeeds.
      let aboutMobileCalls = 0;
      fetchLighthouseResultMock.mockImplementation(
        async (url: string, pageId: string, strategy: "mobile" | "desktop") => {
          if (url.endsWith("/about") && strategy === "mobile") {
            aboutMobileCalls += 1;
            if (aboutMobileCalls === 1) return rateLimited(pageId, strategy);
          }
          return { result: { pageId, strategy }, payloadJson: "{}" };
        },
      );

      await runLighthousePhase(stepStub(), PHASE_PARAMS);

      // 4 checks first pass + only the 1 rejected check again.
      expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(5);
      expect(sleepMock).toHaveBeenCalledWith(
        "lighthouse-chunk-1-cooldown-1",
        "65 seconds",
      );
      expect(names).toEqual([
        "select-lighthouse-sample",
        "lighthouse-chunk-1",
        "lighthouse-chunk-1-retry-1",
      ]);
      const rows = insertedRows();
      expect(rows).toHaveLength(4);
      expect(rows.filter((row) => row.errorMessage)).toHaveLength(0);
      expect(updateAuditProgressMock).toHaveBeenLastCalledWith(
        "audit-1",
        "workflow-1",
        { lighthouseCompleted: 4, lighthouseFailed: 0 },
      );
    });

    it("stores an error row only for a check still rejected after the re-passes", async () => {
      stepDoMock.mockImplementation(passThrough);
      fetchLighthouseResultMock.mockImplementation(
        async (_url: string, pageId: string, strategy: "mobile" | "desktop") =>
          strategy === "mobile"
            ? rateLimited(pageId, strategy)
            : { result: { pageId, strategy }, payloadJson: "{}" },
      );

      await runLighthousePhase(stepStub(), PHASE_PARAMS);

      // desktop once; mobile on the first pass and both re-passes.
      expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(4);
      expect(sleepMock).toHaveBeenCalledTimes(2);
      const rows = insertedRows();
      expect(rows).toHaveLength(2);
      expect(rows.filter((row) => row.errorMessage)).toEqual([
        expect.objectContaining({ strategy: "mobile" }),
      ]);
      expect(updateAuditProgressMock).toHaveBeenLastCalledWith(
        "audit-1",
        "workflow-1",
        { lighthouseCompleted: 1, lighthouseFailed: 1 },
      );
    });

    it("does not wait out a daily quota: rate-limited siblings are stored and the phase stops", async () => {
      stepDoMock.mockImplementation(passThrough);
      fetchLighthouseResultMock.mockImplementation(
        async (_url: string, pageId: string, strategy: "mobile" | "desktop") =>
          strategy === "mobile"
            ? rateLimited(pageId, strategy)
            : {
                result: { pageId, strategy, errorMessage: "Kota doldu: dolu" },
                payloadJson: null,
                quotaExhausted: true,
              },
      );

      await runLighthousePhase(stepStub(), PHASE_PARAMS);

      expect(fetchLighthouseResultMock).toHaveBeenCalledTimes(2);
      expect(sleepMock).not.toHaveBeenCalled();
      expect(insertedRows()).toHaveLength(2);
    });

    it("pauses between waves but not after the last one", async () => {
      const pages = Array.from({ length: 6 }, (_, index) => ({
        id: `page-${index}`,
        url: `https://example.com/p${index}`,
        statusCode: 200,
      }));
      getPagesForAuditMock.mockResolvedValue(pages);
      selectLighthousePagesMock.mockReturnValue(pages.map((page) => page.url));
      stepDoMock.mockImplementation(passThrough);

      await runLighthousePhase(stepStub(), PHASE_PARAMS);

      expect(sleepMock).toHaveBeenCalledTimes(1);
      expect(sleepMock).toHaveBeenCalledWith(
        "lighthouse-pause-1",
        "10 seconds",
      );
    });
  });
});
