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
    search: { q: string };
  }) => <a href={`${to}?q=${search.q}`}>{children}</a>,
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
      loading={false}
      error={null}
      onRetry={() => {}}
    />,
  );
}

describe("QueryHistoryCard", () => {
  it("totals the window and links to the Search Performance row", () => {
    renderCard();
    expect(
      screen.getByText(/Toplam tıklama \/ gösterim: 7 \/ 2/),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: "Arama performansında aç" })
        .getAttribute("href"),
    ).toContain("q=kedi maması");
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
