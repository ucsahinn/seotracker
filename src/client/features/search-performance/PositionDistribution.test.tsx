import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { setLocale } from "@/shared/i18n";
import { searchViewFixture } from "@/shared/search-view-test-fixtures";
import { PositionDistribution } from "./PositionDistribution";

afterEach(() => setLocale("tr"));

describe("PositionDistribution", () => {
  // The fixture holds one query, at position 8.
  it("picks the singular for one query", () => {
    setLocale("en");
    render(<PositionDistribution view={searchViewFixture()} />);
    expect(screen.getByText("1 query")).toBeTruthy();
  });

  it("says the weekly split is web-only instead of waiting for the archive", () => {
    const view = searchViewFixture();
    render(
      <PositionDistribution
        view={{ ...view, filters: { ...view.filters, searchType: "image" } }}
      />,
    );
    expect(
      screen.getByText("Haftalık dağılım yalnızca Web aramaları için."),
    ).toBeTruthy();
  });
});
