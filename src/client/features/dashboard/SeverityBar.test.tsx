import { render, screen } from "@testing-library/react";
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
  it("links each present severity to the issues tab and skips empty ones", () => {
    render(
      <SeverityBar
        projectId="p1"
        auditId="a1"
        totals={{ critical: 3, warning: 0, info: 1 }}
      />,
    );

    const critical = screen.getByRole("link", { name: /Kritik: 3/ });
    expect(critical.getAttribute("data-tab")).toBe("issues");
    expect(screen.queryByRole("link", { name: /Uyarı/ })).toBeNull();
    expect(screen.getByText(/1 bilgi/)).toBeDefined();
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
