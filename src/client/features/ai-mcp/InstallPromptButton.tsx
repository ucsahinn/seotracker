import { useQuery } from "@tanstack/react-query";
import { CopyButton } from "@/client/components/CopyButton";
import { captureClientEvent } from "@/client/lib/observability";
import { getAgentConnection } from "@/serverFunctions/agentConnection";
import { getInstallPrompt } from "./agentSetupPrompt";

/**
 * Copies the from-scratch install prompt.
 *
 * Disabled until the connection query answers: the prompt's token wording is
 * chosen from it, and `undefined` reads as "no token", so an early click
 * would copy the wrong variant onto a protected install. The query key is the
 * Ajan kurulumu page's, so both screens share one request.
 */
export function InstallPromptButton({
  primary = false,
}: {
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
      disabled={connection.isPending}
      value={getInstallPrompt(origin, {
        tokenConfigured: connection.data?.tokenConfigured,
      })}
      label={primary ? "Kurulum istemini kopyala" : "Kurulum istemi"}
      successMessage="Kurulum istemi kopyalandı"
      onCopy={() => captureClientEvent("mcp:install_prompt_copy")}
    />
  );
}
