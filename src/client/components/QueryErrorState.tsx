import { AlertCircle, RotateCw } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { getStandardErrorMessage } from "@/client/lib/error-messages";

/**
 * What a screen shows when its data did not load.
 *
 * Distinct from `EmptyState`, and that distinction is the point: seven
 * screens treated a failed query as an empty one, so a transient 500 told
 * the operator they had no saved keywords, no audits, or no projects. An
 * empty result and a failure look identical in `data ?? []`, and only one of
 * them is worth retrying.
 */
export function QueryErrorState({
  error,
  onRetry,
  title = "Bu bölüm yüklenemedi",
  compact = false,
}: {
  error: unknown;
  onRetry?: () => void;
  title?: string;
  compact?: boolean;
}) {
  return (
    <EmptyState
      icon={AlertCircle}
      title={title}
      description={getStandardErrorMessage(
        error,
        "Bağlantı kurulamadı. Konteyner çalışıyorsa tekrar deneyin.",
      )}
      compact={compact}
      action={
        onRetry ? (
          <button
            type="button"
            className="btn btn-sm gap-1.5"
            onClick={onRetry}
          >
            <RotateCw className="size-4" />
            Tekrar dene
          </button>
        ) : null
      }
    />
  );
}
