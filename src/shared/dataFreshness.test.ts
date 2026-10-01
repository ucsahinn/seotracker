import { afterEach, describe, expect, it, vi } from "vitest";
import { gscHistoryWindow } from "./dataFreshness";

afterEach(() => {
  vi.useRealTimers();
});

describe("gscHistoryWindow", () => {
  it("gives a 30-day inclusive window ending three days back, just after UTC midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-01T00:30:00Z"));

    expect(gscHistoryWindow(30)).toEqual({
      startDate: "2026-08-30",
      endDate: "2026-09-28",
    });
  });
});
