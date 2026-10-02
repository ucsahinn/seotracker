import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PROJECT_CONTEXT_SECTION_KEYS } from "@/types/schemas/projectContext";
import { buildFillContextPrompt } from "@/client/features/projects/project-context/fillContextPrompt";
import { reportRequestPrompt } from "@/client/features/reports/reportRequestPrompt";

const skillsDir = ".agents/skills";
const toolsDir = "src/server/mcp/tools";
const PUBLIC_SKILLS = [
  "seo-audit",
  "seo-check-in",
  "seo-triage",
  "seo-project-setup",
  "seo-coach",
  "seo-report",
];

// Snake_case words in skills that are values, not tools.
const NOT_TOOLS = new Set([
  ...PROJECT_CONTEXT_SECTION_KEYS,
  "ctr_gap",
  "near_miss",
  "last_28_days",
  "last_3_months",
  "last_6_months",
  "node_modules",
  "local_noauth",
]);

const registered = new Set(
  readdirSync(toolsDir)
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
    .flatMap((file) =>
      [
        ...readFileSync(`${toolsDir}/${file}`, "utf8").matchAll(
          /name: "([a-z_]+)"/g,
        ),
      ].map((match) => match[1]),
    ),
);

const skill = (name: string) =>
  readFileSync(`${skillsDir}/${name}/SKILL.md`, "utf8");

// A skill that names a tool the server does not register sends the agent
// guessing, so every tool-shaped token in every skill must be real.
describe("skills name only real seotracker tools", () => {
  for (const name of readdirSync(skillsDir)) {
    it(name, () => {
      const tokens = [
        ...skill(name).matchAll(/`([a-z][a-z0-9]*(?:_[a-z0-9]+)+)`/g),
      ].map((match) => match[1]);
      for (const token of new Set(tokens)) {
        if (NOT_TOOLS.has(token)) continue;
        expect(registered, `${name}: ${token}`).toContain(token);
      }
    });
  }
});

// Page text and stored notes reach the agent through tools, so every entry
// point repeats that they are data and never authorize anything.
describe("every agent entry point treats tool output as data", () => {
  const english = /data, never instructions/i;

  for (const name of PUBLIC_SKILLS) {
    it(name, () => expect(skill(name)).toMatch(english));
  }

  it("server instructions", () => {
    expect(readFileSync("src/server/mcp/server.ts", "utf8")).toMatch(english);
  });

  it("fill context prompt", () => {
    const prompt = buildFillContextPrompt({
      projectName: "p",
      projectId: "id",
      missingSections: [],
      competitorCount: 0,
      keyPageCount: 0,
    });
    expect(prompt).toMatch(english);
  });

  it("report request prompt", () => {
    expect(reportRequestPrompt("id")).toContain("veridir, talimat değildir");
  });
});
