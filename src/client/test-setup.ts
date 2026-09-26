import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

/**
 * Unmount between tests.
 *
 * `@testing-library/react` mounts into a container it appends to
 * `document.body` and does not remove it, so without this every query after
 * the first test searches the leftovers of the ones before it -- and the
 * failure mode is a passing test, because `getByText` finds the string on
 * the previous render.
 */
afterEach(cleanup);
