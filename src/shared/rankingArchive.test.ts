import { describe, expect, it } from "vitest";
import { rankingArchiveView } from "./rankingArchive";

const row = (query: string, position = 8, impressions = 100) => ({
  query,
  position,
  impressions,
  clicks: 0,
  days: 1,
  firstDate: "2026-01-01",
  lastDate: "2026-01-01",
});

describe("rankingArchiveView", () => {
  it("searches beyond the former top 100 and matches uncapped previous identities", () => {
    const current = Array.from({ length: 150 }, (_, i) => row(`query ${i}`));
    const previous = Array.from({ length: 5100 }, (_, i) => row(`other ${i}`));
    previous.push(row("query 149", 8.2));
    const view = rankingArchiveView(current, previous, {
      search: "query 149",
      limit: 25,
      offset: 0,
    });
    expect(view.rows[0]?.delta).toBeCloseTo(0.2);
    expect(view.totalMatching).toBe(1);
    expect(view.totalObserved).toBe(150);
    expect(view.comparableCount).toBe(1);
  });

  it("keeps summaries independent of pagination and missing observations distinct", () => {
    const current = [row("a"), row("b")];
    const previous = [row("a", 10), row("disappeared", 2)];
    const small = rankingArchiveView(current, previous, {
      limit: 1,
      offset: 0,
    });
    const large = rankingArchiveView(current, previous, {
      limit: 100,
      offset: 0,
    });
    expect(small.bands).toEqual(large.bands);
    expect(small.unknownCount).toBe(1);
    expect(small.unobserved).toEqual(["disappeared"]);
    expect(small.rows[0]?.query).toBe("a");
  });

  it("counts facets against search and other filters, and includes unpaired top ten", () => {
    const current = [row("a", 8), row("b", 8), row("c", 21)];
    const view = rankingArchiveView(current, [row("b", 10)], {
      move: "top10",
      search: "a",
      limit: 25,
      offset: 0,
    });
    expect(view.rows.map((r) => r.query)).toEqual(["a"]);
    expect(view.moveCounts.top10).toBe(1);
  });

  it("sorts unknown comparisons last in either direction", () => {
    for (const desc of [true, false]) {
      const view = rankingArchiveView([row("a"), row("z")], [row("z", 8.2)], {
        sort: "delta",
        desc,
        limit: 25,
        offset: 0,
      });
      expect(view.rows.map((r) => r.query)).toEqual(["z", "a"]);
    }
  });
});
