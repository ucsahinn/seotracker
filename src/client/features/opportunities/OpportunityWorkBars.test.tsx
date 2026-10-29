import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { OpportunityWorkBars } from "./OpportunityWorkBars";
it("shows candidate counts without gain tracks when gain is unavailable", () => {
  const empty = { pages: 0, gain: 0, gainPerMonth: 0 };
  const { container } = render(
    <OpportunityWorkBars
      byWork={{
        snippet: { ...empty, pages: 2 },
        page1: empty,
        page2: empty,
        deep: empty,
      }}
      gainKnown={false}
      selected={null}
      onSelect={() => {}}
    />,
  );
  expect(screen.getByText("İş türüne göre sayfalar")).toBeDefined();
  expect(screen.getAllByText("Aday sayfa yok")).toHaveLength(3);
  expect(container.querySelector("[aria-hidden]")).toBeNull();
  expect(screen.queryByText("tıklama/ay")).toBeNull();
});
