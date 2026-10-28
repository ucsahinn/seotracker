import { EmptyState } from "@/client/components/EmptyState";
import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { DATA_SERIES } from "@/client/components/Chart";
import { HeaderHelpLabel } from "@/client/features/saved-keywords/components/HeaderHelpLabel";
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
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
        <h2 className="text-sm font-semibold leading-tight">{title}</h2>
        {action}
      </div>
      <div className="border-t border-base-300 p-5">
        {children}
        {stamp ? <p className="mt-4 text-xs text-subtle">{stamp}</p> : null}
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
  return <EmptyState compact title={message} action={cta} />;
}

export function Stat({
  label,
  value,
  tone,
  sub,
  help,
  animateTo,
  metric,
}: {
  label: string;
  metric?: keyof typeof DATA_SERIES;
  /** Count up to this number on first load (reduced motion shows it at once). */
  animateTo?: { value: number; format: (n: number) => string };
  /** A plain-language meaning, shown on hover or focus beside the label. */
  help?: string;
  value: string;
  /*
   * `--ink-*`, not the fill colours: on a base-100 surface `text-success`
   * lands near 2.5:1, which is why the house rule names the ink tokens.
   * No caller passes this today; it is typed correctly so the first one
   * does not have to notice.
   */
  tone?: "success" | "error";
  sub?: React.ReactNode;
}) {
  const toneClass =
    tone === "success"
      ? "text-[var(--ink-success)]"
      : tone === "error"
        ? "text-[var(--ink-error)]"
        : "";
  const style:
    | (React.CSSProperties & { "--metric-color": string })
    | undefined = metric
    ? { "--metric-color": DATA_SERIES[metric] }
    : undefined;
  return (
    <div
      className={metric ? "metric-tile rounded-field p-3" : undefined}
      data-metric={metric}
      style={style}
    >
      <p className="text-xs font-medium text-muted">
        {help ? <HeaderHelpLabel label={label} helpText={help} /> : label}
      </p>
      <p
        className={`metric-value text-2xl font-semibold tabular-nums ${toneClass}`}
      >
        {animateTo ? (
          <AnimatedNumber
            value={animateTo.value}
            format={animateTo.format}
            accessibleText={`${value} ${label}`}
          />
        ) : (
          value
        )}
      </p>
      {sub}
    </div>
  );
}

export const moreDetailsClass = "btn btn-ghost btn-xs";
