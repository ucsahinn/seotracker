import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  ReportView,
  type ReportResult,
} from "@/client/features/analytics/ReportView";

const base = {
  propertyDisplayName: "Site",
  dateRange: { startDate: "2026-09-01", endDate: "2026-09-28" },
  rowCount: 3,
  totalRowCount: 3,
  sampled: false,
  thresholded: false,
  emptyReason: null,
} as const;

const channels: ReportResult = {
  ...base,
  dimensions: ["sessionDefaultChannelGroup"],
  metrics: ["sessions", "engagementRate", "keyEvents"],
  rows: [
    {
      sessionDefaultChannelGroup: "Organic Search",
      sessions: 60,
      engagementRate: 0.8,
      keyEvents: 2,
    },
    {
      sessionDefaultChannelGroup: "Direct",
      sessions: 30,
      engagementRate: 0.3,
      keyEvents: 0,
    },
    {
      sessionDefaultChannelGroup: "Referral",
      sessions: 10,
      engagementRate: 0.4,
      keyEvents: 1,
    },
  ],
};

function mount(
  result: ReportResult,
  kind: "traffic_acquisition" | "landing_pages",
) {
  return render(
    <ReportView
      kind={kind}
      result={result}
      organicOnly={false}
      onOrganicOnlyChange={() => undefined}
    />,
  );
}

/** Body rows of the table only, so the donut legend never counts. */
const bodyRows = () =>
  within(screen.getByRole("table")).getAllByRole("row").slice(1);

describe("ReportView quick chips", () => {
  it("counts over the whole result and filters by engagement", () => {
    mount(channels, "traffic_acquisition");

    const chip = screen.getByRole("button", { name: /Etkileşimi düşük/ });
    expect(chip.textContent).toContain("2");
    fireEvent.click(chip);

    expect(bodyRows()).toHaveLength(2);
    expect(
      within(screen.getByRole("table")).queryByText("Organic Search"),
    ).toBeNull();
  });

  it("filters to rows that converted", () => {
    mount(channels, "traffic_acquisition");

    fireEvent.click(screen.getByRole("button", { name: /Dönüşümü olan/ }));

    expect(bodyRows()).toHaveLength(2);
    expect(within(screen.getByRole("table")).queryByText("Direct")).toBeNull();
  });

  it("offers a revenue chip only where the report has revenue", () => {
    mount(channels, "traffic_acquisition");
    expect(screen.queryByRole("button", { name: /Geliri olan/ })).toBeNull();
  });

  it("filters products to those that earned revenue", () => {
    mount(
      {
        ...base,
        dimensions: ["itemName"],
        metrics: ["itemRevenue"],
        rows: [
          { itemName: "A", itemRevenue: 10 },
          { itemName: "B", itemRevenue: 0 },
        ],
      },
      "landing_pages",
    );

    fireEvent.click(screen.getByRole("button", { name: /Geliri olan/ }));

    expect(bodyRows()).toHaveLength(1);
  });

  it("reports the organic toggle to its owner", () => {
    const onChange = vi.fn();
    render(
      <ReportView
        kind="traffic_acquisition"
        result={channels}
        organicOnly={false}
        onOrganicOnlyChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Sadece organik" }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("says so, and offers a way out, when the filters match nothing", () => {
    mount(channels, "traffic_acquisition");

    // Direct converted nothing, so segment + "Dönüşümü olan" is empty.
    fireEvent.click(screen.getByRole("button", { name: /^Direct/ }));
    fireEvent.click(screen.getByRole("button", { name: /Dönüşümü olan/ }));

    expect(screen.getByText(/süzgeçlere uyan satır yok/)).toBeDefined();
  });
});

describe("ReportView share ring", () => {
  it("narrows the table to the clicked segment and lets go on a second click", () => {
    mount(channels, "traffic_acquisition");
    expect(bodyRows()).toHaveLength(3);

    const segment = screen.getByRole("button", { name: /^Direct/ });
    fireEvent.click(segment);
    expect(bodyRows()).toHaveLength(1);
    expect(segment.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(segment);
    expect(bodyRows()).toHaveLength(3);
  });

  it("draws no ring where a share is not meaningful", () => {
    mount(
      {
        ...base,
        dimensions: ["hostName", "landingPage"],
        metrics: ["sessions"],
        rows: [
          { hostName: "a.io", landingPage: "/", sessions: 5 },
          { hostName: "a.io", landingPage: "/x", sessions: 4 },
        ],
      },
      "landing_pages",
    );

    expect(screen.queryByText(/dağılımı/)).toBeNull();
  });
});
