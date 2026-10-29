import { PageHeader, PageShell } from "@/client/components/PageShell";
import { FactStrip } from "@/client/components/FactStrip";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/serverFunctions/projects";
import { backLinkClass, BackLinkLabel } from "@/client/components/BackLink";
import { t } from "@/shared/i18n";

export const Route = createFileRoute("/_project/p/$projectId/settings")({
  component: ProjectSettingsLayout,
});

// Labels are Turkish source text, translated where they render.
const tabs = [
  { to: "/p/$projectId/settings" as const, label: "Genel", exact: true },
  {
    to: "/p/$projectId/settings/integrations" as const,
    label: "Bağlantılar",
  },
];

function ProjectSettingsLayout() {
  const { projectId } = Route.useParams();
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const project = projectsQuery.data?.find((entry) => entry.id === projectId);

  return (
    <PageShell width="reading">
      <div className="space-y-4">
        <Link to="/projects" className={backLinkClass}>
          <BackLinkLabel>{t("Projeler")}</BackLinkLabel>
        </Link>
        <PageHeader title={t("Proje ayarları")} />
        {project ? (
          <FactStrip
            label={t("Proje ayarları")}
            facts={[
              { label: t("Ad"), value: project.name },
              {
                label: t("Alan adı"),
                value: project.domain ?? t("Alan adı belirtilmedi"),
              },
            ]}
            detailsLabel={t("Ayrıntılar")}
            details={
              <p>
                {t(
                  "{name} · {domain}. Değişiklikler yalnızca bu projeye uygulanır.",
                  {
                    name: project.name,
                    domain: project.domain ?? t("Alan adı belirtilmedi"),
                  },
                )}
              </p>
            }
          />
        ) : (
          <div className="skeleton h-16 w-full" aria-busy="true" />
        )}
        {/* Navigation, not tabs: each one changes the URL and swaps the
            <Outlet/>. `role="tab"` here announced "tab" instead of "link" and
            promised an `aria-controls` panel that never existed. The daisyUI
            `tabs` classes stay -- they are the look, not the semantics. */}
        <nav aria-label={t("Ayar bölümleri")} className="tabs tabs-border">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              params={{ projectId }}
              activeOptions={{ exact: tab.exact ?? false }}
              className="tab"
              activeProps={{
                className: "tab-active",
                "aria-current": "page",
              }}
            >
              {t(tab.label)}
            </Link>
          ))}
        </nav>
      </div>

      <Outlet />
    </PageShell>
  );
}
