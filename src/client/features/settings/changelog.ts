import raw from "./changelog.tr.md?raw";
import englishRaw from "./changelog.en.md?raw";
import germanRaw from "./changelog.de.md?raw";
import frenchRaw from "./changelog.fr.md?raw";
import italianRaw from "./changelog.it.md?raw";
import portugueseRaw from "./changelog.pt.md?raw";
import type { Locale } from "@/shared/i18n";

/** A line of prose, or a fenced command the reader will want to copy. */
export type ChangelogItem = { text: string; code: boolean };

export type ChangelogEntry = {
  version: string;
  /** Already formatted in the source; shown as written. */
  date: string | null;
  /** The paragraph under the heading, when there is one. */
  intro: string;
  sections: { heading: string; items: ChangelogItem[] }[];
};

/**
 * Customer-facing release notes, kept separate from the fuller repository log.
 *
 * A self-hosted install has no changelog service to call and no network to
 * depend on. `?raw` bundles both localized copies so the release screen stays
 * available offline and can leave developer-only setup notes in the full log.
 *
 * Deliberately a small parser rather than a markdown renderer: these notes
 * are headings, bullets and short paragraphs, and pulling in a renderer to
 * display them would be a dependency and an XSS surface for content that is
 * already ours.
 */
export function parseChangelog(source: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  let entry: ChangelogEntry | null = null;
  let section: { heading: string; items: ChangelogItem[] } | null = null;
  let codeLines: string[] = [];
  let inFence = false;
  let paragraphOpen = false;

  // A Windows checkout (core.autocrlf, as on the release runner) hands the
  // bundler CRLF files; split on either ending so every bullet stays its own
  // item.
  for (const line of source.split(/\r?\n/)) {
    const release = /^## \[([^\]]+)\](?: Alpha)?(?:\s*[—-]\s*(.+))?$/.exec(
      line.trim(),
    );
    if (release) {
      // "Yayınlanmamış" holds what is committed but not released, so it
      // describes a build nobody is running. Link definitions at the foot of
      // the file match the same shape and carry no content.
      const [, version, date] = release;
      entry =
        // i18n-ignore: the heading in CHANGELOG.md, matched, never shown
        version === "Yayınlanmamış"
          ? null
          : { version, date: date?.trim() ?? null, intro: "", sections: [] };
      if (entry) entries.push(entry);
      section = null;
      inFence = false;
      paragraphOpen = false;
      continue;
    }
    if (!entry) continue;

    /*
     * Fences first: a command line inside one must not be read as a bullet,
     * a heading or a wrapped continuation. A fenced block is kept as a code
     * item, because the command inside it is what the reader came for and
     * the sentence around it only says to run it.
     */
    if (line.trim().startsWith("```")) {
      if (inFence && section && codeLines.length > 0) {
        section.items.push({ text: codeLines.join("\n"), code: true });
      }
      codeLines = [];
      inFence = !inFence;
      paragraphOpen = false;
      continue;
    }
    if (inFence) {
      codeLines.push(line.trimEnd());
      continue;
    }

    const heading = /^### (.+)$/.exec(line.trim());
    if (heading) {
      section = { heading: heading[1], items: [] };
      entry.sections.push(section);
      paragraphOpen = false;
      continue;
    }

    const bullet = /^- (.+)$/.exec(line);
    if (bullet && section) {
      section.items.push({ text: bullet[1], code: false });
      paragraphOpen = false;
      continue;
    }

    // A wrapped continuation of the bullet above it.
    const continuation = /^\s{2,}(\S.*)$/.exec(line);
    const last = section?.items.at(-1);
    if (continuation && last && !last.code) {
      last.text += ` ${continuation[1]}`;
      continue;
    }

    const text = line.trim();
    if (!text) {
      // A blank line ends a paragraph, so the next one does not run into it.
      paragraphOpen = false;
      continue;
    }
    if (!section) {
      entry.intro = entry.intro ? `${entry.intro} ${text}` : text;
      continue;
    }

    /*
     * Prose under a heading, kept as an item of its own.
     *
     * A release note is not always a list: "what you have to do first" is a
     * paragraph and a command, and writing it as a bullet to satisfy the
     * parser would be the tail wagging the dog.
     */
    const tail = section.items.at(-1);
    if (paragraphOpen && tail && !tail.code) {
      tail.text += ` ${text}`;
    } else {
      section.items.push({ text, code: false });
      paragraphOpen = true;
    }
  }

  return entries;
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] = parseChangelog(raw);

/** English copy kept in lockstep with the canonical Turkish release list. */
export const CHANGELOG_ENTRIES_EN: ChangelogEntry[] =
  parseChangelog(englishRaw);

/** Release notes in each supported interface language. */
export const CHANGELOG_ENTRIES_BY_LOCALE: Record<Locale, ChangelogEntry[]> = {
  tr: CHANGELOG_ENTRIES,
  en: CHANGELOG_ENTRIES_EN,
  de: parseChangelog(germanRaw),
  fr: parseChangelog(frenchRaw),
  it: parseChangelog(italianRaw),
  pt: parseChangelog(portugueseRaw),
};

/** Strips the inline markdown these notes use, leaving the words. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}
