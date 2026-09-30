import { describe, expect, it } from "vitest";
import {
  applySegment,
  buildShareSegments,
  OTHER_KEY,
} from "@/client/features/analytics/reportInsights";

describe("buildShareSegments", () => {
  const rows = Array.from({ length: 8 }, (_, index) => ({
    channel: `c${index}`,
    sessions: 100 - index * 10,
  }));

  it("folds the tail past six into one Diğer segment that filters its members", () => {
    const segments = buildShareSegments(rows, "channel", "sessions");

    expect(segments).toHaveLength(6);
    const other = segments.at(-1);
    expect(other?.key).toBe(OTHER_KEY);
    expect(other?.members).toEqual(["c5", "c6", "c7"]);
    expect(applySegment(rows, "channel", other ?? null)).toHaveLength(3);
  });

  it("drops zero-valued rows", () => {
    const segments = buildShareSegments(
      [
        { channel: "a", sessions: 0 },
        { channel: "b", sessions: 3 },
      ],
      "channel",
      "sessions",
    );

    expect(segments.map((segment) => segment.label)).toEqual(["b"]);
  });
});
