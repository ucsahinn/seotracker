import type { ChangelogEntry } from "./changelog";

export type ReleaseCategory = "feature" | "fix" | "security" | "hotfix";

/**
 * Section headings start with an emoji ("🛠️ Düzeltmeler"). Matching works on
 * the words, so the emoji and its spacing are dropped first.
 */
export function stripLeadingEmoji(heading: string): string {
  return heading.replace(/^[\p{Extended_Pictographic}️‍\s]+/u, "");
}

/** Classify curated headings, never keywords in individual release bullets. */
export function getReleaseCategories(
  entry: Pick<ChangelogEntry, "sections">,
): ReleaseCategory[] {
  const headings = entry.sections.map((section) =>
    stripLeadingEmoji(section.heading).toLowerCase(),
  );
  const categories: ReleaseCategory[] = [];
  if (
    headings.some((heading) =>
      /yenilik|eklendi|uygulama|öne çıkan|site denetimi|highlights|site audit|höhepunkte|website-audit|points forts|audit du site|in evidenza|controllo del sito|destaques|auditoria do site|neler sunuyor|what the app offers|features?|funktionen|fonctionnalités|funzionalità|funcionalidades/.test(
        heading,
      ),
    )
  )
    categories.push("feature");
  if (
    headings.some(
      (heading) =>
        /düzelt|hata ayıklama|veri doğruluğu|fixes?|fehlerbehebung|corrections?|correzioni|correções/.test(
          heading,
        ) &&
        !/acil düzelt|sofortige fehlerbehebung|correctif urgent|correzione urgente|correção urgente/.test(
          heading,
        ),
    )
  )
    categories.push("fix");
  if (
    headings.some((heading) =>
      /güvenlik|security|sicherheit|sécurité|sicurezza|segurança/.test(heading),
    )
  )
    categories.push("security");
  if (
    headings.some((heading) =>
      /acil düzelt|hotfix|sofortige fehlerbehebung|correctif urgent|correzione urgente|correção urgente/.test(
        heading,
      ),
    )
  )
    categories.push("hotfix");
  return categories;
}
