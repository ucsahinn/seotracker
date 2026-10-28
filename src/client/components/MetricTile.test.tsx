import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { countComparison, DeltaBadge, MetricTile } from "./MetricTile";

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

  it("uses explicit metric identity without deriving it from wording", () => {
    const { container, rerender } = render(
      <MetricTile label="Any localized label" value="10" metric="sessions" />,
    );
    const tile = container.querySelector<HTMLElement>("[data-metric]");
    expect(tile?.dataset.metric).toBe("sessions");
    expect(tile?.style.getPropertyValue("--metric-color")).toBe(
      "var(--data-sessions)",
    );
    rerender(<MetricTile label="Any localized label" value="10" />);
    expect(container.querySelector("[data-metric]")).toBeNull();
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
  it("distinguishes zero-base growth, unchanged and missing evidence (previously all disappeared)", () => {
    expect(countComparison(12, 0)).toMatchObject({
      neutral: true,
      text: "Önceki: 0 → 12",
    });
    expect(countComparison(0, 0)).toBe(0);
    expect(countComparison(0, 10)).toBe(-1);
    expect(countComparison(10, null)).toBeNull();
    expect(countComparison(0.25, 0, String)).toMatchObject({
      text: "Önceki: 0 → 0.25",
    });
  });
  it("keeps known unchanged comparisons visible (previously rounded zero disappeared)", () => {
    const { container } = render(<DeltaBadge value={0.0004} />);
    expect(container.textContent).toContain("Değişmedi");
  });

  it("shows direction and a signed one-decimal percent otherwise", () => {
    render(<DeltaBadge value={-0.12} />);
    expect(screen.getByText(/azaldı/)).toBeTruthy();
    expect(screen.getByText("-%12,0")).toBeTruthy();
  });
});
