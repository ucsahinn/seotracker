import type { ReactNode } from "react";
import { StatusPill } from "@/client/components/StatusPill";

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
}: {
  title: string;
  icon?: ReactNode;
  status?: IntegrationConnectionStatus;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
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
    return <StatusPill tone="success" label="Bağlı" />;
  }
  if (status === "setup_required") {
    return <StatusPill tone="warning" label="Kurulum gerekli" />;
  }
  return <StatusPill tone="neutral" label="Bağlı değil" />;
}
