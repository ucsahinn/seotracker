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
