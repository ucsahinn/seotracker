/**
 * Sort keys shared by the server-paginated rankings table and its headers.
 * The full population is ordered before pagination in rankingArchiveView.
 */

export type SortKey =
  | "query"
  | "position"
  | "impressions"
  | "clicks"
  | "days"
  | "delta";
