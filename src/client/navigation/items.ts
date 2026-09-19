import {
  Bookmark,
  Bot,
  Brain,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Target,
  TrendingUp,
} from "lucide-react";
import { linkOptions } from "@tanstack/react-router";
import { GoogleGlyphMuted } from "@/client/features/gsc/GoogleGlyph";

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
    label: "Sıralama Takibi",
    icon: TrendingUp,
  },
  {
    to: "/p/$projectId/opportunities" as const,
    label: "Fırsatlar",
    icon: Target,
  },
  {
    to: "/p/$projectId/saved" as const,
    label: "Kayıtlı Kelimeler",
    icon: Bookmark,
  },
  {
    to: "/p/$projectId/search-performance" as const,
    label: "Arama Performansı",
    icon: GoogleGlyphMuted,
  },
  {
    to: "/p/$projectId/audit" as const,
    label: "Site Denetimi",
    icon: ClipboardCheck,
  },
  {
    to: "/p/$projectId/reports" as const,
    label: "Raporlar",
    icon: FileText,
  },
  {
    to: "/p/$projectId/context" as const,
    label: "Proje Bilgisi",
    icon: Brain,
  },
] as const;

// Project-independent. Rendered inside the project "AI" group when a project
// is selected, and on its own (connectNavGroup) when none is.
const aiNavItem = linkOptions({
  to: "/ai" as const,
  label: "Ajan kurulumu",
  icon: Bot,
});

// Shown only when no project is selected; with a project, Agent setup lives in
// the "AI" group below.
export const connectNavGroup = {
  label: "Yapay Zeka",
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

// Grouped by scope: "My Site" is this project's own domain — every data source
// here is free and tied to a site you verified yourself.
export function getProjectNavGroups(projectId: string) {
  const all = getProjectNavItems(projectId);
  const byPath = (path: (typeof projectNavItems)[number]["to"]) =>
    all.find((i) => i.to === path)!;

  return [
    {
      label: "Genel",
      items: [byPath("/p/$projectId")],
    },
    {
      label: "Sitem",
      items: [
        byPath("/p/$projectId/search-performance"),
        byPath("/p/$projectId/rankings"),
        byPath("/p/$projectId/opportunities"),
        byPath("/p/$projectId/saved"),
        byPath("/p/$projectId/audit"),
      ],
    },
    {
      label: "Yapay Zeka",
      items: [
        byPath("/p/$projectId/reports"),
        byPath("/p/$projectId/context"),
        aiNavItem,
      ],
    },
  ];
}
