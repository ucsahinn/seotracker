import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EMPTY_PERFORMANCE_FILTERS } from "./AuditResultsTableFilterLogic";
import { describeQuotaStop, speedBands } from "./performanceBands";
import { ScoreHistogram } from "./ScoreHistogram";

const mobile = (performanceScore: number | null) => ({
  performanceScore,
  strategy: "mobile" as const,
});

describe("speedBands", () => {
  it("puts 90 and 50 in the better band, and ignores desktop and unscored rows", () => {
    const bands = speedBands([
      mobile(100),
      mobile(90),
      mobile(89),
      mobile(50),
      mobile(49),
      mobile(0),
      mobile(null),
      { performanceScore: 95, strategy: "desktop" as const },
    ]);

    expect(bands.map((band) => [band.key, band.count])).toEqual([
      ["good", 2],
      ["fair", 2],
      ["poor", 2],
    ]);
  });
});

describe("ScoreHistogram", () => {
  const rows = [mobile(95), mobile(70), mobile(20)];

  it("filters the table to mobile rows in the clicked band", () => {
    const onChange = vi.fn();
    render(
      <ScoreHistogram
        rows={rows}
        filters={EMPTY_PERFORMANCE_FILTERS}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Yavaş/ }));

    expect(onChange).toHaveBeenLastCalledWith({
      ...EMPTY_PERFORMANCE_FILTERS,
      device: "mobile",
      minPerf: "",
      maxPerf: "49",
    });
  });

  it("lets go of the band on a second click", () => {
    const onChange = vi.fn();
    render(
      <ScoreHistogram
        rows={rows}
        filters={{
          ...EMPTY_PERFORMANCE_FILTERS,
          device: "mobile",
          minPerf: "50",
          maxPerf: "89",
        }}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Orta/ }));

    expect(onChange).toHaveBeenLastCalledWith(EMPTY_PERFORMANCE_FILTERS);
  });

  it("draws nothing when no mobile score exists", () => {
    const { container } = render(
      <ScoreHistogram
        rows={[mobile(null)]}
        filters={EMPTY_PERFORMANCE_FILTERS}
        onChange={() => {}}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});

const row = (pageId: string, errorMessage: string | null) => ({
  pageId,
  errorMessage,
  performanceScore: errorMessage ? null : 80,
  accessibilityScore: errorMessage ? null : 80,
  bestPracticesScore: errorMessage ? null : 80,
  seoScore: errorMessage ? null : 80,
});

describe("describeQuotaStop", () => {
  it("says how many pages were measured and how many were not", () => {
    const note = describeQuotaStop(
      [row("a", null), row("a", null), row("b", "Kota doldu: dolu")],
      20,
    );

    expect(note).toContain("Kota doldu; 1 sayfa ölçüldü, 9 sayfa ölçülemedi");
    expect(note).toContain("PageSpeed anahtarı");
  });

  it("stays silent for ordinary failures", () => {
    expect(describeQuotaStop([row("a", "NO_FCP")], 2)).toBeNull();
  });
});

const failed = (errorMessage: string, pageId = "p") => ({
  pageId,
  errorMessage,
  performanceScore: null,
  accessibilityScore: null,
  bestPracticesScore: null,
  seoScore: null,
});

describe("describeQuotaStop markers", () => {
  it("explains rows left rate-limited after the final re-pass", () => {
    const note = describeQuotaStop(
      [failed("Dakikalık sınır: 429"), failed("Dakikalık sınır: 429", "q")],
      4,
    );

    expect(note).toBe(
      "Google'ın dakikalık sınırı yüzünden 2 ölçüm yapılamadı; denetimi daha sonra yeniden başlatın veya Ayarlar'dan anahtarınızın kotasını kontrol edin.",
    );
  });

  it("explains keyless quota rows and stays silent for an unmarked failure", () => {
    expect(describeQuotaStop([failed("Anahtar yok: kota")], 2)).toMatch(
      /anahtarı girilmediği için 1 ölçüm.*Ayarlar/,
    );
    expect(describeQuotaStop([failed("NO_FCP")], 2)).toBeNull();
  });
});
