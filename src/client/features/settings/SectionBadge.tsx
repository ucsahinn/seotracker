import { StatusPill } from "@/client/components/StatusPill";
import type { SectionBadge as Badge } from "./sectionStatus";

/**
 * `StatusPill` plus, for a credential that is in place, a slow ring on its
 * dot. The ring is decoration only (the label carries the state) and is
 * switched off under `prefers-reduced-motion`.
 */
function SectionBadge({ badge }: { badge: Badge | null }) {
  if (!badge) return <span className="skeleton h-6 w-24 rounded-full" />;

  return (
    <span className="relative inline-flex shrink-0">
      <StatusPill tone={badge.tone} label={badge.label} />
      {badge.live ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-2.5 -mt-[3px] size-1.5 rounded-full bg-success opacity-60 motion-safe:animate-ping"
        />
      ) : null}
    </span>
  );
}

/** Heading on the left, state on the right, wrapping on a phone. */
export function SectionHeaderRow({
  children,
  badge,
}: {
  children: React.ReactNode;
  badge: Badge | null;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      {children}
      <SectionBadge badge={badge} />
    </div>
  );
}
