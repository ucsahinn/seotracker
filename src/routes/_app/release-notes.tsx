import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { WhatsNewSection } from "@/client/features/settings/WhatsNewSection";
import { t } from "@/shared/i18n";
import { version } from "../../../package.json";

export const Route = createFileRoute("/_app/release-notes")({
  component: ReleaseNotesPage,
});

function ReleaseNotesPage() {
  return (
    <PageShell width="reading">
      <PageHeader title={t("Sürüm notları")} />
      <WhatsNewSection version={version} />
    </PageShell>
  );
}
