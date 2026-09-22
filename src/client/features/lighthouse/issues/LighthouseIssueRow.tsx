import { formatBytes, formatDuration } from "@/client/lib/format";
import { useState, type ReactNode } from "react";
import {
  ChevronRight,
  ExternalLink,
  FileWarning,
  Info,
  TriangleAlert,
} from "lucide-react";
import type { LighthouseIssue } from "./types";
import { categoryLabel } from "./utils";

const SEVERITY_LABELS: Record<"critical" | "warning" | "info", string> = {
  critical: "Kritik",
  warning: "Uyarı",
  info: "Bilgi",
};

export function LighthouseIssueRow({ issue }: { issue: LighthouseIssue }) {
  const [open, setOpen] = useState(false);
  const hasDetails = !!(issue.description || issue.items.length > 0);

  return (
    <>
      <tr
        className={`hover:bg-base-200/50 transition-colors ${hasDetails ? "cursor-pointer" : ""}`}
        onClick={() => hasDetails && setOpen(!open)}
      >
        <td className="py-3 pl-4 pr-2">
          {hasDetails ? (
            <ChevronRight
              className={`size-3.5 text-muted transition-transform ${open ? "rotate-90" : ""}`}
            />
          ) : null}
        </td>
        <td className="py-3 pr-3">
          <span
            className={`badge badge-sm border ${severityBadgeClass(issue.severity)} gap-1`}
          >
            {severityIcon(issue.severity)}
            {SEVERITY_LABELS[issue.severity]}
          </span>
        </td>
        <td className="py-3 pr-3">
          <div>
            <p className="font-medium text-sm leading-snug">{issue.title}</p>
            {issue.displayValue ? (
              <p className="text-xs text-muted mt-0.5">{issue.displayValue}</p>
            ) : null}
          </div>
        </td>
        <td className="py-3 pr-3 hidden sm:table-cell">
          <span className="text-xs text-muted">
            {categoryLabel(issue.category)}
          </span>
        </td>
        <td className="py-3 pr-3 hidden md:table-cell text-right">
          {issue.impactMs != null || issue.impactBytes != null ? (
            <span className="text-xs tabular-nums text-muted">
              {issue.impactMs ? formatDuration(issue.impactMs) : null}
              {issue.impactMs && issue.impactBytes ? " / " : null}
              {issue.impactBytes ? formatBytes(issue.impactBytes) : null}
            </span>
          ) : null}
        </td>
        <td className="py-3 pr-4 text-right">
          {issue.score != null ? (
            <span className="text-xs tabular-nums text-muted">
              {issue.score}
            </span>
          ) : null}
        </td>
      </tr>
      {open ? (
        <tr className="!bg-transparent">
          <td colSpan={6} className="pb-4 pt-2 pl-[8.5rem] pr-4">
            <div className="space-y-3">
              {issue.description ? (
                <div className="text-sm text-muted leading-relaxed">
                  {renderInlineMarkdown(issue.description)}
                </div>
              ) : null}
              {issue.items.length > 0 ? (
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium text-muted text-xs">
                    Etkilenen öğeler ({issue.items.length})
                  </summary>
                  <div className="mt-2 space-y-1.5">
                    {issue.items.map((item, itemIndex) => (
                      <pre
                        key={`${issue.auditKey}-${itemIndex}`}
                        className="bg-base-200/60 p-2 rounded overflow-x-auto text-xs leading-relaxed"
                      >
                        {item}
                      </pre>
                    ))}
                  </div>
                </details>
              ) : null}
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}

function renderInlineMarkdown(markdown: string): ReactNode {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match = linkPattern.exec(markdown);

  while (match) {
    const [raw, label, href] = match;
    const index = match.index;

    if (index > cursor) {
      nodes.push(markdown.slice(cursor, index));
    }

    nodes.push(
      <a
        key={`${href}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link link-primary inline-flex items-center gap-1"
      >
        {label}
        <ExternalLink className="size-3" />
      </a>,
    );

    cursor = index + raw.length;
    match = linkPattern.exec(markdown);
  }

  if (cursor < markdown.length) {
    nodes.push(markdown.slice(cursor));
  }

  return nodes.length ? nodes : markdown;
}

function severityBadgeClass(severity: "critical" | "warning" | "info") {
  if (severity === "critical") {
    return "border-error/30 bg-error/10 text-[var(--ink-error)]";
  }
  if (severity === "warning") {
    return "border-warning/35 bg-warning/10 text-[var(--ink-warning)]";
  }
  return "border-info/30 bg-info/10 text-info/80";
}

function severityIcon(severity: "critical" | "warning" | "info") {
  if (severity === "critical") return <FileWarning className="size-3" />;
  if (severity === "warning") return <TriangleAlert className="size-3" />;
  return <Info className="size-3" />;
}
