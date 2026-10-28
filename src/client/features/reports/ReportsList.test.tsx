import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ReportsList } from "./ReportsList";

vi.mock("./shared", () => ({ formatCreatedBy: () => "seowatcher" }));
vi.mock("./ReportDownloadButton", () => ({ ReportDownloadButton: () => null }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));
const filters = {
  query: "",
  kind: "",
  recent: false,
  sort: "updatedAt" as const,
  page: 1,
};
const inventory = {
  reports: [],
  latest: null,
  totalProject: 0,
  totalMatching: 0,
  page: 1,
  pageCount: 1,
  facets: [],
};

it("shows the first report actions instead of empty search, facets and pagination", () => {
  render(
    <ReportsList
      projectId="p"
      inventory={inventory}
      filters={filters}
      onChange={vi.fn()}
      onDelete={vi.fn()}
    />,
  );
  expect(screen.getByText("Henüz rapor yok")).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Arama raporu hazırla" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Denetim raporu hazırla" }),
  ).toBeTruthy();
  expect(screen.queryByRole("searchbox")).toBeNull();
  expect(
    screen.queryByRole("navigation", { name: "Rapor sayfaları" }),
  ).toBeNull();
});

it("keeps recovery controls when saved reports are hidden by the recent filter", () => {
  const change = vi.fn();
  render(
    <ReportsList
      projectId="p"
      inventory={{ ...inventory, totalProject: 1 }}
      filters={{ ...filters, recent: true }}
      onChange={change}
      onDelete={vi.fn()}
    />,
  );
  expect(screen.getByRole("searchbox")).toBeTruthy();
  fireEvent.click(
    screen.getAllByRole("button", { name: "Filtreleri temizle" })[0],
  );
  expect(change).toHaveBeenCalledWith(filters);
});
