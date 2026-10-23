---
title: Berichte und Vorlagen
description: Jeder Bericht, den Sie aus einem Audit herunterladen oder von Ihrem Assistenten schreiben lassen, ist eine einzelne HTML-Datei. Sie öffnen sie auf dem Smartphone, drucken sie oder senden sie per E-Mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

Hier erfahren Sie, wie Sie einen Bericht erhalten, an wen Sie ihn senden und wie Sie ihn mit einer Vorlage wiederholen.

Jeder Bericht, der für dieses Projekt entsteht, steht auf dem Bildschirm **Raporlar** (Berichte) in einer einzigen Liste. Ein Bericht entsteht auf zwei Wegen. Die Schaltfläche **Raporu indir** (Bericht herunterladen) auf dem Bildschirm Site denetimi (Website-Audit) erzeugt den eigenen Bericht der App. Ihr KI-Assistent kann auch recherchieren und seine Funde als Bericht speichern. Jeder Bericht ist eine einzelne HTML-Datei. Sie enthält kein Skript (Code, der auf der Seite läuft), keine externen Quellen und keine eingebetteten Schriften. Deshalb lässt sie sich auf dem Smartphone öffnen, als PDF drucken und per E-Mail senden. Einen Editor, in dem Sie Berichte von Hand schreiben, gibt es in der App nicht. Den Bericht schreibt entweder die App oder der Assistent.

## Was auf dem Bildschirm zu sehen ist

**Obere Leiste.** Die Schaltfläche **Yeni rapor iste** (Neuen Bericht anfordern) kopiert einen Text in die Zwischenablage, den Sie in Ihren Assistenten einfügen.

**Filter.** Es gibt die Filter Alle, Letzte 7 Tage, Mit Vorlage geschrieben (Şablonla yazılan) und Mit Skill geschrieben (Beceriyle yazılan). Dazu erscheint ein Suchfeld.

**Tabelle.** Die Spalten sind **Rapor** (Bericht), **Tür** (Typ), **Oluşturulma** (Erstellt) und **Boyut** (Größe). Die Spalte **Tür** nennt, welche Aufgabe den Bericht erzeugt hat. Zum Beispiel ist „Site denetimi raporu“ (Website-Audit-Bericht) die App selbst. Bei Berichten, die mit einer Vorlage geschrieben wurden, sehen Sie den Namen der Vorlage.

**Berichtsseite.** Der Bericht öffnet sich in seinem eigenen geschützten Rahmen. Es gibt drei Schaltflächen: **HTML olarak indir** (Als HTML herunterladen), Link kopieren und Drucken. Der Link öffnet sich nur auf dieser Installation, von außen kommt niemand heran.

**Berichtsvorlagen.** Sie erreichen sie über das Menü oder über den Bildschirm Raporlar. Eine Vorlage ist ein gespeichertes Rezept, das Ihrem Assistenten erklärt, wie er den Bericht schreibt. Sie sagen, wer den Bericht liest, welche Abschnitte er hat und in welcher Sprache er geschrieben wird. Es gibt drei Felder:

- **Ad** (Name) hat höchstens 80 Zeichen und muss im Projekt einmalig sein.
- **Açıklama** (Beschreibung) hat höchstens 200 Zeichen. Schreiben Sie in einem Satz, wann die Vorlage verwendet wird.
- **Yönerge** (Anweisung) hat höchstens 3.000 Zeichen.

In einem Projekt kann es höchstens 10 Vorlagen geben. Löschen Sie eine Vorlage, werden die daraus erzeugten Berichte nicht gelöscht.

## So gehen Sie vor

1. Für den ersten Bericht klicken Sie auf dem Bildschirm Site denetimi auf **Raporu indir**. Der Bericht wird auf Ihren Computer geladen und erscheint in dieser Liste. Er beginnt mit dem Abschnitt „Bu hafta yapılacak N şey“ (N Dinge, die diese Woche zu tun sind).
2. Arbeiten Sie mit einem Assistenten, klicken Sie auf **Yeni rapor iste**. Fügen Sie den kopierten Text in Claude Code, Codex oder Cursor ein. Der Assistent fragt, welchen Bericht Sie möchten, liest die Daten und speichert den Bericht hier.
3. Möchten Sie jeden Monat denselben Bericht, schreiben Sie eine Vorlage. Tragen Sie in die Anweisung den Leser ein („die Person, die die Website betreibt, kennt sich nicht mit SEO aus“), dazu die Abschnitte, die Reihenfolge und den Ton. Fordern Sie die Vorlage mit ihrem Namen an, wendet der Assistent sie an.
4. Zum Teilen klicken Sie auf **HTML olarak indir** und senden die Datei. Wer sie erhält, öffnet die Datei im Browser. Den Link zu kopieren, hilft nur auf demselben Computer.
5. Löschen Sie alte Berichte nicht. Im nächsten Gespräch liest der Assistent die Zusammenfassung des vorherigen Berichts und vergleicht.

## Wie die Zahlen berechnet werden

Der Audit-Bericht ist für den Druck auf A4 gesetzt. Er hat die Abschnitte Inhaltsverzeichnis, „Bu hafta yapılacak N şey“, Probleme, Geschwindigkeitsmessung, Googles Indexstatus und Sitemap. Der Abschnitt Indexstatus verwendet nur gespeicherte Antworten und stellt Google keine neuen Fragen.

Die Listen haben Grenzen: 50 Adressen pro Problem, 300 Seiten, 50 Geschwindigkeitszeilen, 3.000 Adressen im Anhang. Überschreitet die Datei 400 KB, werden die Listen gekürzt.

Ein Bericht darf höchstens 500.000 Byte groß sein (empfohlen sind unter 80 KB). Der Titel hat höchstens 120 Zeichen und ist im Projekt einmalig. Die Zusammenfassung hat höchstens 2.500 Zeichen. Ein zweiter Bericht mit demselben Titel wird nicht angenommen. In einem Projekt werden höchstens 10.000 Berichte gehalten, und auf der Installation sind insgesamt 5 GB dafür reserviert.

Aus Sicherheitsgründen werden Dateien beim Speichern abgelehnt, die ein Skript, ein iframe (einen Kasten, der eine andere Seite einbettet), ein Formular, externe Stile, Ereignisbehandler (wie onclick), einen javascript:-Link oder eine automatische Weiterleitung enthalten. Beim Öffnen wird der Bericht außerdem in einem abgeschlossenen Kasten und ohne Netzzugang angezeigt. Ein Bericht kann also nichts ohne Ihr Wissen nach außen senden.

## Häufige Fragen

**Wer hat den Bericht geschrieben?** Sehen Sie in die Spalte **Tür**. „Site denetimi raporu“ stammt von der App, die anderen hat der Assistent geschrieben. Auch auf der Berichtsseite sehen Sie, wer ihn gespeichert hat.

**Kann ich den Bericht bearbeiten?** In der App nicht. Sagen Sie dem Assistenten „ändere diesen Abschnitt“, dann aktualisiert er den Bericht.

**Ich habe den Link gesendet, der Empfänger kann ihn nicht öffnen.** Der Link funktioniert nur auf diesem Computer. Senden Sie die Datei mit **HTML olarak indir**.

**Worauf soll ich beim Schreiben einer Vorlage achten?** Eine Vorlage ist ein Formatrezept, keine Informationsquelle. Schreiben Sie die Abschnitte, den Ton und für wen der Bericht gedacht ist. Schreiben Sie keine Zahlen oder Behauptungen hinein. Der Assistent holt die Zahlen jedes Mal aus den Daten.

## Grenzen

Berichte werden nicht nach außen veröffentlicht. Zum Teilen senden Sie die Datei. Die Richtigkeit eines Berichts hängt von den Daten ab, die sein Verfasser gelesen hat. Am Ende von Assistenten-Berichten steht der Abschnitt „Bu rapor nasıl hazırlandı“ (Wie dieser Bericht erstellt wurde). Dort sehen Sie, welches Werkzeug was gesagt hat. Verfolgen Sie die Quelle einer Zahl, an der Sie zweifeln, von dort aus.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
