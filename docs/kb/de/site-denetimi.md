---
title: Website-Audit
description: Die App prüft Ihre Website Seite für Seite anhand von 202 Regeln und sortiert die Probleme nach Wichtigkeit. Die Punktzahl zeigt auch, wie viel messbar war. Ein vorzeitig beendetes Audit bekommt keine Punktzahl.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-27
---

Hier erfahren Sie, wie Sie die Probleme Ihrer Website finden und beheben.

Die App geht Ihre Website mit ihrem eigenen Crawler durch, einem Programm, das Seiten einzeln öffnet und liest. Sie sucht nach defekten Links, fehlenden Titeln und langsamen Seiten. Am Ende erhalten Sie eine Punktzahl und eine nach Wichtigkeit sortierte Problemliste. Die Punktzahl zeigt auch, wie viele der Prüfungen gemessen werden konnten. Ein Audit, das auf halbem Weg stehen blieb, bekommt keine Punktzahl.

## Was auf dem Bildschirm zu sehen ist

**Karte „Neues Audit starten“.** Sie hat diese Felder.

- **Adressfeld der Website**: Die Domain Ihres Projekts ist bereits eingetragen.
- **Bis zu N Seiten crawlen**: mindestens 10, höchstens 10.000, Standard 50. Geben Sie mehr als 500 ein, fragt die App nach einer Bestätigung.
- **Seitengeschwindigkeit auch messen**: standardmäßig ausgeschaltet. Eingeschaltet wird jede Seite auf dem Smartphone und auf dem Computer gemessen. Die Messung übernimmt Google Lighthouse (Googles Werkzeug zur Seitenmessung). Die Karte nennt vorab, wie lange es mindestens dauert.
- **Auch ausgehende Links und Bildgrößen prüfen**: Nach dem Crawl wird geprüft, ob Links auf andere Websites sich öffnen lassen und wie groß Ihre Bilddateien sind. Es werden höchstens 300 Adressen abgefragt. Websites, die Bots aussperren, werden übersprungen.

Haben Sie keinen PageSpeed-Schlüssel (den kostenlosen Code, den Google für die Geschwindigkeitsmessung vergibt), ist die Geschwindigkeitsmessung auf höchstens 50 Seiten begrenzt. Um alle Seiten zu messen, tragen Sie unter **Einstellungen** einen kostenlosen Schlüssel ein. **Audit starten** startet das Audit. Der Bereich **Kontingente** darunter ist zugeklappt. Klappen Sie ihn auf, sehen Sie den aktuellen Stand der Kontingente für PageSpeed und URL-Prüfung.

**Vorherige Audits.** Datum, Adresse, Status, Seitenzahl und Problemzahlen jedes Audits werden aufgelistet. Die Problemzahlen sind auf hundert Seiten umgerechnet, die Gesamtzahl steht in Klammern. So können Sie Audits mit 50 und mit 500 Seiten vergleichen. Wurden im Projekt mehrere Websites geprüft, erscheint über der Liste eine Auswahl der Website. Das Diagramm und die Veränderungspfeile vergleichen immer Audits derselben Website. Sind mehrere Websites gewählt, ist das Diagramm ausgeblendet. **Ansehen** in einer Zeile öffnet das Audit. Das Zeilenmenü enthält **Erneut mit den gleichen Einstellungen ausführen** und **Audit löschen**. Löschen entfernt auch die Seiten, Probleme und Geschwindigkeitsmessungen des Audits und lässt sich nicht rückgängig machen.

**Audit-Details.** Ganz oben lädt **Bericht herunterladen** einen HTML-Bericht in einer Datei herunter und legt ihn unter **Berichte** ab. Darunter erscheinen bei Bedarf gelbe Warnungen (siehe unten). Dann folgt die Punktzahlkarte.

**Punktzahlkarte.** Sie zeigt Folgendes.

- In der Mitte den **Website-Score** und daneben ein Bewertungswort: **Ausgezeichnet**, **Gut**, **Durchschnittlich** oder **Schlecht**.
- Darunter die Abdeckungszeile: „Punktzahl auf Grundlage der 142 gemessenen Prüfungen. 38 Prüfungen konnten nicht gemessen werden.“ Das Fragezeichen daneben erklärt, wie die Punktzahl entsteht.
- Ein Satz zur Einordnung. Wird die Punktzahl an einer Grenze gehalten, nennt er den Grund.
- **Gefundene Adressen: N, gecrawlt: M**. Wie viele Adressen der Crawl auf der Website gefunden und wie viele er geöffnet hat. Endete das Audit an der von Ihnen gewählten Seitengrenze, steht dort: „Die Prüfung war auf N Seiten begrenzt; die Website kann mehr Seiten haben.“ Die Punktzahl bleibt in diesem Fall gültig.
- Zeilen für schwere Kategorien, die nicht gemessen werden konnten. Zum Beispiel „Geschwindigkeit nicht gemessen: das PageSpeed-Kontingent war aufgebraucht“.
- Vier Zähler: **Kritische Probleme**, **Verbesserungen** (Warnungen und Hinweise), **Bestandene Prüfungen** und **Nicht gemessen**.
- **Kategorie-Scores**: Crawling, Inhalt, Indizierung, Geschwindigkeit, Sicherheit, Barrierefreiheit, Social Media und strukturierte Daten. Die niedrigste steht oben. Ein Klick auf eine Kategorie öffnet den Reiter **Prüfungen** bei dieser Kategorie. Eine Kategorie, in der nichts gemessen werden konnte, zeigt „Nicht gemessen“. Eine nur teilweise gemessene zeigt „Unvollständige Daten“.
- **Score-Verlauf**: die Punktzahlen der letzten Audits derselben Website. Er erscheint, sobald zwei Audits eine Punktzahl haben. Graue Balken sind vorläufige Punktzahlen. Audits ohne Punktzahl fehlen im Diagramm, darunter steht, wie viele es sind.

**Reiter.**

- **Aufgaben (N)**: die Arbeiten, beginnend mit der, die die meisten Punkte bringt. Jede Arbeit zeigt die Punkte, die Sie gewinnen, ein Etikett „Kleine Aufgabe“, „Mittlere Aufgabe“ oder „Große Aufgabe“ und ein Feld **So beheben Sie das Problem**. Ist die Search Console verbunden, fließen auch die Klicks der betroffenen Seiten in die Reihenfolge ein.
- **Prüfungen (N)**: alle Prüfungen nach Kategorie. Jede erscheint als bestanden, durchgefallen oder nicht gemessen. Bei nicht gemessenen steht der Grund.
- **Momentaufnahme**: die Website jenseits ihrer Seiten. Zum Beispiel Zertifikat, Domainregistrierung, DNS und eine Vorschau der Website.
- **Seiten mit Problemen (N)**: gruppiert die Probleme. Öffnen Sie eine Karte, sehen Sie die Ursache, die betroffenen Adressen und das Feld **So beheben Sie das Problem**. Die Adressen lassen sich durchsuchen.
- **Seiten (N)**: jede gecrawlte Seite. Schnellfilter: **Für die Indexierung gesperrt**, **Langsam** (über 1 Sekunde), **Fehlender Alternativtext**, **Nicht in der Sitemap**.
- **Indexstatus**: Googles Antwort zu jeder Seite. Er wird in einem eigenen Leitfaden erklärt. Gehört die geprüfte Website nicht zur Search-Console-Property des Projekts, zeigt dieser Reiter keine Google-Daten, und der Bildschirm erklärt den Grund.
- **Geschwindigkeit (N)**: erscheint nur, wenn die Geschwindigkeitsmessung an war. Konnten einige Seiten nicht gemessen werden, steht die Zahl als „10/12“.

Das Menü **Exportieren** oben rechts gibt die Liste des offenen Reiters als **Nach Google Tabellen exportieren**, **CSV** oder **JSON** aus. Ist ein Filter aktiv, gehen nur die sichtbaren Zeilen.

## Die drei Zustände der Punktzahl

**Volle Punktzahl.** Wurde der größte Teil der Prüfungen gemessen, kommt sie mit einem Bewertungswort. Die Punktzahl lesen Sie so: ab 90 Ausgezeichnet, ab 70 Gut, ab 50 Durchschnittlich, darunter Schlecht.

**Vorläufiger Score.** Fällt der Anteil gemessener Prüfungen unter 70 Prozent, ist die Punktzahl vorläufig. Das gilt auch, wenn in Crawling, Indizierung, Inhalt oder Geschwindigkeit weniger als die Hälfte der Prüfungen gemessen wurde. Die Karte zeigt „Vorläufiger Score, Messabdeckung 62 %“, vergibt kein Bewertungswort und ist neutral gefärbt. Die Zahl bezieht sich nur auf die Prüfungen, die sichtbar waren. Über den Rest wurde weder gut noch schlecht entschieden. Meist liegt es daran: Das PageSpeed-Kontingent war aufgebraucht, es gibt keinen PageSpeed-Schlüssel, die Geschwindigkeitsmessung war aus oder aus der Search Console konnten keine Indexdaten geholt werden.

**Keine Punktzahl.** In diesen Fällen steht auf der Karte anstelle der Punktzahl „Unvollständiges Audit — kein Score“.

- Das Audit ist mit einem Fehler beendet worden.
- Das Audit läuft noch.
- Der Crawl wurde wegen der Ratenbegrenzung der Website vorzeitig gestoppt. Die Problemliste ist unvollständig, eine Punktzahl wäre nur geraten.
- Es konnte keine Seite gecrawlt werden. Dann erscheint die Punktzahlkarte gar nicht.

Die Befunde werden trotzdem gezeigt und gelten für die gecrawlten Seiten. Für eine volle Punktzahl führen Sie das Audit erneut aus.

## Wenn das Audit beendet wurde, was dort steht

Schlägt ein Audit fehl, nennt der Bildschirm drei Dinge: was passiert ist, ob der Fehler bei Ihrer Website oder bei der App liegt, und was Sie tun. Der Titel nennt die Phase, in der es endete: **URL-Erkennung**, **Crawl**, **Geschwindigkeitsmessung** oder **Ergebnisaufbereitung**.

| Was der Bildschirm sagt                                                                                                | Auf wessen Seite            | Was zu tun ist                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| Ein Schritt wurde nicht rechtzeitig fertig                                                                             | Wahrscheinlich Ihre Website | Versuchen Sie es in ein paar Minuten erneut. Tritt es wieder auf, starten Sie mit weniger Seiten |
| Die Prüfung passte nicht in den Arbeitsspeicher der App                                                                | Die App                     | Mit weniger Seiten erneut starten                                                                |
| Die Prüfung hat die erlaubte Prozessorzeit überschritten                                                               | Die App                     | Mit weniger Seiten erneut starten                                                                |
| Beim Schreiben der Ergebnisse in die Datenbank ist ein Fehler aufgetreten                                              | Die App                     | Prüfen Sie, ob auf der Festplatte Platz ist, starten Sie die App und das Audit neu               |
| Das Ergebnis eines Schritts war größer, als die App speichern kann                                                     | Die App                     | Mit weniger Seiten erneut starten                                                                |
| Die interne Prüfungssteuerung der App hat einen Fehler gemeldet                                                        | Die App                     | Wählen Sie im Tray-Menü **Yeniden başlat** (Neu starten), dann starten Sie das Audit neu         |
| Die Prüfung wurde abgebrochen                                                                                          | Die App                     | Lassen Sie die App geöffnet und starten Sie das Audit neu                                        |
| Der Installationsschlüssel hat den Teil, der Prüfungen ausführt, nicht erreicht (Ihre Schlüssel wurden nicht gelöscht) | Die App                     | App aktualisieren oder neu starten, dann das Audit neu starten                                   |
| Die Prüfung wurde mit einem unerwarteten Fehler beendet                                                                | Nicht ermittelbar           | Neu starten. Tritt es wieder auf, laden Sie unter **Hilfe** das Diagnosepaket herunter           |

Der rohe Fehlertext gelangt nicht auf den Bildschirm. Er bleibt im Diagnosepaket.

## Gelbe Warnungen beim Crawl

- **Das Audit konnte diese Website nicht vollständig crawlen.** Der Bot-Schutz Ihrer Website hat den Crawler gestoppt. Die Ergebnisse werden trotzdem gezeigt. Erlauben Sie in Ihrer Firewall „seotracker-audit“ oder probieren Sie einen der Desktop-Crawler, die der Leitfaden nennt.
- **N Seiten konnten nicht abgerufen werden (Netzwerkfehler).** Die Verbindung kam auch beim erneuten Versuch nicht zustande. Diese Seiten wurden nicht geprüft und nicht als defekt gezählt. Meist ist es vorübergehend. Führen Sie das Audit erneut aus. Hält es an, prüfen Sie, ob sich die Website von diesem Computer aus öffnen lässt.
- **Die Website hat bei N Seiten die Ratenbegrenzung angewandt.** Die Website hat „zu viele Anfragen“ geantwortet. Diese Seiten konnten nicht geprüft werden. Starten Sie neu, wenn die Begrenzung zurückgesetzt ist.
- **Der Crawl wurde wegen der Ratenbegrenzung der Website vorzeitig gestoppt.** Die verlangte Wartezeit war länger, als das Audit dauern darf. Der Bericht ist unvollständig und bekommt keine Punktzahl.
- **Der gespeicherte PageSpeed-Schlüssel konnte nicht gelesen werden; die Geschwindigkeitsmessung lief ohne Schlüssel.** Das Audit ist fertig, aber die Geschwindigkeitsmessung lief ohne Schlüssel. Die Crawl-Ergebnisse sind nicht betroffen. Die Geschwindigkeitsmessung blieb auf die ersten Seiten beschränkt. Aktualisieren Sie die App oder starten Sie sie neu, dann starten Sie ein neues Audit. Hält es an, speichern Sie den PageSpeed-Schlüssel unter **Einstellungen** neu.

## So gehen Sie vor

1. Lassen Sie beim ersten Audit die Seitenzahl bei 50. Lassen Sie die Geschwindigkeitsmessung aus. Es ist in ein bis zwei Minuten fertig. Bei ausgeschalteter Geschwindigkeitsmessung kann die Punktzahl vorläufig ausfallen. Das ist normal.
2. Lesen Sie die Abdeckungszeile auf der Punktzahlkarte. Steht dort **Vorläufiger Score**, nennen die Zeilen darunter den Grund.
3. Beginnen Sie im Reiter **Aufgaben** mit den ersten drei Arbeiten. Sie bringen mit dem geringsten Aufwand die meisten Punkte.
4. Erledigen Sie im Reiter **Seiten mit Problemen** zuerst die kritischen Probleme. Ein kritisches Problem hindert Google daran, die Seite zu sehen.
5. Nehmen Sie die Liste mit **Exportieren** mit und geben Sie sie Ihrer Website-Betreuung. Das Feld **So beheben Sie das Problem** können Sie unverändert weitergeben.
6. Klicken Sie nach der Korrektur auf **Erneut mit den gleichen Einstellungen ausführen**. Die Pfeile in der Liste **Vorherige Audits** und der **Score-Verlauf** zeigen, was behoben wurde.
7. Schalten Sie die Geschwindigkeitsmessung einmal pro Woche für wichtige Seiten ein. Jede Seite braucht etwa zehn Sekunden und verbraucht Google-Kontingent.

## Wie die Zahlen berechnet werden

**Score.** Jeder Befund nimmt seiner Kategorie Punkte. Wie viele, hängt von der Wichtigkeit des Befunds und dem Anteil der betroffenen Seiten ab. Die Gewichte sind: kritisch 40, Warnung 15, Hinweis 3. Die Site-Punktzahl ist der gewichtete Durchschnitt von sieben Kategorien. Crawling und Indizierung zählen am meisten, Social Media und strukturierte Daten am wenigsten. Eine Prüfung, die nicht gemessen werden konnte, hebt die Punktzahl weder an noch senkt sie. Deshalb wird die Abdeckung gesondert gezeigt.

**Obergrenzen.** Gibt es auch nur ein Problem, beträgt die Punktzahl höchstens 99. Gibt es ein kritisches Problem, höchstens 69. Bei 5 oder mehr Warnungen höchstens 89. So verschwindet eine einzelne für die Indizierung gesperrte Seite auf einer großen Website nicht unter einer hohen Punktzahl. Hält eine Grenze die Punktzahl fest, steht das auf der Karte. Auch das „+N Punkte“ neben einer Arbeit berücksichtigt die Grenze. Das einzige kritische Problem zu beheben, hebt die ganze Grenze auf. Eine Warnung zu beheben, während eine Grenze gilt, bringt sehr wenig.

**Crawl.** Die App belastet Ihre Website nicht. Sie sendet höchstens zwei Anfragen gleichzeitig. Antwortet die Website mit „zu viele Anfragen“ (429), wartet sie. Übersteigt die Wartezeit insgesamt 30 Minuten, stoppt der Crawl und das Audit bekommt keine Punktzahl.

**Geschwindigkeitsmessung.** Bei einer Website mit 212 Seiten dauerte das ganze Audit 35 Minuten. Etwa 24 davon entfielen auf die Geschwindigkeitsmessung. Ist das Tageskontingent aufgebraucht, hört die Messung auf, die bisherigen Ergebnisse bleiben, und die Punktzahl kann vorläufig sein. In diesen Fällen wird ein Problem eingetragen:

- Der Hauptinhalt erscheint nach mehr als 4 Sekunden (LCP).
- Der Inhalt verschiebt sich um mehr als 0,25 (CLS).
- Die Reaktion auf einen Klick dauert länger als 500 Millisekunden (INP).
- Der Lighthouse-SEO-Wert liegt unter 90.

## Häufige Fragen

**Zeigt das Audit, was Google sieht?** Nein. Der Crawler der App liest die Seite selbst. Googles Antwort steht im Reiter **Indexstatus**.

**Die Punktzahl ist 98, warum nicht 100?** Schon ein einziges Problem hält die Punktzahl bei 99 oder darunter.

**Warum bleibt meine Punktzahl bei 69 hängen?** Es gibt ein kritisches Problem. Bis Sie es beheben, kann die Punktzahl 69 nicht überschreiten. Die Karte sagt das.

**Warum steht dort „Vorläufiger Score“?** Ein großer Teil der Prüfungen konnte nicht gemessen werden. Die Abdeckungszeile und die Zeilen darunter nennen den Grund. Die Geschwindigkeitsmessung einzuschalten oder die Search Console zu verbinden, erhöht die Abdeckung meist.

**Warum steht „Unvollständige Prüfung“ statt einer Punktzahl?** Das Audit blieb auf halbem Weg stehen oder endete vorzeitig. Die Problemliste ist unvollständig, deshalb gibt es keine Punktzahl. Führen Sie das Audit erneut aus.

**Was bedeutet die Warnung „blockiert“?** Der Bot-Schutz Ihrer Website hat den Crawler gestoppt. Erlauben Sie in der Firewall „seotracker-audit“.

**Die Geschwindigkeitsmessung brach ab.** Meist fehlt der PageSpeed-Schlüssel oder das Tageskontingent ist verbraucht. Die Kontingentkarte unter **Einstellungen** nennt den Grund.

**Wie viele Audits laufen gleichzeitig?** Höchstens drei. Zwei Audits mit Geschwindigkeitsmessung bremsen sich gegenseitig.

## Grenzen

Der Crawler sieht Inhalte, die JavaScript (Code, der auf der Seite läuft) später hinzufügt, womöglich nicht. Ein Audit crawlt höchstens 10.000 Seiten. Die Geschwindigkeitsmessung ist Googles Labormessung, keine Daten echter Besucher. Das Audit ändert nichts an Ihrer Website. Die Korrekturen machen Sie oder Ihr Assistent.

<!-- Quellen: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; AuditSiteFilter.tsx; ProgressCard.tsx; src/client/features/audit/results/ResultsView.tsx; ResultsHeader.tsx; ScoreOverview.tsx; ScoreGauge.tsx; WithheldScore.tsx; scoreWords.ts; auditFailureCopy.ts; ChecksView.tsx; TodoView.tsx; IssuesView.tsx; QuickFilters.tsx; ForeignPropertyNotice.tsx; DownloadReportButton.tsx; src/routes/_project/p/$projectId/audit/index.tsx; src/shared/auditStanding.ts; src/shared/auditScore.ts; src/shared/auditCategory.ts; src/shared/audit-limits.ts; src/server/lib/audit/crawl-throttle.ts -->
