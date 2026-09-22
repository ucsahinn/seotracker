/**
 * Counts inside English text that agents read, not the Turkish UI.
 *
 * Deliberately separate from `src/client/lib/format.ts`, and deliberately
 * not called `formatCount`: both existed under that name, one pinned to
 * en-US and one to tr-TR, and the collision is how a number ended up
 * rendered two ways in the same product. MCP tool output and the operator
 * limit messages beside it are English by design (CLAUDE.md), so they format
 * in English.
 */
export const formatEnglishCount = (n: number) => n.toLocaleString("en-US");
