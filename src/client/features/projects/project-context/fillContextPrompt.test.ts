import { describe, expect, it } from "vitest";
import { buildFillContextPrompt } from "./fillContextPrompt";

const base = {
  projectName: "vaultpilot.io",
  projectId: "proj-1",
  domain: "vaultpilot.io",
  missingSections: [] as never[],
  competitorCount: 0,
  keyPageCount: 0,
};

describe("fill context prompt", () => {
  it("binds the project the operator is looking at", () => {
    const prompt = buildFillContextPrompt({
      ...base,
      missingSections: ["business_overview"],
    });

    expect(prompt).toContain('"vaultpilot.io"');
    expect(prompt).toContain("Project ID: proj-1");
    expect(prompt).toContain("Site: vaultpilot.io");
  });

  /*
   * A project without a domain used to leave "Site:" dangling with nothing
   * after it, which reads as a missing value rather than an absent one.
   */
  it("leaves out the site line when the project has no domain", () => {
    const prompt = buildFillContextPrompt({ ...base, domain: null });

    expect(prompt).not.toContain("Site:");
  });

  it("names the empty sections so the filled ones are left alone", () => {
    const prompt = buildFillContextPrompt({
      ...base,
      missingSections: ["current_goal", "positioning"],
      competitorCount: 8,
    });

    expect(prompt).toContain("Empty so far: current_goal, positioning");
    expect(prompt).toContain("8 competitors");
    expect(prompt).toContain("Leave the sections that already have text alone");
  });

  /*
   * The whole point of the state line: told "fill this in" against a full
   * page, an agent replaces what is there.
   */
  it("asks for a review, not a rewrite, once every section is written", () => {
    const prompt = buildFillContextPrompt({
      ...base,
      competitorCount: 8,
      keyPageCount: 26,
    });

    expect(prompt).toContain("All four sections are already written");
    expect(prompt).toContain("Do not rewrite what is still true");
    expect(prompt).not.toContain("Empty so far");
  });

  it("points at the skill that already does this work", () => {
    const prompt = buildFillContextPrompt(base);

    expect(prompt).toContain("seo-project-setup");
    expect(prompt).toContain("update_project_context");
  });
});

/*
 * `replace` with a string replacement reads `$&` and friends as patterns, so
 * a project name is a small template injection into the agent's prompt.
 */
describe("values that look like replacement patterns", () => {
  it("puts a project name containing $& in verbatim", () => {
    const prompt = buildFillContextPrompt({
      ...base,
      projectName: "A$&B",
      domain: "x$'y.com",
    });

    expect(prompt).toContain('"A$&B"');
    expect(prompt).toContain("Site: x$'y.com");
    expect(prompt).not.toContain("{{PROJECT}}");
  });
});
