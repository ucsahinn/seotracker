import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { OpportunityDetail } from "./OpportunityDetail";
import { makeRow } from "./opportunity-test-fixtures";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    search,
  }: {
    children: React.ReactNode;
    to: string;
    search: Record<string, string>;
  }) => <a href={`${to}?${new URLSearchParams(search)}`}>{children}</a>,
}));

it.each([7, 90])(
  "keeps %i source days and literal URL (previously substituted a moving preset and substring)",
  (days) => {
    const startDate = days === 7 ? "2026-09-22" : "2026-07-01";
    const endDate = "2026-09-28";
    const page = "https://example.com/a?x=1&y=2";
    render(
      <OpportunityDetail
        row={makeRow({ page })}
        days={days}
        dateRange={{ startDate, endDate }}
        projectId="p"
        onClose={() => {}}
      />,
    );
    const link = screen.getByRole("link", { name: "Arama performansında aç" });
    const search = new URL(link.getAttribute("href")!, "https://local.test")
      .searchParams;
    expect(search.get("exactPage")).toBe(page);
    expect(search.get("startDate")).toBe(startDate);
    expect(search.get("endDate")).toBe(endDate);
    expect(search.has("q")).toBe(false);
  },
);
