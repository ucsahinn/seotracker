import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PositionSparkline } from "./PositionSparkline";

it("spaces real dates and breaks the line across unobserved days", () => {
  const rows = [
    { date: "2026-01-01", position: 3, clicks: 1, impressions: 10 },
    { date: "2026-01-02", position: 4, clicks: 1, impressions: 10 },
    { date: "2026-01-30", position: 5, clicks: 1, impressions: 10 },
  ];
  render(<PositionSparkline rows={rows} />);
  const chart = screen.getByRole("slider");
  const circles = chart.querySelectorAll("circle");
  expect(Number(circles[1]?.getAttribute("cx"))).toBeCloseTo(600 / 29);
  expect(
    chart.querySelector("path")?.getAttribute("d")?.match(/M/g),
  ).toHaveLength(2);
  fireEvent.keyDown(chart, { key: "ArrowLeft" });
  expect(chart.getAttribute("aria-valuetext")).toContain("kapsamı eksik");
});

it("shows one observed point rather than a fabricated continuous line", () => {
  render(
    <PositionSparkline
      rows={[{ date: "2026-01-01", position: 3, clicks: 1, impressions: 10 }]}
    />,
  );
  expect(screen.getByRole("slider").querySelectorAll("circle")).toHaveLength(1);
  expect(
    screen.getByRole("slider").querySelector("path")?.getAttribute("d"),
  ).not.toContain("L");
});
