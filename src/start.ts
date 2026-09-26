import { createCsrfMiddleware, createStart } from "@tanstack/react-start";
import { globalServerFunctionMiddleware } from "@/serverFunctions/middleware";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

/*
 * Named, rather than inlined into the factory below, so a test can assert the
 * CSRF middleware is still registered. `createStart` resolves its factory
 * lazily, so `startInstance.getOptions()` is empty at import time and there is
 * nothing else to assert against.
 */
export const startOptions = {
  requestMiddleware: [csrfMiddleware],
  functionMiddleware: globalServerFunctionMiddleware,
};

export const startInstance = createStart(() => startOptions);
