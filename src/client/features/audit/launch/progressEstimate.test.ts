import { describe, expect, it } from "vitest";
import { estimateRemainingMs } from "./progressEstimate";

describe("estimateRemainingMs", () => {
  it("reads the zone-less database timestamp as UTC", () => {
    // Started 60s before `now`, 50% done: another 60s remain, in any zone.
    const now = Date.parse("2026-10-01T10:01:00Z");
    expect(
      estimateRemainingMs({
        startedAt: "2026-10-01 10:00:00",
        progress: 0.5,
        hasTotal: true,
        now,
      }),
    ).toBe(60_000);
  });

  it("makes no estimate before 5% or without a total", () => {
    const base = { startedAt: "2026-10-01 10:00:00", now: Date.now() };
    expect(
      estimateRemainingMs({ ...base, progress: 0.04, hasTotal: true }),
    ).toBeNull();
    expect(
      estimateRemainingMs({ ...base, progress: 0.5, hasTotal: false }),
    ).toBeNull();
  });
});
