import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ReportEmptyState } from "./ReportEmptyState";

it("offers all traffic and measurement checks for an empty organic landing report", () => {
  const allTraffic = vi.fn();
  const health = vi.fn();
  render(
    <ReportEmptyState
      kind="landing_pages"
      organicOnly
      emptyReason={null}
      onShowAllTraffic={allTraffic}
      onOpenHealth={health}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Tüm trafiğe bak" }));
  fireEvent.click(screen.getByRole("button", { name: "Ölçüm durumu" }));
  expect(allTraffic).toHaveBeenCalledOnce();
  expect(health).toHaveBeenCalledOnce();
  expect(screen.queryByText(/birkaç gün sonra/)).toBeNull();
});

it("does not offer an already selected all-traffic scope", () => {
  render(
    <ReportEmptyState
      kind="landing_pages"
      organicOnly={false}
      emptyReason={null}
      onShowAllTraffic={vi.fn()}
    />,
  );
  expect(screen.queryByRole("button", { name: "Tüm trafiğe bak" })).toBeNull();
});
