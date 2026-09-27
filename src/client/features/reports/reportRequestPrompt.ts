/**
 * The prompt that turns this read-only screen into an actionable one.
 *
 * Reports are written by an agent through the `save_report` MCP tool and
 * read here — there is no human-authored HTML path, and inventing one would
 * mean building a document editor nobody asked for. What was missing is not
 * a save button but a way to *start* a report from the screen that lists
 * them, which is the same shape as the agent-setup prompt on the dashboard.
 */
export function reportRequestPrompt(projectId: string): string {
  return [
    "seotracker ile bu proje için bir SEO raporu yaz ve kaydet.",
    "",
    `Proje kimliği: ${projectId}`,
    "",
    "Sırasıyla:",
    "1. `get_project_context` ile projeyi tanı.",
    "2. `list_report_templates` ile kayıtlı şablon var mı bak; varsa uygun olanı kullan.",
    "3. Son denetimi (`get_audit_status`, `get_audit_issues`) ve Search Console verisini",
    "   (`get_search_console_performance`) oku. Veri yoksa uydurma, yok olduğunu yaz.",
    "4. Bulguları önem sırasına koy ve her biri için bu hafta yapılabilecek tek bir eylem yaz.",
    "5. `save_report` ile kendi kendine yeten tek bir HTML sayfası olarak kaydet.",
  ].join("\n");
}
