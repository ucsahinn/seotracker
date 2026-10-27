import { z } from "zod";

export const reportInventorySchema = z.object({
  projectId: z.string().min(1),
  query: z.string().max(200).default(""),
  kind: z.string().max(160).default(""),
  recent: z.boolean().default(false),
  sort: z.enum(["updatedAt", "createdAt", "title"]).default("updatedAt"),
  page: z.number().int().min(1).max(10000).default(1),
});
export type ReportInventoryInput = z.infer<typeof reportInventorySchema>;
export const REPORT_INVENTORY_PAGE_SIZE = 25;

/** Turkish I/İ remains intentional in every locale; ASCII folding follows it. */
export function reportSearchText(value: string): string {
  return value.replaceAll("İ", "i").replaceAll("I", "ı").toLowerCase();
}
