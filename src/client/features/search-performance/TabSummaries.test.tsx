import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  clickTierBuckets,
  positionBuckets,
  strikingBuckets,
} from "./tabBuckets";
import {
  PagesSummary,
  QueriesSummary,
  quickFilterForTab,
  StrikingSummary,
} from "./TabSummaries";

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

  it("writes the click share without a number-dependent suffix", () => {
    const cases: [string, number[]][] = [
      ["%20", Array.from({ length: 25 }, () => 4)],
      ["%30", [6, 6, 6, 6, 6, ...Array.from({ length: 14 }, () => 5)]],
      ["%100", [1000, 1000, 1000, 1000, 1000, 1]],
    ];
    for (const [expected, clicks] of cases) {
      const { unmount } = render(
        <PagesSummary
          rows={clicks.map((count) => row(3, count))}
          active={undefined}
          onChange={() => {}}
        />,
      );
      expect(document.body.textContent).toContain(`payı: ${expected}.`);
      unmount();
    }
  });

  it("lets a tab apply only the filters it can show and clear", () => {
    expect(quickFilterForTab("pages", "pos5to10")).toBeUndefined();
    expect(quickFilterForTab("queries", "pos5to10")).toBeUndefined();
    expect(quickFilterForTab("striking", "pos5to10")).toBe("pos5to10");
    expect(quickFilterForTab("queries", "lowCtr")).toBe("lowCtr");
    expect(quickFilterForTab("cannibalization", "noClicks")).toBeUndefined();
    // Every bar a tab draws is a filter that tab accepts.
    for (const bucket of positionBuckets([])) {
      expect(quickFilterForTab("queries", bucket.id)).toBe(bucket.id);
    }
    for (const bucket of clickTierBuckets([])) {
      expect(quickFilterForTab("pages", bucket.id)).toBe(bucket.id);
    }
    for (const bucket of strikingBuckets([])) {
      expect(quickFilterForTab("striking", bucket.id)).toBe(bucket.id);
    }
  });
});
