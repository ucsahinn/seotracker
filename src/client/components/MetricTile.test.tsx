import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MetricTile } from "./MetricTile";

// `Link` needs a router; the contract here is where the tile points.
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    params,
    className,
  }: {
    children: React.ReactNode;
    to: string;
    params: Record<string, string>;
    className?: string;
  }) => (
    <a
      className={className}
      href={Object.entries(params).reduce(
        (path, [key, value]) => path.replace(`$${key}`, value),
        to,
      )}
    >
      {children}
    </a>
  ),
}));

describe("MetricTile", () => {
  it("is a link to its screen when given an href, named by its label and value", () => {
    render(
      <MetricTile
        label="Ortalama sıra"
        value="4,2"
        href={{ to: "/p/$projectId/rankings", projectId: "p1" }}
      />,
    );

    const link = screen.getByRole("link", { name: /Ortalama sıra/ });
    expect(link.getAttribute("href")).toBe("/p/p1/rankings");
    expect(link.textContent).toContain("4,2");
  });

  it("stays plain without an href", () => {
    render(<MetricTile label="Tıklama" value="10" />);

    expect(screen.queryByRole("link")).toBeNull();
  });
});
