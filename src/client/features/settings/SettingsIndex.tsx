import * as React from "react";

const SETTINGS_SECTIONS = [
  { id: "gorunum", label: "Görünüm" },
  { id: "google", label: "Google" },
  { id: "hizmet-hesabi", label: "Hizmet hesabı" },
  { id: "hiz-olcumu", label: "Hız ölçümü" },
  { id: "sinirlar", label: "Sınırlar" },
  { id: "guncelleme", label: "Hakkında" },
  { id: "surum-notlari", label: "Sürüm notları" },
] as const;

/**
 * Sticky jump list for the settings page.
 *
 * Seven sections stack into one long scroll, and the screens that send people
 * here (a missing Google client, a missing PageSpeed key) want one specific
 * block, not the top. Plain anchors, so it works with no script and the URL
 * stays shareable; the observer only decides which one is highlighted.
 */
export function SettingsIndex() {
  const [active, setActive] = React.useState<string>(SETTINGS_SECTIONS[0].id);

  React.useEffect(() => {
    const elements = SETTINGS_SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The first section on screen in page order, not the last one to
        // have scrolled in.
        const first = SETTINGS_SECTIONS.find((section) =>
          visible.has(section.id),
        );
        if (first) setActive(first.id);
      },
      { rootMargin: "-64px 0px -55% 0px" },
    );
    for (const element of elements) observer.observe(element);

    // A full page load on /settings#hiz-olcumu runs before these sections
    // exist, so the browser's own jump finds nothing.
    const hash = window.location.hash.slice(1);
    if (hash) document.getElementById(hash)?.scrollIntoView();

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Ayar bölümleri"
      className="sticky top-0 z-10 -mx-1 mb-6 overflow-x-auto bg-base-100/95 px-1 py-2 backdrop-blur-sm [scrollbar-width:none]"
    >
      <ul className="flex w-max gap-1 text-sm">
        {SETTINGS_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? "location" : undefined}
              onClick={() => setActive(section.id)}
              className={`block rounded-full px-3 py-1.5 transition-colors ${
                active === section.id
                  ? "bg-base-200 font-medium text-base-content"
                  : "text-muted hover:text-base-content"
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
