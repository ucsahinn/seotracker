import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { INTRO_STORAGE_KEY } from "./OpportunityStates";
import { OpportunitiesPage } from "./OpportunitiesPage";
import { makeReport, makeRow } from "./opportunity-test-fixtures";

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
  sessions: 120,
  activeUsers: 100,
  engagedSessions: 70,
  engagementRate: 0.6,
  keyEvents: 6,
  sessionKeyEventRate: 0.05,
  transactions: 0,
  purchaseRevenue: null,
};

const report = (rows: ReturnType<typeof makeRow>[]) => ({
  status: "ok",
  report: makeReport(rows),
});

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
  makeRow({ page: "https://example.com/best", gainPerMonth: 400 }),
  makeRow({
    page: "https://example.com/sells",
    gainPerMonth: 200,
    joinStatus: "joined",
    ga4: traffic,
    value: "converts",
  }),
  makeRow({ page: "https://example.com/alone", gainPerMonth: 50 }),
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
  it("leads with the clicks to gain and the page to start with", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();

    const start = await screen.findByRole("button", {
      name: /Önce şuna bakın/,
    });
    expect(start.textContent).toContain("/best");
    expect(
      screen.getByText("En fazla kazanılabilecek tıklama / ay (üst sınır)"),
    ).toBeDefined();

    fireEvent.click(start);
    expect(
      within(screen.getByRole("dialog")).getAllByText(/best/).length,
    ).toBeGreaterThan(0);
  });

  it("filters to converting pages, and hides chips that would select everything", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();

    fireEvent.click(
      await screen.findByRole("button", { name: /^Dönüşüm getirenler/ }),
    );
    expect(screen.getAllByRole("row").slice(1)).toHaveLength(1);
    expect(screen.getByText("/sells")).toBeDefined();
    // Every listed page with Analytics converts; "no conversions" holds none.
    expect(
      screen.queryByRole("button", { name: /^Trafik var, dönüşüm yok/ }),
    ).toBeNull();
  });

  it("puts the window and row-count controls in the header", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();

    await screen.findByLabelText("Dönem");
    const heading = screen.getByRole("heading", { name: "Fırsatlar" });
    // The controls belong to the page header, regardless of title adornments.
    const headerRow = heading.closest("header");
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
    const toggle = screen.getByRole("button", { name: /Burası ne işe/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(toggle);
    expect(window.localStorage.getItem(INTRO_STORAGE_KEY)).toBe("1");
    first.unmount();

    renderPage();
    expect(
      screen
        .getByRole("button", { name: /Burası ne işe/ })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("starts the intro closed and asks only for Search Console when nothing is connected", async () => {
    getSearchOpportunities.mockResolvedValue({ status: "needs_gsc" });
    renderPage();

    expect(
      await screen.findByText("Fırsatlar için Search Console gerekir"),
    ).toBeDefined();
    expect(
      screen
        .getByRole("button", { name: /Burası ne işe/ })
        .getAttribute("aria-expanded"),
    ).toBe("false");
    expect(screen.getByText("Bağlantıları ayarla")).toBeDefined();
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
    const toggle = screen.getByRole("button", { name: /Burası ne işe/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});
