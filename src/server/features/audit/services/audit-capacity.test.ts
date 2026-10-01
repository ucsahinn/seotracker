import { describe, expect, it } from "vitest";
import {
  AUDIT_LIMITS,
  clampAuditMaxPages,
  getEstimatedAuditCapacity,
} from "@/server/features/audit/services/audit-capacity";

describe("getEstimatedAuditCapacity", () => {
  it("counts two Lighthouse checks per page, and none when it is off", () => {
    expect(
      getEstimatedAuditCapacity({ maxPages: 200, lighthouseStrategy: "auto" }),
    ).toEqual({ pagesTotal: 200, lighthouseTotal: 400, total: 600 });
    expect(
      getEstimatedAuditCapacity({ maxPages: 200, lighthouseStrategy: "none" })
        .lighthouseTotal,
    ).toBe(0);
  });

  it("lets one maximum-size audit through the capacity ceiling", () => {
    const { total } = getEstimatedAuditCapacity({ maxPages: 10_000 });

    expect(total).toBeLessThanOrEqual(AUDIT_LIMITS.maxCapacityUnits);
  });
});

describe("getEstimatedAuditCapacity without a PageSpeed key", () => {
  it("reserves only the unkeyed page cap, not two checks per crawled page", () => {
    expect(
      getEstimatedAuditCapacity({ maxPages: 10_000, hasPageSpeedKey: false }),
    ).toEqual({ pagesTotal: 10_000, lighthouseTotal: 100, total: 10_100 });
    expect(
      getEstimatedAuditCapacity({ maxPages: 20, hasPageSpeedKey: false })
        .lighthouseTotal,
    ).toBe(40);
  });
});

describe("clampAuditMaxPages", () => {
  it.each([
    [0, 10],
    [-5, 10],
    [Number.NaN, 50],
    [Number.POSITIVE_INFINITY, 50],
    [1e9, 10_000],
    [undefined, 50],
  ])("turns %s into %s", (input, expected) => {
    expect(clampAuditMaxPages(input)).toBe(expected);
  });
});
