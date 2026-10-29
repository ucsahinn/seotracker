import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { OpportunityAnalyticsLink } from "./OpportunityAnalyticsLink";
import { makeRow } from "./opportunity-test-fixtures";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    search,
  }: {
    children: React.ReactNode;
    search: Record<string, string>;
  }) => (
    <a href={`https://local.test/analytics?${new URLSearchParams(search)}`}>
      {children}
    </a>
  ),
}));

it("links collapsed variants to the canonical group with organic source dates", () => {
  render(
    <OpportunityAnalyticsLink
      row={makeRow({
        page: "https://EXAMPLE.com/a/?x=1",
        joinPrecision: "collapsed",
      })}
      projectId="p"
      dateRange={{ startDate: "2026-09-22", endDate: "2026-09-28" }}
    />,
  );
  const link = screen.getByRole("link", {
    name: "Analytics adres grubunu incele",
  });
  const search = new URL(link.getAttribute("href")!).searchParams;
  expect(search.get("pageGroup")).toBe("example.com/a");
  expect(search.get("startDate")).toBe("2026-09-22");
  expect(search.get("endDate")).toBe("2026-09-28");
  expect(search.get("channel")).toBe("organic_search");
  expect(search.get("view")).toBe("landing_pages");
  expect(search.get("offset")).toBe("0");
});

it.each([
  {
    normalizedPage: null,
    expected: "Sayfa adresi Analytics bağlantısı için doğrulanamadı.",
  },
  {
    normalizedPage: "example.com/other",
    joinPrecision: "exact" as const,
    expected: "Sayfa adresi Analytics bağlantısı için doğrulanamadı.",
  },
  {
    joinPrecision: null,
    expected: "Analytics eşleşmesi doğrulanamadı; nedeni bilinmiyor.",
  },
])("explains an unavailable or inconsistent match", (overrides) => {
  render(
    <OpportunityAnalyticsLink
      row={makeRow({ ...overrides, joinStatus: "joined" })}
      projectId="p"
      dateRange={{ startDate: "2026-09-22", endDate: "2026-09-28" }}
    />,
  );
  expect(screen.queryByRole("link")).toBeNull();
  expect(screen.getByText(overrides.expected)).toBeTruthy();
});

it("distinguishes a missing Analytics row from an unverifiable match", () => {
  render(
    <OpportunityAnalyticsLink
      row={makeRow()}
      projectId="p"
      dateRange={{ startDate: "2026-09-22", endDate: "2026-09-28" }}
    />,
  );
  expect(
    screen.getByText("Bu sayfa için eşleşen Analytics verisi dönmedi."),
  ).toBeDefined();
});

it("names missing report dates without diagnosing a failed page match", () => {
  render(
    <OpportunityAnalyticsLink
      row={makeRow({ joinPrecision: "exact" })}
      projectId="p"
    />,
  );
  expect(
    screen.getByText("Analytics bağlantısı için rapor tarihleri eksik."),
  ).toBeDefined();
});
