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
  fireEvent.keyDown(screen.getByRole("combobox", { name: "Ülke ara" }), {
    key: "Escape",
  });
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(onClose).not.toHaveBeenCalled();
  expect(screen.getByRole("dialog")).toBeDefined();
});

it("UX-04 connects the country keyboard highlight to the option Enter selects without dangling empty results", () => {
  const onChange = vi.fn();
  render(
    <LocationSelect
      value={2840}
      onChange={onChange}
      options={[
        {
          code: 2840,
          label: "United States",
          shortLabel: "US",
          languageCode: "en",
        },
        { code: 2276, label: "Germany", shortLabel: "DE", languageCode: "de" },
      ]}
    />,
  );
  const trigger = screen.getByRole("button", { name: /Ülke:/ });
  fireEvent.click(trigger);
  const search = screen.getByRole("combobox", { name: "Ülke ara" });
  expect(search.getAttribute("aria-expanded")).toBe("true");
  expect(document.getElementById(search.getAttribute("aria-controls")!)).toBe(
    screen.getByRole("listbox"),
  );
  fireEvent.keyDown(search, { key: "ArrowDown" });
  const active = document.getElementById(
    search.getAttribute("aria-activedescendant")!,
  );
  expect(active).toBe(screen.getByRole("option", { name: "Almanya" }));
  expect(active?.getAttribute("aria-selected")).toBe("false");
  fireEvent.keyDown(search, { key: "Enter" });
  expect(onChange).toHaveBeenCalledWith(2276);
  fireEvent.click(trigger);
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "zzzzzz" },
  });
  expect(
    screen.getByRole("combobox").hasAttribute("aria-activedescendant"),
  ).toBe(false);
});
