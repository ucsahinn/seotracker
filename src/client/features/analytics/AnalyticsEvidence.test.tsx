import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { AnalyticsEvidence } from "./AnalyticsEvidence";

it("keeps report provenance visible and property caveats in closed details", () => {
  render(
    <AnalyticsEvidence
      result={{
        propertyDisplayName: "Site",
        fetchedAt: "2026-10-27T12:00:00Z",
        propertyTimeZone: "Europe/Istanbul",
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
  expect(scope.closest("details")?.hasAttribute("open")).toBe(false);
  expect(screen.getByText("Site").closest("dl")).toBeTruthy();
  expect(screen.getByText("Europe/Istanbul").closest("details")).toBeNull();
  expect(screen.getByText("Yenilendi").closest("dl")).toBeTruthy();
});
