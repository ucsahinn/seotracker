import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuditHealthCard } from "./DashboardCards";
import type { DashboardAuditSummary } from "@/server/features/dashboard/services/DashboardService";

/*
 * `Link` needs a router. This suite is about what the card says, not about
 * navigation, so the anchor is enough -- and stubbing it keeps the test from
 * failing for a reason that has nothing to do with the assertion.
 */
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, ...props }: { children: React.ReactNode }) => (
    <a {...props}>{children}</a>
  ),
}));

const audit = (
  overrides: Partial<DashboardAuditSummary> = {},
): DashboardAuditSummary => ({
  status: "completed",
  pagesCrawled: 42,
  startedAt: "2026-09-20T10:00:00.000Z",
  topIssues: [],
  totalIssueTypes: 0,
  ...overrides,
});

const HEALTHY = /siteniz sağlıklı görünüyor/i;

describe("AuditHealthCard", () => {
  it("calls a finished audit with no issues healthy", () => {
    render(<AuditHealthCard projectId="p1" audit={audit()} />);

    expect(screen.getByText(HEALTHY)).toBeDefined();
  });

  /*
   * The bug this file exists for. The body branched on `topIssues.length`
   * alone, so a crawl that had not looked yet, and one that failed at
   * discovery and never looked at all, both got the green check -- the
   * second of them directly under a stamp reading "başarısız".
   */
  it("does not call a running crawl healthy, because it has not looked yet", () => {
    render(
      <AuditHealthCard projectId="p1" audit={audit({ status: "running" })} />,
    );

    expect(screen.queryByText(HEALTHY)).toBeNull();
    // The stamp says the same words, so match the body's own sentence.
    expect(screen.getByText(/sonuçlar bittiğinde görünecek/i)).toBeDefined();
  });

  it("does not call a failed crawl healthy either", () => {
    render(
      <AuditHealthCard projectId="p1" audit={audit({ status: "failed" })} />,
    );

    expect(screen.queryByText(HEALTHY)).toBeNull();
    expect(screen.getByText(/tamamlanamadı/i)).toBeDefined();
  });

  /*
   * `audit === null` is how both "never audited" and a failed overview
   * arrive, so the card must not claim more than it knows. What it may say
   * is the pitch; what it may not is a verdict about the site.
   */
  it("pitches a first audit when there is none, without judging the site", () => {
    render(<AuditHealthCard projectId="p1" audit={null} />);

    expect(screen.queryByText(HEALTHY)).toBeNull();
    expect(screen.getByText(/tarayın/i)).toBeDefined();
  });
});
