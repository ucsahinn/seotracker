import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const getGa4MeasurementHealth = vi.fn();
vi.mock("@/serverFunctions/ga4MeasurementHealth", () => ({
  getGa4MeasurementHealth: (...args: unknown[]) =>
    getGa4MeasurementHealth(...args) as unknown,
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, ...props }: { children: React.ReactNode }) => (
    <a {...props}>{children}</a>
  ),
}));

const { MeasurementHealthPanel } = await import("./MeasurementHealthPanel");

/*
 * The shape this suite exists for.
 *
 * Every bug in the "a failed query rendered as an empty one" family looks
 * identical from a Node test: the service is fine, the server function is
 * fine, and the screen still tells the operator there is no data. The only
 * way to see it is to render the component with a rejecting query and assert
 * that the empty-state copy is *not* on the page.
 */
function mount() {
  // `retry: false` so a rejection settles on the first attempt instead of
  // spending the default three retries inside the test's timeout.
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MeasurementHealthPanel projectId="p1" />
    </QueryClientProvider>,
  );
}

const NOT_CONNECTED = /Google Analytics bağlı değil/i;

describe("MeasurementHealthPanel", () => {
  it("says the read failed, rather than that Analytics is not connected", async () => {
    getGa4MeasurementHealth.mockRejectedValue(new Error("boom"));

    mount();

    expect(await screen.findByText(/okunamadı/i)).toBeDefined();
    // The distinction that matters: a 500 is not a missing integration, and
    // telling the operator to go connect something they already connected
    // sends them to the wrong screen.
    expect(screen.queryByText(NOT_CONNECTED)).toBeNull();
  });

  it("offers the integrations screen when Analytics really is not connected", async () => {
    getGa4MeasurementHealth.mockResolvedValue({ status: "needs_ga4" });

    mount();

    expect(await screen.findByText(NOT_CONNECTED)).toBeDefined();
    expect(screen.queryByText(/okunamadı/i)).toBeNull();
  });

  it("says nothing is wrong only when the property reports no findings", async () => {
    getGa4MeasurementHealth.mockResolvedValue({
      status: "ok",
      propertyDisplayName: "Example",
      propertyId: "1",
      summary: {
        dataStreamCount: 1,
        webStreamCount: 1,
        keyEventCount: 2,
        customDimensionCount: 0,
        customMetricCount: 0,
        issueCount: 0,
      },
      issues: [],
      webStreams: [],
      otherStreams: [],
      keyEvents: [],
    });

    mount();

    expect(await screen.findByText(/eksik bulunamadı/i)).toBeDefined();
  });

  it("turns Google's issue codes into a sentence the operator can act on", async () => {
    getGa4MeasurementHealth.mockResolvedValue({
      status: "ok",
      propertyDisplayName: "Example",
      propertyId: "1",
      summary: {
        dataStreamCount: 0,
        webStreamCount: 0,
        keyEventCount: 0,
        customDimensionCount: 0,
        customMetricCount: 0,
        issueCount: 1,
      },
      issues: ["no_web_stream"],
      webStreams: [],
      otherStreams: [],
      keyEvents: [],
    });

    mount();

    expect(await screen.findByText(/Web veri akışı yok/i)).toBeDefined();
    // Never the raw code: it is the contract with the MCP tool, not copy.
    expect(screen.queryByText("no_web_stream")).toBeNull();
  });
});
