import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { DashboardMetrics } from "./DashboardMetrics";

vi.mock("@tanstack/react-query", () => ({ useQuery: () => ({ data: null }) }));
vi.mock("./dashboardGscReport", () => ({
  dashboardSearchViewQuery: () => ({}),
}));
vi.mock("@/client/components/MetricTile", () => ({
  MetricRow: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  MetricTile: () => null,
  countDelta: () => null,
}));
it("leaves archive navigation to the sidebar instead of a detached metrics shortcut", () => {
  render(<DashboardMetrics projectId="p" connected={false} />);
  expect(screen.queryByText("Sorgu arşivi")).toBeNull();
  expect(screen.getByText("Veri hakkında")).toBeDefined();
});
