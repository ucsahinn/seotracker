import { describe, expect, it } from "vitest";
import { getReadinessScore } from "./readinessScore";

describe("getReadinessScore", () => {
  it("starts at zero and counts each completed setup area once", () => {
    expect(
      getReadinessScore({
        gscConnected: false,
        ga4Connected: false,
        auditCompleted: false,
        auditFresh: false,
        hasProjectContext: false,
        agentConnected: false,
      }),
    ).toEqual({ score: 0, completed: 0, total: 6 });
  });

  it("reaches 100 only when all six data and setup signals are ready", () => {
    expect(
      getReadinessScore({
        gscConnected: true,
        ga4Connected: true,
        auditCompleted: true,
        auditFresh: true,
        hasProjectContext: true,
        agentConnected: true,
      }),
    ).toEqual({ score: 100, completed: 6, total: 6 });
  });

  it("increases as the operator connects a real source", () => {
    const base = getReadinessScore({
      gscConnected: true,
      ga4Connected: false,
      auditCompleted: true,
      auditFresh: false,
      hasProjectContext: false,
      agentConnected: false,
    });
    const withAnalytics = getReadinessScore({
      gscConnected: true,
      ga4Connected: true,
      auditCompleted: true,
      auditFresh: false,
      hasProjectContext: false,
      agentConnected: false,
    });
    expect(withAnalytics.score).toBeGreaterThan(base.score);
    expect(withAnalytics.completed).toBe(base.completed + 1);
  });
});
