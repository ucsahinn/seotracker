import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { GrowingTextarea } from "./GrowingTextarea";
it("C26 grows to the full saved note and resizes edited drafts", () => {
  // The JS fallback runs only where CSS field-sizing is missing.
  vi.stubGlobal("CSS", { supports: () => false });
  const height = vi
    .spyOn(HTMLTextAreaElement.prototype, "scrollHeight", "get")
    .mockReturnValue(480);
  const { rerender } = render(
    <GrowingTextarea
      aria-label="Notes"
      value={"Long saved note"}
      onChange={() => {}}
    />,
  );
  const field = screen.getByRole("textbox");
  expect(field.style.height).toBe("480px");
  height.mockReturnValue(720);
  rerender(
    <GrowingTextarea
      aria-label="Notes"
      value={"Longer draft"}
      onChange={() => {}}
    />,
  );
  expect(field.style.height).toBe("720px");
  height.mockReturnValue(600);
  fireEvent(window, new Event("resize"));
  expect(field.style.height).toBe("600px");
});
