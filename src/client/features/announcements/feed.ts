import { announcementFeedSchema } from "@/shared/announcement";
import type { PublicAnnouncement } from "@/shared/announcement";
import { t } from "@/shared/i18n";
import { getParticipantId } from "./participation";

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
      cache: "no-store",
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

export async function submitAnnouncementResponse(input: {
  announcementId: string;
  optionId?: string;
  answer?: string;
}): Promise<void> {
  const response = await fetch(
    `${FEED_URL}/${encodeURIComponent(input.announcementId)}/responses`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        respondent_id: getParticipantId(),
        ...(input.optionId ? { option_id: input.optionId } : {}),
        ...(input.answer ? { answer: input.answer } : {}),
      }),
    },
  );
  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    const code =
      payload &&
      typeof payload === "object" &&
      "code" in payload &&
      typeof payload.code === "string"
        ? payload.code
        : undefined;
    const messages: Record<string, string> = {
      already_responded: t("Bu kurulumdan daha önce yanıt verildi."),
      rate_limited: t(
        "Çok hızlı yanıt gönderildi. Biraz sonra yeniden deneyin.",
      ),
    };
    const error = new Error(
      messages[code ?? ""] ??
        t("Yanıt gönderilemedi ({status})", { status: response.status }),
    );
    if (code === "already_responded") error.name = "AlreadyRespondedError";
    throw error;
  }
}

export const ANNOUNCEMENTS_QUERY_KEY = ["live-announcements"] as const;
export const ANNOUNCEMENTS_REFRESH_MS = 60 * 1000;
