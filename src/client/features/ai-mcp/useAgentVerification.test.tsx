import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { getAgentConnection } from "@/serverFunctions/agentConnection";
import { useAgentVerification } from "./useAgentVerification";

vi.mock("@/serverFunctions/agentConnection", () => ({
  getAgentConnection: vi.fn(),
}));
beforeEach(() => {
  vi.mocked(getAgentConnection).mockResolvedValue({
    lastCallAt: null,
    clientLabel: null,
    tokenConfigured: false,
    installKind: "windows",
  });
});
it("keeps verification waiting when the operator switches to their agent", async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const { result, unmount } = renderHook(() => useAgentVerification(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    ),
  });
  await waitFor(() => expect(result.current.connection.isSuccess).toBe(true));
  act(() => result.current.startVerification());
  vi.spyOn(document, "hidden", "get").mockReturnValue(true);
  act(() => {
    document.dispatchEvent(new Event("visibilitychange"));
  });
  expect(result.current.verificationOutcome).toBe("waiting");
  unmount();
  client.clear();
});
