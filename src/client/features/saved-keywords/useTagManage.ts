import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  deleteSavedKeywordTag,
  updateSavedKeywordTag,
} from "@/serverFunctions/savedKeywords";
import type { TagColorKey } from "@/shared/tag-colors";

export function useTagManage(projectId: string) {
  const queryClient = useQueryClient();
  const [busyTagIds, setBusyTagIds] = useState<Set<string>>(new Set());

  const markBusy = (tagId: string, busy: boolean) => {
    setBusyTagIds((current) => {
      const next = new Set(current);
      if (busy) next.add(tagId);
      else next.delete(tagId);
      return next;
    });
  };

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["savedKeywords", projectId] });

  const updateTag = async (input: {
    tagId: string;
    name?: string;
    color?: TagColorKey | null;
  }) => {
    markBusy(input.tagId, true);
    try {
      const result = await updateSavedKeywordTag({
        data: {
          projectId,
          tagId: input.tagId,
          name: input.name,
          color: input.color ?? undefined,
        },
      });
      await invalidate();
      if (result.success) toast.success("Etiket güncellendi");
      else toast.error("Etiket güncellenemedi");
    } catch (error) {
      toast.error(getStandardErrorMessage(error, "Etiket güncellenemedi"));
    } finally {
      markBusy(input.tagId, false);
    }
  };

  const deleteTag = async (tagId: string): Promise<boolean> => {
    markBusy(tagId, true);
    try {
      const result = await deleteSavedKeywordTag({
        data: { projectId, tagId },
      });
      await invalidate();
      if (!result.success) {
        toast.error("Etiket silinemedi");
        return false;
      }
      toast.success("Etiket silindi");
      return true;
    } catch (error) {
      toast.error(getStandardErrorMessage(error, "Etiket silinemedi"));
      return false;
    } finally {
      markBusy(tagId, false);
    }
  };

  return { busyTagIds, updateTag, deleteTag };
}
