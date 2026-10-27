import { useEffect, useRef, type ReactNode } from "react";
import { StatusPill } from "@/client/components/StatusPill";
import { t } from "@/shared/i18n";

type IntegrationConnectionStatus =
  | "connected"
  | "disconnected"
  | "setup_required";

/** Shared shell for first-party connection cards such as GSC and GA4. */
export function IntegrationConnectionCard({
  title,
  icon,
  status,
  children,
  managingProperty = false,
}: {
  managingProperty?: boolean;
  title: string;
  icon?: ReactNode;
  status?: IntegrationConnectionStatus;
  children: ReactNode;
}) {
  const card = useRef<HTMLDivElement>(null);
  const previous = useRef(status);
  const previousManaging = useRef(managingProperty);
  useEffect(() => {
    if (
      (previous.current === "connected" && status === "disconnected") ||
      (previousManaging.current && !managingProperty)
    ) {
      const control =
        card.current?.querySelector<HTMLElement>("[data-google-change]") ??
        card.current?.querySelector<HTMLElement>(
          "button:not(:disabled), a[href]",
        );
      (control ?? card.current)?.focus();
    }
    previous.current = status;
    previousManaging.current = managingProperty;
  }, [status, managingProperty]);
  return (
    <div
      ref={card}
      tabIndex={-1}
      className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]"
    >
      <div className="flex flex-col items-start justify-between gap-3 p-5 sm:flex-row sm:gap-4 sm:p-6">
        <div className="flex min-w-0 items-center gap-2.5">
          {icon ? (
            <span className="grid size-8 shrink-0 place-items-center rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
              {icon}
            </span>
          ) : null}
          <h2 className="text-base font-semibold leading-tight">{title}</h2>
        </div>
        {status ? <ConnectionStatusPill status={status} /> : null}
      </div>
      <div className="border-t border-base-300 p-5 sm:p-6">{children}</div>
    </div>
  );
}

function ConnectionStatusPill({
  status,
}: {
  status: IntegrationConnectionStatus;
}) {
  if (status === "connected") {
    return <StatusPill tone="neutral" label={t("Mülk seçili")} />;
  }
  // "setup_required" says nothing the setup banner beside it does not, so it
  // gets no pill of its own.
  if (status === "setup_required") return null;
  return <StatusPill tone="neutral" label={t("Bağlı değil")} />;
}
