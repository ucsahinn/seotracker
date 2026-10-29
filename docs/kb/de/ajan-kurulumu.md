---
title: Assistent einrichten
description: Agent sicher verbinden, einen neuen Werkzeugaufruf prüfen und SEO-Fähigkeiten nutzen.
kind: nasil-yapilir
updated: 2026-10-27
---

Die Assistenten-Einrichtung verbindet einen KI-Assistenten wie Claude Code, Codex oder Cursor über MCP (Model Context Protocol) mit seowatcher. Danach liest der Assistent Ihre Search-Console-, Analytics- und Audit-Daten aus der App auf Ihrem Computer, startet Audits und schreibt Berichte. Was der Assistent liest, kann an dessen Anbieter gehen.

## Agent verbinden

Öffnen Sie die Agent-Einrichtung. Wählen Sie Claude Code, Codex oder Andere und kopieren Sie den Einrichtungstext. Pfeile, Pos1 und Ende ändern nur die Auswahl. Der Text enthält kein tatsächliches Token; der Agent verwendet das lokale Geheimnis. Eine Neuinstallation ist eine getrennte Option.

## Neuen Aufruf prüfen

Starten Sie die Verbindungsprüfung und bitten Sie den Agenten um einen seowatcher-Werkzeugaufruf. Die Seite prüft den lokalen Verlauf alle fünf Sekunden, höchstens 60 Sekunden lang. Ein alter Aufruf bestätigt keine neue Einrichtung. Ausgeblendeter Tab, Lesefehler oder Abbruch stoppen die Abfrage. Ohne neuen Aufruf prüfen Sie den MCP-Status im Client und versuchen es erneut. Das beweist keinen Verbindungsfehler.

Verbunden und letzter Aufruf beschreiben vergangene Nutzung, keine dauerhafte Sitzung. Bei unbekanntem Status erneut lesen. Der Werkzeugzugriff gilt installationsweit.

## Token schützen

Bevorzugen Sie den Einrichtungstext. Manuell gehört `Authorization: Bearer <token>` nur in das lokale Geheimnisfeld des Clients. PowerShell kopiert ohne Bildschirmausgabe:

Windows: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker: `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Danach in das lokale Feld einfügen und die Zwischenablage löschen. Kein Token in Chat, Terminalausgabe, Screenshots oder Quelltext. Der Tray-Menüpunkt zum Datenordner führt zur Windows-Datei.

## Fähigkeiten und Fehler

Der Fähigkeiten-Tab zeigt SEO-Abläufe. Der Einrichtungstext installiert sie; der Aktualisierungstext erneuert sie. Claude Code: /seo-audit; Codex: $seo-audit. Bei 401 den lokalen Header prüfen, bei Verbindungsablehnung App und Endpunkt prüfen. Danach MCP-Status aktualisieren und einen neuen Aufruf nachweisen.
