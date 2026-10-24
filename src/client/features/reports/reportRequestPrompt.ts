import { getLocale } from "@/shared/i18n";
import prompts from "./reportRequestPrompt.json";

/**
 * The prompt that turns this read-only screen into an actionable one.
 *
 * Reports are written by an agent through the `save_report` MCP tool and
 * read here — there is no human-authored HTML path, and inventing one would
 * mean building a document editor nobody asked for. What was missing is not
 * a save button but a way to *start* a report from the screen that lists
 * them, which is the same shape as the agent-setup prompt on the dashboard.
 *
 * The prompt is pasted into an agent that already has the seotracker MCP
 * tools, so it names them exactly (a wrong tool name sends the agent
 * guessing) and carries the contract the tool descriptions only imply:
 * what to read first, what to refuse to invent, what the saved HTML may not
 * contain, and what to tell the user at the end. It follows the UI language
 * because the person pasting it reads the agent's answer, and the agent
 * answers in the language it was asked in.
 *
 * Both versions live in the JSON beside this file rather than as t() keys:
 * this is one agent contract, reviewed as a whole, and a sentence-by-sentence
 * catalog would let the two languages drift apart line by line. Change them
 * together.
 */
export function reportRequestPrompt(projectId: string): string {
  const lines = getLocale() === "en" ? prompts.en : prompts.tr;
  // A function replacement: `$&` in an id must not be read as a pattern.
  return lines.join("\n").replace("{{PROJECT_ID}}", () => projectId);
}
