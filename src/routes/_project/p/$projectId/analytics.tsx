import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AnalyticsPage } from "@/client/features/analytics/AnalyticsPage";
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";
import { GA4_REPORT_KINDS } from "@/shared/ga4-reports";

/*
 * The window lives in the URL, the way the search-performance screen's does.
 * It was React state, so a reload, a Back, or a link sent to someone else
 * silently reset it to 28 days -- and a screenshot of "son 90 gün" pasted
 * into a message opened on a different period than the sender saw.
 *
 * `catch` degrades a hand-edited value to the default rather than throwing.
 */
const searchSchema = z
  .object({
    view: z
      .enum([...GA4_REPORT_KINDS, "measurement_health"])
      .catch("landing_pages")
      .default("landing_pages"),
    channel: z
      .enum(["organic_search", "all"])
      .catch("organic_search")
      .default("organic_search"),
    offset: z.number().int().min(0).max(10000000).catch(0).default(0),
    limit: z
      .union([z.literal(50), z.literal(100), z.literal(200)])
      .catch(50)
      .default(50),
    audience: z
      .enum(["device", "country", "new_vs_returning"])
      .catch("device")
      .default("device"),
    acquisition: z
      .enum(["channel_group", "source_medium", "campaign"])
      .catch("channel_group")
      .default("channel_group"),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    host: z.string().min(1).max(253).optional(),
    pageGroup: z.string().min(1).max(8192).optional(),
    path: z.string().startsWith("/").max(4096).optional(),
    windowDays: z
      .union([z.literal(7), z.literal(28), z.literal(90)])
      .catch(DEFAULT_WINDOW_DAYS)
      .default(DEFAULT_WINDOW_DAYS),
  })
  .refine(
    (value) =>
      Boolean(value.startDate) === Boolean(value.endDate) &&
      (!value.startDate || !value.endDate || value.startDate <= value.endDate),
    "Provide both dates in chronological order.",
  )
  .refine(
    (value) =>
      !value.pageGroup ||
      (value.view === "landing_pages" && !value.host && !value.path),
    "A page group requires a landing-page report without a raw page filter.",
  )
  .refine(
    (value) => Boolean(value.host) === Boolean(value.path),
    "Provide both host and path.",
  );

export const Route = createFileRoute("/_project/p/$projectId/analytics")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  const search = Route.useSearch();
  const { windowDays } = search;
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <AnalyticsPage
      projectId={projectId}
      windowDays={windowDays}
      scope={search}
      onScopeChange={(next) => {
        void navigate({ search: (prev) => ({ ...prev, ...next }) });
      }}
      onWindowChange={(next) => {
        void navigate({
          search: (prev) => ({
            ...prev,
            windowDays: next,
            offset: 0,
            startDate: undefined,
            endDate: undefined,
          }),
        });
      }}
    />
  );
}
