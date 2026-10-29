import { Link } from "@tanstack/react-router";
import type { LinkOptions } from "@tanstack/react-router";
import { type ComponentType } from "react";
import {
  CircleHelp,
  ExternalLink,
  Megaphone,
  ScrollText,
  Settings,
  X,
} from "lucide-react";
import {
  connectNavGroup,
  getProjectNavGroups,
} from "@/client/navigation/items";
import { ProjectSwitcher } from "@/client/features/projects/ProjectSwitcher";
import { NotificationBell } from "@/client/features/notifications/NotificationBell";
import { useLiveAnnouncements } from "@/client/features/announcements/useLiveAnnouncements";
import { useReadAnnouncementIds } from "@/client/features/announcements/readState";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";
import { siteUrl } from "@/client/features/support/links";

interface SidebarProps {
  projectId: string | null;
  onNavigate?: () => void;
  onClose?: () => void;
}

// `nav-item` is a hook for app.css: the light theme tints the active item with
// the accent there, so the dark theme stays exactly as it is.
const navItemBaseClass =
  "nav-item flex items-center gap-2.5 rounded-field px-3 py-2 text-sm text-muted";

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
    <div className="app-sidebar flex h-full w-60 flex-col bg-base-200">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <a
          href={siteUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          aria-label={t("seowatcher.io sitesini yeni sekmede aç")}
          className="group flex min-w-0 items-center gap-2 text-base font-semibold text-base-content"
        >
          <img src="/icon.svg" alt="" width={22} height={22} />
          <span className="truncate">seowatcher</span>
          <ExternalLink
            className="size-3 shrink-0 text-subtle opacity-70 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        </a>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label={t("Kenar çubuğunu kapat")}
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
        aria-label={t("Ana gezinme")}
        className="min-h-0 flex-1 overflow-y-auto px-2 py-2"
      >
        {navGroups.map((group) => (
          <div key={group.label ?? "top"} className="mb-1">
            {group.label ? (
              <div className="nav-group-label px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-subtle">
                {t(group.label)}
              </div>
            ) : null}
            {group.items.map((item) => {
              const { icon, label, ...linkProps } = item;
              return (
                <SidebarNavLink
                  key={linkProps.to}
                  icon={icon}
                  // Nav labels are Turkish module-level constants; translate
                  // them here, at render, where the locale is known.
                  label={t(label)}
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
  const { data = [] } = useLiveAnnouncements();
  const readIds = useReadAnnouncementIds();
  const unread = data.filter((item) => !readIds.includes(item.id)).length;
  return (
    <div className="shrink-0 border-t border-base-300 px-2 py-2 pb-safe">
      <Link
        to="/announcements"
        onClick={onNavigate}
        activeOptions={{ exact: false, includeSearch: false }}
        className={navItemClass}
        activeProps={navItemActiveProps}
      >
        <Megaphone className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">{t("Duyurular")}</span>
        {unread > 0 ? (
          <span className="badge badge-count badge-sm ml-auto">
            {formatCount(unread)}
          </span>
        ) : null}
      </Link>
      <SidebarNavLink
        icon={ScrollText}
        label={t("Sürüm notları")}
        onNavigate={onNavigate}
        linkProps={{ to: "/release-notes" }}
      />
      <NotificationBell onNavigate={onNavigate} />
      <SidebarNavLink
        icon={CircleHelp}
        label={t("Yardım")}
        onNavigate={onNavigate}
        linkProps={{ to: "/support" }}
      />
      <SidebarNavLink
        icon={Settings}
        label={t("Ayarlar")}
        onNavigate={onNavigate}
        linkProps={{ to: "/settings" }}
      />
    </div>
  );
}
