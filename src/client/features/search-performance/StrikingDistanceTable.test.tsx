import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StrikingDistanceTable } from "./SearchPerformanceParts";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

function renderTable(segmentFiltered: boolean) {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <StrikingDistanceTable
        projectId="p1"
        rows={[]}
        hasQueryData={false}
        segmentFiltered={segmentFiltered}
      />
    </QueryClientProvider>,
  );
}

describe("StrikingDistanceTable empty state", () => {
  it("does not say Search Console shared nothing when a country or device filter is on", () => {
    renderTable(true);
    expect(screen.getByText("Bu seçimde sorgu verisi yok")).toBeTruthy();
    expect(screen.queryByText(/henüz gelmedi/)).toBeNull();
  });

  it("keeps the not-yet-arrived message without a segment filter", () => {
    renderTable(false);
    expect(
      screen.getByText("Kelime düzeyinde veri henüz gelmedi"),
    ).toBeTruthy();
  });
});
