import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { rankingArchiveView } from "@/shared/rankingArchive";
import {
  RankingSourceEvidence,
  type RankingArchiveData,
} from "./RankingSourceEvidence";

function archive(complete = 1, previous = 0): RankingArchiveData {
  return {
    ...rankingArchiveView([], [], { offset: 0, limit: 25 }),
    totalObserved: 1,
    rows: [],
    siteUrl: "sc-domain:example.com",
    coverageIssues: [],
    range: { startDate: "2026-07-28", endDate: "2026-10-25" },
    previousRange: { startDate: "2026-04-29", endDate: "2026-07-27" },
    days: 90,
    timeZone: "America/Los_Angeles",
    freshness: "assumed-lag",
    coverage: { complete, limited: 0, failed: 0, unknown: 90 - complete },
    previousCoverage: {
      complete: previous,
      limited: 0,
      failed: 0,
      unknown: 90 - previous,
    },
    truncated: false,
  };
}

it("leads with observed queries and states the missing comparison once in the open", () => {
  render(
    <RankingSourceEvidence
      data={archive()}
      notConnected={false}
      pick={vi.fn()}
    />,
  );
  expect(screen.getByText("1 sorgu gözlendi.")).toBeDefined();
  expect(screen.getAllByText("Karşılaştırma yok")).toHaveLength(1);
});

it("warns with response-day coverage without calling unverified days failed", () => {
  render(
    <RankingSourceEvidence
      data={archive()}
      notConnected={false}
      pick={vi.fn()}
    />,
  );
  const warning = screen.getByText(
    "Tam yanıtlı gün: 1/90; önceki dönem: 0/90.",
  );
  expect(warning.closest("details")).toBeNull();
  expect(screen.queryByText("Kısmi veri")).toBeNull();
  const breakdown = screen.getByText(/API yanıtı tamamlanan \/ sınırlı/);
  expect(breakdown.closest("details")?.open).toBe(false);
  expect(breakdown.textContent).toContain("1 / 0 / 0 / 89");
});

it("does not warn when both response windows are complete", () => {
  render(
    <RankingSourceEvidence
      data={archive(90, 90)}
      notConnected={false}
      pick={vi.fn()}
    />,
  );
  expect(screen.queryByText(/^Tam yanıtlı gün:/)).toBeNull();
});
