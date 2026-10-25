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
  interaction_type?: "none" | "poll" | "question";
  prompt_tr?: string;
  prompt_en?: string;
  options?: AnnouncementOption[];
  response_count?: number;
  category: AnnouncementCategory;
  status: AnnouncementStatus;
  publish_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AnnouncementOption = {
  id: string;
  label_tr: string;
  label_en: string;
  count: number;
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
> & {
  interaction_type: "none" | "poll" | "question";
  prompt_tr: string;
  prompt_en: string;
  options: Array<Pick<AnnouncementOption, "label_tr" | "label_en">>;
};
