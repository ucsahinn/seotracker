import { SettingsHeading } from "@/client/components/HelpTip";
import { queryClient } from "@/client/tanstack-db/queryClient";
import {
  gscConnectionOptions,
  ga4ConnectionOptions,
} from "@/client/features/integrations/googleConnectionQueries";
import { createFileRoute } from "@tanstack/react-router";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { GoogleAnalyticsConnectionCard } from "@/client/features/ga4/GoogleAnalyticsConnectionCard";

export const Route = createFileRoute(
  "/_project/p/$projectId/settings/integrations",
)({
  loader: ({ params }) => {
    // Start both database checks on link intent without holding up navigation.
    void queryClient.prefetchQuery(gscConnectionOptions(params.projectId));
    void queryClient.prefetchQuery(ga4ConnectionOptions(params.projectId));
  },
  component: ProjectIntegrationsRoute,
});

function ProjectIntegrationsRoute() {
  const { projectId } = Route.useParams();

  return (
    <div className="space-y-8">
      {/* The ids are the targets old #search-console / #google-analytics deep
          links are redirected to from the settings index. */}
      <section id="search-console" className="scroll-mt-6 space-y-3">
        <SettingsHeading
          title="Search Console"
          help="Bağlanmadan önce Ayarlar'da bir Google OAuth istemcisi ya da hizmet hesabı tanımlı olmalı. Bağlandıktan sonra hangi mülkü izleyeceğinizi seçersiniz; yeni doğrulanmış bir mülkte Google'ın veri döndürmesi birkaç gün sürebilir."
        />
        <SearchConsoleConnectionCard projectId={projectId} />
      </section>

      <section id="google-analytics" className="scroll-mt-6 space-y-3">
        <GoogleAnalyticsConnectionCard
          projectId={projectId}
          heading={
            <SettingsHeading
              title="Analytics"
              help="Search Console ile aynı Google istemcisini kullanır, ayrı bir kurulum gerekmez. Bağlandıktan sonra GA4 mülkünüzü seçersiniz; organik trafik panelde ve Analytics ekranında görünür."
            />
          }
        />
      </section>
    </div>
  );
}
