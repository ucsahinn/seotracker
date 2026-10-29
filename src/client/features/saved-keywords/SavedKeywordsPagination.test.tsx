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

/*
 * A list with nothing to page shows no pager, filtered or not: the shared
 * pager hides itself when one page holds everything, and a zero-match
 * filtered list offers "Tümünü temizle" in its empty state instead.
 */
it.each([false, true])(
  "hides the pager for an empty list (filters: %s)",
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
    expect(container.childElementCount).toBe(0);
  },
);
