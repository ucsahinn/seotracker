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

it("labels mobile position and unknown comparison while retaining the accessible desktop explanation", () => {
  setLocale("en");
  render(<Table delta={null} />);
  const row = screen
    .getByRole("button", { name: "vaultpilot.io" })
    .closest("tr")!;
  expect(
    within(row).getByText("Average position:").classList.contains("sm:hidden"),
  ).toBe(true);
  expect(within(row).getByText("16.5")).toBeDefined();
  expect(within(row).getByText("Change:").classList.contains("sm:hidden")).toBe(
    true,
  );
  expect(
    within(row).getByText("No comparison").classList.contains("sm:hidden"),
  ).toBe(true);
  expect(within(row).getByText("No data in the previous period")).toBeDefined();
});

it.each([0, 2])(
  "keeps measured position change visible for delta %i",
  (delta) => {
    render(<Table delta={delta} />);
    const row = screen
      .getByRole("button", { name: "vaultpilot.io" })
      .closest("tr")!;
    expect(within(row).getByText("Değişim:")).toBeDefined();
    expect(within(row).queryByText("Karşılaştırma yok")).toBeNull();
    expect(
      within(row).getByText(delta === 0 ? "Değişmedi" : "2,0 sıra yükseldi"),
    ).toBeDefined();
  },
);
