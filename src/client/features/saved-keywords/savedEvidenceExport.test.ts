import { describe, expect, it } from "vitest";
import {
  savedEvidenceExportRow,
  SAVED_EVIDENCE_HEADERS,
} from "./savedKeywordsUtils";
import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
// The fixture intentionally supplies only fields read by the export entry point.
const snapshot: Parameters<typeof savedEvidenceExportRow>[1] = {
  range: { startDate: "2026-09-01", endDate: "2026-09-30" },
  previousRange: { startDate: "2026-08-02", endDate: "2026-08-31" },
  status: null,
  coverage: { complete: 0, limited: 0, failed: 0, unknown: 30 },
  previousCoverage: { complete: 0, unknown: 30 },
  scope: "all countries and devices",
  snapshot: "digest",
  filters: {
    includeTerms: [],
    excludeTerms: [],
    tagIds: [],
    band: null,
    fallers: false,
    sort: "createdAt",
    order: "desc",
  },
  totalSavedMatching: 1,
  totalMatching: 1,
  archiveError: false,
  previousError: false,
  statusError: false,
  connectionError: false,
};
const row: SavedWatchlist["rows"][number] = {
  projectId: "p1",
  searchVolume: null,
  cpc: null,
  competition: null,
  keywordDifficulty: null,
  monthlySearches: [],
  fetchedAt: null,
  clicks: null,
  impressions: null,
  id: "s1",
  keyword: "seo",
  intent: null,
  tags: [],
  createdAt: "2026-01-01",
  position: null,
  previousPosition: 3.2,
  delta: null,
  positionStatus: "unknownDueToCoverage",
  observation: null,
  previousObservation: null,
  locationCode: 2792,
  languageCode: "tr",
};
describe("saved evidence export", () => {
  it("keeps the inventory prefix and leaves unknown ranks blank with recoverable status", () => {
    const values = savedEvidenceExportRow(row, snapshot);
    expect(values.slice(0, 4)).toEqual(["seo", "", "", "2026-01-01"]);
    const field = (key: string) =>
      values[4 + SAVED_EVIDENCE_HEADERS.indexOf(key)];
    expect(field("averagePosition")).toBe("");
    expect(field("previousPosition")).toBe(3.2);
    expect(field("positionStatus")).toBe("unknownDueToCoverage");
    expect(field("snapshot")).toBe("digest");
    const selected = savedEvidenceExportRow(row, snapshot, {
      scope: "selected-page",
      count: 1,
    });
    expect(selected[4 + SAVED_EVIDENCE_HEADERS.indexOf("exportScope")]).toBe(
      "selected-page",
    );
    expect(
      selected[4 + SAVED_EVIDENCE_HEADERS.indexOf("exportedRecordCount")],
    ).toBe(1);
  });
});
