import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MoversCard } from "./MoversCard";

describe("MoversCard", () => {
  it("does not claim stable rankings when no queries can be compared", () => {
    render(<MoversCard rows={[]} comparableCount={0} onPick={vi.fn()} />);
    expect(screen.getByText(/İki dönemde de gözlenen sorgu yok/)).toBeDefined();
    expect(screen.queryByText(/belirgin yükselen sorgu yok/)).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Daha fazla hareket/ }),
    ).toBeNull();
  });

  it("reports measured absence of movement only for a comparable cohort", () => {
    render(<MoversCard rows={[]} comparableCount={5} onPick={vi.fn()} />);
    expect(screen.getByText(/belirgin yükselen sorgu yok/)).toBeDefined();
    expect(screen.queryByText(/İki dönemde de gözlenen sorgu yok/)).toBeNull();
  });
});
