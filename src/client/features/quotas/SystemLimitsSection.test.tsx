import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { SystemLimitsSection } from "./SystemLimitsSection";
vi.mock("./useActiveProjectId", () => ({
  useActiveProjectId: () => ({
    projectId: "a",
    projects: [{ id: "a", name: "Example" }],
    isPending: false,
    isError: false,
  }),
}));
vi.mock("./useQuotaStatus", () => ({
  useQuotaStatus: () => ({
    data: {
      items: [
        { id: "reports", state: "ok" },
        { id: "ga4", state: "unknown" },
      ],
    },
    isError: false,
  }),
}));
vi.mock("./QuotaCard", () => ({ QuotaCard: () => null }));
it("names the selected project and qualifies a mixed known/unknown summary", () => {
  render(<SystemLimitsSection />);
  expect(screen.getByRole("combobox").textContent).toContain("Example");
  expect(
    screen.getByText(
      "Bilinen sınırlarda sorun yok · 1 sınırın kullanımı bilinmiyor",
    ),
  ).toBeTruthy();
  expect(screen.queryByText("Yeterli")).toBeNull();
});
