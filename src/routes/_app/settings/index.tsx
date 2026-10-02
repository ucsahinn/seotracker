import { createFileRoute } from "@tanstack/react-router";
import { SystemLimitsSection } from "@/client/features/quotas/SystemLimitsSection";
import { GoogleOAuthClientSection } from "@/client/features/settings/GoogleOAuthClientSection";
import { GoogleServiceAccountSection } from "@/client/features/settings/GoogleServiceAccountSection";
import { PageSpeedKeySection } from "@/client/features/settings/PageSpeedKeySection";
import { SettingsIndex } from "@/client/features/settings/SettingsIndex";
import { ThemeSection } from "@/client/features/settings/ThemeSection";
import { UpdateSection } from "@/client/features/settings/UpdateSection";
import { WhatsNewSection } from "@/client/features/settings/WhatsNewSection";
import { version } from "../../../../package.json";

export const Route = createFileRoute("/_app/settings/")({
  component: PersonalSettings,
});

function PersonalSettings() {
  return (
    <>
      <SettingsIndex />
      {/* A hairline between blocks instead of ten rows of air: with only
          whitespace the sections ran into one long form and the small
          headings were the only thing saying where one ended. */}
      <div className="enter divide-y divide-[var(--hairline)] [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
        <ThemeSection />

        <GoogleOAuthClientSection />

        <GoogleServiceAccountSection />

        <PageSpeedKeySection />

        <SystemLimitsSection id="sinirlar" />

        <UpdateSection version={version} />

        <WhatsNewSection version={version} />
      </div>
    </>
  );
}
