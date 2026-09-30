import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DonutChart } from "./DonutChart";

const segments = [
  { key: "a", label: "A", value: 6 },
  { key: "b", label: "B", value: 4 },
  { key: "c", label: "C", value: 0 },
];

describe("DonutChart", () => {
  it("shows the total in the hole when the chosen group is empty", () => {
    render(
      <DonutChart
        segments={segments}
        totalLabel="kelime"
        summary="özet"
        selectedKey="c"
        onSelect={() => {}}
      />,
    );
    expect(screen.getByText("10")).toBeDefined();
  });

  it("shows the chosen group's value in the hole", () => {
    render(
      <DonutChart
        segments={segments}
        totalLabel="kelime"
        summary="özet"
        selectedKey="b"
        onSelect={() => {}}
      />,
    );
    expect(screen.getAllByText("4").length).toBeGreaterThan(0);
  });
});
