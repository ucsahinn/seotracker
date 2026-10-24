import { AlertCircle, RotateCw } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { t } from "@/shared/i18n";

/*
 * Only a request that never got an answer means the app is unreachable. A
 * server function that answered with an error code reached the app, and its
 * code (a Google failure, a quota, a bug) says what actually went wrong --
 * telling that operator to check the app is running sent them the wrong way.
 * Browsers word the fetch failure differently: Chrome "Failed to fetch",
 * Firefox "NetworkError ...", Safari "Load failed".
 */
function isNetworkFailure(error: unknown): boolean {
  return (
    error instanceof TypeError &&
    /failed to fetch|networkerror|load failed/i.test(error.message)
  );
}

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
  title = t("Bu bölüm yüklenemedi"),
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
      description={
        isNetworkFailure(error)
          ? t(
              "Uygulamaya ulaşılamadı. Uygulamanın açık olduğunu kontrol edip yeniden deneyin.",
            )
          : getStandardErrorMessage(error)
      }
      compact={compact}
      action={
        onRetry ? (
          <button
            type="button"
            className="btn btn-sm gap-1.5"
            onClick={onRetry}
          >
            <RotateCw className="size-4" />
            {t("Tekrar dene")}
          </button>
        ) : null
      }
    />
  );
}
