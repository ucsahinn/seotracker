import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { TodoTab } from "./TodoTab";

vi.mock("./BrandTerms", () => ({ BrandTermsEditor: () => null }));

it("offers a useful next step at the longest range without asking for a longer period", () => {
  const onShowQueries = vi.fn();
  render(
    <TodoTab
      projectId="p1"
      todo={[]}
      days={90}
      doneTodos={{ done: new Set(), toggle: () => {} }}
      onTarget={() => {}}
      onShowQueries={onShowQueries}
    />,
  );
  expect(screen.getByText(/Google bazı sorguları gizlilik/)).toBeDefined();
  expect(screen.queryByText(/Daha uzun bir dönem/)).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Sorguları aç" }));
  expect(onShowQueries).toHaveBeenCalledOnce();
});
