import { searchFold } from "@/client/lib/searchFold";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Search } from "lucide-react";
import { formatRegionName } from "@/shared/format";
import { LOCATION_OPTIONS } from "@/shared/keyword-locations";

type LocationOption = (typeof LOCATION_OPTIONS)[number];

type Props = {
  value: number;
  onChange: (locationCode: number) => void;
  /** Defaults to the full country list. Pass a subset (e.g. Labs-only). */
  options?: readonly LocationOption[];
  /** Width utilities for the wrapper/trigger. Defaults to full width. */
  className?: string;
};

/** The country in Turkish; the English data label when the runtime has no name for the code. */
function countryName(option: LocationOption): string {
  return formatRegionName(option.shortLabel, option.label);
}

function matches(option: LocationOption, query: string): boolean {
  const needle = searchFold(query.trim());
  if (!needle) return true;
  return (
    searchFold(countryName(option)).includes(needle) ||
    searchFold(option.label).includes(needle) ||
    searchFold(option.shortLabel).includes(needle)
  );
}

/**
 * Searchable country picker. Allows users to filter the country list instead of
 * scrolling it. The scrollable list is preserved below the search input.
 */
export function LocationSelect({
  value,
  onChange,
  options = LOCATION_OPTIONS,
  className = "w-full",
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((option) => option.code === value) ?? null;

  const filtered = useMemo(
    () => options.filter((option) => matches(option, query)),
    [options, query],
  );

  // Reset transient state and focus the search input each time the menu opens.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.focus();
  }, [open]);

  // Close on outside click so it behaves like the surrounding native selects.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !containerRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Keep the highlighted option in view as the user arrows through results.
  useEffect(() => {
    if (!open) return;
    const activeItem = listRef.current?.children[activeIndex];
    activeItem?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const select = (option: LocationOption) => {
    onChange(option.code);
    close();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Enter": {
        event.preventDefault();
        const option = filtered[activeIndex];
        if (option) select(option);
        break;
      }
      case "Escape":
        event.preventDefault();
        close();
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Ülke: ${selected ? countryName(selected) : "seçilmedi"}`}
        className="select select-bordered flex w-full items-center justify-between gap-2 text-left font-normal"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="truncate">
          {selected ? countryName(selected) : "Ülke seçin"}
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-48 max-w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
          <label className="flex items-center gap-2 rounded-field border border-[var(--control-border)] px-3 py-2 focus-within:border-primary">
            <Search className="size-4 shrink-0 text-muted" />
            <input
              ref={inputRef}
              type="text"
              className="grow min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
              placeholder="Ülke ara"
              aria-label="Ülke ara"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
            />
          </label>

          <ul
            ref={listRef}
            role="listbox"
            className="menu mt-2 max-h-64 w-full flex-nowrap overflow-y-auto p-0"
          >
            {filtered.length === 0 ? (
              <li className="w-full break-all px-3 py-2 text-sm text-muted">
                “{query.trim()}” ile eşleşen ülke yok
              </li>
            ) : (
              filtered.map((option, index) => {
                const isSelected = option.code === value;
                return (
                  <li key={option.code} role="presentation">
                    <div
                      role="option"
                      aria-selected={isSelected}
                      className={`flex w-full cursor-pointer items-center ${index === activeIndex ? "menu-focus" : ""}`}
                      onClick={() => select(option)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <span className="flex-1 truncate">
                        {countryName(option)}
                      </span>
                      {isSelected ? (
                        <Check className="size-4 shrink-0 text-primary" />
                      ) : null}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
