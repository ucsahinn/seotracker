import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { LongTermTrend } from "./LongTermTrend";

const getSiteDailyHistory = vi.hoisted(() => vi.fn());
vi.mock("@/serverFunctions/searchPerformance", () => ({ getSiteDailyHistory }));

function mount(client: QueryClient) {
  return render(
    <QueryClientProvider client={client}>
      <LongTermTrend projectId="p1" searchType="web" />
    </QueryClientProvider>,
  );
}

it("guards client-5: a failed initial archive read offers retry instead of claiming an empty archive", async () => {
  getSiteDailyHistory.mockRejectedValue(new Error("history unavailable"));
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  mount(client);
  const retry = await screen.findByRole("button", { name: "Tekrar dene" });
  expect(screen.queryByText(/Arşivde henüz gün yok/)).toBeNull();
  getSiteDailyHistory.mockResolvedValue({ days: [] });
  fireEvent.click(retry);
  expect(await screen.findByText(/Arşivde henüz gün yok/)).toBeTruthy();
  client.clear();
});

it("guards client-5: a failed background refresh preserves cached monthly bars and offers retry", async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  const key = ["siteDailyHistory", "p1", "web", null];
  client.setQueryData(key, {
    days: [
      { date: "2026-08-01", clicks: 10 },
      { date: "2026-09-01", clicks: 20 },
    ],
    since: "2026-08-01",
    until: "2026-09-30",
    earliestDate: "2026-08-01",
    latestDate: "2026-09-01",
  });
  getSiteDailyHistory.mockRejectedValue(new Error("history unavailable"));
  mount(client);
  await client.invalidateQueries({ queryKey: key });
  await waitFor(() => expect(client.getQueryState(key)?.status).toBe("error"));
  expect(
    await screen.findByRole("button", { name: "Tekrar dene" }),
  ).toBeTruthy();
  expect(screen.getByRole("img", { name: /2 aylık tıklama/ })).toBeTruthy();
  expect(screen.queryByText(/Arşivde henüz gün yok/)).toBeNull();
  client.clear();
});
