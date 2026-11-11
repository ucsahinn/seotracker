import { act, renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { expect, it, vi } from "vitest";
import { useDashboardRefresh } from "./useDashboardRefresh";
import { dashboardSearchViewQuery } from "./dashboardGscReport";

const getView = vi.hoisted(() =>
  vi.fn<(input: { data: { fresh?: boolean } }) => Promise<unknown>>(),
);
vi.mock("@/serverFunctions/searchPerformance", () => ({
  getSearchPerformanceView: getView,
}));

it("refreshes setup and global credential status and reports a failed read instead of unconditional success", async () => {
  const setup = vi.fn().mockResolvedValue(true);
  const status = vi.fn().mockResolvedValue(true);
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const { result, unmount } = renderHook(
    () => {
      useQuery({ queryKey: ["projectSetup", "p1"], queryFn: setup });
      useQuery({ queryKey: ["googleOAuthClientStatus"], queryFn: status });
      return useDashboardRefresh("p1");
    },
    { wrapper },
  );
  await waitFor(() => expect(result.current.isFetching).toBe(false));
  setup.mockRejectedValueOnce(new Error("read failed"));
  await act(async () => {
    await result.current.onRefresh();
  });
  expect(result.current.outcome).toBe("partial");
  expect(setup).toHaveBeenCalledTimes(2);
  expect(status).toHaveBeenCalledTimes(2);
  unmount();
  client.clear();
});

it("asks Google again on refresh instead of re-reading the remembered answer", async () => {
  getView.mockResolvedValue({ connected: false });
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const { result, unmount } = renderHook(
    () => {
      useQuery(dashboardSearchViewQuery("p1", true));
      return useDashboardRefresh("p1");
    },
    { wrapper },
  );
  await waitFor(() => expect(result.current.isFetching).toBe(false));
  await act(async () => {
    await result.current.onRefresh();
  });
  // The first call is the page loading; the refresh adds the fresh one.
  expect(getView.mock.calls.map(([input]) => input.data.fresh)).toContain(true);
  unmount();
  client.clear();
});
