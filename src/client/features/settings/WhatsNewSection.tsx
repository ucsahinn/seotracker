import { ChevronRight } from "lucide-react";
import * as React from "react";
import { formatDate } from "@/client/lib/format";
import { CopyButton } from "@/client/components/CopyButton";
import { getLocale, t } from "@/shared/i18n";
import {
  getReleaseCategories,
  type ReleaseCategory,
} from "./releaseCategories";
import {
  CHANGELOG_ENTRIES_BY_LOCALE,
  type ChangelogEntry,
  type ChangelogItem,
} from "@/client/features/settings/changelog";

/**
 * What changed, in the app rather than only on GitHub.
 *
 * An operator who updates a self-hosted tool has no release page in front of
 * them — they ran a command and the container came back a version newer.
 * This is the same text the repository keeps, read straight out of
 * `CHANGELOG.md`, so it cannot fall behind what was actually shipped.
 */
export function WhatsNewSection({ version }: { version: string }) {
  const locale = getLocale();
  const entries = CHANGELOG_ENTRIES_BY_LOCALE[locale];
  if (entries.length === 0) return null;

  return (
    <section id="surum-notlari" className="scroll-mt-16 space-y-3">
      <div className="space-y-1">
        <p className="text-sm text-muted">
          {t(
            "Her sürümde nelerin eklendiğini ve düzeltildiğini burada bulabilirsiniz.",
          )}
        </p>
      </div>

      <div className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300">
        {entries.map((entry) => (
          <ReleaseNotes
            key={entry.version}
            entry={entry}
            isRunning={entry.version === version}
          />
        ))}
      </div>
    </section>
  );
}

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]*\))/g;

/**
 * The inline markdown these notes use -- bold, code, links -- as elements.
 * Built as React nodes rather than HTML, so a note can never inject markup;
 * a link keeps its words and drops its address, as the plain-text pass did.
 */
function InlineText({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-base-content">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="text-xs">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = /^\[([^\]]+)\]\([^)]*\)$/.exec(part);
        return link ? link[1] : part;
      })}
    </>
  );
}

function ReleaseNotes({
  entry,
  isRunning,
}: {
  entry: ChangelogEntry;
  isRunning: boolean;
}) {
  // The newest opens; the rest are a heading until asked for.
  const [open, setOpen] = React.useState(isRunning);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`release-${entry.version}`}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full flex-wrap items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-base-200/50"
      >
        <ChevronRight
          className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden
        />
        <span className="font-medium tabular-nums">v{entry.version} Alpha</span>
        {getReleaseCategories(entry).map((category) => (
          <span
            key={category}
            className={`release-tag release-tag-${category}`}
          >
            {t(CATEGORY_LABELS[category])}
          </span>
        ))}
        {entry.date ? (
          <span className="text-xs text-muted">{formatDate(entry.date)}</span>
        ) : null}
        {isRunning ? (
          <span className="rounded-full border border-base-300 px-2 py-0.5 text-[11px] text-muted">
            {t("Kurulu sürüm")}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          id={`release-${entry.version}`}
          className="space-y-4 px-4 pb-4 pl-11"
        >
          {entry.intro ? (
            <p className="max-w-prose text-[15px] leading-relaxed text-base-content">
              <InlineText text={entry.intro} />
            </p>
          ) : null}
          {entry.sections.map((section) =>
            section.heading === HIGHLIGHTS[getLocale()] ? (
              <Highlights key={section.heading} items={section.items} />
            ) : (
              <div key={section.heading} className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <span
                    className="h-3.5 w-1 rounded-full bg-accent"
                    aria-hidden
                  />
                  {section.heading}
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-muted marker:text-subtle">
                  {section.items.map((item, index) =>
                    item.code ? (
                      <li key={index} className="max-w-prose list-none">
                        <div className="flex items-start justify-between gap-2 rounded-field border border-[var(--hairline)] bg-base-200 px-3 py-2">
                          <pre className="min-w-0 overflow-x-auto whitespace-pre-wrap break-all text-xs">
                            <code>{item.text}</code>
                          </pre>
                          <CopyButton
                            iconOnly
                            value={item.text}
                            label={t("Komutu kopyala")}
                            successMessage={t("Komut kopyalandı")}
                          />
                        </div>
                      </li>
                    ) : (
                      <li
                        key={index}
                        className="max-w-prose text-sm leading-relaxed"
                      >
                        <InlineText text={item.text} />
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

/** The heading the newest note uses for its short summary. */
// i18n-ignore: matched against the heading in the Turkish CHANGELOG.md
const HIGHLIGHTS: Record<ReturnType<typeof getLocale>, string> = {
  tr: "Öne çıkanlar", // i18n-ignore
  en: "Highlights", // i18n-ignore
  de: "Höhepunkte", // i18n-ignore
  fr: "À retenir", // i18n-ignore
  it: "In evidenza", // i18n-ignore
  pt: "Destaques", // i18n-ignore
};

const CATEGORY_LABELS: Record<ReleaseCategory, string> = {
  feature: "Yenilik",
  fix: "Düzeltme",
  security: "Güvenlik",
  hotfix: "Acil düzeltme",
};

/**
 * The summary of a release as a row of small cards: the bold lead of each
 * bullet is the card's title, the sentence after it the card's text.
 */
function Highlights({ items }: { items: ChangelogItem[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item, index) => {
        const lead = /^\*\*([^*]+)\*\*\s*(.*)$/.exec(item.text);
        return (
          <li
            key={index}
            className="rounded-field border border-[var(--hairline)] bg-base-200 px-3.5 py-3"
          >
            <p className="text-sm font-semibold text-base-content">
              {lead ? lead[1] : <InlineText text={item.text} />}
            </p>
            {lead && lead[2] ? (
              <p className="mt-1 text-sm leading-relaxed text-muted">
                <InlineText text={lead[2]} />
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
