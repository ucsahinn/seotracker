import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import {
  removeSavedKeywords,
  updateSavedKeywordTags,
} from "@/serverFunctions/savedKeywords";

/** Bulk remove and bulk tag, with the screen's own reset steps passed in. */
export function useSavedKeywordMutations({
  projectId,
  onRemoved,
  onRemoveFailed,
  onTagged,
}: {
  projectId: string;
  onRemoved: () => void;
  onRemoveFailed: (message: string) => void;
  onTagged: () => void;
}) {
  const queryClient = useQueryClient();
  const invalidateSavedKeywords = () =>
    queryClient.invalidateQueries({ queryKey: ["savedKeywords", projectId] });

  const removeMutation = useMutation({
    mutationFn: (savedKeywordIds: string[]) =>
      removeSavedKeywords({ data: { projectId, savedKeywordIds } }),
    onSuccess: (result) => {
      onRemoved();
      void invalidateSavedKeywords();
      captureClientEvent("saved_keywords:bulk_remove", {
        count: result.deletedCount,
      });
      toast.success(`${result.deletedCount} kelime kaldırıldı`);
    },
    onError: (error) => {
      onRemoveFailed(getStandardErrorMessage(error, "Kaldırma başarısız."));
    },
  });

  const tagMutation = useMutation({
    mutationFn: (input: {
      savedKeywordIds: string[];
      addTags?: string[];
      removeTagIds?: string[];
    }) =>
      updateSavedKeywordTags({
        data: {
          projectId,
          savedKeywordIds: input.savedKeywordIds,
          addTags: input.addTags,
          removeTagIds: input.removeTagIds,
        },
      }),
    onSuccess: (result) => {
      onTagged();
      void invalidateSavedKeywords();
      toast.success(`${result.taggedCount} kelimenin etiketleri güncellendi`);
    },
    onError: (error) => {
      toast.error(getStandardErrorMessage(error, "Etiketler güncellenemedi"));
    },
  });

  return { removeMutation, tagMutation };
}
