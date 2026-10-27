import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/serverFunctions/projects";
import { gscPropertyMismatch } from "@/shared/settingsPropertyScope";
import { t } from "@/shared/i18n";
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
  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const project = projects.data?.find((item) => item.id === projectId);
  const gsc = useQuery(gscConnectionOptions(projectId));

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted">
        {t("Proje alan adı: {domain} · Search Console mülkü: {property}", {
          domain: project?.domain ?? t("Alan adı belirtilmedi"),
          property: gsc.data?.siteUrl ?? t("Mülk seçilmedi"),
        })}
      </p>
      {gscPropertyMismatch(
        project?.domain ?? null,
        gsc.data?.siteUrl ?? null,
      ) ? (
        <p role="status" className="text-sm text-[var(--ink-warning)]">
          {t(
            "Seçilen Search Console mülkü proje alan adını kapsamıyor. Ayrı bir mülkü bilerek seçtiyseniz koruyabilirsiniz; değiştirmek için aşağıdaki mülk seçimini kullanın.",
          )}
        </p>
      ) : null}
      {/* The ids are the targets old #search-console / #google-analytics deep
          links are redirected to from the settings index. */}
      <section id="search-console" className="scroll-mt-6 space-y-3">
        <SearchConsoleConnectionCard projectId={projectId} />
      </section>

      <section id="google-analytics" className="scroll-mt-6 space-y-3">
        <GoogleAnalyticsConnectionCard projectId={projectId} />
      </section>
    </div>
  );
}
