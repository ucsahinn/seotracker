import { useQuery } from "@tanstack/react-query";
import {
  ANNOUNCEMENTS_QUERY_KEY,
  ANNOUNCEMENTS_REFRESH_MS,
  getLiveAnnouncements,
} from "./feed";

export function useLiveAnnouncements() {
  return useQuery({
    queryKey: ANNOUNCEMENTS_QUERY_KEY,
    queryFn: ({ signal }) => getLiveAnnouncements(signal),
    staleTime: 60_000,
    gcTime: 30 * 60_000,
    refetchInterval: ANNOUNCEMENTS_REFRESH_MS,
    refetchIntervalInBackground: false,
    retry: false,
  });
}
