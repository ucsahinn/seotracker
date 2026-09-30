import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { IssueSeverity } from "@/shared/audit-issues";
import { IssueCard } from "@/client/features/audit/results/IssueCard";
import { IssueWorkloadChart } from "@/client/features/audit/results/IssueWorkloadChart";
import { SeverityDonut } from "@/client/features/audit/results/SeverityDonut";
import {
  applyIssueFilters,
  countBySeverity,
  groupIssues,
  SEVERITY_LABEL,
  type AuditIssueRow,
} from "@/client/features/audit/results/issueGroups";

export { SEVERITY_LABEL };

const SEVERITY_DOT: Record<IssueSeverity, string> = {
  critical: "bg-error",
  warning: "bg-warning",
  info: "bg-base-content/30",
};

const SEVERITY_ORDER: IssueSeverity[] = ["critical", "warning", "info"];

export function IssuesView({
  issues,
  focusUrl,
  onClearFocus,
  onShowPages,
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
  /** Carries one problem's pages to the Sayfalar tab as a filter. */
  onShowPages: (urls: string[], label: string) => void;
}) {
  const scoped = useMemo(
    () =>
      focusUrl ? issues.filter((issue) => issue.pageUrl === focusUrl) : issues,
    [focusUrl, issues],
  );
  const groups = useMemo(() => groupIssues(scoped), [scoped]);
  const [severity, setSeverity] = useState<IssueSeverity | null>(null);
  const [issueType, setIssueType] = useState<string | null>(null);

  /*
   * The ring and the bars are drawn from every group, not the narrowed ones:
   * a chart that shrank to what you had just clicked would leave nothing to
   * click next.
   *
   * Findings, not pages, in the ring. `pageCount` is the *distinct pages* a
   * type affects, so summing it gave 63 under a ring labelled "bulgu" while
   * the list counted 65 records -- two different true numbers presented as
   * one.
   */
  const severityCounts = useMemo(() => countBySeverity(groups), [groups]);
  const shown = useMemo(
    () => applyIssueFilters(groups, { severity, issueType }),
    [groups, severity, issueType],
  );
  const sections = useMemo(
    () =>
      SEVERITY_ORDER.map((level) => ({
        severity: level,
        groups: shown.filter((group) => group.severity === level),
      })).filter((section) => section.groups.length > 0),
    [shown],
  );
  const issueTypeTitle = groups.find(
    (group) => group.issueType === issueType,
  )?.title;

  if (scoped.length === 0 && !focusUrl) {
    return (
      <div className="py-10 text-center text-muted">
        <p className="font-medium">Bu denetimde kayıtlı sorun yok.</p>
        <p className="mt-1 text-sm">
          Site gerçekten iyi durumda olabilir ya da bu denetim, sorun
          kontrolleri eklenmeden önce çalıştırılmış olabilir. Tam raporu görmek
          için yeni bir denetim başlatın.
        </p>
      </div>
    );
  }

  const hasNarrowing = severity !== null || issueType !== null;

  return (
    <div className="space-y-3">
      {/* Both only for the whole audit: narrowed to one page a workload bar
          per issue type reads "1, 1, 1" and a severity ring is three slivers
          of one finding each. */}
      {focusUrl ? null : (
        <div className="grid gap-3 lg:grid-cols-[1fr_minmax(0,24rem)]">
          <IssueWorkloadChart
            groups={groups}
            selectedType={issueType}
            onSelect={setIssueType}
          />
          <SeverityDonut
            counts={severityCounts}
            selected={severity}
            onSelect={setSeverity}
          />
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
      {hasNarrowing ? (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted">Gösterilen:</span>
          {severity ? (
            <FilterChip
              label={SEVERITY_LABEL[severity]}
              onRemove={() => setSeverity(null)}
            />
          ) : null}
          {issueType ? (
            <FilterChip
              label={issueTypeTitle ?? issueType}
              onRemove={() => setIssueType(null)}
            />
          ) : null}
        </div>
      ) : null}
      {sections.length === 0 ? (
        <div className="rounded-box border border-base-300 py-10 text-center text-muted">
          <p className="font-medium">
            {hasNarrowing
              ? "Seçtiğiniz kombinasyonda sorun yok."
              : "Bu sayfada kayıtlı sorun yok."}
          </p>
          {hasNarrowing ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm mt-2"
              onClick={() => {
                setSeverity(null);
                setIssueType(null);
              }}
            >
              Seçimi temizle
            </button>
          ) : null}
        </div>
      ) : (
        <div className="overflow-hidden rounded-box border border-base-300">
          {sections.map((section) => (
            <div
              key={section.severity}
              className="border-t border-base-300 first:border-t-0"
            >
              <div className="flex items-center gap-2 border-b border-base-300/60 bg-base-200/60 px-4 py-1.5">
                <span
                  className={`size-1.5 rounded-full ${SEVERITY_DOT[section.severity]}`}
                />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {SEVERITY_LABEL[section.severity]}
                </span>
              </div>
              <div className="divide-y divide-base-300/60">
                {section.groups.map((group) => (
                  <IssueCard
                    key={group.issueType}
                    group={group}
                    // One problem left is one problem to read.
                    defaultOpen={issueType !== null}
                    onShowPages={onShowPages}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`${label} seçimini kaldır`}
      className="inline-flex items-center gap-1 rounded-full border border-primary bg-primary/10 px-2.5 py-1 text-primary transition-colors hover:bg-primary/15"
    >
      {label}
      <X aria-hidden className="size-3" />
    </button>
  );
}
