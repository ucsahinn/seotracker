import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  googleOAuthClientStatusOptions,
  googleServiceAccountStatusOptions,
  updateStatusOptions,
} from "@/client/features/settings/settingsQueries";
import { getDiagnostics } from "@/serverFunctions/diagnostics";

const diagnosticsOptions = () =>
  queryOptions({
    queryKey: ["diagnostics"],
    queryFn: () => getDiagnostics(),
    retry: false,
    staleTime: 0,
  });

/**
 * Everything the help screen says about this install, read through the same
 * query keys the settings screen uses, so the two never disagree and a
 * refresh here also refreshes there.
 *
 * `googleReady` is null until both reads have answered: an unknown state must
 * not be reported as "missing".
 */
export function useSetupSnapshot() {
  const diagnostics = useQuery(diagnosticsOptions());
  const oauth = useQuery(googleOAuthClientStatusOptions());
  const serviceAccount = useQuery(googleServiceAccountStatusOptions());
  const update = useQuery(updateStatusOptions());

  const googleReady =
    oauth.data && serviceAccount.data
      ? oauth.data.source !== null || Boolean(serviceAccount.data.clientEmail)
      : null;

  const isFetching =
    diagnostics.isFetching ||
    oauth.isFetching ||
    serviceAccount.isFetching ||
    update.isFetching;

  const refresh = () =>
    // Not the update check: `getUpdateStatus` may call GitHub when it is due,
    // and a refresh button should not be what triggers an outbound request.
    void Promise.all([
      diagnostics.refetch(),
      oauth.refetch(),
      serviceAccount.refetch(),
    ]);

  return {
    diagnostics,
    update: update.data,
    googleReady,
    isFetching,
    refresh,
  };
}
