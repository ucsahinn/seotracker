import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OpportunitiesTable } from "./OpportunitiesTable";
import { makeRow } from "./opportunity-test-fixtures";

/*
 * `Link` needs a router, and this suite is about what the table lets you do
 * with the rows, not about navigation. Rendering the anchor is enough, and
 * it keeps the href assertable.
 */
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    ...rest
  }: {
    children: React.ReactNode;
    to: string;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

const row = (page: string, gainPerMonth: number, impressions: number) =>
  makeRow({ page, gainPerMonth, impressions });

/*
 * This table used to be a raw `<table>`: no sortable headers, no way into a
 * row, no export -- on the one screen whose entire job is to rank pages.
 * Its nearest neighbour, the striking-distance table, has had all three
 * since it existed.
 *
 * Covered here rather than in the browser because this property has no
 * Search Console data, so the live screen renders its empty state.
 */
describe("OpportunitiesTable", () => {
  const rows = [
    row("https://example.com/high-gain", 90, 10),
    row("https://example.com/many-impressions", 10, 9_999),
  ];

  it("opens on the estimated gain, because that is what the screen ranks by", () => {
    render(<OpportunitiesTable projectId="p1" days={28} rows={rows} />);

    const cells = screen.getAllByRole("row").slice(1);
    expect(cells[0].textContent).toContain("/high-gain");
  });

  it("re-sorts on a column the operator picks", () => {
    render(<OpportunitiesTable projectId="p1" days={28} rows={rows} />);

    fireEvent.click(screen.getByRole("button", { name: /Gösterim/ }));

    const cells = screen.getAllByRole("row").slice(1);
    expect(cells[0].textContent).toContain("/many-impressions");
  });

  it("gives every row a copy and an open-in-new-tab shortcut", () => {
    render(<OpportunitiesTable projectId="p1" days={28} rows={rows} />);

    expect(screen.getAllByLabelText("Adresi kopyala").length).toBe(rows.length);
    expect(screen.getAllByLabelText("Sayfayı yeni sekmede aç").length).toBe(
      rows.length,
    );
  });

  it("opens the detail on a row click and closes it on Escape", () => {
    render(<OpportunitiesTable projectId="p1" days={28} rows={rows} />);

    fireEvent.click(screen.getAllByRole("row")[1]);

    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).toContain("Ne yapmalı?");
    expect(dialog.textContent).toContain("+90 tıklama / 30 gün");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("lists the queries behind the estimate and the work for that kind", () => {
    render(
      <OpportunitiesTable
        projectId="p1"
        days={28}
        rows={[
          makeRow({
            page: "https://example.com/a",
            work: "snippet",
            queries: [
              {
                query: "nevresim nasıl yıkanır",
                clicks: 10,
                impressions: 1000,
                ctr: 0.01,
                position: 2.4,
                work: "snippet",
                targetCtr: 0.12,
                gain: 110,
                gainPerMonth: 118,
              },
            ],
          }),
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "example.com/a" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).toContain("nevresim nasıl yıkanır");
    // The query's allocated share of the page gain, per month.
    expect(dialog.textContent).toContain("+118");
    expect(dialog.textContent).toContain("Meta açıklamayı");
  });

  /*
   * The menu now mounts through a portal and only while open, so this opens
   * it -- which is also closer to what an operator does. The count in the
   * label is the point: an export that silently wrote a different number of
   * rows than the screen showed is the bug it guards.
   */
  it("can hand the list to a spreadsheet, and says how many rows", () => {
    render(<OpportunitiesTable projectId="p1" days={28} rows={rows} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Dışa aktarma seçenekleri" }),
    );

    expect(screen.getByText(/CSV \(2 satır\)/)).toBeDefined();
  });
});
