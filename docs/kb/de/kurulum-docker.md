---
title: Installation mit Docker
description: App mit Docker unter Mac, Linux und Windows installieren: ein Befehl, keine .env-Datei. Die Daten liegen im Datenspeicher von Docker.
kind: nasil-yapilir
updated: 2026-10-22
---

Am Ende läuft die App in Docker (einem Programm, das Anwendungen in abgeschlossenen Containern ausführt) und ist unter `http://localhost:3001` geöffnet. Unter Windows ist die Installation mit einer einzigen Datei deutlich einfacher. Dieser Weg ist für Mac, Linux und alle, die Docker ohnehin nutzen. Der erste Start dauert einige Minuten, weil die App im Container gebaut wird. Spätere Starts dauern nur Sekunden.

## Voraussetzungen

- Docker Desktop (Mac, Windows) oder Docker Engine mit Docker Compose (Linux). Für Docker Desktop unter Windows müssen WSL 2 (die Komponente, die Linux innerhalb von Windows ausführt) und die Virtualisierung eingeschaltet sein.
- Git. Statt Git genügt auch **Code → Download ZIP** auf der GitHub-Seite.
- Etwa 2 GB freier Speicherplatz und 2 GB freier Arbeitsspeicher während des ersten Baus.

## Schritte

1. Laden Sie das Repository (die Projektdateien) herunter und wechseln Sie in den Ordner:

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Starten Sie die App:

```sh
docker compose up -d
```

Das ist alles. Eine `.env`-Datei brauchen Sie nicht. Der Verschlüsselungsschlüssel und das Passwort für den Assistenten werden beim ersten Start automatisch erzeugt und im Datenspeicher (Volume) von Docker abgelegt.

3. Wenn Sie den Fortschritt sehen möchten, geben Sie Folgendes ein:

```sh
docker compose logs -f
```

4. Die Zeile „Building client + server“ im Protokoll zeigt den ersten Bau. Warten Sie, bis der Status in der Ausgabe von `docker compose ps` **healthy** lautet, und öffnen Sie dann im Browser `http://localhost:3001`.

Weiter geht es mit der Anleitung zur Google-Verbindung. Bei Docker geben Sie Google diese beiden Weiterleitungsadressen an:

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Update

Geben Sie diese zwei Befehle ein:

```sh
git pull
docker compose up -d --build
```

**Ayarlar → Hakkında** (Einstellungen → Über) meldet die neue Version und zeigt diese beiden Befehle an. Ihre Daten liegen im Datenspeicher `seotracker_data`, deshalb löscht das Update sie nicht.

### Anhalten und entfernen

- Anhalten: `docker compose stop`
- Neu starten: `docker compose up -d`
- Container entfernen, Daten behalten: `docker compose down`
- Auch die Daten löschen: `docker compose down -v`. Dieser Befehl löscht die Datenbank, die Google-Verbindungen und die Berichte dauerhaft.

### Sicherung

Ihre Daten liegen im Datenspeicher `seotracker_data`, im Container unter dem Pfad `/app/.wrangler`. Für eine Sicherung geben Sie die drei Befehle nacheinander ein:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

Zum Wiederherstellen verwenden Sie im selben Befehl `tar xzf` statt `tar czf`. Die Datei `instance-secret` im Datenspeicher ist der Schlüssel, der die Google-Verbindungen verschlüsselt. Fehlt sie in der Sicherung, startet die App, aber die Google-Verbindungen kommen nicht zurück.

### Einstellungen (optional)

Keine Einstellung ist Pflicht. Wenn Sie etwas ändern möchten, legen Sie im Projektordner eine `.env`-Datei an. Geben Sie dann `docker compose up -d --force-recreate seotracker` ein.

| Name der Einstellung                   | Wozu sie dient                                                                                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                                   | Portnummer, Standard 3001. Ändert sie sich, ändern sich auch die Weiterleitungsadressen bei Google                                                                    |
| ALLOWED_HOST                           | Der von außen sichtbare Name, falls die App hinter einem anderen Server steht. Leer bedeutet nur localhost                                                            |
| AUTH_MODE                              | `local_noauth` (Standard) oder `cloudflare_access`                                                                                                                    |
| BETTER_AUTH_SECRET                     | Verschlüsselungsschlüssel. Lassen Sie ihn leer, die App erzeugt ihn. Geben Sie ihn von Hand an, nehmen Sie mindestens 32 Zeichen und ändern Sie ihn danach nicht mehr |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Alternative zur Eingabe auf dem Bildschirm **Ayarlar**. Ein auf dem Bildschirm eingegebener Wert hat Vorrang                                                          |
| PAGESPEED_API_KEY                      | Alternative zur Eingabe auf dem Bildschirm Ayarlar                                                                                                                    |
| MCP_TOKEN                              | Ist er leer, wird er beim ersten Start erzeugt. Mit `off` wird kein Passwort verlangt. Jeder andere Wert wird unverändert verwendet                                   |

## Kontrolle

- In der Ausgabe von `docker compose ps` muss der Status **healthy** lauten. Beim ersten Start kann es bis zu fünf Minuten dauern, bis er erreicht ist.
- Die Ausgabe von `curl.exe http://127.0.0.1:3001/api/health` (unter Windows; unter Mac und Linux `curl`) muss mit "status":"ok" beginnen. Sie können diese Adresse auch im Browser öffnen.
- Im Browser muss sich `http://localhost:3001` öffnen lassen. Die Statuskarte auf dem Bildschirm **Yardım** (Hilfe) sollte „Her şey yolunda.“ (Alles in Ordnung.) anzeigen. Solange Google nicht verbunden ist, ist die Zeile „Google girişi“ (Google-Anmeldung) als „braucht Aufmerksamkeit“ markiert. Das ist normal.

## Häufige Fragen

**Warum dauert der erste Start so lange?** Die App wird im Container gebaut. Bei späteren Starts entfällt der Bau.

**Wo ist die Datei `.env.example`?** Es gibt sie nicht. Die Datei aus dem übergeordneten Projekt beschrieb Dinge, die in dieser Version nicht vorkommen. Die vollständige Liste steht in der Tabelle oben und in der Datei `docs/ENVIRONMENT.md`.

**Kann ich die App im Internet erreichbar machen?** Die App verlangt keine Anmeldung. Machen Sie sie nur erreichbar, wenn Sie selbst eine Anmeldung davorschalten. Setzen Sie `ALLOWED_HOST`, warnt die App bei der Gesundheitsprüfung.

**Woher bekomme ich das Passwort meines Assistenten?** Der Bildschirm **Ajan kurulumu** (Assistent einrichten) in der App zeigt den Befehl: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Wenn Sie Git Bash benutzen, setzen Sie `MSYS_NO_PATHCONV=1` davor.

## Wenn etwas nicht klappt

- **Es erscheint „Bind for 127.0.0.1:3001 failed“.** Die Portnummer ist belegt. Legen Sie im Projektordner eine `.env` mit der Zeile `PORT=3002` an und erstellen Sie den Container neu. Unter Windows kann der Editor (Notepad) die Datei als `.env.txt` speichern. In PowerShell ist `Set-Content -Encoding ascii .env 'PORT=3002'` sicher.
- **Der Status lautet „unhealthy“.** `docker compose logs --tail 50` zeigt die letzten Zeilen. Ist beim Bau der Arbeitsspeicher ausgegangen, geben Sie Docker Desktop mehr Arbeitsspeicher.
- **Die Google-Verbindung meldet „yapılandırılmamış“ (nicht eingerichtet).** Ist `BETTER_AUTH_SECRET` kürzer als 32 Zeichen, bleibt Google ausgeschaltet. Haben Sie ihn von Hand angegeben, verlängern Sie ihn. Haben Sie ihn nicht angegeben, ist vielleicht die Datei `instance-secret` im Datenspeicher beschädigt.
- **Nach dem Update ist die Google-Verbindung getrennt.** `BETTER_AUTH_SECRET` hat sich geändert, oder der Datenspeicher wurde neu erstellt. Klicken Sie in den Projekteinstellungen auf **Yeniden bağlan** (Neu verbinden).

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
