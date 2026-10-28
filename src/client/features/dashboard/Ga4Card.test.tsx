import { render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { Ga4Card } from "./Ga4Card";
const mocks = vi.hoisted(() => ({
  query: vi.fn<
    () => {
      data: ReturnType<typeof report>;
      isPending: boolean;
      isError: boolean;
    }
  >(),
}));
vi.mock("@tanstack/react-query", () => ({ useQuery: () => mocks.query() }));
vi.mock("./ga4OverviewQuery", () => ({ ga4OverviewQuery: () => ({}) }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));
vi.mock("@/client/lib/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));
vi.mock("@/client/components/Chart", () => ({
  Chart: () => null,
  CHART_SERIES: { primary: "currentColor" },
}));
const totals = {
  sessions: null,
  activeUsers: 2,
  engagedSessions: 1,
  engagementRate: 0.5,
  keyEvents: 7,
  transactions: 0,
  purchaseRevenue: 0,
};
function report(overrides = {}) {
  return {
    connected: true,
    resolvedDateRange: { startDate: "2026-10-01", endDate: "2026-10-28" },
    previousDateRange: { startDate: "2026-09-03", endDate: "2026-09-30" },
    currencyCode: null,
    propertyTimeZone: "Europe/Istanbul",
    reportMetadata: { hasLimitedData: true, reports: [] },
    warnings: [],
    totals,
    prevTotals: totals,
    trend: [],
    ...overrides,
  };
}
beforeEach(() => {
  mocks.query.mockReturnValue({
    data: report(),
    isPending: false,
    isError: false,
  });
});
it("keeps readable key events when sessions are restricted, rather than calling null no traffic", () => {
  render(<Ga4Card projectId="p1" connected />);
  expect(
    screen.queryByText("Bu aralıkta organik arama trafiği kaydedilmemiş."),
  ).toBeNull();
  expect(screen.getByText("Anahtar olay")).toBeDefined();
  const spoken = screen.getByText("7 Anahtar olay");
  expect(spoken.closest("[aria-hidden]")).toBeNull();
  expect(
    screen.getByText("7").closest("[aria-hidden]")?.getAttribute("aria-hidden"),
  ).toBe("true");
  expect(screen.getByText(/Analytics verisi sınırlı veya eksik/)).toBeDefined();
});
it("explains how to investigate unknown sessions instead of showing an empty trend", () => {
  render(<Ga4Card projectId="p1" connected />);
  expect(screen.getByText(/Analytics raporunu açarak/)).toBeDefined();
});
it("retains a measured quiet commerce period and explicitly names an unknown currency", () => {
  mocks.query.mockReturnValue({
    data: report({
      totals: { ...totals, sessions: 10 },
      prevTotals: { ...totals, purchaseRevenue: 100 },
      reportMetadata: { hasLimitedData: false, reports: [] },
    }),
    isPending: false,
    isError: false,
  });
  render(<Ga4Card projectId="p1" connected />);
  expect(screen.getByText("Organik gelir")).toBeDefined();
  expect(screen.getByText(/para birimi bilinmiyor/)).toBeDefined();
  expect(screen.queryByText(/Satış ölçümü doğrulanmadı/)).toBeNull();
});
