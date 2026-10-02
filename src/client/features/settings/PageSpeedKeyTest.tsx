import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import * as React from "react";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { testPageSpeedKey } from "@/serverFunctions/pagespeedKey";

/** The button stays off this long after a click, whatever the answer was. */
const COOLDOWN_MS = 10_000;

/**
 * "Anahtarı test et": one real PageSpeed request for a fixed public page.
 *
 * It spends one request of the key's quota, so it says so on the button's
 * label, is disabled while a test is in flight, and stays disabled for ten
 * seconds afterwards. The server answers with a state and a fixed sentence:
 * the key itself never comes back.
 */
export function PageSpeedKeyTest() {
  const queryClient = useQueryClient();
  const [coolingDown, setCoolingDown] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const test = useMutation({
    mutationFn: () => testPageSpeedKey(),
    onMutate: () => {
      setCoolingDown(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCoolingDown(false), COOLDOWN_MS);
    },
    // Prefix match: every project's quota card re-reads, since the settings
    // page has no single project.
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["quotaStatus"] }),
  });

  const result = test.data;
  const failure = test.isError ? getStandardErrorMessage(test.error) : null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <button
          type="button"
          className="btn btn-sm gap-1.5"
          disabled={test.isPending || coolingDown}
          onClick={() => test.mutate()}
        >
          {test.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : null}
          Anahtarı test et
        </button>
        <span className="text-xs text-subtle">1 ölçüm harcar</span>
      </div>
      <div aria-live="polite">
        {result ? (
          <p
            className={`flex items-start gap-1.5 text-sm ${
              result.ok
                ? "text-[var(--ink-success)]"
                : "text-[var(--ink-error)]"
            }`}
          >
            {result.ok ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            ) : (
              <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            )}
            {result.message}
          </p>
        ) : null}
        {failure ? (
          <p className="flex items-start gap-1.5 text-sm text-[var(--ink-error)]">
            <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {failure}
          </p>
        ) : null}
      </div>
    </div>
  );
}
