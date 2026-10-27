// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { GooglePropertyRecovery } from "./GooglePropertyRecovery";
afterEach(cleanup);
// Previously deterministic configuration failures offered only a retry.
it("offers setup for permission failures and retry for temporary failures", () => {
  const view = render(
    <GooglePropertyRecovery reason="permission_denied" onRetry={vi.fn()} />,
  );
  expect(
    screen
      .getByRole("link", { name: "Kurulumun Google kimlik ayarları" })
      .getAttribute("href"),
  ).toBe("/settings#google");
  expect(screen.queryByRole("button")).toBeNull();
  view.rerender(<GooglePropertyRecovery reason="timeout" onRetry={vi.fn()} />);
  expect(screen.getByRole("button", { name: "Tekrar dene" })).toBeTruthy();
});
