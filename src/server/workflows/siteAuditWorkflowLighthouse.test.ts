import { beforeEach, describe, expect, it, vi } from "vitest";

type Strategy = "mobile" | "desktop";
type Row = { pageId: string; strategy: Strategy; errorMessage?: string };

const { fetchMock, selectMock, progressMock, sleepMock, stepDoMock, stored } =
  vi.hoisted(() => ({
    fetchMock: vi.fn(),
    selectMock: vi.fn(),
    progressMock: vi.fn(),
    sleepMock: vi.fn(),
    stepDoMock: vi.fn(),
    stored: new Map<
      string,
      { pageId: string; strategy?: string; errorMessage?: string }
    >(),
  }));

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/server/lib/audit/lighthouse", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  fetchLighthouseResult: fetchMock,
  storeLighthouseResult: async ({ fetched }: { fetched: { result: Row } }) =>
    fetched.result,
}));
vi.mock("@/server/features/audit/auditHeartbeat", () => ({
  recordAuditHeartbeat: vi.fn(),
}));
vi.mock("@/server/workflows/siteAuditWorkflowLighthouseSelect", () => ({
  selectLighthouseWork: selectMock,
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: {
    getPageUrlsByIds: async (_auditId: string, ids: string[]) =>
      ids.map((id) => ({ id, url: `https://example.com/${id}` })),
    updateAuditProgress: progressMock,
  },
}));
// An in-memory table, so counters can be compared with what is really stored.
vi.mock(
  "@/server/features/audit/repositories/AuditLighthouseRepository",
  () => ({
    AuditLighthouseRepository: {
      insertLighthouseResults: async (_auditId: string, rows: Row[]) => {
        for (const row of rows) {
          const key = `${row.pageId}-${row.strategy}`;
          // The real repository never replaces a stored success.
          if (stored.get(key) && !stored.get(key)?.errorMessage) continue;
          stored.set(key, row);
        }
      },
      getSucceededChecks: async (_auditId: string, pageIds: string[]) =>
        [...stored.values()].filter(
          (row) => pageIds.includes(row.pageId) && !row.errorMessage,
        ),
      countResultsForPages: async (_auditId: string, pageIds: string[]) => {
        const rows = [...stored.values()].filter((row) =>
          pageIds.includes(row.pageId),
        );
        const error = rows.filter((row) => row.errorMessage).length;
        return { ok: rows.length - error, error };
      },
    },
  }),
);

import { runLighthousePhase } from "@/server/workflows/siteAuditWorkflowLighthouse";

const PARAMS = {
  auditId: "audit-1",
  workflowInstanceId: "workflow-1",
  actorUserId: "user-1",
  projectId: "project-1",
  startUrl: "https://example.com/",
  config: { maxPages: 50, lighthouseStrategy: "auto" as const },
};

function stepStub() {
  const step: Parameters<typeof runLighthousePhase>[0] = {
    do: stepDoMock,
    sleep: sleepMock,
    sleepUntil: vi.fn(),
    waitForEvent: vi.fn(),
  };
  return step;
}

const ok = (pageId: string, strategy: Strategy) => ({
  result: { pageId, strategy },
  payloadJson: "{}",
});

describe("runLighthousePhase counters and settlement", () => {
  beforeEach(() => {
    stored.clear();
    selectMock.mockResolvedValue(["page-1", "page-2"]);
    progressMock.mockResolvedValue(undefined);
  });

  it("derives progress from the stored rows when a pass writes and then throws", async () => {
    stepDoMock.mockImplementation(
      async (name: string, _config: unknown, run: () => Promise<unknown>) => {
        if (name !== "lighthouse-chunk-1") return run();
        await run();
        throw new Error("step retries exhausted");
      },
    );
    fetchMock.mockImplementation(
      async (_url: string, pageId: string, strategy: Strategy) =>
        pageId === "page-1" && strategy === "desktop"
          ? { result: { pageId, strategy, errorMessage: "page fault" } }
          : ok(pageId, strategy),
    );

    await runLighthousePhase(stepStub(), PARAMS);

    // The pass stored 3 successes and 1 error; the fallback re-inserts all four
    // as errors but must leave the stored rows alone and not count them.
    expect(stored.size).toBe(4);
    expect(progressMock).toHaveBeenLastCalledWith("audit-1", "workflow-1", {
      lighthouseCompleted: 3,
      lighthouseFailed: 1,
    });
  });

  it("stores the siblings of a check that stays retryable and errors only that one", async () => {
    stepDoMock.mockImplementation(
      async (_name: string, _config: unknown, run: () => Promise<unknown>) =>
        run(),
    );
    fetchMock.mockImplementation(
      async (_url: string, pageId: string, strategy: Strategy) =>
        pageId === "page-2" && strategy === "mobile"
          ? {
              result: { pageId, strategy, errorMessage: "503 backend" },
              payloadJson: null,
              retryable: true,
            }
          : ok(pageId, strategy),
    );

    await runLighthousePhase(stepStub(), PARAMS);

    const errors = [...stored.values()].filter((row) => row.errorMessage);
    expect(stored.size).toBe(4);
    expect(errors).toEqual([
      expect.objectContaining({
        pageId: "page-2",
        errorMessage: "503 backend",
      }),
    ]);
    // 4 first-pass calls, then only the failing check on each re-pass.
    expect(fetchMock).toHaveBeenCalledTimes(6);
    expect(progressMock).toHaveBeenLastCalledWith("audit-1", "workflow-1", {
      lighthouseCompleted: 3,
      lighthouseFailed: 1,
    });
  });

  it("does not refetch or downgrade a check an earlier attempt stored", async () => {
    stepDoMock.mockImplementation(
      async (_name: string, _config: unknown, run: () => Promise<unknown>) =>
        run(),
    );
    selectMock.mockResolvedValue(["page-1"]);
    stored.set("page-1-mobile", { pageId: "page-1", strategy: "mobile" });
    fetchMock.mockImplementation(
      async (_url: string, pageId: string, strategy: Strategy) => ({
        result: { pageId, strategy, errorMessage: "late failure" },
        payloadJson: null,
      }),
    );

    await runLighthousePhase(stepStub(), PARAMS);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/page-1",
      "page-1",
      "desktop",
    );
    expect(stored.get("page-1-mobile")?.errorMessage).toBeUndefined();
    expect(progressMock).toHaveBeenLastCalledWith("audit-1", "workflow-1", {
      lighthouseCompleted: 1,
      lighthouseFailed: 1,
    });
  });
});
