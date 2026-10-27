import { describe, expect, it } from "vitest";
import {
  groupSavedObservations,
  savedWatchlistView,
  savedMatchKey,
} from "./savedWatchlist";
const raw = (query: string, position: number, impressions: number) => ({
  query,
  position,
  impressions,
  clicks: 1,
  dates: ["2026-09-01"],
});
describe("saved watchlist projection", () => {
  it("weights raw variants by impressions independent of input order", () => {
    const rows = [raw("SEO", 2, 1000), raw("seo", 20, 10)];
    const a = groupSavedObservations(rows).get("seo")!;
    expect(a.position).toBeCloseTo(2200 / 1010);
    expect(groupSavedObservations([rows[1], rows[0]]).get("seo")).toEqual(a);
    expect(a.observedDays).toBe(1);
  });
  it("compacts whitespace and preserves the Turkish dotted I policy", () => {
    expect(savedMatchKey(" ISPARTA   otel ")).toBe("ısparta otel");
    expect(savedMatchKey("İSPARTA otel")).toBe("isparta otel");
  });
  it("keeps market identities and finds saved queries beyond a global top 500", () => {
    const archive = Array.from({ length: 501 }, (_, i) =>
      raw("query " + i, 12, i + 1),
    );
    const saved = [
      { id: "a", keyword: "query 0", createdAt: "2026-01-01" },
      { id: "b", keyword: "query 0", createdAt: "2026-01-01" },
    ];
    const view = savedWatchlistView(
      saved,
      groupSavedObservations(archive),
      new Map(),
      { page: 1, pageSize: 50, sort: "createdAt", order: "desc" },
      { archiveAvailable: true },
    );
    expect(view.totalObservedMatching).toBe(2);
    expect(view.rows.map((r) => r.id)).toEqual(["a", "b"]);
    expect(view.noPrevious).toBe(2);
  });
  it("separates significant movers, stable comparisons and missing current observations", () => {
    const saved = ["a", "b", "c", "d"].map((id) => ({
      id,
      keyword: id,
      createdAt: "",
    }));
    const view = savedWatchlistView(
      saved,
      groupSavedObservations([
        raw("a", 2, 10),
        raw("b", 2, 10),
        raw("c", 2, 10),
      ]),
      groupSavedObservations([
        raw("a", 3, 10),
        raw("b", 2.2, 10),
        raw("d", 1, 10),
      ]),
      { page: 1, pageSize: 50, sort: "position", order: "asc" },
      { archiveAvailable: true },
    );
    expect([
      view.upSignificant,
      view.stableComparable,
      view.noPrevious,
      view.noCurrent,
    ]).toEqual([1, 1, 1, 1]);
    expect(view.rows.at(-1)?.position).toBeNull();
  });
  it("does not broaden a selected band after archive failure", () => {
    const view = savedWatchlistView(
      [{ id: "a", keyword: "a", createdAt: "" }],
      new Map(),
      new Map(),
      { page: 1, pageSize: 50, sort: "createdAt", order: "desc", band: "top3" },
      { archiveAvailable: false },
    );
    expect(view.rows).toEqual([]);
    expect(view.bandUnavailable).toBe(true);
  });
});

it("keeps a decline refinement unavailable when only the previous archive read fails", () => {
  const result = savedWatchlistView(
    [{ id: "a", keyword: "a", createdAt: "" }],
    groupSavedObservations([raw("a", 3, 10)]),
    new Map(),
    { page: 1, pageSize: 50, sort: "delta", order: "asc", fallers: true },
    { archiveAvailable: true, comparisonAvailable: false },
  );
  expect(result.bandUnavailable).toBe(true);
  expect(result.rows).toEqual([]);
});
