import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuditTrendChart } from "./AuditTrendChart";

const audit = (id: string, startedAt: string, warning: number) => ({
  id,
  startUrl: "https://example.com",
  status: "completed" as const,
  startedAt,
  completedAt: startedAt,
  pagesCrawled: 300,
  pagesTotal: 300,
  ranLighthouse: false,
  comparison: { previousAuditId: "b", compatible: true },
  issues: { critical: 0, warning, info: 0 },
});

describe("AuditTrendChart", () => {
  it("does not claim a clean site when one warning over 300 pages rounds to zero per 100", () => {
    render(
      <AuditTrendChart
        history={[
          audit("a", "2026-02-01T10:00:00Z", 1),
          audit("b", "2026-01-01T10:00:00Z", 1),
        ]}
      />,
    );

    expect(screen.queryByText(/hiçbirinde kritik sorun/)).toBeNull();
  });

  it("says so when no audit found a critical issue or warning", () => {
    render(
      <AuditTrendChart
        history={[
          audit("a", "2026-02-01T10:00:00Z", 0),
          audit("b", "2026-01-01T10:00:00Z", 0),
        ]}
      />,
    );

    expect(screen.getByText(/hiçbirinde kritik sorun/)).toBeTruthy();
  });
});

it("C24 preserves independent counts without connecting incompatible crawls", () => {
  render(
    <AuditTrendChart
      history={[
        { ...audit("a", "2026-01-01", 32), pagesCrawled: 20 },
        { ...audit("b", "2026-02-01", 157), pagesCrawled: 144 },
      ]}
    />,
  );
  expect(
    screen.getByText(
      "Karşılaştırma yapılamadı: tarama kapsamları farklı veya bilinmiyor.",
    ),
  ).toBeTruthy();
  expect(screen.queryByText(/azaldı|arttı/)).toBeNull();
  expect(
    screen.getByRole("table", {
      name: "Denetim başına sayfa yoğunluğu: yüz sayfa başına sorun",
    }).textContent,
  ).toContain("157");
});
it("C25 labels the visible severity series for compatible audits", () => {
  render(
    <AuditTrendChart
      history={[
        audit("a", "2026-01-01", 32),
        {
          ...audit("b", "2026-02-01", 30),
          comparison: { previousAuditId: "a", compatible: true },
        },
      ]}
    />,
  );
  const legend = screen.getByRole("group", { name: "Grafik serileri" });
  expect(legend.textContent).toContain("Kritik");
  expect(legend.textContent).toContain("Uyarı");
});
