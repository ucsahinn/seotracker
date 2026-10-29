import { setLocale } from "@/shared/i18n";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuditHealthCard } from "./DashboardCards";
import type { DashboardAuditSummary } from "@/types/schemas/dashboard";

/*
 * `Link` needs a router. This suite is about what the card says, not about
 * navigation, so the anchor is enough -- and stubbing it keeps the test from
 * failing for a reason that has nothing to do with the assertion.
 */
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    search,
    ...props
  }: {
    children: React.ReactNode;
    search?: { auditId?: string; pageUrl?: string };
  }) => (
    <a
      {...props}
      data-audit-id={search?.auditId}
      data-page-url={search?.pageUrl}
    >
      {children}
    </a>
  ),
}));

const audit = (
  overrides: Partial<DashboardAuditSummary> = {},
): DashboardAuditSummary => ({
  auditId: "audit-1",
  status: "completed",
  pagesCrawled: 42,
  startedAt: "2026-09-20T10:00:00.000Z",
  topIssues: [],
  totalIssueTypes: 0,
  severityTotals: { critical: 0, warning: 0, info: 0 },
  topPages: [],
  coverage: { measured: 201, total: 201 },
  standing: {
    kind: "scored",
    score: 100,
    coverage: { measured: 201, total: 201, ratio: 1 },
    provisional: false,
    thinCategories: [],
    tier: null,
    cappedBy: null,
  },
  ...overrides,
});

const HEALTHY = /Taranan kapsamda sorun bulunamadı/i;

describe("AuditHealthCard", () => {
  it("keeps the audit identifier in navigation rather than the owner-facing summary", () => {
    const { container } = render(
      <AuditHealthCard
        projectId="p1"
        audit={audit({ startUrl: "https://example.com/" })}
      />,
    );
    expect(container.textContent).not.toContain("audit-1");
    expect(screen.getByText("Ayrıntılar").getAttribute("data-audit-id")).toBe(
      "audit-1",
    );
  });
  it("qualifies a fully measured no-findings verdict by its crawled scope", () => {
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

/*
 * Severity was an 8px coloured dot and nothing else -- no text, no
 * accessible name. The house rule already says direction is never colour
 * alone, and rank is no different: a reader who cannot separate red from
 * amber had no way to tell a critical finding from a warning.
 */
describe("severity is not carried by colour alone", () => {
  it("names each severity in text for a screen reader", () => {
    render(
      <AuditHealthCard
        projectId="p1"
        audit={audit({
          topIssues: [
            { issueType: "missing-title", severity: "critical", count: 3 },
            { issueType: "title-too-long", severity: "warning", count: 5 },
            { issueType: "deep-page", severity: "info", count: 2 },
          ],
          totalIssueTypes: 3,
        })}
      />,
    );

    expect(screen.getByText(/^Kritik:/)).toBeDefined();
    expect(screen.getByText(/^Uyarı:/)).toBeDefined();
    expect(screen.getByText(/^Bilgi:/)).toBeDefined();
  });
});

/*
 * The card answered "which issue types" and never "which pages", yet
 * opening a page is always the operator's next move. And "+ N sorun daha"
 * hid whether the rest held criticals, so a card could read calm with the
 * worst of it one line below.
 */
describe("what the card points at", () => {
  it("opens the worst page in the matching audit without dropping its URL scope", () => {
    render(
      <AuditHealthCard
        projectId="p1"
        audit={audit({
          topIssues: [
            { issueType: "missing-title", severity: "critical", count: 1 },
          ],
          totalIssueTypes: 1,
          topPages: [
            { pageUrl: "https://example.com/worst", issueCount: 7 },
            { pageUrl: "https://example.com/next", issueCount: 2 },
          ],
        })}
      />,
    );

    expect(screen.getByText("En çok sorunu olan sayfalar")).toBeDefined();
    expect(
      screen.getByText("/worst").closest("a")?.getAttribute("data-page-url"),
    ).toBe("https://example.com/worst");
    expect(
      screen.getByText("/worst").closest("a")?.getAttribute("data-audit-id"),
    ).toBe("audit-1");
    expect(screen.getByText("7 sorun")).toBeDefined();
  });

  it("totals every severity, not only the ones it lists", () => {
    render(
      <AuditHealthCard
        projectId="p1"
        audit={audit({
          topIssues: [
            { issueType: "missing-title", severity: "warning", count: 4 },
          ],
          totalIssueTypes: 9,
          severityTotals: { critical: 6, warning: 4, info: 1 },
        })}
      />,
    );

    // The listed issue is a warning; the criticals are in the overflow.
    expect(screen.getByText(/6 kritik/)).toBeDefined();
  });
});

it("does not turn a partial or capped no-findings crawl into unconditional health", () => {
  render(
    <AuditHealthCard
      projectId="p1"
      audit={audit({
        limitNote: "Tarama sınırlı",
        coverage: { measured: 10, total: 201 },
      })}
    />,
  );
  expect(screen.queryByText(HEALTHY)).toBeNull();
  expect(screen.getByText(/Ölçülmeyen kontroller var/)).toBeDefined();
});

it("uses singular English page and issue counts in real one-page audit findings", () => {
  setLocale("en");
  try {
    render(
      <AuditHealthCard
        projectId="p1"
        audit={audit({
          pagesCrawled: 1,
          totalIssueTypes: 1,
          topIssues: [
            {
              issueType: "missing_meta_description",
              count: 1,
              severity: "warning",
            },
          ],
          topPages: [{ pageUrl: "https://example.com/", issueCount: 1 }],
        })}
      />,
    );
    expect(screen.getByText("1 page")).toBeDefined();
    expect(screen.getByText("1 issue")).toBeDefined();
  } finally {
    setLocale("tr");
  }
});

// H01: unique affected pages must not read like the repeated page findings.
it("labels affected pages as distinct from finding counts", () => {
  render(
    <AuditHealthCard
      projectId="p1"
      audit={audit({ affectedPages: 20, totalIssueTypes: 11 })}
    />,
  );
  const scope = screen.getByText(
    "Etkilenen benzersiz sayfa: 20 · Kontrol türü: 11.",
  );
  expect(scope.closest("details")?.open).toBe(false);
});

// H02: ellipsis hides the actionable noindex qualifier on narrow cards.
it("allows the complete issue title to wrap while preserving its linked severity and count", () => {
  render(
    <AuditHealthCard
      projectId="p1"
      audit={audit({
        totalIssueTypes: 1,
        topIssues: [{ issueType: "noindex-page", severity: "info", count: 3 }],
      })}
    />,
  );
  const title = screen.getByText(
    "Sayfa arama sonuçlarından gizlenmiş (noindex)",
  );
  expect(title.classList.contains("truncate")).toBe(false);
  expect(title.classList.contains("whitespace-normal")).toBe(true);
  const link = title.closest("a");
  expect(link?.textContent).toContain("Bilgi:");
  expect(link?.textContent).toContain("3 sayfa");
  expect(link?.getAttribute("data-audit-id")).toBe("audit-1");
});
