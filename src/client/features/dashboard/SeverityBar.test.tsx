import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SeverityBar } from "@/client/features/dashboard/SeverityBar";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    search,
    ...props
  }: {
    children?: React.ReactNode;
    search?: { tab: string };
  }) => (
    <a href="#" data-tab={search?.tab} {...props}>
      {children}
    </a>
  ),
}));

describe("SeverityBar", () => {
  it("separates page findings and their counting unit from site-wide checks", () => {
    render(
      <SeverityBar
        projectId="p1"
        auditId="a1"
        totals={{ critical: 0, warning: 32, info: 7 }}
        siteTotals={{ critical: 0, warning: 0, info: 3 }}
      />,
    );
    const pages = screen.getByRole("group", { name: "Sayfa bulguları" });
    const site = screen.getByRole("group", { name: "Site geneli kontroller" });
    expect(within(pages).getByText("32 uyarı")).toBeDefined();
    expect(within(pages).getByText("7 bilgi")).toBeDefined();
    expect(
      within(pages).getByText(/aynı sayfa birden fazla kez sayılabilir/),
    ).toBeDefined();
    expect(within(site).getByText(/3 bilgi/)).toBeDefined();
    expect(within(site).queryByText(/aynı sayfa/)).toBeNull();
  });
  it("does not show an unlabelled 100 percent beside warning counts or an empty site-wide tally", () => {
    render(
      <SeverityBar
        projectId="p1"
        auditId="a1"
        totals={{ critical: 0, warning: 32, info: 7 }}
        siteTotals={{ critical: 0, warning: 0, info: 0 }}
      />,
    );
    expect(screen.getByRole("link", { name: /32 uyarı/ })).toBeDefined();
    expect(screen.queryByText("%100")).toBeNull();
    expect(screen.queryByText(/Site geneli/)).toBeNull();
  });
  it("links each present severity to the issues tab and skips empty ones", () => {
    render(
      <SeverityBar
        projectId="p1"
        auditId="a1"
        totals={{ critical: 3, warning: 0, info: 1 }}
      />,
    );

    // The legend items are the reachable links, so a thin segment still is.
    const critical = screen.getByRole("link", { name: /3 kritik/ });
    expect(critical.getAttribute("data-tab")).toBe("issues");
    expect(screen.queryByRole("link", { name: /uyarı/ })).toBeNull();
    expect(screen.getByText("1 bilgi")).toBeDefined();
    expect(screen.queryByRole("link", { name: /1 bilgi/ })).toBeNull();
  });

  it("draws nothing for an audit with no findings", () => {
    const { container } = render(
      <SeverityBar
        projectId="p1"
        auditId="a1"
        totals={{ critical: 0, warning: 0, info: 0 }}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
