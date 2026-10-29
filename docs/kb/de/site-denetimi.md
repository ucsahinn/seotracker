---
title: Website-Audit
description: Ihre Website anhand von 202 Regeln prüfen und Probleme priorisieren. Punktzahl, Messabdeckung und unvollständige Ergebnisse richtig verstehen.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-28
---

Der Crawler der App öffnet Ihre Seiten nacheinander und sucht unter anderem nach defekten Links, fehlenden Titeln und langsamen Seiten. Das Ergebnis ist eine Punktzahl mit Angabe der Messabdeckung und eine nach Wichtigkeit sortierte Problemliste.

## Was auf dem Bildschirm zu sehen ist

**Karte „Neues Audit starten“.** Sie hat diese Felder:

- **Adressfeld der Website**: Die Domain Ihres Projekts ist bereits eingetragen.
- **Bis zu N Seiten crawlen**: mindestens 10, höchstens 10.000, Standard 50. Geben Sie mehr als 500 ein, fragt die App nach einer Bestätigung.
- **Auch die Seitengeschwindigkeit messen**: standardmäßig ausgeschaltet. Eingeschaltet misst Google Lighthouse über PageSpeed Insights jede Seite für Smartphone und Desktop. Die Karte nennt vorab die Mindestdauer.
- **Auch ausgehende Links und Bildgrößen prüfen**: Nach dem Crawl prüft die App, ob Links auf andere Websites erreichbar sind und wie groß Ihre Bilddateien sind. Sie fragt höchstens 300 Adressen ab und überspringt Websites, die Bots aussperren.

Ohne [PageSpeed-Schlüssel](/docs/pagespeed-anahtari/) misst die App höchstens 50 Seiten. **Audit starten** startet das Audit. Der zugeklappte Bereich **Kontingente** darunter zeigt den aktuellen Stand für PageSpeed und URL-Prüfung.

**Vorherige Audits.** Die Liste zeigt Datum, Adresse, Status, Seitenzahl und Problemzahlen jedes Audits. **Gecrawlte Seiten** ist die Zahl tatsächlich gecrawlter Adressen, auch bei fehlgeschlagenen Audits, nicht das gewählte Seitenlimit. Die Spalten Kritisch, Warnung und Info zählen alle gespeicherten Befunde, auch websiteweite; eine Seite kann mehrere Befunde haben. **Geschwindigkeitsmessung angefordert** heißt nur, dass die Messung beim Start eingeschaltet war, nicht dass sie gelungen ist. Wurden im Projekt mehrere Websites geprüft, erscheint über der Liste eine Auswahl der Website. Die Dichte gibt Probleme pro hundert Seiten an. Trendlinien und Veränderungspfeile erscheinen nur, wenn gespeicherte Belege dieselbe Website, Seitenmenge, Crawling-Einstellungen und gemessenen Prüfungen bestätigen. Bei unterschiedlichem oder unbekanntem Umfang stehen die Zahlen ohne Vergleich nebeneinander. Sind mehrere Websites gewählt, ist das Diagramm ausgeblendet. Auf dem Smartphone scrollen Sie die Tabelle seitlich, um weitere Spalten und Aktionen zu sehen. **Ansehen** in einer Zeile öffnet das Audit. Das Zeilenmenü enthält **Erneut mit den gleichen Einstellungen ausführen** und **Audit löschen**. Löschen entfernt auch Seiten, Probleme und Geschwindigkeitsmessungen des Audits und lässt sich nicht rückgängig machen.

**Audit-Details.** Ganz oben lädt **Bericht herunterladen** den Bericht als einzelne HTML-Datei herunter und legt ihn unter **Berichte** ab. Darunter stehen bei Bedarf gelbe Warnungen (siehe unten), dann folgt die Punktzahlkarte. Der Bereich zum Prüfumfang listet gemessene und nicht gemessene Prüfungen. Ein fehlgeschlagenes Audit zeigt die gespeicherte Fehlererklärung und den nächsten Schritt; ist die Ursache unbekannt, steht das ausdrücklich da.

**Punktzahlkarte.** Sie zeigt:

- In der Mitte den **Website-Score** und daneben ein Bewertungswort: **Ausgezeichnet**, **Gut**, **Durchschnittlich** oder **Schlecht**.
- Darunter die Abdeckungszeile: „Punktzahl auf Grundlage der 142 gemessenen Prüfungen. 38 Prüfungen konnten nicht gemessen werden.“ Das Fragezeichen daneben erklärt, wie die Punktzahl entsteht.
- Einen Satz zur Einordnung. Hält eine Obergrenze die Punktzahl fest, nennt er den Grund.
- **Gefundene Adressen: N, gecrawlt: M**: wie viele Adressen der Crawl gefunden und wie viele er geöffnet hat. Endete das Audit an der von Ihnen gewählten Seitengrenze, steht dort: „Die Prüfung war auf N Seiten begrenzt; die Website kann mehr Seiten haben.“ Die Punktzahl bleibt in diesem Fall gültig.
- Zeilen für wichtige Kategorien, die nicht gemessen werden konnten, zum Beispiel „Geschwindigkeit nicht gemessen: das PageSpeed-Kontingent war aufgebraucht“.
- Vier Zähler: **Kritische Probleme**, **Verbesserungen** (Warnungen und Hinweise), **Bestandene Prüfungen** und **Nicht gemessen**.
- **Kategorie-Scores**: Crawling, Inhalt, Indexierung, Geschwindigkeit, Sicherheit, Barrierefreiheit, Social Media und strukturierte Daten. Die schwächste steht oben; ein Klick öffnet den Reiter **Prüfungen** bei dieser Kategorie. Eine Kategorie ohne Messung zeigt „Nicht gemessen“, eine teilweise gemessene „Unvollständige Daten“.
- **Score-Verlauf**: die Punktzahlen der letzten Audits derselben Website. Er erscheint ab zwei Audits mit Punktzahl. Graue Balken sind vorläufige Punktzahlen. Audits ohne Punktzahl fehlen im Diagramm; ihre Zahl steht darunter.

**Reiter.**

- **Aufgaben (N)**: die Aufgaben, beginnend mit der, die die meisten Punkte bringt. Jede zeigt den Punktgewinn, ein Etikett „Kleine Aufgabe“, „Mittlere Aufgabe“ oder „Große Aufgabe“ und ein Feld **So beheben Sie das Problem**. Ist die Search Console verbunden, fließen auch die Klicks der betroffenen Seiten in die Reihenfolge ein.
- **Prüfungen (N)**: alle Prüfungen nach Kategorie, jeweils als bestanden, nicht bestanden oder nicht gemessen, mit Grund.
- **Momentaufnahme**: Angaben zur Website als Ganzes, etwa Zertifikat, Domainregistrierung, DNS und eine Vorschau.
- **Seiten mit Problemen (N)**: die Probleme nach Art gruppiert. Jede Karte zeigt Ursache, betroffene Adressen (durchsuchbar) und **So beheben Sie das Problem**.
- **Seiten (N)**: jede gecrawlte Seite. Schnellfilter: **Für die Indexierung gesperrt**, **Langsam** (über 1 Sekunde), **Fehlender Alternativtext**, **Nicht in der Sitemap**.
- **Indexstatus**: Googles Antwort zu jeder Seite, beschrieben unter [Indexstatus](/docs/dizin-durumu/). Gehört die geprüfte Website nicht zur Search-Console-Property des Projekts, zeigt dieser Reiter keine Google-Daten, und der Bildschirm erklärt den Grund.
- **Geschwindigkeit (N)**: erscheint nur, wenn die Geschwindigkeitsmessung an war. Konnten nicht alle Seiten gemessen werden, steht dort zum Beispiel „10/12“.

Das Menü **Exportieren** oben rechts gibt die Liste des offenen Reiters nach Google Tabellen, als CSV oder als JSON aus. Bei aktivem Filter werden nur die sichtbaren Zeilen exportiert.

## Die drei Zustände der Punktzahl

**Volle Punktzahl.** Wurde der größte Teil der Prüfungen gemessen, steht neben der Zahl eine Bewertung: ab 90 Ausgezeichnet, ab 70 Gut, ab 50 Durchschnittlich, darunter Schlecht.

**Vorläufiger Score.** Fällt der Anteil gemessener Prüfungen unter 70 Prozent, ist die Punktzahl vorläufig. Das gilt auch, wenn in Crawling, Indexierung, Inhalt oder Geschwindigkeit weniger als die Hälfte der Prüfungen gemessen wurde. Die Karte zeigt dann „Vorläufiger Score — Messabdeckung 62 %“, ohne Bewertung und in neutraler Farbe. Die Zahl bewertet nur die gemessenen Prüfungen; über den Rest sagt sie nichts aus. Die häufigsten Gründe: Das PageSpeed-Kontingent war aufgebraucht, es gibt keinen PageSpeed-Schlüssel, die Geschwindigkeitsmessung war aus oder aus der Search Console konnten keine Indexdaten geholt werden.

**Keine Punktzahl.** In diesen Fällen steht auf der Karte anstelle der Punktzahl „Unvollständiges Audit — kein Score“.

- Das Audit ist mit einem Fehler beendet worden.
- Das Audit läuft noch.
- Der Crawl wurde wegen der Ratenbegrenzung der Website vorzeitig gestoppt. Die Problemliste ist unvollständig, eine Punktzahl wäre geraten.
- Es konnte keine Seite gecrawlt werden. Dann erscheint die Punktzahlkarte gar nicht.

Die Befunde werden trotzdem gezeigt und gelten für die gecrawlten Seiten. Für eine volle Punktzahl führen Sie das Audit erneut aus.

## Wenn ein Audit fehlschlägt

Schlägt ein Audit fehl, nennt der Bildschirm, was passiert ist, ob der Fehler bei Ihrer Website oder bei der App liegt und was Sie tun können. Der Titel nennt die Phase, in der es endete: **URL-Erkennung**, **Crawl**, **Geschwindigkeitsmessung** oder **Ergebnisaufbereitung**.

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

Den technischen Fehlertext zeigt die App nicht an; er steht im Diagnosepaket.

## Gelbe Warnungen beim Crawl

- **Das Audit konnte diese Website nicht vollständig crawlen.** Der Bot-Schutz Ihrer Website hat den Crawler gestoppt; die bisherigen Ergebnisse werden trotzdem gezeigt. Erlauben Sie in Ihrer Firewall den User-Agent `seotracker-audit` oder versuchen Sie einen der vorgeschlagenen Desktop-Crawler (LibreCrawl, Screaming Frog).
- **N Seiten konnten nicht abgerufen werden (Netzwerkfehler).** Die Verbindung kam auch beim erneuten Versuch nicht zustande. Diese Seiten wurden weder geprüft noch als defekt gezählt. Meist ist das vorübergehend; führen Sie das Audit erneut aus. Hält es an, prüfen Sie, ob sich die Website von diesem Computer aus öffnen lässt.
- **Die Website hat bei N Seiten die Ratenbegrenzung angewandt.** Die Website hat mit „zu viele Anfragen“ geantwortet, diese Seiten wurden nicht geprüft. Starten Sie neu, sobald die Begrenzung zurückgesetzt ist.
- **Der Crawl wurde wegen der Ratenbegrenzung der Website vorzeitig gestoppt.** Die verlangte Wartezeit war länger, als das Audit dauern darf. Der Bericht ist unvollständig und bekommt keine Punktzahl.
- **Der gespeicherte PageSpeed-Schlüssel konnte nicht gelesen werden; die Geschwindigkeitsmessung lief ohne Schlüssel.** Das Audit ist fertig, aber die Geschwindigkeitsmessung blieb auf höchstens 50 Seiten beschränkt. Die Crawl-Ergebnisse sind nicht betroffen. Aktualisieren oder starten Sie die App neu und starten Sie ein neues Audit. Hält es an, speichern Sie den PageSpeed-Schlüssel unter **Einstellungen** neu.

## So gehen Sie vor

1. Starten Sie das erste Audit mit 50 Seiten und ohne Geschwindigkeitsmessung. Es ist in ein bis zwei Minuten fertig. Ohne Geschwindigkeitsmessung kann die Punktzahl vorläufig sein; das ist normal.
2. Lesen Sie die Abdeckungszeile auf der Punktzahlkarte. Steht dort **Vorläufiger Score**, nennen die Zeilen darunter den Grund.
3. Beginnen Sie im Reiter **Aufgaben** mit den ersten drei Einträgen. Sie bringen die meisten Punkte.
4. Beheben Sie im Reiter **Seiten mit Problemen** zuerst die kritischen Probleme. Sie können verhindern, dass Google die Seite crawlt oder indexiert.
5. Exportieren Sie die Liste mit **Exportieren** und geben Sie sie an die Betreuung Ihrer Website weiter. Der Text unter **So beheben Sie das Problem** ist dafür geschrieben.
6. Klicken Sie nach der Korrektur auf **Erneut mit den gleichen Einstellungen ausführen**. Die Pfeile in der Liste **Vorherige Audits** und der **Score-Verlauf** zeigen, was behoben wurde.
7. Schalten Sie die Geschwindigkeitsmessung einmal pro Woche für wichtige Seiten ein. Jede Seite braucht etwa zehn Sekunden und verbraucht Google-Kontingent.

## Wie die Zahlen berechnet werden

**Score.** Jeder Befund zieht seiner Kategorie Punkte ab. Wie viele, hängt vom Schweregrad und vom Anteil der betroffenen Seiten ab. Die Gewichte sind: kritisch 40, Warnung 15, Hinweis 3. Der Website-Score ist der gewichtete Durchschnitt der sieben Kategorien. Crawling und Indexierung zählen am meisten, Social Media und strukturierte Daten am wenigsten. Eine nicht gemessene Prüfung verändert die Punktzahl nicht; deshalb zeigt die Karte die Abdeckung gesondert.

**Obergrenzen.** Mit mindestens einem Problem beträgt die Punktzahl höchstens 99, mit einem kritischen Problem höchstens 69, mit fünf oder mehr Warnungen höchstens 89. So verschwindet etwa eine einzelne für die Indexierung gesperrte Seite auf einer großen Website nicht hinter einer hohen Punktzahl. Das „+N Punkte“ neben einer Aufgabe berücksichtigt diese Grenzen: Ist ein einziges kritisches Problem die Ursache, hebt seine Behebung die Grenze auf; eine Warnung zu beheben, bringt währenddessen kaum etwas.

**Crawl.** Die App sendet höchstens zwei Anfragen gleichzeitig, um Ihre Website nicht zu belasten. Antwortet die Website mit „zu viele Anfragen“ (429), wartet sie. Übersteigt die Wartezeit insgesamt 30 Minuten, stoppt der Crawl, und das Audit erhält keine Punktzahl.

**Geschwindigkeitsmessung.** Bei einer Website mit 212 Seiten dauerte das ganze Audit 35 Minuten, davon etwa 24 für die Geschwindigkeitsmessung. Ist das Tageskontingent aufgebraucht, endet die Messung; bisherige Ergebnisse bleiben, und die Punktzahl kann vorläufig sein. Ein Problem wird gemeldet, wenn:

- Der Hauptinhalt erscheint nach mehr als 4 Sekunden (LCP).
- Der Inhalt verschiebt sich um mehr als 0,25 (CLS).
- Die Reaktion auf einen Klick dauert länger als 500 Millisekunden (INP).
- Der Lighthouse-SEO-Wert liegt unter 90.

## Häufige Fragen

**Zeigt das Audit, was Google sieht?** Nein. Der Crawler der App liest die Seite selbst. Googles Antwort steht im Reiter **Indexstatus**.

**Die Punktzahl ist 98, warum nicht 100?** Schon ein einziges Problem begrenzt die Punktzahl auf 99.

**Warum bleibt meine Punktzahl bei 69?** Es gibt ein kritisches Problem. Bis Sie es beheben, kann die Punktzahl 69 nicht überschreiten.

**Warum steht dort „Vorläufiger Score“?** Ein großer Teil der Prüfungen konnte nicht gemessen werden. Die Abdeckungszeile und die Zeilen darunter nennen den Grund. Meist erhöht es die Abdeckung, die Geschwindigkeitsmessung einzuschalten oder die Search Console zu verbinden.

**Die Geschwindigkeitsmessung brach ab.** Meist fehlt der PageSpeed-Schlüssel, oder das Tageskontingent ist verbraucht. Der Bereich **Google- und Systemlimits** unter **Einstellungen** nennt den Grund.

**Wie viele Audits laufen gleichzeitig?** Höchstens drei. Zwei Audits mit Geschwindigkeitsmessung teilen sich das PageSpeed-Kontingent und brauchen dann jeweils etwa doppelt so lange.

## Grenzen

Inhalte, die erst JavaScript nachlädt, sieht der Crawler womöglich nicht. Ein Audit crawlt höchstens 10.000 Seiten. Die Geschwindigkeitsmessung ist eine Labormessung von Google, keine Messung echter Besucher. Das Audit ändert nichts an Ihrer Website; die Korrekturen nehmen Sie oder Ihr KI-Agent vor.

<!-- Quellen: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; AuditSiteFilter.tsx; ProgressCard.tsx; src/client/features/audit/results/ResultsView.tsx; ResultsHeader.tsx; ScoreOverview.tsx; ScoreGauge.tsx; WithheldScore.tsx; scoreWords.ts; auditFailureCopy.ts; ChecksView.tsx; TodoView.tsx; IssuesView.tsx; QuickFilters.tsx; ForeignPropertyNotice.tsx; DownloadReportButton.tsx; src/routes/_project/p/$projectId/audit/index.tsx; src/shared/auditStanding.ts; src/shared/auditScore.ts; src/shared/auditCategory.ts; src/shared/audit-limits.ts; src/server/lib/audit/crawl-throttle.ts -->
