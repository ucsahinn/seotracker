import type * as React from "react";
import { t } from "@/shared/i18n";

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
    <section className="flex flex-col gap-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 px-4">
        <div className="min-w-0 max-w-[75ch]">
          <h3 className="text-base font-semibold">{title}</h3>
          {description || note ? (
            <details className="text-sm text-muted">
              <summary className="min-h-11 cursor-pointer py-3">
                {t("Veri hakkında")}
              </summary>
              <div className="max-w-prose space-y-1.5 leading-relaxed">
                {description ? <p>{description}</p> : null}
                {note ? <p>{note}</p> : null}
              </div>
            </details>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
