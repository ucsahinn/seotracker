import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PortalMenu } from "./PortalMenu";

function setup() {
  render(
    <PortalMenu ariaLabel="Satır işlemleri">
      {(close) => (
        <>
          <li>
            <button type="button" onClick={close}>
              Düzenle
            </button>
          </li>
          <li>
            <button type="button" onClick={close}>
              Sil
            </button>
          </li>
        </>
      )}
    </PortalMenu>,
  );
  const trigger = screen.getByRole("button", { name: "Satır işlemleri" });
  fireEvent.click(trigger);
  return trigger;
}

describe("PortalMenu keyboard", () => {
  it("focuses the first item on open and exposes menu semantics", () => {
    const trigger = setup();

    expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
    expect(screen.getByRole("menu", { name: "Satır işlemleri" })).toBeTruthy();
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Düzenle" }),
    );
  });

  it("moves with arrows and wraps", () => {
    setup();
    const menu = screen.getByRole("menu");

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Sil" }),
    );
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Düzenle" }),
    );
    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Sil" }),
    );
  });

  it("closes on Escape and returns focus to the trigger", () => {
    const trigger = setup();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("returns focus to the trigger after choosing an item", () => {
    const trigger = setup();

    fireEvent.click(screen.getByRole("menuitem", { name: "Sil" }));

    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});

it.each([
  { height: 844, menuHeight: 240, bottom: 820 },
  { height: 160, menuHeight: 300, bottom: 140 },
])(
  "UX-01 keeps bottom-edge menus within a $height px viewport and scrollable",
  ({ height, menuHeight, bottom }) => {
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(height);
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(390);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        return {
          top: bottom - 24,
          bottom,
          left: 350,
          right: 374,
          width: 24,
          height: this.tagName === "UL" ? menuHeight : 24,
          x: 350,
          y: bottom - 24,
          toJSON() {
            return {};
          },
        };
      },
    );
    setup();
    const menu = screen.getByRole("menu");
    const top = Number.parseFloat(menu.style.top);
    const maxHeight = Number.parseFloat(menu.style.maxHeight);
    expect(top).toBeGreaterThanOrEqual(8);
    expect(top + Math.min(menuHeight, maxHeight)).toBeLessThanOrEqual(
      height - 8,
    );
    expect(menu.style.overflowY).toBe("auto");
    fireEvent.scroll(menu);
    expect(screen.getByRole("menu")).toBe(menu);
    fireEvent.click(screen.getByRole("menuitem", { name: "Sil" }));
    expect(screen.queryByRole("menu")).toBeNull();
  },
);
