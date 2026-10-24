import { announcementFeedSchema } from "@/shared/announcement";
import type { PublicAnnouncement } from "@/shared/announcement";
import { t } from "@/shared/i18n";

const DEFAULT_FEED_URL =
  "https://seowatcher-announcements.vitalikai07.workers.dev/api/announcements";
const FEED_URL =
  import.meta.env.VITE_ANNOUNCEMENTS_FEED_URL ?? DEFAULT_FEED_URL;

export function parseAnnouncementsFeed(value: unknown): PublicAnnouncement[] {
  return announcementFeedSchema.parse(value).announcements;
}

export async function getLiveAnnouncements(
  signal?: AbortSignal,
): Promise<PublicAnnouncement[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5_000);
  const onAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  else signal?.addEventListener("abort", onAbort, { once: true });
  try {
    const response = await fetch(FEED_URL, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(
        t("Duyurular alınamadı ({status})", { status: response.status }),
      );
    return parseAnnouncementsFeed(await response.json());
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

export const ANNOUNCEMENTS_QUERY_KEY = ["live-announcements"] as const;
export const ANNOUNCEMENTS_REFRESH_MS = 5 * 60 * 1000;
