import { describe, expect, it } from "vitest";
import {
  applyMove,
  countMoves,
  topMovers,
  type MoveRow,
} from "@/client/features/rankings/rankingMoves";

const row = (
  query: string,
  position: number,
  previousPosition: number | null,
): MoveRow => ({
  query,
  position,
  previousPosition,
  delta: previousPosition === null ? null : previousPosition - position,
});

const rows = [
  row("climber", 3, 12),
  row("slipper", 14, 8),
  row("steady", 5, 5.2),
  row("fresh", 2, null),
];

describe("quick filters", () => {
  it("counts significant moves separately from all current top-ten observations", () => {
    expect(countMoves(rows)).toEqual({
      risers: 1,
      fallers: 1,
      top10: 3,
      lost: 1,
    });
    expect(applyMove(rows, "lost").map((r) => r.query)).toEqual(["slipper"]);
  });
});

const seen = (r: MoveRow, impressions: number) => ({ ...r, impressions });

describe("topMovers", () => {
  it("orders by places moved times impressions and skips unchanged queries", () => {
    const { risers, fallers } = topMovers([
      seen(row("small leap", 20, 24), 30),
      seen(row("big query", 6, 8), 5000),
      seen(row("slipper", 14, 8), 100),
      seen(row("steady", 5, 5.2), 900),
    ]);
    expect(risers.map((r) => r.query)).toEqual(["big query", "small leap"]);
    expect(fallers.map((r) => r.query)).toEqual(["slipper"]);
  });
});
