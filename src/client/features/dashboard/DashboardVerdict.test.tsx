import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { DashboardVerdict } from "./DashboardVerdict";
import { searchViewFixture } from "@/shared/search-view-test-fixtures";
import { formatDate } from "@/shared/format";
const mocks = vi.hoisted(() => ({
  query: vi.fn<() => { data: ReturnType<typeof searchViewFixture> }>(),
}));
vi.mock("@tanstack/react-query", () => ({ useQuery: () => mocks.query() }));
vi.mock("./dashboardGscReport", () => ({
  dashboardSearchViewQuery: () => ({}),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));
it("separates the totals cutoff from the provisional data date and excluded interval", () => {
  const view = searchViewFixture();
  mocks.query.mockReturnValue({ data: view });
  render(<DashboardVerdict projectId="p1" connected />);
  const note = screen.getByText(/Toplamların son günü:/);
  expect(note.textContent).toContain(formatDate("2026-10-23"));
  expect(note.textContent).toContain("Geçici verinin son günü:");
  expect(note.textContent).toContain(formatDate("2026-10-25"));
  expect(note.textContent).toContain(formatDate("2026-10-24"));
  expect(note.textContent).toContain("toplamlara dahil değil");
  expect(screen.getByText(/America\/Los_Angeles/)).toBeDefined();
});
it("labels Search Console source details distinctly from the refresh help", () => {
  mocks.query.mockReturnValue({ data: searchViewFixture() });
  render(<DashboardVerdict projectId="p1" connected />);
  expect(screen.getByText("Search Console veri kapsamı").tagName).toBe(
    "SUMMARY",
  );
  expect(screen.queryByText("Veri hakkında")).toBeNull();
});
