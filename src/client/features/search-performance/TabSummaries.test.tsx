import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PagesSummary, QueriesSummary, StrikingSummary } from "./TabSummaries";

const row = (position: number, clicks: number, impressions = 100) => ({
  position,
  clicks,
  impressions,
});

describe("tab summaries", () => {
  it("filters through a bar, and releases the active one on a second click", () => {
    const onChange = vi.fn();
    const rows = [row(2, 5), row(15, 0)];
    const { rerender } = render(
      <QueriesSummary rows={rows} active={undefined} onChange={onChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /11-20/ }));
    expect(onChange).toHaveBeenCalledWith("pos11to20");

    rerender(
      <QueriesSummary rows={rows} active="pos11to20" onChange={onChange} />,
    );
    const bar = screen.getByRole("button", { name: /11-20/ });
    expect(bar.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(bar);
    expect(onChange).toHaveBeenLastCalledWith(undefined);
  });

  it("draws no bars for one group but keeps the chips", () => {
    render(
      <PagesSummary
        rows={[row(3, 50), row(4, 60)]}
        active={undefined}
        onChange={() => {}}
      />,
    );
    expect(screen.queryByRole("list")).toBeNull();
    expect(
      screen.getByRole("button", { name: /Tıklama alanlar/ }),
    ).toBeDefined();
  });

  it("says why when a tab has no rows", () => {
    render(
      <StrikingSummary rows={[]} active={undefined} onChange={() => {}} />,
    );
    expect(
      screen.getByText(/5 ile 20 arasında kalan sorgu olmadığı/),
    ).toBeDefined();
  });
});
