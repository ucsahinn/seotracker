import { fireEvent, render, screen } from "@testing-library/react";
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

// missing-title is critical and images-missing-alt is a warning in the registry.
const issues = [
  issue("missing-title", "https://example.com/a"),
  issue("missing-title", "https://example.com/b"),
  issue("images-missing-alt", "https://example.com/c"),
];

describe("groupIssues", () => {
  it("counts distinct pages, so eight rows on one page are one page", () => {
    const rows = Array.from({ length: 8 }, () =>
      issue("missing-title", "https://example.com/a"),
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

    fireEvent.click(screen.getAllByRole("button", { expanded: false })[0]);
    expect(screen.getByText(/Nasıl düzeltilir\?/)).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: /Sayfalar sekmesinde göster/ }),
    );

    expect(onShowPages).toHaveBeenCalledWith(
      ["https://example.com/a", "https://example.com/b"],
      expect.any(String),
    );
  });
});
