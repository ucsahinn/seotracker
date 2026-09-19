import type { LucideIcon } from "lucide-react";
import * as React from "react";

/**
 * What a screen shows before it has anything to show.
 *
 * Empty states were a grey sentence in a dashed box. An empty screen is the
 * first thing a new install shows, so it gets the same care as a full one:
 * say what belongs here, say why it is empty, and put the one action that
 * fills it within reach.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
}: {
  icon?: LucideIcon;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "gap-2 px-4 py-8" : "gap-3 px-6 py-14"
      }`}
    >
      {Icon ? (
        <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-base-200 text-muted">
          <Icon className="size-5" strokeWidth={1.5} aria-hidden />
        </div>
      ) : null}
      <p className="text-sm font-medium text-base-content/80">{title}</p>
      {description ? (
        <p className="max-w-sm text-sm text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
