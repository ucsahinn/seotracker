import { expect, it } from "vitest";
import { shouldMarkLatest } from "./release-latest-policy.mjs";

it("promotes the documented Alpha reset without allowing retired releases to replace it", () => {
  expect(shouldMarkLatest("0.5.0", "v2.4.3")).toBe(true);
  expect(shouldMarkLatest("2.4.3", "v0.5.0")).toBe(false);
  expect(shouldMarkLatest("0.5.0", "v2.4.4")).toBe(false);
});
it("preserves ordinary version ordering before and after the reset", () => {
  expect(shouldMarkLatest("0.5.0", "")).toBe(true);
  expect(shouldMarkLatest("0.5.1", "v0.5.0")).toBe(true);
  expect(shouldMarkLatest("0.4.3", "v0.5.0")).toBe(false);
  expect(shouldMarkLatest("1.0.0", "v0.5.0")).toBe(true);
  expect(shouldMarkLatest("0.5.0", "v1.0.0")).toBe(false);
});
