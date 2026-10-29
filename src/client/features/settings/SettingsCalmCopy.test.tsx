import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type * as Query from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ThemeSection } from "./ThemeSection";
import { GoogleCredentialMethods } from "./GoogleCredentialMethods";
import { PageSpeedKeySection } from "./PageSpeedKeySection";
vi.mock("@tanstack/react-query", async (importOriginal) => ({
  ...(await importOriginal<typeof Query>()),
  useQuery: () => ({
    data: {
      source: "settings",
      clientEmail: "owner@example.com",
      updatedAt: "2026-10-23T08:30:00Z",
    },
    isPending: false,
    isError: false,
  }),
}));
vi.mock("./GoogleOAuthClientSection", () => ({
  GoogleOAuthClientSection: () => null,
}));
vi.mock("./GoogleServiceAccountSection", () => ({
  GoogleServiceAccountSection: () => null,
}));
it("C29 gives appearance help topical labels", () => {
  render(<ThemeSection />);
  expect(screen.getByText("Tema kaydı").tagName).toBe("SUMMARY");
  expect(screen.getByText("Dil kapsamı").tagName).toBe("SUMMARY");
  expect(screen.queryByText("Ayrıntılar")).toBeNull();
});
it("C29 places the Google credential heading before its help", () => {
  render(<GoogleCredentialMethods />);
  const heading = screen.getByRole("heading", { name: "Google kimlikleri" });
  const summary = screen.getByText("Kimlik yöntemleri");
  expect(
    heading.compareDocumentPosition(summary) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).not.toBe(0);
});
it("C30 shows one saved-key state with test and edit actions together", () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <PageSpeedKeySection />
    </QueryClientProvider>,
  );
  expect(screen.getAllByText("Anahtar kayıtlı")).toHaveLength(1);
  const actions = screen.getByRole("group", { name: "Anahtar işlemleri" });
  expect(
    actions.contains(screen.getByRole("button", { name: "Anahtarı test et" })),
  ).toBe(true);
  expect(
    actions.contains(screen.getByRole("button", { name: "Değiştir" })),
  ).toBe(true);
  expect(actions.contains(screen.getByRole("button", { name: "Sil" }))).toBe(
    true,
  );
});
