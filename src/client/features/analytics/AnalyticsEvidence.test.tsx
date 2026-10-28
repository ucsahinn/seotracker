import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { AnalyticsEvidence } from "./AnalyticsEvidence";

it("keeps repeated property and processing caveats in expandable data details", () => {
  render(
    <AnalyticsEvidence
      result={{
        propertyDisplayName: "Site",
        dateRange: { startDate: "2026-09-30", endDate: "2026-10-27" },
        dimensions: [],
        metrics: [],
        rows: [],
        rowCount: 0,
        totalRowCount: 0,
        sampled: false,
        thresholded: false,
        emptyReason: null,
      }}
    />,
  );
  const scope = screen.getByText(
    "Mülk kapsamı: tüm ana makineler ve akışlar. Bu toplam yalnızca projenin sitesine ait olmayabilir.",
  );
  expect(scope.closest("details")).toBeTruthy();
});
