import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { OrganicTrendChart } from "./OrganicTrendChart";
import { formatCount } from "@/shared/format";

vi.mock("@/client/components/Chart", () => ({
  Chart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  ChartTooltip: () => null,
  CHART_AXIS: {},
  CHART_GRID: {},
  DATA_SERIES: {},
}));
vi.mock("recharts", () => ({
  AreaChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Area: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: ({
    allowDecimals,
    tickFormatter,
  }: {
    allowDecimals?: boolean;
    tickFormatter: (value: number) => string;
  }) => (
    <span data-testid="session-axis" data-integers={allowDecimals === false}>
      {tickFormatter(2)}
    </span>
  ),
}));
it("uses integer-only session ticks and retains the shared count formatter", () => {
  render(<OrganicTrendChart rows={[{ date: "2026-10-23", sessions: 2 }]} />);
  const axis = screen.getByTestId("session-axis");
  expect(axis.getAttribute("data-integers")).toBe("true");
  expect(axis.textContent).toBe(formatCount(2));
});
