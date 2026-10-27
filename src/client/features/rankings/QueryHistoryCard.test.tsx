import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryHistoryCard } from "./QueryHistoryCard";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    search,
  }: {
    children: React.ReactNode;
    to: string;
    search: Record<string, string>;
  }) => <a href={`${to}?${new URLSearchParams(search)}`}>{children}</a>,
}));

const rows = [
  { date: "2026-09-01", position: 12, clicks: 3, impressions: 1000 },
  { date: "2026-09-02", position: 8, clicks: 4, impressions: 1500 },
];

function renderCard() {
  render(
    <QueryHistoryCard
      projectId="p1"
      query="kedi maması"
      rows={rows}
      range={{ startDate: "2026-09-01", endDate: "2026-09-02" }}
      loading={false}
      error={null}
      onRetry={() => {}}
    />,
  );
}

describe("QueryHistoryCard", () => {
  it("keeps exact query and source dates (the old substring link lost both)", () => {
    renderCard();
    expect(
      screen.getByText(/Toplam tıklama \/ gösterim: 7 \/ 2/),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", {
          name: "Arama performansında aç",
        })
        .getAttribute("href"),
    ).toContain("exactQuery=");
    const href = screen.getByRole("link").getAttribute("href")!;
    expect(
      new URL(href, "https://local.test").searchParams.get("exactQuery"),
    ).toBe("kedi maması");
    expect(href).toContain("startDate=2026-09-01");
    expect(href).toContain("endDate=2026-09-02");
  });

  it("reads out a day's numbers while hovering the chart", () => {
    renderCard();
    // jsdom has no layout, so give the chart a box to measure against.
    const chart = screen.getByRole("slider");
    chart.getBoundingClientRect = () => new DOMRect(0, 0, 100, 10);
    fireEvent.pointerMove(chart, { clientX: 100 });
    expect(screen.getByText(/4 tıklama/)).toBeDefined();
  });

  it("reads out a day's numbers from the keyboard too", () => {
    renderCard();
    const chart = screen.getByRole("slider");
    fireEvent.keyDown(chart, { key: "ArrowLeft" });
    expect(screen.getByText(/3 tıklama/)).toBeDefined();
    fireEvent.keyDown(chart, { key: "ArrowRight" });
    expect(screen.getByText(/4 tıklama/)).toBeDefined();
  });
});
