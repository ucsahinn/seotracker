import raw from "../../../../CHANGELOG.md?raw";

export type ChangelogEntry = {
  version: string;
  /** Already formatted in the source; shown as written. */
  date: string | null;
  /** The paragraph under the heading, when there is one. */
  intro: string;
  sections: { heading: string; items: string[] }[];
};

/**
 * The release notes, read out of the file the repository already keeps.
 *
 * A self-hosted install has no changelog service to call and no network to
 * depend on, and a second copy of this text maintained inside the app would
 * drift from the one in the repo within a release. `?raw` bundles the file,
 * so what the screen shows and what `git log` shows cannot disagree.
 *
 * Deliberately a small parser rather than a markdown renderer: these notes
 * are headings and bullets, and pulling in a renderer to display them would
 * be a dependency and an XSS surface for content that is already ours.
 */
function parseChangelog(source: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  let entry: ChangelogEntry | null = null;
  let section: { heading: string; items: string[] } | null = null;

  for (const line of source.split("\n")) {
    const release = /^## \[([^\]]+)\](?:\s*[—-]\s*(.+))?$/.exec(line.trim());
    if (release) {
      // "Yayınlanmamış" holds what is committed but not released, so it
      // describes a build nobody is running. Link definitions at the foot of
      // the file match the same shape and carry no content.
      const [, version, date] = release;
      entry =
        version === "Yayınlanmamış"
          ? null
          : { version, date: date?.trim() ?? null, intro: "", sections: [] };
      if (entry) entries.push(entry);
      section = null;
      continue;
    }
    if (!entry) continue;

    const heading = /^### (.+)$/.exec(line.trim());
    if (heading) {
      section = { heading: heading[1], items: [] };
      entry.sections.push(section);
      continue;
    }

    const bullet = /^- (.+)$/.exec(line);
    if (bullet && section) {
      section.items.push(bullet[1]);
      continue;
    }

    // A wrapped continuation of the bullet above it.
    const continuation = /^\s{2,}(\S.*)$/.exec(line);
    if (continuation && section && section.items.length > 0) {
      section.items[section.items.length - 1] += ` ${continuation[1]}`;
      continue;
    }

    const text = line.trim();
    if (text && !section) {
      entry.intro = entry.intro ? `${entry.intro} ${text}` : text;
    }
  }

  return entries;
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] = parseChangelog(raw);

/** Strips the inline markdown these notes use, leaving the words. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}
