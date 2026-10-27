import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { useSearchView } from "./useSearchView";
import { getSearchPerformanceView } from "@/serverFunctions/searchPerformance";

vi.mock("@/serverFunctions/searchPerformance", () => ({
  getSearchPerformanceView: vi.fn(),
}));
beforeEach(() => {
  vi.mocked(getSearchPerformanceView).mockResolvedValue({ connected: false });
});
const filters = { dateRange: "last_28_days", searchType: "web" } as const;
const first = { startDate: "2026-09-01", endDate: "2026-09-07" };
function wrapper({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 } },
      }),
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

it("pins refresh to the displayed dates instead of resolving the preset again", async () => {
  const { result } = renderHook(() => useSearchView("p", filters, first), {
    wrapper,
  });
  await waitFor(() => expect(result.current.viewQuery.isSuccess).toBe(true));
  await act(() => result.current.refresh.mutateAsync());
  expect(getSearchPerformanceView).toHaveBeenLastCalledWith({
    data: { projectId: "p", ...filters, window: first, fresh: true },
  });
});

it("does not present the previous period as placeholder evidence after an exact date change", async () => {
  const { result, rerender } = renderHook(
    ({ window }) => useSearchView("p", filters, window),
    { wrapper, initialProps: { window: first } },
  );
  await waitFor(() => expect(result.current.viewQuery.isSuccess).toBe(true));
  vi.mocked(getSearchPerformanceView).mockImplementation(
    () => new Promise(() => {}),
  );
  rerender({ window: { startDate: "2026-09-08", endDate: "2026-09-14" } });
  expect(result.current.viewQuery.data).toBeUndefined();
  expect(result.current.viewQuery.isPlaceholderData).toBe(false);
});
