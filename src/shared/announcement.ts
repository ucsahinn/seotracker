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
  title_de: z.string(),
  body_de: z.string(),
  title_fr: z.string(),
  body_fr: z.string(),
  title_it: z.string(),
  body_it: z.string(),
  title_pt: z.string(),
  body_pt: z.string(),
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
  const copy = {
    tr: [announcement.title_tr, announcement.body_tr],
    en: [announcement.title_en, announcement.body_en],
    de: [announcement.title_de, announcement.body_de],
    fr: [announcement.title_fr, announcement.body_fr],
    it: [announcement.title_it, announcement.body_it],
    pt: [announcement.title_pt, announcement.body_pt],
  }[locale];
  const [rawTitle, rawBody] = copy;
  const title = rawTitle.trim();
  const body = rawBody.trim();
  if (title && body) return { title, body };
  return { title: announcement.title_en, body: announcement.body_en };
}
