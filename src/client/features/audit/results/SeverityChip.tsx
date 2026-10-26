import {
  CheckCircle2,
  CircleDashed,
  Info,
  OctagonAlert,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { IssueSeverity } from "@/shared/audit-issues";
import { t } from "@/shared/i18n";
import { SEVERITY_LABEL } from "./issueGroups";

/*
 * The one pill for a state on the audit screens: a severity, a passed check,
 * something that could not be measured. Each carries a word and a shape, so
 * the state never rests on the hue (an octagon, a triangle and a circle read
 * apart in greyscale). A tinted chip takes the severity's ink, not its fill:
 * the fill on a 10% wash of itself lands near 2.5:1.
 */
type ChipTone = IssueSeverity | "passed" | "unmeasured";

const TONE: Record<ChipTone, { className: string; Icon: LucideIcon }> = {
  critical: {
    className: "border-error/30 bg-error/10 text-[var(--ink-error)]",
    Icon: OctagonAlert,
  },
  warning: {
    className: "border-warning/30 bg-warning/10 text-[var(--ink-warning)]",
    Icon: TriangleAlert,
  },
  info: {
    className: "border-[var(--hairline-strong)] bg-base-200 text-muted",
    Icon: Info,
  },
  passed: {
    className: "border-success/30 bg-success/10 text-[var(--ink-success)]",
    Icon: CheckCircle2,
  },
  unmeasured: {
    className: "border-[var(--hairline-strong)] text-subtle",
    Icon: CircleDashed,
  },
};

/** The severity's shape on its own, for a row that already says the word nearby. */
export function SeverityIcon({
  severity,
  className = "size-3.5",
}: {
  severity: IssueSeverity;
  className?: string;
}) {
  const Icon = TONE[severity].Icon;
  const ink =
    severity === "critical"
      ? "var(--ink-error)"
      : severity === "warning"
        ? "var(--ink-warning)"
        : "var(--text-subtle)";
  return (
    <Icon
      aria-hidden
      className={`shrink-0 ${className}`}
      style={{ color: ink }}
    />
  );
}

export function StatusChip({
  tone,
  children,
  title,
}: {
  tone: ChipTone;
  children: ReactNode;
  title?: string;
}) {
  const { className, Icon } = TONE[tone];
  return (
    <span
      title={title}
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4 tabular-nums ${className}`}
    >
      <Icon aria-hidden className="size-3" />
      {children}
    </span>
  );
}

export function SeverityChip({ severity }: { severity: IssueSeverity }) {
  return <StatusChip tone={severity}>{t(SEVERITY_LABEL[severity])}</StatusChip>;
}
