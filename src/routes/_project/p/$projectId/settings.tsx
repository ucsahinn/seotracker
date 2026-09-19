import { PageShell } from "@/client/components/PageShell";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { getProjects } from "@/serverFunctions/projects";

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
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-base-content"
        >
          <ChevronLeft className="size-4" />
          Projeler
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proje ayarları</h1>
          <p className="text-sm text-muted">{project?.name ?? " "}</p>
        </div>
        <div role="tablist" className="tabs tabs-border">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              role="tab"
              to={tab.to}
              params={{ projectId }}
              activeOptions={{ exact: tab.exact ?? false }}
              className="tab"
              activeProps={{
                className: "tab-active",
                "aria-selected": true,
              }}
              inactiveProps={{ "aria-selected": false }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </PageShell>
  );
}
