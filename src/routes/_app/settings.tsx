import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <div className="h-full overflow-auto bg-base-100">
      <div className="mx-auto w-full max-w-4xl space-y-8 p-4 py-8 pb-24 sm:p-6 md:py-12 md:pb-12">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <Outlet />
      </div>
    </div>
  );
}
