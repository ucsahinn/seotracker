import { Link } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { t } from "@/shared/i18n";

/** The one state for a project with no Analytics property: say so, offer the connection. */
export function AnalyticsNotConnected({ projectId }: { projectId: string }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={BarChart3}
        title={t("Google Analytics bağlı değil")}
        description={t(
          "Raporlar, Analytics'teki sitenizden gelir. Önce bağlantıyı kurun.",
        )}
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            {t("Analytics'i bağla")}
          </Link>
        }
      />
    </div>
  );
}
