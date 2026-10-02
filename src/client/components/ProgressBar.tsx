import {
  CheckCircle2,
  Circle,
  Loader2,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { formatCount, formatPercent } from "@/shared/format";

/**
 * Determinate / indeterminate progress with a state that is never colour only.
 *
 * ProgressBar props
 *   label      what is progressing (also the accessible name)
 *   value      current amount (ignored with `indeterminate`)
 *   max        total, default 100; "N / M" is shown when `showCount`
 *   state      "running" | "done" | "warning" | "error" (icon + word + colour)
 *   indeterminate  unknown length; static tinted bar under reduced motion
 *   showCount  prints "N / M"; showPercent (default true) prints "%NN"
 *   eta        free text such as "yaklaşık 2 dk kaldı"
 *   valueText  override the Turkish aria-valuetext
 * Motion is CSS only (transform scaleX); under reduced motion the root gets
 * `is-static` and the fill simply sits at its value.
 *
 * Example
 *   <ProgressBar label="Tarama" value={42} max={120} showCount eta="~3 dk" />
 *
 * StepProgress props
 *   steps      string[] labels; current  0-based active index; state as above
 *   (current === steps.length means every step is done)
 */
type ProgressState = "running" | "done" | "warning" | "error";

const STATE_TEXT: Record<ProgressState, string> = {
  running: "Sürüyor",
  done: "Tamamlandı",
  warning: "Uyarı",
  error: "Hata",
};
const FILL: Record<ProgressState, string> = {
  running: "bg-primary",
  done: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};
const INK: Record<ProgressState, string> = {
  running: "text-[var(--ink-primary)]",
  done: "text-[var(--ink-success)]",
  warning: "text-[var(--ink-warning)]",
  error: "text-[var(--ink-error)]",
};

function StateIcon({ state }: { state: ProgressState }) {
  const cls = "size-3.5 shrink-0";
  if (state === "done") return <CheckCircle2 className={cls} aria-hidden />;
  if (state === "warning") return <TriangleAlert className={cls} aria-hidden />;
  if (state === "error") return <XCircle className={cls} aria-hidden />;
  return <Loader2 className={`${cls} animate-spin`} aria-hidden />;
}

export function ProgressBar({
  label,
  value = 0,
  max = 100,
  state = "running",
  indeterminate = false,
  showCount = false,
  showPercent = true,
  eta,
  valueText,
}: {
  label: string;
  value?: number;
  max?: number;
  state?: ProgressState;
  indeterminate?: boolean;
  showCount?: boolean;
  showPercent?: boolean;
  eta?: string;
  valueText?: string;
}) {
  const reduced = useReducedMotion();
  const ratio =
    max > 0 && Number.isFinite(value)
      ? Math.min(1, Math.max(0, value / max))
      : 0;
  const active = state === "running";
  const unknown = indeterminate && active;
  const percent = formatPercent(ratio, 0);
  const count = `${formatCount(value)} / ${formatCount(max)}`;
  const text =
    valueText ??
    [STATE_TEXT[state], unknown ? null : count, unknown ? null : percent, eta]
      .filter((part) => part !== null && part !== undefined)
      .join(", ");

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-xs">
        <span className="min-w-0 truncate font-medium text-base-content">
          {label}
        </span>
        <span className={`flex items-center gap-1 tabular-nums ${INK[state]}`}>
          <StateIcon state={state} />
          <span>{STATE_TEXT[state]}</span>
          {unknown ? null : (
            <span className="text-muted">
              {showCount ? ` ${count}` : ""}
              {showPercent ? ` ${percent}` : ""}
            </span>
          )}
          {eta ? <span className="text-muted"> {eta}</span> : null}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={unknown ? undefined : value}
        aria-valuetext={text}
        className={`progress-track${reduced ? " is-static" : ""}`}
      >
        <div
          className={`progress-fill ${FILL[state]}${
            active && !unknown ? " progress-active" : ""
          }${unknown ? " progress-indeterminate" : ""}`}
          style={unknown ? undefined : { transform: `scaleX(${ratio})` }}
        />
      </div>
    </div>
  );
}

export function StepProgress({
  steps,
  current,
  state = "running",
}: {
  steps: string[];
  current: number;
  state?: ProgressState;
}) {
  return (
    <ol className="flex flex-col gap-2 text-sm">
      {steps.map((step, index) => {
        const done = index < current;
        const isCurrent = index === current;
        const stepState: ProgressState = isCurrent ? state : "done";
        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className={`flex items-center gap-2 ${
              done || isCurrent ? INK[stepState] : "text-subtle"
            }`}
          >
            {done || isCurrent ? (
              <StateIcon state={stepState} />
            ) : (
              <Circle className="size-3.5 shrink-0" aria-hidden />
            )}
            <span className={isCurrent ? "font-medium" : ""}>{step}</span>
            <span className="sr-only">
              {done
                ? ` (${STATE_TEXT.done})`
                : isCurrent
                  ? ` (${STATE_TEXT[state]})`
                  : " (bekliyor)"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
