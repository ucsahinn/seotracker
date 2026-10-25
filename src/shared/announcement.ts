import { z } from "zod";
import type { Locale } from "@/shared/i18n";

const announcementCategorySchema = z.enum([
  "product",
  "maintenance",
  "security",
  "release",
]);

export const publicAnnouncementSchema = z.object({
  id: z.string().uuid(),
  title_tr: z.string(),
  body_tr: z.string(),
  title_en: z.string(),
  body_en: z.string(),
  interaction_type: z.enum(["none", "poll", "question"]).default("none"),
  prompt_tr: z.string().default(""),
  prompt_en: z.string().default(""),
  options: z
    .array(
      z.object({
        id: z.string().uuid(),
        label_tr: z.string(),
        label_en: z.string(),
        count: z.number().int().nonnegative(),
      }),
    )
    .default([]),
  response_count: z.number().int().nonnegative().default(0),
  category: announcementCategorySchema,
  publish_at: z.string().datetime({ offset: true }),
  expires_at: z.string().datetime({ offset: true }).nullable(),
});

export const announcementFeedSchema = z.object({
  announcements: z.array(publicAnnouncementSchema).max(100),
});

export type PublicAnnouncement = z.infer<typeof publicAnnouncementSchema>;

export function getAnnouncementText(
  announcement: PublicAnnouncement,
  locale: Locale,
): { title: string; body: string } {
  const copy =
    locale === "tr"
      ? [announcement.title_tr, announcement.body_tr]
      : [announcement.title_en, announcement.body_en];
  const [rawTitle, rawBody] = copy;
  const title = rawTitle.trim();
  const body = rawBody.trim();
  if (title && body) return { title, body };
  return { title: announcement.title_en, body: announcement.body_en };
}
