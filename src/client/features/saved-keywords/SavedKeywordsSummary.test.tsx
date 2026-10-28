import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
import { SavedKeywordsSummary } from "./SavedKeywordsSummary";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

const snapshot: SavedWatchlist = {
  rows: [],
  tags: [],
  totalSavedMatching: 5,
  totalObservedMatching: 5,
  totalMatching: 5,
  comparableCount: 0,
  upSignificant: 0,
  downSignificant: 0,
  stableComparable: 0,
  noPrevious: 5,
  noCurrent: 0,
  bandUnavailable: false,
  bands: { top3: 0, top10: 0, top20: 4, beyond: 1, none: 0, firstPage: 0 },
  range: { startDate: "2026-07-28", endDate: "2026-10-25" },
  previousRange: { startDate: "2026-04-29", endDate: "2026-07-27" },
  requestedDays: 90,
  timeZone: "America/Los_Angeles",
  observedDates: ["2026-10-15", "2026-10-25"],
  previousObservedDates: [],
  coverage: { complete: 0, limited: 0, failed: 0, unknown: 90 },
  previousCoverage: { complete: 0, unknown: 90 },
  status: null,
  archiveError: false,
  previousError: false,
  statusError: false,
  connectionError: false,
  siteUrl: "sc-domain:vaultpilot.io",
  lookupTruncated: false,
  scope: "Google Web",
  snapshot: "snapshot",
  filters: {
    includeTerms: [],
    excludeTerms: [],
    tagIds: [],
    band: null,
    fallers: false,
    sort: "createdAt",
    order: "desc",
  },
  page: 1,
  pageSize: 50,
};

describe("SavedKeywordsSummary", () => {
  it("does not present zero movement as measured when there is no comparison", () => {
    render(
      <SavedKeywordsSummary
        projectId="p1"
        data={snapshot}
        stale={false}
        onRetry={vi.fn()}
        onFilter={vi.fn()}
        onFallers={vi.fn()}
      />,
    );
    const card = screen.getByRole("button", { name: /Belirgin hareket/ });
    expect(card.textContent).toContain("Karşılaştırma yok");
    expect(card.hasAttribute("disabled")).toBe(true);
    expect(card.textContent).not.toContain("↑ 0");
  });

  it("does not warn about missing current observations when all saved words were observed", () => {
    render(
      <SavedKeywordsSummary
        projectId="p1"
        data={snapshot}
        stale={false}
        onRetry={vi.fn()}
        onFilter={vi.fn()}
        onFallers={vi.fn()}
      />,
    );
    const card = screen.getAllByRole("button", { name: /^Sıra bilinmiyor/ })[0];
    expect(card.textContent).not.toContain("Eksik arşiv");
    expect(card.hasAttribute("disabled")).toBe(true);
  });
});
