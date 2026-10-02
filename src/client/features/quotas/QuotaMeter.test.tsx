import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { QuotaItem } from "@/server/features/quotas/quotaTypes";
import { QuotaMeter } from "./QuotaMeter";
import { worstQuotaState } from "./quotaPresentation";

const item = (overrides: Partial<QuotaItem> = {}): QuotaItem => ({
  id: "url_inspection",
  kind: "url_inspection",
  label: "URL Denetimi",
  used: 1800,
  limit: 2000,
  unit: "sorgu",
  state: "critical",
  detail: "Günlük sınır.",
  source: "Uygulamanın kendi kaydı",
  updatedAt: "2026-10-02T12:00:00.000Z",
  ...overrides,
});

describe("QuotaMeter", () => {
  it("is a named meter whose value text and state are words, not colour", () => {
    render(<QuotaMeter item={item()} />);
    const meter = screen.getByRole("meter", { name: "URL Denetimi" });
    expect(meter.getAttribute("aria-valuenow")).toBe("1800");
    expect(meter.getAttribute("aria-valuetext")).toContain("200 kaldı");
    expect(screen.getAllByText("Neredeyse doldu").length).toBeGreaterThan(0);
    expect(screen.getByText(/Kaynak: Uygulamanın kendi kaydı/)).toBeTruthy();
  });

  it("draws no bar when there is no ceiling", () => {
    render(
      <QuotaMeter
        item={item({ limit: null, state: "unknown", unit: "ölçüm" })}
      />,
    );
    expect(screen.queryByRole("meter")).toBeNull();
    expect(screen.getByText("Bilinmiyor")).toBeTruthy();
  });

  it("shows only what is left, with no bar, when the source reports no ceiling", () => {
    render(
      <QuotaMeter
        item={item({
          used: null,
          limit: null,
          remaining: 1_900_000,
          state: "unknown",
          unit: "belirteç",
        })}
      />,
    );
    expect(screen.queryByRole("meter")).toBeNull();
    expect(screen.getByText("Kalan: 1.900.000 belirteç")).toBeTruthy();
  });
});

describe("worstQuotaState", () => {
  it("takes the worst known state and ignores unknown ones", () => {
    expect(
      worstQuotaState([item({ state: "unknown" }), item({ state: "ok" })]),
    ).toBe("ok");
    expect(
      worstQuotaState([item({ state: "warn" }), item({ state: "critical" })]),
    ).toBe("critical");
    expect(worstQuotaState([item({ state: "unknown" })])).toBe("unknown");
  });
});
