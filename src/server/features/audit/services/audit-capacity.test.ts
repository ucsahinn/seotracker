import { describe, expect, it } from "vitest";
import {
  AUDIT_LIMITS,
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
