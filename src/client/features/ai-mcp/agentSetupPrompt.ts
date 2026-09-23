import installerSkill from "../../../../.agents/skills/setup-seotracker/SKILL.md?raw";
import updatePrompt from "./agentUpdatePrompt.md?raw";

export const agentUpdatePrompt = updatePrompt.trim();

/*
 * The installer is written for the common case: a box on the operator's own
 * desk with no secret in front of it. An install that has set MCP_TOKEN would
 * otherwise hand its agent a prompt promising "no token to paste", and the
 * agent would configure a server that answers 401 on the first tool call.
 *
 * Matched literally against the skill text, the same way the origin is. The
 * test asserts the sentence is still there, so editing the skill breaks the
 * test rather than silently shipping a prompt that lies.
 */
export const NO_AUTH_SENTENCE =
  "seotracker runs on my own machine and answers only to me, so there is no sign-in\nand no token to paste.";

const TOKEN_SENTENCE =
  "This install is behind a shared secret, so the MCP server needs an auth header.\nAsk me for the token and set `Authorization: Bearer <token>` on the MCP server\nyou add below. Do not guess it, and do not write it into a file I did not name.";

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
