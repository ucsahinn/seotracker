import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { sort } from "remeda";
import { formatCount, formatNumber } from "@/client/lib/format";
import {
  getIssueDescriptor,
  ISSUE_SEVERITY_ORDER,
  type IssueSeverity,
  resolveIssueSeverity,
} from "@/shared/audit-issues";
import type { AuditResultsData } from "@/client/features/audit/results/types";
import { IssueWorkloadChart } from "@/client/features/audit/results/IssueWorkloadChart";
import { SeverityDonut } from "@/client/features/audit/results/SeverityDonut";

type AuditIssueRow = AuditResultsData["issues"][number];

const MAX_RENDERED_URLS = 100;

const SEVERITY_DOT: Record<IssueSeverity, string> = {
  critical: "bg-error",
  warning: "bg-warning",
  info: "bg-base-content/30",
};

const SEVERITY_RULE: Record<IssueSeverity, string> = {
  critical: "border-l-error/60",
  warning: "border-l-warning/60",
  info: "border-l-base-content/20",
};

export const SEVERITY_LABEL: Record<IssueSeverity, string> = {
  critical: "Kritik",
  warning: "Uyarı",
  info: "Bilgi",
};

interface IssueGroup {
  issueType: string;
  severity: IssueSeverity;
  title: string;
  explanation: string;
  howToFix: string;
  issues: AuditIssueRow[];
  /**
   * Distinct pages, not rows.
   *
   * Link-level checks write one row per occurrence -- a page with eight
   * broken links is eight rows -- so printing `issues.length` as "N sayfa"
   * inflated a single page's problem eightfold against the dashboard card
   * the operator had just clicked through from. The repository that every
   * other consumer reads counts `countDistinct(pageUrl)` and says so.
   */
  pageCount: number;
}

function groupIssues(issues: AuditIssueRow[]): IssueGroup[] {
  const groups = new Map<string, IssueGroup>();
  for (const issue of issues) {
    let group = groups.get(issue.issueType);
    if (!group) {
      const descriptor = getIssueDescriptor(issue.issueType);
      group = {
        issueType: issue.issueType,
        severity: resolveIssueSeverity(issue),
        title: descriptor?.title ?? issue.issueType,
        explanation: descriptor?.explanation ?? "",
        howToFix: descriptor?.howToFix ?? "",
        issues: [],
        pageCount: 0,
      };
      groups.set(issue.issueType, group);
    }
    group.issues.push(issue);
  }

  for (const group of groups.values()) {
    group.pageCount = new Set(group.issues.map((issue) => issue.pageUrl)).size;
  }

  return sort(
    Array.from(groups.values()),
    (a, b) =>
      ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity] ||
      // Ordered by pages affected, matching what the row now claims. Rows
      // would put one page with eight broken links above eight pages with
      // one problem each.
      b.pageCount - a.pageCount,
  );
}

export function IssuesView({
  issues,
  focusUrl,
  onClearFocus,
}: {
  issues: AuditIssueRow[];
  /**
   * Narrow to one page's findings.
   *
   * Set when an operator arrives here from a row in the pages table, which
   * previously had no way to reach the findings it was counting.
   */
  focusUrl?: string;
  onClearFocus: () => void;
}) {
  const scoped = useMemo(
    () =>
      focusUrl ? issues.filter((issue) => issue.pageUrl === focusUrl) : issues,
    [focusUrl, issues],
  );
  const groups = useMemo(() => groupIssues(scoped), [scoped]);

  /*
   * Findings, not pages. `pageCount` is the *distinct pages* a type affects,
   * so summing it gave 63 under a ring labelled "bulgu" while the header
   * above counted 65 records -- two different true numbers presented as one.
   * The section headers count records, so this counts records.
   */
  const severityCounts = useMemo(() => {
    const counts = { critical: 0, warning: 0, info: 0 };
    for (const group of groups) counts[group.severity] += group.issues.length;
    return counts;
  }, [groups]);

  const sections = useMemo(
    () =>
      (["critical", "warning", "info"] as const)
        .map((severity) => ({
          severity,
          groups: groups.filter((group) => group.severity === severity),
        }))
        .filter((section) => section.groups.length > 0),
    [groups],
  );

  if (scoped.length === 0 && !focusUrl) {
    return (
      <div className="py-10 text-center text-muted">
        <p className="font-medium">Bu denetimde kayıtlı sorun yok.</p>
        <p className="text-sm mt-1">
          Site gerçekten iyi durumda olabilir ya da bu denetim, sorun
          kontrolleri eklenmeden önce çalıştırılmış olabilir. Tam raporu görmek
          için yeni bir denetim başlatın.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Both only for the whole audit: narrowed to one page a workload bar
          per issue type reads "1, 1, 1" and a severity ring is three slivers
          of one finding each. */}
      {focusUrl ? null : (
        <div className="grid gap-3 lg:grid-cols-[1fr_minmax(0,22rem)]">
          <IssueWorkloadChart groups={groups} />
          <SeverityDonut counts={severityCounts} />
        </div>
      )}
      {focusUrl ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-box border border-base-300 bg-base-200/40 px-3 py-2">
          <span className="min-w-0 truncate text-sm text-muted">
            Yalnızca <span className="font-medium">{focusUrl}</span>
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-xs shrink-0"
            onClick={onClearFocus}
          >
            Tüm sayfaları göster
          </button>
        </div>
      ) : null}
      {sections.length === 0 ? (
        <div className="rounded-box border border-base-300 py-10 text-center text-muted">
          <p className="font-medium">Bu sayfada kayıtlı sorun yok.</p>
        </div>
      ) : (
        <div className="border border-base-300 rounded-box overflow-hidden">
          {sections.map((section) => (
            <IssueSection key={section.severity} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

function IssueSection({
  section,
}: {
  section: { severity: IssueSeverity; groups: IssueGroup[] };
}) {
  const issueCount = section.groups.reduce(
    (sum, group) => sum + group.issues.length,
    0,
  );

  return (
    <div className="border-t border-base-300 first:border-t-0">
      <div className="flex items-center gap-2 bg-base-200/60 px-4 py-1.5 border-b border-base-300/60">
        <span
          className={`size-1.5 rounded-full ${SEVERITY_DOT[section.severity]}`}
        />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          {SEVERITY_LABEL[section.severity]}
        </span>
        <span className="text-[11px] tabular-nums text-muted">
          {formatCount(issueCount)}
        </span>
      </div>
      <div className="divide-y divide-base-300/60">
        {section.groups.map((group) => (
          <IssueRow key={group.issueType} group={group} />
        ))}
      </div>
    </div>
  );
}

function IssueRow({ group }: { group: IssueGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        open
          ? `border-l-2 ${SEVERITY_RULE[group.severity]} bg-base-200/20`
          : "border-l-2 border-l-transparent"
      }
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-base-200/40 transition-colors"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span
          className={`size-2 shrink-0 rounded-full ${SEVERITY_DOT[group.severity]}`}
        />
        <span className="text-sm font-medium flex-1 min-w-0 truncate">
          {group.title}
        </span>
        <span className="text-xs tabular-nums text-muted shrink-0">
          {formatCount(group.pageCount)} sayfa
        </span>
        <ChevronRight
          className={`size-4 shrink-0 text-muted transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pl-9 pr-4 pb-4 pt-0.5 space-y-3">
          {group.explanation && (
            <p className="text-sm text-muted max-w-prose">
              {group.explanation}
            </p>
          )}
          {group.howToFix && (
            <p className="text-sm max-w-prose">
              <span className="font-medium">Nasıl düzeltilir: </span>
              <span className="text-muted">{group.howToFix}</span>
            </p>
          )}
          <AffectedUrlList issues={group.issues} />
        </div>
      )}
    </div>
  );
}

function AffectedUrlList({ issues }: { issues: AuditIssueRow[] }) {
  const rendered = issues.slice(0, MAX_RENDERED_URLS);
  const remaining = issues.length - rendered.length;

  return (
    <div className="max-h-[320px] overflow-y-auto rounded-box border border-base-300/60 bg-base-100">
      {rendered.map((issue) => (
        <div
          key={issue.id}
          className="px-3 py-1.5 text-sm flex flex-col gap-0.5 border-b border-base-300/50 last:border-b-0"
        >
          <a
            className="link link-hover text-muted truncate"
            href={issue.pageUrl}
            target="_blank"
            rel="noreferrer"
            title={issue.pageUrl}
          >
            {issue.pageUrl}
          </a>
          <IssueDetails detailsJson={issue.detailsJson} />
        </div>
      ))}
      {remaining > 0 && (
        <div className="px-3 py-2 text-xs text-muted">
          …ve {formatNumber(remaining)} tane daha. Tam liste için sorunları CSV
          olarak dışa aktarın.
        </div>
      )}
    </div>
  );
}

function parseDetails(detailsJson: string): Array<[string, unknown]> | null {
  try {
    const parsed: unknown = JSON.parse(detailsJson);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return Object.entries(parsed);
    }
    return null;
  } catch {
    return null;
  }
}

function IssueDetails({ detailsJson }: { detailsJson: string | null }) {
  const details = useMemo(
    () => (detailsJson ? parseDetails(detailsJson) : null),
    [detailsJson],
  );

  if (!details) return null;

  const entries = details.filter(
    ([, value]) => value !== null && value !== undefined,
  );
  if (entries.length === 0) return null;

  return (
    <span className="text-xs text-muted truncate">
      {entries
        .map(([key, value]) => {
          const rendered = Array.isArray(value)
            ? value.join(" → ")
            : String(value);
          return `${key}: ${rendered}`;
        })
        .join(" · ")}
    </span>
  );
}
