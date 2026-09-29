import { QueryClient } from "@tanstack/query-core";

/**
 * How often the screens go and look again.
 *
 * `staleTime` is five minutes, not seconds, and the interval below is thirty
 * — because of what is on the other end. Search Console finalises a day two
 * to three days late and Analytics reports one day behind, so a query asked
 * every thirty seconds returns the same numbers roughly 2,880 times a day and
 * spends a per-property quota to do it. The data does not move faster than
 * the poll; the poll would only move faster than the data.
 *
 * Thirty minutes is what an operator leaving the dashboard open all day
 * actually gets from polling: the boundary where Google publishes a new day
 * is crossed once, and the screen notices without being reloaded. Anything
 * finer is spend without a reading behind it.
 *
 * `refetchOnWindowFocus` stays on (React Query's default), which is the other
 * half: coming back to the tab after lunch re-reads anything older than the
 * stale time immediately, so the interval is the fallback rather than the
 * mechanism.
 *
 * Two things deliberately opt out of this and poll far harder, because they
 * watch a local process rather than Google: a running crawl (1.5s) and the
 * audit history while one is in flight (5s). Those set their own
 * `refetchInterval` at the call site.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 5, // 5 minutes — show cached data instantly, refetch in background after
      refetchInterval: 1000 * 60 * 30,
      /*
       * Only while the tab is visible. A background tab polling for hours is
       * quota spent on numbers nobody is looking at, and on a laptop it is
       * also a wakeup every half hour for nothing.
       */
      refetchIntervalInBackground: false,
    },
  },
});
