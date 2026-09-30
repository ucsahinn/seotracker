import { PageHeader, PageShell } from "@/client/components/PageShell";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/serverFunctions/projects";
import { backLinkClass, BackLinkLabel } from "@/client/components/BackLink";

export const Route = createFileRoute("/_project/p/$projectId/settings")({
  component: ProjectSettingsLayout,
});

const tabs = [
  { to: "/p/$projectId/settings" as const, label: "Genel", exact: true },
  {
    to: "/p/$projectId/settings/integrations" as const,
    label: "Entegrasyonlar",
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
          <BackLinkLabel>Projeler</BackLinkLabel>
        </Link>
        {/* The non-breaking space is a placeholder: the project name
            arrives a beat after the heading, and without it the tab
            strip below jumped up a line and back. */}
        <PageHeader title="Proje ayarları" description={project?.name ?? " "} />
        {/* Navigation, not tabs: each one changes the URL and swaps the
            <Outlet/>. `role="tab"` here announced "tab" instead of "link" and
            promised an `aria-controls` panel that never existed. The daisyUI
            `tabs` classes stay -- they are the look, not the semantics. */}
        <nav aria-label="Ayar bölümleri" className="tabs tabs-border">
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
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <Outlet />
    </PageShell>
  );
}
