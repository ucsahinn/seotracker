import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The way back to a parent screen, in one shape.
 *
 * Four screens hand-rolled this — settings, report templates, the report
 * viewer and the audit detail — each with its own `inline-flex … text-muted`
 * and each placed *above* `PageHeader` rather than passed into it. So the gap
 * between the back link and the title was whatever local `space-y-*` happened
 * to be: three spacings for one pattern, which is the failure the shell was
 * written to end. `PageHeader` renders `eyebrow` directly above the title
 * inside its own `gap-3`, so this goes there.
 *
 * Two exports rather than one component taking a `to`: three of the four are
 * router links whose destination is a literal the router type-checks, and a
 * wrapper generic enough to forward that ends up casting the types away.
 * Sharing the class and the label keeps the treatment identical without
 * pretending to be the router.
 */

export const backLinkClass =
  "inline-flex items-center gap-1 self-start text-sm text-muted transition-colors hover:text-base-content";

/** The chevron and the text, for a caller that brings its own `<Link>`. */
export function BackLinkLabel({ children }: { children: ReactNode }) {
  return (
    <>
      <ChevronLeft aria-hidden className="size-4" />
      {children}
    </>
  );
}

/** The button form, for a parent that is a state change rather than a route. */
export function BackLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={backLinkClass} onClick={onClick}>
      <BackLinkLabel>{children}</BackLinkLabel>
    </button>
  );
}
