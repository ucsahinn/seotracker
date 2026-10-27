import { expect, it } from "vitest";
import { sourceOutcome } from "@/shared/searchSourceOutcome";

it("keeps unavailable, valid empty and capped responses distinct (null previously lost the failure)", () => {
  expect(sourceOutcome(null)).toEqual({
    status: "unavailable",
    reason: "request-failed",
  });
  expect(sourceOutcome({ rows: [], truncated: false })).toEqual({
    status: "empty",
    reason: null,
  });
  expect(sourceOutcome({ rows: [], truncated: true })).toEqual({
    status: "partial",
    reason: "row-limit",
  });
  expect(sourceOutcome({ rows: [{}], truncated: false })).toEqual({
    status: "available",
    reason: null,
  });
});
