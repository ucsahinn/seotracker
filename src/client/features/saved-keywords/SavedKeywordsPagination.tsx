import type { ComponentProps } from "react";
import { TablePagination } from "@/client/components/table/TablePagination";

export function SavedKeywordsPagination({
  hasActiveFilters,
  ...props
}: ComponentProps<typeof TablePagination> & { hasActiveFilters: boolean }) {
  if (props.totalCount === 0 && !hasActiveFilters) return null;
  return <TablePagination {...props} />;
}
