#!/bin/sh
# Self-host container entrypoint. vite build inlines the envPrefix'd client
# envs (see vite.config.ts) into the bundle, so the build must run at container
# start — but the output stays valid until those envs or the image change.
# Fingerprint them and skip the build when the last start's output matches; an
# image update lands a fresh container with no build output, so new code always
# rebuilds.
set -e

# The Google OAuth tokens are encrypted at rest, and this is that key. Nobody
# should have to invent it: generate one on first boot and keep it in the data
# volume, beside the database it protects. Setting BETTER_AUTH_SECRET yourself
# still wins -- but then keep it, because changing the key makes every stored
# token unreadable and Google has to be reconnected.
INSTANCE_SECRET_FILE="/app/.wrangler/instance-secret"
if [ -z "${BETTER_AUTH_SECRET:-}" ]; then
  if [ ! -f "$INSTANCE_SECRET_FILE" ]; then
    mkdir -p "$(dirname "$INSTANCE_SECRET_FILE")"
    # 32 random bytes; base64 makes 44 characters, comfortably over the minimum.
    head -c 32 /dev/urandom | base64 | tr -d '[:space:]' > "$INSTANCE_SECRET_FILE"
    chmod 600 "$INSTANCE_SECRET_FILE"
    echo "Generated an instance encryption key at $INSTANCE_SECRET_FILE."
  fi
  BETTER_AUTH_SECRET="$(cat "$INSTANCE_SECRET_FILE")"
  export BETTER_AUTH_SECRET
fi

# The MCP endpoint answers as the admin user and can spend Google's daily
# quota, so it should not be an open desk. Generated on first boot and kept in
# the data volume, the same way the encryption key above is -- a token nobody
# has to invent is a token that actually gets used.
#
# The value is NOT printed. Anything echoed here lands in `docker logs`, and
# the whole point of the token is to not be readable by whatever else can see
# this machine. The path is printed instead, with the command to read it.
MCP_TOKEN_FILE="/app/.wrangler/mcp-token"
if [ -z "${MCP_TOKEN:-}" ]; then
  if [ ! -f "$MCP_TOKEN_FILE" ]; then
    mkdir -p "$(dirname "$MCP_TOKEN_FILE")"
    head -c 24 /dev/urandom | base64 | tr -d '[:space:]/+=' > "$MCP_TOKEN_FILE"
    chmod 600 "$MCP_TOKEN_FILE"
    echo ""
    echo "Generated an MCP token at $MCP_TOKEN_FILE."
    echo "Agents must now send it. Read it with:"
    echo "  docker compose exec seotracker cat $MCP_TOKEN_FILE"
    echo "and add 'Authorization: Bearer <token>' to your MCP client config."
    echo "To run without one, set MCP_TOKEN= (empty) in your compose file."
    echo ""
  fi
  MCP_TOKEN="$(cat "$MCP_TOKEN_FILE")"
  export MCP_TOKEN
fi

# The preflight validates env BEFORE the slow steps, so misconfiguration fails
# in seconds with the exact fix instead of after a multi-minute build.
pnpm exec tsx scripts/selfhost-preflight.ts

pnpm run db:migrate:local

FP_FILE="dist/.seotracker-build-env"

# Everything that changes build output: the envPrefix prefixes from
# vite.config.ts (keep the two lists in sync).
FINGERPRINT="$(env | grep -E '^(VITE_|AUTH_MODE)' | sort | sha256sum | cut -d' ' -f1)"
# A missing sha256sum would yield an empty, always-matching fingerprint and
# silently disable rebuilds — fail loudly instead.
test -n "$FINGERPRINT"

if [ -f "$FP_FILE" ] && [ "$(cat "$FP_FILE")" = "$FINGERPRINT" ]; then
  echo "Reusing existing build (build-relevant env unchanged)."
else
  echo "Building client + server (first start, changed build env, or new image)..."
  rm -f "$FP_FILE"
  pnpm run build
  printf '%s' "$FINGERPRINT" > "$FP_FILE"
fi

exec pnpm exec vite preview --host 0.0.0.0 --port "${PORT:-3001}"
