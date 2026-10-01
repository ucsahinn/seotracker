import { describe, expect, it } from "vitest";
import {
  applySegment,
  availableChips,
  buildShareSegments,
  OTHER_KEY,
} from "@/client/features/analytics/reportInsights";
import { buildSummary } from "@/client/features/analytics/reportBuckets";

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

const label = (field: string) => field;

describe("buildSummary", () => {
  const rows = ["a", "b", "c", "d", "e", "f", "g"].map((channel, index) => ({
    channel,
    sessions: 10 - index,
  }));

  it("uses a ring up to six groups and bars past it, following the report's own dimension", () => {
    expect(
      buildSummary("traffic_acquisition", ["channel"], rows.slice(0, 6), label)
        ?.form,
    ).toBe("ring");
    expect(
      buildSummary("traffic_acquisition", ["channel"], rows, label)?.form,
    ).toBe("bars");
  });

  it("hides itself below two groups", () => {
    expect(
      buildSummary("traffic_acquisition", ["channel"], rows.slice(0, 1), label),
    ).toBeNull();
  });

  it("sums rows that share a label", () => {
    const segments = buildShareSegments(
      [
        { p: "/x", n: 2 },
        { p: "/x", n: 3 },
      ],
      "p",
      "n",
    );
    expect(segments).toEqual([
      { key: "/x", label: "/x", value: 5, members: ["/x"] },
    ]);
  });
});

const row = (seconds: number) => ({
  userEngagementDuration: seconds,
  activeUsers: 1,
});

describe("median-based chips", () => {
  const metrics = ["userEngagementDuration", "activeUsers"];

  it("flags pages under half the median dwell time", () => {
    const rows = [row(60), row(60), row(60), row(20)];
    const chip = availableChips(metrics, rows).find(
      (item) => item.id === "lowDwell",
    );
    expect(chip?.count).toBe(1);
  });

  it("stays hidden when there are too few rows to take a median", () => {
    expect(availableChips(metrics, [row(60), row(5)])).toEqual([]);
  });
});
