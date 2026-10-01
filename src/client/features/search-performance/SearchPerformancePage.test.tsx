import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchPerformancePage } from "./SearchPerformancePage";

const getTable = vi.fn();
vi.mock("@/serverFunctions/searchPerformance", () => ({
  getSearchPerformanceReport: (): unknown =>
    Promise.resolve({
      connected: true,
      range: { startDate: "2026-09-01", endDate: "2026-09-28" },
      strikingDistance: [],
      countries: [],
    }),
  getSearchPerformanceTable: (args: unknown): unknown => getTable(args),
  exportSearchPerformanceTable: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));
// The page-level blocks are not under test and need a full report to draw.
vi.mock("./TotalsCards", () => ({ TotalsCards: () => null }));
vi.mock("./SearchTrendChart", () => ({ SearchTrendPanel: () => null }));
vi.mock("./DeviceBreakdown", () => ({ DeviceBreakdown: () => null }));
vi.mock("./SearchAppearanceBreakdown", () => ({
  SearchAppearanceBreakdown: () => null,
}));
vi.mock("./CountryBreakdown", () => ({ CountryBreakdown: () => null }));

function page(tab: "queries" | "pages", quickFilter?: "pos5to10") {
  return (
    <SearchPerformancePage
      projectId="p1"
      tab={tab}
      range="last_28_days"
      searchType="web"
      query=""
      quickFilter={quickFilter}
      onViewChange={() => {}}
    />
  );
}

function renderPage(tab: "queries" | "pages", quickFilter?: "pos5to10") {
  const client = new QueryClient();
  const wrap = (ui: React.ReactNode) => (
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
  const view = render(wrap(page(tab, quickFilter)));
  return {
    rerender: (next: "queries" | "pages") => view.rerender(wrap(page(next))),
  };
}

describe("SearchPerformancePage tables", () => {
  it("does not render query rows while the pages request is pending", async () => {
    getTable.mockImplementation(({ data }: { data: { dimension: string } }) =>
      data.dimension === "query"
        ? Promise.resolve({
            connected: true,
            truncated: false,
            rows: [
              {
                key: "alpha sorgu",
                clicks: 3,
                impressions: 90,
                ctr: 0.03,
                position: 4,
              },
            ],
          })
        : new Promise(() => {}),
    );
    const { rerender } = renderPage("queries");
    await screen.findByText("alpha sorgu");

    rerender("pages");

    expect(screen.queryByText("alpha sorgu")).toBeNull();
    expect(
      screen.queryByText("Tıklamalar sayfalara nasıl dağılıyor?"),
    ).toBeNull();
  });

  it("ignores a quick filter that belongs to another tab", async () => {
    getTable.mockResolvedValue({
      connected: true,
      truncated: false,
      rows: [
        {
          key: "on ikinci sıra",
          clicks: 3,
          impressions: 90,
          ctr: 0.03,
          position: 12,
        },
      ],
    });
    renderPage("queries", "pos5to10");
    expect(await screen.findByText("on ikinci sıra")).toBeDefined();
  });
});
