import { expect, it } from "vitest";
import { searchViewFixture } from "@/shared/search-view-test-fixtures";
import { searchSampleNote } from "./searchSample";

it("uses the selected comparison and never describes a hidden comparison", () => {
  const view = searchViewFixture();
  view.totals.previous = { clicks: 1, impressions: 5, ctr: 0.2, position: 2.2 };
  view.totals.yoy = { clicks: 2, impressions: 12, ctr: 1 / 6, position: 8 };
  expect(searchSampleNote(view, "none")).toBeNull();
  expect(searchSampleNote(view, "yoy")).toContain("2 tıklama, 12 gösterim");
  expect(searchSampleNote(view, "previous")).toContain("1 tıklama, 5 gösterim");
});

it("keeps well-supported comparisons out of the small-base warning", () => {
  const view = searchViewFixture();
  view.totals.previous = {
    clicks: 100,
    impressions: 1000,
    ctr: 0.1,
    position: 8,
  };
  expect(searchSampleNote(view, "previous")).toBeNull();
});
