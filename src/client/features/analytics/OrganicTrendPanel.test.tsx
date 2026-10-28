import { render, screen } from "@testing-library/react";
import type * as ReactQuery from "@tanstack/react-query";
import { expect, it, vi } from "vitest";
import { OrganicTrendPanel } from "./OrganicTrendPanel";

const state = vi.hoisted(() => ({
  sessions: null as number | null,
  events: null as number | null,
}));
vi.mock("@/serverFunctions/ga4", () => ({ getGa4DashboardReport: vi.fn() }));
vi.mock("@tanstack/react-query", async (original) => ({
  ...(await original<typeof ReactQuery>()),
  useQuery: () => ({
    data: {
      connected: true,
      totals: {
        sessions: state.sessions,
        keyEvents: state.events,
        engagementRate: null,
        purchaseRevenue: null,
      },
      prevTotals: {
        sessions: 18,
        keyEvents: 0,
        engagementRate: null,
        purchaseRevenue: null,
      },
      trend: [],
      resolvedDateRange: { startDate: "2026-09-30", endDate: "2026-10-27" },
      previousDateRange: { startDate: "2026-09-02", endDate: "2026-09-29" },
      reportMetadata: { hasLimitedData: false, reports: [] },
      warnings: [],
      diagnostics: [],
    },
  }),
}));

it("does not repeat a previous-value explanation for every unknown current metric", () => {
  state.sessions = null;
  state.events = null;
  render(<OrganicTrendPanel projectId="p" windowDays={28} />);
  expect(
    screen.queryByText(
      "Karşılaştırma yok; önceki değer okunamadı veya veri sınırlı.",
    ),
  ).toBeNull();
  expect(screen.getAllByText("Bilinmiyor")).toHaveLength(4);
});

it("puts a small session count in context without claiming zero events prove failed conversion", () => {
  state.sessions = 6;
  state.events = 0;
  render(<OrganicTrendPanel projectId="p" windowDays={28} />);
  expect(
    screen.getByText(
      "Az sayıda oturumda tek bir ziyaret bile oranları belirgin değiştirir. Yüzde değişimini tek başına başarı veya kayıp saymayın.",
    ),
  ).toBeTruthy();
  expect(
    screen.getByText(
      "Anahtar olay kaydedilmedi. Form gönderme gibi hedefler tanımlı değilse bu sayı sıfır kalır; ölçüm durumunu kontrol edin.",
    ),
  ).toBeTruthy();
});
