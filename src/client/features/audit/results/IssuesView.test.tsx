import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IssuesView } from "./IssuesView";
import { groupIssues, type AuditIssueRow } from "./issueGroups";

let next = 0;
function issue(issueType: string, pageUrl: string): AuditIssueRow {
  next += 1;
  return {
    id: `issue-${next}`,
    auditId: "audit-1",
    pageId: `page-${next}`,
    pageUrl,
    issueType,
    severity: "info",
    detailsJson: null,
  };
}

// server-error is critical and images-missing-alt is a warning in the registry.
const issues = [
  issue("server-error", "https://example.com/a"),
  issue("server-error", "https://example.com/b"),
  issue("images-missing-alt", "https://example.com/c"),
];

describe("groupIssues", () => {
  it("counts distinct pages, so eight rows on one page are one page", () => {
    const rows = Array.from({ length: 8 }, () =>
      issue("server-error", "https://example.com/a"),
    );

    const [group] = groupIssues(rows);

    expect(group?.pageCount).toBe(1);
    expect(group?.issues).toHaveLength(8);
    expect(group?.pageUrls).toEqual(["https://example.com/a"]);
  });
});

describe("IssuesView", () => {
  it("narrows the list to the severity chosen on the ring", () => {
    render(
      <IssuesView
        issues={issues}
        onClearFocus={() => {}}
        onShowPages={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /^Uyarı/ }));

    // One row is left, and the clear chip names what is showing.
    expect(screen.getAllByRole("button", { expanded: false })).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Uyarı seçimini kaldır" }));
  });

  it("opens a problem into its fix and hands its pages to the Sayfalar tab", () => {
    const onShowPages = vi.fn();
    render(
      <IssuesView
        issues={issues}
        onClearFocus={() => {}}
        onShowPages={onShowPages}
      />,
    );

    // Closed cards stay mounted (hidden and inert) so they can ease open,
    // so the fix is looked for inside the card that was opened.
    const row = screen.getAllByRole("button", { expanded: false })[0];
    fireEvent.click(row);
    const card = row.parentElement;
    if (!card) throw new Error("issue row has no card");
    expect(within(card).getByText(/Nasıl düzeltilir\?/)).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: /Sayfalar sekmesinde göster/ }),
    );

    expect(onShowPages).toHaveBeenCalledWith(
      ["https://example.com/a", "https://example.com/b"],
      expect.any(String),
    );
  });
});

describe("IssuesView severity in the URL", () => {
  it("reports a cleared severity so the address bar stops carrying it", () => {
    const onSeverityChange = vi.fn();
    render(
      <IssuesView
        issues={issues}
        initialSeverity="critical"
        onSeverityChange={onSeverityChange}
        onClearFocus={() => {}}
        onShowPages={() => {}}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Kritik seçimini kaldır" }),
    );

    expect(onSeverityChange).toHaveBeenCalledWith(null);
  });
});
