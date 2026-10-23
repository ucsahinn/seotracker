import {
  BarChart3,
  Bookmark,
  Bot,
  Brain,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import { linkOptions } from "@tanstack/react-router";

/*
 * Labels and group headings are Turkish source strings, not display text:
 * they are evaluated at import time, before the locale is known, so the
 * Sidebar passes each one through t() where it renders. Their English lives
 * in src/shared/i18n/en/app.ts.
 */
const projectNavItems = [
  {
    to: "/p/$projectId" as const,
    label: "Panel",
    icon: LayoutDashboard,
    // Without exact matching, the index path is a prefix of every project
    // route and the Dashboard item would render active everywhere.
    activeOptions: { exact: true, includeSearch: false },
  },
  {
    to: "/p/$projectId/rankings" as const,
    label: "Sıralama takibi",
    icon: TrendingUp,
  },
  {
    to: "/p/$projectId/opportunities" as const,
    label: "Fırsatlar",
    icon: Target,
  },
  {
    to: "/p/$projectId/saved" as const,
    label: "Kayıtlı kelimeler",
    icon: Bookmark,
  },
  {
    to: "/p/$projectId/analytics" as const,
    label: "Analytics",
    icon: BarChart3,
  },
  {
    to: "/p/$projectId/search-performance" as const,
    label: "Arama performansı",
    icon: Search,
  },
  {
    to: "/p/$projectId/audit" as const,
    label: "Site denetimi",
    icon: ClipboardCheck,
  },
  {
    to: "/p/$projectId/reports" as const,
    label: "Raporlar",
    icon: FileText,
  },
  {
    to: "/p/$projectId/context" as const,
    label: "Proje bilgisi",
    icon: Brain,
  },
] as const;

// Project-independent. Rendered inside the project "Ajan" group when a project
// is selected, and on its own (connectNavGroup) when none is.
const aiNavItem = linkOptions({
  to: "/ai" as const,
  label: "Ajan kurulumu",
  icon: Bot,
});

// Shown only when no project is selected; with a project, Agent setup lives in
// the "Ajan" group below.
export const connectNavGroup = {
  label: "Ajan",
  items: [aiNavItem],
};

function getProjectNavItems(projectId: string) {
  return linkOptions(
    projectNavItems.map((item) => ({
      ...item,
      params: { projectId },
      search: {},
    })),
  );
}

// Grouped by scope: "Arama ve site" is this project's own domain — every data
// source here is free and tied to a site you verified yourself. Panel stands
// alone at the top with no heading: a heading over one item says nothing.
export function getProjectNavGroups(projectId: string) {
  const all = getProjectNavItems(projectId);
  const byPath = (path: (typeof projectNavItems)[number]["to"]) =>
    all.find((i) => i.to === path)!;

  return [
    {
      label: null,
      items: [byPath("/p/$projectId")],
    },
    {
      label: "Arama ve site",
      items: [
        byPath("/p/$projectId/search-performance"),
        byPath("/p/$projectId/rankings"),
        byPath("/p/$projectId/opportunities"),
        byPath("/p/$projectId/saved"),
        byPath("/p/$projectId/analytics"),
        byPath("/p/$projectId/audit"),
      ],
    },
    {
      label: "Ajan",
      items: [
        byPath("/p/$projectId/reports"),
        byPath("/p/$projectId/context"),
        aiNavItem,
      ],
    },
  ];
}
