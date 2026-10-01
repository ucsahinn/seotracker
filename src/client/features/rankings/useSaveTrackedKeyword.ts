import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { saveKeywords } from "@/serverFunctions/savedKeywords";

/** Saves one tracked query as a keyword: the same call as the Sorgular tab's row action. */
export function useSaveTrackedKeyword(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (keyword: string) =>
      saveKeywords({ data: { projectId, keywords: [keyword] } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["savedKeywords", projectId],
      });
      toast.success("Kelime kayıtlı");
    },
    onError: (error) => {
      toast.error(getStandardErrorMessage(error, "Kelime kaydedilemedi"));
    },
  });
}
