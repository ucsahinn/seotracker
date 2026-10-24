import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  deleteSavedKeywordTag,
  updateSavedKeywordTag,
} from "@/serverFunctions/savedKeywords";
import type { TagColorKey } from "@/shared/tag-colors";
import { t } from "@/shared/i18n";

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
      if (result.success) toast.success(t("Etiket güncellendi"));
      // `success: false` means the tag was gone (deleted from another tab);
      // the list has just been refetched, so say that rather than "failed".
      else toast.error(t("Etiket artık yok. Liste yenilendi."));
    } catch (error) {
      toast.error(getStandardErrorMessage(error, t("Etiket güncellenemedi")));
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
        toast.error(t("Etiket zaten silinmiş. Liste yenilendi."));
        return false;
      }
      toast.success(t("Etiket silindi"));
      return true;
    } catch (error) {
      toast.error(getStandardErrorMessage(error, t("Etiket silinemedi")));
      return false;
    } finally {
      markBusy(tagId, false);
    }
  };

  return { busyTagIds, updateTag, deleteTag };
}
