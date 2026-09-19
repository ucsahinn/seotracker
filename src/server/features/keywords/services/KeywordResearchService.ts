import {
  deleteSavedKeywordTag,
  getSavedKeywords,
  removeSavedKeywords,
  saveKeywords,
  exportSavedKeywords,
  updateSavedKeywordTag,
  updateSavedKeywordTags,
} from "@/server/features/keywords/services/research";

/**
 * Saved keywords: the list a user builds from their own Search Console data.
 * Keyword discovery itself came from a paid third-party API and is gone; what
 * remains is storage, tagging and export.
 */
export const KeywordResearchService = {
  saveKeywords,
  getSavedKeywords,
  exportSavedKeywords,
  updateSavedKeywordTags,
  updateSavedKeywordTag,
  deleteSavedKeywordTag,
  removeSavedKeywords,
} as const;
