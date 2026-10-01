import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

function setup(onClose = vi.fn()) {
  const outside = document.createElement("button");
  outside.textContent = "Aç";
  document.body.appendChild(outside);
  outside.focus();
  const view = render(
    <Modal onClose={onClose} labelledBy="t">
      <h2 id="t">Başlık</h2>
      <button type="button">İlk</button>
      <button type="button">Son</button>
    </Modal>,
  );
  return { outside, view, onClose };
}

describe("Modal", () => {
  it("moves focus in, makes the page inert, and restores both on close", () => {
    const { outside, view } = setup();

    expect(document.activeElement).toBe(screen.getByText("İlk"));
    expect(outside.hasAttribute("inert")).toBe(true);

    view.unmount();

    expect(outside.hasAttribute("inert")).toBe(false);
    expect(document.activeElement).toBe(outside);
    outside.remove();
  });

  it("wraps Tab at the last control and closes on Escape", () => {
    const { outside, onClose } = setup();

    screen.getByText("Son").focus();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByText("İlk"));

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
    outside.remove();
  });
});
