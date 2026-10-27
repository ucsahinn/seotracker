import { guideUrl } from "./links";

const GUIDES: Record<string, string> = {
  projects: "projeler",
  settings: "ayarlar",
  "release-notes": "surum-notlari",
  support: "yardim",
  announcements: "yardim",
  ai: "ajan-kurulumu",
  audit: "site-denetimi",
  "search-performance": "arama-performansi",
  rankings: "siralama-takibi",
  opportunities: "firsatlar",
  saved: "kayitli-kelimeler",
  analytics: "analytics",
  reports: "raporlar",
  context: "proje-bilgisi",
};

export function pageGuideUrl(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const project = segments[0] === "p";
  const screen = project ? segments[2] : segments[0];
  const guide =
    project && screen === "settings"
      ? segments[3] === "integrations"
        ? "google-baglantisi"
        : segments[3] === "context"
          ? "proje-bilgisi"
          : "projeler"
      : (GUIDES[screen ?? ""] ?? "panel");
  return guideUrl(guide);
}
