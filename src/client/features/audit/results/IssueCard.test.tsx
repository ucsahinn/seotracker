import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IssueCard } from "./IssueCard";
import { groupIssues, type AuditIssueRow } from "./issueGroups";

function rows(count: number, pageId: string | null = "p"): AuditIssueRow[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `i-${index}`,
    auditId: "a",
    pageId: pageId === null ? null : `${pageId}-${index}`,
    pageUrl: `https://example.com/sayfa-${index}`,
    issueType: "missing-title",
    severity: "critical",
    detailsJson: index === 0 ? JSON.stringify({ statusCode: 200 }) : null,
  }));
}

function renderCard(issues: AuditIssueRow[]) {
  const [group] = groupIssues(issues);
  if (!group) throw new Error("no group");
  render(<IssueCard group={group} defaultOpen onShowPages={() => {}} />);
}

describe("IssueCard affected pages", () => {
  it("lists the pages as links with their evidence, ten at a time", () => {
    renderCard(rows(25));

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("link")).toHaveLength(10);
    expect(screen.getByText("Durum kodu:")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "25 sayfa içinden 10",
    );

    fireEvent.click(screen.getByRole("button", { name: /Daha fazla göster/ }));
    expect(within(screen.getByRole("list")).getAllByRole("link")).toHaveLength(
      20,
    );
  });

  it("offers a search box past twenty pages and filters by it", () => {
    renderCard(rows(25));

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "sayfa-24" },
    });

    expect(within(screen.getByRole("list")).getAllByRole("link")).toHaveLength(
      1,
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "zzz" },
    });
    expect(screen.getByText("Aramayla eşleşen adres yok.")).toBeTruthy();
  });

  it("has no search box for a short list, and keeps the actions", () => {
    renderCard(rows(3));

    expect(screen.queryByRole("searchbox")).toBeNull();
    expect(
      screen.getByRole("button", { name: /URL'leri kopyala/ }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /CSV indir/ })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Sayfalar sekmesinde göster/ }),
    ).toBeTruthy();
  });

  it("says Tüm site for a site-wide finding and drops the Sayfalar button", () => {
    renderCard(rows(1, null));

    expect(screen.getByText("Tüm site")).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /Sayfalar sekmesinde göster/ }),
    ).toBeNull();
  });
});
