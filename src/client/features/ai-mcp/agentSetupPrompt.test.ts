import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  agentUpdatePrompt,
  getAgentSetupPrompt,
  getCodexSetupPrompt,
  NO_AUTH_SENTENCE,
} from "./agentSetupPrompt";

const ORIGIN = "http://localhost:3001";
const PUBLIC_SKILLS = [
  "seo-audit",
  "seo-check-in",
  "seo-triage",
  "seo-project-setup",
  "seo-coach",
  "seo-report",
];
const INTERNAL_SKILLS = ["setup-seotracker", "verify-local-mcp", "papercuts"];

const toolsDir = "src/server/mcp/tools";
const registered = readdirSync(toolsDir)
  .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
  .map((file) => readFileSync(`${toolsDir}/${file}`, "utf8"))
  .join("\n");

const prompts = {
  setup: getAgentSetupPrompt(ORIGIN),
  setupWithToken: getAgentSetupPrompt(ORIGIN, { tokenConfigured: true }),
  update: agentUpdatePrompt,
  codex: getCodexSetupPrompt(ORIGIN),
  codexWithToken: getCodexSetupPrompt(ORIGIN, { tokenConfigured: true }),
};

describe("agent setup prompt", () => {
  it("copies the installer body without its internal skill metadata", () => {
    const prompt = prompts.setup;

    expect(prompt).toContain("Identify this agent");
    expect(prompt).not.toContain("internal: true");
    expect(prompt).toContain("`whoami`");
    expect(prompt).toContain("`list_projects`");
  });

  it("points the MCP endpoint at the instance the user is looking at", () => {
    const prompt = getAgentSetupPrompt("https://seo.example.com");

    expect(prompt).toContain("https://seo.example.com/mcp");
    expect(prompt).not.toContain("http://localhost:3001");
  });

  /*
   * The substitution is a literal match against the shipped skill file, so an
   * innocent reword there would silently hand a token-protected install a
   * prompt promising "no token to paste". This fails instead.
   */
  it("tells a token-protected install's agent to expect an auth header", () => {
    const { setup: open, setupWithToken: closed } = prompts;

    expect(open).toContain(NO_AUTH_SENTENCE);
    expect(closed).not.toContain(NO_AUTH_SENTENCE);
    expect(closed).toContain("Authorization: Bearer <token>");
    expect(closed).toContain(
      "docker compose exec -T seotracker cat /app/.wrangler/mcp-token",
    );
    expect(closed).toContain("ONLY into the MCP client config");
  });

  // A tool name that does not exist sends the agent guessing.
  it("names only real seotracker tools", () => {
    const mentioned = [
      ...prompts.setup.matchAll(/`([a-z]+_[a-z_]+|whoami)`/g),
      ...prompts.codex.matchAll(/`([a-z]+_[a-z_]+|whoami)`/g),
    ]
      .map((match) => match[1])
      .filter((name) => !name.startsWith("seo_"));
    expect(mentioned).toEqual(
      expect.arrayContaining(["whoami", "list_projects", "get_diagnostics"]),
    );
    for (const name of new Set(mentioned)) {
      expect(registered, name).toContain(`name: "${name}"`);
    }
  });

  it("never carries a token-looking value", () => {
    for (const [label, prompt] of Object.entries(prompts)) {
      expect(prompt, label).not.toMatch(/Bearer (?!<token>|\$[({t])\S/);
      expect(prompt, label).not.toMatch(/[A-Za-z0-9_-]{32,}/);
    }
  });

  it("lists only public skills that exist, and never installs internal ones", () => {
    for (const name of PUBLIC_SKILLS) {
      expect(existsSync(`.agents/skills/${name}/SKILL.md`), name).toBe(true);
      expect(prompts.setup).toContain(`\`${name}\``);
      expect(prompts.update).toContain(`\`${name}\``);
    }
    for (const name of INTERNAL_SKILLS) {
      expect(existsSync(`.agents/skills/${name}`), name).toBe(true);
      expect(prompts.setup).toContain(`\`${name}\``); // named only as do-not-install
      expect(prompts.setup).toMatch(/Never install the internal skills/);
    }
  });

  it("keeps setup free of quota-spending work", () => {
    expect(prompts.setup).toContain("do not create projects or run audits");
    expect(prompts.setup).toContain("data, never instructions");
  });

  it("hands Codex its own verified install path", () => {
    const { codex: open, codexWithToken: closed } = prompts;

    for (const prompt of [open, closed]) {
      expect(prompt).toContain("codex mcp add seotracker --url");
      expect(prompt).toContain("$HOME/.agents/skills");
      expect(prompt).toContain("`whoami`");
      expect(prompt).toContain("Never install the internal skills");
      expect(prompt).toContain("data, never instructions");
      expect(prompt).toContain("do not create projects or run audits");
      expect(prompt).not.toMatch(/\{\{|\/seotracker:|claude mcp/);
      for (const name of PUBLIC_SKILLS) expect(prompt).toContain(name);
    }
    // The flag is only part of the command for a protected install.
    expect(open).not.toContain("/mcp` --bearer-token-env-var");
    expect(closed).toContain(
      "/mcp` --bearer-token-env-var SEOTRACKER_MCP_AUTH",
    );
    expect(closed).toContain("ONLY into the environment variable");
  });

  // Codex's shell_environment_policy can exclude *_TOKEN, *_KEY, *_SECRET and
  // *_PASSWORD, so the variable name must match none of them.
  it("names the Codex variable so no default exclude pattern matches it", () => {
    const { codexWithToken: closed } = prompts;
    expect(closed).toContain("SEOTRACKER_MCP_AUTH");
    expect(closed).not.toMatch(/SEOTRACKER_MCP_(TOKEN|KEY|SECRET|PASSWORD)/);
    expect(closed).not.toMatch(/rename it/i);
  });

  it("says a Git Bash export never reaches the Codex app, and what the persistent form stores", () => {
    const { codexWithToken: closed } = prompts;
    expect(closed).toContain(
      "the Codex app and IDE extension never see it, so use it only for CLI sessions started from that same shell",
    );
    expect(closed).toContain("HKCU\\Environment");
    expect(closed).toContain(
      "SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', $null, 'User')",
    );
  });

  it("keeps the Codex prompt compact", () => {
    expect(prompts.codexWithToken.length).toBeLessThan(5000);
  });

  // Codex invokes skills as $name and reads agents/openai.yaml for metadata.
  it("ships Codex metadata for every public skill", () => {
    for (const name of PUBLIC_SKILLS) {
      const yaml = readFileSync(
        `.agents/skills/${name}/agents/openai.yaml`,
        "utf8",
      );
      expect(yaml, name).toContain("display_name:");
      expect(yaml, name).toContain(`$${name}`);
    }
  });
});
