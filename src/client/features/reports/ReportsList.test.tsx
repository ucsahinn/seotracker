import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ReportsList } from "./ReportsList";
import type { ReportListItem } from "@/serverFunctions/reports";

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

it("H07 labels each mobile report with its kind and the full legacy qualification", () => {
  const legacy: ReportListItem = {
    id: "legacy",
    projectId: "p",
    title: "October report",
    summary: "",
    nativeKind: null,
    nativeIdentity: null,
    skill: null,
    templateId: null,
    templateName: null,
    createdBy: "app:site-audit",
    createdByUserId: "u",
    createdByName: null,
    sizeBytes: 1,
    createdAt: "2026-10-26",
    updatedAt: "2026-10-26",
  };
  render(
    <ReportsList
      projectId="p"
      inventory={{
        ...inventory,
        totalProject: 2,
        totalMatching: 2,
        reports: [
          legacy,
          {
            ...legacy,
            id: "audit",
            title: "Current report",
            nativeKind: "site-audit-export",
          },
        ],
      }}
      filters={filters}
      onChange={vi.fn()}
      onDelete={vi.fn()}
    />,
  );
  for (const [title, label] of [
    ["October report", "Eski rapor"],
    ["Current report", "Site denetimi raporu"],
  ]) {
    const titleCell = screen.getByRole("link", { name: title }).closest("td")!;
    const mobileLabel = within(titleCell).getByText(label);
    expect(mobileLabel.closest(".md\\:hidden")).toBeTruthy();
    expect(mobileLabel.classList.contains("truncate")).toBe(false);
    const row = titleCell.closest("tr")!;
    const desktopCell = row.querySelector<HTMLTableCellElement>(
      "td.hidden.md\\:table-cell",
    )!;
    expect(within(desktopCell).getByText(label)).toBeTruthy();
    if (title === "October report") {
      expect(
        within(desktopCell).getByTitle(
          "Eski rapor · kaynak ve tarih doğrulanmamış",
        ),
      ).toBeTruthy();
    }
  }
});
