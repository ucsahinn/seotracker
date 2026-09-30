import { ChevronRight } from "lucide-react";
import * as React from "react";
import { formatDate } from "@/client/lib/format";
import { SettingsHeading } from "@/client/components/HelpTip";
import {
  CHANGELOG_ENTRIES,
  plainText,
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
    <section className="space-y-3">
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
            <p className="max-w-prose text-sm text-muted">
              {plainText(entry.intro)}
            </p>
          ) : null}
          {entry.sections.map((section) => (
            <div key={section.heading} className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {section.heading}
              </h3>
              <ul className="space-y-1.5">
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    className="max-w-prose text-sm leading-relaxed text-muted"
                  >
                    {plainText(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
