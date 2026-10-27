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
