import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementsPage } from "@/client/features/announcements/AnnouncementsPage";

export const Route = createFileRoute("/_app/announcements")({
  component: AnnouncementsPage,
});
