import { getLocale } from "@/shared/i18n";
import { SITE_URL } from "./links";

const GUIDES: Record<string, [string, string]> = {
  projects: ["projeler", "projects"],
  settings: ["ayarlar", "settings"],
  "release-notes": ["surum-notlari", "release-notes"],
  support: ["yardim", "help"],
  ai: ["ajan-kurulumu", "agent-setup"],
  audit: ["site-denetimi", "site-audit"],
  "search-performance": ["arama-performansi", "search-performance"],
  rankings: ["siralama-takibi", "rank-tracking"],
  opportunities: ["firsatlar", "opportunities"],
  saved: ["kayitli-kelimeler", "saved-keywords"],
  analytics: ["analytics", "analytics"],
  reports: ["raporlar", "reports"],
  context: ["proje-bilgisi", "project-context"],
};

export function pageGuideUrl(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const project = segments[0] === "p";
  const screen = project ? segments[2] : segments[0];
  const guide =
    project && screen === "settings"
      ? segments[3] === "integrations"
        ? ["google-baglantisi", "google-connection"]
        : ["projeler", "projects"]
      : (GUIDES[screen ?? ""] ?? ["panel", "dashboard"]);
  const english = getLocale() === "en";
  return `${SITE_URL}${english ? "/en" : ""}/docs/${guide[english ? 1 : 0]}/`;
}
