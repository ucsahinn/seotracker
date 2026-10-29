---
title: Installation mit Docker
description: seowatcher mit Docker unter Mac, Linux und Windows installieren: ein Befehl, keine .env-Datei, die Daten liegen in einem Docker-Volume.
kind: nasil-yapilir
updated: 2026-10-22
---

Nach dieser Anleitung läuft die App in einem Docker-Container und ist unter `http://localhost:3001` erreichbar. Dieser Weg eignet sich für Mac, Linux und alle, die Docker ohnehin nutzen; unter Windows ist die [Installationsdatei](/docs/kurulum-windows/) einfacher.

## Voraussetzungen

- Docker Desktop (Mac, Windows) oder Docker Engine mit Docker Compose (Linux). Docker Desktop unter Windows braucht WSL 2 und eingeschaltete Virtualisierung.
- Git. Statt Git genügt auch **Code → Download ZIP** auf der GitHub-Seite.
- Etwa 2 GB freier Speicherplatz und 2 GB freier Arbeitsspeicher während des ersten Baus.

## Schritte

1. Laden Sie das Repository herunter und wechseln Sie in den Ordner:

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Starten Sie die App:

```sh
docker compose up -d
```

Eine `.env`-Datei brauchen Sie nicht. Der Verschlüsselungsschlüssel und das Token für KI-Agenten entstehen beim ersten Start automatisch und liegen im Docker-Volume.

3. Den Fortschritt verfolgen Sie mit:

```sh
docker compose logs -f
```

4. Die Zeile „Building client + server“ im Protokoll zeigt den ersten Bau. Warten Sie, bis der Status in der Ausgabe von `docker compose ps` **healthy** lautet, und öffnen Sie dann im Browser `http://localhost:3001`.

Verbinden Sie danach Google wie unter [Mit Google verbinden](/docs/google-baglantisi/) beschrieben. Für Docker lauten die beiden Weiterleitungsadressen:

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Update

Führen Sie im Projektordner aus:

```sh
git pull
docker compose up -d --build
```

**Einstellungen → Info** meldet eine neue Version und zeigt diese beiden Befehle an. Das Update lässt Ihre Daten im Volume `seotracker_data` unberührt.

### Anhalten und entfernen

- Anhalten: `docker compose stop`
- Neu starten: `docker compose up -d`
- Container entfernen, Daten behalten: `docker compose down`
- Auch die Daten löschen: `docker compose down -v`. Dieser Befehl löscht die Datenbank, die Google-Verbindungen und die Berichte dauerhaft.

### Sicherung

Die Daten liegen im Volume `seotracker_data`, im Container unter `/app/.wrangler`. Für eine Sicherung führen Sie nacheinander aus:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-backup.tgz -C /data .
docker compose up -d
```

Zum Wiederherstellen verwenden Sie im selben Befehl `tar xzf` statt `tar czf`. Die Datei `instance-secret` im Volume verschlüsselt die Google-Verbindungen. Fehlt sie in der Sicherung, startet die App zwar, die Google-Verbindungen sind aber verloren.

### Einstellungen (optional)

Keine Einstellung ist Pflicht. Um etwas zu ändern, legen Sie im Projektordner eine `.env`-Datei an und führen `docker compose up -d --force-recreate seotracker` aus.

| Name der Einstellung                   | Wozu sie dient                                                                                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                                   | Portnummer, Standard 3001. Ändert sie sich, ändern sich auch die Weiterleitungsadressen bei Google                                                                    |
| ALLOWED_HOST                           | Der von außen sichtbare Name, falls die App hinter einem anderen Server steht. Leer bedeutet nur localhost                                                            |
| AUTH_MODE                              | `local_noauth` (Standard) oder `cloudflare_access`                                                                                                                    |
| BETTER_AUTH_SECRET                     | Verschlüsselungsschlüssel. Lassen Sie ihn leer, die App erzeugt ihn. Geben Sie ihn von Hand an, nehmen Sie mindestens 32 Zeichen und ändern Sie ihn danach nicht mehr |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Alternative zur Eingabe auf dem Bildschirm **Einstellungen**. Ein auf dem Bildschirm eingegebener Wert hat Vorrang                                                    |
| PAGESPEED_API_KEY                      | Alternative zur Eingabe auf dem Bildschirm Einstellungen                                                                                                              |
| MCP_TOKEN                              | Token für KI-Agenten. Leer: wird beim ersten Start erzeugt. `off`: kein Token nötig. Jeder andere Wert wird unverändert verwendet                                     |

## Kontrolle

- In der Ausgabe von `docker compose ps` muss der Status **healthy** lauten. Beim ersten Start kann es bis zu fünf Minuten dauern, bis er erreicht ist.
- Die Ausgabe von `curl.exe http://127.0.0.1:3001/api/health` (unter Windows; unter Mac und Linux `curl`) muss mit "status":"ok" beginnen. Sie können diese Adresse auch im Browser öffnen.
- Im Browser muss sich `http://localhost:3001` öffnen lassen. Die Karte **Zustand der App** auf dem Bildschirm **Hilfe** sollte „Die Installationsprüfungen haben keine Probleme gefunden.“ melden. Solange Google nicht verbunden ist, zeigt die Zeile **Google-Anmeldung** eine Warnung. Das ist normal.

## Häufige Fragen

**Warum dauert der erste Start so lange?** Die App wird im Container gebaut. Bei späteren Starts entfällt der Bau.

**Wo ist die Datei `.env.example`?** Es gibt sie nicht. Die Vorlage des Ursprungsprojekts beschrieb Einstellungen, die es hier nicht gibt. Die vollständige Liste steht in der Tabelle oben und in der Datei `docs/ENVIRONMENT.md`.

**Kann ich die App im Internet erreichbar machen?** Die App verlangt keine Anmeldung. Machen Sie sie nur erreichbar, wenn Sie selbst eine Anmeldung davorschalten. Ist `ALLOWED_HOST` gesetzt, weist die Statusprüfung darauf hin.

**Woher bekomme ich das Token für meinen KI-Agenten?** Der Bildschirm **Agent-Einrichtung** in der App zeigt den Befehl: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Wenn Sie Git Bash benutzen, setzen Sie `MSYS_NO_PATHCONV=1` davor.

## Wenn etwas nicht klappt

- **Es erscheint „Bind for 127.0.0.1:3001 failed“.** Die Portnummer ist belegt. Legen Sie im Projektordner eine `.env` mit der Zeile `PORT=3002` an und erstellen Sie den Container neu. Unter Windows kann der Editor (Notepad) die Datei als `.env.txt` speichern. In PowerShell ist `Set-Content -Encoding ascii .env 'PORT=3002'` sicher.
- **Der Status lautet „unhealthy“.** `docker compose logs --tail 50` zeigt die letzten Zeilen. Ist beim Bau der Arbeitsspeicher ausgegangen, geben Sie Docker Desktop mehr Arbeitsspeicher.
- **Die Google-Verbindung meldet „nicht eingerichtet“.** Ist `BETTER_AUTH_SECRET` kürzer als 32 Zeichen, bleibt Google ausgeschaltet. Haben Sie den Wert von Hand gesetzt, verlängern Sie ihn. Haben Sie ihn nicht gesetzt, ist womöglich die Datei `instance-secret` im Volume beschädigt.
- **Nach dem Update ist die Google-Verbindung getrennt.** `BETTER_AUTH_SECRET` hat sich geändert, oder das Volume wurde neu erstellt. Klicken Sie in den Projekteinstellungen auf **Erneut verbinden**.

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
