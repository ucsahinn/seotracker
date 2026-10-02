import { useQuery } from "@tanstack/react-query";
import { getLastProjectId } from "@/client/lib/active-project";
import { getProjects } from "@/serverFunctions/projects";

/**
 * The project an app-level screen (Ayarlar, Yardım) should read quotas for:
 * the remembered one if it is still in the list, else the first. The list
 * shares the sidebar's query key, so it is usually already cached. Quotas are
 * per project but these screens are not, so "no project" is a real answer.
 */
export function useActiveProjectId() {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const projects = query.data ?? [];
  const remembered = getLastProjectId();
  const projectId =
    projects.find((project) => project.id === remembered)?.id ??
    projects[0]?.id ??
    null;
  return { projectId, isPending: query.isPending, isError: query.isError };
}
