import { d1Db } from "./d1/client";

// The database handle. SQLite through D1 is the only backend: this install
// serves one person, and a per-audit crawl is the heaviest thing it writes.
export const db = d1Db;
