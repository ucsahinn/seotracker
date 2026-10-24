import { describe, expect, it } from "vitest";
import { type AuditRow, detectAuditTransitions } from "./auditTransitions";

const audit = (id: string, status: AuditRow["status"]): AuditRow => ({
  id,
  status,
  pagesCrawled: 0,
  issues: { critical: 0, warning: 0, info: 0 },
});

describe("detectAuditTransitions", () => {
  it("reports only audits that went from running to finished", () => {
    const now = [
      audit("done", "completed"),
      audit("broke", "failed"),
      audit("still", "running"),
      audit("old", "completed"),
      audit("new", "completed"),
    ];
    const previous = new Map([
      ["done", "running"],
      ["broke", "running"],
      ["still", "running"],
      ["old", "completed"],
    ] as const);

    expect(
      detectAuditTransitions(previous, now).map((t) => [t.audit.id, t.outcome]),
    ).toEqual([
      ["done", "completed"],
      ["broke", "failed"],
    ]);
    // The first look only sets the baseline.
    expect(detectAuditTransitions(undefined, now)).toEqual([]);
  });
});
