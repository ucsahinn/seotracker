import { z } from "zod";
import { isSupportedLanguageCode } from "@/shared/keyword-locations";

export const projectIdSchema = z
  .string()
  .min(1)
  .describe(
    "Required. The seotracker project ID to scope this call to. Get one from list_projects.",
  );

export const locationCodeSchema = z
  .number()
  .int()
  .positive()
  .describe(
    "Numeric location code for the project's default market (e.g. 2840 = United States). Defaults to the project's market; see list_projects, editable in project settings. It only labels the market a saved keyword belongs to - this build has no market data of its own.",
  );

export const languageCodeSchema = z
  .string()
  .refine(isSupportedLanguageCode, {
    message:
      "Unsupported language code. Use a supported code such as 'en', 'es', 'de', or 'fr'.",
  })
  .describe(
    "Language code (e.g. 'en', 'es', 'vi'). Defaults to the project's default market language (see list_projects).",
  );
