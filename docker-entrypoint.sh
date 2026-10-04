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
  if [ ! -e "$INSTANCE_SECRET_FILE" ]; then
    SECRET_DIR="$(dirname "$INSTANCE_SECRET_FILE")"
    mkdir -p "$SECRET_DIR"
    # Written to a private temp file in the same directory, then linked into
    # place: the key file either does not exist or is complete, never half
    # written, and `ln` refuses to overwrite a key a parallel start just made.
    # 32 random bytes; base64 makes 44 characters, comfortably over the minimum.
    SECRET_TMP="$(umask 077 && mktemp "$SECRET_DIR/.instance-secret.XXXXXX")"
    head -c 32 /dev/urandom | base64 | tr -d '[:space:]' > "$SECRET_TMP"
    test "$(wc -c < "$SECRET_TMP" | tr -d '[:space:]')" -eq 44
    chmod 600 "$SECRET_TMP"
    if ln "$SECRET_TMP" "$INSTANCE_SECRET_FILE" 2>/dev/null; then
      echo "Generated an instance encryption key at $INSTANCE_SECRET_FILE."
    elif [ ! -e "$INSTANCE_SECRET_FILE" ]; then
      # Not "a parallel start won the race": the link itself failed (a volume
      # without hard-link support, or a read-only one). Say so, instead of
      # letting the check below blame a file that was never created.
      rm -f "$SECRET_TMP"
      echo "ERROR: could not create $INSTANCE_SECRET_FILE (is the data volume writable and does it support hard links?)." >&2
      exit 1
    fi
    rm -f "$SECRET_TMP"
  fi
  # An existing key is never replaced here: it may already protect stored
  # Google tokens, and a fresh one would make them unreadable. If the file is
  # damaged, stop and let the operator decide.
  INSTANCE_SECRET="$(tr -d '[:space:]' < "$INSTANCE_SECRET_FILE" 2>/dev/null || true)"
  case "$INSTANCE_SECRET" in
    *[!A-Za-z0-9+/=]* | "")
      INSTANCE_SECRET_OK=0 ;;
    *)
      if [ "${#INSTANCE_SECRET}" -ge 32 ]; then INSTANCE_SECRET_OK=1; else INSTANCE_SECRET_OK=0; fi ;;
  esac
  if [ "$INSTANCE_SECRET_OK" -ne 1 ]; then
    echo "ERROR: $INSTANCE_SECRET_FILE exists but is not a valid encryption key" >&2
    echo "(expected at least 32 base64 characters, no other content)." >&2
    echo "It was NOT replaced, because it may protect stored Google tokens." >&2
    echo "Restore it from a backup, or set BETTER_AUTH_SECRET to the key you used." >&2
    echo "If nothing is stored yet (Google never connected), delete the file and restart" >&2
    echo "to generate a new one; Google will have to be reconnected otherwise." >&2
    exit 1
  fi
  BETTER_AUTH_SECRET="$INSTANCE_SECRET"
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
#
# The opt-out is the literal "off", not an empty value: compose.yaml passes
# MCP_TOKEN=${MCP_TOKEN:-}, so an empty string is what every default install
# already has, and "leave it empty" could never mean "no token".
MCP_TOKEN_FILE="/app/.wrangler/mcp-token"
# Trimmed first: the server trims the value too, so a whitespace-only value
# would otherwise be exported, read back as empty, and open the endpoint.
MCP_TOKEN="$(printf '%s' "${MCP_TOKEN:-}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
if [ "$MCP_TOKEN" = "off" ]; then
  unset MCP_TOKEN
  echo "MCP_TOKEN=off: the /mcp endpoint accepts requests without a token."
elif [ -z "$MCP_TOKEN" ]; then
  # Not just -s: a file left empty (or cut short) by an interrupted first boot
  # would export an empty or weak token. This token guards nothing stored, so
  # unlike the encryption key it is safe to regenerate when it is not whole.
  if [ ! -s "$MCP_TOKEN_FILE" ] || [ "$(wc -c < "$MCP_TOKEN_FILE" | tr -d '[:space:]')" -lt 16 ]; then
    MCP_TOKEN_DIR="$(dirname "$MCP_TOKEN_FILE")"
    mkdir -p "$MCP_TOKEN_DIR"
    # Private temp file, then an atomic rename: the token file is never
    # readable by others and never half written.
    MCP_TOKEN_TMP="$(umask 077 && mktemp "$MCP_TOKEN_DIR/.mcp-token.XXXXXX")"
    head -c 24 /dev/urandom | base64 | tr -d '[:space:]/+=' > "$MCP_TOKEN_TMP"
    chmod 600 "$MCP_TOKEN_TMP"
    mv -f "$MCP_TOKEN_TMP" "$MCP_TOKEN_FILE"
    echo ""
    echo "Generated an MCP token at $MCP_TOKEN_FILE."
    echo "Agents must now send it. Read it with:"
    echo "  docker compose exec seotracker cat $MCP_TOKEN_FILE"
    echo "and add 'Authorization: Bearer <token>' to your MCP client config."
    echo "To run without one, set MCP_TOKEN=off and recreate the container."
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
