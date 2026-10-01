import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { INTRO_STORAGE_KEY } from "./OpportunityStates";
import { OpportunitiesPage } from "./OpportunitiesPage";

const getSearchOpportunities = vi.fn();
vi.mock("@/serverFunctions/opportunities", () => ({
  getSearchOpportunities: (args: unknown): unknown =>
    getSearchOpportunities(args),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    ...rest
  }: {
    children: React.ReactNode;
    to: string;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

const traffic = {
  sessions: 5,
  activeUsers: 4,
  engagedSessions: 3,
  engagementRate: 0.6,
  keyEvents: 0,
  sessionKeyEventRate: 0,
  transactions: 0,
  purchaseRevenue: null,
};

function row(page: string, score: number, joined: boolean) {
  return {
    page,
    normalizedPage: page,
    clicks: 1,
    impressions: 100,
    ctr: 0.01,
    position: 8,
    joinStatus: joined ? ("joined" as const) : ("gsc_only" as const),
    ga4: joined ? traffic : null,
    score,
    kind: "near_miss" as const,
    ctrGap: null,
    scoreComponents: null,
  };
}

function report(rows: ReturnType<typeof row>[]) {
  return {
    status: "ok",
    report: {
      rows,
      rowCount: rows.length,
      totalCandidateRows: rows.length,
      request: {
        dateRange: { startDate: "2026-09-01", endDate: "2026-09-28" },
      },
      coverage: {
        matchedRows: rows.filter((r) => r.ga4).length,
        unmatchedGscRows: rows.filter((r) => !r.ga4).length,
        gscRowsConsidered: rows.length,
      },
      truncated: { gsc: false, candidates: false },
      warnings: [],
      scoring: {
        businessValueMetric: "engagementRate",
        engagementFallback: false,
      },
    },
  };
}

function renderPage() {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      <OpportunitiesPage
        projectId="p1"
        windowDays={28}
        limit={50}
        onViewChange={() => undefined}
      />
    </QueryClientProvider>,
  );
}

const rows = [
  row("https://example.com/joined", 40, true),
  row("https://example.com/alone", 70, false),
  row("https://example.com/best", 95, true),
];

/* The runtime's own `localStorage` is not reliably a Storage here, so the
   suite supplies one it controls. */
function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  };
}

beforeEach(() => {
  vi.stubGlobal("localStorage", memoryStorage());
  getSearchOpportunities.mockReset();
});

describe("OpportunitiesPage", () => {
  it("filters to pages without an Analytics match from the tile", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();

    const tile = await screen.findByRole("button", {
      name: /Analytics'te karşılığı yok.*tanesi/,
    });
    // The tile counts every candidate; its click lists only the returned rows.
    expect(tile.textContent).toContain("Listelenen");
    fireEvent.click(tile);

    expect(
      screen
        .getAllByRole("button", { name: /^Analytics'te karşılığı yok/ })
        .find((button) => button.hasAttribute("aria-pressed"))
        ?.getAttribute("aria-pressed"),
    ).toBe("true");
    expect(screen.getAllByRole("row").slice(1)).toHaveLength(1);
    expect(screen.getByText("/alone")).toBeDefined();
  });

  it("opens the dialog of the top-scoring row from its tile", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();

    fireEvent.click(
      await screen.findByRole("button", { name: /En yüksek puan/ }),
    );

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getAllByText(/best/).length).toBeGreaterThan(0);
  });

  it("puts the window and row-count controls in the header", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();

    await screen.findByLabelText("Dönem");
    const heading = screen.getByRole("heading", { name: "Fırsatlar" });
    // title block and actions share one row, two levels up from the h1.
    const headerRow = heading.parentElement?.parentElement;
    if (!headerRow) throw new Error("header row missing");
    expect(within(headerRow).getByLabelText("Dönem")).toBeDefined();
    expect(within(headerRow).getByLabelText("Satır sayısı")).toBeDefined();
  });

  it("keeps the window picker when nothing was found", async () => {
    getSearchOpportunities.mockResolvedValue(report([]));
    renderPage();

    expect(await screen.findByLabelText("Dönem")).toBeDefined();
  });

  it("remembers a collapsed intro, and survives unavailable storage", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    const first = renderPage();
    const toggle = screen.getByRole("button", { name: /Bu ekran ne işe/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(toggle);
    expect(window.localStorage.getItem(INTRO_STORAGE_KEY)).toBe("1");
    first.unmount();

    renderPage();
    expect(
      screen
        .getByRole("button", { name: /Bu ekran ne işe/ })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("stays open and usable when storage throws", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => undefined,
    });
    renderPage();
    const toggle = screen.getByRole("button", { name: /Bu ekran ne işe/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});
