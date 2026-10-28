import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ProjectMarketFields } from "./ProjectMarketFields";

it("explains why a country's single language cannot be changed", () => {
  render(
    <ProjectMarketFields
      value={{ locationCode: 2792, languageCode: "tr" }}
      onChange={() => {}}
    />,
  );
  expect(screen.getByRole("combobox", { name: /Dil/ })).toHaveProperty(
    "disabled",
    true,
  );
  expect(screen.getByText(/Dil, seçilen ülkeye göre belirlenir/)).toBeDefined();
});
