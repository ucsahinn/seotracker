import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { BrandTermsEditor } from "./BrandTerms";

const api = vi.hoisted(() => ({
  getBrandTerms: vi.fn(),
  setBrandTerms: vi.fn(),
}));
vi.mock("@/serverFunctions/searchPerformance", () => api);

it("guards client-2: saving brand terms refreshes fresh Opportunities evidence on return", async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 300_000 } },
  });
  const key = ["searchOpportunities", "p1", 50, 28];
  client.setQueryData(key, "old brand evidence");
  client.setQueryData(["searchOpportunities", "p2"], "other project");
  api.getBrandTerms.mockResolvedValue({ terms: [], suggestions: ["acme"] });
  api.setBrandTerms.mockResolvedValue({ terms: ["acme"], suggestions: [] });
  const saved = vi.fn();
  const view = render(
    <QueryClientProvider client={client}>
      <BrandTermsEditor projectId="p1" onSaved={saved} />
    </QueryClientProvider>,
  );
  fireEvent.click(
    await screen.findByRole("button", { name: "Önerileri onayla" }),
  );
  await waitFor(() => expect(saved).toHaveBeenCalledOnce());
  function Opportunities() {
    const result = useQuery({
      queryKey: key,
      queryFn: async () => "new brand evidence",
    });
    return <p>{result.data}</p>;
  }
  view.rerender(
    <QueryClientProvider client={client}>
      <Opportunities />
    </QueryClientProvider>,
  );
  expect(await screen.findByText("new brand evidence")).toBeTruthy();
  expect(
    client.getQueryState(["searchOpportunities", "p2"])?.isInvalidated,
  ).toBe(false);
  client.clear();
});
