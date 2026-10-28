import { sort } from "remeda";
import {
  APP_REPORT_CREATOR,
  LEGACY_APP_REPORT_CREATOR,
} from "@/shared/report-creator";
import type { ReportListItem } from "@/serverFunctions/reports";
import { getLocale, t } from "@/shared/i18n";

/** Reports with no template and no skill share this one label. */
export const OTHER_KIND = "Belirtilmemiş";

/** The kind of the report the Site denetimi screen saves from its download button. */
export const AUDIT_EXPORT_KIND = "site-audit-export";
export const UNKNOWN_APP_KIND = "app-kind-unknown";

/** The skill names agents write, said the way the rest of the screen speaks. */
// Turkish source text, translated where it renders (kindLabel).
const KIND_LABELS: Record<string, string> = {
  "search-performance-export": "Arama performansı raporu",
  [AUDIT_EXPORT_KIND]: "Site denetimi raporu",
  [UNKNOWN_APP_KIND]: "Uygulama raporu, tür kaydedilmemiş",
  __other: "Diğer türler",
  "seo-audit": "SEO denetimi",
  "seo-check-in": "Dönem karşılaştırması",
  "seo-triage": "Trafik düşüşü incelemesi",
  "seo-report": "SEO raporu",
  "seo-coach": "Koçluk notu",
  "seo-project-setup": "Proje kurulumu",
};

/** What a person reads for a kind; an unknown kind keeps its own name. */
export function kindLabel(kind: string): string {
  const label = KIND_LABELS[kind] ?? (kind === OTHER_KIND ? kind : null);
  return label === null ? kind : t(label);
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

type ReportFilter = "all" | "recent" | "template" | "skill" | "audit";

type ReportLike = Pick<
  ReportListItem,
  "templateName" | "skill" | "updatedAt" | "sizeBytes"
> & { createdBy?: string; nativeKind?: ReportListItem["nativeKind"] };

/** True for the label the app stamps on reports it builds itself (old and new). */
export function isAppCreator(createdBy: string | undefined): boolean {
  return (
    createdBy === APP_REPORT_CREATOR || createdBy === LEGACY_APP_REPORT_CREATOR
  );
}

/** Legacy app exports appended a UUID for uniqueness; keep it in storage, not the reading title. */
export function displayReportTitle(report: {
  title: string;
  createdBy?: string;
}): string {
  return isAppCreator(report.createdBy)
    ? report.title.replace(
        / · [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        "",
      )
    : report.title;
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
 * Legacy native reports share a creator marker across Search and Audit.
 * Without explicit source metadata their type must remain unknown.
 */
export function reportKind(report: ReportLike): string {
  if (report.nativeKind) return report.nativeKind;
  const named = present(report.templateName) ?? present(report.skill);
  if (named !== null) return named;
  return isAppCreator(report.createdBy) ? UNKNOWN_APP_KIND : OTHER_KIND;
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
    case "audit":
      // The audit download has neither, so it fell in no chip and the chips
      // did not add up to "Tümü".
      return reportKind(report) === AUDIT_EXPORT_KIND;
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
    audit: reports.filter((r) => matchesFilter(r, "audit", now)).length,
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
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], getLocale()),
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
        {
          key: "__other",
          label: t("Diğer türler"),
          value: rest,
          disabled: true,
        },
      ]
    : head;
}

/** The most recently updated report (id and time), or null for an empty list. */
export function latestUpdate<Row extends { id: string; updatedAt: string }>(
  reports: Row[],
): Row | null {
  return reports.reduce<Row | null>(
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
