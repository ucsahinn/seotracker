export const CATEGORIES = [
  "product",
  "maintenance",
  "security",
  "release",
] as const;
export type AnnouncementCategory = (typeof CATEGORIES)[number];
export const STATUSES = ["draft", "published", "archived"] as const;
export type AnnouncementStatus = (typeof STATUSES)[number];

export type Announcement = {
  id: string;
  title_tr: string;
  body_tr: string;
  title_en: string;
  body_en: string;
  title_de: string;
  body_de: string;
  title_fr: string;
  body_fr: string;
  title_it: string;
  body_it: string;
  title_pt: string;
  body_pt: string;
  category: AnnouncementCategory;
  status: AnnouncementStatus;
  publish_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AnnouncementInput = Pick<
  Announcement,
  | "title_tr"
  | "body_tr"
  | "title_en"
  | "body_en"
  | "title_de"
  | "body_de"
  | "title_fr"
  | "body_fr"
  | "title_it"
  | "body_it"
  | "title_pt"
  | "body_pt"
  | "category"
  | "status"
  | "publish_at"
  | "expires_at"
>;
