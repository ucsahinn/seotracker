import { beforeEach, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WindowsSection } from "./WindowsSection";

const native = vi.hoisted(() => ({ get: vi.fn(), set: vi.fn() }));
vi.mock("@/serverFunctions/windowsSettings", () => ({
  getWindowsSettings: native.get,
  setWindowsSetting: native.set,
}));
const settings = {
  autostart: false,
  autostartManaged: false,
  autoUpdate: true,
  autoUpdateManaged: false,
};
beforeEach(() => native.get.mockResolvedValue({ status: "ready", settings }));
function mount() {
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
          },
        })
      }
    >
      <WindowsSection />
    </QueryClientProvider>,
  );
}
it("saves startup through the native API and displays only confirmed state", async () => {
  native.set.mockResolvedValue({
    status: "ready",
    settings: { ...settings, autostart: true },
  });
  mount();
  const control = await screen.findByRole<HTMLInputElement>("checkbox", {
    name: "Windows açılınca başlat",
  });
  await waitFor(() => expect(control.hasAttribute("disabled")).toBe(false));
  fireEvent.click(control);
  await waitFor(() =>
    expect(native.set).toHaveBeenCalledWith({
      data: { setting: "autostart", enabled: true },
    }),
  );
  await waitFor(() => expect(control.checked).toBe(true));
});
it("keeps managed startup disabled instead of pretending it can be saved", async () => {
  native.get.mockResolvedValue({
    status: "ready",
    settings: { ...settings, autostart: true, autostartManaged: true },
  });
  mount();
  const control = await screen.findByRole<HTMLInputElement>("checkbox", {
    name: "Windows açılınca başlat",
  });
  await screen.findByText(
    "Bu ayar yönetici tarafından tüm kullanıcılar için açılmış. Yalnızca yönetici kapatabilir.",
  );
  expect(control.hasAttribute("disabled")).toBe(true);
  expect(native.set).not.toHaveBeenCalled();
});
it("does not turn on a preference when the native save fails", async () => {
  native.set.mockRejectedValue(new Error("Native unavailable"));
  mount();
  const control = await screen.findByRole<HTMLInputElement>("checkbox", {
    name: "Windows açılınca başlat",
  });
  await waitFor(() => expect(control.hasAttribute("disabled")).toBe(false));
  fireEvent.click(control);
  await screen.findByRole("alert");
  expect(control.checked).toBe(false);
});
