import { describe, expect, it } from "vitest";
import {
  attachChange,
  directionOf,
  previousWindow,
} from "@/shared/rankingChange";

describe("attachChange", () => {
  it("only gives a delta to queries present in both windows", () => {
    const rows = attachChange(
      [
        { query: "a", position: 4 },
        { query: "b", position: 9 },
        { query: "c", position: 2 },
      ],
      [
        { query: "a", position: 10 },
        { query: "c", position: null },
      ],
    );
    expect(rows.map((row) => row.delta)).toEqual([6, null, null]);
    expect(rows[0]?.previousPosition).toBe(10);
  });
});

describe("directionOf", () => {
  it("treats sub-half-position moves as unchanged", () => {
    expect(directionOf(0.4)).toBe("flat");
    expect(directionOf(-0.4)).toBe("flat");
    expect(directionOf(0.5)).toBe("up");
    expect(directionOf(-3)).toBe("down");
  });
});

describe("previousWindow", () => {
  it("ends the day before and has the same length", () => {
    expect(previousWindow("2026-09-01", 30)).toEqual({
      since: "2026-08-02",
      until: "2026-08-31",
    });
  });
});
