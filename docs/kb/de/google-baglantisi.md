---
title: Mit Google verbinden
description: Search Console und GA4 mit eigenem Google-Cloud-Dienstkonto oder OAuth-Client verbinden und dann für jedes Projekt die Properties wählen.
kind: nasil-yapilir
updated: 2026-10-27
---

seowatcher liest Search Console und Google Analytics 4 mit Ihren eigenen Google-Cloud-Zugangsdaten: einem Dienstkonto oder einem OAuth-Client. Sie speichern die Zugangsdaten einmal für die ganze Installation und wählen dann für jedes Projekt eine Search-Console- und eine GA4-Property.

## Zugangsdaten und Property

Google-Zugangsdaten in den Einstellungen gelten für die Installation. Die Property unter Projekteinstellungen → Verbindungen gilt für ein Projekt. Gespeichert und Property ausgewählt bestätigen nur die Konfiguration. Den Datenzugriff prüfen Sie im Bericht Suchleistung oder Analytics. Analytics zeigt Zeitzone und Währung neben der Property. Die Auswahl installiert kein Website-Tracking.

## Dienstkonto oder OAuth

Aktivieren Sie Search Console API sowie für Analytics Admin API und Data API in Google Cloud. Erstellen Sie ein Dienstkonto und laden Sie den JSON-Schlüssel herunter. Wählen Sie die Datei unter Einstellungen → Dienstkonto oder nutzen Sie das verdeckte Einfügefeld und speichern Sie. Der private Schlüssel bleibt unsichtbar. Geben Sie der angezeigten E-Mail Vollzugriff in Search Console und Betrachterrechte in Analytics. Wählen Sie anschließend die Property im Projekt.

Alternativ erstellen Sie einen OAuth-Web-Client. Registrieren Sie beide Callback-Adressen exakt wie angezeigt, speichern Sie Client-ID und Geheimnis und autorisieren Sie das Google-Konto in den Projektverbindungen. Ein gespeichertes Dienstkonto hat Vorrang.

## Wiederherstellung

Ein Lesefehler erhält die alte Property-Liste; eine leere Liste allein beweist keine fehlenden Rechte. Abgelaufene Freigaben neu verbinden, bei Ablehnung Property-Rechte und bei deaktivierter API das Cloud-Projekt prüfen. Bei Begrenzungen warten. Unbekannte Fehler: erneut versuchen und Hilfe-Diagnose verwenden. Löschen in der App widerruft keinen Google-Schlüssel. Domainänderungen erhalten Zuordnung und Verlauf.

Die Verbindungskarte zeigt den letzten bereits beobachteten Google-Abruf für die aktuellen Zugangsdaten und die Property mit Datum. Nach einem vorübergehenden Fehler bleibt das Datum des vorherigen erfolgreichen Abrufs erhalten. Ohne Verlauf ist der Zugriff unbestätigt. Das Öffnen der Einstellungen löst keine Google-Abfrage aus. Nach einem Wechsel der Zugangsdaten gelten alte Zugriffs- und Kontingentnachweise nicht für die neue Identität; Berichte müssen ausdrücklich aktualisiert werden.
