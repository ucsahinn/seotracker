import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/client/features/notifications/NotificationsPage";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
});
