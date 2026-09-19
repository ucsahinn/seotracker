import { createAuthClient } from "better-auth/react";
import {
  genericOAuthClient,
  organizationClient,
} from "better-auth/client/plugins";
import { orgAccessControl, orgRoles } from "@/lib/org-permissions";

// Nobody signs in here: the user is resolved per request from the auth mode.
// The client exists so components can read the resolved identity (the account
// menu's email) and so the generic-OAuth plugin's types line up with the
// server's.
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  plugins: [
    // ac/roles must match the server plugin exactly, otherwise the client's
    // synchronous checkRolePermission evaluates against the defaults and
    // disagrees with the server.
    organizationClient({ ac: orgAccessControl, roles: orgRoles }),
    genericOAuthClient(),
  ],
});

export const { useSession } = authClient;
