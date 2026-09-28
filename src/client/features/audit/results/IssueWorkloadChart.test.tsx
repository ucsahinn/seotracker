import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IssueWorkloadChart } from "./IssueWorkloadChart";
import type { IssueSeverity } from "@/shared/audit-issues";

function group(
  title: string,
  severity: IssueSeverity,
  pageCount: number,
): {
  issueType: string;
  title: string;
  severity: IssueSeverity;
  pageCount: number;
} {
  return { issueType: title, title, severity, pageCount };
}

describe("IssueWorkloadChart", () => {
  /*
   * The input arrives severity-ordered, because that is what the list below
   * the chart needs. Drawing it in that order made a two-page critical the
   * first bar and the summary called it the biggest, while a 53-page warning
   * sat underneath it.
   */
  it("leads with the issue affecting the most pages, not the most severe", () => {
    render(
      <IssueWorkloadChart
        groups={[
          group("Sayfa noindex", "critical", 2),
          group("Meta açıklama çok uzun", "warning", 53),
          group("Sunucu yanıtı yavaş", "info", 3),
        ]}
      />,
    );

    const summary = screen.getByRole("img").getAttribute("aria-label");

    expect(summary).toContain("Meta açıklama çok uzun");
    expect(summary).toContain("53");
  });

  it("says nothing when there is not enough to compare", () => {
    const { container } = render(
      <IssueWorkloadChart
        groups={[
          group("Sayfa noindex", "critical", 2),
          group("Meta açıklama çok uzun", "warning", 53),
        ]}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
