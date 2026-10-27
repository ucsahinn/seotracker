import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, X } from "lucide-react";
import { getPortFallbackStatus } from "@/serverFunctions/portFallback";
import { t } from "@/shared/i18n";
import { portFallbackMessage } from "./portFallbackCopy";

/** Per tab: the next browser session, or the next start, shows it again. */
const DISMISS_KEY = "seowatcher:port-fallback-dismissed";

function readDismissed(): string | null {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY);
  } catch {
    return null;
  }
}

/**
 * The Windows launcher started on another port because the configured one
 * was taken. The tray balloon says so once and is easy to miss; Google
 * sign-in then fails with a redirect mismatch that names neither port, so
 * the app says it on every screen until dismissed.
 */
export function PortFallbackBanner() {
  const query = useQuery({
    queryKey: ["port-fallback"],
    queryFn: () => getPortFallbackStatus(),
    staleTime: Number.POSITIVE_INFINITY,
  });
  const [dismissed, setDismissed] = useState(readDismissed);
  const port = query.data;
  if (!port) return null;
  const pair = `${port.configured}->${port.actual}`;
  if (dismissed === pair) return null;

  const dismiss = () => {
    setDismissed(pair);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, pair);
    } catch {
      // Storage blocked: dismissed for this page view only.
    }
  };

  return (
    <div
      role="status"
      className="flex items-start gap-3 border-b border-[var(--hairline)] bg-warning/10 px-4 py-2.5 text-sm"
    >
      <AlertTriangle
        aria-hidden
        className="mt-0.5 size-4 shrink-0 text-[var(--ink-warning)]"
      />
      <p className="min-w-0 flex-1">{portFallbackMessage(port)}</p>
      <button
        type="button"
        className="btn btn-ghost btn-xs btn-square shrink-0"
        onClick={dismiss}
        aria-label={t("Kapat")}
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
