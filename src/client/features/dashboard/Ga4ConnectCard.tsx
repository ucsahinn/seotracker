import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoogleAnalyticsConnectionCard } from "@/client/features/ga4/GoogleAnalyticsConnectionCard";
import { captureClientEvent } from "@/client/lib/observability";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { toast } from "sonner";
import { dismissDashboardGa4Card } from "@/serverFunctions/dashboard";
import { t } from "@/shared/i18n";

export function Ga4ConnectCard({
  projectId,
  connected,
}: {
  projectId: string;
  connected: boolean;
}) {
  const queryClient = useQueryClient();
  const dismissMutation = useMutation({
    mutationFn: () => dismissDashboardGa4Card({ data: { projectId } }),
    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: ["dashboardActivation", projectId],
      }),
    // The card simply stays put on failure, which read as an ignored click.
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(error, t("Kart gizlenemedi. Tekrar deneyin.")),
      ),
  });

  return (
    <GoogleAnalyticsConnectionCard
      projectId={projectId}
      onDismiss={
        connected
          ? undefined
          : () => {
              captureClientEvent("dashboard:ga4_dismiss");
              dismissMutation.mutate();
            }
      }
      dismissing={dismissMutation.isPending}
    />
  );
}
