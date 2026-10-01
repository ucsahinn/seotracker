import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReportTemplatesList } from "@/client/features/reports/ReportTemplatesList";
import { isInteractiveTarget } from "@/client/features/reports/reportStats";
import type { ReportTemplate } from "@/types/schemas/report-templates";

describe("isInteractiveTarget", () => {
  it("lets a link or button inside a row keep precedence over the row", () => {
    const row = document.createElement("tr");
    row.innerHTML = '<td><a href="#"><span>t</span></a></td><td>düz</td>';
    expect(isInteractiveTarget(row.querySelector("span"))).toBe(true);
    expect(isInteractiveTarget(row.querySelectorAll("td")[1] ?? null)).toBe(
      false,
    );
    expect(isInteractiveTarget(null)).toBe(false);
  });
});

describe("ReportTemplatesList", () => {
  it("opens the editor from the template name", () => {
    const template: ReportTemplate = {
      id: "t1",
      projectId: "p1",
      name: "Aylık",
      description: "d",
      instructions: "i",
      createdBy: "x",
      createdByUserId: "u",
      createdAt: "2026-09-29T12:00:00Z",
      updatedAt: "2026-09-29T12:00:00Z",
    };
    const onEdit = vi.fn();
    render(
      <ReportTemplatesList
        templates={[template]}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Aylık" }));
    expect(onEdit).toHaveBeenCalledWith(template);
  });
});
