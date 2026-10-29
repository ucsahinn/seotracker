---
title: Einstellungen
description: Was in den Einstellungen für den Browser, für die ganze Installation und für ein einzelnes Projekt gilt, und wo Sie es jeweils ändern.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Die Einstellungen haben drei Geltungsbereiche. Darstellung und Sprache gelten für diesen Browser. Google-Zugangsdaten, PageSpeed-Schlüssel und Updates gelten für die ganze Installation; die Limits zeigt die App jeweils für ein Projekt. Name, Domain und Google-Properties eines Projekts stehen dagegen in den **Projekteinstellungen**.

## Browser: Darstellung und Sprache

Wählen Sie unter **Darstellung** die Sprache und bestätigen Sie mit **Sprache anwenden**. Die Sprache eines Projekts ist davon unabhängig: Sie legt den Markt für gespeicherte Keywords fest.

## Installation: Google-Zugangsdaten

Die Google-Zugangsdaten gelten für alle Projekte. Ist ein Dienstkonto gespeichert, hat es Vorrang vor einem OAuth-Client. Zum Speichern wählen Sie die JSON-Datei des Dienstkontos oder fügen ihren Inhalt in das verdeckte Feld ein. Den privaten Schlüssel zeigt die App danach nicht mehr an.

Gespeicherte Zugangsdaten und eine ausgewählte Property bestätigen noch keinen Datenzugriff. Kann die App die Einstellungen nicht lesen, bleiben die zuletzt bekannten Werte mit einem Hinweis zum erneuten Versuch sichtbar. Die Einrichtung beschreibt [Mit Google verbinden](/docs/google-baglantisi/).

## Projekt: Name, Domain und Properties

Projektname, Domain und Properties ändern Sie in den Projekteinstellungen. Eine geänderte Domain behält die Google-Zuordnung und den Verlauf. Land und Sprache des Projekts sind Vorgaben für gespeicherte Keywords; die Suchleistung hat einen eigenen Länderfilter.

## PageSpeed-Schlüssel

Ohne Schlüssel misst die App höchstens 50 Seiten pro Audit. Google kann schon früher begrenzen, und auch ein Schlüssel garantiert keinen Erfolg. **Schlüssel testen** sendet eine mobile Anfrage für example.com und zählt nicht zum Audit-Zähler. Testdatum und Ergebnis werden angezeigt; ein neuer Schlüssel löscht das alte Ergebnis. Einzelheiten stehen unter [PageSpeed-Schlüssel](/docs/pagespeed-anahtari/).

## Limits

Wählen Sie unter **Google- und Systemlimits** ein Projekt. Die Zähler bedeuten:

- **URL-Prüfung**: Anfragen dieser App an die Property in den letzten 24 Stunden.
- **PageSpeed**: Audits, die in den letzten 24 Stunden begonnen haben.
- **GA4**: das Restkontingent laut letzter Antwort von Google. Standardgrenzen sind Annahmen.
- **Seiten**: aus dem letzten abgeschlossenen Audit der Projektdomain.
- **Berichte und Vorlagen**: der gesamte Bestand des Projekts.

Veraltete oder fehlende Quellen zeigt die App als unbekannt an.

## Windows-Einstellungen

Im Windows-Paket stehen hier **Mit Windows starten** und **Updates automatisch installieren**; die Tray-App speichert und bestätigt jede Änderung. Unter Docker gibt es diese Schalter nicht. Ist die Tray-App nicht erreichbar, zeigt die App den Zustand als unbekannt, nicht als ausgeschaltet. Versuchen Sie es erneut; ist eine Einstellung von einem Administrator gesperrt, nennt die App das.

### Windows-Benachrichtigungen

Klicken Sie mit der rechten Maustaste auf das seowatcher-Symbol im Infobereich und wählen Sie **Windows bildirimleri** (Windows-Benachrichtigungen). Die Option ist standardmäßig aktiv. Das Tray-Menü gibt es nur auf Türkisch.

Solange die Tray-App läuft, meldet Windows nach etwa 90 Sekunden abgeschlossene oder fehlgeschlagene Audits aller Projekte und neue Ankündigungen, auch wenn der Browser geschlossen ist. Ein Klick auf die Meldung öffnet die passende Seite; mehrere Ereignisse werden zusammengefasst.

- Beim ersten Start werden ältere Ereignisse übersprungen; nach einem Neustart wiederholt die App bereits gemeldete Ereignisse nicht.
- Ereignisse, die eintreffen, während die Option aus ist, werden nicht nachgeholt.
- Ist die Tray-App beendet, erscheinen keine Meldungen. Der Windows-Fokusmodus kann sie ebenfalls ausblenden.
- Hinweise auf neue Versionen folgen weiterhin der Update-Einstellung.

Unter Docker gibt es diese Funktion nicht.

## Updates

Die App fragt GitHub höchstens alle sechs Stunden nach einer neuen Version; **Jetzt prüfen** fragt sofort. Die Tray-App unter Windows prüft zusätzlich unabhängig einmal täglich; ob Updates automatisch installiert werden, stellen Sie im Windows-Paket ein. Das Datum der letzten erfolgreichen Prüfung zeigt, wie aktuell die Versionsangabe ist. Bei zu vielen Anfragen oder Zugriffsbeschränkungen warten Sie und versuchen es erneut. Ist die Quelle nicht erreichbar, nutzen Sie die Diagnose auf dem Bildschirm **Hilfe**. Einstellungen, die die App nicht lesen kann, bleiben gesperrt.
