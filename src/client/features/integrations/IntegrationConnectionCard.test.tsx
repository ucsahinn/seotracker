import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { IntegrationConnectionCard } from "./IntegrationConnectionCard";
it("restores focus to the change action after returning from a property picker", () => {
  const { rerender } = render(
    <IntegrationConnectionCard
      title="Google"
      status="connected"
      managingProperty
    >
      <button>Cancel picker</button>
    </IntegrationConnectionCard>,
  );
  rerender(
    <IntegrationConnectionCard
      title="Google"
      status="connected"
      managingProperty={false}
    >
      <button data-google-change>Change property</button>
    </IntegrationConnectionCard>,
  );
  expect(screen.getByRole("button", { name: "Change property" })).toBe(
    document.activeElement,
  );
});
