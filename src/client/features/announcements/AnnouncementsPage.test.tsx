import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { setLocale } from "@/shared/i18n";
import { AnnouncementsPage } from "./AnnouncementsPage";
import {
  ANNOUNCEMENTS_QUERY_KEY,
  getLiveAnnouncements,
  submitAnnouncementResponse,
} from "./feed";
import type * as FeedModule from "./feed";
import type { PublicAnnouncement } from "@/shared/announcement";

vi.mock("./feed", async (importOriginal) => {
  const actual = await importOriginal<typeof FeedModule>();
  return {
    ...actual,
    getLiveAnnouncements: vi.fn(),
    submitAnnouncementResponse: vi.fn(),
  };
});

const fetchAnnouncements = vi.mocked(getLiveAnnouncements);
const submitResponse = vi.mocked(submitAnnouncementResponse);

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
  submitResponse.mockReset();
});

it("lets an active user submit a poll response and updates the live results", async () => {
  const announcement: PublicAnnouncement = {
    id: "69b74d29-13c5-4099-9d99-3d83dc0d12b4",
    title_tr: "Ürün anketi",
    body_tr: "Önceliği seç.",
    title_en: "Product poll",
    body_en: "Choose a priority.",
    category: "product",
    publish_at: "2026-10-25T09:00:00.000Z",
    expires_at: null,
    interaction_type: "poll",
    prompt_tr: "Ne önce gelsin?",
    prompt_en: "What should come first?",
    options: [
      {
        id: "e5e46f40-0cd5-44dd-84ba-73f8a6264078",
        label_tr: "Mobil",
        label_en: "Mobile",
        count: 0,
      },
      {
        id: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
        label_tr: "Rapor",
        label_en: "Reports",
        count: 0,
      },
    ],
    response_count: 0,
  };
  submitResponse.mockResolvedValue(undefined);
  fetchAnnouncements.mockResolvedValue([announcement]);
  renderPage([announcement]);

  fireEvent.click(screen.getByRole("button", { name: "Mobil 0%" }));

  await waitFor(() =>
    expect(submitResponse).toHaveBeenCalledWith({
      announcementId: announcement.id,
      optionId: announcement.options[0].id,
    }),
  );
  expect(screen.queryByText("Yanıtınız alındı")).toBeNull();
});

it("labels poll result bars with their option for assistive technology", () => {
  const announcement: PublicAnnouncement = {
    id: "69b74d29-13c5-4099-9d99-3d83dc0d12b4",
    title_tr: "Ürün anketi",
    body_tr: "Önceliği seç.",
    title_en: "Product poll",
    body_en: "Choose a priority.",
    category: "product",
    publish_at: "2026-10-25T09:00:00.000Z",
    expires_at: null,
    interaction_type: "poll",
    prompt_tr: "Ne önce gelsin?",
    prompt_en: "What should come first?",
    options: [
      {
        id: "e5e46f40-0cd5-44dd-84ba-73f8a6264078",
        label_tr: "Mobil",
        label_en: "Mobile",
        count: 1,
      },
      {
        id: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
        label_tr: "Rapor",
        label_en: "Reports",
        count: 0,
      },
    ],
    response_count: 1,
  };
  fetchAnnouncements.mockResolvedValue([announcement]);
  renderPage([announcement]);

  expect(screen.getByRole("progressbar", { name: "Mobil: 100%" })).toBeTruthy();
});

it("submits a written answer and explains the saved browser key", async () => {
  const announcement: PublicAnnouncement = {
    id: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
    title_tr: "Geri bildiriminiz",
    body_tr: "Bize yazın.",
    title_en: "Your feedback",
    body_en: "Tell us what you think.",
    category: "product",
    publish_at: "2026-10-25T09:00:00.000Z",
    expires_at: null,
    interaction_type: "question",
    prompt_tr: "Ne geliştirelim?",
    prompt_en: "What should we improve?",
    options: [],
    response_count: 0,
  };
  fetchAnnouncements.mockResolvedValue([announcement]);
  submitResponse.mockResolvedValue(undefined);
  renderPage([announcement]);

  fireEvent.change(screen.getByLabelText("Ne geliştirelim?"), {
    target: { value: "CSV dışa aktarma" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Yanıtla" }));

  await waitFor(() =>
    expect(submitResponse).toHaveBeenCalledWith({
      announcementId: announcement.id,
      answer: "CSV dışa aktarma",
    }),
  );
  expect(
    screen.getByText(/bu, kişi başına tek yanıt garantisi değildir/i),
  ).toBeTruthy();
  expect(screen.queryByText("Yanıtınız alındı")).toBeNull();
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
    interaction_type: "none",
    prompt_tr: "",
    prompt_en: "",
    options: [],
    response_count: 0,
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
