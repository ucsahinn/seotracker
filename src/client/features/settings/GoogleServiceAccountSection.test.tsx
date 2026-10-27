import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { GoogleServiceAccountSection } from "./GoogleServiceAccountSection";
const api = vi.hoisted(() => ({ get: vi.fn(), save: vi.fn(), oauth: vi.fn() }));
vi.mock("@/serverFunctions/googleServiceAccount", () => ({
  getGoogleServiceAccountStatus: api.get,
  saveGoogleServiceAccount: api.save,
  clearGoogleServiceAccount: vi.fn(),
}));
vi.mock("@/serverFunctions/googleOAuthClient", () => ({
  getGoogleOAuthClientStatus: api.oauth,
}));
beforeEach(() => {
  api.get.mockResolvedValue({ clientEmail: null, updatedAt: null });
  api.oauth.mockResolvedValue({ source: null });
  api.save.mockResolvedValue({ ok: true });
});
it("uploads only on Save without displaying the private file contents", async () => {
  const { container } = render(
    <QueryClientProvider client={new QueryClient()}>
      <GoogleServiceAccountSection />
    </QueryClientProvider>,
  );
  const input = await screen.findByLabelText("Hizmet hesabı dosyası (JSON)", {
    selector: 'input[type="file"]',
  });
  const dummy = '{"private_key":"DUMMY-ONLY-PRIVATE-KEY"}';
  fireEvent.change(input, {
    target: { files: [{ size: dummy.length, text: async () => dummy }] },
  });
  const save = screen.getByRole("button", { name: "Kaydet" });
  await waitFor(() => expect(save.hasAttribute("disabled")).toBe(false));
  expect(api.save).not.toHaveBeenCalled();
  expect(container.textContent).not.toContain("DUMMY-ONLY-PRIVATE-KEY");
  fireEvent.click(save);
  await waitFor(() =>
    expect(api.save).toHaveBeenCalledWith({ data: { keyJson: dummy } }),
  );
});
it("keeps pasted JSON in a password control", async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <GoogleServiceAccountSection />
    </QueryClientProvider>,
  );
  const input = await screen.findByLabelText("JSON içeriğini gizli yapıştır");
  expect(input.getAttribute("type")).toBe("password");
});
