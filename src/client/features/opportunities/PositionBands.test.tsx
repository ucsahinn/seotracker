import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { bandOf, PositionBands } from "./PositionBands";

function row(position: number, clicks = 10) {
  return { position, clicks };
}

describe("bandOf", () => {
  /*
   * The band edges are the whole contract: the page filters on this, so an
   * off-by-one here hides rows from a tile that counted them.
   */
  it("places a position in exactly one band, and nothing outside 4–20", () => {
    expect(bandOf(3)).toBeNull();
    expect(bandOf(4)).toBe("4-5");
    expect(bandOf(5)).toBe("4-5");
    expect(bandOf(6)).toBe("6-10");
    expect(bandOf(10)).toBe("6-10");
    expect(bandOf(11)).toBe("11-15");
    expect(bandOf(15)).toBe("11-15");
    expect(bandOf(16)).toBe("16-20");
    expect(bandOf(20)).toBe("16-20");
    expect(bandOf(21)).toBeNull();
  });
});

describe("PositionBands", () => {
  it("counts each row into its own band", () => {
    render(
      <PositionBands
        rows={[row(4), row(5), row(7), row(19)]}
        selected={null}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /4 – 5/ }).textContent).toContain(
      "2",
    );
    expect(
      screen.getByRole("button", { name: /6 – 10/ }).textContent,
    ).toContain("1");
  });

  /*
   * An empty band stays on screen — a gap in the distribution is a finding —
   * but there is nothing to filter down to, so pressing it would produce an
   * empty table with no way back except pressing it again.
   */
  it("shows an empty band but does not offer it as a filter", () => {
    render(
      <PositionBands rows={[row(4)]} selected={null} onSelect={vi.fn()} />,
    );

    const empty = screen.getByRole("button", { name: /16 – 20/ });
    expect(empty).toHaveProperty("disabled", true);
  });

  it("pressing the selected band clears the filter rather than reapplying it", () => {
    const onSelect = vi.fn();
    render(
      <PositionBands rows={[row(4)]} selected="4-5" onSelect={onSelect} />,
    );

    screen.getByRole("button", { name: /4 – 5/ }).click();

    expect(onSelect).toHaveBeenCalledWith(null);
  });
});
