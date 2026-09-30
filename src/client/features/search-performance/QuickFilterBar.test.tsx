import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CountryBreakdown } from "./CountryBreakdown";
import { DimensionTable } from "./SearchPerformanceParts";
import { QuickFilterBar } from "./QuickFilterBar";

const rows = [
  { key: "ranks-well", clicks: 5, impressions: 1000, ctr: 0.005, position: 4 },
  { key: "unclicked", clicks: 0, impressions: 80, ctr: 0, position: 30 },
];

describe("QuickFilterBar", () => {
  it("shows counts, marks the active chip and toggles it", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <QuickFilterBar rows={rows} active={undefined} onChange={onChange} />,
    );
    const noClicks = screen.getByRole("button", { name: /Hiç tıklanmayan/ });
    expect(noClicks.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(noClicks);
    expect(onChange).toHaveBeenCalledWith("noClicks");

    rerender(
      <QuickFilterBar rows={rows} active="noClicks" onChange={onChange} />,
    );
    const pressed = screen.getByRole("button", { name: /Hiç tıklanmayan/ });
    expect(pressed.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(pressed);
    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  it("disables a chip that would match nothing", () => {
    render(
      <QuickFilterBar
        rows={rows.slice(1)}
        active={undefined}
        onChange={() => {}}
      />,
    );
    expect(
      screen
        .getByRole("button", { name: /Tıklama oranı düşük/ })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
});

describe("DimensionTable quick filter", () => {
  it("narrows the rows to the active chip", () => {
    render(
      <DimensionTable
        rows={rows}
        keyLabel="Sorgu"
        truncated={false}
        hasActiveFilter={false}
        search=""
        onSearchChange={() => {}}
        quickFilter="noClicks"
        onQuickFilterChange={() => {}}
      />,
    );
    expect(screen.getByText("unclicked")).toBeDefined();
    expect(screen.queryByText("ranks-well")).toBeNull();
  });
});

describe("CountryBreakdown", () => {
  it("clicking a country selects it, clicking again clears it", () => {
    const onSelect = vi.fn();
    const countries = [
      { key: "tur", clicks: 10, impressions: 100, ctr: 0.1, position: 3 },
    ];
    const { rerender } = render(
      <CountryBreakdown countries={countries} onSelect={onSelect} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Türkiye" }));
    expect(onSelect).toHaveBeenCalledWith("tur");
    rerender(
      <CountryBreakdown
        countries={countries}
        selected="tur"
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Türkiye" }));
    expect(onSelect).toHaveBeenLastCalledWith(undefined);
  });
});
