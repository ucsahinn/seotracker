import type * as React from "react";

/** One block inside a tab: a title, what it holds, and the block. */
export function Section({
  title,
  description,
  note,
  action,
  children,
}: {
  title: string;
  description?: string;
  /** A short qualifier under the description: a cap, a base, a caveat. */
  note?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 py-4">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 px-4">
        <div className="min-w-0 max-w-[75ch]">
          <h3 className="text-sm font-medium">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-xs text-muted">{description}</p>
          ) : null}
          {note ? <p className="mt-0.5 text-xs text-subtle">{note}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
