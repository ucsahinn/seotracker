---
title: Berichte und Vorlagen
description: Audit-, Suchleistungs- und Agentenberichte als einzelne HTML-Dateien speichern, auf dem Smartphone öffnen, drucken oder per E-Mail teilen.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Ein Bericht ist ein gespeichertes HTML-Dokument des Projekts. Beim Öffnen fragt die App Google nicht neu ab; der Bericht zeigt den Stand zum Zeitpunkt seiner Erstellung. Das Speicherdatum ist nicht das Datum der Messung.

## Berichte erstellen

- **Suchbericht erstellen** öffnet die Suchleistung. Wählen Sie Zeitraum, Gerät, Land und Suchtyp und laden Sie den Bericht herunter.
- **Auditbericht erstellen** öffnet das Website-Audit, wo Sie den Crawl auswählen.
- **Berichts-Prompt kopieren** kopiert einen Prompt für Ihren KI-Agenten. Der Agent untersucht das Projekt und speichert seinen Bericht hier.

Die App speichert jeden Bericht, bevor sie ihn herunterlädt. Er bleibt lesbar, auch wenn die Quelle später nicht mehr verbunden ist.

Beim Erstellen liest die App die Daten neu. Google kann historische Werte und den Rand des Zeitraums nachträglich ändern; ein Bericht muss deshalb nicht exakt mit einer früheren Bildschirmansicht übereinstimmen.

## Berichte finden

Oben steht der **Zuletzt aktualisierte Bericht** mit seiner gespeicherten Zusammenfassung und den Schaltflächen zum Öffnen und Herunterladen. Fehlen Zusammenfassung oder strukturiert gespeicherter Datenzeitraum, sagt die App das ausdrücklich. Prüfen Sie Zeitraum und Grenzen dann im Dokument selbst. Die App leitet fehlende Herkunftsangaben nicht aus Titel oder HTML ab.

**Berichte suchen** durchsucht Titel und Zusammenfassung. Die Zahlen an den Typen berücksichtigen Suche und den Filter **Letzte 7 Tage**, aber nicht den Typfilter selbst. „Letzte 7 Tage“ zählt Dateien, die in dieser Zeit gespeichert oder aktualisiert wurden, nicht einzelne Bearbeitungen oder neue Google-Messungen. Treffer und Gesamtbestand des Projekts sind getrennte Zahlen.

Die Liste lädt 25 Berichte pro Seite; auch der tausendste Bericht bleibt erreichbar und durchsuchbar. Voreingestellt ist die Sortierung nach **Letzte Aktualisierung**: Ein bearbeiteter alter Bericht rückt nach oben. Weitere Sortierungen sind **Erstellungszeit** und **Titel**. Suche, Typ, Zeitraumfilter, Sortierung und Seite stehen in der Adresse und bleiben beim Zurückgehen und Neuladen erhalten.

### Berichtstypen

Neue Berichte zur Suchleistung und zum Website-Audit speichern ihren Typ. Ältere Such- und Auditberichte tragen denselben Erstellervermerk und heißen deshalb **Anwendungsbericht, Typ nicht gespeichert**. Die App zählt sie nicht pauschal als Audits und klassifiziert sie auch nicht anhand des Titels. Bei Agentenberichten bleiben der verwendete Skill und der Vorlagenname sichtbar.

Die Größe ist die gespeicherte HTML-Größe in Bytes; der Download kann durch Sicherheitsangaben etwas größer sein. Die Zahl der Berichte sagt nichts über SEO-Erfolg aus.

## Lesen, drucken und teilen

Die Vorschau läuft in einem abgeschotteten Rahmen ohne Skripte und ohne Netzwerkzugriff. Herkunft und Speicherinformationen lassen sich aufklappen. Ein Bericht behält die Sprache, in der er erstellt wurde; für eine andere Sprache oder neue Zahlen erstellen Sie ihn neu.

- **Als HTML herunterladen**: Die Datei lässt sich offline lesen und per E-Mail versenden.
- **Als PDF speichern (drucken)**: nutzt die Druckfunktion des Browsers. Blockiert der Browser das Druckfenster, erlauben Sie Pop-ups für die App oder öffnen den Bericht mit **In neuem Tab öffnen** und drucken dort.
- **Vollbild**: hält den Tastaturfokus im Bericht und bietet oben und unten einen Ausgang.

Ein Link in die App funktioniert nur auf dieser Installation. Teilen Sie deshalb die Datei, nicht den Link.

Erscheint die Vorschau nach 15 Sekunden nicht, bietet die App **Erneut versuchen** und **In neuem Tab öffnen** an. Für fehlende Dokumente, Zugriffs-, Verbindungs- und Downloadfehler nennt sie jeweils den nächsten Schritt. Schlägt eine Aktualisierung der Liste fehl, bleiben die zuletzt geladenen Daten mit einer Warnung stehen. Kann die App den Speicherstatus nicht prüfen, heißt das nicht, dass Speicher frei ist.

## Was Suchberichte zeigen

Ein Suchbericht nennt den tatsächlichen Zeitraum, den Vergleichszeitraum, die Filter und die Erstellungszeit. Die Tage gelten in pazifischer Zeit. Liefert Google keine Vollständigkeitsgrenze, nennt der Bericht die angenommene Verzögerung.

Erreicht eine Abfrage das Zeilenlimit, umfasst der nicht aufgeführte Anteil sowohl von Google verborgene als auch nicht abgerufene Suchanfragen. Die Tabellen für Suchanfragen, Seiten und Suchanfrage-Seite-Paare haben ein Zeilenlimit; ihre Summen sind nicht die Gesamtwerte der Website.

Der Abschnitt zu Überschneidungen nennt seinen eigenen Zeitraum und seine Schwellen, auch wenn er nichts findet; ein Sieben-Tage-Bericht kann dafür 28 Tage auswerten. Dass mehrere Seiten für dieselbe Suchanfrage erscheinen, belegt weder verlorene Klicks noch einen SEO-Schaden. Nicht verfügbare Langzeit- oder Darstellungsdaten sind keine Null. Gekürzte Listen nennen, wie viele Einträge sie zeigen und wie viele beobachtet wurden. Das angegebene Anfragebudget gilt für die Suchansicht ohne die zusätzliche Analyse der Überschneidungen und ohne Cache-Effekte.

Fehlende Quelldaten zählen nie als null Besuche.

## Auditberichte und Quellwebsite

Auditberichte erklären in einem eigenen Methodenteil, welche Crawl-, Geschwindigkeits- und optionalen Google-Daten sie verwenden: den Search-Console-Zeitraum, das Zeilenlimit und, falls gespeichert, die mobile CrUX-Messung.

Die Quellwebsite eines Berichts bestätigt die App anhand des ursprünglichen Audits. Weicht sie von der Projektwebsite ab, erscheint eine Warnung. Ohne bestätigte Quelle kann der Bericht eine andere Website betreffen; ältere Berichte tragen deshalb den Hinweis **Älterer Bericht · Quelle und Datum nicht bestätigt**. Der gespeicherte Bericht oben ist keine aktuelle Zusammenfassung der Website.

**Website-Audits öffnen** führt zum Auditverlauf. Dort öffnen Sie ein gespeichertes Audit und laden seinen Bericht herunter. Der Link startet weder ein Audit noch eine Berichtserstellung. Bestehende Dateien bleiben erhalten.

## Berichte neu erstellen

Erstellen Sie App-Berichte über ihre Quellseite neu. Ein Agent kann ihren Inhalt nicht mit `save_report` ersetzen. Ein Suchbericht ist eindeutig durch Property, Zeitraum und Filter bestimmt, ein Auditbericht durch die Audit-ID. Erstellen Sie denselben Bericht in einer anderen Sprache, aktualisiert die App den vorhandenen Eintrag und ändert gegebenenfalls dessen Sprache.

Lange Titel werden auf die Speichergrenze gekürzt; ein serverseitiger Schutz verhindert, dass dabei zwei verschiedene Quellen oder Filter denselben Titel erhalten. Kollidiert ein Titel mit einem Agentenbericht, lehnt die App das Speichern ab und lässt das ältere Dokument unverändert.

## Vorlagen und Speichergrenzen

Vorlagen sind Anweisungen an Ihren KI-Agenten. Sie erzeugen keine Berichte automatisch und planen nichts. Pro Projekt sind zehn Vorlagen möglich, mit bis zu 80 Zeichen Name, 200 Zeichen Beschreibung und 3.000 Zeichen Anweisungen. Das Löschen einer Vorlage löscht keine Berichte. **Suche löschen** zeigt ausgeblendete Vorlagen wieder an.

| Grenze                   | Wert          |
| ------------------------ | ------------- |
| Größe eines Berichts     | 500.000 Bytes |
| Titel                    | 120 Zeichen   |
| Zusammenfassung          | 2.500 Zeichen |
| Berichte pro Projekt     | 10.000        |
| Speicher je Installation | 5 GB          |

Diese Grenzen schützen den Speicher; sie sind keine SEO-Kennzahlen.
