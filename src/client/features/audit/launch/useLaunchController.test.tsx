import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLaunchController } from "./useLaunchController";

const mocks = vi.hoisted(() => ({
  startAudit: vi.fn(),
  getAuditHistory: vi.fn(),
  getProjects: vi.fn(),
}));

vi.mock("@/serverFunctions/audit", () => ({
  startAudit: mocks.startAudit,
  deleteAudit: vi.fn(),
  getAuditHistory: mocks.getAuditHistory,
}));
vi.mock("@/serverFunctions/projects", () => ({
  getProjects: mocks.getProjects,
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const past = {
  startUrl: "https://example.com",
  pagesTotal: 20,
  pagesCrawled: 20,
  ranLighthouse: false,
};

describe("useLaunchController.rerunAudit", () => {
  beforeEach(() => {
    mocks.getAuditHistory.mockResolvedValue([]);
    mocks.getProjects.mockResolvedValue([]);
  });

  it("ignores a second click while the first start is still in flight", async () => {
    mocks.startAudit.mockReturnValue(new Promise(() => {}));
    const client = new QueryClient();
    const { result } = renderHook(
      () => useLaunchController({ projectId: "p1", onAuditStarted: vi.fn() }),
      {
        wrapper: ({ children }: { children: ReactNode }) => (
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        ),
      },
    );

    await act(async () => {
      result.current.rerunAudit(past);
      await Promise.resolve();
    });
    await act(async () => {
      result.current.rerunAudit(past);
      await Promise.resolve();
    });

    expect(mocks.startAudit).toHaveBeenCalledTimes(1);
  });
});
