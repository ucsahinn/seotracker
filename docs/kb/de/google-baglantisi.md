---
title: Mit Google verbinden
description: Search Console und GA4 mit eigenem Google-Cloud-Dienstkonto oder OAuth-Client verbinden und dann für jedes Projekt die Properties wählen.
kind: nasil-yapilir
updated: 2026-10-27
---

seowatcher liest Search Console und Google Analytics 4 mit Zugangsdaten aus Ihrem eigenen Google-Cloud-Projekt. Die Verbindung hat zwei Ebenen:

- **Zugangsdaten** speichern Sie einmal unter **Einstellungen**. Sie gelten für die ganze Installation.
- **Properties** wählen Sie für jedes Projekt unter **Projekteinstellungen → Verbindungen**: eine Search-Console- und eine GA4-Property.

Beides zusammen bestätigt nur die Konfiguration. Ob Daten tatsächlich ankommen, sehen Sie in der Suchleistung oder in Analytics. Die Auswahl einer Property installiert kein Tracking auf Ihrer Website.

## Weg 1: Dienstkonto

1. Aktivieren Sie in Google Cloud die Search Console API sowie für Analytics die Analytics Admin API und die Analytics Data API.
2. Erstellen Sie ein Dienstkonto und laden Sie dessen JSON-Schlüssel herunter.
3. Wählen Sie unter **Einstellungen → Dienstkonto** die Datei oder fügen Sie ihren Inhalt in das verdeckte Feld ein, und speichern Sie. Den privaten Schlüssel zeigt die App danach nicht mehr an.
4. Geben Sie der angezeigten E-Mail-Adresse des Dienstkontos in der Search Console vollen Zugriff und in Analytics die Rolle Betrachter.
5. Wählen Sie in den Projekteinstellungen die Properties.

## Weg 2: OAuth-Client

1. Erstellen Sie in Google Cloud einen OAuth-Client vom Typ Webanwendung.
2. Tragen Sie beide Weiterleitungsadressen exakt so ein, wie die App sie anzeigt.
3. Speichern Sie Client-ID und Clientschlüssel in den Einstellungen.
4. Klicken Sie in den Projekteinstellungen unter **Verbindungen** auf **Google-Konto hinzufügen**, melden Sie sich mit Ihrem Google-Konto an und wählen Sie die Property.

Ist zusätzlich ein Dienstkonto gespeichert, verwendet die App das Dienstkonto.

## Status der Verbindung

Die Verbindungskarte zeigt, wann die App mit den aktuellen Zugangsdaten zuletzt erfolgreich Daten der Property abgerufen hat. Nach einem vorübergehenden Fehler bleibt das Datum des letzten Erfolgs stehen. Gab es noch keinen Abruf, gilt der Zugriff als unbestätigt. Für GA4 nennt die Karte außerdem Zeitzone und Währung der Property. Das Öffnen der Einstellungen fragt Google nicht ab.

Wechseln Sie die Zugangsdaten, gelten frühere Zugriffs- und Kontingentnachweise nicht für die neue Identität. Aktualisieren Sie die Berichte danach ausdrücklich.

## Probleme beheben

Schlägt das Laden der Property-Liste fehl, bleibt die bisherige Liste stehen. Eine leere Liste allein beweist keine fehlenden Rechte.

- **Freigabe abgelaufen**: Verbinden Sie das Konto erneut.
- **Zugriff verweigert**: Prüfen Sie die Rechte an der Property.
- **API deaktiviert**: Aktivieren Sie die API im Cloud-Projekt.
- **Limit erreicht**: Warten Sie und versuchen Sie es später erneut.
- **Unbekannter Fehler**: Versuchen Sie es erneut und nutzen Sie die Diagnose auf dem Bildschirm **Hilfe**.

Wenn Sie Zugangsdaten in der App löschen, bleibt der Schlüssel bei Google gültig; widerrufen Sie ihn bei Bedarf in Google Cloud. Ändern Sie die Domain eines Projekts, bleiben Property-Zuordnung und Verlauf erhalten.
