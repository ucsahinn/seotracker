---
title: Berichte und Vorlagen
description: Jeder Bericht, den Sie aus einem Audit oder aus der Suchleistung herunterladen oder von Ihrem Assistenten schreiben lassen, ist eine einzelne HTML-Datei: auf dem Smartphone öffnen, drucken oder per E-Mail senden. Mit Vorlagen wiederholen Sie ihn.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Hier erfahren Sie, wie Sie einen Bericht bekommen, an wen Sie ihn schicken und wie Sie ihn mit einer Vorlage wiederholen.

Der Bildschirm **Berichte** hält alle für dieses Projekt erstellten Berichte in einer Liste. Ein Bericht entsteht auf drei Wegen. Die Schaltfläche **Bericht herunterladen** auf dem Bildschirm **Website-Audit** erzeugt den Bericht zum Audit. Die Schaltfläche **Bericht herunterladen** auf dem Bildschirm **Suchleistung** erzeugt einen Bericht der Ansicht, die Sie gerade sehen. Auch Ihr KI-Assistent kann ein Thema recherchieren und seine Ergebnisse als Bericht speichern. Jeder Bericht ist eine einzelne HTML-Datei ohne Skripte (Code, der auf der Seite läuft), externe Ressourcen oder eingebettete Schriften. Deshalb öffnet er sich auf dem Smartphone, lässt sich als PDF drucken und per E-Mail senden. In der App gibt es keinen Editor, um einen Bericht von Hand zu schreiben: Die App oder der Assistent schreibt ihn.

## Was auf dem Bildschirm zu sehen ist

**Obere Leiste.** Die Schaltflächen **Aktualisieren**, **Berichts-Prompt kopieren** und **Vorlagen**. **Berichts-Prompt kopieren** legt einen Text in die Zwischenablage, den Sie in Ihren Assistenten einfügen. Gibt es noch keinen Bericht, steht diese Schaltfläche in der Karte des leeren Zustands.

**Zusammenfassungskacheln.** Es gibt drei.

- **Letzter Bericht**: wie lange es her ist, dass der letzte Bericht geschrieben oder aktualisiert wurde. Der Link darunter öffnet den Bericht.
- **In den letzten 7 Tagen**: die Zahl der in dieser Zeit geschriebenen oder aktualisierten Berichte.
- **Gesamt**: alle Berichte. Darunter steht, wie viele Prüfberichte es sind, wie viele per Skill und wie viele aus Vorlagen.

**Berichte nach Typ.** Ein Ringdiagramm teilt die Berichte nach Typ auf. Ein Klick auf einen Typ grenzt die Liste auf Berichte dieses Typs ein. Noch ein Klick hebt den Filter auf.

**Wie funktioniert es?** Eine kurze Erklärung, die zugeklappt kommt. Sie erklärt den Unterschied zwischen den vom Agenten geschriebenen Berichten und dem Site-Audit-Bericht.

**Filter.** Alle, Letzte 7 Tage, Mit einer Vorlage geschrieben, Mit einem Skill geschrieben. Daneben steht das Feld **Berichte suchen**.

**Tabelle.** Sie hat die Spalten **Berichte**, **Typ**, **Erstellt** und **Größe**. Mit einem Klick auf die Überschrift sortieren Sie. **Typ** sagt, woher der Bericht stammt. Zum Beispiel wird „Website-Audit-Bericht“ von der App selbst erstellt. Was der Assistent schreibt, trägt Namen wie „SEO-Audit“, „Zeitraumvergleich“, „Analyse eines Traffic-Rückgangs“, „SEO-Bericht“, „Coaching-Notiz“ oder „Projekteinrichtung“. Ein Bericht, dessen Typ nicht bekannt ist, zeigt „Nicht angegeben“. Bei Berichten, die mit einer Vorlage geschrieben wurden, steht der Name der Vorlage. Die Liste zeigt die letzten 100 Berichte. Gibt es mehr, steht darunter ein Hinweis.

**Berichtsseite.** Der Bericht öffnet sich in seinem eigenen, abgeschotteten Rahmen. Schaltflächen: **Als HTML herunterladen**, **Als PDF speichern (drucken)**, **In neuem Tab öffnen**. Im Menü **Weitere Aktionen** steht **Link kopieren**. Der Link funktioniert nur auf dieser Installation, von außen kommt niemand heran. Die Seite zeigt auch, wer den Bericht erstellt hat, seinen Typ, wann er erstellt und aktualisiert wurde und seine Größe.

**Berichtsvorlagen.** Sie erreichen sie über die Schaltfläche **Vorlagen**. Eine Vorlage ist ein gespeichertes Rezept, das Ihrem Assistenten sagt, wie er den Bericht schreibt: wer ihn liest, welche Abschnitte er hat und in welcher Sprache er geschrieben wird. Es gibt drei Felder:

- **Name**: höchstens 80 Zeichen, im Projekt einmalig.
- **Beschreibung**: höchstens 200 Zeichen. Ein Satz, der sagt, wann sie zu verwenden ist.
- **Anweisung**: höchstens 3.000 Zeichen.

Ein Projekt kann höchstens 10 Vorlagen haben. Löschen Sie eine Vorlage, werden die daraus erstellten Berichte nicht gelöscht.

## Die eigenen Berichte der App

**Website-Audit-Bericht.** Wird von **Bericht herunterladen** in den Audit-Details erzeugt. Blieb das Audit auf halbem Weg stehen, wird dem Titel des Berichts „(unvollständig)“ angehängt. Zum Beispiel „beispiel.de Website-Prüfung (unvollständig)“. Das Deckblatt eines solchen Berichts trägt den Hinweis „Der Bericht ist möglicherweise unvollständig.“ und den Grund: Das Audit wurde mit einem Fehler beendet, es läuft noch oder es konnte keine Seite gecrawlt werden. Ein unvollständiger Bericht hat keine Punktzahlabschnitte. Wurde der Crawl wegen der Ratenbegrenzung der Website vorzeitig gestoppt, steht auf dem Deckblatt „Unvollständige Prüfung, keine Punktzahl“. Wurden nur wenige Prüfungen gemessen, steht die Punktzahl als „Vorläufiger Score“ zusammen mit der Messabdeckung. Auch die Zusammenfassung des Berichts nennt den Zustand. So erkennt ein Assistent, der die Berichtsliste liest, dass ein Bericht unvollständig ist.

**Suchleistungsbericht.** Wird von **Bericht herunterladen** auf dem Bildschirm Suchleistung erzeugt. Er macht die Ansicht, die Sie gerade auf dem Bildschirm sehen (Zeitraum, Gerät, Land, Suchtyp), zu einem druckbaren Dokument. Das Deckblatt nennt die endgültigen Tage, den Vergleich, die Filter, das Datum der letzten Daten und die Erstellungszeit. Dann folgen die vier Summen, der Kasten „Datenstand“, die Arbeiten unter **Damit anfangen**, das Diagramm **Im Zeitverlauf** (mit markierten Google-Updates und Notizen), Chancen, Veränderungen und Seiten, die um dieselbe Suchanfrage konkurrieren. Die Zahlen sind dieselben wie auf dem Bildschirm. Erneut mit derselben Website, demselben Zeitraum und denselben Filtern abgerufen, entsteht kein neuer Bericht. Der frühere Bericht der App wird aktualisiert. Übersteigt der Bericht die Speichergrenze, werden Sie gebeten, einen kürzeren Zeitraum oder Filter zu wählen.

Beide Berichte werden zuerst gespeichert und dann auf Ihren Computer heruntergeladen. Schlägt der Download aus irgendeinem Grund fehl, steht der Bericht trotzdem in der Liste **Berichte**. Laden Sie ihn von dort herunter.

## So gehen Sie vor

1. Klicken Sie für den ersten Bericht auf dem Bildschirm Website-Audit auf **Bericht herunterladen**. Der Bericht wird auf Ihren Computer heruntergeladen und erscheint auch in dieser Liste. Er beginnt mit dem Abschnitt „N Aufgaben für diese Woche“.
2. Um Ihren Suchstand zu dokumentieren, stellen Sie auf dem Bildschirm Suchleistung Zeitraum und Filter ein und klicken dann auf **Bericht herunterladen**.
3. Arbeiten Sie mit einem Assistenten, klicken Sie auf **Berichts-Prompt kopieren**. Fügen Sie den kopierten Text in Claude Code, Codex oder Cursor ein. Der Assistent fragt, welchen Bericht Sie möchten, liest die Daten und speichert den Bericht hier.
4. Möchten Sie jeden Monat denselben Bericht, schreiben Sie eine Vorlage. Tragen Sie in die Anweisung den Leser ein („die Person, die die Website betreibt, kennt sich mit SEO nicht aus“), die Abschnitte, die Reihenfolge und den Ton. Fragen Sie die Vorlage mit ihrem Namen an, wendet der Assistent sie an.
5. Zum Teilen klicken Sie auf **Als HTML herunterladen** und senden die Datei. Wer sie erhält, öffnet sie im Browser. Ein kopierter Link funktioniert nur auf demselben Computer.
6. Löschen Sie alte Berichte nicht. Im nächsten Gespräch liest der Assistent die Zusammenfassung des früheren Berichts und vergleicht.

## Wie die Zahlen berechnet werden

Der Audit-Bericht ist für den A4-Druck aufgebaut. Er enthält Inhaltsverzeichnis, „N Aufgaben für diese Woche“, Probleme, Geschwindigkeitsmessung, Google-Indexstatus und Sitemap. Der Abschnitt zum Indexstatus nutzt nur gespeicherte Antworten und stellt Google keine neue Frage.

Die Listen sind begrenzt: 50 Adressen pro Problem, 300 Seiten, 50 Geschwindigkeitszeilen, 3.000 Adressen im Anhang. Übersteigt die Datei 400 KB, werden die Listen gekürzt.

Ein Bericht darf höchstens 500.000 Byte groß sein (unter 80 KB wird empfohlen). Der Titel hat höchstens 120 Zeichen und ist im Projekt einmalig. Die Zusammenfassung hat höchstens 2.500 Zeichen. Ein zweiter Bericht mit demselben Titel wird nicht angenommen. Ein Projekt kann höchstens 10.000 Berichte haben, und die Installation reserviert insgesamt 5 GB Platz.

Aus Sicherheitsgründen werden beim Speichern Dateien abgelehnt, die ein Skript, ein iframe (ein Kasten, der eine Seite in eine andere einbettet), ein Formular, ein externes Stylesheet, einen Ereignis-Handler (wie onclick), einen javascript:-Link oder eine automatische Weiterleitung enthalten. Beim Öffnen wird der Bericht außerdem in einem abgeschlossenen Rahmen ohne Netzwerkzugriff gezeigt. Ein Bericht kann also nichts ohne Ihr Wissen nach außen senden.

## Häufige Fragen

**Wer hat den Bericht geschrieben?** Die Spalte **Typ** sagt es. „Website-Audit-Bericht“ stammt von der App, alle anderen vom Assistenten. Auf der Berichtsseite sehen Sie auch, wer ihn gespeichert hat.

**Im Titel steht „(unvollständig)“, was soll ich tun?** Das Audit blieb auf halbem Weg stehen. Das Deckblatt des Berichts nennt den Grund. Führen Sie das Audit erneut aus und laden Sie den Bericht erneut herunter.

**Kann ich den Bericht bearbeiten?** In der App nicht. Sagen Sie dem Assistenten „ändere diesen Abschnitt“, dann aktualisiert er den Bericht.

**Ich habe den Link geschickt, aber der Empfänger kann ihn nicht öffnen.** Der Link funktioniert nur auf diesem Computer. Senden Sie die Datei mit **Als HTML herunterladen**.

**Worauf soll ich beim Schreiben einer Vorlage achten?** Eine Vorlage ist ein Formatrezept, keine Informationsquelle. Schreiben Sie die Abschnitte, den Ton und für wen der Bericht gedacht ist. Schreiben Sie keine Zahlen oder Behauptungen hinein. Der Assistent holt die Zahlen jedes Mal aus den Daten.

## Grenzen

Berichte werden nicht nach außen veröffentlicht. Zum Teilen senden Sie die Datei. Die Richtigkeit eines Berichts hängt von den Daten ab, die sein Verfasser gelesen hat. Am Ende von Assistenten-Berichten steht der Abschnitt „Wie dieser Bericht erstellt wurde“. Dort sehen Sie, welches Werkzeug welche Angabe geliefert hat. Eine Zahl, an der Sie zweifeln, können Sie von dort zur Quelle zurückverfolgen.

<!-- Quellen: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; ReportsSummary.tsx; ReportKindsHelp.tsx; ReportKindChip.tsx; reportStats.ts; reportRequestPrompt.ts; src/client/features/search-performance/SearchReportButton.tsx; src/serverFunctions/searchReport.ts; src/server/features/search/report/buildSearchReportHtml.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts; reportCoverSection.ts -->
