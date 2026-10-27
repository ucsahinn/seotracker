import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { PublicAnnouncement } from "@/shared/announcement";
import { ANNOUNCEMENTS_QUERY_KEY } from "./feed";
import { AnnouncementNotifications } from "./AnnouncementNotifications";
import { notify } from "@/client/features/notifications/notify";

vi.mock("@/client/features/notifications/notify", () => ({
  notify: vi.fn(),
}));

const existing: PublicAnnouncement = {
  id: "69b74d29-13c5-4099-9d99-3d83dc0d12b4",
  title_tr: "Önceki duyuru",
  body_tr: "Uygulama iyileştirmeleri.",
  title_en: "Previous announcement",
  body_en: "App improvements.",
  category: "product",
  publish_at: "2026-10-25T09:00:00.000Z",
  expires_at: null,
  interaction_type: "none",
  prompt_tr: "",
  prompt_en: "",
  options: [],
  response_count: 0,
};

const newest: PublicAnnouncement = {
  ...existing,
  id: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
  title_tr: "Güvenlik güncellemesi",
  body_tr: "Güvenlikle ilgili önemli bir düzeltme yayımlandı.",
  title_en: "Security update",
  body_en: "An important security fix is available.",
  category: "security",
};

it.each(["product", "maintenance", "security", "release"] as const)(
  "notifies about an unread announcement in the %s category on initial load",
  async (category) => {
    vi.mocked(notify).mockClear();
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: 60_000 } },
    });
    client.setQueryData(ANNOUNCEMENTS_QUERY_KEY, [{ ...newest, category }]);
    render(
      <QueryClientProvider client={client}>
        <AnnouncementNotifications />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(notify).toHaveBeenCalledTimes(1));
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: "announcement",
        title: "Güvenlik güncellemesi",
        importance: "high",
        dedupeKey: `announcement:${newest.id}`,
      }),
    );
  },
);

it("sends every new announcement as an important in-app alert", async () => {
  vi.mocked(notify).mockClear();
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 60_000 } },
  });
  client.setQueryData(ANNOUNCEMENTS_QUERY_KEY, [existing]);
  render(
    <QueryClientProvider client={client}>
      <AnnouncementNotifications />
    </QueryClientProvider>,
  );

  client.setQueryData(ANNOUNCEMENTS_QUERY_KEY, [newest, existing]);

  await waitFor(() =>
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: "announcement",
        title: "Güvenlik güncellemesi",
        importance: "high",
      }),
    ),
  );
});

it.each(["poll", "question"] as const)(
  "notifies about a new %s announcement",
  async (interaction_type) => {
    vi.mocked(notify).mockClear();
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: 60_000 } },
    });
    client.setQueryData(ANNOUNCEMENTS_QUERY_KEY, [existing]);
    render(
      <QueryClientProvider client={client}>
        <AnnouncementNotifications />
      </QueryClientProvider>,
    );

    client.setQueryData(ANNOUNCEMENTS_QUERY_KEY, [
      { ...newest, interaction_type },
      existing,
    ]);

    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: "announcement",
          title: "Güvenlik güncellemesi",
          href: "/announcements",
          importance: "high",
        }),
      ),
    );
  },
);
