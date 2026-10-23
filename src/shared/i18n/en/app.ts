import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/routes, src/client/components, lib, layout, navigation,
 * tanstack-db, features/projects, reports, saved-keywords.
 * Keys are the Turkish source strings exactly as passed to t().
 */
export const enApp: Catalog = {
  // navigation/items.ts (translated where Sidebar renders them)
  Panel: "Dashboard",
  "Sıralama takibi": "Rank tracking",
  Fırsatlar: "Opportunities",
  "Kayıtlı kelimeler": "Saved keywords",
  "Arama performansı": "Search performance",
  "Site denetimi": "Site audit",
  Raporlar: "Reports",
  "Proje bilgisi": "Project context",
  "Ajan kurulumu": "Agent setup",
  Ajan: "Agent",
  "Arama ve site": "Search and site",
  // components/Sidebar.tsx
  "Kenar çubuğunu kapat": "Close sidebar",
  "Ana gezinme": "Main navigation",
  Yardım: "Help",
  Ayarlar: "Settings",
};
