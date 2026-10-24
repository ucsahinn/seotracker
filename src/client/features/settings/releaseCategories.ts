import type { ChangelogEntry } from "./changelog";

export type ReleaseCategory = "feature" | "fix" | "security" | "hotfix";

/** Classify curated headings, never keywords in individual release bullets. */
export function getReleaseCategories(
  entry: Pick<ChangelogEntry, "sections">,
): ReleaseCategory[] {
  const headings = entry.sections.map((section) =>
    section.heading.toLowerCase(),
  );
  const categories: ReleaseCategory[] = [];
  if (
    headings.some((heading) =>
      /yenilik|eklendi|uygulama|neler sunuyor/.test(heading),
    )
  )
    categories.push("feature");
  if (
    headings.some(
      (heading) =>
        /düzelt|hata ayıklama|veri doğruluğu/.test(heading) &&
        !/acil düzelt/.test(heading),
    )
  )
    categories.push("fix");
  if (headings.some((heading) => /güvenlik|security/.test(heading)))
    categories.push("security");
  if (headings.some((heading) => /acil düzelt|hotfix/.test(heading)))
    categories.push("hotfix");
  return categories;
}
