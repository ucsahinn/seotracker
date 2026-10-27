import { z } from "zod";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
/** Batch local quota snapshot reads after reports settle; never probe Google. */
export function useAnalyticsQuota(projectId: string) {
  const client = useQueryClient();
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = client.getQueryCache().subscribe((event) => {
      if (event.type !== "updated" || event.action.type !== "success") return;
      const parsed = z
        .tuple([z.string(), z.string()])
        .rest(z.unknown())
        .safeParse(event.query.queryKey);
      if (!parsed.success) return;
      const key = parsed.data;
      if (
        key[1] !== projectId ||
        !["ga4Report", "ga4Overview"].includes(String(key[0]))
      )
        return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        void client.invalidateQueries({ queryKey: ["quotaStatus", projectId] });
      }, 150);
    });
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [client, projectId]);
}
