import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { SearchReportButton } from "./SearchReportButton";
import { createSearchReport } from "@/serverFunctions/searchReport";

vi.mock("@/serverFunctions/searchReport", () => ({
  createSearchReport: vi.fn(),
}));
vi.mock("@/client/features/reports/downloadReport", () => ({
  downloadReport: vi.fn(),
  reportFilename: () => "search.html",
}));
beforeEach(() => {
  vi.mocked(createSearchReport).mockResolvedValue({
    reportId: "r",
    title: "Search",
  });
});
const window = { startDate: "2026-09-01", endDate: "2026-09-28" };
function mount(disabled = false) {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <SearchReportButton
        projectId="p"
        filters={{
          dateRange: "last_28_days",
          searchType: "web",
          country: "tur",
        }}
        window={window}
        disabled={disabled}
      />
    </QueryClientProvider>,
  );
}
it("sends the displayed period (previously only sent the moving preset)", async () => {
  mount();
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() =>
    expect(createSearchReport).toHaveBeenCalledWith({
      data: {
        projectId: "p",
        dateRange: "last_28_days",
        searchType: "web",
        country: "tur",
        window,
      },
    }),
  );
});
it("cannot export while the caller has an inconsistent or refreshing view", () => {
  mount(true);
  fireEvent.click(screen.getByRole("button"));
  expect(createSearchReport).not.toHaveBeenCalled();
});
