import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { SearchVerdict } from "./SearchVerdict";
import { searchViewFixture } from "@/shared/search-view-test-fixtures";

vi.mock("./TodoTab", () => ({ FIRST_TODOS: 3 }));

it("puts the real click counts ahead of percentages when the comparison base is small", () => {
  const view = searchViewFixture();
  view.totals.current = {
    clicks: 5,
    impressions: 276,
    ctr: 5 / 276,
    position: 19.9,
  };
  view.totals.previous = { clicks: 1, impressions: 5, ctr: 0.2, position: 2.2 };
  view.totals.vsPrevious = {
    clicks: { change: 4, relative: 4 },
    impressions: { change: 271, relative: 54.2 },
    ctr: { change: 5 / 276 - 0.2, relative: null },
    position: { change: -17.7, relative: null },
  };
  render(
    <SearchVerdict
      view={view}
      compare="previous"
      open={[]}
      onShowTodo={() => {}}
    />,
  );
  expect(screen.getByText(/5 tıklama, 276 gösterim/)).toBeDefined();
  expect(screen.getByText(/Önceki dönemde 1 tıklama/)).toBeDefined();
  expect(screen.queryByText(/400,0/)).toBeNull();
});
