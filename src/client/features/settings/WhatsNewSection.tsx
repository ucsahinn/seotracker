import { ChevronRight } from "lucide-react";
import * as React from "react";
import { formatDate } from "@/client/lib/format";
import { CopyButton } from "@/client/components/CopyButton";
import { EmptyState } from "@/client/components/EmptyState";
import { FactStrip } from "@/client/components/FactStrip";
import { guideUrl } from "@/client/features/support/links";
import { getLocale, t } from "@/shared/i18n";
import {
  getReleaseCategories,
  stripLeadingEmoji,
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
 * Localized notes are bundled with the app, so reading them needs no network.
 */
export function WhatsNewSection({ version }: { version: string }) {
  const locale = getLocale();
  const entries = CHANGELOG_ENTRIES_BY_LOCALE[locale];
  const hasRunning = entries.some((entry) => entry.version === version);

  return (
    <section id="surum-notlari" className="scroll-mt-16 space-y-3">
      <FactStrip
        label={t("Sürüm notları")}
        facts={[{ label: t("Kurulu sürüm"), value: `v${version}` }]}
        detailsLabel={t("Ayrıntılar")}
        details={
          <p>
            {t(
              "Her sürümde nelerin eklendiğini ve düzeltildiğini burada bulabilirsiniz.",
            )}
          </p>
        }
      />

      {entries.length === 0 ? (
        <EmptyState
          title={t("Bu pakette sürüm notu bulunmuyor.")}
          description={t(
            "Notlar uygulama paketiyle birlikte gelir. Yayınlanan notları kılavuzdan kontrol edebilirsiniz; bu durum kurulum kontrolü değildir.",
          )}
          action={
            <a
              href={guideUrl("surum-notlari")}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-sm"
            >
              {t("Kılavuzu aç")}
              <span className="sr-only"> {t("(yeni sekmede açılır)")}</span>
            </a>
          }
        />
      ) : !hasRunning ? (
        <p className="text-sm text-muted" role="status">
          {t(
            "Bu kurulu sürüm için sürüm notu bulunmuyor. Aşağıda bu paketle gelen son notlar var.",
          )}
        </p>
      ) : null}

      {entries.length > 0 ? (
        <div className="divide-y divide-base-300 overflow-hidden rounded-box border border-[var(--hairline)]">
          {entries.map((entry, index) => (
            <ReleaseNotes
              key={entry.version}
              entry={entry}
              isRunning={entry.version === version}
              initiallyOpen={
                entry.version === version || (!hasRunning && index === 0)
              }
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]*\))/g;

/**
 * The inline markdown these notes use -- bold, code, links -- as elements.
 * Built as React nodes rather than HTML, so a note can never inject markup;
 * links accept web destinations and local paths; other schemes stay text.
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
        const link = /^\[([^\]]+)\]\(([^)]*)\)$/.exec(part);
        if (!link) return part;
        const href = link[2].trim();
        const safe =
          /^(https?:\/\/|\/(?!\/)|#)/i.test(href) &&
          !/[\s\\]/.test(href) &&
          !Array.from(href).some((char) => {
            const code = char.charCodeAt(0);
            return code <= 31 || code === 127;
          });
        if (!safe) return link[1];
        const external = /^https?:\/\//i.test(href);
        return (
          <a
            key={index}
            href={href}
            className="link link-primary break-words"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
          >
            {link[1]}
            {external ? (
              <span className="sr-only"> {t("(yeni sekmede açılır)")}</span>
            ) : null}
          </a>
        );
      })}
    </>
  );
}

function ReleaseNotes({
  entry,
  isRunning,
  initiallyOpen,
}: {
  entry: ChangelogEntry;
  isRunning: boolean;
  initiallyOpen: boolean;
}) {
  // Open the installed release, or the newest note if that release is absent.
  const [open, setOpen] = React.useState(initiallyOpen);

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
        <span className="font-medium tabular-nums">v{entry.version}</span>
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
          className="space-y-4 px-4 pb-4 sm:pl-11"
        >
          {entry.intro ? (
            <p className="max-w-prose text-[15px] leading-relaxed text-base-content">
              <InlineText text={entry.intro} />
            </p>
          ) : null}
          {entry.sections.map((section) =>
            stripLeadingEmoji(section.heading) === HIGHLIGHTS[getLocale()] ? (
              <Highlights key={section.heading} items={section.items} />
            ) : (
              <details
                key={section.heading}
                className="border-t border-[var(--hairline)] pt-2"
              >
                <summary className="cursor-pointer py-3 text-sm font-semibold">
                  <h3 className="inline">{section.heading}</h3>
                </summary>
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
              </details>
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
  fr: "Points forts", // i18n-ignore
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
 * The summary of a release as a list: each bold lead precedes its explanation.
 */
function Highlights({ items }: { items: ChangelogItem[] }) {
  return (
    <ul className="divide-y divide-base-300">
      {items.map((item, index) => {
        const lead = /^\*\*([^*]+)\*\*\s*(.*)$/.exec(item.text);
        return (
          <li key={index} className="py-3 first:pt-0 last:pb-0">
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
