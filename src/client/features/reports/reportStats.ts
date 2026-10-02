import { sort } from "remeda";
import {
  APP_REPORT_CREATOR,
  LEGACY_APP_REPORT_CREATOR,
} from "@/shared/report-creator";
import type { ReportListItem } from "@/serverFunctions/reports";

/** Reports with no template and no skill share this one label. */
export const OTHER_KIND = "Belirtilmemiş";

/** The kind of the report the Site denetimi screen saves from its download button. */
export const AUDIT_EXPORT_KIND = "site-audit-export";

/** The skill names agents write, said the way the rest of the screen speaks. */
const KIND_LABELS: Record<string, string> = {
  [AUDIT_EXPORT_KIND]: "Site denetimi raporu",
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
> & { createdBy?: string };

/** True for the label the app stamps on reports it builds itself (old and new). */
export function isAppCreator(createdBy: string | undefined): boolean {
  return (
    createdBy === APP_REPORT_CREATOR || createdBy === LEGACY_APP_REPORT_CREATOR
  );
}

/** An empty string means "none", the same as null. */
function present(value: string | null): string | null {
  return value === null || value === "" ? null : value;
}

/** True when the report followed a template. */
export function hasTemplate(report: Pick<ReportLike, "templateName">): boolean {
  return present(report.templateName) !== null;
}

/**
 * What tells two reports on one site apart: the template, else the skill. A
 * report with neither that the app itself saved (not an agent)
 * is the audit download.
 */
export function reportKind(report: ReportLike): string {
  const named = present(report.templateName) ?? present(report.skill);
  if (named !== null) return named;
  return isAppCreator(report.createdBy) ? AUDIT_EXPORT_KIND : OTHER_KIND;
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
      return hasTemplate(report);
    case "skill":
      return !hasTemplate(report) && present(report.skill) !== null;
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
