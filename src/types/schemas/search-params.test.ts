import { describe, expect, it } from "vitest";
import { booleanSearchParamSchema } from "@/types/schemas/search-params";

describe("booleanSearchParamSchema", () => {
  // The router hands a cold load the raw string and an in-app navigation the
  // already-parsed boolean, so both have to land on the same value.
  it("accepts both the string and the boolean form", () => {
    expect(booleanSearchParamSchema.parse("true")).toBe(true);
    expect(booleanSearchParamSchema.parse("false")).toBe(false);
    expect(booleanSearchParamSchema.parse(true)).toBe(true);
    expect(booleanSearchParamSchema.parse(false)).toBe(false);
  });

  it("rejects anything else", () => {
    expect(booleanSearchParamSchema.safeParse("yes").success).toBe(false);
    expect(booleanSearchParamSchema.safeParse(1).success).toBe(false);
  });
});
