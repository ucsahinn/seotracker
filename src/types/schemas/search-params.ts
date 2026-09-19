import { z } from "zod";

/**
 * A URL search param that carries a boolean. The router hands it over as the
 * string "true"/"false" on a cold load and as a real boolean on an in-app
 * navigation, so both shapes have to parse.
 */
export const booleanSearchParamSchema = z
  .union([z.boolean(), z.enum(["true", "false"])])
  .transform((value) => value === true || value === "true");
