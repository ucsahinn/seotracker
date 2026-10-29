import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { SearchInsights } from "./SearchInsights";
import { searchViewFixture } from "@/shared/search-view-test-fixtures";
import { toLegacyReport } from "@/shared/searchPerformanceView";

vi.mock("./dashboardGscReport", () => ({
  dashboardGscReportQuery: () => "report",
  dashboardSearchViewQuery: () => "view",
}));
vi.mock("@tanstack/react-query", () => ({
  useQuery: (key: string) => {
    const view = searchViewFixture();
    view.series.daily = Array.from({ length: 4 }, (_, index) => ({
      date: `2026-10-${20 + index}`,
      clicks: 2,
      impressions: 10,
      ctr: 0.2,
      position: 1,
      state: "complete",
    }));
    view.series.previousDaily = [];
    return { data: key === "report" ? toLegacyReport(view) : view };
  },
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));
vi.mock("@/client/components/Chart", () => ({
  Chart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  ChartTooltip: () => null,
  CHART_AXIS: {},
  CHART_SERIES: {},
  DATA_SERIES: {},
}));
vi.mock("recharts", () => ({
  AreaChart: () => null,
  Area: () => null,
  Tooltip: () => null,
  XAxis: () => null,
}));

it("describes the comparison as dashed rather than faded", () => {
  render(<SearchInsights projectId="p" connected />);
  expect(
    screen.getByText(
      "Günlük tıklamalar; kesikli çizgi önceki dönemi gösterir.",
    ),
  ).toBeDefined();
  expect(screen.queryByText(/soluk çizgi/)).toBeNull();
});
