import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/client/components/PageShell";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <PageShell width="reading">
      <PageHeader title="Ayarlar" />
      <Outlet />
    </PageShell>
  );
}
