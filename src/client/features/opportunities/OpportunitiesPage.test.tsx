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

function renderPage(
  onViewChange = (
    _next: Parameters<
      Parameters<typeof OpportunitiesPage>[0]["onViewChange"]
    >[0],
  ) => {},
) {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      <OpportunitiesPage
        projectId="p1"
        windowDays={28}
        limit={50}
        onViewChange={onViewChange}
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
  it("shows measured pages instead of the empty state when gain is unknown", async () => {
    const data = makeReport([
      makeRow({
        gain: null,
        gainPerMonth: null,
        gainStatus: "unknown",
        gainReason: "belowThreshold",
        impressions: 6,
      }),
    ]);
    data.totals.gain = null;
    data.totals.gainPerMonth = null;
    data.totals.unknownPages = 1;
    data.totals.reasons.belowThreshold = 1;
    getSearchOpportunities.mockResolvedValue({ status: "ok", report: data });
    renderPage();
    expect(await screen.findByRole("table")).toBeDefined();
    expect(
      screen.queryByText("Bu sayfalar için tahmin edilebilir arama yok"),
    ).toBeNull();
    expect(screen.getAllByText("Kazanç bilinmiyor").length).toBeGreaterThan(0);
  });
  it("keeps detailed calculations collapsed and offers a useful next step on thin data", async () => {
    getSearchOpportunities.mockResolvedValue(report([]));
    renderPage();
    const summary = await screen.findByText("Veri kapsamı ve hesaplama");
    expect(summary.closest("details")?.open).toBe(false);
    expect(
      screen.getAllByRole("link", { name: "Arama performansını aç" }).length,
    ).toBeGreaterThan(0);
  });

  it("leads with an actionable page and an explicitly bounded gain", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();
    const start = await screen.findByRole("button", {
      name: "Önce şuna bakın",
    });
    expect(start.textContent).toContain("example.com/best");
    fireEvent.click(start);
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/En fazla.*30 gün/)).toBeDefined();
    expect(
      within(dialog).queryByText(/ayda yaklaşık.*anahtar olay/),
    ).toBeNull();
  });

  it("hands quick filters to the route for server-side selection before the limit", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    const change = vi.fn();
    renderPage(change);
    fireEvent.click(
      await screen.findByRole("button", { name: /^Dönüşüm getirenler(?!i)/ }),
    );
    expect(change).toHaveBeenCalledWith({ quick: "converts" });
    expect(
      screen.queryByRole("button", { name: /^Trafik var, dönüşüm yok/ }),
    ).toBeNull();
  });

  it("keeps period and limit controls on empty results without claiming no impressions", async () => {
    getSearchOpportunities.mockResolvedValue(report([]));
    renderPage();
    expect(await screen.findByLabelText("Dönem")).toBeDefined();
    expect(screen.getByLabelText("Satır sayısı")).toBeDefined();
    expect(
      screen.queryByText(/hiçbir sayfanız arama sonuçlarında görünmedi/),
    ).toBeNull();
  });

  it("preserves cached evidence and dates when refresh fails", async () => {
    getSearchOpportunities
      .mockResolvedValueOnce(report(rows))
      .mockRejectedValue(new Error("offline"));
    renderPage();
    await screen.findByRole("button", { name: "Önce şuna bakın" });
    fireEvent.click(screen.getByRole("button", { name: /Yenile/ }));
    expect(await screen.findByText("Fırsatlar yüklenemedi")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Önce şuna bakın" }).textContent,
    ).toContain("example.com/best");
    expect(screen.getByText(/Önceki sonuç gösteriliyor/)).toBeDefined();
  });

  it("puts the explanation after the worklist and starts it collapsed", async () => {
    getSearchOpportunities.mockResolvedValue(report(rows));
    renderPage();
    const toggle = await screen.findByRole("button", { name: /Burası ne işe/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(toggle);
    expect(window.localStorage.getItem(INTRO_STORAGE_KEY)).toBe("1");
  });

  it("asks for Search Console alone when disconnected", async () => {
    getSearchOpportunities.mockResolvedValue({ status: "needs_gsc" });
    renderPage();
    expect(
      await screen.findByText("Fırsatlar için Search Console gerekir"),
    ).toBeDefined();
    expect(screen.getByText("Bağlantıları ayarla")).toBeDefined();
  });
});

function unknownReport() {
  const data = makeReport([
    makeRow({
      gain: null,
      gainPerMonth: null,
      work: "snippet",
      impressions: 2,
      clicks: 0,
      position: 1,
    }),
  ]);
  data.totals.gainPerMonth = null;
  data.totals.unknownPages = 1;
  return data;
}
it("investigates thin evidence before prescribing content changes (C06)", async () => {
  getSearchOpportunities.mockResolvedValue({
    status: "ok",
    report: unknownReport(),
  });
  renderPage();
  const start = await screen.findByRole("button", { name: "Önce şuna bakın" });
  expect(start.closest("section")?.textContent).toContain("Sayfayı inceleyin");
  expect(screen.queryByText("Başlığı ve açıklamayı yenileyin")).toBeNull();
  fireEvent.click(start);
  const dialog = screen.getByRole("dialog");
  expect(
    within(dialog).getByText(/Önce ölçülen aramalarla başlığın/),
  ).toBeDefined();
  expect(within(dialog).queryByText(/Meta açıklamayı,/)).toBeNull();
});
it("does not promise estimates when every gain is unknown (C07)", async () => {
  getSearchOpportunities.mockResolvedValue({
    status: "ok",
    report: unknownReport(),
  });
  renderPage();
  await screen.findByRole("table");
  expect(screen.getByText(/Gözlenen sayfalar ve olası işler/)).toBeDefined();
  expect(screen.getByText(/Ölçülen aramaları incelemek için/)).toBeDefined();
});
it("keeps absent conversion coverage unknown and removes empty actions (C08-C09)", async () => {
  getSearchOpportunities.mockResolvedValue({
    status: "ok",
    report: unknownReport(),
  });
  renderPage();
  expect(await screen.findByText("Dönüşüm bilgisi bilinmiyor.")).toBeDefined();
  expect(screen.getByText(/Eşleşen: 0 \/ 1 sayfa/)).toBeDefined();
  expect(screen.getByText(/Dönüşüm durumu bilinmeyen: 1 sayfa/)).toBeDefined();
  expect(screen.queryByText(/· listele/)).toBeNull();
  expect(
    screen.queryByRole("button", { name: "Dönüşüm getirenleri göster" }),
  ).toBeNull();
});
it("keeps provenance labelled and calculation details collapsed (C10)", async () => {
  getSearchOpportunities.mockResolvedValue({
    status: "ok",
    report: unknownReport(),
  });
  renderPage();
  const summary = await screen.findByText("Veri kapsamı ve hesaplama");
  const method = summary.closest("details");
  expect(method?.open).toBe(false);
  expect(
    screen.getByText(/bu sayfaların tüm tıklamaları/).closest("details"),
  ).toBe(method);
  expect(
    screen.getByRole("region", { name: "Fırsatların kaynağı" }),
  ).toBeDefined();
});

it("offers a real conversion filter even when every candidate converts", async () => {
  getSearchOpportunities.mockResolvedValue(
    report([
      makeRow({ value: "converts", ga4: traffic, joinStatus: "joined" }),
    ]),
  );
  const change = vi.fn();
  renderPage(change);
  fireEvent.click(
    await screen.findByRole("button", { name: "Dönüşüm getirenleri göster" }),
  );
  expect(change).toHaveBeenCalledWith({ quick: "converts" });
});
