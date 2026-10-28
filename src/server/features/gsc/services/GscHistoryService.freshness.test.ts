import { beforeEach, expect, it, vi } from "vitest";
import { GscHistoryService } from "./GscHistoryService";
import type { GscPerformanceInput } from "../searchAnalytics";
import type { GscService } from "./GscService";
import type { GscHistoryRepository } from "../repositories/GscHistoryRepository";

const mocks = vi.hoisted(() => ({
  getBackfillSnapshot: vi.fn(),
  getPerformance:
    vi.fn<
      (
        input: GscPerformanceInput,
      ) => Promise<
        Pick<
          Awaited<ReturnType<typeof GscService.getPerformance>>,
          "siteUrl" | "rows"
        >
      >
    >(),
  replaceDailyRows: vi.fn<typeof GscHistoryRepository.replaceDailyRows>(),
  upsertDailyRows: vi.fn(),
  markCoverage: vi.fn(),
  markRun: vi.fn(),
}));
vi.mock("../repositories/GscHistoryRepository", () => ({
  GscHistoryRepository: mocks,
}));
vi.mock("./GscService", () => ({
  GscService: mocks,
  isExpectedGrantFailure: () => false,
}));

const today = new Date("2026-06-30T12:00:00Z");
const siteUrl = "sc-domain:example.com";
beforeEach(() => {
  mocks.getBackfillSnapshot.mockResolvedValue({ siteUrl, state: null });
  mocks.getPerformance.mockResolvedValue({ siteUrl, rows: [] });
});

it("starts at Google's calendar-month retention floor instead of dropping the oldest days", async () => {
  await GscHistoryService.backfill({ projectId: "p", today });
  expect(mocks.getPerformance.mock.calls[0][0].startDate).toBe("2025-02-28");
});

it("stores all 50,000 query rows for a retry day and probes the terminal page", async () => {
  mocks.getBackfillSnapshot.mockResolvedValue({
    siteUrl,
    state: {
      lastDate: "2026-06-27",
      scannedThrough: "2026-06-27",
      incompleteFrom: "2026-06-01",
      incompleteThrough: "2026-06-01",
    },
  });
  mocks.getPerformance.mockImplementation(async (request) => ({
    siteUrl,
    rows:
      request.startDate === "2026-06-01" && (request.startRow ?? 0) < 50_000
        ? Array.from({ length: 1000 }, (_, index) => ({
            keys: ["2026-06-01", `q${(request.startRow ?? 0) + index}`],
            clicks: 1,
            impressions: 2,
            ctr: 0.5,
            position: 3,
          }))
        : [],
  }));
  const outcome = await GscHistoryService.backfill({ projectId: "p", today });
  const rows = mocks.replaceDailyRows.mock.calls[0][2];
  expect(rows).toHaveLength(50_000);
  expect(rows.at(-1)?.query).toBe("q49999");
  expect(outcome.incomplete).toBeNull();
  expect(outcome.truncatedChunks).toBe(0);
});

it("resumes an old partial range at the retention floor after a long sleep", async () => {
  mocks.getBackfillSnapshot.mockResolvedValue({
    siteUrl,
    state: {
      lastDate: "2025-02-01",
      incompleteFrom: "2025-02-01",
      incompleteThrough: "2025-03-05",
    },
  });
  await GscHistoryService.backfill({ projectId: "p", today });
  expect(mocks.getPerformance.mock.calls[0][0]).toMatchObject({
    startDate: "2025-02-28",
    endDate: "2025-02-28",
  });
});

it("keeps a retry day pending if its deeper page budget still overflows", async () => {
  mocks.getBackfillSnapshot.mockResolvedValue({
    siteUrl,
    state: {
      lastDate: "2026-06-27",
      scannedThrough: "2026-06-27",
      incompleteFrom: "2026-06-01",
      incompleteThrough: "2026-06-01",
    },
  });
  mocks.getPerformance.mockResolvedValue({
    siteUrl,
    rows: Array.from({ length: 1000 }, (_, index) => ({
      keys: ["2026-06-01", `q${index}`],
      clicks: 1,
      impressions: 2,
      ctr: 0.5,
      position: 3,
    })),
  });
  const outcome = await GscHistoryService.backfill({ projectId: "p", today });
  expect(outcome.incomplete).toEqual({
    from: "2026-06-01",
    through: "2026-06-01",
  });
  expect(outcome.hasMore).toBe(true);
  expect(mocks.replaceDailyRows).not.toHaveBeenCalled();
});
