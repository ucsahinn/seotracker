---
title: Einstellungen
description: Browser-, Installations- und Projektumfang; Google-Zugangsdaten, lokale Zähler und Versionsprüfung.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

## Geltungsbereich

Darstellung und Sprache gelten für diesen Browser. Wählen Sie die Sprache und bestätigen Sie mit der Schaltfläche zum Anwenden. Die Projektsprache ist eine getrennte Marktvorgabe.

Google-Zugangsdaten gelten für die gesamte Installation; ein Dienstkonto hat Vorrang. Gespeicherte Zugangsdaten und eine ausgewählte Property bestätigen keinen Datenzugriff. Bei Lesefehlern bleiben alte Einstellungen mit Wiederholungshinweis sichtbar. Wählen Sie die JSON-Datei oder nutzen Sie das verdeckte Einfügefeld und speichern Sie. Der private Schlüssel wird nicht angezeigt.

Projektname, Domain und Property liegen in den Projekteinstellungen. Eine Domainänderung erhält Google-Zuordnung und Verlauf. Land und Sprache sind Vorgaben gespeicherter Suchbegriffe; Suchleistung hat einen eigenen Länderfilter.

## Windows, Messung und Grenzen

Windows-Einstellungen werden von der Tray-App bestätigt. Docker zeigt keine Schalter. Ein nicht erreichbarer Starter bedeutet unbekannt, nicht ausgeschaltet. Wiederholen Sie den Abruf; Verwaltungssperren werden erklärt.

Ohne PageSpeed-Schlüssel versucht die App höchstens 50 Seiten pro Prüfung. Google kann früher begrenzen; ein Schlüssel garantiert keinen Erfolg. Der Schlüsseltest sendet eine mobile Anfrage für example.com und zählt nicht zum Prüfungszähler. Testdatum und Ergebnis werden angezeigt; ein Schlüsselwechsel entfernt das alte Ergebnis.

Wählen Sie unter Grenzen das Projekt. URL-Prüfung zählt eigene Property-Anfragen der letzten 24 Stunden. PageSpeed zählt Prüfungen mit Beginn in diesem Zeitraum. GA4-Restwerte stammen aus der letzten Antwort; Standardgrenzen sind Annahmen. Alte und fehlende Quellen bleiben unbekannt. Seiten stammen aus der letzten abgeschlossenen Prüfung der Projektdomain; Berichte und Vorlagen aus dem gesamten Projektbestand.

## Aktualisierungen

Die Versionsprüfung in der App fragt höchstens alle sechs Stunden GitHub ab. Die Windows-Tray-App kann unabhängig täglich prüfen. Automatische Installation wird unter Windows eingestellt. Das letzte erfolgreiche Prüfdatum kennzeichnet gespeicherte Versionsdaten. Bei Anfrage-/Zugriffsbeschränkungen warten und wiederholen; bei fehlender Quelle die Hilfe-Diagnose nutzen. Unlesbare Einstellungen sind gesperrt.

## Windows-Benachrichtigungen

Klicken Sie mit der rechten Maustaste auf das seowatcher-Symbol im Infobereich und wählen Sie **Windows bildirimleri** (standardmäßig aktiv). Solange der Starter läuft, erscheinen abgeschlossene oder fehlgeschlagene Prüfungen aller Projekte und neue Ankündigungen nach etwa 90 Sekunden als Windows-Sprechblase, auch bei geschlossenem Browser oder im Hintergrund. Ein Klick öffnet die zugehörige Seite; mehrere Ereignisse werden zusammengefasst. Der erste Start überspringt alte Ereignisse; ein Neustart wiederholt erfasste Ereignisse nicht. Bei ausgeschalteten Meldungen empfangene Ereignisse werden nicht nachgeholt. Neue Versionen folgen weiterhin der Update-Einstellung. Der Windows-Fokusmodus kann Meldungen ausblenden. Bei geschlossenem Starter erscheinen keine Meldungen. Diese Funktion ist in Docker nicht verfügbar.
