import { act, renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { expect, it, vi } from "vitest";
import { useDashboardRefresh } from "./useDashboardRefresh";
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
