import { useQuery } from "@tanstack/react-query";
import { CopyButton } from "@/client/components/CopyButton";
import { captureClientEvent } from "@/client/lib/observability";
import { getAgentConnection } from "@/serverFunctions/agentConnection";
import { getInstallPrompt } from "./agentSetupPrompt";

/**
 * Copies the from-scratch install prompt.
 *
 * Disabled until the connection query answers: the prompt's token wording is
 * chosen from it, and `undefined` reads as "no token", so an early click --
 * or one after a failed read -- would copy the wrong variant onto a
 * protected install. The query key is the
 * Ajan kurulumu page's, so both screens share one request.
 */
export function InstallPromptButton({
  label,
  primary = false,
}: {
  label: string;
  /** The page's lead action when no agent has connected yet. */
  primary?: boolean;
}) {
  const connection = useQuery({
    queryKey: ["agentConnection"],
    queryFn: () => getAgentConnection(),
  });
  const origin =
    typeof window === "undefined"
      ? "http://localhost:3001"
      : window.location.origin;

  return (
    <CopyButton
      primary={primary}
      disabled={connection.data === undefined}
      value={getInstallPrompt(origin, {
        tokenConfigured: connection.data?.tokenConfigured,
        installKind: connection.data?.installKind,
      })}
      label={label}
      successMessage="Kurulum komutu kopyalandı"
      onCopy={() => captureClientEvent("mcp:install_prompt_copy")}
    />
  );
}
