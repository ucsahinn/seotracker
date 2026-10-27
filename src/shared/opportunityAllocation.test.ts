import { describe, expect, it } from "vitest";
import { allocateGain } from "./opportunityAllocation";

describe("capped opportunity allocation", () => {
  it("conserves the cap when independent rounding would invent a click", () => {
    expect(allocateGain([1, 1, 1], 2)).toEqual([1, 1, 0]);
  });
  it("conserves monthly scaling, keeping zero contributions zero", () => {
    expect(allocateGain([1, 0, 2], 7)).toEqual([2, 0, 5]);
    expect(allocateGain([0, 0], 0)).toEqual([0, 0]);
  });
});
