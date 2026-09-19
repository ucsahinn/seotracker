import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/client/components/PageShell";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <PageShell width="reading">
      <h1 className="text-2xl font-semibold">Ayarlar</h1>
      <Outlet />
    </PageShell>
  );
}
