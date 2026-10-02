import installerSkill from "../../../../.agents/skills/setup-seotracker/SKILL.md?raw";
import codexPrompt from "./agentCodexSetupPrompt.md?raw";
import installPrompt from "./agentInstallPrompt.md?raw";
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
  "seotracker runs on my own machine and answers only to me, so there is no sign-in.\nIf the server answers 401, it needs the token: follow the token rules below.";

const TOKEN_SENTENCE =
  "This install is behind a shared secret, so the MCP server needs the header `Authorization: Bearer <token>`: follow the token rules below now.\nThe token goes ONLY into the MCP client config, read by the shell inside one command. Never ask me to paste it into chat,\nand never print, log or write it anywhere else. It is read with `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`.";

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

const CODEX_TOKEN_FLAG = " --bearer-token-env-var SEOTRACKER_MCP_AUTH";

/*
 * Codex-only variant of the installer. Codex has its own verified commands
 * (`codex mcp add`, `$HOME/.agents/skills`, `$skill` invocation), so it gets a
 * compact prompt instead of the all-clients one. The auth sentence and the
 * flag are the only parts that depend on the install, and they are filled from
 * placeholders so a reword cannot silently desync them.
 */
export function getCodexSetupPrompt(
  origin: string,
  options?: { tokenConfigured?: boolean },
) {
  const tokenConfigured = options?.tokenConfigured === true;
  const auth = tokenConfigured
    ? "This install is behind a shared secret: add the entry with the bearer flag and follow the token steps now. The token goes ONLY into the environment variable, read by the shell inside one command. Never ask me to paste it into chat."
    : "seotracker runs on my own machine and answers only to me, so there is no sign-in. If the server answers 401, it needs the token: re-add the entry with `--bearer-token-env-var SEOTRACKER_MCP_AUTH` and follow the token steps.";
  return codexPrompt
    .trim()
    .replace(/\r\n/g, "\n")
    .replace("{{AUTH}}", auth)
    .replace("{{FLAG}}", tokenConfigured ? CODEX_TOKEN_FLAG : "")
    .replaceAll("http://localhost:3001", origin);
}

/*
 * From-scratch install guide: Docker, Google access, PageSpeed key, project,
 * agent connection, first results. The one install-dependent part is the MCP
 * token note, filled from a placeholder like the Codex prompt's, so a reword
 * cannot silently desync it. Phase 5 points at the setup prompts above rather
 * than repeating them.
 */
export function getInstallPrompt(
  origin: string,
  options?: { tokenConfigured?: boolean },
) {
  const token = options?.tokenConfigured
    ? "This install is behind a shared secret, so the MCP server needs the header `Authorization: Bearer <token>`. The token is read by the shell inside one command (`docker compose exec -T seotracker cat /app/.wrangler/mcp-token`; Git Bash needs `MSYS_NO_PATHCONV=1` in front, PowerShell does not) and goes ONLY into the MCP client config. Never print it, never ask me to paste it into chat."
    : "seotracker runs on my own machine and answers only to me, so there is no sign-in. If the server answers 401, it needs the token: the setup prompt covers it; never print it or ask me to paste it into chat.";
  return installPrompt
    .trim()
    .replace(/\r\n/g, "\n")
    .replace("{{TOKEN}}", token)
    .replaceAll("http://localhost:3001", origin);
}
