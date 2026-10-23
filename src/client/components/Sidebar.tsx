import { Link } from "@tanstack/react-router";
import type { LinkOptions } from "@tanstack/react-router";
import { type ComponentType } from "react";
import { CircleHelp, Settings, X } from "lucide-react";
import {
  connectNavGroup,
  getProjectNavGroups,
} from "@/client/navigation/items";
import { ProjectSwitcher } from "@/client/features/projects/ProjectSwitcher";

interface SidebarProps {
  projectId: string | null;
  onNavigate?: () => void;
  onClose?: () => void;
}

const navItemBaseClass =
  "flex items-center gap-2.5 rounded-field px-3 py-2 text-sm text-muted";

// Hover uses a lighter tint than the active background (bg-base-300/50) so a
// hovered item next to the active one stays visually distinct instead of
// merging into a single block.
const navItemClass = `${navItemBaseClass} transition-colors hover:bg-base-300/30 hover:text-base-content`;

// The fill alone marks the active item; a bar on top of it said the same thing
// twice.
const navItemActiveProps = {
  // Keep the active tint on hover so the active item does not fall back to the
  // lighter hover background of navItemClass.
  className:
    "bg-base-300/50 hover:bg-base-300/50 font-medium text-base-content",
};

function SidebarNavLink({
  icon: Icon,
  label,
  onNavigate,
  linkProps,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onNavigate?: () => void;
  linkProps: LinkOptions;
}) {
  return (
    <Link
      onClick={onNavigate}
      activeOptions={{ exact: false, includeSearch: false }}
      {...linkProps}
      className={navItemClass}
      activeProps={navItemActiveProps}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function Sidebar({ projectId, onNavigate, onClose }: SidebarProps) {
  const navGroups = projectId
    ? getProjectNavGroups(projectId)
    : [connectNavGroup];
  return (
    <div className="flex h-full w-60 flex-col bg-base-200">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2 text-base font-semibold text-base-content"
        >
          <img
            src="/icon.svg"
            alt=""
            width={22}
            height={22}
            className="rounded-md"
          />
          seowatcher
        </Link>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Kenar çubuğunu kapat"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <div className="px-3 pb-1">
        <ProjectSwitcher
          activeProjectId={projectId}
          onCloseDrawer={onNavigate}
        />
      </div>

      <nav
        aria-label="Ana gezinme"
        className="min-h-0 flex-1 overflow-y-auto px-2 py-2"
      >
        {navGroups.map((group) => (
          <div key={group.label ?? "top"} className="mb-1">
            {group.label ? (
              <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-subtle">
                {group.label}
              </div>
            ) : null}
            {group.items.map((item) => {
              const { icon, label, ...linkProps } = item;
              return (
                <SidebarNavLink
                  key={linkProps.to}
                  icon={icon}
                  label={label}
                  onNavigate={onNavigate}
                  linkProps={linkProps}
                />
              );
            })}
          </div>
        ))}
      </nav>

      <SidebarFooter onNavigate={onNavigate} />
    </div>
  );
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="shrink-0 border-t border-base-300 px-2 py-2 pb-safe">
      <SidebarNavLink
        icon={CircleHelp}
        label="Yardım"
        onNavigate={onNavigate}
        linkProps={{ to: "/support" }}
      />
      <SidebarNavLink
        icon={Settings}
        label="Ayarlar"
        onNavigate={onNavigate}
        linkProps={{ to: "/settings" }}
      />
    </div>
  );
}
