import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const testPageSpeedKey = vi.hoisted(() => vi.fn());
vi.mock("@/serverFunctions/pagespeedKey", () => ({ testPageSpeedKey }));

import { PageSpeedKeyTest } from "./PageSpeedKeyTest";

function renderTest() {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <PageSpeedKeyTest />
    </QueryClientProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: /Anahtarı test et/ }));
}

beforeEach(() => {
  testPageSpeedKey.mockReset();
});

describe("PageSpeedKeyTest", () => {
  it("labels the cost and shows the success message", async () => {
    testPageSpeedKey.mockResolvedValue({
      ok: true,
      state: "ok",
      message: "Anahtar çalışıyor.",
    });

    renderTest();

    expect(screen.getByText("1 ölçüm harcar")).toBeTruthy();
    expect(await screen.findByText("Anahtar çalışıyor.")).toBeTruthy();
  });

  it("shows a failed state's message and cannot be clicked again at once", async () => {
    testPageSpeedKey.mockResolvedValue({
      ok: false,
      state: "invalid_key",
      message: "Google anahtarı geçersiz buldu.",
    });

    renderTest();

    expect(await screen.findByText(/geçersiz buldu/)).toBeTruthy();
    const button = screen.getByRole("button", { name: /Anahtarı test et/ });
    await waitFor(() => expect(button.hasAttribute("disabled")).toBe(true));
    fireEvent.click(button);
    expect(testPageSpeedKey).toHaveBeenCalledOnce();
  });

  it("reports a failed server call instead of staying silent", async () => {
    testPageSpeedKey.mockRejectedValue(new Error("boom"));

    renderTest();

    expect(await screen.findByText("boom")).toBeTruthy();
  });
});
