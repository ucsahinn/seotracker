import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EMPTY_PERFORMANCE_FILTERS } from "./AuditResultsTableFilterLogic";
import { speedBands } from "./performanceBands";
import { ScoreHistogram } from "./ScoreHistogram";

const mobile = (performanceScore: number | null) => ({
  performanceScore,
  strategy: "mobile" as const,
});

describe("speedBands", () => {
  it("puts 90 and 50 in the better band, and ignores desktop and unscored rows", () => {
    const bands = speedBands([
      mobile(100),
      mobile(90),
      mobile(89),
      mobile(50),
      mobile(49),
      mobile(0),
      mobile(null),
      { performanceScore: 95, strategy: "desktop" as const },
    ]);

    expect(bands.map((band) => [band.key, band.count])).toEqual([
      ["good", 2],
      ["fair", 2],
      ["poor", 2],
    ]);
  });
});

describe("ScoreHistogram", () => {
  const rows = [mobile(95), mobile(70), mobile(20)];

  it("filters the table to mobile rows in the clicked band", () => {
    const onChange = vi.fn();
    render(
      <ScoreHistogram
        rows={rows}
        filters={EMPTY_PERFORMANCE_FILTERS}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Yavaş/ }));

    expect(onChange).toHaveBeenLastCalledWith({
      ...EMPTY_PERFORMANCE_FILTERS,
      device: "mobile",
      minPerf: "",
      maxPerf: "49",
    });
  });

  it("lets go of the band on a second click", () => {
    const onChange = vi.fn();
    render(
      <ScoreHistogram
        rows={rows}
        filters={{
          ...EMPTY_PERFORMANCE_FILTERS,
          device: "mobile",
          minPerf: "50",
          maxPerf: "89",
        }}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Orta/ }));

    expect(onChange).toHaveBeenLastCalledWith(EMPTY_PERFORMANCE_FILTERS);
  });

  it("draws nothing when no mobile score exists", () => {
    const { container } = render(
      <ScoreHistogram
        rows={[mobile(null)]}
        filters={EMPTY_PERFORMANCE_FILTERS}
        onChange={() => {}}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
