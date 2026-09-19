import { describe, expect, it } from "vitest";
import { getAgentSetupPrompt } from "./agentSetupPrompt";

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
});
