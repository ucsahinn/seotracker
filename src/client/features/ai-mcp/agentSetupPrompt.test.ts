import { describe, expect, it } from "vitest";
import { getAgentSetupPrompt, NO_AUTH_SENTENCE } from "./agentSetupPrompt";

describe("agent setup prompt", () => {
  it("copies the installer body without its internal skill metadata", () => {
    const prompt = getAgentSetupPrompt("http://localhost:3001");

    expect(prompt).toContain("Identify this agent and its version");
    expect(prompt).not.toContain("internal: true");
    expect(prompt).toContain("whoami and list_projects");
  });

  it("points the MCP endpoint at the instance the user is looking at", () => {
    const prompt = getAgentSetupPrompt("https://seo.example.com");

    expect(prompt).toContain("https://seo.example.com/mcp");
    expect(prompt).not.toContain("http://localhost:3001/mcp");
  });

  /*
   * The substitution is a literal match against the shipped skill file, so an
   * innocent reword there would silently hand a token-protected install a
   * prompt promising "no token to paste". This fails instead.
   */
  it("tells a token-protected install's agent to expect an auth header", () => {
    const open = getAgentSetupPrompt("http://localhost:3001");
    const closed = getAgentSetupPrompt("http://localhost:3001", {
      tokenConfigured: true,
    });

    expect(open).toContain(NO_AUTH_SENTENCE);
    expect(closed).not.toContain(NO_AUTH_SENTENCE);
    expect(closed).toContain("Authorization: Bearer <token>");
  });
});
