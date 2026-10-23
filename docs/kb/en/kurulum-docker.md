---
title: Installing with Docker
description: Install with Docker on Mac, Linux and Windows. One command is enough, and no .env file is needed. Your data stays in Docker's data volume.
kind: nasil-yapilir
updated: 2026-10-22
---

This guide gets the app running in Docker (a program that runs apps in isolated containers) at `http://localhost:3001`. If you use Windows, the single-file Windows installation is much easier; this guide is for Mac, Linux and people who already use Docker. The first start takes a few minutes because the app is built inside the container. Later starts take seconds.

## What you need

- Docker Desktop (Mac, Windows) or Docker Engine with Docker Compose (Linux).
- On Windows, Docker Desktop also needs WSL 2 and virtualization enabled in the BIOS/UEFI.
- Git. If you do not have it, **Code → Download ZIP** on the GitHub page also works.
- About 2 GB of free disk space, and 2 GB of free memory during the first build.

## Steps

1. Download the repository (the project files) and go into its folder:

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Start the app:

```sh
docker compose up -d
```

That is all. No `.env` file is needed. The encryption key and the assistant password are created automatically on first start and stored in Docker's data volume.

3. To follow the progress, run:

```sh
docker compose logs -f
```

4. Wait. The log line "Building client + server" marks the first build. Wait until `docker compose ps` shows the status **healthy**, then open `http://localhost:3001` in the browser.

The next step is the Google connection guide. On Docker, the two redirect addresses you enter at Google are:

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Updating

Run these two commands:

```sh
git pull
docker compose up -d --build
```

**Ayarlar → Hakkında** (Settings → About) tells you about the new version and shows these two commands. Your data stays in the data volume named `seotracker_data`, so updating does not delete it.

### Stopping and removing

- To stop: `docker compose stop`
- To start again: `docker compose up -d`
- To remove the container and keep the data: `docker compose down`
- To delete the data too: `docker compose down -v`. This command permanently deletes the database, the Google connections and the reports.

### Backing up

Your data is in the `seotracker_data` volume, at the path `/app/.wrangler` inside the container. To make a backup, run these three commands in order:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

To restore, use `tar xzf` instead of `tar czf` in the same command. The `instance-secret` file in the data volume is the key that encrypts the Google connections. A backup that lacks it restores without the Google connections.

### Settings (optional)

No setting is required. To change something, put a `.env` file in the project folder and then run `docker compose up -d --force-recreate seotracker`.

| Setting name                           | What it does                                                                                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                                   | The port number, 3001 by default. When it changes, the Google redirect addresses change too                                                  |
| ALLOWED_HOST                           | The public host name, if the app runs behind another server. If empty, only localhost                                                        |
| AUTH_MODE                              | `local_noauth` (default) or `cloudflare_access`                                                                                              |
| BETTER_AUTH_SECRET                     | The encryption key. Leave it empty and the app creates one. If you set it by hand, use at least 32 characters and never change it afterwards |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | An alternative to entering them on the **Ayarlar** (Settings) screen. A value entered on the screen takes priority                           |
| PAGESPEED_API_KEY                      | An alternative to entering it on the **Ayarlar** (Settings) screen                                                                           |
| MCP_TOKEN                              | If empty, it is created on first start. If you write `off`, no password is asked. Any other value is used as it is                           |

## Check

- In the output of `docker compose ps`, the status should be **healthy**. On the first start, it can take up to five minutes to get there.
- The output of `curl.exe http://127.0.0.1:3001/api/health` should start with "status":"ok". You can also open `http://127.0.0.1:3001/api/health` in the browser.
- `http://localhost:3001` should open in the browser. The status card on the **Yardım** (Help) screen should say "Her şey yolunda." (Everything is fine.) Before you connect Google, the "Google girişi" (Google sign-in) row asks for attention. This is normal.

## Frequently asked questions

**Why is the first start long?** The app is built inside the container. On later starts, the build is skipped.

**Where is the `.env.example` file?** There is none. That file, inherited from the upstream project, described things that are not in this version. The full list is in the table above and in the `docs/ENVIRONMENT.md` file.

**Can I open it to the internet?** The app does not ask who you are, so do not open it to the internet without your own authentication in front of it. If you set `ALLOWED_HOST`, the app warns you in the health check.

**Where do I get my assistant's password?** The **Ajan kurulumu** (Agent setup) screen in the app shows the command: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. If you use Git Bash, put `MSYS_NO_PATHCONV=1` in front of the command.

## If something goes wrong

- **It says "Bind for 127.0.0.1:3001 failed".** The port number is in use. Put a `.env` file with the line `PORT=3002` in the project folder and recreate the container. On Windows, Notepad may save the file as `.env.txt`; in PowerShell, `Set-Content -Encoding ascii .env 'PORT=3002'` avoids that.
- **The status is "unhealthy".** `docker compose logs --tail 50` shows the last lines. If memory ran out during the build, give Docker Desktop more memory.
- **The Google connection says "yapılandırılmamış" (not configured).** If `BETTER_AUTH_SECRET` is shorter than 32 characters, Google stays off. If you set it by hand, make it longer. If you did not, the `instance-secret` file in the data volume may be damaged.
- **The Google connection dropped after an update.** `BETTER_AUTH_SECRET` changed, or the data volume was recreated. Choose **Yeniden bağlan** (Reconnect) in the project settings.

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
