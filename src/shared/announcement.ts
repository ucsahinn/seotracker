import { z } from "zod";

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
  category: announcementCategorySchema,
  publish_at: z.string().datetime({ offset: true }),
  expires_at: z.string().datetime({ offset: true }).nullable(),
});

export const announcementFeedSchema = z.object({
  announcements: z.array(publicAnnouncementSchema).max(100),
});

export type PublicAnnouncement = z.infer<typeof publicAnnouncementSchema>;
