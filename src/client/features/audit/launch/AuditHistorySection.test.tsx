import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuditHistorySection } from "./AuditHistorySection";

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
  history: ReturnType<typeof audit>[],
  onStartFirst = vi.fn(),
) {
  render(
    <AuditHistorySection
      projectId="p1"
      history={history}
      isLoading={false}
      onDelete={vi.fn()}
      onRerun={vi.fn()}
      onStartFirst={onStartFirst}
    />,
  );
  return onStartFirst;
}

describe("AuditHistorySection", () => {
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
      audit("new", "2026-02-01T10:00:00Z", 1001),
      audit("old", "2026-01-01T10:00:00Z", 1000),
    ]);

    expect(screen.getByText("arttı").parentElement?.textContent).not.toContain(
      "%",
    );
  });

  it("explains the empty state and offers the next step", () => {
    const onStartFirst = renderSection([]);

    expect(screen.getByText(/yukarıdaki formdan başlatın/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Site adresini gir" }));
    expect(onStartFirst).toHaveBeenCalledOnce();
  });
});
