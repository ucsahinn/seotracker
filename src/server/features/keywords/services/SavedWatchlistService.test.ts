import { beforeEach, describe, expect, it, vi } from "vitest";
import { readSavedWatchlist, readSavedHistory } from "./SavedWatchlistService";
import { savedWatchlistSchema } from "@/shared/savedWatchlist";
import { getSavedKeywords } from "./research/saved-keywords";
import { GscHistoryRepository } from "@/server/features/gsc/repositories/GscHistoryRepository";
import { GscHistoryService } from "@/server/features/gsc/services/GscHistoryService";
import { SavedArchiveRepository } from "../repositories/SavedArchiveRepository";
import type { SavedKeywordRow } from "@/types/keywords";
const savedKeywordRow = (
  overrides: Partial<SavedKeywordRow>,
): SavedKeywordRow => ({
  id: "saved",
  projectId: "p1",
  keyword: "seo",
  locationCode: 2792,
  languageCode: "tr",
  createdAt: "2026-01-01",
  searchVolume: null,
  cpc: null,
  competition: null,
  keywordDifficulty: null,
  intent: null,
  monthlySearches: [],
  fetchedAt: null,
  tags: [],
  ...overrides,
});
vi.mock("./research/saved-keywords", () => ({ getSavedKeywords: vi.fn() }));
vi.mock("@/server/features/gsc/repositories/GscHistoryRepository", () => ({
  GscHistoryRepository: {
    getTrackedQueries: vi.fn(),
    getCoverage: vi.fn(),
    getProperty: vi.fn(),
  },
}));
vi.mock("@/server/features/gsc/services/GscHistoryService", () => ({
  GscHistoryService: { getStatus: vi.fn() },
}));
vi.mock("../repositories/SavedArchiveRepository", () => ({
  SavedArchiveRepository: {
    observationDates: vi.fn(),
    dailyObservations: vi.fn(),
  },
}));
beforeEach(() => {
  vi.mocked(getSavedKeywords).mockResolvedValue({
    rows: [savedKeywordRow({ id: "saved", keyword: "seo" })],
    totalCount: 1,
    tags: [],
  });
  vi.mocked(GscHistoryRepository.getTrackedQueries).mockResolvedValue([]);
  vi.mocked(GscHistoryRepository.getCoverage).mockResolvedValue([]);
  vi.mocked(GscHistoryRepository.getProperty).mockResolvedValue(
    "sc-domain:example.com",
  );
  vi.mocked(GscHistoryService.getStatus).mockResolvedValue({
    earliestDate: null,
    lastDate: null,
    lastRunAt: null,
    lastError: null,
    scannedThrough: null,
    incompleteFrom: null,
    incompleteThrough: null,
    rowCount: 0,
  });
  vi.mocked(SavedArchiveRepository.observationDates).mockResolvedValue(
    new Map(),
  );
  vi.mocked(SavedArchiveRepository.dailyObservations).mockResolvedValue([]);
});
const input = () => savedWatchlistSchema.parse({ projectId: "p1", days: 30 });
describe("Saved read-only snapshot", () => {
  it("keeps inventory usable and preserves an active band after archive read failure", async () => {
    vi.mocked(GscHistoryRepository.getTrackedQueries).mockRejectedValue(
      new Error("offline"),
    );
    const result = await readSavedWatchlist({ ...input(), band: "top3" });
    expect(result.totalSavedMatching).toBe(1);
    expect(result.archiveError).toBe(true);
    expect(result.bandUnavailable).toBe(true);
    expect(result.rows).toEqual([]);
  });
  it("pins both inclusive windows without a global row cap", async () => {
    const result = await readSavedWatchlist(input());
    expect(GscHistoryRepository.getTrackedQueries).toHaveBeenCalledWith({
      projectId: "p1",
      since: result.range.startDate,
      until: result.range.endDate,
    });
    expect(GscHistoryRepository.getTrackedQueries).toHaveBeenCalledWith({
      projectId: "p1",
      since: result.previousRange.startDate,
      until: result.previousRange.endDate,
    });
    expect(result.coverage.unknown).toBe(30);
    expect(result.lookupTruncated).toBe(false);
  });
  it("rejects export pages after the saved base changes", async () => {
    const result = await readSavedWatchlist(input());
    vi.mocked(getSavedKeywords).mockResolvedValue({
      rows: [],
      totalCount: 0,
      tags: [],
    });
    await expect(
      readSavedWatchlist({ ...input(), expectedSnapshot: result.snapshot }),
    ).rejects.toThrow("SAVED_SNAPSHOT_CHANGED");
  });
});

it("rejects daily detail when observations change after the pinned overview", async () => {
  const range = { ...input(), startDate: "2026-09-01", endDate: "2026-09-30" };
  vi.mocked(GscHistoryRepository.getTrackedQueries).mockResolvedValue([
    {
      query: "seo",
      position: 2,
      impressions: 10,
      clicks: 1,
      days: 1,
      firstDate: "2026-09-01",
      lastDate: "2026-09-01",
    },
  ]);
  vi.mocked(SavedArchiveRepository.observationDates).mockResolvedValue(
    new Map([["seo", ["2026-09-01"]]]),
  );
  const overview = await readSavedWatchlist(range);
  vi.mocked(SavedArchiveRepository.dailyObservations).mockResolvedValue([
    { date: "2026-09-01", position: 3, impressions: 10, clicks: 1 },
  ]);
  await expect(
    readSavedHistory({
      ...range,
      savedId: "saved",
      expectedSnapshot: overview.snapshot,
    }),
  ).rejects.toThrow("SAVED_SNAPSHOT_CHANGED");
});
