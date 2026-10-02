import installerSkill from "../../../../.agents/skills/setup-seotracker/SKILL.md?raw";
import updatePrompt from "./agentUpdatePrompt.md?raw";

export const agentUpdatePrompt = updatePrompt.trim();

/*
 * The installer is written for the common case: a box on the operator's own
 * desk with no secret in front of it. An install that has set MCP_TOKEN would
 * otherwise hand its agent a prompt promising no token is needed, and the
 * agent would configure a server that answers 401 on the first tool call.
 *
 * Matched literally against the skill text, the same way the origin is. The
 * test asserts the sentence is still there, so editing the skill breaks the
 * test rather than silently shipping a prompt that lies.
 */
export const NO_AUTH_SENTENCE =
  "seotracker runs on my own machine and answers only to me, so there is no sign-in.\nIf the server answers 401, it needs the token: ask me to run\n`docker compose exec seotracker cat /app/.wrangler/mcp-token` in the seotracker folder.";

const TOKEN_SENTENCE =
  "This install is behind a shared secret, so the MCP server needs the header `Authorization: Bearer <token>`.\nI read the token myself: ask me to run `docker compose exec seotracker cat /app/.wrangler/mcp-token` in the\nseotracker folder, and put it ONLY into the MCP client config. Never ask me to paste it into chat,\nand never print, log or write it anywhere else.";

// The copyable installer and internal skill share one source of truth.
export function getAgentSetupPrompt(
  origin: string,
  options?: { tokenConfigured?: boolean },
) {
  const instructions = installerSkill
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .trim()
    .replace(/\r\n/g, "\n");
  const authed = options?.tokenConfigured
    ? instructions.replace(NO_AUTH_SENTENCE, TOKEN_SENTENCE)
    : instructions;
  return authed.replaceAll("http://localhost:3001", origin);
}
