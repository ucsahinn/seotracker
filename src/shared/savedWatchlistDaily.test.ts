import { expect, it } from "vitest";
import { groupSavedDailyObservations } from "./savedWatchlistDaily";
it("combines raw variants per actual day by impressions without creating missing dates", () => {
  expect(
    groupSavedDailyObservations([
      { date: "2026-09-01", position: 2, impressions: 100, clicks: 2 },
      { date: "2026-09-01", position: 20, impressions: 10, clicks: 1 },
      { date: "2026-09-03", position: 4, impressions: 5, clicks: 0 },
    ]),
  ).toEqual([
    { date: "2026-09-01", position: 40 / 11, impressions: 110, clicks: 3 },
    { date: "2026-09-03", position: 4, impressions: 5, clicks: 0 },
  ]);
});
