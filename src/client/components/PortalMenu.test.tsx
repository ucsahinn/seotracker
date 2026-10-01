import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
