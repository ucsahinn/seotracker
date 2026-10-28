import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { AnalyticsPage } from "./AnalyticsPage";

vi.mock("@/serverFunctions/ga4", () => ({
  getGa4Connection: async () => ({
    connected: true,
    propertyId: "properties/1",
  }),
  getGa4DashboardReport: async () => ({
    connected: true,
    totals: {
      sessions: null,
      keyEvents: null,
      engagementRate: null,
      purchaseRevenue: null,
    },
    prevTotals: {
      sessions: null,
      keyEvents: null,
      engagementRate: null,
      purchaseRevenue: null,
    },
    trend: [],
    resolvedDateRange: { startDate: "2026-09-30", endDate: "2026-10-27" },
    previousDateRange: { startDate: "2026-09-02", endDate: "2026-09-29" },
    reportMetadata: { hasLimitedData: false, reports: [] },
    warnings: [],
    diagnostics: [],
  }),
}));
vi.mock("@/serverFunctions/ga4Reports", () => ({
  getGa4Report: async () => ({
    status: "ok",
    propertyDisplayName: "Site",
    dateRange: { startDate: "2026-09-30", endDate: "2026-10-27" },
    dimensions: ["landingPage"],
    metrics: ["sessions"],
    rows: [],
    rowCount: 0,
    totalRowCount: 0,
    sampled: false,
    thresholded: false,
    emptyReason: null,
    pageInfo: { offset: 0, limit: 50, hasMore: false, nextOffset: null },
  }),
}));
vi.mock("@/client/features/quotas/QuotaCard", () => ({
  QuotaCard: () => null,
}));

it("uses unknown overview traffic to guard the empty detail report on the real page", async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <AnalyticsPage
        projectId="p"
        windowDays={28}
        onWindowChange={vi.fn()}
        onScopeChange={vi.fn()}
        scope={{
          view: "landing_pages",
          channel: "organic_search",
          limit: 50,
          offset: 0,
          audience: "device",
          acquisition: "channel_group",
        }}
      />
    </QueryClientProvider>,
  );
  expect(
    await screen.findByText("Bu dönemin trafiği belirlenemedi"),
  ).toBeTruthy();
  expect(screen.queryByText("Bu dönemde veri yok")).toBeNull();
  expect(screen.queryByRole("button", { name: "Tüm trafiğe bak" })).toBeNull();
  expect(
    screen.queryByText(
      "Ziyaretçiler siteye hangi sayfadan giriyor ve o sayfada kalıp bir sonuca ulaşıyor mu?",
    ),
  ).toBeNull();
  client.clear();
});
