// @vitest-environment happy-dom
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { GoogleAccessEvidence } from "./GoogleAccessEvidence";
afterEach(cleanup);
// Previously a saved binding had no identity-qualified observation to display.
it("distinguishes no history from a timestamped rejected read without echoing an upstream reason", () => {
  const view = render(<GoogleAccessEvidence />);
  expect(screen.getByText("Veri erişimi henüz doğrulanmadı.")).toBeTruthy();
  view.rerender(
    <GoogleAccessEvidence
      evidence={{
        observedAt: "2026-10-27T10:00:00Z",
        reason: "permission_denied",
      }}
    />,
  );
  expect(screen.getByText(/Son başarısız Google okuması/)).toBeTruthy();
  expect(screen.getByText(/Google bu mülke erişimi reddetti/)).toBeTruthy();
  expect(
    screen.getByText(/Google bu mülke erişimi reddetti/).closest("details")
      ?.open,
  ).toBe(false);
});
