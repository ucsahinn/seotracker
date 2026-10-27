import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { t } from "@/shared/i18n";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <PageShell width="reading">
      <PageHeader
        title={t("Ayarlar")}
        description={t(
          "Görünüm ve dil bu tarayıcıya, Google kimlikleri bu kurulumdaki tüm projelere, Windows tercihleri başlatıcıya uygulanır. Önce kullanacağınız Google kimliğini seçin, sonra proje bağlantılarından mülkünüzü belirleyin.",
        )}
      />
      <Outlet />
    </PageShell>
  );
}
