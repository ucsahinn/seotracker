import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LabFieldComparison } from "./LabFieldComparison";
import type { LighthouseFieldData, LighthouseMetrics } from "./types";

function labMetric(numericValue: number | null) {
  return { score: null, displayValue: null, numericValue };
}

function metrics(overrides: Partial<LighthouseMetrics> = {}) {
  return {
    firstContentfulPaint: labMetric(1000),
    largestContentfulPaint: labMetric(1200),
    totalBlockingTime: labMetric(50),
    speedIndex: labMetric(1500),
    timeToInteractive: labMetric(2000),
    cumulativeLayoutShift: labMetric(0.02),
    interactionToNextPaint: labMetric(180),
    serverResponseTime: labMetric(300),
    ...overrides,
  } as LighthouseMetrics;
}

function fieldMetric(percentile: number) {
  return { percentile, category: "AVERAGE" };
}

function fieldData(overrides: Partial<LighthouseFieldData> = {}) {
  return {
    overall: "AVERAGE",
    firstContentfulPaint: fieldMetric(1100),
    largestContentfulPaint: fieldMetric(4800),
    cumulativeLayoutShift: fieldMetric(2),
    interactionToNextPaint: fieldMetric(180),
    timeToFirstByte: fieldMetric(350),
    ...overrides,
  } as LighthouseFieldData;
}

describe("LabFieldComparison", () => {
  it("calls out the metric where real users are slower than the test machine", () => {
    render(<LabFieldComparison metrics={metrics()} fieldData={fieldData()} />);

    const lcp = screen.getByRole("row", { name: /LCP/ });
    expect(lcp.textContent).toContain("daha yavaş");
    // 4800 - 1200; the gap is the point, not the two numbers on their own.
    expect(lcp.textContent).toContain("3,6 sn");
  });

  /*
   * `pagespeedPayload` copies the field percentile into the lab INP slot
   * because the lab run cannot simulate an interaction. Comparing them would
   * draw a perfect match out of one number counted twice.
   */
  it("leaves INP out, since its lab value is the field value", () => {
    render(<LabFieldComparison metrics={metrics()} fieldData={fieldData()} />);

    expect(screen.queryByRole("row", { name: /INP/ })).toBeNull();
  });

  /*
   * CrUX reports CLS as the score times 100. Comparing 2 against 0.02 would
   * make every site on earth look like it had a layout-shift emergency.
   */
  it("puts CLS on one scale before comparing", () => {
    render(<LabFieldComparison metrics={metrics()} fieldData={fieldData()} />);

    const cls = screen.getByRole("row", { name: /CLS/ });
    expect(cls.textContent).toContain("0,020");
    expect(cls.textContent).toContain("Örtüşüyor");
  });

  it("renders nothing when one of the two sides is missing", () => {
    const { container } = render(
      <LabFieldComparison metrics={metrics()} fieldData={null} />,
    );

    expect(container.innerHTML).toBe("");
  });
});
