-- Successful checks reuse one singleton row. A failed check aborts the D1
-- batch, including writes preceding it, rather than silently skipping a row.
CREATE TABLE project_context_write_guard (
  valid INTEGER PRIMARY KEY CONSTRAINT context_edit_conflict CHECK (valid = 1)
);
