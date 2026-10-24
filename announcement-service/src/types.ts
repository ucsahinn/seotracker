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
  | "category"
  | "status"
  | "publish_at"
  | "expires_at"
>;
