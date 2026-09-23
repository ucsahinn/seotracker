/**
 * The one pill that says what state something is in.
 *
 * Lifted out of the integration cards when the agent setup page needed the
 * same vocabulary with different words. The labels differ by call site on
 * purpose — "Bağlı" is right for a stored credential and wrong for an MCP
 * client, which has no session to be connected *to* — but the class strings
 * must not, which is the whole reason this is one component.
 *
 * The tone is never the only carrier: the label is always rendered beside the
 * dot, so the state survives for anyone who cannot resolve the hue.
 */
type Tone = "success" | "warning" | "neutral";

const PILL: Record<Tone, string> = {
  success: "border-success/30 bg-success/10 text-[var(--ink-success)]",
  warning: "border-warning/30 bg-warning/10 text-[var(--ink-warning)]",
  neutral: "border-base-300 bg-base-200 text-muted",
};

const DOT: Record<Tone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  // A fill, not text, so a hand-picked alpha is correct here.
  neutral: "bg-base-content/40",
};

export function StatusPill({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${PILL[tone]}`}
    >
      <span className={`size-1.5 rounded-full ${DOT[tone]}`} aria-hidden />
      {label}
    </span>
  );
}
