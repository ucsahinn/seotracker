import { beforeEach, describe, expect, it, vi } from "vitest";
import { GSC_MAX_ROW_LIMIT } from "@/server/features/gsc/searchAnalytics";
import type { GscPerformanceInput } from "@/server/features/gsc/searchAnalytics";

const mocks = vi.hoisted(() => ({
  getArchiveState: vi.fn(),
  upsertDailyRows: vi.fn(),
  markRun:
    vi.fn<
      (input: {
        projectId: string;
        earliestDate: string | null;
        lastDate: string | null;
        scannedThrough: string | null;
        incomplete: { from: string; through: string } | null;
        error: string | null;
      }) => Promise<void>
    >(),
  countRows: vi.fn(),
  getQueryHistory: vi.fn(),
  getTrackedQueries: vi.fn(),
  getPerformance:
    vi.fn<
      (
        input: GscPerformanceInput,
      ) => Promise<{ siteUrl: string; rows: unknown[] }>
    >(),
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
const SITE = "sc-domain:a.test";
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
  mocks.getPerformance.mockResolvedValue({ siteUrl: SITE, rows: [] });
});

describe("backfill", () => {
  it("asks Google for the day dimension, or it would store one aggregate", async () => {
    mocks.getPerformance.mockResolvedValue({
      siteUrl: SITE,
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
      siteUrl: SITE,
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
      SITE,
      expect.arrayContaining([
        expect.objectContaining({ date: "2026-06-01", query: "seo aracı" }),
      ]),
    );
    expect(outcome.daysFetched).toBe(2);
    expect(outcome.error).toBeNull();
    expect(mocks.markRun).toHaveBeenCalledOnce();
  });

  /*
   * A property verified minutes ago answers 200 with no rows. Writing that
   * down as covered would freeze those months out of the archive for good,
   * because the resume point only ever rewinds three days.
   */
  it("does not claim coverage when the first run finds nothing at all", async () => {
    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    expect(outcome.rowsWritten).toBe(0);
    expect(mocks.markRun).toHaveBeenCalledWith(
      expect.objectContaining({ earliestDate: null, lastDate: null }),
    );
  });

  // Once the archive holds anything, an empty window is the ordinary truth
  // and has to be recorded, or every page view re-reads the same empty span.
  it("records an empty window once the archive has data", async () => {
    mocks.getArchiveState.mockResolvedValue({
      earliestDate: "2026-05-01",
      lastDate: "2026-05-20",
      error: null,
    });

    await GscHistoryService.backfill({ projectId: "p1", today: TODAY });

    expect(mocks.markRun.mock.calls[0]?.[0].lastDate).not.toBeNull();
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
        siteUrl: SITE,
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

/*
 * The archive used to be unable to fill for a site younger than Google's
 * retention window.
 *
 * A first run starts 480 days back. Finding nothing there, it wrote both
 * date cursors as null -- on purpose, so a just-verified property would not
 * have its empty months marked covered. But `resolveStart(null)` returns
 * that same 480-day mark, so the next visit re-read the same empty months,
 * forever, while the screen said the archive was filling.
 */
describe("empty windows", () => {
  it("advances past a window that held no rows", async () => {
    mocks.getArchiveState.mockResolvedValue(null);

    await GscHistoryService.backfill({ projectId: "p1", today: TODAY });

    const run = mocks.markRun.mock.calls[0]?.[0];
    expect(run?.lastDate).toBeNull();
    // Four 30-day chunks from the 480-day mark, so the sweep is nowhere near
    // the newest day and must be resumable from where it stopped.
    expect(run?.scannedThrough).not.toBeNull();
  });

  it("resumes from the scanned cursor, not from the retention floor", async () => {
    mocks.getArchiveState.mockResolvedValue({
      earliestDate: null,
      lastDate: null,
      scannedThrough: "2026-01-31",
      lastRunAt: null,
      lastError: null,
    });

    await GscHistoryService.backfill({ projectId: "p1", today: TODAY });

    expect(requestAt(0).startDate).toBe("2026-02-01");
  });

  it("starts over once a full sweep has found nothing anywhere", async () => {
    // One day left to scan, so this run reaches the end with nothing found.
    mocks.getArchiveState.mockResolvedValue({
      earliestDate: null,
      lastDate: null,
      scannedThrough: "2026-06-26",
      lastRunAt: null,
      lastError: null,
    });

    await GscHistoryService.backfill({ projectId: "p1", today: TODAY });

    const run = mocks.markRun.mock.calls[0]?.[0];
    // Null, not the end date: a property whose permission had not propagated
    // would otherwise be marked fully scanned and never looked at again.
    expect(run?.scannedThrough).toBeNull();
  });

  // A window that ran out of page budget holds only its top queries. It must
  // not be recorded as archived: it is remembered and re-read one day at a time.
  it("remembers a truncated window and re-reads it in single days", async () => {
    const page = Array.from({ length: GSC_MAX_ROW_LIMIT }, (_, i) =>
      performanceRow("2026-06-01", `q${i}`, 4),
    );
    // Twelve full pages exhaust the first window's budget.
    for (let i = 0; i < 12; i += 1) {
      mocks.getPerformance.mockResolvedValueOnce({ siteUrl: SITE, rows: page });
    }

    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    const first = requestAt(0);
    const retry = requestAt(12);
    expect(retry.startDate).toBe(first.startDate);
    expect(retry.endDate).toBe(first.startDate);
    expect(outcome.incomplete).toMatchObject({
      through: requestAt(11).endDate,
    });
    expect(outcome.hasMore).toBe(true);
    expect(mocks.markRun.mock.calls[0]?.[0].incomplete).not.toBeNull();
  });

  it("stops a run that sees the property change underneath it", async () => {
    mocks.getPerformance
      .mockResolvedValueOnce({ siteUrl: SITE, rows: [] })
      .mockResolvedValueOnce({ siteUrl: "sc-domain:b.test", rows: [] });

    const outcome = await GscHistoryService.backfill({
      projectId: "p1",
      today: TODAY,
    });

    expect(outcome.error).not.toBeNull();
    expect(mocks.upsertDailyRows).not.toHaveBeenCalledWith(
      "p1",
      "sc-domain:b.test",
      expect.anything(),
    );
  });
});
