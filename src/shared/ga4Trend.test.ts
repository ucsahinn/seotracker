import { expect, it } from "vitest";
import { dailySessions } from "./ga4Trend";
it("keeps restricted and missing limited days unknown instead of fabricating zero crashes", () => {
  const range = { startDate: "2026-10-01", endDate: "2026-10-02" };
  expect(
    dailySessions([{ date: "20261001", sessions: null }], range, false),
  ).toEqual([
    { date: "2026-10-01", sessions: null },
    { date: "2026-10-02", sessions: null },
  ]);
  expect(dailySessions([], range, true).map((r) => r.sessions)).toEqual([0, 0]);
});
