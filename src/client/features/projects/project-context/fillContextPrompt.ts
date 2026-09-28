import promptTemplate from "./fillContextPrompt.md?raw";
import type { ProjectContextSectionKey } from "@/types/schemas/projectContext";

/**
 * The prompt the operator hands an agent to fill this page in.
 *
 * It does not restate the interview: `seo-project-setup` already is that
 * skill, shipped in `.agents/skills/`, and a second copy here would drift
 * from it. What the skill cannot know is which project the operator is
 * looking at and how much of it is already written, so that is all this
 * binds in — plus a short fallback for an agent with no skills at all.
 */
export function buildFillContextPrompt({
  projectName,
  projectId,
  domain,
  missingSections,
  competitorCount,
  keyPageCount,
}: {
  projectName: string;
  projectId: string;
  domain?: string | null;
  missingSections: ProjectContextSectionKey[];
  competitorCount: number;
  keyPageCount: number;
}): string {
  return promptTemplate
    .replace(/\r\n/g, "\n")
    .replace("{{PROJECT}}", projectName)
    .replace("{{PROJECT_ID}}", projectId)
    .replace("{{SITE}}", domain ? `Site: ${domain}` : "")
    .replace(
      "{{STATE}}",
      describeState({ missingSections, competitorCount, keyPageCount }),
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * An agent that is told "fill this in" against a page that is already full
 * rewrites it. Saying which sections are empty — and that the rest are not —
 * is the difference between extending the operator's notes and replacing
 * them.
 */
function describeState({
  missingSections,
  competitorCount,
  keyPageCount,
}: {
  missingSections: ProjectContextSectionKey[];
  competitorCount: number;
  keyPageCount: number;
}): string {
  const lists = [
    competitorCount === 0 ? "no competitors" : `${competitorCount} competitors`,
    keyPageCount === 0 ? "no key pages" : `${keyPageCount} key pages`,
  ].join(" and ");

  if (missingSections.length === 0) {
    return `All four sections are already written, with ${lists} saved. Review them against the site as it is today and correct what is wrong or out of date. Do not rewrite what is still true.`;
  }

  // The machine keys, not the Turkish labels the page shows: these are the
  // strings the agent passes to `update_project_context`.
  return `Empty so far: ${missingSections.join(", ")}. ${capitalize(lists)} are saved. Leave the sections that already have text alone unless they are wrong.`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
