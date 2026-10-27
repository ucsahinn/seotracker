import { createFileRoute } from "@tanstack/react-router";
import { SystemLimitsSection } from "@/client/features/quotas/SystemLimitsSection";
import { GoogleCredentialMethods } from "@/client/features/settings/GoogleCredentialMethods";
import { PageSpeedKeySection } from "@/client/features/settings/PageSpeedKeySection";
import { SettingsIndex } from "@/client/features/settings/SettingsIndex";
import { NotificationSettings } from "@/client/features/notifications/NotificationSettings";
import { ThemeSection } from "@/client/features/settings/ThemeSection";
import { UpdateSection } from "@/client/features/settings/UpdateSection";
import { WindowsSection } from "@/client/features/settings/WindowsSection";
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
        <NotificationSettings />
        <WindowsSection />

        <GoogleCredentialMethods />

        <PageSpeedKeySection />

        <SystemLimitsSection id="sinirlar" />

        <UpdateSection version={version} />
      </div>
    </>
  );
}
