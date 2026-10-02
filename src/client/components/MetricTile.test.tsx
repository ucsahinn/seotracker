import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DeltaBadge, MetricTile } from "./MetricTile";

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

  it("types a linked tile's hint as plain text so links never nest", () => {
    render(
      <MetricTile
        label="Sıra"
        value="3"
        href={{ to: "/p/$projectId/rankings", projectId: "p1" }}
        hint="düz metin"
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);

    const nested = (
      // @ts-expect-error a ReactNode hint cannot sit inside a linked tile
      <MetricTile
        label="Sıra"
        value="3"
        href={{ to: "/p/$projectId/rankings", projectId: "p1" }}
        hint={<a href="/y">bağlantı</a>}
      />
    );
    expect(nested).toBeDefined();
  });

  it("does not flash when only the wording of the value changes", () => {
    const { rerender, container } = render(
      <MetricTile label="Son güncelleme" value="2 dk önce" flashKey="t1" />,
    );
    rerender(
      <MetricTile label="Son güncelleme" value="3 dk önce" flashKey="t1" />,
    );
    expect(container.querySelector(".flash")).toBeNull();
    rerender(
      <MetricTile label="Son güncelleme" value="1 dk önce" flashKey="t2" />,
    );
    expect(container.querySelector(".flash")).not.toBeNull();
  });
});

describe("DeltaBadge", () => {
  it("renders nothing when the change rounds to 0% at the displayed precision", () => {
    const { container } = render(<DeltaBadge value={0.004} />);
    expect(container.innerHTML).toBe("");
  });

  it("shows direction and whole percent otherwise", () => {
    render(<DeltaBadge value={-0.12} />);
    expect(screen.getByText(/azaldı/)).toBeTruthy();
    expect(screen.getByText("%12")).toBeTruthy();
  });
});
