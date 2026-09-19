// Shared building blocks for the dashboard cards. Same visual language as the
// GSC IntegrationCard (rounded-box, hairline, raise shadow) so the embedded
// SearchConsoleConnectionCard doesn't read as a different design system.
export { formatDay } from "@/client/lib/format";

export function CardShell({
  title,
  stamp,
  action,
  children,
}: {
  title: string;
  stamp?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <h2 className="text-sm font-semibold leading-tight">{title}</h2>
        {action}
      </div>
      <div className="border-t border-base-300 p-5">
        {children}
        {stamp ? (
          <p className="mt-4 text-[11px] text-[var(--text-subtle)]">{stamp}</p>
        ) : null}
      </div>
    </div>
  );
}

export function EmptyCardBody({
  message,
  cta,
}: {
  message: string;
  cta: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-sm text-base-content/70">{message}</p>
      {cta}
    </div>
  );
}

export function Stat({
  label,
  value,
  tone,
  sub,
}: {
  label: string;
  value: string;
  tone?: "success" | "error";
  sub?: React.ReactNode;
}) {
  const toneClass =
    tone === "success" ? "text-success" : tone === "error" ? "text-error" : "";
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
        {label}
      </p>
      <p className={`text-2xl font-semibold tabular-nums ${toneClass}`}>
        {value}
      </p>
      {sub}
    </div>
  );
}

export function PercentDelta({
  current,
  previous,
}: {
  current: number;
  previous: number;
}) {
  if (previous <= 0) return null;
  const pct = ((current - previous) / previous) * 100;
  if (!Number.isFinite(pct)) return null;
  const rounded = Math.round(pct);
  const tone = rounded > 0 ? "text-success" : rounded < 0 ? "text-error" : "";
  return (
    <p className={`text-xs tabular-nums ${tone}`}>
      {rounded > 0 ? "▲" : rounded < 0 ? "▼" : ""} {Math.abs(rounded)}%
    </p>
  );
}

export const moreDetailsClass = "btn btn-ghost btn-xs";
