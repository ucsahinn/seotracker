import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GscPerformanceInput } from "@/server/features/gsc/searchAnalytics";

const mocks = vi.hoisted(() => ({
  getArchiveState: vi.fn(),
  upsertDailyRows: vi.fn(),
  markRun: vi.fn(),
  countRows: vi.fn(),
  getQueryHistory: vi.fn(),
  getTrackedQueries: vi.fn(),
  getPerformance:
    vi.fn<(input: GscPerformanceInput) => Promise<{ rows: unknown[] }>>(),
  isExpectedGrantFailure: vi.fn(),
}));

vi.mock("@/server/features/gsc/repositories/GscHistoryRepository", () => ({
  GscHistoryRepository: mocks,
}));
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: { getPerformance: mocks.getPerformance },
  isExpectedGrantFailure: mocks.isExpectedGrantFailure,
}));

import { GscHistoryService } from "./GscHistoryService";

/** The request the service handed Google on its nth call. */
function requestAt(index: number): GscPerformanceInput {
  const call = mocks.getPerformance.mock.calls[index];
  if (!call) throw new Error(`no getPerformance call at index ${index}`);
  return call[0];
}

// Search Console finalizes a day three days late, so "today" here means the
// archive can reach 2026-06-27.
const TODAY = new Date("2026-06-30T12:00:00.000Z");

function performanceRow(date: string, query: string, position: number) {
  return {
    keys: [date, query],
    clicks: 1,
    impressions: 10,
    ctr: 0.1,
    position,
  };
}

beforeEach(() => {
  mocks.getArchiveState.mockResolvedValue(null);
  mocks.upsertDailyRows.mockResolvedValue(undefined);
  mocks.markRun.mockResolvedValue(undefined);
  mocks.isExpectedGrantFailure.mockReturnValue(false);
  mocks.getPerformance.mockResolvedValue({ rows: [] });
});

describe("backfill", () => {
  it("asks Google for the day dimension, or it would store one aggregate", async () => {
    mocks.getPerformance.mockResolvedValue({
      rows: [performanceRow("2026-06-01", "seo aracı", 4.2)],
    });

    await GscHistoryService.backfill({ projectId: "p1", today: TODAY });

    const request = requestAt(0);
    expect(request.dimensions).toEqual(["date", "query"]);
    expect(request.dataState).toBe("final");
  });

  it("stores the rows Google returned and records how far it reached", async () => {
    // Only the first chunk has data; the run still walks its whole budget.
    mocks.getPerformance.mockResolvedValueOnce({
      rows: [
        performanceRow("2026-06-01", "seo aracı", 4.2),
        performanceRow("2026-06-02", "seo aracı", 3.8),
      ],
    });

    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    expect(mocks.upsertDailyRows).toHaveBeenCalledWith(
      "p1",
      expect.arrayContaining([
        expect.objectContaining({ date: "2026-06-01", query: "seo aracı" }),
      ]),
    );
    expect(outcome.daysFetched).toBe(2);
    expect(outcome.error).toBeNull();
    expect(mocks.markRun).toHaveBeenCalledOnce();
  });

  // Search Console revises the most recent days as late data lands, and the
  // upsert makes re-reading a day free.
  // Search Console keeps revising the last few days, so the resume point is
  // the whole revision window, not just the final day.
  it("resumes a full lag window before the last stored date", async () => {
    mocks.getArchiveState.mockResolvedValue({
      projectId: "p1",
      earliestDate: "2026-05-01",
      lastDate: "2026-06-20",
      lastRunAt: null,
      lastError: null,
    });

    await GscHistoryService.backfill({ projectId: "p1", today: TODAY });

    expect(requestAt(0).startDate).toBe("2026-06-17");
  });

  /*
   * The state the service actually writes: `lastDate` equals the newest date
   * Google has finalized. The previous version of this test used a `lastDate`
   * four days past that, which `backfill` can never produce -- it asserted
   * "no request when current" against a row that cannot exist, so it stayed
   * green while the real behaviour was the opposite.
   */
  it("still re-reads the revision window when the archive is current", async () => {
    mocks.getArchiveState.mockResolvedValue({
      projectId: "p1",
      earliestDate: "2026-05-01",
      lastDate: "2026-06-27",
      lastRunAt: null,
      lastError: null,
    });

    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    expect(requestAt(0).startDate).toBe("2026-06-24");
    // Re-read, not caught up: nothing here is newer than the archive already
    // reaches, and the UI must not announce these as days added.
    expect(outcome.newDays).toBe(0);
    expect(outcome.hasMore).toBe(false);
  });

  // A page view must not stall for minutes on a first backfill, so the run is
  // bounded and reports that it stopped early.
  it("caps one run and says there is more to fetch", async () => {
    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    expect(mocks.getPerformance).toHaveBeenCalledTimes(4);
    expect(outcome.hasMore).toBe(true);
  });

  it("keeps the days it already wrote when a fetch fails", async () => {
    mocks.getPerformance
      .mockResolvedValueOnce({
        rows: [performanceRow("2026-03-08", "seo aracı", 4.2)],
      })
      .mockRejectedValueOnce(new Error("Search Console is unavailable"));

    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    expect(outcome.daysFetched).toBe(1);
    // The app's own phrase, not Google's. This value is returned rather than
    // thrown, so it never passes the layer that strips upstream text, and it
    // used to print an English API sentence into a Turkish page.
    expect(outcome.error).toBe("Search Console isteği başarısız oldu.");
    // Still recorded, so the UI can explain why the history stopped growing.
    expect(mocks.markRun).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Search Console isteği başarısız oldu.",
      }),
    );
  });

  it("reports a revoked grant as something the operator can fix", async () => {
    mocks.getPerformance.mockRejectedValue(new Error("401 invalid_grant"));
    mocks.isExpectedGrantFailure.mockReturnValue(true);

    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    expect(outcome.error).toMatch(/yenilenmesi/);
  });
});
