import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, it, vi } from "vitest";
import { SavedKeywordsPage } from "./SavedKeywordsPage";
import { useSavedKeywordsFilters } from "./useSavedKeywordsFilters";
import { savedWatchlistSearchSchema } from "@/shared/savedWatchlist";

vi.mock("./useSavedWatchlistPage", () => ({
  useSavedWatchlistPage: function usePageState() {
    return { ...state, filters: useSavedKeywordsFilters() };
  },
}));
vi.mock("./SavedKeywordsHeader", () => ({ SavedKeywordsHeader: () => null }));
vi.mock("./SavedKeywordsSummary", () => ({ SavedKeywordsSummary: () => null }));
vi.mock("@/client/features/integrations/googleConnectionQueries", () => ({
  gscConnectionOptions: () => ({
    queryKey: ["connection"],
    queryFn: async () => ({ connected: true }),
    initialData: { connected: true },
    staleTime: Infinity,
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

function emptyState() {
  return {
    query: {
      isPending: false,
      isFetching: false,
      isError: false,
      isPlaceholderData: false,
      refetch: vi.fn(),
    },
    inventory: { isFetching: false, refetch: vi.fn() },
    inventoryReady: false,
    data: { totalSavedMatching: 0, totalMatching: 0 },
    stale: false,
    pending: false,
    invalid: false,
    active: false,
    rows: [],
    selectedRows: [],
    availableTags: [] as {
      id: string;
      name: string;
      normalizedName: string;
      color: null;
      keywordCount: number;
    }[],
    totalCount: 0,
    tagManage: { busyTagIds: new Set() },
    exporter: {},
    positions: new Map(),
    rowSelection: {},
    sorting: [],
    clear: vi.fn(),
  };
}
let state = emptyState();
beforeEach(() => {
  state = emptyState();
});

function renderPage() {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <SavedKeywordsPage
        projectId="p"
        search={savedWatchlistSearchSchema.parse({})}
        update={vi.fn()}
      />
    </QueryClientProvider>,
  );
}

it("H06 leads a confirmed empty watchlist with the next action, without list controls", () => {
  renderPage();
  expect(screen.getByRole("link", { name: "Sorgulara göz at" })).toBeTruthy();
  expect(screen.queryByRole("textbox")).toBeNull();
  expect(screen.queryByRole("button", { name: "Filtreler" })).toBeNull();
  expect(screen.queryByText(/seçim yalnızca/)).toBeNull();
});

it("H06 retains search and clearing when an existing list is filtered to zero", () => {
  state.active = true;
  renderPage();
  expect(screen.getByRole("textbox")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Filtreler" })).toBeTruthy();
  fireEvent.click(screen.getAllByRole("button", { name: "Tümünü temizle" })[0]);
  expect(state.clear).toHaveBeenCalled();
});

it("H06 keeps tag management after the empty-state action when unused tags remain", () => {
  state.availableTags = [
    {
      id: "tag",
      name: "SEO",
      normalizedName: "seo",
      color: null,
      keywordCount: 0,
    },
  ];
  renderPage();
  const browse = screen.getByRole("link", { name: "Sorgulara göz at" });
  const tags = screen.getByRole("button", { name: "Etiketler" });
  expect(
    browse.compareDocumentPosition(tags) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(screen.queryByRole("textbox")).toBeNull();
  fireEvent.click(tags);
  expect(
    screen.getByRole("button", { name: "SEO etiketini yönet" }),
  ).toBeTruthy();
});

it.each(["isFetching", "isError", "isPlaceholderData"] as const)(
  "H06 does not confirm an empty inventory while the query is %s",
  (flag) => {
    state.query[flag] = true;
    renderPage();
    expect(screen.getByRole("textbox")).toBeTruthy();
  },
);
