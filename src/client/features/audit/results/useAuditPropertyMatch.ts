import { useQuery } from "@tanstack/react-query";
import { gscConnectionOptions } from "@/client/features/integrations/googleConnectionQueries";
import { extractHostname } from "@/client/features/audit/shared";
import { gscPropertyCoversHost, gscPropertyHost } from "@/shared/gscProperty";

/**
 * Whether Google's side of this audit screen is about the audited site.
 *
 * A project holds one Search Console property, but the launch form takes any
 * address. Both facts are needed in two places — the warning above the tab
 * and the button that spends quota inside it — so they are read once here.
 */
export function useAuditPropertyMatch(projectId: string, startUrl: string) {
  const connection = useQuery(gscConnectionOptions(projectId));
  const siteUrl = connection.data?.siteUrl ?? null;
  const connected = Boolean(connection.data?.connected && siteUrl);
  const auditedHost = extractHostname(startUrl);

  return {
    /** Still loading, or not connected at all: the panels say that themselves. */
    connected,
    auditedHost,
    propertyHost: gscPropertyHost(siteUrl),
    /*
     * True while the answer is unknown. A "wrong site" warning that flashes
     * on every load before the connection resolves is worse than one that
     * arrives a moment late.
     */
    covered: !connected || gscPropertyCoversHost(siteUrl, auditedHost),
  };
}
