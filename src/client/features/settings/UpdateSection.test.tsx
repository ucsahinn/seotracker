import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { UpdateSection } from "./UpdateSection";

vi.mock("@/serverFunctions/updateCheck", () => ({
  getUpdateStatus: vi.fn(),
  checkForUpdateNow: vi.fn(),
  setUpdateCheckEnabled: vi.fn(),
}));
vi.mock("@/serverFunctions/windowsSettings", () => ({
  getWindowsSettings: () => new Promise(() => {}),
}));
vi.mock("@/client/features/notifications/useBackgroundNotifications", () => ({
  notifyUpdateAvailable: vi.fn(),
}));

it.each(["ready", "unsupported", "unavailable", undefined] as const)(
  "offers Windows installation settings only when controls are ready (%s)",
  (status) => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    client.setQueryData(["updateStatus"], {
      enabled: false,
      installKind: "windows",
    });
    if (status) {
      client.setQueryData(["windowsSettings"], {
        status,
        ...(status === "ready"
          ? {
              settings: {
                autostart: false,
                autostartManaged: false,
                autoUpdate: true,
                autoUpdateManaged: false,
              },
            }
          : {}),
      });
    }
    render(
      <QueryClientProvider client={client}>
        <UpdateSection version="0.8.3" />
      </QueryClientProvider>,
    );
    const link = screen.queryByRole("link", {
      name: "Windows otomatik kurulum ayarları",
    });
    if (status === "ready") expect(link?.getAttribute("href")).toBe("#windows");
    else expect(link).toBeNull();
  },
);
