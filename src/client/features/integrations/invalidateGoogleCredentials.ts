import type { QueryClient } from "@tanstack/react-query";
import { PROPERTY_DEPENDENT_QUERY_KEYS } from "@/client/features/gsc/invalidatePropertyDependents";

const metadata = new Set([
  "googleOAuthClientStatus",
  "googleServiceAccountStatus",
  "gscConnection",
  "ga4Connection",
  "gscGrantStatus",
  "ga4GrantStatus",
  "gscSites",
  "ga4Properties",
  "projectSetup",
]);
/** Cancel old responses before dropping identity-dependent answers, across all projects. */
export async function invalidateGoogleCredentials(client: QueryClient) {
  const reports = new Set<string>(PROPERTY_DEPENDENT_QUERY_KEYS);
  const predicate = (query: { queryKey: readonly unknown[] }) =>
    reports.has(String(query.queryKey[0])) ||
    metadata.has(String(query.queryKey[0]));
  await client.cancelQueries({ predicate });
  // Removal prevents a cached old-identity success from surviving invalidation.
  client.removeQueries({
    predicate: (query) =>
      reports.has(String(query.queryKey[0])) ||
      query.queryKey[0] === "gscSites" ||
      query.queryKey[0] === "ga4Properties",
  });
  await client.invalidateQueries({
    predicate: (query) => metadata.has(String(query.queryKey[0])),
    refetchType: "active",
  });
}
