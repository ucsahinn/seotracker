import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NoOpportunities } from "./OpportunityStates";

const period = { startDate: "2026-07-28", endDate: "2026-10-25" };

describe("low-volume opportunity guidance", () => {
  it("never asks to extend the longest supported period", () => {
    render(
      <NoOpportunities
        dateRange={period}
        pagesConsidered={18}
        curveInsufficient
        days={90}
      />,
    );
    expect(screen.getByText(/Tahmin için veri henüz az/)).toBeDefined();
    expect(screen.queryByText(/genişlet|uzun bir dönem/)).toBeNull();
  });

  it("does not attribute all missing usable queries to Google privacy", () => {
    render(
      <NoOpportunities
        dateRange={period}
        pagesConsidered={87}
        curveInsufficient
        unknownPages={87}
        hiddenQueryPages={69}
        days={90}
      />,
    );
    expect(screen.getByText(/marka ayrımı/i)).toBeDefined();
    expect(screen.queryByText(/tahminler kendiliğinden çıkar/)).toBeNull();
  });
});
