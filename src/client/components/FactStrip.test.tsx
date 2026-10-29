import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FactStrip } from "./FactStrip";

it("keeps secondary source facts in one closed disclosure", () => {
  const { container } = render(
    <FactStrip
      label="Scope"
      facts={[
        { label: "Source", value: "Search Console" },
        { label: "Period", value: "September" },
        { label: "Comparison", value: "August" },
        { label: "Fetched", value: "October", hint: "Cached" },
      ]}
      detailsLabel="Details"
      details={<p>Source caveat</p>}
    />,
  );
  expect(screen.getByText("Search Console").closest("details")).toBeNull();
  const disclosure = screen.getByText("August").closest("details");
  expect(disclosure).not.toBeNull();
  expect(disclosure?.open).toBe(false);
  expect(screen.getByText("October").closest("details")).toBe(disclosure);
  expect(screen.getByText("Cached").closest("details")).toBe(disclosure);
  expect(screen.getByText("Source caveat").closest("details")).toBe(disclosure);
  expect(container.querySelectorAll("details")).toHaveLength(1);
});

it("gives the native summary a visible decorative expand indicator", () => {
  const { container } = render(
    <FactStrip
      label="Scope"
      facts={[]}
      detailsLabel="Details"
      details="Caveat"
    />,
  );
  const summary = screen.getByText("Details");
  expect(summary.tagName).toBe("SUMMARY");
  expect(summary.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
  expect(container.querySelector("details")?.open).toBe(false);
});
