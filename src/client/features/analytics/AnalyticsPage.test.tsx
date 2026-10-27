import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { AnalyticsPage } from "./AnalyticsPage";
import type { Scope } from "./AnalyticsControls";

const api = vi.hoisted(() => ({
  getGa4Report: vi.fn(),
  getGa4Connection: vi.fn(),
}));
vi.mock("@/serverFunctions/ga4Reports", () => ({
  getGa4Report: api.getGa4Report,
}));
vi.mock("@/serverFunctions/ga4", () => ({
  getGa4Connection: api.getGa4Connection,
}));
// The overview uses separate provider calls; this regression concerns the report's route scope.
vi.mock("./OrganicTrendPanel", () => ({ OrganicTrendPanel: () => null }));
vi.mock("@/client/features/quotas/QuotaCard", () => ({
  QuotaCard: () => null,
}));

it.each(["Sayfa filtresini kaldır", "Filtreleri temizle"])(
  "guards client-4: %s removes exact host/path and resets route offset so rows recover",
  async (action) => {
    api.getGa4Connection.mockResolvedValue({ connected: true });
    api.getGa4Report.mockResolvedValue({
      status: "ok",
      propertyDisplayName: "Site",
      dateRange: { startDate: "2026-09-01", endDate: "2026-09-28" },
      dimensions: ["hostName", "landingPage"],
      metrics: ["sessions"],
      rows: [{ hostName: "example.com", landingPage: "/other", sessions: 5 }],
      rowCount: 1,
      totalRowCount: 1,
      sampled: false,
      thresholded: false,
      emptyReason: null,
      pageInfo: { offset: 0, limit: 50, hasMore: false, nextOffset: null },
    });
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const scope: Scope = {
      view: "landing_pages",
      channel: "all",
      limit: 50,
      offset: 50,
      audience: "device",
      acquisition: "channel_group",
      host: "example.com",
      path: "/missing",
    };
    const onScopeChange = vi.fn<(next: Partial<Scope>) => void>();
    const page = (next: Scope) => (
      <QueryClientProvider client={client}>
        <AnalyticsPage
          projectId="p1"
          windowDays={28}
          onWindowChange={() => {}}
          scope={next}
          onScopeChange={onScopeChange}
        />
      </QueryClientProvider>
    );
    const view = render(page(scope));
    fireEvent.click(await screen.findByRole("button", { name: action }));
    expect(onScopeChange).toHaveBeenCalledWith({
      host: undefined,
      path: undefined,
      offset: 0,
    });
    view.rerender(page({ ...scope, ...onScopeChange.mock.calls[0]?.[0] }));
    expect(await screen.findByText("/other")).toBeTruthy();
    expect(screen.queryByText("Bu filtrelere uyan satır yok")).toBeNull();
    client.clear();
  },
);
