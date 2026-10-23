---
title: Assistent einrichten
description: Sie verbinden Claude Code, Codex oder Cursor mit der App. Hier finden Sie die Adresse, das Passwort, die 33 Werkzeuge, die 6 fertigen Aufgabenvorlagen und welche davon Google-Kontingent verbrauchen.
kind: nasil-yapilir
updated: 2026-10-22
---

Am Ende ist Ihr KI-Assistent mit der App verbunden und hat seinen ersten Befehl ausgeführt. Nach dem Verbinden können Sie sagen: „Prüfe die Website und schreibe einen Bericht.“ Der Assistent liest die Daten der Search Console, führt das Audit aus und speichert den Bericht auf dem Bildschirm **Raporlar** (Berichte). Diese Verbindung heißt Assistentenverbindung (MCP). Damit ruft der Assistent die Werkzeuge der App auf (zum Beispiel list_projects). Das Verbinden ist nicht Pflicht. Verbinden Sie nichts, fehlt der App nichts.

## Voraussetzungen

- Die laufende App und ein Projekt mit verbundener Search Console.
- Eines von Claude Code, Codex, Cursor, VS Code Copilot oder Gemini CLI. Für die ersten drei liefert die App einen fertigen Einrichtungstext.
- In der App der Bildschirm **Ajan kurulumu** (Assistent einrichten). Er steht im linken Menü im Bereich „Yapay zeka“ (Künstliche Intelligenz).

## Schritte

1. Öffnen Sie den Bildschirm **Ajan kurulumu**. Das Kennzeichen oben lautet **Henüz bağlanmadı** (Noch nicht verbunden) oder **Bağlandı** (Verbunden). Ist er verbunden, steht daneben ein Text wie „Claude Code, son çağrı 2 dk önce“ (Claude Code, letzter Aufruf vor 2 Min.). Darunter stehen die Verbindungsadresse und eine Kopierschaltfläche: `http://127.0.0.1:3001/mcp` (bei Docker `localhost`).
2. Suchen Sie das Passwort. Die App schützt die Verbindung mit einem Passwort gegen unberechtigte Aufrufe und zeigt das Passwort nicht auf dem Bildschirm an. Beim Windows-Paket liegt das Passwort in der Datei `mcp-token` im Datenordner. Wählen Sie im Menü der Taskleiste **Veri klasörünü aç** (Datenordner öffnen). Geben Sie bei Docker diesen Befehl ein: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` (in Git Bash setzen Sie `MSYS_NO_PATHCONV=1` davor).
3. Folgen Sie dem Abschnitt, der zu Ihrem Assistenten passt.

### Claude Code

Geben Sie im Terminal (in der Eingabeaufforderung) Folgendes ein. Ersetzen Sie `<parola>` durch Ihr eigenes Passwort:

```sh
claude mcp add --transport http --scope user seotracker http://127.0.0.1:3001/mcp --header "Authorization: Bearer <parola>"
```

Geben Sie dann in Claude Code `/mcp` ein und wählen Sie **Reconnect**. Die fertigen Aufgabenvorlagen rufen Sie mit einem Schrägstrich auf, etwa `/seo-audit`.

### Codex

Geben Sie diesen Befehl ein:

```sh
codex mcp add seotracker --url http://127.0.0.1:3001/mcp --bearer-token-env-var SEOTRACKER_MCP_AUTH
```

Schreiben Sie dann das Passwort in die Umgebungsvariable (eine Einstellung, die sich der Computer merkt) namens `SEOTRACKER_MCP_AUTH`. Unter Windows mit PowerShell: `[Environment]::SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', '<parola>', 'User')`. Die Vorlagen rufen Sie etwa mit `$seo-audit` auf.

### Cursor

Schreiben Sie in die Datei `.cursor/mcp.json` in Ihrem Projekt Folgendes:

```json
{
  "mcpServers": {
    "seotracker": {
      "url": "http://127.0.0.1:3001/mcp",
      "headers": { "Authorization": "Bearer ${env:SEOTRACKER_MCP_AUTH}" }
    }
  }
}
```

Setzen Sie die Umgebungsvariable wie bei Codex. Diese Einstellung wurde noch nicht in einer Cursor-Installation ausprobiert. Verlangt Ihre Cursor-Version ein anderes Feld, sehen Sie in der Dokumentation von Cursor nach.

### Fertiger Einrichtungstext

Das ist der einfachere Weg. So erhalten Sie den Text:

1. Klicken Sie auf dem Bildschirm auf die Schaltfläche **Ajan kurulum istemini kopyala** (Einrichtungstext für den Assistenten kopieren). Für Codex gibt es eine eigene Schaltfläche.
2. Fügen Sie den Text in Ihren Assistenten ein. Der Assistent richtet die Verbindung ein, probiert sie mit „whoami“ und „list_projects“ aus und lädt die Vorlagen.

Der **Kurulum istemi (sıfırdan kurulum)** (Einrichtungstext, Neuinstallation) lässt den Assistenten alles erledigen, vom Starten der App bis zur Google-Verbindung. Er kennt sowohl das Windows-Paket als auch die Docker-Installation.

### Die fertigen Aufgabenvorlagen laden

Der Reiter **Beceriler** (Skills) listet sechs fertige Aufgabenvorlagen auf. Sagen Sie dem Assistenten „installiere die seotracker-Skills“. Der Einrichtungstext weiß, wohin kopiert wird. Zum Aktualisieren klicken Sie auf **Güncelleme istemini kopyala** (Text für das Update kopieren).

## Werkzeuge

Es gibt insgesamt 33 Werkzeuge. Die Spalte „Schreibt“ markiert die, die Daten in der App verändern, die Spalte „Kontingent“ die, die vom Tageskontingent von Google verbrauchen. Werkzeuge, die schreiben, sollten nicht ohne Ihre Zustimmung aufgerufen werden. Gut eingerichtete Vorlagen fragen, die App fragt nicht.

| Werkzeug                                     | Was es tut                                                                                                  | Schreibt | Kontingent                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------- |
| `whoami`                                     | Sagt, welche Installation und welcher Benutzer Sie sind.                                                    |          |                                     |
| `get_diagnostics`                            | Liefert die Version, die Installationsprüfungen, die Tabellenzahlen, die letzten 25 Audits und die Kontingentzähler. |          |                                     |
| `list_projects`                              | Listet Ihre Projekte auf. Jedes Werkzeug verlangt eine Projektnummer.                                       |          |                                     |
| `create_project`                             | Legt ein neues Projekt an.                                                                                  | Ja       |                                     |
| `get_project_context`                        | Liest den Bildschirm Projektinfo.                                                                           |          |                                     |
| `update_project_context`                     | Ändert die Projektinfo und hinterlässt eine Notiz im Recherchejournal.                                      | Ja       |                                     |
| `get_search_console_performance`             | Liefert Klicks, Impressionen, Rate und Position nach Suchanfrage, Seite, Land, Gerät oder Datum.            |          |                                     |
| `get_search_opportunities`                   | Erstellt aus Search Console und Analytics eine Liste von Chancen.                                           |          |                                     |
| `get_cannibalization`                        | Zeigt Seiten, die bei derselben Suche miteinander konkurrieren.                                             |          |                                     |
| `get_ranking_history`                        | Liefert das Ranking-Archiv auf Ihrem Computer, hält nichts, was älter als 16 Monate ist.                    |          |                                     |
| `get_index_coverage`                         | Liefert bereits gespeicherte Index-Antworten von Google, fragt Google nicht.                                |          |                                     |
| `inspect_urls`                               | Fragt Google nach dem Status von Seiten, 10 Adressen pro Aufruf.                                            | Ja       | 2.000 pro Tag, pro Property         |
| `get_sitemaps`                               | Zeigt den Status der Sitemap in der Search Console.                                                         |          |                                     |
| `run_site_audit`                             | Startet das Website-Audit.                                                                                  | Ja       | PageSpeed, wenn Geschwindigkeitsmessung an ist |
| `get_audit_status`                           | Sagt, in welcher Phase das Audit ist, und kann ein hängendes Audit als fehlgeschlagen markieren.            |          |                                     |
| `get_audit_issues`                           | Liefert die gefundenen Probleme mit den Schritten zur Behebung.                                             |          |                                     |
| `get_audit_pages`                            | Listet die gecrawlten Seiten auf.                                                                           |          |                                     |
| `get_google_analytics_organic_overview`      | Liefert eine Zusammenfassung der Besuche aus der Suche und den vorherigen Zeitraum.                         |          |                                     |
| `get_google_analytics_organic_landing_pages` | Listet die Seiten auf, auf denen Besucher aus der Suche zuerst ankommen.                                    |          |                                     |
| `get_google_analytics_page_performance`      | Liefert Aufrufe und Interaktion der Seiten.                                                                 |          |                                     |
| `get_google_analytics_traffic_acquisition`   | Liefert die Verteilung der Besucher nach Kanal, Quelle und Kampagne.                                        |          |                                     |
| `get_google_analytics_key_events`            | Liefert die Ereignisse, die in Analytics als Schlüsselereignisse markiert sind.                             |          |                                     |
| `get_google_analytics_ecommerce_performance` | Liefert die Produktverkäufe.                                                                                |          |                                     |
| `get_google_analytics_site_search`           | Liefert die Begriffe, die Besucher in das Suchfeld Ihrer Website eingeben.                                  |          |                                     |
| `get_google_analytics_audience_breakdown`    | Teilt die Besucher nach Gerät, Land, neu und wiederkehrend auf.                                             |          |                                     |
| `get_google_analytics_measurement_health`    | Prüft die Messungseinrichtung, verbraucht kein Berichtskontingent.                                          |          |                                     |
| `list_saved_keywords`                        | Listet die Suchbegriffe auf, die Sie gespeichert haben.                                                     |          |                                     |
| `save_keywords`                              | Speichert Suchbegriffe.                                                                                     | Ja       |                                     |
| `list_reports`                               | Listet Ihre Berichte auf.                                                                                   |          |                                     |
| `get_report`                                 | Liest einen Bericht, auf Wunsch auch seine HTML-Fassung.                                                    |          |                                     |
| `save_report`                                | Speichert einen Bericht oder aktualisiert einen vorhandenen.                                                | Ja       |                                     |
| `list_report_templates`                      | Liest die Berichtsvorlagen.                                                                                 |          |                                     |
| `save_report_template`                       | Speichert eine Berichtsvorlage.                                                                             | Ja       |                                     |

Die Analytics-Werkzeuge verbrauchen vom Berichtskontingent von Google Analytics (bei einer Standard-Property 200.000 Einheiten pro Tag). Dieses Kontingent verfolgen Sie in der App im Bereich Grenzen auf dem Bildschirm **Ayarlar** (Einstellungen).

## Fertige Aufgabenvorlagen (Skills)

| Vorlage             | Wann sie verwendet wird                                                                                                                        | Was sie erzeugt                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `seo-coach`         | Wenn Sie fragen „Was soll ich tun?“. Sie erklärt den Weg und schlägt den nächsten Schritt vor.                                                 | Gespräch, bei Bedarf eine Coaching-Notiz              |
| `seo-project-setup` | In einem neuen Projekt. Sie fragt nach Ihrem Geschäft, Ihrem Ziel, Ihren Wettbewerbern, Ihren wichtigen Seiten und füllt den Bildschirm Projektinfo aus. | Ausgefüllte Projektinfo, gespeicherte Suchbegriffe    |
| `seo-audit`         | Wenn Sie sagen „Prüfe die Website“. Sie führt das Audit aus, verbindet es mit der Search Console und wählt „die eine Aufgabe für diese Woche“. | Einseitiger Audit-Bericht                             |
| `seo-triage`        | Wenn die Besuche sinken. Sie prüft, ob der Rückgang echt ist, wo und wann er stattfindet.                                                      | Bericht zur Untersuchung des Rückgangs                |
| `seo-check-in`      | Einmal im Monat. Sie vergleicht diesen Zeitraum mit dem vorherigen.                                                                            | Monatlicher Kontrollbericht; jeden Monat kommt einer dazu |
| `seo-report`        | Wenn die anderen Vorlagen fertig sind. Sie schreibt einen HTML-Bericht in einer einzigen Datei und speichert ihn.                              | Bericht auf dem Bildschirm **Raporlar**               |

## Kontrolle

- Sagen Sie dem Assistenten „Rufe das Werkzeug whoami auf“. Es sollte die Kennung der Installation nennen.
- Das Kennzeichen auf dem Bildschirm **Ajan kurulumu** sollte **Bağlandı** zeigen, und die Zeit des letzten Aufrufs sollte sichtbar sein.
- „list_projects“ sollte Ihre Projekte auflisten.

## Häufige Fragen

**Sendet der Assistent meine Daten nach außen?** Die Daten gehen an das Modell, das der Assistent verwendet. Das hängt von den Datenschutzbedingungen des Assistenten selbst ab. Die App antwortet nur auf die Verbindung auf Ihrem Computer.

**Funktioniert es ohne Passwort?** Bei Docker funktioniert es mit `MCP_TOKEN=off`. Beim Windows-Paket ist das Passwort immer aktiv. Bei einer Verbindung ohne Passwort kann jedes Programm auf demselben Computer die 33 Werkzeuge aufrufen.

**Kann der Assistent mein Google-Kontingent aufbrauchen?** `inspect_urls` und `run_site_audit` verbrauchen es. Die Vorlagen fragen pro Aufgabe höchstens 20 Adressen ab. Sie starten ein Audit nur, wenn Sie es wollen. Nennen Sie auch Ihrem Assistenten dieselbe Grenze.

**Welcher Assistent ist besser?** Das macht keinen Unterschied, die Werkzeuge sind dieselben. Der Einrichtungstext ist für Claude Code, Codex und Cursor fertig. Andere Assistenten funktionieren mit derselben Adresse und demselben Passwort, wenn sie MCP unterstützen.

## Wenn etwas nicht klappt

- **Der Assistent bekommt den Fehler 401.** Das Passwort ist falsch oder wird nicht gesendet. Kopieren Sie den Wert aus der Datei noch einmal. Am Ende darf kein Zeilenende-Zeichen stehen bleiben.
- **Die Verbindung wird abgelehnt.** Die App ist geschlossen. Sehen Sie auf das Symbol in der Taskleiste oder auf die Ausgabe von `docker compose ps`.
- **Der Assistent meldet „Werkzeug nicht gefunden“ („araç bulunamadı“).** Laden Sie die Verbindung neu. Geben Sie in Claude Code `/mcp` ein und wählen Sie **Reconnect**.
- **Die Vorlagen erscheinen nicht.** Fügen Sie den Einrichtungstext erneut ein. Die Vorlagen werden in den eigenen Ordner des Assistenten kopiert (bei Codex `$HOME/.agents/skills`).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (33 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
