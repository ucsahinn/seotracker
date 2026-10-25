import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { setLocale } from "@/shared/i18n";
import { AnnouncementsPage } from "./AnnouncementsPage";
import { ANNOUNCEMENTS_QUERY_KEY, getLiveAnnouncements } from "./feed";
import type * as FeedModule from "./feed";
import type { PublicAnnouncement } from "@/shared/announcement";

vi.mock("./feed", async (importOriginal) => {
  const actual = await importOriginal<typeof FeedModule>();
  return { ...actual, getLiveAnnouncements: vi.fn() };
});

const fetchAnnouncements = vi.mocked(getLiveAnnouncements);

function renderPage(initialData?: PublicAnnouncement[]) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  if (initialData) client.setQueryData(ANNOUNCEMENTS_QUERY_KEY, initialData);
  render(
    <QueryClientProvider client={client}>
      <AnnouncementsPage />
    </QueryClientProvider>,
  );
  return client;
}

beforeEach(() => {
  setLocale("tr");
  fetchAnnouncements.mockReset();
});

it("shows a retry state instead of presenting a feed failure as empty", async () => {
  fetchAnnouncements.mockRejectedValue(new Error("Offline"));
  renderPage();

  expect(await screen.findByText("Duyurular şu anda alınamıyor")).toBeTruthy();
  expect(screen.queryByText("Şimdilik yeni duyuru yok")).toBeNull();
});

it("renders a bilingual post in the selected language and can refresh", async () => {
  setLocale("en");
  const announcement: PublicAnnouncement = {
    id: "69b74d29-13c5-4099-9d99-3d83dc0d12b4",
    title_tr: "Bakım",
    body_tr: "Kısa bakım.",
    title_en: "Scheduled maintenance",
    body_en: "A short service window is planned.",
    title_de: "Geplante Wartung",
    body_de: "Ein kurzes Wartungsfenster ist geplant.",
    title_fr: "Maintenance planifiée",
    body_fr: "Une courte interruption est prévue.",
    title_it: "Manutenzione programmata",
    body_it: "È prevista una breve interruzione del servizio.",
    title_pt: "Manutenção programada",
    body_pt: "Está prevista uma breve interrupção do serviço.",
    category: "maintenance",
    publish_at: "2026-10-25T09:00:00.000Z",
    expires_at: null,
  };
  fetchAnnouncements.mockResolvedValue([announcement]);
  renderPage([announcement]);

  expect(screen.getByRole("heading", { name: "Announcements" })).toBeTruthy();
  expect(screen.getByText("Scheduled maintenance")).toBeTruthy();
  expect(screen.getByText("A short service window is planned.")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: /Refresh/ }));
  await waitFor(() => expect(fetchAnnouncements).toHaveBeenCalled());
});
