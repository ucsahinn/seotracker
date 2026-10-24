import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { t } from "@/shared/i18n";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <PageShell width="reading">
      <PageHeader title={t("Ayarlar")} />
      <Outlet />
    </PageShell>
  );
}
