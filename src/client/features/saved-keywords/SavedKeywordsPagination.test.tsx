import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { SavedKeywordsPagination } from "./SavedKeywordsPagination";

it("preserves pagination for a populated unfiltered list", () => {
  render(
    <SavedKeywordsPagination
      hasActiveFilters={false}
      page={1}
      pageSize={50}
      pageSizes={[50, 100, 250]}
      isLoading={false}
      totalCount={75}
      hasNextPage
      onPageChange={vi.fn()}
      onPageSizeChange={vi.fn()}
    />,
  );
  expect(screen.getByRole("combobox")).toBeTruthy();
  expect(
    screen
      .getByRole("button", { name: "Sonraki sayfa" })
      .hasAttribute("disabled"),
  ).toBe(false);
});

it.each([false, true])(
  "hides empty inventory controls but preserves a zero-match filtered list (filters: %s)",
  (hasActiveFilters) => {
    const { container } = render(
      <SavedKeywordsPagination
        hasActiveFilters={hasActiveFilters}
        page={1}
        pageSize={50}
        pageSizes={[50, 100, 250]}
        isLoading={false}
        totalCount={0}
        hasNextPage={false}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
      />,
    );
    if (hasActiveFilters) expect(screen.getByRole("combobox")).toBeTruthy();
    else expect(container.childElementCount).toBe(0);
  },
);
