import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { KpiTiles } from "./KpiTiles";
import { searchViewFixture } from "@/shared/search-view-test-fixtures";
vi.mock("@/client/lib/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));
it("explains the CTR change as a difference between the two percentages", () => {
  const view = searchViewFixture();
  view.totals.current = { ...view.totals.current, ctr: 0.018 };
  view.totals.previous = { ...view.totals.current, ctr: 0.2 };
  render(<KpiTiles view={view} compare="previous" />);
  expect(screen.getByText("-18,2 yüzde puan")).toBeDefined();
  expect(
    screen
      .getByText(/iki dönemin yüzdeleri arasındaki farktır/)
      .closest("details")?.open,
  ).toBe(false);
});
