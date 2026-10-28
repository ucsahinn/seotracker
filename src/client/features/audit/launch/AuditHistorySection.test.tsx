import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuditHistorySection } from "./AuditHistorySection";
import { describeAuditFailure } from "../results/auditFailureCopy";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    search,
    className,
  }: {
    children: React.ReactNode;
    search: { auditId: string; tab: string };
    className?: string;
  }) => (
    <a
      className={className}
      href={`/audit?auditId=${search.auditId}&tab=${search.tab}`}
    >
      {children}
    </a>
  ),
}));

const audit = (id: string, startedAt: string, critical: number) => ({
  id,
  startUrl: "https://example.com",
  status: "completed" as const,
  startedAt,
  completedAt: startedAt,
  pagesCrawled: 20,
  pagesTotal: 20,
  ranLighthouse: false,
  issues: { critical, warning: 0, info: 0 },
});

function renderSection(
  history: React.ComponentProps<typeof AuditHistorySection>["history"],
) {
  render(
    <AuditHistorySection
      projectId="p1"
      history={history}
      isLoading={false}
      onDelete={vi.fn()}
      onRerun={vi.fn()}
    />,
  );
}

describe("AuditHistorySection", () => {
  it("H08 reserves readable status width for long failure recovery and completed scope text", () => {
    const failed = {
      ...audit("secret", "2026-10-25T10:00:00Z", 0),
      status: "failed" as const,
      errorCode: "missing_secret",
      pagesCrawled: 7,
    };
    renderSection([
      { ...audit("completed", "2026-10-28T10:00:00Z", 2), maxPages: 20 },
      failed,
    ]);
    const copy = describeAuditFailure(failed);
    const cause = screen.getByText(copy.cause);
    const statusCell = cause.closest("td")!;
    expect(statusCell.classList.contains("min-w-64")).toBe(true);
    expect(within(statusCell).getByText(copy.action)).toBeTruthy();
    const completedCell = screen
      .getByText("Tarama sınırı: 20 sayfa")
      .closest("td")!;
    expect(completedCell.classList.contains("min-w-64")).toBe(true);
    const region = screen.getByRole("region", { name: "Önceki denetimler" });
    expect(region.classList.contains("overflow-x-auto")).toBe(true);
    expect(region.contains(statusCell)).toBe(true);
    expect(screen.getByRole("cell", { name: "7" })).toBeTruthy();
    expect(screen.getByRole("cell", { name: "20" })).toBeTruthy();
  });
  it("F16 shows informational page findings as a separate severity", () => {
    const row = audit("info", "2026-02-01T10:00:00Z", 0);
    renderSection([{ ...row, issues: { ...row.issues, info: 13 } }]);
    expect(screen.getByRole("columnheader", { name: "Bilgi" })).toBeTruthy();
    expect(screen.getByRole("cell", { name: "13" })).toBeTruthy();
    expect(screen.getByText(/site geneli kontroller birlikte/)).toBeTruthy();
  });
  it("F17 shows the stored page limit with a scope link", () => {
    renderSection([
      { ...audit("limited", "2026-02-01T10:00:00Z", 0), maxPages: 20 },
    ]);
    expect(screen.getByText("Tarama sınırı: 20 sayfa")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Kapsam ayrıntıları" })
        .getAttribute("href"),
    ).toContain("tab=checks");
  });
  it("F18 gives an explicit unknown reason and recovery for a legacy failure", () => {
    render(
      <AuditHistorySection
        projectId="p1"
        history={[
          { ...audit("failed", "2026-02-01T10:00:00Z", 0), status: "failed" },
        ]}
        isLoading={false}
        onDelete={vi.fn()}
        onRerun={vi.fn()}
      />,
    );
    expect(screen.getByText("Nedeni belirlenemedi.")).toBeTruthy();
    expect(screen.getByText(/Denetimi yeniden başlatın/)).toBeTruthy();
  });
  it("F18 uses the recorded failure code rather than guessing from the page count", () => {
    render(
      <AuditHistorySection
        projectId="p1"
        history={[
          {
            ...audit("oom", "2026-02-01T10:00:00Z", 0),
            status: "failed",
            errorCode: "oom",
          },
        ]}
        isLoading={false}
        onDelete={vi.fn()}
        onRerun={vi.fn()}
      />,
    );
    expect(
      screen.getByText(/Denetim, uygulamanın kullanabildiği belleğe sığmadı/),
    ).toBeTruthy();
    expect(screen.getByText("Daha az sayfayla yeniden başlatın.")).toBeTruthy();
  });
  it("shows crawled pages rather than the reservation for a failed audit", () => {
    const failed = {
      ...audit("failed", "2026-02-01T10:00:00Z", 0),
      status: "failed" as const,
      pagesCrawled: 7,
      pagesTotal: 144,
    };
    render(
      <AuditHistorySection
        projectId="p1"
        history={[failed]}
        isLoading={false}
        onDelete={vi.fn()}
        onRerun={vi.fn()}
      />,
    );
    expect(screen.getByRole("cell", { name: "7" })).toBeDefined();
    expect(screen.queryByRole("cell", { name: "144" })).toBeNull();
  });
  it("links the date to the pages tab and shows the change since the previous audit", () => {
    renderSection([
      audit("new", "2026-02-01T10:00:00Z", 2),
      audit("old", "2026-01-01T10:00:00Z", 4),
    ]);

    const hrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/audit?auditId=new&tab=pages");
    // One visible "Görüntüle" per audit, not only the hover-revealed menu.
    expect(screen.getAllByRole("link", { name: "Görüntüle" })).toHaveLength(2);
    // 4 -> 2 is a 50% drop, announced as text and not only as colour.
    expect(screen.getByText("azaldı")).toBeTruthy();
  });

  it("shows the absolute change when the percentage would round to zero", () => {
    renderSection([
      audit("new", "2026-02-01T10:00:00Z", 10001),
      audit("old", "2026-01-01T10:00:00Z", 10000),
    ]);

    expect(screen.getByText("arttı").parentElement?.textContent).not.toContain(
      "%",
    );
  });

  it("explains the empty state without a second primary action", () => {
    renderSection([]);

    expect(screen.getByText(/Henüz denetim yapılmadı/)).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Site adresini gir" }),
    ).toBeNull();
  });
});
