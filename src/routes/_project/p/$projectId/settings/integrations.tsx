import { SettingsHeading } from "@/client/components/HelpTip";
import { queryClient } from "@/client/tanstack-db/queryClient";
import {
  gscConnectionOptions,
  ga4ConnectionOptions,
} from "@/client/features/integrations/googleConnectionQueries";
import { createFileRoute } from "@tanstack/react-router";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { GoogleAnalyticsConnectionCard } from "@/client/features/ga4/GoogleAnalyticsConnectionCard";
import { t } from "@/shared/i18n";

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
          help={t(
            "Önce Ayarlar'da Google erişim anahtarını ya da hizmet hesabını girin. Sonra izleyeceğiniz siteyi seçin. Google buna mülk der. Siteyi yeni doğruladıysanız Google'ın veri vermesi birkaç gün sürebilir.",
          )}
        />
        <SearchConsoleConnectionCard projectId={projectId} />
      </section>

      <section id="google-analytics" className="scroll-mt-6 space-y-3">
        <GoogleAnalyticsConnectionCard
          projectId={projectId}
          heading={
            <SettingsHeading
              title="Analytics"
              help={t(
                "Search Console'daki Google erişim anahtarını kullanır, ayrı kurulum istemez. Bağlandıktan sonra Analytics'teki sitenizi (Analytics mülkü) seçin. Organik ziyaretler Panel'de ve Analytics ekranında görünür.",
              )}
            />
          }
        />
      </section>
    </div>
  );
}
