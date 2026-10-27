import type { QueryClient } from "@tanstack/react-query";

/** Cancel old snapshots before marking project identities and facts stale. */
export async function invalidateProjectLists(client: QueryClient) {
  const keys = [["projects"], ["projectsOverview"]];
  await Promise.all(keys.map((queryKey) => client.cancelQueries({ queryKey })));
  await Promise.all(
    keys.map((queryKey) => client.invalidateQueries({ queryKey })),
  );
}
