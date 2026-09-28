import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LighthouseIssuesScreen } from "@/client/features/lighthouse/issues/LighthouseIssuesScreen";
import { lighthouseIssuesSearchSchema } from "@/types/schemas/lighthouse";

export const Route = createFileRoute(
  "/_project/p/$projectId/audit/issues/$resultId",
)({
  validateSearch: lighthouseIssuesSearchSchema,
  component: AuditIssuesPage,
});

function AuditIssuesPage() {
  const { projectId, resultId } = Route.useParams();
  const { auditId, category } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <LighthouseIssuesScreen
      projectId={projectId}
      resultId={resultId}
      category={category}
      backLabel="Site Denetimi"
      onBack={() =>
        void navigate({
          to: "/p/$projectId/audit",
          params: { projectId },
          /*
           * Back to the tab this screen is reached from, not to the audit's
           * default one. Every route into here is the Performance table's
           * "Sorunları gör" button, and dropping `tab` landed the reader on
           * Sorunlar -- a different table, with no sign of where they were.
           */
          search: auditId
            ? { auditId, tab: "performance" as const }
            : undefined,
        })
      }
      // Pushed, so Back returns to the category the reader came from. The
      // category tabs are navigation, not a transient filter.
      onCategoryChange={(next) =>
        void navigate({ search: (prev) => ({ ...prev, category: next }) })
      }
    />
  );
}
