---
title: Mit Google verbinden
description: Installationszugang und Projekt-Property getrennt wählen; Konfiguration und Zugriff unterscheiden.
kind: nasil-yapilir
updated: 2026-10-27
---

## Zugangsdaten und Property

Google-Zugangsdaten in den Einstellungen gelten für die Installation. Die Property unter Projekteinstellungen → Verbindungen gilt für ein Projekt. Gespeichert und Property ausgewählt bestätigen nur die Konfiguration. Den Datenzugriff prüfen Sie im Bericht Suchleistung oder Analytics. Analytics zeigt Zeitzone und Währung neben der Property. Die Auswahl installiert kein Website-Tracking.

## Dienstkonto oder OAuth

Aktivieren Sie Search Console API sowie für Analytics Admin API und Data API in Google Cloud. Erstellen Sie ein Dienstkonto und laden Sie den JSON-Schlüssel herunter. Wählen Sie die Datei unter Einstellungen → Dienstkonto oder nutzen Sie das verdeckte Einfügefeld und speichern Sie. Der private Schlüssel bleibt unsichtbar. Geben Sie der angezeigten E-Mail Vollzugriff in Search Console und Betrachterrechte in Analytics. Wählen Sie anschließend die Property im Projekt.

Alternativ erstellen Sie einen OAuth-Web-Client. Registrieren Sie beide Callback-Adressen exakt wie angezeigt, speichern Sie Client-ID und Geheimnis und autorisieren Sie das Google-Konto in den Projektverbindungen. Ein gespeichertes Dienstkonto hat Vorrang.

## Wiederherstellung

Ein Lesefehler erhält die alte Property-Liste; eine leere Liste allein beweist keine fehlenden Rechte. Abgelaufene Freigaben neu verbinden, bei Ablehnung Property-Rechte und bei deaktivierter API das Cloud-Projekt prüfen. Bei Begrenzungen warten. Unbekannte Fehler: erneut versuchen und Hilfe-Diagnose verwenden. Löschen in der App widerruft keinen Google-Schlüssel. Domainänderungen erhalten Zuordnung und Verlauf.
