import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import type { PageRow } from "./AuditResultsTableFilterLogic";
import { buildPagesColumns } from "./pagesColumns";

const listed: PageRow = {
  id: "listed",
  url: "https://example.com/",
  statusCode: 200,
  htmlBytes: 1000,
  redirectUrl: null,
  title: "Home",
  metaDescription: null,
  h1Count: 1,
  wordCount: 100,
  imagesTotal: 0,
  imagesMissingAlt: 0,
  internalLinkCount: 0,
  externalLinkCount: 0,
  isIndexable: true,
  crawlDepth: 0,
  inSitemap: true,
  fetchClass: "ok",
  responseTimeMs: 100,
};

function SitemapCells({ sitemapPartial }: { sitemapPartial: boolean }) {
  const table = useReactTable({
    data: [listed, { ...listed, id: "unlisted", inSitemap: false }],
    columns: buildPagesColumns({
      canonicalHost: "example.com",
      missingTitlePageIds: new Set(),
      issueCountByPageId: new Map(),
      onShowIssues: () => {},
      sitemapFound: true,
      sitemapPartial,
    }),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <ul>
      {table.getRowModel().rows.map((row) =>
        row
          .getVisibleCells()
          .filter((cell) => cell.column.id === "inSitemap")
          .map((cell) => (
            <li key={cell.id} data-testid={row.original.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </li>
          )),
      )}
    </ul>
  );
}

it("says a page is not in the sitemap only when the whole sitemap was read", () => {
  const { unmount } = render(<SitemapCells sitemapPartial={false} />);
  expect(screen.getByTestId("unlisted").textContent).toBe("Yok");
  unmount();

  render(<SitemapCells sitemapPartial />);
  // A list cut short cannot say a page is missing from it.
  expect(screen.getByTestId("unlisted").textContent).toBe("-");
  expect(screen.getByTestId("listed").textContent).toBe("Var");
});
