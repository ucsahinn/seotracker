import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { LocationSelect } from "./LocationSelect";
import { Modal } from "./Modal";

it("closes the country picker with Escape before closing its parent dialog", () => {
  const onClose = vi.fn();
  render(
    <Modal onClose={onClose} labelledBy="title">
      <h2 id="title">New project</h2>
      <LocationSelect value={2840} onChange={vi.fn()} />
    </Modal>,
  );
  fireEvent.click(screen.getByRole("button", { name: /Ülke:/ }));
  fireEvent.keyDown(screen.getByRole("textbox", { name: "Ülke ara" }), {
    key: "Escape",
  });
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(onClose).not.toHaveBeenCalled();
  expect(screen.getByRole("dialog")).toBeDefined();
});
