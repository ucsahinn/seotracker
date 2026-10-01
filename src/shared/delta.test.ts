import { describe, expect, it } from "vitest";
import { fractionalChange } from "./delta";

describe("fractionalChange", () => {
  it("is the change relative to the previous value", () => {
    expect(fractionalChange(150, 100)).toBe(0.5);
    expect(fractionalChange(50, 100)).toBe(-0.5);
  });

  it("has no answer without a positive base", () => {
    expect(fractionalChange(10, 0)).toBeNull();
    expect(fractionalChange(10, -5)).toBeNull();
  });
});
