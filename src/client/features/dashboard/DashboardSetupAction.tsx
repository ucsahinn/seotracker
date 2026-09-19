import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAgentSetupPrompt } from "@/client/features/ai-mcp/agentSetupPrompt";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { CreateProjectModal } from "@/client/features/projects/CreateProjectModal";
import { ProjectMarketFields } from "@/client/features/projects/ProjectMarketFields";
import type { ProjectSummary } from "@/client/features/projects/types";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import { getProjects, setProjectWebsite } from "@/serverFunctions/projects";
import type { DashboardSetupStep } from "@/types/schemas/dashboard";
import { normalizeDomainCandidate } from "@/client/lib/domain-input";

const projectPrompt = `Use seotracker to set up a separate project for each website below. List my existing projects first and reuse matches so you don’t create duplicates. Set the country and language for each site, and ask me about anything missing.

Replace this list with my websites:
- Project name — website — country — language`;

export function DashboardSetupAction({
  step,
  projectId,
  onComplete,
}: {
  step: DashboardSetupStep;
  projectId: string;
  onComplete: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    enabled: step === "domain",
  });
  const project = projects.data?.find((item) => item.id === projectId);
  if (step === "domain")
    return project ? (
      <WebsiteForm project={project} onComplete={onComplete} />
    ) : projects.isError ? (
      <p role="alert" className="text-sm text-error">
        {getStandardErrorMessage(projects.error)}
      </p>
    ) : (
      <div className="skeleton h-36" aria-busy />
    );
  if (step === "mcp")
    return (
      <div className="max-w-2xl space-y-4">
        <p className="text-sm leading-relaxed text-base-content/65">
          Paste this prompt into your agent to automatically configure
          seotracker for you.
        </p>
        <div className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-200/25 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">seotracker plugin</p>
            <p className="mt-1 text-xs text-muted">
              MCP connection + SEO skills
            </p>
          </div>
          <div className="shrink-0 [&>button]:h-10 [&>button]:w-full [&>button]:gap-2 [&>button]:text-sm">
            <CopyButton
              primary
              value={getAgentSetupPrompt(
                typeof window === "undefined"
                  ? "https://localhost:3001"
                  : window.location.origin,
              )}
              label="Kurulum istemini kopyala"
              successMessage="Kurulum istemi kopyalandı"
              onCopy={() =>
                captureClientEvent("onboarding:setup_prompt_copy", {
                  source: "dashboard",
                })
              }
            />
          </div>
        </div>
        <a
          href="https://localhost:3001/docs/mcp"
          target="_blank"
          rel="noreferrer"
          className="inline-block text-xs text-muted underline decoration-base-content/25 underline-offset-4 hover:text-base-content"
        >
          Manual setup instructions
        </a>
      </div>
    );
  if (step === "gsc")
    return (
      <SearchConsoleConnectionCard
        projectId={projectId}
        returnTo={
          typeof window === "undefined"
            ? undefined
            : `${window.location.href.split("#")[0]}#connect-gsc`
        }
      />
    );
  if (step === "project")
    return (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-base-content/65">
          Keep each website’s research, rankings, and connections in its own
          project. Use the project switcher in the sidebar → New project
          anytime.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowModal(true)}
        >
          Create another project
        </button>
        <details className="rounded-lg border border-base-300 p-4">
          <summary className="cursor-pointer text-sm font-medium">
            Have a list of websites? Let your agent set them up.
          </summary>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-base-content/65">
              <Link to="/ai" className="link">
                Connect your agent
              </Link>
              , then paste this prompt with your list of websites.
            </p>
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-base-content/65">
              {projectPrompt}
            </pre>
            <CopyButton
              value={projectPrompt}
              label="Proje istemini kopyala"
              successMessage="Proje istemi kopyalandı"
            />
          </div>
        </details>
        {showModal && (
          <CreateProjectModal onClose={() => setShowModal(false)} />
        )}
      </div>
    );
  return null;
}

function WebsiteForm({
  project,
  onComplete,
}: {
  project: ProjectSummary;
  onComplete: () => void;
}) {
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: (value: {
      domain: string;
      locationCode: number;
      languageCode: string;
    }) => setProjectWebsite({ data: { projectId: project.id, ...value } }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardActivation", project.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardOverview", project.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["projectAccess", project.id],
        }),
      ]);
      toast.success("Site kaydedildi");
      onComplete();
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          "Couldn’t save your website. Try again.",
        ),
      ),
  });
  const form = useForm({
    defaultValues: {
      domain: project.domain ?? "",
      market: {
        locationCode: project.locationCode,
        languageCode: project.languageCode,
      },
    },
    onSubmit: ({ value }) =>
      save.mutate({ domain: value.domain.trim(), ...value.market }),
  });
  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <p className="text-sm leading-relaxed text-base-content/65">
        Add the website for this project and choose the country your customers
        search from. You can change these in project settings anytime.
      </p>
      <form.Field
        name="domain"
        validators={{
          onChange: ({ value }) => {
            const parsed = normalizeDomainCandidate(value);
            return parsed.ok ? undefined : parsed.message;
          },
        }}
      >
        {(field) => (
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Website</span>
            <input
              type="text"
              required
              maxLength={255}
              placeholder="example.com"
              className="input input-bordered w-full"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-xs text-error">
                {field.state.meta.errors.join(", ")}
              </span>
            )}
          </label>
        )}
      </form.Field>
      <form.Field name="market">
        {(field) => (
          <ProjectMarketFields
            value={field.state.value}
            onChange={field.handleChange}
          />
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!canSubmit || isSubmitting || save.isPending}
          >
            {save.isPending ? "Saving…" : "Siteyi kaydet"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
