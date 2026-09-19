import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import { getGoogleOAuthClientStatus } from "@/serverFunctions/googleOAuthClient";
import { GSC_SELF_HOSTED_SETUP_DOCS_URL } from "@/shared/gsc";

/**
 * Said once, at the top, instead of twice in the middle.
 *
 * Search Console and Analytics share one OAuth client, so when it is missing
 * both connection cards printed the same warning, and the dashboard carried
 * two identical amber blocks explaining the same single fix. This is that
 * sentence, once; `useGoogleClientConfigured` lets the page drop the cards
 * that cannot do anything until it is answered.
 */
export function useGoogleClientConfigured(): boolean | undefined {
  const query = useQuery({
    queryKey: ["googleOAuthClientStatus"],
    queryFn: () => getGoogleOAuthClientStatus(),
  });
  return query.data ? query.data.source !== null : undefined;
}

export function GoogleSetupBanner() {
  return (
    <div className="alert alert-warning">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="space-y-1">
        <p className="font-medium text-base-content">
          Google istemcisi tanımlı değil
        </p>
        <p>
          Search Console ve Analytics aynı OAuth istemcisini kullanır. İstemci
          kimliğinizi girene kadar ikisi de bağlanamaz.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Link
            to="/settings"
            className="font-medium text-base-content underline underline-offset-2"
          >
            Ayarlar'da gir
          </Link>
          <SafeExternalLink
            url={GSC_SELF_HOSTED_SETUP_DOCS_URL}
            label="Kurulum kılavuzunu aç"
            className="inline-flex items-center gap-1 underline underline-offset-2"
          />
        </div>
      </div>
    </div>
  );
}
