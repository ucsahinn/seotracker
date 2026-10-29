import { render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { setLocale } from "@/shared/i18n";
import { useLocalSort } from "@/client/components/table/useLocalSort";
import type { SortKey } from "./rankingsSort";
import { TrackedQueriesTable } from "./TrackedQueriesTable";

vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
// Row saving is external to the displayed ranking metrics.
vi.mock("./useSaveTrackedKeyword", () => ({
  useSaveTrackedKeyword: () => ({ mutate: vi.fn() }),
}));

afterEach(() => setLocale("tr"));

function Table({ delta }: { delta: number | null }) {
  const sorting = useLocalSort<SortKey>({ key: "position", desc: false });
  return (
    <TrackedQueriesTable
      projectId="project"
      rows={[
        {
          query: "vaultpilot.io",
          position: 16.5,
          impressions: 37,
          clicks: 0,
          days: 14,
          previousPosition: delta === null ? null : 16.5 + delta,
          delta,
        },
      ]}
      sorting={sorting}
      tracked={{
        isLoading: false,
        isPending: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      }}
      selected={null}
      onSelect={vi.fn()}
      emptyTitle=""
      emptyDescription=""
    />
  );
}

/*
 * Phones get a stacked record per query (its numbers under labels); the
 * desktop row keeps the table. When no query has a previous reading the
 * change column is dropped and one line above the list says why, instead of
 * a dash on every row.
 */
it("states a missing comparison once instead of on every row", () => {
  setLocale("en");
  render(<Table delta={null} />);
  expect(
    screen.getByText(
      "Change column hidden: none of these queries has data in the previous period.",
    ),
  ).toBeDefined();
  expect(screen.queryByRole("columnheader", { name: /Change/ })).toBeNull();
  expect(screen.queryByText("No comparison")).toBeNull();
  const row = screen
    .getByRole("button", { name: "vaultpilot.io" })
    .closest("tr")!;
  expect(within(row).getByText("16.5")).toBeDefined();
  expect(within(row).getByText("11-20")).toBeDefined();
});

it.each([0, 2])(
  "keeps measured position change visible for delta %i",
  (delta) => {
    render(<Table delta={delta} />);
    const text = delta === 0 ? "Değişmedi" : "2,0 sıra yükseldi";
    const row = screen
      .getByRole("button", { name: "vaultpilot.io" })
      .closest("tr")!;
    expect(within(row).getByText(text)).toBeDefined();
    const item = screen
      .getByRole("button", { name: /^vaultpilot\.io .*Değişim/ })
      .closest("li")!;
    expect(within(item).getByText("Değişim")).toBeDefined();
    expect(within(item).getByText(text)).toBeDefined();
    expect(screen.queryByText("Karşılaştırma yok")).toBeNull();
  },
);
