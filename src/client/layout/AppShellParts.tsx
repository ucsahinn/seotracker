import { Sidebar } from "@/client/components/Sidebar";

export function MobileSidebarDrawer({
  open,
  projectId,
  onClose,
}: {
  open: boolean;
  projectId: string | null;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close sidebar"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 h-full shadow-xl">
        <Sidebar projectId={projectId} onNavigate={onClose} onClose={onClose} />
      </div>
    </div>
  );
}
