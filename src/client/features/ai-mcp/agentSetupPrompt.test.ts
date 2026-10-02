import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  agentUpdatePrompt,
  getAgentSetupPrompt,
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
      "docker compose exec seotracker cat /app/.wrangler/mcp-token",
    );
    expect(closed).toContain("ONLY into the MCP client config");
  });

  // A tool name that does not exist sends the agent guessing.
  it("names only real seotracker tools", () => {
    const mentioned = [...prompts.setup.matchAll(/`([a-z]+_[a-z_]+|whoami)`/g)]
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
      expect(prompt, label).not.toMatch(/Bearer (?!<token>|\$\{)\S/);
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
});
