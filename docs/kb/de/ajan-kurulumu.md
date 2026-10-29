---
title: Agent einrichten
description: KI-Agenten wie Claude Code oder Codex sicher über MCP verbinden, einen neuen Werkzeugaufruf bestätigen und die SEO-Skills nutzen.
kind: nasil-yapilir
updated: 2026-10-27
---

Über MCP (Model Context Protocol) liest ein KI-Agent wie Claude Code, Codex oder Cursor Ihre Search-Console-, Analytics- und Audit-Daten direkt aus der App auf Ihrem Computer. Er kann außerdem Audits starten und Berichte schreiben. Beachten Sie: Was der Agent liest, kann an seinen Anbieter übertragen werden.

## Agent verbinden

1. Öffnen Sie in der App den Bildschirm **Agent-Einrichtung**.
2. Wählen Sie **Claude Code**, **Codex** oder **Andere**. Pfeiltasten, Pos1 und Ende wechseln nur die Auswahl, ohne etwas zu kopieren.
3. Klicken Sie auf **Einrichtungsbefehl kopieren** und geben Sie den Text Ihrem Agenten.

Der Einrichtungsbefehl enthält kein Token; der Agent liest das lokale Geheimnis der Installation selbst. Für eine Installation von Grund auf gibt es die separate Option **Neueinrichtung**.

## Verbindung bestätigen

Klicken Sie auf **Verbindung bestätigen** und bitten Sie den Agenten, ein beliebiges seowatcher-Werkzeug aufzurufen. Die Seite sieht 60 Sekunden lang alle fünf Sekunden im lokalen Aufrufverlauf nach. Nur ein neuer Aufruf bestätigt die Einrichtung; ein älterer zählt nicht. Die Abfrage stoppt, wenn Sie den Tab wechseln, ein Lesefehler auftritt oder Sie abbrechen.

Erscheint kein neuer Aufruf, prüfen Sie den MCP-Status in Ihrem Client und versuchen Sie es erneut. Das allein beweist noch keinen Verbindungsfehler.

„Verbunden“ und „letzter Aufruf“ beschreiben vergangene Nutzung, keine dauerhaft offene Sitzung. Ist der Status nicht lesbar, wählen Sie **Status erneut lesen**. Der Werkzeugzugriff gilt für die ganze Installation, nicht nur für das im Browser geöffnete Projekt.

## Token schützen

Verwenden Sie nach Möglichkeit den Einrichtungsbefehl. Richten Sie den Agenten von Hand ein, gehört `Authorization: Bearer <token>` ausschließlich in das lokale Feld für geheime Header Ihres Clients. Diese PowerShell-Befehle kopieren das Token, ohne es anzuzeigen:

Windows-Paket: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker: `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Fügen Sie das Token in das lokale Feld ein und leeren Sie danach die Zwischenablage. Das Token gehört nie in einen Chat, eine Terminalausgabe, einen Screenshot oder Quellcode. Im Windows-Paket führt **Veri klasörünü aç** (Datenordner öffnen) im Tray-Menü zur Token-Datei.

## Skills und Fehlerbehebung

Der Reiter **Skills** listet fertige SEO-Abläufe. Der Einrichtungsbefehl installiert sie; mit **Update-Befehl kopieren** bringen Sie eine bestehende Installation auf den neuesten Stand. Aufruf in Claude Code: `/seo-audit`, in Codex: `$seo-audit`.

- **Fehler 401**: Prüfen Sie, ob der Client den lokalen Authorization-Header sendet.
- **Verbindung abgelehnt**: Prüfen Sie, ob die App läuft und die MCP-Adresse stimmt.

Aktualisieren Sie danach den MCP-Status im Client und bestätigen Sie einen neuen Werkzeugaufruf.
