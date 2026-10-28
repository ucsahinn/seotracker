import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { GoogleOAuthClientSection } from "./GoogleOAuthClientSection";
const api = vi.hoisted(() => ({ service: vi.fn(), oauth: vi.fn() }));
vi.mock("@/serverFunctions/googleServiceAccount", () => ({
  getGoogleServiceAccountStatus: api.service,
}));
vi.mock("@/serverFunctions/googleOAuthClient", () => ({
  getGoogleOAuthClientStatus: api.oauth,
  saveGoogleOAuthClient: vi.fn(),
  clearGoogleOAuthClient: vi.fn(),
}));
beforeEach(() => {
  api.service.mockResolvedValue({
    clientEmail: "operator@example.com",
    updatedAt: null,
  });
  api.oauth.mockResolvedValue({ source: null });
});
it("keeps the unused OAuth setup collapsed when a service account is in use", async () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <GoogleOAuthClientSection />
    </QueryClientProvider>,
  );
  await screen.findByText("Kullanılmıyor, hizmet hesabı bağlı");
  await waitFor(() =>
    expect(container.querySelector("details")?.open).toBe(false),
  );
  expect(screen.getByText("Google hesabıyla giriş seçeneği")).toBeTruthy();
});
