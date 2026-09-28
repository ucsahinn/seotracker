import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackedShare } from "./StackedShare";

const segments = (...values: number[]) =>
  values.map((value, index) => ({
    label: `s${index}`,
    value,
    color: "red",
  }));

describe("StackedShare", () => {
  it("splits the bar by each segment's share of the whole", () => {
    const { container } = render(
      <StackedShare summary="özet" segments={segments(1, 3)} />,
    );

    const widths = [...container.querySelectorAll<HTMLElement>("[style]")]
      .map((node) => node.style.width)
      .filter(Boolean);

    expect(widths).toEqual(["25%", "75%"]);
  });

  /*
   * The bug this exists for: the index-coverage bar was fed `due`, which
   * overlaps `indexed` and `notIndexed`, so an audit answered three weeks
   * ago counted every page twice and the segments summed to 200%. The
   * component cannot know the caller passed overlapping values -- but it
   * must at least never render more than one bar's worth.
   */
  it("never draws more than a full bar", () => {
    const { container } = render(
      <StackedShare summary="özet" segments={segments(80, 20, 100)} />,
    );

    const total = [...container.querySelectorAll<HTMLElement>("[style]")]
      .map((node) => Number.parseFloat(node.style.width))
      .filter((value) => !Number.isNaN(value))
      .reduce((sum, value) => sum + value, 0);

    expect(total).toBeCloseTo(100, 5);
  });

  it("renders nothing rather than an empty bar when there is no data", () => {
    const { container } = render(
      <StackedShare summary="özet" segments={segments(0, 0)} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("names every segment and its count, not just its colour", () => {
    render(<StackedShare summary="özet" segments={segments(1, 3)} />);

    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("özet");
    expect(screen.getByText("s0")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
  });
});
