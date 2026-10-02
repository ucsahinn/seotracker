import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TabPanel, Tabs } from "./Tabs";

const ITEMS = [
  { id: "a", label: "A" },
  { id: "b", label: "B" },
] as const;

describe("Tabs", () => {
  it("points aria-controls only at the panel that is rendered", () => {
    render(
      <>
        <Tabs group="g" items={ITEMS} value="a" onChange={() => undefined} />
        <TabPanel group="g" value="a">
          panel a
        </TabPanel>
      </>,
    );
    const [tabA, tabB] = screen.getAllByRole("tab");
    const panel = screen.getByRole("tabpanel");
    expect(tabA?.getAttribute("aria-controls")).toBe(panel.id);
    expect(tabB?.hasAttribute("aria-controls")).toBe(false);
    expect(panel.getAttribute("aria-labelledby")).toBe(tabA?.id);
  });
});
