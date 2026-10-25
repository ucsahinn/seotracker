const ERROR_DETAIL_LIMIT = 300;

/** Keep an audit failure useful to support while removing machine-specific data. */
export function sanitizeAuditErrorDetail(detail: string | null): string | null {
  if (!detail) return null;

  const sanitized = detail
    .replace(/https?:\/\/[^\s"'<>]+/gi, "[URL redacted]")
    .replace(/\bBearer\s+[^\s,;]+/gi, "Bearer [redacted]")
    .replace(
      /\b(access[_-]?token|refresh[_-]?token|token|client[_-]?secret|api[_-]?key|authorization|password|secret)(\s*[:=]\s*)["']?[^"'&,\s}]+["']?/gi,
      "$1$2[redacted]",
    )
    .replace(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "[email redacted]")
    .replace(/\b[A-Z]:\\(?:[^\s"'<>:]|\\)+/g, "[path redacted]")
    .replace(/\\\\[^\\\s]+\\[^\\\s]+(?:\\[^\s"'<>]*)?/g, "[path redacted]")
    .replace(
      /\/(?:home|Users|tmp|var|opt|root|mnt|workspace|srv|private|Volumes)\/[^\s"'<>]*/g,
      "[path redacted]",
    )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, ERROR_DETAIL_LIMIT);
  return sanitized || null;
}
