import type { getSearchOpportunities } from "@/serverFunctions/opportunities";

/** The successful shape of the opportunities report, shared by the page and its table. */
export type OpportunityReport = Extract<
  Awaited<ReturnType<typeof getSearchOpportunities>>,
  { status: "ok" }
>["report"];
