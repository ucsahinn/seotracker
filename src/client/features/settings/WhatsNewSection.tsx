import { ChevronRight } from "lucide-react";
import * as React from "react";
import { formatDate } from "@/client/lib/format";
import { SettingsHeading } from "@/client/components/HelpTip";
import { CopyButton } from "@/client/components/CopyButton";
import {
  CHANGELOG_ENTRIES,
  type ChangelogEntry,
} from "@/client/features/settings/changelog";

/*
 * One release, because there is one release.
 *
 * `CHANGELOG.md` now keeps only the version that is published; the older
 * notes live in `git log`. A list that offers "previous N releases" for a
 * repository with a single tag promises history the operator cannot
 * actually be running, so the expander is gone with it.
 */

/**
 * What changed, in the app rather than only on GitHub.
 *
 * An operator who updates a self-hosted tool has no release page in front of
 * them — they ran a command and the container came back a version newer.
 * This is the same text the repository keeps, read straight out of
 * `CHANGELOG.md`, so it cannot fall behind what was actually shipped.
 */
export function WhatsNewSection({ version }: { version: string }) {
  if (CHANGELOG_ENTRIES.length === 0) return null;

  return (
    <section id="surum-notlari" className="scroll-mt-16 space-y-3">
      <SettingsHeading
        title="Sürüm notları"
        help="Bu sürümde neyin değiştiği. Metin depodaki CHANGELOG.md dosyasından okunur, yani yayımlananla aynıdır."
      />

      <div className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300">
        {CHANGELOG_ENTRIES.map((entry) => (
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
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-base-200/50"
      >
        <ChevronRight
          className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden
        />
        <span className="font-medium tabular-nums">v{entry.version}</span>
        {entry.date ? (
          <span className="text-xs text-muted">{formatDate(entry.date)}</span>
        ) : null}
        {isRunning ? (
          <span className="rounded-full border border-base-300 px-2 py-0.5 text-[11px] text-muted">
            çalışan sürüm
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="space-y-4 px-4 pb-4 pl-11">
          {entry.intro ? (
            <p className="max-w-prose text-sm leading-relaxed">
              <InlineText text={entry.intro} />
            </p>
          ) : null}
          {entry.sections.map((section) => (
            <div key={section.heading} className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {section.heading}
              </h3>
              <ul className="space-y-2 pl-4">
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
                          label="Komutu kopyala"
                          successMessage="Komut kopyalandı"
                        />
                      </div>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className="max-w-prose list-disc text-sm leading-relaxed marker:text-subtle"
                    >
                      <InlineText text={item.text} />
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
