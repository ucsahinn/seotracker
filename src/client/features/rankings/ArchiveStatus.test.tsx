import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ArchiveStatus } from "./ArchiveStatus";
import { formatDate } from "@/shared/format";

it("renders a single-day archive once and separates check time from caveats", () => {
  render(
    <ArchiveStatus
      projectId="p"
      sync={{
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
        data: {
          earliestDate: "2026-10-25",
          lastDate: "2026-10-25",
          scannedThrough: "2026-10-26",
          lastRunAt: "2026-10-28T09:58:00Z",
          rowCount: 1,
          newDays: 0,
          hasMore: false,
          notConnected: false,
          error: null,
        },
      }}
    />,
  );
  const span = screen.getByText(/tarihli geçmiş bu bilgisayarda/);
  expect(span.textContent?.split(formatDate("2026-10-25"))).toHaveLength(2);
  const checked = screen.getByText(/Son kontrol:/);
  expect(checked.textContent).not.toContain("Google");
  expect(checked.tagName).toBe("P");
});
