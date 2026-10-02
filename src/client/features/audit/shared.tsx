import { AlertCircle, CheckCircle } from "lucide-react";
import { lighthouseBand } from "@/shared/lighthouse";

export function extractPathname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

export function extractHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export {
  formatDateTime,
  formatDateTime as formatStartedAt,
} from "@/client/lib/format";

export function StatusBadge({ status }: { status: string }) {
  if (status === "running") {
    return (
      <span className="badge badge-info badge-sm gap-1">
        <span className="dot-live" aria-hidden /> Sürüyor
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className={`badge badge-sm gap-1 ${severityChip.success}`}>
        <CheckCircle className="size-3" /> Bitti
      </span>
    );
  }

  return (
    <span className={`badge badge-sm gap-1 ${severityChip.error}`}>
      <AlertCircle className="size-3" /> Başarısız
    </span>
  );
}

/**
 * One tinted chip for the whole severity family.
 *
 * "Bitti" was a tinted chip and "Başarısız" two lines below it was a solid
 * daisyUI badge, so the audit history table showed the two side by side in
 * two different visual languages. The tinted form is the house one, and it
 * is the readable one: the fill colour on white is around 2.7:1 for warning.
 */
export const severityChip = {
  success: "border-success/30 bg-success/10 text-[var(--ink-success)]",
  warning: "border-warning/30 bg-warning/10 text-[var(--ink-warning)]",
  error: "border-error/30 bg-error/10 text-[var(--ink-error)]",
} as const;

export function HttpStatusBadge({ code }: { code: number | null }) {
  if (!code) return <span className="badge badge-ghost badge-sm">-</span>;
  if (code >= 200 && code < 300) {
    return (
      <span className={`badge badge-sm ${severityChip.success}`}>{code}</span>
    );
  }
  if (code >= 300 && code < 400) {
    return (
      <span className={`badge badge-sm ${severityChip.warning}`}>{code}</span>
    );
  }
  return <span className={`badge badge-sm ${severityChip.error}`}>{code}</span>;
}

export function LighthouseScoreBadge({ score }: { score: number | null }) {
  if (score == null) {
    return <span className="text-xs text-muted">-</span>;
  }
  const color = {
    good: "text-[var(--ink-success)]",
    fair: "text-[var(--ink-warning)]",
    poor: "text-[var(--ink-error)]",
  }[lighthouseBand(score)];
  return <span className={`font-medium text-sm ${color}`}>{score}</span>;
}
