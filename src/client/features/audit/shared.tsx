import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

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
  formatDate,
  formatDateTime as formatStartedAt,
} from "@/client/lib/format";

export function StatusBadge({ status }: { status: string }) {
  if (status === "running") {
    return (
      <span className="badge badge-info badge-sm gap-1">
        <Loader2 className="size-3 animate-spin" /> Sürüyor
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className="badge badge-sm gap-1 border-success/30 bg-success/10 text-[var(--ink-success)]">
        <CheckCircle className="size-3" /> Bitti
      </span>
    );
  }

  return (
    <span className="badge badge-error badge-sm gap-1">
      <AlertCircle className="size-3" /> Başarısız
    </span>
  );
}

export function HttpStatusBadge({ code }: { code: number | null }) {
  if (!code) return <span className="badge badge-ghost badge-sm">-</span>;
  if (code >= 200 && code < 300) {
    return <span className="badge badge-success badge-sm">{code}</span>;
  }
  if (code >= 300 && code < 400) {
    return <span className="badge badge-warning badge-sm">{code}</span>;
  }
  return <span className="badge badge-error badge-sm">{code}</span>;
}

export function LighthouseScoreBadge({ score }: { score: number | null }) {
  if (score == null) {
    return <span className="text-xs text-muted">-</span>;
  }
  const color =
    score >= 90 ? "text-success" : score >= 50 ? "text-warning" : "text-error";
  return <span className={`font-medium text-sm ${color}`}>{score}</span>;
}
