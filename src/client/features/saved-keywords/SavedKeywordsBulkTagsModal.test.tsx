import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { SavedKeywordsBulkTagsModal } from "./SavedKeywordsBulkTagsModal";

it("UX-05 exposes the pressed state of available tags and add/remove modes", () => {
  const tag = {
    id: "tag",
    name: "SEO",
    normalizedName: "seo",
    color: null,
    keywordCount: 1,
  };
  render(
    <SavedKeywordsBulkTagsModal
      availableTags={[tag]}
      selectedCount={1}
      selectedRowTags={[tag]}
      isPending={false}
      onClose={vi.fn()}
      onApply={vi.fn()}
    />,
  );
  const toggle = screen.getByRole("button", { name: "SEO 1" });
  expect(toggle.getAttribute("aria-pressed")).toBe("false");
  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-pressed")).toBe("true");
  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-pressed")).toBe("false");
  expect(
    screen
      .getByRole("button", { name: "Etiket ekle" })
      .getAttribute("aria-pressed"),
  ).toBe("true");
  const remove = screen.getByRole("button", { name: "Etiket kaldır" });
  fireEvent.click(remove);
  expect(remove.getAttribute("aria-pressed")).toBe("true");
  expect(
    screen
      .getByRole("button", { name: "Etiket ekle" })
      .getAttribute("aria-pressed"),
  ).toBe("false");
});
