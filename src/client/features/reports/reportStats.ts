import { sort } from "remeda";
import type { ReportListItem } from "@/serverFunctions/reports";

/** Reports with no template and no skill share this one label. */
export const OTHER_KIND = "Belirtilmemiş";

/** The skill names agents write, said the way the rest of the screen speaks. */
const KIND_LABELS: Record<string, string> = {
  "seo-audit": "SEO denetimi",
  "seo-check-in": "Dönem karşılaştırması",
  "seo-triage": "Trafik düşüşü incelemesi",
  "seo-report": "SEO raporu",
  "seo-coach": "Koçluk notu",
  "seo-project-setup": "Proje kurulumu",
};

/** What a person reads for a kind; an unknown kind keeps its own name. */
export function kindLabel(kind: string): string {
  return KIND_LABELS[kind] ?? kind;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type ReportFilter = "all" | "recent" | "template" | "skill";

type ReportLike = Pick<
  ReportListItem,
  "templateName" | "skill" | "updatedAt" | "sizeBytes"
>;

/** What tells two reports on one site apart: the template, else the skill. */
export function reportKind(report: ReportLike): string {
  return report.templateName ?? report.skill ?? OTHER_KIND;
}

export function matchesFilter(
  report: ReportLike,
  filter: ReportFilter,
  now: number,
): boolean {
  switch (filter) {
    case "all":
      return true;
    case "recent":
      return now - Date.parse(report.updatedAt) <= WEEK_MS;
    case "template":
      return report.templateName !== null;
    case "skill":
      return report.templateName === null && report.skill !== null;
  }
}

export function filterCounts(
  reports: ReportLike[],
  now: number,
): Record<ReportFilter, number> {
  return {
    all: reports.length,
    recent: reports.filter((r) => matchesFilter(r, "recent", now)).length,
    template: reports.filter((r) => matchesFilter(r, "template", now)).length,
    skill: reports.filter((r) => matchesFilter(r, "skill", now)).length,
  };
}

/**
 * Counts per kind, biggest first. Past `max` kinds the tail is pooled, since a
 * ring stops being readable beyond a handful of arcs.
 */
export function kindSegments(
  reports: ReportLike[],
  max = 5,
): { key: string; label: string; value: number; disabled?: boolean }[] {
  const counts = new Map<string, number>();
  for (const report of reports) {
    const kind = reportKind(report);
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  const sorted = sort(
    [...counts.entries()],
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "tr"),
  );
  const head = sorted.slice(0, max).map(([key, value]) => ({
    key,
    label: kindLabel(key),
    value,
  }));
  const rest = sorted.slice(max).reduce((sum, [, value]) => sum + value, 0);
  return rest > 0
    ? [
        ...head,
        { key: "__other", label: "Diğer türler", value: rest, disabled: true },
      ]
    : head;
}

/** The most recently updated report (id and time), or null for an empty list. */
export function latestUpdate(
  reports: { id: string; updatedAt: string }[],
): { id: string; updatedAt: string } | null {
  return reports.reduce<{ id: string; updatedAt: string } | null>(
    (best, r) => (best === null || r.updatedAt > best.updatedAt ? r : best),
    null,
  );
}

/** True when a click landed on a control inside the row, which keeps precedence over the row itself. */
export function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest("a, button, [role=menu]") !== null
  );
}
