import * as React from "react";

/**
 * The one tab strip, and the panel it controls.
 *
 * Six screens had grown their own `role="tablist"` with `role="tab"` children
 * and nothing else: no `aria-controls`, no `role="tabpanel"`, no arrow keys.
 * `aria-selected` promises a relationship a screen reader can then follow, and
 * following it led nowhere (WCAG 4.1.2). Tab is also the only widget in the
 * ARIA pattern set where Tab-the-key does *not* move between the options --
 * the strip is one stop and the arrows move within it -- so a keyboard user
 * who tabbed once and pressed the right arrow got nothing.
 *
 * Two of those six were never tabs. A set of links that change the URL is
 * navigation, and a pick-one filter that re-queries the same table is a radio
 * group; both are handled at their own call sites rather than bent into this.
 */
interface TabItem<Id extends string> {
  id: Id;
  label: React.ReactNode;
}

function tabId(group: string, id: string) {
  return `${group}-tab-${id}`;
}

function panelId(group: string, id: string) {
  return `${group}-panel-${id}`;
}

export function Tabs<Id extends string>({
  group,
  items,
  value,
  onChange,
  className = "",
}: {
  /** Unique per screen: it namespaces the generated tab and panel ids. */
  group: string;
  items: readonly TabItem<Id>[];
  value: Id;
  onChange: (id: Id) => void;
  className?: string;
}) {
  const refs = React.useRef(new Map<Id, HTMLButtonElement>());

  const select = (index: number) => {
    const next = items[index];
    if (!next) return;
    onChange(next.id);
    // Focus follows selection, which is the automatic-activation half of the
    // pattern and the right half here: every panel is already rendered from
    // state, so there is no request to spare by deferring activation.
    refs.current.get(next.id)?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = items.length - 1;
    const target =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % items.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + items.length) % items.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    select(target);
  };

  return (
    <div role="tablist" className={`tabs tabs-border ${className}`}>
      {items.map((item, index) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            id={tabId(group, item.id)}
            ref={(node) => {
              if (node) refs.current.set(item.id, node);
              else refs.current.delete(item.id);
            }}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId(group, item.id)}
            /*
             * Roving tabindex: the strip is a single stop in the page's tab
             * order, and the arrows move inside it. Without this, a strip of
             * six tabs costs six Tab presses to walk past.
             */
            tabIndex={active ? 0 : -1}
            className={`tab ${active ? "tab-active" : ""}`}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The content half. `tabIndex={0}` is deliberate: a panel whose content holds
 * no focusable element is otherwise unreachable by keyboard, so the reader
 * arrives at the tab and can never get to what it selected.
 */
export function TabPanel({
  group,
  value,
  className,
  children,
}: {
  group: string;
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={panelId(group, value)}
      role="tabpanel"
      aria-labelledby={tabId(group, value)}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}
