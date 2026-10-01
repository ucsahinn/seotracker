import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import {
  auditScoreBand,
  auditScoreTier,
  scoreAudit,
} from "@/shared/auditScore";
import {
  getIssueDescriptor,
  resolveIssueSeverity,
} from "@/shared/audit-issues";
import { formatDecimal } from "@/client/lib/format";
import type { AuditResultsData } from "@/client/features/audit/results/types";

/**
 * The site's health as one number, and what to do to raise it.
 *
 * A list of findings tells you what is wrong and leaves "how am I doing" and
 * "what should I fix first" to the reader. This answers both: the ring is the
 * first, and the three rows under it are the second — ordered by how many
 * points each fix gives back, which is the order an operator should work in.
 *
 * 100 only appears when nothing is left to fix (see `scoreAudit`), so the
 * target is honest: fix what it lists and the number reaches the top.
 */

const SHOWN = 3;

function ringColor(score: number): string {
  const band = auditScoreBand(score);
  if (band === "good") return "var(--color-success)";
  if (band === "fair") return "var(--color-warning)";
  return "var(--color-error)";
}

function verdict(score: number): string {
  if (score === 100) return "Eksiksiz. Düzeltilecek bir şey kalmadı.";
  switch (auditScoreTier(score)) {
    case "excellent":
      return "Çok iyi. Birkaç küçük iş kaldı.";
    case "good":
      return "İyi. Birkaç düzeltme puanı yükseltir.";
    case "fair":
      return "Orta. Önce kritik sorunlara bakın.";
    case "poor":
      return "Zayıf. Google'ın sitenizi anlamasını engelleyen sorunlar var.";
  }
}

export function ScoreCard({
  issues,
  pagesCrawled,
  onOpenIssues,
}: {
  issues: AuditResultsData["issues"];
  pagesCrawled: number;
  onOpenIssues: () => void;
}) {
  const { score, gains } = useMemo(() => {
    // Distinct pages per finding type. A finding with no page (robots.txt,
    // the sitemap) describes the whole site, so it counts as every page.
    const pagesByType = new Map<
      string,
      {
        severity: ReturnType<typeof resolveIssueSeverity>;
        pages: Set<string>;
        site: boolean;
      }
    >();
    for (const issue of issues) {
      const entry = pagesByType.get(issue.issueType) ?? {
        severity: resolveIssueSeverity(issue),
        pages: new Set<string>(),
        site: false,
      };
      if (issue.pageId) entry.pages.add(issue.pageId);
      else entry.site = true;
      pagesByType.set(issue.issueType, entry);
    }

    return scoreAudit(
      [...pagesByType].map(([issueType, entry]) => ({
        issueType,
        severity: entry.severity,
        pages: entry.site ? pagesCrawled : entry.pages.size,
      })),
      pagesCrawled,
    );
  }, [issues, pagesCrawled]);

  if (score === null) return null;

  const circumference = 2 * Math.PI * 34;

  return (
    <section className="flex flex-col gap-5 rounded-box border border-base-300 bg-base-100 p-5 shadow-[var(--shadow-raise)] sm:flex-row sm:items-center">
      <div className="relative size-24 shrink-0">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            strokeWidth="7"
            className="stroke-base-200"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            stroke={ringColor(score)}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            /*
             * The ring draws itself once, on arrival. `transition` rather
             * than a keyframe so a re-render with a new score glides to it
             * instead of restarting.
             */
            style={{
              transition:
                "stroke-dashoffset 900ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tabular-nums">{score}</span>
          <span className="text-xs text-muted">/ 100</span>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-medium">Site puanı</h2>
        <p className="mt-0.5 text-sm text-muted">{verdict(score)}</p>

        {gains.length > 0 ? (
          <ul className="mt-3 space-y-1.5">
            {gains.slice(0, SHOWN).map((gain) => (
              <li key={gain.issueType}>
                <button
                  type="button"
                  onClick={onOpenIssues}
                  className="group flex w-full items-center gap-3 rounded-field px-2 py-1.5 text-left transition-colors hover:bg-base-200/50"
                >
                  <span
                    className="min-w-0 flex-1 truncate text-sm"
                    title={
                      getIssueDescriptor(gain.issueType)?.title ??
                      gain.issueType
                    }
                  >
                    {getIssueDescriptor(gain.issueType)?.title ??
                      gain.issueType}
                  </span>
                  <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--ink-success)]">
                    +{formatDecimal(gain.points)} puan
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
