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

/** Return stable whole percentages whose sum is exactly 100 when votes exist. */
export function getPollOptionPercentages(
  options: readonly { id: string; count: number }[],
): Record<string, number> {
  const total = options.reduce((sum, option) => sum + option.count, 0);
  if (total === 0) return Object.fromEntries(options.map(({ id }) => [id, 0]));

  const shares = options.map((option) => {
    const exact = (option.count / total) * 100;
    const base = Math.floor(exact);
    return { id: option.id, base, remainder: exact - base };
  });
  let remaining = 100 - shares.reduce((sum, share) => sum + share.base, 0);
  const awarded = new Set<number>();
  while (remaining > 0) {
    let bestIndex = -1;
    for (let index = 0; index < shares.length; index++) {
      if (awarded.has(index)) continue;
      if (
        bestIndex === -1 ||
        shares[index].remainder > shares[bestIndex].remainder
      ) {
        bestIndex = index;
      }
    }
    if (bestIndex === -1) break;
    shares[bestIndex].base++;
    awarded.add(bestIndex);
    remaining--;
  }
  return Object.fromEntries(shares.map(({ id, base }) => [id, base]));
}

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
